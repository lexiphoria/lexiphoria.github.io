"""Hàm dùng chung để tách vật khỏi tờ tài nguyên thành ảnh nền trong suốt cho Immersion Town.

Mỗi tờ có một kiểu nền:
  'paper'   giấy kem (tranh Đông Hồ, tờ Trà Quế, tờ Gemini)  → xoá vùng giấy loang từ mép khung
  'white'   nền trắng giả trong suốt (tờ xích lô, tờ du khách) → xoá vùng trắng loang từ mép khung
  'magenta' nền hồng phẳng #FF00FF (vẽ theo mẫu lệnh mới)      → xoá mọi điểm hồng, kể cả trong lòng vật
  'alpha'   ảnh đã có nền trong suốt (xuất từ Canva)            → chỉ cắt khung và bỏ mẩu rời

Sau khi xoá nền, làm sạch thêm:
  pockets  xoá túi nền kín bên trong vật (khe hàng rào, lòng quầy, khoang thuyền), chỉ khi màu túi trùng màu nền
  ground   xoá mảng đất vẽ sẵn dưới chân vật (từ tỉ lệ chiều cao này trở xuống); bóng đổ do game tự vẽ
  water    xoá mảng nước vẽ sẵn (Chùa Cầu, bến đá, thuyền) để lộ mặt nước của bản đồ
  defringe bỏ viền sáng màu nền ở mép, rồi làm mềm mép 1 px
"""
import numpy as np
from PIL import Image
from scipy import ndimage

Image.MAX_IMAGE_PIXELS = None
SQ3 = np.sqrt(3)


def hsv(a):
    """a: mảng float 0..1 (H×W×3) → (hue độ, saturation, value)."""
    mx, mn = a.max(axis=2), a.min(axis=2)
    s = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    hue = np.degrees(np.arctan2(SQ3 * (g - b), 2 * r - g - b)) % 360
    return hue, s, mx


def bg_like(a, kind):
    hue, s, v = hsv(a)
    if kind == 'paper':
        return (v > 0.8) & (s < 0.62) & (((hue > 22) & (hue < 58)) | (s < 0.12))
    if kind == 'white':
        return (v > 0.9) & (s < 0.07)
    if kind == 'magenta':
        r, g, b = a[..., 0], a[..., 1], a[..., 2]
        return (r > 0.7) & (b > 0.62) & (g < 0.5) & (np.abs(r - b) < 0.22) & (r - g > 0.35)
    raise ValueError(kind)


def touching_border(mask):
    """Các vùng liên thông của mask có chạm mép khung."""
    lab, n = ndimage.label(mask)
    if not n:
        return mask & False
    edge = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
    return np.isin(lab, edge[edge > 0])


def ref_color(a, bg):
    """Màu nền tham chiếu = trung vị các điểm nền."""
    pts = a[bg]
    return np.median(pts, axis=0) if len(pts) else np.array([0.96, 0.85, 0.6])


def dist(a, ref):
    return np.sqrt(((a - ref) ** 2).sum(axis=-1))


def cutout(sheet, box, kind='paper', pockets=True, pocket_min=30, pocket_tol=0.09, ground=None, ground_tol=0.2,
           water=None, keep=0.06, keep_largest=False, defringe=True, erase=(), despill=False, bg_tol=None, dehalo_light=False):
    """Cắt box (x0, y0, x1, y1) từ sheet (ảnh PIL) → ảnh RGBA đã tách nền, cắt sát vật.

    ground: tỉ lệ chiều cao (0–1) – từ đó trở xuống, xoá các điểm có màu gần màu nền/đất (mảng đất vẽ sẵn).
    water:  tỉ lệ chiều cao – từ đó trở xuống, xoá các điểm màu nước (xanh lơ).
    erase:  các hình chữ nhật (tỉ lệ x0, y0, x1, y1 trong khung) xoá hẳn, dùng cho mẩu vật bên cạnh lọt vào khung.
    """
    x0, y0, x1, y1 = box
    crop = sheet.crop((x0, y0, x1, y1)).convert('RGBA')
    arr = np.asarray(crop).astype(float) / 255
    a, alpha_in = arr[..., :3], arr[..., 3]
    h, w = alpha_in.shape

    if kind == 'alpha':
        bg = alpha_in < 0.5
        ref = np.array([0.0, 0.0, 0.0])
    elif kind == 'magenta':
        bg = bg_like(a, 'magenta')
        ref = np.array([1.0, 0.1, 1.0])
    elif bg_tol is not None:
        # Nền chỉ là các điểm sát màu giấy ở mép khung (dùng khi màu da / áo gần màu giấy, tránh xoá lan vào mặt)
        rim = np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]])
        ref = np.median(rim, axis=0)
        bg = touching_border(dist(a, ref) < bg_tol)
    else:
        bg = touching_border(bg_like(a, kind))
        ref = ref_color(a, bg)
    fg = ~bg

    if pockets and kind in ('paper', 'white'):
        # Túi nền kín: vùng giống nền không chạm mép, màu trung bình sát màu nền
        cand = bg_like(a, kind) & fg
        lab, n = ndimage.label(cand)
        if n:
            sizes = ndimage.sum(np.ones_like(lab), lab, index=np.arange(1, n + 1))
            means = np.stack([ndimage.mean(a[..., c], lab, index=np.arange(1, n + 1)) for c in range(3)], axis=1)
            near = np.sqrt(((means - ref) ** 2).sum(axis=1)) < pocket_tol
            drop = np.arange(1, n + 1)[(sizes >= pocket_min) & near]
            fg &= ~np.isin(lab, drop)

    hue, s, v = hsv(a)
    if ground is not None:
        below = np.zeros((h, w), bool)
        below[int(h * ground):] = True
        # đất vẽ sẵn: sáng, ít bão hoà, tông vàng – nâu – hồng nhạt, gần màu nền
        dirt = (v > 0.55) & (s < 0.6) & ((hue < 60) | (hue > 330)) & (dist(a, ref) < ground_tol + 0.25)
        fg &= ~(below & dirt)
    if water is not None:
        below = np.zeros((h, w), bool)
        below[int(h * water):] = True
        wet = (hue > 150) & (hue < 220) & (s > 0.1) & (v > 0.35)
        fg &= ~(below & wet)
    for ex0, ey0, ex1, ey1 in erase:
        fg[int(h * ey0):int(h * ey1), int(w * ex0):int(w * ex1)] = False

    # Giữ các mảng lớn (bỏ mẩu vật bên cạnh lọt vào khung, vệt cọ, chữ watermark)
    lab, n = ndimage.label(fg)
    if n:
        sizes = ndimage.sum(np.ones_like(lab), lab, index=np.arange(1, n + 1))
        if keep_largest:
            fg = lab == (np.argmax(sizes) + 1)
        else:
            fg = np.isin(lab, np.arange(1, n + 1)[sizes >= sizes.max() * keep])

    if defringe and kind != 'alpha':
        for _ in range(2):
            edge = fg & ~ndimage.binary_erosion(fg)
            if kind == 'magenta':
                r, g, b = a[..., 0], a[..., 1], a[..., 2]
                bad = (r - g > 0.25) & (b - g > 0.2) & (np.abs(r - b) < 0.3)
            else:
                bad = (dist(a, ref) < 0.22) & (v > 0.7)
            fg &= ~(edge & bad)

    if kind == 'alpha':
        alpha = np.where(fg, alpha_in, 0)
        rgb = a
        if despill:
            # Ảnh đã tách khỏi nền hồng (#FF00FF) còn viền tím: bỏ điểm ánh tím sát mép, rồi kéo màu vật ra mép
            r, g, b = a[..., 0], a[..., 1], a[..., 2]
            tint = (r - g > 0.15) & (b - g > 0.1) & (np.abs(r - b) < 0.35)
            solid = alpha > 0.5
            near_edge = ndimage.binary_dilation(~solid, iterations=3)
            alpha = np.where(near_edge & tint, 0, alpha)
            solid = alpha > 0.5
            idx = ndimage.distance_transform_edt(~solid, return_distances=False, return_indices=True)
            rgb = np.where(solid[..., None], a, a[idx[0], idx[1]])
            alpha = np.where(solid, alpha, np.minimum(alpha, 0.5))
    else:
        # Kéo màu vật ra 2 px quanh mép rồi làm mềm mép, để mép không ánh màu nền
        idx = ndimage.distance_transform_edt(~fg, return_distances=False, return_indices=True)
        rgb = a[idx[0], idx[1]]
        soft = ndimage.gaussian_filter(fg.astype(float), 0.6)
        alpha = np.clip((soft - 0.2) / 0.6, 0, 1) * (ndimage.binary_dilation(fg))
    out = np.dstack([rgb, alpha])
    img = Image.fromarray((out * 255).round().astype(np.uint8), 'RGBA')
    if dehalo_light:
        img = dehalo(img)
    bbox = Image.fromarray(((np.asarray(img)[..., 3] > 10) * 255).astype(np.uint8)).getbbox()
    return img.crop(bbox) if bbox else img


def dehalo(img):
    """Ảnh đã tách nền bằng công cụ khác (Canva, Gemini) hay còn quầng giấy sáng bán trong suốt quanh vật, và đôi khi
    thủng lỗ bán trong suốt bên trong (má, mũi, kính xe). Xoá điểm sáng bán trong suốt nối liền ra nền; không đụng điểm
    đục; lỗ bán trong suốt nằm bên trong vật thì lấp lại cho đục."""
    a = np.asarray(img.convert('RGBA')).astype(float) / 255
    rgb, al = a[..., :3], a[..., 3].copy()
    _, s, v = hsv(rgb)
    light = (v > 0.72) & (s < 0.45)
    clear = al < 0.5
    halo = ndimage.binary_propagation(clear, mask=clear | (light & (al < 0.97))) & ~clear
    al = np.where(halo, 0, al)
    holes = (al > 0.05) & (al < 0.97) & ~ndimage.binary_dilation(al < 0.05, iterations=2)
    al = np.where(holes, 1.0, al)
    lab, n = ndimage.label(al > 0.3)
    if n > 1:
        sizes = ndimage.sum(np.ones_like(lab), lab, index=np.arange(1, n + 1))
        al = np.where(np.isin(lab, np.arange(1, n + 1)[sizes >= sizes.max() * 0.02]), al, 0)
    return Image.fromarray(np.dstack([rgb * 255, al * 255]).round().astype(np.uint8), 'RGBA')


def seamless_tile(img, size=64, blend=0.25):
    """Ô nền lặp liền mạch từ một mảng hoạ tiết vuông: trộn dần mép phải vào mép trái, mép dưới vào mép trên
    (đoạn trộn chiếm blend kích thước), rồi thu nhỏ về size×size."""
    a = np.asarray(img.convert('RGB')).astype(float)
    n = min(a.shape[0], a.shape[1])
    m = int(n * blend)
    core = n - m
    a = a[:n, :n]
    w = np.linspace(0, 1, m)[None, :, None]
    a[:, :m] = a[:, core:core + m] * (1 - w) + a[:, :m] * w
    a = a[:, :core]
    w = np.linspace(0, 1, m)[:, None, None]
    a[:m] = a[core:core + m] * (1 - w) + a[:m] * w
    a = a[:core]
    return Image.fromarray(a.round().astype(np.uint8), 'RGB').resize((size, size), Image.LANCZOS)


def save_webp(img, path):
    img.save(path, 'WEBP', quality=90, alpha_quality=100, method=6)


def contact_sheet(images, path, cols=6, cw=260, ch=260, bg=(36, 70, 60)):
    """Bảng xem trước: mỗi ảnh trên nền xanh đậm, tô hồng phần còn màu giấy để dễ soi sót nền."""
    from PIL import ImageDraw
    n = len(images)
    sheet = Image.new('RGB', (cols * cw, max(1, (n + cols - 1) // cols) * ch), bg)
    d = ImageDraw.Draw(sheet)
    for i, (name, im) in enumerate(images):
        t = im.copy()
        t.thumbnail((cw - 12, ch - 28))
        x, y = (i % cols) * cw + 6, (i // cols) * ch + 4
        sheet.paste(t, (x, y), t)
        d.text((x, y + ch - 22), name, fill=(255, 255, 255))
    sheet.save(path, quality=88)


def recolor(frame, target):
    """Đổi màu áo dài tím (sắc 265–330°) sang màu target, giữ độ sáng tối của nếp áo và nét mực."""
    a = np.asarray(frame).astype(float) / 255
    rgb = a[..., :3]
    hue, s, v = hsv(rgb)
    dress = (hue > 265) & (hue < 330) & (s > 0.15) & (v > 0.18) & (a[..., 3] > 0)
    lum = rgb.mean(axis=2)
    ratio = lum / np.median(lum[dress])
    new = np.clip(np.array(target, float)[None, None, :] / 255 * ratio[..., None], 0, 1)
    rgb = np.where(dress[..., None], new, rgb)
    return Image.fromarray((np.dstack([rgb, a[..., 3]]) * 255).round().astype(np.uint8), 'RGBA')

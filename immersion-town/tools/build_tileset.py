"""Vẽ bộ ô 64×64 phong cách Đông Hồ cho Immersion Town (nét mực, mảng màu bẹt).

Kết quả:
  assets/tiles/hoian_dongho_grid_tileset_64x64.png  (8 cột × 9 hàng, đúng thứ tự trong hoian_dongho_tileset_64x64.json)
  assets/tiles/hoian_brick_pavement_dongho.png      (mảng lát đá xám 4×4 ô, lặp liền mạch)

Thứ tự ô (id):
  0 đá xám lát đường · 1 nền nhựa bãi xe · 2 nền nhựa có vạch đỗ · 3–7 đá xám biến thể
  8 gạch đất nung · 9–15 biến thể · 16 nước sông Hoài · 17 nước có lá sen · 18 kè đá bờ sông · 19–23 nước biến thể
  24 tường vàng di sản · 25–31 biến thể · 32 cỏ rêu · 33 cỏ có hoa · 34 ruộng lúa xanh · 35 ruộng lúa chín
  36 đường đất · 37 sàn gỗ bến thuyền · 38 sàn gỗ biến thể · 39 cát
  40–42 lòng đường nhựa xám ấm · 43 lòng đường có bóng bó vỉa ở mép trên
  44–46 vỉa hè đá phiến · 47 vỉa hè có bó vỉa ở mép dưới · 48 vỉa hè có bó vỉa ở mép trên · 49–50 đá lát quảng trường
  56–71 hình thu nhỏ vật thể (để xem trước trong Tiled)
Chạy lại:  python immersion-town/tools/build_tileset.py
"""
import random
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets' / 'tiles'
OUT.mkdir(parents=True, exist_ok=True)
T = 64
INK = (26, 26, 26)
GROUT = (77, 73, 67)          # #4D4943
STONES = [(129, 123, 114), (104, 99, 92), (154, 148, 138), (138, 131, 121), (118, 112, 104)]  # #817B72, #68635C, #9A948A …
PAPER = (245, 230, 200)


def jitter(c, rnd, amt=8):
    return tuple(max(0, min(255, v + rnd.randint(-amt, amt))) for v in c)


def shade(c, rnd, amt=8):
    """Đổi độ sáng đều cả 3 kênh (không làm lệch sắc màu như jitter)."""
    k = rnd.randint(-amt, amt)
    return tuple(max(0, min(255, v + k)) for v in c)


def speckle(d, rnd, box, color, n):
    x0, y0, x1, y1 = box
    if x1 - 2 <= x0 or y1 - 2 <= y0:
        return
    for _ in range(n):
        x = rnd.randint(x0, x1 - 2)
        y = rnd.randint(y0, y1 - 2)
        d.rectangle([x, y, x + 1, y + 1], fill=color)


def stone_tile(seed):
    rnd = random.Random(seed)
    im = Image.new('RGB', (T, T), GROUT)
    d = ImageDraw.Draw(im)
    rows = [(1, 21), (22, 42), (43, 63)]
    for r, (y0, y1) in enumerate(rows):
        cuts = rnd.choice([[32], [24], [40], [20, 42], [16, 38], [26, 46]])
        xs = [1] + cuts + [63]
        for i in range(len(xs) - 1):
            x0, x1 = xs[i] + (1 if i else 0), xs[i + 1] - 1
            col = jitter(rnd.choice(STONES), rnd, 6)
            d.rounded_rectangle([x0, y0, x1, y1 - 1], radius=4, fill=col, outline=INK, width=2)
            d.line([x0 + 4, y0 + 3, x1 - 6, y0 + 3], fill=jitter((172, 166, 156), rnd, 6), width=1)
            speckle(d, rnd, (x0 + 3, y0 + 5, x1 - 3, y1 - 3), (88, 84, 78), 3)
    return im


ROAD = (157, 142, 121)        # nhựa đường xám ấm như tranh bãi sạc xe điện phố cổ
ROAD_DARK = (140, 126, 106)
ROAD_LIGHT = (172, 158, 136)
SLABS = [(116, 104, 89), (110, 99, 86), (122, 110, 94), (106, 98, 86)]   # đá phiến vỉa hè xám nâu
PLAZA = [(152, 140, 121), (158, 146, 126), (146, 135, 117)]             # đá lát quảng trường, sáng hơn
KERB_TOP = (156, 144, 124)
KERB_FACE = (92, 84, 73)


def asphalt_tile(seed, line=False, cracks=1, shade=False):
    """Nhựa đường: nền xám ấm, lấm tấm sạn, vài nét mực ngắn làm vết nứt.
    line: vạch sơn ô đỗ ở mép trái; shade: dải tối ở mép trên (bóng bó vỉa hè phía bắc)."""
    rnd = random.Random(seed)
    im = Image.new('RGB', (T, T), ROAD)
    d = ImageDraw.Draw(im)
    speckle(d, rnd, (0, 0, T, T), ROAD_DARK, 46)
    speckle(d, rnd, (0, 0, T, T), ROAD_LIGHT, 34)
    for _ in range(cracks):  # vết nứt: đường gấp khúc mảnh
        x, y = rnd.randint(8, 44), rnd.randint(16 if shade else 8, 54)
        pts = [(x, y)]
        for _ in range(3):
            x, y = x + rnd.randint(3, 7), y + rnd.randint(-3, 3)
            pts.append((x, y))
        d.line(pts, fill=(96, 86, 72), width=1)
    if shade:
        d.rectangle([0, 0, T, 9], fill=(117, 107, 94))
        for x in range(0, T, 8):
            d.line([x, 10, x + 4, 10 + rnd.randint(0, 2)], fill=(117, 107, 94), width=2)
    if line:
        d.rectangle([0, 0, 4, T], fill=(236, 228, 210))
        d.line([5, 0, 5, T], fill=INK, width=1)
    return im


def slab_row(d, rnd, y0, y1, colors, cuts_pool, moss=0.15):
    """Một hàng đá phiến từ y0 tới y1: đường mạch mực, viền sáng phía trên, đôi vết nứt và rêu."""
    cuts = rnd.choice(cuts_pool)
    xs = [0] + cuts + [T]
    for i in range(len(xs) - 1):
        x0, x1 = xs[i], xs[i + 1]
        col = shade(rnd.choice(colors), rnd, 6)
        d.rectangle([x0, y0, x1, y1], fill=col)
        d.line([x0 + 3, y0 + 2, x1 - 4, y0 + 2], fill=tuple(min(255, v + 26) for v in col), width=1)
        speckle(d, rnd, (x0 + 2, y0 + 4, x1 - 2, y1 - 2), tuple(v - 14 for v in col), 3)
        if rnd.random() < moss:
            mx = rnd.randint(x0 + 2, max(x0 + 3, x1 - 12))
            d.ellipse([mx, y1 - 7, mx + 10, y1 - 2], fill=(96, 110, 66))
        if rnd.random() < 0.15 and x1 - x0 > 18:
            cx = rnd.randint(x0 + 6, x1 - 8)
            d.line([cx, y0 + 5, cx + rnd.randint(-4, 4), y0 + (y1 - y0) // 2], fill=(70, 62, 54), width=1)
        d.line([x0, y0, x0, y1], fill=INK, width=2)
    d.line([0, y0, T, y0], fill=INK, width=2)


def slab_tile(seed, kerb=None, plaza=False):
    """Vỉa hè lát đá phiến chữ nhật so le (tranh mẫu phố cổ).
    kerb='s': bó vỉa ở mép dưới, thấy cả mặt đứng (vỉa hè nằm phía bắc lòng đường);
    kerb='n': bó vỉa ở mép trên (vỉa hè nằm phía nam lòng đường);
    plaza: đá lát quảng trường, tấm vuông lớn và sáng hơn."""
    rnd = random.Random(seed)
    im = Image.new('RGB', (T, T), (70, 64, 56))
    d = ImageDraw.Draw(im)
    top, bottom = (10, T) if kerb == 'n' else (0, 46 if kerb == 's' else T)
    if plaza:
        rows = [(top, top + (bottom - top) // 2), (top + (bottom - top) // 2, bottom)]
        pool = [[32], [28], [36]]
        colors = PLAZA
    else:
        h = (bottom - top) / 2
        rows = [(round(top + h * i), round(top + h * (i + 1))) for i in range(2)]
        pool = [[24], [40], [30], [20, 46], [36]]
        colors = SLABS
    for y0, y1 in rows:
        slab_row(d, rnd, y0, y1, colors, pool, moss=0.04 if plaza else 0.08)
    if kerb == 's':
        d.rectangle([0, 46, T, 53], fill=KERB_TOP)
        d.rectangle([0, 54, T, T], fill=KERB_FACE)
        d.line([0, 46, T, 46], fill=INK, width=2)
        d.line([0, 54, T, 54], fill=INK, width=1)
        d.line([0, T - 1, T, T - 1], fill=INK, width=2)
        for x in (0, 32):
            d.line([x, 46, x, T], fill=INK, width=1)
    elif kerb == 'n':
        d.rectangle([0, 0, T, 9], fill=KERB_TOP)
        d.line([0, 0, T, 0], fill=INK, width=2)
        d.line([0, 9, T, 9], fill=INK, width=2)
        for x in (0, 32):
            d.line([x, 0, x, 9], fill=INK, width=1)
    return im


def brick_tile(seed):
    rnd = random.Random(seed)
    im = Image.new('RGB', (T, T), (138, 74, 44))
    d = ImageDraw.Draw(im)
    for r in range(4):
        y0 = r * 16 + 1
        off = 16 if r % 2 else 0
        for x in range(-32 + off, T, 32):
            x0, x1 = max(1, x + 1), min(T - 2, x + 31)
            if x1 - x0 < 6:
                continue
            col = jitter((196, 111, 69), rnd, 10)
            d.rectangle([x0, y0, x1, y0 + 13], fill=col, outline=INK, width=1)
            speckle(d, rnd, (x0 + 2, y0 + 2, x1 - 2, y0 + 12), (160, 86, 52), 2)
    return im


def water_tile(seed, lotus=False, edge=False):
    rnd = random.Random(seed)
    im = Image.new('RGB', (T, T), (27, 77, 62))     # #1B4D3E
    d = ImageDraw.Draw(im)
    for _ in range(4):
        x = rnd.randint(4, 44)
        y = rnd.randint(edge * 24 + 6, 56)
        d.arc([x, y, x + 16, y + 8], 200, 340, fill=(64, 120, 100), width=2)
    d.line([rnd.randint(4, 30), rnd.randint(edge * 24 + 10, 58), rnd.randint(34, 58), rnd.randint(edge * 24 + 10, 58)], fill=(46, 102, 84), width=1)
    if lotus:
        cx, cy = rnd.randint(18, 44), rnd.randint(26, 44)
        d.ellipse([cx - 10, cy - 7, cx + 10, cy + 7], fill=(78, 122, 58), outline=INK, width=2)
        d.line([cx, cy, cx + 9, cy - 3], fill=INK, width=2)
    if edge:
        for x in range(0, T, 16):
            col = jitter(STONES[2], rnd, 8)
            d.rounded_rectangle([x + 1, 1, x + 15, 18], radius=3, fill=col, outline=INK, width=2)
        d.rectangle([0, 19, T, 22], fill=(60, 60, 54))
    return im


def wall_tile(seed):
    rnd = random.Random(seed)
    im = Image.new('RGB', (T, T), (230, 180, 34))   # #E6B422
    d = ImageDraw.Draw(im)
    d.rectangle([0, 0, T, 9], fill=(166, 75, 42))
    d.line([0, 9, T, 9], fill=INK, width=2)
    for _ in range(3):
        x = rnd.randint(2, 48)
        d.ellipse([x, 52, x + 14, 66], fill=(122, 143, 58))
    speckle(d, rnd, (2, 12, 62, 50), (210, 160, 30), 12)
    d.rectangle([0, 0, T - 1, T - 1], outline=INK, width=2)
    return im


def grass_tile(seed, flowers=False):
    rnd = random.Random(seed)
    im = Image.new('RGB', (T, T), (110, 139, 61))   # xanh rêu
    d = ImageDraw.Draw(im)
    for _ in range(7):
        x, y = rnd.randint(4, 56), rnd.randint(6, 58)
        d.line([x, y, x - 3, y - 6], fill=(58, 86, 34), width=2)
        d.line([x, y, x + 3, y - 6], fill=(58, 86, 34), width=2)
    speckle(d, rnd, (0, 0, T, T), (132, 160, 80), 25)
    if flowers:
        for _ in range(3):
            x, y = rnd.randint(6, 54), rnd.randint(6, 54)
            d.ellipse([x, y, x + 7, y + 7], fill=(233, 30, 99), outline=INK, width=1)
            d.ellipse([x + 2, y + 2, x + 5, y + 5], fill=(230, 180, 34))
    return im


def paddy_tile(seed, ripe=False):
    rnd = random.Random(seed)
    base = (196, 160, 58) if ripe else (96, 128, 60)
    stalk = (230, 196, 70) if ripe else (150, 190, 82)
    im = Image.new('RGB', (T, T), base)
    d = ImageDraw.Draw(im)
    for r in range(4):
        for c in range(4):
            x = c * 16 + 8 + rnd.randint(-2, 2)
            y = r * 16 + 12
            for dx in (-4, 0, 4):
                d.line([x, y, x + dx, y - 9], fill=INK, width=3)
                d.line([x, y, x + dx, y - 9], fill=stalk, width=1)
    return im


def dirt_tile(seed):
    rnd = random.Random(seed)
    im = Image.new('RGB', (T, T), (184, 146, 94))
    d = ImageDraw.Draw(im)
    for _ in range(6):
        x, y = rnd.randint(4, 56), rnd.randint(4, 56)
        d.ellipse([x, y, x + 6, y + 4], fill=(150, 116, 74), outline=INK, width=1)
    speckle(d, rnd, (0, 0, T, T), (160, 126, 80), 20)
    return im


def wood_tile(seed):
    rnd = random.Random(seed)
    im = Image.new('RGB', (T, T), (60, 40, 30))
    d = ImageDraw.Draw(im)
    for r in range(4):
        y0 = r * 16 + 1
        d.rectangle([1, y0, T - 2, y0 + 13], fill=jitter((156, 122, 91), rnd, 10), outline=INK, width=2)
        d.line([6, y0 + 7, T - 8, y0 + 7], fill=(128, 96, 70), width=1)
    d.ellipse([4, 4, 9, 9], fill=INK)
    d.ellipse([T - 10, T - 10, T - 5, T - 5], fill=INK)
    return im


def sand_tile(seed):
    rnd = random.Random(seed)
    im = Image.new('RGB', (T, T), (226, 204, 150))
    d = ImageDraw.Draw(im)
    speckle(d, rnd, (0, 0, T, T), (196, 172, 120), 40)
    return im


def item_thumb(name):
    src = ROOT / 'assets' / 'items' / f'{name}.webp'
    im = Image.new('RGBA', (T, T), PAPER + (255,))
    if src.exists():
        it = Image.open(src).convert('RGBA')
        it.thumbnail((58, 58))
        im.alpha_composite(it, ((T - it.width) // 2, (T - it.height) // 2))
    return im.convert('RGB')


def blank():
    return Image.new('RGB', (T, T), PAPER)


def main():
    tiles = {}
    tiles[0] = stone_tile(1)
    tiles[1] = asphalt_tile(2)
    tiles[2] = asphalt_tile(3, line=True)
    for i in range(3, 8):
        tiles[i] = stone_tile(10 + i)
    for i in range(8, 16):
        tiles[i] = brick_tile(20 + i)
    tiles[16] = water_tile(30)
    tiles[17] = water_tile(31, lotus=True)
    tiles[18] = water_tile(32, edge=True)
    for i in range(19, 24):
        tiles[i] = water_tile(30 + i)
    for i in range(24, 32):
        tiles[i] = wall_tile(40 + i)
    tiles[32] = grass_tile(50)
    tiles[33] = grass_tile(51, flowers=True)
    tiles[34] = paddy_tile(52)
    tiles[35] = paddy_tile(53, ripe=True)
    tiles[36] = dirt_tile(54)
    tiles[37] = wood_tile(55)
    tiles[38] = wood_tile(56)
    tiles[39] = sand_tile(57)
    # Lòng đường nhựa, vỉa hè đá phiến và bó vỉa (theo tranh mẫu bãi sạc xe điện phố cổ, 08/10/2026)
    tiles[40] = asphalt_tile(60)
    tiles[41] = asphalt_tile(61, cracks=0)
    tiles[42] = asphalt_tile(62, cracks=0)
    tiles[43] = asphalt_tile(63, shade=True, cracks=0)
    tiles[44] = slab_tile(64)
    tiles[45] = slab_tile(65)
    tiles[46] = slab_tile(66)
    tiles[47] = slab_tile(67, kerb='s')
    tiles[48] = slab_tile(68, kerb='n')
    tiles[49] = slab_tile(69, plaza=True)
    tiles[50] = slab_tile(70, plaza=True)
    for i, name in zip(range(56, 64), ['ev_charger', 'pedestrian_sign', 'lotus_lantern', 'scooter', 'solar_outlet', 'ocop_tea', 'silk_roll', 'iced_tea']):
        tiles[i] = item_thumb(name)
    sheet = Image.new('RGB', (8 * T, 9 * T), PAPER)
    for i in range(72):
        sheet.paste(tiles.get(i, blank()), ((i % 8) * T, (i // 8) * T))
    sheet.save(OUT / 'hoian_dongho_grid_tileset_64x64.png', optimize=True)
    pave = Image.new('RGB', (4 * T, 4 * T))
    variants = [0, 3, 4, 5, 6, 7]
    rnd = random.Random(7)
    for y in range(4):
        for x in range(4):
            pave.paste(tiles[rnd.choice(variants)], (x * T, y * T))
    pave.save(OUT / 'hoian_brick_pavement_dongho.png', optimize=True)
    print('Đã ghi', OUT / 'hoian_dongho_grid_tileset_64x64.png', 'và', OUT / 'hoian_brick_pavement_dongho.png')


if __name__ == '__main__':
    main()

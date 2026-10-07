"""Tách vật từ tờ 'Phố cổ Hội An & Làng rau Trà Quế' (Game Asset/hoian_traque_asset_sheet_2026.png) vào assets/deco/.

Chạy:  python immersion-town/tools/cut_traque.py
"""
import tempfile
from pathlib import Path

import numpy as np
from collections import deque
from PIL import Image


def cutout_paper(box):
    """Xoá nền giấy vàng nâu (H 25–55°, S 0.18–0.6, V > 0.8) loang từ mép khung; nét mực chặn lại."""
    x0, y0, x1, y1 = box
    a = np.asarray(SHEET.crop((x0, y0, x1, y1))).astype(float) / 255
    h, w, _ = a.shape
    mx, mn = a.max(axis=2), a.min(axis=2)
    v = mx
    s = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    hue = np.degrees(np.arctan2(np.sqrt(3) * (g - b), 2 * r - g - b)) % 360
    paper = (v > STRENGTH) & (s < 0.62) & (((hue > 22) & (hue < 58)) | (s < 0.12))
    bg = np.zeros((h, w), bool)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if paper[y, x] and not bg[y, x]:
                bg[y, x] = True
                q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if paper[y, x] and not bg[y, x]:
                bg[y, x] = True
                q.append((y, x))
    while q:
        y, x = q.popleft()
        for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
            if 0 <= ny < h and 0 <= nx < w and paper[ny, nx] and not bg[ny, nx]:
                bg[ny, nx] = True
                q.append((ny, nx))
    fg = ~bg
    # Bỏ mảng nhỏ rời rạc (vệt cọ, mẩu vật bên cạnh)
    seen = np.zeros_like(fg)
    comps = []
    for y in range(h):
        for x in range(w):
            if fg[y, x] and not seen[y, x]:
                pts = []
                q = deque([(y, x)])
                seen[y, x] = True
                while q:
                    cy, cx = q.popleft()
                    pts.append((cy, cx))
                    for ny, nx in ((cy - 1, cx), (cy + 1, cx), (cy, cx - 1), (cy, cx + 1)):
                        if 0 <= ny < h and 0 <= nx < w and fg[ny, nx] and not seen[ny, nx]:
                            seen[ny, nx] = True
                            q.append((ny, nx))
                comps.append(pts)
    big = max(len(c) for c in comps)
    keep = np.zeros_like(fg)
    for c in comps:
        if len(c) >= big * KEEP_ONE.get(CURRENT, KEEP):
            ys, xs = zip(*c)
            keep[list(ys), list(xs)] = True
    rgb = (a * 255).astype(np.uint8)
    img = Image.fromarray(np.dstack([rgb, np.where(keep, 255, 0).astype(np.uint8)]), 'RGBA')
    return img.crop(img.getbbox())


STRENGTH = 0.8
KEEP = 0.08
KEEP_ONE = {'tq_noodle': 0.5, 'tq_ebike': 0.5, 'tq_cart': 0.5, 'tq_house2': 0.3}
CURRENT = None


S = Path(tempfile.gettempdir()) / 'immersion-town-deco'  # ảnh xem trước
(S / 'deco').mkdir(parents=True, exist_ok=True)
GA = Path(r'C:\Users\Esther\Documents\NK 26-27\SÁNG TẠO AI\Game Asset')
OUT = Path(r'C:\hayuongsting.github.io\immersion-town\assets\deco')
K = 2752 / 2000  # toạ độ đo trên ảnh xem trước rộng 2000 px

# tên: (x0, y0, x1, y1) đo trên ảnh xem trước 2000×1116
BOXES = {
    'tq_bridge': (40, 360, 280, 537), 'tq_house2': (308, 346, 548, 532), 'tq_hut': (552, 340, 795, 534),
    'tq_gate': (818, 368, 966, 534), 'tq_porch': (1000, 350, 1130, 528), 'tq_noodle': (1136, 380, 1386, 530),
    'tq_charger': (70, 615, 190, 764), 'tq_solar': (265, 610, 470, 754), 'tq_qr': (570, 586, 695, 764),
    'tq_lamp': (796, 586, 900, 764), 'tq_bins': (936, 655, 1050, 764),
    'tq_veg': (1070, 636, 1245, 760), 'tq_herbs': (1242, 620, 1345, 750), 'tq_bamboo': (1370, 586, 1525, 790),
    'tq_flame_tree': (1540, 616, 1750, 794), 'tq_lanterns': (1770, 582, 1990, 702), 'tq_boat': (1770, 690, 1995, 792),
    'tq_cyclo': (286, 830, 404, 944), 'tq_water_pole': (450, 840, 530, 948), 'tq_baskets': (574, 830, 760, 944),
    'tq_buffalo': (850, 834, 1036, 940), 'tq_tea_table': (1100, 834, 1270, 944), 'tq_ebike': (1298, 832, 1399, 944),
    'tq_cart': (1407, 832, 1512, 944), 'tq_stall': (1590, 830, 1736, 950), 'tq_drink_cart': (1820, 834, 1945, 944),
    'tq_baichoi': (350, 975, 464, 1090), 'tq_lotus': (510, 1005, 670, 1080), 'tq_lion': (686, 985, 810, 1090),
    'tq_drum': (818, 985, 920, 1090), 'tq_festival_people': (926, 985, 1056, 1090), 'tq_tourists': (1104, 985, 1246, 1090),
    'tq_artisan': (1250, 985, 1326, 1090),
}

SHEET = Image.open(GA / 'hoian_traque_asset_sheet_2026.png').convert('RGB')
made = {}
for name, (x0, y0, x1, y1) in BOXES.items():
    CURRENT = name
    im = cutout_paper((round(x0 * K), round(y0 * K), round(x1 * K), round(y1 * K)))
    im.save(OUT / f'{name}.webp', 'WEBP', quality=88, method=6)
    im.save(S / 'deco' / f'{name}.png')
    made[name] = im.size
cols, cw, ch = 7, 230, 230
board = Image.new('RGBA', (cols * cw, ((len(made) + cols - 1) // cols) * ch), (40, 70, 60, 255))
for i, name in enumerate(made):
    im = Image.open(S / 'deco' / f'{name}.png')
    im.thumbnail((cw - 10, ch - 10))
    board.alpha_composite(im, ((i % cols) * cw + 5, (i // cols) * ch + 5))
board.convert('RGB').save(S / 'tq_contact.jpg', quality=85)
print(made)

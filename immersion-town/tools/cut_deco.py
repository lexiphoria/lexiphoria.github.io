"""Tách vật trang trí từ 2 tờ tài nguyên trong Game Asset thành ảnh WebP nền trong suốt (assets/deco/).

Chạy:  python immersion-town/tools/cut_deco.py
"""
import tempfile
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image

S = Path(tempfile.gettempdir()) / 'immersion-town-deco'  # ảnh xem trước
S.mkdir(exist_ok=True)
GA = Path(r'C:\Users\Esther\Documents\NK 26-27\SÁNG TẠO AI\Game Asset')
OUT = Path(r'C:\hayuongsting.github.io\immersion-town\assets\deco')
OUT.mkdir(parents=True, exist_ok=True)
(S / 'deco').mkdir(exist_ok=True)
SHEET = Image.open(GA / '1791371234794_6752617389871416635_6752617389871416635_5101295598f49f4a60871ec3a9f12ca5.jpg').convert('RGB')

# tên: (x0, y0, x1, y1) trên tờ 1254×1254
BOXES = {
    'dock_posts': (798, 152, 930, 270), 'dock_tyres': (938, 152, 1100, 270),
    'wall_plain': (12, 388, 108, 585), 'wall_flower': (112, 388, 204, 585), 'wall_flower2': (210, 388, 300, 585),
    'wall_lantern': (306, 388, 392, 585), 'wall_window': (398, 392, 490, 585), 'wall_door_awning': (492, 398, 594, 585),
    'wall_door': (598, 392, 696, 585), 'wall_balcony': (700, 392, 818, 585), 'wall_arch': (826, 392, 982, 585),
    'wall_arch_narrow': (986, 392, 1060, 585), 'wall_arch_flower': (1062, 392, 1244, 585),
    'lantern_red': (16, 586, 94, 735), 'lantern_yellow': (94, 586, 152, 715), 'lantern_green': (206, 586, 270, 715),
    'lantern_blue': (268, 586, 330, 715), 'lantern_cream': (328, 586, 390, 715), 'lantern_string': (484, 598, 698, 738),
    'pot_banana': (695, 590, 808, 748), 'pot_palm_red': (806, 594, 906, 748), 'pot_flower_blue': (904, 606, 998, 748),
    'arbor': (992, 582, 1248, 768),
    'pier_rings': (428, 745, 608, 888), 'pier_block': (606, 745, 718, 888), 'pier_long': (722, 745, 914, 888),
    'pier_lamp': (1006, 742, 1244, 912),
    'boat': (10, 890, 360, 1050), 'canopy_left': (468, 890, 684, 1058), 'canopy_right': (664, 890, 838, 1058),
    'charger_green': (836, 900, 920, 1062), 'charger_white': (920, 900, 1000, 1062), 'charger_small': (998, 920, 1072, 1062),
    'charger_box': (1076, 920, 1154, 1062), 'planter_box': (1154, 914, 1244, 1044),
    'pot_banana_red': (10, 1042, 114, 1214), 'pot_plant_blue': (110, 1066, 212, 1214), 'pot_flower_red': (208, 1076, 298, 1214),
    'pot_flower_clay': (294, 1076, 378, 1214), 'bonsai': (376, 1076, 478, 1214),
    'hanging_green': (478, 1060, 572, 1228), 'hanging_flower': (570, 1060, 704, 1220), 'flower_bush': (676, 1136, 792, 1218),
    'stone_lantern': (832, 1084, 908, 1222), 'cloud': (944, 1074, 1157, 1200), 'red_sun': (1156, 1068, 1244, 1162),
}


def cutout(box):
    x0, y0, x1, y1 = box
    a = np.asarray(SHEET.crop((x0, y0, x1, y1))).astype(int)
    h, w, _ = a.shape
    mx, mn = a.max(axis=2), a.min(axis=2)
    paper = (mx > 170) & ((mx - mn) < 90) & (mn > 120)
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
    # Chỉ giữ các mảng lớn (bỏ mẩu vật bên cạnh lọt vào khung)
    fg = ~bg
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
    biggest = max(len(c) for c in comps)
    keep = np.zeros_like(fg)
    for c in comps:
        if len(c) >= biggest * 0.06:
            ys, xs = zip(*c)
            keep[list(ys), list(xs)] = True
    alpha = np.where(keep, 255, 0).astype(np.uint8)
    img = Image.fromarray(np.dstack([a.astype(np.uint8), alpha]), 'RGBA')
    return img.crop(img.getbbox())


PIX = Image.open(GA / '1790931531695_340399584525751092_340399584525751092_f184e6fbc04d231ec58e35f26ebb7407.jpg').convert('RGB')
PIX_BOXES = {
    'px_banana': (1032, 12, 1262, 338), 'px_banana2': (1176, 28, 1432, 262), 'px_fence': (842, 348, 1092, 436),
    'px_rocks': (636, 856, 712, 906), 'px_bush': (1148, 868, 1272, 952), 'px_planter': (212, 572, 348, 702),
}

made = {}
for name, box in PIX_BOXES.items():
    SHEET, keep_sheet = PIX, SHEET
    im = cutout(box)
    SHEET = keep_sheet
    im.save(OUT / f'{name}.webp', 'WEBP', quality=88, method=6)
    im.save(S / 'deco' / f'{name}.png')
    made[name] = im.size
for name, box in BOXES.items():
    im = cutout(box)
    im.save(OUT / f'{name}.webp', 'WEBP', quality=88, method=6)
    im.save(S / 'deco' / f'{name}.png')
    made[name] = im.size
# Bảng xem trước
cols = 8
cw, ch = 170, 200
sheet = Image.new('RGBA', (cols * cw, ((len(made) + cols - 1) // cols) * ch), (40, 70, 60, 255))
for i, name in enumerate(made):
    im = Image.open(S / 'deco' / f'{name}.png')
    im.thumbnail((cw - 10, ch - 30))
    sheet.alpha_composite(im, ((i % cols) * cw + 5, (i // cols) * ch + 5))
sheet.convert('RGB').save(S / 'deco_contact.jpg', quality=85)
print({k: v for k, v in made.items()})

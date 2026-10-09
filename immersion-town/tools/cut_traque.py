"""Tách vật từ tờ 'Phố cổ Hội An & Làng rau Trà Quế' (Game Asset/hoian_traque_asset_sheet_2026.png) vào assets/deco/.

Dùng cutlib: xoá nền giấy loang từ mép, túi nền kín trong lòng vật, mảng đất (ground) và nước (water) vẽ sẵn
dưới chân, viền sáng ở mép. Bảng xem trước ghi ra thư mục tạm (immersion-town-deco/tq_contact.jpg).

Chạy:  python immersion-town/tools/cut_traque.py
"""
import tempfile
from pathlib import Path

from PIL import Image

import cutlib

S = Path(tempfile.gettempdir()) / 'immersion-town-deco'  # ảnh xem trước
(S / 'deco').mkdir(parents=True, exist_ok=True)
GA = Path(r'C:\Users\Esther\Documents\NK 26-27\SÁNG TẠO AI\Game Asset')
OUT = Path(__file__).resolve().parents[1] / 'assets' / 'deco'
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

# Tuỳ chọn riêng: ground/water = tỉ lệ chiều cao bắt đầu xoá đất/nước vẽ sẵn; keep = ngưỡng giữ mảng phụ;
# pockets=False khi phần màu kem là thật (bảng QR).
OPTS = {name: {'ground': 0.8} for name in BOXES}
OPTS.update({
    'tq_bridge': {'water': 0.45, 'ground': 0.72}, 'tq_house2': {'ground': 0.84, 'keep': 0.3},
    'tq_hut': {'ground': 0.62, 'ground_tol': 0.3}, 'tq_gate': {'ground': 0.86}, 'tq_porch': {'ground': 0.84},
    'tq_noodle': {'ground': 0.62, 'keep': 0.5}, 'tq_qr': {'ground': 0.88, 'pockets': False},
    'tq_lamp': {'ground': 0.88}, 'tq_boat': {'water': 0.35}, 'tq_lotus': {'water': 0.3},
    'tq_buffalo': {'ground': 0.7}, 'tq_cyclo': {'ground': 0.72}, 'tq_stall': {'ground': 0.84},
    'tq_ebike': {'ground': 0.8, 'keep': 0.5}, 'tq_cart': {'ground': 0.8, 'keep': 0.5},
    'tq_baichoi': {'ground': 0.84}, 'tq_lion': {'ground': 0.88}, 'tq_drum': {'ground': 0.88},
    'tq_festival_people': {'ground': 0.9}, 'tq_tourists': {'ground': 0.9}, 'tq_artisan': {'ground': 0.9},
    'tq_lanterns': {}, 'tq_bamboo': {'ground': 0.74, 'ground_tol': 0.35, 'pocket_min': 6, 'pocket_tol': 0.14,
                                    'erase': ((0.68, 0.68, 1.0, 0.95),)}, 'tq_flame_tree': {'ground': 0.86},
})

USED = {'tq_bamboo'}  # tre tranh thay tre vẽ bằng mã (09/10/2026)

if __name__ == '__main__':
    sheet = Image.open(GA / 'hoian_traque_asset_sheet_2026.png').convert('RGB')
    made = []
    for name, (x0, y0, x1, y1) in BOXES.items():
        im = cutlib.cutout(sheet, (round(x0 * K), round(y0 * K), round(x1 * K), round(y1 * K)), 'paper', **OPTS[name])
        if (OUT / f'{name}.webp').exists() or name in USED:  # ảnh game dùng; ảnh khác chỉ xem trước
            cutlib.save_webp(im, OUT / f'{name}.webp')
        im.save(S / 'deco' / f'{name}.png')
        made.append((name, im))
    cutlib.contact_sheet(made, S / 'tq_contact.jpg', cols=7)
    print({name: im.size for name, im in made})

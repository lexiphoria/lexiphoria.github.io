"""Tách vật trang trí từ 2 tờ tài nguyên trong Game Asset thành ảnh WebP nền trong suốt (assets/deco/).

Dùng cutlib: xoá nền giấy loang từ mép, túi nền kín (khe hàng rào, lòng cửa vòm, khoang thuyền), nước vẽ sẵn
dưới bến đá và thuyền, viền sáng ở mép. Hàng rào và 2 cây chuối lấy từ bản nền trong suốt của tờ pixel
(Thiết kế chưa có tên (9).png, cùng bố cục với tờ JPG, lớn hơn 1,45%).

Chạy:  python immersion-town/tools/cut_deco.py
"""
import tempfile
from pathlib import Path

from PIL import Image

import cutlib

S = Path(tempfile.gettempdir()) / 'immersion-town-deco'  # ảnh xem trước
(S / 'deco').mkdir(parents=True, exist_ok=True)
GA = Path(r'C:\Users\Esther\Documents\NK 26-27\SÁNG TẠO AI\Game Asset')
OUT = Path(__file__).resolve().parents[1] / 'assets' / 'deco'
OUT.mkdir(parents=True, exist_ok=True)
SHEET = GA / '1791371234794_6752617389871416635_6752617389871416635_5101295598f49f4a60871ec3a9f12ca5.jpg'

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
# Phần màu kem là thật (thân trụ sạc trắng, mây, đèn lồng kem) thì không xoá túi nền
OPTS = {name: {} for name in BOXES}
for name in ('charger_green', 'charger_white', 'charger_small', 'charger_box', 'cloud', 'lantern_cream', 'red_sun'):
    OPTS[name] = {'pockets': False}
for name in ('dock_posts', 'dock_tyres', 'pier_rings', 'pier_block', 'pier_long', 'pier_lamp'):
    OPTS[name] = {'water': 0.5}
OPTS['boat'] = {'water': 0.62}

PIX = GA / '1790931531695_340399584525751092_340399584525751092_f184e6fbc04d231ec58e35f26ebb7407.jpg'
PIX_ALPHA = GA / 'Thiết kế chưa có tên (9).png'  # cùng tờ pixel, nền đã trong suốt
PIX_BOXES = {
    'px_banana': (1032, 12, 1262, 338), 'px_banana2': (1176, 28, 1432, 262), 'px_fence': (842, 348, 1092, 436),
    'px_rocks': (636, 856, 712, 906), 'px_bush': (1148, 868, 1272, 952), 'px_planter': (212, 572, 348, 702),
}
FROM_ALPHA = ('px_banana', 'px_banana2', 'px_fence')

if __name__ == '__main__':
    made = []
    pix = Image.open(PIX).convert('RGB')
    pix_alpha = Image.open(PIX_ALPHA)
    sx, sy = pix_alpha.width / pix.width, pix_alpha.height / pix.height
    for name, (x0, y0, x1, y1) in PIX_BOXES.items():
        if name in FROM_ALPHA:
            im = cutlib.cutout(pix_alpha, (round(x0 * sx), round(y0 * sy), round(x1 * sx), round(y1 * sy)), 'alpha')
        else:
            im = cutlib.cutout(pix, (x0, y0, x1, y1), 'paper')
        made.append((name, im))
    sheet = Image.open(SHEET).convert('RGB')
    for name, box in BOXES.items():
        made.append((name, cutlib.cutout(sheet, box, 'paper', **OPTS[name])))
    for name, im in made:
        if (OUT / f'{name}.webp').exists():  # chỉ ghi đè ảnh game đang dùng; ảnh khác chỉ xem trước
            cutlib.save_webp(im, OUT / f'{name}.webp')
        im.save(S / 'deco' / f'{name}.png')
    cutlib.contact_sheet(made, S / 'deco_contact.jpg', cols=8)
    print({name: im.size for name, im in made})

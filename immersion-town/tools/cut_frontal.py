"""Tách công trình nhìn thẳng, hàng quán, khách tham quan và chi tiết mới (tờ ngày 08/10/2026 trong Game Asset).

  assets/deco/   nhà và vật: hàng quán (bánh mì, cao lầu, cơm gà, cà phê), nhà cổ 2 tầng, Chùa Cầu mặt bên, ô tô điện,
                 quầy hàng, bàn ghế tre, xe đạp, chum vại, chậu cây, cây đa, bụi hoa giấy, hoa đăng, thuyền giấy,
                 xích lô có người đạp, các nhóm khách đứng ngắm phố
  assets/chars/  dải khung đi bộ cho khách tham quan đi lại (walk_*.webp): ô 0 nhìn thẳng, rồi các ô đi sang trái,
                 rồi các ô đi sang phải (lật ngang khi tờ gốc chỉ vẽ một phía). Số ô khai báo trong js/town.js (WALKERS).

Chạy:  python immersion-town/tools/cut_frontal.py
"""
import os
import tempfile
import unicodedata
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps

import cutlib

S = Path(tempfile.gettempdir()) / 'immersion-town-deco'  # ảnh xem trước
S.mkdir(parents=True, exist_ok=True)
GA = Path(r'C:\Users\Esther\Documents\NK 26-27\SÁNG TẠO AI\Game Asset')
ROOT = Path(__file__).resolve().parents[1]
DECO = ROOT / 'assets' / 'deco'
CHARS = ROOT / 'assets' / 'chars'


def source(prefix):
    """Mở tờ trong Game Asset theo phần đầu tên tệp (vài tệp có tên dài hơn giới hạn 260 ký tự của Windows)."""
    nfc = lambda s: unicodedata.normalize('NFC', s)  # noqa: E731  (tên tải về có thể ở dạng dấu tách rời)
    long_dir = '\\\\?\\' + os.path.abspath(GA)  # liệt kê qua tiền tố \\?\ thì Windows mới trả cả tệp tên dài
    name = next(n for n in os.listdir(long_dir) if nfc(n).startswith(nfc(prefix)))
    return Image.open(os.path.join(long_dir, name))


# (tờ, kiểu nền, {tên: (khung, tuỳ chọn)})
SHEETS = [
    ('hoian_shops_hang_quan_dongho.png', 'alpha', {
        'shop_cafe': ((147, 25, 711, 429), {'keep_largest': True, 'despill': True}),
        'shop_caolau': ((891, 29, 1423, 461), {'keep_largest': True, 'despill': True}),
        'shop_comga': ((167, 473, 662, 884), {'keep_largest': True, 'despill': True}),
        'shop_banhmi': ((973, 450, 1469, 885), {'keep_largest': True, 'despill': True}),
    }),
    ('hoian_building_banhmi_dongho.png', 'magenta', {'banhmi_front': ((0, 0, 1024, 1024), {'keep_largest': True})}),
    ('hoian_building_comga_dongho.png', 'magenta', {'comga_front': ((0, 0, 1024, 1024), {'keep_largest': True})}),
    ('hoian_building_ancient_cafe_dongho.png', 'magenta', {'cafe_hoian': ((0, 0, 1024, 1024), {'keep_largest': True})}),
    ('hoian_props_lanterns_flowers_dongho.png', 'magenta', {
        'hoadang_red': ((40, 434, 181, 578), {'keep_largest': True}),
        'hoadang_lotus': ((274, 464, 402, 601), {'keep_largest': True}),
        'hoadang_yellow': ((567, 422, 764, 559), {'keep_largest': True}),
        'hoadang_lotus2': ((837, 492, 985, 600), {'keep_largest': True}),
        'paper_boat': ((156, 543, 252, 596), {'keep_largest': True}),
        'bougain_bush_red': ((355, 771, 622, 993), {'keep_largest': True}),
        'bougain_bush_pink': ((646, 823, 819, 988), {'keep_largest': True}),
    }),
    ('Gemini_Generated_Image_iw9ysuiw9ysuiw9y.png', 'paper', {
        'house_ancient2': ((70, 232, 1212, 1432), {'keep_largest': True, 'ground': 0.96}),
    }),
    ('hoian_props_ancient_trees_vines_transparent.png', 'alpha', {
        'banyan_big': ((18, 23, 532, 543), {'keep_largest': True, 'despill': True}),
        'tree_bang': ((523, 26, 1006, 600), {'keep_largest': True, 'despill': True}),
        'pergola_bougain': ((13, 553, 536, 881), {'keep_largest': True, 'despill': True}),
        'pergola_vine': ((559, 612, 1003, 904), {'keep_largest': True, 'despill': True}),
    }),
    ('hoian_props_vegetation_grass_transparent.png', 'alpha', {
        'pot_flower_yellow': ((795, 4, 1021, 321), {'keep_largest': True, 'despill': True}),
        'pot_flower_red2': ((484, 260, 666, 512), {'keep_largest': True, 'despill': True}),
        'palm_pot': ((3, 649, 239, 1023), {'keep_largest': True, 'despill': True}),
        'bamboo_planter': ((485, 776, 746, 1023), {'keep_largest': True, 'despill': True}),
    }),
    ('Thiết kế chưa có tên (4).png', 'alpha', {
        'bridge_chuacau': ((790, 50, 1051, 197), {'water': 0.6, 'keep_largest': True}),
        'stall_front': ((1194, 575, 1343, 727), {'keep_largest': True}),
        'table_set': ((422, 931, 588, 1025), {'keep': 0.2}),
        'bicycle': ((773, 892, 967, 1010), {'keep_largest': True}),
        'jars': ((981, 899, 1158, 1005), {'keep': 0.2}),
    }),
    ('NPC xich lo', 'white', {
        'cyclo_red': ((13, 133, 369, 516), {'keep_largest': True}),
    }),
    ('NPC du khach', 'white', {
        'tourists_family': ((140, 25, 692, 276), {'keep': 0.15}),
        'tourists_friends': ((805, 27, 1348, 287), {'keep': 0.15}),
        'tour_group': ((40, 293, 575, 539), {'keep': 0.15}),
        'tourists_aodai': ((897, 786, 1390, 1017), {'keep': 0.15}),
    }),
    ('NPC nu', 'paper', {'tour_guide': ((256, 36, 454, 335), {'keep_largest': True, 'bg_tol': 0.1, 'pockets': False})}),
]

# Khách đi lại: (tờ, kiểu nền, khung nhìn thẳng, các khung đi sang trái, các khung đi sang phải)
# Khung 'mirror' = lật ngang các khung phía bên kia.
WALK = {
    'guide': ('NPC nu', 'paper', (256, 36, 454, 335),
              [(255, 662, 411, 931), (517, 662, 673, 930), (769, 662, 927, 930), (1007, 662, 1165, 930)],
              [(272, 949, 432, 1232), (533, 949, 689, 1232), (787, 949, 943, 1232), (1027, 949, 1184, 1232)]),
    'takashi': ('NPC du khach', 'white', (51, 565, 152, 770), [(318, 575, 430, 770)], 'mirror'),
    'sophia': ('NPC du khach', 'white', (622, 573, 722, 769), [(750, 577, 849, 771), (877, 577, 978, 769)], 'mirror'),
    'john': ('NPC du khach', 'white', (1012, 577, 1122, 772), [(1383, 577, 1479, 771)], 'mirror'),
    'anna': ('NPC du khach', 'white', (102, 809, 215, 986), [(365, 810, 467, 986)], 'mirror'),
    'liwei': ('NPC du khach', 'white', (498, 809, 596, 991), 'mirror', [(498, 809, 596, 991), (733, 810, 836, 991)]),
    'cyclo': ('NPC xich lo', 'white', (749, 581, 1121, 965), 'mirror', [(749, 581, 1121, 965)]),
}
WALK_H = 210  # chiều cao lưu (px); game vẽ cao khoảng 120 px
WATER = (28, 79, 63)  # màu ô nước sông trong bộ ô 64×64 (id 16)


def fill_under_bridge(im, top=0.58):
    """Lòng vòm Chùa Cầu (đã xoá nước vẽ sẵn) tô bằng màu nước của bản đồ: dưới cầu là ván để đi qua lạch,
    nhìn qua vòm phải thấy nước chứ không thấy ván."""
    a = np.asarray(im).copy()
    alpha = a[..., 3]
    for y in range(int(a.shape[0] * top), a.shape[0]):
        xs = np.where(alpha[y] > 128)[0]
        if len(xs) > 1:
            row = a[y, xs[0]:xs[-1] + 1]
            row[row[:, 3] < 128] = (*WATER, 255)
    return Image.fromarray(a, 'RGBA')


# Tờ hướng dẫn viên: màu da gần màu giấy, chỉ coi là nền các điểm thật sát màu giấy ở mép khung
WALK_OPTS = {'guide': {'bg_tol': 0.1, 'pockets': False, 'ground': 0.93}}
# Hướng dẫn viên NPC mặc áo dài hồng, để không trùng áo dài tím của Local Host nữ (nhân vật học sinh điều khiển)
WALK_COLOR = {'guide': (200, 96, 132)}


def blank_plate(im, box):
    """Xoá chữ trên biển số (không gắn nhãn địa danh, năm lên xe): tô lòng biển bằng màu xanh của chính biển."""
    a = np.asarray(im).copy()
    x0, y0, x1, y1 = box
    region = a[y0:y1, x0:x1, :3].astype(int)
    dark = region.sum(axis=2) < 330            # điểm nền xanh của biển (chữ màu kem sáng hơn)
    a[y0:y1, x0:x1, :3] = np.median(region[dark], axis=0).astype(np.uint8)
    return Image.fromarray(a, 'RGBA')


def walk_strip(sheet, kind, front, left, right, color=None, **opts):
    cut = lambda box: cutlib.cutout(sheet, box, kind, keep_largest=True, **opts)  # noqa: E731
    f = cut(front)
    lf = [cut(b) for b in left] if left != 'mirror' else None
    rf = [cut(b) for b in right] if right != 'mirror' else None
    lf = lf or [ImageOps.mirror(im) for im in rf]
    rf = rf or [ImageOps.mirror(im) for im in lf]
    frames = [f] + lf + rf
    if color:
        frames = [cutlib.recolor(im, color) for im in frames]
    scaled = [im.resize((round(im.width * WALK_H / im.height), WALK_H), Image.LANCZOS) for im in frames]
    cw = max(im.width for im in scaled) + 4
    strip = Image.new('RGBA', (cw * len(scaled), WALK_H), (0, 0, 0, 0))
    for i, im in enumerate(scaled):
        strip.alpha_composite(im, (i * cw + (cw - im.width) // 2, 0))
    return strip, len(lf), len(rf)


if __name__ == '__main__':
    made = []
    for prefix, kind, items in SHEETS:
        sheet = source(prefix)
        for name, (box, opts) in items.items():
            im = cutlib.cutout(sheet, box, kind, **opts)
            if name == 'bridge_chuacau':
                im = fill_under_bridge(im)
            cutlib.save_webp(im, DECO / f'{name}.webp')
            made.append((name, im))
    # Ô tô điện trắng đang cắm sạc ở trạm sạc (tranh poster "Phố cổ Hội An 2026"): nền là tranh cảnh nên dùng GrabCut
    car = cutlib.grabcut(source('Thiết kế chưa có tên (8).png'), (455, 700, 800, 884), bg_below=852,
                         fg_rects=[(520, 740, 760, 840), (700, 765, 785, 838), (466, 800, 502, 855), (584, 822, 624, 880), (734, 852, 774, 875)])
    car = blank_plate(car, (248, 112, 294, 125))
    cutlib.save_webp(car, DECO / 'ev_car.webp')
    made.append(('ev_car', car))
    cutlib.contact_sheet(made, S / 'frontal_contact.jpg', cols=7)
    walk = []
    for who, (prefix, kind, front, left, right) in WALK.items():
        strip, nl, nr = walk_strip(source(prefix), kind, front, left, right, WALK_COLOR.get(who), **WALK_OPTS.get(who, {}))
        cutlib.save_webp(strip, CHARS / f'walk_{who}.webp')
        walk.append((who, strip))
        print(f'walk_{who}: {strip.size}, 1 ô nhìn thẳng, {nl} ô sang trái, {nr} ô sang phải')
    cutlib.contact_sheet(walk, S / 'walk_contact.jpg', cols=2, cw=900, ch=240)
    print({name: im.size for name, im in made})

"""Sinh 4 bản đồ Tiled (.tmx) cho Immersion Town – góc nhìn 3/4 từ trên xuống, ô 64×64.

  data/maps/ev.tmx        Bãi xe điện ngoại vi (cửa ngõ xanh, quán cà phê đồng lúa OCOP)
  data/maps/street.tmx    Phố đi bộ lõi di sản (tiệm may, quà OCOP, nhà cổ, xưởng đèn lồng, dãy hàng quán ẩm thực)
  data/maps/river.tmx     Bến sông Hoài lúc chiều tà (bến hoa đăng, thuyền điện, Chùa Cầu)
  data/maps/festival.tmx  Quảng trường Đêm hội (Hội An Quán – cổng Boss, trạm Trà Đá, Đại sứ di sản)

LƯU Ý: chạy lại sẽ GHI ĐÈ các tệp .tmx. Nếu đã sửa bản đồ bằng Tiled thì sửa tiếp trong Tiled, đừng chạy lại.
Lớp đối tượng "Objects": mỗi đối tượng có thuộc tính 'kind' (building, tree, prop, npc, collectible, spot,
exit, spawn, strings, bridge, action). Toạ độ trong tệp tính bằng pixel.
Chạy:  python immersion-town/tools/build_maps.py
"""
import json
from pathlib import Path
from xml.sax.saxutils import escape

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'data' / 'maps'
OUT.mkdir(parents=True, exist_ok=True)
T = 64

PAVE, ASPH, ASPH_LINE, PAVE2 = 0, 1, 2, 3
BRICK, BRICK2 = 8, 9
WATER, WATER_LOTUS, EMBANK = 16, 17, 18
WALL = 24
GRASS, GRASS_FLOWER, PADDY, PADDY_RIPE, DIRT, WOOD, WOOD2, SAND = 32, 33, 34, 35, 36, 37, 38, 39
COLLIDES = list(range(16, 24)) + list(range(24, 32)) + [34, 35]
# Mặt đường theo tranh mẫu phố cổ (08/10/2026): lòng đường nhựa xám ấm, vỉa hè đá phiến có bó vỉa, quảng trường lát đá
ROAD1, ROAD2, ROAD3, ROAD_SHADE = 40, 41, 42, 43
SLAB1, SLAB2, SLAB3, CURB_S, CURB_N = 44, 45, 46, 47, 48
PLAZA1, PLAZA2 = 49, 50


class Map:
    def __init__(self, mid, w, h, fill, props):
        self.id, self.w, self.h = mid, w, h
        self.ground = [[fill] * w for _ in range(h)]
        self.objects = []
        self.props = props

    def rect(self, x, y, w, h, tile):
        for j in range(y, y + h):
            for i in range(x, x + w):
                if 0 <= i < self.w and 0 <= j < self.h:
                    self.ground[j][i] = tile(i, j) if callable(tile) else tile

    def obj(self, kind, x, y, w=1, h=1, name='', **props):
        self.objects.append({'kind': kind, 'x': x, 'y': y, 'w': w, 'h': h, 'name': name, 'props': props})

    def write(self):
        lines = ['<?xml version="1.0" encoding="UTF-8"?>',
                 f'<map version="1.10" tiledversion="1.10.2" orientation="orthogonal" renderorder="right-down" width="{self.w}" height="{self.h}" tilewidth="{T}" tileheight="{T}" infinite="0" nextlayerid="3" nextobjectid="{len(self.objects) + 1}">',
                 ' <properties>']
        for k, v in self.props.items():
            lines.append(f'  <property name="{k}" value="{escape(str(v), {chr(34): "&quot;"})}"/>')
        lines += [' </properties>',
                  f' <tileset firstgid="1" name="hoian_dongho_tileset_64x64" tilewidth="{T}" tileheight="{T}" tilecount="72" columns="8">',
                  '  <image source="../../assets/tiles/hoian_dongho_grid_tileset_64x64.png" width="512" height="576"/>']
        for tid in COLLIDES:
            lines.append(f'  <tile id="{tid}"><properties><property name="collides" type="bool" value="true"/></properties></tile>')
        lines += [' </tileset>', f' <layer id="1" name="Ground" width="{self.w}" height="{self.h}">', '  <data encoding="csv">']
        rows = [','.join(str(t + 1) for t in row) for row in self.ground]
        lines.append(',\n'.join(rows))
        lines += ['</data>', ' </layer>', ' <objectgroup id="2" name="Objects">']
        for i, o in enumerate(self.objects, 1):
            x, y, w, h = (round(v * T) for v in (o['x'], o['y'], o['w'], o['h']))
            lines.append(f'  <object id="{i}" name="{escape(o["name"])}" type="{o["kind"]}" x="{x}" y="{y}" width="{w}" height="{h}">')
            lines.append('   <properties>')
            lines.append(f'    <property name="kind" value="{o["kind"]}"/>')
            for k, v in o['props'].items():
                if isinstance(v, bool):
                    lines.append(f'    <property name="{k}" type="bool" value="{str(v).lower()}"/>')
                elif isinstance(v, (int, float)):
                    lines.append(f'    <property name="{k}" type="float" value="{v}"/>')
                else:
                    val = v if isinstance(v, str) else json.dumps(v, ensure_ascii=False)
                    lines.append(f'    <property name="{k}" value="{escape(val, {chr(34): "&quot;"})}"/>')
            lines.append('   </properties>')
            lines.append('  </object>')
        lines += [' </objectgroup>', '</map>', '']
        (OUT / f'{self.id}.tmx').write_text('\n'.join(lines), encoding='utf-8')
        print('Đã ghi', OUT / f'{self.id}.tmx', f'{self.w}×{self.h}', len(self.objects), 'đối tượng')


checker = lambda a, b: (lambda i, j: a if (i + j) % 2 else b)  # noqa: E731
road = lambda i, j: (ROAD1, ROAD2, ROAD3, ROAD2, ROAD3, ROAD2, ROAD3)[(i * 5 + j * 3) % 7]  # noqa: E731  (ít ô có vết nứt)
slab = lambda i, j: (SLAB1, SLAB2, SLAB3)[(i * 2 + j) % 3]  # noqa: E731
plaza = lambda i, j: PLAZA1 if (i * 3 + j) % 2 else PLAZA2  # noqa: E731
DECO = ROOT / 'assets' / 'deco'


def deco_w(img, ph):
    """Chiều rộng (ô) của ảnh trang trí khi vẽ cao ph pixel."""
    with Image.open(DECO / f'{img}.webp') as im:
        return ph * im.width / im.height / T


def deco(m, img, cx, base, ph, word=None, solid=False, foot=0.3, glow=None, flip=False, **extra):
    """Đồ trang trí đứng trên mặt đất: tâm đáy (cx, base) tính bằng ô; vật cản là dải chân cao foot ô.
    extra: thuộc tính thêm, ví dụ after='all' (chỉ xuất hiện trong đêm lễ trao danh hiệu)."""
    w = deco_w(img, ph)
    props = {'img': img, 'ph': ph, 'quiet': True, **extra}
    if word:
        props['word'] = word
    if solid:
        props['solid'] = True
    if glow:
        props['glow'] = glow
    if flip:
        props['flip'] = True
    m.obj('prop', cx - w / 2, base - foot, w, foot, **props)
    return w


def tree(m, variant, x, y, ph=None):
    """Cây tại ô (x, y) như đối tượng 'tree' cũ (khung chân 0,6×0,35 ô). Cây đa, cây bàng và bụi hoa giấy dùng tranh
    Đông Hồ trong assets/deco (tools/cut_frontal.py) cho cùng nét với nhà cửa; cau và tre vẫn vẽ bằng mã.
    ph: chiều cao vẽ (px), hạ xuống cho cây sát mép trên bản đồ để không bị cắt ngọn."""
    cx, base = x + 0.3, y + 0.35
    if variant == 'banyan':
        deco(m, 'banyan_big', cx, base, ph or 210, word='banyan-tree', solid=True, foot=0.35)
    elif variant == 'bang':
        deco(m, 'tree_bang', cx, base, ph or 150, solid=True, foot=0.3)
    elif variant == 'bougainvillea':
        img = 'bougain_bush_red' if round(x * 10) % 2 else 'bougain_bush_pink'
        deco(m, img, cx, base, 104, word='bougainvillea', solid=True, foot=0.3)
    else:
        m.obj('tree', x, y, 0.6, 0.35, variant=variant)


def walker(m, who, x0, x1, y, speed=38, start=0.5, rest=2.5, direction='right'):
    """Khách tham quan đi qua lại trên đoạn [x0, x1] (ô), chân ở hàng y; không chặn đường, không bắt chuyện."""
    m.obj('walker', x0, y - 0.1, x1 - x0, 0.1, who=who, speed=speed, start=start, rest=rest, dir=direction)


def ev_map():
    m = Map('ev', 26, 14, GRASS, {'zone': 'ev', 'name': 'Bãi xe điện ngoại vi', 'name_en': 'Outer EV Hub', 'sub': 'Cửa ngõ xanh ngoài phố đi bộ', 'sub_en': 'The green gateway outside the walking zone', 'card': 'assets/scenes/ev_hub.webp', 'light': 'day'})
    m.rect(0, 0, 8, 5, lambda i, j: PADDY_RIPE if j % 2 else PADDY)
    m.rect(8, 1, 12, 5, ASPH)
    for x in (9, 11, 13, 15, 17):
        m.rect(x, 3, 1, 3, ASPH_LINE)
    m.rect(0, 6, 22, 3, ASPH)
    m.rect(22, 6, 4, 3, slab)
    m.rect(0, 9, 26, 1, CURB_N)
    m.rect(0, 10, 13, 4, lambda i, j: PADDY if (i + j) % 3 else PADDY_RIPE)
    m.rect(13, 10, 1, 4, DIRT)
    m.rect(14, 10, 8, 4, plaza)
    m.rect(22, 10, 4, 4, GRASS_FLOWER)
    m.rect(20, 0, 6, 1, GRASS_FLOWER)

    m.obj('spawn', 1, 7, name='default', facing='right')
    m.obj('exit', 25, 6, 1, 3, name='to_street', to='street', sx=1.5, sy=9, facing='right')
    # Bãi sạc dưới mái che pin mặt trời
    for x, img in ((9.2, 'charger_green'), (11.2, 'charger_white'), (13.2, 'evCharger')):
        m.obj('prop', x, 1.55, 0.6, 0.45, img=img, ph=104, word='ev-charging-station', solid=True)
    left = 8.85
    wl = deco_w('canopy_left', 172)
    deco(m, 'canopy_left', left + wl / 2, 2.75, 172, word='solar-canopy')
    wr = deco_w('canopy_right', 171)
    deco(m, 'canopy_right', left + wl - 0.3 + wr / 2, 2.75, 171, word='solar-canopy')
    deco(m, 'charger_box', 14.75, 2.05, 64, word='solar-powered-outlet', solid=True)
    m.obj('prop', 15.5, 3.6, 1.0, 0.4, img='scooter', ph=74, word='electric-scooter', solid=True)
    m.obj('prop', 17.6, 3.6, 1.0, 0.4, img='scooter', ph=74, word='electric-scooter', solid=True)
    m.obj('prop', 8.3, 2.6, 0.4, 0.3, draw='parkingSign', ph=96, word='parking-space', solid=True)
    m.obj('prop', 21.4, 5.55, 0.6, 0.4, img='pedSign', ph=118, word='pedestrian-zone', solid=True)
    for y in (6.1, 7.4, 8.6):
        m.obj('prop', 22.35, y, 0.3, 0.25, draw='bollard', ph=40, solid=False)
    m.obj('prop', 5.3, 5.55, 0.5, 0.35, draw='shuttleStop', ph=126, word='electric-shuttle', solid=True)
    m.obj('prop', 3.6, 5.6, 1.2, 0.35, draw='bench', ph=40, solid=True)
    # Quán cà phê đồng lúa & gian OCOP
    # Quán Cà phê Đồng Lúa: nhà tranh có giàn cây (tranh Làng rau Trà Quế)
    m.obj('prop', 15.0, 10.4, 3.6, 1.2, img='tq_hut', ph=212, word='lotus-tea', solid=True, label='CAFE ĐỒNG LÚA · OCOP', labelAt='0.3,0.6', glow='0.3,0.55')
    m.obj('prop', 15.4, 12.3, 1.1, 0.5, draw='table', ph=46, solid=True, on=[{'img': 'ocopTea', 'h': 52, 'dx': 0, 'word': 'ocop-product', 'spots': [['traceability', [130, 15, 80, 85]]]}])
    m.obj('prop', 17.6, 12.3, 1.1, 0.5, draw='table', ph=46, solid=True, on=[{'img': 'solarOutlet', 'h': 50, 'dx': 0, 'word': 'solar-powered-outlet'}])
    for x, y, v, *ph in [(9.0, 0.6, 'bamboo'), (12.0, 0.6, 'bamboo'), (15.0, 0.6, 'bamboo'), (18.7, 0.6, 'bamboo'), (23.0, 2.6, 'banyan', 182), (21.2, 10.7, 'areca'), (24.2, 12.3, 'bougainvillea'), (4.6, 9.4, 'areca'), (10.4, 9.4, 'areca')]:
        tree(m, v, x, y, *ph)
    # Khách tham quan: hướng dẫn viên dẫn đoàn quanh trạm xe điện, du khách đi dạo trên vỉa hè
    walker(m, 'guide', 1.0, 7.4, 8.85, speed=34, start=0.2)
    walker(m, 'takashi', 12.5, 21.0, 9.55, speed=30, start=0.6, direction='left')
    # Hàng rào gỗ quanh đồng lúa, cây chuối ở góc ruộng
    for cx, base in ((1.4, 5.0), (6.95, 5.0), (1.5, 10.05), (8.0, 10.05)):
        deco(m, 'px_fence', cx, base, 46, word='fence')
    deco(m, 'px_banana', 12.45, 10.5, 150, word='banana-tree')
    deco(m, 'px_banana2', 20.75, 1.25, 128, word='banana-tree', solid=True)
    deco(m, 'px_bush', 25.2, 5.55, 44)
    # Quán cà phê: chậu cây hai bên cửa, bồn cây, bonsai
    deco(m, 'pot_banana_red', 14.55, 11.6, 72, word='potted-plant', solid=True)
    deco(m, 'pot_flower_blue', 18.95, 11.6, 58, word='potted-plant', solid=True)
    deco(m, 'planter_box', 14.3, 13.7, 56, word='potted-plant', solid=True)
    deco(m, 'bonsai', 21.4, 13.65, 58, word='bonsai', solid=True)
    deco(m, 'tq_bins', 19.6, 10.95, 48, word='bin', solid=True)
    # Làng rau Trà Quế bên quán: luống rau, rau thơm
    deco(m, 'tq_veg', 23.4, 11.6, 64, word='herbs')
    deco(m, 'tq_herbs', 22.7, 13.5, 50, word='herbs')
    # Trâu trên ruộng, xe điện du lịch ở trạm đưa đón, xe đạp điện trong ô đỗ
    deco(m, 'tq_buffalo', 5.6, 12.6, 72, word='water-buffalo')
    deco(m, 'tq_cart', 6.8, 6.75, 76, word='electric-shuttle', solid=True)
    deco(m, 'tq_ebike', 9.95, 4.3, 62, word='electric-scooter', solid=True)
    m.obj('spot', 0, 0, 8, 5, word='rice-paddy')
    m.obj('spot', 0, 10, 13, 4, word='rice-paddy')
    m.obj('npc', 2.2, 6.9, name='ambassador', facing='down', until='q_ev')
    m.obj('npc', 12.0, 4.6, name='mark', facing='down', until='q_ev')
    m.obj('npc', 16.55, 11.95, name='mark', facing='down', after='q_ev', until='all')
    # Hành động cuối nhiệm vụ: dây sạc từ trụ sạc sang xe của Mark
    m.obj('finale', 13.7, 1.4, 1.9, 2.1, name='q_ev', act='charge')
    m.obj('npc', 19.8, 12.0, name='hoa', facing='down')
    m.obj('collectible', 3, 8.1, name='tea_1', type='tea')
    m.obj('collectible', 23.6, 4.6, name='tea_2', type='tea')
    m.obj('collectible', 14.4, 13.4, name='bk_suggest', type='booklet')
    return m


def street_map():
    m = Map('street', 56, 16, GRASS, {'zone': 'street', 'name': 'Phố đi bộ', 'name_en': 'Walking Street', 'sub': 'Lõi di sản: tiệm may, quà OCOP, nhà cổ, xưởng đèn lồng và dãy hàng quán bánh mì, cao lầu, cơm gà, cà phê', 'sub_en': 'The heritage core: tailor shop, OCOP gifts, ancient houses, a lantern workshop and a row of bánh mì, cao lầu, chicken rice and coffee shops', 'card': 'assets/scenes/street.webp', 'light': 'day'})
    m.rect(0, 0, 56, 2, lambda i, j: GRASS_FLOWER if (i * 7 + j) % 5 == 0 else GRASS)
    m.rect(0, 2, 56, 6, lambda i, j: GRASS_FLOWER if (i * 7 + j) % 5 == 0 else GRASS)   # vườn sau dãy nhà
    for x in (0, 6, 7, 13, 19, 25, 31, 37, 43, 49, 55):
        m.rect(x, 2, 1, 6, slab)       # ngõ giữa các nhà lát đá phiến, dẫn ra vườn sau
    m.rect(0, 8, 56, 1, CURB_S)        # vỉa hè trước cửa nhà, bó vỉa ở mép dưới
    m.rect(0, 9, 56, 1, ROAD_SHADE)    # lòng đường nhựa (dải bóng bó vỉa)
    m.rect(0, 10, 56, 1, road)
    m.rect(0, 11, 56, 1, CURB_N)       # vỉa hè phía vườn
    m.rect(0, 12, 56, 4, lambda i, j: GRASS_FLOWER if (i * 3 + j) % 7 == 0 else GRASS)
    m.rect(15, 12, 2, 4, slab)
    m.rect(2, 13, 11, 1, slab)
    m.rect(19, 13, 11, 1, slab)
    m.rect(33, 13, 21, 1, slab)

    m.obj('spawn', 1.5, 9, name='default', facing='right')
    m.obj('exit', 0, 8, 1, 3, name='to_ev', to='ev', sx=23.5, sy=7, facing='left')
    m.obj('exit', 55, 8, 1, 3, name='to_festival', to='festival', sx=1.5, sy=9, facing='right')
    m.obj('exit', 15, 15, 2, 1, name='to_river', to='river', sx=15, sy=1.2, facing='down')
    # Dãy nhà mặt phố (quay mặt ra đường); phía sau là ngõ, đi vào sẽ bị mái nhà che khuất
    m.obj('building', 1, 6, 5, 2, name='tailor', sprite='tailor')
    m.obj('building', 8, 6, 5, 2, name='ocop_shop', sprite='workshop', sign='QUÀ LƯU NIỆM|OCOP', preset='ocop')
    m.obj('building', 14, 6, 5, 2, name='tan_ky', sprite='house_ancient2', sign='NHÀ CỔ|TẤN KÝ', preset='ancient2')
    m.obj('building', 20, 6, 5, 2, name='workshop', sprite='workshop')
    m.obj('building', 26, 6, 5, 2, name='phung_hung', sprite='house_ancient2', flip=True, sign='NHÀ CỔ|PHÙNG HƯNG', preset='ancient2')
    # Dãy hàng quán (tranh Hang quan.png): người bán trong quán, khói bếp, lời rao khi đi ngang (data → shops)
    m.obj('building', 32, 6, 5, 2, name='banh_mi', sprite='shop_banhmi', sign='BÁNH MÌ', shop='banhmi', steam='0.46,0.6')
    m.obj('building', 38, 6, 5, 2, name='cao_lau', sprite='shop_caolau', sign='CAO LẦU', shop='caolau', steam='0.64,0.6;0.44,0.66')
    m.obj('building', 44, 6, 5, 2, name='com_ga', sprite='shop_comga', sign='CƠM GÀ', shop='comga', steam='0.47,0.62')
    m.obj('building', 50, 6, 5, 2, name='ca_phe', sprite='shop_cafe', sign='CÀ PHÊ', shop='cafe')
    # Đồ vật trước cửa hàng
    m.obj('prop', 4.4, 8.1, 1.2, 0.45, img='workbench', ph=58, word='measuring-tape', solid=True, on=[{'img': 'fabric', 'h': 30, 'dx': -18, 'word': 'mulberry-silk'}, {'img': 'tape', 'h': 26, 'dx': 22, 'word': 'measuring-tape'}])
    m.obj('prop', 5.7, 8.15, 0.8, 0.35, img='silkRoll', ph=48, word='silk-fabric', solid=True)
    m.obj('prop', 10.9, 8.1, 1.2, 0.45, img='workbench', ph=58, word='ocop-product', solid=True, on=[{'img': 'ocopTea', 'h': 54, 'dx': 0, 'word': 'ocop-product', 'spots': [['traceability', [130, 15, 80, 85]]]}])
    m.obj('prop', 18.2, 8.1, 0.5, 0.35, img='tq_qr', ph=104, word='audio-guide', solid=True)
    m.obj('prop', 23.2, 8.1, 1.2, 0.45, img='workbench', ph=58, word='workbench', solid=True, on=[{'draw': 'bambooFrame', 'h': 40, 'w': 38, 'dx': 0, 'word': 'bamboo-frame'}])
    m.obj('prop', 30.2, 8.1, 0.5, 0.35, img='tq_qr', ph=104, word='qr-code', solid=True)
    m.obj('strings', 1, 7.4, 54, 3.6, name='lanterns', draw='lanternStrings')
    for img, cx, ph in (('pot_palm_red', 8.45, 62), ('pot_flower_blue', 14.45, 54), ('pot_flower_red', 17.55, 54),
                        ('pot_banana', 20.45, 64), ('pot_plant_blue', 26.45, 58), ('pot_flower_clay', 29.55, 54),
                        ('pot_flower_yellow', 37.5, 62), ('palm_pot', 43.5, 96), ('pot_flower_red2', 49.5, 58)):
        deco(m, img, cx, 8.35, ph, word='potted-plant', solid=True, foot=0.25)
    # Trước dãy hàng quán: chum vại, bàn ghế tre của quán cà phê, xe đạp dựng bên đường
    deco(m, 'jars', 47.9, 8.4, 46, solid=True, foot=0.25)
    deco(m, 'table_set', 52.6, 8.55, 52, word='coffee-shop', solid=True, foot=0.3)
    deco(m, 'bicycle', 35.9, 8.45, 58, solid=True, foot=0.25)
    for cx in (14.45, 17.55):
        deco(m, 'stone_lantern', cx, 12.45, 76, word='stone-lantern', solid=True, glow='0.5,0.42')
    deco(m, 'pergola_bougain', 6.2, 14.7, 140, word='trellis')
    deco(m, 'pergola_vine', 25.2, 14.7, 132, word='trellis')
    deco(m, 'pergola_bougain', 46.0, 14.7, 140, word='trellis', flip=True)
    deco(m, 'flower_bush', 2.0, 15.25, 40)
    deco(m, 'flower_bush', 29.6, 13.35, 40)
    deco(m, 'hanging_flower', 6.5, 7.95, 96)
    deco(m, 'hanging_green', 12.5, 7.95, 92, flip=True)
    # Vườn phía nam phố
    for x, y, v in [(3.0, 12.4, 'banyan'), (8.6, 14.4, 'bougainvillea'), (12.6, 12.5, 'areca'), (19.4, 12.5, 'areca'), (27.2, 14.4, 'bougainvillea'), (29.2, 12.4, 'banyan'), (0.6, 0.4, 'bamboo'), (6.5, 0.4, 'areca'), (12.5, 0.5, 'bamboo'), (18.4, 0.4, 'areca'), (24.6, 0.5, 'bamboo'), (30.6, 0.4, 'areca'),
                    (36.6, 0.5, 'bamboo'), (42.5, 0.4, 'areca'), (48.6, 0.5, 'bamboo'), (54.6, 0.4, 'areca'), (34.6, 12.5, 'areca'), (40.2, 12.4, 'banyan'), (51.6, 14.4, 'bougainvillea'), (54.2, 12.5, 'areca')]:
        tree(m, v, x, y)
    m.obj('prop', 22.0, 12.6, 2.0, 0.6, img='stall_front', ph=118, word='folding-lantern', solid=True, glow='0.1,0.3;0.9,0.3')
    deco(m, 'cyclo_red', 13.5, 11.75, 98, word='cyclo', solid=True)
    deco(m, 'tq_baskets', 9.3, 14.2, 44, word='bamboo-basket')
    deco(m, 'table_set', 19.9, 14.55, 52, word='iced-tea')
    deco(m, 'bamboo_planter', 31.9, 12.55, 72, word='bamboo', solid=True)
    m.obj('prop', 5.6, 14.6, 1.2, 0.35, draw='bench', ph=40, solid=True)
    m.obj('prop', 24.6, 14.6, 1.2, 0.35, draw='bench', ph=40, solid=True)
    m.obj('prop', 43.0, 14.6, 1.2, 0.35, draw='bench', ph=40, solid=True)
    # Khách tham quan: các nhóm đứng ngắm phố, khách đi dạo và xích lô chở khách chạy dọc phố
    deco(m, 'tourists_aodai', 9.6, 11.8, 96, word='tour-group')
    deco(m, 'tour_group', 34.9, 11.8, 100, word='tour-group')
    deco(m, 'tourists_friends', 49.2, 11.8, 104, word='tour-group')
    deco(m, 'tourists_family', 37.5, 15.6, 100, word='tour-group')
    walker(m, 'sophia', 2.0, 17.5, 9.85, speed=36, start=0.3)
    walker(m, 'john', 19.5, 40.0, 10.45, speed=32, start=0.5, direction='left')
    walker(m, 'liwei', 32.0, 53.5, 9.6, speed=40, start=0.2)
    walker(m, 'anna', 41.0, 54.0, 10.55, speed=24, start=0.7, direction='left')
    walker(m, 'cyclo', 3.0, 53.0, 10.95, speed=58, start=0.15)
    m.obj('npc', 2.6, 9.3, name='sarah', facing='down', until='q_tailor')
    m.obj('npc', 11.6, 12.9, name='sarah', facing='left', after='q_tailor', until='all')
    # Hành động cuối nhiệm vụ: giá treo áo dài trước tiệm may, đèn của Emma trên dây đèn trước xưởng
    m.obj('finale', 1.15, 7.9, 0.9, 0.42, name='q_tailor', act='aodai')
    m.obj('finale', 23.9, 7.5, 0, 0.95, name='q_lantern', act='hang')
    m.obj('npc', 6.6, 9.0, name='minh', facing='down')
    m.obj('npc', 21.8, 9.3, name='emma', facing='down', until='all')
    m.obj('npc', 10.2, 13.0, name='vendor', facing='down')
    m.obj('collectible', 6.5, 3.2, name='tea_3', type='tea')
    m.obj('collectible', 27.5, 12.6, name='tea_4', type='tea')
    m.obj('collectible', 7.4, 10.2, name='bk_arrange', type='booklet')
    m.obj('collectible', 17.0, 10.4, name='bk_passive', type='booklet')
    m.obj('collectible', 25.5, 10.3, name='bk_steps', type='booklet')
    return m


def river_map():
    m = Map('river', 30, 16, PAVE, {'zone': 'river', 'name': 'Bến sông Hoài', 'name_en': 'Hoai River Pier', 'sub': 'Chiều tà bên bến hoa đăng và Chùa Cầu', 'sub_en': 'Sunset at the flower-lantern pier and the Japanese Covered Bridge', 'card': 'assets/scenes/river.webp', 'light': 'dusk'})
    m.rect(0, 0, 24, 2, road)          # đường Bạch Đằng ven sông
    m.rect(0, 2, 24, 1, CURB_N)
    m.rect(0, 3, 24, 4, slab)          # đường dạo ven sông lát đá phiến
    m.rect(0, 7, 30, 1, GRASS)
    m.rect(0, 8, 30, 1, EMBANK)
    m.rect(0, 9, 30, 7, lambda i, j: WATER_LOTUS if (i * 5 + j * 3) % 17 == 0 else WATER)
    m.rect(24, 0, 2, 9, WATER)
    m.rect(24, 3, 2, 3, WOOD2)
    m.rect(26, 0, 4, 2, road)
    m.rect(26, 2, 4, 1, CURB_N)
    m.rect(26, 3, 4, 4, slab)
    m.rect(12, 7, 4, 6, WOOD)

    m.obj('spawn', 15, 1.2, name='default', facing='down')
    m.obj('exit', 14, 0, 3, 1, name='to_street', to='street', sx=15.5, sy=13.8, facing='up')
    m.obj('exit', 29, 2, 1, 5, name='to_festival', to='festival', sx=13.5, sy=12.6, facing='up')
    # Chùa Cầu vẽ mặt bên (nhìn thẳng như nhà phố) bắc ngang lạch nước; nước vẽ sẵn đã xoá để lộ mặt nước bản đồ.
    # Đi trên cầu thì khuất dưới mái, hiện bóng mờ
    deco(m, 'bridge_chuacau', 25.0, 6.05, 192, word='japanese-covered-bridge', foot=0.2)
    m.obj('prop', 16.3, 9.2, 3.4, 1.0, draw='eboat', ph=96, word='eco-electric-boat', solid=False)
    m.obj('prop', 7.6, 10.4, 2.6, 0.8, img='boat', ph=92, word='wooden-boat', solid=False, glow='0.14,0.3')
    deco(m, 'pier_rings', 6.15, 9.45, 82, word='mooring-post')
    deco(m, 'pier_lamp', 1.75, 9.5, 96, word='mooring-post', glow='0.9,0.25')
    deco(m, 'dock_tyres', 13.95, 13.4, 64, word='pier')
    deco(m, 'pot_flower_red', 5.55, 7.0, 54, word='potted-plant', solid=True, foot=0.25)
    # Hoa đăng nhiều kiểu (sen, hộp đỏ, hộp vàng) và thuyền giấy thả trên sông, chỉ có từ hoàng hôn
    for x, y, w, img, ph in [(6.6, 12.2, 'biodegradable-lantern', 'hoadang_lotus', 44), (19.6, 11.6, 'candle', 'hoadang_red', 50),
                             (21.4, 13.6, 'biodegradable-lantern', 'hoadang_lotus2', 42), (3.6, 10.6, 'candle', 'hoadang_yellow', 50),
                             (27.0, 12.2, 'biodegradable-lantern', 'lotus', 56), (10.6, 14.2, 'biodegradable-lantern', 'hoadang_lotus', 44),
                             (23.6, 10.8, 'make-a-wish', 'paper_boat', 26), (8.8, 13.1, 'make-a-wish', 'paper_boat', 24),
                             (25.6, 14.4, 'candle', 'hoadang_red', 46)]:
        m.obj('prop', x, y, 0.8, 0.4, img=img, ph=ph, word=w, solid=False, floating=True)
    m.obj('prop', 10.9, 6.55, 0.9, 0.4, draw='cruiseSign', ph=118, word='night-cruise', solid=True)
    for x in (2.5, 8.2, 18.5, 21.6):
        m.obj('prop', x, 6.65, 0.3, 0.25, img='tq_lamp', ph=150, word='silk-lantern', solid=True, glow='0.2,0.4;0.68,0.25')
    deco(m, 'tq_boat', 2.3, 11.3, 44, word='wooden-boat')
    for x, y, v, *ph in [(1.5, 1.8, 'areca'), (6.8, 1.8, 'areca'), (17.6, 1.8, 'areca'), (21.8, 1.9, 'banyan', 160), (27.75, 6.95, 'bougainvillea')]:
        tree(m, v, x, y, *ph)
    m.obj('prop', 4.0, 6.65, 1.2, 0.35, draw='bench', ph=40, solid=True)
    # Khách dạo bờ sông ngắm hoàng hôn
    walker(m, 'takashi', 1.0, 11.0, 5.2, speed=28, start=0.4)
    walker(m, 'sophia', 16.5, 23.0, 4.4, speed=30, start=0.6, direction='left')
    m.obj('spot', 0, 8, 12, 1, word='riverbank')
    m.obj('spot', 17, 12.6, 3, 1.6, word='reflection')
    m.obj('npc', 13.6, 9.4, name='david', facing='up', until='all')
    m.obj('finale', 14.0, 13.3, 5.0, 1.3, name='q_cruise', act='release')
    m.obj('npc', 15.0, 7.6, name='tu', facing='down')
    m.obj('collectible', 1.5, 4.2, name='tea_5', type='tea')
    m.obj('collectible', 27.5, 5.0, name='tea_6', type='tea')
    m.obj('collectible', 10.5, 5.0, name='bk_relative', type='booklet')
    return m


def festival_map():
    m = Map('festival', 28, 14, PLAZA1, {'zone': 'festival', 'name': 'Quảng trường Hội An Quán', 'name_en': 'Assembly Hall Square',
                                        'sub': 'Hội An Quán (đấu Boss) và quầy Trà Đá. Tối nay nơi đây có Đêm hội di sản', 'sub_en': 'Hoi An Assembly Hall (Boss arena) and the iced-tea stall. Tonight: the Heritage Night',
                                        'name_night': 'Đêm hội di sản', 'name_night_en': 'Heritage Night',
                                        'sub_night': 'Lễ trao danh hiệu Local Host dưới ánh đèn lồng', 'sub_night_en': 'The Local Host award ceremony under the lanterns',
                                        'card': 'assets/scenes/festival.webp', 'light': 'night'})
    m.rect(0, 0, 28, 3, lambda i, j: GRASS_FLOWER if (i + j) % 6 == 0 else GRASS)
    m.rect(0, 3, 28, 4, plaza)         # sân lát đá trước dãy nhà và Hội An Quán
    m.rect(0, 7, 28, 1, CURB_S)
    m.rect(0, 8, 28, 1, ROAD_SHADE)    # đường phố nối từ phố đi bộ chạy ngang quảng trường
    m.rect(0, 9, 28, 2, road)
    m.rect(0, 11, 28, 3, plaza)
    m.rect(0, 11, 12, 1, CURB_N)
    m.rect(16, 11, 12, 1, CURB_N)

    m.obj('spawn', 1.5, 9, name='default', facing='right')
    m.obj('exit', 0, 8, 1, 3, name='to_street', to='street', sx=53.6, sy=9, facing='left')
    m.obj('exit', 12, 13, 4, 1, name='to_river', to='river', sx=27.6, sy=4, facing='left')
    m.obj('building', 10.5, 5, 7, 2.2, name='hoi_an_quan', sprite='hall')
    # Dãy nhà phía bắc quảng trường, vẽ nhìn thẳng như phố đi bộ. Nhà lộ tường hông phải đặt bên trái Hội An Quán,
    # nhà vẽ thẳng đặt bên phải, để cả dãy cùng hướng về quảng trường
    m.obj('building', 1.2, 3.8, 4.6, 1.2, name='nha_co_2_tang', sprite='house_ancient2', preset='ancient2')
    m.obj('building', 6.0, 3.9, 4.3, 1.1, name='cafe_hoi_an', sprite='cafe_hoian', shop='cafe')
    m.obj('building', 17.8, 3.9, 4.6, 1.1, name='banh_mi_hoi_an', sprite='banhmi_front', shop='banhmi')
    m.obj('building', 22.6, 3.9, 4.9, 1.1, name='com_ga_hoi_an', sprite='comga_front', shop='comga')
    deco(m, 'pot_flower_yellow', 17.6, 5.35, 54, word='potted-plant', solid=True, foot=0.25)
    deco(m, 'palm_pot', 5.95, 5.3, 84, word='potted-plant', solid=True, foot=0.25)
    deco(m, 'tq_qr', 12.75, 7.75, 96, word='audio-guide', solid=True)
    # Cổng Tam Quan ở lối vào phía tây (từ phố đi bộ), đi qua thì khuất dưới vòm
    deco(m, 'tq_gate', 1.9, 10.9, 176, word='archway', foot=0.1)
    deco(m, 'tq_bins', 3.5, 8.55, 46, word='bin', solid=True)
    # Chỉ có trong đêm lễ trao danh hiệu: múa lân, trống hội, người dự hội
    deco(m, 'tq_lion', 14.0, 12.75, 72, word='lion-dance', after='all')
    deco(m, 'tq_drum', 11.3, 9.75, 64, word='drum', solid=True, after='all')
    deco(m, 'tq_festival_people', 23.2, 10.35, 80, after='all')
    deco(m, 'tq_tourists', 7.2, 9.45, 76, after='all')
    for cx in (14.25, 16.95):
        deco(m, 'stone_lantern', cx, 7.6, 70, word='stone-lantern', solid=True, glow='0.5,0.42')
    for cx in (9.75, 18.25):
        deco(m, 'bonsai', cx, 7.55, 56, word='bonsai', solid=True)
    deco(m, 'pot_palm_red', 6.65, 8.55, 60, word='potted-plant', solid=True, foot=0.25)
    m.obj('strings', 1, 7.2, 26, 4.0, name='lanterns', draw='lanternStrings')
    m.obj('prop', 4.6, 8.0, 1.6, 0.5, img='tq_drink_cart', ph=112, word='iced-tea', action='refill', solid=True,
          label='TRÀ ĐÁ · ICED TEA', labelAt='0.5,0.3', glow='0.5,0.4')
    m.obj('prop', 5.6, 11.6, 2.0, 0.6, img='stall_front', ph=118, word='silk-lantern', solid=True, glow='0.1,0.3;0.9,0.3')
    m.obj('prop', 23.6, 11.6, 2.0, 0.6, img='tq_baichoi', ph=120, word='bai-choi', solid=True, glow='0.5,0.45')
    for x in (8.4, 21.8):
        m.obj('prop', x, 10.9, 0.3, 0.25, img='tq_lamp', ph=150, word='silk-lantern', solid=True, glow='0.2,0.4;0.68,0.25')
    for x, y, v in [(1.0, 2.4, 'bougainvillea'), (26.4, 2.4, 'bougainvillea'), (5.6, 2.25, 'bang'), (21.9, 2.25, 'bang')]:
        tree(m, v, x, y)
    # Khách tham quan quảng trường
    deco(m, 'tourists_family', 20.2, 13.75, 100, word='tour-group')
    walker(m, 'anna', 2.5, 9.5, 10.6, speed=24, start=0.5)
    walker(m, 'liwei', 17.0, 26.5, 12.75, speed=36, start=0.3, direction='left')
    m.obj('npc', 19.6, 9.3, name='ambassador', facing='down')
    m.obj('gate', 11.55, 11.2, 4.9, 0.4, name='festival_gate', word='silk-lantern')
    for x, y, who in [(16.9, 9.4, 'mark'), (17.9, 10.2, 'sarah'), (19.0, 10.6, 'emma'), (20.4, 10.2, 'david')]:
        m.obj('npc', x, y, name=who, facing='down', after='all')
    m.obj('collectible', 24.6, 9.2, name='tea_7', type='tea')
    m.obj('collectible', 7.4, 12.6, name='tea_8', type='tea')
    return m


if __name__ == '__main__':
    for build in (ev_map, street_map, river_map, festival_map):
        build().write()

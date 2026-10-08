"""Dựng tờ sprite Local Host nữ từ Game Asset/hoian_local_host_girl_dongho.png (áo dài tím, nón lá, cờ hướng dẫn viên).

Tờ gốc đã tách nền: 4 hàng FRONT, BACK, LEFT, RIGHT × 4 khung đi bộ (hàng BACK chỉ có 3 khung), cột trái là chữ và
hoa sen trang trí (bỏ). Kết quả là tờ 4×4 ô 150×216 giống Local Host nam: hàng xuống, lên, trái, phải; cột là khung đi.

  assets/chars/host_girl_white.webp   bộ "Đồng phục Local Host" (outfit white): áo dài tím y như tranh gốc
  assets/chars/host_girl_indigo.webp  áo dài xanh chàm (outfit indigo)
  assets/chars/host_girl_gold.webp    áo dài vàng lụa (outfit gold)
  assets/chars/host_girl_red.webp     áo dài đỏ đèn lồng (outfit red)

Chạy:  python immersion-town/tools/cut_host_girl.py
"""
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

import cutlib

GA = Path(r'C:\Users\Esther\Documents\NK 26-27\SÁNG TẠO AI\Game Asset')
OUT = Path(__file__).resolve().parents[1] / 'assets' / 'chars'
S = Path(tempfile.gettempdir()) / 'immersion-town-deco'
S.mkdir(exist_ok=True)
CW, CH = 150, 216

# Khung trên tờ gốc 1082×1082 (x0, y0, x1, y1)
ROWS = {
    'down': [(220, 30, 389, 286), (452, 29, 620, 285), (669, 29, 839, 285), (866, 29, 1034, 285)],
    'up': [(206, 301, 385, 551), (434, 301, 611, 551), (851, 302, 1031, 551), (434, 301, 611, 551)],  # thiếu khung 3: dùng lại khung 2
    'left': [(217, 565, 352, 796), (442, 566, 577, 796), (655, 565, 795, 796), (858, 566, 998, 796)],
    'right': [(232, 811, 368, 1054), (455, 811, 591, 1054), (672, 809, 819, 1054), (876, 809, 1019, 1055)],
}
# Màu áo dài cho từng bộ trang phục (None = giữ nguyên màu tím của tranh)
OUTFITS = {'white': None, 'indigo': (36, 54, 104), 'gold': (226, 176, 44), 'red': (196, 50, 42)}


def clean(frame):
    """Quầng giấy sáng quanh nhân vật (sau lưng, quanh lá cờ, giữa tay và thân) là các điểm sáng bán trong suốt nối
    liền ra nền: xoá chúng, không đụng vào điểm đục nên nón lá, mặt, quần trắng giữ nguyên. Điểm bán trong suốt nằm
    bên trong nhân vật (lỗ công cụ tách nền làm thủng trên má, mũi) thì lấp lại cho đục."""
    a = np.asarray(frame).astype(float) / 255
    rgb, al = a[..., :3], a[..., 3].copy()
    hue, s, v = cutlib.hsv(rgb)
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
    out = Image.fromarray(np.dstack([rgb * 255, al * 255]).round().astype(np.uint8), 'RGBA')
    return out.crop(out.getbbox())


def build():
    src = Image.open(GA / 'hoian_local_host_girl_dongho.png').convert('RGBA')
    frames = {d: [clean(src.crop(b)) for b in boxes] for d, boxes in ROWS.items()}
    scale = min(min((CH - 4) / f.height, (CW - 2) / f.width) for row in frames.values() for f in row)
    sheets = {}
    for outfit, target in OUTFITS.items():
        sheet = Image.new('RGBA', (CW * 4, CH * 4), (0, 0, 0, 0))
        for r, d in enumerate(('down', 'up', 'left', 'right')):
            for c, f in enumerate(frames[d]):
                f = f if target is None else cutlib.recolor(f, target)
                f = f.resize((round(f.width * scale), round(f.height * scale)), Image.LANCZOS)
                sheet.alpha_composite(f, (c * CW + (CW - f.width) // 2, r * CH + CH - 2 - f.height))
        cutlib.save_webp(sheet, OUT / f'host_girl_{outfit}.webp')
        sheets[outfit] = sheet
    cutlib.contact_sheet(list(sheets.items()), S / 'host_girl_contact.jpg', cols=2, cw=620, ch=890)
    return sheets


if __name__ == '__main__':
    print({k: v.size for k, v in build().items()})

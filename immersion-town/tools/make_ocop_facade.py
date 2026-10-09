"""Mặt tiền cửa hàng quà OCOP: dùng lại tranh xưởng lồng đèn (assets/facades/workshop.webp) nhưng xoá chữ
'XƯỞNG LỒNG ĐÈN GỖ' trên tấm biển gỗ (tô lại bằng màu gỗ xung quanh), để hai nhà cạnh nhau không cùng một tên.
Biển tên vẽ chồng bằng mã đã bỏ (09/10/2026).

Chạy:  python immersion-town/tools/make_ocop_facade.py   → assets/deco/ocop_shop.webp
"""
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

import cutlib

ROOT = Path(__file__).resolve().parents[1]
PLAQUE = (176, 254, 290, 296)   # lòng tấm biển (x0, y0, x1, y1), không gồm viền gỗ

if __name__ == '__main__':
    im = Image.open(ROOT / 'assets' / 'facades' / 'workshop.webp').convert('RGBA')
    a = np.asarray(im).copy()
    x0, y0, x1, y1 = PLAQUE
    rgb = np.ascontiguousarray(a[..., :3])
    lum = rgb.astype(float) @ [0.3, 0.59, 0.11]
    mask = np.zeros(lum.shape, np.uint8)
    mask[y0:y1, x0:x1] = (lum[y0:y1, x0:x1] < 105).astype(np.uint8) * 255
    mask = cv2.dilate(mask, np.ones((3, 3), np.uint8), iterations=2)
    mask[:y0, :] = 0
    mask[y1:, :] = 0
    mask[:, :x0] = 0
    mask[:, x1:] = 0
    fixed = cv2.inpaint(rgb, mask, 5, cv2.INPAINT_TELEA)
    a[..., :3] = fixed
    cutlib.save_webp(Image.fromarray(a), ROOT / 'assets' / 'deco' / 'ocop_shop.webp')
    print('Đã ghi assets/deco/ocop_shop.webp', im.size, 'điểm tô lại:', int((mask > 0).sum()))

# 🗺️ Global Success 11 — Render Pack (Part 2 & Semester Bridge)
> **Chiến lược:** Render sạch 100% không chữ (clean render) → Toàn bộ text tiếng Anh, pin mốc học tập, nhãn Unit 6–10 sẽ được dán bằng CSS/SVG/HTML Overlay sau.  
> **Khóa phong cách:** Dùng `--sref [URL_Part1]` với `--sw 400` để đồng bộ hoàn toàn với Part 1 đã duyệt.

---

## ⚙️ P0 · Cấu hình & Settings Dùng Chung

### 1. Midjourney V6.1 Parameters
```text
--ar 16:9 --sref [URL ảnh Part 1 đã duyệt] --sw 400 --s 250 --v 6.1
```
*(Thay thế `[URL ảnh Part 1 đã duyệt]` bằng link Discord CDN / Imgur của ảnh Part 1)*

### 2. Negative Prompt (Dành cho Flux / Stable Diffusion / Midjourney `--no`)
```text
text, letters, words, signs, labels, numbers, watermark, logo, incorrect flags, American flag, blurry, deformed architecture, photorealistic, 3D render
```

---

## 🎨 P1 · Part 2 — One-Shot Toàn Tile (Render Chính)

> **Mục tiêu:** Tạo 1 tile bản đồ hoàn chỉnh tỉ lệ 16:9 cho Học kỳ 2 (Units 6 → 10 + Vạch đích Mũi Cà Mau).

### Prompt Copy-Paste:
```text
Whimsical detailed watercolor storybook map illustration, warm cream parchment background with ornate Dong Son bronze drum pattern border, soft golden afternoon light, gentle ink outlines, cozy hand-drawn Vietnamese cultural aesthetic, rich tiny details of daily life, matte paper texture, a continuing journey map of southern Vietnam. At the TOP RIGHT corner a wide calm blue river enters the frame with a wooden ferry arrival pier where passengers and motorbikes disembark. A winding golden dirt path with small footprints flows RIGHT to LEFT across the upper band: first a glowing Hoi An ancient town at dusk as the largest hero scene, mustard-yellow moss-tile shophouses, the Japanese covered bridge, hundreds of red yellow and purple silk lanterns strung across streets and floating on the canal; then the Temple of Literature with the Khue Van Cac pavilion, red tile courtyards, stone stelae on turtle backs, students in ao dai under golden autumn trees; then a Bat Trang pottery village with a spinning kick-wheel, shelves of blue-white ceramics and a brick kiln with soft smoke. The path curves down the LEFT edge and flows LEFT to RIGHT along the middle band: a Mekong floating market at golden morning with sampan boats loaded with pineapples dragon fruits and tall bamboo produce poles; a friendly neighborhood community courtyard with young volunteers in green shirts, recycling bins and an elderly care reading corner; a lush green mangrove wetland with a wooden ecotourism boardwalk, white egrets, a bright blue kingfisher, a ranger and students with binoculars. The path curves down the RIGHT edge into a small bottom coastal strip: a white lighthouse with a tiny campsite rest stop, then the finale at Ca Mau cape, a tall stone monument topped with the red Vietnamese flag with a single yellow star on a wooden pier reaching into the sea, golden sunset, colorful celebration bunting, seabirds. The BOTTOM LEFT corner is intentionally calm and nearly empty: open delta water with a few pink lotus flowers. Decorative Dong Son bronze drum pattern border, warm cream paper background, no text, no letters, no labels, no signage, no watermark --ar 16:9 --sref [URL_Part1] --sw 400 --s 250 --v 6.1
```

### ✅ Tiêu chuẩn Kiểm định (QC Checklist):
- [ ] **Bến phà (Arrival Pier):** Nằm chuẩn ở góc phải-trên (`TOP RIGHT`), tiếp nối từ Part 1.
- [ ] **Đủ 7 cụm bối cảnh chính:**
  1. Hội An (Hero scene to nhất, đèn lồng, chùa Cầu)
  2. Văn Miếu & Khuê Văn Các (rùa đá, áo dài)
  3. Làng gốm Bát Tràng (bàn xoay gốm, lò nung gạch)
  4. Chợ nổi miền Tây (thuyền trái cây, cây bẹo)
  5. Sân cộng đồng tình nguyện (áo xanh tình nguyện, góc đọc sách người cao tuổi)
  6. Rừng ngập mặn (cầu gỗ sinh thái, cò trắng, bói cá)
  7. Mũi Cà Mau & Cột mốc cờ (Đích đến, hải đăng)
- [ ] **Góc trái-dưới (`BOTTOM LEFT`):** Thoáng, chỉ có mặt nước sông rạch và hoa sen (để bố trí UI/HUD điều khiển).
- [ ] **Cờ Tổ quốc tại vạch FINISH:** Nền đỏ tươi, đúng duy nhất 1 ngôi sao vàng 5 cánh ở giữa.

---

## ✂️ P2 · Fallback — Tách 3 Dải Ngang (Khi One-Shot Lệch Bố Cục)

Nếu render 1 shot không kiểm soát được đường đi hoặc bị dính/lẫn cảnh, sử dụng 3 prompt dải panorama (`--ar 21:9`) sau đó ghép lại:

### P2a · Dải Trên: Hội An → Văn Miếu → Bát Tràng (R → L)
```text
Whimsical detailed watercolor storybook map illustration, warm cream parchment background, soft golden dusk light, gentle ink outlines, cozy hand-drawn Vietnamese aesthetic, matte paper texture, a wide panoramic band. At the FAR RIGHT edge a wooden ferry arrival pier on a calm blue river. A winding golden dirt path with small footprints flows RIGHT to LEFT: a glowing Hoi An ancient town at dusk as the largest scene, mustard-yellow shophouses, the Japanese covered bridge, hundreds of silk lanterns strung across the street and floating on the canal; then the Temple of Literature with Khue Van Cac pavilion and stone turtle stelae under golden autumn trees, students in ao dai; then a Bat Trang pottery village with a spinning kick-wheel, stacked blue-white ceramics and a smoking brick kiln. The path exits at the BOTTOM LEFT corner. Decorative Dong Son bronze border strip along the top edge, warm cream paper background, no text, no labels, no signage, no watermark --ar 21:9 --sref [URL_Part1] --sw 400 --s 250 --v 6.1
```

### P2b · Dải Giữa: Chợ Nổi → Cộng Đồng → Rừng Ngập Mặn (L → R)
```text
Whimsical detailed watercolor storybook map illustration, warm cream parchment background, soft golden morning light, gentle ink outlines, cozy hand-drawn Vietnamese aesthetic, matte paper texture, a wide panoramic band. A golden dirt path with footprints ENTERS at the TOP LEFT corner and flows LEFT to RIGHT: a Mekong floating market at golden morning with sampan boats loaded with tropical fruit and tall bamboo produce poles, vendors in conical hats; a friendly neighborhood community courtyard with young volunteers in green shirts sorting recycling bins, an elderly care reading corner, a communal house roof behind; a lush green mangrove wetland with a wooden ecotourism boardwalk curving above tangled roots, white egrets, a bright kingfisher, a ranger and students observing wildlife. The path EXITS at the BOTTOM RIGHT corner. Decorative Dong Son bronze border strips along the top and bottom edges, warm cream paper background, no text, no labels, no signage, no watermark --ar 21:9 --sref [URL_Part1] --sw 400 --s 250 --v 6.1
```

### P2c · Dải Đáy: Trạm Hải Đăng → Đích Mũi Cà Mau (L để trống, R là đích)
```text
Whimsical detailed watercolor storybook map illustration, warm cream parchment background, golden sunset light, gentle ink outlines, cozy hand-drawn Vietnamese aesthetic, matte paper texture, a wide panoramic coastal strip. A golden dirt path with footprints ENTERS at the TOP RIGHT corner and curves down to sea level: a small white lighthouse with a tiny campsite rest stop, a hammock and a campfire; then the triumphant finale on the RIGHT side at Ca Mau cape: a tall stone monument topped with the red Vietnamese flag with a single yellow star on a wooden pier reaching into the sea, golden sunset over the ocean horizon, colorful celebration bunting, seabirds, fishing boats returning. The LEFT HALF of the band is intentionally calm and nearly empty: open sea and delta water with a few pink lotus flowers and gentle ripples. Decorative Dong Son bronze border strip along the bottom edge, warm cream paper background, no text, no labels, no signage, no watermark --ar 21:9 --sref [URL_Part1] --sw 400 --s 250 --v 6.1
```

---

## 🛠️ P3 · Inpaint / Patching (Vary Region)

### P3c · Sửa cờ FINISH (Dự phòng nếu AI vẽ sai sao vàng):
Quét chọn vùng lá cờ trên đỉnh cột mốc và chạy prompt:
```text
correct the flag on top of the stone monument: flat bright red rectangular flag with one single large centered yellow five-pointed star, waving gently, watercolor style, seamless with surrounding artwork, no text
```

---

## 🌊 P4 · Dải Sông Nối (Semester Strait)
*(Dùng khi muốn ghép Part 1 & Part 2 bằng một dải phân cách dòng sông riêng biệt)*

```text
Whimsical detailed watercolor storybook illustration, warm cream parchment edges, late-afternoon light, a narrow panoramic river band: a wide calm brown-blue delta river flowing horizontally, lush green banks with water coconut palms along the TOP and BOTTOM edges, one small wooden pier on the upper bank and one small wooden pier on the lower bank aligned vertically at the center, a wooden ferry boat carrying motorbikes and passengers crossing the river, gentle ripples, white egrets, warm cream paper background, no text, no labels, no signage, no watermark --ar 21:9 --sref [URL_Part1] --sw 400 --s 250 --v 6.1
```

---

## 💡 Ma Trận Liên Kết Bài Học & Điểm Mốc (Units 6–10)

| Điểm mốc trên bản đồ | Unit liên kết | Chủ đề SGK Global Success 11 | Chi tiết đồ họa nhận diện |
| :--- | :--- | :--- | :--- |
| **Hội An Ancient Town** | Unit 6 | *Preserving Our Heritage* | Chùa Cầu, tường vàng rêu phong, đèn lồng ngũ sắc |
| **Temple of Literature** | Unit 7 | *Education Options for School-Leavers* | Khuê Văn Các, bia tiến sĩ rùa đá, bóng cây lá vàng |
| **Bat Trang Pottery Village** | Unit 8 | *Becoming Independent* | Bàn xoay làm gốm, kệ gốm lam trắng, lò nung |
| **Community Courtyard / Mekong** | Unit 9 | *Social Issues* | Thanh niên áo xanh phân loại rác, góc đọc sách người già |
| **Mangrove Wetland** | Unit 10 | *Ecosystems* | Cầu gỗ xuyên rừng sú vẹt, chim bói cá, cán bộ kiểm lâm |
| **Ca Mau Cape & Lighthouse** | Course Finale | *Achievement / Graduation* | Cột mốc hải đăng, cờ đỏ sao vàng, hoàng hôn biển Nam |

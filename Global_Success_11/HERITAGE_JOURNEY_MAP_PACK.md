# 🗺️ Heritage Journey Map — Complete Render Pack (Google Tools Edition)
> **Chiến lược:** Render tranh sạch 100% không dán chữ (clean render, no baked text) $\rightarrow$ Toàn bộ chữ tiếng Anh (tiêu đề, biển hiệu, huy hiệu, số Unit) sẽ được phủ lớp HTML / SVG / Figma Overlay sau.  
> **Tối ưu hóa cho Google Tools:** ImageFX, Gemini (Advanced / Flash), và Whisk — không dùng cú pháp `--parameter` của Midjourney, không cần trường negative prompt rời (các từ khóa loại trừ chữ đã được tích hợp thẳng vào văn phong prompt).

---

## 🛠️ G0 · Hướng Dẫn Thực Hiện Trên Google Tools

| Công cụ | Cách sử dụng chuẩn |
| :--- | :--- |
| **ImageFX** (`labs.google/fx`) | Dán nguyên văn prompt $\rightarrow$ Chọn tỉ lệ **16:9** (hoặc **Wide landscape**) trực tiếp trong giao diện UI. |
| **Gemini** | Đính kèm ảnh mẫu Part 1 đã duyệt + câu lệnh:  <br>`Match the watercolor storybook style of the attached reference image.` + dán tiếp prompt cảnh. |
| **Whisk** (`labs.google/whisk`) | Tải ảnh đã duyệt làm **STYLE reference** $\rightarrow$ Dán prompt vào ô mô tả cảnh (**Scene description**). |

### 📌 Nguyên tắc cốt lõi:
1. **Không có ô Negative Prompt riêng trong Google Tools:** Toàn bộ cụm từ cấm chữ (`no text, no letters, no words, no signs, no labels, no numbers, no watermark...`) đã được nhúng tự nhiên vào cuối mỗi prompt. **Giữ nguyên các câu này khi copy**.
2. **Đồng bộ Style (Không dùng `--sref`):** Sự nhất quán phong cách được đảm bảo bằng 2 yếu tố:
   - Dùng chung đoạn **Shared Style Prefix** ở đầu mỗi prompt.
   - Luôn đính kèm ảnh Part 1 chuẩn làm ảnh tham chiếu (Image reference) khi gen Part 2 trong Gemini/Whisk.
3. **Đã chuẩn hóa thứ tự Unit:** Part 1 đã sửa triệt để thứ tự U4 (Lễ hội mùa xuân) $\rightarrow$ U5 (Bờ biển biến đổi khí hậu), thay cờ quốc gia bằng cờ đuôi nheo tam giác (bunting) tránh vẽ lỗi.

---

## 🎨 Shared Style Prefix (Dùng chung cho mọi prompt — Không chỉnh sửa)

```text
Whimsical detailed watercolor storybook map illustration, warm cream parchment background with ornate Dong Son bronze drum pattern border, soft golden light, gentle ink outlines, cozy hand-drawn Vietnamese cultural aesthetic, rich tiny details of daily life, matte paper texture
```

---

## 🏮 P1 · PART 1 — One-Shot Toàn Tile (Semester 1, Render Chính)

```text
Whimsical detailed watercolor storybook map illustration, warm cream parchment background with ornate Dong Son bronze drum pattern border, soft golden morning light, gentle ink outlines, cozy hand-drawn Vietnamese cultural aesthetic, rich tiny details of daily life, matte paper texture, a journey map of northern and central Vietnam. At the TOP LEFT corner a traditional Vietnamese village gate with a curved tile roof and a giant old banyan tree, red lanterns, and a blank rustic wooden signboard beside the gate. A winding golden dirt path with small footprints flows LEFT to RIGHT across the top row: Hoan Kiem lake at sunrise with Turtle Tower on a green islet, the bright red Huc bridge, elderly people doing tai chi, a young cyclist, a fresh vegetable stall and lotus flowers; then a narrow yellow tube house shown in cutaway cross-section with three generations inside: a grandmother sipping tea on the ground floor, parents cooking dinner in the middle, a teenager with headphones on the top balcony, potted orchids; then a futuristic eco smart city with an elevated metro skytrain, glass towers covered in vertical hanging gardens, wind turbines and solar panel rooftops. The path curves down the RIGHT edge to a humble sidewalk iced tea stall under a huge old banyan tree, tiny blue plastic stools, a hammock and a cyclo parked nearby. The path then flows RIGHT to LEFT across the middle row: first a festive Vietnamese temple courtyard during a spring festival with red and yellow triangular bunting flags on bamboo poles, a colorful dragon dance performance, women in ao dai, a large bronze drum and joyful crowds; then a dramatic coastline split in two halves, the left side a cracked dry eroded beach with bleached coral under a harsh blazing orange sun, the right side full of hope with farmers in conical hats planting green mangrove seedlings, offshore white wind turbines and a house with solar panels and rainwater tanks. The path curves down the LEFT edge and flows LEFT to RIGHT along the bottom row to a rustic wooden river ferry pier on the RIGHT side, where a wooden ferry boat carries motorbikes and passengers across a wide calm river, water coconut palms on the banks. The BOTTOM LEFT corner is intentionally calm and nearly empty: open delta water with a few pink lotus flowers. Decorative Dong Son bronze drum pattern in the corners and along the parchment border. No text, no letters, no words, no signs, no labels, no numbers, no national flags, no watermark. Wide 16:9 landscape format.
```

### ✅ QC Checklist Part 1 (Gen 3–4 lần, chọn bản đạt nhất):
- [ ] Cổng làng + biển gỗ trống ở góc **trên-trái** (`TOP LEFT`).
- [ ] Hàng trên (Trái $\rightarrow$ Phải): Hồ Hoàn Kiếm $\rightarrow$ Nhà ống 3 thế hệ $\rightarrow$ Đô thị sinh thái tương lai.
- [ ] Quán trà đá vỉa hè ở **rìa phải** (dải giữa).
- [ ] Hàng giữa (Phải $\rightarrow$ Trái): **Lễ hội đình làng ĐẦU TIÊN**, sau đó đến bờ biển đối lập sinh thái.
- [ ] Bến phà ở góc **dưới-phải** (`BOTTOM RIGHT`).
- [ ] Góc **dưới-trái** phẳng lặng, trống chữ (chừa chỗ cho La bàn / Legend).
- [ ] **KHÔNG** xuất hiện cờ quốc gia (chỉ có cờ đuôi nheo tam giác lễ hội).

---

## ✂️ P2 · PART 1 — Fallback Tách 3 Dải Ngang (Khi One-Shot lệch bố cục)

### P2a · Dải trên: Cổng làng $\rightarrow$ Hồ Gươm $\rightarrow$ Nhà ống $\rightarrow$ Đô thị tương lai (Trái $\rightarrow$ Phải)
```text
Whimsical detailed watercolor storybook map illustration, warm cream parchment background, soft golden morning light, gentle ink outlines, cozy hand-drawn Vietnamese aesthetic, matte paper texture, a wide panoramic band. At the FAR LEFT edge a traditional Vietnamese village gate with curved tile roof, a giant banyan tree, red lanterns and a blank rustic wooden signboard. A winding golden dirt path with small footprints flows LEFT to RIGHT: Hoan Kiem lake at sunrise with Turtle Tower and the red Huc bridge, people doing tai chi and a cyclist, lotus flowers; then a narrow yellow tube house in cutaway cross-section with three generations inside, grandmother sipping tea downstairs, parents cooking, a teenager with headphones on the top balcony; then a futuristic eco smart city with an elevated metro skytrain, glass towers with vertical gardens, wind turbines and solar panels. The path exits at the BOTTOM RIGHT corner. Decorative Dong Son bronze border strip along the top edge, warm cream paper background. No text, no letters, no signs, no labels, no watermark. Wide panoramic banner format.
```

### P2b · Dải giữa: Trà đá $\rightarrow$ Đình làng $\rightarrow$ Bờ biển sinh thái (Phải $\rightarrow$ Trái)
```text
Whimsical detailed watercolor storybook map illustration, warm cream parchment background, warm afternoon light, gentle ink outlines, cozy hand-drawn Vietnamese aesthetic, matte paper texture, a wide panoramic band. A golden dirt path with footprints ENTERS at the TOP RIGHT corner at a humble sidewalk iced tea stall under a huge old banyan tree with tiny blue plastic stools and a hammock, then flows RIGHT to LEFT: a festive Vietnamese temple courtyard during a spring festival with red and yellow triangular bunting on bamboo poles, a colorful dragon dance, women in ao dai and a large bronze drum; then a dramatic coastline split in two halves, a cracked dry eroded beach under a harsh orange sun on one side and hopeful farmers in conical hats planting mangrove seedlings with offshore wind turbines on the other. The path exits at the BOTTOM LEFT corner. Decorative Dong Son bronze border strips along the top and bottom edges, warm cream paper background. No text, no letters, no signs, no national flags, no watermark. Wide panoramic banner format.
```

### P2c · Dải đáy: Vùng đồng bằng $\rightarrow$ Bến phà (Trái $\rightarrow$ Phải, nửa trái để trống)
```text
Whimsical detailed watercolor storybook map illustration, warm cream parchment background, late-afternoon light, gentle ink outlines, cozy hand-drawn Vietnamese aesthetic, matte paper texture, a wide panoramic river band. The LEFT HALF is intentionally calm and nearly empty: open delta water with pink lotus flowers and gentle ripples. A golden dirt path with footprints ENTERS at the TOP LEFT corner and flows LEFT to RIGHT along the river bank: stilt houses and water coconut palms, then a rustic wooden ferry pier on the RIGHT side where a wooden ferry boat carrying motorbikes and passengers waits on a wide calm river, white egrets flying. Decorative Dong Son bronze border strip along the bottom edge, warm cream paper background. No text, no letters, no signs, no labels, no watermark. Wide panoramic banner format.
```

---

## 🛶 P3 · PART 2 — One-Shot Toàn Tile (Semester 2, Render Chính)
> ⚠️ **Lưu ý:** Chỉ chạy sau khi Part 1 đã được duyệt. Luôn đính kèm ảnh Part 1 làm **Style Reference** trong Gemini/Whisk.

```text
Whimsical detailed watercolor storybook map illustration, warm cream parchment background with ornate Dong Son bronze drum pattern border, soft golden afternoon light, gentle ink outlines, cozy hand-drawn Vietnamese cultural aesthetic, rich tiny details of daily life, matte paper texture, a continuing journey map of southern Vietnam. At the TOP RIGHT corner a wide calm blue river enters the frame with a wooden ferry arrival pier where passengers and motorbikes disembark. A winding golden dirt path with small footprints flows RIGHT to LEFT across the upper band: first a glowing Hoi An ancient town at dusk as the largest hero scene, mustard-yellow moss-tile shophouses, the Japanese covered bridge, hundreds of red yellow and purple silk lanterns strung across streets and floating on the canal; then the Temple of Literature with the Khue Van Cac pavilion, red tile courtyards, stone stelae on turtle backs, students in ao dai under golden autumn trees; then a Bat Trang pottery village with a spinning kick-wheel, shelves of blue-white ceramics and a brick kiln with soft smoke. The path curves down the LEFT edge and flows LEFT to RIGHT along the middle band: a Mekong floating market at golden morning with sampan boats loaded with pineapples dragon fruits and tall bamboo produce poles; a friendly neighborhood community courtyard with young volunteers in green shirts, recycling bins and an elderly care reading corner; a lush green mangrove wetland with a wooden ecotourism boardwalk, white egrets, a bright blue kingfisher, a ranger and students with binoculars. The path curves down the RIGHT edge into a small bottom coastal strip: a white lighthouse with a tiny campsite rest stop, then the finale at Ca Mau cape, a tall stone monument topped with the red Vietnamese flag with a single yellow star on a wooden pier reaching into the sea, golden sunset, colorful celebration bunting, seabirds. The BOTTOM LEFT corner is intentionally calm and nearly empty: open delta water with a few pink lotus flowers. Decorative Dong Son bronze drum pattern border, warm cream paper background. No text, no letters, no labels, no signage, no watermark. Wide 16:9 landscape format.
```

### ✅ QC Checklist Part 2:
- [ ] Bến phà đến ở góc **trên-phải** (`TOP RIGHT`).
- [ ] Đủ 7 danh thắng: Hội An to nhất $\rightarrow$ Văn Miếu $\rightarrow$ Bát Tràng $\rightarrow$ Chợ nổi $\rightarrow$ Sân cộng đồng $\rightarrow$ Rừng ngập mặn $\rightarrow$ Mũi Cà Mau.
- [ ] Góc **dưới-trái** thoáng mát, yên tĩnh, chừa khoảng trống cho giao diện người dùng.
- [ ] Cờ đích đến Mũi Cà Mau đúng chuẩn: Nền đỏ, duy nhất **một ngôi sao vàng 5 cánh ở chính giữa** (nếu sai sao thì inpaint theo P5c).

---

## ✂️ P4 · PART 2 — Fallback Tách 3 Dải Ngang

### P4a · Dải trên: Bến phà $\rightarrow$ Hội An $\rightarrow$ Văn Miếu $\rightarrow$ Bát Tràng (Phải $\rightarrow$ Trái)
```text
Whimsical detailed watercolor storybook map illustration, warm cream parchment background, soft golden dusk light, gentle ink outlines, cozy hand-drawn Vietnamese aesthetic, matte paper texture, a wide panoramic band. At the FAR RIGHT edge a wooden ferry arrival pier on a calm blue river. A winding golden dirt path with small footprints flows RIGHT to LEFT: a glowing Hoi An ancient town at dusk as the largest scene, mustard-yellow shophouses, the Japanese covered bridge, hundreds of silk lanterns strung across the street and floating on the canal; then the Temple of Literature with Khue Van Cac pavilion and stone turtle stelae under golden autumn trees, students in ao dai; then a Bat Trang pottery village with a spinning kick-wheel, stacked blue-white ceramics and a smoking brick kiln. The path exits at the BOTTOM LEFT corner. Decorative Dong Son bronze border strip along the top edge, warm cream paper background. No text, no letters, no signs, no labels, no watermark. Wide panoramic banner format.
```

### P4b · Dải giữa: Chợ nổi $\rightarrow$ Khu phố cộng đồng $\rightarrow$ Rừng ngập mặn (Trái $\rightarrow$ Phải)
```text
Whimsical detailed watercolor storybook map illustration, warm cream parchment background, soft golden morning light, gentle ink outlines, cozy hand-drawn Vietnamese aesthetic, matte paper texture, a wide panoramic band. A golden dirt path with footprints ENTERS at the TOP LEFT corner and flows LEFT to RIGHT: a Mekong floating market at golden morning with sampan boats loaded with tropical fruit and tall bamboo produce poles, vendors in conical hats; a friendly neighborhood community courtyard with young volunteers in green shirts sorting recycling bins, an elderly care reading corner, a communal house roof behind; a lush green mangrove wetland with a wooden ecotourism boardwalk curving above tangled roots, white egrets, a bright kingfisher, a ranger and students observing wildlife. The path EXITS at the BOTTOM RIGHT corner. Decorative Dong Son bronze border strips along the top and bottom edges, warm cream paper background. No text, no letters, no signs, no labels, no watermark. Wide panoramic banner format.
```

### P4c · Dải đáy: Hải đăng $\rightarrow$ Đích Mũi Cà Mau (Về phía phải; nửa trái để trống)
```text
Whimsical detailed watercolor storybook map illustration, warm cream parchment background, golden sunset light, gentle ink outlines, cozy hand-drawn Vietnamese aesthetic, matte paper texture, a wide panoramic coastal strip. A golden dirt path with footprints ENTERS at the TOP RIGHT corner and curves down to sea level: a small white lighthouse with a tiny campsite rest stop, a hammock and a campfire; then the triumphant finale on the RIGHT side at Ca Mau cape: a tall stone monument topped with the red Vietnamese flag with a single yellow star on a wooden pier reaching into the sea, golden sunset over the ocean horizon, colorful celebration bunting, seabirds, fishing boats returning. The LEFT HALF of the band is intentionally calm and nearly empty: open sea and delta water with a few pink lotus flowers and gentle ripples. Decorative Dong Son bronze border strip along the bottom edge, warm cream paper background. No text, no letters, no signs, no labels, no watermark. Wide panoramic banner format.
```

---

## 🩹 P5 · Patches (Inpaint / Thay thế vùng nhỏ)

### P5a · Dải lụa trống (Xóa bỏ chữ "HỌC KỲ I" bị gen dính)
```text
ornate blank parchment ribbon banner with painted flower and leaf corners, hanging from the old tree branch, empty center panel, watercolor style, seamless with surrounding artwork, no text, no letters, no words
```

### P5b · Biển gỗ trống (Xóa bỏ chữ "BẮT ĐẦU" bị gen dính ở cổng làng)
```text
blank rustic wooden signboard on a wooden post beside the village gate path, empty weathered planks, watercolor style, seamless with surrounding artwork, no text, no letters, no words
```

### P5c · Sửa cờ FINISH (Part 2 - Vá lại nếu ngôi sao vàng bị dị tật hoặc sai số cánh)
```text
correct the flag on top of the stone monument: flat bright red rectangular flag with one single large centered yellow five-pointed star, waving gently, watercolor style, seamless with surrounding artwork, no text
```

---

## 🌊 P6 · Semester Strait — Seam Band (Dải sông nối 2 học kỳ)
*(Dùng khi muốn ghép Part 1 & Part 2 bằng một dải phân cách dòng sông riêng biệt)*

```text
Whimsical detailed watercolor storybook illustration, warm cream parchment edges, late-afternoon light, a narrow panoramic river band: a wide calm brown-blue delta river flowing horizontally, lush green banks with water coconut palms along the TOP and BOTTOM edges, one small wooden pier on the upper bank and one small wooden pier on the lower bank aligned vertically at the center, a wooden ferry boat carrying motorbikes and passengers crossing the river, gentle ripples, white egrets, warm cream paper background. No text, no letters, no signs, no labels, no watermark. Wide panoramic banner format.
```

---

## 📋 Master Checklist — Quy Trình Render Chuẩn

| # | Bước thực hiện | Thao tác chi tiết | Sản phẩm đầu ra |
| :---: | :--- | :--- | :--- |
| **1** | **Chạy P1 (Part 1)** | Reroll 3–4 lần trên ImageFX/Gemini $\rightarrow$ Chọn bản đạt chuẩn QC | Part 1 tile hoàn chỉnh |
| **2** | **Trường hợp lỗi bố cục** | Chạy 3 dải **P2a $\rightarrow$ P2b $\rightarrow$ P2c** rồi ghép lại | 3 strips ghép nối |
| **3** | **Inpaint làm sạch Part 1** | Áp dụng **P5a + P5b** để tẩy sạch các vệt chữ trên banner/biển gỗ nếu có | Clean Part 1 sẵn sàng làm ref |
| **4** | **Chạy P3 (Part 2)** | Đính kèm ảnh Part 1 đã duyệt làm Style Reference $\rightarrow$ Reroll 3–4 lần | Part 2 tile đồng bộ |
| **5** | **Trường hợp lỗi Part 2** | Chạy 3 dải **P4a $\rightarrow$ P4b $\rightarrow$ P4c** rồi ghép lại | 3 strips ghép nối |
| **6** | **Kiểm tra cờ đích (FINISH)** | Nếu sao vàng bị lệch số cánh, quét chọn vùng và chạy **P5c** | Clean flag chuẩn Quốc kỳ |
| **7** | **Dải sông nối (Tùy chọn)** | Chạy **P6** nếu thiết kế phân tách rõ 2 kỳ học | Seam band chuyển tiếp |
| **8** | **Upscale chất lượng cao** | Nâng độ phân giải $2\times$ qua Topaz / Upscaler bên ngoài | Bộ Asset chuẩn Web/Figma sắc nét |

> 💡 **Kinh nghiệm:** Tối đa 4 lần reroll cho mỗi tile. Nếu chỉ bị khuyết tật ở một chi tiết nhỏ (như mặt người, ngôi sao, biển gỗ), hãy dùng công cụ inpaint/crop sửa đúng vùng đó thay vì gen lại toàn bộ.

---

## 🧷 Quy Chuẩn Bố Cục Lớp Phủ (HTML/SVG/Figma Overlay)
*(Toàn bộ các phần tử bên dưới sẽ được dựng bằng code hoặc layer Figma độc lập, tuyệt đối không vẽ cố định vào ảnh gốc)*

- **Dải lụa tiêu đề (Banners):**
  - Semester 1: `SEMESTER 1 — From the Village Gate to the Future`
  - Semester 2: `SEMESTER 2 — Heritage to the Horizon`
- **Biển hiệu điều hướng (Signboards):**
  - Khởi đầu: `START`
  - Đích đến: `FINISH — Journey Complete!`
- **Huy hiệu lá nón đánh số bài học (Numbered Conical-Leaf Pins):**
  - `Unit 1` $\rightarrow$ `Unit 10`
  - Các trạm ôn tập: `Review 1` $\rightarrow$ `Review 4`
- **Góc dưới-trái (Bottom-Left của Part 2):** Vị trí đặt **Chú giải bản đồ (Legend)** & **La bàn phong cách Đông Sơn (Compass)**.
- **Góc trên-phải (Top-Right):** Nút tròn mở Túi học tập / Bảng thành tích (**Backpack FAB**).

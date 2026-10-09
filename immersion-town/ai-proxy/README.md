# Máy chủ trung gian cho "Trò chuyện tự do"

Sau khi học sinh hoàn thành nhiệm vụ với một du khách (Mark, Sarah, Emma, Professor David), game có nút **💬 Trò chuyện với …**.
Học sinh nói hoặc gõ tiếng Anh tự do; du khách trả lời 1–2 câu mức B1 bằng AI.

Game chạy trên GitHub Pages nên không giữ được khoá API. `worker.js` là một Cloudflare Worker làm trung gian:

```text
Game (lexiphoria.github.io) ──câu học sinh──► Cloudflare Worker (giữ khoá, ghép vai diễn) ──► NVIDIA hoặc Workers AI
```

* Chỉ nhận yêu cầu từ `https://lexiphoria.github.io`; lời dặn vai diễn nằm trong Worker nên không ai dùng nó làm chatbot hỏi đáp tự do.
* Mỗi lần gửi tối đa 10 lượt gần nhất, mỗi lượt 400 ký tự, câu trả lời tối đa 90 token; mỗi địa chỉ mạng tối đa 15 lượt/phút.
* Game không gửi tên Local Host. Khung trò chuyện nhắc học sinh không nói tên thật, số điện thoại, tên trường.
* Gọi AI không được (mất mạng, hết hạn mức, sai khoá): du khách trả lời bằng câu soạn sẵn, game vẫn chơi bình thường.

## Cài đặt (làm trên trang Cloudflare, không cần cài phần mềm)

### 1. Tạo Worker
1. Vào https://dash.cloudflare.com → **Compute (Workers) → Workers & Pages** → **Create** → **Create Worker** (mẫu *Hello World*).
2. Đặt tên `immersion-chat` → **Deploy**.
3. Bấm **Edit code**, xoá hết mã mẫu, dán toàn bộ nội dung tệp `worker.js` này → **Deploy**.

### 2. Dán khoá NVIDIA (giai đoạn nghiên cứu, thử nghiệm)
1. Trong Worker vừa tạo: **Settings → Variables and Secrets → Add**.
2. *Type*: **Secret**, *Variable name*: `NVIDIA_API_KEY`, *Value*: khoá lấy ở https://build.nvidia.com/settings/api-keys (bắt đầu bằng `nvapi-`) → **Deploy**.
3. Không dán khoá vào game, tệp trong repo hay tin nhắn. Khoá chỉ nằm trong Cloudflare.

Tuỳ chọn (cũng ở *Variables and Secrets*, kiểu *Text*):

| Biến | Mặc định | Ý nghĩa |
|---|---|---|
| `MODEL` | `meta/llama-3.3-70b-instruct` | Mô hình. Đổi mô hình: mở trang mô hình trên build.nvidia.com → *View Code*, chép đúng chuỗi `model` |
| `ALLOWED_ORIGINS` | `https://lexiphoria.github.io` | Các trang được gọi Worker, cách nhau dấu phẩy |

### 3. Bật trong game
Địa chỉ Worker có dạng `https://immersion-chat.<tên-của-bạn>.workers.dev`. Điền vào `data/ai-chat.json`:

```json
"endpoint": "https://immersion-chat.<tên-của-bạn>.workers.dev"
```

Để trống `endpoint` thì nút Trò chuyện tự do không hiện. `max_turns` là số câu học sinh nói trong một lần trò chuyện (mặc định 8).

## Chuyển sang Cloudflare Workers AI (dùng chính thức cho cả lớp)
Gói dùng thử của NVIDIA chỉ dành cho nghiên cứu, thử nghiệm (khoảng 40 lượt/phút). Khi đưa vào dùng chính thức:

1. Worker → **Settings → Bindings → Add → Workers AI**, đặt tên biến `AI` → **Deploy**.
2. **Variables and Secrets**: thêm `PROVIDER` = `workers-ai` (có thể xoá `NVIDIA_API_KEY`).
3. Mô hình mặc định `@cf/meta/llama-4-scout-17b-16e-instruct`; đổi bằng biến `MODEL` nếu cần.

Gói miễn phí: 10.000 neuron/ngày (làm mới lúc 7 giờ sáng giờ Việt Nam). Hết hạn mức trong ngày thì game dùng câu soạn sẵn.

## Thử trên máy
Chạy game ở `http://localhost:8765`, rồi trong Console của trình duyệt:

```js
localStorage.setItem('immersionTown.aiEndpoint', 'http://localhost:8778/chat') // máy chủ thử
localStorage.removeItem('immersionTown.aiEndpoint')                             // bỏ
```

Cách ghi đè này chỉ có tác dụng khi chạy trên `localhost`.

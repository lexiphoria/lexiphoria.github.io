/* Máy chủ trung gian cho chế độ "Trò chuyện tự do" của Immersion Town (Cloudflare Worker).

   Game (GitHub Pages) gửi câu học sinh nói tới đây; Worker giữ khoá API, ghép lời dặn vai diễn của du khách
   rồi hỏi mô hình ngôn ngữ, trả về 1–2 câu tiếng Anh. Lời dặn vai diễn nằm ở đây (không nhận từ trình duyệt)
   để không ai dùng Worker này làm chatbot hỏi đáp tự do.

   Biến môi trường (Cloudflare → Worker → Settings → Variables and Secrets):
     PROVIDER         'nvidia' (mặc định khi có NVIDIA_API_KEY) hoặc 'workers-ai'
     NVIDIA_API_KEY   khoá build.nvidia.com (kiểu Secret)
     MODEL            tên mô hình, có thể ghi nhiều tên cách nhau dấu phẩy; mặc định xem DEFAULT_MODELS
     ALLOWED_ORIGINS  các trang được gọi, cách nhau dấu phẩy; mặc định https://lexiphoria.github.io
   Binding Workers AI tên AI (Settings → Bindings): dùng khi PROVIDER = 'workers-ai', và là phương án dự phòng tự động
   khi NVIDIA chậm hoặc lỗi. Hướng dẫn: ai-proxy/README.md */

// Thử lần lượt: mô hình bị ngừng, báo lỗi, quá thời gian chờ hoặc trả lời rỗng thì chuyển sang mô hình kế tiếp.
// Danh sách công khai của NVIDIA còn nhiều mô hình đã ngừng chạy trên gói miễn phí (trả 404 với khoá thật).
// Đo ngày 09/10/2026 bằng khoá dùng thử: nemotron-3-super trả lời ~3 giây, muse-glimmer ~4,5 giây; các mô hình khác
// báo 404 hoặc chờ quá 8 giây. Worker nhớ mô hình vừa trả lời được để lần sau thử trước, bỏ qua mô hình đã báo 404 / 410.
const DEFAULT_MODELS = {
  nvidia: [
    'nvidia/nemotron-3-super-120b-a12b', 'meta/muse-glimmer-30b', 'nvidia/nemotron-3.5-lightning-30b-a3b', 'google/gemma-4-31b-it',
    'z-ai/glm-5.3-flash', 'deepseek-ai/deepseek-v4.1-flash', 'openai/gpt-oss-20b',
  ],
  'workers-ai': ['@cf/meta/llama-4-scout-17b-16e-instruct', '@cf/google/gemma-3-12b-it'],
};
// Tắt bước suy luận (mô hình suy luận dùng hết token cho phần "suy nghĩ" nên trả lời rỗng).
// NVIDIA không nhận tham số này thì Worker gửi lại không kèm tham số.
const NO_THINKING = { chat_template_kwargs: { enable_thinking: false } };
const MODEL_OPTIONS = {
  'nvidia/nemotron-3-super-120b-a12b': NO_THINKING,
  'nvidia/nemotron-3.5-lightning-30b-a3b': NO_THINKING,
  'z-ai/glm-5.3-flash': NO_THINKING,
  'deepseek-ai/deepseek-v4.1-flash': NO_THINKING,
  'openai/gpt-oss-20b': { reasoning_effort: 'low' },
};
const NVIDIA_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const MAX_MESSAGES = 10;      // chỉ gửi 10 lượt gần nhất
const MAX_CHARS = 400;        // mỗi lượt tối đa 400 ký tự
const MAX_TOKENS = 300;       // đủ cho mô hình có bước suy luận; câu trả lời vẫn được cắt còn 1–2 câu
const PER_MINUTE = 15;        // mỗi địa chỉ mạng tối đa 15 lượt/phút (ước lượng trong từng máy chủ của Cloudflare)
const TIMEOUT_MS = 8000;      // mỗi mô hình chờ tối đa 8 giây (biến TIMEOUT_MS để đổi)
const BUDGET_MS = 25000;      // tổng thời gian thử các mô hình cho một câu
const FALLBACK_AFTER_MS = 14000; // có binding Workers AI: thử NVIDIA tối đa 14 giây rồi chuyển sang Workers AI

const PERSONAS = {
  mark: 'You are Mark, a friendly American eco-backpacker in your twenties visiting Hoi An, Vietnam. Earlier today a Vietnamese '
    + 'high-school student, the Local Host, helped you charge your rental electric scooter at the EV charging station outside the '
    + 'old town, explained that motorbikes are not allowed in the pedestrian zone, and showed you the electric shuttle to the centre. '
    + 'You love green travel and casual American English.',
  sarah: 'You are Sarah, a polite British tourist who loves cultural experiences. You leave Hoi An tomorrow evening. With the help of '
    + 'a Vietnamese high-school student, the Local Host, you ordered a custom-tailored ao dai in mulberry silk at Uncle Minh\'s tailor '
    + 'shop. He only speaks Vietnamese, so the student translated your shoulder and waist measurements, and your fitting is this afternoon.',
  emma: 'You are Emma, a cheerful German travel vlogger. A Vietnamese high-school student, the Local Host, guided you step by step '
    + 'to make your own silk lantern at a handicraft workshop in Hoi An: you glued silk onto a bamboo frame. You film everything '
    + 'and love local craftsmanship and souvenirs.',
  david: 'You are Professor David, a warm Australian heritage researcher. Tonight a Vietnamese high-school student, the Local Host, '
    + 'joined you on the night electric-boat cruise on the Hoai River, where you released a biodegradable flower lantern and made a '
    + 'wish. You care deeply about heritage preservation.',
};

const RULES = `You are chatting with a Vietnamese high-school student who is practising English as your Local Host in a learning game.
Rules:
- Reply in English only, at CEFR B1 level, in one or two short sentences (no more than 35 words). Sound natural and friendly, like a real tourist.
- Talk about your trip in Hoi An, Vietnamese culture, food, crafts and travel. End most replies with one simple question so the student keeps talking.
- If the student writes in Vietnamese or makes mistakes, do not lecture; reply simply in English and naturally reuse the correct phrase.
- Never ask for or repeat personal information (real name, age, phone, address, school, social media, photos). If the student shares it, kindly say they do not need to.
- Avoid violence, adult content, politics and anything unsafe for teenagers; gently bring the talk back to the trip.
- If asked whether you are real, say you are an AI character in the game.
- No emojis, no lists, no markdown.`;

const hits = new Map(); // địa chỉ mạng → các mốc thời gian gọi trong 60 giây gần nhất

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function json(body, status, headers = {}) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers } });
}

function tooMany(ip, now = Date.now()) {
  const list = (hits.get(ip) || []).filter((t) => now - t < 60000);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > PER_MINUTE;
}

// Kiểm tra dữ liệu gửi lên: chỉ nhận đúng các trường cần, cắt ngắn, bỏ phần thừa
function readRequest(body) {
  if (!body || typeof body !== 'object' || !PERSONAS[body.npc] || !Array.isArray(body.messages)) return null;
  const messages = body.messages.slice(-MAX_MESSAGES)
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_CHARS) }));
  if (!messages.length || messages[messages.length - 1].role !== 'user') return null;
  const vocab = (Array.isArray(body.vocab) ? body.vocab : [])
    .filter((w) => typeof w === 'string' && /^[\p{L}\p{M}' -]{2,40}$/u.test(w))
    .slice(0, 8);
  return { npc: body.npc, messages, vocab };
}

function systemPrompt(npc, vocab) {
  const words = vocab.length ? `\n- When it fits naturally, use or invite these words: ${vocab.join(', ')}.` : '';
  return `${PERSONAS[npc]}\n\n${RULES}${words}`;
}

// Làm gọn câu trả lời: bỏ phần "suy nghĩ" của mô hình, dấu ngoặc kép, ký hiệu markdown; giữ tối đa 2 câu / 45 từ
function tidy(text) {
  let t = String(text || '').replace(/<think>[\s\S]*?<\/think>/gi, '').replace(/[*_#`"“”]/g, '').replace(/\s+/g, ' ').trim();
  // Tách câu ở dấu . ! ? có khoảng trắng phía sau (giữ nguyên số thập phân như 2.5)
  t = t.split(/(?<=[.!?])\s+/).slice(0, 2).join(' ').trim();
  const words = t.split(' ');
  if (words.length > 45) t = `${words.slice(0, 45).join(' ').replace(/[,;:]$/, '')}…`;
  return t;
}

// Mô hình không nhận vai trò "system" (một số bản Gemma): gộp lời dặn vào đầu câu hỏi đầu tiên của học sinh
function mergeSystem(messages) {
  const [sys, ...rest] = messages;
  const i = rest.findIndex((m) => m.role === 'user');
  return rest.map((m, j) => (j === i ? { role: 'user', content: `${sys.content}\n\n${m.content}` } : m));
}

async function askNvidia(env, models, messages, budget = BUDGET_MS) {
  const timeout = Number(env.TIMEOUT_MS) || TIMEOUT_MS;
  const start = Date.now();
  const call = (model, msgs, extra) => fetch(NVIDIA_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.NVIDIA_API_KEY}`, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ model, messages: msgs, max_tokens: MAX_TOKENS, temperature: 0.7, top_p: 0.9, stream: false, ...extra }),
    signal: AbortSignal.timeout(Math.max(1000, Math.min(timeout, budget - (Date.now() - start)))),
  });
  const tried = [];
  for (const model of models) {
    if (Date.now() - start > budget - 1000) break;
    const extra = MODEL_OPTIONS[model];
    let res;
    try {
      res = await call(model, messages, extra);
      if (res.status === 400 && extra) res = await call(model, messages);      // không nhận tham số tắt suy luận
      if (res.status === 400) res = await call(model, mergeSystem(messages));  // không nhận vai trò system
    } catch (e) {
      // quá thời gian chờ hoặc lỗi mạng: thử mô hình kế tiếp
      tried.push(`${model} ${e.name === 'TimeoutError' || e.name === 'AbortError' ? 'timeout' : 'network'}`);
      continue;
    }
    if (res.ok) {
      const data = await res.json();
      const msg = data.choices && data.choices[0] && data.choices[0].message;
      const text = tidy(msg && msg.content);
      if (text) {
        lastGood = model;
        return { text, model };
      }
      tried.push(`${model} empty`); // mô hình chỉ suy luận mà chưa kịp trả lời
      continue;
    }
    tried.push(`${model} ${res.status}`);
    if (res.status === 404 || res.status === 410) dead.add(model);
    // Sai khoá (401, 403) thì dừng; mô hình bị ngừng, không hỗ trợ, quá tải hay lỗi máy chủ thì thử mô hình kế tiếp
    if (res.status === 401 || res.status === 403) break;
  }
  throw new Error(`nvidia ${tried.join(', ') || 'no model'}`);
}

const dead = new Set(); // mô hình đã báo 404 / 410 trong phiên chạy này của Worker: bỏ qua
let lastGood = null;    // mô hình vừa trả lời được: lần sau thử trước

function ordered(models) {
  let alive = models.filter((m) => !dead.has(m));
  if (!alive.length) {
    dead.clear();
    alive = models;
  }
  return alive.includes(lastGood) ? [lastGood, ...alive.filter((m) => m !== lastGood)] : alive;
}

async function askWorkersAI(env, models, messages) {
  if (!env.AI) throw new Error('workers-ai missing binding AI');
  const tried = [];
  for (const model of models) {
    try {
      const out = await env.AI.run(model, { messages, max_tokens: MAX_TOKENS, temperature: 0.7 });
      const msg = out && out.choices && out.choices[0] && out.choices[0].message;
      const text = tidy(typeof out.response === 'string' ? out.response : (msg && msg.content) || (out.response && out.response.text));
      if (text) return { text, model };
      tried.push(`${model} empty`);
    } catch (e) {
      tried.push(`${model} ${String(e.message || e).slice(0, 60)}`);
    }
  }
  throw new Error(`workers-ai ${tried.join(', ') || 'no model'}`);
}

const list = (s) => s.split(',').map((x) => x.trim()).filter(Boolean);

// prefer: mô hình muốn thử khi đo tốc độ; chỉ nhận tên có trong danh sách cho phép, và không chuyển sang dự phòng
async function askModel(env, messages, prefer) {
  const provider = env.PROVIDER || (env.NVIDIA_API_KEY ? 'nvidia' : 'workers-ai');
  const nvidia = provider === 'nvidia' && env.MODEL ? list(env.MODEL) : DEFAULT_MODELS.nvidia;
  const workersAI = provider === 'workers-ai' && env.MODEL ? list(env.MODEL) : DEFAULT_MODELS['workers-ai'];
  if (workersAI.includes(prefer)) return askWorkersAI(env, [prefer], messages);
  if (provider !== 'nvidia') return askWorkersAI(env, workersAI, messages);
  if (nvidia.includes(prefer)) return askNvidia(env, [prefer], messages);
  try {
    // Có binding Workers AI thì chừa thời gian cho phương án dự phòng
    return await askNvidia(env, ordered(nvidia), messages, env.AI ? FALLBACK_AFTER_MS : BUDGET_MS);
  } catch (e) {
    if (!env.AI) throw e;
    try {
      return await askWorkersAI(env, workersAI, messages);
    } catch (e2) {
      throw new Error(`${e.message}; ${e2.message}`);
    }
  }
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = (env.ALLOWED_ORIGINS || 'https://lexiphoria.github.io').split(',').map((s) => s.trim()).filter(Boolean);
    if (!allowed.includes(origin)) return json({ error: 'origin not allowed' }, 403);
    const cors = corsHeaders(origin);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return json({ error: 'use POST' }, 405, cors);

    const ip = request.headers.get('CF-Connecting-IP') || 'local';
    if (tooMany(ip)) return json({ error: 'too many requests' }, 429, cors);

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return json({ error: 'bad json' }, 400, cors);
    }
    const req = readRequest(body);
    if (!req) return json({ error: 'bad request' }, 400, cors);

    const t0 = Date.now();
    try {
      const { text, model } = await askModel(env, [{ role: 'system', content: systemPrompt(req.npc, req.vocab) }, ...req.messages], body.model);
      const reply = tidy(text);
      if (!reply) return json({ error: 'empty reply' }, 502, cors);
      return json({ reply, model, ms: Date.now() - t0 }, 200, cors);
    } catch (e) {
      // detail: tên mô hình và mã lỗi của nhà cung cấp (không chứa khoá), để chẩn đoán nhanh
      return json({ error: 'model unavailable', detail: String(e.message || e).slice(0, 240) }, 502, cors);
    }
  },
};

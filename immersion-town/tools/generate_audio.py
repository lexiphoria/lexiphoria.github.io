"""Tạo tệp thoại MP3 cho Immersion Town bằng giọng đọc neural (edge-tts).

Lời thoại lấy từ data/npc-dialogues-v4.json (đúng chữ hiện trên màn hình, đúng tên tệp game đang chờ):
  • các lượt thoại của 4 nhiệm vụ, 2 việc nhỏ và lễ trao danh hiệu (turn.audio_file)
  • lời người địa phương khi gặp lần đầu (characters.*.chat.audio_file)
  • lời rao tiếng Việt khi tới gần (characters.*.call.audio_file) và khi đi ngang hàng quán (shops.*.call.audio_file)
Giọng đọc theo gợi ý trong Game Asset/npc-audio-manifest-v2.json.

Cần Internet và gói edge-tts:  pip install edge-tts
Chạy:  python immersion-town/tools/generate_audio.py          (bỏ qua tệp đã có)
       python immersion-town/tools/generate_audio.py --force  (tạo lại tất cả)
Tệp thu âm thật (giọng người) đặt cùng tên trong assets/audio/ sẽ được giữ nguyên nếu không dùng --force.
"""
import asyncio
import json
import sys
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'data' / 'npc-dialogues-v4.json'

# Giọng tiếng Anh / tiếng Việt của từng nhân vật (rate, pitch chỉnh nhẹ để các cô bác dùng chung giọng nghe khác nhau)
VOICES = {
    'mark': {'en': ('en-US-ChristopherNeural', '-5%', '+0Hz')},
    'sarah': {'en': ('en-GB-SoniaNeural', '-5%', '+0Hz')},
    'emma': {'en': ('en-US-JennyNeural', '-5%', '+0Hz')},
    'david': {'en': ('en-GB-RyanNeural', '-8%', '-2Hz')},
    'ambassador': {'en': ('en-US-AvaNeural', '-5%', '+0Hz'), 'vi': ('vi-VN-HoaiMyNeural', '+0%', '+6Hz')},
    'minh': {'vi': ('vi-VN-NamMinhNeural', '+0%', '+0Hz')},
    'tu': {'vi': ('vi-VN-NamMinhNeural', '-8%', '-6Hz')},
    'hoa': {'vi': ('vi-VN-HoaiMyNeural', '+0%', '+0Hz')},
    'vendor': {'vi': ('vi-VN-HoaiMyNeural', '-4%', '-5Hz')},
    # Lời rao của hàng quán trên phố đi bộ (data → shops)
    'shop_banhmi': {'vi': ('vi-VN-NamMinhNeural', '+6%', '+4Hz')},
    'shop_caolau': {'vi': ('vi-VN-HoaiMyNeural', '+2%', '-8Hz')},
    'shop_comga': {'vi': ('vi-VN-HoaiMyNeural', '+6%', '+8Hz')},
    'shop_cafe': {'vi': ('vi-VN-NamMinhNeural', '-4%', '-4Hz')},
}


def collect():
    d = json.loads(DATA.read_text(encoding='utf-8'))
    chars = d['characters']
    jobs = []
    for q in d['quests'] + d.get('side_quests', []) + ([d['ceremony']] if d.get('ceremony') else []):
        for t in q['turns']:
            lang = t.get('lang') or chars[t['speaker']].get('lang', 'en')
            jobs.append((t['audio_file'], t['text'], t['speaker'], lang))
    for cid, ch in chars.items():
        if ch.get('chat', {}).get('audio_file'):
            jobs.append((ch['chat']['audio_file'], ch['chat']['vi'], cid, 'vi'))
        if ch.get('call', {}).get('audio_file'):
            jobs.append((ch['call']['audio_file'], ch['call']['vi'], cid, 'vi'))
    for sid, sh in d.get('shops', {}).items():
        if sh.get('call', {}).get('audio_file'):
            jobs.append((sh['call']['audio_file'], sh['call']['vi'], f'shop_{sid}', 'vi'))
    return jobs


async def main(force):
    jobs = collect()
    made = skipped = 0
    for rel, text, who, lang in jobs:
        out = ROOT / rel
        out.parent.mkdir(parents=True, exist_ok=True)
        if out.exists() and not force:
            skipped += 1
            continue
        voice, rate, pitch = VOICES[who][lang]
        for attempt in range(6):
            try:
                await edge_tts.Communicate(text, voice, rate=rate, pitch=pitch).save(str(out))
                break
            except Exception as err:  # mạng hoặc dịch vụ chập chờn: xoá tệp dở dang rồi thử lại
                out.unlink(missing_ok=True)
                if attempt == 5:
                    raise
                print(f'  thử lại {out.name}: {err}')
                await asyncio.sleep(2 + attempt * 2)
        made += 1
        print(f'{out.name:34} {voice:26} {text[:60]}')
    print(f'Xong: tạo {made} tệp, giữ nguyên {skipped} tệp đã có, tổng {len(jobs)} câu.')


if __name__ == '__main__':
    asyncio.run(main('--force' in sys.argv))

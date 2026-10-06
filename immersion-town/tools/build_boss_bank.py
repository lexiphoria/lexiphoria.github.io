"""Trích câu hỏi khó từ Portal thành ngân hàng câu hỏi Boss cho Immersion Town.

Nguồn: js/exam_idioms_data.js (Exam Idioms), js/textcompletion.js (Text Completion).
Đề HSG 12 không đưa vào vì quá nâng cao so với mục tiêu của game.
Kết quả: immersion-town/data/boss-bank.json

Chạy lại mỗi khi dữ liệu Portal thay đổi:
    python immersion-town/tools/build_boss_bank.py
"""
import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'immersion-town' / 'data' / 'boss-bank.json'


class JSLiteral:
    """Đọc một giá trị literal của JavaScript (object, mảng, chuỗi, số) bắt đầu tại vị trí cho trước."""

    IDENT = re.compile(r'[A-Za-z_$][\w$]*')
    NUMBER = re.compile(r'-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?')
    ESCAPES = {'n': '\n', 't': '\t', 'r': '\r', 'b': '\b', 'f': '\f', 'v': '\v', '0': '\0'}

    def __init__(self, src, pos):
        self.s = src
        self.i = pos

    def skip(self):
        s = self.s
        while self.i < len(s):
            if s[self.i] in ' \t\r\n':
                self.i += 1
            elif s.startswith('//', self.i):
                end = s.find('\n', self.i)
                self.i = len(s) if end < 0 else end
            elif s.startswith('/*', self.i):
                self.i = s.index('*/', self.i) + 2
            else:
                break

    def fail(self, what):
        raise ValueError(f'{what} tại vị trí {self.i}: {self.s[self.i:self.i + 60]!r}')

    def value(self):
        self.skip()
        c = self.s[self.i]
        if c == '{':
            return self.obj()
        if c == '[':
            return self.arr()
        if c in '\'"`':
            return self.string()
        m = self.NUMBER.match(self.s, self.i)
        if m:
            self.i = m.end()
            text = m.group()
            return float(text) if any(ch in text for ch in '.eE') else int(text)
        for word, val in (('true', True), ('false', False), ('null', None), ('undefined', None)):
            if self.s.startswith(word, self.i):
                self.i += len(word)
                return val
        self.fail('Không đọc được giá trị')

    def obj(self):
        self.i += 1
        out = {}
        while True:
            self.skip()
            if self.s[self.i] == '}':
                self.i += 1
                return out
            if self.s[self.i] in '\'"':
                key = self.string()
            else:
                m = self.IDENT.match(self.s, self.i)
                if not m:
                    self.fail('Thiếu tên thuộc tính')
                key = m.group()
                self.i = m.end()
            self.skip()
            if self.s[self.i] != ':':
                self.fail('Thiếu dấu hai chấm')
            self.i += 1
            out[key] = self.value()
            self.skip()
            if self.s[self.i] == ',':
                self.i += 1

    def arr(self):
        self.i += 1
        out = []
        while True:
            self.skip()
            if self.s[self.i] == ']':
                self.i += 1
                return out
            out.append(self.value())
            self.skip()
            if self.s[self.i] == ',':
                self.i += 1

    def string(self):
        quote = self.s[self.i]
        self.i += 1
        buf = []
        while True:
            c = self.s[self.i]
            if c == '\\':
                nxt = self.s[self.i + 1]
                if nxt == 'u':
                    buf.append(chr(int(self.s[self.i + 2:self.i + 6], 16)))
                    self.i += 6
                    continue
                if nxt in '\r\n':  # nối dòng
                    self.i += 2
                    continue
                buf.append(self.ESCAPES.get(nxt, nxt))
                self.i += 2
                continue
            if c == quote:
                self.i += 1
                return ''.join(buf)
            if quote == '`' and self.s.startswith('${', self.i):
                self.fail('Không hỗ trợ biểu thức ${} trong template string')
            buf.append(c)
            self.i += 1


def read(rel):
    return (ROOT / rel).read_text(encoding='utf-8')


def literal_after(src, pattern):
    m = re.search(pattern, src)
    if not m:
        raise ValueError(f'Không tìm thấy {pattern!r}')
    return JSLiteral(src, m.end()).value()


def clean(text):
    return re.sub(r'\s+', ' ', html.unescape(str(text or ''))).strip()


def idioms():
    src = read('js/exam_idioms_data.js')
    items = []
    for m in re.finditer(r'examIdiomData\.(\w+)\s*=\s*', src):
        for it in JSLiteral(src, m.end()).value():
            opts = it.get('options') or []
            idx = it.get('correct_index')
            if not it.get('sentence') or len(opts) < 2 or not isinstance(idx, int) or not 0 <= idx < len(opts):
                continue
            # 'note' hiện trước khi trả lời nên không được chứa đáp án; nghĩa của cụm từ để trong 'explain'
            key = f"{clean(it.get('phrase'))}: {clean(it.get('meaning_vi'))}".strip(': ')
            items.append({
                'q': clean(it['sentence']),
                'options': [clean(o) for o in opts],
                'answer': idx,
                'explain': ' '.join(filter(None, [f'{key}.' if key else '', clean(it.get('sentence_explanation'))])),
                'note': 'Exam Idioms · Chọn cụm từ phù hợp',
            })
    return items


def sentence_with_blank(passage_html, num):
    text = re.sub(r'<span class="blank-tag">\s*(\d+)\s*</span>', r'[[\1]]', passage_html)
    text = re.sub(r'<br\s*/?>|</p>', '\n', text)
    text = clean(re.sub(r'<[^>]+>', ' ', text).replace('\n', ' \n '))
    # Tách câu tại . ! ? (giữ nguyên câu chứa chỗ trống)
    sentences = re.split(r'(?<=[.!?…])\s+(?=[A-Z"“‘(\[])', text)
    marker = f'[[{num}]]'
    for i, s in enumerate(sentences):
        if marker not in s:
            continue
        # Chỗ trống chiếm gần trọn câu: ghép thêm câu trước/sau để có ngữ cảnh
        if len(re.sub(r'\[\[\d+\]\]', '', s).split()) < 5:
            s = ' '.join(sentences[max(0, i - 1):i + 2])
        s = s.replace(marker, '_____')
        return re.sub(r'\[\[\d+\]\]', '…', s).strip()
    return ''


def text_completion():
    exams = literal_after(read('js/textcompletion.js'), r'const ALL_EXAMS\s*=\s*')
    items = []
    for exam in exams:
        for q in exam.get('questions', []):
            opts = q.get('opts') or []
            ans = q.get('ans')
            context = sentence_with_blank(exam.get('html', ''), q.get('num'))
            if not context or len(opts) < 2 or not isinstance(ans, int) or not 0 <= ans < len(opts):
                continue
            # Điểm ngữ pháp gợi ý đáp án nên chỉ hiện sau khi trả lời (trong 'explain')
            grammar = clean(q.get('grammar') or q.get('type'))
            items.append({
                'q': context,
                'options': [clean(o) for o in opts],
                'answer': ans,
                'explain': ' '.join(filter(None, [f'{grammar}.' if grammar else '', clean(q.get('tip'))])),
                'note': f"Text Completion · {clean(exam.get('title'))}",
            })
    return items


def main():
    bank = {
        'generated_from': ['js/exam_idioms_data.js', 'js/textcompletion.js'],
        'idioms': idioms(),
        'text_completion': text_completion(),
    }
    for key in ('idioms', 'text_completion'):
        if not bank[key]:
            sys.exit(f'Lỗi: nguồn "{key}" không trích được câu hỏi nào.')
    OUT.write_text(json.dumps(bank, ensure_ascii=False, indent=1), encoding='utf-8')
    print(f"Đã ghi {OUT.relative_to(ROOT)}: idioms={len(bank['idioms'])}, "
          f"text_completion={len(bank['text_completion'])}")


if __name__ == '__main__':
    main()

/* ==========================================================================
   WRITING TIPS - PINNY TEACHING STYLE SCRIPT
   Mở bài đọc chi tiết (Reader view), điều hướng & sao chép mẫu câu
   ========================================================================== */

(function () {
  'use strict';

  const ARTICLES = {
    'topic-sentence': {
      tag: 'Essay Strategy',
      readTime: '4 min read',
      img: 'assets/writing/topic_sentence.jpg',
      title: 'How to Write a Topic Sentence: The Essential Formula That Hooks Your Examiner',
      lead: 'Câu chủ đề luôn là xương sống của toàn bộ đoạn văn. Khám phá công thức kết hợp giữa Chủ đề và Ý định hướng giúp đoạn văn của bạn mạch lạc và thuyết phục tuyệt đối.',
      content: `
        <p>Trong văn phong học thuật chuẩn mực, <strong>Topic Sentence (Câu chủ đề)</strong> hầu như luôn xuất hiện ở ngay <em>câu đầu tiên của mỗi đoạn thân bài</em>. Nó đóng vai trò như một biển chỉ đường, báo hiệu chính xác cho giám khảo biết đoạn văn sẽ chứng minh điều gì.</p>
        
        <div class="reader-formula">
          <span>📐 CÔNG THỨC:</span>
          <span>[Topic - Chủ đề] + [Controlling Idea - Ý định hướng]</span>
        </div>

        <h3>1. Sai Lầm Phổ Biến: Chỉ Nêu Sự Thật Hiển Nhiên (Fact)</h3>
        <p>Rất nhiều thí sinh viết câu chủ đề như một sự thật quan sát được. Khi bạn chỉ nêu một sự thật, bạn sẽ không còn lý do gì để tranh luận hay chứng minh ở các câu tiếp theo!</p>

        <div class="reader-callout bad">
          <strong>❌ Câu chủ đề yếu (Chỉ nêu sự thật hiển nhiên):</strong>
          <p><em>"People in big cities drive a lot of cars."</em></p>
          <small>Người đọc không biết bạn sẽ phân tích về kẹt xe, ô nhiễm môi trường hay chi phí nuôi xe.</small>
        </div>

        <div class="reader-callout good">
          <strong>✅ Câu chủ đề xuất sắc (Trang 21 Giáo trình HCMUE):</strong>
          <p><em>"People who own cars have numerous unavoidable expenses to pay in order to keep their vehicles."</em></p>
          <small>Chủ đề là <strong>"car owners"</strong>, ý định hướng là <strong>"unavoidable expenses"</strong>. Toàn bộ các câu sau sẽ tập trung chứng minh các khoản phí: bảo hiểm, xăng xe và chi phí bảo dưỡng!</small>
        </div>

        <h3>2. Công Thức Câu Chủ Đề Kép (Dual Controlling Ideas)</h3>
        <p>Để đạt band điểm cao (B2–C1), bạn có thể định hướng 2 khía cạnh song hành ngay trong một câu chủ đề:</p>
        <div class="reader-callout">
          <strong>"Well-established public transport systems are far more efficient and economical than private cars."</strong>
          <p style="margin: 4px 0 0; font-size: 0.95rem;">Câu này mở đường hoàn hảo cho 2 ý hỗ trợ tiếp theo: (1) hiệu quả hơn về mặt lưu thông (efficient), và (2) tiết kiệm chi phí cá nhân hơn (economical).</p>
        </div>

        <h3>3. Lời Khuyên Của Giám Khảo</h3>
        <p>Tuyệt đối không đưa số liệu hay ví dụ cụ thể vào câu chủ đề. Câu chủ đề là khái quát định hướng; hãy để dành các con số và dẫn chứng chi tiết cho câu thứ hai và thứ ba (Supporting Sentences)!</p>
      `
    },

    'paragraph-peel': {
      tag: 'Paragraph Mastery',
      readTime: '5 min read',
      img: 'assets/writing/paragraph_peel.jpg',
      title: 'How to Write a Paragraph: The P.E.E.L Structure for High-Scoring Essays',
      lead: 'Dựng đoạn văn mạch lạc 4 câu theo công thức quốc tế Point - Explanation - Example - Link giúp bài viết không bao giờ bị cụt ý hay lan man.',
      content: `
        <p>Một đoạn văn thân bài học thuật chuẩn mực trong bài luận Task 2 thường kéo dài từ <strong>4 đến 5 câu</strong> (khoảng 80–90 từ). Cách phát triển ý thuyết phục nhất là tuân thủ chặt chẽ cấu trúc <strong>P.E.E.L</strong>:</p>

        <div class="reader-formula">
          <span>📐 CẤU TRÚC P.E.E.L:</span>
          <span>Point ➔ Explain ➔ Example ➔ Link</span>
        </div>

        <h3>Bóc Tách 4 Bước Xây Dựng Đoạn Văn:</h3>
        <ol style="padding-left: 20px; line-height: 1.8;">
          <li><strong>P — Point (Luận điểm):</strong> 1 câu Topic Sentence nêu rõ ý chính của đoạn.</li>
          <li><strong>E — Explanation (Giải thích):</strong> 1–2 câu giải thích <em>tại sao</em> luận điểm lại đúng hoặc cơ chế diễn ra như thế nào.</li>
          <li><strong>E — Example / Evidence (Dẫn chứng):</strong> 1 câu đưa ra ví dụ thực tế hoặc số liệu cụ thể (Trang 29 giáo trình: dẫn chứng than đá tạo việc làm).</li>
          <li><strong>L — Link (Chốt &amp; Chuyển):</strong> 1 câu tóm lại tác động hoặc tạo cầu nối tự nhiên sang đoạn kế tiếp.</li>
        </ol>

        <h3>Phân Tích Đoạn Văn Thực Tế Chuẩn P.E.E.L:</h3>
        <div class="reader-callout good">
          <p><strong>[Point]</strong> Firstly, convenience food saves invaluable time for busy modern workers.</p>
          <p><strong>[Explain]</strong> After working eight to ten hours a day, few individuals possess the physical stamina to go grocery shopping and prepare elaborate home-cooked dinners.</p>
          <p><strong>[Example]</strong> For instance, a pre-packaged microwavable meal requires merely five minutes of heating compared to an hour of traditional cooking.</p>
          <p><strong>[Link]</strong> Consequently, ready-made food has become an indispensable necessity in fast-paced metropolitan lifestyles.</p>
        </div>

        <div class="reader-callout">
          <strong>💡 Nguyên tắc vàng:</strong> Thà chọn <strong>1–2 luận điểm chính nhưng giải thích sâu và có ví dụ</strong> còn hơn liệt kê 4–5 ý nông cạn mà không có lập luận bảo vệ!
        </div>
      `
    },

    'letter-writing': {
      tag: 'Task 1 Guide',
      readTime: '6 min read',
      img: 'assets/writing/letter_writing.jpg',
      title: 'How to Write a Letter & Email: The Complete 4-Step Architecture',
      lead: 'Làm chủ bài thi Task 1 trong 15 phút: Quy tắc đối xứng lời chào và kết thư, cách trả lời trọn vẹn 3 gợi ý và những điều cấm kỵ.',
      content: `
        <p>Task 1 yêu cầu viết thư hoặc email ít nhất <strong>120 từ</strong> trong khoảng 15–18 phút (chiếm 1/3 điểm tổng). Để đạt điểm tuyệt đối ở tiêu chí <em>Task Fulfillment</em> và <em>Organization</em>, bạn cần thuộc nằm lòng ma trận sau:</p>

        <h3>1. Ma Trận Chào Đầu (Greeting) &amp; Kết Thư (Sign-off) Bắt Buộc</h3>
        <table class="reader-table">
          <thead>
            <tr>
              <th>Đối tượng nhận thư</th>
              <th>Chào đầu (Greeting)</th>
              <th>Kết thư (Sign-off)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Chưa biết tên</strong> (Gửi cơ quan, công ty)</td>
              <td><code>Dear Sir or Madam,</code></td>
              <td><strong><code>Yours faithfully,</code></strong></td>
            </tr>
            <tr>
              <td><strong>Biết họ tên</strong> (Gửi sếp, giáo viên, đối tác)</td>
              <td><code>Dear Mr. Smith,</code> / <code>Dear Ms. White,</code></td>
              <td><strong><code>Yours sincerely,</code></strong> / <code>Kind regards,</code></td>
            </tr>
            <tr>
              <td><strong>Bạn bè thân quen</strong> (Thân mật)</td>
              <td><code>Dear Robert,</code> / <code>Hi Alex,</code></td>
              <td><strong><code>Best wishes,</code></strong> / <code>All the best,</code></td>
            </tr>
          </tbody>
        </table>

        <h3>2. Quy Trình 3 Bước Viết Thư Thần Tốc:</h3>
        <ul>
          <li><strong>Bước 1 - Nêu ngay lý do viết thư:</strong> <br>
            <button class="reader-copy-btn" data-copy="I am writing to enquire about...">Copy: "I am writing to enquire about..."</button>
            <button class="reader-copy-btn" data-copy="Thank you very much for your letter. I was delighted to hear that...">Copy: "Thank you very much for your letter..."</button>
          </li>
          <li><strong>Bước 2 - Trả lời 3 bullet points của đề:</strong> Luôn dùng cụm từ chuyển tiếp để người chấm nhận ra bạn đã trả lời đủ:
            <br><code>Regarding my travel dates,...</code> | <code>As for accommodation,...</code> | <code>With respect to camp activities,...</code>
          </li>
          <li><strong>Bước 3 - Câu kết thúc trang trọng:</strong><br>
            <button class="reader-copy-btn" data-copy="I look forward to your reply.">Copy: "I look forward to your reply."</button>
            <button class="reader-copy-btn" data-copy="Please do not hesitate to contact me if you need further information.">Copy: "Please do not hesitate to contact me..."</button>
          </li>
        </ul>

        <div class="reader-callout bad">
          <strong>⚠️ QUY TẮC PHÒNG THI SỐNG CÒN:</strong>
          <p>Tuyệt đối <strong>KHÔNG ghi tên thật hay địa chỉ thật</strong> ở cuối thư. Giám khảo sẽ xem đây là hành vi đánh dấu bài thi!</p>
        </div>
      `
    },

    'essay-intro': {
      tag: 'Essay Strategy',
      readTime: '3 min read',
      img: 'assets/writing/essay_intro.jpg',
      title: 'How to Write an Introduction in 2 Minutes: Paraphrase + Thesis Formula',
      lead: 'Đừng lãng phí quá 3 phút cho mở bài. Nắm vững công thức 2 câu giúp bạn mở bài chuẩn xác, nêu rõ quan điểm và gây ấn tượng ngay lập tức.',
      content: `
        <p>Đoạn mở bài của bài luận Task 2 không cần quá dài dòng. Độ dài lý tưởng là từ <strong>35 đến 45 từ</strong>, gồm đúng <strong>2 câu</strong> thực hiện trọn vẹn 2 chức năng:</p>

        <div class="reader-formula">
          <span>📐 CÔNG THỨC 2 CÂU:</span>
          <span>[Câu 1: Paraphrase đề bài] + [Câu 2: Thesis Statement]</span>
        </div>

        <h3>Bóc Tách Từng Câu:</h3>
        <ul>
          <li><strong>Câu 1 - Dẫn dắt &amp; Paraphrase:</strong> Dùng từ ngữ của bạn để viết lại vấn đề đề bài đưa ra.
            <br><em>Mẫu: "It is widely argued that [chủ đề]..." hoặc "In recent decades, [hiện tượng] has become a subject of intense debate."</em>
          </li>
          <li><strong>Câu 2 - Thesis Statement (Nêu quan điểm):</strong> Khẳng định dứt khoát lập trường của bạn.
            <br><em>Mẫu: "While some people believe that [mặt A], I firmly maintain that [mặt B] because [lý do]."</em>
          </li>
        </ul>

        <div class="reader-callout bad">
          <strong>❌ Mở bài chép lại đề (Bị trừ điểm nặng):</strong>
          <p><em>"Some people say that all young people should be taught cooking in school. I agree with this. In this essay I will say why."</em></p>
          <small>Lặp 100% câu chữ của đề bài; giám khảo sẽ gạch bỏ số từ chép lại!</small>
        </div>

        <div class="reader-callout good">
          <strong>✅ Mở bài chuẩn B1–B2 (Trang 37 Giáo trình HCMUE):</strong>
          <p><em>"It is widely argued that schools should educate every child in fundamental household skills like food preparation. I fully subscribe to this viewpoint because such competence fosters adult self-reliance."</em></p>
          <small>Nâng cấp từ vựng điêu luyện: all young people &rarr; every child; cooking &rarr; food preparation.</small>
        </div>
      `
    },

    'paraphrase-vocab': {
      tag: 'Vocabulary Power',
      readTime: '5 min read',
      img: 'assets/writing/paraphrase_vocab.jpg',
      title: 'How to Paraphrase Like a Pro: 3 Essential Word-Shifting Techniques',
      lead: 'Bật mí 3 chiêu thức biến hóa từ vựng và ngữ pháp giúp bạn diễn giải lại đề bài dễ dàng, nâng cấp điểm tiêu chí Lexical Resource.',
      content: `
        <p>Tiêu chí <strong>Lexical Resource</strong> yêu cầu thí sinh phải chứng minh được khả năng sử dụng linh hoạt vốn từ của mình thay vì lặp lại đề bài một cách thụ động. Dưới đây là 3 kỹ thuật paraphrase hiệu quả nhất:</p>

        <h3>1. Chiêu 1: Sử Dụng Từ Đồng Nghĩa Học Thuật (Synonyms)</h3>
        <p>Thay thế các từ ngữ quen thuộc bằng những từ vựng học thuật trang trọng:</p>
        <ul>
          <li><code>young people</code> &rarr; <em>schoolchildren / adolescents / younger generations</em></li>
          <li><code>cooking</code> &rarr; <em>culinary skills / food preparation</em></li>
          <li><code>important</code> &rarr; <em>essential / crucial / vital / indispensable</em></li>
          <li><code>money</code> &rarr; <em>personal finances / financial resources</em></li>
        </ul>

        <h3>2. Chiêu 2: Chuyển Đổi Từ Loại (Word Family Shifts)</h3>
        <p>Biến đổi động từ thành danh từ (Danh từ hóa - Nominalization) hoặc tính từ thành danh từ:</p>
        <div class="reader-callout">
          • Động từ sang Danh từ: <em>"people consume ready-made food"</em> &rarr; <strong>"the consumption of pre-packaged meals"</strong><br>
          • Tính từ sang Danh từ: <em>"public transport is efficient"</em> &rarr; <strong>"the efficiency of public transit"</strong>
        </div>

        <h3>3. Chiêu 3: Chuyển Thể Chủ Động Sang Bị Động</h3>
        <p>Văn phong học thuật rất chuộng thể bị động để tăng tính khách quan:</p>
        <div class="reader-callout good">
          • Chủ động: <em>"Schools should teach students domestic skills."</em><br>
          • Bị động nâng cao: <strong>"Students ought to be equipped with fundamental domestic skills."</strong>
        </div>
      `
    },

    'writing-traps': {
      tag: 'Exam Traps',
      readTime: '4 min read',
      img: 'assets/writing/writing_traps.jpg',
      title: 'Common Traps in Writing: Costly Grammar & Style Mistakes to Avoid',
      lead: 'Điểm mặt 5 sai lầm ngớ ngẩn khiến thí sinh mất oan điểm số: lỗi viết tắt, nhầm lẫn thì, sai giới từ và thiếu số từ tối thiểu.',
      content: `
        <p>Dành ra 3 phút cuối giờ để rà soát các lỗi dưới đây có thể giúp bạn tự cứu lấy từ 0.5 đến 1.0 band điểm trong bài thi:</p>

        <h3>1. Viết Tắt Trong Bài Luận Trang Trọng (Contractions)</h3>
        <p>Trong bài luận Task 2 (Formal Essay), tuyệt đối <strong>không được dùng từ viết tắt</strong>. Hãy đổi toàn bộ:</p>
        <div class="reader-callout bad">
          <em>don't &rarr; <strong>do not</strong></em> | <em>can't &rarr; <strong>cannot</strong></em> | <em>it's &rarr; <strong>it is</strong></em> | <em>won't &rarr; <strong>will not</strong></em>
        </div>

        <h3>2. Nhầm Lẫn Thì Khi Có Mốc Thời Gian Cụ Thể</h3>
        <p>Nếu trong câu có mốc thời gian quá khứ rõ ràng như <em>last week, last summer, in 2020</em>, bắt buộc phải chia <strong>Quá khứ đơn</strong>:</p>
        <div class="reader-callout bad">
          ❌ Sai: <em>"He has returned from London last week."</em><br>
          ✅ Đúng: <strong>"He returned from London last week."</strong>
        </div>

        <h3>3. Sau Liên Từ Thời Gian 'When' Tuyệt Đối Không Dùng 'Will'</h3>
        <p>Trong mệnh đề phụ chỉ thời gian (when, as soon as, until), dùng thì Hiện tại đơn để diễn tả tương lai:</p>
        <div class="reader-callout good">
          ✅ Đúng: <strong>"I will call you when the dinner is ready."</strong> (Không dùng <em>will be ready</em>).
        </div>

        <h3>4. Lỗi Giới Từ Cố Định Thường Gặp</h3>
        <ul>
          <li><code>look forward to + V-ing</code> (Ví dụ: <em>look forward to hearing from you</em>).</li>
          <li><code>apologize to him</code> (Không dùng <em>with</em>).</li>
          <li><code>agree with someone</code> | <code>written by Shakespeare</code> | <code>by hand</code>.</li>
        </ul>

        <h3>5. Thiếu Số Lượng Từ Tối Thiểu</h3>
        <p>Bài thi yêu cầu tối thiểu <strong>120 từ</strong> cho Task 1 và <strong>250 từ</strong> cho Task 2. Viết dưới số từ quy định sẽ bị trừ điểm trực tiếp vào tiêu chí <em>Task Fulfillment</em>!</p>
      `
    }
  };

  function initReader() {
    const overlay = document.getElementById('readerOverlay');
    const closeBtn = document.getElementById('readerCloseBtn');
    const cards = document.querySelectorAll('.article-card');

    const heroImg = document.getElementById('readerImg');
    const tagEl = document.getElementById('readerTag');
    const timeEl = document.getElementById('readerTime');
    const titleEl = document.getElementById('readerTitle');
    const bodyEl = document.getElementById('readerBody');

    function openArticle(key) {
      const data = ARTICLES[key];
      if (!data) return;

      heroImg.src = data.img;
      tagEl.textContent = data.tag;
      timeEl.textContent = data.readTime;
      titleEl.textContent = data.title;
      bodyEl.innerHTML = data.content;

      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      history.pushState(null, '', '#' + key);
    }

    function closeArticle() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      history.pushState(null, '', window.location.pathname);
    }

    cards.forEach(card => {
      card.addEventListener('click', () => {
        openArticle(card.dataset.articleKey);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeArticle);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeArticle();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeArticle();
    });

    // Handle initial Hash
    const hash = window.location.hash.replace('#', '');
    if (hash && ARTICLES[hash]) {
      openArticle(hash);
    }
  }

  function initCopyButtons() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.reader-copy-btn');
      if (!btn) return;

      const text = btn.dataset.copy || btn.innerText;
      navigator.clipboard.writeText(text).then(() => {
        const orig = btn.innerText;
        btn.innerText = '✓ Copied!';
        btn.style.background = '#DCFCE7';
        btn.style.borderColor = '#86EFAC';
        setTimeout(() => {
          btn.innerText = orig;
          btn.style.background = '';
          btn.style.borderColor = '';
        }, 1200);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initReader();
    initCopyButtons();
  });
})();

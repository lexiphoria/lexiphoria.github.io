const TEST_DATA = {
  title: "V-ACT English Test 10",
  totalQuestions: 30,
  timeLimit: 45,
  parts: [
    {
      id: "part1",
      name: "Part 1: Multiple Choice",
      instruction: "Choose the best answer (A, B, C, or D) to complete each sentence.",
      type: "multiple_choice",
      questions: [
        {
          id: 1,
          text: "If he had driven more carefully, he _______ an accident.",
          options: ["wouldn't have", "won't have", "wouldn't have had", "hadn't had"],
          correct: 2,
          explain: "Câu điều kiện loại 3 (ngược quá khứ): If S had V3/ed, S would have V3/ed. (wouldn't have had)."
        },
        {
          id: 2,
          text: "The concert was cancelled _______ the heavy rain.",
          options: ["because", "because of", "although", "despite"],
          correct: 1,
          explain: "Sau ô trống là cụm danh từ 'the heavy rain' mang nghĩa nguyên nhân -> dùng 'because of'."
        },
        {
          id: 3,
          text: "It was in Paris _______ they first met each other.",
          options: ["where", "which", "that", "when"],
          correct: 2,
          explain: "Cấu trúc câu chẻ (Cleft sentence) nhấn mạnh trạng ngữ chỉ nơi chốn: It was + trạng từ + that + S + V."
        },
        {
          id: 4,
          text: "Many people are trying to _______ smoking because it is harmful to their health.",
          options: ["give up", "take up", "look up", "turn up"],
          correct: 0,
          explain: "Phrasal verb: 'give up' = từ bỏ (thói quen)."
        },
        {
          id: 5,
          text: "She has an _______ collection of old stamps from all over the world.",
          options: ["impress", "impressive", "impression", "impressively"],
          correct: 1,
          explain: "Từ loại: Trước danh từ 'collection' cần một tính từ. 'impressive' = ấn tượng."
        }
      ]
    },
    {
      id: "part2",
      name: "Part 2: Error Identification",
      instruction: "Each sentence has ONE underlined error (A, B, C, or D). Find it.",
      type: "error_id",
      questions: [
        {
          id: 6,
          text: 'The <span class="underline-error">man</span> (A) <span class="underline-error">whom</span> (B) you <span class="underline-error">talked</span> (C) to him yesterday is my <span class="underline-error">uncle</span> (D).',
          options: ["A. man", "B. whom", "C. talked", "D. uncle"],
          correct: 2,
          explain: "Lỗi thừa đại từ: Đại từ quan hệ 'whom' đã thay thế cho tân ngữ 'him', nên không được lặp lại 'him'. Sửa: 'talked' (hoặc bỏ 'him'). Chỗ gạch chân là C (talked to him -> talked to)."
        },
        {
          id: 7,
          text: 'Not only <span class="underline-error">the students</span> (A) but also the teacher <span class="underline-error">are</span> (B) going to <span class="underline-error">visit</span> (C) the museum <span class="underline-error">tomorrow</span> (D).',
          options: ["A. the students", "B. are", "C. visit", "D. tomorrow"],
          correct: 1,
          explain: "Sự hòa hợp chủ vị: 'Not only S1 but also S2 + V'. Động từ chia theo S2 (the teacher - số ít) -> 'is'."
        },
        {
          id: 8,
          text: 'I <span class="underline-error">haven\'t</span> (A) seen my <span class="underline-error">best friend</span> (B) <span class="underline-error">since</span> (C) a couple of <span class="underline-error">months</span> (D).',
          options: ["A. haven't", "B. best friend", "C. since", "D. months"],
          correct: 2,
          explain: "'A couple of months' là một khoảng thời gian, phải dùng 'for', không dùng 'since'."
        },
        {
          id: 9,
          text: 'She is <span class="underline-error">look forward</span> (A) to <span class="underline-error">going</span> (B) on a trip <span class="underline-error">to</span> (C) Europe next <span class="underline-error">summer</span> (D).',
          options: ["A. look forward", "B. going", "C. to", "D. summer"],
          correct: 0,
          explain: "Thì hiện tại tiếp diễn: S + is + V-ing. Đổi 'look forward' thành 'looking forward'."
        },
        {
          id: 10,
          text: 'The book <span class="underline-error">writing</span> (A) by that famous <span class="underline-error">author</span> (B) <span class="underline-error">has become</span> (C) a <span class="underline-error">bestseller</span> (D).',
          options: ["A. writing", "B. author", "C. has become", "D. bestseller"],
          correct: 0,
          explain: "Rút gọn mệnh đề quan hệ mang nghĩa bị động (cuốn sách ĐƯỢC viết) phải dùng V3/ed. Đổi 'writing' thành 'written'."
        }
      ]
    },
    {
      id: "part3",
      name: "Part 3: Sentence Restatement",
      instruction: "Choose the sentence (A, B, C, or D) that is closest in meaning to the given sentence.",
      type: "restatement",
      questions: [
        {
          id: 11,
          text: "I haven't eaten this kind of food before.",
          options: [
            "This is the first time I have ever eaten this kind of food.",
            "I have eaten this kind of food for a long time.",
            "The last time I ate this kind of food was long ago.",
            "I used to eat this kind of food before."
          ],
          correct: 0,
          explain: "Chuyển đổi thì: 'I haven't + V3 + before' = 'This is the first time I have + V3'."
        },
        {
          id: 12,
          text: "\"If I were you, I would take a taxi to the airport,\" she said to me.",
          options: [
            "She warned me to take a taxi to the airport.",
            "She advised me to take a taxi to the airport.",
            "She promised to take a taxi to the airport.",
            "She ordered me to take a taxi to the airport."
          ],
          correct: 1,
          explain: "Tường thuật lời khuyên: 'If I were you, I would...' -> S + advised + O + to V."
        },
        {
          id: 13,
          text: "It is possible that they have missed their flight.",
          options: [
            "They must have missed their flight.",
            "They should have missed their flight.",
            "They might have missed their flight.",
            "They needn't have missed their flight."
          ],
          correct: 2,
          explain: "Dự đoán 'possible' (có khả năng) trong quá khứ -> Dùng 'might/may have V3/ed'."
        },
        {
          id: 14,
          text: "People believe that doing morning exercise is good for health.",
          options: [
            "Doing morning exercise is believed to be good for health.",
            "Doing morning exercise believes to be good for health.",
            "It believes that doing morning exercise is good for health.",
            "Doing morning exercise is believed to have been good for health."
          ],
          correct: 0,
          explain: "Câu bị động kép (cùng thì hiện tại): 'S2 + is believed + to V'."
        },
        {
          id: 15,
          text: "The weather was so bad that we couldn't go camping.",
          options: [
            "It was such a bad weather that we couldn't go camping.",
            "The weather was too bad for us to go camping.",
            "The weather was bad enough for us to go camping.",
            "We couldn't go camping because of it was bad weather."
          ],
          correct: 1,
          explain: "Cấu trúc 'so...that' tương đương với 'too...to' (quá... đến nỗi không thể). 'too bad for us to go'."
        }
      ]
    },
    {
      id: "part4a",
      name: "Part 4: Reading Comprehension — Passage 1",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "For most of human history, traveling to space was purely the realm of science fiction. In the mid-20th century, it became a reality, but one strictly reserved for highly trained government astronauts. Today, however, we are on the cusp of a new era: space tourism. Private companies like SpaceX, Blue Origin, and Virgin Galactic are pioneering commercial spaceflight, aiming to make the cosmos accessible to civilians—provided they can afford the astronomical ticket prices.",
        "Space tourism currently takes two main forms: suborbital and orbital flights. Suborbital flights, offered by companies like Virgin Galactic, take passengers to the edge of space (about 80 to 100 kilometers above Earth). Passengers experience a few minutes of weightlessness and witness the curvature of the Earth against the blackness of space before descending. Orbital flights, on the other hand, are much more complex and expensive. They involve entering Earth's orbit, allowing tourists to spend several days circling the planet or even visiting the International Space Station (ISS).",
        "While the prospect of space tourism is thrilling, it is not without significant controversies. The most glaring issue is the environmental impact. Rocket launches emit black carbon (soot) and other greenhouse gases directly into the upper atmosphere, where they can linger for years and contribute disproportionately to global warming and ozone depletion. As the frequency of commercial launches increases, so too will their environmental footprint, prompting concerns from climatologists.",
        "Furthermore, critics argue that space tourism is the ultimate symbol of inequality. At a time when the world faces pressing crises—such as climate change, poverty, and pandemics—spending hundreds of thousands, or even millions, of dollars for a brief joyride in space seems morally questionable to many. Proponents, however, counter that this early, expensive phase is necessary to fund the research and development that will eventually make space travel safer, cheaper, and beneficial for all of humanity, much like the early days of commercial aviation."
      ],
      questions: [
        {
          id: 16,
          text: "What is the main topic of the passage?",
          options: [
            "The history of government space agencies like NASA.",
            "The rise of space tourism, its types, and the controversies surrounding it.",
            "How to become a highly trained astronaut.",
            "The environmental destruction caused by airplanes."
          ],
          correct: 1,
          explain: "Bài đọc giới thiệu du lịch vũ trụ (đoạn 1), phân loại (đoạn 2), và các tranh cãi về môi trường (đoạn 3) cũng như đạo đức/bất bình đẳng (đoạn 4)."
        },
        {
          id: 17,
          text: "According to paragraph 2, what happens during a suborbital flight?",
          options: [
            "Passengers spend several weeks living on the International Space Station.",
            "Passengers travel to the Moon and back.",
            "Passengers experience a few minutes of weightlessness at the edge of space.",
            "Passengers orbit the Earth hundreds of times."
          ],
          correct: 2,
          explain: "Đoạn 2: 'Suborbital flights... take passengers to the edge of space... Passengers experience a few minutes of weightlessness'."
        },
        {
          id: 18,
          text: 'The word "astronomical" in paragraph 1 is closest in meaning to _______.',
          options: ["related to stars", "extremely high or expensive", "cheap and affordable", "scientifically proven"],
          correct: 1,
          explain: "'Astronomical' (thường dùng cho giá cả/con số) = cực kỳ cao, đắt đỏ (extremely high)."
        },
        {
          id: 19,
          text: "Why are climatologists concerned about space tourism according to paragraph 3?",
          options: [
            "Because rockets are too loud and cause noise pollution.",
            "Because tourists might leave plastic trash in space.",
            "Because rocket launches emit soot and gases into the upper atmosphere, worsening global warming.",
            "Because rockets consume all the oxygen in the air."
          ],
          correct: 2,
          explain: "Đoạn 3: 'Rocket launches emit black carbon (soot) and other greenhouse gases directly into the upper atmosphere... contribute disproportionately to global warming'."
        },
        {
          id: 20,
          text: 'The phrase "glaring issue" in paragraph 3 means an issue that is _______.',
          options: [
            "easy to ignore",
            "very obvious and serious",
            "related to bright lights",
            "completely solved"
          ],
          correct: 1,
          explain: "'Glaring' = rõ ràng, rành rành, hiển nhiên (very obvious and serious)."
        },
        {
          id: 21,
          text: "What is the main argument made by critics of space tourism in the final paragraph?",
          options: [
            "It is too dangerous and people will get hurt.",
            "It is a waste of money that should be used to solve urgent problems on Earth.",
            "Rockets are not fast enough yet.",
            "Only young people can enjoy it."
          ],
          correct: 1,
          explain: "Đoạn 4: 'spending hundreds of thousands... for a brief joyride in space seems morally questionable... when the world faces pressing crises'."
        },
        {
          id: 22,
          text: "How do proponents (supporters) of space tourism defend it?",
          options: [
            "They claim it doesn't cause any pollution at all.",
            "They argue that the rich deserve to have fun.",
            "They believe it funds research that will eventually make space travel cheaper and beneficial for everyone.",
            "They say humans need to move to Mars immediately."
          ],
          correct: 2,
          explain: "Đoạn 4: 'Proponents, however, counter that this early, expensive phase is necessary to fund the research... that will eventually make space travel safer, cheaper'."
        }
      ]
    },
    {
      id: "part4b",
      name: "Part 4: Reading Comprehension — Passage 2",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "In our hyper-connected digital age, almost every aspect of our lives is mediated by technology. We bank online, socialize on apps, store our photos in the cloud, and work remotely. While this connectivity offers unparalleled convenience, it also exposes us to significant risks. Cybersecurity and digital privacy have consequently transitioned from being niche IT concerns to fundamental issues of modern human rights and societal stability.",
        "The primary threat in the digital realm comes from cyberattacks, which can range from individual phishing scams to massive data breaches targeting multinational corporations. Hackers exploit vulnerabilities in software or use social engineering to trick individuals into revealing passwords. Once inside a system, they can steal sensitive personal data, such as credit card numbers, social security details, and medical records. This stolen data is often sold on the dark web, leading to identity theft and severe financial ruin for the victims.",
        "Beyond financial theft, the erosion of digital privacy is a growing concern. Many tech companies operate on a business model based on surveillance capitalism. They offer \"free\" services—like search engines and social media platforms—in exchange for the right to collect vast amounts of data on user behavior. Every click, search, and 'like' is tracked, analyzed, and packaged into detailed profiles. These profiles are then used by advertisers to deliver highly targeted ads, or worse, by political operatives to manipulate public opinion and electoral outcomes.",
        "Protecting oneself in this landscape requires a combination of technological tools and digital literacy. Individuals should employ strong, unique passwords, enable two-factor authentication, and remain vigilant against suspicious emails. However, personal responsibility is not enough. There is a growing demand for robust government regulations, similar to Europe's General Data Protection Regulation (GDPR), to hold companies accountable for data breaches and to give users more control over how their personal information is collected and used."
      ],
      questions: [
        {
          id: 23,
          text: "What is the main idea of the passage?",
          options: [
            "How to become a professional hacker.",
            "The benefits of using social media for advertising.",
            "The growing importance of cybersecurity and digital privacy in a connected world.",
            "Why people should stop using the internet entirely."
          ],
          correct: 2,
          explain: "Bài đọc nhấn mạnh rằng trong thời đại số, an ninh mạng và quyền riêng tư đã trở thành vấn đề quan trọng hàng đầu do rủi ro mất cắp dữ liệu và giám sát."
        },
        {
          id: 24,
          text: "According to paragraph 2, how do hackers often gain access to systems?",
          options: [
            "By breaking physically into office buildings.",
            "By guessing passwords or using social engineering to trick people.",
            "By buying passwords from the government.",
            "By creating their own social media apps."
          ],
          correct: 1,
          explain: "Đoạn 2: 'Hackers exploit vulnerabilities in software or use social engineering to trick individuals into revealing passwords'."
        },
        {
          id: 25,
          text: 'The word "vulnerabilities" in paragraph 2 is closest in meaning to _______.',
          options: ["strengths", "weaknesses or flaws", "updates", "protections"],
          correct: 1,
          explain: "'Vulnerability' = lỗ hổng, điểm yếu (weaknesses/flaws)."
        },
        {
          id: 26,
          text: "What does 'surveillance capitalism' refer to in paragraph 3?",
          options: [
            "A business model where companies collect and monetize user data in exchange for free services.",
            "A government system that spies on criminals.",
            "The process of buying security cameras for a business.",
            "Selling computers for a high profit."
          ],
          correct: 0,
          explain: "Đoạn 3 giải thích: 'They offer \"free\" services... in exchange for the right to collect vast amounts of data on user behavior... packaged into detailed profiles'."
        },
        {
          id: 27,
          text: "According to paragraph 3, what is a potential danger of companies building detailed user profiles?",
          options: [
            "Users might get bored of the internet.",
            "The profiles can be used to manipulate public opinion and elections.",
            "The companies will run out of storage space.",
            "Computers will become too slow to use."
          ],
          correct: 1,
          explain: "Đoạn 3: 'used by advertisers to deliver highly targeted ads, or worse, by political operatives to manipulate public opinion and electoral outcomes'."
        },
        {
          id: 28,
          text: 'The word "vigilant" in paragraph 4 is closest in meaning to _______.',
          options: ["asleep", "watchful and alert", "confused", "aggressive"],
          correct: 1,
          explain: "'Vigilant' = cảnh giác, thận trọng (watchful and alert)."
        },
        {
          id: 29,
          text: "What does the author believe is necessary besides personal responsibility?",
          options: [
            "Everyone should stop using passwords.",
            "Companies should charge money for all their services.",
            "Robust government regulations to hold companies accountable.",
            "Hackers should be hired by the government."
          ],
          correct: 2,
          explain: "Đoạn 4: 'However, personal responsibility is not enough. There is a growing demand for robust government regulations... to hold companies accountable'."
        },
        {
          id: 30,
          text: "What is the author's tone regarding tech companies that collect user data?",
          options: [
            "Highly supportive and encouraging.",
            "Indifferent and neutral.",
            "Critical and cautious.",
            "Completely confused."
          ],
          correct: 2,
          explain: "Tác giả dùng các từ như 'erosion of digital privacy', 'surveillance capitalism', 'manipulate', cho thấy thái độ chỉ trích và thận trọng (Critical and cautious)."
        }
      ]
    }
  ]
};

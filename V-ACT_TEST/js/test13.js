const TEST_DATA = {
  title: "V-ACT English Test 13",
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
          text: "If I _______ harder at school when I was young, I _______ a better job now.",
          options: [
            "had studied / would have had",
            "studied / would had",
            "studied / would have",
            "had studied / would have"
          ],
          correct: 3,
          explain: "Câu điều kiện hỗn hợp (Mixed conditional) diễn tả giả định trái ngược quá khứ gây kết quả ngược thực tế hiện tại: If + S + had V3/ed, S + would + V(bare) + now."
        },
        {
          id: 2,
          text: "The research committee has decided to _______ a survey to gather public opinion.",
          options: ["put off", "bring about", "carry out", "give up"],
          correct: 2,
          explain: "Phrasal verb: 'carry out' = tiến hành, thực hiện (cuộc khảo sát, nghiên cứu). Các từ khác: 'bring about' = mang lại, 'put off' = trì hoãn, 'give up' = từ bỏ."
        },
        {
          id: 3,
          text: "Hardly _______ down to write the report when the office phone rang.",
          options: ["sat he", "he had sat", "did he sit", "had he sat"],
          correct: 3,
          explain: "Đảo ngữ với Hardly: 'Hardly + had + S + V3/ed + when + S + V2/ed' (Vừa mới... thì...)."
        },
        {
          id: 4,
          text: "We need to find a _______ solution to this critical environmental problem.",
          options: ["long-lasting", "last-longed", "lasting-long", "long-lasted"],
          correct: 0,
          explain: "Từ ghép: 'long-lasting' (tính từ) = lâu dài, bền vững."
        },
        {
          id: 5,
          text: "_______ his lack of experience in marketing, he was offered the job.",
          options: ["Although", "Because of", "In spite of", "Even though"],
          correct: 2,
          explain: "Liên từ chỉ sự nhượng bộ: 'In spite of' + cụm danh từ (his lack of experience). 'Although/Even though' đi với mệnh đề."
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
          text: "The <span class=\"underline-error\">woman</span> (A) <span class=\"underline-error\">who</span> (B) bag was stolen <span class=\"underline-error\">reported</span> (C) the incident to the police <span class=\"underline-error\">officer</span> (D).",
          options: ["A. woman", "B. who", "C. reported", "D. officer"],
          correct: 1,
          explain: "Đại từ quan hệ: Cần dùng đại từ sở hữu 'whose' thay cho 'who' đứng trước danh từ 'bag' (whose bag = túi của người phụ nữ đó)."
        },
        {
          id: 7,
          text: "There <span class=\"underline-error\">are</span> (A) many <span class=\"underline-error\">child</span> (B) playing <span class=\"underline-error\">happily</span> (C) in the park on this <span class=\"underline-error\">sunny</span> (D) afternoon.",
          options: ["A. are", "B. child", "C. happily", "D. sunny"],
          correct: 1,
          explain: "Danh từ số nhiều: 'many' đi với danh từ đếm được số nhiều. Sửa danh từ số ít 'child' thành 'children'."
        },
        {
          id: 8,
          text: "She <span class=\"underline-error\">avoided</span> (A) <span class=\"underline-error\">to answer</span> (B) his personal questions <span class=\"underline-error\">during</span> (C) the press <span class=\"underline-error\">conference</span> (D).",
          options: ["A. avoided", "B. to answer", "C. during", "D. conference"],
          correct: 1,
          explain: "Cấu trúc động từ: Sau 'avoid' động từ phải thêm đuôi -ing. Sửa 'to answer' thành 'answering'."
        },
        {
          id: 9,
          text: "My <span class=\"underline-error\">new car</span> (A) is <span class=\"underline-error\">as fast</span> (B) <span class=\"underline-error\">than</span> (C) yours, but yours is <span class=\"underline-error\">more comfortable</span> (D).",
          options: ["A. new car", "B. as fast", "C. than", "D. more comfortable"],
          correct: 2,
          explain: "So sánh ngang bằng: Cấu trúc là 'as + adj/adv + as'. Sửa 'than' thành 'as'."
        },
        {
          id: 10,
          text: "She has been <span class=\"underline-error\">working</span> (A) in this company <span class=\"underline-error\">since</span> (B) five years and <span class=\"underline-error\">has gained</span> (C) a lot of <span class=\"underline-error\">experience</span> (D).",
          options: ["A. working", "B. since", "C. has gained", "D. experience"],
          correct: 1,
          explain: "Giới từ chỉ thời gian: 'five years' là một khoảng thời gian, phải dùng giới từ 'for' thay vì 'since'."
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
          text: "It was such a boring film that I fell asleep halfway through.",
          options: [
            "The film was so boring that I fell asleep.",
            "It was so boring film that I fell asleep.",
            "The film was boring enough for me to fall asleep.",
            "The film was too boring for me to fall asleep."
          ],
          correct: 0,
          explain: "Cấu trúc tương đương: 'It + be + such + a/an + adj + N + that' chuyển thành 'S + be + so + adj + that'."
        },
        {
          id: 12,
          text: "You should have locked the front door before leaving.",
          options: [
            "It was a mistake that you didn't lock the door.",
            "You are going to lock the door.",
            "You didn't need to lock the door.",
            "You locked the door, which was good."
          ],
          correct: 0,
          explain: "Cấu trúc 'should have + V3/ed' dùng để chỉ một việc đáng lẽ nên làm trong quá khứ nhưng thực tế đã không làm, biểu thị sự tiếc nuối hoặc trách móc."
        },
        {
          id: 13,
          text: "I would rather stay at home than go to the cinema tonight.",
          options: [
            "I would prefer stay at home rather than go to the cinema tonight.",
            "I like staying at home than going to the cinema tonight.",
            "I prefer to stay at home than go to the cinema tonight.",
            "I prefer staying at home to going to the cinema tonight."
          ],
          correct: 3,
          explain: "Cấu trúc tương đương chỉ sự ưu tiên: 'would rather + V1 + than + V1' = 'prefer + V-ing + to + V-ing'."
        },
        {
          id: 14,
          text: "No sooner had they arrived at the station than the train left.",
          options: [
            "The train had left before they arrived at the station.",
            "Hardly had they arrived at the station than the train left.",
            "They arrived at the station after the train left.",
            "As soon as they arrived at the station, the train left."
          ],
          correct: 3,
          explain: "Cấu trúc 'No sooner had S V3 than S V2' tương đương 'As soon as S V2, S V2' (Ngay sau khi... thì...)."
        },
        {
          id: 15,
          text: "\"We must finish this report today,\" the manager said to us.",
          options: [
            "The manager said that they must finish this report today.",
            "The manager told us to finish this report today.",
            "The manager suggested that they finished that report that day.",
            "The manager said that they had to finish that report that day."
          ],
          correct: 3,
          explain: "Quy tắc chuyển từ câu trực tiếp sang gián tiếp: lùi thì 'must' thành 'had to', đổi 'this' thành 'that', và 'today' thành 'that day'."
        }
      ]
    },
    {
      id: "part4a",
      name: "Part 4: Reading Comprehension — Passage 1",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "The global labor market is undergoing a seismic shift, driven by the rapid rise of remote work and the gig economy. For decades, the standard employment model involved a nine-to-five schedule, a dedicated office space, and a long-term commitment to a single employer. Today, however, advances in digital communication tools and cloud computing have enabled millions of professionals to work from anywhere in the world. Freelancing and short-term contract work—collectively known as the gig economy—have also grown exponentially, offering workers greater flexibility.",
        "From the perspective of employees, the benefits of remote work are significant. It eliminates time-consuming and stressful daily commutes, allows for a better work-life balance, and opens up job opportunities with international companies that were previously out of reach. For employers, remote work reduces overhead costs associated with maintaining physical offices and provides access to a much wider talent pool. However, this transition is not without drawbacks.",
        "Many remote workers report feelings of isolation and difficulty separating their professional and personal lives, leading to burnout. Furthermore, gig workers often face severe financial insecurity. Unlike traditional employees, they do not receive company-sponsored benefits such as health insurance, paid leave, or retirement plans. They are also subject to fluctuating incomes and lack job security."
      ],
      questions: [
        {
          id: 16,
          text: "What is the main topic of the passage?",
          options: [
            "The advantages of commuting to work daily.",
            "The transition from traditional office work to remote work and the gig economy.",
            "How to start a freelance writing business.",
            "The history of labor unions in developed nations."
          ],
          correct: 1,
          explain: "Bài viết thảo luận về xu hướng dịch chuyển từ làm việc văn phòng truyền thống sang làm việc từ xa và làm tự do (gig economy), cùng các mặt lợi hại của nó."
        },
        {
          id: 17,
          text: "The word \"seismic\" in paragraph 1 is closest in meaning to _______.",
          options: ["slowly progressing", "huge or dramatic", "very small", "geological"],
          correct: 1,
          explain: "'Seismic' nghĩa gốc là địa chấn, nghĩa chuyển trong ngữ cảnh này là vô cùng lớn, mang tính đột phá (huge/dramatic)."
        },
        {
          id: 18,
          text: "According to paragraph 1, what technology has enabled the rise of remote work?",
          options: [
            "Advances in digital communication tools and cloud computing.",
            "Paper-based filing systems.",
            "Traditional landline telephones.",
            "Electric vehicles."
          ],
          correct: 0,
          explain: "Đoạn 1: 'advances in digital communication tools and cloud computing have enabled millions of professionals to work from anywhere'."
        },
        {
          id: 19,
          text: "Which of the following is NOT mentioned as a benefit of remote work for employees?",
          options: [
            "Opportunities to work for international employers.",
            "Eliminating daily commutes.",
            "Better work-life balance.",
            "Higher salaries than office-based counterparts."
          ],
          correct: 3,
          explain: "Đoạn 2 nhắc đến việc loại bỏ đi lại, cân bằng cuộc sống và cơ hội làm việc quốc tế, không nhắc đến mức lương cao hơn."
        },
        {
          id: 20,
          text: "According to paragraph 3, what is a common problem faced by remote workers?",
          options: [
            "Low internet speeds.",
            "Frequent power outages.",
            "Too many physical meetings.",
            "Feelings of isolation and burnout."
          ],
          correct: 3,
          explain: "Đoạn 3: 'Many remote workers report feelings of isolation and difficulty separating their professional and personal lives, leading to burnout'."
        },
        {
          id: 21,
          text: "What is a major disadvantage of being a gig worker as stated in paragraph 3?",
          options: [
            "Lack of company-sponsored benefits and job security.",
            "Not being allowed to use digital tools.",
            "Being forced to travel abroad frequently.",
            "Having to work strictly from nine to five."
          ],
          correct: 0,
          explain: "Đoạn 3: 'gig workers often face... insecurity. Unlike traditional employees, they do not receive company-sponsored benefits... lack job security'."
        },
        {
          id: 22,
          text: "The word \"stifling\" in the final paragraph is closest in meaning to _______.",
          options: ["encouraging", "understanding", "limiting", "improving"],
          correct: 2,
          explain: "'Stifle' có nghĩa là kìm hãm, hạn chế, bóp nghẹt sự phát triển (limiting)."
        }
      ]
    },
    {
      id: "part4b",
      name: "Part 4: Reading Comprehension — Passage 2",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "Sleep is often viewed as a passive state of rest, a time when the body and brain simply shut down to recover from the day's activities. However, neurological research has revealed that sleep is an incredibly active process. During sleep, the brain undergoes a series of complex operations that are essential for cognitive function, memory consolidation, and overall mental health. When we deprive ourselves of sleep, we impair our brain's ability to function.",
        "One of the most critical functions of sleep is memory consolidation. Throughout the day, the brain receives vast amounts of information. During the deep stages of sleep, the hippocampus—the brain's memory center—transfers short-term memories to the neocortex, where they are organized and stored as long-term memories. This process is crucial for learning. Students who stay up all night to study often perform worse because their brains have not had the opportunity to solidify the new information.",
        "In addition to memory, sleep plays a vital role in cleansing the brain. Recent studies have discovered the 'glymphatic system,' a waste clearance pathway that becomes highly active during sleep. This system acts like a dishwasher, flushing out metabolic waste products, including amyloid-beta, a protein associated with Alzheimer's disease. Furthermore, sleep is deeply intertwined with emotional regulation. The amygdala, the brain area responsible for emotional responses, becomes hyperactive when sleep-deprived, making people prone to mood swings and stress."
      ],
      questions: [
        {
          id: 23,
          text: "What is the main idea of the passage?",
          options: [
            "How to cure insomnia without medication.",
            "The history of sleep research in neurology.",
            "The active role of sleep in brain health, memory, and emotions.",
            "Why dreams occur during specific stages of sleep."
          ],
          correct: 2,
          explain: "Bài viết nói về bản chất hoạt động tích cực của giấc ngủ trong việc bảo vệ sức khỏe não bộ (xử lý bộ nhớ, dọn dẹp chất thải và kiểm soát cảm xúc)."
        },
        {
          id: 24,
          text: "What is memory consolidation as described in paragraph 2?",
          options: [
            "Creating false memories while dreaming.",
            "The ability to read books faster.",
            "The transfer of short-term memories to long-term storage.",
            "The process of forgetting useless information."
          ],
          correct: 2,
          explain: "Đoạn 2: 'transfers short-term memories to the neocortex, where they are organized and stored as long-term memories'."
        },
        {
          id: 25,
          text: "Why do students who stay up all night to study often perform worse on exams?",
          options: [
            "Because their brains have not had the chance to solidify the new information.",
            "Because they fall asleep during the exam.",
            "Because they forget to eat breakfast.",
            "Because they lose their study notes."
          ],
          correct: 0,
          explain: "Đoạn 2: 'their brains have not had the opportunity to solidify the new information'."
        },
        {
          id: 26,
          text: "What is the glymphatic system mentioned in paragraph 3?",
          options: [
            "A system that regulates body temperature during sleep.",
            "A network of nerves that controls muscle movements.",
            "A waste clearance pathway that cleanses the brain during sleep.",
            "The system responsible for producing dreams."
          ],
          correct: 2,
          explain: "Đoạn 3: 'glymphatic system, a waste clearance pathway that becomes highly active during sleep'."
        },
        {
          id: 27,
          text: "The word \"deprivation\" in paragraph 3 is closest in meaning to _______.",
          options: ["interruption", "satisfaction", "lack", "excess"],
          correct: 2,
          explain: "'Sleep deprivation' có nghĩa là sự thiếu ngủ, sự tước đoạt (lack)."
        },
        {
          id: 28,
          text: "According to paragraph 3, why do sleep-deprived people experience mood swings?",
          options: [
            "Their amygdala becomes hyperactive.",
            "Their body temperature is too low.",
            "Their blood sugar levels drop.",
            "They drink too much caffeine."
          ],
          correct: 0,
          explain: "Đoạn 3: 'The amygdala... becomes hyperactive when sleep-deprived, making people prone to mood swings'."
        },
        {
          id: 29,
          text: "The word \"intertwined\" in paragraph 3 is closest in meaning to _______.",
          options: ["completely separated", "closely connected", "slowly growing", "rarely seen"],
          correct: 1,
          explain: "'Intertwined' = quấn chặt, đan xen, có mối liên hệ mật thiết (closely connected)."
        },
        {
          id: 30,
          text: "How many hours of sleep do experts recommend for adults per night?",
          options: [
            "Less than five hours.",
            "Between seven and nine hours.",
            "Exactly ten hours.",
            "More than twelve hours."
          ],
          correct: 1,
          explain: "Đoạn cuối: 'experts recommend that adults get between seven and nine hours of quality sleep per night'."
        }
      ]
    }
  ]
};

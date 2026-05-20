const TEST_DATA = {
  title: "V-ACT English Test 11",
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
          text: "By the time you return from your business trip, we _______ the project.",
          options: ["will have finished", "will finish", "finish", "will be finishing"],
          correct: 0,
          explain: "Thì tương lai hoàn thành diễn tả hành động hoàn thành trước một thời điểm hoặc hành động khác trong tương lai: By the time + hiện tại đơn, tương lai hoàn thành (will have + V3/ed)."
        },
        {
          id: 2,
          text: "The position _______ she applied requires three years of work experience.",
          options: ["to which", "that", "for which", "which"],
          correct: 2,
          explain: "Động từ 'apply' đi với giới từ 'for' (apply for a job/position). Khi chuyển sang mệnh đề quan hệ, giới từ 'for' được đưa lên trước đại từ quan hệ 'which' -> 'for which'."
        },
        {
          id: 3,
          text: "I always _______ my older brother for advice when making important decisions.",
          options: ["look forward to", "look down on", "look up to", "look out for"],
          correct: 2,
          explain: "Phrasal verb: 'look up to' = kính trọng, ngưỡng mộ, hướng tới để học hỏi. Các cụm khác: 'look down on' = khinh thường, 'look forward to' = trông đợi, 'look out for' = coi chừng."
        },
        {
          id: 4,
          text: "The doctor recommended that he _______ a few days off from work.",
          options: ["takes", "would take", "took", "take"],
          correct: 3,
          explain: "Cấu trúc giả định (Subjunctive mood) với động từ khuyên bảo, yêu cầu (recommend, suggest, demand...): S + recommend + that + S + V (bare) -> dùng 'take'."
        },
        {
          id: 5,
          text: "She made a _______ decision to resign from her high-paying job.",
          options: ["courage", "courageous", "encourage", "courageously"],
          correct: 1,
          explain: "Từ loại: Trước danh từ 'decision' cần một tính từ bổ nghĩa. 'courageous' = dũng cảm, can đảm."
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
          text: "The <span class=\"underline-error\">number</span> (A) of students <span class=\"underline-error\">attending</span> (B) the seminar <span class=\"underline-error\">have</span> (C) increased <span class=\"underline-error\">significantly</span> (D).",
          options: ["A. number", "B. attending", "C. have", "D. significantly"],
          correct: 2,
          explain: "Sự hòa hợp chủ vị: Chủ ngữ bắt đầu bằng 'The number of + N số nhiều' đi với động từ số ít. Sửa 'have' thành 'has'."
        },
        {
          id: 7,
          text: "Since they <span class=\"underline-error\">bought</span> (A) the house <span class=\"underline-error\">three years ago</span> (B), they <span class=\"underline-error\">didn't repaint</span> (C) the living <span class=\"underline-error\">room</span> (D).",
          options: ["A. bought", "B. three years ago", "C. didn't repaint", "D. room"],
          correct: 2,
          explain: "Sự kết hợp các thì: Cấu trúc 'Since + mốc thời gian/mệnh đề QKĐ', mệnh đề chính chia hiện tại hoàn thành. Sửa 'didn't repaint' thành 'haven't repainted'."
        },
        {
          id: 8,
          text: "He likes <span class=\"underline-error\">playing</span> (A) tennis, <span class=\"underline-error\">to swim</span> (B) in the pool, and <span class=\"underline-error\">riding</span> (C) his bike on <span class=\"underline-error\">weekends</span> (D).",
          options: ["A. playing", "B. to swim", "C. riding", "D. weekends"],
          correct: 1,
          explain: "Cấu trúc song song (Parallel structure): Các hoạt động được liên kết bởi 'and' phải cùng dạng V-ing. Sửa 'to swim' thành 'swimming'."
        },
        {
          id: 9,
          text: "After <span class=\"underline-error\">finishing</span> (A) her homework, <span class=\"underline-error\">the computer</span> (B) was <span class=\"underline-error\">turned off</span> (C) by <span class=\"underline-error\">Mary</span> (D).",
          options: ["A. finishing", "B. the computer", "C. turned off", "D. Mary"],
          correct: 1,
          explain: "Lỗi phân từ treo (Dangling participle): Chủ ngữ của hành động 'finishing her homework' phải là 'Mary', không phải 'the computer'. Sửa: 'Mary turned off the computer'."
        },
        {
          id: 10,
          text: "The house <span class=\"underline-error\">which</span> (A) we <span class=\"underline-error\">lived</span> (B) for ten years <span class=\"underline-error\">has been</span> (C) sold <span class=\"underline-error\">recently</span> (D).",
          options: ["A. which", "B. lived", "C. has been", "D. recently"],
          correct: 0,
          explain: "Đại từ quan hệ: 'live' là nội động từ, cần giới từ chỉ nơi chốn đi kèm (live in the house). Sửa 'which' thành 'where' hoặc 'in which'."
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
          text: "If I had a car, I would drive to work every day.",
          options: [
            "I didn't have a car, so I didn't drive to work every day.",
            "I don't drive to work because I had a car.",
            "I have a car, but I don't drive to work every day.",
            "I don't have a car, so I don't drive to work every day."
          ],
          correct: 3,
          explain: "Câu điều kiện loại 2 diễn tả giả định trái ngược thực tế ở hiện tại (sự thật là hiện tại tôi không có xe nên tôi không lái xe đi làm)."
        },
        {
          id: 12,
          text: "The test was too difficult for the students to complete in time.",
          options: [
            "The test was so difficult that the students could complete it in time.",
            "The test was so difficult that the students couldn't complete it in time.",
            "The test was such difficult that the students couldn't complete it in time.",
            "The test was not difficult enough for the students to complete in time."
          ],
          correct: 1,
          explain: "Cấu trúc 'too + adj + for O + to V' (quá... đến nỗi không thể) tương đương với 'so + adj + that + S + can't/couldn't V'."
        },
        {
          id: 13,
          text: "It is compulsory for all visitors to wear a face mask.",
          options: [
            "All visitors should wear a face mask.",
            "All visitors must wear a face mask.",
            "All visitors needn't wear a face mask.",
            "All visitors may wear a face mask."
          ],
          correct: 1,
          explain: "'compulsory' = bắt buộc -> tương đương động từ khuyết thiếu mang tính bắt buộc 'must'."
        },
        {
          id: 14,
          text: "She last visited her hometown two years ago.",
          options: [
            "She didn't visit her hometown two years ago.",
            "The last time she has visited her hometown was two years ago.",
            "She hasn't visited her hometown for two years.",
            "She has visited her hometown for two years."
          ],
          correct: 2,
          explain: "Biến đổi tương đương: S + last + V2 + khoảng thời gian + ago = S + hasn't/haven't + V3 + for + khoảng thời gian."
        },
        {
          id: 15,
          text: "He didn't prepare well for the interview, so he didn't get the job.",
          options: [
            "If he hadn't prepared well for the interview, he wouldn't have got the job.",
            "Had he prepared well for the interview, he wouldn't have got the job.",
            "If he prepared well for the interview, he would get the job.",
            "Had he prepared well for the interview, he would have got the job."
          ],
          correct: 3,
          explain: "Giả định ngược quá khứ dùng điều kiện loại 3. Đảo ngữ loại 3: 'Had + S + V3/ed, S + would have + V3/ed'."
        }
      ]
    },
    {
      id: "part4a",
      name: "Part 4: Reading Comprehension — Passage 1",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "The integration of Artificial Intelligence (AI) into healthcare is revolutionizing how medical professionals diagnose and treat diseases. AI algorithms, powered by machine learning, can analyze vast datasets of patient records, clinical trials, and medical imaging at speeds and accuracies unimaginable just a decade ago. For instance, AI systems are now capable of identifying signs of breast cancer in mammograms or anomalies in lung scans with rates of precision that equal or even surpass human radiologists.",
        "This technology is not intended to replace doctors, but rather to serve as a powerful diagnostic tool, helping to reduce diagnostic errors and speed up the patient care process. By flagging potential issues early, AI allows clinicians to make more informed decisions and personalize treatment plans for individual patients.",
        "Furthermore, AI is accelerating the process of drug discovery. Traditionally, developing a new pharmaceutical drug takes over a decade and costs billions of dollars. AI can predict how different chemical compounds will interact with targets in the body, narrowing down potential drug candidates in a fraction of the time. However, the adoption of AI in medicine also raises serious ethical questions, particularly regarding data privacy and the accountability of algorithmic decisions when a misdiagnosis occurs."
      ],
      questions: [
        {
          id: 16,
          text: "What is the main topic of the passage?",
          options: [
            "The benefits and ethical challenges of AI in healthcare.",
            "The complete replacement of human doctors by AI systems.",
            "The high cost of developing new pharmaceutical drugs.",
            "The history of medical imaging technologies."
          ],
          correct: 0,
          explain: "Bài đọc giới thiệu cả những lợi ích (chẩn đoán nhanh, bào chế thuốc) và thách thức đạo đức (bảo mật, trách nhiệm giải trình) của AI trong y học."
        },
        {
          id: 17,
          text: "The word \"revolutionizing\" in paragraph 1 is closest in meaning to _______.",
          options: ["completely changing", "destroying", "keeping the same", "slowing down"],
          correct: 0,
          explain: "'Revolutionize' = cách mạng hóa, làm thay đổi hoàn toàn một lĩnh vực (completely changing)."
        },
        {
          id: 18,
          text: "According to paragraph 1, how do AI systems perform compared to human radiologists in lung scans?",
          options: [
            "They have achieved precision levels that equal or exceed human professionals.",
            "They cannot identify any signs of cancer.",
            "They are only used when human doctors are unavailable.",
            "They are much slower and less accurate."
          ],
          correct: 0,
          explain: "Đoạn 1: 'identifying signs... with rates of precision that equal or even surpass human radiologists'."
        },
        {
          id: 19,
          text: "What is the primary role of AI systems in medical diagnosis as described in the passage?",
          options: [
            "To act as a supportive tool to help doctors and reduce errors.",
            "To make medical tests more expensive.",
            "To lower the salary of medical professionals.",
            "To replace human doctors entirely."
          ],
          correct: 0,
          explain: "Đoạn 2: 'This technology is not intended to replace doctors, but rather to serve as a powerful diagnostic tool, helping to reduce diagnostic errors'."
        },
        {
          id: 20,
          text: "According to paragraph 3, how does AI contribute to drug discovery?",
          options: [
            "By testing drugs on human volunteers.",
            "By manufacturing drugs in automated factories.",
            "By predicting chemical interactions to narrow down candidates quickly.",
            "By funding clinical trials with digital currencies."
          ],
          correct: 2,
          explain: "Đoạn 3: 'AI can predict how different chemical compounds will interact with targets in the body, narrowing down potential drug candidates'."
        },
        {
          id: 21,
          text: "The word \"fraction\" in paragraph 3 is closest in meaning to _______.",
          options: [
            "large amount",
            "scientific formula",
            "mathematical equation",
            "very small part"
          ],
          correct: 3,
          explain: "Cụm từ 'in a fraction of the time' có nghĩa là chỉ mất một phần nhỏ thời gian (rất nhanh so với trước đây)."
        },
        {
          id: 22,
          text: "What ethical concern is raised in the final paragraph regarding AI in medicine?",
          options: [
            "The fear that AI will refuse to work.",
            "The difficulty of teaching AI medical terms.",
            "The lack of electricity to power AI servers.",
            "Issues of patient data privacy and accountability for mistakes."
          ],
          correct: 3,
          explain: "Đoạn cuối: 'raises serious ethical questions, particularly regarding data privacy and the accountability of algorithmic decisions when a misdiagnosis occurs'."
        }
      ]
    },
    {
      id: "part4b",
      name: "Part 4: Reading Comprehension — Passage 2",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "The transition from fossil fuels to renewable energy sources, such as solar, wind, and hydroelectric power, is arguably the most critical task of the twenty-first century. For over two centuries, industrialized societies have relied on coal, oil, and natural gas to power factories, vehicles, and homes. However, the combustion of these fossil fuels releases billions of tons of carbon dioxide and other greenhouse gases annually, driving global temperatures upward and causing extreme weather events. To prevent catastrophic climate change, the world must rapidly decarbonize its energy systems.",
        "Fortunately, the economics of clean energy have shifted dramatically. Over the past decade, the cost of solar panels and wind turbines has plummeted, making renewable energy cheaper than fossil fuels in many parts of the world. Consequently, installations of renewable energy systems have reached record highs globally. Despite these positive developments, significant technical challenges remain.",
        "The primary hurdle is intermittency: the sun does not always shine, and the wind does not always blow. Unlike coal or gas power plants, which can produce electricity continuously, wind and solar power fluctuate. To overcome this, massive investments are needed in battery storage technology to save excess power for use when generation is low. Additionally, upgrading aging electrical grids to handle decentralized, clean energy sources is a monumental task. Governments must enact supportive policies, and private sectors must commit capital, to build the resilient energy infrastructure that the future demands."
      ],
      questions: [
        {
          id: 23,
          text: "What is the primary purpose of the passage?",
          options: [
            "To argue for the necessity of transitioning to renewable energy and detail the challenges involved.",
            "To explain how solar panels are manufactured.",
            "To criticize governments for ignoring climate change.",
            "To compare coal and natural gas efficiency."
          ],
          correct: 0,
          explain: "Bài viết thảo luận về tầm quan trọng của việc chuyển đổi sang năng lượng sạch, các lợi thế kinh tế gần đây và những khó khăn kỹ thuật đi kèm."
        },
        {
          id: 24,
          text: "According to paragraph 1, what has been the main driver of rising global temperatures?",
          options: [
            "Deforestation for farming.",
            "The burning of fossil fuels.",
            "Volcanic eruptions.",
            "The construction of wind turbines."
          ],
          correct: 1,
          explain: "Đoạn 1: 'the combustion of these fossil fuels releases billions of tons of carbon dioxide... driving global temperatures upward'."
        },
        {
          id: 25,
          text: "The word \"plummeted\" in paragraph 2 is closest in meaning to _______.",
          options: ["stayed stable", "increased rapidly", "dropped sharply", "became unpredictable"],
          correct: 2,
          explain: "'Plummet' = giảm mạnh, rơi thẳng đứng (dropped sharply)."
        },
        {
          id: 26,
          text: "According to paragraph 2, what has made renewable energy more viable recently?",
          options: [
            "Fossil fuel supplies have completely run out.",
            "New types of coal have been discovered.",
            "Governments have banned fossil fuels entirely.",
            "The cost of solar and wind technologies has decreased significantly."
          ],
          correct: 3,
          explain: "Đoạn 2: 'the cost of solar panels and wind turbines has plummeted, making renewable energy cheaper than fossil fuels'."
        },
        {
          id: 27,
          text: "What does the term \"intermittency\" refer to in paragraph 3?",
          options: [
            "The difficulty in transporting electricity over long distances.",
            "The fact that clean energy generation fluctuates and is not constant.",
            "The high cost of maintaining power lines.",
            "The pollution caused by manufacturing solar panels."
          ],
          correct: 1,
          explain: "Đoạn 3 giải thích: 'intermittency: the sun does not always shine, and the wind does not always blow... wind and solar power fluctuate'."
        },
        {
          id: 28,
          text: "According to the passage, how can the issue of intermittency be resolved?",
          options: [
            "By building solar panels in space.",
            "By reducing the global consumption of electricity.",
            "By investing in battery storage technology to save excess energy.",
            "By using more coal during the night."
          ],
          correct: 2,
          explain: "Đoạn 3: 'To overcome this, massive investments are needed in battery storage technology to save excess power'."
        },
        {
          id: 29,
          text: "The word \"hurdle\" in paragraph 3 is closest in meaning to _______.",
          options: ["solution", "alternative", "advantage", "obstacle or difficulty"],
          correct: 3,
          explain: "'Hurdle' = rào cản, chướng ngại vật (obstacle or difficulty)."
        },
        {
          id: 30,
          text: "What does the author suggest governments and private sectors must do?",
          options: [
            "Work together to fund and support clean energy infrastructure.",
            "Focus solely on nuclear energy development.",
            "Stop importing solar panels from other countries.",
            "Ban all private energy companies."
          ],
          correct: 0,
          explain: "Đoạn cuối: 'Governments must enact supportive policies, and private sectors must commit capital, to build the resilient energy infrastructure'."
        }
      ]
    }
  ]
};

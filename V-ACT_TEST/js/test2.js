const TEST_DATA = {
  title: "V-ACT English Test 2",
  totalQuestions: 30,
  timeLimit: 45, // minutes
  parts: [
    {
      id: "part1",
      name: "Part 1: Multiple Choice",
      instruction: "Choose the best answer (A, B, C, or D) to complete each sentence.",
      type: "multiple_choice",
      questions: [
        {
          id: 1,
          text: "When making a decision, you should take all the relevant factors into _______.",
          options: ["consideration", "thought", "mind", "accountability"],
          correct: 0,
          explain: "Collocation: 'take something into consideration' = xem xét, cân nhắc đến cái gì."
        },
        {
          id: 2,
          text: "The new bridge _______ by the end of next year.",
          options: ["is built", "will be built", "will have been built", "has been built"],
          correct: 2,
          explain: "Dấu hiệu 'by the end of + thời gian tương lai' (by the end of next year) kết hợp với chủ ngữ chỉ vật (The new bridge) -> Dùng thì Tương lai hoàn thành ở thể bị động: 'will have been V3/ed'."
        },
        {
          id: 3,
          text: "The manager asked me _______ I had finished the financial report.",
          options: ["that", "if", "what", "which"],
          correct: 1,
          explain: "Câu tường thuật dạng Yes/No question: S + asked + O + if/whether + S + V (lùi thì)."
        },
        {
          id: 4,
          text: "The company aims to _______ sustainable practices to reduce its carbon footprint.",
          options: ["accomplish", "implement", "construct", "fabricate"],
          correct: 1,
          explain: "Từ vựng học thuật (Academic Vocab): 'implement' = áp dụng, thực thi. 'implement sustainable practices' = áp dụng các biện pháp bền vững."
        },
        {
          id: 5,
          text: "The scientist, _______ research won a Nobel Prize, will give a lecture tomorrow.",
          options: ["who", "whom", "which", "whose"],
          correct: 3,
          explain: "Mệnh đề quan hệ chỉ sở hữu: 'whose + Noun' (nghiên cứu của nhà khoa học đó)."
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
          text: 'The candidate answered all the interview questions very <span class="underline-error">confident</span> (A), which <span class="underline-error">impressed</span> (B) the <span class="underline-error">hiring</span> (C) manager <span class="underline-error">greatly</span> (D).',
          options: ["A. confident", "B. impressed", "C. hiring", "D. greatly"],
          correct: 0,
          explain: "Cấu tạo từ (Word Form): Đứng sau động từ thường 'answered' cần một trạng từ -> 'confidently'."
        },
        {
          id: 7,
          text: 'Not only <span class="underline-error">she is</span> (A) an excellent student, <span class="underline-error">but</span> (B) she is also a <span class="underline-error">talented</span> (C) <span class="underline-error">musician</span> (D).',
          options: ["A. she is", "B. but", "C. talented", "D. musician"],
          correct: 0,
          explain: "Đảo ngữ (Inversion) với Not only: 'Not only + trợ động từ/tobe + S...'. Cần đảo ngữ thành 'is she'."
        },
        {
          id: 8,
          text: 'It is the <span class="underline-error">local</span> (A) residents who <span class="underline-error">needs</span> (B) to <span class="underline-error">be consulted</span> (C) before the <span class="underline-error">project begins</span> (D).',
          options: ["A. local", "B. needs", "C. be consulted", "D. project begins"],
          correct: 1,
          explain: "Câu chẻ (Cleft sentence): 'It is + N + who + V'. Động từ 'need' phải chia theo danh từ 'local residents' (số nhiều) -> 'need' (không có s)."
        },
        {
          id: 9,
          text: 'You <span class="underline-error">must have</span> (A) <span class="underline-error">called</span> (B) him yesterday to <span class="underline-error">inform</span> (C) him of the <span class="underline-error">schedule change</span> (D).',
          options: ["A. must have", "B. called", "C. inform", "D. schedule change"],
          correct: 0,
          explain: "Động từ khuyết thiếu (Modals): 'must have V3' chỉ một suy luận logic ở quá khứ (chắc hẳn là đã). Ở đây nghĩa là 'lẽ ra bạn nên gọi' -> dùng 'should have' thay cho 'must have'."
        },
        {
          id: 10,
          text: 'Many <span class="underline-error">species</span> (A) of animals are in danger of extinction <span class="underline-error">due of</span> (B) habitat <span class="underline-error">loss</span> (C) and climate <span class="underline-error">change</span> (D).',
          options: ["A. species", "B. due of", "C. loss", "D. change"],
          correct: 1,
          explain: "Cụm từ (Collocation): Phải dùng 'due to' (bởi vì), không dùng 'due of'."
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
          text: "No one else in the team plays basketball as well as Peter.",
          options: [
            "Peter is the best basketball player in the team.",
            "Everyone in the team plays basketball better than Peter.",
            "Peter plays basketball as well as other members in the team.",
            "Peter is not as good at basketball as anyone else in the team."
          ],
          correct: 0,
          explain: "Cấu trúc so sánh: 'No one ... as + adj/adv + as' = So sánh nhất (The most/best...)."
        },
        {
          id: 12,
          text: "\"I'm sorry I forgot to submit the assignment,\" the student said.",
          options: [
            "The student denied forgetting to submit the assignment.",
            "The student promised to submit the assignment.",
            "The student apologized for forgetting to submit the assignment.",
            "The student refused to submit the assignment."
          ],
          correct: 2,
          explain: "Câu tường thuật: 'I'm sorry...' -> 'apologize for + V-ing'."
        },
        {
          id: 13,
          text: "If you don't wear a helmet, you will be fined.",
          options: [
            "Unless you wear a helmet, you won't be fined.",
            "Unless you wear a helmet, you will be fined.",
            "If you wear a helmet, you will be fined.",
            "Unless you don't wear a helmet, you will be fined."
          ],
          correct: 1,
          explain: "Câu điều kiện: 'If... not' = 'Unless'. Nghĩa câu: Trừ khi bạn đội mũ bảo hiểm, (nếu không) bạn sẽ bị phạt."
        },
        {
          id: 14,
          text: "They report that the missing explorer has been found alive.",
          options: [
            "The missing explorer is reported to have been found alive.",
            "It is reported that the missing explorer has found alive.",
            "The missing explorer was reported to be found alive.",
            "It reports that the missing explorer is found alive."
          ],
          correct: 0,
          explain: "Câu bị động kép (Passive voice): 'They report that + S2 + V2' -> 'S2 + is/are reported + to have + V3/ed' (do V2 'has been found' xảy ra trước V1 'report')."
        },
        {
          id: 15,
          text: "I didn't bring my umbrella, so I got completely wet.",
          options: [
            "If I brought my umbrella, I wouldn't get completely wet.",
            "If I had brought my umbrella, I wouldn't have got completely wet.",
            "I wouldn't get completely wet if I had brought my umbrella.",
            "If I didn't bring my umbrella, I would get completely wet."
          ],
          correct: 1,
          explain: "Câu điều kiện loại 3 (Conditionals type 3): Giả định trái ngược với quá khứ. 'If + S + had V3/ed, S + would have V3/ed'."
        }
      ]
    },
    {
      id: "part4a",
      name: "Part 4: Reading Comprehension — Passage 1",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "Artificial Intelligence (AI) is transforming the landscape of education in unprecedented ways. Gone are the days when learning was a one-size-fits-all experience. Today, AI-powered educational platforms can tailor learning materials to suit the individual needs, pace, and learning styles of each student. This personalized approach not only enhances student engagement but also improves overall academic outcomes.",
        "One of the most significant applications of AI in education is intelligent tutoring systems. These systems provide immediate, customized feedback to students as they work through problems. For instance, if a student struggles with a specific algebraic concept, the AI tutor can detect this difficulty and automatically generate supplementary exercises and explanations targeted at that exact concept. This mimics the benefits of one-on-one human tutoring, making high-quality personalized instruction accessible to a larger number of students.",
        "Moreover, AI is assisting educators by automating administrative tasks. Grading multiple-choice tests and checking for plagiarism have already been largely automated. Recently, AI has become capable of evaluating written essays, providing teachers with preliminary grades and highlighting areas where students need improvement. This automation frees up valuable time for teachers, allowing them to focus more on lesson planning, mentoring, and interacting with students directly.",
        "Despite its immense potential, the integration of AI in education raises several concerns. Data privacy is a primary issue, as AI systems require vast amounts of student data to function effectively. There is also the fear that an over-reliance on technology might diminish the crucial human element in teaching. Empathy, emotional support, and the ability to inspire are inherently human traits that machines cannot replicate.",
        "In conclusion, while AI will not replace human teachers, it will undoubtedly change their roles. Educators of the future will likely work alongside AI, using it as a powerful tool to enhance their teaching methods and provide a more personalized, effective educational experience for all students."
      ],
      questions: [
        {
          id: 16,
          text: "What is the primary focus of the passage?",
          options: [
            "The dangers of using AI in schools",
            "How AI is personalizing and changing education",
            "Why human teachers will soon be replaced",
            "The technical mechanism of intelligent tutoring systems"
          ],
          correct: 1,
          explain: "Bài đọc tập trung vào cách AI đang thay đổi giáo dục bằng cách cá nhân hóa việc học, hỗ trợ giáo viên và các thách thức đi kèm."
        },
        {
          id: 17,
          text: "According to paragraph 2, how do intelligent tutoring systems help students?",
          options: [
            "By replacing their human teachers entirely",
            "By offering generic exercises for the whole class",
            "By identifying struggles and providing targeted practice",
            "By doing the students' homework for them"
          ],
          correct: 2,
          explain: "Đoạn 2 nêu rõ: 'the AI tutor can detect this difficulty and automatically generate supplementary exercises... targeted at that exact concept'."
        },
        {
          id: 18,
          text: 'The word "mimics" in paragraph 2 is closest in meaning to _______.',
          options: ["rejects", "imitates", "improves", "evaluates"],
          correct: 1,
          explain: "'Mimic' = bắt chước, mô phỏng (imitate). AI tutor mô phỏng lợi ích của việc gia sư 1-kèm-1."
        },
        {
          id: 19,
          text: "According to paragraph 3, what is a benefit of AI evaluating written essays?",
          options: [
            "It forces students to write better essays.",
            "It gives teachers more free time to rest at home.",
            "It completely eliminates the need for teachers to read essays.",
            "It saves teachers time so they can focus on interacting with students."
          ],
          correct: 3,
          explain: "Đoạn 3: 'This automation frees up valuable time for teachers, allowing them to focus more on lesson planning, mentoring, and interacting with students'."
        },
        {
          id: 20,
          text: "Which of the following is mentioned as a concern regarding AI in education?",
          options: [
            "AI systems are too expensive for most schools.",
            "AI cannot grade multiple-choice tests accurately.",
            "AI requires large amounts of student data, raising privacy issues.",
            "AI tutors often give incorrect feedback to students."
          ],
          correct: 2,
          explain: "Đoạn 4 nêu: 'Data privacy is a primary issue, as AI systems require vast amounts of student data'."
        },
        {
          id: 21,
          text: 'The word "diminish" in paragraph 4 is closest in meaning to _______.',
          options: ["reduce", "increase", "highlight", "replace"],
          correct: 0,
          explain: "'Diminish' = làm giảm bớt (reduce). Quan ngại rằng việc quá phụ thuộc vào công nghệ sẽ làm giảm đi yếu tố con người."
        },
        {
          id: 22,
          text: "What does the author suggest about the future of teachers in the last paragraph?",
          options: [
            "They will become obsolete due to advanced AI.",
            "They will collaborate with AI to improve teaching.",
            "They will reject AI technology to preserve traditional methods.",
            "They will focus solely on providing emotional support."
          ],
          correct: 1,
          explain: "Đoạn cuối: 'Educators of the future will likely work alongside AI, using it as a powerful tool...'"
        }
      ]
    },
    {
      id: "part4b",
      name: "Part 4: Reading Comprehension — Passage 2",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "The rise of fast fashion has dramatically altered the clothing industry over the past two decades. Fast fashion refers to the rapid production of inexpensive clothing that mimics current high-fashion trends. Brands like Zara, H&M, and Forever 21 pioneered this model, encouraging consumers to buy more clothes, wear them less frequently, and discard them quickly as new trends emerge.",
        "While this model offers consumers affordable and trendy options, it comes at a staggering environmental cost. The fashion industry is responsible for nearly 10% of global carbon emissions and is the second-largest consumer of the world's water supply. For example, it takes approximately 2,700 liters of water to produce a single cotton t-shirt—the amount an average person drinks in two and a half years. Furthermore, the dyeing and treatment of textiles are major sources of water pollution, particularly in developing countries where environmental regulations are often lax.",
        "The environmental impact does not end with production. The \"throwaway\" culture promoted by fast fashion has led to a massive waste problem. Every second, the equivalent of one garbage truck of textiles is landfilled or burned globally. Synthetic fabrics like polyester, which are heavily used in fast fashion, do not decompose quickly and release microplastics into the oceans when washed.",
        "In addition to environmental concerns, fast fashion has faced severe criticism regarding labor practices. To keep prices extremely low, production is frequently outsourced to countries with low minimum wages and poor working conditions. Factory workers, many of whom are women, often work long hours in unsafe environments for wages that barely cover their basic living expenses.",
        "In response to these issues, a sustainable fashion movement is gaining momentum. Consumers are increasingly demanding transparency from brands and opting for second-hand clothing or garments made from eco-friendly materials. Some companies are adopting circular economy models, which focus on designing clothes that are durable, repairable, and recyclable. However, a significant shift in both corporate practices and consumer habits is required to truly address the impacts of fast fashion."
      ],
      questions: [
        {
          id: 23,
          text: "What does the term 'fast fashion' refer to in paragraph 1?",
          options: [
            "Clothing that is designed for athletes and runners.",
            "The quick delivery of expensive, high-quality garments.",
            "The rapid manufacturing of cheap, trendy clothing.",
            "The process of washing and drying clothes quickly."
          ],
          correct: 2,
          explain: "Đoạn 1 định nghĩa: 'Fast fashion refers to the rapid production of inexpensive clothing that mimics current high-fashion trends'."
        },
        {
          id: 24,
          text: "Why does the author mention the amount of water needed to produce a cotton t-shirt?",
          options: [
            "To prove that cotton is the most sustainable fabric.",
            "To illustrate the massive water consumption of the fashion industry.",
            "To encourage people to drink more water.",
            "To show why cotton clothes are so expensive."
          ],
          correct: 1,
          explain: "Tác giả đưa ra con số 2,700 lít nước để minh họa (illustrate) cho luận điểm 'second-largest consumer of the world's water supply' ở câu trước đó."
        },
        {
          id: 25,
          text: 'The word "lax" in paragraph 2 is closest in meaning to _______.',
          options: ["strict", "loose or not strict", "complicated", "new"],
          correct: 1,
          explain: "'Lax' = lỏng lẻo, không nghiêm ngặt (loose or not strict). Ngữ cảnh: luật lệ bảo vệ môi trường ở các nước đang phát triển thường lỏng lẻo."
        },
        {
          id: 26,
          text: "According to paragraph 3, what happens when clothes made of synthetic fabrics are washed?",
          options: [
            "They shrink and become unwearable.",
            "They absorb large amounts of polluted water.",
            "They decompose and disappear completely.",
            "They release microplastics into the oceans."
          ],
          correct: 3,
          explain: "Đoạn 3: 'Synthetic fabrics like polyester... release microplastics into the oceans when washed.'"
        },
        {
          id: 27,
          text: "What is mentioned in paragraph 4 as a way brands keep their prices extremely low?",
          options: [
            "By using robots instead of human workers.",
            "By producing clothes in countries with low wages and poor conditions.",
            "By selling clothes directly from the factory to consumers.",
            "By forcing workers to pay for their own sewing machines."
          ],
          correct: 1,
          explain: "Đoạn 4: 'To keep prices extremely low, production is frequently outsourced to countries with low minimum wages and poor working conditions'."
        },
        {
          id: 28,
          text: 'The word "momentum" in paragraph 5 is closest in meaning to _______.',
          options: ["resistance", "criticism", "forward motion or energy", "financial support"],
          correct: 2,
          explain: "'Gain momentum' = đạt được đà phát triển, thu hút sự chú ý và tiến lên phía trước."
        },
        {
          id: 29,
          text: "Which of the following describes a 'circular economy model' in fashion?",
          options: [
            "Designing clothes that last long and can be recycled.",
            "Selling clothes in a continuous circle of physical stores.",
            "Encouraging consumers to throw away clothes every season.",
            "Producing synthetic fabrics in round factories."
          ],
          correct: 0,
          explain: "Đoạn 5: 'circular economy models, which focus on designing clothes that are durable, repairable, and recyclable'."
        },
        {
          id: 30,
          text: "What is the author's main purpose in writing this passage?",
          options: [
            "To advertise new, eco-friendly fashion brands.",
            "To explain the negative impacts of fast fashion and note a rising sustainable trend.",
            "To advise readers on how to dress fashionably on a low budget.",
            "To defend the labor practices of global fast fashion companies."
          ],
          correct: 1,
          explain: "Mục đích chính: Giải thích tác động tiêu cực của fast fashion (môi trường, lao động) và đề cập đến xu hướng thời trang bền vững đang lên."
        }
      ]
    }
  ]
};

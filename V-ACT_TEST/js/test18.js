const TEST_DATA = {
  title: "V-ACT English Test 18",
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
          text: "The project was completed ahead of schedule, _______ pleased the management.",
          options: ["who", "what", "which", "that"],
          correct: 2,
          explain: "Đại từ quan hệ: Dùng 'which' làm từ nối đứng sau dấu phẩy để thay thế cho toàn bộ mệnh đề/ý kiến đứng trước."
        },
        {
          id: 2,
          text: "Hardly _______ down at his desk when the phone started ringing.",
          options: ["he had sat", "he sat", "did he sit", "had he sat"],
          correct: 3,
          explain: "Cấu trúc đảo ngữ: 'Hardly + had + S + V3/ed + when + S + V2/ed' (Vừa mới... thì...)."
        },
        {
          id: 3,
          text: "I would appreciate _______ from you as soon as possible.",
          options: ["hearing", "to hear", "heard", "hear"],
          correct: 0,
          explain: "Cấu trúc động từ: 'appreciate + V-ing' (trân trọng/biết ơn việc làm gì)."
        },
        {
          id: 4,
          text: "They proposed that the new highway _______ built through the forest.",
          options: ["wasn't", "isn't", "not be", "won't be"],
          correct: 2,
          explain: "Cấu trúc câu giả định với động từ 'propose': 'S + propose + that + S + (should) be + V3/ed'. Ở dạng phủ định ta dùng 'not be + V3/ed'."
        },
        {
          id: 5,
          text: "The team had to _______ the football match due to the bad weather.",
          options: ["put off", "put out", "put on", "put up"],
          correct: 0,
          explain: "Phrasal verb: 'put off' = trì hoãn. Các từ khác: 'put out' = dập tắt lửa, 'put up' = dựng lên/cho ở nhờ, 'put on' = mặc đồ."
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
          text: "Neither the manager <span class=\"underline-error\">nor</span> (A) his assistants <span class=\"underline-error\">was</span> (B) satisfied with <span class=\"underline-error\">the results</span> (C) of the negotiation <span class=\"underline-error\">yesterday</span> (D).",
          options: ["A. nor", "B. was", "C. the results", "D. yesterday"],
          correct: 1,
          explain: "Sự hòa hợp chủ vị: Với cấu trúc 'Neither N1 nor N2', động từ chia theo danh từ đứng sau (N2). Ở đây 'his assistants' là số nhiều nên động từ phải chia là 'were'. Sửa 'was' thành 'were'."
        },
        {
          id: 7,
          text: "If they <span class=\"underline-error\">had left</span> (A) earlier, they <span class=\"underline-error\">would not miss</span> (B) the train <span class=\"underline-error\">which</span> (C) left at 8 <span class=\"underline-error\">AM</span> (D).",
          options: ["A. had left", "B. would not miss", "C. which", "D. AM"],
          correct: 1,
          explain: "Câu điều kiện loại 3: Giả định ngược quá khứ, mệnh đề chính chia dạng 'would + have + V3/ed'. Sửa 'would not miss' thành 'would not have missed'."
        },
        {
          id: 8,
          text: "It is <span class=\"underline-error\">crucial that</span> (A) every member <span class=\"underline-error\">contributes</span> (B) <span class=\"underline-error\">their</span> (C) ideas to the project <span class=\"underline-error\">proposal</span> (D).",
          options: ["A. crucial that", "B. contributes", "C. their", "D. proposal"],
          correct: 1,
          explain: "Cấu trúc giả định: 'It is crucial that + S + V(bare)'. Động từ ở mệnh đề sau 'that' phải chia nguyên mẫu không thêm 's/es'. Sửa 'contributes' thành 'contribute'."
        },
        {
          id: 9,
          text: "The company, <span class=\"underline-error\">that</span> (A) was founded in 1990, <span class=\"underline-error\">has became</span> (B) one of the <span class=\"underline-error\">most successful</span> (C) in the <span class=\"underline-error\">industry</span> (D).",
          options: ["A. that", "B. has became", "C. most successful", "D. industry"],
          correct: 0,
          explain: "Mệnh đề quan hệ không xác định: Không dùng đại từ quan hệ 'that' sau dấu phẩy. Sửa 'that' thành 'which'."
        },
        {
          id: 10,
          text: "I think <span class=\"underline-error\">her performance</span> (A) was <span class=\"underline-error\">quite disappointed</span> (B), as <span class=\"underline-error\">she made</span> (C) many grammatical <span class=\"underline-error\">mistakes</span> (D).",
          options: ["A. her performance", "B. quite disappointed", "C. she made", "D. mistakes"],
          correct: 1,
          explain: "Tính từ đuôi -ing vs -ed: Tính từ miêu tả tính chất của một sự vật/sự việc/hành động (her performance) dùng đuôi -ing. Sửa 'disappointed' thành 'disappointing'."
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
          text: "I didn't have a map, so I got lost in the city.",
          options: [
            "If I had had a map, I wouldn't have got lost in the city.",
            "If I had a map, I wouldn't get lost in the city.",
            "Had I had a map, I would get lost in the city.",
            "Unless I had a map, I would have got lost in the city."
          ],
          correct: 0,
          explain: "Câu điều kiện loại 3 giả định trái với quá khứ: 'If + S + had + V3/ed, S + would have + V3/ed'."
        },
        {
          id: 12,
          text: "It is compulsory for all visitors to show their ID cards at the gate.",
          options: [
            "All visitors may show their ID cards at the gate.",
            "All visitors should show their ID cards at the gate.",
            "All visitors must show their ID cards at the gate.",
            "All visitors needn't show their ID cards at the gate."
          ],
          correct: 2,
          explain: "Từ đồng nghĩa: 'compulsory' = bắt buộc, tương đương động từ khuyết thiếu mang tính bắt buộc 'must'."
        },
        {
          id: 13,
          text: "They are holding the meeting in the main hall right now.",
          options: [
            "The meeting is being held in the main hall right now.",
            "The meeting is held in the main hall right now.",
            "The meeting is holding in the main hall right now.",
            "The meeting has been held in the main hall right now."
          ],
          correct: 0,
          explain: "Chuyển sang bị động thì Hiện tại tiếp diễn: 'S + am/is/are + being + V3/ed'."
        },
        {
          id: 14,
          text: "He hasn't played tennis for two years.",
          options: [
            "The last time he played tennis was two years ago.",
            "It has been two years since he has played tennis.",
            "He didn't play tennis two years ago.",
            "He last played tennis for two years."
          ],
          correct: 0,
          explain: "Chuyển đổi thì: 'S + hasn't/haven't + V3 + for + khoảng thời gian' = 'The last time + S + V2 + was + khoảng thời gian + ago'."
        },
        {
          id: 15,
          text: "\"I should have studied harder for the final exam,\" she said.",
          options: [
            "She wished she studied harder for the final exam.",
            "She denied not studying harder for the final exam.",
            "She regretted not studying harder for the final exam.",
            "She regretted to study harder for the final exam."
          ],
          correct: 2,
          explain: "Cấu trúc 'should have + V3/ed' chỉ sự tiếc nuối trong quá khứ (lẽ ra nên làm nhưng đã không làm) tương đương 'regret + not + V-ing'."
        }
      ]
    },
    {
      id: "part4a",
      name: "Part 4: Reading Comprehension — Passage 1",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "Architecture is often viewed as a purely aesthetic or functional art form, but its influence on human psychology and behavior is profound. The physical buildings and spaces we inhabit on a daily basis shape how we feel, think, and interact with one another. Neuroscientists and environmental psychologists have shown that elements such as ceiling height, natural light, and the arrangement of furniture can directly impact brain activity and chemical hormone levels in the body. For example, high ceilings have been found to encourage creative thinking and abstract thought, whereas lower ceilings tend to foster focus and detail-oriented work.",
        "Similarly, natural light plays a vital role in regulating our circadian rhythms, which affect sleep patterns, mood, and overall daytime energy levels. People who work in offices with ample natural light report higher productivity, lower stress levels, and better sleep quality compared to those working under harsh artificial lighting. On the other hand, poorly designed, windowless spaces can cause significant psychological distress. Dark, cramped corridors and noisy environments can elevate cortisol levels, leading to chronic stress and anxiety. In urban design, the lack of green spaces and public community areas can contribute directly to feelings of isolation and depression among city residents.",
        "In recent years, architects and designers have increasingly adopted evidence-based design to create spaces that actively promote well-being. This includes integrating biophilic design elements, such as green indoor plants, natural building materials, and soothing water features, which have been shown to reduce stress and improve cognitive function. Additionally, layout designs that encourage physical movement and social interaction are being used in modern schools and offices to foster collaboration and healthier, more active lifestyles. As we spend more than ninety percent of our lives indoors, the design of our physical environment is not just a matter of taste; it is a critical and determining factor in our mental and physical health. By understanding the deep connection between architecture and human behavior, designers can build a more harmonious world."
      ],
      questions: [
        {
          id: 16,
          text: "What is the main idea of the passage?",
          options: [
            "The history of urban biophilic design.",
            "Ceiling height is the most important factor in architecture.",
            "The design of physical spaces has a profound effect on human psychology and health.",
            "How natural light regulates sleep patterns."
          ],
          correct: 2,
          explain: "Bài viết trình bày tầm ảnh hưởng sâu sắc của thiết kế kiến trúc và không gian vật lý lên tâm lý, sức khỏe và hành vi con người."
        },
        {
          id: 17,
          text: "According to paragraph 1, how do high ceilings affect human thinking?",
          options: [
            "They improve focus on details.",
            "They encourage creative and abstract thinking.",
            "They cause stress and anxiety.",
            "They make people feel sleepy."
          ],
          correct: 1,
          explain: "Đoạn 1: 'high ceilings have been found to encourage creative thinking and abstract thought'."
        },
        {
          id: 18,
          text: "What benefit does natural light in offices provide according to paragraph 2?",
          options: [
            "It eliminates the need for computer screens.",
            "It makes the furniture look better.",
            "It reduces electricity costs.",
            "It improves productivity, sleep quality, and lowers stress."
          ],
          correct: 3,
          explain: "Đoạn 2: 'People who work in offices with ample natural light report higher productivity, lower stress levels, and better sleep quality...'"
        },
        {
          id: 19,
          text: "In paragraph 2, what can lead to feelings of isolation and depression in city residents?",
          options: [
            "Lower ceilings in homes.",
            "Ample natural light.",
            "A lack of green spaces and community areas in urban design.",
            "The use of biophilic materials."
          ],
          correct: 2,
          explain: "Đoạn 2: 'In urban design, the lack of green spaces and public community areas can contribute directly to feelings of isolation and depression...'"
        },
        {
          id: 20,
          text: "What is \"biophilic design\" as described in paragraph 3?",
          options: [
            "A design that focuses on building skyscrapers.",
            "Integrating natural elements like plants and water features into spaces.",
            "A design based on mathematical formulas.",
            "An architecture style from the Renaissance."
          ],
          correct: 1,
          explain: "Đoạn 3: 'integrating biophilic design elements, such as green indoor plants, natural building materials, and soothing water features...'"
        },
        {
          id: 21,
          text: "The word \"determining\" in paragraph 3 is closest in meaning to _______.",
          options: ["unimportant", "temporary", "decisive", "expensive"],
          correct: 2,
          explain: "'Determining factor' = nhân tố mang tính quyết định (decisive factor)."
        },
        {
          id: 22,
          text: "Why is architecture design critical according to the author?",
          options: [
            "Because it is a cheap way to paint walls.",
            "Because it determines our income.",
            "Because architects are highly paid.",
            "Because we spend over 90% of our lives indoors."
          ],
          correct: 3,
          explain: "Đoạn 3: 'As we spend more than ninety percent of our lives indoors, the design of our physical environment is... a critical and determining factor...'"
        }
      ]
    },
    {
      id: "part4b",
      name: "Part 4: Reading Comprehension — Passage 2",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "As the global population is projected to reach nearly ten billion by the year 2050, traditional agriculture faces the daunting challenge of producing enough food without further destroying the planet's remaining natural habitats. One innovative solution that has gained significant traction is vertical farming. Unlike conventional farming, which requires vast tracts of land and relies on favorable weather, vertical farming involves growing organic crops in vertically stacked layers inside highly controlled indoor environments. By utilizing advanced technologies such as hydroponics, aeroponics, and LED lighting, vertical farms can produce high yields of fresh food year-round, regardless of external weather conditions.",
        "The environmental benefits of vertical farming are substantial. Because the crops are grown indoors under precise conditions, they require up to ninety-five percent less freshwater than traditional open-field farming. The closed-loop systems recycle water, preventing the runoff that often pollutes local waterways. Furthermore, vertical farms do not require chemical pesticides, as the controlled environment prevents pest infestations. Because these farms can be built in urban areas, they significantly reduce the transportation distance from farm to table. This not only lowers carbon emissions associated with shipping food but also ensures that urban city dwellers receive fresher, more nutritious produce.",
        "Despite these clear advantages, vertical farming faces significant challenges that limit its widespread adoption. The most prominent hurdle is the extremely high energy consumption. Relying entirely on artificial LED lights and climate control systems requires massive amounts of electricity, which can make the process expensive and environmentally damaging if that power is generated by burning fossil fuels. Additionally, the initial capital and setup cost for the advanced technology and infrastructure is very high, making it difficult for small-scale farmers to adopt. To become truly sustainable, vertical farming must integrate renewable energy sources and improve energy efficiency, ensuring it can help feed the future without harming the planet. Only with continued technological advancements and cheaper clean energy can vertical farming realize its full potential as a key pillar of future global food security."
      ],
      questions: [
        {
          id: 23,
          text: "What is the primary purpose of the passage?",
          options: [
            "To explain how LED lights are manufactured.",
            "To discuss the benefits and challenges of vertical farming as a future food solution.",
            "To describe the history of field agriculture.",
            "To criticize modern food distribution channels."
          ],
          correct: 1,
          explain: "Bài viết thảo luận về ưu và nhược điểm (benefits and challenges) của canh tác nông nghiệp thẳng đứng (vertical farming)."
        },
        {
          id: 24,
          text: "According to paragraph 1, how does vertical farming grow crops?",
          options: [
            "In large open fields.",
            "Using traditional plows and tractors.",
            "By importing soil from other countries.",
            "In vertically stacked layers inside controlled indoor environments."
          ],
          correct: 3,
          explain: "Đoạn 1: 'growing organic crops in vertically stacked layers inside highly controlled indoor environments'."
        },
        {
          id: 25,
          text: "What technologies are utilized in vertical farms?",
          options: [
            "Satellites and weather stations.",
            "Fossil fuel engines and large dams.",
            "Genetic engineering and chemical pesticides.",
            "Hydroponics, aeroponics, and LED lighting."
          ],
          correct: 3,
          explain: "Đoạn 1: 'By utilizing advanced technologies such as hydroponics, aeroponics, and LED lighting...'"
        },
        {
          id: 26,
          text: "According to paragraph 2, why does vertical farming need less water?",
          options: [
            "It uses closed-loop systems that recycle water.",
            "It relies on rainwater only.",
            "It does not irrigate crops.",
            "Crops grown indoors do not need water."
          ],
          correct: 0,
          explain: "Đoạn 2: 'they require up to ninety-five percent less freshwater... The closed-loop systems recycle water, preventing the runoff...'"
        },
        {
          id: 27,
          text: "How does vertical farming reduce carbon emissions?",
          options: [
            "By shutting down during the winter.",
            "By growing plants that consume carbon dioxide faster.",
            "By using solar-powered tractors.",
            "By being located in urban areas, which cuts down transportation distance."
          ],
          correct: 3,
          explain: "Đoạn 2: 'Because these farms can be built in urban areas, they significantly reduce the transportation distance from farm to table. This not only lowers carbon emissions...'"
        },
        {
          id: 28,
          text: "What is the main hurdle facing vertical farming according to paragraph 3?",
          options: [
            "Insect infestations.",
            "Extremely high energy consumption and setup costs.",
            "Soil erosion inside buildings.",
            "A lack of interest from consumers."
          ],
          correct: 1,
          explain: "Đoạn 3: 'The most prominent hurdle is the extremely high energy consumption... Additionally, the initial capital and setup cost... is very high...'"
        },
        {
          id: 29,
          text: "The word \"hurdle\" in paragraph 3 is closest in meaning to _______.",
          options: ["advantage", "facility", "solution", "obstacle"],
          correct: 3,
          explain: "'Hurdle' = rào cản, chướng ngại vật (obstacle)."
        },
        {
          id: 30,
          text: "What is required for vertical farming to become truly sustainable?",
          options: [
            "Integrating renewable energy and improving energy efficiency.",
            "Lowering crop yields.",
            "Using chemical pesticides.",
            "Moving vertical farms back to rural areas."
          ],
          correct: 0,
          explain: "Đoạn 3: 'To become truly sustainable, vertical farming must integrate renewable energy sources and improve energy efficiency...'"
        }
      ]
    }
  ]
};

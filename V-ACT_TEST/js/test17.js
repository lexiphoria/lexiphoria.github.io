const TEST_DATA = {
  title: "V-ACT English Test 17",
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
          text: "If you had told me about the meeting yesterday, I _______ it.",
          options: ["will attend", "would have attended", "attended", "would attend"],
          correct: 1,
          explain: "Câu điều kiện loại 3 giả định điều trái với thực tế quá khứ: 'If + S + had + V3/ed, S + would have + V3/ed'."
        },
        {
          id: 2,
          text: "We are considering _______ to a new apartment next month.",
          options: ["move", "to move", "moved", "moving"],
          correct: 3,
          explain: "Cấu trúc động từ: 'consider + V-ing' (cân nhắc, xem xét làm gì)."
        },
        {
          id: 3,
          text: "The doctor recommended that he _______ a few days off work.",
          options: ["taking", "take", "took", "takes"],
          correct: 1,
          explain: "Cấu trúc câu giả định với động từ 'recommend': 'S1 + recommend + that + S2 + V (bare)'. Dù chủ ngữ là 'he' động từ vẫn giữ nguyên mẫu không chia."
        },
        {
          id: 4,
          text: "I finally managed _______ the extremely difficult puzzle after trying for hours.",
          options: ["solve", "to solve", "solved", "solving"],
          correct: 1,
          explain: "Cấu trúc động từ: 'manage + to V' (xoay xở/thành công làm việc gì)."
        },
        {
          id: 5,
          text: "The loud noise of the traffic outside kept me _______ all night.",
          options: ["awaken", "awoke", "woken", "awake"],
          correct: 3,
          explain: "Cấu trúc: 'keep + O + adj' (giữ cho ai/cái gì ở trạng thái nào). 'awake' là tính từ (thức, không ngủ được)."
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
          text: "<span class=\"underline-error\">Because of</span> (A) the traffic jam was <span class=\"underline-error\">severe</span> (B), we arrived <span class=\"underline-error\">late for</span> (C) the conference <span class=\"underline-error\">yesterday</span> (D).",
          options: ["A. Because of", "B. severe", "C. late for", "D. yesterday"],
          correct: 0,
          explain: "Liên từ: 'Because of' đi với cụm danh từ/V-ing. Phía sau có một mệnh đề đầy đủ 'the traffic jam was severe', nên ta phải dùng liên từ 'Because'. Sửa 'Because of' thành 'Because'."
        },
        {
          id: 7,
          text: "The children <span class=\"underline-error\">enjoy</span> (A) playing <span class=\"underline-error\">with</span> (B) their toys and <span class=\"underline-error\">to watch</span> (C) cartoons <span class=\"underline-error\">on TV</span> (D).",
          options: ["A. enjoy", "B. with", "C. to watch", "D. on TV"],
          correct: 2,
          explain: "Cấu trúc song hành: Liên từ 'and' nối hai hành động có cùng vị trí ngữ pháp đứng sau động từ 'enjoy' (yêu cầu V-ing). Sửa 'to watch' thành 'watching'."
        },
        {
          id: 8,
          text: "It is <span class=\"underline-error\">essential that</span> (A) every employee <span class=\"underline-error\">is</span> (B) trained <span class=\"underline-error\">in</span> (C) first aid procedures <span class=\"underline-error\">regularly</span> (D).",
          options: ["A. essential that", "B. is", "C. in", "D. regularly"],
          correct: 1,
          explain: "Cấu trúc câu giả định: 'It is essential that + S + (should) V(bare)'. Ở dạng bị động ta dùng 'be + V3/ed'. Sửa 'is' thành 'be'."
        },
        {
          id: 9,
          text: "The house <span class=\"underline-error\">who</span> (A) they bought last <span class=\"underline-error\">year</span> (B) has <span class=\"underline-error\">a beautiful</span> (C) garden <span class=\"underline-error\">at the back</span> (D).",
          options: ["A. who", "B. year", "C. a beautiful", "D. at the back"],
          correct: 0,
          explain: "Đại từ quan hệ: Dùng 'which' hoặc 'that' để thay thế cho danh từ chỉ vật (the house) làm tân ngữ. Sửa 'who' thành 'which' hoặc 'that'."
        },
        {
          id: 10,
          text: "She was <span class=\"underline-error\">so exhausting</span> (A) after <span class=\"underline-error\">working</span> (B) in the garden <span class=\"underline-error\">all day</span> (C) that she fell asleep <span class=\"underline-error\">quickly</span> (D).",
          options: ["A. so exhausting", "B. working", "C. all day", "D. quickly"],
          correct: 0,
          explain: "Tính từ đuôi -ing vs -ed: Để miêu tả trạng thái cảm xúc, cảm giác bị tác động của con người (she), dùng tính từ đuôi -ed. Sửa 'so exhausting' thành 'so exhausted'."
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
          text: "They will build a new bridge across the river next month.",
          options: [
            "A new bridge will be built across the river next month.",
            "A new bridge is built across the river next month.",
            "A new bridge will have built across the river next month.",
            "A new bridge will build across the river next month."
          ],
          correct: 0,
          explain: "Chuyển sang bị động thì Tương lai đơn: 'S + will be + V3/ed'."
        },
        {
          id: 12,
          text: "I didn't prepare well for the presentation, so it was a disaster.",
          options: [
            "Had I prepared well for the presentation, it would have been a disaster.",
            "Unless I prepared well for the presentation, it would be a disaster.",
            "If I had prepared well for the presentation, it wouldn't have been a disaster.",
            "If I prepared well for the presentation, it wouldn't be a disaster."
          ],
          correct: 2,
          explain: "Giả định ngược quá khứ dùng câu điều kiện loại 3: 'If + S + had + V3/ed, S + would have + V3/ed' (hoặc phủ định phù hợp ngữ nghĩa)."
        },
        {
          id: 13,
          text: "He started working as a teacher ten years ago.",
          options: [
            "He has started working as a teacher for ten years.",
            "He worked as a teacher for ten years.",
            "He has worked as a teacher for ten years.",
            "He hasn't worked as a teacher for ten years."
          ],
          correct: 2,
          explain: "Chuyển đổi thì: 'S + started + V-ing + khoảng thời gian + ago' = 'S + has/have + V3/ed + for + khoảng thời gian'."
        },
        {
          id: 14,
          text: "It was unnecessary for you to bring an umbrella since it didn't rain.",
          options: [
            "You needn't have brought an umbrella.",
            "You must not have brought an umbrella.",
            "You couldn't have brought an umbrella.",
            "You shouldn't have brought an umbrella."
          ],
          correct: 0,
          explain: "Cấu trúc diễn tả một hành động không cần thiết nhưng đã được làm trong quá khứ: 'needn't have + V3/ed'."
        },
        {
          id: 15,
          text: "\"Why don't we go to the cinema tonight?\" said Tom.",
          options: [
            "Tom invited us to go to the cinema tonight.",
            "Tom suggested to go to the cinema that night.",
            "Tom asked why they didn't go to the cinema tonight.",
            "Tom suggested going to the cinema that night."
          ],
          correct: 3,
          explain: "Tường thuật lời gợi ý: 'S + suggested + V-ing'. Lưu ý đổi 'tonight' thành 'that night'."
        }
      ]
    },
    {
      id: "part4a",
      name: "Part 4: Reading Comprehension — Passage 1",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "The invention of the printing press by Johannes Gutenberg in the mid-fifteenth century is widely regarded as one of the most transformative events in human history. Prior to Gutenberg's invention, books were meticulously copied by hand, a process that was incredibly slow and expensive. Consequently, books were rare, expensive luxury items, and literacy was restricted to a very tiny elite, primarily composed of the clergy and royalty. Gutenberg's key innovation was the use of durable movable metal type, combined with a modified wooden press and newly formulated oil-based ink. This technology allowed for the mass production of books at a speed and low cost that were previously unimaginable, sparking an information revolution.",
        "The impact of the printing press on European society was immediate and profound. The sudden availability of cheap books led to a dramatic rise in literacy rates among the general public. For the first time, information and ideas could spread rapidly across borders, directly bypassing the strict control of traditional political and religious authorities like the Catholic Church. This free flow of information played a crucial role in fueling major historical movements. It allowed religious reformers like Martin Luther to distribute their ideas widely, accelerating the Protestant Reformation. It also facilitated the Scientific Revolution by enabling scientists to share findings, compare data, and build upon each other's work across great distances.",
        "Furthermore, the printing press helped standardize European languages, as commercial printers chose dominant regional dialects to maximize their book sales. Over time, the widespread availability of books fostered the development of a well-informed public, laying the permanent groundwork for the Enlightenment and modern democratic societies. Without Gutenberg's invention, the rapid spread of knowledge that defined the Renaissance and subsequent eras would not have been possible. The printing press did not just change how books were made; it democratized knowledge, reshaped the human mind, and laid the permanent cultural foundations of the modern world."
      ],
      questions: [
        {
          id: 16,
          text: "What is the primary focus of the passage?",
          options: [
            "The life of Johannes Gutenberg.",
            "The invention of the printing press and its historical and social impact.",
            "How medieval books were copied by hand.",
            "The history of the scientific revolution."
          ],
          correct: 1,
          explain: "Bài viết nói về sự ra đời của máy in Gutenberg và những thay đổi to lớn nó mang lại cho xã hội loài người."
        },
        {
          id: 17,
          text: "According to paragraph 1, why were books rare and expensive before the mid-fifteenth century?",
          options: [
            "The Catholic Church banned them.",
            "Printers did not want to sell them.",
            "They were copied by hand, which was very slow.",
            "They were made of gold."
          ],
          correct: 2,
          explain: "Đoạn 1: 'books were meticulously copied by hand, a process that was incredibly slow and expensive'."
        },
        {
          id: 18,
          text: "Gutenberg's movable metal type was combined with what other modifications?",
          options: [
            "Water turbines and papyrus paper.",
            "A modified wooden press and oil-based ink.",
            "Steam power and steel rollers.",
            "Digital typewriters."
          ],
          correct: 1,
          explain: "Đoạn 1: 'movable metal type, combined with a modified wooden press and newly formulated oil-based ink'."
        },
        {
          id: 19,
          text: "In paragraph 2, the word \"bypassing\" is closest in meaning to _______.",
          options: ["stopping", "strengthening", "avoiding", "accepting"],
          correct: 2,
          explain: "'Bypassing' = vượt qua, bỏ qua, tránh khỏi (avoiding/going around)."
        },
        {
          id: 20,
          text: "According to the passage, how did the printing press facilitate the Scientific Revolution?",
          options: [
            "By translating scientific papers into Latin.",
            "By automating chemical experiments.",
            "By training young scientists in universities.",
            "By enabling scientists to share and compare findings across great distances."
          ],
          correct: 3,
          explain: "Đoạn 2: 'enabling scientists to share findings, compare data, and build upon each other's work across great distances'."
        },
        {
          id: 21,
          text: "The word \"standardize\" in paragraph 3 is closest in meaning to _______.",
          options: ["translate", "make uniform", "make different", "destroy"],
          correct: 1,
          explain: "'Standardize' = tiêu chuẩn hóa, làm cho đồng nhất (make uniform/consistent)."
        },
        {
          id: 22,
          text: "What role did printing play in languages as described in paragraph 3?",
          options: [
            "It created entirely new languages.",
            "It helped standardize European languages based on dominant regional dialects.",
            "It made everyone speak Latin.",
            "It led to the disappearance of written language."
          ],
          correct: 1,
          explain: "Đoạn 3: 'helped standardize European languages, as commercial printers chose dominant regional dialects to maximize their book sales'."
        }
      ]
    },
    {
      id: "part4b",
      name: "Part 4: Reading Comprehension — Passage 2",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "Access to clean water and sanitation is recognized by the United Nations as a fundamental human right, yet it remains one of the most pressing global challenges of our time. Millions of people, predominantly in rural areas of developing nations, live without a reliable source of safe, clean drinking water. This crisis is driven by a combination of rapid population growth, climate change, water pollution, and inadequate infrastructure. As global temperatures rise, droughts are becoming more frequent and severe, drying up vital water sources and leaving communities vulnerable. Meanwhile, industrial waste, agricultural runoff, and untreated sewage contaminate rivers and lakes, rendering them highly toxic and completely unsafe for human consumption.",
        "The consequences of water scarcity are devastating, particularly for public health. Contaminated water is a primary breeding ground for deadly diseases such as cholera, dysentery, and typhoid. Children are the most vulnerable, with thousands of young children dying daily from preventable waterborne illnesses. Furthermore, the search for water places a heavy burden on women and children, who often walk several miles or hours each day to collect heavy containers of water from distant and unreliable sources. This chore prevents children from attending school and limits women's ability to participate in economic activities, trapping entire families in a cycle of poverty.",
        "Solving the global water crisis requires a multi-faceted approach. Governments and international organizations must invest heavily in upgrading water infrastructure, including building pipelines, drilling wells, and constructing water treatment facilities. Additionally, adopting sustainable water management practices is absolutely essential, such as rainwater harvesting, greywater recycling, and using efficient drip irrigation in agriculture. Educating communities on proper hygiene and sanitation practices can also significantly reduce the spread of waterborne diseases. Ensuring access to clean water is not just a technological challenge, but a moral imperative for the global community. By securing safe water for all, humanity can improve public health, promote gender equality, and foster sustainable, long-term economic development worldwide."
      ],
      questions: [
        {
          id: 23,
          text: "What is the main idea of the passage?",
          options: [
            "How to build water treatment plants.",
            "The United Nations definition of human rights.",
            "The global clean water crisis, its impacts, and potential solutions.",
            "The economic activities of women in developing countries."
          ],
          correct: 2,
          explain: "Bài viết thảo luận toàn diện về cuộc khủng hoảng nước sạch toàn cầu: nguyên nhân, hậu quả và các giải pháp cần thiết."
        },
        {
          id: 24,
          text: "According to paragraph 1, which of the following is a cause of the water crisis?",
          options: [
            "Rapid population growth, climate change, and inadequate infrastructure.",
            "Banning water consumption.",
            "High economic development.",
            "A surplus of water treatment facilities."
          ],
          correct: 0,
          explain: "Đoạn 1: 'driven by a combination of rapid population growth, climate change, water pollution, and inadequate infrastructure'."
        },
        {
          id: 25,
          text: "Why are children highlighted in paragraph 2?",
          options: [
            "They refuse to drink clean water.",
            "They are the ones who build wells.",
            "They teach hygiene at schools.",
            "They are the most vulnerable to deadly waterborne diseases."
          ],
          correct: 3,
          explain: "Đoạn 2: 'Children are the most vulnerable, with thousands of young children dying daily from preventable waterborne illnesses'."
        },
        {
          id: 26,
          text: "The word \"chore\" in paragraph 2 is closest in meaning to _______.",
          options: ["fun activity", "school exam", "long walk", "routine task"],
          correct: 3,
          explain: "'Chore' = công việc vặt hàng ngày, việc thường làm nhưng nhàm chán, mệt mỏi (routine task)."
        },
        {
          id: 27,
          text: "How does fetching water affect women and children's future according to the passage?",
          options: [
            "It helps them study environmental science.",
            "It improves their physical health.",
            "It prevents children from attending school and limits women's economic opportunities.",
            "It allows them to earn money."
          ],
          correct: 2,
          explain: "Đoạn 2: 'This chore prevents children from attending school and limits women's ability to participate in economic activities...'"
        },
        {
          id: 28,
          text: "Which sustainable water management practices are recommended in paragraph 3?",
          options: [
            "Drilling deeper into oil wells.",
            "Banning water use in factories.",
            "Rainwater harvesting, greywater recycling, and drip irrigation.",
            "Flooding agricultural fields."
          ],
          correct: 2,
          explain: "Đoạn 3: 'such as rainwater harvesting, greywater recycling, and using efficient drip irrigation in agriculture'."
        },
        {
          id: 29,
          text: "The word \"imperative\" in paragraph 3 is closest in meaning to _______.",
          options: [
            "unimportant choice",
            "scientific suggestion",
            "difficult math problem",
            "urgent duty"
          ],
          correct: 3,
          explain: "'Imperative' = nghĩa vụ khẩn cấp, yêu cầu bắt buộc (urgent duty/requirement)."
        },
        {
          id: 30,
          text: "What benefits can secure access to clean water bring to humanity?",
          options: [
            "Improved public health, gender equality, and sustainable economic development.",
            "Fossil fuel depletion.",
            "More water pollution in rivers.",
            "Increased population density in cities."
          ],
          correct: 0,
          explain: "Đoạn cuối: 'humanity can improve public health, promote gender equality, and foster sustainable, long-term economic development worldwide'."
        }
      ]
    }
  ]
};

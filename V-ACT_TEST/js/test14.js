const TEST_DATA = {
  title: "V-ACT English Test 14",
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
          text: "The manager insisted that the financial report _______ before Friday afternoon.",
          options: ["be submitted", "submitted", "is submitted", "was submitted"],
          correct: 0,
          explain: "Cấu trúc giả định bị động: S + insist + that + S + (should) be + V3/ed (be submitted)."
        },
        {
          id: 2,
          text: "It took her several weeks to _______ the shock of losing her job.",
          options: ["get over", "get off", "get through", "get by"],
          correct: 0,
          explain: "Phrasal verb: 'get over' = vượt qua (cú sốc, bệnh tật). Các cụm khác: 'get by' = xoay xở sống qua ngày, 'get off' = xuống xe, 'get through' = hoàn thành/kết nối."
        },
        {
          id: 3,
          text: "The _______ you study for the entrance exam, the _______ results you will achieve.",
          options: ["hard / good", "hardest / best", "more hard / more good", "harder / better"],
          correct: 3,
          explain: "Cấu trúc so sánh kép: 'The + comparative + S + V, the + comparative + S + V'."
        },
        {
          id: 4,
          text: "Only when you grow up _______ fully understand your parents' decisions.",
          options: ["you do", "will you", "do you", "you will"],
          correct: 1,
          explain: "Đảo ngữ với cấu trúc 'Only when + S + V, trợ động từ + S + V'. Ở đây dùng 'will you'."
        },
        {
          id: 5,
          text: "She decided to walk to the office _______ the extremely heavy rain.",
          options: ["although", "despite", "even though", "because of"],
          correct: 1,
          explain: "Giới từ chỉ nhượng bộ: 'despite' đi với cụm danh từ (the extremely heavy rain)."
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
          text: "Having <span class=\"underline-error\">lived</span> (A) in New York for ten years, he <span class=\"underline-error\">speaks</span> (B) English <span class=\"underline-error\">as</span> (C) a native <span class=\"underline-error\">speaker</span> (D).",
          options: ["A. lived", "B. speaks", "C. as", "D. speaker"],
          correct: 2,
          explain: "Lỗi dùng từ so sánh: Để so sánh cách thức hành động như ai đó (mang tính chất giống như), ta dùng giới từ 'like', không dùng 'as'. Sửa 'as' thành 'like'."
        },
        {
          id: 7,
          text: "The children <span class=\"underline-error\">were</span> (A) playing <span class=\"underline-error\">noise</span> (B) in the garden while <span class=\"underline-error\">their mother</span> (C) was <span class=\"underline-error\">cooking</span> (D).",
          options: ["A. were", "B. noise", "C. their mother", "D. cooking"],
          correct: 1,
          explain: "Từ loại: Bổ nghĩa cho động từ thường 'playing' phải dùng trạng từ. Sửa danh từ 'noise' thành trạng từ 'noisily'."
        },
        {
          id: 8,
          text: "Although he <span class=\"underline-error\">had worked</span> (A) extremely <span class=\"underline-error\">hard</span> (B), <span class=\"underline-error\">but</span> (C) he failed the final <span class=\"underline-error\">examination</span> (D).",
          options: ["A. had worked", "B. hard", "C. but", "D. examination"],
          correct: 2,
          explain: "Liên từ: Không sử dụng cả 'Although' và 'but' trong cùng một câu ghép. Sửa: bỏ 'but'."
        },
        {
          id: 9,
          text: "Each of the <span class=\"underline-error\">eligible</span> (A) candidates <span class=\"underline-error\">are</span> (B) required to write <span class=\"underline-error\">an essay</span> (C) on environmental <span class=\"underline-error\">protection</span> (D).",
          options: ["A. eligible", "B. are", "C. an essay", "D. protection"],
          correct: 1,
          explain: "Sự hòa hợp chủ vị: Chủ ngữ 'Each of + N số nhiều' đi với động từ chia số ít. Sửa 'are' thành 'is'."
        },
        {
          id: 10,
          text: "I am <span class=\"underline-error\">looking forward</span> (A) to <span class=\"underline-error\">meet</span> (B) my grandparents <span class=\"underline-error\">during</span> (C) the summer <span class=\"underline-error\">holiday</span> (D).",
          options: ["A. looking forward", "B. meet", "C. during", "D. holiday"],
          correct: 1,
          explain: "Cấu trúc động từ: 'look forward to + V-ing' (trông mong làm gì). Sửa 'meet' thành 'meeting'."
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
          text: "I didn't have enough money, so I couldn't buy that computer.",
          options: [
            "If I had enough money, I could buy that computer.",
            "If I had enough money, I could have bought that computer.",
            "If I had had enough money, I could have bought that computer.",
            "If I didn't have enough money, I couldn't have bought that computer."
          ],
          correct: 2,
          explain: "Giả định ngược quá khứ dùng câu điều kiện loại 3: 'If + S + had + V3/ed, S + could/would have + V3/ed'."
        },
        {
          id: 12,
          text: "It is possible that she didn't hear the announcement.",
          options: [
            "She may not have heard the announcement.",
            "She shouldn't have heard the announcement.",
            "She must not have heard the announcement.",
            "She needn't have heard the announcement."
          ],
          correct: 0,
          explain: "Dự đoán có khả năng ở quá khứ (không chắc chắn 100%): 'may/might not have + V3/ed'."
        },
        {
          id: 13,
          text: "They are repairing my car at the garage at the moment.",
          options: [
            "My car is repaired at the garage at the moment.",
            "My car is being repaired at the garage at the moment.",
            "My car has been repaired at the garage at the moment.",
            "My car is repairing at the garage at the moment."
          ],
          correct: 1,
          explain: "Chuyển sang bị động thì Hiện tại tiếp diễn: 'S + am/is/are + being + V3/ed'."
        },
        {
          id: 14,
          text: "I regret not buying that book when I had the chance.",
          options: [
            "I wish I had bought that book when I had the chance.",
            "I wish I bought that book when I had the chance.",
            "If only I didn't buy that book when I had the chance.",
            "I regret to buy that book when I had the chance."
          ],
          correct: 0,
          explain: "Hối tiếc về một việc đã không làm trong quá khứ tương đương với lời ước quá khứ: 'S + regret + not V-ing' = 'S + wish + S + had + V3/ed'."
        },
        {
          id: 15,
          text: "We started learning English six years ago.",
          options: [
            "We have started learning English for six years.",
            "We learned English for six years.",
            "We didn't learn English six years ago.",
            "We have learned English for six years."
          ],
          correct: 3,
          explain: "Chuyển đổi thì: 'S + started + V-ing + khoảng thời gian + ago' = 'S + has/have + V3/ed + for + khoảng thời gian' (bỏ start)."
        }
      ]
    },
    {
      id: "part4a",
      name: "Part 4: Reading Comprehension — Passage 1",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "The global fashion industry has undergone a dramatic transformation over the last few decades, dominated by the rise of 'fast fashion.' This business model relies on producing high volumes of clothing at extremely low costs, rapidly mimicking the latest runway trends to satisfy consumer demand. Retailers can design, manufacture, and distribute a new garment to stores in a matter of weeks, encouraging customers to buy more clothes more frequently. However, this cheap, throwaway clothing comes at an enormous environmental and human cost.",
        "The environmental footprint of fast fashion is staggering. It is estimated that the textile industry is responsible for roughly ten percent of global carbon emissions and is a major polluter of freshwater systems. Large amounts of water and toxic chemicals are used in the dyeing process, which often flow untreated into local rivers. Furthermore, the synthetic fibers commonly used, such as polyester, are plastics that do not biodegrade. Instead, they shed microfibers into the oceans and accumulate in landfills, where they can take hundreds of years to decompose.",
        "In addition to environmental degradation, the industry is plagued by labor abuses. To keep prices low, fast fashion brands often outsource production to factories in developing nations, where workers endure long hours, unsafe working conditions, and extremely low wages. Addressing these issues requires consumers to shift toward sustainable fashion—buying fewer, higher-quality garments, supporting ethical brands, and recycling old clothes."
      ],
      questions: [
        {
          id: 16,
          text: "What is the primary focus of the passage?",
          options: [
            "The fast fashion model and its environmental and social costs.",
            "How to start a clothing line on a budget.",
            "The history of traditional textile manufacturing.",
            "The fashion preferences of modern teenagers."
          ],
          correct: 0,
          explain: "Bài đọc tập trung phân tích mô hình thời trang nhanh và các tác động tiêu cực của nó tới môi trường và quyền lợi người lao động."
        },
        {
          id: 17,
          text: "According to paragraph 1, how do fast fashion brands keep up with consumer demand?",
          options: [
            "By using only organic and sustainable fabrics.",
            "By producing small batches of expensive designer clothing.",
            "By selling vintage clothes from the past.",
            "By rapidly copying runway designs and manufacturing them cheaply."
          ],
          correct: 3,
          explain: "Đoạn 1: 'rapidly mimicking the latest runway trends... producing high volumes of clothing at extremely low costs'."
        },
        {
          id: 18,
          text: "The word \"garment\" in paragraph 1 is closest in meaning to _______.",
          options: ["shopping mall", "shipping container", "piece of clothing", "fashion show"],
          correct: 2,
          explain: "'Garment' = quần áo, đồ may mặc (piece of clothing)."
        },
        {
          id: 19,
          text: "According to paragraph 2, what is a major environmental problem caused by fast fashion dyeing processes?",
          options: [
            "Soil erosion from building factories.",
            "Air pollution from toxic smoke.",
            "Untreated toxic chemical wastewater flowing into rivers.",
            "High noise levels in manufacturing plants."
          ],
          correct: 2,
          explain: "Đoạn 2: 'toxic chemicals are used in the dyeing process, which often flow untreated into local rivers'."
        },
        {
          id: 20,
          text: "Why are synthetic fibers like polyester problematic according to the passage?",
          options: [
            "They do not biodegrade and decompose very slowly in landfills.",
            "They dissolve in water too quickly.",
            "They are too expensive to produce.",
            "They cannot be dyed in different colors."
          ],
          correct: 0,
          explain: "Đoạn 2: 'synthetic fibers... do not biodegrade. Instead, they... accumulate in landfills, where they can take hundreds of years to decompose'."
        },
        {
          id: 21,
          text: "The word \"endure\" in paragraph 3 is closest in meaning to _______.",
          options: ["change", "enjoy", "avoid", "suffer"],
          correct: 3,
          explain: "'Endure' = gánh chịu, chịu đựng gian khổ (suffer)."
        },
        {
          id: 22,
          text: "What action does the author recommend for consumers to address fast fashion issues?",
          options: [
            "Buying more clothes to support the economy.",
            "Creating their own clothing brands.",
            "Switching to sustainable fashion habits like buying fewer, ethical items.",
            "Learning how to sew clothes at home."
          ],
          correct: 2,
          explain: "Đoạn cuối khuyên người tiêu dùng chuyển sang thời trang bền vững: 'buying fewer, higher-quality garments, supporting ethical brands, and recycling old clothes'."
        }
      ]
    },
    {
      id: "part4b",
      name: "Part 4: Reading Comprehension — Passage 2",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "Language is not merely a tool for communication; it is a repository of a community's history, culture, and unique way of understanding the world. Today, however, global linguistic diversity is facing an unprecedented crisis. Linguists estimate that of the roughly 7,000 languages spoken worldwide, nearly half are endangered and could disappear by the end of this century. When a language dies, a unique window into human history, traditional ecological knowledge, and cultural heritage is lost forever.",
        "The decline of indigenous languages is driven by several factors. Historical policies of forced assimilation in many countries prohibited indigenous children from speaking their mother tongues at school. Today, globalization and the dominance of major international languages—such as English, Spanish, and Mandarin—exert pressure on young generations to abandon their native languages in favor of languages that offer better economic opportunities.",
        "Fortunately, efforts are underway globally to revitalize endangered languages. Indigenous communities are establishing language immersion programs, often called 'language nests,' where children are taught entirely in their native tongue by community elders. Activists are also using mobile apps and online dictionaries to document languages and connect speakers. Preserving these languages is not just about linguistics; it is about defending human rights and cultural diversity."
      ],
      questions: [
        {
          id: 23,
          text: "What is the main idea of the passage?",
          options: [
            "How computers translate foreign languages.",
            "The threat to linguistic diversity and the efforts to preserve endangered languages.",
            "The grammar rules of indigenous languages.",
            "The dominance of English in global business."
          ],
          correct: 1,
          explain: "Bài viết nói về mối đe dọa đối với sự đa dạng ngôn ngữ thế giới và các nỗ lực nhằm khôi phục, bảo tồn ngôn ngữ bản địa."
        },
        {
          id: 24,
          text: "What does the author mean by calling language a \"repository\" in paragraph 1?",
          options: [
            "A storage place for culture, history, and knowledge.",
            "A translation website.",
            "A dangerous place to store things.",
            "A book containing grammar rules."
          ],
          correct: 0,
          explain: "Đoạn 1: 'repository of a community's history, culture, and unique way of understanding the world' (kho lưu trữ)."
        },
        {
          id: 25,
          text: "According to paragraph 1, how many of the world's languages are endangered?",
          options: [
            "All of them.",
            "Very few of them.",
            "Nearly half of them.",
            "Exactly 100 languages."
          ],
          correct: 2,
          explain: "Đoạn 1: 'of the roughly 7,000 languages spoken worldwide, nearly half are endangered'."
        },
        {
          id: 26,
          text: "According to paragraph 2, what is one major reason why young people abandon their native languages?",
          options: [
            "The grammar is too difficult to learn.",
            "Computers cannot type their native alphabets.",
            "They are not interested in talking to their families.",
            "Major languages offer better economic opportunities."
          ],
          correct: 3,
          explain: "Đoạn 2: 'abandon their native languages in favor of languages that offer better economic opportunities'."
        },
        {
          id: 27,
          text: "The word \"transmission\" in paragraph 2 refers to _______.",
          options: [
            "sending emails",
            "broadcasting TV shows",
            "passing language and culture from one generation to the next",
            "driving a car"
          ],
          correct: 2,
          explain: "'Transmission' ở đây chỉ sự truyền đạt, truyền dạy ngôn ngữ từ thế hệ này sang thế hệ sau."
        },
        {
          id: 28,
          text: "What are \"language nests\" as described in paragraph 3?",
          options: [
            "Nests built by birds in trees.",
            "Libraries that store ancient books.",
            "Social media groups for language learners.",
            "Immersion programs where children learn native languages from elders."
          ],
          correct: 3,
          explain: "Đoạn 3: 'immersion programs, often called 'language nests,' where children are taught entirely in their native tongue by community elders'."
        },
        {
          id: 29,
          text: "How is modern technology helping language activists?",
          options: [
            "By replacing human teachers with robots.",
            "By providing tools like apps and online dictionaries to document and share resources.",
            "By automatically translating all languages into English.",
            "By making children study online only."
          ],
          correct: 1,
          explain: "Đoạn 3: 'Activists are also using mobile apps and online dictionaries to document languages and connect speakers'."
        },
        {
          id: 30,
          text: "The word \"revitalize\" in paragraph 3 is closest in meaning to _______.",
          options: ["study", "forget", "destroy", "strengthen"],
          correct: 3,
          explain: "'Revitalize' = đem lại sức sống mới, tăng cường, hồi sinh (strengthen)."
        }
      ]
    }
  ]
};

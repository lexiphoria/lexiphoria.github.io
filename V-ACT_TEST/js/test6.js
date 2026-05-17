const TEST_DATA = {
  title: "V-ACT English Test 6",
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
          text: "The harder you practice, _______ you will perform in the tournament.",
          options: ["the better", "better than", "the most", "good as"],
          correct: 0,
          explain: "So sánh kép (Double comparison): The + so sánh hơn + S + V, the + so sánh hơn + S + V (Càng... càng...)."
        },
        {
          id: 2,
          text: "My grandfather is _______ a lot of trouble with his hearing these days.",
          options: ["making", "doing", "having", "getting"],
          correct: 2,
          explain: "Collocation: 'have trouble with' = gặp khó khăn/vấn đề với cái gì."
        },
        {
          id: 3,
          text: "Tom denied _______ the confidential document on the manager's desk.",
          options: ["read", "to read", "reading", "to reading"],
          correct: 2,
          explain: "Cấu trúc 'deny + V-ing': phủ nhận đã làm gì."
        },
        {
          id: 4,
          text: "A new shopping mall _______ in our neighborhood next month.",
          options: ["will build", "will be built", "builds", "is building"],
          correct: 1,
          explain: "Câu bị động tương lai đơn: S (vật) + will be + V3/ed. Một trung tâm mua sắm mới sẽ được xây dựng."
        },
        {
          id: 5,
          text: "She was completely _______ by the plot twist at the end of the movie.",
          options: ["take aback", "taken aback", "taking aback", "took aback"],
          correct: 1,
          explain: "Thành ngữ / Phrasal verb: 'be taken aback' = bị bất ngờ, sửng sốt."
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
          text: 'The <span class="underline-error">children</span> (A) were <span class="underline-error">so</span> (B) exciting about the trip <span class="underline-error">that</span> (C) they couldn\'t <span class="underline-error">sleep</span> (D).',
          options: ["A. children", "B. so", "C. that", "D. exciting"],
          correct: 3,
          explain: "Tính từ đuôi -ed dùng để diễn tả cảm xúc của người. Đổi 'exciting' thành 'excited'."
        },
        {
          id: 7,
          text: 'Not until <span class="underline-error">he</span> (A) <span class="underline-error">got</span> (B) home <span class="underline-error">he realized</span> (C) that he had left his wallet <span class="underline-error">at the office</span> (D).',
          options: ["A. he", "B. got", "C. he realized", "D. at the office"],
          correct: 2,
          explain: "Đảo ngữ với Not until: Not until + clause + trợ động từ + S + V. Đổi 'he realized' thành 'did he realize'."
        },
        {
          id: 8,
          text: 'If she <span class="underline-error">had followed</span> (A) my advice, she <span class="underline-error">wouldn\'t have been</span> (B) in <span class="underline-error">such</span> (C) a difficult situation <span class="underline-error">now</span> (D).',
          options: ["A. had followed", "B. wouldn't have been", "C. such", "D. now"],
          correct: 1,
          explain: "Câu điều kiện hỗn hợp (loại 3 kết quả loại 2): Giả định quá khứ (had followed) dẫn đến kết quả hiện tại (now). Đổi 'wouldn't have been' thành 'wouldn't be'."
        },
        {
          id: 9,
          text: 'It is <span class="underline-error">essential</span> (A) that every student <span class="underline-error">submits</span> (B) the assignment <span class="underline-error">by</span> (C) the <span class="underline-error">deadline</span> (D).',
          options: ["A. essential", "B. submits", "C. by", "D. deadline"],
          correct: 1,
          explain: "Thể giả định (Subjunctive): It is essential that S + V-nguyên thể. Đổi 'submits' thành 'submit'."
        },
        {
          id: 10,
          text: 'The book <span class="underline-error">which</span> (A) I <span class="underline-error">lent</span> (B) it to you <span class="underline-error">last week</span> (C) is <span class="underline-error">very</span> (D) expensive.',
          options: ["A. which", "B. lent it", "C. last week", "D. very"],
          correct: 1,
          explain: "Đại từ quan hệ 'which' đã thay thế cho tân ngữ (the book). Vì vậy không được lặp lại tân ngữ 'it'. Bỏ 'it'."
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
          text: "The last time I saw her was three years ago.",
          options: [
            "I have often seen her for the last three years.",
            "I haven't seen her for three years.",
            "I saw her three years ago and will never see her again.",
            "About three years ago, I used to see her."
          ],
          correct: 1,
          explain: "Chuyển đổi thì (Rất phổ biến trong đề THPT): 'The last time S + V2/ed + was + khoảng thời gian + ago' = 'S + haven't/hasn't + V3/ed + for + khoảng thời gian'."
        },
        {
          id: 12,
          text: "\"Don't forget to lock the door before you leave,\" my mother said to me.",
          options: [
            "My mother requested me not to lock the door before I left.",
            "My mother warned me not to lock the door before I left.",
            "My mother reminded me to lock the door before I left.",
            "My mother invited me to lock the door before I left."
          ],
          correct: 2,
          explain: "Tường thuật câu nhắc nhở: 'Don't forget to V' -> 'remind someone to V' (nhắc ai đó nhớ làm gì)."
        },
        {
          id: 13,
          text: "I am sure he didn't attend the meeting yesterday because he was sick.",
          options: [
            "He must not have attended the meeting yesterday because he was sick.",
            "He shouldn't have attended the meeting yesterday because he was sick.",
            "He needn't have attended the meeting yesterday because he was sick.",
            "He can't have attended the meeting yesterday because he was sick."
          ],
          correct: 3,
          explain: "Động từ khuyết thiếu dự đoán quá khứ: Chắc chắn ai đó KHÔNG làm gì trong quá khứ ('I am sure he didn't...') -> 'can't have V3/ed'. (Chú ý 'mustn't have V3' không dùng trong trường hợp này, 'must have V3' dùng cho khẳng định)."
        },
        {
          id: 14,
          text: "It is possible that she forgot to bring her passport.",
          options: [
            "She must have forgotten to bring her passport.",
            "She may have forgotten to bring her passport.",
            "She should have forgotten to bring her passport.",
            "She need to have forgotten to bring her passport."
          ],
          correct: 1,
          explain: "Dự đoán khả năng không chắc chắn trong quá khứ ('It is possible that...') -> 'may/might have V3/ed' (có lẽ đã làm gì)."
        },
        {
          id: 15,
          text: "People say that the old house is haunted by ghosts.",
          options: [
            "The old house is said to be haunted by ghosts.",
            "It was said that the old house is haunted by ghosts.",
            "The old house is said to have been haunted by ghosts.",
            "Ghosts are said to haunt the old house."
          ],
          correct: 0,
          explain: "Câu bị động kép (cùng thì hiện tại): 'People say that S2 + V2' -> 'S2 + is/are said + to V2'."
        }
      ]
    },
    {
      id: "part4a",
      name: "Part 4: Reading Comprehension — Passage 1",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "Ecotourism is defined as responsible travel to natural areas that conserves the environment, sustains the well-being of the local people, and involves interpretation and education. In recent decades, it has become one of the fastest-growing sectors of the global tourism industry. As travelers become more aware of the environmental footprint they leave behind, many are seeking out vacations that minimize their negative impact and instead contribute positively to the places they visit.",
        "One of the core principles of ecotourism is minimizing physical, social, behavioral, and psychological impacts. Unlike traditional mass tourism, which often results in the overdevelopment of coastlines, the destruction of habitats, and the depletion of local resources, ecotourism focuses on small-scale, sustainable infrastructure. Accommodations are frequently built using locally sourced, renewable materials and are designed to blend in with the natural surroundings. Furthermore, ecotourism operations often utilize renewable energy sources, such as solar or wind power, and implement strict waste management and water conservation protocols.",
        "Equally important is the socioeconomic aspect of ecotourism. It aims to generate financial benefits for both conservation efforts and local communities. By employing local residents as guides, managers, and service providers, ecotourism empowers communities economically, reducing their reliance on environmentally destructive practices like logging or poaching. When local people see the tangible economic value of preserving their natural environment, they become its most ardent protectors.",
        "However, ecotourism is not without its critics. Some argue that the term is frequently misused as a marketing gimmick—a practice known as 'greenwashing.' In these cases, companies label their tours as 'eco-friendly' to attract environmentally conscious tourists without actually adhering to sustainable practices. Additionally, even well-intentioned ecotourism can inadvertently introduce diseases to isolated wildlife populations or disrupt animal breeding and feeding patterns due to increased human presence. Therefore, strict regulation and certification systems are essential to ensure that ecotourism fulfills its promise."
      ],
      questions: [
        {
          id: 16,
          text: "What is the main purpose of the passage?",
          options: [
            "To discourage people from traveling to natural areas.",
            "To explain the concept, benefits, and challenges of ecotourism.",
            "To advertise a specific eco-friendly resort.",
            "To compare ecotourism with traditional hotel management."
          ],
          correct: 1,
          explain: "Bài đọc định nghĩa ecotourism (đoạn 1), giải thích nguyên tắc môi trường (đoạn 2), lợi ích kinh tế xã hội (đoạn 3), và các thách thức/chỉ trích (đoạn 4)."
        },
        {
          id: 17,
          text: "According to paragraph 1, why is ecotourism growing rapidly?",
          options: [
            "Because it is much cheaper than mass tourism.",
            "Because governments force tourists to choose eco-friendly options.",
            "Because travelers are more conscious of their environmental impact.",
            "Because traditional tourist spots have all been destroyed."
          ],
          correct: 2,
          explain: "Đoạn 1: 'As travelers become more aware of the environmental footprint they leave behind, many are seeking out vacations that minimize their negative impact'."
        },
        {
          id: 18,
          text: 'The word "depletion" in paragraph 2 is closest in meaning to _______.',
          options: ["protection", "exhaustion or reduction", "development", "accumulation"],
          correct: 1,
          explain: "'Depletion' = sự suy giảm, cạn kiệt (exhaustion or reduction). Ở đây chỉ sự cạn kiệt tài nguyên địa phương do du lịch đại trà."
        },
        {
          id: 19,
          text: "How does ecotourism benefit local communities financially, according to paragraph 3?",
          options: [
            "By paying them to move out of natural areas.",
            "By encouraging them to sell timber from local forests.",
            "By forcing tourists to give them donations directly.",
            "By employing them in various roles within the tourism operation."
          ],
          correct: 3,
          explain: "Đoạn 3: 'By employing local residents as guides, managers, and service providers, ecotourism empowers communities economically'."
        },
        {
          id: 20,
          text: 'The word "ardent" in paragraph 3 is closest in meaning to _______.',
          options: ["passionate and enthusiastic", "lazy and indifferent", "angry and violent", "wealthy and powerful"],
          correct: 0,
          explain: "'Ardent' = nhiệt thành, hăng hái (passionate). Người dân trở thành những người bảo vệ nhiệt thành nhất."
        },
        {
          id: 21,
          text: "What does 'greenwashing' refer to in the context of the passage?",
          options: [
            "Washing bed linens in hotels using environmentally friendly soap.",
            "Falsely marketing a tour as eco-friendly to attract tourists.",
            "Painting hotel buildings green to blend with nature.",
            "Donating money to environmental charities."
          ],
          correct: 1,
          explain: "Đoạn 4: 'the term is frequently misused as a marketing gimmick... companies label their tours as 'eco-friendly' to attract... tourists without actually adhering to sustainable practices'."
        },
        {
          id: 22,
          text: "Which of the following is mentioned as a potential negative impact of well-intentioned ecotourism?",
          options: [
            "It can cause animals to become too aggressive towards humans.",
            "It can lead to the overdevelopment of coastlines.",
            "It can inadvertently introduce diseases to wildlife.",
            "It can make local people poorer than before."
          ],
          correct: 2,
          explain: "Đoạn 4: 'even well-intentioned ecotourism can inadvertently introduce diseases to isolated wildlife populations'."
        }
      ]
    },
    {
      id: "part4b",
      name: "Part 4: Reading Comprehension — Passage 2",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "Language is arguably the most defining characteristic of the human species, separating us from other animals by enabling complex communication, abstract thought, and the transmission of culture across generations. However, languages are not static entities; they are living, breathing systems that constantly evolve. Just as biological organisms adapt to their environments, languages shift and change in response to the social, cultural, and technological landscapes of their speakers.",
        "One of the primary drivers of language evolution is contact between different linguistic groups. Throughout history, trade, migration, and conquest have brought diverse cultures together. When speakers of different languages interact, they inevitably borrow words, phrases, and even grammatical structures from one another. English, for example, has an incredibly vast vocabulary largely because it absorbed a massive number of French and Latin words after the Norman Conquest of 1066. Today, the process continues as globalization and the internet facilitate unprecedented levels of cross-cultural communication.",
        "Technological advancement is another major catalyst for linguistic change. The invention of the printing press in the 15th century helped standardize spelling and grammar. In modern times, the rise of digital technology has spawned entirely new vocabularies. Words like \"blog,\" \"selfie,\" and \"hashtag\" did not exist a few decades ago, yet they are now universally understood. Furthermore, digital communication platforms limit character counts and encourage speed, leading to the proliferation of acronyms (like \"LOL\" or \"BRB\") and the use of emojis as a supplementary form of visual language.",
        "While evolution is a natural process, it also brings the threat of language extinction. As dominant global languages like English, Mandarin, and Spanish expand, many minority languages are being marginalized. Linguists estimate that out of the roughly 7,000 languages spoken today, nearly half are at risk of disappearing by the end of the century. When a language dies, a unique worldview, cultural history, and body of traditional knowledge vanish with it, highlighting the urgent need for language preservation efforts."
      ],
      questions: [
        {
          id: 23,
          text: "What does the author compare language to in the first paragraph?",
          options: [
            "A static mathematical equation.",
            "A biological organism that adapts to its environment.",
            "A complex computer software system.",
            "A historical artifact preserved in a museum."
          ],
          correct: 1,
          explain: "Đoạn 1: 'Just as biological organisms adapt to their environments, languages shift and change...'"
        },
        {
          id: 24,
          text: "According to paragraph 2, why does English have such a vast vocabulary?",
          options: [
            "Because English speakers invented more words than anyone else.",
            "Because it was the first language ever spoken.",
            "Because it absorbed many French and Latin words due to historical events.",
            "Because the internet was invented in an English-speaking country."
          ],
          correct: 2,
          explain: "Đoạn 2: 'English... absorbed a massive number of French and Latin words after the Norman Conquest of 1066'."
        },
        {
          id: 25,
          text: 'The word "catalyst" in paragraph 3 is closest in meaning to _______.',
          options: ["obstacle", "agent of change", "consequence", "punishment"],
          correct: 1,
          explain: "'Catalyst' = chất xúc tác, tác nhân thúc đẩy sự thay đổi (agent of change)."
        },
        {
          id: 26,
          text: "How has digital communication affected language according to paragraph 3?",
          options: [
            "It has completely destroyed traditional grammar rules.",
            "It has made people stop talking face-to-face.",
            "It has led to the creation of new vocabularies, acronyms, and visual language.",
            "It has made it harder to standardize spelling."
          ],
          correct: 2,
          explain: "Đoạn 3 đề cập đến việc số hóa tạo ra từ vựng mới (selfie, blog), từ viết tắt (LOL) và ngôn ngữ hình ảnh (emojis)."
        },
        {
          id: 27,
          text: 'The word "proliferation" in paragraph 3 is closest in meaning to _______.',
          options: ["reduction", "rapid increase", "criticism", "understanding"],
          correct: 1,
          explain: "'Proliferation' = sự sinh sôi nảy nở, sự tăng nhanh chóng (rapid increase)."
        },
        {
          id: 28,
          text: "According to the final paragraph, what happens when a language dies?",
          options: [
            "A new dominant language immediately replaces it.",
            "People simply translate their history into English.",
            "A unique worldview, culture, and traditional knowledge are lost.",
            "Linguists are able to bring it back to life easily."
          ],
          correct: 2,
          explain: "Đoạn 4: 'When a language dies, a unique worldview, cultural history, and body of traditional knowledge vanish with it'."
        },
        {
          id: 29,
          text: "Which of the following is NOT mentioned as a driver of language evolution?",
          options: [
            "Technological advancements",
            "Contact between different linguistic groups",
            "Trade and migration",
            "Strict government laws forcing people to invent words"
          ],
          correct: 3,
          explain: "Các phương án A, B, C đều được nhắc đến ở đoạn 2 và 3. Phương án D (luật pháp chính phủ) không có trong bài."
        },
        {
          id: 30,
          text: "What is the author's overall purpose in the passage?",
          options: [
            "To argue that English should be the only global language.",
            "To explain how and why languages evolve, and warn about language extinction.",
            "To teach the reader how to use new digital slang.",
            "To prove that languages do not change over time."
          ],
          correct: 1,
          explain: "Mục đích chung: Giải thích cách thức/nguyên nhân ngôn ngữ tiến hóa (tiếp xúc, công nghệ) và cảnh báo về nguy cơ tuyệt chủng ngôn ngữ."
        }
      ]
    }
  ]
};

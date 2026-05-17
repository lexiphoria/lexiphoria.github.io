const TEST_DATA = {
  title: "V-ACT English Test 8",
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
          text: "The student _______ assignment got the highest grade was praised by the teacher.",
          options: ["who", "whom", "which", "whose"],
          correct: 3,
          explain: "Đại từ quan hệ chỉ sở hữu: 'whose + Noun' (bài tập của học sinh đó)."
        },
        {
          id: 2,
          text: "By the time the police arrived, the burglar _______.",
          options: ["escaped", "has escaped", "had escaped", "was escaping"],
          correct: 2,
          explain: "Hành động xảy ra trước một thời điểm/hành động khác trong quá khứ (arrived) -> dùng Quá khứ hoàn thành (had V3/ed)."
        },
        {
          id: 3,
          text: "It is extremely important that the documents _______ signed immediately.",
          options: ["are", "be", "were", "to be"],
          correct: 1,
          explain: "Thể giả định (Subjunctive): It is important that S + (should) + V-nguyên thể. Cấu trúc bị động nên V-nguyên thể của tobe là 'be'."
        },
        {
          id: 4,
          text: "The company's new policy will _______ a significant impact on employee morale.",
          options: ["make", "do", "have", "create"],
          correct: 2,
          explain: "Collocation: 'have an impact on' = có tác động đến."
        },
        {
          id: 5,
          text: "He was offered the job despite his _______ of experience in the field.",
          options: ["lack", "absence", "shortage", "loss"],
          correct: 0,
          explain: "Cụm từ cố định: 'lack of experience' = thiếu kinh nghiệm."
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
          text: 'Neither the manager <span class="underline-error">nor</span> (A) his assistants <span class="underline-error">is</span> (B) going <span class="underline-error">to attend</span> (C) the conference <span class="underline-error">tomorrow</span> (D).',
          options: ["A. nor", "B. is", "C. to attend", "D. tomorrow"],
          correct: 1,
          explain: "Sự hòa hợp chủ vị: 'Neither S1 nor S2 + V'. Động từ chia theo S2 ('his assistants' - số nhiều) -> 'are'."
        },
        {
          id: 7,
          text: 'The film was <span class="underline-error">so</span> (A) <span class="underline-error">bored</span> (B) that many people <span class="underline-error">left</span> (C) the cinema <span class="underline-error">early</span> (D).',
          options: ["A. so", "B. bored", "C. left", "D. early"],
          correct: 1,
          explain: "Tính từ miêu tả tính chất của vật (The film) phải dùng đuôi -ing. Đổi 'bored' thành 'boring'."
        },
        {
          id: 8,
          text: 'It is <span class="underline-error">believed</span> (A) that <span class="underline-error">global warming</span> (B) is <span class="underline-error">caused</span> (C) by <span class="underline-error">human active</span> (D).',
          options: ["A. believed", "B. global warming", "C. caused", "D. human active"],
          correct: 3,
          explain: "Cấu tạo từ (Word form): Đứng sau tính từ 'human' cần danh từ. Đổi 'active' thành 'activities'."
        },
        {
          id: 9,
          text: 'She asked me <span class="underline-error">whether</span> (A) <span class="underline-error">did I know</span> (B) the way <span class="underline-error">to</span> (C) the nearest <span class="underline-error">post office</span> (D).',
          options: ["A. whether", "B. did I know", "C. to", "D. post office"],
          correct: 1,
          explain: "Câu tường thuật không dùng cấu trúc đảo ngữ (không mượn trợ động từ). Đổi 'did I know' thành 'I knew'."
        },
        {
          id: 10,
          text: 'I <span class="underline-error">am used</span> (A) to <span class="underline-error">get up</span> (B) early <span class="underline-error">in</span> (C) the morning to <span class="underline-error">do exercise</span> (D).',
          options: ["A. am used", "B. get up", "C. in", "D. do exercise"],
          correct: 1,
          explain: "Cấu trúc 'be used to + V-ing' (quen với việc gì). Đổi 'get up' thành 'getting up'."
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
          text: "Perhaps she missed the train this morning.",
          options: [
            "She must have missed the train this morning.",
            "She may have missed the train this morning.",
            "She shouldn't have missed the train this morning.",
            "She can't have missed the train this morning."
          ],
          correct: 1,
          explain: "Dự đoán 'Perhaps' (có lẽ) trong quá khứ -> Dùng 'may/might have V3/ed'."
        },
        {
          id: 12,
          text: "\"I will not help you with your homework,\" he said to his sister.",
          options: [
            "He promised not to help his sister with her homework.",
            "He denied helping his sister with her homework.",
            "He refused to help his sister with her homework.",
            "He threatened not to help his sister with her homework."
          ],
          correct: 2,
          explain: "Tường thuật sự từ chối: 'I will not...' -> S + refused + to V (từ chối làm gì)."
        },
        {
          id: 13,
          text: "I haven't been to the cinema for two months.",
          options: [
            "The last time I went to the cinema was two months ago.",
            "I didn't go to the cinema two months ago.",
            "I went to the cinema two months ago.",
            "It is two months when I went to the cinema."
          ],
          correct: 0,
          explain: "Cấu trúc: 'S + haven't/hasn't V3/ed + for + khoảng thời gian' = 'The last time + S + V2/ed + was + khoảng thời gian + ago'."
        },
        {
          id: 14,
          text: "They are repairing the roof of my house.",
          options: [
            "The roof of my house is being repaired.",
            "The roof of my house is repairing.",
            "The roof of my house are being repaired.",
            "My house is being repaired the roof."
          ],
          correct: 0,
          explain: "Bị động thì hiện tại tiếp diễn: S(O) + am/is/are + being + V3/ed."
        },
        {
          id: 15,
          text: "Because he didn't study hard, he failed the exam.",
          options: [
            "If he studied hard, he wouldn't fail the exam.",
            "If he had studied hard, he wouldn't fail the exam.",
            "Unless he had studied hard, he wouldn't have failed the exam.",
            "If he had studied hard, he wouldn't have failed the exam."
          ],
          correct: 3,
          explain: "Sự thật ở quá khứ -> Dùng câu điều kiện loại 3. (Nếu anh ta ĐÃ học chăm, anh ta ĐÃ KHÔNG trượt)."
        }
      ]
    },
    {
      id: "part4a",
      name: "Part 4: Reading Comprehension — Passage 1",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "Urbanization, the process by which large numbers of people become permanently concentrated in relatively small areas, forming cities, is one of the most significant demographic trends of the 21st century. Today, more than half of the global population lives in urban areas, and this figure is projected to rise to nearly 70% by 2050. People are drawn to cities by the promise of better employment opportunities, improved access to healthcare and education, and a higher standard of living.",
        "However, the rapid influx of people into urban centers places immense strain on infrastructure and the environment. Many cities in developing nations suffer from a severe shortage of affordable housing, leading to the proliferation of informal settlements or slums. These areas often lack basic services such as clean water, sanitation, and electricity, posing serious health risks to residents. Furthermore, the concentration of vehicles and industrial activities in cities results in severe air pollution, which contributes to respiratory diseases and climate change.",
        "Another consequence of unchecked urbanization is the loss of biodiversity and the destruction of natural habitats. As cities expand outward—a phenomenon known as urban sprawl—they consume surrounding agricultural land and forests. This not only threatens local wildlife but also reduces the amount of land available for food production, creating potential challenges for food security in the future.",
        "To combat these negative effects, urban planners are increasingly advocating for 'sustainable cities' or 'smart cities.' This approach involves investing in efficient public transportation networks to reduce reliance on private cars, expanding green spaces like parks to improve air quality and residents' well-being, and utilizing technology to optimize energy consumption and waste management. Sustainable urbanization aims to balance economic growth with environmental protection and social equity, ensuring that cities remain livable for future generations."
      ],
      questions: [
        {
          id: 16,
          text: "What is the primary topic of the passage?",
          options: [
            "The history of ancient cities.",
            "The causes, negative consequences, and sustainable solutions of urbanization.",
            "Why rural areas are better places to live than cities.",
            "How to build smart public transportation systems."
          ],
          correct: 1,
          explain: "Bài đọc nêu nguyên nhân đô thị hóa (đoạn 1), hậu quả (đoạn 2, 3), và giải pháp đô thị bền vững (đoạn 4)."
        },
        {
          id: 17,
          text: "According to paragraph 1, why do people migrate to cities?",
          options: [
            "To escape the noise of the countryside.",
            "To find cheaper housing options.",
            "For better jobs, healthcare, and education.",
            "Because governments force them to move."
          ],
          correct: 2,
          explain: "Đoạn 1: 'promise of better employment opportunities, improved access to healthcare and education...'"
        },
        {
          id: 18,
          text: 'The word "proliferation" in paragraph 2 is closest in meaning to _______.',
          options: ["rapid increase", "destruction", "improvement", "hidden danger"],
          correct: 0,
          explain: "'Proliferation' = sự sinh sôi, tăng nhanh (rapid increase). Ở đây chỉ sự mọc lên nhanh chóng của các khu ổ chuột."
        },
        {
          id: 19,
          text: "What health risk is mentioned in paragraph 2 as a result of poor urban infrastructure?",
          options: [
            "Lack of clean water and sanitation in slums.",
            "Overeating due to too many restaurants.",
            "Mental stress from high-paying jobs.",
            "Injuries from collapsing modern buildings."
          ],
          correct: 0,
          explain: "Đoạn 2: 'These areas often lack basic services such as clean water, sanitation... posing serious health risks'."
        },
        {
          id: 20,
          text: "What does 'urban sprawl' refer to in paragraph 3?",
          options: [
            "The building of very tall skyscrapers.",
            "The outward expansion of cities into surrounding natural land.",
            "The movement of people from cities back to the countryside.",
            "The increase of wild animals living in city parks."
          ],
          correct: 1,
          explain: "Đoạn 3: 'As cities expand outward—a phenomenon known as urban sprawl—they consume surrounding agricultural land and forests'."
        },
        {
          id: 21,
          text: 'The word "combat" in paragraph 4 is closest in meaning to _______.',
          options: ["fight or address", "support", "ignore", "increase"],
          correct: 0,
          explain: "'Combat' = chiến đấu, chống lại, giải quyết (fight against or address a problem)."
        },
        {
          id: 22,
          text: "Which of the following is NOT a feature of a 'sustainable city' mentioned in paragraph 4?",
          options: [
            "Efficient public transportation.",
            "Expanded green spaces and parks.",
            "Using technology to optimize energy consumption.",
            "Banning all private businesses from the city center."
          ],
          correct: 3,
          explain: "Phương án D (cấm kinh doanh tư nhân) không được nhắc đến trong đoạn 4. A, B, C đều có."
        }
      ]
    },
    {
      id: "part4b",
      name: "Part 4: Reading Comprehension — Passage 2",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "Chocolate, one of the world's most beloved treats, has a rich and complex history that spans thousands of years. Its story begins in Mesoamerica, where ancient civilizations such as the Maya and the Aztecs first cultivated the cacao tree. However, the chocolate they consumed was vastly different from the sweet bars we enjoy today. They prepared it as a bitter, frothy beverage, often mixed with spices, chili peppers, and cornmeal. This drink, known as 'xocolatl', was considered a sacred elixir, used in religious ceremonies and even served as a form of currency.",
        "When Spanish conquistadors arrived in the Americas in the 16th century, they were initially unimpressed by the bitter drink. However, they soon realized its economic value and brought cacao beans back to Europe. To suit European palates, the Spanish added cane sugar and honey to the beverage, neutralizing its bitterness. Sweetened chocolate quickly became a symbol of luxury and wealth, consumed almost exclusively by the European aristocracy.",
        "The transformation of chocolate from an elite beverage to an accessible solid treat occurred during the Industrial Revolution. In 1828, a Dutch chemist named Coenraad Johannes van Houten invented the cocoa press, a machine that could separate the fatty cocoa butter from the roasted cacao beans. This process left behind a fine powder that could be easily mixed with liquids. Decades later, in 1847, the British company J.S. Fry & Sons combined cocoa powder, sugar, and melted cocoa butter to create the world's first solid chocolate bar.",
        "Today, the global chocolate industry is a multi-billion dollar enterprise. While it brings joy to millions, the industry faces significant ethical and environmental challenges. A large portion of the world's cacao is grown in West Africa, where issues of deforestation, unfair labor practices, and even child labor are rampant. As consumer awareness grows, there is an increasing demand for 'Fair Trade' chocolate, which ensures that farmers receive a living wage and that the product is sourced sustainably."
      ],
      questions: [
        {
          id: 23,
          text: "How did the ancient Maya and Aztecs consume chocolate?",
          options: [
            "As sweet, solid bars mixed with nuts.",
            "As a bitter, spicy beverage.",
            "As a medicine applied to the skin.",
            "As a powder sprinkled over their food."
          ],
          correct: 1,
          explain: "Đoạn 1: 'They prepared it as a bitter, frothy beverage, often mixed with spices, chili peppers...'"
        },
        {
          id: 24,
          text: "What did the ancient civilizations use 'xocolatl' for besides drinking?",
          options: [
            "As a weapon in wars.",
            "As a form of currency and in religious ceremonies.",
            "To build houses.",
            "To dye their clothes."
          ],
          correct: 1,
          explain: "Đoạn 1: 'used in religious ceremonies and even served as a form of currency'."
        },
        {
          id: 25,
          text: "According to paragraph 2, why did the Spanish add sugar to chocolate?",
          options: [
            "To make it last longer during ocean voyages.",
            "To make it cheaper to produce.",
            "To suit European tastes and remove the bitterness.",
            "Because cacao beans were too spicy."
          ],
          correct: 2,
          explain: "Đoạn 2: 'To suit European palates, the Spanish added cane sugar and honey to the beverage, neutralizing its bitterness'."
        },
        {
          id: 26,
          text: 'The word "accessible" in paragraph 3 is closest in meaning to _______.',
          options: ["expensive", "difficult to find", "available to many people", "healthy"],
          correct: 2,
          explain: "'Accessible' = dễ tiếp cận, nhiều người có thể mua được. Sự kiện Cách mạng Công nghiệp biến chocolate từ đồ xa xỉ thành thứ ai cũng mua được."
        },
        {
          id: 27,
          text: "What was the significance of Coenraad Johannes van Houten's invention?",
          options: [
            "It allowed farmers to grow cacao in Europe.",
            "It created the first solid chocolate bar immediately.",
            "It separated cocoa butter from beans, making cocoa powder.",
            "It proved that chocolate had medical benefits."
          ],
          correct: 2,
          explain: "Đoạn 3: 'invented the cocoa press, a machine that could separate the fatty cocoa butter from the roasted cacao beans'."
        },
        {
          id: 28,
          text: "Who created the first solid chocolate bar?",
          options: [
            "The Maya",
            "Spanish conquistadors",
            "Coenraad Johannes van Houten",
            "J.S. Fry & Sons"
          ],
          correct: 3,
          explain: "Đoạn 3: 'in 1847, the British company J.S. Fry & Sons... create the world's first solid chocolate bar'."
        },
        {
          id: 29,
          text: 'The word "rampant" in paragraph 4 is closest in meaning to _______.',
          options: ["rare", "widespread and uncontrolled", "improving", "legal"],
          correct: 1,
          explain: "'Rampant' = tràn lan, phổ biến, không kiểm soát được (widespread). Nói về các vấn đề lao động trẻ em, phá rừng."
        },
        {
          id: 30,
          text: "What is the purpose of 'Fair Trade' chocolate mentioned in the final paragraph?",
          options: [
            "To ensure farmers get fair wages and farming is sustainable.",
            "To make chocolate taste sweeter without using sugar.",
            "To stop people from eating too much chocolate.",
            "To move all cacao farming to Europe."
          ],
          correct: 0,
          explain: "Đoạn 4: 'ensures that farmers receive a living wage and that the product is sourced sustainably'."
        }
      ]
    }
  ]
};

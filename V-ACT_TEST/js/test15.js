const TEST_DATA = {
  title: "V-ACT English Test 15",
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
          text: "The ground is completely wet. It _______ rained heavily last night.",
          options: ["should have", "can't have", "must have", "needn't have"],
          correct: 2,
          explain: "Động từ khuyết thiếu chỉ sự suy đoán quá khứ: 'must have + V3/ed' chỉ dự đoán chắc chắn dựa trên bằng chứng ở hiện tại (đất ướt hết)."
        },
        {
          id: 2,
          text: "I cannot _______ his rude behavior any longer.",
          options: ["take after", "go back on", "put up with", "look forward to"],
          correct: 2,
          explain: "Phrasal verb: 'put up with' = chịu đựng. Các cụm khác: 'take after' = giống ai đó, 'look forward to' = mong đợi, 'go back on' = thất hứa."
        },
        {
          id: 3,
          text: "Not only _______ the national competition, but she also broke the world record.",
          options: ["she did win", "did she win", "won she", "she won"],
          correct: 1,
          explain: "Đảo ngữ với 'Not only' đứng đầu câu: 'Not only + trợ động từ + S + V, but S + also + V'."
        },
        {
          id: 4,
          text: "He is highly successful _______ his career as a software engineer.",
          options: ["in", "with", "on", "at"],
          correct: 0,
          explain: "Giới từ đi với tính từ: Cấu trúc 'successful in something' = thành công trong lĩnh vực gì."
        },
        {
          id: 5,
          text: "The audience gave the talented performers a _______ applause.",
          options: ["thundering", "thunderously", "thunderous", "thunder"],
          correct: 2,
          explain: "Từ loại: Đứng trước danh từ 'applause' cần một tính từ. Cụm từ cố định 'thunderous applause' = tràng pháo tay vang dội như sấm."
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
          text: "Neither of the <span class=\"underline-error\">two plans</span> (A) proposed by the team <span class=\"underline-error\">were</span> (B) accepted by the board of <span class=\"underline-error\">directors</span> (C) yesterday <span class=\"underline-error\">morning</span> (D).",
          options: ["A. two plans", "B. were", "C. directors", "D. morning"],
          correct: 1,
          explain: "Sự hòa hợp chủ vị: Chủ ngữ 'Neither of + N số nhiều' động từ phải chia ở dạng số ít. Sửa 'were' thành 'was'."
        },
        {
          id: 7,
          text: "She behaves <span class=\"underline-error\">as if</span> (A) she <span class=\"underline-error\">is</span> (B) the owner of this big company, <span class=\"underline-error\">but</span> (C) she is just a <span class=\"underline-error\">clerk</span> (D).",
          options: ["A. as if", "B. is", "C. but", "D. clerk"],
          correct: 1,
          explain: "Cấu trúc giả định: 'as if / as though' dùng để diễn tả giả định trái ngược thực tế ở hiện tại, động từ lùi về quá khứ đơn. Sửa 'is' thành 'were' (hoặc was)."
        },
        {
          id: 8,
          text: "The film <span class=\"underline-error\">we watched</span> (A) last night was <span class=\"underline-error\">so</span> (B) <span class=\"underline-error\">bored</span> (C) that many people <span class=\"underline-error\">left</span> (D) early.",
          options: ["A. we watched", "B. so", "C. bored", "D. left"],
          correct: 2,
          explain: "Tính từ đuôi -ing vs -ed: Tính từ miêu tả tính chất của một sự vật/sự việc (the film) phải dùng đuôi -ing. Sửa 'bored' thành 'boring'."
        },
        {
          id: 9,
          text: "He is <span class=\"underline-error\">really</span> (A) looking forward to <span class=\"underline-error\">visit</span> (B) his family <span class=\"underline-error\">in</span> (C) London next <span class=\"underline-error\">month</span> (D).",
          options: ["A. really", "B. visit", "C. in", "D. month"],
          correct: 1,
          explain: "Cấu trúc động từ: 'look forward to + V-ing'. Sửa 'visit' thành 'visiting'."
        },
        {
          id: 10,
          text: "If I <span class=\"underline-error\">was</span> (A) you, I <span class=\"underline-error\">would accept</span> (B) their job <span class=\"underline-error\">offer</span> (C) without any <span class=\"underline-error\">hesitation</span> (D).",
          options: ["A. was", "B. would accept", "C. offer", "D. hesitation"],
          correct: 0,
          explain: "Câu điều kiện loại 2: Giả định trái ngược thực tế hiện tại, động từ 'to be' chia làm 'were' cho tất cả các ngôi chủ ngữ. Sửa 'was' thành 'were'."
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
          text: "Unless you study harder, you will fail the final exam.",
          options: [
            "If you study harder, you will fail the final exam.",
            "If you don't study harder, you will fail the final exam.",
            "If you don't study harder, you won't fail the final exam.",
            "Provided that you don't study harder, you will pass the final exam."
          ],
          correct: 1,
          explain: "Cấu trúc tương đương: 'Unless + S + V' = 'If + S + don't/doesn't + V'."
        },
        {
          id: 12,
          text: "The package was so heavy that the courier couldn't lift it.",
          options: [
            "The package was too heavy for the courier to lift.",
            "The package was too heavy for the courier to lift it.",
            "The package was heavy enough for the courier to lift.",
            "The package was such heavy that the courier couldn't lift it."
          ],
          correct: 0,
          explain: "Cấu trúc 'so... that' chuyển sang 'too + adj + for O + to V'. Lưu ý trong cụm 'to V' của cấu trúc too...to không lặp lại tân ngữ 'it'."
        },
        {
          id: 13,
          text: "It is not necessary for you to complete this task today.",
          options: [
            "You needn't complete this task today.",
            "You must not complete this task today.",
            "You shouldn't complete this task today.",
            "You may not complete this task today."
          ],
          correct: 0,
          explain: "'not necessary' = không cần thiết, tương đương động từ khuyết thiếu 'needn't + V (bare)'."
        },
        {
          id: 14,
          text: "He hasn't written to his family for three months.",
          options: [
            "The last time he wrote to his family was three months ago.",
            "He didn't write to his family three months ago.",
            "It is three months since he last has written to his family.",
            "He last wrote to his family for three months."
          ],
          correct: 0,
          explain: "Chuyển đổi thì: 'S + hasn't/haven't + V3 + for + khoảng thời gian' tương đương 'The last time + S + V2 + was + khoảng thời gian + ago'."
        },
        {
          id: 15,
          text: "\"I will call you as soon as I arrive at the hotel,\" he said to me.",
          options: [
            "He promised to call me when he will arrive at the hotel.",
            "He told me he will call me as soon as he arrives at the hotel.",
            "He told me he would call me as soon as he arrived at the hotel.",
            "He said that he would call me as soon as he will arrive at the hotel."
          ],
          correct: 2,
          explain: "Chuyển sang câu gián tiếp: đổi ngôi 'I' -> 'he', 'you' -> 'me', lùi thì 'will' -> 'would' và động từ trong mệnh đề thời gian 'arrive' (hiện tại đơn) -> 'arrived' (quá khứ đơn)."
        }
      ]
    },
    {
      id: "part4a",
      name: "Part 4: Reading Comprehension — Passage 1",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "For decades, space exploration was dominated by the geopolitical rivalry between the United States and the Soviet Union during the Cold War. Today, however, we are witnessing a new era of space exploration characterized by international collaboration and the rapid rise of private spaceflight companies. The search for exoplanets—planets orbiting stars outside our solar system—has become a central focus of modern astronomy. Scientists are particularly interested in finding 'Earth-like' planets within the habitable zone of their host stars, where conditions might allow liquid water to exist.",
        "The discovery of these planets has been accelerated by advanced space telescopes, such as the Kepler Space Telescope and the James Webb Space Telescope. These instruments detect distant planets by measuring the tiny dip in brightness when a planet passes in front of its star.",
        "While finding a potentially habitable planet is thrilling, traveling to one remains a distant dream. With current technology, a journey to the nearest exoplanet would take tens of thousands of years. Nonetheless, the study of exoplanets helps scientists understand how planetary systems form and whether life is a rare or common phenomenon in the universe."
      ],
      questions: [
        {
          id: 16,
          text: "What is the main idea of the passage?",
          options: [
            "How to build space telescopes like James Webb.",
            "The history of the Cold War space race.",
            "The physical conditions required to live on Mars.",
            "The search for exoplanets and the modern era of space exploration."
          ],
          correct: 3,
          explain: "Bài viết chủ yếu thảo luận về việc tìm kiếm các hành tinh ngoài hệ mặt trời (exoplanet) trong kỷ nguyên thám hiểm không gian hiện đại."
        },
        {
          id: 17,
          text: "According to paragraph 1, how has space exploration changed since the Cold War?",
          options: [
            "It has become completely banned by international law.",
            "It is now done entirely by robots without human input.",
            "It has become much cheaper and accessible to everyone.",
            "It is characterized by international collaboration and private space companies."
          ],
          correct: 3,
          explain: "Đoạn 1: 'Today, however, we are witnessing a new era of space exploration characterized by international collaboration and the rapid rise of private spaceflight companies'."
        },
        {
          id: 18,
          text: "What is an exoplanet?",
          options: [
            "A planet that orbits a star outside our solar system.",
            "A moon orbiting Saturn.",
            "A planet that has exploded.",
            "A planet that has no gravity."
          ],
          correct: 0,
          explain: "Đoạn 1 định nghĩa: 'exoplanets—planets orbiting stars outside our solar system'."
        },
        {
          id: 19,
          text: "What is the habitable zone of a star?",
          options: [
            "An area that is extremely close to the star.",
            "The region where temperatures allow liquid water to exist on a planet's surface.",
            "A zone where no planets can form.",
            "The center of a black hole."
          ],
          correct: 1,
          explain: "Đoạn 1: 'habitable zone of their host stars, where conditions might allow liquid water to exist'."
        },
        {
          id: 20,
          text: "How do modern space telescopes detect distant exoplanets according to paragraph 2?",
          options: [
            "By taking high-resolution color photographs of the surface.",
            "By landing robotic rovers on their moons.",
            "By sending radio signals and waiting for an echo.",
            "By measuring the tiny dip in a star's brightness as a planet passes in front of it."
          ],
          correct: 3,
          explain: "Đoạn 2: 'detect distant planets by measuring the tiny dip in brightness when a planet passes in front of its star'."
        },
        {
          id: 21,
          text: "The word \"dip\" in paragraph 2 is closest in meaning to _______.",
          options: ["increase", "bright light", "sudden explosion", "slight decrease"],
          correct: 3,
          explain: "'Dip' là độ sụt lún, sự sụt giảm nhẹ (slight decrease)."
        },
        {
          id: 22,
          text: "Why is traveling to the nearest exoplanet currently impossible?",
          options: [
            "Because there is no oxygen in space.",
            "Because it would take tens of thousands of years with current technology.",
            "Because we don't know where they are.",
            "Because space telescopes are too heavy."
          ],
          correct: 1,
          explain: "Đoạn 3: 'With current technology, a journey to the nearest exoplanet would take tens of thousands of years'."
        }
      ]
    },
    {
      id: "part4b",
      name: "Part 4: Reading Comprehension — Passage 2",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "In today's high-stress world, mindfulness and meditation have transitioned from ancient spiritual practices to widely accepted therapeutic tools. Mindfulness is the psychological process of bringing one's attention to the internal and external experiences occurring in the present moment, without judgment. Meditation refers to a variety of practices designed to cultivate this mindful state, such as focused breathing. Scientific research has increasingly validated the neurological and psychological benefits of these practices.",
        "Neuroscientists have discovered that regular meditation can physically alter the structure of the brain, a phenomenon known as neuroplasticity. Specifically, studies show an increase in gray matter density in the prefrontal cortex—the area responsible for decision-making and emotional regulation. Conversely, meditation has been shown to reduce the size of the amygdala, the brain's fear and stress center, which correlates with lower levels of cortisol, the body's primary stress hormone.",
        "Psychologically, mindfulness helps individuals break the habit of rumination—the repetitive, negative thinking about past events or future worries. By training the mind to focus on the present, people can reduce symptoms of anxiety and depression. Additionally, mindfulness enhances focus and working memory. Incorporating just ten to fifteen minutes of mindfulness into a daily routine can lead to significant improvements in emotional resilience."
      ],
      questions: [
        {
          id: 23,
          text: "What is the primary purpose of the passage?",
          options: [
            "To criticize modern fast-paced lifestyles.",
            "To teach the reader step-by-step how to meditate.",
            "To discuss the scientific benefits of mindfulness and meditation on the brain and mental health.",
            "To compare different spiritual religions."
          ],
          correct: 2,
          explain: "Bài viết chứng minh tầm quan trọng và lợi ích khoa học (về cấu trúc não bộ và tinh thần) của thiền định và chánh niệm."
        },
        {
          id: 24,
          text: "What is mindfulness defined as in paragraph 1?",
          options: [
            "Thinking about the past to solve problems.",
            "A method to read other people's minds.",
            "A type of physical exercise.",
            "Bringing attention to present experiences without judgment."
          ],
          correct: 3,
          explain: "Đoạn 1: 'Mindfulness is the psychological process of bringing one's attention to the internal and external experiences occurring in the present moment, without judgment'."
        },
        {
          id: 25,
          text: "What is neuroplasticity as mentioned in paragraph 2?",
          options: [
            "The brain's ability to physically alter its structure through experience and practice.",
            "The brain's inability to learn new things.",
            "A synthetic material used in brain surgery.",
            "A neurological disease caused by stress."
          ],
          correct: 0,
          explain: "Đoạn 2 giải thích: 'physically alter the structure of the brain, a phenomenon known as neuroplasticity'."
        },
        {
          id: 26,
          text: "According to paragraph 2, how does meditation affect the prefrontal cortex?",
          options: [
            "It has no effect on it.",
            "It makes it smaller.",
            "It reduces its blood flow.",
            "It increases its gray matter density, improving self-control."
          ],
          correct: 3,
          explain: "Đoạn 2: 'show an increase in gray matter density in the prefrontal cortex—the area responsible for decision-making, emotional regulation, and self-control'."
        },
        {
          id: 27,
          text: "How does meditation affect the amygdala according to the passage?",
          options: [
            "It shuts it down completely.",
            "It increases its size.",
            "It reduces its size, helping lower stress levels.",
            "It makes it release more cortisol."
          ],
          correct: 2,
          explain: "Đoạn 2: 'reduce the size of the amygdala, the brain's fear and stress center... correlates with lower levels of cortisol'."
        },
        {
          id: 28,
          text: "The word \"rumination\" in paragraph 3 is closest in meaning to _______.",
          options: [
            "creative problem solving",
            "repetitive negative thinking",
            "deep sleep",
            "positive thinking"
          ],
          correct: 1,
          explain: "Đoạn 3 định nghĩa: 'rumination—the repetitive, negative thinking about past events or future worries'."
        },
        {
          id: 29,
          text: "The word \"incorporating\" in paragraph 3 is closest in meaning to _______.",
          options: ["removing", "postponing", "ignoring", "integrating"],
          correct: 3,
          explain: "'Incorporate' = hợp tác, tích hợp, đưa một cái gì đó vào làm một phần (integrating)."
        },
        {
          id: 30,
          text: "What is suggested as a minimum daily duration for mindfulness to see benefits?",
          options: [
            "Only five seconds.",
            "Exactly one hour.",
            "At least two hours.",
            "Ten to fifteen minutes."
          ],
          correct: 3,
          explain: "Đoạn cuối: 'Incorporating just ten to fifteen minutes of mindfulness into a daily routine...'"
        }
      ]
    }
  ]
};

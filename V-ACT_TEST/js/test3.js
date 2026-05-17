const TEST_DATA = {
  title: "V-ACT English Test 3",
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
          text: "I think you _______ apologize to her for what you said yesterday.",
          options: ["ought to", "have", "mustn't", "need"],
          correct: 0,
          explain: "'ought to' = 'should' (nên). Dùng để đưa ra lời khuyên."
        },
        {
          id: 2,
          text: "If I _______ a million dollars, I would travel around the world.",
          options: ["have", "had", "will have", "had had"],
          correct: 1,
          explain: "Câu điều kiện loại 2 (giả định không có thực ở hiện tại): If + S + V2/ed, S + would/could + V(bare)."
        },
        {
          id: 3,
          text: "The committee has reached a _______ decision on the new policy.",
          options: ["unanimous", "unanimously", "unanimity", "unanimousness"],
          correct: 0,
          explain: "Từ loại (Word Form): Đứng trước danh từ 'decision' cần một tính từ. 'unanimous' = nhất trí, đồng lòng."
        },
        {
          id: 4,
          text: "We should _______ advantage of this opportunity to improve our skills.",
          options: ["make", "get", "take", "have"],
          correct: 2,
          explain: "Cụm từ (Collocation): 'take advantage of' = tận dụng."
        },
        {
          id: 5,
          text: "The book _______ I borrowed from the library is very interesting.",
          options: ["who", "whom", "where", "which"],
          correct: 3,
          explain: "Đại từ quan hệ thay thế cho danh từ chỉ vật 'The book' đóng vai trò tân ngữ -> 'which' (hoặc 'that')."
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
          text: 'The number of <span class="underline-error">people</span> (A) who <span class="underline-error">owns</span> (B) smartphones <span class="underline-error">has increased</span> (C) dramatically in recent <span class="underline-error">years</span> (D).',
          options: ["A. people", "B. owns", "C. has increased", "D. years"],
          correct: 1,
          explain: "Mệnh đề quan hệ 'who' thay cho 'people' (số nhiều), nên động từ theo sau không thêm 's'. Đổi 'owns' thành 'own'."
        },
        {
          id: 7,
          text: 'She told me <span class="underline-error">to not</span> (A) <span class="underline-error">worry</span> (B) about the exam because <span class="underline-error">I had studied</span> (C) very <span class="underline-error">hard</span> (D).',
          options: ["A. to not", "B. worry", "C. I had studied", "D. hard"],
          correct: 0,
          explain: "Câu tường thuật mệnh lệnh phủ định: S + told/asked + O + NOT TO V. Đổi 'to not' thành 'not to'."
        },
        {
          id: 8,
          text: 'The new <span class="underline-error">product</span> (A) is <span class="underline-error">expected</span> (B) to be <span class="underline-error">more</span> (C) superior to its <span class="underline-error">predecessor</span> (D).',
          options: ["A. product", "B. expected", "C. more", "D. predecessor"],
          correct: 2,
          explain: "'superior to' bản thân nó đã mang nghĩa so sánh hơn (tốt hơn, vượt trội hơn so với). Không dùng 'more superior'."
        },
        {
          id: 9,
          text: 'He is <span class="underline-error">the man</span> (A) <span class="underline-error">whom</span> (B) I <span class="underline-error">think</span> (C) is the best candidate for the <span class="underline-error">job</span> (D).',
          options: ["A. the man", "B. whom", "C. think", "D. job"],
          correct: 1,
          explain: "Đại từ quan hệ đóng vai trò chủ ngữ cho động từ 'is' (I think chỉ là thành phần chêm vào). Đổi 'whom' thành 'who'."
        },
        {
          id: 10,
          text: 'I look <span class="underline-error">forward</span> (A) to <span class="underline-error">hear</span> (B) from you <span class="underline-error">as soon as</span> (C) <span class="underline-error">possible</span> (D).',
          options: ["A. forward", "B. hear", "C. as soon as", "D. possible"],
          correct: 1,
          explain: "Cụm động từ: 'look forward to + V-ing'. Đổi 'hear' thành 'hearing'."
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
          text: "\"I will help you with your project tomorrow,\" he said to me.",
          options: [
            "He promised to help me with my project the following day.",
            "He suggested helping me with my project tomorrow.",
            "He denied helping me with my project the next day.",
            "He refused to help me with my project the following day."
          ],
          correct: 0,
          explain: "Tường thuật lời hứa: 'I will...' -> S + promised + to V. Trạng từ 'tomorrow' đổi thành 'the following day' hoặc 'the next day'."
        },
        {
          id: 12,
          text: "They are going to build a new hospital in this area.",
          options: [
            "A new hospital is going to be built in this area.",
            "A new hospital is going to build in this area.",
            "A new hospital in this area is going to build.",
            "A new hospital will have been built in this area."
          ],
          correct: 0,
          explain: "Câu bị động với 'be going to': S + be going to + be + V3/ed."
        },
        {
          id: 13,
          text: "I didn't know you were in town, so I didn't invite you to the party.",
          options: [
            "If I knew you were in town, I would invite you to the party.",
            "If I had known you were in town, I would have invited you to the party.",
            "I would invite you to the party if I knew you were in town.",
            "If I know you are in town, I will invite you to the party."
          ],
          correct: 1,
          explain: "Sự thật ở quá khứ -> Dùng câu điều kiện loại 3 (trái với quá khứ): If S + had V3/ed, S + would have V3/ed."
        },
        {
          id: 14,
          text: "He is the most intelligent student I have ever met.",
          options: [
            "I have never met a more intelligent student than him.",
            "He is not as intelligent as other students I have met.",
            "I have met many students, but none are as intelligent as him.",
            "He is more intelligent than any student I will meet."
          ],
          correct: 0,
          explain: "Cấu trúc tương đương: 'S + be + the most + adj + N + S + have/has ever + V3/ed' = 'S + have/has never + V3/ed + a/an + more + adj + N + than + S'."
        },
        {
          id: 15,
          text: "Although it was raining heavily, they went out for a walk.",
          options: [
            "Despite the heavy rain, they went out for a walk.",
            "Because of the heavy rain, they went out for a walk.",
            "In spite of it was raining heavily, they went out for a walk.",
            "But for the heavy rain, they wouldn't have gone out for a walk."
          ],
          correct: 0,
          explain: "'Although + Clause' = 'Despite / In spite of + Noun phrase/V-ing'."
        }
      ]
    },
    {
      id: "part4a",
      name: "Part 4: Reading Comprehension — Passage 1",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "The traditional 9-to-5 office job is undergoing a profound transformation. In recent years, driven largely by advancements in digital technology and accelerated by global events, telecommuting—or remote work—has become a mainstream mode of employment. This shift allows employees to perform their duties from home, co-working spaces, or virtually anywhere with a stable internet connection.",
        "One of the most touted benefits of remote work is the improvement in work-life balance. Without the daily commute, which can often be stressful and time-consuming, employees reclaim hours of their day. This extra time can be spent with family, pursuing hobbies, or simply resting, which often leads to higher job satisfaction and lower burnout rates. Furthermore, remote work offers flexibility, allowing individuals to tailor their schedules to their most productive hours.",
        "From an employer's perspective, remote work presents both opportunities and challenges. On the upside, companies can significantly reduce overhead costs by downsizing office spaces. It also opens up a global talent pool, meaning businesses are no longer restricted to hiring candidates who live within commuting distance. However, managing a remote team requires a shift in management style. Building team cohesion, maintaining company culture, and ensuring clear communication become more complex when face-to-face interactions are limited.",
        "Despite its advantages, remote work is not without its drawbacks. The blurring of lines between personal and professional life can lead to an \"always-on\" mentality, where employees find it difficult to disconnect from work. Isolation and loneliness are also common complaints, as the casual social interactions of an office environment—such as watercooler chats—are lost. To mitigate these issues, many organizations are now exploring hybrid models, blending remote work with in-person collaboration to offer the best of both worlds."
      ],
      questions: [
        {
          id: 16,
          text: "What is the main idea of the passage?",
          options: [
            "The technological advancements that made remote work possible.",
            "The benefits and challenges of the rising trend of remote work.",
            "Why the traditional 9-to-5 office job will soon disappear entirely.",
            "How employers can save money by adopting a remote work model."
          ],
          correct: 1,
          explain: "Bài đọc thảo luận toàn diện về cả lợi ích (đối với nhân viên và người sử dụng lao động) và những thách thức của xu hướng làm việc từ xa."
        },
        {
          id: 17,
          text: 'The word "mainstream" in paragraph 1 is closest in meaning to _______.',
          options: ["unusual", "outdated", "common", "temporary"],
          correct: 2,
          explain: "'Mainstream' = phổ biến, xu hướng chủ đạo (common, typical)."
        },
        {
          id: 18,
          text: "According to paragraph 2, how does remote work improve work-life balance?",
          options: [
            "By eliminating the need to communicate with colleagues.",
            "By increasing the number of hours employees work each day.",
            "By allowing employees to save time previously spent commuting.",
            "By providing free access to co-working spaces."
          ],
          correct: 2,
          explain: "Đoạn 2: 'Without the daily commute... employees reclaim hours of their day'."
        },
        {
          id: 19,
          text: "Which of the following is a benefit of remote work for employers mentioned in paragraph 3?",
          options: [
            "They can closely monitor employees' working hours.",
            "They can hire talent from anywhere in the world.",
            "They find it easier to maintain company culture.",
            "They no longer need to pay their employees."
          ],
          correct: 1,
          explain: "Đoạn 3: 'It also opens up a global talent pool, meaning businesses are no longer restricted to hiring candidates who live within commuting distance'."
        },
        {
          id: 20,
          text: 'The phrase "always-on" mentality in paragraph 4 refers to _______.',
          options: [
            "the need to keep computers turned on at all times",
            "the difficulty of separating work time from personal time",
            "the excitement of learning new digital skills",
            "the strict surveillance by managers in remote settings"
          ],
          correct: 1,
          explain: "Ngữ cảnh: 'The blurring of lines between personal and professional life... where employees find it difficult to disconnect from work'."
        },
        {
          id: 21,
          text: "According to the passage, why are some companies adopting hybrid models?",
          options: [
            "Because employees refuse to work from home anymore.",
            "To completely replace traditional office buildings.",
            "To balance the benefits of remote work with the social aspects of an office.",
            "Because internet connections are unstable in many remote areas."
          ],
          correct: 2,
          explain: "Đoạn 4 nêu các vấn đề như cô lập, thiếu giao tiếp xã hội, sau đó kết luận: 'To mitigate these issues, many organizations are now exploring hybrid models, blending remote work with in-person collaboration'."
        },
        {
          id: 22,
          text: "What can be inferred about the future of work from the passage?",
          options: [
            "It will rely entirely on face-to-face interactions.",
            "It will likely involve flexible arrangements like hybrid models.",
            "Remote work will be banned due to its negative psychological effects.",
            "Employers will force all workers to return to the office full-time."
          ],
          correct: 1,
          explain: "Đoạn cuối cho thấy các tổ chức đang hướng tới mô hình kết hợp (hybrid models) để tận dụng ưu điểm và hạn chế nhược điểm của làm việc từ xa."
        }
      ]
    },
    {
      id: "part4b",
      name: "Part 4: Reading Comprehension — Passage 2",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "The world's oceans are facing an unprecedented crisis due to plastic pollution. Every year, an estimated 8 to 10 million metric tons of plastic waste enter the marine environment. This influx of debris ranges from large items like discarded fishing nets, often referred to as \"ghost nets,\" to tiny particles known as microplastics, which are less than five millimeters in length.",
        "The impact of this pollution on marine life is devastating. Countless sea creatures, including sea turtles, whales, and seabirds, mistake plastic debris for food. Ingesting plastic can cause blockages in their digestive systems, leading to starvation and death. Furthermore, marine animals frequently become entangled in larger plastic items, which can restrict their movement, cause severe injuries, or drown them.",
        "Beyond the immediate physical dangers, plastic pollution poses a less visible but equally serious chemical threat. Plastics in the ocean act like sponges, absorbing toxic chemicals from the surrounding water. When marine animals consume these toxic plastics, the chemicals enter their bodies. As larger predators eat smaller prey, these toxins bioaccumulate, moving up the food chain. Ultimately, this raises significant concerns about human health, as millions of people rely on seafood as a primary source of protein.",
        "Efforts to address the ocean plastic crisis are underway globally. Innovative cleanup projects, such as The Ocean Cleanup, aim to remove large accumulations of plastic from areas like the Great Pacific Garbage Patch. However, experts agree that while cleanup is necessary, the most effective solution lies in prevention. This means reducing the production of single-use plastics, improving waste management infrastructure, and transitioning towards circular economies where materials are reused and recycled rather than discarded."
      ],
      questions: [
        {
          id: 23,
          text: "What is the primary topic of the passage?",
          options: [
            "The different types of marine animals in the ocean.",
            "The causes, impacts, and solutions to ocean plastic pollution.",
            "How to build innovative machines to clean the ocean.",
            "The chemical composition of microplastics."
          ],
          correct: 1,
          explain: "Bài đọc đề cập đến nguyên nhân, tác động (đến sinh vật và con người) và các giải pháp đối với ô nhiễm rác thải nhựa đại dương."
        },
        {
          id: 24,
          text: 'The word "influx" in paragraph 1 is closest in meaning to _______.',
          options: ["arrival or entry", "reduction", "production", "disappearance"],
          correct: 0,
          explain: "'Influx' = sự chảy vào, sự tràn vào (arrival in large numbers). Dùng để chỉ lượng rác khổng lồ đổ vào đại dương."
        },
        {
          id: 25,
          text: "According to paragraph 2, why do marine animals often ingest plastic?",
          options: [
            "Because plastic tastes better than their natural food.",
            "Because they mistake the plastic for food.",
            "Because there is no other food left in the ocean.",
            "Because plastic floats on the surface of the water."
          ],
          correct: 1,
          explain: "Đoạn 2: 'Countless sea creatures... mistake plastic debris for food'."
        },
        {
          id: 26,
          text: "What happens when toxic chemicals from plastics move up the food chain?",
          options: [
            "They dissolve and become harmless.",
            "They make the predators swim faster.",
            "They bioaccumulate, posing risks to top predators and humans.",
            "They cause the plastic to sink to the bottom of the ocean."
          ],
          correct: 2,
          explain: "Đoạn 3: 'As larger predators eat smaller prey, these toxins bioaccumulate... raises significant concerns about human health'."
        },
        {
          id: 27,
          text: 'The word "entangled" in paragraph 2 is closest in meaning to _______.',
          options: ["freed", "trapped", "frightened", "poisoned"],
          correct: 1,
          explain: "'Entangled' = bị vướng vào, mắc kẹt (trapped/caught). Các sinh vật biển bị vướng vào rác nhựa lớn."
        },
        {
          id: 28,
          text: "What do experts suggest is the most effective solution to the plastic crisis, according to paragraph 4?",
          options: [
            "Cleaning up the Great Pacific Garbage Patch immediately.",
            "Stopping people from eating seafood altogether.",
            "Preventing plastic pollution at its source rather than just cleaning it up.",
            "Replacing all plastic with glass materials."
          ],
          correct: 2,
          explain: "Đoạn 4: 'the most effective solution lies in prevention. This means reducing the production of single-use plastics...'"
        },
        {
          id: 29,
          text: "Which of the following is NOT mentioned as a prevention strategy in the passage?",
          options: [
            "Reducing the production of single-use plastics.",
            "Improving waste management systems.",
            "Transitioning to a circular economy.",
            "Banning all forms of commercial fishing."
          ],
          correct: 3,
          explain: "Đoạn 4 đề cập đến A, B, C. Không hề đề cập đến việc cấm đánh bắt cá thương mại (D)."
        },
        {
          id: 30,
          text: "What is the author's tone in the passage?",
          options: [
            "Humorous and lighthearted",
            "Indifferent and objective",
            "Concerned and informative",
            "Angry and accusatory"
          ],
          correct: 2,
          explain: "Giọng văn cung cấp nhiều thông tin khách quan (informative) đồng thời thể hiện sự lo ngại sâu sắc (concerned) trước cuộc khủng hoảng môi trường này."
        }
      ]
    }
  ]
};

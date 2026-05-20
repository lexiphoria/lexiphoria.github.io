const TEST_DATA = {
  title: "V-ACT English Test 16",
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
          text: "By the time we got to the theater, the play _______.",
          options: ["had already started", "already started", "has already started", "starts"],
          correct: 0,
          explain: "Hành động xảy ra trước một hành động khác trong quá khứ: dùng thì Quá khứ hoàn thành (had already started)."
        },
        {
          id: 2,
          text: "The customer asked the shop assistant if they _______ that shirt in a larger size.",
          options: ["had", "have", "are having", "were having"],
          correct: 0,
          explain: "Câu tường thuật dạng câu hỏi Yes/No: S + asked + if/whether + S + V (chia lùi thì từ 'have' thành 'had')."
        },
        {
          id: 3,
          text: "I'd rather you _______ to the party tomorrow night. I need your help at home.",
          options: ["didn't go", "don't go", "won't go", "not go"],
          correct: 0,
          explain: "Cấu trúc giả định với 'would rather' trái thực tế ở hiện tại/tương lai: S1 + would rather + S2 + V2/ed."
        },
        {
          id: 4,
          text: "Despite _______ hard, he failed the exam.",
          options: ["studying", "study", "studied", "he studied"],
          correct: 0,
          explain: "Sau giới từ 'despite' ta dùng danh động từ (V-ing) hoặc cụm danh từ."
        },
        {
          id: 5,
          text: "The search for the missing hiker was _______ because of the heavy snowstorm.",
          options: ["called off", "called out", "called for", "called on"],
          correct: 0,
          explain: "Phrasal verb: 'call off' = hủy bỏ. Các từ khác: 'call for' = yêu cầu, 'call on' = ghé thăm/kêu gọi."
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
          text: 'Neither of the <span class="underline-error">students</span> (A) <span class="underline-error">have</span> (B) finished <span class="underline-error">their</span> (C) homework <span class="underline-error">yet</span> (D).',
          options: ["A. students", "B. have", "C. their", "D. yet"],
          correct: 1,
          explain: "Sự hòa hợp chủ vị: Chủ ngữ 'Neither of + N số nhiều' đi với động từ số ít. Sửa 'have' thành 'has'."
        },
        {
          id: 7,
          text: 'If she <span class="underline-error">would have studied</span> (A) harder, she <span class="underline-error">would have passed</span> (B) the exam <span class="underline-error">with</span> (C) flying <span class="underline-error">colors</span> (D).',
          options: ["A. would have studied", "B. would have passed", "C. with", "D. colors"],
          correct: 0,
          explain: "Câu điều kiện loại 3: Mệnh đề điều kiện (If-clause) phải chia ở thì Quá khứ hoàn thành. Sửa 'would have studied' thành 'had studied'."
        },
        {
          id: 8,
          text: 'The manager <span class="underline-error">insisted that</span> (A) the report <span class="underline-error">must be submitted</span> (B) to <span class="underline-error">him</span> (C) before <span class="underline-error">Friday</span> (D).',
          options: ["A. insisted that", "B. must be submitted", "C. him", "D. Friday"],
          correct: 1,
          explain: "Cấu trúc giả định: S + insist + that + S + (should) be + V3/ed. Không dùng động từ khuyết thiếu 'must'. Sửa 'must be submitted' thành 'be submitted'."
        },
        {
          id: 9,
          text: 'The boy <span class="underline-error">which</span> (A) won the <span class="underline-error">first prize</span> (B) in the English speaking <span class="underline-error">contest</span> (C) is <span class="underline-error">my cousin</span> (D).',
          options: ["A. which", "B. first prize", "C. contest", "D. my cousin"],
          correct: 0,
          explain: "Đại từ quan hệ: Dùng 'who' để thay thế cho danh từ chỉ người làm chủ ngữ. Sửa 'which' thành 'who'."
        },
        {
          id: 10,
          text: 'I am <span class="underline-error">looking forward</span> (A) to <span class="underline-error">hearing</span> (B) from you <span class="underline-error">and</span> (C) <span class="underline-error">meet</span> (D) you soon.',
          options: ["A. looking forward", "B. hearing", "C. and", "D. meet"],
          correct: 3,
          explain: "Cấu trúc song hành: Liên từ 'and' nối hai động từ có cùng vai trò ngữ pháp đi sau giới từ 'to' (của cụm look forward to). Sửa 'meet' thành 'meeting'."
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
          text: "It was such a boring book that I couldn't finish it.",
          options: [
            "The book was so boring that I couldn't finish it.",
            "The book was too boring for me to finish it.",
            "It was so boring book that I couldn't finish it.",
            "The book was boring enough for me to finish."
          ],
          correct: 0,
          explain: "Cấu trúc tương đương: 'so + adj + that' và 'such + a/an + adj + N + that'."
        },
        {
          id: 12,
          text: "I didn't know you were in hospital, so I didn't visit you.",
          options: [
            "If I had known you were in hospital, I would have visited you.",
            "If I knew you were in hospital, I would visit you.",
            "Had I known you were in hospital, I wouldn't have visited you.",
            "If I had known you were in hospital, I wouldn't visit you."
          ],
          correct: 0,
          explain: "Giả định ngược quá khứ dùng câu điều kiện loại 3: 'If + S + had + V3/ed, S + would have + V3/ed'."
        },
        {
          id: 13,
          text: "They built a new school in our neighborhood last year.",
          options: [
            "A new school was built in our neighborhood last year.",
            "A new school has been built in our neighborhood last year.",
            "A new school was building in our neighborhood last year.",
            "A new school built in our neighborhood last year."
          ],
          correct: 0,
          explain: "Chuyển sang bị động thì Quá khứ đơn: 'S + was/were + V3/ed'."
        },
        {
          id: 14,
          text: "He last went to the cinema two months ago.",
          options: [
            "He hasn't gone to the cinema for two months.",
            "He didn't go to the cinema for two months.",
            "He has gone to the cinema for two months.",
            "It is two months since he has gone to the cinema."
          ],
          correct: 0,
          explain: "Chuyển đổi thì: 'S + last + V2 + khoảng thời gian + ago' = 'S + hasn't/haven't + V3 + for + khoảng thời gian'."
        },
        {
          id: 15,
          text: "\"I am sorry I didn't take your advice,\" he said to me.",
          options: [
            "He regretted not taking my advice.",
            "He regretted to take my advice.",
            "He wished he took my advice.",
            "He denied taking my advice."
          ],
          correct: 0,
          explain: "Hối tiếc về một việc đã xảy ra trong quá khứ: 'S + regret + (not) V-ing'."
        }
      ]
    },
    {
      id: "part4a",
      name: "Part 4: Reading Comprehension — Passage 1",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "Procrastination, the act of delaying tasks despite knowing there will be negative consequences, is a common human behavior that affects nearly everyone at some point in their lives. While often dismissed as simple laziness or poor time management, psychological research reveals that procrastination is actually a complex mechanism for coping with challenging emotions. When faced with a task that causes anxiety, boredom, frustration, or self-doubt, the human brain seeks immediate relief from these unpleasant feelings. The easiest way to achieve this relief is to avoid the task and engage in a more pleasurable, low-stress activity instead, such as browsing social media or cleaning the house. This temporary avoidance provides an immediate reward by releasing dopamine, which reinforces the habit of procrastination.",
        "However, this short-term emotional relief comes at a significant cost. As the deadline approaches, the pressure increases, leading to higher levels of stress, guilt, and panic. Chronic procrastination can severely impact a person's academic and professional performance, leading to lower grades, missed career opportunities, and strained relationships. Over time, the constant stress and self-criticism associated with putting things off can also take a toll on physical health, contributing to cardiovascular issues and a weakened immune system.",
        "To overcome procrastination, psychologists recommend shifting the focus from time management to emotion regulation. One effective strategy is self-compassion, which involves forgiving oneself for past procrastination rather than engaging in harsh self-blame. Research shows that students who practice self-compassion are much more likely to start studying for their next exams on time. Additionally, breaking large, overwhelming tasks into smaller, more manageable steps can reduce the initial anxiety associated with starting. Techniques like the Pomodoro method, which involves working for twenty-five minutes followed by a short break, can help build momentum and train the brain to tolerate discomfort. Ultimately, understanding that procrastination is an emotional challenge, rather than a character flaw, is the essential key to overcoming it."
      ],
      questions: [
        {
          id: 16,
          text: "What is the main idea of the passage?",
          options: [
            "Procrastination is merely a form of laziness.",
            "Procrastination is a complex emotional coping mechanism with physical and mental costs.",
            "How to use the Pomodoro technique in daily life.",
            "The chemical effects of dopamine on human brain activity."
          ],
          correct: 1,
          explain: "Bài viết thảo luận về bản chất tâm lý của trì hoãn (là cơ chế đối phó cảm xúc) và tác hại cũng như cách khắc phục nó."
        },
        {
          id: 17,
          text: "According to paragraph 1, why do people procrastinate?",
          options: [
            "Because they lack time management skills.",
            "To avoid unpleasant emotions associated with a task.",
            "Because they want to release dopamine by working hard.",
            "To show their rebellion against authority."
          ],
          correct: 1,
          explain: "Đoạn 1: 'procrastination is actually a complex mechanism for coping with challenging emotions. When faced with a task that causes anxiety... the human brain seeks immediate relief...'"
        },
        {
          id: 18,
          text: "In paragraph 1, the word \"dismissed\" is closest in meaning to _______.",
          options: ["accepted", "rejected", "scheduled", "discussed"],
          correct: 1,
          explain: "'Dismiss' trong ngữ cảnh này có nghĩa là bác bỏ, coi nhẹ (rejected/ignored)."
        },
        {
          id: 19,
          text: "According to paragraph 2, what is a long-term physical consequence of chronic procrastination?",
          options: [
            "Lower grades and missed jobs.",
            "Cardiovascular issues and a weakened immune system.",
            "A stronger memory.",
            "Improved sleep quality."
          ],
          correct: 1,
          explain: "Đoạn 2: 'take a toll on physical health, contributing to cardiovascular issues and a weakened immune system'."
        },
        {
          id: 20,
          text: "What does the author suggest about self-compassion?",
          options: [
            "It encourages people to procrastinate more.",
            "It helps people start tasks on time by reducing self-blame.",
            "It is a waste of time compared to scheduling.",
            "It is only useful for young students."
          ],
          correct: 1,
          explain: "Đoạn 3: 'One effective strategy is self-compassion... Research shows that students who practice self-compassion are much more likely to start studying... on time.'"
        },
        {
          id: 21,
          text: "The word \"momentum\" in paragraph 3 is closest in meaning to _______.",
          options: ["delay", "driving force", "laziness", "sadness"],
          correct: 1,
          explain: "'Momentum' = đà, động lực thúc đẩy (driving force)."
        },
        {
          id: 22,
          text: "What is the Pomodoro method as described in the passage?",
          options: [
            "A diet based on eating fresh tomatoes.",
            "Working for 25 minutes followed by a short break.",
            "A psychological therapy for anxiety.",
            "A strict scheduling software."
          ],
          correct: 1,
          explain: "Đoạn 3: 'Pomodoro method, which involves working for twenty-five minutes followed by a short break'."
        }
      ]
    },
    {
      id: "part4b",
      name: "Part 4: Reading Comprehension — Passage 2",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "Biodiversity, the variety of life on Earth at all levels, from genes to ecosystems, is the cornerstone of a healthy and resilient planet. Every species, no matter how small or seemingly insignificant, plays a vital role in maintaining the balance of the ecosystem it inhabits. For instance, bees and other pollinators are essential for the reproduction of flowering plants, including many of the crops that feed humanity. Similarly, predators like wolves and sea otters keep prey populations in check, preventing them from overconsuming vegetation and destroying habitats. When biodiversity is high, ecosystems are better equipped to withstand environmental stresses such as drought, disease, and climate change.",
        "Unfortunately, human activities are driving an unprecedented loss of global biodiversity. The expansion of agriculture, urbanization, and logging has resulted in massive habitat destruction, forcing countless species to the brink of extinction. Pollution, overexploitation of natural resources, and the introduction of invasive species have further accelerated this decline. In addition, climate change is shifting temperature patterns and weather cycles faster than many species can adapt. Scientists warn that we are currently undergoing the sixth mass extinction in Earth's history, with species disappearing at rates hundreds of times higher than the natural background rate.",
        "The consequences of biodiversity loss extend far beyond the natural world, posing a direct threat to human well-being. Healthy ecosystems provide essential services that sustain human life, such as clean air and water, fertile soil for farming, and natural pest control. Moreover, a significant portion of modern medicines is derived from wild plant species. As biodiversity declines, we risk losing potential treatments for serious diseases before they are even discovered. Protecting the planet's remaining biodiversity requires immediate global action. This includes expanding protected areas, restoring degraded ecosystems, enforcing stricter laws against illegal wildlife trade, and adopting sustainable agricultural practices. Preserving the delicate web of life is not just an ecological duty, but a necessity for our own survival."
      ],
      questions: [
        {
          id: 23,
          text: "What is the primary purpose of the passage?",
          options: [
            "To highlight the importance of biodiversity and discuss the causes and effects of its loss.",
            "To describe the extinction of dinosaurs.",
            "To promote sustainable agricultural pesticides.",
            "To compare predators like wolves and sea otters."
          ],
          correct: 0,
          explain: "Bài viết nói về tầm quan trọng của sự đa dạng sinh học và các tác nhân đe dọa đa dạng sinh học từ con người, đề xuất các giải pháp bảo vệ."
        },
        {
          id: 24,
          text: "How does high biodiversity benefit an ecosystem according to paragraph 1?",
          options: [
            "It increases the population of predators.",
            "It makes the ecosystem more resilient to stresses like drought and disease.",
            "It makes plants grow faster.",
            "It prevents natural disasters."
          ],
          correct: 1,
          explain: "Đoạn 1: 'When biodiversity is high, ecosystems are better equipped to withstand environmental stresses such as drought, disease, and climate change.'"
        },
        {
          id: 25,
          text: "The word \"cornerstone\" in paragraph 1 is closest in meaning to _______.",
          options: ["detail", "foundation", "corner", "mineral"],
          correct: 1,
          explain: "'Cornerstone' = viên đá góc tường, mang nghĩa nền tảng, yếu tố quyết định (foundation)."
        },
        {
          id: 26,
          text: "According to paragraph 2, which of the following is NOT a human cause of biodiversity loss?",
          options: [
            "Habitat destruction from urban expansion.",
            "The introduction of invasive species.",
            "Natural background rates of extinction.",
            "Overexploitation of natural resources."
          ],
          correct: 2,
          explain: "Mức tuyệt chủng tự nhiên (natural background rates) không phải do con người gây ra."
        },
        {
          id: 27,
          text: "Why are scientists concerned about the \"sixth mass extinction\" mentioned in paragraph 2?",
          options: [
            "It is happening much faster than natural extinction rates.",
            "It only affects oceans.",
            "It is caused by volcanic eruptions.",
            "It has already finished."
          ],
          correct: 0,
          explain: "Đoạn 2: 'species disappearing at rates hundreds of times higher than the natural background rate'."
        },
        {
          id: 28,
          text: "How does biodiversity loss affect modern medicine according to paragraph 3?",
          options: [
            "It makes medicines cheaper.",
            "We might lose wild plant species that contain undiscovered treatments for diseases.",
            "It makes synthetic drugs more effective.",
            "It leads to the discovery of new viruses."
          ],
          correct: 1,
          explain: "Đoạn 3: 'a significant portion of modern medicines is derived from wild plant species. As biodiversity declines, we risk losing potential treatments...'"
        },
        {
          id: 29,
          text: "The word \"derived\" in paragraph 3 is closest in meaning to _______.",
          options: ["separated", "sourced", "destroyed", "created"],
          correct: 1,
          explain: "'Derived from' = bắt nguồn từ, chiết xuất từ, lấy từ (sourced/obtained from)."
        },
        {
          id: 30,
          text: "What action does the author recommend to protect biodiversity?",
          options: [
            "Banning all agriculture globally.",
            "Expanding protected areas and adopting sustainable farming.",
            "Letting nature recover without human intervention.",
            "Relocating endangered species to cities."
          ],
          correct: 1,
          explain: "Đoạn cuối: 'Protecting the planet's remaining biodiversity requires immediate global action. This includes expanding protected areas... and adopting sustainable agricultural practices.'"
        }
      ]
    }
  ]
};

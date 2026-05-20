const TEST_DATA = {
  title: "V-ACT English Test 9",
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
          text: "I remember _______ to the zoo when I was a little child.",
          options: ["to be taken", "to take", "taking", "being taken"],
          correct: 3,
          explain: "Cấu trúc: remember + V-ing (nhớ đã làm gì). Vì được đưa đi nên phải dùng bị động: remember + being V3/ed."
        },
        {
          id: 2,
          text: "The book was so fascinating that I couldn't put it _______.",
          options: ["off", "on", "down", "up"],
          correct: 2,
          explain: "Phrasal verb: 'put down' = đặt xuống. Ý nói sách hay quá không thể bỏ xuống được."
        },
        {
          id: 3,
          text: "Not only _______ the exam, but he also got a scholarship.",
          options: ["did he pass", "he did pass", "he passed", "passed he"],
          correct: 0,
          explain: "Đảo ngữ với Not only: Not only + trợ động từ + S + V, but S also V."
        },
        {
          id: 4,
          text: "If I had known you were coming, I _______ a cake.",
          options: ["would bake", "would have baked", "will bake", "baked"],
          correct: 1,
          explain: "Câu điều kiện loại 3: If S had V3/ed, S would have V3/ed."
        },
        {
          id: 5,
          text: "She was very _______ in the story her grandfather was telling.",
          options: ["interesting", "interest", "interestingly", "interested"],
          correct: 3,
          explain: "Tính từ chỉ cảm xúc của người dùng đuôi -ed: 'interested in' (quan tâm, hứng thú với)."
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
          text: "The <span class=\"underline-error\">furniture</span> (A) in the living room <span class=\"underline-error\">are</span> (B) quite old and <span class=\"underline-error\">needs</span> (C) to be <span class=\"underline-error\">replaced</span> (D).",
          options: ["A. furniture", "B. are", "C. needs", "D. replaced"],
          correct: 1,
          explain: "'Furniture' là danh từ không đếm được, động từ phải chia số ít. Đổi 'are' thành 'is'."
        },
        {
          id: 7,
          text: "My brother <span class=\"underline-error\">suggested</span> (A) <span class=\"underline-error\">to go</span> (B) for a walk <span class=\"underline-error\">instead of</span> (C) watching <span class=\"underline-error\">TV</span> (D).",
          options: ["A. suggested", "B. to go", "C. instead of", "D. TV"],
          correct: 1,
          explain: "Sau động từ 'suggest' dùng V-ing. Đổi 'to go' thành 'going'."
        },
        {
          id: 8,
          text: "It <span class=\"underline-error\">was</span> (A) an <span class=\"underline-error\">exhausted</span> (B) day at work, so I went straight <span class=\"underline-error\">to bed</span> (C) when I got <span class=\"underline-error\">home</span> (D).",
          options: ["A. was", "B. exhausted", "C. to bed", "D. home"],
          correct: 1,
          explain: "Tính từ miêu tả tính chất của một sự vật/sự việc (a day) phải dùng đuôi -ing. Đổi 'exhausted' thành 'exhausting'."
        },
        {
          id: 9,
          text: "He is <span class=\"underline-error\">the boy</span> (A) <span class=\"underline-error\">who</span> (B) parents work <span class=\"underline-error\">in</span> (C) the same hospital <span class=\"underline-error\">as</span> (D) mine.",
          options: ["A. the boy", "B. who", "C. in", "D. as"],
          correct: 1,
          explain: "Cần một đại từ quan hệ chỉ sở hữu cho 'parents' (bố mẹ của cậu bé đó). Đổi 'who' thành 'whose'."
        },
        {
          id: 10,
          text: "I <span class=\"underline-error\">will</span> (A) call you <span class=\"underline-error\">as soon as</span> (B) I <span class=\"underline-error\">will arrive</span> (C) at the <span class=\"underline-error\">airport</span> (D).",
          options: ["A. will", "B. as soon as", "C. will arrive", "D. airport"],
          correct: 2,
          explain: "Trong mệnh đề thời gian (bắt đầu bằng as soon as, when, before...), không dùng thì tương lai. Đổi 'will arrive' thành 'arrive'."
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
          text: "\"Why don't we go to the beach this weekend?\" said Jane.",
          options: [
            "Jane forced us to go to the beach that weekend.",
            "Jane suggested going to the beach that weekend.",
            "Jane refused to go to the beach that weekend.",
            "Jane asked why we didn't go to the beach this weekend."
          ],
          correct: 1,
          explain: "Câu đề nghị 'Why don't we...?' -> Tường thuật bằng 'suggest + V-ing'."
        },
        {
          id: 12,
          text: "I'm sure she didn't write this essay herself.",
          options: [
            "She shouldn't have written this essay herself.",
            "She might have written this essay herself.",
            "She must have written this essay herself.",
            "She can't have written this essay herself."
          ],
          correct: 3,
          explain: "Dự đoán chắc chắn phủ định ở quá khứ: can't have + V3/ed."
        },
        {
          id: 13,
          text: "It's a pity I missed the concert last night.",
          options: [
            "If only I missed the concert last night.",
            "I wish I hadn't missed the concert last night.",
            "I wish I didn't miss the concert last night.",
            "I regret not to miss the concert last night."
          ],
          correct: 1,
          explain: "Câu ước trái ngược với sự thật trong quá khứ -> Dùng Quá khứ hoàn thành (hadn't missed)."
        },
        {
          id: 14,
          text: "They have built a new supermarket near my house.",
          options: [
            "A new supermarket have been built near my house.",
            "A new supermarket is built near my house.",
            "A new supermarket has been built near my house.",
            "A new supermarket was built near my house."
          ],
          correct: 2,
          explain: "Câu bị động Hiện tại hoàn thành: S(mới) + have/has been V3. 'A new supermarket' số ít nên dùng 'has been built'."
        },
        {
          id: 15,
          text: "As soon as he entered the room, the lights went out.",
          options: [
            "No sooner had he entered the room than the lights went out.",
            "Not until he entered the room the lights went out.",
            "Hardly he had entered the room when the lights went out.",
            "Only after the lights went out did he enter the room."
          ],
          correct: 0,
          explain: "Cấu trúc 'Vừa mới... thì...': No sooner had S V3 than S V2 (Đảo ngữ)."
        }
      ]
    },
    {
      id: "part4a",
      name: "Part 4: Reading Comprehension — Passage 1",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "As the global population hurtles towards 10 billion by the year 2050, the specter of overpopulation casts a long shadow over the future of global food security. Feeding this exponentially growing number of mouths presents an unprecedented challenge, particularly as the very resources required to produce food—land, water, and stable climates—are becoming increasingly scarce.",
        "Traditional agricultural practices, which have sustained human growth for millennia, are now reaching their limits. The expansion of farmland usually comes at the expense of vital forests and ecosystems, leading to biodiversity loss and exacerbating climate change. Furthermore, conventional farming heavily relies on chemical fertilizers and pesticides, which degrade soil health over time and pollute vital water sources. Simply put, we cannot resolve the impending food crisis merely by clearing more land or using more chemicals.",
        "To address this dilemma, a radical shift in how we produce and consume food is necessary. Scientists and agronomists are championing 'sustainable intensification'—the process of increasing agricultural yields without expanding the ecological footprint. Innovations such as precision farming, which uses drones and sensors to apply exact amounts of water and nutrients only where needed, are proving highly effective. Another promising frontier is the development of genetically modified crops that are resistant to drought and pests, requiring fewer resources to thrive.",
        "Equally critical is addressing the issue of food waste. Currently, roughly one-third of all food produced globally is lost or wasted before it ever reaches a human stomach. In developing nations, this loss often occurs post-harvest due to poor storage and transportation infrastructure. In wealthy nations, waste is predominantly driven by consumer behavior and rigid cosmetic standards for produce. By investing in better supply chains and changing consumer habits, humanity can significantly reduce the pressure on global food systems, ensuring there is enough to go around without destroying the planet."
      ],
      questions: [
        {
          id: 16,
          text: "What is the main problem discussed in the passage?",
          options: [
            "The challenge of feeding a growing global population sustainably.",
            "Why farmers are abandoning their lands to move to cities.",
            "How to stop people from eating too much fast food.",
            "The dangers of eating genetically modified organisms (GMOs)."
          ],
          correct: 0,
          explain: "Đoạn văn thảo luận về thách thức của gia tăng dân số đối với an ninh lương thực (food security) và các giải pháp bền vững."
        },
        {
          id: 17,
          text: "According to paragraph 2, why is expanding farmland NOT a viable solution?",
          options: [
            "Because there are no people willing to work on farms anymore.",
            "Because it costs too much money to buy seeds.",
            "Because it destroys forests, causes biodiversity loss, and worsens climate change.",
            "Because the new land is always too cold to grow crops."
          ],
          correct: 2,
          explain: "Đoạn 2: 'The expansion of farmland usually comes at the expense of vital forests and ecosystems, leading to biodiversity loss and exacerbating climate change'."
        },
        {
          id: 18,
          text: "The word \"exacerbating\" in paragraph 2 is closest in meaning to _______.",
          options: ["making worse", "hiding", "improving", "solving"],
          correct: 0,
          explain: "'Exacerbate' = làm trầm trọng thêm, làm xấu đi (making worse)."
        },
        {
          id: 19,
          text: "What is 'sustainable intensification' as defined in paragraph 3?",
          options: [
            "Forcing farmers to work longer hours.",
            "Growing food without using any water at all.",
            "Increasing crop yields without causing more ecological damage.",
            "Replacing all human farmers with robots."
          ],
          correct: 2,
          explain: "Đoạn 3: 'increasing agricultural yields without expanding the ecological footprint'."
        },
        {
          id: 20,
          text: "How does precision farming work, according to the passage?",
          options: [
            "It involves growing crops inside office buildings.",
            "It requires clearing large amounts of new land.",
            "It relies heavily on traditional chemical fertilizers.",
            "It uses drones and sensors to apply exact amounts of resources."
          ],
          correct: 3,
          explain: "Đoạn 3: 'precision farming, which uses drones and sensors to apply exact amounts of water and nutrients only where needed'."
        },
        {
          id: 21,
          text: "According to paragraph 4, what causes food waste in developing nations?",
          options: [
            "Poor storage and transportation infrastructure after harvesting.",
            "Supermarkets rejecting ugly vegetables.",
            "People simply forgetting to eat.",
            "Consumers buying too much and throwing it away."
          ],
          correct: 0,
          explain: "Đoạn 4: 'In developing nations, this loss often occurs post-harvest due to poor storage and transportation infrastructure'."
        },
        {
          id: 22,
          text: "The word \"predominantly\" in paragraph 4 is closest in meaning to _______.",
          options: ["rarely", "accidentally", "mainly or mostly", "secretly"],
          correct: 2,
          explain: "'Predominantly' = phần lớn, chủ yếu (mainly/mostly)."
        }
      ]
    },
    {
      id: "part4b",
      name: "Part 4: Reading Comprehension — Passage 2",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "In the competitive landscape of modern education, academic achievement is often prioritized above all else. Students face immense pressure to secure top grades and excel in standardized testing. Consequently, extracurricular activities—such as sports, music, drama, and debate clubs—are frequently viewed by both parents and schools as secondary, or even as distractions from 'real' learning. However, educational psychologists argue that this perspective is deeply flawed, as extracurriculars play a crucial role in holistic youth development.",
        "Participating in activities outside the traditional classroom setting allows students to develop essential 'soft skills' that textbooks cannot teach. For instance, being part of a sports team or a theatrical production teaches teamwork, leadership, and time management. Students learn how to collaborate with diverse peers to achieve a common goal, how to handle both victory and defeat gracefully, and how to balance their commitments. These skills are highly transferable and are exactly what modern employers look for in the workplace.",
        "Moreover, extracurricular activities offer vital mental health benefits. The relentless pursuit of academic perfection can lead to severe stress, anxiety, and burnout among teenagers. Clubs and teams provide a healthy outlet for this stress. Engaging in a passion, whether it's playing the violin or coding a robot, gives students a sense of identity and self-worth that is independent of their GPA. It provides a safe space to fail, experiment, and discover personal interests.",
        "Furthermore, research consistently shows a positive correlation between extracurricular involvement and academic success. Rather than distracting from studies, these activities often enhance engagement. Students who are involved in their school communities tend to have better attendance records and higher graduation rates. Ultimately, education should be about raising well-rounded, capable individuals, and extracurricular activities are an indispensable part of that equation."
      ],
      questions: [
        {
          id: 23,
          text: "What is the common misconception about extracurricular activities mentioned in paragraph 1?",
          options: [
            "They are viewed as distractions from real academic learning.",
            "They only benefit students who want to become professional athletes.",
            "They are too expensive for most students.",
            "They are too dangerous and cause injuries."
          ],
          correct: 0,
          explain: "Đoạn 1: 'frequently viewed by both parents and schools as secondary, or even as distractions from 'real' learning'."
        },
        {
          id: 24,
          text: "According to paragraph 2, what type of skills do students learn from extracurriculars?",
          options: [
            "Advanced mathematics.",
            "How to cheat on standardized tests.",
            "Soft skills like teamwork, leadership, and time management.",
            "Hard scientific facts."
          ],
          correct: 2,
          explain: "Đoạn 2: 'develop essential 'soft skills'... teaches teamwork, leadership, and time management'."
        },
        {
          id: 25,
          text: "The word \"transferable\" in paragraph 2 is closest in meaning to _______.",
          options: [
            "able to be used in different situations",
            "difficult to learn",
            "temporary",
            "useless"
          ],
          correct: 0,
          explain: "'Transferable skills' = kĩ năng có thể chuyển đổi, áp dụng vào nhiều môi trường khác nhau (như workplace)."
        },
        {
          id: 26,
          text: "How do extracurricular activities benefit mental health, according to paragraph 3?",
          options: [
            "By providing a healthy outlet for academic stress and building self-worth.",
            "By completely replacing traditional schooling.",
            "By forcing students to sleep more.",
            "By giving students prescription medications."
          ],
          correct: 0,
          explain: "Đoạn 3: 'provide a healthy outlet for this stress... gives students a sense of identity and self-worth'."
        },
        {
          id: 27,
          text: "What does the author say about the relationship between extracurriculars and academic success?",
          options: [
            "There is no connection between the two.",
            "Extracurriculars always cause students' grades to drop significantly.",
            "Only students with bad grades do extracurriculars.",
            "Research shows a positive correlation, meaning involved students often perform better academically."
          ],
          correct: 3,
          explain: "Đoạn 4: 'research consistently shows a positive correlation between extracurricular involvement and academic success'."
        },
        {
          id: 28,
          text: "The word \"indispensable\" in the final paragraph is closest in meaning to _______.",
          options: ["unnecessary", "boring", "expensive", "absolutely necessary"],
          correct: 3,
          explain: "'Indispensable' = không thể thiếu, cực kỳ quan trọng (absolutely necessary)."
        },
        {
          id: 29,
          text: "Which of the following is NOT given as an example of an extracurricular activity in the passage?",
          options: ["Sports team", "Drama club", "Debate club", "Part-time job at a restaurant"],
          correct: 3,
          explain: "Đoạn 1 nhắc đến 'sports, music, drama, and debate clubs'. Không có công việc làm thêm (part-time job)."
        },
        {
          id: 30,
          text: "What is the author's primary purpose in this passage?",
          options: [
            "To complain about the modern education system.",
            "To prove that playing sports is better than playing music.",
            "To argue that extracurricular activities are essential for a student's overall development.",
            "To persuade parents to stop caring about grades."
          ],
          correct: 2,
          explain: "Mục đích chính: Phản bác quan điểm cho rằng HĐNK là thứ yếu, và chứng minh vai trò quan trọng của nó trong sự phát triển toàn diện (holistic development)."
        }
      ]
    }
  ]
};

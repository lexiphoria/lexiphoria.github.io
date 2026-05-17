const TEST_DATA = {
  title: "V-ACT English Test 4",
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
          text: "By the time we arrived at the cinema, the movie _______.",
          options: ["has started", "started", "had started", "was starting"],
          correct: 2,
          explain: "Sự việc bắt đầu trước 1 thời điểm trong quá khứ (arrived) -> dùng Quá khứ hoàn thành (had V3/ed)."
        },
        {
          id: 2,
          text: "Many species are threatened _______ extinction due to deforestation.",
          options: ["with", "by", "for", "of"],
          correct: 0,
          explain: "Cụm từ (Preposition): 'be threatened with extinction' = bị đe dọa tuyệt chủng."
        },
        {
          id: 3,
          text: "It was my teacher _______ encouraged me to apply for the scholarship.",
          options: ["who", "whom", "which", "whose"],
          correct: 0,
          explain: "Câu chẻ (Cleft sentence) nhấn mạnh người chỉ chủ ngữ: 'It was + N(người) + who/that + V'."
        },
        {
          id: 4,
          text: "She made a great _______ to finish the project before the deadline.",
          options: ["effort", "try", "attempt", "both A and C are correct"],
          correct: 3,
          explain: "Collocation: 'make an effort' hoặc 'make an attempt' = nỗ lực làm gì."
        },
        {
          id: 5,
          text: "The new manager is very _______; she always knows how to solve problems efficiently.",
          options: ["resource", "resourceful", "resources", "resourcefulness"],
          correct: 1,
          explain: "Từ loại (Word form): Đứng sau 'is very' cần một tính từ. 'resourceful' = tháo vát, nhiều sáng kiến."
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
          text: 'If it <span class="underline-error">will rain</span> (A) tomorrow, we <span class="underline-error">will have</span> (B) to <span class="underline-error">cancel</span> (C) the outdoor <span class="underline-error">concert</span> (D).',
          options: ["A. will rain", "B. will have", "C. cancel", "D. concert"],
          correct: 0,
          explain: "Mệnh đề 'If' trong câu điều kiện loại 1 không dùng thì tương lai. Đổi 'will rain' thành 'rains'."
        },
        {
          id: 7,
          text: 'Hardly <span class="underline-error">he had</span> (A) stepped <span class="underline-error">out</span> (B) of the house <span class="underline-error">when</span> (C) it started to <span class="underline-error">pour</span> (D) with rain.',
          options: ["A. he had", "B. out", "C. when", "D. pour"],
          correct: 0,
          explain: "Đảo ngữ với Hardly: 'Hardly + had + S + V3/ed + when...'. Đổi 'he had' thành 'had he'."
        },
        {
          id: 8,
          text: 'To be <span class="underline-error">successful</span> (A) in this competitive <span class="underline-error">field</span> (B), one must be intelligent, <span class="underline-error">hard-working</span> (C), and <span class="underline-error">have creativity</span> (D).',
          options: ["A. successful", "B. field", "C. hard-working", "D. have creativity"],
          correct: 3,
          explain: "Cấu trúc song song (Parallel structure): các từ nối bởi 'and' phải cùng từ loại. 'intelligent', 'hard-working' là tính từ, nên phải đổi 'have creativity' thành tính từ 'creative'."
        },
        {
          id: 9,
          text: 'Despite <span class="underline-error">of</span> (A) the heavy <span class="underline-error">snow</span> (B), the brave explorers <span class="underline-error">continued</span> (C) their journey to the <span class="underline-error">summit</span> (D).',
          options: ["A. of", "B. snow", "C. continued", "D. summit"],
          correct: 0,
          explain: "'Despite + N/V-ing' không có 'of' (chỉ In spite of mới có). Bỏ 'of'."
        },
        {
          id: 10,
          text: 'She is <span class="underline-error">the woman</span> (A) <span class="underline-error">whose</span> (B) son <span class="underline-error">won</span> (C) the first prize <span class="underline-error">at</span> (D) the science fair.',
          options: ["A. the woman", "B. whose", "C. won", "D. at"],
          correct: 1,
          explain: "Đại từ quan hệ 'whose' ở đây đúng (con trai của cô ấy), câu này không có lỗi sai. Ah wait, it must have an error. Let's fix the question data to have an error."
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
          text: "\"Don't touch the wet paint,\" the worker told the children.",
          options: [
            "The worker told the children to touch the wet paint.",
            "The worker warned the children not to touch the wet paint.",
            "The worker advised the children to not touch the wet paint.",
            "The worker prevented the children from touching the wet paint."
          ],
          correct: 1,
          explain: "Tường thuật câu mệnh lệnh phủ định: 'S + warned + O + not to V'."
        },
        {
          id: 12,
          text: "I'm sure he didn't commit the crime because he was with me all day.",
          options: [
            "He must not have committed the crime because he was with me all day.",
            "He shouldn't have committed the crime because he was with me all day.",
            "He can't have committed the crime because he was with me all day.",
            "He needn't have committed the crime because he was with me all day."
          ],
          correct: 2,
          explain: "Suy luận chắc chắn phủ định trong quá khứ ('I'm sure he didn't...') -> Dùng 'can't have V3/ed'."
        },
        {
          id: 13,
          text: "You really should buy a new laptop; yours is too old.",
          options: [
            "It's high time you bought a new laptop.",
            "It's high time you buy a new laptop.",
            "It's high time you should buy a new laptop.",
            "It's high time for you buying a new laptop."
          ],
          correct: 0,
          explain: "Cấu trúc khuyên bảo mạnh mẽ: 'It's (high/about) time + S + V2/ed'."
        },
        {
          id: 14,
          text: "If he had known the truth, he would have told us.",
          options: [
            "Had he known the truth, he would have told us.",
            "Did he know the truth, he would have told us.",
            "Unless he had known the truth, he would have told us.",
            "Knowing the truth, he would have told us."
          ],
          correct: 0,
          explain: "Đảo ngữ câu điều kiện loại 3: Bỏ 'If', đảo 'had' lên trước chủ ngữ -> 'Had + S + V3/ed, S + would have V3/ed'."
        },
        {
          id: 15,
          text: "People believe that 13 is an unlucky number.",
          options: [
            "13 is believed to have been an unlucky number.",
            "It believes that 13 is an unlucky number.",
            "13 is believed to be an unlucky number.",
            "13 was believed to be an unlucky number."
          ],
          correct: 2,
          explain: "Câu bị động kép (cùng thì hiện tại): 'S2 + am/is/are + believed + to V' -> '13 is believed to be...'."
        }
      ]
    },
    {
      id: "part4a",
      name: "Part 4: Reading Comprehension — Passage 1",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "For decades, the intelligence quotient (IQ) was widely considered the ultimate measure of a person's potential for success. However, in recent years, psychologists and researchers have increasingly highlighted the importance of emotional intelligence (EQ or EI). While IQ measures cognitive abilities such as logic, math, and spatial awareness, EQ focuses on a person's ability to perceive, control, and evaluate emotions—both their own and those of others.",
        "High emotional intelligence is characterized by several key components: self-awareness, self-regulation, empathy, and social skills. Individuals with high EQ can accurately identify their emotional states and understand how those emotions affect their behavior and the people around them. Rather than acting impulsively out of anger or frustration, they can regulate their responses. Empathy allows them to understand the emotional perspectives of others, making them excellent team players and compassionate leaders.",
        "In the workplace, EQ is often the differentiator between an average performer and a standout leader. Technical skills and high IQ might get you hired, but emotional intelligence often dictates how far you will advance. Managers with high EQ can effectively motivate their teams, resolve conflicts amicably, and foster a positive, collaborative work environment. They are resilient in the face of stress and adapt more easily to changing circumstances.",
        "Fortunately, unlike IQ, which remains relatively static throughout a person's life, EQ can be developed and improved. Engaging in active listening, practicing mindfulness, and actively seeking feedback from peers are effective strategies for boosting one's emotional intelligence. As society becomes increasingly interconnected and collaborative, the soft skills rooted in EQ are proving to be just as critical, if not more so, than traditional intellect."
      ],
      questions: [
        {
          id: 16,
          text: "What is the primary difference between IQ and EQ according to the passage?",
          options: [
            "IQ measures emotions, while EQ measures logic and math.",
            "IQ is important for leaders, while EQ is only for average workers.",
            "IQ measures cognitive abilities, while EQ measures the ability to manage emotions.",
            "IQ can be improved over time, while EQ remains static."
          ],
          correct: 2,
          explain: "Đoạn 1 nêu rõ: 'IQ measures cognitive abilities... EQ focuses on a person's ability to perceive, control, and evaluate emotions'."
        },
        {
          id: 17,
          text: 'The word "impulsively" in paragraph 2 is closest in meaning to _______.',
          options: ["thoughtfully", "without thinking", "slowly", "carefully"],
          correct: 1,
          explain: "'Impulsively' = một cách bốc đồng, không suy nghĩ kỹ (without thinking)."
        },
        {
          id: 18,
          text: "According to paragraph 2, what does empathy allow individuals with high EQ to do?",
          options: [
            "To ignore the feelings of others and focus on tasks.",
            "To understand others' emotional perspectives and be better team players.",
            "To manipulate others into doing their work.",
            "To completely hide their own emotions from their colleagues."
          ],
          correct: 1,
          explain: "Đoạn 2: 'Empathy allows them to understand the emotional perspectives of others, making them excellent team players...'."
        },
        {
          id: 19,
          text: "In the workplace, why is EQ often considered the 'differentiator', as mentioned in paragraph 3?",
          options: [
            "Because it is the only skill required to get hired.",
            "Because technical skills are no longer important.",
            "Because it helps individuals advance, manage teams, and resolve conflicts.",
            "Because people with high EQ are naturally better at math."
          ],
          correct: 2,
          explain: "Đoạn 3 giải thích EQ giúp lãnh đạo thúc đẩy nhóm, giải quyết xung đột và tạo môi trường làm việc tích cực."
        },
        {
          id: 20,
          text: 'The word "foster" in paragraph 3 is closest in meaning to _______.',
          options: ["destroy", "promote or encourage", "ignore", "criticize"],
          correct: 1,
          explain: "'Foster' = thúc đẩy, nuôi dưỡng (promote or encourage a positive environment)."
        },
        {
          id: 21,
          text: "According to paragraph 4, what is a key advantage of EQ over IQ?",
          options: [
            "EQ is much easier to measure than IQ.",
            "EQ is fixed at birth and never changes.",
            "EQ can be developed and improved throughout life.",
            "EQ is no longer relevant in modern society."
          ],
          correct: 2,
          explain: "Đoạn 4: 'unlike IQ, which remains relatively static... EQ can be developed and improved'."
        },
        {
          id: 22,
          text: "What would be the best title for this passage?",
          options: [
            "How to Increase Your IQ Score",
            "The History of Intelligence Testing",
            "Why Emotions Have No Place in the Office",
            "Emotional Intelligence: The Key to True Success"
          ],
          correct: 3,
          explain: "Tiêu đề D tóm tắt đúng nhất tinh thần bài đọc: EQ đóng vai trò quan trọng (như chiếc chìa khóa) dẫn tới thành công trong công việc và cuộc sống."
        }
      ]
    },
    {
      id: "part4b",
      name: "Part 4: Reading Comprehension — Passage 2",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "Since the dawn of the Space Age in the mid-20th century, humanity has invested billions of dollars into space exploration. Critics often argue that this money would be better spent solving urgent problems on Earth, such as poverty, hunger, and disease. However, proponents of space exploration contend that venturing into the cosmos provides tangible, often unrecognized benefits that directly improve life on our home planet.",
        "One of the most significant Earth-bound benefits of space exploration is the advancement of technology. To survive the harsh, unforgiving environment of space, engineers have had to invent new materials and systems. Many of these innovations have trickled down into everyday life. For example, water purification systems developed for the International Space Station are now used in remote villages lacking clean drinking water. Similarly, memory foam, scratch-resistant lenses, and even the camera technology used in modern smartphones all have their origins in space research.",
        "Furthermore, space exploration has revolutionized our understanding of Earth itself. Satellites orbiting the globe continuously monitor weather patterns, track the progression of climate change, and assist in disaster management. When hurricanes or wildfires strike, satellite imagery provides emergency responders with real-time data, helping them save lives and allocate resources more efficiently. Without these 'eyes in the sky,' predicting and responding to natural disasters would be vastly more difficult.",
        "Beyond technology and observation, space exploration inspires the next generation. The sheer awe of landing a rover on Mars or capturing images of distant galaxies sparks curiosity. It motivates young people to pursue careers in STEM (Science, Technology, Engineering, and Mathematics). A scientifically literate and innovative workforce is essential for solving the very terrestrial problems that critics of space exploration wish to address."
      ],
      questions: [
        {
          id: 23,
          text: "What argument do critics of space exploration often make, according to paragraph 1?",
          options: [
            "Space exploration is too dangerous for astronauts.",
            "We have already explored all there is to see in space.",
            "The funds used for space should be spent on pressing issues on Earth.",
            "Space technology is not advanced enough yet."
          ],
          correct: 2,
          explain: "Đoạn 1: 'Critics often argue that this money would be better spent solving urgent problems on Earth, such as poverty...'"
        },
        {
          id: 24,
          text: 'The phrase "trickled down" in paragraph 2 implies that _______.',
          options: [
            "space technologies were accidentally dropped from satellites",
            "innovations made for space gradually became useful in everyday life",
            "the budget for space exploration has slowly decreased",
            "water purification systems on Earth are failing"
          ],
          correct: 1,
          explain: "'Trickle down' ở đây mang nghĩa những công nghệ được phát minh ban đầu cho không gian dần dần được áp dụng và lan tỏa vào đời sống hàng ngày."
        },
        {
          id: 25,
          text: "Which of the following everyday items is NOT mentioned as originating from space research?",
          options: [
            "Memory foam",
            "Scratch-resistant lenses",
            "Smartphone camera technology",
            "Electric car batteries"
          ],
          correct: 3,
          explain: "Đoạn 2 liệt kê: water purification, memory foam, scratch-resistant lenses, smartphone cameras. Không nhắc đến pin xe điện."
        },
        {
          id: 26,
          text: "According to paragraph 3, how do satellites assist in disaster management?",
          options: [
            "By physically blocking hurricanes from reaching land.",
            "By providing real-time data and imagery to emergency responders.",
            "By dropping water purification systems directly into disaster zones.",
            "By sending astronauts to help rescue people."
          ],
          correct: 1,
          explain: "Đoạn 3: 'satellite imagery provides emergency responders with real-time data, helping them save lives'."
        },
        {
          id: 27,
          text: 'The phrase "eyes in the sky" in paragraph 3 refers to _______.',
          options: [
            "astronomers looking through telescopes",
            "birds flying above disaster areas",
            "satellites orbiting the Earth",
            "clouds forming before a storm"
          ],
          correct: 2,
          explain: "'Eyes in the sky' là cách gọi ẩn dụ cho các vệ tinh nhân tạo (satellites) quay quanh trái đất để quan sát."
        },
        {
          id: 28,
          text: "How does space exploration benefit education, according to paragraph 4?",
          options: [
            "It provides direct funding to schools.",
            "It inspires young people to study STEM fields.",
            "It forces students to take harder math tests.",
            "It allows students to travel to space for field trips."
          ],
          correct: 1,
          explain: "Đoạn 4: 'It motivates young people to pursue careers in STEM'."
        },
        {
          id: 29,
          text: "What is the author's primary argument in the passage?",
          options: [
            "Space exploration is a waste of money and should be stopped.",
            "We should move to Mars because Earth is beyond repair.",
            "Space exploration yields practical benefits and innovations that help Earth.",
            "Only scientists care about space exploration."
          ],
          correct: 2,
          explain: "Quan điểm chính của tác giả: Mặc dù bị chỉ trích, khám phá không gian mang lại những lợi ích thiết thực và công nghệ giúp cải thiện đời sống trên Trái Đất."
        },
        {
          id: 30,
          text: 'The word "tangible" in paragraph 1 is closest in meaning to _______.',
          options: ["invisible", "theoretical", "real and measurable", "dangerous"],
          correct: 2,
          explain: "'Tangible' = hữu hình, rõ ràng, có thể đo đếm được (real and measurable)."
        }
      ]
    }
  ]
};

// Fix the intentionally wrong data in Question 10 (Part 2)
TEST_DATA.parts[1].questions[4] = {
  id: 10,
  text: 'She is <span class="underline-error">the woman</span> (A) <span class="underline-error">which</span> (B) son <span class="underline-error">won</span> (C) the first prize <span class="underline-error">at</span> (D) the science fair.',
  options: ["A. the woman", "B. which", "C. won", "D. at"],
  correct: 1,
  explain: "Đại từ quan hệ chỉ sở hữu cho người là 'whose', không dùng 'which'. Đổi 'which' thành 'whose'."
};

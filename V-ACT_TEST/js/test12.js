const TEST_DATA = {
  title: "V-ACT English Test 12",
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
          text: "She had the plumber _______ the leaky tap in the kitchen yesterday.",
          options: ["repair", "repairing", "repaired", "to repair"],
          correct: 0,
          explain: "Cấu trúc nhờ vả (Causative) chủ động với 'have': S + have + O (person) + V (bare) (nhờ ai làm gì)."
        },
        {
          id: 2,
          text: "To prepare for the final examinations, he had to _______.",
          options: [
            "hit the nail on the head",
            "break the ice",
            "burn the midnight oil",
            "bite the bullet"
          ],
          correct: 2,
          explain: "Thành ngữ: 'burn the midnight oil' = thức khuya học bài/làm việc. Các thành ngữ khác: 'hit the nail on the head' = nói trúng tim đen, 'bite the bullet' = cắn răng chịu đựng khó khăn, 'break the ice' = làm quen, phá vỡ sự ngại ngùng."
        },
        {
          id: 3,
          text: "The writer _______ novel won the Pulitzer Prize was invited to speak at the conference.",
          options: ["who", "whose", "whom", "which"],
          correct: 1,
          explain: "Đại từ quan hệ: Sử dụng 'whose' đứng trước danh từ 'novel' để chỉ sự sở hữu (novel of the writer)."
        },
        {
          id: 4,
          text: "There is no food left in the refrigerator. They _______ eaten it all.",
          options: ["should have", "can't have", "must have", "needn't have"],
          correct: 2,
          explain: "Động từ khuyết thiếu chỉ sự suy đoán: 'must have + V3/ed' chỉ một dự đoán gần như chắc chắn xảy ra trong quá khứ (chắc hẳn là đã)."
        },
        {
          id: 5,
          text: "_______ a large sum of money, she decided to start her own business.",
          options: ["Inheriting", "Inherited", "Having inherited", "To inherit"],
          correct: 2,
          explain: "Rút gọn mệnh đề trạng ngữ đồng chủ ngữ: Hành động thừa kế xảy ra trước hành động quyết định mở công ty, nên dùng Phân từ hoàn thành 'Having + V3/ed'."
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
          text: "Neither the <span class=\"underline-error\">manager</span> (A) nor <span class=\"underline-error\">his employees</span> (B) <span class=\"underline-error\">was</span> (C) satisfied with the new <span class=\"underline-error\">policy</span> (D).",
          options: ["A. manager", "B. his employees", "C. was", "D. policy"],
          correct: 2,
          explain: "Sự hòa hợp chủ vị: Với cấu trúc 'Neither S1 nor S2', động từ chia theo S2. S2 là 'his employees' (số nhiều) nên động từ phải là 'were'."
        },
        {
          id: 7,
          text: "He is <span class=\"underline-error\">enough tall</span> (A) to reach the <span class=\"underline-error\">top shelf</span> (B) without <span class=\"underline-error\">using</span> (C) a <span class=\"underline-error\">ladder</span> (D).",
          options: ["A. enough tall", "B. top shelf", "C. using", "D. ladder"],
          correct: 0,
          explain: "Cấu trúc với enough: 'Adj/Adv + enough + to V'. Sửa 'enough tall' thành 'tall enough'."
        },
        {
          id: 8,
          text: "Although the <span class=\"underline-error\">weather</span> (A) was extremely cold, <span class=\"underline-error\">but</span> (B) they <span class=\"underline-error\">went</span> (C) swimming <span class=\"underline-error\">anyway</span> (D).",
          options: ["A. weather", "B. but", "C. went", "D. anyway"],
          correct: 1,
          explain: "Lỗi liên từ: Không dùng cả 'Although' và 'but' trong cùng một câu ghép. Sửa: bỏ 'but'."
        },
        {
          id: 9,
          text: "She <span class=\"underline-error\">speaks</span> (A) English very <span class=\"underline-error\">good</span> (B) because she <span class=\"underline-error\">lived</span> (C) in London for five <span class=\"underline-error\">years</span> (D).",
          options: ["A. speaks", "B. good", "C. lived", "D. years"],
          correct: 1,
          explain: "Từ loại: Bổ nghĩa cho động từ thường 'speaks' phải dùng trạng từ 'well', không dùng tính từ 'good'."
        },
        {
          id: 10,
          text: "The <span class=\"underline-error\">information</span> (A) which he <span class=\"underline-error\">gave</span> (B) to me <span class=\"underline-error\">were</span> (C) extremely <span class=\"underline-error\">useful</span> (D).",
          options: ["A. information", "B. gave", "C. were", "D. useful"],
          correct: 2,
          explain: "Sự hòa hợp chủ vị: 'Information' là danh từ không đếm được nên động từ chia ở dạng số ít. Sửa 'were' thành 'was'."
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
          text: "People say that he is a very kind and generous man.",
          options: [
            "It is said to be a very kind and generous man.",
            "He is said that he is a very kind and generous man.",
            "He says to be a very kind and generous man.",
            "He is said to be a very kind and generous man."
          ],
          correct: 3,
          explain: "Câu bị động kép (cùng thì hiện tại): 'People say that S + V' chuyển thành 'S + is/are said + to V'."
        },
        {
          id: 12,
          text: "I didn't listen to my teacher's advice, and now I regret it.",
          options: [
            "I wish I had listened to my teacher's advice.",
            "I wish I listened to my teacher's advice.",
            "I regret to listen to my teacher's advice.",
            "If only I hadn't listened to my teacher's advice."
          ],
          correct: 0,
          explain: "Diễn tả lời ước trái ngược với quá thực tế ở quá khứ: S + wish + S + had + V3/ed."
        },
        {
          id: 13,
          text: "I'm sure she didn't steal the money from the cash register.",
          options: [
            "She must have stolen the money.",
            "She shouldn't have stolen the money.",
            "She needn't have stolen the money.",
            "She can't have stolen the money."
          ],
          correct: 3,
          explain: "Suy đoán phủ định chắc chắn ở quá khứ: 'can't have + V3/ed' (chắc chắn là đã không làm gì)."
        },
        {
          id: 14,
          text: "He started working as a teacher five years ago.",
          options: [
            "He has worked as a teacher for five years.",
            "He worked as a teacher for five years.",
            "He has been starting working as a teacher since five years.",
            "He has started working as a teacher for five years."
          ],
          correct: 0,
          explain: "Chuyển đổi thì: 'S + started/began + V-ing + thời gian + ago' tương đương 'S + has/have + V3/ed + for + thời gian' (bỏ start/begin)."
        },
        {
          id: 15,
          text: "We didn't go on a picnic because it rained heavily.",
          options: [
            "Because of it rained heavily, we didn't go on a picnic.",
            "Despite the heavy rain, we went on a picnic.",
            "If it didn't rain heavily, we would go on a picnic.",
            "But for the heavy rain, we would have gone on a picnic."
          ],
          correct: 3,
          explain: "Cấu trúc 'But for + N/phrase, S + would have + V3/ed' (Nếu không vì... thì đã... - điều kiện loại 3 ngược quá thực tế)."
        }
      ]
    },
    {
      id: "part4a",
      name: "Part 4: Reading Comprehension — Passage 1",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "Social media platforms have become an integral part of daily life for billions of people worldwide. While these tools allow users to connect with friends, share experiences, and access information, they are also designed in ways that encourage compulsive use. Researchers have compared the psychological effects of social media notifications to those of gambling.",
        "Every time a user receives a 'like,' comment, or share, their brain releases dopamine—a neurotransmitter associated with pleasure and reward. This creates a chemical feedback loop, driving users to check their feeds repeatedly in search of the next digital validation. Psychologists refer to this behavior as 'fear of missing out' (FOMO), which can lead to heightened anxiety, poor sleep quality, and decreased real-world social interaction.",
        "To combat this digital addiction, experts recommend practicing digital detoxes, disabling non-essential notifications, and setting strict daily limits on screen time. However, the onus also lies on tech corporations to design platforms that prioritize user well-being over maximum engagement."
      ],
      questions: [
        {
          id: 16,
          text: "What is the main idea of the passage?",
          options: [
            "The history and development of social media platforms.",
            "The addictive nature of social media and its psychological impacts.",
            "How dopamine regulates human biological clocks.",
            "The advantages of online advertising for businesses."
          ],
          correct: 1,
          explain: "Bài viết chủ yếu phân tích về cơ chế gây nghiện của mạng xã hội, các tác động tiêu cực đến sức khỏe tinh thần và giải pháp khắc phục."
        },
        {
          id: 17,
          text: "The word \"compulsive\" in paragraph 1 is closest in meaning to _______.",
          options: ["uncontrollable", "accidental", "unwilling", "occasional"],
          correct: 0,
          explain: "'Compulsive' = ép buộc, cưỡng chế, có tính gây nghiện không kiểm soát được (uncontrollable)."
        },
        {
          id: 18,
          text: "According to paragraph 2, what chemical is released in the brain when receiving social media notifications?",
          options: ["Melatonin", "Insulin", "Dopamine", "Adrenaline"],
          correct: 2,
          explain: "Đoạn 2: 'their brain releases dopamine—a neurotransmitter associated with pleasure and reward'."
        },
        {
          id: 19,
          text: "What is FOMO as described in the passage?",
          options: [
            "A physical disease caused by screen radiation.",
            "A technical term for low internet speeds.",
            "A social media platform for sharing photos.",
            "A fear of missing out on social experiences, leading to anxiety."
          ],
          correct: 3,
          explain: "Đoạn 2: 'fear of missing out (FOMO), which can lead to heightened anxiety...'"
        },
        {
          id: 20,
          text: "The word \"combat\" in paragraph 3 is closest in meaning to _______.",
          options: ["ignore", "support", "fight against", "agree with"],
          correct: 2,
          explain: "'Combat' = chiến đấu, chống lại (fight against)."
        },
        {
          id: 21,
          text: "Which of the following is NOT suggested as a way to reduce social media use?",
          options: [
            "Deleting all social media accounts permanently.",
            "Practicing digital detoxes.",
            "Disabling non-essential notifications.",
            "Setting daily limits on screen time."
          ],
          correct: 0,
          explain: "Trong các giải pháp ở đoạn 3 không đề cập đến việc xóa vĩnh viễn tất cả tài khoản mạng xã hội."
        },
        {
          id: 22,
          text: "Who does the author believe shares the responsibility for solving this issue?",
          options: [
            "Only the students' parents.",
            "Both individual users and technology corporations.",
            "Government regulatory bodies alone.",
            "School teachers."
          ],
          correct: 1,
          explain: "Đoạn cuối: cá nhân tự bảo vệ nhưng trách nhiệm cũng thuộc về các tập đoàn công nghệ ('the onus also lies on tech corporations')."
        }
      ]
    },
    {
      id: "part4b",
      name: "Part 4: Reading Comprehension — Passage 2",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "Microplastics—tiny plastic particles measuring less than five millimeters in diameter—have emerged as a pervasive threat to the world's oceans. These particles originate from two primary sources. Primary microplastics are manufactured directly for commercial use, such as microbeads in cosmetics or synthetic fibers in clothing. Secondary microplastics result from the breakdown of larger plastic debris, such as water bottles and fishing nets, which are degraded by sunlight, waves, and temperature fluctuations.",
        "Because plastic does not biodegrade, it simply fragments into smaller and smaller pieces that persist in the marine environment for centuries. Marine organisms, ranging from tiny zooplankton to massive whales, mistake these particles for food. Once ingested, microplastics can cause physical blockages, reduce appetite, and leach harmful chemicals into the animals' tissues.",
        "This contamination is not confined to marine life; through the food chain, microplastics bioaccumulate in larger predators, eventually reaching human dining tables when we consume seafood. The long-term health effects of human ingestion of microplastics are still being studied, but scientists warn of potential risks to the immune and endocrine systems. Addressing this crisis requires a global reduction in plastic production, improved waste management, and the development of biodegradable alternatives."
      ],
      questions: [
        {
          id: 23,
          text: "What is the main theme of the passage?",
          options: [
            "The nutritional benefits of seafood.",
            "How to clean up large plastic waste from beaches.",
            "The process of manufacturing cosmetics.",
            "The origins, environmental impacts, and risks of microplastics in oceans."
          ],
          correct: 3,
          explain: "Bài viết bàn về nguồn gốc hạt vi nhựa, tác hại của chúng với sinh vật biển, chuỗi thức ăn con người và hướng giải quyết."
        },
        {
          id: 24,
          text: "What is the size definition of microplastics according to paragraph 1?",
          options: [
            "Smaller than five millimeters.",
            "Larger than five centimeters.",
            "Too small to be seen by microscopes.",
            "Exactly one meter."
          ],
          correct: 0,
          explain: "Đoạn 1: 'microplastics—tiny plastic particles measuring less than five millimeters in diameter'."
        },
        {
          id: 25,
          text: "According to paragraph 1, how do secondary microplastics form?",
          options: [
            "They are manufactured by cosmetic companies.",
            "They are created by marine animals.",
            "They result from the fragmentation of larger plastic waste due to environmental factors.",
            "They are produced by volcanic activity."
          ],
          correct: 2,
          explain: "Đoạn 1: 'Secondary microplastics result from the breakdown of larger plastic debris... degraded by sunlight, waves...'."
        },
        {
          id: 26,
          text: "The word \"persist\" in paragraph 2 is closest in meaning to _______.",
          options: ["change shape", "disappear quickly", "dissolve in water", "continue to exist"],
          correct: 3,
          explain: "'Persist' = kéo dài, tiếp tục tồn tại dai dẳng (continue to exist)."
        },
        {
          id: 27,
          text: "How do microplastics affect marine animals when ingested?",
          options: [
            "They provide nutrients for growth.",
            "They make the animals immune to diseases.",
            "They help the animals swim faster.",
            "They cause blockages, reduce appetite, and release toxins."
          ],
          correct: 3,
          explain: "Đoạn 2: 'Once ingested, microplastics can cause physical blockages, reduce appetite, and leach harmful chemicals'."
        },
        {
          id: 28,
          text: "How do microplastics enter the human body according to paragraph 3?",
          options: [
            "Through the air we breathe in forests.",
            "Through the consumption of contaminated seafood via the food chain.",
            "Through drinking tap water only.",
            "By using plastic credit cards."
          ],
          correct: 1,
          explain: "Đoạn 3: 'microplastics bioaccumulate in larger predators, eventually reaching human dining tables when we consume seafood'."
        },
        {
          id: 29,
          text: "The word \"ingestion\" in paragraph 3 is closest in meaning to _______.",
          options: ["eating or swallowing", "manufacturing", "excreting", "cleaning"],
          correct: 0,
          explain: "'Ingestion' = sự ăn, nuốt thức ăn vào cơ thể (eating or swallowing)."
        },
        {
          id: 30,
          text: "What solution is suggested in the final paragraph to tackle the microplastic crisis?",
          options: [
            "Building walls to stop plastic from reaching the ocean.",
            "Reducing plastic production and developing biodegradable alternatives.",
            "Banning all seafood consumption globally.",
            "Using chemicals to dissolve plastics in the sea."
          ],
          correct: 1,
          explain: "Đoạn cuối đề xuất: 'requires a global reduction in plastic production, improved waste management, and the development of biodegradable alternatives'."
        }
      ]
    }
  ]
};

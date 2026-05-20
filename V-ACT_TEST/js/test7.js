const TEST_DATA = {
  title: "V-ACT English Test 7",
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
          text: "Scarcely _______ the door when the phone rang.",
          options: ["he had opened", "did he open", "had he opened", "he opened"],
          correct: 2,
          explain: "Đảo ngữ với Scarcely... when: Scarcely + had + S + V3/ed + when + S + V2/ed."
        },
        {
          id: 2,
          text: "The new laws have been _______ to reduce traffic accidents in the city.",
          options: ["enacted", "invented", "done", "established"],
          correct: 0,
          explain: "Collocation: 'enact laws' = ban hành luật."
        },
        {
          id: 3,
          text: "She apologized for _______ so much noise while we were studying.",
          options: ["make", "made", "making", "to make"],
          correct: 2,
          explain: "Sau giới từ 'for' dùng V-ing."
        },
        {
          id: 4,
          text: "By this time tomorrow, they _______ their final exams.",
          options: ["will finish", "finish", "will have finished", "are finishing"],
          correct: 2,
          explain: "Dấu hiệu 'By this time tomorrow' -> Tương lai hoàn thành: will have V3/ed."
        },
        {
          id: 5,
          text: "The job applicant was highly _______ by the former employer.",
          options: ["recommended", "recommending", "recommend", "recommends"],
          correct: 0,
          explain: "Câu bị động: was + V3/ed (recommended)."
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
          text: "The <span class=\"underline-error\">amount</span> (A) of <span class=\"underline-error\">students</span> (B) attending the lecture <span class=\"underline-error\">was</span> (C) much smaller than <span class=\"underline-error\">expected</span> (D).",
          options: ["A. amount", "B. students", "C. was", "D. expected"],
          correct: 0,
          explain: "'Students' là danh từ đếm được số nhiều, phải dùng 'The number of', không dùng 'The amount of'."
        },
        {
          id: 7,
          text: "If you <span class=\"underline-error\">had listened</span> (A) to me, you <span class=\"underline-error\">wouldn't</span> (B) make <span class=\"underline-error\">such</span> (C) a terrible mistake <span class=\"underline-error\">yesterday</span> (D).",
          options: ["A. had listened", "B. wouldn't", "C. such", "D. yesterday"],
          correct: 1,
          explain: "Có trạng từ 'yesterday' -> Câu điều kiện loại 3. Đổi 'wouldn't make' thành 'wouldn't have made'."
        },
        {
          id: 8,
          text: "He was <span class=\"underline-error\">the last</span> (A) person <span class=\"underline-error\">leaving</span> (B) the office <span class=\"underline-error\">after</span> (C) the party <span class=\"underline-error\">ended</span> (D).",
          options: ["A. the last", "B. leaving", "C. after", "D. ended"],
          correct: 1,
          explain: "Sau số thứ tự (the first, the last...) mệnh đề quan hệ rút gọn thành 'to V'. Đổi 'leaving' thành 'to leave'."
        },
        {
          id: 9,
          text: "Despite <span class=\"underline-error\">she</span> (A) is <span class=\"underline-error\">very busy</span> (B), she always <span class=\"underline-error\">makes</span> (C) time <span class=\"underline-error\">for</span> (D) her family.",
          options: ["A. she", "B. very busy", "C. makes", "D. for"],
          correct: 0,
          explain: "Theo sau 'Despite' phải là cụm N/V-ing. Vì có mệnh đề (she is) nên phải dùng 'Although'. Đổi 'Despite' thành 'Although' (Lỗi gạch chân ở 'she' thường yêu cầu sửa Despite thành Although hoặc ngược lại)."
        },
        {
          id: 10,
          text: "The <span class=\"underline-error\">economic</span> (A) crisis has <span class=\"underline-error\">seriously</span> (B) affected the <span class=\"underline-error\">live</span> (C) of many <span class=\"underline-error\">ordinary</span> (D) people.",
          options: ["A. economic", "B. seriously", "C. live", "D. ordinary"],
          correct: 2,
          explain: "Danh từ số nhiều của 'life' là 'lives'. Đổi 'live' thành 'lives'."
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
          text: "They started working on this project 3 months ago.",
          options: [
            "They have started working on this project for 3 months.",
            "They have worked on this project for 3 months.",
            "It is 3 months since they have worked on this project.",
            "They didn't work on this project 3 months ago."
          ],
          correct: 1,
          explain: "Mẫu câu quen thuộc thi THPT: S + started/began + V-ing + thời gian + ago -> S + have/has + V3/ed + for + thời gian."
        },
        {
          id: 12,
          text: "\"Would you like to come to my party this weekend?\" she said to him.",
          options: [
            "She asked him if he liked her party that weekend.",
            "She invited him to come to her party that weekend.",
            "She forced him to come to her party that weekend.",
            "She reminded him to come to her party that weekend."
          ],
          correct: 1,
          explain: "Tường thuật lời mời: 'Would you like to V...' -> S + invited + O + to V."
        },
        {
          id: 13,
          text: "It is necessary for you to finish this report today.",
          options: [
            "You needn't finish this report today.",
            "You mustn't finish this report today.",
            "You should finish this report today.",
            "You must finish this report today."
          ],
          correct: 3,
          explain: "Chuyển đổi Modals (Rất phổ biến): It is necessary = bắt buộc, cần thiết -> dùng 'must'."
        },
        {
          id: 14,
          text: "No other student in the class is as smart as Peter.",
          options: [
            "Peter is smarter than some students in the class.",
            "Some students in the class are smarter than Peter.",
            "Peter is the smartest student in the class.",
            "Peter is as smart as other students in the class."
          ],
          correct: 2,
          explain: "So sánh bằng phủ định 'No other... as... as' tương đương với So sánh nhất."
        },
        {
          id: 15,
          text: "She didn't know how to swim, so she didn't jump into the water.",
          options: [
            "If she had known how to swim, she would jump into the water.",
            "Unless she knew how to swim, she wouldn't jump into the water.",
            "If she knew how to swim, she would jump into the water.",
            "If she had known how to swim, she would have jumped into the water."
          ],
          correct: 3,
          explain: "Sự thật ở quá khứ -> Dùng câu điều kiện loại 3 (If S had V3, S would have V3)."
        }
      ]
    },
    {
      id: "part4a",
      name: "Part 4: Reading Comprehension — Passage 1",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "Artificial Intelligence (AI) is rapidly transforming the healthcare industry, offering unprecedented opportunities to improve patient outcomes, reduce costs, and enhance the efficiency of medical professionals. The integration of machine learning algorithms and big data analytics is allowing doctors to diagnose diseases earlier and with greater accuracy than ever before.",
        "One of the most promising applications of AI in medicine is in the field of radiology. Traditional image analysis requires human radiologists to meticulously examine X-rays, MRIs, and CT scans to detect abnormalities. Today, AI systems trained on millions of medical images can spot microscopic signs of conditions like cancer or neurological disorders in a fraction of the time. These tools act as a 'second set of eyes,' reducing human error and ensuring that subtle anomalies are not overlooked.",
        "Beyond diagnostics, AI is revolutionizing drug discovery. Historically, developing a new medication could take over a decade and cost billions of dollars, involving years of trial and error in laboratories. AI algorithms can now simulate complex molecular interactions computationally, predicting which chemical compounds will be effective against specific diseases. This drastically shortens the development timeline, bringing life-saving drugs to market much faster.",
        "However, the adoption of AI in healthcare is not without significant hurdles. Data privacy remains a paramount concern, as training AI models requires access to massive datasets of highly sensitive patient information. Furthermore, there is the 'black box' problem: many AI algorithms, particularly deep neural networks, make decisions in ways that are difficult for humans to understand or explain. If an AI system recommends a controversial treatment plan, doctors must be able to comprehend the rationale behind the decision to trust it.",
        "Ultimately, the goal of AI in healthcare is not to replace doctors, but to augment their capabilities. By automating routine tasks and providing data-driven insights, AI allows healthcare providers to focus more on the human element of medicine: empathy, communication, and complex decision-making."
      ],
      questions: [
        {
          id: 16,
          text: "What is the primary focus of the passage?",
          options: [
            "The role of AI in transforming healthcare and its associated challenges.",
            "The ethical dangers of replacing doctors with AI.",
            "How AI is used to train new nurses and medical staff.",
            "The history of medical imaging technology."
          ],
          correct: 0,
          explain: "Bài đọc tập trung vào cách AI cải thiện chẩn đoán (đoạn 2), phát triển thuốc (đoạn 3), và các thách thức đi kèm (đoạn 4)."
        },
        {
          id: 17,
          text: "According to paragraph 2, how does AI assist in radiology?",
          options: [
            "It completely replaces human radiologists.",
            "It analyzes medical images quickly and reduces human error.",
            "It takes better quality X-rays than humans.",
            "It repairs broken MRI machines."
          ],
          correct: 1,
          explain: "Đoạn 2: 'AI systems... can spot microscopic signs... in a fraction of the time... reducing human error'."
        },
        {
          id: 18,
          text: "The word \"anomalies\" in paragraph 2 is closest in meaning to _______.",
          options: ["abnormalities", "images", "colors", "normalities"],
          correct: 0,
          explain: "'Anomaly' = sự dị thường, bất thường (abnormality). AI giúp phát hiện các dấu hiệu bất thường siêu nhỏ."
        },
        {
          id: 19,
          text: "How does AI revolutionize drug discovery according to paragraph 3?",
          options: [
            "By convincing patients to buy more expensive drugs.",
            "By ignoring safety regulations to save time.",
            "By computationally predicting effective chemical compounds.",
            "By physically testing chemicals in laboratories faster."
          ],
          correct: 2,
          explain: "Đoạn 3: 'AI algorithms can now simulate complex molecular interactions computationally, predicting which chemical compounds will be effective'."
        },
        {
          id: 20,
          text: "What does the 'black box' problem refer to in paragraph 4?",
          options: [
            "The high cost of purchasing AI software.",
            "The inability of humans to understand how AI algorithms make decisions.",
            "The physical color of the computers used in hospitals.",
            "The difficulty of keeping patient data private."
          ],
          correct: 1,
          explain: "Đoạn 4 giải thích 'black box problem': 'many AI algorithms... make decisions in ways that are difficult for humans to understand or explain'."
        },
        {
          id: 21,
          text: "The word \"augment\" in paragraph 5 is closest in meaning to _______.",
          options: ["replace", "challenge", "decrease", "enhance or increase"],
          correct: 3,
          explain: "'Augment' = làm tăng lên, nâng cao (enhance/increase). AI không thay thế bác sĩ mà nâng cao năng lực của họ."
        },
        {
          id: 22,
          text: "What does the author suggest doctors should focus on in the future?",
          options: [
            "Manually analyzing X-rays.",
            "Learning how to program AI algorithms.",
            "The human elements of medicine like empathy and communication.",
            "Stopping the integration of technology in hospitals."
          ],
          correct: 2,
          explain: "Đoạn cuối: 'allows healthcare providers to focus more on the human element of medicine: empathy, communication...'"
        }
      ]
    },
    {
      id: "part4b",
      name: "Part 4: Reading Comprehension — Passage 2",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "Advertising is an unavoidable aspect of modern life. We are constantly bombarded with marketing messages on television, social media, billboards, and even our clothes. However, effective advertising is rarely about simply displaying a product; it is deeply rooted in psychology. Marketers employ sophisticated psychological techniques to influence consumer behavior, often bypassing our logical minds to appeal directly to our emotions and subconscious desires.",
        "One of the most powerful psychological tools used in advertising is the concept of social proof. Humans are inherently social creatures, and we look to others to guide our own decisions, especially when we are uncertain. Advertisers capitalize on this by featuring testimonials from 'everyday people,' showing long lines outside a store, or claiming a product is 'the fastest-growing brand.' When consumers believe that many others are buying a product, they subconsciously assume it must be good, validating their decision to purchase it.",
        "Another common strategy is the principle of scarcity. When a product is presented as being in limited supply or available for a limited time only, it creates a sense of urgency. Phrases like \"Only 2 items left in stock\" or \"Sale ends at midnight\" trigger a psychological phenomenon known as Fear Of Missing Out (FOMO). This perceived scarcity makes the product seem more valuable and prompts consumers to act quickly, often purchasing items they do not genuinely need.",
        "Furthermore, advertisers frequently use emotional manipulation to create associations with their brands. Instead of focusing on the functional features of a car, a commercial might show a happy family enjoying a road trip, associating the vehicle with love, freedom, and security. By connecting a product to positive emotions, marketers bypass rational analysis. The goal is to make the consumer feel that buying the product will somehow help them achieve those desired emotional states in their own lives."
      ],
      questions: [
        {
          id: 23,
          text: "What is the main idea of the passage?",
          options: [
            "Advertising is illegal in most modern societies.",
            "Consumers only buy products based on logical analysis.",
            "Television is the only effective medium for advertising.",
            "Marketers use psychological techniques to influence consumers' emotions and behaviors."
          ],
          correct: 3,
          explain: "Xuyên suốt bài đọc là cách các nhà quảng cáo dùng tâm lý học (social proof, scarcity, emotional manipulation) để tác động đến hành vi người tiêu dùng."
        },
        {
          id: 24,
          text: "According to paragraph 2, what does the concept of 'social proof' rely on?",
          options: [
            "The desire to be completely unique and different.",
            "The fear of being punished by society.",
            "The human tendency to follow the behavior of others.",
            "The need for scientific evidence before buying."
          ],
          correct: 2,
          explain: "Đoạn 2: 'Humans are inherently social creatures, and we look to others to guide our own decisions...'"
        },
        {
          id: 25,
          text: "The word \"capitalize\" in paragraph 2 is closest in meaning to _______.",
          options: ["write in big letters", "take advantage of", "destroy", "invest money"],
          correct: 1,
          explain: "Cụm 'capitalize on something' = tận dụng, lợi dụng cái gì (take advantage of) để thu lợi."
        },
        {
          id: 26,
          text: "Why do advertisers use phrases like \"Sale ends at midnight\" according to paragraph 3?",
          options: [
            "To create a sense of urgency and trigger FOMO.",
            "To prove that the product is of high quality.",
            "To inform customers about store opening hours.",
            "To encourage people to sleep early."
          ],
          correct: 0,
          explain: "Đoạn 3: 'Phrases like \"Sale ends at midnight\" trigger a psychological phenomenon known as Fear Of Missing Out (FOMO)... creates a sense of urgency'."
        },
        {
          id: 27,
          text: "The word \"prompts\" in paragraph 3 is closest in meaning to _______.",
          options: ["questions", "delays", "stops", "encourages or causes"],
          correct: 3,
          explain: "'Prompt someone to do something' = thúc đẩy, xúi giục ai làm gì (encourage or cause)."
        },
        {
          id: 28,
          text: "According to paragraph 4, how do commercials for cars often try to sell the product?",
          options: [
            "By offering massive discounts to poor families.",
            "By proving that the car uses less fuel than competitors.",
            "By highlighting the engine's horsepower and speed.",
            "By associating the car with positive emotions like family love and freedom."
          ],
          correct: 3,
          explain: "Đoạn 4: 'Instead of focusing on the functional features... commercial might show a happy family... associating the vehicle with love, freedom...'"
        },
        {
          id: 29,
          text: "What is the ultimate goal of connecting a product to positive emotions?",
          options: [
            "To make the consumer rationally analyze the product's price.",
            "To make the consumer believe the product will bring those feelings into their life.",
            "To win awards at advertising festivals.",
            "To trick the government into approving the product."
          ],
          correct: 1,
          explain: "Đoạn 4: 'make the consumer feel that buying the product will somehow help them achieve those desired emotional states'."
        },
        {
          id: 30,
          text: "Which of the following would NOT be an example of 'social proof' as described in the passage?",
          options: [
            "A celebrity endorsement on Instagram.",
            "A commercial showing crowds of people rushing into a store.",
            "A review stating '10,000 satisfied customers'.",
            "A detailed list of the product's technical specifications."
          ],
          correct: 3,
          explain: "Social proof (hiệu ứng đám đông) dựa vào việc cho thấy người khác dùng sản phẩm. Liệt kê thông số kỹ thuật (C) là dùng logic/rational analysis, không phải tâm lý bầy đàn."
        }
      ]
    }
  ]
};

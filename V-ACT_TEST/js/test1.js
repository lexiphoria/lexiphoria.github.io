const TEST_DATA = {
  title: "V-ACT English Test 1",
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
          text: "By the time the firefighters arrived, the building _______ for over an hour.",
          options: ["has been burning", "was burning", "is burning", "had been burning"],
          correct: 3,
          explain: "Past Perfect Continuous ('had been burning') diễn tả hành động xảy ra và kéo dài trước một mốc thời gian trong quá khứ ('By the time the firefighters arrived')."
        },
        {
          id: 2,
          text: "The government has decided to crack _______ on illegal logging in protected forests.",
          options: ["out", "off", "down", "up"],
          correct: 2,
          explain: "Phrasal verb 'crack down on' = trấn áp, xử lý nghiêm. Các đáp án khác không tạo thành cụm có nghĩa phù hợp."
        },
        {
          id: 3,
          text: "If she _______ harder last semester, she would have received the scholarship.",
          options: ["studies", "has studied", "had studied", "studied"],
          correct: 2,
          explain: "Câu điều kiện loại 3: If + S + had V3/ed, S + would have V3/ed. Diễn tả điều kiện không có thật trong quá khứ."
        },
        {
          id: 4,
          text: "The new regulation requires that every employee _______ a safety training course.",
          options: ["completes", "completing", "completed", "complete"],
          correct: 3,
          explain: "Cấu trúc subjunctive: 'require that + S + V-nguyên thể (bare infinitive)'. Động từ trong mệnh đề that không chia theo ngôi."
        },
        {
          id: 5,
          text: "Despite the heavy rain, the outdoor ceremony was carried _______ as planned.",
          options: ["on", "over", "away", "out"],
          correct: 3,
          explain: "Phrasal verb 'carry out' = thực hiện, tiến hành. 'carry on' = tiếp tục; 'carry away' = mang đi; 'carry over' = chuyển sang."
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
          text: "The <span class=\"underline-error\">number</span> (A) of students who <span class=\"underline-error\">has registered</span> (B) for the course <span class=\"underline-error\">is</span> (C) higher than <span class=\"underline-error\">expected</span> (D).",
          options: ["A. number", "B. has registered", "C. is", "D. expected"],
          correct: 1,
          explain: "'The number of students' là chủ ngữ số nhiều khi xét mệnh đề quan hệ 'who...'. Động từ trong mệnh đề quan hệ phải chia theo 'students' (số nhiều) → 'have registered'."
        },
        {
          id: 7,
          text: "She is one of <span class=\"underline-error\">the most</span> (A) talented (B) <span class=\"underline-error\">singer</span> who <span class=\"underline-error\">has ever</span> (C) performed on this <span class=\"underline-error\">stage</span> (D).",
          options: ["A. the most", "B. singers", "C. has ever", "D. stage"],
          correct: 1,
          explain: "'One of the most + adj + N số nhiều' → phải là 'singers'. Danh từ sau cấu trúc 'one of the + superlative' luôn ở số nhiều."
        },
        {
          id: 8,
          text: "Hardly <span class=\"underline-error\">he had</span> (A) <span class=\"underline-error\">finished</span> (B) his presentation <span class=\"underline-error\">when</span> (C) the power <span class=\"underline-error\">went out</span> (D).",
          options: ["A. he had", "B. finished", "C. when", "D. went out"],
          correct: 0,
          explain: "Cấu trúc đảo ngữ với 'Hardly': 'Hardly + had + S + V3/ed + when + S + V2/ed'. Phải đảo thành 'had he' chứ không phải 'he had'."
        },
        {
          id: 9,
          text: "The teacher suggested <span class=\"underline-error\">that</span> (A) we should <span class=\"underline-error\">to review</span> (B) <span class=\"underline-error\">all</span> (C) the chapters before <span class=\"underline-error\">the exam</span> (D).",
          options: ["A. that", "B. to review", "C. all", "D. the exam"],
          correct: 1,
          explain: "'Suggest that + S + (should) + V-nguyên thể'. Sau 'should' không dùng 'to V' mà phải là V-nguyên thể → 'should review' (bỏ 'to')."
        },
        {
          id: 10,
          text: "The hotel <span class=\"underline-error\">where</span> (A) we stayed <span class=\"underline-error\">at</span> (B) last summer <span class=\"underline-error\">has been</span> (C) <span class=\"underline-error\">renovated</span> (D) recently.",
          options: ["A. where", "B. at", "C. has been", "D. renovated"],
          correct: 1,
          explain: "'Where' = 'in/at which'. Khi dùng 'where' thì không cần giới từ 'at' nữa vì đã bao gồm. Bỏ 'at' hoặc đổi 'where' thành 'which' và giữ 'at'."
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
          text: "\"You should apologize to your sister for what you said,\" my mother told me.",
          options: [
            "My mother asked me whether I would apologize to my sister.",
            "My mother suggested that I apologize to my sister for what I had said.",
            "My mother insisted on apologizing to my sister for what she had said.",
            "My mother told me to say sorry to my sister for what she had said."
          ],
          correct: 1,
          explain: "Câu gốc dùng 'should' mang nghĩa khuyên nhủ → 'suggested that + S + V-nguyên thể'. Lưu ý đổi đại từ 'you' → 'I' và lùi thì 'said' → 'had said'."
        },
        {
          id: 12,
          text: "It is unnecessary for you to bring your laptop to the meeting tomorrow.",
          options: [
            "You needn't bring your laptop to the meeting tomorrow.",
            "You can't bring your laptop to the meeting tomorrow.",
            "You shouldn't bring your laptop to the meeting tomorrow.",
            "You mustn't bring your laptop to the meeting tomorrow."
          ],
          correct: 0,
          explain: "'It is unnecessary' = không cần thiết → 'needn't' (không cần). 'mustn't' = cấm; 'shouldn't' = không nên; 'can't' = không thể."
        },
        {
          id: 13,
          text: "The last time I visited Hanoi was five years ago.",
          options: [
            "I haven't visited Hanoi five years ago.",
            "I have visited Hanoi for five years.",
            "I haven't visited Hanoi for five years.",
            "I didn't visit Hanoi five years ago."
          ],
          correct: 2,
          explain: "'The last time + S + V2/ed + was + time ago' = 'S + haven't/hasn't + V3/ed + for + time'. Diễn tả hành động không xảy ra từ quá khứ đến hiện tại."
        },
        {
          id: 14,
          text: "Without his teacher's encouragement, Tom would not have won the competition.",
          options: [
            "Tom won the competition although his teacher didn't encourage him.",
            "If Tom had been encouraged, he would have won the competition.",
            "If his teacher hadn't encouraged him, Tom would not have won the competition.",
            "His teacher's encouragement made Tom lose the competition."
          ],
          correct: 2,
          explain: "'Without + N' = 'If + S + hadn't + V3/ed' (Câu điều kiện loại 3 - giả định không thật ở quá khứ). Thực tế: thầy giáo đã khuyến khích → Tom đã thắng."
        },
        {
          id: 15,
          text: "People believe that regular exercise improves mental health significantly.",
          options: [
            "Mental health is believed to be improved by exercising regularly significant.",
            "Regular exercise is believing to improve mental health significantly.",
            "It is believed that regular exercise improves mental health significantly.",
            "Regular exercise is believed to have improved mental health significantly."
          ],
          correct: 2,
          explain: "Câu bị động với 'People believe/say/think...': 'It is believed/said/thought + that + S + V'. Cấu trúc giữ nguyên thì của mệnh đề that."
        }
      ]
    },
    {
      id: "part4a",
      name: "Part 4: Reading Comprehension — Passage 1",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "Urban farming is rapidly becoming a key solution to the challenge of feeding growing city populations. Unlike traditional agriculture, which relies on vast stretches of rural land, urban farming makes use of rooftops, abandoned buildings, and small plots of land within cities. This innovative approach not only provides fresh produce to local communities but also reduces the environmental costs associated with transporting food over long distances.",
        "One of the most promising forms of urban farming is vertical farming, where crops are grown in stacked layers inside controlled environments. These indoor farms use LED lighting and hydroponic systems, which allow plants to grow in nutrient-rich water rather than soil. Vertical farms can produce crops year-round, regardless of weather conditions, and they use up to 95% less water than conventional farming methods. Companies such as AeroFarms in the United States and Plenty in Japan have demonstrated that vertical farming can be both productive and commercially viable.",
        "Community gardens represent another popular model of urban farming. In these shared spaces, residents work together to grow fruits, vegetables, and herbs. Beyond providing food, community gardens serve as social hubs where people from different backgrounds come together, share knowledge, and build stronger neighborhoods. Research from the University of Pennsylvania has shown that community gardens can increase nearby property values by up to 9.4% and reduce crime rates in surrounding areas.",
        "However, urban farming faces significant obstacles. The high cost of technology, limited access to suitable land, and the need for specialized knowledge can make it difficult for individuals and organizations to start urban farming projects. Additionally, urban soils are often contaminated with heavy metals and other pollutants, which can pose health risks if crops are grown directly in the ground without proper testing and remediation.",
        "Despite these challenges, governments and private organizations around the world are investing heavily in urban agriculture. Singapore, for instance, aims to produce 30% of its nutritional needs locally by 2030 through a combination of rooftop farms, vertical farms, and coastal fish farms. As cities continue to expand, urban farming will likely play an increasingly vital role in creating sustainable and resilient food systems."
      ],
      questions: [
        {
          id: 16,
          text: "What is the passage mainly about?",
          options: [
            "Why vertical farming is better than community gardens",
            "Urban farming as a solution for city food supply challenges",
            "The history and development of traditional agriculture",
            "The environmental problems caused by modern farming"
          ],
          correct: 1,
          explain: "Bài đọc trình bày tổng quan về urban farming như một giải pháp cung cấp thực phẩm cho các thành phố đang phát triển, bao gồm các hình thức, lợi ích và thách thức."
        },
        {
          id: 17,
          text: "According to paragraph 2, which of the following is TRUE about vertical farming?",
          options: [
            "It uses more water than traditional farming methods.",
            "It can grow crops throughout the year in any weather.",
            "It requires large areas of rural land to operate.",
            "It depends entirely on natural sunlight for crop growth."
          ],
          correct: 1,
          explain: "Đoạn 2 nêu rõ: 'Vertical farms can produce crops year-round, regardless of weather conditions' → có thể trồng quanh năm bất kể thời tiết."
        },
        {
          id: 18,
          text: "The word \"viable\" in paragraph 2 is closest in meaning to _______.",
          options: ["affordable", "popular", "environmental", "practical"],
          correct: 3,
          explain: "'Viable' = khả thi, có thể thực hiện được (practical). Trong ngữ cảnh: 'commercially viable' = có thể thương mại hóa, khả thi về mặt kinh doanh."
        },
        {
          id: 19,
          text: "According to paragraph 3, community gardens can do all of the following EXCEPT _______.",
          options: [
            "bring together people from various backgrounds",
            "increase the value of nearby properties",
            "help reduce crime in surrounding areas",
            "replace supermarkets in urban neighborhoods"
          ],
          correct: 3,
          explain: "Đoạn 3 đề cập: kết nối cộng đồng (A), tăng giá trị bất động sản (B), giảm tội phạm (C). Việc thay thế siêu thị (D) không được đề cập."
        },
        {
          id: 20,
          text: "The word \"remediation\" in paragraph 4 most likely means _______.",
          options: [
            "the method of testing water quality",
            "the act of adding more chemicals to soil",
            "the process of cleaning up contamination",
            "the practice of rotating crops seasonally"
          ],
          correct: 2,
          explain: "'Remediation' = quá trình khắc phục, xử lý ô nhiễm. Ngữ cảnh: đất đô thị thường bị ô nhiễm → cần 'testing and remediation' (kiểm tra và xử lý)."
        },
        {
          id: 21,
          text: "What can be inferred about Singapore from paragraph 5?",
          options: [
            "It is working toward greater food self-sufficiency.",
            "It has already achieved its 2030 food production target.",
            "It currently produces most of its own food domestically.",
            "It relies only on vertical farming for food production."
          ],
          correct: 0,
          explain: "Đoạn 5: Singapore 'aims to produce 30% of its nutritional needs locally by 2030' → đang nỗ lực tăng khả năng tự cung tự cấp lương thực (food self-sufficiency)."
        },
        {
          id: 22,
          text: "Which of the following is NOT mentioned as a challenge for urban farming?",
          options: [
            "Lack of government support worldwide",
            "Soil pollution in urban environments",
            "Limited availability of appropriate land",
            "Expensive technology required for farming"
          ],
          correct: 0,
          explain: "Đoạn 4 nêu: chi phí công nghệ cao (A), đất ô nhiễm (B), thiếu đất phù hợp (D). Đoạn 5 cho thấy chính phủ đang đầu tư → (C) không phải thách thức được nêu."
        },
        {
          id: 23,
          text: "The author's attitude toward urban farming is best described as _______.",
          options: [
            "deeply pessimistic",
            "strongly critical",
            "cautiously optimistic",
            "completely neutral"
          ],
          correct: 2,
          explain: "Tác giả thừa nhận thách thức (đoạn 4) nhưng vẫn nhấn mạnh tiềm năng và sự đầu tư tích cực (đoạn 5) → thái độ 'cautiously optimistic' (lạc quan thận trọng)."
        }
      ]
    },
    {
      id: "part4b",
      name: "Part 4: Reading Comprehension — Passage 2",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "Sleep is often overlooked in discussions about academic success, but research increasingly shows that it is one of the most critical factors affecting students' learning and performance. During sleep, the brain processes and consolidates the information acquired during the day, transforming short-term memories into long-term ones. Without adequate sleep, this process is disrupted, leading to poorer recall and reduced ability to learn new material.",
        "A landmark study conducted by researchers at Harvard Medical School found that students who slept at least seven hours after learning new information performed 20-30% better on memory tests than those who were sleep-deprived. The study also revealed that the quality of sleep matters just as much as the quantity. Deep sleep, also known as slow-wave sleep, is particularly important for memory consolidation, while REM sleep plays a key role in creative problem-solving and emotional regulation.",
        "Unfortunately, many students around the world are chronically sleep-deprived. A survey by the American Academy of Sleep Medicine found that over 70% of high school students get fewer than eight hours of sleep on school nights, well below the recommended 8-10 hours for teenagers. The causes are numerous: heavy homework loads, extracurricular activities, social media use, and early school start times all contribute to shortened sleep duration.",
        "The consequences of sleep deprivation extend beyond academic performance. Sleep-deprived students are more likely to experience anxiety, depression, and difficulty managing emotions. They also have weakened immune systems, making them more susceptible to illness. Furthermore, drowsy driving among sleep-deprived teenagers has been identified as a serious safety concern, with some studies comparing its effects to driving under the influence of alcohol.",
        "In response to these findings, several school districts in the United States have shifted to later start times, with encouraging results. The Seattle School District, for example, moved its start time from 7:50 AM to 8:45 AM and found that students gained an average of 34 minutes of additional sleep, accompanied by improvements in grades and attendance. These changes suggest that relatively simple policy adjustments can have a profound impact on student well-being and achievement."
      ],
      questions: [
        {
          id: 24,
          text: "What is the main idea of the passage?",
          options: [
            "Schools must change their start times to improve student grades.",
            "Harvard Medical School discovered the secret to better learning.",
            "Students should avoid using social media before bedtime.",
            "Sleep plays a crucial role in students' academic success and health."
          ],
          correct: 3,
          explain: "Ý chính xuyên suốt: giấc ngủ là yếu tố quan trọng ảnh hưởng đến học tập và sức khỏe của học sinh. Các đoạn phân tích cơ chế, hậu quả thiếu ngủ và giải pháp."
        },
        {
          id: 25,
          text: "The word \"consolidates\" in paragraph 1 is closest in meaning to _______.",
          options: ["strengthens", "weakens", "removes", "creates"],
          correct: 0,
          explain: "'Consolidate' = củng cố, làm vững chắc (strengthen). Trong ngữ cảnh: não bộ xử lý và củng cố thông tin, biến trí nhớ ngắn hạn thành dài hạn."
        },
        {
          id: 26,
          text: "According to paragraph 2, which type of sleep is most important for memory consolidation?",
          options: ["Light sleep", "Micro-sleep", "REM sleep", "Deep sleep (slow-wave sleep)"],
          correct: 3,
          explain: "Đoạn 2 nêu rõ: 'Deep sleep, also known as slow-wave sleep, is particularly important for memory consolidation' → giấc ngủ sâu quan trọng nhất cho củng cố trí nhớ."
        },
        {
          id: 27,
          text: "In paragraph 3, it is stated that _______.",
          options: [
            "over 70% of high school students do not get enough sleep",
            "teenagers need only 6-7 hours of sleep per night",
            "social media is the only cause of student sleep deprivation",
            "most high school students sleep more than 8 hours"
          ],
          correct: 0,
          explain: "Đoạn 3: 'over 70% of high school students get fewer than eight hours of sleep on school nights, well below the recommended 8-10 hours' → hơn 70% thiếu ngủ."
        },
        {
          id: 28,
          text: "The phrase \"susceptible to\" in paragraph 4 is closest in meaning to _______.",
          options: ["likely to be affected by", "responsible for", "protected from", "unaware of"],
          correct: 0,
          explain: "'Susceptible to' = dễ bị ảnh hưởng bởi, dễ mắc phải (likely to be affected by). Ngữ cảnh: hệ miễn dịch yếu khiến dễ bị bệnh."
        },
        {
          id: 29,
          text: "What was the result of the Seattle School District's decision to start school later?",
          options: [
            "Students slept less but performed better academically.",
            "There was no noticeable change in student performance.",
            "Teachers reported that students became less motivated.",
            "Students gained more sleep, and their grades and attendance improved."
          ],
          correct: 3,
          explain: "Đoạn 5: dời giờ vào học → học sinh ngủ thêm 34 phút + cải thiện điểm số và chuyên cần (improvements in grades and attendance)."
        },
        {
          id: 30,
          text: "It can be inferred from the passage that _______.",
          options: [
            "all schools in the United States have adopted later start times",
            "policy changes at school level can meaningfully support student health",
            "sleep deprivation only affects academic performance, not health",
            "students who sleep more always get the highest grades"
          ],
          correct: 1,
          explain: "Từ kết quả tích cực ở Seattle (đoạn 5), có thể suy luận: thay đổi chính sách ở cấp trường có thể hỗ trợ sức khỏe học sinh một cách có ý nghĩa."
        }
      ]
    }
  ]
};

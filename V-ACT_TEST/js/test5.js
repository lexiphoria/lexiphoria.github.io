const TEST_DATA = {
  title: "V-ACT English Test 5",
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
          text: "The new stadium _______ by the mayor next week.",
          options: ["will open", "will be opened", "is opening", "opens"],
          correct: 1,
          explain: "Câu bị động tương lai đơn: S (vật) + will be + V3/ed. Sân vận động sẽ được khánh thành."
        },
        {
          id: 2,
          text: "You can _______ the word in the dictionary if you don't know its meaning.",
          options: ["look for", "look after", "look up", "look into"],
          correct: 2,
          explain: "Phrasal verb: 'look up' = tra cứu (từ vựng trong từ điển)."
        },
        {
          id: 3,
          text: "The government has introduced strict measures to _______ pollution in the city.",
          options: ["prevent", "avoid", "deny", "refuse"],
          correct: 0,
          explain: "Từ vựng (Vocabulary): 'prevent pollution' = ngăn chặn ô nhiễm."
        },
        {
          id: 4,
          text: "He is the only student _______ passed the difficult entrance exam.",
          options: ["who", "whom", "which", "whose"],
          correct: 0,
          explain: "Đại từ quan hệ thay cho người đóng vai trò chủ ngữ: 'who' (hoặc 'that'). Do có 'the only' nên có thể dùng 'that' hoặc 'who' đều đúng."
        },
        {
          id: 5,
          text: "Neither the manager nor the employees _______ satisfied with the new working hours.",
          options: ["is", "are", "has been", "was"],
          correct: 1,
          explain: "Sự hòa hợp chủ vị: 'Neither S1 nor S2 + V'. Động từ chia theo S2 (the employees - số nhiều) -> 'are'."
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
          text: 'The coffee was <span class="underline-error">too</span> (A) hot <span class="underline-error">for me</span> (B) <span class="underline-error">to drink</span> (C) <span class="underline-error">it</span> (D).',
          options: ["A. too", "B. for me", "C. to drink", "D. it"],
          correct: 3,
          explain: "Cấu trúc 'too...to': S + be + too + adj + (for O) + to V. Chủ ngữ (the coffee) và tân ngữ (it) là một, nên bỏ 'it' ở cuối câu."
        },
        {
          id: 7,
          text: 'If I <span class="underline-error">were</span> (A) you, I <span class="underline-error">will</span> (B) apply <span class="underline-error">for</span> (C) that job <span class="underline-error">immediately</span> (D).',
          options: ["A. were", "B. will", "C. for", "D. immediately"],
          correct: 1,
          explain: "Câu điều kiện loại 2 (If I were you). Vế chính phải dùng 'would' thay vì 'will'."
        },
        {
          id: 8,
          text: 'I <span class="underline-error">haven\'t seen</span> (A) my grandparents <span class="underline-error">since</span> (B) <span class="underline-error">a long time</span> (C), so I miss them <span class="underline-error">terribly</span> (D).',
          options: ["A. haven't seen", "B. since", "C. a long time", "D. terribly"],
          correct: 1,
          explain: "Cụm từ chỉ thời gian: 'a long time' là khoảng thời gian -> dùng 'for', không dùng 'since' (since + mốc thời gian)."
        },
        {
          id: 9,
          text: 'The <span class="underline-error">reason</span> (A) <span class="underline-error">which</span> (B) he was late <span class="underline-error">for work</span> (C) was that his car <span class="underline-error">broke down</span> (D).',
          options: ["A. reason", "B. which", "C. for work", "D. broke down"],
          correct: 1,
          explain: "Trạng từ quan hệ thay cho lý do (The reason) là 'why' hoặc 'for which'. Đổi 'which' thành 'why'."
        },
        {
          id: 10,
          text: 'She is <span class="underline-error">accustomed</span> (A) to <span class="underline-error">work</span> (B) under pressure, so this project <span class="underline-error">won\'t</span> (C) be <span class="underline-error">a problem</span> (D) for her.',
          options: ["A. accustomed", "B. work", "C. won't", "D. a problem"],
          correct: 1,
          explain: "Cấu trúc: 'be accustomed to + V-ing' (quen với việc gì). Đổi 'work' thành 'working'."
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
          text: "What a pity I don't have enough money to buy that car.",
          options: [
            "I wish I have enough money to buy that car.",
            "I wish I had enough money to buy that car.",
            "I wish I didn't have enough money to buy that car.",
            "I wish I had had enough money to buy that car."
          ],
          correct: 1,
          explain: "Câu ước trái ngược hiện tại: S + wish + S + V2/ed. Lùi thì từ 'don't have' -> 'had'."
        },
        {
          id: 12,
          text: "\"Where did you go last night?\" she asked him.",
          options: [
            "She asked him where he went last night.",
            "She asked him where did he go the previous night.",
            "She asked him where he had gone the previous night.",
            "She asked him where had he gone the previous night."
          ],
          correct: 2,
          explain: "Tường thuật câu hỏi Wh-: S + asked + O + Wh- + S + V (không đảo ngữ, lùi thì). 'did go' lùi thành 'had gone', 'last night' -> 'the previous night'."
        },
        {
          id: 13,
          text: "Because of the heavy fog, all flights were cancelled.",
          options: [
            "Because the fog was heavy, all flights were cancelled.",
            "Although the fog was heavy, all flights were cancelled.",
            "Despite the heavy fog, all flights were cancelled.",
            "Because it is heavy fog, all flights were cancelled."
          ],
          correct: 0,
          explain: "Chuyển từ cụm danh từ (Because of + N) sang mệnh đề (Because + S + V). 'Because of the heavy fog' = 'Because the fog was heavy'."
        },
        {
          id: 14,
          text: "Someone has stolen my bike.",
          options: [
            "My bike has stolen by someone.",
            "My bike was stolen.",
            "My bike has been stolen.",
            "My bike had been stolen."
          ],
          correct: 2,
          explain: "Chuyển câu chủ động thì Hiện tại hoàn thành sang bị động: S(O) + have/has been + V3/ed. 'has stolen' -> 'has been stolen'."
        },
        {
          id: 15,
          text: "He didn't hurry, so he missed the train.",
          options: [
            "If he hurried, he wouldn't miss the train.",
            "If he had hurried, he wouldn't have missed the train.",
            "If he didn't hurry, he would miss the train.",
            "If he hadn't hurried, he would have missed the train."
          ],
          correct: 1,
          explain: "Sự thật ở quá khứ, dùng câu điều kiện loại 3 (ngược quá khứ): If S + had V3/ed, S + would have V3/ed."
        }
      ]
    },
    {
      id: "part4a",
      name: "Part 4: Reading Comprehension — Passage 1",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "In recent years, the debate surrounding the impact of social media on teenage mental health has intensified. Platforms like Instagram, TikTok, and Snapchat have become integral parts of adolescents' daily lives. While these networks offer avenues for self-expression, creativity, and staying connected with peers, growing evidence suggests a dark side to this constant digital engagement.",
        "One of the primary concerns is the phenomenon of social comparison. Teenagers frequently view curated, heavily edited images of their peers and influencers, leading to unrealistic standards of beauty and success. This constant upward comparison can foster feelings of inadequacy, low self-esteem, and body image dissatisfaction. When adolescents measure their own \"behind-the-scenes\" lives against the \"highlight reels\" of others, the psychological toll can be severe.",
        "Moreover, the design of these platforms encourages addictive behaviors. Features like infinite scrolling, \"likes,\" and push notifications are engineered to trigger dopamine releases in the brain, keeping users hooked for hours. This excessive screen time often displaces crucial offline activities, most notably sleep. Sleep deprivation is a known risk factor for various mental health issues, including anxiety and depression, creating a vicious cycle that is hard to break.",
        "Cyberbullying is another pervasive issue amplified by social media. The anonymity and physical distance provided by screens can embolden individuals to say cruel things they would likely never say in person. Unlike traditional bullying, which usually stops when the school bell rings, cyberbullying can follow a teenager home, turning what should be a safe haven into a 24/7 source of stress.",
        "Despite these challenges, experts do not necessarily advocate for a complete ban on social media for teens. Instead, they emphasize the importance of digital literacy and parental guidance. Teaching adolescents how to critically evaluate the content they consume, encouraging regular digital detoxes, and fostering open conversations about online experiences are vital steps in helping them navigate the digital world safely."
      ],
      questions: [
        {
          id: 16,
          text: "What is the main topic of the passage?",
          options: [
            "How to become a successful influencer on TikTok.",
            "The benefits of social media for teenage creativity.",
            "The negative impacts of social media on teens and how to manage them.",
            "Why parents should ban their teenagers from using smartphones."
          ],
          correct: 2,
          explain: "Đoạn văn tập trung vào các tác động tiêu cực của mạng xã hội đối với giới trẻ (so sánh xã hội, thiếu ngủ, bắt nạt trên mạng) và đưa ra giải pháp ở đoạn cuối."
        },
        {
          id: 17,
          text: "According to paragraph 2, what causes feelings of inadequacy and low self-esteem among teens?",
          options: [
            "Failing their exams at school.",
            "Comparing their real lives to the edited, perfect images of others online.",
            "Not having enough followers on their social media accounts.",
            "Being ignored by their parents."
          ],
          correct: 1,
          explain: "Đoạn 2: 'Teenagers frequently view curated, heavily edited images... When adolescents measure their own \"behind-the-scenes\" lives against the \"highlight reels\" of others...'"
        },
        {
          id: 18,
          text: 'The phrase "highlight reels" in paragraph 2 most closely means _______.',
          options: [
            "the best, most positive moments people choose to show",
            "videos about sports matches",
            "the mistakes people make in their daily lives",
            "educational documentaries"
          ],
          correct: 0,
          explain: "'Highlight reels' (những thước phim nổi bật) ẩn dụ cho việc người ta chỉ đăng những khoảnh khắc đẹp nhất, hoàn hảo nhất lên mạng."
        },
        {
          id: 19,
          text: "How do features like infinite scrolling and 'likes' affect users according to paragraph 3?",
          options: [
            "They make the apps run faster on older phones.",
            "They help teenagers fall asleep more quickly.",
            "They trigger chemical releases in the brain that encourage addictive behavior.",
            "They force users to log out after a certain time limit."
          ],
          correct: 2,
          explain: "Đoạn 3: 'engineered to trigger dopamine releases in the brain, keeping users hooked for hours'."
        },
        {
          id: 20,
          text: "Why is cyberbullying described as being different from traditional bullying?",
          options: [
            "It only happens to adults, not teenagers.",
            "It only occurs during school hours.",
            "It is usually physical rather than verbal.",
            "It can happen anytime and follow the victim home."
          ],
          correct: 3,
          explain: "Đoạn 4: 'Unlike traditional bullying, which usually stops when the school bell rings, cyberbullying can follow a teenager home... a 24/7 source of stress'."
        },
        {
          id: 21,
          text: 'The word "embolden" in paragraph 4 is closest in meaning to _______.',
          options: [
            "frighten",
            "give someone the courage to do something",
            "punish",
            "apologize"
          ],
          correct: 1,
          explain: "'Embolden' = làm cho bạo dạn hơn, xúi giục (give courage to do something negative here). Sự ẩn danh làm người ta bạo mồm hơn."
        },
        {
          id: 22,
          text: "What do experts recommend in the final paragraph?",
          options: [
            "Banning teens from using all social media platforms.",
            "Teaching digital literacy and having open conversations.",
            "Replacing smartphones with older mobile phones.",
            "Ignoring the problem until the teenager grows up."
          ],
          correct: 1,
          explain: "Đoạn cuối: 'emphasize the importance of digital literacy and parental guidance... fostering open conversations'."
        }
      ]
    },
    {
      id: "part4b",
      name: "Part 4: Reading Comprehension — Passage 2",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "As the world grapples with the escalating threat of climate change, the transition from fossil fuels to renewable energy sources has become an urgent global priority. Among the various forms of green energy, solar and wind power have emerged as the frontrunners in the race to decarbonize our electricity grids. Unlike coal, oil, and natural gas, which release large amounts of greenhouse gases when burned, solar panels and wind turbines generate electricity without emitting carbon dioxide.",
        "Solar energy harnesses the power of the sun using photovoltaic (PV) cells. These cells, typically made of silicon, absorb sunlight and convert it directly into electricity. Over the past decade, the cost of manufacturing solar panels has plummeted, making solar power highly competitive with traditional energy sources. From vast solar farms in deserts to rooftop panels on suburban homes, the scalability of solar energy makes it a versatile solution.",
        "Wind energy, on the other hand, utilizes the kinetic energy of moving air. Large wind turbines, often grouped together in wind farms both onshore and offshore, capture the wind's energy with their massive blades. As the wind turns the blades, it spins a generator to create electricity. Offshore wind farms are particularly promising, as ocean winds are generally stronger and more consistent than those on land.",
        "Despite their rapid growth, integrating solar and wind power into existing energy grids presents challenges. The primary obstacle is intermittency; the sun does not shine at night, and the wind does not always blow. This means that power generation can fluctuate wildly. To solve this, significant advancements in energy storage are required. High-capacity batteries, like large-scale lithium-ion facilities, are being developed to store excess energy produced during peak conditions so it can be released when generation dips."
      ],
      questions: [
        {
          id: 23,
          text: "Why are solar and wind power considered 'green energy' according to paragraph 1?",
          options: [
            "Because the equipment used is painted green.",
            "Because they are only used in rural, grassy areas.",
            "Because they generate electricity without emitting greenhouse gases.",
            "Because they absorb carbon dioxide from the air."
          ],
          correct: 2,
          explain: "Đoạn 1: 'solar panels and wind turbines generate electricity without emitting carbon dioxide'."
        },
        {
          id: 24,
          text: 'The word "plummeted" in paragraph 2 is closest in meaning to _______.',
          options: ["increased slightly", "stayed the same", "decreased rapidly", "become unpredictable"],
          correct: 2,
          explain: "'Plummet' = giảm mạnh, lao dốc (decreased rapidly). Giá thành sản xuất tấm pin mặt trời đã giảm mạnh."
        },
        {
          id: 25,
          text: "How do photovoltaic (PV) cells work?",
          options: [
            "They use the kinetic energy of moving air to spin a generator.",
            "They absorb sunlight and convert it directly into electricity.",
            "They burn silicon to produce heat and electricity.",
            "They store electricity for use during the night."
          ],
          correct: 1,
          explain: "Đoạn 2: 'These cells, typically made of silicon, absorb sunlight and convert it directly into electricity'."
        },
        {
          id: 26,
          text: "According to paragraph 3, why are offshore wind farms considered particularly promising?",
          options: [
            "Because ocean winds are stronger and more consistent than land winds.",
            "Because they are cheaper to build than onshore wind farms.",
            "Because the turbines do not disrupt the view from cities.",
            "Because salt water helps the turbines spin faster."
          ],
          correct: 0,
          explain: "Đoạn 3: 'Offshore wind farms are particularly promising, as ocean winds are generally stronger and more consistent than those on land'."
        },
        {
          id: 27,
          text: "What is the primary obstacle to using solar and wind energy, as mentioned in paragraph 4?",
          options: [
            "They are still far too expensive for most countries.",
            "They cause more pollution than coal and oil.",
            "They are intermittent because weather conditions change.",
            "They require too much land to be practical."
          ],
          correct: 2,
          explain: "Đoạn 4: 'The primary obstacle is intermittency; the sun does not shine at night, and the wind does not always blow'."
        },
        {
          id: 28,
          text: 'The word "intermittency" in paragraph 4 refers to something that _______.',
          options: [
            "is extremely hot",
            "stops and starts irregularly",
            "is highly toxic",
            "lasts forever"
          ],
          correct: 1,
          explain: "'Intermittency' = tính không liên tục, ngắt quãng. (mặt trời không chiếu sáng vào ban đêm, gió không phải lúc nào cũng thổi)."
        },
        {
          id: 29,
          text: "How are scientists proposing to solve the intermittency problem?",
          options: [
            "By building larger wind turbine blades.",
            "By moving all solar panels to space.",
            "By developing high-capacity batteries to store excess energy.",
            "By burning natural gas during the night."
          ],
          correct: 2,
          explain: "Đoạn 4: 'High-capacity batteries... are being developed to store excess energy produced during peak conditions'."
        },
        {
          id: 30,
          text: "What is the overall tone of the passage regarding renewable energy?",
          options: [
            "Pessimistic and doubtful",
            "Informative and optimistic",
            "Angry and critical",
            "Sarcastic and humorous"
          ],
          correct: 1,
          explain: "Giọng văn cung cấp thông tin khoa học (informative) và thể hiện sự lạc quan, hướng giải quyết (optimistic) cho các thách thức."
        }
      ]
    }
  ]
};

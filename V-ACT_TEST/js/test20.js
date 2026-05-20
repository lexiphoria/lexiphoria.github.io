const TEST_DATA = {
  title: "V-ACT English Test 20",
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
          text: "The committee suggested that the regulations _______ updated immediately.",
          options: ["are", "were", "be", "been"],
          correct: 2,
          explain: "Cấu trúc câu giả định với động từ 'suggest': 'S1 + suggest + that + S2 + V (bare)'. Ở thể bị động ta dùng 'be + V3/ed' (be updated)."
        },
        {
          id: 2,
          text: "We had to _______ our trip because my sister fell ill.",
          options: ["call off", "call up", "call on", "call for"],
          correct: 0,
          explain: "Phrasal verb: 'call off' = hủy bỏ. Các cụm khác: 'call up' = gọi đi lính/gọi điện, 'call on' = ghé thăm/yêu cầu, 'call for' = đón ai/yêu cầu."
        },
        {
          id: 3,
          text: "By the time he graduates next year, he _______ at this university for four years.",
          options: ["studies", "will be studying", "will study", "will have studied"],
          correct: 3,
          explain: "Thì Tương lai hoàn thành: diễn tả hành động sẽ được hoàn tất trước một thời điểm/hành động khác trong tương lai ('By the time he graduates next year')."
        },
        {
          id: 4,
          text: "I would rather you _______ make so much noise while I am working.",
          options: ["not", "won't", "don't", "didn't"],
          correct: 3,
          explain: "Cấu trúc giả định 'would rather' trái thực tế ở hiện tại/tương lai: 'S1 + would rather + S2 + V2/ed' (thể phủ định dùng 'didn't')."
        },
        {
          id: 5,
          text: "The number of students attending the seminar _______ higher than expected.",
          options: ["was", "were", "have been", "are"],
          correct: 0,
          explain: "Sự hòa hợp chủ vị: Chủ ngữ 'The number of + N số nhiều' đi với động từ chia số ít (was). Lưu ý: 'A number of + N số nhiều' mới đi với động từ chia số nhiều."
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
          text: "Neither the teacher <span class=\"underline-error\">nor</span> (A) the students <span class=\"underline-error\">was</span> (B) able to solve <span class=\"underline-error\">the complex</span> (C) math problem <span class=\"underline-error\">yesterday</span> (D).",
          options: ["A. nor", "B. was", "C. the complex", "D. yesterday"],
          correct: 1,
          explain: "Sự hòa hợp chủ vị: Với cấu trúc 'Neither N1 nor N2', động từ chia theo danh từ đứng sau (N2). Ở đây 'the students' là số nhiều nên động từ phải chia là 'were'. Sửa 'was' thành 'were'."
        },
        {
          id: 7,
          text: "If they <span class=\"underline-error\">had set</span> (A) off earlier, they <span class=\"underline-error\">would reach</span> (B) the airport <span class=\"underline-error\">on time</span> (C) to catch their <span class=\"underline-error\">flight</span> (D).",
          options: ["A. had set", "B. would reach", "C. on time", "D. flight"],
          correct: 1,
          explain: "Câu điều kiện loại 3: Diễn tả giả định ngược với thực tế quá khứ. Mệnh đề chính phải chia dạng 'would have + V3/ed'. Sửa 'would reach' thành 'would have reached'."
        },
        {
          id: 8,
          text: "It is <span class=\"underline-error\">crucial that</span> (A) she <span class=\"underline-error\">prepares</span> (B) all the necessary <span class=\"underline-error\">documents</span> (C) before the <span class=\"underline-error\">interview</span> (D).",
          options: ["A. crucial that", "B. prepares", "C. documents", "D. interview"],
          correct: 1,
          explain: "Cấu trúc giả định: 'It is crucial that + S + V(bare)'. Động từ ở mệnh đề sau 'that' phải ở dạng nguyên mẫu không chia. Sửa 'prepares' thành 'prepare'."
        },
        {
          id: 9,
          text: "The car <span class=\"underline-error\">who</span> (A) was parked <span class=\"underline-error\">in front of</span> (B) our house <span class=\"underline-error\">belongs to</span> (C) our new <span class=\"underline-error\">neighbor</span> (D).",
          options: ["A. who", "B. in front of", "C. belongs to", "D. neighbor"],
          correct: 0,
          explain: "Đại từ quan hệ: Dùng 'which' hoặc 'that' để thay thế cho danh từ chỉ vật (the car). Sửa 'who' thành 'which' hoặc 'that'."
        },
        {
          id: 10,
          text: "I am <span class=\"underline-error\">extremely interesting</span> (A) in learning <span class=\"underline-error\">how to</span> (B) design websites <span class=\"underline-error\">using</span> (C) HTML and <span class=\"underline-error\">CSS</span> (D).",
          options: ["A. extremely interesting", "B. how to", "C. using", "D. CSS"],
          correct: 0,
          explain: "Tính từ đuôi -ing vs -ed: Để miêu tả cảm giác, trạng thái của con người (I), dùng tính từ đuôi -ed. Sửa 'extremely interesting' thành 'extremely interested'."
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
          text: "It was such a heavy box that he couldn't lift it.",
          options: [
            "It was so heavy box that he couldn't lift it.",
            "The box was too heavy for him to lift it.",
            "The box was so heavy that he couldn't lift it.",
            "The box was heavy enough for him to lift."
          ],
          correct: 2,
          explain: "Cấu trúc tương đương: 'so + adj + that' và 'such + a/an + adj + N + that'."
        },
        {
          id: 12,
          text: "I didn't know you were coming, so I didn't prepare dinner.",
          options: [
            "If I knew you were coming, I would prepare dinner.",
            "If I had known you were coming, I wouldn't prepare dinner.",
            "Had I known you were coming, I wouldn't have prepared dinner.",
            "If I had known you were coming, I would have prepared dinner."
          ],
          correct: 3,
          explain: "Giả định ngược quá khứ dùng câu điều kiện loại 3: 'If + S + had + V3/ed, S + would have + V3/ed'."
        },
        {
          id: 13,
          text: "They are building a new hospital in our town.",
          options: [
            "A new hospital is built in our town.",
            "A new hospital is being built in our town.",
            "A new hospital is building in our town.",
            "A new hospital has been built in our town."
          ],
          correct: 1,
          explain: "Chuyển sang bị động thì Hiện tại tiếp diễn: 'S + am/is/are + being + V3/ed'."
        },
        {
          id: 14,
          text: "I last visited my hometown three years ago.",
          options: [
            "It has been three years since I last have visited my hometown.",
            "The last time I have visited my hometown was three years ago.",
            "I haven't visited my hometown for three years.",
            "I didn't visit my hometown for three years."
          ],
          correct: 2,
          explain: "Chuyển đổi thì: 'S + last + V2 + khoảng thời gian + ago' = 'S + hasn't/haven't + V3 + for + khoảng thời gian'."
        },
        {
          id: 15,
          text: "\"You should not have eaten so much junk food,\" the doctor said to him.",
          options: [
            "The doctor regretted eating too much junk food.",
            "The doctor criticized him for eating too much junk food.",
            "The doctor denied eating too much junk food.",
            "The doctor advised him to eat more junk food."
          ],
          correct: 1,
          explain: "Cấu trúc chỉ trích ai đó vì việc họ đã làm trong quá khứ: 'S + criticize + someone + for + V-ing'. 'should not have + V3/ed' chỉ việc không nên làm trong quá khứ nhưng đã làm."
        }
      ]
    },
    {
      id: "part4a",
      name: "Part 4: Reading Comprehension — Passage 1",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "The retail industry is undergoing a monumental shift, driven by the explosive growth of e-commerce over the past two decades. In the past, shopping traditionally required customers to physically visit brick-and-mortar retail stores, interact with sales assistants, and transport their purchases back home. Today, however, online marketplaces like Amazon, Alibaba, and eBay allow consumers to browse millions of products, compare prices, and make purchases with a single click, all from the comfort of their homes. This convenience, combined with fast shipping and easy return policies, has fundamentally changed consumer expectations and shopping habits.",
        "The rise of online shopping has had a devastating impact on traditional retail. Many famous department stores and shopping malls have witnessed declining foot traffic, leading to widespread store closures, job losses, and corporate bankruptcies. This trend has reshaped urban landscapes, leaving empty buildings in shopping districts and reducing employment opportunities in the retail sector. To survive, brick-and-mortar retailers must adapt. Many are adopting an 'omnichannel' strategy, integrating their physical and digital channels. For instance, customers can order products online and pick them up at a local store, or return their online purchases in person at physical locations.",
        "Furthermore, physical stores are shifting their focus from selling products to creating memorable, interactive brand experiences. By offering in-store events, personalized customer service, and unique interactive showrooms, brick-and-mortar retailers aim to attract customers who still value physical touch and face-to-face interaction. At the same time, e-commerce faces its own set of challenges, including high delivery costs, product returns, and the large carbon footprint associated with packaging and shipping millions of orders daily. The future of retail is unlikely to be entirely digital or entirely physical. Instead, it will be a hybrid model where online convenience and physical experiences coexist, continually transforming how we buy and sell goods. As technology and consumer preferences keep evolving, retailers must remain agile and innovative to capture market share. Ultimately, the consumer stands to benefit from this ongoing evolution."
      ],
      questions: [
        {
          id: 16,
          text: "What is the main idea of the passage?",
          options: [
            "How department stores handle bankruptcies.",
            "The complete dominance of online shopping over physical stores.",
            "The transformation of the retail industry through e-commerce and the rise of hybrid models.",
            "The environmental benefits of package shipping."
          ],
          correct: 2,
          explain: "Bài viết nói về sự trỗi dậy của thương mại điện tử, ảnh hưởng của nó tới bán lẻ truyền thống và xu hướng phát triển mô hình lai (hybrid) trong tương lai."
        },
        {
          id: 17,
          text: "According to paragraph 1, how did shopping work in the past?",
          options: [
            "Products were delivered by drone to their homes.",
            "Customers physically visited brick-and-mortar stores and interacted with sales assistants.",
            "Customers browsed online catalogs on their phones.",
            "Shopping was banned on weekends."
          ],
          correct: 1,
          explain: "Đoạn 1: 'In the past, shopping traditionally required customers to physically visit brick-and-mortar retail stores, interact with sales assistants...'"
        },
        {
          id: 18,
          text: "What is an example of an 'omnichannel' strategy mentioned in paragraph 2?",
          options: [
            "Closing all physical stores to focus on social media sales.",
            "Using only cash for payments.",
            "Banning product returns.",
            "Ordering products online and picking them up at a local store."
          ],
          correct: 3,
          explain: "Đoạn 2: 'integrating their physical and digital channels. For instance, customers can order products online and pick them up at a local store...'"
        },
        {
          id: 19,
          text: "In paragraph 2, the word \"devastating\" is closest in meaning to _______.",
          options: ["temporary", "positive", "unimportant", "highly destructive"],
          correct: 3,
          explain: "'Devastating' = tàn phá, hủy hoại nghiêm trọng (highly destructive)."
        },
        {
          id: 20,
          text: "Why are physical stores shifting their focus to 'experiences' according to paragraph 3?",
          options: [
            "To attract customers who still value physical touch and face-to-face interaction.",
            "Because online marketplaces are too slow.",
            "To reduce their carbon footprint.",
            "Because they want to charge higher entry fees."
          ],
          correct: 0,
          explain: "Đoạn 3: 'brick-and-mortar retailers aim to attract customers who still value physical touch and face-to-face interaction'."
        },
        {
          id: 21,
          text: "The word \"agile\" in paragraph 3 is closest in meaning to _______.",
          options: ["rigid", "expensive", "adaptable", "slow"],
          correct: 2,
          explain: "'Agile' = nhanh nhẹn, linh hoạt, dễ thích ứng (adaptable/quick)."
        },
        {
          id: 22,
          text: "What does e-commerce struggle with according to the passage?",
          options: [
            "High delivery costs, product returns, and environmental carbon footprints.",
            "Low customer demand.",
            "A lack of website design software.",
            "A lack of products to sell."
          ],
          correct: 0,
          explain: "Đoạn 3: 'e-commerce faces its own set of challenges, including high delivery costs, product returns, and the large carbon footprint...'"
        }
      ]
    },
    {
      id: "part4b",
      name: "Part 4: Reading Comprehension — Passage 2",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "Although the ocean covers more than seventy percent of our planet's surface, the deep ocean remains one of the least explored and understood ecological environments on the entire planet. In fact, scientists estimate that we have mapped and explored less than ten percent of the deep ocean floor. Exploring these depths is an extraordinary challenge. The deep sea is characterized by complete darkness, near-freezing temperatures, and immense hydrostatic pressure that would instantly crush a standard commercial submarine. To study these extreme environments, scientists rely on advanced technologies, such as manned submersibles and remotely operated vehicles (ROVs) equipped with cameras and robotic arms.",
        "One of the most remarkable discoveries in deep-sea exploration was the identification of hydrothermal vents. Located along mid-ocean ridges where tectonic plates drift apart, these vents release mineral-rich water heated by magma beneath the Earth's crust, reaching temperatures of over four hundred degrees Celsius. Prior to this groundbreaking discovery, scientists believed that all life forms on Earth relied on sunlight for energy through the process of photosynthesis. However, hydrothermal vent ecosystems thrive in complete darkness. Instead of plants, the biological foundation of these unique ecosystems is chemosynthetic bacteria, which convert toxic chemicals like hydrogen sulfide from the vents into usable energy.",
        "These bacteria support a diverse community of unique organisms, including giant tube worms, blind shrimp, and ghost crabs, many of which are found nowhere else on Earth. The study of these life forms has expanded our understanding of biology and the origins of life on our planet. The systematic study of these exotic life forms has dramatically expanded our understanding of evolutionary biology and the origins of life on our planet. Furthermore, it suggests that life could exist in similar dark, high-pressure environments on other planets, such as beneath the ice of Jupiter's moon Europa. Preserving these fragile ecosystems is crucial as commercial interest in deep-sea mining for valuable minerals increases, threatening to destroy habitats before we can fully study them. As we stand on the threshold of a new era of oceanography, balancing exploration, conservation, and resources will be a key challenge for global leaders."
      ],
      questions: [
        {
          id: 23,
          text: "What is the main idea of the passage?",
          options: [
            "The discovery of Europa, Jupiter's moon.",
            "The geography of the Pacific Ocean.",
            "The challenges of deep-sea exploration, hydrothermal vents, and their biological significance.",
            "How to mine valuable minerals from the ocean floor."
          ],
          correct: 2,
          explain: "Bài viết nói về những thách thức khi khám phá đại dương sâu thẳm, khám phá về các miệng phun thủy nhiệt và ý nghĩa sinh học của chúng."
        },
        {
          id: 24,
          text: "What makes exploring the deep ocean an extraordinary challenge?",
          options: [
            "Complete darkness, near-freezing temperatures, and immense pressure.",
            "The high cost of buying scuba gear.",
            "The lack of marine life.",
            "Strong wind storms on the surface."
          ],
          correct: 0,
          explain: "Đoạn 1: 'The deep sea is characterized by complete darkness, near-freezing temperatures, and immense hydrostatic pressure...'"
        },
        {
          id: 25,
          text: "Where are hydrothermal vents located according to paragraph 2?",
          options: [
            "In freshwater lakes.",
            "In shallow coral reefs.",
            "Along mid-ocean ridges where tectonic plates drift apart.",
            "On the beaches of tropical islands."
          ],
          correct: 2,
          explain: "Đoạn 2: 'Located along mid-ocean ridges where tectonic plates drift apart...'"
        },
        {
          id: 26,
          text: "Before the discovery of hydrothermal vents, what did scientists believe about all life on Earth?",
          options: [
            "It existed only on dry land.",
            "It was created by volcanic activity.",
            "It could not survive under high pressure.",
            "It relied on sunlight for energy through photosynthesis."
          ],
          correct: 3,
          explain: "Đoạn 2: 'Prior to this groundbreaking discovery, scientists believed that all life forms on Earth relied on sunlight for energy through the process of photosynthesis.'"
        },
        {
          id: 27,
          text: "What is the biological foundation of hydrothermal vent ecosystems?",
          options: [
            "Green algae and flowering plants.",
            "Blind shrimp and giant crabs.",
            "Chemosynthetic bacteria that convert toxic chemicals into energy.",
            "Dead whales that fall to the bottom."
          ],
          correct: 2,
          explain: "Đoạn 2: 'Instead of plants, the biological foundation of these unique ecosystems is chemosynthetic bacteria, which convert toxic chemicals...'"
        },
        {
          id: 28,
          text: "How does the study of hydrothermal vents impact astronomy?",
          options: [
            "It helps map the surface of Mars.",
            "It suggests that life could exist in similar dark, high-pressure environments on other planets.",
            "It proves that stars are made of hydrogen sulfide.",
            "It explains the orbits of Jupiter's moons."
          ],
          correct: 1,
          explain: "Đoạn 3: 'it suggests that life could exist in similar dark, high-pressure environments on other planets, such as beneath the ice of Jupiter's moon Europa'."
        },
        {
          id: 29,
          text: "The word \"groundbreaking\" in paragraph 2 is closest in meaning to _______.",
          options: ["soil-damaging", "dangerous", "unimportant", "revolutionary"],
          correct: 3,
          explain: "'Groundbreaking' = đột phá, mang tính cách mạng (revolutionary/highly significant)."
        },
        {
          id: 30,
          text: "Why is preserving these fragile ecosystems crucial?",
          options: [
            "Because they cause volcanic eruptions.",
            "Because they attract too many tourists.",
            "Because they contain fossil fuels.",
            "Because increasing commercial interest in deep-sea mining threatens to destroy them."
          ],
          correct: 3,
          explain: "Đoạn 3: 'Preserving these fragile ecosystems is crucial as commercial interest in deep-sea mining for valuable minerals increases, threatening to destroy habitats...'"
        }
      ]
    }
  ]
};

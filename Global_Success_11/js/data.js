/**
 * Global Success 11 - Full Course Curriculum Data
 * Units 1 to 10 with Comprehensive Vocabulary, Grammar Rules, Reading/Phrases & Quizzes
 */

const GLOBAL_SUCCESS_11_DATA = {
  courseTitle: "Tiếng Anh 11 - Global Success",
  courseSubtitle: "Cổng học tập & bài giảng điện tử toàn diện dành cho học sinh lớp 11",
  units: [
    {
      id: "unit-1",
      number: 1,
      title: "A Long and Healthy Life",
      vietnameseTitle: "Cuộc sống dài lâu và khỏe mạnh",
      theme: "Health, Nutrition, Fitness & Longevity",
      badgeColor: "#10b981",
      icon: "🥗",
      overview: {
        summary: "Unit 1 giúp học sinh khám phá các thói quen lành mạnh, chế độ dinh dưỡng cân đối, cách nâng cao tuổi thọ và phòng chống bệnh tật thông qua chế độ luyện tập thể thao và chăm sóc sức khỏe tinh thần.",
        objectives: [
          "Nắm vững từ vựng về sức khỏe, dinh dưỡng, miễn dịch và lối sống.",
          "Phân biệt thì Quá khứ đơn (Past Simple) và Hiện tại hoàn thành (Present Perfect).",
          "Phân biệt Động từ chỉ trạng thái (Stative verbs) và Động từ chỉ hành động (Action verbs).",
          "Thực hành giao tiếp đưa ra lời khuyên sức khỏe và chỉ dẫn rèn luyện."
        ]
      },
      vocabulary: [
        {
          word: "longevity",
          phonetic: "/lɒnˈdʒevəti/",
          pos: "n",
          meaning: "sự trường thọ, tuổi thọ cao",
          example: "A balanced diet and regular exercise contribute to longevity.",
          collocation: "promote longevity, longevity diet"
        },
        {
          word: "nutrient",
          phonetic: "/ˈnjuːtriənt/",
          pos: "n",
          meaning: "chất dinh dưỡng",
          example: "Fruits and vegetables are packed with essential nutrients.",
          collocation: "essential nutrients, nutrient-rich food"
        },
        {
          word: "immune system",
          phonetic: "/ɪˈmjuːn ˌsɪstəm/",
          pos: "n",
          meaning: "hệ thống miễn dịch",
          example: "Vitamin C helps boost your immune system against infections.",
          collocation: "strengthen/boost the immune system"
        },
        {
          word: "antibiotic",
          phonetic: "/ˌæntibaɪˈɒtɪk/",
          pos: "n",
          meaning: "thuốc kháng sinh",
          example: "Antibiotics are only effective against bacterial infections, not viruses.",
          collocation: "take antibiotics, overuse of antibiotics"
        },
        {
          word: "life expectancy",
          phonetic: "/ˈlaɪf ɪkˌspektənsi/",
          pos: "n",
          meaning: "tuổi thọ trung bình dự tính",
          example: "Advances in medical science have increased average life expectancy.",
          collocation: "increase life expectancy, average life expectancy"
        },
        {
          word: "infectious",
          phonetic: "/ɪnˈfekʃəs/",
          pos: "adj",
          meaning: "truyền nhiễm, lây nhiễm",
          example: "Flu is a highly infectious disease caused by a virus.",
          collocation: "infectious disease, infectious agent"
        },
        {
          word: "work out",
          phonetic: "/wɜːk aʊt/",
          pos: "phr v",
          meaning: "tập luyện thể dục",
          example: "She works out at the gym three times a week.",
          collocation: "work out regularly, fitness workout"
        },
        {
          word: "cut down on",
          phonetic: "/kʌt daʊn ɒn/",
          pos: "phr v",
          meaning: "cắt giảm (tiêu thụ cái gì)",
          example: "You should cut down on fast food and sugary drinks.",
          collocation: "cut down on sugar/fat/calories"
        }
      ],
      grammar: [
        {
          title: "1. Past Simple vs. Present Perfect",
          description: "Phân biệt Thì Quá khứ đơn (hành động đã kết thúc tại thời điểm xác định trong quá khứ) và Hiện tại hoàn thành (hành động xảy ra trong quá khứ kéo dài đến hiện tại hoặc để lại kết quả).",
          structures: [
            "Past Simple: S + V-ed / V2 (dấu hiệu: yesterday, ago, last week, in 2020)",
            "Present Perfect: S + have/has + V3/ed (dấu hiệu: already, yet, just, since, for, so far, recently)"
          ],
          examples: [
            "He suffered from food poisoning last night. (Past Simple - rõ thời gian)",
            "He has suffered from chronic fatigue for three months. (Present Perfect - kéo dài đến nay)"
          ],
          tips: "Nếu có mốc thời gian quá khứ cụ thể ('in 2022', '3 days ago'), luôn dùng Past Simple. Nếu nhấn mạnh trải nghiệm ('ever', 'never', 'so far'), dùng Present Perfect."
        },
        {
          title: "2. Stative Verbs vs. Action Verbs",
          description: "Động từ trạng thái (cảm giác, nhận thức, sở hữu, cảm xúc) thường không chia ở thì tiếp diễn, trong khi động từ hành động có thể chia tiếp diễn.",
          structures: [
            "Stative: see, hear, taste, smell, know, believe, like, love, understand, seem, possess",
            "Lưu ý: Một số từ có 2 nghĩa (VD: 'have', 'taste', 'look', 'think')"
          ],
          examples: [
            "This soup tastes delicious. (Trạng thái: có vị)",
            "The chef is tasting the soup. (Hành động: đang nếm thử)"
          ],
          tips: "Khi các động từ giác quan (taste, smell, look, feel) diễn tả phẩm chất/tính chất của vật thì dùng tính từ và không dùng tiếp diễn (This dish smells good)."
        }
      ],
      readingSpeaking: {
        readingTopic: "Keys to a Healthy Lifestyle",
        keyTakeaway: "A combination of a Mediterranean diet, daily moderate physical activity (150 mins/week), 7-8 hours of sound sleep, and stress management is the gold standard for extending healthy life years.",
        speakingPhrases: [
          { phrase: "If I were you, I would cut down on...", usage: "Đưa ra lời khuyên về thói quen ăn uống" },
          { phrase: "You'd better see a doctor if...", usage: "Cảnh báo và khuyên đi khám bệnh" },
          { phrase: "I highly recommend working out at least...", usage: "Khuyên tập thể dục" }
        ]
      },
      quiz: [
        {
          q: "Nam ______ to the fitness center every morning since he decided to lose weight.",
          options: ["went", "has gone", "is going", "was going"],
          answer: 1,
          explanation: "'Since + S + V(past)' là dấu hiệu nhận biết thì Present Perfect (has gone)."
        },
        {
          q: "Antibiotics are ineffective against viral ______ like the common cold or influenza.",
          options: ["injuries", "infections", "treatments", "diets"],
          answer: 1,
          explanation: "'Viral infections' nghĩa là bệnh nhiễm trùng do virus gây ra."
        },
        {
          q: "This vegetable soup ______ very fresh and aromatic.",
          options: ["is tasting", "tastes", "has tasted", "was tasting"],
          answer: 1,
          explanation: "'Taste' ở đây là động từ trạng thái (chỉ tính chất món súp có vị thế nào), không dùng thì tiếp diễn."
        },
        {
          q: "Average ______ has increased significantly due to advances in medicine and clean water supply.",
          options: ["life expectancy", "lifeguard", "lifestyle", "lifetime"],
          answer: 0,
          explanation: "'Life expectancy' có nghĩa là tuổi thọ trung bình dự tính."
        }
      ]
    },
    {
      id: "unit-2",
      number: 2,
      title: "The Generation Gap",
      vietnameseTitle: "Khoảng cách thế hệ",
      theme: "Family Values, Generational Conflicts & Harmony",
      badgeColor: "#8b5cf6",
      icon: "👨‍👩‍👧‍👦",
      overview: {
        summary: "Unit 2 đào sâu về mối quan hệ giữa các thế hệ trong gia đình (Baby Boomers, Gen X, Millennials, Gen Z, Gen Alpha), sự khác biệt trong tư duy, lối sống và các biện pháp thu hẹp bất đồng thế hệ.",
        objectives: [
          "Mở rộng vốn từ vựng về cấu trúc gia đình, quan điểm sống và xung đột thế hệ.",
          "Thành thạo các Động từ khuyết thiếu (Modal Verbs): must, have to, should, ought to, mustn't, don't have to.",
          "Biết cách bày tỏ ý kiến, tranh luận hòa nhã và chia sẻ quan điểm cá nhân."
        ]
      },
      vocabulary: [
        {
          word: "generation gap",
          phonetic: "/ˌdʒen.əˈreɪ.ʃən ˌɡæp/",
          pos: "n",
          meaning: "khoảng cách thế hệ",
          example: "Open communication is the best way to bridge the generation gap.",
          collocation: "bridge the generation gap, suffer from generation gap"
        },
        {
          word: "nuclear family",
          phonetic: "/ˌnjuːkliə ˈfæməli/",
          pos: "n",
          meaning: "gia đình hạt nhân (bố mẹ và con cái)",
          example: "Nuclear families are becoming more prevalent in modern urban areas.",
          collocation: "live in a nuclear family"
        },
        {
          word: "extended family",
          phonetic: "/ɪkˌstendɪd ˈfæməli/",
          pos: "n",
          meaning: "gia đình nhiều thế hệ (tam/tứ đại đồng đường)",
          example: "In an extended family, grandparents often help raise the grandchildren.",
          collocation: "multi-generational extended family"
        },
        {
          word: "curfew",
          phonetic: "/ˈkɜːfjuː/",
          pos: "n",
          meaning: "giờ giới nghiêm (quy định giờ về nhà)",
          example: "My parents set a strict curfew of 9:30 PM on school nights.",
          collocation: "impose a curfew, break a curfew, strict curfew"
        },
        {
          word: "open-minded",
          phonetic: "/ˌəʊpən ˈmaɪndɪd/",
          pos: "adj",
          meaning: "cởi mở, tiếp thu cái mới",
          example: "Her parents are quite open-minded about her career choice.",
          collocation: "open-minded attitude, open-minded parents"
        },
        {
          word: "conservative",
          phonetic: "/kənˈsɜːvətɪv/",
          pos: "adj",
          meaning: "bảo thủ, theo lối truyền thống",
          example: "Older generations can sometimes hold more conservative views on marriage.",
          collocation: "conservative view/mindset"
        },
        {
          word: "conflict",
          phonetic: "/ˈkɒnflɪkt/",
          pos: "n, v",
          meaning: "xung đột, bất đồng ý kiến",
          example: "Conflicts often arise when parents and teens disagree on screen time.",
          collocation: "resolve a conflict, come into conflict with"
        },
        {
          word: "table manners",
          phonetic: "/ˈteɪbl ˌmænəz/",
          pos: "n",
          meaning: "phép tắc/văn hóa ứng xử trên bàn ăn",
          example: "Good table manners are highly valued in Vietnamese traditional dinners.",
          collocation: "proper table manners, practice table manners"
        }
      ],
      grammar: [
        {
          title: "Modal Verbs: Must, Have to, Should, Ought to",
          description: "Các trợ động từ khuyết thiếu diễn tả bổn phận, trách nhiệm, lời khuyên và điều cấm đoán.",
          structures: [
            "Must + V-inf: Bổn phận chủ quan do người nói tự thấy cần thiết (Internal obligation)",
            "Have to + V-inf: Bổn phận khách quan do luật pháp/quy định ép buộc (External obligation)",
            "Should / Ought to + V-inf: Lời khuyên, việc nên làm (Advice / Recommendation)",
            "Mustn't + V-inf: Cấm đoán tuyệt đối (Prohibition)",
            "Don't / Doesn't have to + V-inf: Không bắt buộc (Lack of obligation)"
          ],
          examples: [
            "You mustn't stay out after curfew without telling your parents. (Cấm đoán)",
            "You don't have to wear uniforms on Saturdays. (Không bắt buộc)",
            "Teens should talk openly with their parents about stress. (Lời khuyên)"
          ],
          tips: "Phân biệt kỹ: 'Mustn't' = KHÔNG ĐƯỢC PHÉP; còn 'Don't have to' = KHÔNG CẦN THIẾT PHẢI LÀM (tùy ý lựa chọn)."
        }
      ],
      readingSpeaking: {
        readingTopic: "Overcoming Generational Differences",
        keyTakeaway: "Empathy, active listening, and respecting personal boundaries are fundamental to bridging viewpoints between Generation Z and older generations.",
        speakingPhrases: [
          { phrase: "From my perspective, teenagers need...", usage: "Trình bày góc nhìn cá nhân" },
          { phrase: "I understand your point, but don't you think...", usage: "Phản biện lịch sự khi thảo luận" },
          { phrase: "Parents and children ought to compromise by...", usage: "Đề xuất giải pháp thỏa hiệp" }
        ]
      },
      quiz: [
        {
          q: "Students ______ use mobile phones during the national examination. It is strictly prohibited.",
          options: ["don't have to", "mustn't", "shouldn't", "needn't"],
          answer: 1,
          explanation: "Vì bị cấm tuyệt đối (strictly prohibited) nên dùng 'mustn't'."
        },
        {
          q: "Tomorrow is Sunday, so we ______ wake up early.",
          options: ["mustn't", "don't have to", "ought to", "must"],
          answer: 1,
          explanation: "'Don't have to' chỉ sự không cần thiết (chủ nhật không bắt buộc phải dậy sớm)."
        },
        {
          q: "My grandfather grew up in a(n) ______ family with three generations living under one roof.",
          options: ["nuclear", "extended", "single-parent", "blended"],
          answer: 1,
          explanation: "'Extended family' là gia đình nhiều thế hệ sống chung một mái nhà."
        },
        {
          q: "You look exhausted from studying. You ______ take a short break right now.",
          options: ["mustn't", "should", "don't have to", "have to not"],
          answer: 1,
          explanation: "'Should' dùng để đưa ra lời khuyên thân mật và hợp lý."
        }
      ]
    },
    {
      id: "unit-3",
      number: 3,
      title: "Cities of the Future",
      vietnameseTitle: "Các thành phố của tương lai",
      theme: "Smart Cities, Urban Planning, AI, Green Technology",
      badgeColor: "#06b6d4",
      icon: "🏙️",
      overview: {
        summary: "Unit 3 đưa người học đến với bức tranh tương lai của các đô thị thông minh: cảm biến IoT, trí tuệ nhân tạo, năng lượng tái tạo, tòa nhà sinh thái và phương tiện giao thông tự hành.",
        objectives: [
          "Nắm bắt thuật ngữ đô thị thông minh, hạ tầng xanh và công nghệ hiện đại.",
          "Sử dụng Động từ trạng thái ở dạng tiếp diễn (Stative verbs in continuous forms with changed meaning).",
          "Sử dụng Động từ nối (Linking verbs: seem, appear, sound, look, become, feel) kết hợp cùng Tính từ."
        ]
      },
      vocabulary: [
        {
          word: "smart city",
          phonetic: "/ˌsmɑːt ˈsɪti/",
          pos: "n",
          meaning: "thành phố thông minh (ứng dụng công nghệ dữ liệu)",
          example: "Smart cities utilize IoT sensors to manage traffic flow efficiently.",
          collocation: "develop a smart city, smart city infrastructure"
        },
        {
          word: "sustainable",
          phonetic: "/səˈsteɪnəbl/",
          pos: "adj",
          meaning: "bền vững, thân thiện với môi trường",
          example: "Solar panels and rainwater harvesting enable sustainable urban living.",
          collocation: "sustainable development, sustainable energy"
        },
        {
          word: "infrastructure",
          phonetic: "/ˈɪnfrəstrʌktʃə(r)/",
          pos: "n",
          meaning: "cơ sở hạ tầng",
          example: "Upgrading transport infrastructure is vital for smart metropolitan growth.",
          collocation: "modern infrastructure, transport infrastructure"
        },
        {
          word: "pedestrian",
          phonetic: "/pəˈdestriən/",
          pos: "n, adj",
          meaning: "người đi bộ; dành cho người đi bộ",
          example: "The city center has been turned into a pedestrian zone.",
          collocation: "pedestrian zone, pedestrian safety"
        },
        {
          word: "sensor",
          phonetic: "/ˈsensə(r)/",
          pos: "n",
          meaning: "thiết bị cảm biến",
          example: "Smart streetlights have sensors that turn on only when vehicles approach.",
          collocation: "install sensors, optical sensor"
        },
        {
          word: "urban planner",
          phonetic: "/ˈɜːbən ˈplænə(r)/",
          pos: "n",
          meaning: "nhà quy hoạch đô thị",
          example: "Urban planners are designing vertical gardens on skyscraper walls.",
          collocation: "role of urban planners"
        },
        {
          word: "livable",
          phonetic: "/ˈlɪvəbl/",
          pos: "adj",
          meaning: "đáng sống, tiện nghi",
          example: "Clean air and abundant green spaces make Vienna one of the most livable cities.",
          collocation: "most livable city, livable environment"
        },
        {
          word: "renewable energy",
          phonetic: "/rɪˈnjuːəbl ˈenədʒi/",
          pos: "n",
          meaning: "năng lượng tái tạo (gió, mặt trời)",
          example: "Future cities will run almost 100% on renewable energy.",
          collocation: "rely on renewable energy"
        }
      ],
      grammar: [
        {
          title: "1. Linking Verbs + Adjectives",
          description: "Động từ nối kết nối chủ ngữ với một tính từ mô tả trạng thái (không đi với trạng từ).",
          structures: [
            "S + Linking Verb (look, seem, sound, taste, smell, feel, become, stay, remain) + Adjective"
          ],
          examples: [
            "The future city looks impressive. (Không dùng: looks impressively)",
            "The air quality has become fresher with the expansion of parks."
          ],
          tips: "Hãy phân biệt: 'She looks tired' (Linking verb + adj) vs. 'She looked carefully at the map' (Action verb + adv)."
        },
        {
          title: "2. Stative Verbs in Progressive/Continuous Tenses",
          description: "Một số động từ trạng thái có thể dùng thì tiếp diễn khi mang nghĩa hành động tạm thời.",
          structures: [
            "Think: 'I think it's true' (opinion) vs 'I am thinking about the plan' (mental process)",
            "Have: 'He has a car' (possession) vs 'He is having lunch' (eating action)",
            "See: 'I see what you mean' (understand) vs 'I am seeing the architect tomorrow' (meeting)"
          ],
          examples: [
            "Urban planners are thinking of installing AI-driven transit lines.",
            "The mayor is having a crucial meeting with green tech investors."
          ],
          tips: "Khi động từ diễn tả hành động đang diễn ra trong tâm trí hoặc lịch hẹn cụ thể, có thể chia tiếp diễn."
        }
      ],
      readingSpeaking: {
        readingTopic: "Eco-skyscrapers & Self-driving Public Transport",
        keyTakeaway: "Future cities will minimize carbon emissions by combining vertical farming, zero-energy buildings, and AI traffic dispatchers.",
        speakingPhrases: [
          { phrase: "In my opinion, the most exciting feature of smart cities is...", usage: "Bày tỏ điểm ấn tượng nhất" },
          { phrase: "It sounds plausible that autonomous cars will...", usage: "Dự đoán tính khả thi của công nghệ" },
          { phrase: "To make our city more livable, we ought to...", usage: "Đề xuất ý kiến cải thiện đô thị" }
        ]
      },
      quiz: [
        {
          q: "The newly designed eco-friendly apartment building looks very ______.",
          options: ["modern", "modernly", "modernity", "modernize"],
          answer: 0,
          explanation: "Sau linking verb 'look' ta cần một tính từ (modern)."
        },
        {
          q: "Quiet, please! The city council ______ the proposed high-speed train route.",
          options: ["is considering", "considers", "has considered", "consider"],
          answer: 0,
          explanation: "'Consider' ở đây mang nghĩa hành động 'đang xem xét thảo luận', nên dùng thì tiếp diễn (is considering)."
        },
        {
          q: "Urban areas should install more ______ to monitor air pollution and traffic jams in real time.",
          options: ["sensors", "pavements", "curfews", "antibiotics"],
          answer: 0,
          explanation: "'Sensors' (cảm biến) được sử dụng để theo dõi ô nhiễm và giao thông thời gian thực."
        },
        {
          q: "The city's public transport system became ______ after the introduction of electric buses.",
          options: ["more efficient", "more efficiently", "efficientness", "most efficiently"],
          answer: 0,
          explanation: "Sau linking verb 'became' dùng tính từ (more efficient)."
        }
      ]
    },
    {
      id: "unit-4",
      number: 4,
      title: "ASEAN and Viet Nam",
      vietnameseTitle: "ASEAN và Việt Nam",
      theme: "Regional Cooperation, Cultural Diversity & Youth Exchange",
      badgeColor: "#f59e0b",
      icon: "🌏",
      overview: {
        summary: "Unit 4 giới thiệu Hiệp hội các Quốc gia Đông Nam Á (ASEAN), vai trò và đóng góp tích cực của Việt Nam kể từ khi gia nhập năm 1995, cùng các chương trình giao lưu văn hóa và phát triển thanh niên.",
        objectives: [
          "Làm giàu vốn từ vựng về hợp tác quốc tế, các quốc gia thành viên và sự kiện ASEAN.",
          "Thành thạo Danh động từ (Gerunds: V-ing) đóng vai trò làm Chủ ngữ (Subject) và Tân ngữ (Object).",
          "Nắm bắt cách chào hỏi ngoại giao, giới thiệu sự kiện và văn hóa khu vực."
        ]
      },
      vocabulary: [
        {
          word: "charter",
          phonetic: "/ˈtʃɑːtə(r)/",
          pos: "n",
          meaning: "hiến chương, văn kiện chính thức",
          example: "The ASEAN Charter entered into force in December 2008.",
          collocation: "ASEAN Charter, sign a charter"
        },
        {
          word: "solidarity",
          phonetic: "/ˌsɒlɪˈdærəti/",
          pos: "n",
          meaning: "tình đoàn kết, sự gắn kết",
          example: "Member nations emphasize regional solidarity and mutual respect.",
          collocation: "show solidarity with, ASEAN solidarity"
        },
        {
          word: "scholarship",
          phonetic: "/ˈskɒləʃɪp/",
          pos: "n",
          meaning: "học bổng",
          example: "Many Vietnamese students have received ASEAN Youth Scholarships.",
          collocation: "award a scholarship, win a scholarship"
        },
        {
          word: "bloc",
          phonetic: "/blɒk/",
          pos: "n",
          meaning: "khối (quốc gia, liên minh chính trị/kinh tế)",
          example: "The 10-member regional bloc aims to foster economic integration.",
          collocation: "regional bloc, trading bloc"
        },
        {
          word: "integration",
          phonetic: "/ˌɪntɪˈɡreɪʃn/",
          pos: "n",
          meaning: "sự hội nhập, sự hòa nhập",
          example: "Viet Nam has played a key role in regional economic integration.",
          collocation: "economic integration, cultural integration"
        },
        {
          word: "participate in",
          phonetic: "/pɑːˈtɪsɪpeɪt ɪn/",
          pos: "v",
          meaning: "tham gia vào",
          example: "Delegates from all member states participate in the annual summit.",
          collocation: "actively participate in"
        },
        {
          word: "volunteer",
          phonetic: "/ˌvɒlənˈtɪə(r)/",
          pos: "n, v",
          meaning: "tình nguyện viên; làm việc thiện nguyện",
          example: "Youth volunteers help organize cultural festivals across Southeast Asia.",
          collocation: "volunteer work, volunteer program"
        },
        {
          word: "diversity",
          phonetic: "/daɪˈvɜːsəti/",
          pos: "n",
          meaning: "sự đa dạng phong phú",
          example: "ASEAN celebrates unity in diversity among its member cultures.",
          collocation: "cultural diversity, biological diversity"
        }
      ],
      grammar: [
        {
          title: "Gerunds (V-ing) as Subjects and Objects",
          description: "Danh động từ (V-ing) hoạt động như danh từ trong câu, có thể làm chủ ngữ hoặc tân ngữ sau động từ / giới từ.",
          structures: [
            "Gerund as Subject: V-ing + V(singular) -> 'Learning English opens doors to ASEAN.'",
            "Gerund as Object of Verbs: enjoy, consider, avoid, practice, suggest, recommend + V-ing",
            "Gerund after Prepositions: be interested in, succeed in, look forward to, contribute to + V-ing"
          ],
          examples: [
            "Participating in the ASEAN Youth Forum gives teenagers leadership skills.",
            "They look forward to welcoming youth representatives to Ha Noi."
          ],
          tips: "Cần phân biệt rõ: 'look forward to + V-ing' (to ở đây là giới từ, không phải to-infinitive)."
        }
      ],
      readingSpeaking: {
        readingTopic: "Viet Nam's 30-Year Journey with ASEAN",
        keyTakeaway: "Since joining in 1995, Viet Nam has served as an active, responsible, and proactive partner, bridging mainland and maritime Southeast Asian nations.",
        speakingPhrases: [
          { phrase: "I would like to introduce the culture of...", usage: "Giới thiệu văn hóa quốc gia" },
          { phrase: "Joining youth exchange programs allows us to...", usage: "Trình bày lợi ích giao lưu giới trẻ" },
          { phrase: "We are proud of contributing to...", usage: "Thể hiện niềm tự hào cống hiến" }
        ]
      },
      quiz: [
        {
          q: "______ in international volunteer programs helps students broaden their horizons.",
          options: ["Participate", "Participating", "Participated", "To participate in"],
          answer: 1,
          explanation: "Danh động từ (Participating) đứng đầu câu làm Chủ ngữ số ít."
        },
        {
          q: "Viet Nam succeeded in ______ the 37th ASEAN Summit online despite pandemic disruptions.",
          options: ["to organize", "organizing", "organize", "organized"],
          answer: 1,
          explanation: "Sau giới từ 'in' (succeed in) cần dùng V-ing (organizing)."
        },
        {
          q: "The motto of ASEAN is 'One Vision, One Identity, One ______'.",
          options: ["Community", "Generation", "Nutrient", "Pedestrian"],
          answer: 0,
          explanation: "Khẩu hiệu chính thức của ASEAN là: 'One Vision, One Identity, One Community'."
        },
        {
          q: "Young ambassadors look forward to ______ other delegates at the conference.",
          options: ["meet", "meeting", "met", "to meet"],
          answer: 1,
          explanation: "Cấu trúc 'look forward to + V-ing' (meeting)."
        }
      ]
    },
    {
      id: "unit-5",
      number: 5,
      title: "Global Warming",
      vietnameseTitle: "Sự nóng lên toàn cầu",
      theme: "Climate Crisis, Greenhouse Gases & Carbon Footprint",
      badgeColor: "#ef4444",
      icon: "🔥",
      overview: {
        summary: "Unit 5 phân tích nguyên nhân cốt lõi của biến đổi khí hậu, hiệu ứng nhà kính, hiện tượng nước biển dâng, sự tuyệt chủng của các loài và các hành động cấp bách nhằm giảm phát thải carbon.",
        objectives: [
          "Mở rộng vốn thuật ngữ khoa học môi trường, hiệu ứng nhà kính và dấu chân carbon.",
          "Thành thạo Mệnh đề phân từ Hiện tại (Present Participle Clauses: V-ing) và Quá khứ (Past Participle Clauses: V-ed/V3).",
          "Thực hành tranh biện và thuyết trình về các giải pháp bảo vệ hành tinh xanh."
        ]
      },
      vocabulary: [
        {
          word: "greenhouse gas",
          phonetic: "/ˈɡriːnhaʊs ɡæs/",
          pos: "n",
          meaning: "khí nhà kính (CO2, Methane, N2O)",
          example: "Burning fossil fuels releases massive amounts of greenhouse gases.",
          collocation: "greenhouse gas emissions, emit greenhouse gases"
        },
        {
          word: "carbon footprint",
          phonetic: "/ˌkɑːbən ˈfʊtprɪnt/",
          pos: "n",
          meaning: "dấu chân carbon (lượng khí thải một cá nhân/tổ chức tạo ra)",
          example: "You can reduce your carbon footprint by cycling instead of driving.",
          collocation: "reduce/lower one's carbon footprint"
        },
        {
          word: "deforestation",
          phonetic: "/diːˌfɒrɪˈsteɪʃn/",
          pos: "n",
          meaning: "nạn phá rừng",
          example: "Deforestation in tropical rainforests accelerates global warming.",
          collocation: "prevent deforestation, illegal deforestation"
        },
        {
          word: "fossil fuel",
          phonetic: "/ˈfɒsl fjuːəl/",
          pos: "n",
          meaning: "nhiên liệu hóa thạch (than đá, dầu mỏ, khí đốt)",
          example: "Transitioning away from fossil fuels is crucial for our planet.",
          collocation: "burn fossil fuels, reliance on fossil fuels"
        },
        {
          word: "catastrophic",
          phonetic: "/ˌkætəˈstrɒfɪk/",
          pos: "adj",
          meaning: "thảm khốc, tai họa nghiêm trọng",
          example: "Extreme heatwaves can cause catastrophic damage to agriculture.",
          collocation: "catastrophic impact/consequence"
        },
        {
          word: "absorb",
          phonetic: "/əbˈzɔːb/",
          pos: "v",
          meaning: "hấp thụ, hút vào",
          example: "Oceans and forests absorb roughly half of human carbon emissions.",
          collocation: "absorb carbon dioxide/heat"
        },
        {
          word: "sea level rise",
          phonetic: "/siː ˈlevl raɪz/",
          pos: "n",
          meaning: "mực nước biển dâng cao",
          example: "Sea level rise threatens low-lying delta regions in Viet Nam.",
          collocation: "face severe sea level rise"
        },
        {
          word: "drought",
          phonetic: "/draʊt/",
          pos: "n",
          meaning: "hạn hán",
          example: "Severe droughts have caused acute water shortages in the river basin.",
          collocation: "prolonged drought, severe drought"
        }
      ],
      grammar: [
        {
          title: "Present & Past Participle Clauses",
          description: "Mệnh đề phân từ giúp rút gọn câu có cùng chủ ngữ, làm cho văn phong súc tích và trang trọng hơn.",
          structures: [
            "Present Participle (V-ing): Rút gọn mệnh đề chủ động, nguyên nhân hoặc thời gian đồng thời.",
            "Past Participle (V-ed/V3): Rút gọn mệnh đề bị động.",
            "Perfect Participle (Having + V3/ed): Nhấn mạnh hành động đã hoàn tất trước một hành động khác."
          ],
          examples: [
            "Causing severe droughts, rising temperatures affect crop yields. (= Because they cause...)",
            "Burnt in factories, coal produces thick smog. (= When it is burnt...)",
            "Having chopped down the trees, the loggers abandoned the land."
          ],
          tips: "Quy tắc vàng: Mệnh đề phân từ chỉ được dùng khi hai mệnh đề CÙNG CHỦ NGỮ."
        }
      ],
      readingSpeaking: {
        readingTopic: "The 1.5°C Climate Threshold",
        keyTakeaway: "Limiting planetary warming to 1.5°C above pre-industrial levels requires halving net greenhouse gas emissions by 2030 and reaching Net Zero by 2050.",
        speakingPhrases: [
          { phrase: "The primary driver of global warming is...", usage: "Nêu nguyên nhân hàng đầu" },
          { phrase: "Unless we take swift collective action, we will face...", usage: "Cảnh báo hậu quả nếu không hành động" },
          { phrase: "Switching to renewable energy can drastically...", usage: "Đề xuất giải pháp năng lượng" }
        ]
      },
      quiz: [
        {
          q: "______ in high quantities, methane traps significantly more heat than carbon dioxide.",
          options: ["Emitted", "Emitting", "Having emit", "Emit"],
          answer: 0,
          explanation: "Khí metan được thải ra (bị động) nên dùng Quá khứ phân từ 'Emitted'."
        },
        {
          q: "______ through the atmosphere, solar radiation warms the Earth's surface.",
          options: ["Pass", "Passed", "Passing", "Having passed by"],
          answer: 2,
          explanation: "Bức xạ mặt trời tự đi qua khí quyển (chủ động) nên dùng Hiện tại phân từ 'Passing'."
        },
        {
          q: "Individuals can diminish their ______ by turning off unused electronic appliances.",
          options: ["life expectancy", "carbon footprint", "charter", "infrastructure"],
          answer: 1,
          explanation: "'Reduce/diminish carbon footprint' là giảm lượng khí thải nhà kính cá nhân."
        },
        {
          q: "Having ______ their environmental review, the factory installed modern smoke filters.",
          options: ["complete", "completed", "completing", "to complete"],
          answer: 1,
          explanation: "Cấu trúc Perfect Participle: 'Having completed'."
        }
      ]
    },
    {
      id: "unit-6",
      number: 6,
      title: "Preserving Our Heritage",
      vietnameseTitle: "Bảo tồn di sản của chúng ta",
      theme: "World Heritage Sites, Folk Arts & Cultural Preservation",
      badgeColor: "#d97706",
      icon: "🏛️",
      overview: {
        summary: "Unit 6 tôn vinh các di sản văn hóa vật thể (vịnh Hạ Long, quần thể di tích Cố đô Huế, Hoàng thành Thăng Long) và phi vật thể (Quan họ Bắc Ninh, Đờn ca tài tử, Ca trù) cùng trách nhiệm bảo tồn của thế hệ trẻ.",
        objectives: [
          "Học từ vựng chuyên ngành về di sản văn hóa, khảo cổ, trùng tu và nghệ thuật dân gian.",
          "Sử dụng Mệnh đề To-infinitive (To-infinitive clauses) để rút gọn mệnh đề quan hệ sau the first, the only, the best, số thứ tự và so sánh nhất.",
          "Thuyết minh và giới thiệu một điểm đến di sản thế giới tại Việt Nam."
        ]
      },
      vocabulary: [
        {
          word: "heritage",
          phonetic: "/ˈherɪtɪdʒ/",
          pos: "n",
          meaning: "di sản (văn hóa, tự nhiên, lịch sử)",
          example: "Hoi An Ancient Town is recognized as a UNESCO World Cultural Heritage site.",
          collocation: "cultural heritage, natural heritage, preserve heritage"
        },
        {
          word: "tangible",
          phonetic: "/ˈtændʒəbl/",
          pos: "adj",
          meaning: "hữu hình, vật thể (di sản vật thể)",
          example: "Monuments, ancient pagodas, and Citadel complexes are tangible heritage.",
          collocation: "tangible cultural heritage"
        },
        {
          word: "intangible",
          phonetic: "/ɪnˈtændʒəbl/",
          pos: "adj",
          meaning: "phi vật thể (nhã nhạc, ca trù, phong tục tập quán)",
          example: "Folk singing traditions are precious intangible treasures.",
          collocation: "intangible heritage, oral traditions"
        },
        {
          word: "restore",
          phonetic: "/rɪˈstɔː(r)/",
          pos: "v",
          meaning: "trùng tu, phục hồi nguyên trạng",
          example: "Architects are working carefully to restore the ancient wooden gates.",
          collocation: "restore a monument, restoration project"
        },
        {
          word: "preserve",
          phonetic: "/prɪˈzɜːv/",
          pos: "v",
          meaning: "bảo tồn, giữ gìn nguyên vẹn",
          example: "Strict regulations are imposed to preserve the marine biodiversity of Ha Long Bay.",
          collocation: "preserve cultural identity, heritage preservation"
        },
        {
          word: "monument",
          phonetic: "/ˈmɒnjumənt/",
          pos: "n",
          meaning: "đài kỷ niệm, công trình di tích lịch sử",
          example: "The Complex of Hue Monuments holds tremendous architectural value.",
          collocation: "historical monument, ancient monument"
        },
        {
          word: "archaeological",
          phonetic: "/ˌɑːkiəˈlɒdʒɪkl/",
          pos: "adj",
          meaning: "thuộc khảo cổ học",
          example: "Archaeological excavations at the Thang Long Imperial Citadel revealed rare royal artifacts.",
          collocation: "archaeological excavation, archaeological site"
        },
        {
          word: "folk",
          phonetic: "/fəʊk/",
          pos: "adj, n",
          meaning: "dân gian, truyền thống bình dân",
          example: "Quan Ho folk songs were inscribed on the UNESCO intangible heritage list in 2009.",
          collocation: "folk music, folk art, folk culture"
        }
      ],
      grammar: [
        {
          title: "To-infinitive Clauses to Replace Relative Clauses",
          description: "Rút gọn mệnh đề quan hệ bằng cụm 'to V' hoặc 'to be V3/ed' khi danh từ đứng trước đi kèm the first, the last, the next, the only, hoặc so sánh nhất.",
          structures: [
            "Active: S + the first/second/last/only/superlative + Noun + TO + V-inf",
            "Passive: S + the first/second/last/only/superlative + Noun + TO BE + V3/ed"
          ],
          examples: [
            "Ha Long Bay was the first site in Viet Nam to be recognized by UNESCO. (= that was recognized)",
            "Professor Tran was the first person to propose this heritage restoration scheme. (= who proposed)"
          ],
          tips: "Nếu mang nghĩa chủ động -> 'to V'. Nếu mang nghĩa bị động -> 'to be V3/ed'."
        }
      ],
      readingSpeaking: {
        readingTopic: "Trang An Scenic Landscape Complex: Mixed World Heritage",
        keyTakeaway: "Trang An is Southeast Asia's first dual World Heritage property recognized for both outstanding cultural history and geological karst beauty.",
        speakingPhrases: [
          { phrase: "Today, I am privileged to present the history of...", usage: "Mở đầu bài thuyết trình di sản" },
          { phrase: "What makes this ancient monument extraordinary is...", usage: "Nhấn mạnh nét đặc sắc" },
          { phrase: "Young generations can contribute to heritage preservation by...", usage: "Nêu giải pháp bảo tồn" }
        ]
      },
      quiz: [
        {
          q: "Yuri Gagarin was the first human ______ into outer space.",
          options: ["traveling", "to travel", "traveled", "who travel"],
          answer: 1,
          explanation: "Sau 'the first + danh từ' dùng To-infinitive (to travel) để rút gọn mệnh đề quan hệ."
        },
        {
          q: "Quan Ho singing is a famous form of Vietnamese ______ cultural heritage.",
          options: ["tangible", "intangible", "catastrophic", "infectious"],
          answer: 1,
          explanation: "Quan họ là loại hình di sản văn hóa phi vật thể (intangible)."
        },
        {
          q: "The Citadel of the Ho Dynasty is the only stone fortress in Southeast Asia ______ intact.",
          options: ["to remain", "remaining", "remained", "to be remained"],
          answer: 0,
          explanation: "Sau 'the only + noun' dùng to-infinitive (to remain)."
        },
        {
          q: "Local authorities are raising funds to ______ historical wooden bridges damaged by seasonal floods.",
          options: ["restore", "deplete", "cut down on", "emit"],
          answer: 0,
          explanation: "'Restore' nghĩa là tu bổ, phục dựng di tích bị hư hỏng."
        }
      ]
    },
    {
      id: "unit-7",
      number: 7,
      title: "Education Options for School-Leavers",
      vietnameseTitle: "Lựa chọn giáo dục cho học sinh tốt nghiệp",
      theme: "Higher Education, Vocational Training, Apprenticeships & Gap Year",
      badgeColor: "#0284c7",
      icon: "🎓",
      overview: {
        summary: "Unit 7 cung cấp cái nhìn định hướng nghề nghiệp đa dạng cho học sinh sau THPT: Đại học (Higher education), Học nghề thực hành (Vocational training), Học nghề có lương (Apprenticeships) hoặc Kỳ nghỉ gap-year.",
        objectives: [
          "Nắm vững từ vựng về hệ thống bằng cấp, hướng nghiệp, học phí và kỹ năng mềm.",
          "Thành thạo Danh động từ hoàn thành (Perfect Gerunds: Having + V3/ed) và Phân từ hoàn thành (Perfect Participles).",
          "Thực hành viết đơn xin học bổng và phỏng vấn tư vấn định hướng ngành học."
        ]
      },
      vocabulary: [
        {
          word: "vocational",
          phonetic: "/vəʊˈkeɪʃənl/",
          pos: "adj",
          meaning: "thuộc hướng nghiệp, dạy nghề",
          example: "Vocational schools offer hands-on training tailored to real industry demands.",
          collocation: "vocational school, vocational training"
        },
        {
          word: "apprenticeship",
          phonetic: "/əˈprentɪsʃɪp/",
          pos: "n",
          meaning: "sự học việc, thời gian vừa học vừa làm có lương",
          example: "He completed a two-year apprenticeship with an engineering firm.",
          collocation: "serve an apprenticeship, apprenticeship program"
        },
        {
          word: "higher education",
          phonetic: "/ˌhaɪər edʒuˈkeɪʃn/",
          pos: "n",
          meaning: "giáo dục đại học / sau phổ thông",
          example: "Pursuing higher education opens opportunities for specialized research roles.",
          collocation: "higher education institutions, enter higher education"
        },
        {
          word: "tuition fee",
          phonetic: "/tjuːˈɪʃn fiː/",
          pos: "n",
          meaning: "học phí",
          example: "Some technical colleges offer low tuition fees and high job placement rates.",
          collocation: "pay tuition fees, afford tuition fees"
        },
        {
          word: "qualification",
          phonetic: "/ˌkwɒlɪfɪˈkeɪʃn/",
          pos: "n",
          meaning: "bằng cấp, chứng chỉ trình độ chuyên môn",
          example: "Formal qualifications combined with soft skills make graduates attractive to employers.",
          collocation: "gain qualifications, academic qualifications"
        },
        {
          word: "gap year",
          phonetic: "/ˈɡæp jɪə(r)/",
          pos: "n",
          meaning: "năm nghỉ ngơi / trải nghiệm thực tế trước khi vào đại học",
          example: "Taking a gap year helped her discover her true passion for graphic design.",
          collocation: "take a gap year, gap year experience"
        },
        {
          word: "hands-on",
          phonetic: "/ˌhændz ˈɒn/",
          pos: "adj",
          meaning: "thực hành thực tế, làm việc trực tiếp",
          example: "Apprentices gain invaluable hands-on experience in automotive repairs.",
          collocation: "hands-on experience, hands-on training"
        },
        {
          word: "scholarship",
          phonetic: "/ˈskɒləʃɪp/",
          pos: "n",
          meaning: "học bổng",
          example: "She was awarded a full scholarship based on her academic excellence.",
          collocation: "full scholarship, scholarship criteria"
        }
      ],
      grammar: [
        {
          title: "Perfect Gerunds & Perfect Participle Clauses",
          description: "Dùng để nhấn mạnh một hành động đã hoàn tất trước một thời điểm hoặc hành động khác trong quá khứ.",
          structures: [
            "Perfect Gerund: Having + V3/ed (đóng vai trò làm danh từ sau động từ/giới từ như admit, regret, deny, apologize for)",
            "Perfect Participle: Having + V3/ed + ..., S + V (mệnh đề phân từ chỉ nguyên nhân/thời gian trước)"
          ],
          examples: [
            "He admitted having forged the certificate. (Hành động làm giả xảy ra trước lúc thú nhận)",
            "Having completed his culinary diploma, Minh immediately landed a chef position at a luxury hotel."
          ],
          tips: "Nếu muốn nhấn mạnh thứ tự trước-sau rõ ràng, dùng Perfect form (Having + V3) thay vì dạng V-ing đơn thuần."
        }
      ],
      readingSpeaking: {
        readingTopic: "University vs. Vocational Training: Which Path Fits You?",
        keyTakeaway: "While universities provide broad academic theories, vocational pathways offer accelerated entry into high-paying technical trades with lower student debt.",
        speakingPhrases: [
          { phrase: "I am weighing between applying for university and...", usage: "Bày tỏ sự cân nhắc định hướng" },
          { phrase: "An apprenticeship appeals to me because...", usage: "Giải thích lý do chọn học nghề" },
          { phrase: "In terms of future career prospects, this path...", usage: "Đánh giá triển vọng nghề nghiệp" }
        ]
      },
      quiz: [
        {
          q: "______ his high school diploma with honors, Minh received offers from three prestigious universities.",
          options: ["Having received", "Receive", "Received", "To receive"],
          answer: 0,
          explanation: "Perfect Participle 'Having received' diễn tả hành động nhận bằng tốt nghiệp đã xảy ra trước khi nhận giấy mời nhập học."
        },
        {
          q: "The applicant denied ______ false information on her resume.",
          options: ["to provide", "having provided", "provide", "provided"],
          answer: 1,
          explanation: "'Deny + having V3/ed' (Phủ nhận việc đã từng cung cấp thông tin sai trước đó)."
        },
        {
          q: "Students who prefer practical, ______ skills often choose vocational training instead of university.",
          options: ["hands-on", "infectious", "tangible", "conservative"],
          answer: 0,
          explanation: "'Hands-on skills' nghĩa là kỹ năng thực hành, tay nghề trực tiếp."
        },
        {
          q: "Many students work part-time to help cover their university ______.",
          options: ["curfew", "tuition fees", "charters", "solidarity"],
          answer: 1,
          explanation: "'Tuition fees' là tiền học phí."
        }
      ]
    },
    {
      id: "unit-8",
      number: 8,
      title: "Becoming Independent",
      vietnameseTitle: "Trở nên tự lập",
      theme: "Life Skills, Self-Reliance, Time Management & Financial Literacy",
      badgeColor: "#ec4899",
      icon: "🧭",
      overview: {
        summary: "Unit 8 trang bị cho bạn trẻ các kỹ năng sống thiết yếu để bước vào cuộc sống tự lập: quản lý thời gian, chi tiêu tài chính, nấu ăn, tự giải quyết vấn đề và vượt qua áp lực tâm lý.",
        objectives: [
          "Học các từ vựng về tính tự lập, kỹ năng sinh tồn, quản lý chi tiêu và đối phó thử thách.",
          "Thành thạo Câu chẻ nhấn mạnh (Cleft Sentences với 'It is / It was ... that / who').",
          "Thực hành tranh luận về độ tuổi nên dọn ra ở riêng và phương pháp sống tự lập."
        ]
      },
      vocabulary: [
        {
          word: "independent",
          phonetic: "/ˌɪndɪˈpendənt/",
          pos: "adj",
          meaning: "tự lập, độc lập, không dựa dẫm",
          example: "Learning how to budget money helps teenagers become financially independent.",
          collocation: "become independent, highly independent"
        },
        {
          word: "self-reliance",
          phonetic: "/ˌself rɪˈlaɪəns/",
          pos: "n",
          meaning: "sự tự lực cánh sinh, khả năng tự lực",
          example: "Living away from home builds resilient self-reliance in young adults.",
          collocation: "develop self-reliance, foster self-reliance"
        },
        {
          word: "time management",
          phonetic: "/ˈtaɪm ˌmænɪdʒmənt/",
          pos: "n",
          meaning: "kỹ năng quản lý thời gian",
          example: "Good time management prevents cramming before important examinations.",
          collocation: "master time management, time management skills"
        },
        {
          word: "budget",
          phonetic: "/ˈbʌdʒɪt/",
          pos: "n, v",
          meaning: "ngân sách; lập kế hoạch chi tiêu",
          example: "She creates a weekly budget to avoid overspending on non-essentials.",
          collocation: "stick to a budget, monthly budget"
        },
        {
          word: "interpersonal skill",
          phonetic: "/ˌɪntəˈpɜːsənl skɪl/",
          pos: "n",
          meaning: "kỹ năng giao tiếp và ứng xử giữa người với người",
          example: "Strong interpersonal skills are essential for collaborating in team projects.",
          collocation: "excellent interpersonal skills"
        },
        {
          word: "cope with",
          phonetic: "/kəʊp wɪð/",
          pos: "phr v",
          meaning: "đối phó, vượt qua (khó khăn, áp lực)",
          example: "Counselors teach teenagers effective strategies to cope with stress.",
          collocation: "cope with stress/loneliness/workload"
        },
        {
          word: "responsible",
          phonetic: "/rɪˈspɒnsəbl/",
          pos: "adj",
          meaning: "có tinh thần trách nhiệm",
          example: "Being responsible means taking accountability for your own mistakes.",
          collocation: "responsible for, feel responsible"
        },
        {
          word: "decision-making",
          phonetic: "/dɪˈsɪʒn ˌmeɪkɪŋ/",
          pos: "n",
          meaning: "kỹ năng ra quyết định",
          example: "Independent life requires critical thinking and decisive decision-making.",
          collocation: "decision-making process, sound decision-making"
        }
      ],
      grammar: [
        {
          title: "Cleft Sentences with 'It is / It was ... that / who'",
          description: "Câu chẻ được dùng để nhấn mạnh một thành phần cụ thể trong câu (chủ ngữ, tân ngữ hoặc trạng ngữ).",
          structures: [
            "Nhấn mạnh Chủ ngữ (Subject): It is/was + Subject + THAT/WHO + V + O",
            "Nhấn mạnh Tân ngữ (Object): It is/was + Object + THAT/WHOM + S + V",
            "Nhấn mạnh Trạng ngữ (Adverbial): It is/was + Adverbial + THAT + S + V + O"
          ],
          examples: [
            "It was my mother who taught me how to cook. (Nhấn mạnh chủ ngữ)",
            "It is time management skills that teenagers need most when entering college. (Nhấn mạnh tân ngữ)",
            "It was in Ha Noi that she learned to live independently. (Nhấn mạnh nơi chốn)"
          ],
          tips: "Với người làm chủ ngữ, có thể dùng 'who' hoặc 'that'. Với mọi trường hợp khác (vật, tân ngữ, trạng từ nơi chốn/thời gian), luôn dùng 'that'."
        }
      ],
      readingSpeaking: {
        readingTopic: "The Essential Survival Toolkit for Freshmen",
        keyTakeaway: "Mastering meal prep, basic housekeeping, personal finance, and emotional resilience empowers young people to thrive when living on their own.",
        speakingPhrases: [
          { phrase: "It is crucial for high school students to learn...", usage: "Nhấn mạnh tầm quan trọng của kỹ năng" },
          { phrase: "To become truly independent, one should start by...", usage: "Đưa ra lời khuyên bước đầu tự lập" },
          { phrase: "When faced with financial constraints, I usually...", usage: "Chia sẻ kinh nghiệm quản lý tiền bạc" }
        ]
      },
      quiz: [
        {
          q: "It was my elder brother ______ encouraged me to apply for the overseas exchange scholarship.",
          options: ["who", "which", "whom", "where"],
          answer: 0,
          explanation: "Câu chẻ nhấn mạnh chủ ngữ chỉ người (my elder brother) dùng 'who' (hoặc 'that')."
        },
        {
          q: "It was ______ 2024 that Lan decided to start her own online baking business.",
          options: ["in", "at", "on", "when"],
          answer: 0,
          explanation: "Cấu trúc câu chẻ nhấn mạnh trạng ngữ thời gian: 'It was in 2024 that...'."
        },
        {
          q: "Developing strong ______ helps students manage conflicts and build lasting friendships.",
          options: ["interpersonal skills", "greenhouse gases", "tuition fees", "curfews"],
          answer: 0,
          explanation: "'Interpersonal skills' là kỹ năng giao tiếp ứng xử xã hội."
        },
        {
          q: "Living alone requires great ______, as no one will remind you to study or wake up.",
          options: ["self-reliance", "catastrophe", "charter", "antibiotic"],
          answer: 0,
          explanation: "'Self-reliance' là khả năng tự lực và tự chịu trách nhiệm về cuộc sống của mình."
        }
      ]
    },
    {
      id: "unit-9",
      number: 9,
      title: "Social Issues",
      vietnameseTitle: "Các vấn đề xã hội",
      theme: "Bullying, Peer Pressure, Poverty & Cybercrime",
      badgeColor: "#84cc16",
      icon: "📢",
      overview: {
        summary: "Unit 9 thảo luận thẳng thắn về các vấn đề nhức nhối trong xã hội hiện đại: bạo lực học đường, bắt nạt trên không gian mạng (cyberbullying), áp lực bạn bè đồng trang lứa, phân hóa giàu nghèo và tội phạm công nghệ cao.",
        objectives: [
          "Mở rộng hệ thống từ vựng về các vấn nạn xã hội, quyền con người và luật pháp.",
          "Sử dụng Từ nối và Cụm liên kết câu (Linking words and phrases: Although, In spite of, Moreover, However, Consequently, As a result).",
          "Thực hành thuyết trình giải pháp phòng chống bạo lực và nâng cao nhận thức cộng đồng."
        ]
      },
      vocabulary: [
        {
          word: "bullying",
          phonetic: "/ˈbʊliɪŋ/",
          pos: "n",
          meaning: "nạn bắt nạt, đe dọa (tại trường học hoặc công sở)",
          example: "Schools must adopt a zero-tolerance policy towards all forms of bullying.",
          collocation: "school bullying, stop bullying"
        },
        {
          word: "cyberbullying",
          phonetic: "/ˈsaɪbəbʊliɪŋ/",
          pos: "n",
          meaning: "bắt nạt trực tuyến / trên mạng xã hội",
          example: "Victims of cyberbullying often suffer from severe anxiety and depression.",
          collocation: "combat cyberbullying, victim of cyberbullying"
        },
        {
          word: "peer pressure",
          phonetic: "/ˈpɪə ˌpreʃə(r)/",
          pos: "n",
          meaning: "áp lực từ bạn bè đồng trang lứa",
          example: "Teenagers sometimes pick up unhealthy habits due to intense peer pressure.",
          collocation: "succumb to peer pressure, resist peer pressure"
        },
        {
          word: "poverty",
          phonetic: "/ˈpɒvəti/",
          pos: "n",
          meaning: "sự nghèo đói, cảnh nghèo khó",
          example: "Quality education is the most powerful weapon to eradicate generational poverty.",
          collocation: "live in extreme poverty, alleviate poverty"
        },
        {
          word: "crime",
          phonetic: "/kraɪm/",
          pos: "n",
          meaning: "tội phạm, hành vi phạm tội",
          example: "Cybercrime involving identity theft has surged in recent years.",
          collocation: "commit a crime, fight crime, juvenile crime"
        },
        {
          word: "awareness",
          phonetic: "/əˈweənəs/",
          pos: "n",
          meaning: "nhận thức, sự hiểu biết",
          example: "The campaign aims to raise public awareness about mental health struggles.",
          collocation: "raise awareness of, environmental awareness"
        },
        {
          word: "campaign",
          phonetic: "/kæmˈpeɪn/",
          pos: "n",
          meaning: "chiến dịch (tuyên truyền, vận động xã hội)",
          example: "Students launched an anti-bullying campaign called 'Be Kind Online'.",
          collocation: "launch a campaign, awareness campaign"
        },
        {
          word: "offensive",
          phonetic: "/əˈfensɪv/",
          pos: "adj",
          meaning: "xúc phạm, công kích, khiếm nhã",
          example: "Posting offensive comments online can result in account suspension.",
          collocation: "offensive language, offensive remarks"
        }
      ],
      grammar: [
        {
          title: "Linking Words and Phrases (Từ nối diễn đạt liên kết)",
          description: "Các từ nối tạo nên tính mạch lạc và logic giữa các ý trong đoạn văn hoặc bài diễn thuyết.",
          structures: [
            "Chỉ sự tương phản (Contrast): Although / Even though + Clause; Despite / In spite of + Noun / V-ing; However, Nevertheless + Clause",
            "Chỉ kết quả (Result): Therefore, Consequently, As a result, As a consequence + Clause",
            "Chỉ sự bổ sung (Addition): In addition, Furthermore, Moreover, Besides + Clause"
          ],
          examples: [
            "In spite of experiencing cyberbullying, she bravely reported the perpetrators to the authorities.",
            "Peer pressure is widespread; however, teenagers can learn to say 'no' assertively."
          ],
          tips: "'Although + Mệnh đề (S + V)', trong khi 'In spite of / Despite + Danh từ / V-ing'. Sau However / Therefore ở đầu câu phải có dấu phẩy (,)."
        }
      ],
      readingSpeaking: {
        readingTopic: "Standing Up to Cyberbullying: A Digital Safety Guide",
        keyTakeaway: "Never retaliate against online trolls; instead, take screenshots as evidence, block the offenders, and report the behavior to parents, teachers, and platform admins.",
        speakingPhrases: [
          { phrase: "One of the most alarming social issues today is...", usage: "Mở đầu nêu vấn nạn xã hội" },
          { phrase: "In order to curb school violence, we must...", usage: "Đề xuất giải pháp triệt để" },
          { phrase: "It is imperative that parents and educators cooperate to...", usage: "Kêu gọi sự chung tay giáo dục" }
        ]
      },
      quiz: [
        {
          q: "______ experiencing severe peer pressure, he remained committed to his core values.",
          options: ["Although", "Despite", "Because of", "However"],
          answer: 1,
          explanation: "Sau 'Despite' đi kèm với danh động từ / cụm danh từ ('experiencing severe peer pressure'). 'Although' cần đi với mệnh đề."
        },
        {
          q: "Many teenagers fall victim to ______, where mean rumors are spread anonymously on social media.",
          options: ["cyberbullying", "infrastructure", "longevity", "charter"],
          answer: 0,
          explanation: "'Cyberbullying' là hành vi bôi nhọ, tung tin đồn và bắt nạt trên mạng xã hội."
        },
        {
          q: "The youth club launched a new initiative; ______, they received extensive community backing.",
          options: ["moreover", "as a result", "despite", "although"],
          answer: 1,
          explanation: "'As a result' (kết quả là) biểu thị hệ quả logic sau dấu chấm phẩy và trước dấu phẩy."
        },
        {
          q: "We need to raise public ______ about the dangers of sharing personal data with strangers.",
          options: ["awareness", "gap", "curfew", "solidarity"],
          answer: 0,
          explanation: "Cụm 'raise public awareness about...' nghĩa là nâng cao nhận thức cộng đồng về điều gì."
        }
      ]
    },
    {
      id: "unit-10",
      number: 10,
      title: "The Ecosystem",
      vietnameseTitle: "Hệ sinh thái",
      theme: "Biodiversity, Natural Habitats, Conservation & Wildlife Protection",
      badgeColor: "#14b8a6",
      icon: "🌿",
      overview: {
        summary: "Unit 10 khép lại chương trình với chủ đề Hệ sinh thái và đa dạng sinh học: chuỗi thức ăn, bảo tồn các loài động thực vật quý hiếm trước nguy cơ tuyệt chủng, vườn quốc gia và hành lang sinh thái.",
        objectives: [
          "Nắm vững các thuật ngữ sinh thái học, chuỗi thức ăn, khu bảo tồn và đa dạng sinh học.",
          "Thành thạo cấu tạo và cách sử dụng Danh từ ghép (Compound Nouns: N+N, Adj+N, V-ing+N, Phrasal Nouns).",
          "Thực hiện bài thuyết trình kêu gọi bảo vệ động vật hoang dã tại Việt Nam."
        ]
      },
      vocabulary: [
        {
          word: "ecosystem",
          phonetic: "/ˈiːkəʊsɪstəm/",
          pos: "n",
          meaning: "hệ sinh thái (quần thể sinh vật và môi trường sống)",
          example: "Coral reefs support one of the most biodiverse ecosystems on Earth.",
          collocation: "fragile ecosystem, marine ecosystem"
        },
        {
          word: "biodiversity",
          phonetic: "/ˌbaɪəʊdaɪˈvɜːsəti/",
          pos: "n",
          meaning: "sự đa dạng sinh học",
          example: "Cuc Phuong National Park is renowned for its rich tropical biodiversity.",
          collocation: "loss of biodiversity, preserve biodiversity"
        },
        {
          word: "habitat",
          phonetic: "/ˈhæbɪtæt/",
          pos: "n",
          meaning: "môi trường sống tự nhiên của sinh vật",
          example: "Deforestation destroys the natural habitats of endangered primates.",
          collocation: "natural habitat, loss of habitat, habitat destruction"
        },
        {
          word: "endangered species",
          phonetic: "/ɪnˌdeɪndʒəd ˈspiːʃiːz/",
          pos: "n",
          meaning: "các loài có nguy cơ tuyệt chủng",
          example: "The Saola is one of the world's most critically endangered species.",
          collocation: "protect endangered species, list of endangered species"
        },
        {
          word: "conservation",
          phonetic: "/ˌkɒnsəˈveɪʃn/",
          pos: "n",
          meaning: "sự bảo tồn (tự nhiên, động vật hoang dã)",
          example: "Wildlife conservation centers nurse injured pangolins before releasing them.",
          collocation: "wildlife conservation, conservation project"
        },
        {
          word: "food chain",
          phonetic: "/ˈfuːd tʃeɪn/",
          pos: "n",
          meaning: "chuỗi thức ăn",
          example: "Apex predators play a vital role in maintaining balance across the food chain.",
          collocation: "top of the food chain, disrupt the food chain"
        },
        {
          word: "poaching",
          phonetic: "/ˈpəʊtʃɪŋ/",
          pos: "n",
          meaning: "nạn săn bắt trộm thú rừng trái phép",
          example: "Strict anti-poaching patrols guard the rhino sanctuary day and night.",
          collocation: "illegal poaching, anti-poaching measures"
        },
        {
          word: "restore",
          phonetic: "/rɪˈstɔː(r)/",
          pos: "v",
          meaning: "khôi phục, tái tạo (hệ sinh thái rừng/biển)",
          example: "Mangrove replanting programs help restore coastal flood buffers.",
          collocation: "restore natural balance"
        }
      ],
      grammar: [
        {
          title: "Compound Nouns (Danh từ ghép)",
          description: "Danh từ ghép được tạo thành từ việc kết hợp hai hoặc nhiều từ lại với nhau để mang một ý nghĩa mới độc lập.",
          structures: [
            "Noun + Noun: climate change, rain forest, coral reef, food chain",
            "Adjective + Noun: national park, green house, wildlife",
            "Verb-ing + Noun: living standard, breeding ground, washing machine",
            "Noun + Verb-ing: bird-watching, sunbathing",
            "Verb + Preposition: drawback, breakout, cutoff"
          ],
          examples: [
            "Deforestation has caused the destruction of the tropical rain forest.",
            "The national park was established to protect endangered primates."
          ],
          tips: "Trọng âm của danh từ ghép thường rơi vào TỪ ĐẦU TIÊN (VD: 'RAIN forest, 'NATional park)."
        }
      ],
      readingSpeaking: {
        readingTopic: "Protecting Viet Nam's Endemic Primates: The Delacour's Langur",
        keyTakeaway: "Community-based conservation and anti-poaching snare removal have rescued the critically endangered Delacour's Langur in Van Long Wetland Nature Reserve.",
        speakingPhrases: [
          { phrase: "Every organism plays an irreplaceable role in...", usage: "Nêu vai trò mắt xích sinh thái" },
          { phrase: "The primary threat facing wildlife in this region is...", usage: "Nêu mối đe dọa với động vật hoang dã" },
          { phrase: "We must strictly penalize illegal poaching and...", usage: "Đề xuất chế tài xử lý săn bắt trộm" }
        ]
      },
      quiz: [
        {
          q: "Cutting down mangrove forests severely damages the delicate coastal ______.",
          options: ["ecosystem", "charter", "curfew", "antibiotic"],
          answer: 0,
          explanation: "'Coastal ecosystem' là hệ sinh thái ven biển."
        },
        {
          q: "The word 'rainforest' is a compound noun formed by combining a ______ and a ______.",
          options: ["noun + noun", "adjective + noun", "verb + preposition", "adverb + noun"],
          answer: 0,
          explanation: "'Rain' (danh từ) + 'forest' (danh từ) tạo thành danh từ ghép 'rainforest'."
        },
        {
          q: "Many species are pushed to the brink of ______ because of extensive habitat destruction.",
          options: ["extinction", "infrastructure", "longevity", "diversity"],
          answer: 0,
          explanation: "'Pushed to the brink of extinction' nghĩa là bị đẩy đến bờ vực tuyệt chủng."
        },
        {
          q: "National parks enforce strict penalties against illegal ______ of rare animals.",
          options: ["poaching", "solidarity", "budget", "pedestrian"],
          answer: 0,
          explanation: "'Poaching' là nạn săn bắt trộm động vật hoang dã trái phép."
        }
      ]
    }
  ]
};

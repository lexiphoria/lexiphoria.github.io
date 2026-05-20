const TEST_DATA = {
  title: "V-ACT English Test 19",
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
          text: "The new tax policy was heavily criticized _______ its negative impact on low-income families.",
          options: ["although", "because", "despite", "because of"],
          correct: 3,
          explain: "Giới từ chỉ nguyên nhân: 'because of' + cụm danh từ (its negative impact...)."
        },
        {
          id: 2,
          text: "He spoke English so quickly that I could hardly _______ what he was saying.",
          options: ["make out", "make up", "make over", "make for"],
          correct: 0,
          explain: "Phrasal verb: 'make out' = hiểu/nghe rõ. Các cụm khác: 'make up' = trang điểm/bịa chuyện, 'make for' = đi về phía, 'make over' = cải tạo/chuyển nhượng."
        },
        {
          id: 3,
          text: "By next September, they _______ in this house for exactly twenty years.",
          options: ["are living", "will have lived", "will be living", "will live"],
          correct: 1,
          explain: "Thì Tương lai hoàn thành: diễn tả hành động sẽ hoàn thành trước một thời điểm xác định trong tương lai ('by next September')."
        },
        {
          id: 4,
          text: "I'd rather you _______ tell anyone what I just told you.",
          options: ["don't", "didn't", "won't", "not"],
          correct: 1,
          explain: "Cấu trúc giả định 'would rather' cho hiện tại/tương lai: 'S1 + would rather + S2 + V2/ed' (ở thể phủ định dùng 'didn't')."
        },
        {
          id: 5,
          text: "The police _______ investigating the bank robbery that took place last night.",
          options: ["was", "is", "are", "has been"],
          correct: 2,
          explain: "Sự hòa hợp chủ vị: Danh từ 'police' (cảnh sát) luôn được coi là danh từ tập hợp số nhiều và đi với động từ số nhiều ('are')."
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
          text: "Unless we <span class=\"underline-error\">don't protect</span> (A) the environment, future generations <span class=\"underline-error\">will suffer</span> (B) from the <span class=\"underline-error\">severe consequences</span> (C) of climate <span class=\"underline-error\">change</span> (D).",
          options: ["A. don't protect", "B. will suffer", "C. severe consequences", "D. change"],
          correct: 0,
          explain: "Liên từ: 'Unless' đã mang nghĩa phủ định ('nếu không'), nên động từ trong mệnh đề 'Unless' không dùng dạng phủ định 'don't'. Sửa 'don't protect' thành 'protect'."
        },
        {
          id: 7,
          text: "The girl <span class=\"underline-error\">about who</span> (A) you were <span class=\"underline-error\">speaking</span> (B) is <span class=\"underline-error\">my classmate</span> (C) in <span class=\"underline-error\">high school</span> (D).",
          options: ["A. about who", "B. speaking", "C. my classmate", "D. high school"],
          correct: 0,
          explain: "Đại từ quan hệ: Giới từ chỉ đứng trước đại từ quan hệ làm tân ngữ là 'whom' cho người và 'which' cho vật. Không đứng trước 'who'. Sửa 'about who' thành 'about whom'."
        },
        {
          id: 8,
          text: "It is <span class=\"underline-error\">highly recommended</span> (A) that a dentist <span class=\"underline-error\">checks</span> (B) your teeth <span class=\"underline-error\">at least</span> (C) twice <span class=\"underline-error\">a year</span> (D).",
          options: ["A. highly recommended", "B. checks", "C. at least", "D. twice a year"],
          correct: 1,
          explain: "Cấu trúc giả định: 'It is recommended that + S + V(bare)'. Động từ ở mệnh đề sau 'that' phải ở dạng nguyên mẫu. Sửa 'checks' thành 'check'."
        },
        {
          id: 9,
          text: "Although <span class=\"underline-error\">he was</span> (A) very tired, <span class=\"underline-error\">but</span> (B) he tried <span class=\"underline-error\">his best</span> (C) to finish the <span class=\"underline-error\">assignment</span> (D).",
          options: ["A. he was", "B. but", "C. his best", "D. assignment"],
          correct: 1,
          explain: "Liên từ: Không sử dụng song song 'Although' và 'but' trong cùng một câu ghép. Sửa: bỏ 'but'."
        },
        {
          id: 10,
          text: "She has <span class=\"underline-error\">too many</span> (A) work <span class=\"underline-error\">to do</span> (B) that she <span class=\"underline-error\">cannot go</span> (C) out with <span class=\"underline-error\">us</span> (D).",
          options: ["A. too many", "B. to do", "C. cannot go", "D. us"],
          correct: 0,
          explain: "Danh từ không đếm được 'work' không đi với 'many', đồng thời để tạo cấu trúc 'quá...đến nỗi' ta dùng 'so much'. Sửa 'too many' thành 'so much'."
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
          text: "I didn't listen to my teacher, so I failed the test.",
          options: [
            "Had I listened to my teacher, I would fail the test.",
            "If only I didn't listen to my teacher.",
            "If I had listened to my teacher, I wouldn't have failed the test.",
            "If I listened to my teacher, I wouldn't fail the test."
          ],
          correct: 2,
          explain: "Giả định ngược quá khứ dùng câu điều kiện loại 3: 'If + S + had + V3/ed, S + would have + V3/ed'."
        },
        {
          id: 12,
          text: "It is not necessary for you to clean the room today.",
          options: [
            "You shouldn't clean the room today.",
            "You may not clean the room today.",
            "You must not clean the room today.",
            "You needn't clean the room today."
          ],
          correct: 3,
          explain: "'not necessary' = không cần thiết, tương đương động từ khuyết thiếu 'needn't + V(bare)'."
        },
        {
          id: 13,
          text: "They are repairing the bridge at the moment.",
          options: [
            "The bridge is repairing at the moment.",
            "The bridge is repaired at the moment.",
            "The bridge is being repaired at the moment.",
            "The bridge has been repaired at the moment."
          ],
          correct: 2,
          explain: "Chuyển sang bị động thì Hiện tại tiếp diễn: 'S + am/is/are + being + V3/ed'."
        },
        {
          id: 14,
          text: "I last saw my cousin when we were in London three years ago.",
          options: [
            "I haven't seen my cousin for three years.",
            "I didn't see my cousin since we were in London.",
            "It is three years since I last have seen my cousin.",
            "The last time I have seen my cousin was three years ago."
          ],
          correct: 0,
          explain: "Chuyển đổi thì: 'S + last + V2 + when + thời gian + ago' = 'S + hasn't/haven't + V3 + for + khoảng thời gian'."
        },
        {
          id: 15,
          text: "\"I will pay you back tomorrow,\" she said to me.",
          options: [
            "She said she will pay me back the following day.",
            "She promised to pay me back the following day.",
            "She promised she would pay me back tomorrow.",
            "She told me to pay her back the following day."
          ],
          correct: 1,
          explain: "Câu gián tiếp: Cấu trúc hứa hẹn 'promise to V' hoặc 'promise + would'. Đồng thời trạng từ 'tomorrow' đổi thành 'the following day'."
        }
      ]
    },
    {
      id: "part4a",
      name: "Part 4: Reading Comprehension — Passage 1",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "Cryptography, the practice of securing communication from adversaries, has played a critical role in human history for thousands of years. The earliest recorded forms of cryptography date back to ancient civilizations, where simple substitution ciphers were used to protect sensitive military secrets. For example, Julius Caesar used a cipher that shifted letters by a set number of positions to communicate with his generals. During World War II, cryptography became a decisive factor in the outcome of the conflict. The Germans relied on the Enigma machine to encrypt their military messages, believing it to be unbreakable. However, a team of Allied codebreakers, led by Alan Turing, successfully cracked the code, providing crucial intelligence that saved lives and shortened the war.",
        "In the digital age, cryptography has transitioned from a military tool to the invisible foundation of the global economy and daily life. Every time we send a private email, make an online purchase, or access our personal bank accounts, cryptographic algorithms secure our data from hackers. Modern cryptography relies on mathematical formulas that are incredibly difficult to solve without the correct key. The most common system, public-key cryptography, uses two different keys: a public key to encrypt the message and a private key to decrypt it, ensuring secure communication over unsecured networks like the internet.",
        "Looking to the future, the field of cryptography faces its greatest challenge yet: the rise of quantum computing. Quantum computers, which process information in fundamentally different ways than classical computers, will have the power to solve the mathematical problems behind current encryption methods in a matter of seconds. To prevent a catastrophic global security crisis, cryptographers are currently racing to develop post-quantum cryptography—new encryption algorithms that are completely resistant to quantum attacks. The history of cryptography is an ongoing battle between code makers and codebreakers, and the survival of our digital society depends on the code makers staying one step ahead. As technology evolves, our systems must evolve as well to guarantee privacy."
      ],
      questions: [
        {
          id: 16,
          text: "What is the main idea of the passage?",
          options: [
            "How Alan Turing cracked the Enigma code.",
            "The threat of quantum computers to traditional banks.",
            "The history and digital evolution of cryptography, including its future challenges.",
            "The mathematics behind public-key encryption."
          ],
          correct: 2,
          explain: "Bài đọc tóm quát lịch sử mật mã học, vai trò của nó trong kỷ nguyên số hiện nay, và thách thức lớn trong tương lai từ máy tính lượng tử."
        },
        {
          id: 17,
          text: "According to paragraph 1, how did Julius Caesar protect his messages?",
          options: [
            "Using a complex computer program.",
            "By sending them through a secret team of codebreakers.",
            "By hiding them in metal containers.",
            "Using a substitution cipher that shifted letters by a set number of positions."
          ],
          correct: 3,
          explain: "Đoạn 1: 'Julius Caesar used a cipher that shifted letters by a set number of positions to communicate...'"
        },
        {
          id: 18,
          text: "What was the Enigma machine as described in paragraph 1?",
          options: [
            "The first classical computer built in England.",
            "A cryptographic formula for public keys.",
            "An encryption machine used by Germans during World War II.",
            "A machine used by Allied codebreakers."
          ],
          correct: 2,
          explain: "Đoạn 1: 'The Germans relied on the Enigma machine to encrypt their military messages...'"
        },
        {
          id: 19,
          text: "In paragraph 2, the word \"transitioned\" is closest in meaning to _______.",
          options: ["changed", "stayed the same", "failed", "disappeared"],
          correct: 0,
          explain: "'Transition' = chuyển đổi, chuyển dịch, thay đổi từ dạng này sang dạng khác (changed/shifted)."
        },
        {
          id: 20,
          text: "According to the passage, how does public-key cryptography work?",
          options: [
            "It requires a quantum computer to read.",
            "It sends physical keys through the mail.",
            "It uses a single password known to everyone.",
            "It uses two keys: a public key to encrypt and a private key to decrypt."
          ],
          correct: 3,
          explain: "Đoạn 2: 'public-key cryptography, uses two different keys: a public key to encrypt the message and a private key to decrypt it'."
        },
        {
          id: 21,
          text: "Why does quantum computing pose a threat to modern cryptography?",
          options: [
            "It is too expensive for banks to buy.",
            "It does not use keys.",
            "It can solve the mathematical formulas behind current encryption in seconds.",
            "It cannot connect to the internet."
          ],
          correct: 2,
          explain: "Đoạn 3: 'Quantum computers... will have the power to solve the mathematical problems behind current encryption methods in a matter of seconds'."
        },
        {
          id: 22,
          text: "The word \"resistant\" in paragraph 3 is closest in meaning to _______.",
          options: ["vulnerable", "similar", "unaffected by", "helpful"],
          correct: 2,
          explain: "'Resistant to' = chống lại, có khả năng đề kháng, không bị ảnh hưởng (unaffected by)."
        }
      ]
    },
    {
      id: "part4b",
      name: "Part 4: Reading Comprehension — Passage 2",
      instruction: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
      type: "reading",
      passage: [
        "For billions of years, life on Earth evolved under a natural cycle of light and dark, dictated solely by the movement of the sun and the stars. However, the rapid expansion of electric lighting in the twentieth century has dramatically altered this cycle, creating a phenomenon known as light pollution. Light pollution is the excessive or inappropriate use of artificial outdoor light, which brightens the night sky and disrupts the natural darkness. It is estimated that more than eighty percent of the world's population lives under dome-shaped light pollution, and many modern city residents can no longer see the Milky Way in the night sky.",
        "The ecological consequences of light pollution are severe, particularly for wildlife. Night-active animals rely on darkness for hunting, mating, and navigation. For example, sea turtle hatchlings find the ocean by crawling toward the bright horizon over the sea. Artificial lights on developed beaches can heavily disorient the hatchlings, leading them in the wrong direction toward busy roads and predators. Similarly, migratory birds fly by navigating using the stars. Brightly lit city skyscrapers can attract and confuse the birds, causing them to collide with buildings or fly in circles until they collapse from exhaustion. In plants, artificial light can disrupt seasonal growth cycles and delay leaf fall.",
        "For humans, light pollution disrupts our biological clocks. Exposure to artificial light at night suppresses the production of melatonin, a hormone that regulates sleep. This suppression can lead to sleep disorders, fatigue, and an increased risk of chronic health problems such as obesity, depression, and even certain cancers. Fortunately, light pollution is one of the easiest environmental issues to resolve. Communities can implement smart lighting solutions, such as using shielded light fixtures that direct light downward, turning off non-essential lights at night, and using warm-colored LED lights instead of blue-white ones. By restoring natural darkness, we can protect ecosystems, save energy, and reclaim the beauty of the starry night sky. Protecting the night sky is vital for our future well-being."
      ],
      questions: [
        {
          id: 23,
          text: "What is the main idea of the passage?",
          options: [
            "How sea turtles navigate the oceans.",
            "The causes, ecological and human consequences, and solutions of light pollution.",
            "The chemistry of melatonin production.",
            "The benefits of electric lighting in cities."
          ],
          correct: 1,
          explain: "Bài viết nói về hiện tượng ô nhiễm ánh sáng: nguyên nhân, ảnh hưởng xấu tới động thực vật và con người, và các giải pháp khắc phục."
        },
        {
          id: 24,
          text: "What is light pollution as defined in paragraph 1?",
          options: [
            "A disease that affects human vision.",
            "Smoke from electric generators.",
            "Blue light from computer screens.",
            "The excessive or inappropriate use of artificial outdoor light."
          ],
          correct: 3,
          explain: "Đoạn 1: 'Light pollution is the excessive or inappropriate use of artificial outdoor light...'"
        },
        {
          id: 25,
          text: "According to paragraph 2, how does light pollution affect sea turtle hatchlings?",
          options: [
            "It makes their shells softer.",
            "It disorients them, leading them away from the ocean.",
            "It attracts fish that eat them.",
            "It prevents them from laying eggs."
          ],
          correct: 1,
          explain: "Đoạn 2: 'Artificial lights on developed beaches can heavily disorient the hatchlings, leading them in the wrong direction toward busy roads...'"
        },
        {
          id: 26,
          text: "Why do migratory birds collide with city skyscrapers according to the passage?",
          options: [
            "Because artificial lights attract and confuse them.",
            "Because skyscrapers block their food sources.",
            "Because they fly too fast.",
            "Because they cannot see buildings in the dark."
          ],
          correct: 0,
          explain: "Đoạn 2: 'Brightly lit city skyscrapers can attract and confuse the birds, causing them to collide with buildings...'"
        },
        {
          id: 27,
          text: "How does night-time artificial light affect human health?",
          options: [
            "It has no impact on biological clocks.",
            "It suppresses melatonin, leading to sleep disorders and health risks.",
            "It helps cure depression.",
            "It increases melatonin production."
          ],
          correct: 1,
          explain: "Đoạn 3: 'Exposure to artificial light at night suppresses the production of melatonin, a hormone that regulates sleep. This suppression can lead to sleep disorders...'"
        },
        {
          id: 28,
          text: "The word \"suppresses\" in paragraph 3 is closest in meaning to _______.",
          options: ["increases", "improves", "releases", "reduces"],
          correct: 3,
          explain: "'Suppress' = đè nén, kìm hãm, làm giảm bớt (reduces/stops)."
        },
        {
          id: 29,
          text: "Which of the following is NOT mentioned as a solution to light pollution?",
          options: [
            "Turning off non-essential lights at night.",
            "Using warm-colored LED lights.",
            "Using shielded light fixtures that direct light downward.",
            "Using bright blue-white LED lights."
          ],
          correct: 3,
          explain: "Bài viết khuyên dùng đèn LED màu ấm (warm-colored) thay vì màu xanh trắng (blue-white)."
        },
        {
          id: 30,
          text: "The word \"reclaim\" in paragraph 3 is closest in meaning to _______.",
          options: ["destroy", "study", "forget", "recover"],
          correct: 3,
          explain: "'Reclaim' = lấy lại, khôi phục lại (recover/take back)."
        }
      ]
    }
  ]
};

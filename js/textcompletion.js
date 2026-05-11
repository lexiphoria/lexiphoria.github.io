const ALL_EXAMS = [
  {
    id: 'biometrics',
    title: 'BIOMETRICS 2.0',
    meta: 'Adapted from a technology article',
    html: `
      <p>From iris scans to cardiac signatures, next-generation biometrics promise seamless journeys through airports.</p>
      <p>The next time you fly you may be able to simply walk through the scanning gate and continue without stopping. There’ll be no need to take out your passport or phone <span class="blank-tag">1</span>. Nothing new? Well, now it won’t be your face the system is scanning, but your heartbeat. Welcome to Biometrics 2.0.</p>
      <br>
      <p><span class="blank-tag">2</span> is continuous verification rather than one-off checks. Currently, most airports rely on fingerprints or a single facial scan at a gate. The next wave, powered by AI, verifies identity seamlessly as you move through the airport.</p>
      <br>
      <p>Biometrics 2.0 represents a shift from checkpoint-based security to background identity assurance. Instead of isolated inspection points, verification happens quietly and continuously. By reducing reliance on manual checks, <span class="blank-tag">3</span> such as immigration and security screenings.</p>
      <br>
      <p>Singapore’s Changi Airport already uses iris and facial recognition at multiple checkpoints. Airports in Jakarta and Surabaya have introduced biometric corridors that enable passengers to move through checkpoints using facial verification. Meanwhile, the Smart Path platform by SITA, the world’s leading specialist in air transport communications and information technology, is deployed in more than 40 airports worldwide, <span class="blank-tag">4</span> through a single facial enrolment.</p>
      <br>
      <p>Biometrics 2.0 is no longer theoretical. <span class="blank-tag">5</span>.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Sentence Structure",
        opts: [
          "passing through immigration and security",
          "to pass through immigration and security",
          "when passed through immigration and security",
          "to be passing through immigration and security"
        ],
        ans: 1, // B
        grammar: "Purpose infinitive",
        tip: "Structure indicating purpose (in order to do sth/ to do sth). 'to pass through...' means 'to go through...'. Therefore, a 'to' infinitive is required."
      },
      {
        num: 2,
        type: "Noun Clause",
        opts: [
          "What sets next-generation biometrics apart from today’s systems",
          "That next-generation biometrics set apart from today’s systems",
          "Setting next-generation biometrics apart from today’s systems",
          "It sets next-generation biometrics apart from today’s systems"
        ],
        ans: 0, // A
        grammar: "Noun clause as subject",
        tip: "A Noun Clause acts as the subject for the following verb 'is'. 'What sets next-generation biometrics apart...' = The thing that makes next-generation biometrics different..."
      },
      {
        num: 3,
        type: "Sentence Structure",
        opts: [
          "the margin for human error can lower by AI-driven systems in high-security settings",
          "high-security settings can lower the margin for human error by AI-driven systems",
          "AI-driven systems can lower the margin for human error in high-security settings",
          "human error in high-security settings can be lowered margin by AI-driven systems"
        ],
        ans: 2, // C
        grammar: "Subject alignment",
        tip: "The phrase 'By reducing...' has an implicit subject which is the entity performing the action. Here, 'AI-driven systems' is the most logical subject that can 'lower the margin for human error'. Passive voice or incorrect subjects are not suitable."
      },
      {
        num: 4,
        type: "Participle clause",
        opts: [
          "integrated biometrics across check-in, security, border control and boarding",
          "integrates biometrics across check-in, security, border control and boarding",
          "to integrate biometrics across check-in, security, border control and boarding",
          "integrating biometrics across check-in, security, border control and boarding"
        ],
        ans: 3, // D
        grammar: "Present participle clause",
        tip: "This is a reduced relative clause (or participle clause) with an active meaning, continuing the idea of the previous sentence (..., which integrates... -> ..., integrating...)."
      },
      {
        num: 5,
        type: "Sentence Cohesion",
        opts: [
          "Steadily reshaping the passenger journey, identity itself turns into the ultimate travel document.",
          "It is steadily reshaping the passenger journey and turning identity itself into the ultimate travel document.",
          "It steadily reshapes the passenger journey and to turn identity itself into the ultimate travel document.",
          "Reshaping the passenger journey steadily and identity itself is turned into the ultimate travel document."
        ],
        ans: 1, // B
        grammar: "Pronoun reference & Parallelism",
        tip: "Pronoun reference. 'It' here replaces 'Biometrics 2.0'. The verb is in the present continuous 'is steadily reshaping... and turning...' describing an ongoing process."
      }
    ]
  },
  {
    id: 'heart',
    title: 'Heart Problems in Young Adults',
    meta: 'Health & Lifestyle',
    html: `
      <p>Mounting evidence shows that more young adults are experiencing heart problems than in previous decades. Heart attacks occur when blood flow to the heart <span class="blank-tag">1</span>. One reason is the growing number of lifestyle-related health problems, <span class="blank-tag">2</span>. Other factors like tobacco, cocaine, marijuana, and alcohol use have been associated with increased risks of heart attack in younger adults, too.</p>
      <br>
      <p>The major risk factors—high blood pressure, high cholesterol, diabetes, and obesity—can damage arteries over time. While these conditions may be inherited, <span class="blank-tag">3</span> often play a larger role.</p>
      <br>
      <p><span class="blank-tag">4</span>. A recent survey found that 47% of people under 45 don’t believe they’re at risk for heart disease, and one-third of adults wouldn’t confidently recognize heart attack symptoms. Half of 3,500 younger adults with significant risk factors didn’t believe they were at risk before their heart attack occurred. Even fewer said their doctors warned them—especially women.</p>
      <br>
      <p>Experts say that getting young adults to care about heart health is a unique challenge. <span class="blank-tag">5</span>. Experts emphasize early prevention, since untreated risk factors lead to worse outcomes over time.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Verb Phrase",
        opts: [
          "has been incompletely blocked",
          "that is partially or completely blocking",
          "is getting a blockage completely",
          "is partially or completely blocked"
        ],
        ans: 3,
        grammar: "Passive Voice",
        tip: "Adverbial clause of time 'when blood flow to the heart...'. 'blood flow' needs to be in passive voice 'is blocked'."
      },
      {
        num: 2,
        type: "Relative Clause",
        opts: [
          "largely resulting from poor diet and physical inactivity",
          "which are influenced by diet and regular exercise",
          "mainly associated with poor diet and physical inactivity",
          "that are closely linked to poor diet and physical inactivity"
        ],
        ans: 0,
        grammar: "Participle phrase",
        tip: "Reduced relative clause in active form: which largely result from -> largely resulting from. Other options are incorrect in meaning or logic."
      },
      {
        num: 3,
        type: "Noun Phrase",
        opts: [
          "the unhealthy lifestyle choices kept in childhood",
          "unhealthy lifestyle choices starting in childhood",
          "people keep unhealthy lifestyle choices in childhood",
          "choosing unhealthy lifestyle in childhood"
        ],
        ans: 1,
        grammar: "Noun phrase as subject",
        tip: "This position requires a noun phrase as the subject for 'often play a larger role'. 'choices starting in childhood' is the most suitable grammatically and semantically."
      },
      {
        num: 4,
        type: "Sentence Cohesion",
        opts: [
          "Because of these risks, many young adults remain unaware",
          "Being aware of the risk, many young adults are taking risks",
          "Despite these risks, many young adults remain unaware",
          "There is unawareness among young adults due to these risks"
        ],
        ans: 2,
        grammar: "Concession",
        tip: "The passage shows a contrast: The risks are real and significant, but young people do 'not believe' (don't believe). Therefore, a concession structure is needed: Despite these risks..."
      },
      {
        num: 5,
        type: "Sentence Structure",
        opts: [
          "As they are busy with careers and families, this group often overlooks their heart health",
          "While they are busy with careers and families, they consider long-term health risks carefully",
          "When they neglect their heart health, it is often due to pressure from work and family duties",
          "Although they are busy with careers and families, they manage to take good care of their heart health"
        ],
        ans: 0,
        grammar: "Adverbial clause of reason",
        tip: "Most logical semantic connection following 'unique challenge': Because they are busy with careers and families, this group often overlooks heart care."
      }
    ]
  },
  {
    id: 'dienbienphu',
    title: 'Dien Bien Phu – A Battle to Remember',
    meta: 'History & Society',
    html: `
      <p>Seventy years ago, Vietnam won the Dien Bien Phu battle, <span class="blank-tag">1</span> in July 1954 and marking the end of the French military presence in the whole Indochina.</p>
      <br>
      <p>The battle for Dien Bien Phu is still bittersweet for many who wear the victory as a badge of honour, but lament the steep death toll.</p>
      <br>
      <p>The 1954 battle killed thousands of soldiers on both sides within less than two months, from March 13 to May 7, as Vietnamese fighters hemmed in French forces - <span class="blank-tag">2</span> - and bombarded them with heavy artillery. The globe-shaking victory was the fruit of <span class="blank-tag">3</span>, military art engineered by General Vo Nguyen Giap, and especially the great national solidarity. During the Dien Bien Phu Campaign, tens of thousands of people engaged in transporting supplies to the front or building the road for moving the artillery serving the battle.</p>
      <br>
      <p><span class="blank-tag">4</span>, being a great source of encouragement for the entire nation in the current national construction and development.</p>
      <br>
      <p>Vietnam has shone bright as a country of peace, bliss and robust development. It has carved out significant achievements with its bamboo diplomacy, <span class="blank-tag">5</span> to achieve strategic objectives. The country has established diplomatic ties with 190 countries and territories across the five continents, and even strengthened bonds with its formers foes./.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Participle phrase",
        opts: [
          "forced the French government to sign the Geneva Agreement",
          "forcing the French government to sign the Geneva Agreement",
          "to force the French government to sign the Geneva Agreement",
          "which forcing the French government to sign the Geneva Agreement"
        ],
        ans: 1,
        grammar: "Present participle of result",
        tip: "A present participle phrase ('forcing...') is used after a comma to indicate the result of the preceding action ('won the battle'). This structure is parallel with 'marking' later in the sentence."
      },
      {
        num: 2,
        type: "Relative Clause",
        opts: [
          "equipping with superior weapons",
          "equipped with superior weapons",
          "which equipped with superior weapons",
          "to equip with superior weapons"
        ],
        ans: 1,
        grammar: "Past participle phrase",
        tip: "A past participle phrase acting as a reduced relative clause (forces which were equipped...). Passive meaning is required because the forces received the weapons."
      },
      {
        num: 3,
        type: "Noun Phrase",
        opts: [
          "President Ho Chi Minh clear-sighted leadership",
          "the clear-sighted leadership by President Ho Chi Minh",
          "the leadership clear-sighted by President Ho Chi Minh",
          "President Ho Chi Minh's leadership which is clear-sighted"
        ],
        ans: 1,
        grammar: "Noun phrase",
        tip: "After 'the fruit of', a noun phrase is required. 'The clear-sighted leadership by President Ho Chi Minh' is a grammatically correct and naturally structured noun phrase that parallels the subsequent items."
      },
      {
        num: 4,
        type: "Compound sentence",
        opts: [
          "Although seven decades passing, the stature, meaning and lessons learnt from the great victory remain valid today",
          "Because seven decades have passed, the stature, meaning and lessons learnt from the great victory remain valid today",
          "Seven decades have passed but the stature, meaning and lessons learnt from the great victory remain valid today",
          "Despite seven decades have passed, the stature, meaning and lessons learnt from the great victory remain valid today"
        ],
        ans: 2,
        grammar: "Coordinating conjunction",
        tip: "A compound sentence joined by 'but' expresses a contrast. The 3rd option is the only one with correct grammar and structure. 'Despite' cannot be followed by a full clause; 'Because' gives the wrong meaning."
      },
      {
        num: 5,
        type: "Adjective clause",
        opts: [
          "in which it stays steadfast and unyielding on basic principles but flexible in the ways and means",
          "that it stays steadfast and unyielding on basic principles but flexible in the ways and means",
          "which stays steadfast and unyielding on basic principles but flexible in the ways and means",
          "where it stays steadfast and unyielding on basic principles but flexible in the ways and means"
        ],
        ans: 0,
        grammar: "Preposition + relative pronoun",
        tip: "A non-defining relative clause referring to 'bamboo diplomacy'. 'In which' means 'in this diplomacy', allowing the clause 'it stays steadfast...' to be structurally complete. 'That' cannot be used after a comma."
      }
    ]
  },
  {
    id: 'asean_summit',
    title: '48th ASEAN Summit & Viet Nam\'s Role',
    meta: 'Politics & International Relations',
    html: `
      <p>At the invitation of President of the Republic of the Philippines Ferdinand Romualdez Marcos Jr, ASEAN Chair for 2026, Prime Minister Le Minh Hung will lead a high-level Vietnamese delegation to attend the 48th ASEAN Summit in Cebu, the Philippines, from May 7 to 8.</p>
      <br>
      <p>The Prime Minister's participation strongly demonstrates Viet Nam's continued and consistent implementation of its foreign policy of independence, self-reliance, self-strengthening, peace, friendship, cooperation and development, along with the diversification and multilateralisation of external relations. <span class="blank-tag">1</span>. This is also a clear message of Viet Nam's commitment to the ASEAN Community-building process, <span class="blank-tag">2</span> and substantive, effective contributions to the Association's common work.</p>
      <br>
      <p><span class="blank-tag">3</span>, and it carries special significance as ASEAN officially enters a new development phase <span class="blank-tag">4</span> during the 2015-2025 period. The year 2026 marks the first year ASEAN implements the ASEAN Community Vision 2045 together with Strategic Plans across the four pillars of Political-Security, Economic, Socio-Cultural and Connectivity cooperation. This is a strategic orientation framework aimed at building a united and resilient ASEAN, <span class="blank-tag">5</span> and addressing regional issues.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Independent Sentence",
        opts: [
          "It also reaffirms that ASEAN remains a top strategic priority in Viet Nam's overall foreign policy",
          "Reaffirming that ASEAN remains a top strategic priority in Viet Nam's overall foreign policy",
          "It also reaffirms what ASEAN remains a top strategic priority in Viet Nam's overall foreign policy",
          "That also reaffirms ASEAN remaining a top strategic priority in Viet Nam's overall foreign policy"
        ],
        ans: 0,
        grammar: "Independent sentence structure",
        tip: "A complete independent sentence is needed here to follow the preceding point. Option A provides a full sentence with subject 'It' and verb 'reaffirms'."
      },
      {
        num: 2,
        type: "Context Meaning Clause",
        opts: [
          "in a spirit of proactiveness, positivity, responsibility",
          "with a spirit of proactiveness, positivity, responsibility",
          "for a spirit of proactiveness, positivity, responsibility",
          "by a spirit of proactiveness, positivity, responsibility"
        ],
        ans: 1,
        grammar: "Prepositional phrase",
        tip: "The preposition 'with' correctly forms the phrase 'with a spirit of...', indicating the manner in which Viet Nam commits to the process."
      },
      {
        num: 3,
        type: "Independent Sentence",
        opts: [
          "Being the first annual summit in the Philippines' ASEAN Chairmanship Year 2026",
          "As this is the first annual summit in the Philippines' ASEAN Chairmanship Year 2026",
          "This is the first annual summit in the Philippines' ASEAN Chairmanship Year 2026",
          "Which is the first annual summit in the Philippines' ASEAN Chairmanship Year 2026"
        ],
        ans: 2,
        grammar: "Independent sentence structure",
        tip: "This blank requires an independent clause to form a compound sentence with 'and it carries special significance...'. Only Option C is a complete independent clause."
      },
      {
        num: 4,
        type: "Context Meaning Clause",
        opts: [
          "followed 10 years of ASEAN Community-building",
          "to follow 10 years of ASEAN Community-building",
          "that following 10 years of ASEAN Community-building",
          "following 10 years of ASEAN Community-building"
        ],
        ans: 3,
        grammar: "Participle phrase",
        tip: "The present participle 'following' is used here as a preposition meaning 'after'. It smoothly connects the new phase with the previous 10-year period."
      },
      {
        num: 5,
        type: "Context Meaning Clause",
        opts: [
          "promoted its central role in advancing cooperation",
          "to promote its central role in advancing cooperation",
          "promoting its central role in advancing cooperation",
          "which promoting its central role in advancing cooperation"
        ],
        ans: 2,
        grammar: "Present participle phrase",
        tip: "A present participle phrase ('promoting...') is used after a comma to add supplementary information about the framework's aims, parallel to 'addressing'."
      }
    ]
  },
  {
    id: 'ocean_literacy',
    title: 'Ocean Literacy: Education for the Future',
    meta: 'Environment & Education',
    html: `
      <p>The “Ocean Literacy” concept is a direct response to the aforementioned challenges. The origins of this movement can be traced to a collective reflection within some marine science and education communities in the late 20th century. Following the release of the U.S. National Science Education Standards in 1996, some marine scientists noted the absence of ocean-related topics, <span class="blank-tag">1</span> in primary and secondary schools. <span class="blank-tag">2</span>.</p>
      <br>
      <p>A 2002 conference titled “Oceans for Life” is considered by some as the formal beginning of the ocean literacy movement, <span class="blank-tag">3</span>. In 2004, an online workshop, sponsored by NOAA, involving over one hundred scientists, educators, and policymakers defined ocean literacy — “an understanding of the ocean's influence on you and your influence on the ocean”—along with “Seven Essential Principles” and “Forty-five Fundamental Concepts.” <span class="blank-tag">4</span>.</p>
      <br>
      <p>The introduction of the ocean literacy concept was discussed more widely. Internationally, collaborative networks for ocean education were established, such as the International Pacific Marine Educators Network (IPMEN, 2007), the European Marine Science Educators Association (EMSEA, 2012), and the Asia Marine Educators Association (AMEA, 2016), <span class="blank-tag">5</span>. The European Commission also funded large-scale innovation projects like “Sea Change” through its Horizon 2020 program to enhance ocean literacy among European citizens.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Context Meaning Clause",
        opts: [
          "that could lead to a lack of structured and coherent ocean education",
          "which could lead to a lack of structured and coherent ocean education",
          "leading to a lack of structured and coherent ocean education",
          "what could lead to a lack of structured and coherent ocean education"
        ],
        ans: 1,
        grammar: "Non-defining relative clause",
        tip: "A non-defining relative clause is required after a comma to comment on the preceding clause. 'Which' is the correct relative pronoun; 'that' cannot be used after a comma."
      },
      {
        num: 2,
        type: "Independent Sentence",
        opts: [
          "Recognizing the need to develop a clear knowledge framework to help the public, especially younger generations, understand the importance of the ocean.",
          "The need to develop a clear knowledge framework to help the public, especially younger generations, understand the importance of the ocean was recognized.",
          "They recognized the need to develop a clear knowledge framework to help the public, especially younger generations, understand the importance of the ocean.",
          "Because they recognized the need to develop a clear knowledge framework to help the public, especially younger generations, understand the importance of the ocean."
        ],
        ans: 2,
        grammar: "Independent sentence structure",
        tip: "This blank requires a complete, independent sentence to conclude the paragraph. Option C provides the most direct and grammatically correct structure with subject 'They'."
      },
      {
        num: 3,
        type: "Context Meaning Clause",
        opts: [
          "paved the way for the development of its core principles",
          "to pave the way for the development of its core principles",
          "which paving the way for the development of its core principles",
          "paving the way for the development of its core principles"
        ],
        ans: 3,
        grammar: "Present participle phrase",
        tip: "A present participle phrase ('paving...') is used here to express the result or subsequent action of the 2002 conference."
      },
      {
        num: 4,
        type: "Independent Sentence",
        opts: [
          "“Ocean Literacy: The Essential Principles of Ocean Sciences for Learners of All Ages” officially published in 2005.",
          "In 2005, “Ocean Literacy: The Essential Principles of Ocean Sciences for Learners of All Ages” was officially published.",
          "Publishing “Ocean Literacy: The Essential Principles of Ocean Sciences for Learners of All Ages” officially in 2005.",
          "In 2005, officially publishing “Ocean Literacy: The Essential Principles of Ocean Sciences for Learners of All Ages”."
        ],
        ans: 1,
        grammar: "Independent sentence structure",
        tip: "This blank requires a complete sentence in passive voice. The title is the subject, and 'was officially published' is the correct verb form."
      },
      {
        num: 5,
        type: "Context Meaning Clause",
        opts: [
          "forming a global promotion network",
          "formed a global promotion network",
          "to form a global promotion network",
          "which forming a global promotion network"
        ],
        ans: 0,
        grammar: "Present participle phrase",
        tip: "A present participle phrase ('forming...') describes the outcome of establishing those international collaborative networks."
      }
    ]
  },
  {
    id: 'women_agriculture',
    title: 'Women in APEC Agriculture',
    meta: 'Economy & Gender Equality',
    html: `
      <p>Agriculture is a major source of livelihoods across APEC economies, <span class="blank-tag">1</span> in developing economies. <span class="blank-tag">2</span>. FAO estimates that closing gender gaps in access to productive resources could increase farm yields and improve food security outcomes. Recent evidence confirms that reducing gender disparities supports productivity, resilience, and nutrition across agri-food systems. Despite these gains, rural women continue to face disproportionate poverty and food insecurity, <span class="blank-tag">3</span>.</p>
      <br>
      <p>Evidence from Southeast Asia illustrates how these challenges persist in practice. <span class="blank-tag">4</span>. At the regional level, comparative evidence shows uneven conditions: women in The Republic of the Philippines and Thailand tend to have relatively better access to productive resources and income control, <span class="blank-tag">5</span>. These cross-economy disparities in access to resources and services show that women's participation alone does not ensure equitable outcomes in agriculture.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Context Meaning Clause",
        opts: [
          "women accounted for around 43% of the agricultural workforce",
          "with women accounting for around 43% of the agricultural workforce",
          "for women accounting for around 43% of the agricultural workforce",
          "with women to account for around 43% of the agricultural workforce"
        ],
        ans: 1,
        grammar: "Absolute phrase with 'with'",
        tip: "The structure 'with + noun + V-ing' is used to add supplementary information or context to the main clause."
      },
      {
        num: 2,
        type: "Independent Sentence",
        opts: [
          "However, participation alone does not translate into empowerment or improved food security without targeted policy action.",
          "Therefore, participation alone does not translate into empowerment or improved food security without targeted policy action.",
          "Participation alone not translating into empowerment or improved food security without targeted policy action.",
          "Although participation alone does not translate into empowerment or improved food security without targeted policy action."
        ],
        ans: 0,
        grammar: "Independent sentence / Discourse marker",
        tip: "The context presents a contrast to the high participation rate, so 'However' is appropriate. A full independent clause is required here."
      },
      {
        num: 3,
        type: "Context Meaning Clause",
        opts: [
          "pointed to persistent gaps in skills, finance, and decision-making power",
          "to point to persistent gaps in skills, finance, and decision-making power",
          "which pointing to persistent gaps in skills, finance, and decision-making power",
          "pointing to persistent gaps in skills, finance, and decision-making power"
        ],
        ans: 3,
        grammar: "Present participle phrase",
        tip: "A present participle phrase ('pointing to...') follows the comma to describe the implication or result of the preceding situation."
      },
      {
        num: 4,
        type: "Independent Sentence",
        opts: [
          "Structural barriers continuing to limit the economic security of rural women farmers in Thailand, despite their central role in agricultural value chains.",
          "In Thailand, structural barriers continue to limit the economic security of rural women farmers, despite their central role in agricultural value chains.",
          "Because in Thailand, structural barriers continue to limit the economic security of rural women farmers, despite their central role in agricultural value chains.",
          "In Thailand, structural barriers continue to limit the economic security of rural women farmers, although their central role in agricultural value chains."
        ],
        ans: 1,
        grammar: "Independent sentence structure",
        tip: "A complete sentence is needed. Option B provides a correct subject and verb ('barriers continue'). 'Despite' correctly precedes the noun phrase 'their central role'."
      },
      {
        num: 5,
        type: "Context Meaning Clause",
        opts: [
          "when women in Indonesia and Myanmar face more limited participation and access to extension services",
          "because women in Indonesia and Myanmar face more limited participation and access to extension services",
          "while women in Indonesia and Myanmar face more limited participation and access to extension services",
          "despite women in Indonesia and Myanmar face more limited participation and access to extension services"
        ],
        ans: 2,
        grammar: "Adverbial clause of contrast",
        tip: "The conjunction 'while' is used to contrast the better conditions in the Philippines and Thailand with the limited participation in Indonesia and Myanmar."
      }
    ]
  },
  {
    id: 'water_puppetry',
    title: 'A Unique Performance Chamber for Water Puppetry',
    meta: 'Culture & Arts',
    html: `
      <p><span class="blank-tag">1</span>. An inscription from 1121 records performances in the Ly dynasty’s royal court, depicting rippling waves, a golden turtle bearing three mountain peaks, and immortals emerging from a cave’s mouth. With deep roots, water puppetry blends music and literature into shows that portray everything from mythological tales and battles to scenes of riverine daily life. Puppets row boats, plow fields with buffalo, or catch fish – all infused with humor and joy.</p>
      <br>
      <p>On performance days, the water pavilion serves as the stage or puppet chamber. A curtain is hung as a backdrop, <span class="blank-tag">2</span>, while allowing them to observe both the puppets and the audience. Water forms an integral part of the show, masking the control system of poles, which are hidden below the surface. The puppets emerge from behind the curtain and move beneath the surface before emerging or being revealed as the curtain is slightly parted.</p>
      <br>
      <p>In the heart of the delta, traditional water puppet pavilions display refined Vietnamese craftsmanship. Located by the Duong River dike in the former Kinh Bac region, Giong Temple (Phu Dong) faces a body of water. <span class="blank-tag">3</span>. Layered beams and brackets form its timber frame, <span class="blank-tag">4</span> and Later Le-style chrysanthemum motifs. A bridge extends from the shore to an open platform in front of the pavilion, <span class="blank-tag">5</span> during the annual Giong Festival, held on the ninth day of the fourth lunar month.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Independent Sentence",
        opts: [
          "Water pavilions are best known for their link to the art of water puppetry (múa rối nước)",
          "Being best known for their link to the art of water puppetry (múa rối nước)",
          "Which are best known for their link to the art of water puppetry (múa rối nước)",
          "Because water pavilions are best known for their link to the art of water puppetry (múa rối nước)"
        ],
        ans: 0,
        grammar: "Independent sentence structure",
        tip: "This blank requires a complete, independent sentence to introduce the topic of the paragraph. Option A provides a full sentence with subject and verb, while others are fragments or dependent clauses."
      },
      {
        num: 2,
        type: "Context Meaning Clause",
        opts: [
          "concealed the artisans who stand in the water",
          "to conceal the artisans who stand in the water",
          "concealing the artisans who stand in the water",
          "which concealing the artisans who stand in the water"
        ],
        ans: 2,
        grammar: "Present participle phrase",
        tip: "A present participle phrase ('concealing...') follows the comma to describe what the curtain does. It expresses an active ongoing function of the curtain."
      },
      {
        num: 3,
        type: "Independent Sentence",
        opts: [
          "A two-tier, eight-roof water pavilion rising at the pond's center",
          "Rising at the pond's center a two-tier, eight-roof water pavilion",
          "Because at the pond’s center, a two-tier, eight-roof water pavilion rises",
          "At the pond’s center, a two-tier, eight-roof water pavilion rises"
        ],
        ans: 3,
        grammar: "Independent sentence structure",
        tip: "A complete sentence is required here. Option D provides a complete thought with a prepositional phrase followed by a subject and a verb ('pavilion rises')."
      },
      {
        num: 4,
        type: "Context Meaning Clause",
        opts: [
          "adorning with carvings of the four sacred animals",
          "adorned with carvings of the four sacred animals",
          "to adorn with carvings of the four sacred animals",
          "which adorned with carvings of the four sacred animals"
        ],
        ans: 1,
        grammar: "Past participle phrase",
        tip: "A past participle phrase ('adorned with...') acts as a reduced relative clause with a passive meaning, indicating that the timber frame was decorated with the carvings."
      },
      {
        num: 5,
        type: "Context Meaning Clause",
        opts: [
          "what serves as a venue for folk performances and water puppetry shows",
          "that serves as a venue for folk performances and water puppetry shows",
          "which serves as a venue for folk performances and water puppetry shows",
          "where serves as a venue for folk performances and water puppetry shows"
        ],
        ans: 2,
        grammar: "Non-defining relative clause",
        tip: "A non-defining relative clause is needed after the comma to describe the platform. 'Which' is the correct relative pronoun. 'That' cannot follow a comma, and 'where' would require a separate subject."
      }
    ]
  },
  {
    id: 'roblox',
    title: 'Roblox: A Global Gaming Platform',
    meta: 'Technology & Gaming',
    html: `
      <p>Roblox is a free electronic gaming platform that lets people from around the world create, share, and play games. David Baszucki founded Roblox in 2006. He wanted to build an online universe <span class="blank-tag">1</span>.</p>
      <br>
      <p>Since Roblox is a global system, games are available in multiple languages. These include English, French, German, Spanish, Korean, and Chinese. The games are generally geared for individuals who are 18 years old and under. <span class="blank-tag">2</span>. These include filters to remove inappropriate language and <span class="blank-tag">3</span>. The system also allows parents to set controls over their children's playing time, games, and extra features.</p>
      <br>
      <p><span class="blank-tag">4</span>. Games that include building, such as of a theme park or a dream home, are popular. Other games include murder mysteries, survival scenarios, and competitions, such as race car driving. There are also chat areas, where players can interact socially with other players.</p>
      <br>
      <p>Roblox includes tutorials on coding (writing instructions that an electronic platform follows). These activities help individuals explore the creation and building of electronic games. Roblox developers can earn Robux, or virtual money, <span class="blank-tag">5</span>. Players can also buy Robux to use toward game upgrades and accessories if they choose.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Context Meaning Clause",
        opts: [
          "where players could connect socially and creatively",
          "which players could connect socially and creatively",
          "that players could connect socially and creatively",
          "when players could connect socially and creatively"
        ],
        ans: 0,
        grammar: "Relative adverb",
        tip: "The relative adverb 'where' is used to refer back to the 'online universe', indicating the place or environment in which players connect."
      },
      {
        num: 2,
        type: "Independent Sentence",
        opts: [
          "Roblox uses several monitoring systems to help ensure that children are safe while using the product",
          "Because Roblox uses several monitoring systems to help ensure that children are safe while using the product",
          "Using several monitoring systems to help ensure that children are safe while using the product",
          "Roblox using several monitoring systems to help ensure that children are safe while using the product"
        ],
        ans: 0,
        grammar: "Independent sentence structure",
        tip: "A complete independent sentence is needed here to present a new idea. Option A provides a full sentence with a subject and a verb."
      },
      {
        num: 3,
        type: "Context Meaning Clause",
        opts: [
          "made sure that all avatars (game characters) are fully clothed",
          "making sure that all avatars (game characters) are fully clothed",
          "to make sure that all avatars (game characters) are fully clothed",
          "which making sure that all avatars (game characters) are fully clothed"
        ],
        ans: 2,
        grammar: "Infinitive of purpose",
        tip: "The infinitive 'to make sure' is used to express purpose, parallel to 'to remove' earlier in the sentence."
      },
      {
        num: 4,
        type: "Independent Sentence",
        opts: [
          "Players can play Roblox games on various platforms, including smartphones, computers, and electronic game consoles such as Xbox One",
          "While players can play Roblox games on various platforms, including smartphones, computers, and electronic game consoles such as Xbox One",
          "Playing Roblox games on various platforms, including smartphones, computers, and electronic game consoles such as Xbox One",
          "Players to play Roblox games on various platforms, including smartphones, computers, and electronic game consoles such as Xbox One"
        ],
        ans: 0,
        grammar: "Independent sentence structure",
        tip: "This blank requires a complete, independent sentence to start the paragraph. Option A correctly provides a full independent clause."
      },
      {
        num: 5,
        type: "Context Meaning Clause",
        opts: [
          "basing on the quality of their games",
          "based on the quality of their games",
          "to base on the quality of their games",
          "which based on the quality of their games"
        ],
        ans: 1,
        grammar: "Past participle phrase",
        tip: "A past participle phrase ('based on...') acts as a reduced relative clause, meaning 'which is based on'."
      }
    ]
  },
  {
    id: 'arena_valor',
    title: 'Arena of Valor: A Resounding Victory',
    meta: 'Sports & Entertainment',
    html: `
      <p>On the afternoon of December 19th, Vietnam faced Thailand again in the grand final of the Arena of Valor eSports tournament. The five members of FPT Flash displayed high performance, <span class="blank-tag">1</span>. The home team's fighting spirit ultimately paid off, securing a victory. This win earned Vietnam a valuable gold medal in their flagship eSports discipline, <span class="blank-tag">2</span>.</p>
      <br>
      <p><span class="blank-tag">3</span>. Audition also contributed many medals, <span class="blank-tag">4</span>. FC Online, FreeFire, and MLBB all failed to win any championships.</p>
      <br>
      <p>Returning to the men's team final of Arena of Valor, this is the third time the two teams have met in the tournament, following the BO3 group stage match and the winners' bracket final on the afternoon of December 18th. Thanks to their 3:2 victory in the previous match, Vietnam had half a day of rest, while Thailand lost another BO7 match against Laos to return to the grand final. <span class="blank-tag">5</span>.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Context Meaning Clause",
        opts: [
          "dominated their opponents from the very first game",
          "to dominate their opponents from the very first game",
          "dominating their opponents from the very first game",
          "which dominating their opponents from the very first game"
        ],
        ans: 2,
        grammar: "Present participle phrase",
        tip: "A present participle phrase ('dominating...') is used after a comma to describe an action happening at the same time as the main clause."
      },
      {
        num: 2,
        type: "Context Meaning Clause",
        opts: [
          "contributed to the overall medal tally",
          "contributing to the overall medal tally",
          "to contribute to the overall medal tally",
          "that contributing to the overall medal tally"
        ],
        ans: 1,
        grammar: "Present participle phrase",
        tip: "A present participle ('contributing') is used here to indicate the result of the preceding action (winning the gold medal)."
      },
      {
        num: 3,
        type: "Independent Sentence",
        opts: [
          "This was a resounding victory for Arena of Valor, with both the men's and women's teams winning championships",
          "Because this was a resounding victory for Arena of Valor, with both the men's and women's teams winning championships",
          "Being a resounding victory for Arena of Valor, with both the men's and women's teams winning championships",
          "Which was a resounding victory for Arena of Valor, with both the men's and women's teams winning championships"
        ],
        ans: 0,
        grammar: "Independent sentence structure",
        tip: "This blank requires a complete sentence to start a new paragraph. Option A provides a full independent clause."
      },
      {
        num: 4,
        type: "Context Meaning Clause",
        opts: [
          "but it was classified as an exhibition event and not included in the overall results",
          "so it was classified as an exhibition event and not included in the overall results",
          "because it was classified as an exhibition event and not included in the overall results",
          "although it was classified as an exhibition event and not included in the overall results"
        ],
        ans: 0,
        grammar: "Coordinating conjunction",
        tip: "The conjunction 'but' is used to connect two contrasting independent clauses. 'Although' would create a dependent clause that requires a main clause, which doesn't fit the structure."
      },
      {
        num: 5,
        type: "Independent Sentence",
        opts: [
          "We possess a physical and psychological advantage going into this rematch against the host team",
          "Possessing a physical and psychological advantage going into this rematch against the host team",
          "As we possess a physical and psychological advantage going into this rematch against the host team",
          "We to possess a physical and psychological advantage going into this rematch against the host team"
        ],
        ans: 0,
        grammar: "Independent sentence structure",
        tip: "A complete sentence is required here to conclude the paragraph. Option A provides a full sentence with a subject and verb."
      }
    ]
  },
  {
    id: 'eu_japan_digital',
    title: 'EU and Japan Digital Partnership',
    meta: 'Technology & Global Economy',
    html: `
      <p>In Brussels, the two sides have just held the fourth meeting of the digital partnership council, <span class="blank-tag">1</span> for growth and economic security. <span class="blank-tag">2</span>.</p>
      <br>
      <p>Following the fourth meeting of the digital partnership council, the European Union and Japan agreed to take their technology cooperation to a new level. The goal is to build a safer, more trusted and better connected digital environment between the two sides. Accordingly, the EU and Japan will coordinate on data policy, promote cross border data flows, and develop digital identities <span class="blank-tag">3</span>. The two sides will also expand research cooperation in key areas such as AI, quantum technology, 6G technology, submarine cables, and semiconductors. More broadly, this is a strategic move. <span class="blank-tag">4</span>, especially in foundational technologies that support connectivity infrastructure and economic security.</p>
      <br>
      <p>The move comes as global technology competition is intensifying. The United States still holds an advantage in artificial intelligence, cloud computing, and major technology platforms. <span class="blank-tag">5</span>, the European Union and Japan are seeking to turn the digital partnership into a long-term tool of strategic cooperation. Rather than racing on market side or speed of development, the two sides are focusing on standard trust and supply chain security. In the coming time, this cooperation could save global digital rules, including the Indo-Pacific region.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Context Meaning Clause",
        opts: [
          "aimed to promote cooperation in areas that are becoming increasingly important",
          "to aim to promote cooperation in areas that are becoming increasingly important",
          "aiming to promote cooperation in areas that are becoming increasingly important",
          "which aiming to promote cooperation in areas that are becoming increasingly important"
        ],
        ans: 2,
        grammar: "Present participle phrase",
        tip: "A present participle phrase ('aiming to...') describes the purpose or ongoing goal of the meeting."
      },
      {
        num: 2,
        type: "Independent Sentence",
        opts: [
          "The meeting shows that digital technology is becoming part of the power competition between major economic centers",
          "Because the meeting shows that digital technology is becoming part of the power competition between major economic centers",
          "The meeting showing that digital technology is becoming part of the power competition between major economic centers",
          "That the meeting shows that digital technology is becoming part of the power competition between major economic centers"
        ],
        ans: 0,
        grammar: "Independent sentence structure",
        tip: "This blank requires an independent sentence to complete the paragraph. Option A provides a full sentence structure."
      },
      {
        num: 3,
        type: "Context Meaning Clause",
        opts: [
          "what can be used across different systems",
          "that can be used across different systems",
          "when can be used across different systems",
          "where can be used across different systems"
        ],
        ans: 1,
        grammar: "Relative clause",
        tip: "A defining relative clause starting with 'that' modifies 'digital identities'. 'What' cannot be used as a relative pronoun modifying a noun."
      },
      {
        num: 4,
        type: "Independent Sentence",
        opts: [
          "Both the EU and Japan want to reduce dependence on sensitive supply chains",
          "Both the EU and Japan wanting to reduce dependence on sensitive supply chains",
          "Although both the EU and Japan want to reduce dependence on sensitive supply chains",
          "For both the EU and Japan want to reduce dependence on sensitive supply chains"
        ],
        ans: 0,
        grammar: "Independent sentence structure",
        tip: "A complete independent sentence is needed here. Option A provides a full clause with subject 'Both the EU and Japan' and verb 'want'."
      },
      {
        num: 5,
        type: "Context Meaning Clause",
        opts: [
          "Because China is accelerating its drive for technological self-reliance and expanding its influence in digital infrastructure",
          "While China is accelerating its drive for technological self-reliance and expanding its influence in digital infrastructure",
          "Despite China is accelerating its drive for technological self-reliance and expanding its influence in digital infrastructure",
          "Therefore China is accelerating its drive for technological self-reliance and expanding its influence in digital infrastructure"
        ],
        ans: 1,
        grammar: "Adverbial clause of contrast",
        tip: "The conjunction 'while' introduces a subordinate clause expressing contrast with the main clause about the EU and Japan's actions."
      }
    ]
  },
  {
    id: 'ai_cybersecurity',
    title: 'AI and Cybersecurity',
    meta: 'Technology & Security',
    html: `
      <p>Artificial intelligence is transforming the way people access information and handle tasks in the digital environment. However, this convenience also comes with potential risks <span class="blank-tag">1</span>.</p>
      <br>
      <p>Experts say AI powered scams are becoming increasingly sophisticated to manipulate victims and gain trust online. How AI has been used as a tool in making them a victim of cyber crime is really a matter of trust. <span class="blank-tag">2</span>, what cyber attackers are doing is essentially to make themselves more trustworthy because deep fakes replicate someone you know. <span class="blank-tag">3</span>.</p>
      <br>
      <p>We need to know how and what kind of data we can send to AI. Don't ever boot or send to AI any of your sensitive information or your personal information like identity day of birth or identity ID <span class="blank-tag">4</span>. With the right tool and with just a little technical background, the bad actor can take advantage of that and anybody can become a cyber criminal <span class="blank-tag">5</span>.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Context Meaning Clause",
        opts: [
          "in replacing human workers with automated systems",
          "in downloading files from unverified sources",
          "in sharing personal memories on public forums",
          "in relying too heavily on outdated software"
        ],
        ans: 1,
        grammar: "Context Meaning",
        tip: "Read the context carefully. The passage contrasts the convenience of AI with the specific risk of obtaining unverified files from the internet."
      },
      {
        num: 2,
        type: "Concessive Clause",
        opts: [
          "Due to deep fake or voice cloning or adaptive malware",
          "Be it deep fake or voice cloning or adaptive malware",
          "Although it is deep fake or voice cloning or adaptive malware",
          "Despite deep fake or voice cloning or adaptive malware"
        ],
        ans: 1,
        grammar: "Subjunctive 'be it...'",
        tip: "'Be it A or B' is a subjunctive expression meaning 'whether it is A or B'."
      },
      {
        num: 3,
        type: "Independent Sentence",
        opts: [
          "It's no longer just famous personalities, politicians, and celebrities who can become the victims of such crimes",
          "Famous personalities, politicians, and celebrities who can become the victims of such crimes",
          "They are no longer just famous personalities, politicians, and celebrities who can become the victims of such crimes",
          "It's no longer just famous personalities, politicians, and celebrities can become the victims of such crimes"
        ],
        ans: 0,
        grammar: "Cleft sentence",
        tip: "'It is/was... who/that...' emphasizes the subject."
      },
      {
        num: 4,
        type: "Adverbial Clause of Reason",
        opts: [
          "unless you are absolutely sure the platform is secure",
          "so that hackers can improve their algorithmic models",
          "because you can never recover that",
          "to ensure your digital profile remains up to date"
        ],
        ans: 2,
        grammar: "Context Meaning",
        tip: "The context provides a strong warning ('Don't ever...'). The reason follows: once sensitive data is sent to AI, it cannot be retrieved ('never recover that')."
      },
      {
        num: 5,
        type: "Prepositional Phrase",
        opts: [
          "of the tool of AI doing evil things",
          "for the tool of AI doing evil things",
          "with the tool of AI doing evil things",
          "by the tool of AI doing evil things"
        ],
        ans: 2,
        grammar: "Preposition 'with'",
        tip: "'With' indicates using something as a tool or instrument."
      }
    ]
  },
  {
    id: 'dien_bien_phu_africa',
    title: 'How Dien Bien Phu victory reshaped Africa',
    meta: 'History & Global Impact',
    html: `
      <p>72 years ago on May the 7th, Vietnam’s victory was achieved ending French colonialism in Vietnam. In 1954, France was the world's second largest colonial power with territories stretching across north, west, and central Africa. The great Dien Bien Phu victory on May the 7th that year changed all of that. Just 178 days after the Dien Bien Phu victory, the Algerian National Liberation <span class="blank-tag">1</span>. And in 1956, Morocco and Tunisia both won their independence from France. A year later, Ghana became the first sub-Saharan African nation to gain independence. And in 1958, Ghana refused to join the French community, choosing immediate independence. <span class="blank-tag">2</span>, Ghana still survived. The message was clear. Independence was possible and irreversible.</p>
      <br>
      <p>What followed has since become known as the year of Africa. In 1960 alone, 17 African nations gained their independence, 14 of them former French colonies. <span class="blank-tag">3</span>. In 1962, Algeria, where the wave had begun 8 years earlier, gained full independence. And by 1962, virtually the entire French colonial empire in Africa had dissolved. <span class="blank-tag">4</span>. And now more than seven decades later, historians continue to view Dien Bien Phu <span class="blank-tag">5</span>.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Independent Sentence",
        opts: [
          "Front agreed to negotiate a peaceful settlement with the colonial government",
          "Front launched armed revolts across the country, marking the beginning of Algeria's struggle for independence",
          "Front decided to pause their military campaigns to seek international diplomatic support",
          "Front formed a coalition with neighboring countries to strengthen their economic policies"
        ],
        ans: 1,
        grammar: "Context Meaning",
        tip: "The Dien Bien Phu victory inspired immediate action. The passage mentions 'armed revolts' leading to 'struggle for independence'."
      },
      {
        num: 2,
        type: "Concessive Phrase",
        opts: [
          "Despite cut from all support from France overnight",
          "Because of being cut from all support from France overnight",
          "Despite being cut from all support from France overnight",
          "Although being cut from all support from France overnight"
        ],
        ans: 2,
        grammar: "Preposition + V-ing",
        tip: "'Despite' must be followed by a noun phrase or V-ing. Passive meaning uses 'being + V3/ed'."
      },
      {
        num: 3,
        type: "Independent Sentence",
        opts: [
          "The number of independent African countries to rise from 9 to 26 in a single year",
          "The number of independent African countries rising from 9 to 26 in a single year",
          "A number of independent African countries rose from 9 to 26 in a single year",
          "The number of independent African countries rose from 9 to 26 in a single year"
        ],
        ans: 3,
        grammar: "Subject + Verb agreement",
        tip: "'The number of...' takes a singular verb, but here it's past tense ('rose'). A complete sentence is needed."
      },
      {
        num: 4,
        type: "Prepositional Phrase",
        opts: [
          "Economic ties with Europe were permanently severed",
          "From one battle in Vietnam to the liberation of a continent in less than a decade",
          "The region then entered a long period of unprecedented economic prosperity",
          "Military alliances were immediately formed to prevent future conflicts"
        ],
        ans: 1,
        grammar: "Context Meaning",
        tip: "This is a summarizing sentence. It rhetorically connects the starting point ('one battle in Vietnam') to the final result ('liberation of a continent')."
      },
      {
        num: 5,
        type: "Prepositional Phrase",
        opts: [
          "as a turning point in global decolonization",
          "like a turning point in global decolonization",
          "to be a turning point in global decolonization",
          "for a turning point in global decolonization"
        ],
        ans: 0,
        grammar: "Verb + as",
        tip: "'View something as something' is a standard fixed structure."
      }
    ]
  },
  {
    id: 'rural_lifestyles',
    title: 'New rural lifestyles',
    meta: 'Society & Development',
    html: `
      <p>The perception of rural areas as poor and backward is a thing of the past. The shift toward a green and sustainable lifestyle has led Vietnamese people <span class="blank-tag">1</span>. This transformation has resulted in prosperous, beautiful, and civilized villages, <span class="blank-tag">2</span>. Across the country, from North to South, skilled and hardworking residents are striving to create a “livable countryside.”</p>
      <br>
      <p>For nearly 15 years, Vietnam has been undertaking a well-known national rural development program, widely promoted by the media. The program focuses on building modern rural spaces with essential infrastructure, <span class="blank-tag">3</span>. It emphasizes a quality-driven economy, diversification of industries, and specialization, exemplified by the well-known “One Commune One Product” (OCOP) program. Additionally, protecting ecological spaces, respecting natural landscapes, <span class="blank-tag">4</span>, and conserving historical and cultural relics have become key priorities <span class="blank-tag">5</span>.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Infinitive of Purpose",
        opts: [
          "to abandon traditional farming methods entirely",
          "to migrate to urban centers in search of better jobs",
          "to recognize the value and potential of their rural roots",
          "to demand higher wages for agricultural labor"
        ],
        ans: 2,
        grammar: "Context Meaning",
        tip: "The passage discusses a positive shift regarding rural areas. People are now seeing the 'value and potential' rather than viewing them as poor."
      },
      {
        num: 2,
        type: "Absolute Phrase",
        opts: [
          "with some even surpass urban areas in certain aspects",
          "with some even surpassing urban areas in certain aspects",
          "which some even surpassing urban areas in certain aspects",
          "some even surpassing urban areas in certain aspects"
        ],
        ans: 1,
        grammar: "With + Noun + V-ing",
        tip: "An absolute phrase starting with 'with' is used to provide accompanying circumstances."
      },
      {
        num: 3,
        type: "Participle Phrase",
        opts: [
          "include transportation, irrigation, clean water, electricity, telecommunications, and social facilities like schools and healthcare centers",
          "including transportation, irrigation, clean water, electricity, telecommunications, and social facilities like schools and healthcare centers",
          "included transportation, irrigation, clean water, electricity, telecommunications, and social facilities like schools and healthcare centers",
          "which including transportation, irrigation, clean water, electricity, telecommunications, and social facilities like schools and healthcare centers"
        ],
        ans: 1,
        grammar: "Prepositional participle",
        tip: "'Including' acts as a preposition here to introduce examples."
      },
      {
        num: 4,
        type: "Parallel Structure",
        opts: [
          "preserved traditional architecture",
          "to preserve traditional architecture",
          "preserving traditional architecture",
          "preservation traditional architecture"
        ],
        ans: 2,
        grammar: "Gerund phrase parallelism",
        tip: "Must be parallel with 'protecting', 'respecting', and 'conserving'."
      },
      {
        num: 5,
        type: "Prepositional Phrase",
        opts: [
          "in creating rural areas truly worthy of being called “livable”",
          "for creating rural areas truly worthy of being called “livable”",
          "to creating rural areas truly worthy of being called “livable”",
          "on creating rural areas truly worthy of being called “livable”"
        ],
        ans: 0,
        grammar: "Preposition 'in'",
        tip: "'Key priorities in doing something' signifies the field or context of the priorities."
      }
    ]
  },
  {
    id: 'mekong_delta_nature',
    title: 'Stunning nature in the fertile delta',
    meta: 'Environment & Tourism',
    html: `
      <p>Tram Chim National Park in Tam Nong, Dong Thap is the world’s 2,000th Ramsar site. Certified as an “important wetland of humanity”, it attracts many tourists to the Mekong Delta. With the park as its highlight, Tam Nong district has had all 11 of its communes recognized as meeting “the new rural standard”, <span class="blank-tag">1</span>. Visitors to Tam Nong can admire vast wetlands characteristic of the delta, with birds in the sky, and scenes of lotus flowers and water lilies. <span class="blank-tag">2</span>, as tourists enjoy rustic dishes, and listen to sweet Vong Co melodies.</p>
      <br>
      <p>Building new rural areas is no longer a distant goal but an ongoing process that demands perseverance and has no endpoint. <span class="blank-tag">3</span>.</p>
      <br>
      <p>According to the National Coordination Office of the NTP on New Rural Development, <span class="blank-tag">4</span>, and 2,825 communes will meet “advanced” and “model new rural standards”. <span class="blank-tag">5</span>.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Absolute Phrase",
        opts: [
          "with four communes achieving the status of “advanced new rural standard”",
          "with four communes achieved the status of “advanced new rural standard”",
          "which four communes achieving the status of “advanced new rural standard”",
          "for four communes achieving the status of “advanced new rural standard”"
        ],
        ans: 0,
        grammar: "With + Noun + V-ing",
        tip: "'With' is used to show accompanying circumstances with an active meaning (achieving)."
      },
      {
        num: 2,
        type: "Independent Sentence",
        opts: [
          "The local authorities strictly regulate wildlife observation",
          "The journey includes many chances to experience the unique culture of people in the Mekong Delta",
          "The park requires visitors to undergo environmental training",
          "Modern resorts have replaced the traditional villages"
        ],
        ans: 1,
        grammar: "Context Meaning",
        tip: "The sentence mentions 'rustic dishes' and 'sweet Vong Co melodies', which are cultural experiences, fitting perfectly with 'unique culture'."
      },
      {
        num: 3,
        type: "Independent Sentence",
        opts: [
          "The government has decided to halt all funding for these long-term projects",
          "Young people are increasingly leaving these areas to avoid the hard work",
          "Residents of each region are adapting to the lifestyles and resources bestowed by Mother Nature and displaying unique creativity to achieve truly sustainable development",
          "Modern technology has completely removed the need for human labor in these agricultural regions"
        ],
        ans: 2,
        grammar: "Context Meaning",
        tip: "The context discusses an 'ongoing process' and 'perseverance'. Adapting to nature and displaying creativity aligns with this sustainable development goal."
      },
      {
        num: 4,
        type: "Future tense clause",
        opts: [
          "by the end of 2024, 78% of communes across the country to meet “new rural standards”",
          "by the end of 2024, 78% of communes across the country will meet “new rural standards”",
          "by the end of 2024, 78% of communes across the country meeting “new rural standards”",
          "by the end of 2024, 78% of communes across the country met “new rural standards”"
        ],
        ans: 1,
        grammar: "Future Prediction",
        tip: "The clause needs a finite verb for a future prediction ('will meet')."
      },
      {
        num: 5,
        type: "Independent Sentence",
        opts: [
          "These communes having 15,590 OCOP products with 3-star ratings or more",
          "Which communes have 15,590 OCOP products with 3-star ratings or more",
          "These communes have 15,590 OCOP products with 3-star ratings or more",
          "Because these communes have 15,590 OCOP products with 3-star ratings or more"
        ],
        ans: 2,
        grammar: "Independent sentence structure",
        tip: "A complete sentence concluding the paragraph."
      }
    ]
  },
  {
    id: 'hanoi_transformation',
    title: 'Autumn sky, a new robe (Hanoi’s transformation)',
    meta: 'Urban Development & Heritage',
    html: `
      <p>Hanoi’s transformation in the 21st century reflects long-held dreams of modernization <span class="blank-tag">1</span>. Once imagined in songs and poetry, the capital now presents a dynamic urban landscape shaped by expanding transport systems, modern architecture, and renewed public spaces.</p>
      <br>
      <p>The city has developed a clear network of radial highways and concentric ring roads based on historical foundations such as Ring Road No. 1, which once followed the ramparts of Dai La Citadel. <span class="blank-tag">2</span>, Hanoi now connects to the wider northern region through six major arterial routes. New bridges spanning the Red and Duong rivers, including Nhat Tan, Thanh Tri, and Dong Tru, <span class="blank-tag">3</span>.</p>
      <br>
      <p>Transport infrastructure has also evolved through elevated railways, multilayered intersections, and major roads that help reduce congestion. Elevated metro lines now form part of everyday urban life, <span class="blank-tag">4</span>.</p>
      <br>
      <p>At the same time, Hanoi’s skyline has risen dramatically. The city is home to more than 1,200 high-rise buildings, including Landmark 72, the tallest tower in Hanoi. Modern skyscrapers such as Lotte Center and Techno Park Tower emphasize innovation, energy efficiency, and contemporary architectural design.</p>
      <br>
      <p>Large-scale cultural and civic projects—including the National Convention Center, Hanoi Museum, and Vietnam Military History Museum—have created a modern urban hub that complements the historic core. Meanwhile, the coexistence of new structures with heritage sites, especially around Ba Dinh Square and the Thang Long Imperial Citadel, <span class="blank-tag">5</span>.</p>
      <br>
      <p>Throughout this transformation, lakes, parks, and green spaces continue to play a central role, preserving Hanoi’s identity while supporting the demands of modern urban life.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Adverbial Clause of Time/Contrast",
        opts: [
          "while preserve the spirit of its thousand-year-old heritage",
          "to preserve the spirit of its thousand-year-old heritage",
          "while preserving the spirit of its thousand-year-old heritage",
          "which preserving the spirit of its thousand-year-old heritage"
        ],
        ans: 2,
        grammar: "While + V-ing",
        tip: "'While' can be followed by a present participle to show two simultaneous actions or a contrast."
      },
      {
        num: 2,
        type: "Prepositional Phrase",
        opts: [
          "Despite facing numerous financial shortages in recent years",
          "Because the city rejected plans for modern highways",
          "To preserve the ancient architecture of the inner city",
          "From having only the Thang Long–Noi Bai Expressway in the 1990s"
        ],
        ans: 3,
        grammar: "Context Meaning",
        tip: "The passage contrasts the past ('in the 1990s') with the present ('now connects... through six major arterial routes')."
      },
      {
        num: 3,
        type: "Predicate",
        opts: [
          "reshaping the city’s geography and urban outlook",
          "to reshape the city’s geography and urban outlook",
          "have reshaped the city’s geography and urban outlook",
          "which reshaped the city’s geography and urban outlook"
        ],
        ans: 2,
        grammar: "Present perfect tense verb",
        tip: "The main clause 'New bridges...' needs a main verb 'have reshaped'."
      },
      {
        num: 4,
        type: "Participle Phrase",
        opts: [
          "symbolized a new era of public transport",
          "symbolizing a new era of public transport",
          "which symbolizing a new era of public transport",
          "to symbolize a new era of public transport"
        ],
        ans: 1,
        grammar: "Present participle clause",
        tip: "A present participle ('symbolizing') follows a comma to describe the result or significance of the main clause."
      },
      {
        num: 5,
        type: "Predicate",
        opts: [
          "proves that old architecture is no longer relevant",
          "reflects an ongoing dialogue between tradition and modernity",
          "creates a stark contrast that many residents find unappealing",
          "forces urban planners to demolish heritage sites"
        ],
        ans: 1,
        grammar: "Context Meaning",
        tip: "The passage speaks positively about 'coexistence' of new structures with heritage sites, indicating a harmony ('dialogue') rather than conflict or demolition."
      }
    ]
  },
  {
    id: 'drone_ai_nav',
    title: 'Drone Technology Powered by AI',
    meta: 'Technology & Aviation',
    html: `
      <p>One of the most impactful advancements is in autonomous navigation. AI-powered obstacle avoidance systems allow drones to detect and manoeuvre around obstacles in real time, <span class="blank-tag">1</span>. AI also enhances path planning, helping drones determine the most efficient routes based on weather conditions, terrain, and specific mission goals.</p>
      <br>
      <p>Another game-changer is computer vision, <span class="blank-tag">2</span>. This is particularly valuable in areas like surveillance, agriculture, and search-and-rescue missions. AI-powered tracking systems also allow drones to follow moving objects accurately, making them useful for applications such as wildlife monitoring, security, and sports filming.</p>
      <br>
      <p>AI significantly improves data processing and analysis, allowing drones to generate real-time insights during operations. Whether it’s assessing disaster-stricken areas or inspecting infrastructure, AI-driven analytics provide critical information on the spot. Additionally, <span class="blank-tag">3</span>, helping industries make more informed decisions.</p>
      <br>
      <p>Communication between drones has also advanced through swarm intelligence, <span class="blank-tag">4</span>. AI optimises connectivity, ensuring stable and reliable communication between drones and control centres. When it comes to maintenance and performance, AI plays a crucial role in predictive maintenance. Drones can monitor their own health, anticipate potential failures, and schedule maintenance before issues arise, <span class="blank-tag">5</span>. AI also optimises performance parameters to ensure drones operate at peak efficiency.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Participle Phrase",
        opts: [
          "make flights safer and more reliable",
          "to make flights safer and more reliable",
          "making flights safer and more reliable",
          "made flights safer and more reliable"
        ],
        ans: 2,
        grammar: "Present Participle",
        tip: "A present participle phrase ('making...') is used after a comma to describe the result of the previous action."
      },
      {
        num: 2,
        type: "Context Meaning Clause",
        opts: [
          "which restricts drones from operating in densely populated urban areas",
          "which enables drones to recognise and classify objects with high precision",
          "which forces operators to manually adjust camera angles during flight",
          "which consumes a significant amount of battery power"
        ],
        ans: 1,
        grammar: "Context Meaning",
        tip: "The following sentence mentions 'surveillance, agriculture, and search-and-rescue', which rely heavily on recognizing and classifying objects."
      },
      {
        num: 3,
        type: "Context Meaning Clause",
        opts: [
          "humans must manually sort through the collected footage",
          "drones are strictly limited to collecting data within short distances",
          "physical inspections by human workers remain the only reliable method",
          "AI can integrate and analyse vast amounts of data collected over time"
        ],
        ans: 3,
        grammar: "Context Meaning",
        tip: "The paragraph is about 'data processing and analysis'. Integrating and analyzing vast amounts of data fits this context perfectly."
      },
      {
        num: 4,
        type: "Relative Adverb",
        opts: [
          "which multiple drones work together efficiently",
          "where multiple drones work together efficiently",
          "that multiple drones work together efficiently",
          "when multiple drones work together efficiently"
        ],
        ans: 1,
        grammar: "Relative Adverb 'where'",
        tip: "'Where' is used to refer back to 'swarm intelligence' as an abstract space/situation in which drones work together."
      },
      {
        num: 5,
        type: "Participle Phrase",
        opts: [
          "reduce downtime and extend their lifespan",
          "reducing downtime and extending their lifespan",
          "to reduce downtime and extend their lifespan",
          "reduced downtime and extended their lifespan"
        ],
        ans: 1,
        grammar: "Present Participle of Result",
        tip: "Similar to Question 1, a present participle phrase ('reducing...') expresses the overall result of anticipating failures and scheduling maintenance."
      }
    ]
  },
  {
    id: 'drone_frontiers',
    title: 'Expanding Frontiers for AI-Powered Drones',
    meta: 'Business & Logistics',
    html: `
      <p>Drones are transforming industries by making operations more efficient, cost-effective, and data-driven. In agriculture, AI-powered drones are revolutionising precision farming <span class="blank-tag">1</span>. Automated spraying reduces chemical use while increasing yields, helping farmers cut costs and improve sustainability. <span class="blank-tag">2</span>, leading to higher productivity and better resource management.</p>
      <br>
      <p>In logistics, drones are reshaping last-mile delivery by bypassing traffic and reaching remote areas quickly. Companies like Amazon, UPS, and Zipline are already testing drone deliveries for medical supplies and e-commerce, <span class="blank-tag">3</span>. Drones are also improving warehouse management by conducting automated inventory checks, reducing labour costs, and increasing efficiency. However, <span class="blank-tag">4</span>.</p>
      <br>
      <p>For infrastructure monitoring, drones provide safer and more efficient inspections of hard-to-reach areas like bridges, wind turbines, and power lines. AI-powered image analysis detects cracks and structural weaknesses early, <span class="blank-tag">5</span>. By eliminating the need for workers to operate in hazardous conditions, drones enhance safety while reducing costs. As technology advances, integration with the Internet of Things (IoT) and digital twin systems will further improve real-time monitoring and predictive maintenance.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Preposition + V-ing",
        opts: [
          "to use multispectral imaging to monitor crop health, detect diseases early, and optimise irrigation",
          "by using multispectral imaging to monitor crop health, detect diseases early, and optimise irrigation",
          "for using multispectral imaging to monitor crop health, detect diseases early, and optimise irrigation",
          "in using multispectral imaging to monitor crop health, detect diseases early, and optimise irrigation"
        ],
        ans: 1,
        grammar: "Preposition 'by'",
        tip: "'By doing something' expresses the method or way something is achieved."
      },
      {
        num: 2,
        type: "Context Meaning Clause",
        opts: [
          "The heavy reliance on traditional machinery prevents modern farming techniques",
          "The lack of internet connectivity in rural areas hinders communication",
          "The ability to gather real-time data enables smarter decision-making",
          "The high cost of drone maintenance discourages small-scale farmers"
        ],
        ans: 2,
        grammar: "Context Meaning",
        tip: "The paragraph focuses on efficiency and 'data-driven' operations. Gathering real-time data for smarter decision-making logically leads to 'higher productivity'."
      },
      {
        num: 3,
        type: "Participle Phrase",
        opts: [
          "significantly reduced delivery times",
          "significantly reducing delivery times",
          "to significantly reduce delivery times",
          "which significantly reducing delivery times"
        ],
        ans: 1,
        grammar: "Present Participle of Result",
        tip: "A present participle phrase ('reducing...') follows a comma to express the positive result of using drones for delivery."
      },
      {
        num: 4,
        type: "Context Meaning Clause",
        opts: [
          "companies have completely abandoned the idea due to high operational costs",
          "regulatory challenges and airspace restrictions remain hurdles to widespread adoption",
          "consumers still prefer walking to physical stores to purchase their goods",
          "human delivery drivers are faster and more reliable than automated systems"
        ],
        ans: 1,
        grammar: "Context Meaning",
        tip: "The conjunction 'However' signals a contrast. Despite the benefits mentioned, there are still obstacles ('hurdles') like regulations."
      },
      {
        num: 5,
        type: "Participle Phrase",
        opts: [
          "prevented costly failures and improved maintenance planning",
          "preventing costly failures and improving maintenance planning",
          "to prevent costly failures and improve maintenance planning",
          "prevent costly failures and improve maintenance planning"
        ],
        ans: 1,
        grammar: "Present Participle of Result",
        tip: "A present participle phrase ('preventing... and improving...') acts as a result clause after the main action."
      }
    ]
  },
  {
    id: 'drone_disaster',
    title: 'Drones in Disaster Management',
    meta: 'Society & Emergency Response',
    html: `
      <p>Drones are becoming an essential tool in disaster management, offering speed, efficiency, and versatility in emergency response efforts. Their ability to quickly gather real-time data, navigate difficult terrain, and assist in life-saving operations <span class="blank-tag">1</span>. One of the most critical applications of drones is surveillance and damage assessment. In the aftermath of a disaster, drones can rapidly survey affected areas, capturing aerial imagery and providing real-time data. <span class="blank-tag">2</span>, identify hazards, and determine where resources are needed most.</p>
      <br>
      <p>Drones are also transforming search and rescue operations. Equipped with thermal imaging cameras, they can detect body heat, <span class="blank-tag">3</span> – especially in conditions where traditional search methods are too dangerous or slow. When access to disaster-stricken areas is limited due to damaged infrastructure, drones can deliver essential supplies such as food, water, medical aid, and communication devices. Their ability to reach remote or hazardous locations ensures <span class="blank-tag">4</span>.</p>
      <br>
      <p>Beyond immediate response, drones play a key role in mapping and modelling disaster areas. They can generate detailed 3D maps that help responders understand terrain changes, structural damage, and potential risks, improving planning and coordination efforts. In situations where communication networks have been disrupted, drones can act as temporary communication relays, <span class="blank-tag">5</span>. This is particularly crucial in large-scale disasters where swift coordination can save lives.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Subject-Verb Agreement",
        opts: [
          "make them invaluable in crisis situations",
          "makes them invaluable in crisis situations",
          "making them invaluable in crisis situations",
          "to make them invaluable in crisis situations"
        ],
        ans: 1,
        grammar: "Singular Subject",
        tip: "The core subject is 'Their ability', which is singular, so the verb must be 'makes'."
      },
      {
        num: 2,
        type: "Context Meaning Clause",
        opts: [
          "This forces residents to evacuate the city immediately",
          "This delays the deployment of ground rescue teams",
          "This helps emergency teams assess the extent of destruction",
          "This prevents journalists from reporting the news accurately"
        ],
        ans: 2,
        grammar: "Context Meaning",
        tip: "The previous sentence mentions providing real-time data. This data 'helps emergency teams assess' the destruction, which fits with 'identify hazards'."
      },
      {
        num: 3,
        type: "Context Meaning Clause",
        opts: [
          "making it easier to locate missing persons in collapsed buildings, dense forests, or flood zones",
          "confusing rescuers who rely solely on traditional tracking dogs",
          "creating false alarms that waste valuable time and resources",
          "requiring specialized training that most local volunteers lack"
        ],
        ans: 0,
        grammar: "Context Meaning",
        tip: "Detecting body heat is highly beneficial for search and rescue. It 'makes it easier to locate missing persons'."
      },
      {
        num: 4,
        type: "Noun Clause",
        opts: [
          "what critical resources get to those in need without delay",
          "which critical resources get to those in need without delay",
          "that critical resources get to those in need without delay",
          "where critical resources get to those in need without delay"
        ],
        ans: 2,
        grammar: "Noun Clause with 'that'",
        tip: "The verb 'ensures' is followed by a 'that' clause to state the fact being guaranteed."
      },
      {
        num: 5,
        type: "Participle Phrase",
        opts: [
          "to restore connectivity for emergency teams and affected communities",
          "restored connectivity for emergency teams and affected communities",
          "restoring connectivity for emergency teams and affected communities",
          "which restoring connectivity for emergency teams and affected communities"
        ],
        ans: 2,
        grammar: "Present Participle",
        tip: "A present participle phrase ('restoring...') describes the result or function of acting as temporary communication relays."
      }
    ]
  },
  {
    id: 'drone_industries',
    title: 'Transforming Multiple Industries',
    meta: 'Technology & Economy',
    html: `
      <p>AI-powered drones are transforming multiple industries by improving efficiency, reducing costs, and enabling data-driven decision-making. In agriculture, drones support precision farming through multispectral imaging that monitors crop health, detects diseases, and optimises irrigation. <span class="blank-tag">1</span>. By collecting real-time data, drones help farmers manage resources more effectively and make smarter decisions.</p>
      <br>
      <p>In logistics, drones are reshaping last-mile delivery by avoiding traffic and reaching remote areas quickly. Major companies such as Amazon, UPS, and Zipline are testing drone delivery services for medical supplies and e-commerce products. Drones also improve warehouse management through automated inventory checks, <span class="blank-tag">2</span>. However, regulations and airspace restrictions still limit wider implementation.</p>
      <br>
      <p>Drones also play a crucial role in infrastructure monitoring. They inspect difficult and hazardous locations such as bridges, wind turbines, and power lines more safely and efficiently than traditional methods. AI-powered image analysis identifies structural damage and weaknesses early, <span class="blank-tag">3</span>. Future integration with IoT and digital twin technologies is expected to enhance real-time monitoring capabilities further.</p>
      <br>
      <p>In disaster management, drones have become essential tools for emergency response. They rapidly gather aerial imagery and real-time data to assess damage, identify hazards, and guide resource allocation after disasters. Equipped with thermal imaging cameras, <span class="blank-tag">4</span>. They can also deliver food, water, medical supplies, and communication devices to isolated communities when infrastructure is damaged.</p>
      <br>
      <p>Beyond emergency response, drones generate detailed 3D maps for disaster planning, restore temporary communication networks, monitor environmental threats such as floods and wildfires, and collect important environmental data. <span class="blank-tag">5</span>.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Context Meaning Clause",
        opts: [
          "Farmers are entirely replacing human labor with these automated machines",
          "Automated spraying systems reduce chemical usage while increasing productivity and sustainability",
          "The high cost of drones makes them inaccessible to most agricultural businesses",
          "Excessive reliance on drones has led to a decrease in overall crop quality"
        ],
        ans: 1,
        grammar: "Context Meaning",
        tip: "The paragraph focuses on the positive applications of drones in agriculture, such as optimizing irrigation and reducing chemical usage."
      },
      {
        num: 2,
        type: "Participle Phrase",
        opts: [
          "helped reduce labour costs and increase operational efficiency",
          "helping reduce labour costs and increase operational efficiency",
          "to help reduce labour costs and increase operational efficiency",
          "which helping reduce labour costs and increase operational efficiency"
        ],
        ans: 1,
        grammar: "Present Participle",
        tip: "A present participle phrase ('helping...') describes the ongoing result of automated inventory checks."
      },
      {
        num: 3,
        type: "Participle Phrase",
        opts: [
          "supported predictive maintenance and prevented costly failures",
          "to support predictive maintenance and preventing costly failures",
          "supporting predictive maintenance and preventing costly failures",
          "support predictive maintenance and prevent costly failures"
        ],
        ans: 2,
        grammar: "Present Participle of Result",
        tip: "A present participle phrase ('supporting... and preventing...') acts as a result clause after the main action."
      },
      {
        num: 4,
        type: "Context Meaning Clause",
        opts: [
          "the batteries drain much faster in extremely cold environments",
          "drones improve search and rescue operations by locating missing persons in dangerous or inaccessible areas",
          "operators struggle to maintain a stable connection with the control center",
          "they are primarily used to capture high-resolution photos for news outlets"
        ],
        ans: 1,
        grammar: "Context Meaning",
        tip: "The phrase 'Equipped with thermal imaging cameras' is a modifier that logically points to improving search and rescue operations by locating missing persons."
      },
      {
        num: 5,
        type: "Passive Voice",
        opts: [
          "They also used in disaster preparedness training and simulations",
          "They are also using in disaster preparedness training and simulations",
          "They are also used in disaster preparedness training and simulations",
          "They have also used in disaster preparedness training and simulations"
        ],
        ans: 2,
        grammar: "Passive Voice",
        tip: "A full sentence using the passive voice ('are used') is needed to show another application of drones."
      }
    ]
  },
  {
    id: 'asia_ev',
    title: 'The Rise of Asia as an EV Powerhouse',
    meta: 'Economy & Environment',
    html: `
      <p>Asia has become the epicentre of electric vehicle (EV) innovation and adoption. Countries like China, Japan, and South Korea have launched aggressive policies to boost EV usage, reduce emissions, and foster local industry growth. Chinese firms, in particular, have made spectacular strides, <span class="blank-tag">1</span>, even surpassing American EV innovator Tesla.</p>
      <br>
      <p>Founded by South African-born Elon Musk, Tesla revolutionised perceptions of EVs in the early 2010s. The company’s sleek designs, autonomous driving features, and extensive Supercharger network set the benchmark for electric cars. However, in recent years, Chinese companies like BYD, Geely, SAIC and Changan have begun to challenge Tesla’s dominance, <span class="blank-tag">2</span>.</p>
      <br>
      <p>BYD’s strategic focus on affordability and scale distinguishes it from Tesla’s premium positioning. The Chinese company has heavily invested in vertical integration, controlling everything from batteries to vehicle assembly, <span class="blank-tag">3</span>. Their recent models have gained popularity not only domestically but also increasingly in international markets like Europe and Latin America.</p>
      <br>
      <p>Significantly, BYD’s adoption of “blade” lithium-ion phosphate (LFP) battery technology is claimed to enhance safety and durability while reducing costs. The innovative battery design allows for more compact and flexible battery packs, <span class="blank-tag">4</span>. BYD’s extensive product lineup and aggressive pricing strategy have made it a formidable competitor, <span class="blank-tag">5</span>.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Absolute Phrase",
        opts: [
          "with privately owned BYD emerging as a global leader",
          "for privately owned BYD emerging as a global leader",
          "by privately owned BYD emerging as a global leader",
          "which privately owned BYD emerging as a global leader"
        ],
        ans: 0,
        grammar: "Absolute Phrase with 'with'",
        tip: "The structure 'with + noun + V-ing' provides additional accompanying context to the main clause."
      },
      {
        num: 2,
        type: "Context Meaning Clause",
        opts: [
          "shifting their focus entirely to the production of luxury sports cars",
          "leveraging lower costs, integrated battery manufacturing, and mass-market models",
          "abandoning the electric vehicle market to focus on traditional gasoline engines",
          "depending heavily on imported technology from European manufacturers"
        ],
        ans: 1,
        grammar: "Context Meaning",
        tip: "The passage explains how Chinese companies challenge Tesla. They do so by taking advantage of ('leveraging') lower costs and mass-market models."
      },
      {
        num: 3,
        type: "Relative Clause",
        opts: [
          "what enables cost efficiencies and rapid innovation",
          "that enables cost efficiencies and rapid innovation",
          "which enables cost efficiencies and rapid innovation",
          "it enables cost efficiencies and rapid innovation"
        ],
        ans: 2,
        grammar: "Non-defining Relative Clause",
        tip: "A non-defining relative clause starting with 'which' is used after a comma to comment on the entire preceding clause."
      },
      {
        num: 4,
        type: "Context Meaning Clause",
        opts: [
          "leading to lighter vehicles with longer ranges",
          "causing the vehicles to become excessively heavy and slow",
          "making it impossible to install in smaller, urban vehicles",
          "requiring frequent replacements that frustrate many drivers"
        ],
        ans: 0,
        grammar: "Context Meaning",
        tip: "The text discusses 'innovative battery design' that is 'compact and flexible'. The logical positive outcome is 'lighter vehicles with longer ranges'."
      },
      {
        num: 5,
        type: "Prepositional Phrase",
        opts: [
          "especially among mass-market consumers",
          "especially between mass-market consumers",
          "especially in mass-market consumers",
          "especially within mass-market consumers"
        ],
        ans: 0,
        grammar: "Preposition 'among'",
        tip: "'Among' is used to refer to a group or category of people, such as 'consumers'."
      }
    ]
  },
  {
    id: 'asia_ev_market',
    title: 'Asia\'s EV Market',
    meta: 'Economy & Technology',
    html: `
      <p>Asia has emerged as the global centre of electric vehicle (EV) innovation and adoption, led by countries such as China, Japan, and South Korea. Through strong government policies promoting EV usage, emissions reduction, and industrial growth, Asian manufacturers have rapidly advanced in the global market. Among them, <span class="blank-tag">1</span>, even surpassing it in several areas.</p>
      <br>
      <p>Tesla, founded by Elon Musk, transformed the EV industry in the early 2010s with stylish vehicles, autonomous driving technology, and an extensive charging network. However, <span class="blank-tag">2</span> by offering lower-cost vehicles, integrated battery production, and models aimed at mass-market consumers.</p>
      <br>
      <p>BYD’s success is largely driven by its focus on affordability, large-scale production, and vertical integration, <span class="blank-tag">3</span>. Its innovative “blade” lithium-ion phosphate battery technology improves safety, durability, and efficiency while reducing production costs. As a result, BYD has expanded rapidly both within China and in international markets such as Europe and Latin America. In 2024, <span class="blank-tag">4</span>, compared to Tesla’s 1.79 million vehicle deliveries and USD97.7 billion in revenue. BYD also overtook Volkswagen as China’s leading passenger car seller.</p>
      <br>
      <p>Chinese consumers have played a key role in this rise, increasingly favouring domestic brands over foreign automakers. China now controls more than 60 percent of the global EV market, and despite recent US trade tensions, <span class="blank-tag">5</span>.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Subject-Verb Agreement",
        opts: [
          "Chinese company BYD have become a major competitor to Tesla",
          "Chinese company BYD has become a major competitor to Tesla",
          "Chinese company BYD becoming a major competitor to Tesla",
          "Chinese company BYD to become a major competitor to Tesla"
        ],
        ans: 1,
        grammar: "Singular Subject",
        tip: "'Chinese company BYD' is a singular subject, requiring the singular verb 'has become'."
      },
      {
        num: 2,
        type: "Context Meaning Clause",
        opts: [
          "traditional European car manufacturers have successfully reclaimed their market share",
          "Chinese automakers including BYD, Geely, SAIC, and Changan have increasingly challenged Tesla",
          "governments worldwide have decided to withdraw subsidies for electric vehicles",
          "consumers have lost interest in electric vehicles due to safety concerns"
        ],
        ans: 1,
        grammar: "Context Meaning",
        tip: "The transition word 'However' introduces a contrast to Tesla's dominance, pointing to the challenge from Chinese automakers."
      },
      {
        num: 3,
        type: "Participle Phrase",
        opts: [
          "allowed the company to control battery manufacturing and vehicle assembly",
          "allows the company to control battery manufacturing and vehicle assembly",
          "to allow the company to control battery manufacturing and vehicle assembly",
          "allowing the company to control battery manufacturing and vehicle assembly"
        ],
        ans: 3,
        grammar: "Present Participle of Result",
        tip: "A present participle ('allowing') is used after a comma to indicate the result of the previous action."
      },
      {
        num: 4,
        type: "Context Meaning Clause",
        opts: [
          "Tesla announced a complete halt on all international production facilities",
          "BYD significantly outperformed Tesla by delivering 4.27 million vehicles and generating USD107 billion in revenue",
          "the total number of gasoline cars sold worldwide reached an all-time low",
          "most electric vehicle companies reported massive financial losses"
        ],
        ans: 1,
        grammar: "Context Meaning",
        tip: "The text directly compares these figures to 'Tesla’s 1.79 million vehicle deliveries', making BYD's outperformance the logical fit."
      },
      {
        num: 5,
        type: "Context Meaning Clause",
        opts: [
          "Chinese EV companies continue expanding into alternative international markets",
          "they have decided to focus exclusively on their domestic market",
          "international investors have pulled their funding from Asian startups",
          "the transition to renewable energy sources has completely stopped"
        ],
        ans: 0,
        grammar: "Context Meaning",
        tip: "The use of 'despite' suggests that even with trade tensions, these companies maintain a positive trajectory, expanding into alternative markets."
      }
    ]
  },
  {
    id: 'red_panda',
    title: 'The Red Panda',
    meta: 'Nature & Wildlife',
    html: `
      <p>Mention the word “panda” and the first thing most of us think about are China’s iconic black and white bears. If it was Po that came to mind, the wise-cracking star of the Kung Fu Panda films, <span class="blank-tag">1</span>: the adorable red panda – or Master Shifu in the movies.</p>
      <br>
      <p>In fact, while red pandas and giant pandas share a similar name, and both have a weakness for bamboo, that’s where the similarity ends. They aren’t closely related: Modern genetic evidence places red pandas in close affinity with raccoons, weasels, and skunks. Giant pandas, by contrast, are true bears, <span class="blank-tag">2</span>.</p>
      <br>
      <p>While it may be overshadowed by its more well-known cousin, the red panda is a symbol of the biodiversity found in the remote, mist-covered forests of the Eastern Himalayas and other mountainous regions of Asia where it lives. This small, tree-dwelling mammal faces numerous challenges in the wild, <span class="blank-tag">3</span>.</p>
      <br>
      <p>The red panda is a strikingly beautiful creature, <span class="blank-tag">4</span>, but it belongs to its own unique family Ailuridae. It is often referred to as a “firefox” because of its reddish-brown fur, <span class="blank-tag">5</span>.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Main Clause",
        opts: [
          "you will also know the not-so-famous kind",
          "you will also knowing the not-so-famous kind",
          "you will also known the not-so-famous kind",
          "you will also to know the not-so-famous kind"
        ],
        ans: 0,
        grammar: "Modal Verb + Bare Infinitive",
        tip: "The modal verb 'will' must be followed by a bare infinitive ('know')."
      },
      {
        num: 2,
        type: "Context Meaning Clause",
        opts: [
          "which roam exclusively in the savannas of Africa",
          "part of the family Ursidae alongside sun bears, moon bears, and polar bears",
          "belonging to a completely extinct lineage of prehistoric animals",
          "relying entirely on meat for their daily nutritional needs"
        ],
        ans: 1,
        grammar: "Context Meaning",
        tip: "The sentence contrasts giant pandas with red pandas by stating that giant pandas are 'true bears', which aligns with 'part of the family Ursidae'."
      },
      {
        num: 3,
        type: "Context Meaning Clause",
        opts: [
          "leading to a rapid and uncontrolled increase in their population",
          "making it a focal point of global conservation efforts",
          "causing them to migrate to urban centers in search of food",
          "proving that they are highly adaptable to changing environments"
        ],
        ans: 1,
        grammar: "Context Meaning",
        tip: "Because the red panda faces 'numerous challenges in the wild', it logically becomes a 'focal point of global conservation efforts'."
      },
      {
        num: 4,
        type: "Participle Phrase",
        opts: [
          "resembled a cross between a fox, a raccoon, and a domestic cat",
          "to resemble a cross between a fox, a raccoon, and a domestic cat",
          "resembling a cross between a fox, a raccoon, and a domestic cat",
          "which resembling a cross between a fox, a raccoon, and a domestic cat"
        ],
        ans: 2,
        grammar: "Present Participle",
        tip: "A present participle ('resembling') is used to add descriptive information about the subject 'creature'."
      },
      {
        num: 5,
        type: "Relative Clause",
        opts: [
          "what helps it blend into the mossy tree trunks",
          "which helps it blend into the mossy tree trunks",
          "who helps it blend into the mossy tree trunks",
          "it helps it blend into the mossy tree trunks"
        ],
        ans: 1,
        grammar: "Relative Pronoun",
        tip: "'Which' is used to refer back to the entire preceding clause or the specific noun 'reddish-brown fur'."
      }
    ]
  },
  {
    id: 'qatar_airways',
    title: 'Qatar Airways',
    meta: 'Business & Aviation',
    html: `
      <p>Qatar Airways, the national carrier of the State of Qatar, is the world’s fastest-growing airline, continuously expanding its network with new and exciting destinations. Operating a modern fleet, <span class="blank-tag">1</span>.</p>
      <br>
      <p>A multiple award-winning airline, Qatar Airways was named Airline of the Year by the 2024 World Airline Awards, managed by the prestigious international air transport rating organization Skytrax. In addition to being named the World’s Best Airline 2024, <span class="blank-tag">2</span>, World’s Best Business Class Lounge, and Best Airline in the Middle East.</p>
      <br>
      <p>Beyond aviation, Qatar Airways is a proud partner of major global sporting events, <span class="blank-tag">3</span>. As the official airline of the FIFA World Cup Qatar 2022™, the airline played a pivotal role in connecting fans to this historic event. Looking ahead, Qatar Airways continues to reinforce its commitment to sports by becoming a global partner of Formula 1® in 2027, <span class="blank-tag">4</span>.</p>
      <br>
      <p>As a member of the oneworld global alliance—the first Gulf carrier to join—Qatar Airways remains dedicated to delivering a seamless travel experience <span class="blank-tag">5</span>.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Context Meaning Clause",
        opts: [
          "the company has decided to reduce its number of international flights",
          "the airline sets the benchmark for excellence in air travel",
          "passengers frequently complain about the lack of modern amenities",
          "it relies heavily on outdated aircraft to maintain low ticket prices"
        ],
        ans: 1,
        grammar: "Context Meaning",
        tip: "The passage speaks highly of the airline, describing it as 'fastest-growing' and 'expanding'. Setting a benchmark for excellence is consistent with this tone."
      },
      {
        num: 2,
        type: "Present Perfect",
        opts: [
          "Qatar Airways has also won awards for World’s Best Business Class",
          "Qatar Airways had also won awards for World’s Best Business Class",
          "Qatar Airways have also won awards for World’s Best Business Class",
          "Qatar Airways also winning awards for World’s Best Business Class"
        ],
        ans: 0,
        grammar: "Present Perfect Tense",
        tip: "The present perfect 'has won' describes past achievements that are relevant to its current status."
      },
      {
        num: 3,
        type: "Participle Phrase",
        opts: [
          "strengthened its position as an airline of choice",
          "to strengthen its position as an airline of choice",
          "strengthening its position as an airline of choice",
          "which strengthening its position as an airline of choice"
        ],
        ans: 2,
        grammar: "Present Participle of Result",
        tip: "A present participle ('strengthening') follows the comma to express the positive outcome of its sporting partnerships."
      },
      {
        num: 4,
        type: "Context Meaning Clause",
        opts: [
          "further solidifying its presence on the world stage",
          "completely withdrawing its sponsorships from international competitions",
          "acknowledging that sports marketing yields no significant benefits",
          "shifting its entire focus away from the aviation industry"
        ],
        ans: 0,
        grammar: "Context Meaning",
        tip: "Becoming a global partner of Formula 1 will logically 'further solidify its presence on the world stage'."
      },
      {
        num: 5,
        type: "Prepositional Phrase",
        opts: [
          "with reliability, trust, and confidence at its core",
          "for reliability, trust, and confidence at its core",
          "in reliability, trust, and confidence at its core",
          "on reliability, trust, and confidence at its core"
        ],
        ans: 0,
        grammar: "Preposition 'with'",
        tip: "The phrase 'with [something] at its core' is a common idiom meaning having those qualities as a central foundation."
      }
    ]
  },
  {
    id: 'asean_relevance',
    title: 'ASEAN Tests Its Relevance',
    meta: 'Politics & International Relations',
    html: `
      <p>The two-day summit, which runs from May 7th to the 8th, <span class="blank-tag">1</span>. It is one of two annual leaders’ meetings this year. Prime Minister Le Minh Hung is set to deliver remarks outlining Vietnam's foreign policy priorities following the 14th Party Congress <span class="blank-tag">2</span>. As ASEAN leaders gather for the 48th ASEAN summit, Vietnam's Prime Minister's attendance is underscoring the country's continued engagement at the highest level.</p>
      <br>
      <p>Vietnam itself took on the ASEAN chairmanship in 2020 at the moment of unprecedented global disruption due to COVID-19. <span class="blank-tag">3</span>, COVID-19. Vietnam led ASEAN through a historic shift, <span class="blank-tag">4</span>. Under his leadership, ASEAN established the COVID-19 response fund and signed the world's largest trade agreement. It was a moment when cohesion met recovery.</p>
      <br>
      <p>But 2026 presents a very different test. Today's landscape isn't a pandemic, rather a more fragmented landscape marked by energy insecurity, geopolitical rivalry, and rising tensions in the Middle East. The challenge now is more than simple recovery which will require resilience and strategic positioning. So the question is what does this moment mean for the ASEAN and <span class="blank-tag">5</span>?</p>
    `,
    questions: [
      {
        num: 1,
        type: "Context Meaning Clause",
        opts: [
          "completely restructures the organization's internal funding mechanisms",
          "brings together leaders of all 10 ASEAN member states and the ASEAN Secretary General",
          "focuses exclusively on resolving bilateral trade disputes among members",
          "requires all member nations to adopt a single unified currency"
        ],
        ans: 1,
        grammar: "Context Meaning",
        tip: "A summit brings leaders together, and the original text explicitly stated this was the purpose of the two-day summit."
      },
      {
        num: 2,
        type: "Preposition",
        opts: [
          "beside practical proposals to strengthen ASEAN's resilience",
          "alongside practical proposals to strengthen ASEAN's resilience",
          "outside practical proposals to strengthen ASEAN's resilience",
          "inside practical proposals to strengthen ASEAN's resilience"
        ],
        ans: 1,
        grammar: "Preposition 'alongside'",
        tip: "'Alongside' means 'together with' or 'in addition to'."
      },
      {
        num: 3,
        type: "Past Continuous",
        opts: [
          "The region and the world at that time confronted a single defining challenge",
          "The region and the world at that time are confronting a single defining challenge",
          "The region and the world at that time were confronting a single defining challenge",
          "The region and the world at that time have confronted a single defining challenge"
        ],
        ans: 2,
        grammar: "Past Continuous Tense",
        tip: "The phrase 'at that time' requires the past continuous tense to describe an ongoing situation in the past."
      },
      {
        num: 4,
        type: "Participle Phrase",
        opts: [
          "hosted virtual summits for the first time",
          "to host virtual summits for the first time",
          "hosting virtual summits for the first time",
          "which hosting virtual summits for the first time"
        ],
        ans: 2,
        grammar: "Present Participle",
        tip: "A present participle ('hosting') explains how Vietnam led the historic shift."
      },
      {
        num: 5,
        type: "Context Meaning Clause",
        opts: [
          "how is Vietnam positioning itself within the ASEAN",
          "why have so many countries decided to leave the organization",
          "when will the global pandemic finally come to an end",
          "where can tourists find the best destinations in Southeast Asia"
        ],
        ans: 0,
        grammar: "Context Meaning",
        tip: "The text focuses on Vietnam's role and engagement in ASEAN, making this question the logical conclusion to the passage."
      }
    ]
  },
  {
    id: 'vex_world',
    title: 'Vietnamese Students at VEX World 2026',
    meta: 'Education & Technology',
    html: `
      <p>Vietnamese students achieved remarkable success at the VEX World 2026, the world’s largest international robotics competition held in the United States. Competing against more than 2,400 teams from over 60 countries and territories, three of Vietnam’s seven teams advanced to the top four, <span class="blank-tag">1</span> and highlighting the country’s growing presence in global technology and STEM education.</p>
      <br>
      <p>The students impressed judges and audiences with their technical expertise, strategic thinking, creativity, and teamwork under pressure. Many participants were attending an international competition for the first time and expressed pride in representing Vietnam <span class="blank-tag">2</span>. They emphasized that success in STEM depends heavily on collaboration, support from teammates, and shared passion for innovation.</p>
      <br>
      <p>The achievements were made possible through perseverance, strong technical training, and disciplined preparation. School science and STEM clubs have played an important role in nurturing students’ interests, encouraging teamwork, and helping them improve their skills together. <span class="blank-tag">3</span>.</p>
      <br>
      <p>A solid foundation in mathematics, science, technology, foreign languages, and presentation skills has been essential to the students’ success. Educators believe students must feel confident using technology and <span class="blank-tag">4</span>. These accomplishments are expected to inspire more young people in Vietnam to pursue science and technology, <span class="blank-tag">5</span>.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Present Participle",
        opts: [
          "placing Vietnam among the competition’s strongest performers",
          "placed Vietnam among the competition’s strongest performers",
          "which places Vietnam among the competition’s strongest performers",
          "to place Vietnam among the competition’s strongest performers"
        ],
        ans: 0,
        grammar: "Present participle phrase",
        tip: "A present participle phrase ('placing...') is used after a comma to describe the result of the preceding action, parallel to 'highlighting' later in the sentence."
      },
      {
        num: 2,
        type: "Context Meaning Clause",
        opts: [
          "despite learning from peers worldwide",
          "therefore learning from peers worldwide",
          "while learning from peers worldwide",
          "because learning from peers worldwide"
        ],
        ans: 2,
        grammar: "Adverbial clause of time/contrast",
        tip: "The conjunction 'while' connects the two concurrent actions: representing Vietnam and learning from peers."
      },
      {
        num: 3,
        type: "Independent Sentence",
        opts: [
          "Teachers also contribute by guiding and motivating students to become more confident in international competitions.",
          "Parents are now required to pay higher tuition fees to maintain these modern STEM facilities.",
          "The competition organizers provided all the necessary robotics equipment for the participating teams.",
          "Students from other countries also received similar financial support from their local governments."
        ],
        ans: 0,
        grammar: "Independent sentence structure",
        tip: "This sentence needs to align with the previous sentences which talk about the support system (schools, STEM clubs) that helped students succeed. Option A logically continues the theme of support by mentioning teachers."
      },
      {
        num: 4,
        type: "Verb Form",
        opts: [
          "giving opportunities to experiment, create, and refine their ideas",
          "to give opportunities to experiment, create, and refine their ideas",
          "be given opportunities to experiment, create, and refine their ideas",
          "are given opportunities to experiment, create, and refine their ideas"
        ],
        ans: 2,
        grammar: "Passive voice with modal verb",
        tip: "The structure is 'must feel... and (must) be given...'. The passive voice 'be given' is required here."
      },
      {
        num: 5,
        type: "Context Meaning Clause",
        opts: [
          "demonstrated the confidence and ambition of Vietnam’s younger generation on the global stage",
          "which demonstrating the confidence and ambition of Vietnam’s younger generation on the global stage",
          "demonstrating the confidence and ambition of Vietnam’s younger generation on the global stage",
          "to demonstrating the confidence and ambition of Vietnam’s younger generation on the global stage"
        ],
        ans: 2,
        grammar: "Present participle phrase",
        tip: "A present participle phrase ('demonstrating...') is used after a comma to show the result or supplementary information of the preceding clause."
      }
    ]
  },
  {
    id: 'digital_tech_law',
    title: 'Digital Technology Industry Law',
    meta: 'Technology & Law',
    html: `
      <p>Since the beginning of the year, the law on the digital technology industry has officially come into effect, <span class="blank-tag">1</span>. The law is designed to establish digital technology as a key economic sector with a major contribution to the national GDP. <span class="blank-tag">2</span>.</p>
      <br>
      <p>The new legislation encourages a major shift for Vietnamese enterprises, pushing them to transition from basic processing and assembly to mastering core technologies, design, and manufacturing. <span class="blank-tag">3</span>. Additionally, the law provides investment incentives and local financial support for digital tech startups, <span class="blank-tag">4</span>.</p>
      <br>
      <p>By adopting a comprehensive approach that encompasses human resources, materials, infrastructure, finance, and market access, the law addresses the entire production process and creates a clear legal framework for the industry's development. <span class="blank-tag">5</span>, putting science and technology at the forefront and enabling Vietnam's tech workforce to concentrate on crucial areas like AI, semiconductors, and digital transformation.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Present Participle",
        opts: [
          "making Vietnam the first country in the world to introduce dedicated legislation",
          "made Vietnam the first country in the world to introduce dedicated legislation",
          "to make Vietnam the first country in the world to introduce dedicated legislation",
          "which making Vietnam the first country in the world to introduce dedicated legislation"
        ],
        ans: 0,
        grammar: "Present participle phrase",
        tip: "A present participle phrase ('making...') follows a comma to describe the result of the main action."
      },
      {
        num: 2,
        type: "Independent Sentence",
        opts: [
          "Consequently, foreign investors are completely banned from participating in the national artificial intelligence and semiconductor sectors.",
          "However, the exact definition of digital assets and virtual currencies remains largely unclear under this new framework.",
          "For the first time, this legal framework formally defines digital technology, artificial intelligence, semiconductors, and digital assets.",
          "In the meantime, traditional agricultural sectors are receiving the majority of the national GDP contribution."
        ],
        ans: 2,
        grammar: "Independent sentence structure",
        tip: "This sentence provides specific details about the legal framework's contents, aligning with the introduction of the law."
      },
      {
        num: 3,
        type: "Independent Sentence",
        opts: [
          "Therefore, Vietnamese enterprises are advised to continue focusing solely on basic assembly to maintain their current market share.",
          "It strongly supports the \"Make in Vietnam\" strategy by prioritizing domestic firms in public procurement and key state-commissioned projects.",
          "This transition has forced many domestic tech startups to shut down due to a lack of highly skilled international workers.",
          "Moreover, the legislation discourages the production of core technologies to rely more on imported foreign components."
        ],
        ans: 1,
        grammar: "Independent sentence structure",
        tip: "This option supports the \"Make in Vietnam\" strategy mentioned in the context of mastering core technologies."
      },
      {
        num: 4,
        type: "Context Meaning",
        opts: [
          "because also offering incentives for high-quality workforce training and the development of a semiconductor ecosystem",
          "despite offering incentives for high-quality workforce training and the development of a semiconductor ecosystem",
          "in order to offering incentives for high-quality workforce training and the development of a semiconductor ecosystem",
          "while also offering incentives for high-quality workforce training and the development of a semiconductor ecosystem"
        ],
        ans: 3,
        grammar: "Adverbial clause with 'while'",
        tip: "'While' is used here to add additional information about what the law provides alongside financial support."
      },
      {
        num: 5,
        type: "Independent Sentence",
        opts: [
          "This clarity and strong focus are expected to make development significantly easier",
          "Which clarity and strong focus are expected to make development significantly easier",
          "Expecting this clarity and strong focus to make development significantly easier",
          "This clarity and strong focus expecting to make development significantly easier"
        ],
        ans: 0,
        grammar: "Independent sentence structure",
        tip: "A complete sentence with subject and verb ('are expected') is needed here to conclude the thought."
      }
    ]
  },
  {
    id: 'middle_east_env',
    title: 'Middle East Conflict: Environmental Toll',
    meta: 'Environment & Conflict',
    html: `
      <p>The ongoing Middle East conflict is inflicting severe and long-lasting environmental damage across the region. Between February 28 and March 10, 2026, the Conflict and Environment Observatory recorded over 300 incidents affecting energy and military infrastructure, <span class="blank-tag">1</span>. Attacks on these facilities release toxic pollutants that spread across Iran and the Gulf region. <span class="blank-tag">2</span>.</p>
      <br>
      <p>A United Nations Environment Program report highlights the devastating reality in the Gaza Strip, <span class="blank-tag">3</span>. This water crisis has triggered a massive health emergency, causing cases of acute watery diarrhea to increase 36-fold and hepatitis A-linked jaundice to rise 384 times. <span class="blank-tag">4</span>.</p>
      <br>
      <p>The ecological toll extends to widespread pollution from damaged oil facilities. In Iran, toxic smoke has mixed with atmospheric moisture <span class="blank-tag">5</span>. Residents in Tehran report dark rainfall and oily residue coating the city, raising grave concerns about public health and air pollution.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Absolute Phrase",
        opts: [
          "which 232 posing significant environmental risks",
          "with 232 posing significant environmental risks",
          "having 232 posed significant environmental risks",
          "232 of them to pose significant environmental risks"
        ],
        ans: 1,
        grammar: "Absolute phrase with 'with'",
        tip: "The structure 'with + noun + V-ing' is used to add supplementary details to the main clause."
      },
      {
        num: 2,
        type: "Independent Sentence",
        opts: [
          "As a result, many international organizations have successfully removed all the pollutants from the Gulf.",
          "On the contrary, the local governments have decided to build more military bases to protect the wildlife.",
          "These dangerous substances can persist for years, severely damaging water sources and food supplies.",
          "Consequently, the affected areas have experienced an unprecedented economic boom in agricultural exports."
        ],
        ans: 2,
        grammar: "Independent sentence structure",
        tip: "This sentence logically follows the mention of toxic pollutants, explaining their long-term impact on the environment and resources."
      },
      {
        num: 3,
        type: "Relative Clause",
        opts: [
          "which destroyed sewage and water infrastructure has heavily contaminated the local aquifer",
          "that destroyed sewage and water infrastructure has heavily contaminated the local aquifer",
          "where destroyed sewage and water infrastructure has heavily contaminated the local aquifer",
          "in where destroyed sewage and water infrastructure has heavily contaminated the local aquifer"
        ],
        ans: 2,
        grammar: "Relative clause with 'where'",
        tip: "'Where' refers to the location (Gaza Strip) and introduces a clause describing what has happened there."
      },
      {
        num: 4,
        type: "Independent Sentence",
        opts: [
          "However, local authorities are confident that the water quality will improve within a few weeks.",
          "Furthermore, Gaza has lost 82% of its annual crops since 2023, leaving over 500,000 people facing famine conditions.",
          "Therefore, local residents are encouraged to consume more seafood to compensate for the lack of fresh water.",
          "In the meantime, the region has seen a massive increase in tourism thanks to its unique ecological features."
        ],
        ans: 1,
        grammar: "Independent sentence / Connector",
        tip: "'Furthermore' is used to add another devastating fact (famine) to the existing health emergency."
      },
      {
        num: 5,
        type: "Infinitive of Purpose",
        opts: [
          "in order that create black, acidic rain",
          "so as creating black, acidic rain",
          "to create black, acidic rain",
          "which created black, acidic rain"
        ],
        ans: 2,
        grammar: "Infinitive of purpose",
        tip: "The infinitive 'to create' expresses the result or purpose of the smoke mixing with moisture."
      }
    ]
  },
  {
    id: 'fifa_world_cup_2026',
    title: 'FIFA World Cup 2026™ Opening Ceremony',
    meta: 'Sports & Entertainment',
    html: `
      <p>The United States will host a spectacular opening ceremony for the FIFA World Cup 2026™ in Los Angeles on Friday, 12 June. <span class="blank-tag">1</span>. Produced in partnership with Balich Wonder Studio, the celebration will use immersive storytelling and large-scale visuals to highlight the culture and spirit of the nation, <span class="blank-tag">2</span>.</p>
      <br>
      <p><span class="blank-tag">3</span>. This unprecedented approach aims at uniting Canada, Mexico, and the US in a shared global celebration.</p>
      <br>
      <p>The Los Angeles ceremony begins at 16:30 local time, 90 minutes before the opening match in which the United States will face Paraguay. Fans are encouraged to arrive when gates open four hours early <span class="blank-tag">4</span>. This event kicks off a historic summer of football featuring a record 104 matches across 16 Host Cities, <span class="blank-tag">5</span>.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Inversion / Relative Clause",
        opts: [
          "Headlining the highly anticipated event is an all-star lineup featuring global superstars whose recent albums have dominated international charts.",
          "Headlining the highly anticipated event is an all-star lineup that featuring global superstars who has recently dominated international charts.",
          "A highly anticipated event which features an all-star lineup has been unexpectedly cancelled by global superstars whose recent albums dominated international charts.",
          "An all-star lineup, whom recent albums have dominated international charts, is headlining the highly anticipated event featuring global superstars."
        ],
        ans: 0,
        grammar: "Inversion / Relative clause",
        tip: "'Headlining... is...' is an inverted structure. 'Whose' is the correct relative pronoun to show possession."
      },
      {
        num: 2,
        type: "Relative Clause",
        opts: [
          "operating under the central theme of a \"shared heartbeat\" which aim to connect football fans worldwide",
          "which operates under the central theme of a \"shared heartbeat\" that aims to connect football fans worldwide",
          "operated under the central theme of a \"shared heartbeat\" that aiming to connect football fans worldwide",
          "which operates under the central theme of a \"shared heartbeat\" where aims to connect football fans worldwide"
        ],
        ans: 1,
        grammar: "Relative clause",
        tip: "'Which' introduces a non-defining clause about the celebration, and 'that' introduces a defining clause about the theme."
      },
      {
        num: 3,
        type: "Present Participle Phrase",
        opts: [
          "Making tournament history, there are three separate opening ceremonies what showcase the unique cultural heritage of each host nation unfolding across North America.",
          "Despite making tournament history, three separate opening ceremonies which showcase the unique cultural heritage of each host nation will be restricted to North America.",
          "Because tournament history is made, three separate opening ceremonies that showcases the unique cultural heritage of each host nation will unfold across North America.",
          "Making tournament history, three separate opening ceremonies that showcase the unique cultural heritage of each host nation will unfold across North America."
        ],
        ans: 3,
        grammar: "Present participle phrase",
        tip: "'Making tournament history' is a participle phrase modifying the subject 'three separate opening ceremonies'. 'Showcase' (plural) matches the plural subject."
      },
      {
        num: 4,
        type: "Infinitive of Purpose",
        opts: [
          "enjoying exclusive entertainment which have been specifically curated for those attending the stadium in person",
          "to enjoy exclusive entertainment for that has been specifically curated for those attending the stadium in person",
          "to enjoy exclusive entertainment that has been specifically curated for those attending the stadium in person",
          "so as enjoying exclusive entertainment what has been specifically curated for those attending the stadium in person"
        ],
        ans: 2,
        grammar: "Infinitive of purpose / Relative clause",
        tip: "'To enjoy' expresses purpose. 'That has been...' is a defining relative clause modifying 'entertainment'."
      },
      {
        num: 5,
        type: "Present Participle Phrase",
        opts: [
          "culminated in a highly anticipated final that scheduling to take place on July 19 at the New York New Jersey Stadium",
          "culminating in a highly anticipated final which is scheduled to take place on July 19 at the New York New Jersey Stadium",
          "which culminating in a highly anticipated final where is scheduled to take place on July 19 at the New York New Jersey Stadium",
          "to culminate in a highly anticipated final who is scheduled to take place on July 19 at the New York New Jersey Stadium"
        ],
        ans: 1,
        grammar: "Present participle phrase / Relative clause",
        tip: "'Culminating' is a present participle used to show the result or progression. 'Which is scheduled...' is a defining relative clause."
      }
    ]
  },
  {
    id: 'english_second_language',
    title: 'English as a Second Language in Schools',
    meta: 'Education & Development',
    html: `
      <p>Vietnam is implementing an action program to progressively establish English as a second language in schools nationwide, aiming to align human resources with future national development needs. <span class="blank-tag">1</span>. This is backed by a comprehensive draft project that meticulously maps this linguistic transition through the year 2035.</p>
      <br>
      <p>To build a supportive environment, educational experts emphasize integrating English step-by-step into daily school life. <span class="blank-tag">2</span>, the strategy encourages students to use the language naturally in their subjects, projects, and extracurricular activities. Furthermore, evaluating student success will shift away from traditional test scores to assessing practical communication skills, teamwork, and overall confidence, <span class="blank-tag">3</span>.</p>
      <br>
      <p>Pioneering schools are already demonstrating this approach through innovative learning activities, such as middle school students presenting technology and literature projects in English. <span class="blank-tag">4</span>. Educators must possess both high English proficiency and specialized teaching methodologies <span class="blank-tag">5</span>.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Independent Sentence / Relative Clause",
        opts: [
          "This ambitious initiative supports a broader objective what aims to elevate Vietnamese education to an advanced status in Asia by 2030.",
          "Despite this ambitious initiative, the broader objective which aims to elevate Vietnamese education has been unexpectedly postponed until 2030.",
          "This ambitious initiative supports a broader objective that aims to elevate Vietnamese education to an advanced status in Asia by 2030.",
          "As a result, the Ministry of Education has recently canceled the draft project that mapped this linguistic transition through 2035."
        ],
        ans: 2,
        grammar: "Independent sentence / Relative clause",
        tip: "'That' is the correct relative pronoun to introduce a defining clause. This sentence logically extends the initial statement."
      },
      {
        num: 2,
        type: "Conjunction / Subjunctive",
        opts: [
          "Instead of demanding that all daily activities which take place within the school premises be entirely conducted in English immediately",
          "Because of demanding that all daily activities where take place within the school premises be entirely conducted in English immediately",
          "Rather than demanding that all daily activities which taking place within the school premises entirely conducted in English immediately",
          "In addition to demanding that all daily activities which take place within the school premises are entirely conducting in English immediately"
        ],
        ans: 0,
        grammar: "Conjunction / Subjunctive mood",
        tip: "'Instead of' sets up a contrast. The structure 'demand that... (should) be...' is used here for professional tone."
      },
      {
        num: 3,
        type: "Non-defining Relative Clause",
        opts: [
          "what will undoubtedly prepare students for the highly competitive global labor market",
          "which will undoubtedly prepare students for the highly competitive global labor market",
          "that will undoubtedly prepare students for the highly competitive global labor market",
          "to undoubtedly preparing students for the highly competitive global labor market"
        ],
        ans: 1,
        grammar: "Non-defining relative clause",
        tip: "'Which' is used after a comma to refer to the entire preceding action or idea."
      },
      {
        num: 4,
        type: "Independent Sentence / Contrast",
        opts: [
          "Moreover, establishing English as a second language relies heavily on the comprehensive downgrading of current curriculum standards.",
          "Therefore, parents are highly required to pay extra tuition fees for the comprehensive upgrading of foreign teacher quality.",
          "As a result, the successful establishment of English as a second language has completely eliminated the need for upgrading teacher quality.",
          "However, the successful establishment of English as a second language relies heavily on the comprehensive upgrading of teacher quality."
        ],
        ans: 3,
        grammar: "Independent sentence / Contrast",
        tip: "This sentence introduces the critical requirement of teacher quality, providing a balanced perspective on the implementation."
      },
      {
        num: 5,
        type: "Non-defining Relative Clause",
        opts: [
          ", such as Content and Language Integrated Learning (CLIL) what enables them to effectively teach their core subjects in English",
          ", such as Content and Language Integrated Learning (CLIL) where enables them to effectively teach their core subjects in English",
          ", such as Content and Language Integrated Learning (CLIL) which enabling them to effectively teach their core subjects in English",
          ", such as Content and Language Integrated Learning (CLIL), which enables them to effectively teach their core subjects in English"
        ],
        ans: 3,
        grammar: "Non-defining relative clause",
        tip: "'Which' correctly introduces the non-defining clause explaining CLIL. The commas correctly set off the appositive and the relative clause."
      }
    ]
  },
  {
    id: 'anthropic_mythos',
    title: 'Anthropic Mythos: The Risks of Autonomous AI',
    meta: 'Technology & Cybersecurity',
    html: `
      <p>Anthropic has decided to withhold its latest AI model, Mythos, from the public due to its extraordinary ability to autonomously find and exploit software vulnerabilities. Unlike previous coding assistants, Mythos can act as an automated hacker with minimal human oversight, <span class="blank-tag">1</span>. This development is particularly alarming because the window between discovering a software vulnerability and its exploitation in a cyberattack has plummeted from 2.3 years in 2018 to just 20 hours today, <span class="blank-tag">2</span>.</p>
      <br>
      <p><span class="blank-tag">3</span>, Mythos uncovered a critical flaw in the OpenBSD operating system that had remained hidden for 27 years. By exploiting how the system processed large numbers, a single internet message could trigger a complete system crash, known as a kernel panic. Anthropic practiced responsible disclosure, <span class="blank-tag">4</span>.</p>
      <br>
      <p>Interestingly, Mythos was not specifically designed for cybersecurity. Its advanced hacking skills are simply a result of scaling up its predecessor, Opus, with more data and computing power. <span class="blank-tag">5</span>, Anthropic is keeping the model strictly behind closed doors.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Adjective Phrase",
        opts: [
          "capable of crashing systems and gaining unauthorized access",
          "which is capable of crashing systems and gaining unauthorized access",
          "having been capable of crashing systems and gaining unauthorized access",
          "to be capable of crashing systems and gaining unauthorized access"
        ],
        ans: 0,
        grammar: "Adjective phrase / Reduced relative clause",
        tip: "An adjective phrase ('capable of...') acts as a reduced relative clause (..., which is capable of...) to provide more information about 'Mythos'."
      },
      {
        num: 2,
        type: "Independent Sentence",
        opts: [
          "and is projected to reach just one minute by 2028",
          "and being projected to reach just one minute by 2028",
          "and is projecting to reach just one minute by 2028",
          "that is projected to reach just one minute by 2028"
        ],
        ans: 0,
        grammar: "Parallel structure / Passive voice",
        tip: "This choice creates a parallel structure with the previous verb 'has plummeted', indicating a future trend in passive voice ('is projected to...')."
      },
      {
        num: 3,
        type: "Present Participle Phrase",
        opts: [
          "Demonstrating its capabilities",
          "To demonstrate its capabilities",
          "Having demonstrated its capabilities",
          "Demonstrated its capabilities"
        ],
        ans: 0,
        grammar: "Present participle phrase",
        tip: "A present participle phrase ('Demonstrating...') is used at the beginning of the sentence to show simultaneous action or background context for the main clause."
      },
      {
        num: 4,
        type: "Present Participle Phrase",
        opts: [
          "allowing developers to patch the bug before it became public",
          "which allowing developers to patch the bug before it became public",
          "to allow developers to patch the bug before it became public",
          "allowed developers to patch the bug before it became public"
        ],
        ans: 0,
        grammar: "Present participle of result",
        tip: "A present participle ('allowing...') follows a comma to describe the direct consequence or result of the preceding action."
      },
      {
        num: 5,
        type: "Adverbial Clause of Reason",
        opts: [
          "Because this preview version lacks standard safety guardrails and will willingly write malicious exploits if asked",
          "Although this preview version lacks standard safety guardrails and will willingly write malicious exploits if asked",
          "Despite this preview version lacks standard safety guardrails and will willingly write malicious exploits if asked",
          "For this preview version lacking standard safety guardrails and will willingly write malicious exploits if asked"
        ],
        ans: 0,
        grammar: "Adverbial clause of reason",
        tip: "The conjunction 'Because' correctly introduces a clause explaining the reason for the decision to keep the model private."
      }
    ]
  },
  {
    id: 'asean_plus_3_resilience',
    title: 'ASEAN+3 Economies: Resilience and Risks',
    meta: 'Economy & Regional Cooperation',
    html: `
      <p>Despite their heavy reliance on oil imports and vulnerability to Middle East tensions in the Strait of Hormuz, the ASEAN+3 economies are expected to remain resilient. According to the ASEAN+3 Macroeconomic Research Office (AMRO), regional growth is projected at approximately 4% for both 2026 and 2027. This follows a strong 2025, <span class="blank-tag">1</span>.</p>
      <br>
      <p>However, ongoing global energy disruptions and conflicts present significant downside risks. <span class="blank-tag">2</span>. To manage these uncertainties and avoid worst-case scenarios like stagflation, AMRO advises policymakers to maintain fiscal and monetary flexibility, <span class="blank-tag">3</span>.</p>
      <br>
      <p><span class="blank-tag">4</span>. Ultimately, fostering deeper regional cooperation and accelerating the green energy transition will be critical for the ASEAN+3 economies <span class="blank-tag">5</span>.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Relative Clause / Participle",
        opts: [
          "where the region expanded by 4.3%, which driving by robust domestic demand and a booming AI-driven semiconductor market",
          "which the region expanding by 4.3%, driven by robust domestic demand and a booming AI-driven semiconductor market",
          "in which the region expanded by 4.3%, that is driven by robust domestic demand and a booming AI-driven semiconductor market",
          "where the region expanded by 4.3%, driven by robust domestic demand and a booming AI-driven semiconductor market"
        ],
        ans: 3,
        grammar: "Relative clause / Past participle phrase",
        tip: "'Where' refers to the year 2025 as a situation/period. 'Driven by...' is a past participle phrase (reduced relative clause) modifying 'the region'."
      },
      {
        num: 2,
        type: "Independent Sentence",
        opts: [
          "Rising energy prices could push inflation up to 1.4% in 2026, which would heavily impact supply chains, food prices, and the tourism sector.",
          "Fortunately, the rapid decline in energy prices has stabilized the region's supply chains and completely revived the tourism sector.",
          "Consequently, regional growth is projected to exceed 10% next year, entirely eliminating the need for further economic reforms.",
          "In response, AMRO has strictly prohibited central banks from intervening, regardless of how much global inflation fluctuates."
        ],
        ans: 0,
        grammar: "Independent sentence structure",
        tip: "This sentence elaborates on the 'downside risks' by providing a specific scenario of rising energy prices and inflation."
      },
      {
        num: 3,
        type: "Present Participle Phrase",
        opts: [
          "ensuring that central banks are adequately prepared to intervene if inflation surges",
          "which ensuring that central banks are adequately prepared to intervene if inflation surges",
          "to ensure that central banks who are adequately prepared to intervene if inflation surges",
          "ensured that central banks where are adequately prepared to intervene if inflation surges"
        ],
        ans: 0,
        grammar: "Present participle phrase",
        tip: "A present participle phrase ('ensuring...') follows the comma to describe the result or a key aspect of maintaining flexibility."
      },
      {
        num: 4,
        type: "Independent Sentence",
        opts: [
          "As a result, most ASEAN+3 countries have decided to cut all forms of financial support to accelerate their green energy transition.",
          "Governments are also urged to provide targeted support for vulnerable groups rather than relying on broad subsidies that could fuel long-term inflation.",
          "Therefore, relying exclusively on broad subsidies is highly recommended by AMRO to temporarily boost domestic demand.",
          "On the contrary, vulnerable groups will be heavily taxed to compensate for the significant economic losses caused by global energy disruptions."
        ],
        ans: 1,
        grammar: "Independent sentence structure",
        tip: "This sentence provides further policy advice (targeted support) which is a logical continuation of the previous paragraph's advice."
      },
      {
        num: 5,
        type: "Infinitive of Purpose / Relative Clause",
        opts: [
          "strengthening their resilience, what will allow them to successfully weather future global shocks",
          "in order that strengthen their resilience, which allowing them to successfully weather future global shocks",
          "to strengthen their resilience, which will allow them to successfully weather future global shocks",
          "so as to strengthen their resilience, where will allow them to successfully weather future global shocks"
        ],
        ans: 2,
        grammar: "Infinitive of purpose / Relative clause",
        tip: "'To strengthen' expresses purpose. 'Which will allow...' is a non-defining relative clause referring to the action of strengthening resilience."
      }
    ]
  },
  {
    id: 'vietnam_carbon_market',
    title: 'Vietnam\'s Emerging Carbon Credit Market',
    meta: 'Environment & Economy',
    html: `
      <p>Vietnam is preparing to pilot its first domestic carbon credit exchange by late 2026, marking a crucial step toward its net-zero emissions goal. Operating with both emission quotas and carbon credits, <span class="blank-tag">1</span>. The country has already achieved notable milestones, becoming the first East Asia-Pacific nation to receive a $51.5 million payment from the World Bank for emission reductions and ranking ninth globally in carbon credit issuance volume with over 362 projects.</p>
      <br>
      <p>A well-designed carbon market will allow Vietnam to attract climate finance, drive technology innovation, and prepare businesses for global carbon pricing measures, including the EU's carbon border adjustment mechanism. <span class="blank-tag">2</span>. For the market's early stages, a hybrid price discovery model is recommended, <span class="blank-tag">3</span>.</p>
      <br>
      <p>To help Vietnamese businesses participate confidently, particularly SMEs lacking experience in emission accounting, experts recommend three pillars of support: scalable digital toolkits, free advisory and training programs, and the establishment of internal shadow carbon pricing schemes. <span class="blank-tag">4</span>. With the right investments, cooperation, and regulatory frameworks, Vietnam is successfully laying the groundwork for a transparent and greener economy <span class="blank-tag">5</span>.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Independent Sentence / Relative Clause",
        opts: [
          "this initiative will help Vietnam align with global standards, which include the open coalition for carbon market integration proposed at COP 30",
          "this initiative will help Vietnam align with global standards what include the open coalition for carbon market integration proposing at COP 30",
          "which initiative will help Vietnam align with global standards that including the open coalition for carbon market integration proposed at COP 30",
          "this initiative will help Vietnam align with global standards, where include the open coalition for carbon market integration to propose at COP 30"
        ],
        ans: 0,
        grammar: "Independent sentence / Relative clause",
        tip: "This sentence logically continues the thought of the initiative's benefits. 'Which include...' is a non-defining relative clause correctly used after a comma."
      },
      {
        num: 2,
        type: "Independent Sentence",
        opts: [
          "However, the government has recently announced that data transparency is no longer required for issuing high-quality carbon credits.",
          "To ensure the market operates effectively and credibly, experts stress that data transparency and reliable MRV data must be the highest priority.",
          "Therefore, prioritizing rapid economic growth over reliable MRV data will guarantee the immediate success of this domestic market.",
          "As a result, European countries have completely banned the import of Vietnamese goods due to the lack of a credible carbon market."
        ],
        ans: 1,
        grammar: "Independent sentence structure",
        tip: "This choice emphasizes the importance of transparency and MRV (Monitoring, Reporting, and Verification), which is crucial for a credible carbon market."
      },
      {
        num: 3,
        type: "Prepositional Phrase / Noun Clause",
        opts: [
          "which initial expectations that Vietnam's carbon credits will be pricing around $5 to $15 per ton",
          "having initial expectations which Vietnam's carbon credits will be priced around $5 to $15 per ton",
          "with initial expectations that Vietnam's carbon credits will be priced around $5 to $15 per ton",
          "with initial expectations what Vietnam's carbon credits will be priced around $5 to $15 per ton"
        ],
        ans: 2,
        grammar: "Prepositional phrase / Noun clause",
        tip: "The phrase 'with initial expectations that...' provides specific detail about the pricing expectations. 'Priced' (passive) is the correct form."
      },
      {
        num: 4,
        type: "Independent Sentence / Pronoun Reference",
        opts: [
          "On the contrary, these stringent regulations will permanently force small businesses to shut down their manufacturing plants.",
          "Furthermore, experts advise SMEs to completely ignore emission accounting until the carbon market is fully operational in 2045.",
          "Consequently, large multinational corporations will be heavily penalized for providing free advisory programs to local startups.",
          "These supportive measures are specifically designed to ease the financial burden and technical challenges faced by local enterprises."
        ],
        ans: 3,
        grammar: "Independent sentence / Pronoun reference",
        tip: "This sentence summarizes the purpose of the recommended support pillars mentioned in the previous sentence."
      },
      {
        num: 5,
        type: "Non-defining Relative Clause",
        opts: [
          ", which will ultimately benefit both current and future generations",
          ", what will ultimately benefit both current and future generations",
          ", that will ultimately be benefited both current and future generations",
          ", where will ultimately benefit both current and future generations"
        ],
        ans: 0,
        grammar: "Non-defining relative clause",
        tip: "'Which' is used here to refer back to the entire idea of laying the groundwork for a transparent and greener economy."
      }
    ]
  },
  {
    id: 'womens_day_2026',
    title: 'International Women’s Day 2026: Safety in the Digital Age',
    meta: 'Society & Gender Equality',
    html: `
      <p>For International Women’s Day 2026, the global focus is heavily centered on combating the rising threat of technology-facilitated gender-based violence (TFGBV), <span class="blank-tag">1</span>. This violence includes image-based abuse, doxing, cyberstalking, and online grooming. According to the UN Population Fund (UNFPA), a staggering 85% of women have either experienced or witnessed online harassment.</p>
      <br>
      <p><span class="blank-tag">2</span>. Organizations like the Angun House in Tangua Province—one of seven nationwide one-stop service centers supported by the UNFPA—provide comprehensive support to survivors, <span class="blank-tag">3</span>. To bolster these efforts, the UNFPA conducts nationwide training for officials to ensure they can implement effective safety measures and deliver survivor-centered care.</p>
      <br>
      <p><span class="blank-tag">4</span>. Vietnam is making notable progress on this front; by leveraging its digitalization agenda and recently hosting the International Cyber Crime Convention in Hanoi, the government is demonstrating a strong commitment <span class="blank-tag">5</span>.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Appositive / Relative Clause",
        opts: [
          "an epidemic that creates new frontiers for inequality",
          "which epidemic that creates new frontiers for inequality",
          "an epidemic where creates new frontiers for inequality",
          "an epidemic what creates new frontiers for inequality"
        ],
        ans: 0,
        grammar: "Appositive phrase / Relative clause",
        tip: "An appositive phrase ('an epidemic...') renames 'TFGBV'. 'That' correctly introduces the defining relative clause."
      },
      {
        num: 2,
        type: "Independent Sentence",
        opts: [
          "Therefore, local authorities have banned women from using social media.",
          "However, TFGBV is no longer considered a serious issue in modern Asia.",
          "In response, Vietnam is partnering with the UNFPA to implement vital interventions.",
          "Consequently, the UN has completely withdrawn its funding from Vietnam."
        ],
        ans: 2,
        grammar: "Independent sentence structure",
        tip: "This choice provides a logical connection between the problem (TFGBV) and the specific actions being taken in Vietnam with the UNFPA."
      },
      {
        num: 3,
        type: "Present Participle Phrase",
        opts: [
          "which noting that 15% of recent cases involve cyberattacks",
          "noting that 15% of recent cases involve cyberattacks",
          "noted that 15% of recent cases involve cyberattacks",
          "having noted that 15% of recent cases involving cyberattacks"
        ],
        ans: 1,
        grammar: "Present participle phrase",
        tip: "A present participle phrase ('noting...') follows the comma to add supplementary information or detail about the cases."
      },
      {
        num: 4,
        type: "Independent Sentence",
        opts: [
          "Experts stress that governments require robust regulations to address digital abuse.",
          "Furthermore, the government encourages completely unregulated internet access.",
          "Surprisingly, tech platforms have permanently disabled their safety features.",
          "As a result, cybercrimes have been completely eradicated across the globe."
        ],
        ans: 0,
        grammar: "Independent sentence structure",
        tip: "This sentence introduces the expert perspective on the necessity of regulation, fitting the context of official response."
      },
      {
        num: 5,
        type: "Prepositional Phrase / Relative Clause",
        opts: [
          "to integrating women's safety into online spaces which are rapidly expanding",
          "to integrate women's safety into online spaces what are rapidly expanding",
          "which integrating women's safety into online spaces where are rapidly expanding",
          "to integrating women's safety into online spaces that rapidly expanding"
        ],
        ans: 0,
        grammar: "Prepositional phrase / Relative clause",
        tip: "The structure is 'commitment to + V-ing'. 'Which are rapidly expanding' is a non-defining relative clause providing extra info about online spaces."
      }
    ]
  },
  {
    id: 'meta_addiction_trial',
    title: 'Social Media on Trial: The Addiction Debate',
    meta: 'Technology & Law',
    html: `
      <p>Meta CEO Mark Zuckerberg recently testified in a Los Angeles trial regarding allegations that social media platforms are intentionally addictive. The plaintiff, a 20-year-old identified as KGM, claims her social media use worsened her depression and suicidal tendencies. Her lawsuit is the first of nine "bellwether" trials stemming from over 1,600 consolidated cases <span class="blank-tag">1</span>.</p>
      <br>
      <p>Legal commentators are widely comparing these proceedings to the pivotal Big Tobacco litigation of the 1990s. <span class="blank-tag">2</span>. In the current cases, plaintiffs' attorneys are employing a highly comparable strategy, <span class="blank-tag">3</span>.</p>
      <br>
      <p>Other major lawsuits are simultaneously underway across the country. A New Mexico trial is examining whether companies left minors vulnerable to sexual exploitation, and a federal judge in California will soon hear a consolidated case alleging that social media constitutes a public nuisance. <span class="blank-tag">4</span>. For instance, Meta argues that KGM experienced significant mental health challenges long before she ever used Instagram. Meanwhile, TikTok and Snap, <span class="blank-tag">5</span>, opted to settle just before the trial began.</p>
    `,
    questions: [
      {
        num: 1,
        type: "Non-defining Relative Clause",
        opts: [
          ", which will determine if tech giants are liable for creating addictive products",
          ", that will determine if tech giants are liable for creating addictive products",
          ", what will determine if tech giants are liable for creating addictive products",
          ", determining if tech giants which are liable for creating addictive products"
        ],
        ans: 0,
        grammar: "Non-defining relative clause",
        tip: "'Which' is used after a comma to add extra information about the consolidated cases."
      },
      {
        num: 2,
        type: "Independent Sentence",
        opts: [
          "Ironically, Big Tobacco easily won all of those early lawsuits without paying.",
          "That historic battle resulted in massive settlements and sweeping industry reforms.",
          "Social media companies have strongly supported this comparison to tobacco.",
          "The 1990s saw a massive and uncontrolled increase in teenage smoking rates."
        ],
        ans: 1,
        grammar: "Independent sentence structure",
        tip: "This sentence provides historical context for the Big Tobacco comparison, highlighting why it is a significant parallel."
      },
      {
        num: 3,
        type: "Present Participle Phrase",
        opts: [
          "argued what tech companies engineered addiction in children's brains",
          "to argue which tech companies engineered addiction in children's brains",
          "arguing that tech companies engineered addiction in children's brains",
          "argued that tech companies engineering addiction in children's brains"
        ],
        ans: 2,
        grammar: "Present participle phrase",
        tip: "The present participle 'arguing' follows the comma to describe the action performed as part of the 'strategy'."
      },
      {
        num: 4,
        type: "Independent Sentence",
        opts: [
          "Unsurprisingly, tech companies have strongly pushed back against these claims.",
          "Therefore, tech giants immediately admitted fault to avoid further public trials.",
          "Furthermore, these platforms recently removed all existing parental controls.",
          "As a result, the federal judge dismissed all the consolidated cases yesterday."
        ],
        ans: 0,
        grammar: "Independent sentence / Contrast",
        tip: "This sentence introduces the counter-argument from tech companies, setting the stage for the specific example of Meta's defense."
      },
      {
        num: 5,
        type: "Relative Clause with Quantifier",
        opts: [
          "both of whom were originally named as parties in KGM's lawsuit",
          "that were both originally named as parties in KGM's lawsuit",
          "which both originally naming as parties in KGM's lawsuit",
          "both of which were originally named as parties in KGM's lawsuit"
        ],
        ans: 3,
        grammar: "Relative clause with quantifier",
        tip: "'Both of which' is the correct relative structure to refer to the two companies (TikTok and Snap)."
      }
    ]
  }
];

let QS = [];
const L = ['A', 'B', 'C', 'D'];
let done = Array(5).fill(false);
let corr = Array(5).fill(false);
let cntC = 0, cntW = 0;

function initApp() {
  const selectScreen = document.getElementById('select-screen');
  selectScreen.innerHTML = '';

  ALL_EXAMS.forEach((exam, idx) => {
    const div = document.createElement('div');
    div.className = 'exam-option';
    div.innerHTML = `
      <div>
        <div class="eo-title">Test ${idx + 1}: ${exam.title}</div>
        <div class="eo-meta">${exam.meta}</div>
      </div>
      <button class="eo-btn">Start Test</button>
    `;
    div.onclick = () => startExam(exam.id);
    selectScreen.appendChild(div);
  });
}

function showSelectScreen() {
  document.getElementById('exam-container').style.display = 'none';
  document.getElementById('select-screen').style.display = 'flex';
  document.getElementById('main-subtitle').textContent = 'Text Completion · Reading Comprehension';
}

function startExam(id) {
  const exam = ALL_EXAMS.find(e => e.id === id);
  if (!exam) return;

  document.getElementById('select-screen').style.display = 'none';
  document.getElementById('exam-container').style.display = 'block';
  document.getElementById('main-subtitle').textContent = `Text Completion · ${exam.title}`;

  document.getElementById('p-title').innerHTML = `${exam.title} <span class="passage-tag">Source text</span>`;
  document.getElementById('p-meta').textContent = exam.meta;
  document.getElementById('p-content').innerHTML = exam.html;

  QS = exam.questions;
  resetAll();
}

function build() {
  const wrap = document.getElementById('qlist');
  wrap.innerHTML = '';
  QS.forEach((q, qi) => {
    const card = document.createElement('div');
    card.className = 'q-card';
    card.innerHTML = `
      <div class="q-header">
        <div class="q-num">${q.num}</div>
        <div>
          <div style="font-size:13px;font-weight:500;color:var(--text)">Question ${q.num}</div>
        </div>
      </div>
      <div class="q-body">
        <div class="options" id="opts-${qi}">
          ${q.opts.map((o, oi) => `
            <div class="opt" id="op${qi}_${oi}" onclick="pick(${qi},${oi})">
              <div class="opt-letter">${L[oi]}</div>
              <span>${o}</span>
            </div>`).join('')}
        </div>
        <div class="feedback" id="fb-${qi}"></div>
      </div>
    `;
    wrap.appendChild(card);
  });
  updateBar();
}

function pick(qi, oi) {
  if (done[qi]) return;
  done[qi] = true;
  const q = QS[qi];
  const ok = oi === q.ans;
  corr[qi] = ok;
  if (ok) cntC++; else cntW++;

  for (let i = 0; i < 4; i++) {
    const el = document.getElementById(`op${qi}_${i}`);
    el.classList.add('locked');
    if (i === q.ans) el.classList.add('correct');
    else if (i === oi) el.classList.add('wrong');
    else el.classList.add('dimmed');
  }

  const fb = document.getElementById(`fb-${qi}`);
  fb.className = `feedback show ${ok ? 'ok' : 'err'}`;
  fb.innerHTML = `
    <div class="fb-row">
      <span class="fb-icon">${ok ? '&#10003;' : '&#10007;'}</span>
      <div>
        <div class="fb-title">${ok ? 'Correct!' : 'Incorrect — Correct Answer: ' + L[q.ans]}</div>
      </div>
    </div>
    <div class="fb-explain">
      <span class="fb-grammar">${q.grammar}</span>&nbsp;&nbsp;${q.tip}
    </div>
  `;

  updateBar();
  if (done.every(Boolean)) showResult();
}

function revealAll() {
  QS.forEach((q, qi) => {
    if (done[qi]) return;
    done[qi] = true;
    for (let i = 0; i < 4; i++) {
      const el = document.getElementById(`op${qi}_${i}`);
      el.classList.add('locked');
      if (i === q.ans) el.classList.add('correct');
      else el.classList.add('dimmed');
    }
    const fb = document.getElementById(`fb-${qi}`);
    fb.className = 'feedback show ok';
    fb.innerHTML = `
      <div class="fb-row">
        <span class="fb-icon">&#8594;</span>
        <div><div class="fb-title">Answer: ${L[q.ans]} &mdash; ${q.opts[q.ans]}</div></div>
      </div>
      <div class="fb-explain">
        <span class="fb-grammar">${q.grammar}</span>&nbsp;&nbsp;${q.tip}
      </div>
    `;
  });
  updateBar();
  showResult();
}

function resetAll() {
  done = Array(5).fill(false);
  corr = Array(5).fill(false);
  cntC = 0; cntW = 0;
  document.getElementById('result-panel').style.display = 'none';
  build();
}

function updateBar() {
  const answered = done.filter(Boolean).length;
  const pct = (answered / 5) * 100;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-lbl').textContent = answered + ' / 5 questions';
  document.getElementById('val-correct').textContent = cntC;
  document.getElementById('val-wrong').textContent = cntW;
}

function showResult() {
  const n = corr.filter(Boolean).length;
  const panel = document.getElementById('result-panel');
  panel.style.display = 'block';
  document.getElementById('result-grade').textContent = n + '/5';
  const msgs = ['Need more practice!', 'Good job — keep going!', 'Well done!', 'Excellent!', 'Perfect!'];
  document.getElementById('result-msg').textContent = msgs[n] || 'Completed!';
  document.getElementById('result-stats').innerHTML =
    '<div>Correct <span>' + n + ' questions</span></div><div>Incorrect <span>' + (5 - n) + ' questions</span></div><div>Score <span>' + (n * 2) + '/10</span></div>';
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Khởi tạo app
initApp();

// -- LOCAL AUDIO PLAYER --------------------------------------------------
const bgAudio = document.getElementById("bg-audio");
let musicStarted = false;

function toggleAudio() {
  if (!bgAudio) return;
  if (bgAudio.paused) {
    bgAudio.play().then(() => {
      musicStarted = true;
      updateAudioUI(true);
    }).catch(() => {
      alert("?? Click anywhere to play music");
    });
  } else {
    bgAudio.pause();
    updateAudioUI(false);
  }
}

function updateAudioUI(playing) {
  const bar = document.getElementById("audio-bar");
  const vinyl = document.getElementById("vinyl");
  const playBtn = document.getElementById("play-btn");
  if (playing) {
    playBtn.textContent = "?";
    vinyl.classList.add("playing");
    bar.classList.add("playing-glow");
  } else {
    playBtn.textContent = "?";
    vinyl.classList.remove("playing");
    bar.classList.remove("playing-glow");
  }
}

function setVolume(val) {
  if (bgAudio) bgAudio.volume = parseFloat(val);
}

window.addEventListener("click", () => {
  if (!musicStarted && bgAudio) {
    bgAudio.play().then(() => {
      musicStarted = true;
      updateAudioUI(true);
    }).catch(() => { });
  }
}, { once: true });

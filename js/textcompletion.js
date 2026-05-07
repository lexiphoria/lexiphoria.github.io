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
  }
];

let QS = [];
const L = ['A','B','C','D'];
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
          <div class="q-type">${q.type}</div>
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

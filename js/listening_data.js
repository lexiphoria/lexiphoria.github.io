/* -------------------------------------------------------------
 * Listening Lab – dữ liệu bài nghe (Listening_Lab.html, js/listening.js)
 *
 * Mỗi bài nhúng một video YouTube chính chủ (BBC Learning English hoặc
 * Vietnam Today) và chỉ chứa câu hỏi do giáo viên tự soạn theo dạng IELTS,
 * không chép lại transcript.
 *
 *   level    'A2' | 'B1' | 'B2'
 *   source   'bbc' | 'vtv'
 *   videoId  mã video YouTube
 *   start/end  đoạn video dùng cho bài (giây); bỏ end để nghe hết video
 *   parts    nhóm câu hỏi:
 *     type 'mcq'  options + answer (chỉ số đáp án đúng, 0 = A)
 *     type 'gap'  câu có ___ ; answer là danh sách đáp án chấp nhận
 *     at       giây có đáp án trong video (nút ▶ nghe lại sau khi chấm)
 *
 * Thêm bài mới: chép một khối { ... } bên dưới, đổi id, videoId, câu hỏi.
 * ------------------------------------------------------------- */
window.LISTENING_LESSONS = [
  /* ============================ A2 ============================ */
  {
    id: 'a2-directions',
    level: 'A2',
    source: 'bbc',
    series: 'Easy English Conversations',
    title: 'Asking for directions',
    videoId: 'SHXPpsIJTb0',
    start: 0,
    end: 208,
    parts: [
      {
        type: 'mcq',
        items: [
          { q: 'Where is Sian?', options: ['In Oxford', 'In Petworth', 'In Beijing'], answer: 0, at: 13 },
          { q: 'To get to the train station, Sian goes past the school and then…', options: ['turns left', 'turns right', 'goes back'], answer: 1, at: 41 },
          { q: 'In the end, where is the supermarket?', options: ['Next to the park', 'Opposite the park', 'Next to the school'], answer: 1, at: 91 },
          { q: 'What is Buli looking for?', options: ['The hotel', 'The museum', 'The hospital'], answer: 2, at: 117 }
        ]
      },
      {
        type: 'gap',
        limit: 'ONE WORD ONLY',
        items: [
          { q: 'The train station is next to the ___.', answer: ['pub'], at: 51 },
          { q: 'To get to the supermarket, go straight, turn right and go past the ___.', answer: ['school'], at: 78 },
          { q: 'To get to the hospital, go past the ___ and turn left.', answer: ['museum'], at: 122 },
          { q: 'The hospital is opposite the ___.', answer: ['hotel'], at: 135 },
          { q: 'The cinema is next to the ___.', answer: ['shop'], at: 188 }
        ]
      }
    ]
  },
  {
    id: 'a2-weekend',
    level: 'A2',
    source: 'bbc',
    series: 'Easy English Conversations',
    title: 'Last weekend',
    videoId: 'kTf0V4HyFtM',
    start: 0,
    end: 138,
    parts: [
      {
        type: 'gap',
        limit: 'ONE WORD ONLY',
        heading: 'Weekend activities',
        items: [
          { q: 'Tim went ___.', answer: ['hiking'], at: 19 },
          { q: 'Tim and his friends ate ___.', answer: ['pasta'], at: 39 },
          { q: 'Tim watched a ___ film at home.', answer: ['horror'], at: 49 },
          { q: 'Buli went to the ___.', answer: ['beach'], at: 60 },
          { q: 'Buli had a ___ ice cream.', answer: ['strawberry'], at: 77 },
          { q: 'Sian made a ___ cake.', answer: ['chocolate'], at: 95 },
          { q: 'Sian played ___ in the park.', answer: ['frisbee', 'frisby'], at: 108 },
          { q: 'Georgie read a ___ story.', answer: ['detective'], at: 130 }
        ]
      },
      {
        type: 'mcq',
        items: [
          { q: 'Why doesn’t Buli usually go to the beach?', options: ['It is usually too cold.', 'It is too far away.', 'He is usually at work.'], answer: 0, at: 65 },
          { q: 'Who ate Sian’s cake?', options: ['Tim', 'Her family', 'Her friends'], answer: 1, at: 101 },
          { q: 'Where did Georgie go swimming?', options: ['In the sea', 'In a river', 'At the swimming pool'], answer: 2, at: 123 }
        ]
      }
    ]
  },
  {
    id: 'a2-school',
    level: 'A2',
    source: 'bbc',
    series: 'Real Easy English',
    title: 'Talking about school',
    videoId: 'DjA3naFOTvc',
    start: 0,
    end: 263,
    parts: [
      {
        type: 'mcq',
        items: [
          { q: 'What was Neil’s favourite subject?', options: ['English', 'History', 'Maths'], answer: 1, at: 145 },
          { q: 'What did Beth make in her textiles class?', options: ['A dress', 'A bag', 'A hat'], answer: 2, at: 123 },
          { q: 'What is Neil’s least favourite subject?', options: ['Maths', 'Science', 'English'], answer: 0, at: 152 },
          { q: '‘Quite good’ means…', options: ['a little bit good', 'very good', 'not good'], answer: 0, at: 167 }
        ]
      },
      {
        type: 'gap',
        limit: 'ONE WORD ONLY',
        items: [
          { q: 'A qualification is an official record that you have successfully done an ___ or training.', answer: ['exam'], at: 50 },
          { q: 'Neil liked school because he liked being with his ___.', answer: ['friends'], at: 96 },
          { q: 'Neil thought most subjects were quite ___.', answer: ['interesting'], at: 96 },
          { q: 'Neil was really bad at maths because he found it very ___.', answer: ['hard', 'difficult'], at: 197 },
          { q: 'A ‘nerd’ is somebody who is very good at ___.', answer: ['school'], at: 225 },
          { q: 'Beth and her friend asked the teacher about the marks for a ___.', answer: ['presentation'], at: 239 }
        ]
      }
    ]
  },

  /* ============================ B1 ============================ */
  {
    id: 'b1-city',
    level: 'B1',
    source: 'bbc',
    series: 'Real Easy English',
    title: 'Living in a big city',
    videoId: 'bGxdYW_6rjQ',
    start: 0,
    end: 279,
    parts: [
      {
        type: 'gap',
        limit: 'ONE WORD ONLY',
        items: [
          { q: 'Neil and Georgie both live and work in ___.', answer: ['london'], at: 27 },
          { q: '‘Bustling’ means there is lots of ___ – lots of things going on.', answer: ['activity'], at: 38 },
          { q: 'There is lots of public ___, which makes the city convenient.', answer: ['transport', 'transportation'], at: 58 },
          { q: 'London has lots of ___ where you can see plays.', answer: ['theatres', 'theaters', 'theatre', 'theater'], at: 79 },
          { q: 'Eating out and going for a drink are really ___ in the capital.', answer: ['expensive'], at: 141 }
        ]
      },
      {
        type: 'mcq',
        items: [
          { q: 'Which problem of city life do they NOT mention?', options: ['Noise', 'Dirt', 'Crime'], answer: 2, at: 118 },
          { q: 'Barcelona has the sea on one side and … on the other.', options: ['a river', 'mountains', 'a forest'], answer: 1, at: 167 },
          { q: 'Why did one speaker live in Edinburgh?', options: ['To do a master’s degree', 'To work in a castle', 'To teach English'], answer: 0, at: 212 },
          { q: 'What is special about Edinburgh?', options: ['It has a long beach.', 'It has a castle on a big rock.', 'It has a famous carnival.'], answer: 1, at: 222 },
          { q: 'Why does one speaker want to go to Rio de Janeiro?', options: ['For the carnival', 'For the beaches', 'For the football'], answer: 0, at: 259 }
        ]
      }
    ]
  },
  {
    id: 'b1-coffee',
    level: 'B1',
    source: 'vtv',
    series: 'Vietnam Discovery',
    title: 'Coffee in Ho Chi Minh City',
    videoId: '03ioxdWZzeY',
    start: 30,
    end: 420,
    parts: [
      {
        type: 'gap',
        limit: 'ONE WORD AND/OR A NUMBER',
        items: [
          { q: 'Coffee was introduced to Vietnam by the ___ in the 19th century.', answer: ['french'], at: 132 },
          { q: 'Vietnam is now a huge consumer and a massive ___ of coffee.', answer: ['producer'], at: 138 },
          { q: 'The coffee harvest takes place from November to ___.', answer: ['march'], at: 146 },
          { q: 'After harvesting, the robusta cherries are ___-dried on the farm.', answer: ['sun'], at: 149 },
          { q: 'The popular coffee filter is often made from aluminium or stainless ___.', answer: ['steel'], at: 165 },
          { q: 'One of the oldest cafés in Saigon was started in ___.', answer: ['1938'], at: 187 }
        ]
      },
      {
        type: 'mcq',
        items: [
          { q: 'Where is the old café?', options: ['In an alleyway in District 3', 'On a busy street in District 1', 'Inside a market'], answer: 0, at: 205 },
          { q: 'When does the family get ready to sell coffee?', options: ['Very early in the morning', 'At lunchtime', 'Late at night'], answer: 0, at: 214 },
          { q: 'The coffee filter is soaked in boiling water in a … pot.', options: ['glass', 'terracotta', 'metal'], answer: 1, at: 287 },
          { q: 'Why is the room really hot?', options: ['Two stoves are on at the same time.', 'There are no windows.', 'It is the middle of summer.'], answer: 0, at: 352 }
        ]
      }
    ]
  },
  {
    id: 'b1-english-hanoi',
    level: 'B1',
    source: 'vtv',
    series: 'Vietnam Today',
    title: 'English in Hanoi schools',
    videoId: '9uRfGMUM7zs',
    start: 0,
    end: 184,
    parts: [
      {
        type: 'gap',
        limit: 'ONE WORD AND/OR A NUMBER',
        items: [
          { q: 'Schools will follow the plan at three levels: foundational, advanced and ___.', answer: ['flagship'], at: 8 },
          { q: 'Dinh Tien Elementary School is one of ___ schools in Hanoi chosen for the pilot.', answer: ['20', 'twenty'], at: 34 },
          { q: 'Bilingual ___ now appear in the library, classrooms and school offices.', answer: ['signs'], at: 40 },
          { q: 'English songs and quizzes are part of assemblies and morning ___.', answer: ['exercises', 'exercise'], at: 60 },
          { q: 'Children can read stories together in the English ___.', answer: ['corner'], at: 77 },
          { q: 'English is used in many subjects, from math to natural ___.', answer: ['science'], at: 104 },
          { q: 'English-speaking environments are commonly known as English ___.', answer: ['zones'], at: 158 }
        ]
      },
      {
        type: 'mcq',
        items: [
          { q: 'Which lesson do we see at Minh Khai A Elementary School?', options: ['Physical education', 'Music', 'Art'], answer: 0, at: 100 },
          { q: 'What is the main goal of using English in other subjects?', options: ['To translate every lesson into English', 'To help children use English as naturally as possible', 'To prepare children for exams'], answer: 1, at: 126 },
          { q: 'The pilot programme aims to prepare students for…', options: ['an increasingly international world', 'studying abroad', 'jobs in tourism'], answer: 0, at: 171 }
        ]
      }
    ]
  },

  /* ============================ B2 ============================ */
  {
    id: 'b2-ai-classrooms',
    level: 'B2',
    source: 'vtv',
    series: 'Vietnam Today',
    title: 'AI in Vietnamese classrooms',
    videoId: 'F6nl2wxlrP0',
    start: 0,
    end: 195,
    parts: [
      {
        type: 'gap',
        limit: 'ONE WORD AND/OR A NUMBER',
        items: [
          { q: 'From the 2026–2027 school year, each class will have ___ AI lessons a year.', answer: ['12', 'twelve'], at: 0 },
          { q: 'The framework covers human-centred thinking, AI ___, AI techniques and applications, and AI system design.', answer: ['ethics'], at: 9 },
          { q: 'The robot serves as a living ___ for students.', answer: ['laboratory', 'lab'], at: 60 },
          { q: 'A nationwide survey questioned more than ___ students.', answer: ['11000', '11 000', 'eleven thousand'], at: 89 },
          { q: '___ % of them were familiar with AI applications in education.', answer: ['87'], at: 93 },
          { q: 'Students should use several AI tools to ___ the results.', answer: ['cross-check', 'crosscheck', 'cross check'], at: 130 },
          { q: 'Primary students will learn how AI learns from ___.', answer: ['data'], at: 137 }
        ]
      },
      {
        type: 'mcq',
        items: [
          { q: 'What can the AI robot do?', options: ['Introduce the school, give directions and dance', 'Teach maths and mark homework', 'Translate lessons into English'], answer: 0, at: 43 },
          { q: 'According to PISA 2025, how many surveyed Vietnamese students had used AI tools?', options: ['About half', 'More than 87%', 'More than 95%'], answer: 2, at: 100 },
          { q: 'Whose AI competency framework does the school follow?', options: ['UNESCO', 'UNICEF', 'The World Bank'], answer: 0, at: 155 }
        ]
      }
    ]
  },
  {
    id: 'b2-heritage',
    level: 'B2',
    source: 'vtv',
    series: 'Vietnam Today',
    title: 'Heritage arts in schools',
    videoId: 'ZJuB-Cp1OcA',
    start: 0,
    end: 134,
    parts: [
      {
        type: 'gap',
        limit: 'ONE WORD AND/OR A NUMBER',
        items: [
          { q: 'Students practise movements, handle traditional props and learn to apply stage ___.', answer: ['makeup', 'make-up', 'make up'], at: 21 },
          { q: 'After just ___ year, the students can perform well-known excerpts.', answer: ['1', 'one'], at: 33 },
          { q: 'Teaching in schools lets artists pass the art on to the next ___.', answer: ['generation'], at: 55 },
          { q: 'Đờn ca tài tử is now part of the regular ___ at Bui Thi Xuan High School.', answer: ['curriculum'], at: 76 },
          { q: 'Artists teach students to keep rhythm and mark the ___.', answer: ['beat'], at: 84 },
          { q: 'The programme is being piloted in ___ classes this school year.', answer: ['3', 'three'], at: 102 },
          { q: 'The classes do not focus on ___.', answer: ['grades', 'grade'], at: 104 }
        ]
      },
      {
        type: 'mcq',
        items: [
          { q: 'Where is Le Quy Don High School?', options: ['Quang Tri Province', 'Ho Chi Minh City', 'Hue'], answer: 0, at: 27 },
          { q: 'How did the student in Ho Chi Minh City find the art form at first?', options: ['Quite difficult', 'Boring', 'Easy'], answer: 0, at: 91 },
          { q: 'According to the report, what do students gain?', options: ['Only artistic skills', 'First-hand experience of cultural heritage', 'Higher grades'], answer: 1, at: 118 }
        ]
      }
    ]
  },
  {
    id: 'b2-social-media-ban',
    level: 'B2',
    source: 'bbc',
    series: 'Learning English from the News',
    title: 'Australia’s social media ban',
    videoId: 'sxOeBndCA4c',
    start: 0,
    end: 433,
    parts: [
      {
        type: 'gap',
        limit: 'ONE WORD AND/OR A NUMBER',
        items: [
          { q: 'In Australia, children under ___ can no longer have social media accounts.', answer: ['16', 'sixteen'], at: 40 },
          { q: 'Critics say children might search in ___ parts of the internet.', answer: ['darker', 'dark'], at: 67 },
          { q: '‘Come into force’ has the same meaning as ‘come into ___’.', answer: ['effect'], at: 134 },
          { q: 'A caveat is like a ___ about the limits of a situation.', answer: ['warning'], at: 218 },
          { q: 'The law could extend to more ___ in the future.', answer: ['platforms'], at: 229 },
          { q: 'To brag is to talk about something you have or have achieved with too much ___.', answer: ['pride'], at: 363 }
        ]
      },
      {
        type: 'mcq',
        items: [
          { q: 'The first headline comes from The Observer, a newspaper in…', options: ['the UK', 'Australia', 'the Philippines'], answer: 0, at: 77 },
          { q: 'When a law ‘comes into force’, it…', options: ['starts to happen', 'is cancelled', 'becomes popular'], answer: 0, at: 101 },
          { q: '‘Teething issues’ are…', options: ['problems you have when you are getting used to something new', 'health problems in young children', 'problems that never go away'], answer: 0, at: 319 },
          { q: 'Why are some teenagers bragging?', options: ['They can still use their accounts.', 'They have deleted their accounts.', 'They have found better apps.'], answer: 0, at: 374 }
        ]
      }
    ]
  }
];

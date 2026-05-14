const questions = [
  // ── BLOCK 1: Hygiene & Safety ──
  {
    id: 1,
    prompt: "What does the sign say?",
    sign: {
      type: "sanitize",
      title: "SANITIZE HANDS HERE",
      steps: ["APPLY", "RUB PALMS & FINGERS", "RUB FINGERTIPS", "RUB BACKS", "DRY HANDS"]
    },
    options: [
      "You must wash your hands with soap and water.",
      "You should follow these steps to sanitise your hands.",
      "Use sanitiser first, then wash your hands immediately.",
      "You can dry your hands before using sanitiser."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> The sign shows step-by-step instructions for hand sanitising (apply, rub, dry). It tells you <em>how</em> to sanitise — not to use soap, and not to wash first."
  },
  {
    id: 2,
    prompt: "What does the notice say?",
    sign: {
      type: "notice",
      header: "NOTICE",
      body: "USE SINK FOR\nWASHING HANDS ONLY"
    },
    options: [
      "Use the sink after washing your hands.",
      "You can wash your face and your hands here.",
      "You should only wash your hands here.",
      "Don't wash your hands in the sink."
    ],
    answer: 2,
    explanation: "<b>C is correct.</b> 'USE SINK FOR WASHING HANDS ONLY' means the sink is reserved exclusively for hand washing — nothing else."
  },
  {
    id: 3,
    prompt: "What does the sign say?",
    sign: {
      type: "prohibition",
      body: "NO\nSMOKING"
    },
    options: [
      "You can smoke anywhere, including in this area.",
      "Smoking is only allowed in specific areas that are marked for it.",
      "Smoking is not allowed at all in this area to keep it clean and safe.",
      "Smoking is encouraged and welcome in this area."
    ],
    answer: 2,
    explanation: "<b>C is correct.</b> A 'NO SMOKING' sign with a crossed-out cigarette prohibits smoking in that area entirely."
  },
  {
    id: 4,
    prompt: "What does the notice say?",
    sign: {
      type: "caution",
      caution: "Caution:",
      body: "The floor is wet. Please walk carefully to avoid slipping."
    },
    options: [
      "There is no need to be careful on the floor.",
      "The floor is wet. Stand still and avoid moving.",
      "The floor is always wet and slippery.",
      "The floor is wet. Walk carefully to avoid slipping."
    ],
    answer: 3,
    explanation: "<b>D is correct.</b> The notice is a direct restatement: the floor is wet and you should walk carefully to avoid slipping."
  },

  // ── BLOCK 2: Equipment & Hazards ──
  {
    id: 5,
    prompt: "What does the sign say?",
    sign: {
      type: "gold",
      body: "CAMERA OR VIDEO\nEQUIPMENT\nIS PROHIBITED"
    },
    options: [
      "Cameras and video equipment are allowed in this area.",
      "You must ask for permission before using a camera here.",
      "Taking photos or recording videos is not allowed.",
      "You can use your camera as long as you are quiet."
    ],
    answer: 2,
    explanation: "<b>C is correct.</b> 'PROHIBITED' means not allowed. The sign bans all camera and video equipment — no permission workaround is mentioned."
  },
  {
    id: 6,
    prompt: "What does the warning sign say?",
    sign: {
      type: "danger",
      header: "DANGER",
      body: "HIGH VOLTAGE\nABOVE\nCONTACT WILL CAUSE\nINJURY OR DEATH"
    },
    options: [
      "You can touch the high-voltage wires if you are careful.",
      "High-voltage electricity is present, and contact can be deadly.",
      "High-voltage areas are safe as long as you do not touch anything directly.",
      "You should be careful because high voltage might cause minor injuries."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> The sign explicitly states 'Contact will cause injury or death', meaning high-voltage electricity is present and extremely dangerous."
  },

  // ── BLOCK 3: Parking & Facilities ──
  {
    id: 7,
    prompt: "What does the sign say?",
    sign: {
      type: "parking",
      body: "STAFF\nPARKING\nONLY"
    },
    options: [
      "Anyone, including visitors and staff, can park here without restrictions.",
      "Only employees or staff members are allowed to park in these spaces.",
      "Parking is not allowed in this area under any circumstances.",
      "The parking area is open to all people, without any specific rules."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> 'STAFF PARKING ONLY' clearly restricts the parking space to staff/employees. Visitors are not permitted."
  },
  {
    id: 8,
    prompt: "What does the notice say?",
    sign: {
      type: "info",
      body: '"The restroom is temporarily closed for maintenance.\nIt will open as soon as the work is finished."'
    },
    options: [
      "The restroom is closed for maintenance and will open later.",
      "The restroom is open but being cleaned.",
      "The restroom is always open.",
      "You can use the restroom in a different building."
    ],
    answer: 0,
    explanation: "<b>A is correct.</b> 'Temporarily closed for maintenance' + 'will open as soon as the work is finished' → closed now but will reopen after maintenance."
  },

  // ── BLOCK 4: More signs ──
  {
    id: 9,
    prompt: "What does the sign say?",
    sign: {
      type: "notice",
      header: "NOTICE",
      body: "WEAR YOUR\nSEAT BELT\nAT ALL TIMES"
    },
    options: [
      "You only need to wear a seat belt on highways.",
      "You must wear your seat belt whenever you are in the vehicle.",
      "It is optional to wear a seat belt during short trips.",
      "Children are the only ones required to wear seat belts."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> 'AT ALL TIMES' means there are no exceptions — everyone must wear their seat belt at all times."
  },
  {
    id: 10,
    prompt: "What does the sign say?",
    sign: {
      type: "danger",
      header: "WARNING",
      body: "WET FLOOR\nSLIPPERY SURFACE\nPROCEED WITH CAUTION"
    },
    options: [
      "The floor is always wet in this building.",
      "You should avoid entering this area completely.",
      "Be careful because the floor is wet and slippery.",
      "The floor is being cleaned and will dry soon."
    ],
    answer: 2,
    explanation: "<b>C is correct.</b> The sign warns about a wet, slippery floor and tells you to proceed with caution — not to avoid the area entirely."
  },
  {
    id: 11,
    prompt: "What does the notice say?",
    sign: {
      type: "info",
      body: '"Please keep this area clean.\nDispose of litter in the bins provided."'
    },
    options: [
      "You may leave rubbish anywhere in this area.",
      "Cleaning staff will take care of all rubbish.",
      "You should throw your rubbish in the bins available.",
      "Litter bins are not available in this area."
    ],
    answer: 2,
    explanation: "<b>C is correct.</b> The notice asks people to keep the area clean by using the provided bins — 'dispose of litter in the bins provided'."
  },
  {
    id: 12,
    prompt: "What does the sign say?",
    sign: {
      type: "prohibition",
      body: "NO\nPHONES"
    },
    options: [
      "You can use your phone quietly in this area.",
      "Phone calls are not allowed, but texting is fine.",
      "You are not permitted to use mobile phones in this area.",
      "Mobile phones must be switched to silent mode."
    ],
    answer: 2,
    explanation: "<b>C is correct.</b> A 'NO PHONES' prohibition sign means mobile phones are not allowed to be used at all in that area."
  },
  {
    id: 13,
    prompt: "What does the sign say?",
    sign: {
      type: "generic",
      body: "🚪  EXIT\n→  USE THIS DOOR IN CASE OF EMERGENCY"
    },
    options: [
      "This door is locked and should not be used.",
      "You should use this door only when there is an emergency.",
      "This is the main entrance to the building.",
      "Visitors must use this door to enter."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> 'In case of emergency' means the door should be used only when an emergency situation arises — it is an emergency exit."
  },
  {
    id: 14,
    prompt: "What does the notice say?",
    sign: {
      type: "caution",
      caution: "Important Notice:",
      body: "This swimming pool is for hotel guests only.\nPlease show your room key card to the lifeguard."
    },
    options: [
      "Anyone can use the swimming pool for free.",
      "The swimming pool is closed for all guests.",
      "Only hotel guests with a key card are allowed to use the pool.",
      "You must buy a ticket to use the swimming pool."
    ],
    answer: 2,
    explanation: "<b>C is correct.</b> 'For hotel guests only' + 'show your room key card' → only hotel guests with proof (key card) may use the pool."
  },
  {
    id: 15,
    prompt: "What does the sign say?",
    sign: {
      type: "gold",
      body: "SPEED LIMIT\n30 km/h\nIN THIS ZONE"
    },
    options: [
      "You can drive as fast as you want in this area.",
      "The maximum speed allowed in this zone is 30 km/h.",
      "The minimum speed in this zone is 30 km/h.",
      "Vehicles are not allowed in this zone at all."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> 'SPEED LIMIT 30 km/h' means the maximum speed drivers are allowed to travel is 30 kilometres per hour in that zone."
  },

  // ── BLOCK 5: School & Public Signs ──
  {
    id: 16,
    prompt: "What does this notice mean?",
    sign: {
      type: "generic",
      body: "🟢  FIRST AID\n✚  FIRST AID KIT\n     LOCATED HERE"
    },
    options: [
      "Students can find the first aid kit at this place.",
      "The first aid kit is not available now.",
      "Students must buy medicine from the canteen.",
      "Teachers should take the first aid kit home."
    ],
    answer: 0,
    explanation: "<b>A is correct.</b> 'FIRST AID KIT LOCATED HERE' means you can find the first aid kit at this specific location."
  },
  {
    id: 17,
    prompt: "What should you do?",
    sign: {
      type: "prohibition",
      body: "EXAMS\nIN\nPROGRESS"
    },
    options: [
      "Enter the room and talk to your friends.",
      "Be quiet and do not go inside.",
      "Start playing games in the classroom.",
      "Ask the teacher questions during the exam."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> 'Exams in progress' with a 'do not enter / be silent' symbol means you must be quiet and must not go inside the room."
  },
  {
    id: 18,
    prompt: "What does this sign tell students?",
    sign: {
      type: "prohibition",
      body: "NO BULLYING\nOR HARASSMENT\nALLOWED"
    },
    options: [
      "Students must be kind and respectful to others.",
      "Students can make fun of their classmates.",
      "Bullying is sometimes acceptable.",
      "Teachers should ignore bullying."
    ],
    answer: 0,
    explanation: "<b>A is correct.</b> 'No bullying or harassment allowed' means students must treat each other with kindness and respect — bullying is strictly forbidden."
  },
  {
    id: 19,
    prompt: "What does this notice tell students?",
    sign: {
      type: "info",
      body: "📚  LIBRARY HOURS UPDATE\n\nNow open until  12:30 AM\nSunday – Thursday"
    },
    options: [
      "The library closes at midnight on weekends.",
      "The library is now open until 12:30 AM from Sunday to Thursday.",
      "The library is only open on Fridays and Saturdays.",
      "The library is now open until 12:30 AM on Sunday and Thursday only."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> The notice says the library is open until 12:30 AM, and this applies from Sunday to Thursday (not just Sunday and Thursday)."
  },
  {
    id: 20,
    prompt: "What does this notice mean?",
    sign: {
      type: "prohibition",
      body: "NO\nREFUNDS"
    },
    options: [
      "You can return the book and get your money back.",
      "You cannot get money back after you buy something.",
      "You must pay with cash only.",
      "You can exchange books for free."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> 'No refunds' means once you have paid for something, you cannot return it to get your money back."
  },

  // ── BLOCK 6: School & Public Signs (Set 2) ──
  {
    id: 21,
    prompt: "What does this mean?",
    sign: {
      type: "notice",
      header: "NOTICE",
      body: "NO OPEN\nTOE SHOES"
    },
    options: [
      "People must not wear sandals or shoes that show their toes.",
      "Everyone has to wear sandals in this area.",
      "You can wear any kind of shoes you like.",
      "Open-toe shoes are free for students."
    ],
    answer: 0,
    explanation: "<b>A is correct.</b> 'No open toe shoes' means shoes that expose the toes (sandals, flip-flops, etc.) are not permitted."
  },
  {
    id: 22,
    prompt: "What should you do?",
    sign: {
      type: "caution-teal",
      header: "CAUTION",
      icon: "🧴",
      body: "PLEASE\nUSE HAND\nSANITIZER"
    },
    options: [
      "Use only water instead of sanitizer.",
      "Do not wash your hands at all.",
      "Wash your hands with sanitizer before entering.",
      "Touch everything without cleaning your hands."
    ],
    answer: 2,
    explanation: "<b>C is correct.</b> The sign with 'CAUTION — PLEASE USE HAND SANITIZER' asks everyone to clean their hands with sanitizer."
  },
  {
    id: 23,
    prompt: "What does this notice mean?",
    sign: {
      type: "notice",
      header: "NOTICE",
      body: "Do Not\nExtinguish\nWith Water"
    },
    options: [
      "The fire will go out by itself without water.",
      "You can only use water to stop the fire.",
      "You don't need to extinguish the fire at all.",
      "You must not use water to put out the fire."
    ],
    answer: 3,
    explanation: "<b>D is correct.</b> 'Do Not Extinguish With Water' explicitly forbids using water. Some fires (electrical, chemical) become more dangerous with water."
  },
  {
    id: 24,
    prompt: "What does this mean?",
    sign: {
      type: "notice",
      header: "NOTICE",
      body: "COVID-19\nVACCINE CLINIC\nAPPOINTMENTS\nONLY"
    },
    options: [
      "People can only get the vaccine if they already have an appointment.",
      "Everyone can walk in and get the vaccine anytime.",
      "Only doctors can get vaccinated at this clinic.",
      "The clinic is closed and not giving vaccines now."
    ],
    answer: 0,
    explanation: "<b>A is correct.</b> 'APPOINTMENTS ONLY' means you must book an appointment in advance — walk-ins are not accepted."
  },
  {
    id: 25,
    prompt: "What does the sign say?",
    sign: {
      type: "wet-paint",
      title: "WET PAINT",
      body: "DO NOT\nTOUCH",
      icon: "🖐️"
    },
    options: [
      "The paint is dry and safe to touch.",
      "The paint is still wet, so please do not touch it.",
      "You are encouraged to touch the paint.",
      "The paint is not for public use."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> 'WET PAINT — DO NOT TOUCH' warns that the paint has not dried yet and touching it will damage the finish (and stain your hands)."
  },
  {
    id: 26,
    prompt: "What does the notice say?",
    sign: {
      type: "club",
      title: "MUSIC CLUB STARTING AGAIN SOON",
      body: "First meeting next Thurs 4 pm.\nCome and join us!"
    },
    options: [
      "You have to join the club before you can go to the first meeting.",
      "Anyone can go along to the music club next Thursday.",
      "There is a new music club beginning soon that you can attend.",
      "After the first meeting, we can start the music club again."
    ],
    answer: 2,
    explanation: "<b>C is correct.</b> The notice announces that the music club is restarting ('starting again soon'), with the first meeting scheduled for next Thursday. 'Come and join us' is an open invitation."
  },
  {
    id: 27,
    prompt: "What can't students do?",
    sign: {
      type: "diamond",
      icon: "🍔🥤",
      body: "NO OUTSIDE\nFOOD OR DRINKS\nALLOWED"
    },
    options: [
      "Buy food in the canteen.",
      "Drink water.",
      "Eat with friends.",
      "Bring food from outside."
    ],
    answer: 3,
    explanation: "<b>D is correct.</b> 'NO OUTSIDE FOOD OR DRINKS ALLOWED' means you cannot bring food or beverages from outside into this area."
  },
  {
    id: 28,
    prompt: "What must students do when leaving?",
    sign: {
      type: "yellow-square",
      icon: "💡",
      label: "PLEASE",
      body: "TURN OFF LIGHTS\nWHEN NOT IN USE"
    },
    options: [
      "Turn off lights and fans.",
      "Open windows.",
      "Clean desks.",
      "Lock the door."
    ],
    answer: 0,
    explanation: "<b>A is correct.</b> 'PLEASE TURN OFF LIGHTS WHEN NOT IN USE' tells everyone to switch off lights (and by extension electrical appliances) when leaving."
  },
  {
    id: 29,
    prompt: "What does this notice mean?",
    sign: {
      type: "floor-stand",
      header: "NOTICE",
      body: "ELEVATOR\nOUT OF\nORDER"
    },
    options: [
      "The elevator is working now.",
      "You can only use the elevator in the morning.",
      "The elevator is broken and cannot be used.",
      "The elevator is for teachers only."
    ],
    answer: 2,
    explanation: "<b>C is correct.</b> 'OUT OF ORDER' means the elevator is not functioning and cannot be used until it is repaired."
  },

  // ── BLOCK 7: More Signs & Notices ──
  {
    id: 30,
    prompt: "What does the sign say?",
    sign: {
      type: "white-border",
      body: "CROSS\nONLY\nAT\nCROSS\nWALKS"
    },
    options: [
      "Cross the road anywhere you want.",
      "Cross the road at the pedestrian crossing.",
      "Cross the road with an adult.",
      "Cross the road with your friends."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> 'Cross only at cross walks' means you must use designated pedestrian crossings to cross the street."
  },
  {
    id: 31,
    prompt: "What does the notice say?",
    sign: {
      type: "simple-box",
      title: "Book sale",
      body: "Tuesday after school in the school hall"
    },
    options: [
      "You will be able to buy something here.",
      "The books are not on sale.",
      "You should visit this event on Friday.",
      "The event takes place in the schoolyard."
    ],
    answer: 0,
    explanation: "<b>A is correct.</b> A 'Book sale' is an event where you can buy books."
  },
  {
    id: 32,
    prompt: "What does the notice say?",
    sign: {
      type: "rounded-box",
      body: "No Art classes today<br>Mrs Smith is ill"
    },
    options: [
      "There is an art lesson today.",
      "Mrs Smith is at school today.",
      "The art class will be learning online today.",
      "This person will not be at school today."
    ],
    answer: 3,
    explanation: "<b>D is correct.</b> 'Mrs Smith is ill' means she is sick and will not be at school, which is why there are no art classes."
  },
  {
    id: 33,
    prompt: "What does the notice say?",
    sign: {
      type: "fancy-border",
      title: "Tilbury Museum of Music",
      body: "School groups please use other entrance"
    },
    options: [
      "Nobody can come here today.",
      "Students use another entrance to enter.",
      "The museum is closed today.",
      "School groups are not allowed to come."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> The notice directs 'School groups' (students) to 'use other entrance'."
  },
  {
    id: 34,
    prompt: "What does the notice say?",
    sign: {
      type: "grey-box",
      title: "Harlow Music Festival",
      body: "For tickets call 05784-82377,<br>or visit our website"
    },
    options: [
      "You need to buy the ticket offline.",
      "You can buy a ticket online.",
      "The festival is cancelled.",
      "There is a fair coming to town."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> 'Visit our website' indicates that you can purchase tickets online."
  },
  {
    id: 35,
    prompt: "What does the notice say?",
    sign: {
      type: "octagon-box",
      title: "GREEN PARK",
      body: "CONCERTS HERE SAT AND SUN 2-5 P.M.<br>TICKETS £6.00"
    },
    options: [
      "You can come here on Monday at 2 p.m.",
      "You can come here on Saturday at 1 p.m.",
      "You can come here on Wednesday. 4 p.m.",
      "You can come here on Sunday at 3 p.m."
    ],
    answer: 3,
    explanation: "<b>D is correct.</b> The concerts take place on Saturday and Sunday from 2 to 5 P.M. Sunday at 3 P.M. falls within this schedule."
  },
  {
    id: 36,
    prompt: "What does the sign say?",
    sign: {
      type: "blue-border",
      icon: "👟",
      body: "PLEASE<br>PUT OFF<br>YOUR<br>SHOES<br>HERE"
    },
    options: [
      "You can wear shoes in this area.",
      "You must remove your shoes before entering.",
      "You must put on your shoes in this area.",
      "You should clean your shoes in this area."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> 'Put off your shoes' means to take them off or remove them."
  },

  // ── BLOCK 8: Final Assorted Signs ──
  {
    id: 37,
    prompt: "What does this sign indicate?",
    sign: {
      type: "not-exit",
      body: "NOT AN\nEXIT"
    },
    options: [
      "This door leads to the exit.",
      "You must not go through without permission.",
      "You must not go through this door.",
      "This is not an exit."
    ],
    answer: 3,
    explanation: "<b>D is correct.</b> The sign clearly states 'NOT AN EXIT', meaning this is not a way out."
  },
  {
    id: 38,
    prompt: "What does the message mean?",
    sign: {
      type: "speech-bubble",
      title: "FOR SALE",
      body: "Ski boots size 38<br>Excellent condition<br>Make me an offer!"
    },
    options: [
      "The ski boots are for sale; you can suggest a price.",
      "The ski boots are free.",
      "The ski boots are not for sale.",
      "The ski boots are only for kids."
    ],
    answer: 0,
    explanation: "<b>A is correct.</b> 'Make me an offer!' means the seller is open to price suggestions for the items being sold."
  },
  {
    id: 39,
    prompt: "What does this sign indicate?",
    sign: {
      type: "no-uturn",
      body: "NO\nU-TURN"
    },
    options: [
      "U-turns are allowed here.",
      "Only straight-ahead driving is allowed here.",
      "U-turns are allowed during certain hours.",
      "U-turns are allowed with caution."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> (Based on the provided options) This sign prohibits making a U-turn. Among the given choices, prohibiting a U-turn usually means you must continue straight or turn at an intersection instead."
  },
  {
    id: 40,
    prompt: "What does this sign indicate?",
    sign: {
      type: "caution-solid",
      header: "CAUTION",
      icon: "🎧",
      body: "HIGH NOISE<br>AREA"
    },
    options: [
      "This area is quiet.",
      "Expect high noise levels in this area.",
      "Noise is prohibited in this area.",
      "Noise levels are moderate."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> 'HIGH NOISE AREA' warns you that the environment will be very loud and you should expect high noise levels (and likely wear ear protection)."
  },
  {
    id: 41,
    prompt: "What does this sign indicate?",
    sign: {
      type: "slow-steep",
      header: "SLOW",
      body: "STEEP<br>HILL<br>AHEAD"
    },
    options: [
      "No need to be cautious, the hill is not steep.",
      "Be cautious, the hill is steep.",
      "The hill is flat.",
      "The hill is closed to vehicles."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> The sign warns drivers to go 'SLOW' because there is a 'STEEP HILL AHEAD', meaning they need to be cautious."
  },

  // ── BLOCK 9: Messages and Specific Notices ──
  {
    id: 42,
    prompt: "What does the message mean?",
    sign: {
      type: "tip",
      body: "For messages, emails and notes, think about who the writer and reader might be."
    },
    options: [
      "Think about who is sending and receiving the message.",
      "Only send messages to yourself.",
      "Don't worry about who is reading the message.",
      "Write messages only in formal language."
    ],
    answer: 0,
    explanation: "<b>A is correct.</b> The tip advises you to consider both the 'writer' (sender) and 'reader' (receiver) when dealing with messages."
  },
  {
    id: 43,
    prompt: "What does the message mean?",
    sign: {
      type: "email",
      from: "School secretary",
      to: "All students",
      body: "Please remember that you have to return all borrowed books to the school library before Friday, the last day of term."
    },
    options: [
      "You do not need to return library books.",
      "You can return library books any time after Friday.",
      "You can return only some library books on Friday.",
      "You must return all library books before Friday."
    ],
    answer: 3,
    explanation: "<b>D is correct.</b> The message explicitly tells students to 'return all borrowed books... before Friday'."
  },
  {
    id: 44,
    prompt: "What does this poster say?",
    sign: {
      type: "poster-blue",
      icon: "A",
      body: "The museum opens at 12. Children must be with an adult."
    },
    options: [
      "Children are allowed to enter the museum when accompanied by an adult.",
      "Children over 12 may visit the museum by themselves.",
      "Adults who come with children over 12 will like the museum.",
      "Adults may bring children to the museum in the morning."
    ],
    answer: 0,
    explanation: "<b>A is correct.</b> 'Children must be with an adult' means they are permitted to enter as long as they are accompanied by an adult."
  },
  {
    id: 45,
    prompt: "Call this number if you want to _________.",
    sign: {
      type: "notice-yellow",
      body: "If you prefer playing the guitar and hanging out composing music, contact us, Neil and Joe. No plans to play as a band - we just relax and play!",
      footer: "Call 0834573115"
    },
    options: [
      "join a band",
      "learn the guitar",
      "play music with others",
      "perform as a band"
    ],
    answer: 2,
    explanation: "<b>C is correct.</b> Neil and Joe state they have 'No plans to play as a band', they just want to 'relax and play', which means casually playing music with others."
  },
  {
    id: 46,
    prompt: "Why did Sophie write this message?",
    sign: {
      type: "phone",
      body: "Anna, Sorry you missed today's class. Don't forget about the history project we're working on together the teacher wants it by Friday. Call me! Sophie"
    },
    options: [
      "To let Anna know what they did in class today.",
      "To check if Anna has finished her homework.",
      "To ask Anna if she has finished her homework.",
      "To ask Anna to contact her about the homework."
    ],
    answer: 3,
    explanation: "<b>D is correct.</b> Sophie reminds Anna about the history project they are working on and says 'Call me!', which is a request for Anna to contact her."
  },
  
  // ── BLOCK 10: Prohibition and Warnings ──
  {
    id: 47,
    prompt: "What does this notice mean?",
    sign: {
      type: "not-exit",
      body: "NO CELL PHONES DURING WORK HOURS"
    },
    options: [
      "Use your phone secretly.",
      "Silence your phone but keep using it.",
      "Avoid using phones to focus on your work.",
      "Only put your phone away during meetings."
    ],
    answer: 2,
    explanation: "<b>C is correct.</b> The sign prohibits using cell phones during work hours, which means you should avoid using them so you can focus on work."
  },
  {
    id: 48,
    prompt: "What does this sign mean?",
    sign: {
      type: "blue-circle",
      icon: "↔️"
    },
    options: [
      "You can stand closer if you know the person.",
      "Maintain a distance of at least 2 meters from others.",
      "Standing less than 2 meters away is enough.",
      "You can ignore this sign if it's not crowded."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> The sign with people and arrows indicates that you must 'KEEP YOUR DISTANCE', usually implying a safe distance like 2 meters."
  },
  {
    id: 49,
    prompt: "What does the sign encourage you to do?",
    sign: {
      type: "simple-box",
      title: "EARTH HOUR",
      body: "60 MIN<br>SAVE OUR PLANET"
    },
    options: [
      "You can leave the lights on if you're home.",
      "Turn off all lights and electrical devices for 60 minutes.",
      "Switch off only if you want to save energy.",
      "It's duty to participate in Earth Hour."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> Earth Hour is an event where people are encouraged to turn off all non-essential lights and devices for 60 minutes."
  },
  {
    id: 50,
    prompt: "What should you do according to this sign?",
    sign: {
      type: "blue-border",
      body: "PLEASE FLUSH<br>AFTER USE",
      icon: "🚽"
    },
    options: [
      "Flushing is optional if no one is around.",
      "Always flush after using the toilet.",
      "Flush only if someone else is waiting.",
      "You can skip flushing if it looks clean."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> The sign asks you to 'PLEASE FLUSH AFTER USE', meaning you must always do it."
  },
  {
    id: 51,
    prompt: "What is the message of this sign?",
    sign: {
      type: "not-exit",
      body: "STOP BULLYING<br>STAND UP. SPEAK OUT."
    },
    options: [
      "Ignore bullying unless it's serious.",
      "Stand up against bullying and speak out.",
      "Stop bullying only if you're directly involved.",
      "Speak about bullying to students."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> The sign explicitly tells you to 'STOP BULLYING' and to 'STAND UP. SPEAK OUT.'"
  },
  {
    id: 52,
    prompt: "What does this sign mean?",
    sign: {
      type: "parking",
      body: "PICK-UP AND DROP-OFF<br>NO PARKING"
    },
    options: [
      "Parking is okay if you're quick.",
      "Only stop briefly without parking.",
      "You can park but not leave the car.",
      "Parking is allowed when no one is around."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> 'NO PARKING' means you cannot park, but 'PICK-UP AND DROP-OFF' implies you can stop briefly to let passengers in or out."
  },
  {
    id: 53,
    prompt: "What does this caution sign mean?",
    sign: {
      type: "caution-solid",
      body: "Please fasten<br>your seat belt.",
      icon: "💺"
    },
    options: [
      "Seatbelts are suggested but not necessary.",
      "You should fasten your seatbelt for safety.",
      "It's fine to leave your seatbelt unfastened.",
      "Fastening your seatbelt is only important for the driver."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> A caution sign asking to 'Please fasten your seat belt' means it is a required safety measure."
  },
  {
    id: 54,
    prompt: "What does this warning triangle mean?",
    sign: {
      type: "warning-triangle",
      icon: "🔥"
    },
    options: [
      "Be careful, it's easy to catch fire.",
      "Burning something is not allowed.",
      "No picnicking allowed.",
      "Keep away from the fire."
    ],
    answer: 0,
    explanation: "<b>A is correct.</b> A warning triangle with fire means 'Highly Flammable', warning that the area or material can easily catch fire."
  },
  {
    id: 55,
    prompt: "What does this prohibition sign mean?",
    sign: {
      type: "not-exit",
      body: "2.5 t"
    },
    options: [
      "We should stop and park 2.5-ton trucks here.",
      "We should be careful with trucks crossing the road.",
      "We should look for another way to travel if your truck is over 2.5 tons.",
      "We should ask for help from a bigger truck."
    ],
    answer: 2,
    explanation: "<b>C is correct.</b> A red circle around '2.5 t' on a truck means vehicles exceeding this weight limit are prohibited and must find another route."
  },

  // ── BLOCK 11: Additional Warnings and Notices ──
  {
    id: 56,
    prompt: "What does this warning mean?",
    sign: {
      type: "simple-box",
      title: "WARNING",
      body: "FALL PROTECTION<br>REQUIRED<br>IN THIS AREA"
    },
    options: [
      "The area has a high risk of falling objects.",
      "Fall protection is optional in this area.",
      "Wear protection to avoid falling from heights.",
      "Only trained personnel are allowed to use protection."
    ],
    answer: 2,
    explanation: "<b>C is correct.</b> 'Fall protection required' means you must wear safety equipment to prevent falling from heights."
  },
  {
    id: 57,
    prompt: "What does this sign mean?",
    sign: {
      type: "blue-circle",
      icon: "🧑‍🤝‍🧑"
    },
    options: [
      "Only children are allowed in this area without supervision.",
      "Adults must supervise and hold the hands of children in this area.",
      "Children are prohibited from entering this area.",
      "This is a pedestrian zone where running is encouraged."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> The sign depicts an adult holding a child's hand, indicating that adults must supervise children."
  },
  {
    id: 58,
    prompt: "What does the elevator advisory say?",
    sign: {
      type: "simple-box",
      title: "ELEVATOR ADVISORY",
      body: "MAXIMUM<br>PASSENGERS 3"
    },
    options: [
      "Only three people or less are allowed in the elevator at a time.",
      "Three passengers must stay apart in the elevator.",
      "Three passengers can use the elevator.",
      "Standing closer is required in the elevator."
    ],
    answer: 0,
    explanation: "<b>A is correct.</b> 'Maximum passengers 3' means the elevator can carry no more than three people at once."
  },
  {
    id: 59,
    prompt: "What does this warning triangle mean?",
    sign: {
      type: "warning-triangle",
      icon: "🚂"
    },
    options: [
      "You should watch and stop the train.",
      "Railway ahead; proceed with caution.",
      "Train station is near here.",
      "You can cross the railways."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> The warning triangle with a train warns drivers or pedestrians that there is a railway ahead and they should proceed with caution."
  },

  // ── BLOCK 12: General Text Notices ──
  {
    id: 60,
    prompt: "What does this notice mean?",
    sign: {
      type: "rounded-box",
      body: "Smoking is only allowed in smoking area"
    },
    options: [
      "You are not allowed to smoke anywhere in the building.",
      "There are certain places where you can smoke.",
      "You must smoke if you are in one of the building's smoking areas.",
      "Smoking is encouraged in the building."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> The notice states that you can only smoke in a designated 'smoking area'."
  },
  {
    id: 61,
    prompt: "What should you do according to this notice?",
    sign: {
      type: "rounded-box",
      body: "Do not open the door until the red light has gone off and the green light comes on."
    },
    options: [
      "Turn off the red light when you open the door.",
      "Do not open the door when the green light is on.",
      "Wait for the green light before opening the door.",
      "Until the green light is on, keep the door open."
    ],
    answer: 2,
    explanation: "<b>C is correct.</b> You must wait until the 'green light comes on' before opening the door."
  },
  {
    id: 62,
    prompt: "What are passengers prohibited from doing?",
    sign: {
      type: "rounded-box",
      body: "All passengers are not allowed to eat, drink or smoke on the underground system."
    },
    options: [
      "You cannot bring your food on the underground.",
      "You can eat and drink at special areas on the underground.",
      "You can smoke on the platform before going on the underground.",
      "Drinking water at the station is forbidden."
    ],
    answer: 3,
    explanation: "<b>D is correct.</b> Since drinking is not allowed on the underground system, drinking water is forbidden."
  },
  {
    id: 63,
    prompt: "What does this notice say?",
    sign: {
      type: "speech-bubble",
      body: "LOST!<br>Gold watch<br>$50 for its safe return"
    },
    options: [
      "Buy a gold watch with $50 and you can return it.",
      "You will get some money if you can bring the watch over.",
      "If the watch is not returned safely, you will receive $50.",
      "Bring $50 and you will be given a gold watch."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> The notice offers a $50 reward for the safe return of a lost gold watch."
  },
  {
    id: 64,
    prompt: "What is the rule at the swimming pool?",
    sign: {
      type: "simple-box",
      title: "Swimming Pool",
      body: "No diving in the deep end when swimming lessons are taking place"
    },
    options: [
      "You can learn how to dive at this pool.",
      "Swimmers can dive in the deep end of the pool.",
      "You cannot dive and swim when there's a swimming class.",
      "It's dangerous to dive in this area of the pool."
    ],
    answer: 2,
    explanation: "<b>C is correct.</b> The sign prohibits diving during swimming lessons."
  },
  {
    id: 65,
    prompt: "What is the policy for the roller coaster?",
    sign: {
      type: "simple-box",
      body: "Family tickets include all rides.<br>Children must be at least 1.5 meters tall to go on the roller coaster."
    },
    options: [
      "Children can only go with adults on the roller coaster.",
      "It costs extra if children under 1.5 meters want to go on roller coaster.",
      "Smaller children cannot go on the roller coaster.",
      "You cannot go on the roller coaster without family ticket."
    ],
    answer: 2,
    explanation: "<b>C is correct.</b> Children must be at least 1.5 meters tall, so smaller children are not allowed."
  },
  {
    id: 66,
    prompt: "What does the notice say about the lake?",
    sign: {
      type: "simple-box",
      title: "Central Park",
      body: "The lake is very dirty. Please do not swim in it.<br>This park closes at 7 p.m in the winter."
    },
    options: [
      "The park is closed during the winter.",
      "You can swim in the park in the summer.",
      "Swimming in it is safe after 7 p.m.",
      "You cannot get into the lake."
    ],
    answer: 3,
    explanation: "<b>D is correct.</b> The notice asks you not to swim in the lake because it is very dirty."
  },
  {
    id: 67,
    prompt: "What is the discount offer?",
    sign: {
      type: "simple-box",
      body: "50 % discount for all swimsuits.<br>From 28th June to 3rd July. Buy now!"
    },
    options: [
      "Everything is on sale in the next two months.",
      "All the swimsuits are half-price only in June.",
      "The special offer is only for a few days.",
      "You can get the discount on the last day of July."
    ],
    answer: 2,
    explanation: "<b>C is correct.</b> The 50% discount runs from 28th June to 3rd July, which is a period of just a few days."
  },
  {
    id: 68,
    prompt: "Who is the theater ticket offer for?",
    sign: {
      type: "rounded-box",
      title: "THEATER TICKETS",
      body: "Buy one and get one free.<br>Only for students and over 65s."
    },
    options: [
      "People over 65 pay more to buy a ticket.",
      "Two students only need to pay for one ticket.",
      "There are free tickets for 65 students.",
      "You have to pay double for a ticket if you are under 65s."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> The 'Buy one and get one free' offer applies to students, so two students would only pay for one ticket."
  },

  // ── BLOCK 13: More General Notices ──
  {
    id: 69,
    prompt: "What does the dentist's notice say?",
    sign: {
      type: "rounded-box",
      title: "DENTIST",
      body: "Ask the receptionist for our price list.<br>Appointments sometimes available on the day."
    },
    options: [
      "There are maybe some appointments available you can book for today.",
      "The dentist may see you if you haven't booked an appointment.",
      "When you book an appointment, we can't tell you how much it will cost.",
      "Check the price before you book an appointment."
    ],
    answer: 0,
    explanation: "<b>A is correct.</b> 'Appointments sometimes available on the day' means you might be able to get an appointment for today."
  },
  {
    id: 70,
    prompt: "What is the policy at City Theatre?",
    sign: {
      type: "rounded-box",
      title: "City Theatre",
      body: "We cannot change your seats after you have booked tickets."
    },
    options: [
      "Customers should choose their seats carefully when they are in the theatre.",
      "Customers can get their money back on tickets.",
      "Customers can ask for different seats after they've paid.",
      "Customers should choose where they sit before they book."
    ],
    answer: 3,
    explanation: "<b>D is correct.</b> Because you cannot change seats after booking, you must decide where to sit before booking."
  },
  {
    id: 71,
    prompt: "When will Hana's Cakeshop open normally?",
    sign: {
      type: "rounded-box",
      title: "Hana's Cakeshop",
      body: "We're closed early today (Monday) for fixing machines.<br>Open again normal times (9 a.m.- 6 p.m.) tomorrow."
    },
    options: [
      "The shop plans to change its usual opening times.",
      "The shop closes earlier on Mondays.",
      "The shop will serve as usual from Tuesday.",
      "The shop will spend 2 days fixing the machines."
    ],
    answer: 2,
    explanation: "<b>C is correct.</b> Since today is Monday and they open normally 'tomorrow', they will serve as usual from Tuesday."
  },
  {
    id: 72,
    prompt: "What do you need for the tennis competition?",
    sign: {
      type: "rounded-box",
      title: "Under 16s tennis competition",
      body: "Prepare your own rackets. First Prize $100"
    },
    options: [
      "You may earn some money by selling your rackets.",
      "You have to pay $100 to participate in the competition.",
      "You must have at least a racket to get $100.",
      "There is no prize for 15-year-old kids if they win."
    ],
    answer: 2,
    explanation: "<b>C is correct.</b> You must 'prepare your own rackets' to play, which is a requirement to win the $100 prize."
  },
  {
    id: 73,
    prompt: "Where should you leave your things?",
    sign: {
      type: "simple-box",
      body: "Leave shoes, bags and towels in changing rooms<br>There's no space beside the pool"
    },
    options: [
      "The changing rooms are now in a different place.",
      "Swimmers can't take their stuff into the pool area.",
      "Don't forget your shoes, bags and towels before you go.",
      "There is no space in changing rooms."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> The sign tells you to leave items in the changing rooms because there's 'no space beside the pool', meaning you can't take them there."
  },
  {
    id: 74,
    prompt: "What is prohibited in the picnic area?",
    sign: {
      type: "simple-box",
      body: "Please use picnic area and bins next to them<br>NO BARBECUES OR FIRES"
    },
    options: [
      "You can't bring your food into the picnic area.",
      "You can't leave your rubbish in the bins.",
      "The picnic area is open for camp fire.",
      "You can't burn wood in picnic area."
    ],
    answer: 3,
    explanation: "<b>D is correct.</b> The sign says 'NO BARBECUES OR FIRES', which means you cannot burn wood or light a fire there."
  },
  {
    id: 75,
    prompt: "What is the rule about animals in the park?",
    sign: {
      type: "rounded-box",
      body: "Do not feed the animals in the park.<br>You can rent a bike at the front gate"
    },
    options: [
      "Even if you have the right food, you can't feed the animals.",
      "Renting a bike and feeding the animals are not allowed.",
      "You must feed the animals after renting a bike.",
      "You can only feed certain animals when riding a bike."
    ],
    answer: 0,
    explanation: "<b>A is correct.</b> The sign strictly says 'Do not feed the animals', without any exceptions."
  },
  {
    id: 76,
    prompt: "What should you do if using the escalator with kids?",
    sign: {
      type: "simple-box",
      body: "Please use the escalator if the lift is busy.<br>Watch over your children when they step on."
    },
    options: [
      "The lift is always out of order so please use the escalator instead.",
      "You cannot use the escalator without your children.",
      "If the lift is full, the escalator will work.",
      "Keep an eye on your kids on the escalator in case the lift is full."
    ],
    answer: 3,
    explanation: "<b>D is correct.</b> If the lift is busy (full), you use the escalator and you must 'Watch over your children' (keep an eye on them)."
  },
  {
    id: 77,
    prompt: "What does this notice request?",
    sign: {
      type: "rounded-box",
      body: "Please respect others<br>and keep noise to a minimum in shared spaces."
    },
    options: [
      "You can make as much noise as you want in shared spaces.",
      "It's okay to be loud if other people aren't nearby.",
      "You should try to be quiet when in shared spaces.",
      "Noise is only a problem in private spaces."
    ],
    answer: 2,
    explanation: "<b>C is correct.</b> 'Keep noise to a minimum' means you should try to be quiet."
  },
  {
    id: 78,
    prompt: "How does the parking charge work?",
    sign: {
      type: "simple-box",
      body: "Parking is free for the first two hours, then charges apply."
    },
    options: [
      "You must always pay for parking.",
      "You can park for free for two hours but must pay after that.",
      "Parking is free after two hours.",
      "Parking is always free, no matter how long you stay."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> It is free initially for two hours, and after that, 'charges apply' (you must pay)."
  },
  {
    id: 79,
    prompt: "What kind of bottles are not allowed?",
    sign: {
      type: "simple-box",
      body: "For safety reasons,<br>glass bottles are not allowed on the beach."
    },
    options: [
      "You can bring plastic bottles, but not glass ones.",
      "Glass bottles are allowed if you don't break them.",
      "You can bring glass bottles to the beach but keep them hidden.",
      "Glass bottles are only allowed if they are empty."
    ],
    answer: 0,
    explanation: "<b>A is correct.</b> Glass bottles are explicitly banned for safety, which implies safer alternatives like plastic are acceptable."
  },
  {
    id: 80,
    prompt: "When can you leave your seat?",
    sign: {
      type: "rounded-box",
      body: "Please be seated<br>until the train comes to a complete stop."
    },
    options: [
      "You can stand up when the train slows down.",
      "It's okay to leave your seat once the train starts moving.",
      "Stay seated until the train fully stops.",
      "You must get off the train while it is still moving."
    ],
    answer: 2,
    explanation: "<b>C is correct.</b> The sign requires you to remain seated until the train 'comes to a complete stop'."
  },
  {
    id: 81,
    prompt: "What does this WC notice mean?",
    sign: {
      type: "rounded-box",
      body: "This WC is out of order.<br>Please use alternative facilities on 3rd floor."
    },
    options: [
      "You can use this toilet or the one on 3rd floor.",
      "You can't use this toilet and there aren't any others in the building.",
      "You can't use this toilet and there is another on 3rd floor.",
      "You can't use either this toilet or the one on 3rd floor."
    ],
    answer: 2,
    explanation: "<b>C is correct.</b> 'Out of order' means you cannot use it, but it directs you to 'alternative facilities' (another toilet) on the 3rd floor."
  },
  {
    id: 82,
    prompt: "What is the gym's rule at busy times?",
    sign: {
      type: "simple-box",
      title: "Central Gym",
      body: "15-minute limit on the use of equipment at busy time"
    },
    options: [
      "Equipment is available for a maximum of 15 minutes at any time.",
      "When the gym is crowded, there is a time limit for using equipment.",
      "At busy time, you may have to queue to use the equipment.",
      "When there is a lot of people in the gym, avoid using the equipment."
    ],
    answer: 1,
    explanation: "<b>B is correct.</b> There is a 15-minute time limit only when the gym is busy (crowded)."
  },
  {
    id: 83,
    prompt: "What is the rule about bicycles on the train?",
    sign: {
      type: "rounded-box",
      body: "Passengers cannot bring bicycles onto this train<br>during busy time without booking in advance"
    },
    options: [
      "All passengers must book before boarding with a bicycle.",
      "There is no room for bicycle on this train when it is busy time.",
      "Passengers must book after boarding with a bicycle.",
      "You can bring a bicycle during busy times if you book in advance."
    ],
    answer: 3,
    explanation: "<b>D is correct.</b> The sign says you cannot bring a bicycle during busy time 'without booking in advance', which means if you DO book in advance, it is allowed."
  }
];

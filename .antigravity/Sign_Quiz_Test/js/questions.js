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
  }
];

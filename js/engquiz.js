// ── YOUTUBE STUDY MUSIC PLAYER ─────────────────────────────────────────────
// Playlist of lo-fi / study music YouTube video IDs
const studyTracks = [
  { id: 'jfKfPfyJRdk', name: 'Lo-Fi Chill Beats' },      // Lofi Girl live stream
  { id: '5qap5aO4i9A', name: 'Night Study Vibes' },       // Lofi Girl - night
  { id: 'rPjez8i61mc', name: 'Nature Flow Lofi' },        // nature lofi
  { id: 'lTRiuFIWV54', name: 'Piano Rain Study' }         // piano study
];

let ytPlayer = null;
let isPlaying = false;
let ytReady = false;
let currentTrackIdx = 0;
let pendingPlay = false;

// Load YouTube IFrame API
(function loadYTAPI() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
})();

// Called automatically by YouTube API when ready
function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player('yt-player', {
    height: '1',
    width: '1',
    videoId: studyTracks[currentTrackIdx].id,
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      loop: 1,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      mute: 0
    },
    events: {
      onReady: function(e) {
        ytReady = true;
        e.target.setVolume(100);  // 100% volume
        if (pendingPlay) { e.target.playVideo(); pendingPlay = false; }
      },
      onStateChange: function(e) {
        const bar = document.getElementById('audio-bar');
        if (e.data === YT.PlayerState.PLAYING) {
          document.getElementById('play-btn').textContent = '\u23f8';
          document.getElementById('vinyl').classList.add('playing');
          bar.classList.add('playing-glow');
          isPlaying = true;
        } else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) {
          if (e.data === YT.PlayerState.ENDED) {
            // Auto-loop: replay same track
            e.target.playVideo();
            return;
          }
          document.getElementById('play-btn').textContent = '\u25b6';
          document.getElementById('vinyl').classList.remove('playing');
          bar.classList.remove('playing-glow');
          isPlaying = false;
        }
      },
      onError: function() {
        // If a stream fails, try next track
        currentTrackIdx = (currentTrackIdx + 1) % studyTracks.length;
        ytPlayer.loadVideoById(studyTracks[currentTrackIdx].id);
        updateTrackName();
      }
    }
  });
}

function toggleAudio() {
  if (!ytReady) {
    // API not ready yet — mark as pending
    pendingPlay = true;
    showToast('🎵 Đang tải nhạc...');
    return;
  }
  if (!isPlaying) {
    ytPlayer.playVideo();
    ytPlayer.setVolume(100);
  } else {
    ytPlayer.pauseVideo();
  }
}

function setYTVolume(val) {
  if (ytReady) ytPlayer.setVolume(parseInt(val));
}

function switchTrack(idxStr) {
  currentTrackIdx = parseInt(idxStr);
  updateTrackName();
  if (ytReady) {
    ytPlayer.loadVideoById(studyTracks[currentTrackIdx].id);
    ytPlayer.setVolume(100);
    document.getElementById('vol-slider').value = 100;
    // UI will update via onStateChange
  }
}

function updateTrackName() {
  document.getElementById('track-name').textContent = studyTracks[currentTrackIdx].name;
  document.getElementById('track-select').value = currentTrackIdx;
}

// ── GAME DATA ──────────────────────────────────────────────────────────────
const texts = [
  {
    title: "Workshop Announcement",
    type: "Notice",
    icon: "📋",
    passage: `TEN-DAY WOODWORKING WORKSHOP\n\nDate: July 26th to August 4th\nLocation: Birchwood's Shop Facility in Acorn, Ohio\nCost: $500.00\n\nThis practical workshop will be limited to an ___1___ of twenty and is intended to provide practical and theoretical experience in both elementary and advanced methods and techniques ___2___ to traditional joinery layout, use of modern and traditional timber carpentry tools, assembly of timber systems and hand-raising practices.\n\nThe structure to be built will be an authentic reproduction of an early timber frame house.\n\nPrevious woodworking experience would be an asset, but is not a ___3___.\n\nTo register, send the attached form along with a check for $275 to Birchwood Inc., 215 Ashly Rd., Acorn, Ohio 03560.\n\nEnrollment is ___4___ a first come, first served basis, so please don't wait!\n\nAll participants will receive a certificate ___5___ completion. The workshop aims to ___6___ traditional craftsmanship techniques to a new generation of woodworkers.`,
    questions: [
      {
        type: "Quantifier",
        blank: 1,
        text: "The workshop will be limited to an ___1___ of twenty.",
        options: ["A. organization", "B. enrollment", "C. extension", "D. objection"],
        answer: 1,
        feedback: "'Enrollment of twenty' is a standard quantifier phrase meaning the total number of people enrolled. 'Limited to an enrollment of' is a fixed collocation."
      },
      {
        type: "Part of Speech",
        blank: 2,
        text: "...techniques ___2___ to traditional joinery layout...",
        options: ["A. including", "B. resolving", "C. relating", "D. comparing"],
        answer: 2,
        feedback: "'Relating to' is a participial phrase (present participle) functioning as an adjective modifying 'techniques'. It means 'connected to' or 'concerning'."
      },
      {
        type: "Word Meaning",
        blank: 3,
        text: "Previous woodworking experience would be an asset, but is not a ___3___.",
        options: ["A. prerequisite", "B. adaption", "C. information", "D. validity"],
        answer: 0,
        feedback: "A 'prerequisite' is something required as a prior condition. The sentence contrasts 'asset' (helpful) with what is NOT required — perfect for 'prerequisite'."
      },
      {
        type: "Preposition",
        blank: 4,
        text: "Enrollment is ___4___ a first come, first served basis.",
        options: ["A. in", "B. on", "C. at", "D. by"],
        answer: 1,
        feedback: "The fixed prepositional collocation is 'on a first come, first served basis'. 'On' is used with 'basis' in this standard English expression."
      },
      {
        type: "Collocation",
        blank: 5,
        text: "All participants will receive a certificate ___5___ completion.",
        options: ["A. for", "B. with", "C. of", "D. about"],
        answer: 2,
        feedback: "'Certificate of completion' is a fixed collocation. 'Of' links the certificate to what it certifies — completion of the course."
      },
      {
        type: "Infinitive / Purpose",
        blank: 6,
        text: "The workshop aims to ___6___ traditional craftsmanship techniques.",
        options: ["A. pass on", "B. pass away", "C. pass out", "D. pass over"],
        answer: 0,
        feedback: "'Pass on' is a phrasal verb meaning to transmit or hand down knowledge/skills to others. The other options have different meanings: 'pass away' = die, 'pass out' = faint, 'pass over' = skip."
      }
    ]
  },
  {
    title: "Room Maintenance Request",
    type: "Form",
    icon: "🏨",
    passage: `ROOM MAINTENANCE REQUEST FORM\n\nShould you find anything in your suite that ___1___ the attention of housekeeping, please fill out this request form and drop it in the box conveniently located on each floor next to the elevator doors. We will do our utmost to ___2___ your request.\n\nIn case the item needs our immediate attention, please do not ___3___ to contact the front desk by pressing #0 on your suite phone.\n\nThank you,\nThe Management\n\nRoom No: 507\nDate: November 22\n\nDescription: I am really annoyed by the noise the bathroom faucet ___4___ when I turn on the hot water. It makes a squeaking sound from time to time and I think it needs to be repaired ___5___. If it is not fixed by tomorrow night, I would like to ___6___ a room change. Thank you.`,
    questions: [
      {
        type: "Relative Clause",
        blank: 1,
        text: "Should you find anything in your suite that ___1___ the attention of housekeeping...",
        options: ["A. needs", "B. need", "C. needed", "D. will need"],
        answer: 0,
        feedback: "In a relative clause with 'that' referring to 'anything' (singular), the verb must be singular present tense: 'needs'. This is the general instruction form — present simple is correct."
      },
      {
        type: "Collocation",
        blank: 2,
        text: "We will do our utmost to ___2___ your request.",
        options: ["A. accept", "B. meet", "C. reply", "D. confirm"],
        answer: 1,
        feedback: "'Meet a request' is the correct collocation meaning to fulfill or satisfy a request. 'Accept' means to agree, but doesn't convey fulfillment. 'Meet' is the standard collocate here."
      },
      {
        type: "Phrasal Verb / Linking",
        blank: 3,
        text: "...please do not ___3___ to contact the front desk...",
        options: ["A. hesitate", "B. refuse", "C. delay", "D. attempt"],
        answer: 0,
        feedback: "'Do not hesitate to + verb' is a fixed formal expression meaning 'feel free to' or 'please go ahead and'. It is standard in formal letters and notices."
      },
      {
        type: "Tense",
        blank: 4,
        text: "...the noise the bathroom faucet ___4___ when I turn on the hot water.",
        options: ["A. is creating", "B. has created", "C. creates", "D. created"],
        answer: 2,
        feedback: "Present simple ('creates') describes a habitual or repeated action. The clause 'when I turn on the hot water' confirms this is a recurring situation, not a one-time event."
      },
      {
        type: "Word Meaning",
        blank: 5,
        text: "...I think it needs to be repaired ___5___.",
        options: ["A. rapidly", "B. urgently", "C. immediately", "D. quickly"],
        answer: 2,
        feedback: "'Repaired immediately' fits best — the guest says they think it 'needs to be' fixed right away. This also matches the formal register of the form. All options are close, but 'immediately' is the most emphatic and fits hotel complaint register."
      },
      {
        type: "Conditional / Reported",
        blank: 6,
        text: "If it is not fixed by tomorrow night, I would like to ___6___ a room change.",
        options: ["A. request", "B. demand", "C. insist", "D. complain"],
        answer: 0,
        feedback: "This is a first conditional structure expressing a polite future condition. 'Request' is the most appropriate word — polite and formal. 'Demand' is too aggressive for a hotel form."
      }
    ]
  },
  {
    title: "An Dinh Palace — Heritage Site",
    type: "Travel Article",
    icon: "🏛️",
    passage: `An Dinh Palace is located at 179B Phan Dinh Phung Street, Phu Nhuan Ward, Hue City. It stands out ___1___ a poignant note in the melodious symphony of the ancient capital. More than just a historical relic, it is an unmissable destination for anyone ___2___ Hue.\n\nAn Dinh Palace was initially the private residence of Prince Ung Lich, who ___3___ become Emperor Dong Khanh during the Nguyen Dynasty. During the reign of Emperor Thanh Thai, the residence was rebuilt into a magnificent palace. In 1922, he ___4___ it to Prince Buu Lan, who would become Emperor Khai Dinh.\n\nIn 1954, the mansion was confiscated by the Ngo Dinh Diem administration. In 1975, Dowager Empress Tu Cung decided to hand ___5___ the entire palace to the government.\n\nIn 1993, An Dinh Palace was honorably recognized by UNESCO as a World Cultural Heritage site ___6___ the Complex of Hue Monuments.`,
    questions: [
      {
        type: "Preposition",
        blank: 1,
        text: "It stands out ___1___ a poignant note in the melodious symphony...",
        options: ["A. as", "B. like", "C. for", "D. with"],
        answer: 1,
        feedback: "'Like' is a preposition of comparison meaning 'similar to'. The palace is being compared to a note in a symphony — a simile. 'As' would make it a metaphor, but 'like' (preposition) is used here for direct comparison."
      },
      {
        type: "Part of Speech",
        blank: 2,
        text: "...an unmissable destination for anyone ___2___ Hue.",
        options: ["A. visit", "B. visited", "C. visiting", "D. to have visited"],
        answer: 2,
        feedback: "'Visiting' is a present participle in a reduced relative clause ('who is visiting'). After 'anyone', we use the -ing form as a participial adjective. 'For anyone visiting' = 'for anyone who visits'."
      },
      {
        type: "Relative Clause",
        blank: 3,
        text: "...Prince Ung Lich, who ___3___ become Emperor Dong Khanh...",
        options: ["A. would later", "B. will later", "C. has later", "D. had later"],
        answer: 0,
        feedback: "'Would later become' is the correct structure. In narrative historical text using past tense, 'would + infinitive' expresses future-in-the-past — something that happened after the point being described."
      },
      {
        type: "Tense",
        blank: 4,
        text: "In 1922, he ___4___ it to Prince Buu Lan...",
        options: ["A. has gifted", "B. gifted", "C. gifts", "D. was gifting"],
        answer: 1,
        feedback: "With a specific past time marker ('In 1922'), past simple is required. 'Has gifted' (present perfect) cannot be used with a finished past time expression."
      },
      {
        type: "Phrasal Verb",
        blank: 5,
        text: "...Tu Cung decided to hand ___5___ the entire palace to the government.",
        options: ["A. over", "B. out", "C. in", "D. down"],
        answer: 0,
        feedback: "'Hand over' means to transfer control or ownership of something to another party. 'Hand out' = distribute, 'hand in' = submit, 'hand down' = pass to future generations."
      },
      {
        type: "Preposition / Collocation",
        blank: 6,
        text: "...recognized by UNESCO as a World Cultural Heritage site ___6___ the Complex of Hue Monuments.",
        options: ["A. among", "B. within", "C. beside", "D. around"],
        answer: 1,
        feedback: "'Within the Complex' means 'as part of' or 'inside' the larger group. The palace is one site that exists inside the broader UNESCO complex — 'within' correctly expresses this inclusion."
      }
    ]
  },
  {
    title: "An Thoi Archipelago",
    type: "Travel Guide",
    icon: "🏝️",
    passage: `The An Thoi Archipelago is located at the southern tip of Phu Quoc Island, ___1___ Hon Thom Commune, Phu Quoc City, Kien Giang Province. Spanning roughly 7.2km², this group ___2___ about 15 islands and islets, three of which are home to small local communities.\n\nThis is one of the few island regions in Vietnam that still ___3___ its untouched natural beauty, featuring crystal-clear waters, powdery white sand beaches, and a rich marine ecosystem.\n\nHon Thom is the largest and most developed island, ___4___ to the sea-crossing cable car, water park, and several scenic beaches. Hon May Rut is famous ___5___ its serene ambiance and vibrant coral reefs, ideal for snorkeling.\n\n___6___ its breathtaking scenery and wide range of sea-based adventures, An Thoi is the perfect destination for those seeking to discover Phu Quoc's untouched island beauty.`,
    questions: [
      {
        type: "Preposition",
        blank: 1,
        text: "...located at the southern tip of Phu Quoc Island, ___1___ Hon Thom Commune...",
        options: ["A. at", "B. in", "C. on", "D. within"],
        answer: 3,
        feedback: "'Within Hon Thom Commune' uses 'within' to express that the location is contained inside the administrative area. For administrative divisions (commune, district, province), 'within' or 'in' are used — here 'within' emphasizes containment."
      },
      {
        type: "Tense / Subject-Verb",
        blank: 2,
        text: "...this group ___2___ about 15 islands and islets...",
        options: ["A. including", "B. includes", "C. is included", "D. has included"],
        answer: 1,
        feedback: "Present simple 'includes' is used for factual, geographical descriptions. 'This group includes' = a general factual statement. 'Has included' would suggest a change over time, which is not the intent."
      },
      {
        type: "Relative Clause / Tense",
        blank: 3,
        text: "...one of the few island regions that still ___3___ its untouched natural beauty...",
        options: ["A. preserve", "B. preserved", "C. preserves", "D. is preserving"],
        answer: 2,
        feedback: "The antecedent of the relative clause is 'one of the few island regions' — a singular noun phrase requiring a singular verb: 'preserves'. Present simple describes ongoing current facts."
      },
      {
        type: "Part of Speech",
        blank: 4,
        text: "Hon Thom is the largest and most developed island, ___4___ to the sea-crossing cable car...",
        options: ["A. home", "B. homed", "C. homes", "D. to home"],
        answer: 0,
        feedback: "'Home to' is a fixed adjectival phrase used as a post-modifier meaning 'containing' or 'hosting'. 'An island home to X' is a standard descriptive structure in travel writing."
      },
      {
        type: "Collocation",
        blank: 5,
        text: "Hon May Rut is famous ___5___ its serene ambiance and vibrant coral reefs...",
        options: ["A. about", "B. of", "C. for", "D. with"],
        answer: 2,
        feedback: "'Famous for' is the correct adjective-preposition collocation. We say someone/something is 'famous for' a quality or thing. 'Famous of' and 'famous about' are incorrect collocations."
      },
      {
        type: "Linking Word",
        blank: 6,
        text: "___6___ its breathtaking scenery and wide range of sea-based adventures, An Thoi is the perfect destination...",
        options: ["A. Despite", "B. Although", "C. With", "D. However"],
        answer: 2,
        feedback: "'With its [features]' is a preposition introducing what makes something attractive or suitable. It functions as a reason/basis. 'Despite' would introduce a contrast, which doesn't fit the positive context."
      }
    ]
  },
  {
    title: "Thien Huong Cave",
    type: "Cultural Guide",
    icon: "🕍",
    passage: `Thien Huong Cave houses a shrine ___1___ to Empress Tran Thi Dung, the wife of King Ly Hue Tong and mother of the last emperor of the Ly Dynasty. She played a pivotal role ___2___ transitioning from the Ly to the Tran Dynasty and is revered for introducing silk cultivation and weaving techniques to the local community.\n\nPerched approximately 15 meters above ground level, Thien Huong Cave is a dry, well-lit cavern ___3___ about 20 meters wide, 40 meters deep, and nearly 60 meters high. Its ceiling ___4___ a natural skylight, allowing sunlight to filter through, creating a serene and ethereal atmosphere inside.\n\nThe cave's architecture ___5___ traditional Vietnamese temple design, adorned with carvings of dragons and phoenixes, ___6___ its majestic ambiance.`,
    questions: [
      {
        type: "Part of Speech",
        blank: 1,
        text: "Thien Huong Cave houses a shrine ___1___ to Empress Tran Thi Dung...",
        options: ["A. dedicating", "B. dedicated", "C. to dedicate", "D. that dedicates"],
        answer: 1,
        feedback: "'Dedicated to' is a past participial phrase (reduced relative clause) modifying 'shrine'. 'A shrine dedicated to X' = 'a shrine that is dedicated to X'. The passive participle is correct here."
      },
      {
        type: "Preposition",
        blank: 2,
        text: "She played a pivotal role ___2___ transitioning from the Ly to the Tran Dynasty...",
        options: ["A. for", "B. at", "C. in", "D. with"],
        answer: 2,
        feedback: "'Play a role in + gerund' is the fixed collocation. We say 'play a role in doing something'. 'In' is the correct preposition after 'role' when followed by a gerund phrase."
      },
      {
        type: "Part of Speech",
        blank: 3,
        text: "...a dry, well-lit cavern ___3___ about 20 meters wide, 40 meters deep...",
        options: ["A. measuring", "B. measured", "C. to measure", "D. measures"],
        answer: 0,
        feedback: "'Measuring' is a present participial phrase post-modifying 'cavern'. It functions like a relative clause: 'a cavern that measures about 20 meters wide'. Active present participle is used because the cavern performs the action of measuring."
      },
      {
        type: "Tense",
        blank: 4,
        text: "Its ceiling ___4___ a natural skylight, allowing sunlight to filter through...",
        options: ["A. formed", "B. forms", "C. is formed", "D. has formed"],
        answer: 1,
        feedback: "Present simple 'forms' describes a permanent, factual characteristic of the cave. It's a timeless geographical/architectural fact, not a temporary or completed action."
      },
      {
        type: "Collocation",
        blank: 5,
        text: "The cave's architecture ___5___ traditional Vietnamese temple design...",
        options: ["A. mirrors", "B. reflects on", "C. copies to", "D. shows off"],
        answer: 0,
        feedback: "'Mirrors' (meaning closely resembles or imitates) is the most precise word. It's a common collocation in architecture writing: 'mirrors the design of'. 'Reflects on' means to think about, not resemble."
      },
      {
        type: "Participle / Linking",
        blank: 6,
        text: "...adorned with carvings of dragons and phoenixes, ___6___ its majestic ambiance.",
        options: ["A. enhancing", "B. enhanced", "C. to enhance", "D. which enhances"],
        answer: 0,
        feedback: "'Enhancing' is a present participial clause of result — it shows what the carvings achieve. It modifies the whole preceding clause: the adornment results in enhancing the ambiance."
      }
    ]
  },
  {
    title: "Bamboo Airways & Vinpearl Combo",
    type: "Advertisement",
    icon: "✈️",
    passage: `FLY & STAY FOR LESS\n\nLet Vinpearl and Bamboo Airways take you on an unforgettable adventure to Vietnam's most stunning destinations with an incredible travel combo that ___1___ you save big. Enjoy flexible itineraries, all-in-one professional services, and the peace of mind that ___2___ with a perfectly planned getaway.\n\nEnjoy a luxurious getaway and save ___3___ 40% with the Vinpearl & Bamboo Airways combo. The package ___4___:\n\n• Accommodation at Vinpearl's premium hotels and resorts\n• Optional Bamboo Airways flights, valid for all ___5___ routes\n• Up to 30% off spa services and 20% off dining\n• Complimentary airport transfers\n\nDon't ___6___ — book now and secure your dream vacation at an unbeatable price!`,
    questions: [
      {
        type: "Relative Clause",
        blank: 1,
        text: "...an incredible travel combo that ___1___ you save big.",
        options: ["A. makes", "B. make", "C. made", "D. has made"],
        answer: 0,
        feedback: "In the relative clause with 'that' referring to 'combo' (singular), the verb must be singular: 'makes'. Present simple is used for advertised facts/features. 'Helps you save' or 'makes you save' — 'makes' fits the causative structure."
      },
      {
        type: "Collocation",
        blank: 2,
        text: "...the peace of mind that ___2___ with a perfectly planned getaway.",
        options: ["A. arrives", "B. comes", "C. follows", "D. appears"],
        answer: 1,
        feedback: "'Peace of mind that comes with X' is a fixed collocation. 'Come with' means to be associated with or result from. 'Arrive with' and 'follow with' are not standard collocations here."
      },
      {
        type: "Preposition",
        blank: 3,
        text: "...save ___3___ 40% with the Vinpearl & Bamboo Airways combo.",
        options: ["A. to", "B. about", "C. up to", "D. as much"],
        answer: 2,
        feedback: "'Save up to 40%' is the standard commercial/advertising expression meaning the maximum discount is 40% — you may save less but not more. 'Up to' is the correct prepositional phrase."
      },
      {
        type: "Tense / Part of Speech",
        blank: 4,
        text: "The package ___4___:",
        options: ["A. is including", "B. has included", "C. includes", "D. included"],
        answer: 2,
        feedback: "Present simple 'includes' describes the current contents of a package — a factual, timeless statement about what the product contains. 'Is including' (progressive) is not used for states."
      },
      {
        type: "Part of Speech",
        blank: 5,
        text: "...Bamboo Airways flights, valid for all ___5___ routes.",
        options: ["A. operate", "B. operated", "C. operation", "D. operating"],
        answer: 3,
        feedback: "'Operating routes' uses the present participle as an adjective modifying 'routes'. 'All operating routes' = 'all routes that are in operation'. 'Operated' could also work (passive) but 'operating' is the conventional airline industry term."
      },
      {
        type: "Conditional / Linking Word",
        blank: 6,
        text: "Don't ___6___ — book now and secure your dream vacation at an unbeatable price!",
        options: ["A. hold back", "B. give up", "C. pass out", "D. stand by"],
        answer: 0,
        feedback: "'Don't hold back' in advertising means 'don't hesitate' or 'don't wait'. It's a phrasal verb used in persuasive writing to urge immediate action. 'Give up' means to quit, 'pass out' means to faint."
      }
    ]
  },
  {
    title: "Cuc Phuong National Park",
    type: "Travel Guide",
    icon: "🌿",
    passage: `Located in Nho Quan District, Ninh Binh Province, Cuc Phuong is Vietnam's first national park, ___1___ in 1962. It stands as a testament to the country's steadfast commitment ___2___ biodiversity conservation.\n\nCovering over 22,000 hectares, Cuc Phuong encompasses a precious limestone tropical forest ecosystem, home to 2,200 plant species, 135 mammals, and more than 330 bird species — ___3___ the critically endangered Delacour's langur.\n\nFar from being flashy or crowded, Cuc Phuong wins hearts ___4___ its pristine, tranquil, and vibrant beauty. More than a place to admire nature, it offers a living, breathing space where visitors can truly ___5___ themselves in local culture.\n\nNestled at the foot of the mountains, Muong ethnic villages preserve a way of life closely ___6___ to the forest and age-old traditions.`,
    questions: [
      {
        type: "Part of Speech",
        blank: 1,
        text: "Cuc Phuong is Vietnam's first national park, ___1___ in 1962.",
        options: ["A. establishing", "B. established", "C. to establish", "D. that established"],
        answer: 1,
        feedback: "'Established in 1962' is a past participial phrase (reduced passive relative clause): 'which was established in 1962'. Past participle is used because the park is the recipient of the action."
      },
      {
        type: "Preposition / Collocation",
        blank: 2,
        text: "...the country's steadfast commitment ___2___ biodiversity conservation.",
        options: ["A. for", "B. of", "C. to", "D. in"],
        answer: 2,
        feedback: "'Commitment to' is the correct noun-preposition collocation. We say 'commitment to a cause/goal'. 'Commitment for' is incorrect. This is a fixed adjective/noun + preposition pattern."
      },
      {
        type: "Linking Word",
        blank: 3,
        text: "...more than 330 bird species — ___3___ the critically endangered Delacour's langur.",
        options: ["A. besides", "B. including", "C. moreover", "D. furthermore"],
        answer: 1,
        feedback: "'Including' introduces a specific example from a larger list. It is a preposition (not a conjunction) used to highlight a notable member of the set just mentioned. 'Besides' means 'in addition to' but doesn't specify inclusion."
      },
      {
        type: "Preposition",
        blank: 4,
        text: "Cuc Phuong wins hearts ___4___ its pristine, tranquil, and vibrant beauty.",
        options: ["A. by", "B. from", "C. through", "D. with"],
        answer: 3,
        feedback: "'Wins hearts with its beauty' — 'with' introduces the means or instrument. 'Win hearts with X' is the natural collocation. 'By' would require a gerund: 'by showing its beauty'."
      },
      {
        type: "Phrasal Verb / Word Meaning",
        blank: 5,
        text: "...it offers a space where visitors can truly ___5___ themselves in local culture.",
        options: ["A. drown", "B. submerge", "C. immerse", "D. sink"],
        answer: 2,
        feedback: "'Immerse oneself in' is the correct collocation meaning to become deeply involved in. 'Immerse yourself in culture/language' is the standard phrase. 'Submerge' and 'drown' are used for liquids, not culture."
      },
      {
        type: "Part of Speech",
        blank: 6,
        text: "Muong ethnic villages preserve a way of life closely ___6___ to the forest and age-old traditions.",
        options: ["A. tying", "B. being tied", "C. tied", "D. to tie"],
        answer: 2,
        feedback: "'Closely tied to' is a past participial phrase modifying 'way of life'. It means 'strongly connected to'. The passive participle 'tied' is used because 'way of life' is the subject of the passive relationship."
      }
    ]
  },
  {
    title: "Internship Program Announcement",
    type: "Letter",
    icon: "💼",
    passage: `Dear Applicants,\n\nWe are pleased to ___1___ applications for our summer internship program. This program is ___2___ to provide university students with hands-on experience in a professional environment.\n\nAll interns will be expected to work forty hours per week and will ___3___ a monthly stipend. Applicants must be currently ___4___ in a degree program and have completed at least two years of study.\n\nWe strongly encourage students with a background ___5___ business, marketing, or communications to apply. Please note that previous internship experience is an advantage but is not ___6___.\n\nApplication deadline: March 31st.`,
    questions: [
      {
        type: "Phrasal Verb",
        blank: 1,
        text: "We are pleased to ___1___ applications for our summer internship program.",
        options: ["A. call for", "B. call off", "C. call out", "D. call on"],
        answer: 0,
        feedback: "'Call for' is a phrasal verb meaning to invite, request, or solicit. 'Call for applications' = to officially request or invite applications. 'Call off' = cancel, 'call out' = challenge/expose, 'call on' = visit or request."
      },
      {
        type: "Part of Speech",
        blank: 2,
        text: "This program is ___2___ to provide university students with hands-on experience...",
        options: ["A. design", "B. designed", "C. designing", "D. designer"],
        answer: 1,
        feedback: "'Is designed to + infinitive' uses a past participle in the passive voice to describe purpose. The structure 'be designed to do something' means 'be intended to do something'."
      },
      {
        type: "Tense",
        blank: 3,
        text: "All interns will be expected to work forty hours per week and will ___3___ a monthly stipend.",
        options: ["A. receiving", "B. received", "C. receive", "D. be received"],
        answer: 2,
        feedback: "The parallel structure requires 'will + bare infinitive' to match 'will be expected to'. The second part should be 'will receive' — active voice, future simple, parallel with the first clause."
      },
      {
        type: "Part of Speech",
        blank: 4,
        text: "Applicants must be currently ___4___ in a degree program...",
        options: ["A. enroll", "B. enrolled", "C. enrolling", "D. enrollment"],
        answer: 1,
        feedback: "'Currently enrolled in' uses the past participle in a passive structure with 'be'. 'Be enrolled in a program' = to be registered as a student. This is a standard formal expression."
      },
      {
        type: "Preposition",
        blank: 5,
        text: "...students with a background ___5___ business, marketing, or communications...",
        options: ["A. at", "B. of", "C. for", "D. in"],
        answer: 3,
        feedback: "'Background in [field]' is the fixed collocation. We say 'a background in business/science/law'. 'Background of' or 'background at' are incorrect collocations."
      },
      {
        type: "Word Meaning",
        blank: 6,
        text: "...previous internship experience is an advantage but is not ___6___.",
        options: ["A. compulsory", "B. necessary", "C. required", "D. mandatory"],
        answer: 3,
        feedback: "All four options are close, but 'mandatory' (legally or officially required) is the strongest contrast to 'advantage'. In formal employment contexts, 'mandatory' is the most precise term for a non-negotiable requirement."
      }
    ]
  },
  {
    title: "Cooking Class Invitation",
    type: "Advertisement",
    icon: "👨‍🍳",
    passage: `JOIN OUR AUTHENTIC VIETNAMESE COOKING CLASS!\n\nHave you ever dreamed of mastering the art of Vietnamese cuisine? Whether you are a beginner or ___1___ experienced cook, our classes are designed to ___2___ every skill level.\n\nOur professional chefs, ___3___ have trained at top culinary institutions, will guide you through the preparation of iconic dishes such as Pho, Banh Mi, and Fresh Spring Rolls.\n\nClasses are ___4___ every Saturday and Sunday morning from 9 AM to 1 PM. Each session ___5___ a market visit, hands-on cooking, and a delicious meal that you have prepared ___6___.\n\nBookings must be made at least 48 hours in advance.`,
    questions: [
      {
        type: "Quantifier",
        blank: 1,
        text: "Whether you are a beginner or ___1___ experienced cook...",
        options: ["A. a", "B. an", "C. the", "D. some"],
        answer: 1,
        feedback: "'An experienced cook' — the indefinite article 'an' is used before words beginning with a vowel sound. 'Experienced' starts with the vowel sound /ɪ/, so 'an' is required. This tests article use."
      },
      {
        type: "Collocation",
        blank: 2,
        text: "...our classes are designed to ___2___ every skill level.",
        options: ["A. fit", "B. suit", "C. match", "D. cater to"],
        answer: 3,
        feedback: "'Cater to every skill level' is the correct collocation meaning to provide for or accommodate different levels. 'Cater to' is the established phrasal verb for services. 'Suit' and 'fit' work with objects, not skill levels."
      },
      {
        type: "Relative Clause",
        blank: 3,
        text: "Our professional chefs, ___3___ have trained at top culinary institutions...",
        options: ["A. which", "B. that", "C. who", "D. whom"],
        answer: 2,
        feedback: "'Who' is the correct relative pronoun for people in a non-defining relative clause (marked by commas). 'That' cannot be used in non-defining relative clauses. 'Whom' would need to be the object, not subject."
      },
      {
        type: "Tense / Passive",
        blank: 4,
        text: "Classes are ___4___ every Saturday and Sunday morning...",
        options: ["A. holding", "B. held", "C. being held", "D. hold"],
        answer: 1,
        feedback: "'Classes are held' uses the passive voice to describe a recurring scheduled event. Present simple passive ('are held') is standard for timetables and programs. 'Being held' implies a temporary or specific event."
      },
      {
        type: "Part of Speech",
        blank: 5,
        text: "Each session ___5___ a market visit, hands-on cooking, and a delicious meal...",
        options: ["A. consist", "B. consists of", "C. is consisting", "D. consisting"],
        answer: 1,
        feedback: "'Consists of' is the correct verb phrase. 'Consist of' (never progressive) means to be made up of. It's a stative verb so present simple is used. 'Consist' without 'of' is incomplete."
      },
      {
        type: "Pronoun / Emphatic",
        blank: 6,
        text: "...a delicious meal that you have prepared ___6___.",
        options: ["A. yourself", "B. by yourself", "C. on your own", "D. alone"],
        answer: 0,
        feedback: "'Prepared yourself' uses a reflexive pronoun for emphasis (emphatic pronoun), meaning 'you yourself prepared it'. 'By yourself' means alone/without help. 'Yourself' here emphasizes personal achievement, making it more natural in advertising."
      }
    ]
  },
  {
    title: "Volunteer Program Application",
    type: "Letter",
    icon: "🤝",
    passage: `Dear Volunteer Coordinator,\n\nI am writing to express my interest in ___1___ for the Community Clean-Up Volunteer Program. I ___2___ about this opportunity through my university's notice board and immediately felt inspired to take part.\n\nI believe that protecting the environment is a responsibility that we all ___3___. Over the past two years, I ___4___ in several local conservation projects, which have strengthened my appreciation for environmental issues.\n\nI would be grateful ___5___ you could provide further details about the program schedule and any specific skills ___6___ from volunteers.\n\nThank you for your consideration.`,
    questions: [
      {
        type: "Part of Speech",
        blank: 1,
        text: "I am writing to express my interest in ___1___ for the program.",
        options: ["A. apply", "B. applied", "C. applying", "D. application"],
        answer: 2,
        feedback: "After 'interest in', a gerund (-ing form) is required. 'My interest in applying' — prepositions and noun phrases are followed by gerunds, not bare infinitives. This tests the noun + preposition + gerund structure."
      },
      {
        type: "Tense",
        blank: 2,
        text: "I ___2___ about this opportunity through my university's notice board...",
        options: ["A. learn", "B. learned", "C. have learned", "D. am learning"],
        answer: 1,
        feedback: "Past simple 'learned' is correct here. The implied time is 'when I saw the notice board' — a specific completed past action. Present perfect would require a connection to the present, which isn't indicated here."
      },
      {
        type: "Relative Clause / Pronoun",
        blank: 3,
        text: "...a responsibility that we all ___3___.",
        options: ["A. share", "B. shares", "C. sharing", "D. shared"],
        answer: 0,
        feedback: "In the relative clause, 'we all' is the subject — plural. The verb must be plural present simple: 'share'. This is a universal truth/general fact, so present simple is appropriate."
      },
      {
        type: "Tense",
        blank: 4,
        text: "Over the past two years, I ___4___ in several local conservation projects...",
        options: ["A. participated", "B. participate", "C. have participated", "D. was participating"],
        answer: 2,
        feedback: "'Over the past two years' is a time expression indicating a period from the past up to now. Present perfect ('have participated') is required. Past simple would need a finished past time reference."
      },
      {
        type: "Conditional / Subjunctive",
        blank: 5,
        text: "I would be grateful ___5___ you could provide further details...",
        options: ["A. unless", "B. if", "C. when", "D. provided"],
        answer: 1,
        feedback: "'Would be grateful if you could' is a polite conditional structure (second conditional for politeness). 'If' introduces the condition. This is standard formal letter language. 'Unless' means 'except if', which doesn't fit."
      },
      {
        type: "Part of Speech",
        blank: 6,
        text: "...any specific skills ___6___ from volunteers.",
        options: ["A. requiring", "B. required", "C. requirement", "D. to require"],
        answer: 1,
        feedback: "'Skills required from volunteers' uses a past participial phrase (passive) meaning 'skills that are required'. 'Required' post-modifies 'skills'. 'Requiring' would mean the skills are requiring something — incorrect meaning."
      }
    ]
  },
  {
    title: "Library Membership Notice",
    type: "Notice",
    icon: "📚",
    passage: `CITY LIBRARY — MEMBERSHIP RENEWAL NOTICE\n\nDear Member,\n\nYour library membership is ___1___ to expire on December 31st. To continue enjoying our services, please renew your membership at least two weeks ___2___ the expiry date.\n\nMembership renewal can be done ___3___ online through our website, in person at the library counter, or by post. Should you ___4___ to renew within the specified period, late fees will apply.\n\nAs a renewed member, you will ___5___ access to our new digital collection, which ___6___ over 10,000 e-books and audiobooks across all genres.\n\nWe look forward to serving you.`,
    questions: [
      {
        type: "Word Meaning",
        blank: 1,
        text: "Your library membership is ___1___ to expire on December 31st.",
        options: ["A. about", "B. scheduled", "C. due", "D. intended"],
        answer: 2,
        feedback: "'Due to expire' is the correct collocation meaning 'expected to expire' or 'scheduled to expire'. 'Due' in this context indicates a scheduled time. 'About to' means very soon (not a specific date)."
      },
      {
        type: "Preposition / Linking",
        blank: 2,
        text: "...please renew your membership at least two weeks ___2___ the expiry date.",
        options: ["A. since", "B. before", "C. after", "D. following"],
        answer: 1,
        feedback: "'Two weeks before the expiry date' — 'before' indicates earlier than the reference point. The instruction is to renew in advance. 'After' would mean past the deadline, contradicting the notice's purpose."
      },
      {
        type: "Linking Word",
        blank: 3,
        text: "Membership renewal can be done ___3___ online through our website, in person, or by post.",
        options: ["A. either", "B. both", "C. neither", "D. whether"],
        answer: 0,
        feedback: "'Either... or' is used for two alternatives, but with three options, 'either' still works as an introductory word before 'or'. It signals that any one of the listed options is valid. This tests correlative conjunctions."
      },
      {
        type: "Conditional",
        blank: 4,
        text: "Should you ___4___ to renew within the specified period, late fees will apply.",
        options: ["A. fail", "B. failing", "C. failed", "D. have failed"],
        answer: 0,
        feedback: "'Should you fail to' is an inverted conditional (formal) meaning 'if you fail to'. In formal English, 'should' can replace 'if' with subject-verb inversion. 'Should + subject + base verb' is the correct structure."
      },
      {
        type: "Tense",
        blank: 5,
        text: "As a renewed member, you will ___5___ access to our new digital collection...",
        options: ["A. gaining", "B. gain", "C. have gained", "D. gained"],
        answer: 1,
        feedback: "'Will gain access' — future simple with bare infinitive after modal 'will'. This is a straightforward future prediction/promise. 'Will + base verb' is the standard future simple structure."
      },
      {
        type: "Relative Clause",
        blank: 6,
        text: "...our new digital collection, which ___6___ over 10,000 e-books and audiobooks...",
        options: ["A. contain", "B. containing", "C. contains", "D. is contained"],
        answer: 2,
        feedback: "In the non-defining relative clause 'which contains', the antecedent is 'digital collection' (singular). Singular present simple 'contains' is correct. 'Containing' would be a participle, needing no 'which'."
      }
    ]
  },
  {
    title: "Job Offer Letter",
    type: "Letter",
    icon: "📄",
    passage: `Dear Ms. Nguyen,\n\nWe are delighted to offer you the position of Marketing Executive at GreenLife Solutions, ___1___ from June 1st, 2026.\n\nYour annual salary will be $48,000, ___2___ in monthly installments on the last working day of each month. You will also be ___3___ to a range of benefits, including health insurance, annual leave of 18 days, and professional development allowances.\n\nKindly ___4___ this offer by signing and returning the enclosed contract by May 15th. Should you ___5___ any questions regarding the terms and conditions, please do not hesitate to contact our HR department.\n\nWe look forward ___6___ you to our team.`,
    questions: [
      {
        type: "Part of Speech",
        blank: 1,
        text: "...the position of Marketing Executive at GreenLife Solutions, ___1___ from June 1st, 2026.",
        options: ["A. effect", "B. effective", "C. effectively", "D. effectiveness"],
        answer: 1,
        feedback: "'Effective from [date]' is a set phrase meaning 'starting from' or 'taking effect from'. 'Effective' here is used as an adjective in an absolute phrase. It's a fixed formal expression in employment letters."
      },
      {
        type: "Part of Speech",
        blank: 2,
        text: "Your annual salary will be $48,000, ___2___ in monthly installments...",
        options: ["A. paying", "B. paid", "C. to pay", "D. that pays"],
        answer: 1,
        feedback: "'Paid in monthly installments' is a past participial phrase describing how the salary is distributed. It is a reduced passive relative clause: 'which will be paid in monthly installments'."
      },
      {
        type: "Word Meaning",
        blank: 3,
        text: "You will also be ___3___ to a range of benefits...",
        options: ["A. allowed", "B. entitled", "C. qualified", "D. permitted"],
        answer: 1,
        feedback: "'Entitled to' is the correct collocation for rights and benefits: 'to be entitled to benefits/leave'. 'Be entitled to X' means to have the right or legal claim to X. 'Allowed' and 'permitted' suggest permission, not rights."
      },
      {
        type: "Reported Speech",
        blank: 4,
        text: "Kindly ___4___ this offer by signing and returning the enclosed contract...",
        options: ["A. confirm", "B. confirming", "C. confirmed", "D. confirmation"],
        answer: 0,
        feedback: "'Kindly confirm' — in imperative formal instructions, the base verb is used. 'Kindly' is a formal adverb introducing polite requests/instructions in business letters. 'Kindly + base verb' is the standard structure."
      },
      {
        type: "Conditional",
        blank: 5,
        text: "Should you ___5___ any questions regarding the terms and conditions...",
        options: ["A. have", "B. having", "C. had", "D. will have"],
        answer: 0,
        feedback: "'Should you have any questions' is an inverted conditional (formal): if = should, and the verb reverts to base form. 'Should you + base verb' is equivalent to 'If you have'. This is a first conditional in formal inverted form."
      },
      {
        type: "Collocation / Preposition",
        blank: 6,
        text: "We look forward ___6___ you to our team.",
        options: ["A. to welcome", "B. to welcoming", "C. welcoming", "D. for welcoming"],
        answer: 1,
        feedback: "'Look forward to + gerund' — 'to' here is a preposition (not part of an infinitive), so the -ing form follows. 'Look forward to welcoming' is the fixed structure. 'Look forward to + verb-ing' is always correct."
      }
    ]
  },
  {
    title: "Community Event Flyer",
    type: "Advertisement",
    icon: "🎪",
    passage: `GREENVILLE COMMUNITY FESTIVAL 2026\n\nJoin us for a day ___1___ of fun, music, and culture at the Annual Greenville Community Festival! This beloved event, ___2___ since 1995, brings together residents from all walks of life.\n\nHighlights ___3___:\n• Live performances by local and national artists\n• A food market ___4___ over 50 vendors\n• Interactive workshops for children and adults ___5___\n• A spectacular fireworks display to ___6___ the evening\n\nDate: August 15th, 2026 | Location: Greenville Central Park\nAdmission is FREE for all!`,
    questions: [
      {
        type: "Part of Speech",
        blank: 1,
        text: "Join us for a day ___1___ of fun, music, and culture...",
        options: ["A. full", "B. fill", "C. filled", "D. filling"],
        answer: 0,
        feedback: "'A day full of' is the correct structure. 'Full of' is an adjectival phrase post-modifying 'day'. 'Filled with' would also work but 'full of' is the natural collocation for this advertising context."
      },
      {
        type: "Tense / Relative Clause",
        blank: 2,
        text: "This beloved event, ___2___ since 1995, brings together residents from all walks of life.",
        options: ["A. running", "B. run", "C. having run", "D. which runs"],
        answer: 0,
        feedback: "'Running since 1995' is a present participial phrase in a non-defining relative clause context. It means 'which has been running since 1995'. 'Running' (active present participle) is correct since the event itself is still active."
      },
      {
        type: "Part of Speech / Tense",
        blank: 3,
        text: "Highlights ___3___:",
        options: ["A. include", "B. including", "C. are included", "D. has included"],
        answer: 0,
        feedback: "Present simple 'include' — third person plural subject 'Highlights' requires 'include' (no -s). This is a factual listing statement. Note: 'Highlights' is the subject, so 'includes' would be wrong (plural subject)."
      },
      {
        type: "Part of Speech",
        blank: 4,
        text: "A food market ___4___ over 50 vendors...",
        options: ["A. feature", "B. featured", "C. featuring", "D. to feature"],
        answer: 2,
        feedback: "'A food market featuring over 50 vendors' — 'featuring' is a present participial phrase post-modifying 'market'. It means 'which features'. Active present participle is used because the market is actively featuring the vendors."
      },
      {
        type: "Pronoun / Inclusive",
        blank: 5,
        text: "Interactive workshops for children and adults ___5___.",
        options: ["A. like", "B. alike", "C. as well", "D. similarly"],
        answer: 1,
        feedback: "'Children and adults alike' is a fixed expression meaning 'both children and adults'. 'Alike' is used after two nouns to mean 'equally' or 'both'. It is a post-positive adjective — unique to this usage."
      },
      {
        type: "Phrasal Verb",
        blank: 6,
        text: "A spectacular fireworks display to ___6___ the evening.",
        options: ["A. close down", "B. wrap up", "C. shut off", "D. wind out"],
        answer: 1,
        feedback: "'Wrap up the evening' is a phrasal verb meaning to conclude or bring to a close. 'Wrap up' = to finish neatly. 'Close down' means to shut a business, 'shut off' means to turn off, 'wind out' is not a standard phrasal verb."
      }
    ]
  },
  {
    title: "Hotel Loyalty Program",
    type: "Advertisement",
    icon: "⭐",
    passage: `GOLDEN STAY REWARDS — YOUR LOYALTY, OUR PRIORITY\n\nThank you for choosing Golden Stay Hotels. We are excited to introduce our ___1___ loyalty program that rewards every stay with exclusive benefits.\n\nAs a member, you will earn points for every dollar ___2___ on accommodation, dining, and spa services. Points ___3___ redeemed for free nights, room upgrades, and travel vouchers.\n\nOur program offers three tiers: Silver, Gold, and Platinum. The higher your tier, the more exclusive ___4___ become. Platinum members enjoy priority check-in, complimentary breakfast, and access to our executive lounge ___5___ charge.\n\n___6___ now and receive 500 bonus points on your first qualifying stay!`,
    questions: [
      {
        type: "Part of Speech",
        blank: 1,
        text: "...to introduce our ___1___ loyalty program...",
        options: ["A. renovation", "B. renovate", "C. renovated", "D. newly renovated"],
        answer: 3,
        feedback: "'Newly renovated loyalty program' uses an adverb-adjective compound modifier before the noun. 'Newly renovated' is the most descriptive and natural option. The adverb 'newly' modifies the adjective 'renovated'."
      },
      {
        type: "Part of Speech",
        blank: 2,
        text: "...earn points for every dollar ___2___ on accommodation, dining, and spa services.",
        options: ["A. spend", "B. spent", "C. spending", "D. to spend"],
        answer: 1,
        feedback: "'Every dollar spent on X' — past participial phrase modifying 'dollar'. The reduced passive relative clause is 'every dollar that is spent'. 'Spent' (passive past participle) is correct."
      },
      {
        type: "Tense / Passive",
        blank: 3,
        text: "Points ___3___ redeemed for free nights, room upgrades, and travel vouchers.",
        options: ["A. are", "B. can be", "C. will", "D. have been"],
        answer: 1,
        feedback: "'Can be redeemed' expresses possibility/ability — points are able to be used for rewards. The modal 'can be' + past participle creates the passive structure for permission/ability. 'Are redeemed' implies they always are, not that they can be."
      },
      {
        type: "Pronoun",
        blank: 4,
        text: "The higher your tier, the more exclusive ___4___ become.",
        options: ["A. it", "B. they", "C. their benefits", "D. your benefits"],
        answer: 3,
        feedback: "'The more exclusive your benefits become' — the comparative structure 'the + comparative, the + comparative' requires a clear subject. 'Your benefits' (referring back to tier benefits) is the most explicit and clear subject here."
      },
      {
        type: "Preposition",
        blank: 5,
        text: "...access to our executive lounge ___5___ charge.",
        options: ["A. at no", "B. without no", "C. for no", "D. with no"],
        answer: 0,
        feedback: "'At no charge' is the fixed collocation meaning free of charge. 'At no charge' and 'free of charge' are both standard expressions. 'With no charge' is less standard. 'Without no' is a double negative (incorrect)."
      },
      {
        type: "Tense / Imperative",
        blank: 6,
        text: "___6___ now and receive 500 bonus points on your first qualifying stay!",
        options: ["A. Join", "B. Joining", "C. To join", "D. Joined"],
        answer: 0,
        feedback: "This is an imperative sentence (command/instruction). The base form of the verb 'Join' is used without a subject. 'Join now and receive' — two imperative clauses connected by 'and'."
      }
    ]
  },
  {
    title: "University Open Day",
    type: "Advertisement",
    icon: "🎓",
    passage: `NATIONAL UNIVERSITY OPEN DAY — EXPLORE YOUR FUTURE\n\nAre you considering ___1___ for higher education? Join us at our annual Open Day and discover what makes National University the right choice for you!\n\nOn this day, you will have the opportunity to tour our state-of-the-art facilities, meet faculty members, and attend informative sessions ___2___ by current students and professors.\n\nAdmissions counselors will be ___3___ to answer your questions regarding entry requirements, scholarship opportunities, and program options. You can also submit your application ___4___ on the day and receive preliminary feedback.\n\nWe strongly recommend ___5___ in advance to secure your place, ___6___ spaces are limited.`,
    questions: [
      {
        type: "Part of Speech",
        blank: 1,
        text: "Are you considering ___1___ for higher education?",
        options: ["A. apply", "B. applied", "C. applying", "D. to apply"],
        answer: 2,
        feedback: "'Consider + gerund' — 'consider' is always followed by the -ing form. 'Consider applying', 'consider going', etc. This tests verbs that take gerunds: consider, avoid, deny, enjoy, suggest, recommend."
      },
      {
        type: "Part of Speech",
        blank: 2,
        text: "...attend informative sessions ___2___ by current students and professors.",
        options: ["A. conduct", "B. conducted", "C. conducting", "D. to conduct"],
        answer: 1,
        feedback: "'Sessions conducted by' — past participial phrase (passive) modifying 'sessions'. The sessions are conducted BY people, so the passive past participle 'conducted' is correct."
      },
      {
        type: "Collocation",
        blank: 3,
        text: "Admissions counselors will be ___3___ to answer your questions...",
        options: ["A. available", "B. capable", "C. able", "D. prepared"],
        answer: 0,
        feedback: "'Be available to do something' is the correct collocation meaning 'able to be reached/found'. In service contexts, 'counselors will be available to answer' is the standard phrasing. 'Able' is grammatically correct but less natural in this professional context."
      },
      {
        type: "Preposition / Adverb",
        blank: 4,
        text: "You can also submit your application ___4___ on the day...",
        options: ["A. direct", "B. directly", "C. immediate", "D. instant"],
        answer: 1,
        feedback: "'Submit directly on the day' — 'directly' is an adverb modifying the verb 'submit'. An adverb (not adjective) is needed to modify a verb. 'Direct' is an adjective; 'directly' is the adverb form."
      },
      {
        type: "Reported Speech / Gerund",
        blank: 5,
        text: "We strongly recommend ___5___ in advance to secure your place...",
        options: ["A. to register", "B. register", "C. registering", "D. registered"],
        answer: 2,
        feedback: "'Recommend + gerund' — 'recommend' is followed by the -ing form: 'recommend registering', 'recommend doing'. It can also take a that-clause: 'recommend that you register'. Never 'recommend to register'."
      },
      {
        type: "Linking Word",
        blank: 6,
        text: "...to secure your place, ___6___ spaces are limited.",
        options: ["A. despite", "B. although", "C. however", "D. as"],
        answer: 3,
        feedback: "'As' introduces a reason clause: 'as spaces are limited' = 'because spaces are limited'. 'As' can function as a subordinating conjunction of reason. 'Although' and 'despite' introduce contrast, 'however' is a conjunctive adverb (needs semicolon)."
      }
    ]
  },
  {
    title: "Travel Insurance Brochure",
    type: "Advertisement",
    icon: "🛡️",
    passage: `SAFETRIP TRAVEL INSURANCE — WHEREVER LIFE TAKES YOU\n\nTravelling abroad can be exciting, ___1___ it also comes with unexpected risks. SafeTrip Travel Insurance ensures that you are fully protected, ___2___ your destination or the nature of your trip.\n\nOur comprehensive plan covers:\n• Medical emergencies and hospitalization\n• Trip cancellation and ___3___\n• Lost or stolen baggage and personal belongings\n• 24/7 emergency ___4___ services\n\nClaims ___5___ submitted within 30 days of the incident. Should you need to make a claim, our dedicated team will ___6___ you through the entire process.`,
    questions: [
      {
        type: "Linking Word",
        blank: 1,
        text: "Travelling abroad can be exciting, ___1___ it also comes with unexpected risks.",
        options: ["A. so", "B. as", "C. for", "D. yet"],
        answer: 3,
        feedback: "'Yet' is a coordinating conjunction meaning 'but nevertheless'. Like 'but', it introduces contrast, but 'yet' is slightly more literary and emphatic. Both 'but' and 'yet' work, but 'yet' better emphasizes the unexpected contrast after 'exciting'."
      },
      {
        type: "Linking Word / Concession",
        blank: 2,
        text: "...you are fully protected, ___2___ your destination or the nature of your trip.",
        options: ["A. considering", "B. depending on", "C. regardless of", "D. in spite of"],
        answer: 2,
        feedback: "'Regardless of your destination' means 'no matter what your destination is'. It expresses unconditional coverage. 'Depending on' implies conditions, which contradicts the insurance promise of full coverage."
      },
      {
        type: "Parallel Structure",
        blank: 3,
        text: "Trip cancellation and ___3___.",
        options: ["A. interrupt", "B. interrupted", "C. interruption", "D. interrupting"],
        answer: 2,
        feedback: "'Trip cancellation and interruption' — parallel structure requires matching grammatical form. 'Cancellation' is a noun, so the parallel item must also be a noun: 'interruption'. This tests parallel structure in lists."
      },
      {
        type: "Part of Speech",
        blank: 4,
        text: "24/7 emergency ___4___ services.",
        options: ["A. assistant", "B. assist", "C. assistance", "D. assisting"],
        answer: 2,
        feedback: "'Emergency assistance services' — 'assistance' (uncountable noun) functions as a noun modifier before 'services'. The noun-noun compound 'assistance services' is correct. 'Assistant' is a person, not a type of service."
      },
      {
        type: "Passive / Tense",
        blank: 5,
        text: "Claims ___5___ submitted within 30 days of the incident.",
        options: ["A. are", "B. must be", "C. have been", "D. will"],
        answer: 1,
        feedback: "'Claims must be submitted' — modal passive expressing obligation/requirement. 'Must be + past participle' creates the obligatory passive. This is a rule/requirement, so 'must be' is correct. 'Are submitted' would be factual, not obligatory."
      },
      {
        type: "Phrasal Verb",
        blank: 6,
        text: "...our dedicated team will ___6___ you through the entire process.",
        options: ["A. walk", "B. run", "C. lead", "D. guide"],
        answer: 0,
        feedback: "'Walk you through the process' is the phrasal verb meaning to explain or guide someone step by step. 'Walk through' is the established phrasal verb for this meaning. 'Guide through' is also acceptable but 'walk through' is the idiomatic choice."
      }
    ]
  },
  {
    title: "Scholarship Application Guidelines",
    type: "Notice",
    icon: "🏆",
    passage: `EXCELLENCE SCHOLARSHIP PROGRAM — APPLICATION GUIDELINES\n\nThe Excellence Scholarship is awarded annually to students who demonstrate outstanding academic achievement and ___1___ service to the community.\n\nTo be ___2___ for consideration, applicants must:\n• Have a cumulative GPA of 3.5 or ___3___\n• Be currently enrolled as a full-time student\n• Submit two letters of recommendation from faculty members\n\nApplications that are ___4___ are automatically disqualified. Please ensure that all sections of the form ___5___ completed accurately before submission.\n\nRecipients of this scholarship will be ___6___ of their selection by email within six weeks of the application deadline.`,
    questions: [
      {
        type: "Parallel Structure",
        blank: 1,
        text: "...students who demonstrate outstanding academic achievement and ___1___ service to the community.",
        options: ["A. dedicated", "B. dedication to", "C. dedicated to", "D. dedicating"],
        answer: 2,
        feedback: "'Academic achievement and dedicated service' — parallel structure requires matching adjective + noun form. 'Outstanding [adjective] achievement' parallels 'dedicated [adjective] service'. The preposition 'to' then follows to link to 'the community'."
      },
      {
        type: "Word Meaning",
        blank: 2,
        text: "To be ___2___ for consideration, applicants must...",
        options: ["A. eligible", "B. capable", "C. suitable", "D. qualified"],
        answer: 0,
        feedback: "'Eligible for consideration' is the fixed collocation in scholarship/application language. 'Eligible' means meeting the necessary conditions/criteria. 'Qualified' relates to having qualifications; 'eligible' relates to meeting criteria."
      },
      {
        type: "Quantifier",
        blank: 3,
        text: "Have a cumulative GPA of 3.5 or ___3___.",
        options: ["A. above", "B. higher", "C. more", "D. over"],
        answer: 0,
        feedback: "'3.5 or above' is the standard quantifier expression for minimum thresholds. 'Or above' = 'or higher'. All options are close, but 'above' is the most formal and conventional choice in academic/official documents."
      },
      {
        type: "Part of Speech",
        blank: 4,
        text: "Applications that are ___4___ are automatically disqualified.",
        options: ["A. complete", "B. completing", "C. incomplete", "D. incompletion"],
        answer: 2,
        feedback: "'Applications that are incomplete' — 'incomplete' (adjective) is the correct word meaning 'not fully completed'. The prefix 'in-' creates the antonym. 'Complete' would mean they ARE finished (opposite meaning)."
      },
      {
        type: "Subjunctive / Passive",
        blank: 5,
        text: "Please ensure that all sections of the form ___5___ completed accurately before submission.",
        options: ["A. are", "B. be", "C. were", "D. have"],
        answer: 0,
        feedback: "'Ensure that all sections are completed' — after 'ensure that', we use indicative mood (present simple) for factual instructions. Some formal styles use subjunctive 'be completed', but 'are completed' is standard in modern English."
      },
      {
        type: "Tense / Passive",
        blank: 6,
        text: "Recipients of this scholarship will be ___6___ of their selection by email...",
        options: ["A. informed", "B. informing", "C. notified about", "D. notify"],
        answer: 0,
        feedback: "'Will be informed of their selection' — future passive: 'will be + past participle'. 'Informed of' is the correct collocation (be informed of something). 'Notified about' also works, but 'informed of' is the more formal choice here."
      }
    ]
  },
  {
    title: "Fitness Center Membership",
    type: "Advertisement",
    icon: "💪",
    passage: `PEAKFORM FITNESS — START YOUR TRANSFORMATION TODAY\n\nAre you tired of ___1___ to get fit? At PeakForm Fitness, we believe that everyone deserves access to world-class training, ___2___ their fitness level.\n\nOur certified personal trainers will design a program ___3___ to your specific goals, whether you aim to lose weight, build muscle, or simply improve your overall wellbeing.\n\nMembership benefits include:\n• Unlimited access to all gym equipment and classes\n• Monthly fitness assessments to ___4___ your progress\n• A dedicated nutrition advisor ___5___ with your trainer\n\nJoin now and get your first month ___6___! Offer valid until the end of this month only.`,
    questions: [
      {
        type: "Phrasal Verb / Gerund",
        blank: 1,
        text: "Are you tired of ___1___ to get fit?",
        options: ["A. struggle", "B. struggled", "C. struggling", "D. to struggle"],
        answer: 2,
        feedback: "'Tired of + gerund' — 'tired of' is an adjective + preposition collocation. After 'of' (preposition), the gerund (-ing) form is required: 'tired of struggling'. 'Tired of + infinitive' is incorrect."
      },
      {
        type: "Linking Word",
        blank: 2,
        text: "...everyone deserves access to world-class training, ___2___ their fitness level.",
        options: ["A. whatever", "B. however", "C. regardless of", "D. no matter"],
        answer: 2,
        feedback: "'Regardless of their fitness level' is the correct prepositional phrase meaning 'no matter what their level is'. 'Regardless of + noun phrase' is the correct structure. 'No matter' requires a clause: 'no matter what their level is'."
      },
      {
        type: "Part of Speech",
        blank: 3,
        text: "...a program ___3___ to your specific goals...",
        options: ["A. tailoring", "B. tailored", "C. tailor", "D. to tailor"],
        answer: 1,
        feedback: "'A program tailored to your goals' — past participial phrase (passive) modifying 'program'. 'Tailored to' means 'customized for'. Passive past participle because the program is the recipient of tailoring."
      },
      {
        type: "Word Meaning",
        blank: 4,
        text: "Monthly fitness assessments to ___4___ your progress.",
        options: ["A. track", "B. trail", "C. trace", "D. train"],
        answer: 0,
        feedback: "'Track your progress' is the fixed collocation meaning to monitor or follow progress over time. 'Track' is the standard verb used with 'progress'. 'Trace' suggests finding something lost; 'trail' means to follow physically."
      },
      {
        type: "Part of Speech",
        blank: 5,
        text: "A dedicated nutrition advisor ___5___ with your trainer.",
        options: ["A. collaborate", "B. collaborated", "C. collaborating", "D. who collaborate"],
        answer: 2,
        feedback: "'A nutrition advisor collaborating with your trainer' — present participial phrase post-modifying 'advisor'. It describes the advisor's role: one who works alongside the trainer. Active present participle because the advisor performs the action."
      },
      {
        type: "Tense / Passive",
        blank: 6,
        text: "Join now and get your first month ___6___!",
        options: ["A. free", "B. freely", "C. freed", "D. for free"],
        answer: 0,
        feedback: "'Get your first month free' — 'free' here is a predicate adjective complement after 'get' in the causative structure. 'Get + object + adjective' means 'have something in a certain state'. 'For free' would also work but 'free' alone is more idiomatic in advertising."
      }
    ]
  },
  {
    title: "Environmental Awareness Campaign",
    type: "Advertisement",
    icon: "🌍",
    passage: `GREEN FUTURE CAMPAIGN — ACT NOW FOR TOMORROW\n\nOur planet is facing unprecedented environmental challenges. Unless we ___1___ immediate action, future generations will bear the consequences of our inaction.\n\nThe Green Future Campaign is dedicated ___2___ raising awareness about climate change, plastic pollution, and deforestation. By ___3___ in our events and initiatives, you become part of the solution.\n\nThis year's campaign focuses ___4___ three key areas: reducing single-use plastics, planting trees in urban areas, and educating communities ___5___ sustainable practices.\n\nTogether, we can make a difference. ___6___ small your contribution may seem, every action counts!`,
    questions: [
      {
        type: "Conditional",
        blank: 1,
        text: "Unless we ___1___ immediate action, future generations will bear the consequences...",
        options: ["A. take", "B. took", "C. will take", "D. had taken"],
        answer: 0,
        feedback: "'Unless we take action' — in first conditional sentences, 'unless' = 'if not', and the condition clause uses present simple (not future). 'Unless + present simple, future simple' is the standard first conditional with 'unless'."
      },
      {
        type: "Collocation / Preposition",
        blank: 2,
        text: "The Green Future Campaign is dedicated ___2___ raising awareness...",
        options: ["A. for", "B. in", "C. to", "D. at"],
        answer: 2,
        feedback: "'Dedicated to + gerund' — 'dedicated to' is an adjective-preposition collocation. After 'dedicated to' (where 'to' is a preposition, not part of infinitive), the gerund follows: 'dedicated to raising'. Never 'dedicated to raise'."
      },
      {
        type: "Part of Speech",
        blank: 3,
        text: "By ___3___ in our events and initiatives, you become part of the solution.",
        options: ["A. participate", "B. participating", "C. participated", "D. participation"],
        answer: 1,
        feedback: "'By + gerund' — after the preposition 'by' (showing manner/means), the gerund is required. 'By participating in' means 'through the act of participating'. This is a fundamental gerund rule."
      },
      {
        type: "Preposition / Collocation",
        blank: 4,
        text: "This year's campaign focuses ___4___ three key areas...",
        options: ["A. at", "B. in", "C. on", "D. about"],
        answer: 2,
        feedback: "'Focus on' is the correct verb-preposition collocation. 'Focus on X' means to concentrate attention on X. 'Focus at' and 'focus in' are not standard collocations."
      },
      {
        type: "Part of Speech / Collocation",
        blank: 5,
        text: "...educating communities ___5___ sustainable practices.",
        options: ["A. about", "B. on", "C. for", "D. with"],
        answer: 0,
        feedback: "'Educating communities about X' — 'educate about' is the standard verb-preposition collocation. 'Educate someone about a topic' means to teach them about it. 'Educate on' is used in American English but 'about' is more universal."
      },
      {
        type: "Concession / Subjunctive",
        blank: 6,
        text: "___6___ small your contribution may seem, every action counts!",
        options: ["A. No matter how", "B. However small", "C. Although", "D. Despite how"],
        answer: 1,
        feedback: "'However small your contribution may seem' uses 'however + adjective' in a concessive clause. This is equivalent to 'no matter how small'. 'However' in this structure is an adverb, not a conjunction. Both A and B work, but 'However small' is more concise and formal."
      }
    ]
  },
  {
    title: "Alumni Newsletter",
    type: "Letter",
    icon: "🎓",
    passage: `DEAR CLASS OF 2020 ALUMNI,\n\nWe hope this newsletter ___1___ you well! It has been five years ___2___ we gathered together for our graduation ceremony, and what an incredible journey it has been.\n\nWe are thrilled to announce that our annual Alumni Reunion will be held on September 20th at the Grand Horizon Hotel. This year's event ___3___ feature live entertainment, a gala dinner, and a special panel discussion ___4___ by distinguished former graduates who have made significant contributions to their fields.\n\nTo those of you who have not yet registered: we strongly urge you ___5___ your place as soon as possible, as seats are filling up fast. Remember, it was Albert Einstein ___6___ once said, 'The only source of knowledge is experience.' Come share yours with us!`,
    questions: [
      {
        type: "Collocation",
        blank: 1,
        text: "We hope this newsletter ___1___ you well!",
        options: ["A. meets", "B. finds", "C. sees", "D. gets"],
        answer: 1,
        feedback: "'We hope this finds you well' is a fixed formal letter-opening phrase. 'Hope this finds you well/in good health' is a conventional greeting in business and formal correspondence. 'Meets you well' is not standard."
      },
      {
        type: "Linking Word / Tense",
        blank: 2,
        text: "It has been five years ___2___ we gathered together for our graduation ceremony...",
        options: ["A. when", "B. while", "C. since", "D. after"],
        answer: 2,
        feedback: "'It has been five years since...' — 'since' is used with present perfect to indicate the starting point of a period. The structure 'It has been [time] since [past event]' is a fixed temporal construction."
      },
      {
        type: "Tense",
        blank: 3,
        text: "This year's event ___3___ feature live entertainment, a gala dinner, and a special panel discussion...",
        options: ["A. is going to", "B. will", "C. would", "D. shall"],
        answer: 1,
        feedback: "'Will feature' — future simple is used for announcements and predictions about definite future events. 'Will' is appropriate for formal announcements. 'Is going to' is also acceptable but 'will' is more formal and conventional in newsletters."
      },
      {
        type: "Part of Speech",
        blank: 4,
        text: "...a special panel discussion ___4___ by distinguished former graduates...",
        options: ["A. leading", "B. led", "C. to lead", "D. that leads"],
        answer: 1,
        feedback: "'A panel discussion led by X' — past participial phrase (passive) modifying 'discussion'. The discussion is led BY the graduates, so the passive past participle 'led' is correct."
      },
      {
        type: "Reported Speech / Infinitive",
        blank: 5,
        text: "...we strongly urge you ___5___ your place as soon as possible...",
        options: ["A. reserve", "B. reserving", "C. to reserve", "D. reserved"],
        answer: 2,
        feedback: "'Urge someone to do something' — 'urge' takes the pattern 'urge + object + to-infinitive'. 'We urge you to reserve' is the correct structure. Verbs like urge, ask, tell, advise, encourage all take 'object + to-infinitive'."
      },
      {
        type: "Relative Clause / Emphatic",
        blank: 6,
        text: "Remember, it was Albert Einstein ___6___ once said, 'The only source of knowledge is experience.'",
        options: ["A. who", "B. that", "C. which", "D. whom"],
        answer: 0,
        feedback: "'It was Albert Einstein who once said...' — this is an 'it-cleft' structure for emphasis. After naming a person, 'who' (not 'that') is preferred in formal writing. Both 'who' and 'that' are grammatically acceptable, but 'who' is more appropriate for people."
      }
    ]
  },
  {
    title: "Hanoi — Encounter Multiple Civilizations",
    type: "Travel Article",
    icon: "🏯",
    passage: `Ô Quan Chưởng Gate is the only gate ___1___ of the wall that once protected the area surrounding Thang Long Citadel. The gate ___2___ you see today was re-constructed in 1817, although originally it was built in 1749. It is named for the rank of a Vietnamese soldier who showed great courage in ___3___ the gate and citadel against a French attack in 1873. Today, it's an important marker and symbol of Vietnamese spirit.\n\nWhile you explore the historic centre, keep a lookout for the many pagodas built by ancient traders. The Old Quarter was partially settled by Chinese immigrants who also chose it as a location to do business. To get a glimpse into the lives of these Chinese merchant families in the past, visit Mã Mây House, ___4___ UNESCO-protected heritage home.\n\nFor a little moment of peace amid the noise, duck ___5___ the alley off Nhà Thờ for a breather in the quiet courtyard of Bà Đá Pagoda. Here you'll find an elaborate Phật Phật statue, ___6___ as one of Hanoi's four treasures.`,
    questions: [
      {
        type: "Part of Speech",
        blank: 1,
        text: "Ô Quan Chưởng Gate is the only gate ___1___ of the wall that once protected the area.",
        options: ["A. leaving", "B. left", "C. to leave", "D. that leaves"],
        answer: 1,
        feedback: "'Left' is a past participial adjective (reduced relative clause: 'that is left'). 'The only gate left' = 'the only gate that remains'. Past participle used in a passive, resultant sense — the gate is what was left behind after others were destroyed."
      },
      {
        type: "Relative Clause",
        blank: 2,
        text: "The gate ___2___ you see today was re-constructed in 1817.",
        options: ["A. which", "B. who", "C. whom", "D. whose"],
        answer: 0,
        feedback: "'Which' is the correct relative pronoun for things ('the gate'). In defining relative clauses referring to objects, 'which' (or 'that') is used. 'Who' and 'whom' are reserved for people."
      },
      {
        type: "Collocation",
        blank: 3,
        text: "...a soldier who showed great courage in ___3___ the gate and citadel against a French attack.",
        options: ["A. fighting", "B. protecting", "C. defending", "D. guarding"],
        answer: 2,
        feedback: "'Defending something against an attack' is the precise military collocation. 'Defend against' is the standard verb-preposition pair in this context. 'Guard' implies watching over; 'protect' is possible but 'defend against an attack' is the fixed phrase."
      },
      {
        type: "Adjective Order / Article",
        blank: 4,
        text: "...visit Mã Mây House, ___4___ UNESCO-protected heritage home.",
        options: ["A. a", "B. an", "C. the", "D. some"],
        answer: 0,
        feedback: "'A UNESCO-protected heritage home' — although UNESCO begins with a vowel letter, the acronym is pronounced /juːˈnɛskoʊ/ starting with the consonant sound /j/. Therefore the indefinite article 'a' (not 'an') is correct. This is a classic article-before-acronym question."
      },
      {
        type: "Phrasal Verb",
        blank: 5,
        text: "...duck ___5___ the alley off Nhà Thờ for a breather in the quiet courtyard.",
        options: ["A. through", "B. over", "C. down", "D. across"],
        answer: 2,
        feedback: "'Duck down' (into/through a narrow space) is a common phrasal verb in travel writing meaning to go quickly into a small, hidden passage. It implies moving into a lower or narrower space to find something tucked away."
      },
      {
        type: "Verb Form / Passive",
        blank: 6,
        text: "...an elaborate Phật Phật statue, ___6___ as one of Hanoi's four treasures.",
        options: ["A. regard", "B. regarding", "C. regarded", "D. to regard"],
        answer: 2,
        feedback: "'Regarded as' is a past participial phrase in the passive voice, functioning as a post-modifier: 'which is regarded as'. 'Regarded as' is the fixed passive collocation meaning 'considered to be'. 'Regarding' would be a preposition, not applicable here."
      }
    ]
  },
  {
    title: "Tofu Goes Mainstream",
    type: "Magazine Article",
    icon: "🥢",
    passage: `Why does tofu have such an enduring appeal? It's likely due to its remarkable versatility and practicality. As more people embrace high-protein, plant-based diets, tofu ___1___ a nutritious option that is both budget-friendly and widely accessible. It cooks quickly, ___2___ is convenient, while its neutral flavour allows it to fit seamlessly into meal-prep routines.\n\nContaining all nine essential amino acids ___3___ by the human body, tofu is considered a complete protein and is often used as a meat substitute. It is also a low-carbohydrate food, with ___4___ carbohydrates in a half-cup serving.\n\nAlthough a serving of firm tofu contains about 4 grams of fat, most of it is heart-healthy. In addition, tofu is an excellent source of important minerals, including calcium, manganese, selenium and copper.\n\nPerhaps most importantly, tofu is ___5___ adaptable across cuisines — from stir-fries and curries to grills and salads. This humble soya staple remains one of the most ___6___ ingredients in modern cooking.`,
    questions: [
      {
        type: "Tense",
        blank: 1,
        text: "...tofu ___1___ a nutritious option that is both budget-friendly and widely accessible.",
        options: ["A. offered", "B. is offering", "C. offers", "D. has offered"],
        answer: 2,
        feedback: "Present simple 'offers' describes a general, ongoing truth — a fact about tofu's nature. The surrounding context ('as more people embrace') uses present simple for habitual/general facts, so 'offers' matches the tense pattern throughout the passage."
      },
      {
        type: "Linking Word",
        blank: 2,
        text: "It cooks quickly, ___2___ is convenient, while its neutral flavour allows it to fit seamlessly into meal-prep routines.",
        options: ["A. although", "B. which", "C. however", "D. therefore"],
        answer: 1,
        feedback: "'Which is convenient' — a non-defining relative clause referring back to the entire preceding idea ('it cooks quickly'). 'Which' is used to introduce a comment on a whole clause. 'However' and 'therefore' are conjunctive adverbs that can't introduce a relative clause."
      },
      {
        type: "Part of Speech",
        blank: 3,
        text: "Containing all nine essential amino acids ___3___ by the human body...",
        options: ["A. requiring", "B. required", "C. that require", "D. require"],
        answer: 1,
        feedback: "'Required by the human body' is a past participial phrase (passive) post-modifying 'amino acids'. The acids are required BY the body — passive relationship. This is a reduced relative clause: 'which are required by the human body'."
      },
      {
        type: "Quantifier",
        blank: 4,
        text: "It is also a low-carbohydrate food, with ___4___ carbohydrates in a half-cup serving.",
        options: ["A. little", "B. a little", "C. few", "D. only few"],
        answer: 2,
        feedback: "'Few carbohydrates' — 'few' is used with countable nouns (carbohydrates = countable). 'Few' has a negative connotation: not many. 'Little' is used with uncountable nouns. 'A few' would mean 'some', implying a positive amount rather than emphasizing scarcity."
      },
      {
        type: "Adjective Order",
        blank: 5,
        text: "...tofu is ___5___ adaptable across cuisines — from stir-fries and curries to grills and salads.",
        options: ["A. easy", "B. easily", "C. most easy", "D. the most easy"],
        answer: 1,
        feedback: "'Easily adaptable' — 'easily' is an adverb modifying the adjective 'adaptable'. An adverb (not an adjective) is needed to modify another adjective. 'Easy adaptable' is incorrect; 'easily adaptable' follows standard adverb + adjective modification order."
      },
      {
        type: "Collocation / Fixed Phrase",
        blank: 6,
        text: "This humble soya staple remains one of the most ___6___ ingredients in modern cooking.",
        options: ["A. adaptable", "B. versatile", "C. flexible", "D. applicable"],
        answer: 1,
        feedback: "'Versatile' is the precise word for ingredients that can be used in many different ways. 'Versatile ingredient' is a fixed collocation in cooking/food writing. The passage began with 'versatility', so this word echoes and closes the argument cohesively."
      }
    ]
  },
  {
    title: "Batch-Cook Your Budget",
    type: "Magazine Article",
    icon: "🍳",
    passage: `Grocery savings start at checkout, but they ___1___ in the kitchen. Batch-cooking can turn bulk deals into week-long meals, cutting waste by up to 30 percent and keeping your budget on track with simple planning.\n\nIf you ___2___ a deal on chicken or rice in your app, buy extra and freeze portions immediately to prevent spoilage. Building a 'deal pantry' that feeds you for days without extra spending is a smart habit worth ___3___.\n\nDedicate Sunday to big-batch recipes like curry or stew. They reheat beautifully and ___4___ discounted ingredients into multiple meals, so extra vegetables and meats don't go to waste. Leftovers ___5___ into versatile lunches by adding one fresh item daily — like eggs or anchovies. These little tricks make every grocery run go ___6___ and help your savings last until payday.`,
    questions: [
      {
        type: "Tense",
        blank: 1,
        text: "Grocery savings start at checkout, but they ___1___ in the kitchen.",
        options: ["A. multiply", "B. are multiplying", "C. have multiplied", "D. multiplied"],
        answer: 0,
        feedback: "Present simple 'multiply' is used to state a general truth or habitual fact. Both clauses are general statements about budgeting habits. 'Start' (present simple) in the first clause sets the pattern; 'multiply' should be parallel in the same tense."
      },
      {
        type: "Conditional",
        blank: 2,
        text: "If you ___2___ a deal on chicken or rice in your app, buy extra and freeze portions immediately.",
        options: ["A. see", "B. will see", "C. saw", "D. had seen"],
        answer: 0,
        feedback: "First conditional: 'If + present simple, imperative'. The sentence gives a practical instruction: if you spot a deal, take action. The imperative 'buy extra' confirms this is a first conditional for general instructions. 'Will see' is incorrect in the if-clause."
      },
      {
        type: "Verb Form / Gerund",
        blank: 3,
        text: "Building a 'deal pantry' is a smart habit worth ___3___.",
        options: ["A. develop", "B. to develop", "C. developing", "D. developed"],
        answer: 2,
        feedback: "'Worth + gerund' is a fixed structure. 'Worth developing' = 'worth the effort of developing'. After 'worth', the gerund (-ing) form is always required. 'Worth to develop' or 'worth develop' are grammatically incorrect."
      },
      {
        type: "Phrasal Verb",
        blank: 4,
        text: "They reheat beautifully and ___4___ discounted ingredients into multiple meals.",
        options: ["A. change", "B. stretch", "C. expand", "D. convert"],
        answer: 1,
        feedback: "'Stretch ingredients into multiple meals' is the specific collocation used in cooking and budgeting contexts, meaning to make limited supplies go further. 'Stretch' implies maximum use of available resources. 'Convert' and 'change' don't collocate naturally with 'ingredients into meals'."
      },
      {
        type: "Reported Speech / Passive",
        blank: 5,
        text: "Leftovers ___5___ into versatile lunches by adding one fresh item daily.",
        options: ["A. turn", "B. can turn", "C. can be turned", "D. are turning"],
        answer: 2,
        feedback: "'Can be turned into' — modal passive expressing possibility. Leftovers (the subject) are the recipients of the action (someone turns them). 'Can be turned into' = it is possible to transform them. 'Turn' (active) would require a human subject performing the action."
      },
      {
        type: "Phrasal Verb",
        blank: 6,
        text: "These little tricks make every grocery run go ___6___ and help your savings last until payday.",
        options: ["A. further", "B. farther", "C. more far", "D. more farther"],
        answer: 0,
        feedback: "'Go further' is the correct comparative adverb for abstract/figurative distance — how far money or effort 'goes' (= how much it achieves). 'Further' is used for figurative/abstract meanings; 'farther' is for physical distance. 'Make X go further' = make X last longer / achieve more."
      }
    ]
  },
  {
    title: "Zoom My Notes — AI Note-Taking",
    type: "Technology Article",
    icon: "💻",
    passage: `Introducing My Notes, Zoom AI Companion's ___1___ note-taking experience that captures, organises, and summarises what matters from your meetings.\n\nWith My Notes, you can focus on the conversation while the AI captures it in the form of transcripts and organises key ___2___ to highlight what matters, ___3___ structured, actionable summaries.\n\nMy Notes allows you to automate notetaking wherever you meet. It can be used ___4___ Zoom and third-party meeting platforms like Microsoft Teams and Google Meet, as well as in-person sessions — helping to ensure that no meeting context ___5___ when you invite AI Companion to the conversation.\n\nAll notes are stored in a centralised hub, ___6___ via Zoom Hub or AI Companion on the web. My Notes is available with limited capacity in your free Zoom Workplace plan.`,
    questions: [
      {
        type: "Adjective Order",
        blank: 1,
        text: "...Zoom AI Companion's ___1___ note-taking experience...",
        options: ["A. intelligently", "B. intelligent", "C. intelligence", "D. intelligible"],
        answer: 1,
        feedback: "'Intelligent note-taking experience' — 'intelligent' is an adjective modifying the noun phrase 'note-taking experience'. An adjective (not adverb) is needed before a noun. 'Intelligently' is an adverb and cannot directly precede a noun. 'Intelligible' means 'understandable', a different meaning."
      },
      {
        type: "Collocation / Fixed Phrase",
        blank: 2,
        text: "...the AI captures it and organises key ___2___ to highlight what matters.",
        options: ["A. takings", "B. takeaways", "C. take-offs", "D. take-ins"],
        answer: 1,
        feedback: "'Key takeaways' is a fixed phrase in business and technology writing meaning the most important points or conclusions from a meeting or discussion. 'Takeaway' in this context is a standard collocation. 'Takings' refers to money received; 'take-offs' refers to departures."
      },
      {
        type: "Part of Speech / Participle",
        blank: 3,
        text: "...organises key takeaways to highlight what matters, ___3___ structured, actionable summaries.",
        options: ["A. generate", "B. generated", "C. generating", "D. to generate"],
        answer: 2,
        feedback: "'Generating structured summaries' is a present participial clause of result — it describes what organising key takeaways leads to. The active participle 'generating' shows the AI produces summaries as a consequence. 'Generated' (passive) would mean summaries were made by something else."
      },
      {
        type: "Preposition",
        blank: 4,
        text: "It can be used ___4___ Zoom and third-party meeting platforms like Microsoft Teams and Google Meet.",
        options: ["A. with", "B. by", "C. across", "D. between"],
        answer: 2,
        feedback: "'Used across platforms' — 'across' expresses distribution or coverage over multiple items/areas. 'Used across Zoom and third-party platforms' means it works on all of them. 'With' implies accompaniment; 'between' only two items; 'by' indicates the agent, not the context."
      },
      {
        type: "Subjunctive / Conditional",
        blank: 5,
        text: "...helping to ensure that no meeting context ___5___ when you invite AI Companion to the conversation.",
        options: ["A. loses", "B. is lost", "C. lose", "D. lost"],
        answer: 1,
        feedback: "'No meeting context is lost' — passive present simple in the 'ensure that' complement clause. The context is lost (passive), and 'no context' is the subject. Modern English uses indicative ('is lost') after 'ensure that'. The passive is needed because context is the recipient, not the doer."
      },
      {
        type: "Verb Form / Passive",
        blank: 6,
        text: "All notes are stored in a centralised hub, ___6___ via Zoom Hub or AI Companion on the web.",
        options: ["A. accessible", "B. accessing", "C. accessed", "D. to access"],
        answer: 0,
        feedback: "'Accessible via Zoom Hub' — 'accessible' is a predicate adjective (complement after the comma) modifying the hub. It means 'able to be accessed'. 'Accessed' (past participle) would need 'being' to form a participial phrase. 'Accessible' is the concise, correct adjective choice."
      }
    ]
  },
  {
    title: "Dien Bien Phu — A Battle to Remember",
    type: "History Passage",
    icon: "🏅",
    passage: `Read the following passage about the Dien Bien Phu battle and mark the letter A, B, C, or D to indicate the option that best fits each of the numbered blanks.\n\nSeventy years ago, Vietnam won the Dien Bien Phu battle, ___1___ the French government to sign the Geneva Agreement in July 1954 and marking the end of French military presence in the whole Indochina.\n\nThe 1954 battle killed thousands of soldiers on both sides within less than two months, from March 13 to May 7, as Vietnamese fighters hemmed in French forces — ___2___ superior weapons — and bombarded them with heavy artillery. The globe-shaking victory was the fruit of the clear-sighted leadership by President Ho Chi Minh and the military art ___3___ by General Vo Nguyen Giap, and especially the great national solidarity.\n\nSeven decades have passed, but the stature, meaning, and lessons ___4___ from the great victory remain valid today, being a great source of encouragement for the entire nation in its current national construction and development.\n\nVietnam has shone bright as a country of peace, bliss, and robust development. It has carved out significant achievements with its bamboo diplomacy, ___5___ it stays steadfast and unyielding on basic principles but flexible in the ways and means to achieve strategic objectives.\n\nThe country has established diplomatic ties with 190 countries and territories, and ___6___ strengthened bonds with its former foes.`,
    questions: [
      {
        type: "Participle / Result Clause",
        blank: 1,
        text: "Vietnam won the Dien Bien Phu battle, ___1___ the French government to sign the Geneva Agreement...",
        options: ["A. forced", "B. forcing", "C. to force", "D. that forced"],
        answer: 1,
        feedback: "'Forcing' is a present participial clause of result — it describes the consequence of winning the battle. The structure 'verb + -ing' after a comma expresses a result or simultaneous action. 'Forced' (past participle) would be passive; 'to force' expresses purpose, not result."
      },
      {
        type: "Part of Speech",
        blank: 2,
        text: "...as Vietnamese fighters hemmed in French forces — ___2___ superior weapons — and bombarded them...",
        options: ["A. equipping with", "B. equipped with", "C. being equipped with", "D. to be equipped with"],
        answer: 1,
        feedback: "'Equipped with superior weapons' is a past participial phrase (reduced relative clause) modifying 'French forces'. The forces WERE equipped — passive relationship. This is equivalent to 'French forces which were equipped with superior weapons'."
      },
      {
        type: "Part of Speech",
        blank: 3,
        text: "...the military art ___3___ by General Vo Nguyen Giap...",
        options: ["A. engineered", "B. engineering", "C. to engineer", "D. that engineering"],
        answer: 0,
        feedback: "'Engineered by General Vo Nguyen Giap' is a past participial phrase (passive) post-modifying 'military art'. The art was engineered BY Giap — the passive participle shows the art is the recipient of the action. It is a reduced relative clause: 'the military art that was engineered by Giap'."
      },
      {
        type: "Verb Form / Tense",
        blank: 4,
        text: "...the stature, meaning, and lessons ___4___ from the great victory remain valid today...",
        options: ["A. learn", "B. learning", "C. learnt", "D. to learn"],
        answer: 2,
        feedback: "'Lessons learnt from the great victory' — 'learnt' is a past participial adjective modifying 'lessons'. This is a reduced relative clause: 'lessons that were learnt from the victory'. The passive participle is needed because the lessons are learned (received) from the event."
      },
      {
        type: "Relative Clause",
        blank: 5,
        text: "...its bamboo diplomacy, ___5___ it stays steadfast and unyielding on basic principles but flexible in the ways...",
        options: ["A. in which", "B. which", "C. that", "D. where"],
        answer: 0,
        feedback: "'In which it stays steadfast' — this is a non-defining relative clause where 'which' refers to 'bamboo diplomacy' and 'in' is the preposition needed. The full idea is: a diplomacy in which [within which] Vietnam stays steadfast. 'In which' = 'in this diplomacy'."
      },
      {
        type: "Adverb / Intensifier",
        blank: 6,
        text: "The country has established diplomatic ties with 190 countries and territories, and ___6___ strengthened bonds with its former foes.",
        options: ["A. still", "B. even", "C. just", "D. yet"],
        answer: 1,
        feedback: "'Even strengthened bonds with its former foes' — 'even' is an intensifying adverb that highlights something surprising or remarkable. Strengthening ties with former enemies is unexpected, making 'even' the perfect word. 'Still' implies continuation, 'just' implies recency, 'yet' implies contrast."
      }
    ]
  },
  {
    title: "Australia's Social Media Ban",
    type: "News Report",
    icon: "📱",
    passage: `The Australian Government passed a new law called the Online Safety Amendment (Social Media Minimum Age) Bill 2024 on 28 November 2024. This law introduces a mandatory minimum age of 16 for accounts on certain social media platforms. It came into effect on 10 December 2025, and parents cannot give their consent to let under-16s ___1___ these platforms.\n\nThe Government says the social media ban is needed to protect the mental health and ___2___ of Australian children and teens. They believe the risks of social media, such as cyberbullying, harmful content, and online predators, ___3___ the positives.\n\nCurrently, the platforms the ban applies to are YouTube, X, Facebook, Instagram, TikTok, Snapchat, Reddit, Twitch, Threads and Kick. Tech companies that own these platforms could face fines of up to $50 million if they don't take reasonable steps to stop under-16s ___4___ having accounts.\n\nApps like Messenger Kids, WhatsApp, Kids Helpline, Google Classroom and YouTube Kids are expected to not be part ___5___ the ban.\n\nThis law has sparked global debate about whether governments should ___6___ children's access to social media through legislation.`,
    questions: [
      {
        type: "Infinitive / Verb Pattern",
        blank: 1,
        text: "...parents cannot give their consent to let under-16s ___1___ these platforms.",
        options: ["A. use", "B. to use", "C. using", "D. used"],
        answer: 0,
        feedback: "'Let someone + bare infinitive' is the correct causative structure. After 'let', the bare infinitive (without 'to') is required: 'let them use'. This contrasts with 'allow someone to use'. 'Let + object + base verb' is a fixed grammar rule."
      },
      {
        type: "Collocation",
        blank: 2,
        text: "...needed to protect the mental health and ___2___ of Australian children and teens.",
        options: ["A. welfare", "B. wellness", "C. wellbeing", "D. goodness"],
        answer: 2,
        feedback: "'Mental health and wellbeing' is a fixed collocation frequently used in public health, education, and government contexts. 'Wellbeing' refers to the state of being comfortable, healthy, and happy. 'Welfare' refers more to social support systems."
      },
      {
        type: "Word Meaning",
        blank: 3,
        text: "They believe the risks of social media... ___3___ the positives.",
        options: ["A. overcome", "B. outweigh", "C. overpower", "D. outnumber"],
        answer: 1,
        feedback: "'Outweigh the positives' is the correct collocation meaning the negatives are greater or more significant. 'Outweigh' is used when comparing the relative importance or magnitude of two things. 'Overcome' means to defeat; 'outnumber' refers to quantity."
      },
      {
        type: "Preposition / Gerund",
        blank: 4,
        text: "...if they don't take reasonable steps to stop under-16s ___4___ having accounts.",
        options: ["A. to", "B. for", "C. from", "D. against"],
        answer: 2,
        feedback: "'Stop someone from doing something' is the fixed verb pattern. 'From' is the required preposition. 'Stop someone from + gerund' means to prevent someone from doing something. Without 'from', 'stop them having' is informal British English."
      },
      {
        type: "Preposition",
        blank: 5,
        text: "...are expected to not be part ___5___ the ban.",
        options: ["A. from", "B. in", "C. of", "D. with"],
        answer: 2,
        feedback: "'Part of' is a fixed prepositional collocation. 'Be part of something' means to be included in or belong to something. 'Part from' and 'part in' are not standard collocations with this meaning."
      },
      {
        type: "Word Meaning / Collocation",
        blank: 6,
        text: "...whether governments should ___6___ children's access to social media through legislation.",
        options: ["A. restrict", "B. prevent", "C. prohibit", "D. limit"],
        answer: 0,
        feedback: "'Restrict access' is the most precise collocation in legal/policy contexts. 'Restrict' means to put limitations on something without completely banning it. 'Prohibit' means to completely forbid; 'prevent' means to stop something from happening entirely — both are too absolute here."
      }
    ]
  },
  {
    title: "Vietnamese Culture Day",
    type: "News Article",
    icon: "🇻🇳",
    passage: `Mark your calendars: November 24th is now officially Vietnamese Culture Day — a day when the whole country gets a "paid holiday"! This day ___1___ the cultural values of our nation, stretching over 4,000 years of history, and is a moment for every Vietnamese person to reflect, appreciate, preserve, and spread the cultural heritage that has been ___2___ through generations.\n\nIt's a day to be proud of our roots, connect the past with the present, and continue writing the story of Vietnamese culture in today's life.\n\nBigshow The Quintessence of Vietnam at Grand World Phu Quoc is a vivid ___3___ of this spirit — where more than 4,000 years of history, literature, arts, and customs of Vietnam are brought to life through spectacular performances, ___4___ sound, light, and cutting-edge technology.\n\nAt The Quintessence of Vietnam, culture is not just displayed but lived, experienced, and inspired, allowing every visitor ___5___ fully appreciate the true essence of Vietnam from the past to the present.\n\nDon't miss out on this extraordinary cultural journey, ___6___ traditional beauty meets modernity, creating an unmissable space!`,
    questions: [
      {
        type: "Tense",
        blank: 1,
        text: "This day ___1___ the cultural values of our nation, stretching over 4,000 years of history.",
        options: ["A. honored", "B. is honoring", "C. honors", "D. has honored"],
        answer: 2,
        feedback: "Present simple 'honors' describes what the day does as a general, permanent fact. When describing the purpose or function of an event/holiday, present simple is used: 'This day honors...' — it's a timeless characteristic."
      },
      {
        type: "Part of Speech",
        blank: 2,
        text: "...the cultural heritage that has been ___2___ through generations.",
        options: ["A. nurture", "B. nurturing", "C. nurtured", "D. to nurture"],
        answer: 2,
        feedback: "'Has been nurtured' is the present perfect passive: 'has been + past participle'. The heritage is the recipient of nurturing (passive). Present perfect indicates the action started in the past and continues to the present — the heritage continues to be preserved."
      },
      {
        type: "Word Meaning",
        blank: 3,
        text: "...is a vivid ___3___ of this spirit — where more than 4,000 years of history... are brought to life.",
        options: ["A. expression", "B. manifestation", "C. demonstration", "D. representation"],
        answer: 1,
        feedback: "'Vivid manifestation' is the precise collocation meaning a clear, visible embodiment or display. 'Manifestation of a spirit' is the standard phrase in formal/cultural writing. 'Expression' is more about feelings; 'demonstration' implies showing how something works."
      },
      {
        type: "Part of Speech / Gerund",
        blank: 4,
        text: "...through spectacular performances, ___4___ sound, light, and cutting-edge technology.",
        options: ["A. combine", "B. combined", "C. combining", "D. to combine"],
        answer: 2,
        feedback: "'Combining sound, light, and technology' is a present participial phrase modifying 'performances'. It describes HOW the performances work — they combine multiple elements. Active participle because the performances themselves are doing the combining."
      },
      {
        type: "Infinitive / Verb Pattern",
        blank: 5,
        text: "...allowing every visitor ___5___ fully appreciate the true essence of Vietnam.",
        options: ["A. to", "B. for", "C. can", "D. that"],
        answer: 0,
        feedback: "'Allow someone to do something' is the fixed verb pattern. 'Allow + object + to-infinitive' is required. Unlike 'let' (which takes a bare infinitive), 'allow' always requires 'to': 'allowing every visitor to appreciate'."
      },
      {
        type: "Relative Clause",
        blank: 6,
        text: "...this extraordinary cultural journey, ___6___ traditional beauty meets modernity.",
        options: ["A. which", "B. that", "C. where", "D. when"],
        answer: 2,
        feedback: "'Where' is the correct relative adverb referring to a place/context — 'a journey where beauty meets modernity'. Although 'journey' is not a physical location, 'where' is used figuratively for contexts or situations in which something happens. 'In which' would also be acceptable."
      }
    ]
  },
  {
    title: "AI in Vietnamese Education",
    type: "Education Article",
    icon: "🤖",
    passage: `AI, once just a classroom assistant, is now becoming a subject in its own right. In December 2025, Việt Nam began piloting the teaching of AI as part of general education, in line ___1___ a national framework issued by the Ministry of Education and Training.\n\nAs the subject is gradually rolled out nationwide, its impact on teaching and learning is becoming ___2___ in classrooms. Under the teacher's guidance, students quickly create a simple apple catching game using Scratch. This is one of the activities in the AI subject curriculum for grade six. What was once something students ___3___ on their own, AI is now taught as a structured subject, helping them understand, apply, and use it effectively and responsibly.\n\nHowever, it still faces certain barriers to ___4___ and more effective implementation. With large class sizes, schools need better investment in teaching equipment and especially digital platforms to support teachers. This is important to develop students' digital ___5___ and keep up with current trends.\n\nTo support effective implementation, teachers need easy-to-use tools suited to the classroom. One example is AI buddy, which ___6___ as an assistant for teachers and a learning companion for students.`,
    questions: [
      {
        type: "Preposition / Collocation",
        blank: 1,
        text: "...in line ___1___ a national framework issued by the Ministry of Education and Training.",
        options: ["A. to", "B. for", "C. with", "D. by"],
        answer: 2,
        feedback: "'In line with' is a fixed prepositional phrase meaning 'in accordance with' or 'consistent with'. 'In line with a framework' means following or conforming to the framework. 'In line to' and 'in line for' have completely different meanings."
      },
      {
        type: "Part of Speech",
        blank: 2,
        text: "...its impact on teaching and learning is becoming ___2___ in classrooms.",
        options: ["A. apparently", "B. apparent", "C. appearance", "D. appear"],
        answer: 1,
        feedback: "'Becoming apparent' uses 'apparent' as a predicate adjective after the linking verb 'become'. 'Become + adjective' is the standard structure. 'Apparently' is an adverb (can't follow 'become' directly); 'appearance' is a noun."
      },
      {
        type: "Tense",
        blank: 3,
        text: "What was once something students ___3___ on their own, AI is now taught as a structured subject.",
        options: ["A. explore", "B. explored", "C. have explored", "D. were exploring"],
        answer: 1,
        feedback: "Past simple 'explored' is correct because the sentence uses 'was once' — indicating a completed past situation that is no longer true. The contrast between 'was once explored' (past) and 'is now taught' (present) requires past simple."
      },
      {
        type: "Part of Speech / Collocation",
        blank: 4,
        text: "...it still faces certain barriers to ___4___ and more effective implementation.",
        options: ["A. broad", "B. broaden", "C. broader", "D. broadly"],
        answer: 2,
        feedback: "'Barriers to broader implementation' — 'broader' is a comparative adjective modifying 'implementation'. The parallel structure 'broader and more effective' uses two comparative forms. 'To' here is a preposition followed by a noun phrase, not an infinitive."
      },
      {
        type: "Word Meaning",
        blank: 5,
        text: "This is important to develop students' digital ___5___ and keep up with current trends.",
        options: ["A. competences", "B. abilities", "C. qualifications", "D. skills"],
        answer: 0,
        feedback: "'Digital competences' (or 'competencies') is the standard term in education policy meaning the combination of knowledge, skills, and attitudes needed to use digital technology. It is the official EU and UNESCO term, widely adopted in Vietnamese education frameworks."
      },
      {
        type: "Tense / Collocation",
        blank: 6,
        text: "...AI buddy, which ___6___ as an assistant for teachers and a learning companion for students.",
        options: ["A. works", "B. serves", "C. acts", "D. functions"],
        answer: 1,
        feedback: "'Serves as' is the precise collocation meaning 'fulfills the role of'. 'Serve as an assistant' is the standard formal phrase. 'Act as' is also acceptable, but 'serve as' is more natural when describing a tool's designated role. 'Work as' implies employment."
      }
    ]
  },
  {
    title: "El Niño Climate Forecast 2026",
    type: "Science Report",
    icon: "🌡️",
    passage: `According to the latest update from the climate prediction center, the Pacific is currently in a neutral state, but there's a roughly 61% chance El Niño ___1___ develop between May and July of 2026. Climate models also indicate a clear warming trend in the ocean.\n\nThere's even around 25% chance that El Niño could reach a very strong intensity by the end of the year, ___2___ the scenario remains uncertain. However, scientists caution that it is too early to confirm a super El Niño as forecasts ___3___ during the spring transition period tend to be less reliable.\n\nIf El Niño does emerge, it could disrupt global atmospheric patterns, ___4___ extreme heat, droughts, and heavier rainfall to different parts of the world. At a time when the planet is already experiencing record-breaking temperatures, the return of El Niño could further ___5___ extreme weather events worldwide in the year of 2026.\n\nAnd as El Niño is expected to develop as early as May, raising the risk of extreme heat and global climate disruptions, scientists are closely monitoring its potential impacts ___6___ record high temperatures.`,
    questions: [
      {
        type: "Tense / Modal",
        blank: 1,
        text: "...there's a roughly 61% chance El Niño ___1___ develop between May and July of 2026.",
        options: ["A. would", "B. will", "C. can", "D. should"],
        answer: 1,
        feedback: "'Will develop' is the correct modal for expressing future probability/prediction. After 'there's a chance (that)', future simple 'will' is used for predicted events. 'Would' implies a hypothetical/conditional scenario; 'will' expresses a likely future outcome."
      },
      {
        type: "Linking Word / Concession",
        blank: 2,
        text: "...El Niño could reach a very strong intensity by the end of the year, ___2___ the scenario remains uncertain.",
        options: ["A. despite", "B. although", "C. however", "D. whereas"],
        answer: 1,
        feedback: "'Although the scenario remains uncertain' is a subordinating conjunction introducing a concessive clause. 'Although' connects two contrasting ideas within one sentence. 'Despite' requires a noun/gerund (not a full clause). 'However' is a conjunctive adverb that needs a new sentence or semicolon."
      },
      {
        type: "Part of Speech",
        blank: 3,
        text: "...forecasts ___3___ during the spring transition period tend to be less reliable.",
        options: ["A. make", "B. making", "C. made", "D. to make"],
        answer: 2,
        feedback: "'Forecasts made during the spring' — 'made' is a past participial phrase (passive) post-modifying 'forecasts'. It is a reduced relative clause: 'forecasts that are made during the spring'. The passive participle shows that forecasts are produced (made) by scientists."
      },
      {
        type: "Part of Speech / Participle",
        blank: 4,
        text: "...it could disrupt global atmospheric patterns, ___4___ extreme heat, droughts, and heavier rainfall...",
        options: ["A. bring", "B. brought", "C. bringing", "D. to bring"],
        answer: 2,
        feedback: "'Bringing extreme heat' is a present participial clause of result — it describes the consequence of disrupting atmospheric patterns. The -ing form after a comma expresses a simultaneous result. 'Brought' (past participle) would imply a passive meaning."
      },
      {
        type: "Word Meaning",
        blank: 5,
        text: "...the return of El Niño could further ___5___ extreme weather events worldwide.",
        options: ["A. increase", "B. amplify", "C. enlarge", "D. extend"],
        answer: 1,
        feedback: "'Amplify extreme weather events' is the precise scientific collocation meaning to intensify or make more severe. 'Amplify' in climate science means to make phenomena stronger or more pronounced. 'Increase' is more general; 'enlarge' refers to physical size."
      },
      {
        type: "Preposition",
        blank: 6,
        text: "...scientists are closely monitoring its potential impacts ___6___ record high temperatures.",
        options: ["A. at", "B. in", "C. amid", "D. with"],
        answer: 2,
        feedback: "'Amid record high temperatures' — 'amid' (or 'amidst') is a preposition meaning 'in the middle of' or 'during'. It sets the background context: monitoring is happening against a backdrop of record temperatures. 'At' is too specific; 'in' doesn't convey the surrounding-context meaning."
      }
    ]
  },
  {
    title: "Significance of November 24",
    type: "History Passage",
    icon: "📜",
    passage: `November 24 is associated with a special milestone in the nation's cultural life. It marks the opening of the first National Cultural Conference, ___1___ at the Hanoi Opera House on November 24, 1946, just over a year after the birth of the Democratic Republic of Vietnam.\n\nIn the context of a nation ___2___ numerous challenges, the Conference brought together over 200 intellectuals, artists, and prominent cultural figures from across the country to discuss the path to building a new culture for an independent nation.\n\nCulture is not merely a spiritual domain ___3___ a guiding force that directs social behavior, nurtures human character, and plays a decisive role in the nation's destiny.\n\nTherefore, choosing November 24 — the day that ___4___ the inception of revolutionary cultural thinking — as "Vietnam Culture Day" carries profound symbolic meaning, ___5___ the central role of culture in the nation's building and safeguarding endeavors.\n\nThis day serves as a reminder that cultural identity is ___6___ to national development and must be preserved for future generations.`,
    questions: [
      {
        type: "Part of Speech",
        blank: 1,
        text: "...the first National Cultural Conference, ___1___ at the Hanoi Opera House on November 24, 1946.",
        options: ["A. holding", "B. held", "C. to hold", "D. which holding"],
        answer: 1,
        feedback: "'Held at the Hanoi Opera House' is a past participial phrase (passive) modifying 'Conference'. The conference WAS held — passive relationship. This is a reduced non-defining relative clause: 'which was held at the Hanoi Opera House'."
      },
      {
        type: "Part of Speech / Participle",
        blank: 2,
        text: "In the context of a nation ___2___ numerous challenges...",
        options: ["A. face", "B. faces", "C. faced", "D. facing"],
        answer: 3,
        feedback: "'A nation facing numerous challenges' — present participial phrase modifying 'nation'. It means 'a nation that was facing challenges'. Active present participle because the nation is the one experiencing/confronting the challenges, not receiving them."
      },
      {
        type: "Linking Word",
        blank: 3,
        text: "Culture is not merely a spiritual domain ___3___ a guiding force that directs social behavior.",
        options: ["A. and", "B. or", "C. but", "D. yet"],
        answer: 2,
        feedback: "'Not merely X but Y' is a fixed correlative conjunction structure expressing contrast and upgrade. 'Not merely... but' means 'it is more than just X — it is also Y'. 'But' creates the contrast between the limited view and the larger truth."
      },
      {
        type: "Relative Clause / Tense",
        blank: 4,
        text: "...the day that ___4___ the inception of revolutionary cultural thinking...",
        options: ["A. marks", "B. marked", "C. has marked", "D. is marking"],
        answer: 1,
        feedback: "'The day that marked the inception' — past simple is used because the event (the conference in 1946) is a specific historical event. 'Marked' describes what happened on that particular date in the past. Present simple 'marks' could work for current significance, but the context refers to the historical event."
      },
      {
        type: "Part of Speech / Participle",
        blank: 5,
        text: "...carries profound symbolic meaning, ___5___ the central role of culture in the nation's building...",
        options: ["A. affirm", "B. affirmed", "C. affirming", "D. to affirm"],
        answer: 2,
        feedback: "'Affirming the central role' is a present participial clause of result — it describes what the symbolic meaning achieves. The -ing form after a comma shows a consequence or additional result of the main clause. Active participle because the meaning itself does the affirming."
      },
      {
        type: "Word Meaning / Collocation",
        blank: 6,
        text: "...cultural identity is ___6___ to national development and must be preserved for future generations.",
        options: ["A. essential", "B. necessary", "C. important", "D. vital"],
        answer: 0,
        feedback: "'Essential to national development' is the precise collocation meaning absolutely necessary and fundamental. 'Essential to' is stronger than 'important to' — it implies something cannot function without it. 'Vital' is close but 'essential to' is the most formal and standard collocation in policy writing."
      }
    ]
  }
];

// ── STORAGE ────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'readmind_scores';
const DRAFT_KEY   = 'readmind_draft';

function saveScores() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(scores)); } catch(e) {}
}

function loadScores() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) scores = JSON.parse(raw);
  } catch(e) { scores = {}; }
}

function saveDraft() {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({
      textIndex: currentTextIndex,
      answers: answers
    }));
  } catch(e) {}
}

function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

function clearDraft() {
  try { localStorage.removeItem(DRAFT_KEY); } catch(e) {}
}

function resetAllProgress() {
  if (!confirm('Xoá toàn bộ tiến trình? Hành động này không thể hoàn tác.')) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(DRAFT_KEY);
  } catch(e) {}
  scores = {};
  updateHomeStats();
  showToast('Đã xoá tiến trình!');
}

function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#231f35;border:1px solid #2e2a45;color:#fffffe;padding:10px 22px;border-radius:50px;font-size:13px;font-family:Sora,sans-serif;z-index:999;opacity:0;transition:opacity 0.3s;pointer-events:none;';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.style.opacity = '0', 2500);
}

// ── STATE ──────────────────────────────────────────────────────────────────
let currentTextIndex = 0;
let currentQuestionIndex = 0;
let answers = [];
let scores = {}; // textIndex -> score
let currentTextId = 0;

// Load saved scores on startup
loadScores();

// ── SCREEN MANAGEMENT ─────────────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'select-screen') renderTextGrid();
  if (id === 'home') updateHomeStats();
}

function updateHomeStats() {
  const completedCount = Object.keys(scores).length;
  document.getElementById('stat-texts').textContent = texts.length;
  document.getElementById('stat-qs').textContent = texts.length * 6;
  document.getElementById('stat-done').textContent = completedCount;
  const allScores = Object.values(scores);
  if (allScores.length > 0) {
    const best = Math.max(...allScores);
    document.getElementById('stat-score').textContent = `${best}/6`;
  } else {
    document.getElementById('stat-score').textContent = '—';
  }
}

// ── TEXT GRID ──────────────────────────────────────────────────────────────
function renderTextGrid() {
  const grid = document.getElementById('texts-grid');
  grid.innerHTML = texts.map((t, i) => {
    const completed = scores[i] !== undefined;
    const sc = scores[i];
    return `
    <div class="text-card ${completed ? 'completed' : ''}" onclick="startText(${i})">
      <div class="card-num">TEXT ${String(i+1).padStart(2,'0')}</div>
      <div class="card-title">${t.icon} ${t.title}</div>
      <div class="card-type"><span class="card-dot"></span>${t.type}</div>
      ${completed ? `<div class="card-score">Score: ${sc}/6 · ${Math.round(sc/6*100)}%</div>` : ''}
    </div>`;
  }).join('');
}

// ── START TEXT ─────────────────────────────────────────────────────────────
function startText(idx) {
  currentTextIndex = idx;
  currentTextId = idx;
  currentQuestionIndex = 0;

  // Restore draft if it's for this text
  const draft = loadDraft();
  if (draft && draft.textIndex === idx && Array.isArray(draft.answers)) {
    answers = draft.answers;
    // Jump to first unanswered question
    const firstUnanswered = answers.findIndex(a => a === null);
    currentQuestionIndex = firstUnanswered >= 0 ? firstUnanswered : 5;
    showToast('Continuing your progress 📖');
  } else {
    answers = new Array(6).fill(null);
  }

  renderGame();
  showScreen('game');
}

function renderGame() {
  const text = texts[currentTextIndex];
  document.getElementById('hdr-label').textContent = `TEXT ${String(currentTextIndex+1).padStart(2,'0')}`;
  document.getElementById('hdr-title').textContent = text.title;
  renderPassage();
  renderQuestions();
  updateProgress();
}

// ── PASSAGE RENDERING ──────────────────────────────────────────────────────
function renderPassage() {
  const text = texts[currentTextIndex];
  let html = text.passage;

  // Convert newlines
  html = html.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');

  // Convert blanks
  for (let i = 1; i <= 6; i++) {
    const ans = answers[i-1];
    let cls = 'blank';
    let display = `(${i})`;
    if (ans !== null) {
      const correct = ans === text.questions[i-1].answer;
      cls += correct ? ' answered-correct' : ' answered-incorrect';
      const chosen = text.questions[i-1].options[ans].substring(3);
      display = chosen;
    }
    html = html.replace(`___${i}___`, `<span class="${cls}" id="blank-${i}">${display}</span>`);
  }

  document.getElementById('text-panel').innerHTML = `
    <div class="passage-type">${text.icon} ${text.type}</div>
    <div class="passage-title">${text.title}</div>
    <div class="passage-body"><p>${html}</p></div>
  `;
}

// ── QUESTIONS RENDERING ────────────────────────────────────────────────────
function renderQuestions() {
  const text = texts[currentTextIndex];
  const keys = ['A', 'B', 'C', 'D'];

  // Tracker
  const trackerHTML = text.questions.map((q, i) => {
    let cls = 'q-dot';
    if (i === currentQuestionIndex) cls += ' current';
    else if (answers[i] !== null) {
      cls += answers[i] === q.answer ? ' correct' : ' incorrect';
    }
    return `<div class="${cls}" onclick="goToQuestion(${i})">${i+1}</div>`;
  }).join('');

  // Question cards
  const cardsHTML = text.questions.map((q, i) => {
    const isActive = i === currentQuestionIndex;
    const isAnswered = answers[i] !== null;

    const optionsHTML = q.options.map((opt, oi) => {
      let cls = 'option-btn';
      let disabled = '';
      if (isAnswered) {
        disabled = 'disabled';
        if (oi === q.answer) cls += ' correct';
        else if (oi === answers[i] && answers[i] !== q.answer) cls += ' incorrect';
      }
      return `<button class="${cls}" ${disabled} onclick="selectAnswer(${i}, ${oi})">
        <span class="option-key">${keys[oi]}</span>${opt.substring(3)}
      </button>`;
    }).join('');

    let feedbackHTML = '';
    if (isAnswered) {
      const correct = answers[i] === q.answer;
      feedbackHTML = `<div class="feedback-box ${correct ? 'correct' : 'incorrect'} show">
        <span class="feedback-icon">${correct ? '✓' : '✗'}</span>${q.feedback}
      </div>`;
    }

    const navHTML = `<div class="nav-btns">
      <button class="btn-nav" onclick="goToQuestion(${i-1})" ${i === 0 ? 'disabled' : ''}>← Prev</button>
      ${i < 5 ? `<button class="btn-nav primary" onclick="goToQuestion(${i+1})">Next →</button>` 
               : `<button class="btn-nav primary" onclick="finishText()">Finish ✓</button>`}
    </div>`;

    return `<div class="question-card ${isActive ? 'active' : ''}" id="q-card-${i}">
      <div class="q-type-tag">${q.type}</div>
      <div class="q-num">Question ${i+1} of 6 · Blank (${q.blank})</div>
      <div class="q-text">${q.text.replace(`___${q.blank}___`, `<span class="q-blank-ref">(${q.blank})</span>`)}</div>
      <div class="options-grid">${optionsHTML}</div>
      ${feedbackHTML}
      ${navHTML}
    </div>`;
  }).join('');

  document.getElementById('questions-panel').innerHTML = `
    <div class="q-tracker">${trackerHTML}</div>
    ${cardsHTML}
  `;
}

function goToQuestion(idx) {
  if (idx < 0 || idx > 5) return;
  currentQuestionIndex = idx;
  renderQuestions();
}

function selectAnswer(qIdx, optIdx) {
  if (answers[qIdx] !== null) return;
  answers[qIdx] = optIdx;
  saveDraft();          // auto-save every answer
  renderPassage();
  renderQuestions();
  updateProgress();
}

function updateProgress() {
  const answered = answers.filter(a => a !== null).length;
  const correct = answers.filter((a, i) => a === texts[currentTextIndex].questions[i].answer).length;
  const pct = Math.round(answered / 6 * 100);
  const circumference = 113;
  const offset = circumference - (pct / 100) * circumference;

  document.getElementById('score-chip').textContent = `${correct} / ${answered}`;
  document.getElementById('ring-fg').style.strokeDashoffset = offset;
  document.getElementById('ring-label').textContent = pct + '%';
  document.getElementById('progress-fill').style.width = pct + '%';
}

function confirmBack() {
  if (answers.some(a => a !== null)) {
    // Draft already saved via selectAnswer; just go back
    showScreen('select-screen');
    showToast('Progress saved ✓');
  } else {
    clearDraft();
    showScreen('select-screen');
  }
}

function finishText() {
  const text = texts[currentTextIndex];
  const correct = answers.filter((a, i) => a === text.questions[i].answer).length;
  const wrong = 6 - correct;
  const pct = Math.round(correct / 6 * 100);

  // Save final score & clear the draft for this text
  scores[currentTextIndex] = correct;
  saveScores();
  clearDraft();

  const emojis = ['😔', '😐', '🙂', '😊', '😄', '🌟', '🏆'];
  const emojiIdx = Math.floor(correct / 6 * 6);
  const titles = ['Keep Practicing!', 'Getting There!', 'Good Effort!', 'Well Done!', 'Excellent!', 'Outstanding!', 'Perfect Score!'];

  document.getElementById('result-emoji').textContent = emojis[Math.min(emojiIdx, 6)];
  document.getElementById('result-title').textContent = titles[Math.min(correct, 6)];
  document.getElementById('result-score').textContent = `${correct} / 6 correct · ${pct}% accuracy`;
  document.getElementById('r-correct').textContent = correct;
  document.getElementById('r-wrong').textContent = wrong;
  document.getElementById('r-pct').textContent = pct + '%';

  showScreen('results');
}

function nextText() {
  const next = (currentTextIndex + 1) % texts.length;
  startText(next);
}

// Init
updateHomeStats();
renderTextGrid();

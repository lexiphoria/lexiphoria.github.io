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
  },
  {
    title: "UNESCO Honour — Đông Hồ Folk Paintings",
    type: "News Article",
    icon: "🎨",
    passage: `UNESCO HONOUR SHINES SPOTLIGHT ON ĐÔNG HỒ FOLK PAINTINGS\n\nBac Ninh provincial authorities hosted a vibrant ceremony Friday night to accept UNESCO certification. The UN agency inscribed Dong Ho folk painting, a vivid Vietnamese folk art tradition, onto its list of intangible cultural heritage ___1___ urgent safeguarding.\n\nThe event doubled as the kickoff for the return of the Bac Ninh Heritage 2026 festival, ___2___ crowds to celebrate local roots. The milestone spotlights the historical, cultural, and aesthetic legacy ___3___ in Bac Ninh's villages centuries ago.\n\nIt highlights generations of artisans and communities ___4___ modern threats such as urbanization. Bac Ninh is now rolling out bold plans to digitize the art, ramp ___5___ global marketing, and weave the art into sustainable tourism.\n\nThis recognition is expected to bring international attention to a craft that has been passed ___6___ from generation to generation for centuries.`,
    questions: [
      {
        type: "Part of Speech / Participle",
        blank: 1,
        text: "...onto its list of intangible cultural heritage ___1___ urgent safeguarding.",
        options: ["A. need", "B. needing", "C. needed", "D. to need"],
        answer: 1,
        feedback: "'Needing urgent safeguarding' is a present participial phrase modifying 'heritage'. It means 'heritage that needs urgent safeguarding'. Active present participle because the heritage itself is in the state of needing — it is the one requiring protection."
      },
      {
        type: "Part of Speech / Participle",
        blank: 2,
        text: "...the return of the Bac Ninh Heritage 2026 festival, ___2___ crowds to celebrate local roots.",
        options: ["A. draw", "B. drew", "C. drawing", "D. drawn"],
        answer: 2,
        feedback: "'Drawing crowds' is a present participial clause of result — it describes the consequence of the festival's return. The -ing form after a comma expresses a simultaneous action or result. Active participle because the festival draws the crowds."
      },
      {
        type: "Part of Speech",
        blank: 3,
        text: "...the historical, cultural, and aesthetic legacy ___3___ in Bac Ninh's villages centuries ago.",
        options: ["A. bear", "B. bearing", "C. born", "D. to bear"],
        answer: 2,
        feedback: "'Born in Bac Ninh's villages' is a past participial phrase (passive) modifying 'legacy'. The legacy was born (= originated) in the villages. This is a reduced relative clause: 'the legacy that was born in Bac Ninh's villages'. 'Born' is the irregular past participle of 'bear'."
      },
      {
        type: "Part of Speech / Participle",
        blank: 4,
        text: "It highlights generations of artisans and communities ___4___ modern threats such as urbanization.",
        options: ["A. battle", "B. battled", "C. battling", "D. to battle"],
        answer: 2,
        feedback: "'Battling modern threats' is a present participial phrase modifying 'artisans and communities'. It means 'who are battling modern threats'. Active present participle because the artisans are actively fighting against threats — they are the doers of the action."
      },
      {
        type: "Phrasal Verb",
        blank: 5,
        text: "Bac Ninh is now rolling out bold plans to digitize the art, ramp ___5___ global marketing...",
        options: ["A. up", "B. out", "C. on", "D. off"],
        answer: 0,
        feedback: "'Ramp up' is a phrasal verb meaning to increase or intensify something. 'Ramp up marketing' = to significantly boost marketing efforts. 'Ramp out/on/off' are not standard phrasal verbs in this context."
      },
      {
        type: "Phrasal Verb",
        blank: 6,
        text: "...a craft that has been passed ___6___ from generation to generation for centuries.",
        options: ["A. over", "B. by", "C. down", "D. through"],
        answer: 2,
        feedback: "'Passed down' is a phrasal verb meaning to transmit knowledge, traditions, or skills from one generation to the next. 'Pass down from generation to generation' is a fixed expression. 'Pass over' = skip; 'pass through' = go through a place."
      }
    ]
  },
  {
    title: "A Mini Tropical Forest in Hồ Chí Minh City",
    type: "Lifestyle Article",
    icon: "🌳",
    passage: `A MINI "TROPICAL FOREST" IN HỒ CHÍ MINH CITY\n\nSummer is here in Vietnam and in Ho Chi Minh City. Prolonged heat is driving a growing ___1___ for cooler spaces and many people are turning to greener environments to escape the heat.\n\nAnd among a list of many options, a space designed like a tropical forest is ___2___ attention. It offers an option for those looking for a change of atmosphere without leaving the city.\n\nThis lush green space covers more than 1,000 square meters with features ___3___ as large trees and dense layers of low-level vegetation. In smaller corners, natural light filters through the layers of greenery. It feels like a mini forest.\n\nNot only young people, this mini forest also attracts families and visitors of all ages. There's greenery, water, and moss underfoot — and no need to leave the city — ___4___ yet still feel close to nature.\n\nThe space has been carefully ___5___ to recreate the feeling of being surrounded by wilderness. It serves as a reminder that urban living does not have to ___6___ a disconnect from the natural world.`,
    questions: [
      {
        type: "Collocation",
        blank: 1,
        text: "Prolonged heat is driving a growing ___1___ for cooler spaces...",
        options: ["A. need", "B. wish", "C. demand", "D. desire"],
        answer: 2,
        feedback: "'A growing demand for' is the correct collocation in economic and social contexts. 'Drive a demand' and 'growing demand for' are both fixed collocations. 'Demand' implies a measurable trend; 'wish' and 'desire' are more personal and emotional."
      },
      {
        type: "Collocation / Phrasal Verb",
        blank: 2,
        text: "...a space designed like a tropical forest is ___2___ attention.",
        options: ["A. drawing", "B. gaining", "C. catching", "D. taking"],
        answer: 1,
        feedback: "'Gaining attention' is the correct collocation meaning to increasingly receive notice or interest. 'Gain attention' emphasizes a gradual process of becoming noticed, which fits the context. 'Draw attention' is also common but implies active attraction; 'gaining' better matches the passive, organic growth described."
      },
      {
        type: "Linking Word",
        blank: 3,
        text: "...more than 1,000 square meters with features ___3___ as large trees and dense layers of low-level vegetation.",
        options: ["A. like", "B. so", "C. such", "D. similar"],
        answer: 2,
        feedback: "'Such as' is the correct linking phrase used to introduce specific examples from a larger category. 'Features such as large trees' = 'features like large trees'. 'Such as' is more formal than 'like' and preferred in written English."
      },
      {
        type: "Linking Word / Concession",
        blank: 4,
        text: "...no need to leave the city — ___4___ yet still feel close to nature.",
        options: ["A. and", "B. so", "C. but", "D. or"],
        answer: 2,
        feedback: "'But yet still feel close to nature' — 'but' introduces a contrast: you don't leave the city, BUT you still feel close to nature. The conjunction highlights the unexpected benefit. 'But yet' is an emphatic way to express contrast."
      },
      {
        type: "Part of Speech",
        blank: 5,
        text: "The space has been carefully ___5___ to recreate the feeling of being surrounded by wilderness.",
        options: ["A. design", "B. designing", "C. designed", "D. designer"],
        answer: 2,
        feedback: "'Has been carefully designed' uses the present perfect passive: 'has been + past participle'. The space is the recipient of the design action. The adverb 'carefully' modifies the participle 'designed'. This indicates a completed action with present relevance."
      },
      {
        type: "Word Meaning / Collocation",
        blank: 6,
        text: "...urban living does not have to ___6___ a disconnect from the natural world.",
        options: ["A. mean", "B. cause", "C. create", "D. bring"],
        answer: 0,
        feedback: "'Does not have to mean a disconnect' — 'mean' here signifies 'imply' or 'result in'. 'X does not have to mean Y' is a fixed expression conveying that X does not necessarily lead to Y. 'Cause' and 'create' are more direct; 'mean' captures the philosophical tone."
      }
    ]
  },
  {
    title: "Singapore — City in Nature",
    type: "Environment Article",
    icon: "🦋",
    passage: `How does a densely populated, skyscraper-lined nation like Singapore transform into a lush green oasis ___1___ wildlife thrives alongside humans? The island nation's ambitious vision of becoming a "City in Nature" aims to integrate urban living with biodiversity and requires careful coordination ___2___ government leaders, designers of the urban landscape, and its citizens.\n\nBy carving out wildlife habitats amidst the built environment, the National Parks Board seeks to prioritize biodiversity in urban planning and bring back species previously ___3___ out. An architect helping to drive this change is the butterfly-loving Khew Sin Khoon, ___4___ innovative designs have integrated green habitats into Singapore's airports, institutional buildings, and even hospitals.\n\nAlso at the forefront are passionate youths Tay Jing Xuan and Lumin Ong, a couple hunting down critical data about their beloved dragonflies to spur conservation efforts, and spreading awareness of how to live alongside wildlife, especially when conflicts ___5___ humans occur.\n\nThis synergy between bold policies, community action, and biophilic design makes Singapore a unique example of how nature and humans can ___6___ in harmony.`,
    questions: [
      {
        type: "Relative Clause",
        blank: 1,
        text: "...a lush green oasis ___1___ wildlife thrives alongside humans?",
        options: ["A. which", "B. that", "C. where", "D. when"],
        answer: 2,
        feedback: "'Where wildlife thrives' — 'where' is the correct relative adverb referring to a place ('oasis'). In a relative clause modifying a location, 'where' replaces 'in which'. 'Which' and 'that' would need a preposition ('in which') to work here."
      },
      {
        type: "Preposition",
        blank: 2,
        text: "...requires careful coordination ___2___ government leaders, designers, and its citizens.",
        options: ["A. among", "B. between", "C. with", "D. from"],
        answer: 1,
        feedback: "'Coordination between X, Y, and Z' is the correct collocation. Although traditional grammar reserves 'between' for two parties and 'among' for three or more, modern usage accepts 'between' when listing distinct, named entities. 'Between' emphasizes mutual relationships among named parties."
      },
      {
        type: "Phrasal Verb",
        blank: 3,
        text: "...bring back species previously ___3___ out.",
        options: ["A. driven", "B. wiped", "C. phased", "D. pushed"],
        answer: 1,
        feedback: "'Wiped out' is the phrasal verb meaning completely destroyed or eliminated. 'Species previously wiped out' = species that were completely eliminated from the area. 'Driven out' means forced to leave; 'wiped out' is more definitive — extinction."
      },
      {
        type: "Relative Clause",
        blank: 4,
        text: "...the butterfly-loving Khew Sin Khoon, ___4___ innovative designs have integrated green habitats...",
        options: ["A. who", "B. whom", "C. whose", "D. which"],
        answer: 2,
        feedback: "'Whose innovative designs' — 'whose' is the possessive relative pronoun. It modifies 'designs' to show they belong to Khew Sin Khoon. In non-defining relative clauses, 'whose + noun' is the standard possessive structure for people."
      },
      {
        type: "Preposition",
        blank: 5,
        text: "...especially when conflicts ___5___ humans occur.",
        options: ["A. between", "B. among", "C. with", "D. against"],
        answer: 2,
        feedback: "'Conflicts with humans' — 'with' is the correct preposition after 'conflicts' when referring to clashes or disagreements involving another party. 'Conflicts with' is the standard collocation. 'Conflicts between' would require two named parties."
      },
      {
        type: "Word Meaning / Collocation",
        blank: 6,
        text: "...a unique example of how nature and humans can ___6___ in harmony.",
        options: ["A. live", "B. exist", "C. coexist", "D. persist"],
        answer: 2,
        feedback: "'Coexist in harmony' is the precise collocation meaning to live together peacefully. 'Coexist' specifically implies two or more entities (nature and humans) existing side by side. 'Live in harmony' is possible but 'coexist' is more formal and precise for this ecological context."
      }
    ]
  },
  {
    title: "ASEAN Scholarship — Survey Email",
    type: "Formal Email",
    icon: "📧",
    passage: `Dear Applicant,\n\nWe hope this email finds you well. You recently used our online portal to apply for the ASEAN Scholarship, and we would like to ask ___1___ your help to improve it.\n\nWhy we are writing to you:\nWe want to make our application system easier for future students.\n\nHow you can help:\nWe created a short survey about your experience ___2___ our application portal. Your honest feedback will help us make it easier for future applicants.\n\nYour privacy ___3___:\nYour answers will be anonymous, kept private and will only be used to improve our system. Taking this survey will not affect any future applications you ___4___ make.\n\nReady to share your thoughts?\nThe survey takes about 5 minutes to complete. You can access the survey here: go.gov.sg/asappexp\n\nThank you for ___5___ us improve.\n\nWarm regards,\nASEAN Scholarship team\n\nThis is a genuine email and not a phishing attempt. ___6___ you have any concerns, please contact us directly.`,
    questions: [
      {
        type: "Preposition",
        blank: 1,
        text: "...we would like to ask ___1___ your help to improve it.",
        options: ["A. about", "B. for", "C. with", "D. on"],
        answer: 1,
        feedback: "'Ask for your help' is the correct verb-preposition collocation meaning to request assistance. 'Ask for' = to request or seek something. 'Ask about' means to inquire about a topic; 'ask with' and 'ask on' are not standard collocations."
      },
      {
        type: "Preposition / Collocation",
        blank: 2,
        text: "We created a short survey about your experience ___2___ our application portal.",
        options: ["A. with", "B. using", "C. on", "D. about"],
        answer: 1,
        feedback: "'Your experience using our portal' — 'using' is a present participle/gerund functioning as an adverbial modifier of 'experience'. It specifies the type of experience: the experience of using the portal. 'Experience with' is also common, but 'using' is more precise here."
      },
      {
        type: "Tense / Collocation",
        blank: 3,
        text: "Your privacy ___3___:",
        options: ["A. is important", "B. matters", "C. counts", "D. concerns"],
        answer: 1,
        feedback: "'Your privacy matters' — 'matters' is the correct verb meaning 'is important' or 'is significant'. 'X matters' is a concise, emphatic expression commonly used in formal communications to affirm the importance of something. 'Counts' is informal; 'concerns' would need a different structure."
      },
      {
        type: "Tense / Modal",
        blank: 4,
        text: "Taking this survey will not affect any future applications you ___4___ make.",
        options: ["A. would", "B. might", "C. should", "D. will"],
        answer: 1,
        feedback: "'Applications you might make' — 'might' expresses possibility/uncertainty about future actions. The applicant may or may not apply again; 'might' captures this uncertainty. 'Will' implies certainty; 'would' implies a conditional; 'should' implies obligation."
      },
      {
        type: "Gerund / Verb Pattern",
        blank: 5,
        text: "Thank you for ___5___ us improve.",
        options: ["A. help", "B. helped", "C. helping", "D. to help"],
        answer: 2,
        feedback: "'Thank you for helping' — after 'for' (preposition), the gerund (-ing form) is required. 'Thank you for + gerund' is a fixed pattern in formal correspondence. 'Help someone + bare infinitive' follows: 'helping us improve' (no 'to' after 'help')."
      },
      {
        type: "Conditional / Formal",
        blank: 6,
        text: "___6___ you have any concerns, please contact us directly.",
        options: ["A. Should", "B. Unless", "C. When", "D. Whether"],
        answer: 0,
        feedback: "'Should you have any concerns' is a formal inverted conditional: 'Should + subject + base verb' = 'If you have'. This is standard in formal emails and business correspondence. 'Unless' means 'if not'; 'when' implies certainty; 'whether' introduces alternatives."
      }
    ]
  },
  {
    title: "Vietnam Airlines — Data Breach Notice",
    type: "Formal Notice",
    icon: "✉️",
    passage: `Dear Valued Customer,\n\nVietnam Airlines would like to inform you of a recent data breach ___1___ a third-party customer service platform operated by a global technology partner. According to the service provider, Vietnam Airlines is among several global companies using its services that have been ___2___ by this incident. A portion of customer data managed on this platform was accessed without authorization.\n\nUpon being alerted, we took appropriate actions to coordinate with relevant authorities, cybersecurity experts, and the third-party partner to investigate the breach, assess potential impact and ___3___ further unauthorized access to its system.\n\nTo help protect your personal data, we recommend changing the passwords of your Lotusmiles and ___4___ email accounts, staying alert to potential phishing attempts, suspicious emails or phone calls impersonating Vietnam Airlines, and avoid sharing information, one-time passcodes (OTPs), or login credentials with unverified sources.\n\nVietnam Airlines sincerely regrets any concern this incident may have caused. We are committed to ___5___ potentially affected customers informed with relevant updates as the investigation continues.\n\nFor any questions or assistance, customers are kindly requested to contact Vietnam Airlines Data Protection Office at dpo@vietnamairlines.com, ___6___ via 24/7 hotlines: 1900 1100\n\nYour sincerely,\nVietnam Airlines`,
    questions: [
      {
        type: "Part of Speech / Participle",
        blank: 1,
        text: "...a recent data breach ___1___ a third-party customer service platform...",
        options: ["A. involve", "B. involved", "C. involving", "D. to involve"],
        answer: 2,
        feedback: "'A data breach involving a third-party platform' — 'involving' is a present participial phrase post-modifying 'breach'. It means 'a breach that involves'. Active participle because the breach itself is the one involving the platform — it is the active agent."
      },
      {
        type: "Part of Speech / Tense",
        blank: 2,
        text: "...several global companies using its services that have been ___2___ by this incident.",
        options: ["A. affect", "B. affecting", "C. affected", "D. to affect"],
        answer: 2,
        feedback: "'Have been affected by this incident' uses the present perfect passive: 'have been + past participle'. The companies are the recipients of the effect (passive voice). Present perfect indicates the effect started in the past and has relevance to the present."
      },
      {
        type: "Word Meaning / Collocation",
        blank: 3,
        text: "...assess potential impact and ___3___ further unauthorized access to its system.",
        options: ["A. prevent", "B. contain", "C. control", "D. restrict"],
        answer: 1,
        feedback: "'Contain further unauthorized access' — 'contain' in cybersecurity means to limit the spread or scope of a breach. 'Contain a breach/incident' is the standard term in data security contexts. 'Prevent' means to stop entirely (the breach already happened); 'contain' means to limit its extent."
      },
      {
        type: "Part of Speech",
        blank: 4,
        text: "...changing the passwords of your Lotusmiles and ___4___ email accounts...",
        options: ["A. associate", "B. associating", "C. associated", "D. association"],
        answer: 2,
        feedback: "'Associated email accounts' — 'associated' is a past participial adjective modifying 'email accounts'. It means accounts that are connected or linked to your Lotusmiles account. 'Associated' functions as a pre-modifier adjective in this noun phrase."
      },
      {
        type: "Collocation / Verb Pattern",
        blank: 5,
        text: "We are committed to ___5___ potentially affected customers informed...",
        options: ["A. keep", "B. keeping", "C. kept", "D. be keeping"],
        answer: 1,
        feedback: "'Committed to keeping' — after 'committed to' (where 'to' is a preposition, not part of an infinitive), the gerund is required. 'Committed to + gerund' is a fixed structure: 'committed to keeping customers informed'. 'Keep someone informed' is also a fixed pattern."
      },
      {
        type: "Linking Word",
        blank: 6,
        text: "...contact Vietnam Airlines Data Protection Office at dpo@vietnamairlines.com, ___6___ via 24/7 hotlines: 1900 1100",
        options: ["A. and", "B. or", "C. but", "D. so"],
        answer: 1,
        feedback: "'Or via 24/7 hotlines' — 'or' presents an alternative option. Customers can contact via email OR via hotlines. 'Or' is used to offer a choice between two methods. 'And' would imply both are required; 'or' correctly signals either option is acceptable."
      }
    ]
  },
  {
    title: "System Conversion — Part 1",
    type: "Notice",
    icon: "✈️",
    passage: `Vietnam Airlines announces passenger service system conversion from 01:15 to 13:00 Vietnam time on April 18, 2024 (18:15 April 17 to 06:00 on April 18, 2024 - UTC time). After this period, the system will return to normal ___1___ to serve our customers. This activity is expected to ___2___:\n\n• Booking services, ticket purchases, refunds, changes... on the website, mobile application, as well as at ticket offices and agents of Vietnam Airlines;\n• Online check-in and airport check-in times;\n• Accumulating miles, redeeming miles ___3___ airline rewards (air tickets, service upgrades, baggage, Lotus lounge vouchers), buy/transfer miles, buy membership lucky numbers, as well as the function allowing ticket purchase in combination ___4___ Cash & Miles of the Lotusmiles frequent flyer program.\n\nVietnam Airlines sincerely hopes ___5___ Lotusmiles members' understanding ___6___ any inconvenience arise during this period.`,
    questions: [
      {
        type: "Part of Speech",
        blank: 1,
        text: "...the system will return to normal ___1___ to serve our customers.",
        options: ["A. operate", "B. operation", "C. operator", "D. operational"],
        answer: 1,
        feedback: "'Normal operation' — 'operation' is the noun form needed after the adjective 'normal'. It refers to the state of functioning or working. 'Operate' is a verb; 'operational' is an adjective."
      },
      {
        type: "Vocabulary",
        blank: 2,
        text: "This activity is expected to ___2___: Booking services, ticket purchases...",
        options: ["A. affect", "B. effect", "C. impact", "D. result"],
        answer: 0,
        feedback: "'Affect' is a verb meaning to influence or cause a change in something. 'Effect' is usually a noun. 'Impact' can be a verb but 'affect' is the standard choice here. 'Result' requires the preposition 'in'."
      },
      {
        type: "Preposition",
        blank: 3,
        text: "...redeeming miles ___3___ airline rewards...",
        options: ["A. for", "B. with", "C. to", "D. on"],
        answer: 0,
        feedback: "'Redeem X for Y' is the standard collocation. You exchange (redeem) one thing in order to get (for) another thing, such as miles for airline rewards."
      },
      {
        type: "Preposition",
        blank: 4,
        text: "...the function allowing ticket purchase in combination ___4___ Cash & Miles...",
        options: ["A. with", "B. to", "C. by", "D. for"],
        answer: 0,
        feedback: "'In combination with' is a fixed phrase meaning together with or joined with something else."
      },
      {
        type: "Preposition",
        blank: 5,
        text: "Vietnam Airlines sincerely hopes ___5___ Lotusmiles members' understanding...",
        options: ["A. in", "B. on", "C. for", "D. about"],
        answer: 2,
        feedback: "'Hope for' is the correct prepositional verb. You hope for something (a noun) to happen or be given. 'Vietnam Airlines hopes for understanding'."
      },
      {
        type: "Conditional / Formal",
        blank: 6,
        text: "...understanding ___6___ any inconvenience arise during this period.",
        options: ["A. if", "B. should", "C. unless", "D. whether"],
        answer: 1,
        feedback: "This is an inverted first conditional: 'Should any inconvenience arise' means 'If any inconvenience should arise'. It is highly formal and common in business notices."
      }
    ]
  },
  {
    title: "System Conversion — Part 2",
    type: "Notice",
    icon: "✈️",
    passage: `To minimize the impact of this system conversion, Vietnam Airlines recommends Lotusmiles members to consider their plans ___1___ the aforementioned services during the system change on April 18, 2024. If there are any changes, please contact the place of purchase before April 18, 2024 for assistance.\n\nAdditionally, Lotusmiles members should be mindful if they have flights during this period as follows:\n• Stay updated on flight schedule changes announced by the airline via the phone number or email ___2___ for ticket purchase.\n• Limit changes to flight itineraries during the system change period.\n• Provide complete flight tickets, booking codes, identification documents, and Lotusmiles membership cards when ___3___.\n• Follow passenger luggage rules. Checked luggage should have tags with the passenger's name and contact information to prevent loss or being taken by ___4___.\n\nServices will return to normal immediately after Vietnam Airlines ___5___ the system change. For flight information updates and support, please visit the website... Thank you for your companionship and ___6___.`,
    questions: [
      {
        type: "Preposition",
        blank: 1,
        text: "...recommends members to consider their plans ___1___ the aforementioned services.",
        options: ["A. regard", "B. regards", "C. regarding", "D. regarded"],
        answer: 2,
        feedback: "'Regarding' is a preposition meaning 'concerning' or 'in relation to'. It connects the plans to the services mentioned earlier."
      },
      {
        type: "Participle",
        blank: 2,
        text: "...via the phone number or email ___2___ for ticket purchase.",
        options: ["A. register", "B. registered", "C. registering", "D. registration"],
        answer: 1,
        feedback: "'Registered' is a past participle used in a reduced relative clause: 'the email [that was] registered for ticket purchase'. It describes a passive action done to the email."
      },
      {
        type: "Phrasal Verb / Gerund",
        blank: 3,
        text: "Provide complete flight tickets... when ___3___.",
        options: ["A. checking in", "B. checking out", "C. check in", "D. checked in"],
        answer: 0,
        feedback: "After the conjunction 'when', we can use a present participle (reduced adverbial clause) if the subject is the same: 'when checking in' = 'when you are checking in'."
      },
      {
        type: "Collocation",
        blank: 4,
        text: "...to prevent loss or being taken by ___4___.",
        options: ["A. error", "B. accident", "C. fault", "D. mistake"],
        answer: 3,
        feedback: "'By mistake' is a fixed prepositional phrase meaning accidentally or incorrectly. We say 'by mistake' or 'by accident', but 'taken by mistake' is the most natural collocation for luggage."
      },
      {
        type: "Tense / Conjunction",
        blank: 5,
        text: "Services will return to normal immediately after Vietnam Airlines ___5___ the system change.",
        options: ["A. complete", "B. completes", "C. completed", "D. is completing"],
        answer: 1,
        feedback: "In time clauses referring to the future (after 'when', 'after', 'before'), we use the present simple tense, not the future tense. 'After Vietnam Airlines completes' is correct."
      },
      {
        type: "Part of Speech",
        blank: 6,
        text: "Thank you for your companionship and ___6___.",
        options: ["A. considering", "B. consider", "C. considered", "D. consideration"],
        answer: 3,
        feedback: "Parallel structure requires a noun to match 'companionship'. 'Consideration' is the noun form. 'Thank you for your consideration' is a standard formal closing."
      }
    ]
  },
  {
    title: "The LotusDay Spring Program",
    type: "Promotional Email",
    icon: "🌸",
    passage: `Dear Ms NGUYEN TRAN ANH THU,\n\nUnlike the chilly weather of northern Vietnam, the early days of the year in the south are ___1___ in warm sunlight.\n\nFollowing the sediment-rich rivers, the journey through the southern Tet leads you to unique festivals that connect the traditions of the past and present. From the Ky Yen Festival honoring the pioneers who cultivated the land, the mystical Lantern Festival, to the simple ___2___ heartwarming Buffalo Festival and Boat Festival.\n\nIf you're looking for a unique destination for this year's spring journey, southern Vietnam is ready to welcome you. Let Heritage Guide be your trusted ___3___ in this heartful trip.\n\nPlan your Spring trips with The LotusDay program, ___4___ offers up to a 20% discount on miles when redeeming reward tickets or ___5___ tickets with Cash and Miles on Vietnam Airlines' domestic and international flights.\n\nTo learn more about these special offers and start planning your next getaway, please click the link below to ___6___ our free travel guide.`,
    questions: [
      {
        type: "Collocation",
        blank: 1,
        text: "...the early days of the year in the south are ___1___ in warm sunlight.",
        options: ["A. bathed", "B. sunk", "C. dipped", "D. covered"],
        answer: 0,
        feedback: "'Bathed in sunlight' is a common poetic collocation meaning completely covered by or immersed in sunlight."
      },
      {
        type: "Linking Word",
        blank: 2,
        text: "...to the simple ___2___ heartwarming Buffalo Festival...",
        options: ["A. and", "B. yet", "C. so", "D. or"],
        answer: 1,
        feedback: "'Yet' is used here as a conjunction meaning 'but at the same time'. It connects two contrasting but complementary adjectives: 'simple' (basic) and 'heartwarming' (emotionally touching)."
      },
      {
        type: "Vocabulary",
        blank: 3,
        text: "Let Heritage Guide be your trusted ___3___ in this heartful trip.",
        options: ["A. company", "B. companion", "C. partnership", "D. accompaniment"],
        answer: 1,
        feedback: "A 'companion' is a person or entity that accompanies you on a journey. 'Trusted companion' is a frequent collocation in travel marketing."
      },
      {
        type: "Relative Clause",
        blank: 4,
        text: "Plan your Spring trips with The LotusDay program, ___4___ offers up to a 20% discount...",
        options: ["A. who", "B. that", "C. which", "D. where"],
        answer: 2,
        feedback: "In a non-defining relative clause (after a comma) referring to a thing ('program'), 'which' is the correct relative pronoun. 'That' cannot be used after a comma."
      },
      {
        type: "Parallel Structure",
        blank: 5,
        text: "...when redeeming reward tickets or ___5___ tickets with Cash and Miles...",
        options: ["A. purchase", "B. purchased", "C. to purchase", "D. purchasing"],
        answer: 3,
        feedback: "The conjunction 'or' connects two parallel actions. The first is 'redeeming' (gerund), so the second must also be a gerund: 'purchasing'."
      },
      {
        type: "Collocation",
        blank: 6,
        text: "...click the link below to ___6___ our free travel guide.",
        options: ["A. download", "B. upload", "C. install", "D. load"],
        answer: 0,
        feedback: "'Download' is the correct verb for transferring a file (like an ebook or travel guide) from the internet to your device."
      }
    ]
  },
  {
    title: "Traveloka Travel Platform",
    type: "Company Overview",
    icon: "🗺️",
    passage: `Traveloka is Southeast Asia's leading travel platform, ___1___ consumers to explore, book, and enjoy a wide range of travel products. The platform offers extensive transportation options, including flights, buses, trains, car rentals, and airport transfers. Traveloka's accommodation offerings are equally broad, encompassing hotels, apartments, guest houses, resorts, and villas.\n\n___2___, the platform enhances the travel experience by offering cruise packages and access to various local attractions, such as theme parks, museums, and day tours.\n\n___3___ in Indonesia in 2012, Traveloka has expanded its operations to Thailand, Vietnam, Singapore, Malaysia, Australia, and the Philippines. The company is committed to ___4___ exceptional customer service with 24/7 support available in local languages and acceptance of over 40 payment methods.\n\nWith nearly 140 million app downloads and nearly 50 million monthly active users, Traveloka ___5___ as one of the most popular travel apps in the region. For more information, please ___6___ our website.`,
    questions: [
      {
        type: "Participle",
        blank: 1,
        text: "...leading travel platform, ___1___ consumers to explore, book, and enjoy...",
        options: ["A. empower", "B. to empower", "C. empowering", "D. empowered"],
        answer: 2,
        feedback: "'Empowering' is a present participle used to introduce a participial clause that provides additional information about what the platform does. It means 'which empowers'."
      },
      {
        type: "Linking Word",
        blank: 2,
        text: "___2___, the platform enhances the travel experience by offering cruise packages...",
        options: ["A. Additionally", "B. However", "C. Therefore", "D. Nevertheless"],
        answer: 0,
        feedback: "'Additionally' is a conjunctive adverb used to introduce a new, supplementary point that adds to the previous information about accommodation and transport."
      },
      {
        type: "Participle",
        blank: 3,
        text: "___3___ in Indonesia in 2012, Traveloka has expanded its operations...",
        options: ["A. Found", "B. Founded", "C. Finding", "D. To find"],
        answer: 1,
        feedback: "'Founded' is a past participle used in a reduced passive clause. It means 'Because it was founded in Indonesia in 2012'. The verb 'found' (to establish) has the past participle 'founded'."
      },
      {
        type: "Verb Pattern / Gerund",
        blank: 4,
        text: "The company is committed to ___4___ exceptional customer service...",
        options: ["A. provide", "B. provided", "C. providing", "D. provision"],
        answer: 2,
        feedback: "The phrase 'committed to' ends with the preposition 'to', which must be followed by a noun or a gerund (-ing form). Therefore, 'providing' is correct."
      },
      {
        type: "Collocation",
        blank: 5,
        text: "Traveloka ___5___ as one of the most popular travel apps in the region.",
        options: ["A. stays", "B. stands", "C. sits", "D. lies"],
        answer: 1,
        feedback: "'Stands as' is a formal phrase meaning to hold a particular position or status. It is frequently used to describe a company's rank or standing in an industry."
      },
      {
        type: "Collocation",
        blank: 6,
        text: "For more information, please ___6___ our website.",
        options: ["A. visit", "B. go", "C. view", "D. look"],
        answer: 0,
        feedback: "'Visit a website' is the standard verb-noun collocation for going to a website on the internet."
      }
    ]
  },
  {
    title: "Airbnb Privacy Policy Update",
    type: "Notice",
    icon: "🔒",
    passage: `OUR TERMS AND PRIVACY POLICY ARE CHANGING\n\nWe are updating our Terms of Service, Payments Terms of Service, and our Privacy Policy. These updates will support our evolving business and new features, provide additional clarity regarding how personal information is ___1___, and address upcoming laws and regulations.\n\nThe updated Terms and Privacy Policy will generally go into ___2___ for existing users on April 20, 2026. After that date, you will need to agree to the updated Terms and ___3___ the updated Privacy Policy in order to book or manage reservations.\n\nYour use of the Airbnb Platform from that date ___4___ will be subject to the updated Privacy Policy.\n\nIf you disagree ___5___ the updated Terms or Privacy Policy, you may terminate your agreement with Airbnb at any time by deleting your account.\n\nThank you for ___6___ a valued member of our community.`,
    questions: [
      {
        type: "Passive Voice",
        blank: 1,
        text: "...clarity regarding how personal information is ___1___...",
        options: ["A. process", "B. processing", "C. processed", "D. processor"],
        answer: 2,
        feedback: "The sentence requires a passive verb form ('is processed') because personal information receives the action of processing. 'Processed' is the past participle."
      },
      {
        type: "Collocation",
        blank: 2,
        text: "The updated Terms and Privacy Policy will generally go into ___2___ for existing users...",
        options: ["A. force", "B. effect", "C. action", "D. practice"],
        answer: 1,
        feedback: "'Go into effect' is a standard legal/formal phrase meaning to become operational or start to apply. 'Come into force' is also valid, but 'go into force' is less common."
      },
      {
        type: "Vocabulary",
        blank: 3,
        text: "...you will need to agree to the updated Terms and ___3___ the updated Privacy Policy...",
        options: ["A. acknowledge", "B. deny", "C. ignore", "D. forget"],
        answer: 0,
        feedback: "In legal terms, users must 'acknowledge' (accept or recognize the existence of) a privacy policy. It parallels 'agree to' in the context of accepting terms."
      },
      {
        type: "Adverb",
        blank: 4,
        text: "Your use of the Airbnb Platform from that date ___4___ will be subject to...",
        options: ["A. forwards", "B. backward", "C. inward", "D. onward"],
        answer: 3,
        feedback: "'From that date onward' (or onwards) is a fixed expression meaning starting from that date and continuing into the future."
      },
      {
        type: "Preposition",
        blank: 5,
        text: "If you disagree ___5___ the updated Terms or Privacy Policy...",
        options: ["A. to", "B. with", "C. on", "D. about"],
        answer: 1,
        feedback: "'Disagree with' is the correct preposition to use when indicating opposition to a statement, policy, or person."
      },
      {
        type: "Gerund",
        blank: 6,
        text: "Thank you for ___6___ a valued member of our community.",
        options: ["A. be", "B. being", "C. been", "D. to be"],
        answer: 1,
        feedback: "After a preposition like 'for', a verb must take the gerund (-ing) form. 'Being' is the gerund of the verb 'to be'."
      }
    ]
  },
  {
    title: "The Story of Sun PhuQuoc Airways",
    type: "Corporate Profile",
    icon: "✈️",
    passage: `Sun PhuQuoc Airways believes your travel time is just as ___1___ as your vacation time. As a proud member of the Sun Group ecosystem, we bring five-star standards and heartfelt hospitality from the ground to the sky. From the moment you ___2___, you can begin to relax in a comfortable space with ___3___ service — ensuring every minute of your journey is meaningful.\n\nThe name Sun PhuQuoc Airways is more than just a brand; it is a strategic commitment: to ___4___ Phu Quoc into a new symbol of global tourism.\n\nWith every flight we operate, the name "Phu Quoc" is echoed through airports worldwide. Each valued passenger who chooses to fly with us becomes part of a journey that places the Pearl Island in the ___5___ of global travelers. This is how Sun PhuQuoc Airways puts Phu Quoc on the world tourism ___6___ — not just through promises, but through real flight connections and memorable experiences.`,
    questions: [
      {
        type: "Collocation",
        blank: 1,
        text: "Sun PhuQuoc Airways believes your travel time is just as ___1___ as your vacation time.",
        options: ["A. precious", "B. valuable", "C. worthy", "D. costly"],
        answer: 1,
        feedback: "'Valuable' means worth a great deal of money or highly useful/important. In business and travel, 'valuable time' is the standard collocation."
      },
      {
        type: "Phrasal Verb",
        blank: 2,
        text: "From the moment you ___2___, you can begin to relax...",
        options: ["A. take off", "B. take out", "C. take up", "D. take on"],
        answer: 0,
        feedback: "'Take off' is a phrasal verb meaning when an aircraft leaves the ground and begins to fly."
      },
      {
        type: "Collocation",
        blank: 3,
        text: "...you can begin to relax in a comfortable space with ___3___ service...",
        options: ["A. attractive", "B. attentive", "C. intended", "D. intense"],
        answer: 1,
        feedback: "'Attentive service' is a fixed collocation in hospitality, meaning paying close attention to the needs of customers."
      },
      {
        type: "Collocation",
        blank: 4,
        text: "...it is a strategic commitment: to ___4___ Phu Quoc into a new symbol of global tourism.",
        options: ["A. transfer", "B. transmit", "C. transform", "D. translate"],
        answer: 2,
        feedback: "'Transform [A] into [B]' means to make a thorough or dramatic change in form, appearance, or character."
      },
      {
        type: "Fixed Phrase",
        blank: 5,
        text: "...a journey that places the Pearl Island in the ___5___ of global travelers.",
        options: ["A. minds", "B. souls", "C. hands", "D. hearts"],
        answer: 3,
        feedback: "To place or keep something 'in the hearts of' people is a common poetic fixed phrase implying deep affection and emotional attachment."
      },
      {
        type: "Idiom",
        blank: 6,
        text: "This is how Sun PhuQuoc Airways puts Phu Quoc on the world tourism ___6___...",
        options: ["A. map", "B. globe", "C. stage", "D. scale"],
        answer: 0,
        feedback: "To 'put something on the map' is an idiom meaning to make something famous or prominent."
      }
    ]
  },
  {
    title: "Sun World Ba Na Hills",
    type: "Travel Guide",
    icon: "🏰",
    passage: `As part of the Sun World entertainment brand system, located over 20 km from Da Nang city center, Sun World Ba Na Hills is one of Vietnam's ___1___ leisure and entertainment complexes.\n\nPerched at an altitude of 1,487 meters above sea level, it is known as “a fairyland on Earth,” boasting an exceptional climate and ___2___ natural scenery. Visitors can enjoy the experience of four seasons in a single day, along with vibrant festivals, diverse cuisine, and a wide ___3___ of entertainment activities.\n\nThe most iconic attraction is the Golden Bridge – a world-famous architectural masterpiece featuring giant hands gracefully ___4___ a golden pedestrian bridge amid the clouds. It has quickly become a symbol of Vietnamese tourism, widely praised and shared by international media.\n\nAdditionally, the French Village, with its medieval European architecture and the century-old Debay Wine Cellar, are ___5___ destinations for every traveler, offering an experience that will undoubtedly ___6___ your breath away.`,
    questions: [
      {
        type: "Collocation",
        blank: 1,
        text: "...Sun World Ba Na Hills is one of Vietnam's ___1___ leisure and entertainment complexes.",
        options: ["A. premier", "B. primary", "C. primitive", "D. prior"],
        answer: 0,
        feedback: "'Premier' means first in importance, order, or position; leading. It is a very common collocation for luxury destinations."
      },
      {
        type: "Collocation",
        blank: 2,
        text: "...boasting an exceptional climate and ___2___ natural scenery.",
        options: ["A. breathtaking", "B. heartbroken", "C. breathy", "D. breathless"],
        answer: 0,
        feedback: "'Breathtaking scenery' is a very strong and common collocation to describe something extremely beautiful."
      },
      {
        type: "Fixed Phrase",
        blank: 3,
        text: "...along with vibrant festivals, diverse cuisine, and a wide ___3___ of entertainment activities.",
        options: ["A. scale", "B. range", "C. scope", "D. span"],
        answer: 1,
        feedback: "'A wide range of' is a fixed phrase meaning a large number of different things."
      },
      {
        type: "Participle / Verb",
        blank: 4,
        text: "...featuring giant hands gracefully ___4___ a golden pedestrian bridge amid the clouds.",
        options: ["A. rising", "B. raising", "C. lifting", "D. elevating"],
        answer: 2,
        feedback: "'Lifting' implies physically holding or raising up. In descriptions of the Golden Bridge, the hands are lifting the bridge."
      },
      {
        type: "Compound Adjective",
        blank: 5,
        text: "...are ___5___ destinations for every traveler...",
        options: ["A. must-see", "B. must-have", "C. must-do", "D. must-visit"],
        answer: 3,
        feedback: "'Must-visit' is a compound adjective used to describe places that are highly recommended."
      },
      {
        type: "Idiom",
        blank: 6,
        text: "...offering an experience that will undoubtedly ___6___ your breath away.",
        options: ["A. take", "B. catch", "C. hold", "D. lose"],
        answer: 0,
        feedback: "'Take someone's breath away' is an idiom meaning to be extremely beautiful or astonishing."
      }
    ]
  },
  {
    title: "Sun World Fansipan Legend",
    type: "Travel Guide",
    icon: "🏔️",
    passage: `Sun World Fansipan Legend is a world-class resort located in Sa Pa, where magnificent natural beauty ___1___ with rich local culture. Visitors can experience a modern cable car journey conquering Fansipan Peak – the “Roof of Indochina”, admiring the ___2___ view of the majestic Hoang Lien Son mountain range.\n\nThe resort also ___3___ out with its spiritual architecture and unique cultural festivals, offering a perfect blend of modern comfort and Northwest highland traditions.\n\nBeyond being a natural attraction, it is known for its magnificent spiritual complex atop the mountain, including a 21.5-meter-tall bronze statue of Amitabha Buddha. The Fansipan Flagpole is a sacred symbol marking national sovereignty at the ___4___ of the sky.\n\nThe sacred and tranquil atmosphere amidst mountains and clouds makes this a truly special destination that will undoubtedly ___5___ a lasting impression on anyone who sets ___6___ there.`,
    questions: [
      {
        type: "Collocation",
        blank: 1,
        text: "...where magnificent natural beauty ___1___ with rich local culture.",
        options: ["A. mixes", "B. harmonizes", "C. coordinates", "D. relates"],
        answer: 1,
        feedback: "'Harmonizes with' is a sophisticated collocation meaning to blend together perfectly and beautifully."
      },
      {
        type: "Collocation",
        blank: 2,
        text: "...admiring the ___2___ view of the majestic Hoang Lien Son mountain range.",
        options: ["A. panoramic", "B. absolute", "C. overall", "D. universal"],
        answer: 0,
        feedback: "'Panoramic view' is a fixed collocation meaning a wide, unbroken view of an entire surrounding area."
      },
      {
        type: "Phrasal Verb",
        blank: 3,
        text: "The resort also ___3___ out with its spiritual architecture...",
        options: ["A. stands", "B. points", "C. looks", "D. makes"],
        answer: 0,
        feedback: "'Stand out' is a phrasal verb meaning to be much better or more noticeable than other things."
      },
      {
        type: "Fixed Phrase",
        blank: 4,
        text: "...a sacred symbol marking national sovereignty at the ___4___ of the sky.",
        options: ["A. top", "B. height", "C. peak", "D. roof"],
        answer: 0,
        feedback: "'At the top of' is the correct phrase. While 'peak' and 'roof' are synonyms, 'top of the sky' is a poetic fixed phrase used here."
      },
      {
        type: "Collocation",
        blank: 5,
        text: "...a truly special destination that will undoubtedly ___5___ a lasting impression...",
        options: ["A. do", "B. take", "C. leave", "D. make"],
        answer: 2,
        feedback: "'Leave a lasting impression' is a strong collocation meaning to create a memory that will not be easily forgotten."
      },
      {
        type: "Idiom",
        blank: 6,
        text: "...on anyone who sets ___6___ there.",
        options: ["A. foot", "B. eye", "C. heart", "D. hand"],
        answer: 0,
        feedback: "'Set foot' is an idiom meaning to go to or enter a place."
      }
    ]
  },
  {
    title: "Sun World Ha Long",
    type: "Travel Guide",
    icon: "🎢",
    passage: `Located along the shores of the World Heritage Site – Ha Long Bay, Sun World Ha Long is an international-class resort and entertainment complex. It features two theme parks: Dragon Park, ___1___ to thrilling adventure rides, and Typhoon Water Park – a summer paradise filled with exciting water slides.\n\nThe two areas are connected by the unique Queen Cable Car system, offering breathtaking views of the bay. Sun World Ha Long boasts impressive landmarks such as the tranquil Japanese Garden and the iconic Sun Wheel, promising a ___2___ experience for every visitor.\n\nDragon Park brings together over 20 world-class adventure rides. From high-speed roller coasters to giant swings, this is the ___3___ destination for thrill-seekers and excitement lovers.\n\nMystic Mountain is a harmonious ___4___ of nature, culture, and spirituality. It features the striking red Koi Bridge and the ancient Bao Hai Linh Thong Pagoda. Don't ___5___ out on Sun Peak – one of Ha Long’s most stunning sunset viewpoints that will truly ___6___ your mind.`,
    questions: [
      {
        type: "Fixed Phrase",
        blank: 1,
        text: "It features two theme parks: Dragon Park, ___1___ to thrilling adventure rides...",
        options: ["A. house", "B. home", "C. place", "D. base"],
        answer: 1,
        feedback: "'Home to' is a very common fixed phrase in travel writing meaning a place where something is located or housed."
      },
      {
        type: "Collocation",
        blank: 2,
        text: "...promising a ___2___ experience for every visitor.",
        options: ["A. fulfilling", "B. filled", "C. full", "D. filling"],
        answer: 0,
        feedback: "'A fulfilling experience' is a collocation meaning an experience that brings happiness and satisfaction."
      },
      {
        type: "Collocation",
        blank: 3,
        text: "...this is the ___3___ destination for thrill-seekers and excitement lovers.",
        options: ["A. supreme", "B. terminal", "C. ultimate", "D. absolute"],
        answer: 2,
        feedback: "'The ultimate destination' is a strong collocation meaning the best or most extreme example of its kind."
      },
      {
        type: "Collocation",
        blank: 4,
        text: "Mystic Mountain is a harmonious ___4___ of nature, culture, and spirituality.",
        options: ["A. mixture", "B. combination", "C. blend", "D. compound"],
        answer: 2,
        feedback: "'A harmonious blend' is a highly idiomatic collocation meaning different things coming together perfectly."
      },
      {
        type: "Phrasal Verb",
        blank: 5,
        text: "Don't ___5___ out on Sun Peak...",
        options: ["A. miss", "B. drop", "C. leave", "D. pass"],
        answer: 0,
        feedback: "'Miss out on' is a phrasal verb meaning to fail to use an opportunity to enjoy or get an advantage from something."
      },
      {
        type: "Idiom",
        blank: 6,
        text: "...one of Ha Long’s most stunning sunset viewpoints that will truly ___6___ your mind.",
        options: ["A. blow", "B. open", "C. change", "D. cross"],
        answer: 0,
        feedback: "'Blow someone's mind' is an idiom meaning to strongly affect someone with surprise or wonder."
      }
    ]
  },
  {
    title: "Symphony of the Sea",
    type: "Event Review",
    icon: "🎆",
    passage: `“Symphony of the Sea” is a large-scale multimedia art show organized by Sun Group in Phu Quoc. The performance ___1___ multiple art forms: jetski displays, laser light effects, water-based fireworks, and a soundtrack blending modern music with traditional Vietnamese elements.\n\nSet outdoors with a sea-facing stage, the show delivers a unique experience that merges art and nature. It is considered one of the premier entertainment offerings, ___2___ the nighttime tourism experience in the region to new heights.\n\nThe outdoor stage is harmoniously integrated with nature, and is especially spectacular at sunset. A wide ___3___ of innovative fireworks are launched from the water, with hundreds of bursts each show. The soundtrack is carefully ___4___, featuring modern music blended with traditional melodies like "Me yeu con", creating a deeply emotional experience that will ___5___ a chord with the audience. This show is truly a feast for the ___6___.`,
    questions: [
      {
        type: "Verb / Collocation",
        blank: 1,
        text: "The performance ___1___ multiple art forms...",
        options: ["A. consists", "B. contains", "C. composes", "D. combines"],
        answer: 3,
        feedback: "'Combines' is the most natural verb here. 'Consists' would require 'of'. 'Contains' implies holding inside, whereas 'combines' implies putting different things together."
      },
      {
        type: "Collocation",
        blank: 2,
        text: "...___2___ the nighttime tourism experience in the region to new heights.",
        options: ["A. raising", "B. lifting", "C. elevating", "D. escalating"],
        answer: 2,
        feedback: "'Elevating [something] to new heights' is a sophisticated collocation used to describe making something better or more advanced."
      },
      {
        type: "Fixed Phrase",
        blank: 3,
        text: "A wide ___3___ of innovative fireworks are launched from the water...",
        options: ["A. range", "B. variety", "C. collection", "D. assortment"],
        answer: 1,
        feedback: "'A wide variety of' is a fixed phrase meaning many different types. 'A wide range of' is also possible, but 'variety' is often preferred for distinct creative types."
      },
      {
        type: "Collocation",
        blank: 4,
        text: "The soundtrack is carefully ___4___...",
        options: ["A. curated", "B. collected", "C. gathered", "D. assembled"],
        answer: 0,
        feedback: "'Carefully curated' is a common collocation referring to content (like music, art, or articles) that is carefully chosen and organized."
      },
      {
        type: "Idiom",
        blank: 5,
        text: "...creating a deeply emotional experience that will ___5___ a chord with the audience.",
        options: ["A. hit", "B. strike", "C. play", "D. touch"],
        answer: 1,
        feedback: "'Strike a chord' is an idiom meaning to cause someone to feel sympathy, emotion, or enthusiasm."
      },
      {
        type: "Idiom",
        blank: 6,
        text: "This show is truly a feast for the ___6___.",
        options: ["A. eyes", "B. senses", "C. soul", "D. mind"],
        answer: 1,
        feedback: "'A feast for the senses' is a well-known idiom to describe something that is extremely pleasant to see, hear, taste, touch, or smell."
      }
    ]
  },
  {
    title: "Careers at Singapore Airlines",
    type: "Corporate Profile",
    icon: "✈️",
    passage: `As the world's most awarded airline, Singapore Airlines (SIA) leads the way in global aviation, delivering extraordinary travel experiences while staying ___1___ to safety, excellence, and innovation.\n\nAt SIA, we believe in empowering and developing our people to ___2___. We invest in our people's growth, and our dynamic and supportive work environment inspires each team member to reach their ___3___ potential and contribute ___4___ the continued success of our airline.\n\nWe are always looking for passionate, talented individuals to join SIA. Whether you aspire to soar through the clouds as a pilot, deliver world-class service as a cabin crew, or work behind the ___5___ to keep our operations running smoothly as a ground professional, you can find your ___6___ with us.\n\nSoar higher together with us and explore career opportunities at SIA.`,
    questions: [
      {
        type: "Collocation",
        blank: 1,
        text: "...delivering extraordinary travel experiences while staying ___1___ to safety...",
        options: ["A. involved", "B. devoted", "C. committed", "D. attached"],
        answer: 2,
        feedback: "'Committed to' is the standard collocation meaning dedicated or pledged to a cause, policy, or action."
      },
      {
        type: "Vocabulary",
        blank: 2,
        text: "At SIA, we believe in empowering and developing our people to ___2___.",
        options: ["A. thrive", "B. raise", "C. rise", "D. boost"],
        answer: 0,
        feedback: "'Thrive' means to grow, develop well, or prosper. It is commonly used in corporate texts to describe employees succeeding."
      },
      {
        type: "Collocation",
        blank: 3,
        text: "...inspires each team member to reach their ___3___ potential...",
        options: ["A. highest", "B. fullest", "C. largest", "D. biggest"],
        answer: 1,
        feedback: "'Fullest potential' (or 'full potential') is the correct collocation. We don't say 'highest potential' in this context."
      },
      {
        type: "Preposition",
        blank: 4,
        text: "...and contribute ___4___ the continued success of our airline.",
        options: ["A. for", "B. in", "C. to", "D. with"],
        answer: 2,
        feedback: "'Contribute to' is the correct prepositional verb."
      },
      {
        type: "Idiom",
        blank: 5,
        text: "...or work behind the ___5___ to keep our operations running smoothly...",
        options: ["A. doors", "B. curtains", "C. scenes", "D. stages"],
        answer: 2,
        feedback: "'Behind the scenes' is an idiom meaning out of sight of the public."
      },
      {
        type: "Idiom / Metaphor",
        blank: 6,
        text: "...you can find your ___6___ with us.",
        options: ["A. wings", "B. flights", "C. skies", "D. paths"],
        answer: 0,
        feedback: "'Find your wings' is a metaphor/idiom meaning to discover your abilities and gain independence, fitting perfectly for an airline."
      }
    ]
  },
  {
    title: "MSc Program in Climate-AI",
    type: "Academic Program",
    icon: "🎓",
    passage: `The MSc in Climate-AI Convergence Program was ___1___ in 2026 as a new interdisciplinary graduate program at Hallym University for the KOICA NEXT Fellowship. The program is designed to ___2___ future leaders who can address global climate change challenges through advanced education in climate technology and AI convergence.\n\nThe curriculum focuses on climate change, climate-tech, data and AI applications, and global development cooperation. Students engage in climate-tech capstone design projects and internship opportunities while also receiving Korean language and cultural education to support their academic and social ___3___ in Korea.\n\nThe program offers integrated ___4___ on climate innovation, sustainable development, and practical solutions for global climate challenges.\n\nObjectives:\nTo nurture future professionals in climate technology and AI convergence with an emphasis on the following capacities:\n1) Understanding climate change, climate technology, and AI-based approaches to address global climate challenges.\n2) Designing and applying practical climate-tech solutions ___5___ interdisciplinary learning, capstone design projects, and internship experience.\n3) Contributing to sustainable development and global cooperation by developing the knowledge and skills needed for climate innovation, international collaboration, and real-world problem ___6___.`,
    questions: [
      {
        type: "Vocabulary",
        blank: 1,
        text: "The MSc in Climate-AI Convergence Program was ___1___ in 2026...",
        options: ["A. started", "B. introduced", "C. launched", "D. released"],
        answer: 2,
        feedback: "'Launched' is the most appropriate and professional term for officially starting a new academic program or initiative."
      },
      {
        type: "Vocabulary",
        blank: 2,
        text: "The program is designed to ___2___ future leaders...",
        options: ["A. nurture", "B. grow", "C. breed", "D. rear"],
        answer: 0,
        feedback: "'Nurture' means to care for and encourage the growth or development of someone. It is widely used in education for developing talent."
      },
      {
        type: "Vocabulary",
        blank: 3,
        text: "...to support their academic and social ___3___ in Korea.",
        options: ["A. adjustment", "B. adaptation", "C. adoption", "D. attachment"],
        answer: 1,
        feedback: "'Adaptation' refers to the process of becoming adjusted to new conditions, such as living in a new country."
      },
      {
        type: "Vocabulary",
        blank: 4,
        text: "The program offers integrated ___4___ on climate innovation...",
        options: ["A. views", "B. perspectives", "C. opinions", "D. sights"],
        answer: 1,
        feedback: "'Perspectives' refers to points of view or ways of looking at things. 'Integrated perspectives' is a common academic phrase."
      },
      {
        type: "Preposition",
        blank: 5,
        text: "...applying practical climate-tech solutions ___5___ interdisciplinary learning...",
        options: ["A. by", "B. through", "C. across", "D. with"],
        answer: 1,
        feedback: "'Through' is used to indicate the means or process by which something is achieved."
      },
      {
        type: "Collocation",
        blank: 6,
        text: "...knowledge and skills needed for [...] real-world problem ___6___.",
        options: ["A. fixing", "B. dealing", "C. solving", "D. resolving"],
        answer: 2,
        feedback: "'Problem solving' is a fixed compound noun/collocation."
      }
    ]
  },
  {
    title: "Mekong River Delta Aquifer",
    type: "Environmental Report",
    icon: "💧",
    passage: `The lower section of the Mekong River Basin is underlain by a major transboundary aquifer system, shared by Cambodia and Viet Nam, known ___1___ the Cambodia-Mekong River Delta Aquifer (CMDA). This transboundary aquifer connects two ecosystems of global environmental ___2___ and socio-economic importance, namely the Tonle Sap area and the Mekong Delta, and includes major urban areas, including the cities of Phnom Penh and Ho Chi Minh.\n\nAround 35 million people live in the CMDA recharge zone, and the vast ___3___ of households depend on groundwater for drinking or for irrigation. However, groundwater management is hindered by over-extraction, loss of recharge zones, climate change, pollution, salinity intrusion and land ___4___. In this context, transboundary solutions are paramount to ___5___ the mounting challenges.\n\nUNESCO is an Executing Agency for the project 'Enhancing sustainability of the Transboundary Cambodia-Mekong River Delta Aquifer', funded by the Global Environmental Facility (GEF) and ___6___ by The Food and Agriculture Organization (FAO).`,
    questions: [
      {
        type: "Preposition",
        blank: 1,
        text: "...shared by Cambodia and Viet Nam, known ___1___ the Cambodia-Mekong River Delta Aquifer...",
        options: ["A. like", "B. as", "C. to", "D. for"],
        answer: 1,
        feedback: "'Known as' is the correct phrase used to indicate what something is called."
      },
      {
        type: "Vocabulary",
        blank: 2,
        text: "...connects two ecosystems of global environmental ___2___ and socio-economic importance...",
        options: ["A. significance", "B. meaning", "C. attention", "D. display"],
        answer: 0,
        feedback: "'Environmental significance' means environmental importance or consequence. It parallels 'socio-economic importance'."
      },
      {
        type: "Collocation",
        blank: 3,
        text: "...and the vast ___3___ of households depend on groundwater...",
        options: ["A. amount", "B. majority", "C. quantity", "D. number"],
        answer: 1,
        feedback: "'The vast majority' is a strong, fixed collocation meaning almost all of something."
      },
      {
        type: "Collocation",
        blank: 4,
        text: "...pollution, salinity intrusion and land ___4___.",
        options: ["A. sink", "B. subsidence", "C. slide", "D. drop"],
        answer: 1,
        feedback: "'Land subsidence' is a specific geographical term for the gradual settling or sudden sinking of the Earth's surface."
      },
      {
        type: "Collocation",
        blank: 5,
        text: "...transboundary solutions are paramount to ___5___ the mounting challenges.",
        options: ["A. address", "B. solve", "C. focus", "D. aim"],
        answer: 0,
        feedback: "'Address a challenge' or 'address a problem' is the formal collocation for dealing with an issue."
      },
      {
        type: "Vocabulary",
        blank: 6,
        text: "...funded by the Global Environmental Facility (GEF) and ___6___ by The Food and Agriculture Organization (FAO).",
        options: ["A. executed", "B. operated", "C. implemented", "D. performed"],
        answer: 2,
        feedback: "In project management and international organizations, projects are 'funded' by one body and 'implemented' by another."
      }
    ]
  },
  {
    title: "What is Hantavirus?",
    type: "Science & Health",
    icon: "🦠",
    passage: `Hantavirus is in the Hantaviridae family of viruses carried by rodents. The animals ___1___ the virus without becoming ill, then shed it in their urine, droppings, and saliva. When those secretions are disturbed—during cleaning, farming, or simply entering an infested space—the virus can become aerosolized and ___2___ by a nearby human. The virus can also infect humans if they eat contaminated food, or touch a contaminated object and then their mouth.\n\nMore than 40 species of hantavirus exist in nature, and they're broadly ___3___ into two categories—Old World and New World. Old World hantaviruses are ___4___ in Europe and Asia and primarily cause bleeding disorders and kidney dysfunction. New World viruses are more ___5___ in the Americas and more commonly cause pulmonary edema, a condition in which fluid ___6___ in the lungs.`,
    questions: [
      {
        type: "Vocabulary",
        blank: 1,
        text: "The animals ___1___ the virus without becoming ill...",
        options: ["A. hide", "B. harbor", "C. keep", "D. maintain"],
        answer: 1,
        feedback: "'Harbor' in biology/medicine means to carry a disease or virus without necessarily showing symptoms."
      },
      {
        type: "Vocabulary",
        blank: 2,
        text: "...the virus can become aerosolized and ___2___ by a nearby human.",
        options: ["A. breathed", "B. inhaled", "C. swallowed", "D. absorbed"],
        answer: 1,
        feedback: "'Inhaled' is the specific medical term for breathing something into the lungs."
      },
      {
        type: "Vocabulary",
        blank: 3,
        text: "...and they're broadly ___3___ into two categories...",
        options: ["A. separated", "B. classified", "C. divided", "D. broken"],
        answer: 2,
        feedback: "'Divided into' is the correct prepositional verb used for categorizing groups."
      },
      {
        type: "Vocabulary",
        blank: 4,
        text: "Old World hantaviruses are ___4___ in Europe and Asia...",
        options: ["A. endemic", "B. epidemic", "C. pandemic", "D. local"],
        answer: 0,
        feedback: "'Endemic' refers to a disease that is regularly found among particular people or in a certain area."
      },
      {
        type: "Vocabulary",
        blank: 5,
        text: "New World viruses are more ___5___ in the Americas...",
        options: ["A. frequent", "B. dominant", "C. prevalent", "D. widespread"],
        answer: 2,
        feedback: "'Prevalent' means widespread in a particular area or at a particular time, specifically used for diseases and conditions."
      },
      {
        type: "Vocabulary",
        blank: 6,
        text: "...a condition in which fluid ___6___ in the lungs.",
        options: ["A. gathers", "B. collects", "C. assembles", "D. accumulates"],
        answer: 3,
        feedback: "'Accumulates' is the standard medical term for the gradual gathering of fluid in the body."
      }
    ]
  },
  {
    title: "Super El Nino Prediction",
    type: "Science & Weather",
    icon: "🌡️",
    passage: `Forecasters are increasingly predicting the possibility that a powerful “super El Nino” will take ___1___ this year. The phenomenon, which could be the strongest El Nino in at least a decade, may spur ___2___ drought in some regions and severe storms in others, while also causing the Earth's temperature to rise.\n\nThe National Oceanic and Atmospheric Administration predicted this week with growing ___3___ that El Nino could begin this spring or summer. The latest report added that there is a 25 percent chance of a “very strong” El Nino and a 50 percent chance of a “strong” El Nino, with Pacific Ocean temperatures rising to at least 1.5 degrees Celsius warmer than ___4___.\n\nThe phenomenon—which typically occurs every two to seven years—is often characterized by chaos because it ___5___ global weather and introduces new extremes. Yet some scientists paradoxically view it as a chance to prepare for what's to ___6___.`,
    questions: [
      {
        type: "Collocation",
        blank: 1,
        text: "...a powerful “super El Nino” will take ___1___ this year.",
        options: ["A. place", "B. part", "C. effect", "D. action"],
        answer: 2,
        feedback: "'Take effect' means to come into force or start operating/happening."
      },
      {
        type: "Collocation",
        blank: 2,
        text: "...may spur ___2___ drought in some regions and severe storms in others...",
        options: ["A. hurting", "B. punishing", "C. damaging", "D. hitting"],
        answer: 1,
        feedback: "'Punishing drought' is a strong collocation used in journalism to describe extremely severe and harmful dry periods."
      },
      {
        type: "Collocation",
        blank: 3,
        text: "...predicted this week with growing ___3___ that El Nino could begin...",
        options: ["A. belief", "B. trust", "C. faith", "D. confidence"],
        answer: 3,
        feedback: "'Growing confidence' is a standard phrase used in forecasting when models begin to align and certainty increases."
      },
      {
        type: "Fixed Phrase",
        blank: 4,
        text: "...temperatures rising to at least 1.5 degrees Celsius warmer than ___4___.",
        options: ["A. normal", "B. usual", "C. standard", "D. average"],
        answer: 3,
        feedback: "'Warmer than average' is the specific meteorological term used to compare current temperatures to historical baselines."
      },
      {
        type: "Vocabulary",
        blank: 5,
        text: "...because it ___5___ global weather and introduces new extremes.",
        options: ["A. shifts", "B. turns", "C. moves", "D. switches"],
        answer: 0,
        feedback: "'Shifts' means to change position or direction. El Nino causes global weather patterns to shift."
      },
      {
        type: "Idiom",
        blank: 6,
        text: "Yet some scientists paradoxically view it as a chance to prepare for what's to ___6___.",
        options: ["A. come", "B. go", "C. happen", "D. occur"],
        answer: 0,
        feedback: "'What's to come' is an idiomatic expression referring to future events."
      }
    ]
  },
  {
    title: "Tsinghua Summer School",
    type: "Academic Program",
    icon: "🇨🇳",
    passage: `Summer schools are an ___1___ part of the mission of School of Environment (SOE), Tsinghua University to promote cross-cultural communication and global connections. They provide a valuable ___2___ for students across the globe to better connect with China, academically and culturally, and to expand their ___3___. Alongside the interdisciplinary-focused International Summer School, SOE ___4___ many subject-oriented summer schools that enable students to focus ___5___ their learning and connect with professors and peers in the environmental ___6___.`,
    questions: [
      {
        type: "Collocation",
        blank: 1,
        text: "Summer schools are an ___1___ part of the mission...",
        options: ["A. essential", "B. integral", "C. absolute", "D. entire"],
        answer: 1,
        feedback: "'Integral part' is a strong collocation meaning a necessary and important part of a whole."
      },
      {
        type: "Collocation",
        blank: 2,
        text: "They provide a valuable ___2___ for students across the globe...",
        options: ["A. stage", "B. platform", "C. forum", "D. ground"],
        answer: 1,
        feedback: "'Provide a platform' means to give an opportunity for people to do something or express themselves."
      },
      {
        type: "Idiom",
        blank: 3,
        text: "...and to expand their ___3___.",
        options: ["A. limits", "B. boundaries", "C. horizons", "D. borders"],
        answer: 2,
        feedback: "'Expand one's horizons' is an idiom meaning to increase the range of one's knowledge, understanding, or experience."
      },
      {
        type: "Vocabulary",
        blank: 4,
        text: "...SOE ___4___ many subject-oriented summer schools...",
        options: ["A. holds", "B. hosts", "C. throws", "D. keeps"],
        answer: 1,
        feedback: "Institutions typically 'host' events, programs, or summer schools."
      },
      {
        type: "Preposition",
        blank: 5,
        text: "...that enable students to focus ___5___ their learning...",
        options: ["A. in", "B. at", "C. on", "D. to"],
        answer: 2,
        feedback: "'Focus on' is the correct prepositional verb."
      },
      {
        type: "Collocation",
        blank: 6,
        text: "...connect with professors and peers in the environmental ___6___.",
        options: ["A. field", "B. area", "C. sector", "D. region"],
        answer: 0,
        feedback: "'Environmental field' or 'field of study' is the standard way to refer to an area of academic or professional specialization."
      }
    ]
  },
  {
    title: "Vietnam School of Science",
    type: "Application Guide",
    icon: "🇻🇳",
    passage: `Submit your application to the Vietnam School of Science.\nThe school invites candidates to apply ___1___ official students. Admission is ___2___ — please read all instructions carefully and submit on time. Late applications are not accepted for any ___3___. A selection committee reviews all profiles and only the ___4___ candidates are invited.\n\nAttendance, meals during school days, and a certificate of completion are all free of ___5___. A limited ___6___ of travel grants are available for students far from Quy Nhon who face financial difficulty.`,
    questions: [
      {
        type: "Preposition",
        blank: 1,
        text: "The school invites candidates to apply ___1___ official students.",
        options: ["A. like", "B. as", "C. for", "D. to"],
        answer: 1,
        feedback: "'Apply as [role/title]' is the correct preposition to state the position you are applying for."
      },
      {
        type: "Vocabulary",
        blank: 2,
        text: "Admission is ___2___ — please read all instructions carefully...",
        options: ["A. competent", "B. competitive", "C. competing", "D. competed"],
        answer: 1,
        feedback: "'Competitive' admission means many people apply for a limited number of spots, requiring strong qualifications."
      },
      {
        type: "Fixed Phrase",
        blank: 3,
        text: "Late applications are not accepted for any ___3___.",
        options: ["A. excuse", "B. purpose", "C. cause", "D. reason"],
        answer: 3,
        feedback: "'For any reason' is a fixed phrase used to emphasize an absolute rule or condition."
      },
      {
        type: "Collocation",
        blank: 4,
        text: "...and only the ___4___ candidates are invited.",
        options: ["A. strongest", "B. toughest", "C. heaviest", "D. hardest"],
        answer: 0,
        feedback: "In academic and professional contexts, highly qualified applicants are referred to as 'strong candidates'."
      },
      {
        type: "Idiom / Fixed Phrase",
        blank: 5,
        text: "...are all free of ___5___.",
        options: ["A. cost", "B. fee", "C. charge", "D. price"],
        answer: 2,
        feedback: "'Free of charge' is a formal, fixed phrase meaning costing nothing."
      },
      {
        type: "Collocation",
        blank: 6,
        text: "A limited ___6___ of travel grants are available...",
        options: ["A. amount", "B. number", "C. quantity", "D. deal"],
        answer: 1,
        feedback: "Grants are countable nouns, so we use 'a number of'. 'Amount' is for uncountable nouns."
      }
    ]
  },
  {
    title: "University Disability Resources",
    type: "Policy Overview",
    icon: "🏛️",
    passage: `Harvard University Disability Resources (UDR) welcomes students, faculty, researchers, staff, and visitors with disabilities. UDR values disability as ___1___ to our rich diversity and provides leadership to University efforts to ___2___ an accessible, inclusive welcoming learning and working environment for individuals with disabilities while complying ___3___ federal and state regulations.\n\nUDR serves ___4___ a central resource on disability-related information, procedures and services for the University community and provides ___5___ in the development, implementation, and acquisition for best and promising disability-related University ___6___, procedures and resources.`,
    questions: [
      {
        type: "Collocation",
        blank: 1,
        text: "UDR values disability as ___1___ to our rich diversity...",
        options: ["A. related", "B. integral", "C. combined", "D. attached"],
        answer: 1,
        feedback: "'Integral to' means being an essential or fundamental part of something."
      },
      {
        type: "Vocabulary",
        blank: 2,
        text: "...and provides leadership to University efforts to ___2___ an accessible... environment...",
        options: ["A. assure", "B. ensure", "C. insure", "D. secure"],
        answer: 1,
        feedback: "'Ensure' means to make certain that something will happen or be available."
      },
      {
        type: "Preposition",
        blank: 3,
        text: "...while complying ___3___ federal and state regulations.",
        options: ["A. to", "B. by", "C. with", "D. on"],
        answer: 2,
        feedback: "'Comply with' is the correct prepositional verb meaning to act in accordance with a rule or law."
      },
      {
        type: "Preposition",
        blank: 4,
        text: "UDR serves ___4___ a central resource...",
        options: ["A. like", "B. as", "C. for", "D. into"],
        answer: 1,
        feedback: "'Serve as' is used to describe the role, function, or purpose of a person or thing."
      },
      {
        type: "Vocabulary",
        blank: 5,
        text: "...and provides ___5___ in the development, implementation...",
        options: ["A. experience", "B. experiment", "C. expertise", "D. expectation"],
        answer: 2,
        feedback: "'Expertise' refers to expert skill or knowledge in a particular field, which is what a specialized department provides."
      },
      {
        type: "Collocation",
        blank: 6,
        text: "...acquisition for best and promising disability-related University ___6___...",
        options: ["A. practices", "B. habits", "C. customs", "D. actions"],
        answer: 0,
        feedback: "'University practices' or 'best practices' refer to established, effective methods or procedures used within an institution."
      }
    ]
  },
  {
    title: "TED Virtual Summer School",
    type: "Course Description",
    icon: "🗣️",
    passage: `A transformative two-week online experience for students aged 14–18, designed to help them ___1___ meaningful ideas and communicate them with ___2___ through TED's student-focused curriculum and live virtual teaching.\n\nTED Virtual Summer School brings the ___3___ transformative experience to students anywhere in the world. Through a powerful ___4___ of daily, small-group, live online sessions and flexible, self-paced learning, participants follow TED's ___5___ learning journey, developing meaningful ideas and learning to express them with clarity and ___6___.`,
    questions: [
      {
        type: "Vocabulary",
        blank: 1,
        text: "...designed to help them ___1___ meaningful ideas...",
        options: ["A. invent", "B. uncover", "C. recover", "D. unfold"],
        answer: 1,
        feedback: "'Uncover' means to discover or find something that was hidden or unknown. TED focuses on uncovering ideas."
      },
      {
        type: "Noun Form",
        blank: 2,
        text: "...and communicate them with ___2___...",
        options: ["A. clear", "B. cleanly", "C. clarity", "D. clearness"],
        answer: 2,
        feedback: "'Clarity' is the noun form of clear, meaning the quality of being coherent and easy to understand."
      },
      {
        type: "Collocation",
        blank: 3,
        text: "TED Virtual Summer School brings the ___3___ transformative experience...",
        options: ["A. center", "B. heart", "C. core", "D. middle"],
        answer: 2,
        feedback: "'Core experience' refers to the central, most important part of the program."
      },
      {
        type: "Collocation",
        blank: 4,
        text: "Through a powerful ___4___ of daily, small-group, live online sessions...",
        options: ["A. mix", "B. blend", "C. union", "D. fusion"],
        answer: 1,
        feedback: "'A blend of' is a common and professional way to describe a combination of different learning methods."
      },
      {
        type: "Collocation",
        blank: 5,
        text: "...participants follow TED's ___5___ learning journey...",
        options: ["A. guided", "B. lead", "C. directed", "D. steered"],
        answer: 0,
        feedback: "'Guided journey' or 'guided learning' implies structured support and direction provided by experts."
      },
      {
        type: "Collocation",
        blank: 6,
        text: "...learning to express them with clarity and ___6___.",
        options: ["A. confident", "B. confidence", "C. confidently", "D. confide"],
        answer: 1,
        feedback: "'Confidence' is the noun form. The phrase 'with clarity and confidence' is a strong parallel structure."
      }
    ]
  },
  {
    title: "Global Youth MIDORI Platform",
    type: "Environmental Initiative",
    icon: "🌱",
    passage: `The Global Youth MIDORI platform (GYM) was ___1___ in 2024 by UNU-IAS and the AEON Environmental Foundation. It aims to empower youth to take a ___2___ role in developing solutions to local and global environmental ___3___. Since its launch, GYM has engaged 33 students from 13 countries.\n\nGYM offers a ___4___ of learning, capacity-building and networking opportunities to ___5___ young people with the skills and knowledge needed to address biodiversity loss, climate change and other sustainability challenges. The programme is also a platform for participants to connect with other youth and provides support for their continued ___6___ and future activities.`,
    questions: [
      {
        type: "Vocabulary",
        blank: 1,
        text: "The Global Youth MIDORI platform (GYM) was ___1___ in 2024 by UNU-IAS...",
        options: ["A. thrown", "B. launched", "C. released", "D. opened"],
        answer: 1,
        feedback: "Programs, platforms, and initiatives are 'launched' when they are officially started."
      },
      {
        type: "Collocation",
        blank: 2,
        text: "It aims to empower youth to take a ___2___ role in developing solutions...",
        options: ["A. head", "B. front", "C. leading", "D. first"],
        answer: 2,
        feedback: "'Take a leading role' is a standard collocation meaning to take the most important or active part in an effort."
      },
      {
        type: "Collocation",
        blank: 3,
        text: "...to local and global environmental ___3___.",
        options: ["A. contests", "B. challenges", "C. disputes", "D. matches"],
        answer: 1,
        feedback: "'Environmental challenges' is the formal term for pressing problems or issues concerning the environment."
      },
      {
        type: "Fixed Phrase",
        blank: 4,
        text: "GYM offers a ___4___ of learning, capacity-building and networking opportunities...",
        options: ["A. range", "B. row", "C. scale", "D. line"],
        answer: 0,
        feedback: "'A range of' means a variety or set of different things."
      },
      {
        type: "Verb Pattern",
        blank: 5,
        text: "...to ___5___ young people with the skills and knowledge needed...",
        options: ["A. supply", "B. provide", "C. arm", "D. equip"],
        answer: 3,
        feedback: "'Equip someone with' is the specific verb pattern used for giving someone the skills or tools necessary to do a task."
      },
      {
        type: "Vocabulary",
        blank: 6,
        text: "...provides support for their continued ___6___ and future activities.",
        options: ["A. engagement", "B. agreement", "C. attachment", "D. appointment"],
        answer: 0,
        feedback: "'Engagement' refers to active involvement or participation in a project, cause, or community."
      }
    ]
  },
  {
    title: "UNESCO80: A Stronger Organization",
    type: "Organizational Review",
    icon: "🕊️",
    passage: `For the past 80 years, UNESCO has played a ___1___ role within the multilateral system, thanks to its people, its expertise, and its global networks.\n\nToday, however, expectations are high, and the context is demanding. Resources are constrained, while needs continue to ___2___. Yet this moment also offers a valuable opportunity to reflect on what makes UNESCO effective, to sharpen its priorities, and to reinforce its ___3___.\n\nThis is the spirit of UNESCO80, a forward-looking, evidence-based reflection ___4___ with the broader UN80 process. Its purpose is simple and constructive: to help us work better together, strengthen our impact, and ensure that our efforts ___5___ into real benefits – ___6___ the people.`,
    questions: [
      {
        type: "Collocation",
        blank: 1,
        text: "UNESCO has played a ___1___ role within the multilateral system...",
        options: ["A. single", "B. unique", "C. sole", "D. individual"],
        answer: 1,
        feedback: "'Play a unique role' is a common collocation meaning to have a special and irreplaceable function or position."
      },
      {
        type: "Vocabulary",
        blank: 2,
        text: "Resources are constrained, while needs continue to ___2___.",
        options: ["A. grow", "B. expand", "C. enlarge", "D. stretch"],
        answer: 0,
        feedback: "'Needs continue to grow' is the most natural collocation. While 'expand' is possible, 'grow' is the standard verb used with 'needs' in this context."
      },
      {
        type: "Vocabulary",
        blank: 3,
        text: "...to sharpen its priorities, and to reinforce its ___3___.",
        options: ["A. relation", "B. relevance", "C. reliance", "D. reserve"],
        answer: 1,
        feedback: "'Reinforce its relevance' means to strengthen its importance and applicability to current situations."
      },
      {
        type: "Participle Clause",
        blank: 4,
        text: "...a forward-looking, evidence-based reflection ___4___ with the broader UN80 process.",
        options: ["A. aligned", "B. associated", "C. combined", "D. attached"],
        answer: 0,
        feedback: "'Aligned with' is the correct past participle phrase meaning 'in agreement or cooperation with'."
      },
      {
        type: "Verb Pattern",
        blank: 5,
        text: "...ensure that our efforts ___5___ into real benefits...",
        options: ["A. transfer", "B. transport", "C. translate", "D. transmit"],
        answer: 2,
        feedback: "To 'translate into' means to lead to or result in a particular outcome."
      },
      {
        type: "Preposition",
        blank: 6,
        text: "...translate into real benefits – ___6___ the people.",
        options: ["A. to", "B. for", "C. with", "D. by"],
        answer: 1,
        feedback: "'Benefits for the people' indicates who will receive or experience the positive outcomes."
      }
    ]
  },
  {
    title: "Korea Youth Summit 2026",
    type: "Event Overview",
    icon: "🤝",
    passage: `Korea Youth Summit (KYS) 2026 is an international cultural exchange and leadership program organized by Youth Break the Boundaries (YBB) Foundation. The summit is dedicated to ___1___ emerging leaders to push beyond their limits, collaborate across cultures, and develop innovative strategies that ___2___ sustainable change while preserving cultural heritage.\n\nUnder the 2026 theme, “Empowering Youth to Preserve Culture and Driving Sustainable Innovation,” KYS highlights the ___3___ role of young leaders in safeguarding cultural identity while fostering forward-thinking solutions for global challenges. The summit serves as a dynamic ___4___ where youth from diverse nations, disciplines, and backgrounds come together to exchange ideas, strengthen leadership capacity, and co-create impactful ___5___.\n\nAt the heart of KYS is its strong alignment ___6___ the United Nations Sustainable Development Goals (SDGs), which guide global development efforts.`,
    questions: [
      {
        type: "Gerund / Preposition",
        blank: 1,
        text: "The summit is dedicated to ___1___ emerging leaders...",
        options: ["A. inspiring", "B. insisting", "C. inserting", "D. installing"],
        answer: 0,
        feedback: "'Dedicated to' is followed by a gerund (-ing form). 'Inspiring' means filling someone with the urge or ability to do something."
      },
      {
        type: "Collocation",
        blank: 2,
        text: "...and develop innovative strategies that ___2___ sustainable change...",
        options: ["A. drive", "B. ride", "C. steer", "D. lead"],
        answer: 0,
        feedback: "'Drive change' is a strong, modern business and organizational collocation meaning to cause or force change to happen."
      },
      {
        type: "Collocation",
        blank: 3,
        text: "KYS highlights the ___3___ role of young leaders...",
        options: ["A. alive", "B. vivid", "C. vital", "D. alert"],
        answer: 2,
        feedback: "'Vital role' is a very common collocation meaning an absolutely necessary or important part."
      },
      {
        type: "Collocation",
        blank: 4,
        text: "The summit serves as a dynamic ___4___ where youth... come together...",
        options: ["A. stage", "B. platform", "C. ground", "D. base"],
        answer: 1,
        feedback: "'Serve as a platform' means to provide an opportunity or space for people to exchange ideas."
      },
      {
        type: "Vocabulary",
        blank: 5,
        text: "...and co-create impactful ___5___.",
        options: ["A. initiations", "B. initiatives", "C. initials", "D. initiators"],
        answer: 1,
        feedback: "An 'initiative' is a new plan or process to achieve something or solve a problem. It is highly used in organizational contexts."
      },
      {
        type: "Preposition",
        blank: 6,
        text: "At the heart of KYS is its strong alignment ___6___ the United Nations...",
        options: ["A. to", "B. with", "C. for", "D. on"],
        answer: 1,
        feedback: "'Alignment with' is the correct prepositional phrase meaning agreement or association."
      }
    ]
  },
  {
    title: "Danang: Asia's Top Destination",
    type: "Tourism News",
    icon: "🏖️",
    passage: `Danang has ranked second on a list of Asia's most attractive destinations selected by Australian travel guide publisher Lonely Planet. The list highlights the ___1___ of summer travel experiences across Asia, from destinations with pleasant sunshine and ___2___ weather to cities with hot and humid climates.\n\nAccording to the publisher, Danang stands ___3___ as a paradise for outdoor lovers with long stretches of white sand at beaches offering ideal conditions for seaside fun during the summer. Beyond its natural scenery, the city also offers a wide ___4___ of experiences from nature and culture to recreation and relaxation. Its repeated appearance in international rankings reflects Da Nang's tourism strategy which ___5___ visitor experience and emotional connection at the center of ___6___.`,
    questions: [
      {
        type: "Vocabulary",
        blank: 1,
        text: "The list highlights the ___1___ of summer travel experiences across Asia...",
        options: ["A. difference", "B. diversity", "C. division", "D. divergence"],
        answer: 1,
        feedback: "'Diversity' means a range of different things, fitting perfectly when contrasting 'pleasant sunshine' with 'hot and humid climates'."
      },
      {
        type: "Collocation",
        blank: 2,
        text: "...destinations with pleasant sunshine and ___2___ weather...",
        options: ["A. favorable", "B. favored", "C. favorite", "D. favoring"],
        answer: 0,
        feedback: "'Favorable weather' is a standard collocation meaning weather conditions that are good or suitable for a particular activity."
      },
      {
        type: "Phrasal Verb",
        blank: 3,
        text: "According to the publisher, Danang stands ___3___ as a paradise...",
        options: ["A. up", "B. out", "C. off", "D. in"],
        answer: 1,
        feedback: "'Stand out' means to be much better or more important than somebody/something."
      },
      {
        type: "Fixed Phrase",
        blank: 4,
        text: "...the city also offers a wide ___4___ of experiences...",
        options: ["A. scale", "B. range", "C. scope", "D. limit"],
        answer: 1,
        feedback: "'A wide range of' is a fixed phrase meaning a large variety of something."
      },
      {
        type: "Verb Pattern",
        blank: 5,
        text: "...tourism strategy which ___5___ visitor experience and emotional connection at the center...",
        options: ["A. places", "B. sets", "C. puts", "D. lays"],
        answer: 0,
        feedback: "'Place [something] at the center' is a common phrase meaning to make something the most important priority. ('Puts' is also acceptable but 'places' is more formal here)."
      },
      {
        type: "Noun Form",
        blank: 6,
        text: "...at the center of ___6___.",
        options: ["A. develop", "B. developing", "C. development", "D. developer"],
        answer: 2,
        feedback: "'Development' is the correct noun form to indicate the process of developing the tourism sector."
      }
    ]
  },
  {
    title: "STEM Classrooms",
    type: "Education Report",
    icon: "🔬",
    passage: `The STEM classrooms are designed cohesively and flexibly, integrating advanced technology to create open spaces where students can research, experiment and develop interdisciplinary science projects. As a result, learning is no longer ___1___ to theory but is closely tied to practice, fostering creative thinking and problem-solving skills – core ___2___ in the digital age.\n\nAt Lam Son High School for Gifted Students, the STEM classroom was invested in with a total budget of VND3.3 billion. Immediately after ___3___, the school organised training for teachers of physics, chemistry, biology, informatics and technology. It also disseminated the model to all other teachers to prepare ___4___ integrated teaching.\n\nBeyond technology, the STEM room supports students in ___5___ physics experiments such as measuring energy, wind and pH levels, contributing to enhancing scientific research ___6___.`,
    questions: [
      {
        type: "Collocation",
        blank: 1,
        text: "As a result, learning is no longer ___1___ to theory...",
        options: ["A. limited", "B. confined", "C. restricted", "D. enclosed"],
        answer: 1,
        feedback: "'Confined to' is a strong collocation meaning restricted to a particular space or topic, implying that learning now goes beyond just theory."
      },
      {
        type: "Vocabulary",
        blank: 2,
        text: "...creative thinking and problem-solving skills – core ___2___ in the digital age.",
        options: ["A. competitions", "B. competitors", "C. competencies", "D. competences"],
        answer: 2,
        feedback: "'Competencies' (or competences) refers to important skills or abilities required to do a job or function successfully."
      },
      {
        type: "Noun Form",
        blank: 3,
        text: "Immediately after ___3___, the school organised training...",
        options: ["A. receipt", "B. receive", "C. receiving", "D. receiver"],
        answer: 0,
        feedback: "'After receipt' is a formal phrase meaning 'after receiving it'. It acts as a noun."
      },
      {
        type: "Preposition",
        blank: 4,
        text: "...to prepare ___4___ integrated teaching.",
        options: ["A. for", "B. to", "C. with", "D. in"],
        answer: 0,
        feedback: "'Prepare for' is the correct preposition to mean getting ready for something."
      },
      {
        type: "Collocation",
        blank: 5,
        text: "...the STEM room supports students in ___5___ physics experiments...",
        options: ["A. doing", "B. making", "C. conducting", "D. creating"],
        answer: 2,
        feedback: "'Conducting experiments' is the standard academic and scientific collocation."
      },
      {
        type: "Vocabulary",
        blank: 6,
        text: "...contributing to enhancing scientific research ___6___.",
        options: ["A. skills", "B. talents", "C. abilities", "D. gifts"],
        answer: 0,
        feedback: "'Research skills' is the most common and appropriate collocation in educational contexts."
      }
    ]
  },
  {
    title: "A Land of Fragrant Rice",
    type: "Cultural Tourism",
    icon: "🌾",
    passage: `Long famous for its fragrant tam xoan rice, Hai Hau in Nam Dinh was one of the first five districts in the country to achieve the “new rural standard” ten years ago. In 2018, a high-end community tourism model called Ecohost Hai Hau was established and ___1___ as a 5-star OCOP rural tourism product at the national level.\n\nVisitors to Hai Hau will find the countryside full of majestic ___2___ like a 500-year-old tiled bridge, towering churches, and ___3___ ancient villages. Tourists can explore many unique craft villages, including one that ___4___ brass horns, an artist village, a bonsai village, a hat-weaving village, a net-weaving village, a salt-making village, and one known ___5___ its fish sauce. This rich cultural heritage makes it a ___6___ destination for travelers seeking authentic experiences.`,
    questions: [
      {
        type: "Vocabulary",
        blank: 1,
        text: "...was established and ___1___ as a 5-star OCOP rural tourism product...",
        options: ["A. recognized", "B. realized", "C. remembered", "D. reminded"],
        answer: 0,
        feedback: "'Recognized as' means to be officially acknowledged or accepted as having a particular status."
      },
      {
        type: "Vocabulary",
        blank: 2,
        text: "...the countryside full of majestic ___2___ like a 500-year-old tiled bridge...",
        options: ["A. remains", "B. ruins", "C. relics", "D. resources"],
        answer: 2,
        feedback: "A 'relic' is an object surviving from an earlier time, especially one of historical or cultural interest."
      },
      {
        type: "Collocation",
        blank: 3,
        text: "...towering churches, and ___3___ ancient villages.",
        options: ["A. lush", "B. leafy", "C. green", "D. dense"],
        answer: 0,
        feedback: "'Lush' is commonly used to describe areas with abundant, healthy, and green vegetation."
      },
      {
        type: "Vocabulary",
        blank: 4,
        text: "...including one that ___4___ brass horns...",
        options: ["A. does", "B. creates", "C. makes", "D. invents"],
        answer: 2,
        feedback: "A village 'makes' or produces specific craft items like brass horns."
      },
      {
        type: "Preposition",
        blank: 5,
        text: "...and one known ___5___ its fish sauce.",
        options: ["A. as", "B. for", "C. by", "D. to"],
        answer: 1,
        feedback: "'Known for' means famous or recognized because of a specific quality or product."
      },
      {
        type: "Compound Adjective",
        blank: 6,
        text: "...makes it a ___6___ destination for travelers...",
        options: ["A. must-see", "B. must-have", "C. must-do", "D. must-visit"],
        answer: 3,
        feedback: "'Must-visit' is a compound adjective describing a place that is highly recommended for tourists to go to."
      }
    ]
  },
  {
    title: "Microsoft Services Agreement",
    type: "Terms & Conditions",
    icon: "📜",
    passage: `You're receiving this email because we are updating the Microsoft Services Agreement, which applies to one or more Microsoft products or services you use. We're making these updates to clarify our terms and ensure that they remain ___1___ for you, as well as to cover new Microsoft products, services and features.\n\nThe Microsoft Services Agreement is an agreement between you and Microsoft that ___2___ your use of Microsoft consumer online products and services. You can read the entire Microsoft Services Agreement here. You can also learn more about these updates on our FAQ page here, including a summary of the most ___3___ changes.\n\nThe updates to the Microsoft Services Agreement will take ___4___ on September 30, 2025. If you continue to use our products and services on or after September 30, 2025, you are ___5___ to the updated Microsoft Services Agreement. If you do not agree, you can choose to discontinue using the products and services, and close your Microsoft account before these terms ___6___ effective.`,
    questions: [
      {
        type: "Vocabulary",
        blank: 1,
        text: "...and ensure that they remain ___1___ for you...",
        options: ["A. invisible", "B. transparent", "C. apparent", "D. obvious"],
        answer: 1,
        feedback: "In legal and business contexts, terms are 'transparent' meaning clear, easy to understand, and open."
      },
      {
        type: "Vocabulary",
        blank: 2,
        text: "...an agreement between you and Microsoft that ___2___ your use...",
        options: ["A. governs", "B. controls", "C. rules", "D. limits"],
        answer: 0,
        feedback: "Agreements, laws, and policies 'govern' the use of services or products."
      },
      {
        type: "Vocabulary",
        blank: 3,
        text: "...including a summary of the most ___3___ changes.",
        options: ["A. noted", "B. noticeable", "C. notable", "D. noticing"],
        answer: 2,
        feedback: "'Notable' means significant, important, or worthy of attention."
      },
      {
        type: "Collocation",
        blank: 4,
        text: "The updates to the Microsoft Services Agreement will take ___4___ on September 30...",
        options: ["A. place", "B. part", "C. effect", "D. action"],
        answer: 2,
        feedback: "'Take effect' is a fixed collocation meaning to become active or legally binding."
      },
      {
        type: "Verb Pattern",
        blank: 5,
        text: "...you are ___5___ to the updated Microsoft Services Agreement.",
        options: ["A. agreeing", "B. allowing", "C. accepting", "D. approving"],
        answer: 0,
        feedback: "The verb 'agree' goes with the preposition 'to' (agreeing to something)."
      },
      {
        type: "Collocation",
        blank: 6,
        text: "...and close your Microsoft account before these terms ___6___ effective.",
        options: ["A. make", "B. become", "C. get", "D. turn"],
        answer: 1,
        feedback: "'Become effective' is the standard collocation used when rules or agreements start to apply."
      }
    ]
  },
  {
    title: "The Roof of the Central Highlands",
    type: "Geography & Nature",
    icon: "⛰️",
    passage: `Ngoc Linh Nature Reserve in Quang Ngai Province spans more than 41,000 hectares along the Truong Son range. It is one of the highest mountain ranges in Central Vietnam, with Mount Ngoc Linh reaching 2,605 meters – often called the “roof of the Central Highlands”.\n\nThese dramatic elevation changes create ___1___ landscapes. Deep valleys dense with bamboo, vines, and streams gradually give ___2___ to towering old-growth forests. Higher still, mist drifts across cliffs; light dims, trees grow shorter, moss thickens along trunks, and the forest seems to close ___3___ around each step.\n\nThe high-altitude zone is layered with thick, nutrient-rich forest litter – the ___4___ of millions of years of fallen leaves and decaying wood. This has created ideal ___5___ for countless rare plant and animal species, some of which bear the very ___6___ of the mountain itself.`,
    questions: [
      {
        type: "Vocabulary",
        blank: 1,
        text: "These dramatic elevation changes create ___1___ landscapes.",
        options: ["A. shifting", "B. jumping", "C. running", "D. moving"],
        answer: 0,
        feedback: "'Shifting landscapes' refers to scenery that constantly changes and transforms."
      },
      {
        type: "Idiom / Fixed Phrase",
        blank: 2,
        text: "Deep valleys... gradually give ___2___ to towering old-growth forests.",
        options: ["A. path", "B. road", "C. way", "D. route"],
        answer: 2,
        feedback: "'Give way to' means to be replaced by something else."
      },
      {
        type: "Phrasal Verb",
        blank: 3,
        text: "...and the forest seems to close ___3___ around each step.",
        options: ["A. out", "B. in", "C. up", "D. off"],
        answer: 1,
        feedback: "'Close in' means to surround or enclose someone/something."
      },
      {
        type: "Vocabulary",
        blank: 4,
        text: "...the ___4___ of millions of years of fallen leaves and decaying wood.",
        options: ["A. reason", "B. cause", "C. source", "D. result"],
        answer: 3,
        feedback: "'The result of' shows the outcome or consequence of a long process."
      },
      {
        type: "Collocation",
        blank: 5,
        text: "This has created ideal ___5___ for countless rare plant...",
        options: ["A. conditions", "B. situations", "C. positions", "D. locations"],
        answer: 0,
        feedback: "'Ideal conditions' is a common collocation describing perfect circumstances for something to thrive."
      },
      {
        type: "Vocabulary",
        blank: 6,
        text: "...some of which bear the very ___6___ of the mountain itself.",
        options: ["A. title", "B. name", "C. brand", "D. label"],
        answer: 1,
        feedback: "'Bear the name of' means to be named after someone or something."
      }
    ]
  },
  {
    title: "Curry's Origins",
    type: "Culinary History",
    icon: "🍛",
    passage: `The story of curry begins in India, where some of the earliest forms of spiced stews were prepared. Archaeological evidence suggests that as early as 2500 BCE, the people of the Indus Valley Civilisation were using turmeric, garlic, and ginger to ___1___ their food, a precursor to the curries of today. Indian cuisine, with its complex spice blends and regional ___2___, has long been known for its intricate flavours.\n\nThe use of spices like cumin, coriander, turmeric, and chilli is ___3___ to Indian cooking, and these spices play a central role in the various curry dishes that developed over time. However, Indian curry didn’t stay ___4___ to the subcontinent. Over centuries of trade, migration, and colonialism, Indian spices and cooking methods travelled, influencing cuisines across Asia, Europe, and beyond. As Indian traders and emigrants ___5___ in new regions, they brought their spices and culinary techniques with them, blending with local ingredients and customs to ___6___ new and distinct curry variations.`,
    questions: [
      {
        type: "Vocabulary",
        blank: 1,
        text: "...were using turmeric, garlic, and ginger to ___1___ their food...",
        options: ["A. taste", "B. savour", "C. flavour", "D. spice"],
        answer: 2,
        feedback: "To 'flavour' food means to give it a particular taste by adding spices or seasoning."
      },
      {
        type: "Vocabulary",
        blank: 2,
        text: "...with its complex spice blends and regional ___2___...",
        options: ["A. diversity", "B. difference", "C. identity", "D. similarity"],
        answer: 0,
        feedback: "'Regional diversity' refers to a wide variety of distinct characteristics across different areas."
      },
      {
        type: "Collocation",
        blank: 3,
        text: "The use of spices like cumin, coriander, turmeric, and chilli is ___3___ to Indian cooking...",
        options: ["A. basic", "B. primary", "C. fundamental", "D. grounding"],
        answer: 2,
        feedback: "'Fundamental to' means forming a necessary base or core; of central importance."
      },
      {
        type: "Collocation",
        blank: 4,
        text: "However, Indian curry didn’t stay ___4___ to the subcontinent.",
        options: ["A. limited", "B. confined", "C. restricted", "D. enclosed"],
        answer: 1,
        feedback: "'Confined to' means restricted within certain limits or boundaries."
      },
      {
        type: "Vocabulary",
        blank: 5,
        text: "As Indian traders and emigrants ___5___ in new regions...",
        options: ["A. lived", "B. placed", "C. stayed", "D. settled"],
        answer: 3,
        feedback: "To 'settle' means to move to and live in a new place or region permanently."
      },
      {
        type: "Vocabulary",
        blank: 6,
        text: "...blending with local ingredients and customs to ___6___ new and distinct curry variations.",
        options: ["A. make", "B. do", "C. build", "D. create"],
        answer: 3,
        feedback: "'Create' is the best fit for bringing new culinary variations into existence."
      }
    ]
  },
  {
    title: "Qatar Airways",
    type: "Business Profile",
    icon: "✈️",
    passage: `Qatar Airways, the national carrier of the State of Qatar, is the world’s fastest-growing airline, continuously expanding its network with new and exciting destinations. Operating a modern fleet, the airline sets the ___1___ for excellence in air travel.\n\nA multiple award-winning airline, Qatar Airways was named Airline of the Year by the 2024 World Airline Awards, managed by the prestigious international air transport rating organization Skytrax. In addition to being named the World’s Best Airline 2024, Qatar Airways has also won awards for World’s Best Business Class, World’s Best Business Class Lounge, and Best Airline in the Middle East.\n\nBeyond aviation, Qatar Airways is a proud partner of major global sporting events, strengthening its ___2___ as an airline of choice for millions of passengers worldwide. As the official airline of the FIFA World Cup Qatar 2022™, the airline played a ___3___ role in connecting fans to this historic event. Looking ahead, Qatar Airways continues to ___4___ its commitment to sports by becoming a global partner of Formula 1® in 2027, further ___5___ its presence on the world stage.\n\nAs a member of the oneworld global alliance—the first Gulf carrier to join—Qatar Airways remains dedicated to delivering a ___6___ travel experience with reliability, trust, and confidence at its core.`,
    questions: [
      {
        type: "Collocation",
        blank: 1,
        text: "...the airline sets the ___1___ for excellence in air travel.",
        options: ["A. standard", "B. target", "C. benchmark", "D. level"],
        answer: 2,
        feedback: "'Set the benchmark' means to establish a standard of excellence by which others are measured."
      },
      {
        type: "Collocation",
        blank: 2,
        text: "...strengthening its ___2___ as an airline of choice...",
        options: ["A. position", "B. location", "C. placement", "D. situation"],
        answer: 0,
        feedback: "A company strengthens its 'position' in a market or industry."
      },
      {
        type: "Collocation",
        blank: 3,
        text: "...the airline played a ___3___ role in connecting fans...",
        options: ["A. central", "B. pivotal", "C. middle", "D. turning"],
        answer: 1,
        feedback: "'Play a pivotal role' means to have an extremely important part in something's success."
      },
      {
        type: "Vocabulary",
        blank: 4,
        text: "...Qatar Airways continues to ___4___ its commitment to sports...",
        options: ["A. force", "B. reinforce", "C. enforce", "D. afford"],
        answer: 1,
        feedback: "'Reinforce a commitment' means to strengthen or provide more support for a promise or dedication."
      },
      {
        type: "Vocabulary",
        blank: 5,
        text: "...further ___5___ its presence on the world stage.",
        options: ["A. hardening", "B. solidifying", "C. freezing", "D. stiffening"],
        answer: 1,
        feedback: "To 'solidify one's presence' means to make it stronger and more secure."
      },
      {
        type: "Collocation",
        blank: 6,
        text: "...dedicated to delivering a ___6___ travel experience...",
        options: ["A. smooth", "B. broken", "C. seamless", "D. straight"],
        answer: 2,
        feedback: "'Seamless experience' is a very common business collocation meaning smooth, without interruptions or difficulties."
      }
    ]
  },
  {
    title: "Autumn Sky, A New Robe",
    type: "Urban Development",
    icon: "🏙️",
    passage: `Hanoi’s transformation in the 21st century reflects long-held dreams of modernization while preserving the ___1___ of its thousand-year-old heritage. Once imagined in songs and poetry, the capital now presents a dynamic urban landscape shaped by ___2___ transport systems, modern architecture, and renewed public spaces.\n\nThe city has developed a clear network of radial highways and concentric ring roads based on historical ___3___ such as Ring Road No. 1, which once followed the ramparts of Dai La Citadel. From having only the Thang Long–Noi Bai Expressway in the 1990s, Hanoi now ___4___ to the wider northern region through six major arterial routes. New bridges spanning the Red and Duong rivers, including Nhat Tan, Thanh Tri, and Dong Tru, have ___5___ the city’s geography and urban ___6___.`,
    questions: [
      {
        type: "Collocation",
        blank: 1,
        text: "...while preserving the ___1___ of its thousand-year-old heritage.",
        options: ["A. soul", "B. spirit", "C. ghost", "D. mind"],
        answer: 1,
        feedback: "'Preserving the spirit' refers to keeping the essential character or feeling of a place."
      },
      {
        type: "Vocabulary",
        blank: 2,
        text: "...dynamic urban landscape shaped by ___2___ transport systems...",
        options: ["A. expanding", "B. extending", "C. stretching", "D. spreading"],
        answer: 0,
        feedback: "'Expanding' means growing in size or scale, often used for infrastructure like transport networks."
      },
      {
        type: "Collocation",
        blank: 3,
        text: "...concentric ring roads based on historical ___3___...",
        options: ["A. basics", "B. bottoms", "C. foundations", "D. grounds"],
        answer: 2,
        feedback: "'Historical foundations' refers to physical or conceptual bases from the past on which new things are built."
      },
      {
        type: "Verb Pattern",
        blank: 4,
        text: "Hanoi now ___4___ to the wider northern region...",
        options: ["A. relates", "B. joins", "C. attaches", "D. connects"],
        answer: 3,
        feedback: "'Connects to' is the correct verb to show a link or transport route between two places."
      },
      {
        type: "Vocabulary",
        blank: 5,
        text: "New bridges... have ___5___ the city’s geography...",
        options: ["A. remade", "B. reshaped", "C. rebuilt", "D. renewed"],
        answer: 1,
        feedback: "'Reshape' means to change the shape or structure of something, often used for geography or landscapes."
      },
      {
        type: "Collocation",
        blank: 6,
        text: "...have reshaped the city’s geography and urban ___6___.",
        options: ["A. outlook", "B. look", "C. outcome", "D. outside"],
        answer: 0,
        feedback: "'Urban outlook' refers to the general appearance and prospect of a city."
      }
    ]
  },
  {
    title: "Amsterdam's Ad Ban",
    type: "Environmental Policy",
    icon: "🚫",
    passage: `Amsterdam has banned public advertisements for meat and fossil fuel products. This means there will be no ads for burgers, petrol cars, and airlines in Amsterdam's streets, train stations, and other public places. The ban is to help ___1___ Amsterdam towards its target of being carbon neutral by 2050. One aim is for local residents to halve how much meat they eat.\n\nTwo groups in Holland are unhappy that they can no longer advertise their products. The Dutch Meat Association called the ban "an undesirable way to influence consumer ___2___". It added that meat delivers essential nutrients and should remain ___3___ and accessible to consumers. Similarly, the Dutch Association of Travel Agents and Tour Operators said the ban was too ___4___ and unfairly limited their ability to do business. Climate activist Andrea Mancuso disagreed. He said ads that ___5___ to more fossil fuels being used ___6___ the environment.`,
    questions: [
      {
        type: "Phrasal Verb",
        blank: 1,
        text: "The ban is to help ___1___ Amsterdam towards its target...",
        options: ["A. push", "B. move", "C. pull", "D. drag"],
        answer: 1,
        feedback: "'Move towards a target' is a common collocation meaning to make progress in the direction of a goal."
      },
      {
        type: "Collocation",
        blank: 2,
        text: "...an undesirable way to influence consumer ___2___.",
        options: ["A. behaviour", "B. habit", "C. manner", "D. custom"],
        answer: 0,
        feedback: "'Consumer behaviour' is a fixed term in business and sociology referring to the study of how people make decisions about what they buy."
      },
      {
        type: "Vocabulary",
        blank: 3,
        text: "...and should remain ___3___ and accessible to consumers.",
        options: ["A. obvious", "B. visible", "C. hidden", "D. exposed"],
        answer: 1,
        feedback: "'Visible' means able to be seen. In this context, it means the products should still be advertised and seen by the public."
      },
      {
        type: "Vocabulary",
        blank: 4,
        text: "...the Dutch Association... said the ban was too ___4___...",
        options: ["A. strong", "B. severe", "C. strict", "D. harsh"],
        answer: 2,
        feedback: "Laws, rules, and bans are often described as 'strict' when they strongly limit what people can do."
      },
      {
        type: "Verb Pattern",
        blank: 5,
        text: "He said ads that ___5___ to more fossil fuels being used...",
        options: ["A. cause", "B. lead", "C. bring", "D. result"],
        answer: 1,
        feedback: "'Lead to' is a phrasal verb meaning to cause something to happen or exist."
      },
      {
        type: "Vocabulary",
        blank: 6,
        text: "...ads that lead to more fossil fuels being used ___6___ the environment.",
        options: ["A. hurts", "B. damages", "C. ruins", "D. destroys"],
        answer: 1,
        feedback: "To 'damage' the environment is the most common and appropriate collocation here."
      }
    ]
  },
  {
    title: "Negative People and Aging",
    type: "Health & Psychology",
    icon: "🧠",
    passage: `From supportive friendships to toxic colleagues, our relationships can shape our stress levels more than our jobs, finances, or even our diet and health habits. A new study suggests that who we ___1___ ourselves with can negatively affect our longevity. Scientists at Indiana University in the USA conducted a study on how the people around us can impact the stress in our lives.\n\nThe researchers focused on the ___2___ people called "hasslers" had on us. A hassler is an annoying individual who regularly hassles us. Researchers ___3___ people about the hasslers in their lives. Dr Perry said around one third of the participants knew at least one hassler. She said about 10 per cent had at least two hasslers. Each ___4___ hassler was linked with a 1.5 per cent faster ___5___ of aging. This highlights the importance of maintaining positive social circles for our overall ___6___.`,
    questions: [
      {
        type: "Phrasal Verb",
        blank: 1,
        text: "...who we ___1___ ourselves with can negatively affect our longevity.",
        options: ["A. surround", "B. gather", "C. enclose", "D. involve"],
        answer: 0,
        feedback: "'Surround oneself with' is a common expression meaning to choose to have certain types of people near you."
      },
      {
        type: "Collocation",
        blank: 2,
        text: "The researchers focused on the ___2___ people called 'hasslers' had on us.",
        options: ["A. result", "B. consequence", "C. effect", "D. outcome"],
        answer: 2,
        feedback: "To 'have an effect on' someone or something is a very common structure."
      },
      {
        type: "Vocabulary",
        blank: 3,
        text: "Researchers ___3___ people about the hasslers in their lives.",
        options: ["A. questioned", "B. demanded", "C. required", "D. inquired"],
        answer: 0,
        feedback: "'Questioned' is the most direct and appropriate verb for researchers asking participants about their experiences."
      },
      {
        type: "Vocabulary",
        blank: 4,
        text: "Each ___4___ hassler was linked with a 1.5 per cent faster pace...",
        options: ["A. extra", "B. added", "C. additional", "D. other"],
        answer: 2,
        feedback: "'Additional' is a formal way of saying 'extra' or 'more', frequently used in research contexts."
      },
      {
        type: "Collocation",
        blank: 5,
        text: "...linked with a 1.5 per cent faster ___5___ of aging.",
        options: ["A. pace", "B. speed", "C. rate", "D. step"],
        answer: 0,
        feedback: "The 'pace of aging' refers to how quickly the aging process happens."
      },
      {
        type: "Collocation",
        blank: 6,
        text: "...maintaining positive social circles for our overall ___6___.",
        options: ["A. wealth", "B. well-being", "C. welfare", "D. wellness"],
        answer: 1,
        feedback: "'Overall well-being' is a widespread collocation referring to a person's general state of health and happiness."
      }
    ]
  },
  {
    title: "Bamboo as Superfood",
    type: "Nutrition & Science",
    icon: "🎍",
    passage: `Bamboo stands out not only nutritionally but also biologically. It is the fastest-growing plant on Earth, with certain species ___1___ of reaching up to 90 centimeters of growth in a single day. Although China and India dominate global bamboo production and bamboo shoots have been eaten for centuries in many Asian cultures, interest in bamboo as a functional food has remained ___2___ elsewhere.\n\nFrom a nutritional ___3___, bamboo shoots provide a rare combination of high protein content and low fat, along with moderate amounts of dietary fiber. They also contain essential amino acids, trace minerals such as selenium and potassium, and a ___4___ of naturally occurring vitamins. This profile makes bamboo nutritionally dense relative to its low-calorie ___5___, an attribute often associated with foods linked to ___6___ health.`,
    questions: [
      {
        type: "Adjective + Preposition",
        blank: 1,
        text: "...with certain species ___1___ of reaching up to 90 centimeters...",
        options: ["A. able", "B. capable", "C. possible", "D. potential"],
        answer: 1,
        feedback: "'Capable of' means having the ability, power, or capacity to do something. ('Able' is followed by 'to'.)"
      },
      {
        type: "Vocabulary",
        blank: 2,
        text: "...interest in bamboo as a functional food has remained ___2___ elsewhere.",
        options: ["A. short", "B. narrow", "C. limited", "D. restricted"],
        answer: 2,
        feedback: "If interest has 'remained limited', it means it hasn't grown significantly or spread widely."
      },
      {
        type: "Collocation",
        blank: 3,
        text: "From a nutritional ___3___, bamboo shoots provide a rare combination...",
        options: ["A. standpoint", "B. viewpoint", "C. point", "D. perspective"],
        answer: 0,
        feedback: "'From a [something] standpoint' means looking at a topic from a particular angle or point of view."
      },
      {
        type: "Fixed Phrase",
        blank: 4,
        text: "...and a ___4___ of naturally occurring vitamins.",
        options: ["A. range", "B. scale", "C. scope", "D. series"],
        answer: 0,
        feedback: "'A range of' is a fixed phrase meaning a variety of different things."
      },
      {
        type: "Vocabulary",
        blank: 5,
        text: "...dense relative to its low-calorie ___5___...",
        options: ["A. capacity", "B. volume", "C. content", "D. amount"],
        answer: 2,
        feedback: "'Calorie content' or 'low-calorie content' is the standard way to refer to the amount of calories in food."
      },
      {
        type: "Collocation",
        blank: 6,
        text: "...an attribute often associated with foods linked to ___6___ health.",
        options: ["A. physical", "B. mental", "C. metabolic", "D. emotional"],
        answer: 2,
        feedback: "'Metabolic health' is a medical term relating to how well the body generates and uses energy."
      }
    ]
  },
  {
    title: "Hyundai Humanoid Robots",
    type: "Technology & AI",
    icon: "🤖",
    passage: `The South Korean car maker Hyundai has announced plans to introduce 30,000 humanoid robots into its car plants. This will gradually take ___1___ over the next decade. The humanoids (called Atlas) are being manufactured by Hyundai's subsidiary Boston Dynamics. Hyundai stated on its website that Atlas would advance human-robot ___2___. It added that the robot would assist in "evolving hardware-driven robotics into adaptive, artificial intelligence-driven robots designed to ___3___ human potential".\n\nHyundai expects the humanoid robots to work side by side with human staff. The robots will collect data, learn movements, and improve through artificial intelligence software. A Boston Dynamics spokesperson said: "The convergence of robotics and AI represents more than a technological ___4___. It is a transformative innovation that will make human life safer and more ___5___." However, Hyundai's vice-chairperson acknowledged that some people could lose their jobs ___6___ Atlas.`,
    questions: [
      {
        type: "Fixed Phrase",
        blank: 1,
        text: "This will gradually take ___1___ over the next decade.",
        options: ["A. part", "B. place", "C. action", "D. time"],
        answer: 1,
        feedback: "'Take place' means to happen or occur."
      },
      {
        type: "Vocabulary",
        blank: 2,
        text: "...Hyundai stated... that Atlas would advance human-robot ___2___.",
        options: ["A. connection", "B. combination", "C. collaboration", "D. coordination"],
        answer: 2,
        feedback: "'Human-robot collaboration' is a specific term referring to humans and robots working together."
      },
      {
        type: "Vocabulary",
        blank: 3,
        text: "...robots designed to ___3___ human potential.",
        options: ["A. amplify", "B. enlarge", "C. expand", "D. extend"],
        answer: 0,
        feedback: "To 'amplify potential' means to increase it or make it stronger/more effective."
      },
      {
        type: "Collocation",
        blank: 4,
        text: "...represents more than a technological ___4___.",
        options: ["A. progression", "B. advancement", "C. improvement", "D. development"],
        answer: 1,
        feedback: "'Technological advancement' is a common collocation for a major step forward in technology."
      },
      {
        type: "Vocabulary",
        blank: 5,
        text: "It is a transformative innovation that will make human life safer and more ___5___.",
        options: ["A. wealthy", "B. enriching", "C. plentiful", "D. abundant"],
        answer: 1,
        feedback: "'Enriching' means improving the quality of something, often by adding something to it."
      },
      {
        type: "Preposition",
        blank: 6,
        text: "...acknowledged that some people could lose their jobs ___6___ Atlas.",
        options: ["A. for", "B. with", "C. to", "D. by"],
        answer: 2,
        feedback: "To 'lose a job to' someone or something (like a robot or AI) means they replace you."
      }
    ]
  },
  {
    title: "Australia Social Media Age Limit",
    type: "Law & Society",
    icon: "📱",
    passage: `Australia is set to become the first country to ___1___ a minimum age for social media use on Wednesday, with platforms like Instagram, TikTok and YouTube forced to block more than a million accounts, marking the beginning of an expected global wave of regulation.\n\nFrom midnight, 10 of the biggest platforms will be required to block Australians aged under 16 or be fined up to A$49.5 million. The law received harsh criticism from major technology companies and free speech advocates, but was ___2___ by parents and child advocates. Governments from Denmark to Malaysia say they plan similar ___3___, four years after a leak of internal Meta documents showed the company knew its products contributed to body image problems and suicidal thoughts among teenagers while publicly ___4___ the link existed. This landmark decision could set a new global ___5___ for digital safety and youth ___6___.`,
    questions: [
      {
        type: "Collocation",
        blank: 1,
        text: "Australia is set to become the first country to ___1___ a minimum age...",
        options: ["A. perform", "B. implement", "C. execute", "D. conduct"],
        answer: 1,
        feedback: "To 'implement' a law, rule, or age limit means to put it into effect."
      },
      {
        type: "Vocabulary",
        blank: 2,
        text: "The law received harsh criticism... but was ___2___ by parents...",
        options: ["A. praised", "B. congratulated", "C. admired", "D. flattered"],
        answer: 0,
        feedback: "'Praised' is the direct opposite of 'criticized', showing approval and support."
      },
      {
        type: "Collocation",
        blank: 3,
        text: "Governments... say they plan similar ___3___...",
        options: ["A. walks", "B. steps", "C. actions", "D. moves"],
        answer: 1,
        feedback: "To 'take steps' or 'plan steps' means to take action to achieve a goal."
      },
      {
        type: "Vocabulary",
        blank: 4,
        text: "...while publicly ___4___ the link existed.",
        options: ["A. refusing", "B. rejecting", "C. ignoring", "D. denying"],
        answer: 3,
        feedback: "To 'deny' means to state that something is not true."
      },
      {
        type: "Collocation",
        blank: 5,
        text: "This landmark decision could set a new global ___5___ for digital safety...",
        options: ["A. standard", "B. level", "C. norm", "D. rule"],
        answer: 0,
        feedback: "To 'set a standard' means to establish a level of quality or rule that others should follow."
      },
      {
        type: "Vocabulary",
        blank: 6,
        text: "...for digital safety and youth ___6___.",
        options: ["A. protection", "B. preservation", "C. defense", "D. prevention"],
        answer: 0,
        feedback: "'Youth protection' refers to laws and policies designed to keep young people safe."
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

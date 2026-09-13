---
title: "CGEL Advanced Grammar - Stardew Valley Complete Web Experience"
author: "Randolph Quirk Complete 20-Topic Curriculum"
theme: "stardew-valley-pixel"
version: "4.0"
---

# 🌾 CGEL ADVANCED GRAMMAR: COMPLETE 20-TOPIC STARDEW VALLEY WEB PLATFORM 🌾
## An Unabridged, Interactive, Locked-Progression Gamified Learning App for C1-C2 English Syntax

> **System Notice:** This document is the ultimate, unabridged digital textbook containing **all 20 Topics (Topics 1 to 20)** based on Randolph Quirk's *A Comprehensive Grammar of the English Language (CGEL)*. 
> Below is the complete interactive Web App (HTML/CSS/JS) featuring the cozy **Stardew Valley Pixel Art UI**, virtual directory paths, real-time score/gold/energy tracking, **5 lock-step quizzes**, and the **Pelican Town Quest Board**.

---

## 🎮 THE COZY GRAMMAR WEB APP (COMPLETE 20-TOPIC EDITION)

Save the code block below as `index.html` on your computer or host it on your local server. It is completely self-contained and runs on any standard web browser.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stardew Valley Complete Grammar Academy</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=VT323&display=swap');

        :root {
            --sd-dark-wood: #43241B;
            --sd-medium-wood: #76432D;
            --sd-light-wood: #C87545;
            --sd-parchment: #FDF3D8;
            --sd-parchment-border: #E6CFA0;
            --sd-gold-border: #DF9B00;
            --sd-gold: #FFD700;
            --sd-text-dark: #301708;
            --sd-energy-green: #4CD137;
            --sd-locked-gray: #6B6B6B;
            --sd-button-hover: #9E5638;
        }

        body {
            background-color: #2F1B16;
            background-image: radial-gradient(#43241B 20%, transparent 20%),
                              radial-gradient(#43241B 20%, transparent 20%);
            background-size: 16px 16px;
            background-position: 0 0, 8px 8px;
            font-family: 'Courier Prime', Courier, monospace;
            color: var(--sd-text-dark);
            margin: 0;
            padding: 20px;
        }

        h1, h2, h3, h4 {
            font-family: 'VT323', monospace;
            text-shadow: 2px 2px 0px #00000033;
            letter-spacing: 1px;
        }

        .game-board {
            max-width: 1250px;
            margin: 0 auto;
            background-color: var(--sd-medium-wood);
            border: 8px solid var(--sd-dark-wood);
            box-shadow: 0 10px 0px #00000066;
            outline: 4px solid var(--sd-gold-border);
            border-radius: 4px;
            overflow: hidden;
        }

        .game-header {
            background-color: var(--sd-dark-wood);
            padding: 20px;
            border-bottom: 4px solid var(--sd-gold-border);
            color: #FFFFFF;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
        }

        .game-title {
            margin: 0;
            font-size: 2.8rem;
            color: var(--sd-gold);
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .hud-panel {
            display: flex;
            gap: 20px;
            background: #25130F;
            padding: 10px 20px;
            border-radius: 4px;
            border: 2px solid var(--sd-gold-border);
            font-family: 'VT323', monospace;
            font-size: 1.5rem;
        }

        .stat-item {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .energy-bar-outer {
            width: 100px;
            height: 20px;
            background-color: #555555;
            border: 2px solid #FFFFFF;
            border-radius: 2px;
            overflow: hidden;
            display: inline-block;
            vertical-align: middle;
        }

        .energy-bar-inner {
            height: 100%;
            width: 100%;
            background-color: var(--sd-energy-green);
            transition: width 0.5s ease-in-out;
        }

        .layout-grid {
            display: grid;
            grid-template-columns: 330px 1fr;
            min-height: 750px;
        }

        .sidebar {
            background-color: var(--sd-medium-wood);
            border-right: 6px solid var(--sd-dark-wood);
            padding: 15px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            overflow-y: auto;
        }

        .sidebar-title {
            color: var(--sd-gold);
            font-size: 1.8rem;
            margin: 0 0 10px 0;
            border-bottom: 2px solid var(--sd-dark-wood);
            padding-bottom: 5px;
        }

        .folder-card {
            background-color: var(--sd-light-wood);
            border: 4px solid var(--sd-dark-wood);
            border-radius: 4px;
            padding: 12px;
            cursor: pointer;
            color: #FFFFFF;
            transition: all 0.2s;
            position: relative;
        }

        .folder-card:hover:not(.locked) {
            background-color: var(--sd-button-hover);
            transform: scale(1.02);
        }

        .folder-card.active {
            outline: 3px solid var(--sd-gold);
            background-color: var(--sd-button-hover);
        }

        .folder-card.locked {
            background-color: var(--sd-locked-gray);
            cursor: not-allowed;
            opacity: 0.7;
        }

        .folder-icon {
            font-size: 1.4rem;
            margin-right: 8px;
        }

        .lock-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 1.2rem;
        }

        .folder-name {
            font-weight: bold;
            font-size: 0.85rem;
            display: block;
        }

        .folder-progress {
            font-size: 0.8rem;
            color: var(--sd-parchment-border);
            margin-top: 5px;
        }

        .content-pane {
            background-color: var(--sd-parchment);
            padding: 30px;
            overflow-y: auto;
            max-height: 800px;
            border-left: 2px solid var(--sd-parchment-border);
        }

        .parchment-scroll {
            background-color: #FFFDF6;
            border: 4px double #C2A775;
            padding: 25px;
            border-radius: 4px;
            margin-bottom: 25px;
            box-shadow: 2px 2px 5px rgba(0,0,0,0.05);
        }

        .pedagogical-box {
            background-color: #E6F3FF;
            border: 3px solid #3498DB;
            border-left-width: 8px;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            color: #1F4E79;
        }

        .warning-box {
            background-color: #FFF0F0;
            border: 3px solid #E74C3C;
            border-left-width: 8px;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            color: #78281F;
        }

        .quest-box {
            background-color: #FCF3CF;
            border: 3px dashed #F39C12;
            border-left-width: 8px;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            color: #7E5109;
        }

        .quiz-container {
            background-color: #E2ECDB;
            border: 4px solid #5C8045;
            padding: 20px;
            border-radius: 4px;
            margin-top: 30px;
        }

        .quiz-option {
            background: #FFFFFF;
            border: 2px solid #5C8045;
            padding: 10px 15px;
            margin: 8px 0;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.1s;
        }

        .quiz-option:hover {
            background-color: #F1F7EC;
            transform: translateX(5px);
        }

        .quiz-option.correct {
            background-color: #C2E7B9 !important;
            border-color: #27AE60;
            font-weight: bold;
        }

        .quiz-option.wrong {
            background-color: #FADBD8 !important;
            border-color: #E74C3C;
        }

        .game-btn {
            background-color: #5C8045;
            color: #FFFFFF;
            border: 3px solid var(--sd-dark-wood);
            padding: 10px 20px;
            font-family: 'VT323', monospace;
            font-size: 1.4rem;
            cursor: pointer;
            border-radius: 4px;
            text-transform: uppercase;
            box-shadow: 0 4px 0px #2D3E21;
            margin-top: 10px;
            display: inline-block;
        }

        .game-btn:hover {
            background-color: #729F55;
            transform: translateY(1px);
            box-shadow: 0 3px 0px #2D3E21;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            background: #FFFFFF;
        }

        th, td {
            border: 2px solid var(--sd-dark-wood);
            padding: 8px 12px;
            text-align: left;
            font-size: 0.9rem;
        }

        th {
            background-color: var(--sd-light-wood);
            color: #FFFFFF;
        }

        tr:nth-child(even) {
            background-color: var(--sd-parchment-border);
            color: var(--sd-text-dark);
        }

        .stamp {
            border: 4px dashed #27AE60;
            color: #27AE60;
            display: inline-block;
            padding: 5px 10px;
            font-family: 'VT323', monospace;
            font-size: 1.5rem;
            transform: rotate(-3deg);
            margin: 10px 0;
            border-radius: 4px;
        }
    </style>
</head>
<body>

<div class="game-board">
    <div class="game-header">
        <h1 class="game-title">🌾 CGEL STARDEW ACADEMY: UNABRIDGED EDITION 🌾</h1>
        <div class="hud-panel">
            <div class="stat-item" style="color: var(--sd-gold)">🪙 <span id="gold-value">0</span>g</div>
            <div class="stat-item" style="color: #4BC0C0">⭐ <span id="xp-value">0</span> XP</div>
            <div class="stat-item">
                🔋 Energy: 
                <div class="energy-bar-outer">
                    <div id="energy-bar" class="energy-bar-inner"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="layout-grid">
        <div class="sidebar">
            <div class="sidebar-title">📁 DIRECTORIES</div>
            
            <div class="folder-card active" id="f-mod1" onclick="switchModule(1)">
                <span class="folder-icon">📂</span>
                <span class="folder-name">Module 01: Clause & NP</span>
                <div class="folder-progress" id="progress-mod1">Progress: 0%</div>
            </div>

            <div class="folder-card locked" id="f-mod2" onclick="switchModule(2)">
                <span class="folder-icon">📁</span>
                <span class="folder-name">Module 02: Verb & Modality</span>
                <span class="lock-badge" id="lock-mod2">🔒</span>
                <div class="folder-progress" id="progress-mod2">Locked</div>
            </div>

            <div class="folder-card locked" id="f-mod3" onclick="switchModule(3)">
                <span class="folder-icon">📁</span>
                <span class="folder-name">Module 03: Modifiers & Adv</span>
                <span class="lock-badge" id="lock-mod3">🔒</span>
                <div class="folder-progress" id="progress-mod3">Locked</div>
            </div>

            <div class="folder-card locked" id="f-mod4" onclick="switchModule(4)">
                <span class="folder-icon">📁</span>
                <span class="folder-name">Module 04: Reduction</span>
                <span class="lock-badge" id="lock-mod4">🔒</span>
                <div class="folder-progress" id="progress-mod4">Locked</div>
            </div>

            <div class="folder-card locked" id="f-mod5" onclick="switchModule(5)">
                <span class="folder-icon">📁</span>
                <span class="folder-name">Module 05: Information Flow</span>
                <span class="lock-badge" id="lock-mod5">🔒</span>
                <div class="folder-progress" id="progress-mod5">Locked</div>
            </div>

            <div class="sidebar-title" style="margin-top: 15px;">📜 QUEST BOARD</div>
            <div class="folder-card" style="background-color: #B58452;" onclick="showQuestBoard()">
                <span class="folder-icon">🎯</span>
                <span class="folder-name">Pelican Town Quests</span>
                <div class="folder-progress">Active Challenges</div>
            </div>
        </div>

        <div class="content-pane" id="content-display">
            <!-- Content loaded dynamically via JavaScript -->
        </div>
    </div>
</div>

<script>
    const gameState = {
        gold: 0,
        xp: 0,
        energy: 100,
        activeModule: 1,
        completed: {
            m1: { topics: [false, false, false, false, false], quiz: false },
            m2: { topics: [false, false, false, false, false], quiz: false },
            m3: { topics: [false, false, false, false], quiz: false },
            m4: { topics: [false, false, false, false], quiz: false },
            m5: { topics: [false, false], quiz: false },
            quests: [false, false, false]
        },
        unlocked: { 1: true, 2: false, 3: false, 4: false, 5: false }
    };

    const modulesData = {
        1: {
            title: "Module 01: The Clause & Noun Phrase (NP)",
            topics: [
                {
                    title: "Topic 1: 7 Core Clause Types (S, V, O, C, A Mapping)",
                    content: `
                        <p><strong>Academic Definition:</strong> Randolph Quirk structures all English clauses based on the presence of obligatory core elements. These are mapped into seven canonical configurations: S (Subject), V (Verb), O (Object), C (Complement), and A (Obligatory Adverbial).</p>
                        <table>
                            <tr><th>Pattern</th><th>Core Syntactic Components</th><th>Authentic Corpus Example (CGEL)</th></tr>
                            <tr><td><strong>SV</strong></td><td>Subject + Intransitive Verb</td><td>The sun shone. / The parsnips grew.</td></tr>
                            <tr><td><strong>SVO</strong></td><td>Subject + Monotransitive Verb + Direct Object</td><td>She built a sturdy wooden coop.</td></tr>
                            <tr><td><strong>SVC</strong></td><td>Subject + Copular Verb + Subject Complement</td><td>The farm looks prosperous. / He became the mayor.</td></tr>
                            <tr><td><strong>SVA</strong></td><td>Subject + Copular/Intransitive Verb + Obligatory Adverbial</td><td>The cows are <em>in the barn</em>. (Omission of 'in the barn' crashes syntax).</td></tr>
                            <tr><td><strong>SVOO</strong></td><td>Subject + Ditransitive Verb + Indirect Object + Direct Object</td><td>Willy gave the fisherman a copper rod.</td></tr>
                            <tr><td><strong>SVOC</strong></td><td>Subject + Complex Transitive Verb + Direct Object + Object Complement</td><td>The community called Lewis a great leader.</td></tr>
                            <tr><td><strong>SVOA</strong></td><td>Subject + Complex Transitive Verb + Direct Object + Obligatory Adverbial</td><td>He put the seeds <em>into the ground</em>.</td></tr>
                        </table>
                        <div class="pedagogical-box">
                            <h4>💡 Hướng dẫn Sư phạm (Pedagogical Guidelines)</h4>
                            <p>Hãy giảng giải cho học sinh: <strong>Obligatory Adverbial (Trạng ngữ bắt buộc)</strong> khác trạng ngữ thường (optional adverbial) ở chỗ nó là một mắt xích cú pháp thiết yếu. Omission test: Nếu ta bỏ trạng ngữ trong câu SVA/SVOA mà câu bị gãy cấu trúc (như *"The cows are"*) thì đó chính là SVA/SVOA.</p>
                        </div>
                    `
                },
                {
                    title: "Topic 2: Countability Gradient & Nominalization",
                    content: `
                        <p><strong>Academic Definition:</strong> Countability is not a binary switch but a continuous grammatical gradient. Nouns slide from strictly Countable (individualized items) to strictly Uncountable (continuous substances/mass concepts), passing through intermediate categories like dual-class memberships.</p>
                        <p><strong>Nominalization (Danh từ hóa):</strong> The morphosyntactic process of turning a verb or adjective into a noun phrase. CGEL maps the gradient of nominalization from purely verbal forms (retaining verbal aspect, tense, and object complements) to purely nominal forms (taking determiners and genitive postmodifications):</p>
                        <ul>
                            <li><strong>Verbal Gerund:</strong> "He regretted *planting parsnips so late*." (Retains verbal direct object *parsnips*).</li>
                            <li><strong>Nominal Deverbal:</strong> "The careful *planting of parsnips* brought success." (Takes determiner *The*, adjective *careful*, and prepositional postmodification *of parsnips*).</li>
                        </ul>
                    `
                },
                {
                    title: "Topic 3: 3-Position Determiner Matrix (Pre, Central, Post)",
                    content: `
                        <p><strong>Academic Definition:</strong> Within the Noun Phrase structure, determiners are strictly regulated and cannot co-occur arbitrarily. They must be mapped across three syntactic slots:</p>
                        <table>
                            <tr><th>Slot I: Pre-determiners</th><th>Slot II: Central Determiners</th><th>Slot III: Post-determiners</th></tr>
                            <tr><td>all, both, half, multipliers (double, twice), fractionals</td><td>articles (a, an, the), demonstratives (this, those), possessives (my, her), genitives</td><td>cardinal numbers, ordinal numbers, general quantifiers (many, few, several)</td></tr>
                        </table>
                        <p><strong>Unalterable Structural Formula:</strong> Pre-determiner + Central Determiner + Post-determiner.</p>
                        <p><em>Example:</em> "<strong>All</strong> [Pre] <strong>the</strong> [Central] <strong>three</strong> [Post] golden walnuts were hidden."</p>
                        <div class="warning-box">
                            <h4>⚠️ Cảnh báo Bẫy thi cử (C1-C2 Pitfall)</h4>
                            <p>Hai từ thuộc cùng một nhóm không bao giờ được phép đứng song hành. Ví dụ: Học sinh không được viết ❌ *the my car* hay *this her farm* vì cả "the", "my", "this", "her" đều tranh chấp vị trí Central Determiner. Phải đổi thành cụm hậu bổ nghĩa: *that farm of hers*.</p>
                        </div>
                    `
                },
                {
                    title: "Topic 4: Advanced Subject-Verb Concord (Grammatical, Notional, Proximity)",
                    content: `
                        <p><strong>Academic Definition:</strong> S-V Concord in English is governed by the interaction and competition of three distinct linguistic principles:</p>
                        <ul>
                            <li><strong>Grammatical Agreement (Hòa hợp hình thức):</strong> Strict syntactic matching of singular/plural features.
                                <br><em>Example:</em> "The supervisor **is** working."</li>
                            <li><strong>Notional Concord (Hòa hợp ngữ nghĩa):</strong> Agreement based on the semantic idea of number rather than the noun's grammatical form. Highly common with collective nouns in British English (BrE).
                                <br><em>Example:</em> "The committee **have** decided." (Focusing on individual members acting independently).</li>
                            <li><strong>Principle of Proximity (Hòa hợp cận kề):</strong> The verb agrees with the noun phrase closest to it. Dominates in coordinated or disjunctive subjects.
                                <br><em>Example:</em> "Neither the mayor nor the **researchers** **have** approved the draft."</li>
                        </ul>
                    `
                },
                {
                    title: "Topic 5: Complex NP Architecture (Recursive Postmodification)",
                    content: `
                        <p><strong>Academic Definition:</strong> The Noun Phrase can be expanded endlessly using recursive postmodification, wherein a modifying element itself contains a noun phrase that is postmodified, creating nested syntactic structures.</p>
                        <p>CGEL maps the structural components of postmodification into three main classes:</p>
                        <ol>
                            <li><strong>Finite relative clauses:</strong> "The golden pumpkin **which was harvested yesterday**."</li>
                            <li><strong>Non-finite clauses:</strong> "The seeds **planted in the greenhouse**." (Rút gọn phân từ).</li>
                            <li><strong>Prepositional Phrases (PP):</strong> "The path **to the forest next to the tower**." (Sắp xếp PP lồng ghép đệ quy).</li>
                        </ol>
                    `
                }
            ],
            quiz: {
                question: "Analyze this complex sentence: 'He put the ancient seed in the greenhouse because he wanted to preserve it.' What is the core Clause Type of the matrix clause 'He put the ancient seed in the greenhouse'?",
                options: [
                    { text: "A. SVO (Subject + Verb + Object)", correct: false },
                    { text: "B. SVOC (Subject + Verb + Object + Complement)", correct: false },
                    { text: "C. SVOA (Subject + Verb + Object + Obligatory Adverbial)", correct: true },
                    { text: "D. SVA (Subject + Verb + Obligatory Adverbial)", correct: false }
                ]
            }
        },
        2: {
            title: "Module 02: The Verb Phrase & Modality",
            topics: [
                {
                    title: "Topic 6: The Operator & NICE Properties (Do-Support Mechanics)",
                    content: `
                        <p><strong>Academic Definition:</strong> In CGEL, the <strong>Operator</strong> is the first or only auxiliary verb in a finite verb phrase. It acts as the syntactic 'brain' of the clause, facilitating four structural transformations (NICE properties):</p>
                        <ul>
                            <li><strong>[N]egation (Phủ định):</strong> Attach *not/n't* directly to the operator. (e.g., "She **has** not finished").</li>
                            <li><strong>[I]nversion (Đảo ngữ):</strong> Swap positions with the subject in questions. (e.g., "**Had** he arrived...").</li>
                            <li><strong>[C]ode (Mã hóa/Từ thế):</strong> Stands as a pro-form for the entire post-operator predicate. (e.g., "Will you farm?" - "Yes, I **will** [code]").</li>
                            <li><strong>[E]mphasis (Nhấn mạnh):</strong> Carries the primary nuclear pitch. (e.g., "I **did** lock the door!").</li>
                        </ul>
                        <div class="pedagogical-box">
                            <h4>💡 Hướng dẫn Sư phạm (Pedagogical Note)</h4>
                            <p>Nhấn mạnh cho học sinh: Động từ thường (lexical verbs) không bao giờ tự thực hiện được 4 chức năng NICE này. Ta bắt buộc phải mượn toán tử giả định (dummy operator) "Do-support" làm bệ đỡ cú pháp.</p>
                        </div>
                    `
                },
                {
                    title: "Topic 7: Aspectual Semantics & Stative-Dynamic Shifts",
                    content: `
                        <p><strong>Academic Definition:</strong> Tense locates an event in time (Past vs. Present), while Aspect reflects the internal temporal constituency of the situation (Progressive vs. Perfective).</p>
                        <p><strong>Stative-Dynamic Shift:</strong> Dynamic verbs are compatible with progressive aspect, while stative verbs (inherent state) are not. However, forcing a stative verb into the progressive triggers a profound semantic shift:</p>
                        <table>
                            <tr><th>Verb</th><th>Stative Meaning (Inherent Quality)</th><th>Dynamic Progressive Shift (Temporary Behavior)</th></tr>
                            <tr><td><strong>Be</strong></td><td>He <strong>is</strong> lazy. (Inherent character)</td><td>He <strong>is being</strong> lazy. (Temporarily acting lazy right now)</td></tr>
                            <tr><td><strong>Think</strong></td><td>I <strong>think</strong> you are right. (Static opinion)</td><td>I <strong>am thinking</strong> about the project. (Active mental process)</td></tr>
                            <tr><td><strong>Have</strong></td><td>She <strong>has</strong> a coop. (Possession)</td><td>She <strong>is having</strong> a hard time. (Active experience of situation)</td></tr>
                        </table>
                    `
                },
                {
                    title: "Topic 8: Modality Spectrum (Intrinsic vs. Extrinsic Dualism)",
                    content: `
                        <p><strong>Academic Definition:</strong> Modality maps the speaker's assessment of truth, obligation, or possibility. CGEL organizes modal verbs into a dualistic spectrum:</p>
                        <ul>
                            <li><strong>Intrinsic (Deontic) Modality:</strong> Involves human control, volition, permission, and direct authority.
                                <br><em>Example:</em> "You **must** be back by midnight." (Obligation/Command).</li>
                            <li><strong>Extrinsic (Epistemic) Modality:</strong> Involves logical deduction, possibility, prediction, and objective truth.
                                <br><em>Example:</em> "You **must** be exhausted after that long harvest." (Logical deduction).</li>
                        </ul>
                        <div class="warning-box">
                            <h4>⚠️ Cảnh báo Bẫy thi cử (C1-C2 Pitfall)</h4>
                            <p>Không dùng "must have done" cho nghĩa vụ trong quá khứ. Động từ "must" không có dạng quá khứ cho nghĩa intrinsic. Phải dùng <strong>"had to"</strong>.
                            <br>❌ *We must have submitted the tax yesterday* (Sai nếu muốn diễn tả nghĩa vụ).
                            <br>✔️ We **had to** submit the tax yesterday (Nghĩa vụ trong quá khứ).</p>
                        </div>
                    `
                },
                {
                    title: "Topic 9: The Subjunctive Mood (Mandative, Formulaic, Were-Subjunctive)",
                    content: `
                        <p><strong>Academic Definition:</strong> The Subjunctive Mood is triggered in non-factual, hypothetical, or highly desired situations:</p>
                        <ul>
                            <li><strong>Mandative Subjunctive (AmE):</strong> Uses bare infinitive for all persons after verbs of demand/suggestion.
                                <br><em>Example:</em> "The council demanded that the mayor **resign**." (Not *resigns*).</li>
                            <li><strong>Formulaic Subjunctive:</strong> Fixed fossilized expressions. (e.g., "God **save** the Queen", "Be that as it may").</li>
                            <li><strong>Were-Subjunctive (Irrealis):</strong> Counterfactual hypothesis. (e.g., "If I **were** you...").</li>
                        </ul>
                    `
                },
                {
                    title: "Topic 10: The Passive Gradient (Central, Semi, and Pseudo-Passives)",
                    content: `
                        <p><strong>Academic Definition:</strong> Not all 'be + past participle' structures are true passives. Quirk maps them along a gradient:</p>
                        <p><strong>1. Central Passives (Bị động thực sự):</strong> Purely verbal. Active counterpart with explicit agent exists.
                            <br><em>Example:</em> "The bridge was demolished by the city."</li>
                        <p><strong>2. Semi-Passives (Bán bị động):</strong> Show high adjectival properties. Can be replaced with copular verbs (*felt, seemed*), modified with *very*, and coordinated with pure adjectives.
                            <br><em>Example:</em> "We were **felt very** worried."</li>
                        <p><strong>3. Pseudo-Passives (Bị động giả/Trạng thái):</strong> No active verbal process; describes a pure resultant state.
                            <br><em>Example:</em> "The museum door was locked." (Already locked, not currently being locked by someone).</li>
                    `
                }
            ],
            quiz: {
                question: "Choose the grammatically correct sentence that avoids past obligation modality errors:",
                options: [
                    { text: "A. The farmers must have finished watering the plants yesterday evening.", correct: false },
                    { text: "B. To enter the secret woods, we must have found the iron axe yesterday.", correct: false },
                    { text: "C. To enter the secret woods, we had to find the iron axe yesterday.", correct: true },
                    { text: "D. The board demanded that the CFO should resigns immediately.", correct: false }
                ]
            }
        },
        3: {
            title: "Module 03: Modifiers, Prepositions & Adverbials",
            topics: [
                {
                    title: "Topic 11: Adjectives & Adverbs (Attributive-Only vs. Predicative-Only)",
                    content: `
                        <p><strong>Academic Definition:</strong> Adjectives are classified as Central if they can be placed both attributively and predicatively. Peripheral adjectives are restricted to one slot:</p>
                        <ul>
                            <li><strong>Attributive-Only (Chỉ đứng trước danh từ):</strong> Intensifiers (*an utter fool*, *sheer luck*) and restrictives (*the only survivor*). You cannot say *"The fool was utter"*.</li>
                            <li><strong>Predicative-Only (Chỉ đứng sau động từ liên kết):</strong> Prefix *a-* group (*afraid, asleep, alone, alive*) and health adjectives (*ill, well*). You cannot say *"an afraid child"* (must use *a frightened child*).</li>
                        </ul>
                    `
                },
                {
                    title: "Topic 12: Prepositions & Stranded Preposition Mechanics",
                    content: `
                        <p><strong>Academic Definition:</strong> Preposition stranding occurs when the prepositional complement is fronted/moved, leaving the preposition 'stranded' at the end of the clause. This is a hallmark of informal/standard English, while fronted prepositions are highly formal:</p>
                        <ul>
                            <li><strong>Relative Clause (Formal):</strong> "The project **on which** they worked..."</li>
                            <li><strong>Relative Clause (Stranded):</strong> "The project **which** they worked **on**..."</li>
                            <li><strong>Prepositional Passives (Stranded Obligatory):</strong> "The poor dog was laughed **at**." (❌ *At the poor dog was laughed* is ungrammatical).</li>
                        </ul>
                    `
                },
                {
                    title: "Topic 13: Adverbials I: Adjuncts vs. Subjuncts",
                    content: `
                        <p><strong>Academic Definition:</strong> Adverbials vary by their syntactic integration in the clause. CGEL divides them into a 4-part quadrant:</p>
                        <ul>
                            <li><strong>Adjuncts:</strong> Syntactically integrated; act as core clause elements. Pass the **Cleft Test**.
                                <br><em>Example:</em> "He left *because of the storm*." -> "It was *because of the storm* that he left."</li>
                            <li><strong>Subjuncts:</strong> Downgraded adverbials that modify a specific element within the clause (subject-oriented, intensifiers, or focusing).
                                <br><em>Example (Focusing):</em> "**Only** Pierre sold the seeds." (Pierre and no one else).</li>
                        </ul>
                    `
                },
                {
                    title: "Topic 14: Adverbials II: Disjuncts vs. Conjuncts",
                    content: `
                        <p><strong>Academic Definition:</strong> The remaining two categories of Quirk's adverbial quadrant are peripheral to the clause structure:</p>
                        <ul>
                            <li><strong>Disjuncts (Trạng ngữ thái độ):</strong> Evaluate the truth-value or style of the statement from the speaker's perspective.
                                <br><em>Style:</em> "**Frankly**, I do not trust Pierre."
                                <br><em>Content:</em> "**Fortunately**, the parsnips survived the frost."</li>
                            <li><strong>Conjuncts (Trạng ngữ liên kết):</strong> Coordinate and establish logical connections between separate clauses.
                                <br><em>Example:</em> "The weather was terrible; **however**, the crop yield was outstanding."</li>
                        </ul>
                        <div class="warning-box">
                            <h4>⚠️ Cảnh báo Bẫy thi cử (C1-C2 Pitfall)</h4>
                            <p>Không dùng nhầm lẫn <strong>"On the contrary"</strong> và <strong>"On the other hand"</strong>.
                            <br>• <strong>On the contrary:</strong> Chỉ dùng để BÁC BỎ một phủ định trước đó. (e.g., "He is not lazy. **On the contrary**, he is extremely diligent").
                            <br>• <strong>On the other hand:</strong> Dùng để nêu hai khía cạnh đối lập cân bằng. (e.g., "Farming is rewarding. **On the other hand**, it is hard labor").</p>
                        </div>
                    `
                }
            ],
            quiz: {
                question: "Choose the sentence that correctly uses the contrastive conjunct according to CGEL's strict rules:",
                options: [
                    { text: "A. He loves mining. On the contrary, his brother hates going into caves.", correct: false },
                    { text: "B. The farm is not unprofitable. On the contrary, it generates huge revenues.", correct: true },
                    { text: "C. We saw an afraid dog sleeping under the wooden bridge near Pierre's shop.", correct: false },
                    { text: "D. The project which they worked on it was successfully funded.", correct: false }
                ]
            }
        },
        4: {
            title: "Module 04: Sentence Architecture & Reduction",
            topics: [
                {
                    title: "Topic 15: Advanced Negation (Scope, Focus, and Local Negation)",
                    content: `
                        <p><strong>Academic Definition:</strong> Negation operates on two levels: Clausal (negates the entire clause, triggers positive tags) and Local (negates a specific constituent, clause remains positive).</p>
                        <p><strong>Scope of Negation Ambiguity:</strong> The scope of negation typically stretches from the negative operator to the end of the clause. This can cause severe semantic ambiguity with final adverbials:</p>
                        <p><em>Ambiguous Sentence:</em> "I didn't plant the crop **because I wanted to earn gold**."</p>
                        <ul>
                            <li><strong>Reading A (Adverbial INSIDE Scope):</strong> I planted the crop, but *not* for the reason of earning gold. (Phủ định nguyên nhân).</li>
                            <li><strong>Reading B (Adverbial OUTSIDE Scope):</strong> Because I wanted to earn gold, I decided *not* to plant the crop. (Phủ định hành động).</li>
                        </ul>
                    `
                },
                {
                    title: "Topic 16: Coordination & Parallelism (Strict Syntactic Tests)",
                    content: `
                        <p><strong>Academic Definition:</strong> True coordinators (*and, or*) can be distinguished from subordinators (*although*) and conjuncts (*however*) through 4 strict syntactic tests:</p>
                        <ol>
                            <li>Clause-initial position restriction.</li>
                            <li>Inability to front coordinated clauses (*But he tried, he failed* is ungrammatical).</li>
                            <li>Inability to co-occur with another coordinator.</li>
                            <li>Ability to link phrasal units smaller than clauses.</li>
                        </ol>
                        <p><strong>Symmetrical Parallelism:</strong> Correlatives require identical parts of speech at both branches.</p>
                        <p>❌ *She is **not only** talented, **but also** has great charisma.* (Mất song hành: Adjective vs. VP).
                        <p>✔️ She **not only** is talented **but also** has great charisma.* (Song hành hoàn hảo: VP vs. VP).</p>
                    `
                },
                {
                    title: "Topic 17: Complex Sentence Subordination (Non-Finite & Verbless Clauses)",
                    content: `
                        <p><strong>Academic Definition:</strong> Subordination can be achieved via Finite, Non-Finite, or Verbless clauses. In reduced verbless clauses, the unexpressed subject **must** resolve to the grammatical subject of the main clause.</p>
                        <div class="warning-box">
                            <h4>⚠️ The Dangling Modifier Trap (Phân từ treo)</h4>
                            <p>Nếu chủ ngữ ngầm định của mệnh đề rút gọn không trùng với chủ ngữ của mệnh đề chính, câu sẽ mắc lỗi nghiêm trọng:
                            <br>❌ *"**Walking down the forest**, a wild slime attacked the mayor."* (Ý chỉ quả slime đang đi bộ!).
                            <br>✔️ "**Walking down the forest, the mayor** was attacked by a wild slime."* (Đồng bộ chủ ngữ).</p>
                        </div>
                    `
                },
                {
                    title: "Topic 18: Structural Reduction (Pro-Forms & Strict Ellipsis)",
                    content: `
                        <p><strong>Academic Definition:</strong> To avoid redundancy, English triggers two primary reduction mechanisms:</p>
                        <ul>
                            <li><strong>Pro-Forms:</strong> Replacing elements with empty grammatical words (e.g., *one/ones* for count nouns, *do so* for volitional actions, *so/not* for clausal structures).
                                <br>❌ *He liked the farm and she did so too* (liked is stative; must use *did too*).</li>
                            <li><strong>Ellipsis:</strong> Omitting elements that are exactly recoverable from context.
                                <br><em>Gapping (Lược bỏ động từ):</em> "John bought seeds, and Willy, **[bought]** bait."</li>
                        </ul>
                    `
                }
            ],
            quiz: {
                question: "Identify the sentence that correctly avoids the Dangling Modifier error according to CGEL:",
                options: [
                    { text: "A. While picking berries in the woods, a bear scared Abigail.", correct: false },
                    { text: "B. Although exhausted, the farm was cleared of rocks by the farmer.", correct: false },
                    { text: "C. Although exhausted, the farmer successfully cleared the field of rocks.", correct: true },
                    { text: "D. He loved the local community and his brother did so too.", correct: false }
                ]
            }
        },
        5: {
            title: "Module 05: Information Flow & Discourse",
            topics: [
                {
                    title: "Topic 19: Information Processing (Given-Before-New & End-Weight)",
                    content: `
                        <p><strong>Academic Definition:</strong> English is linearly organized to prioritize cognitive ease. Old/known information (**Theme**) acts as an anchor at the front, while heavy/new information (**Rheme/Focus**) is pushed to the end (**End-Weight Principle**).</p>
                        <p>To avoid heavy-subject overload, English triggers **Extraposition with dummy 'It'**:</p>
                        <p><em>Awkward/Heavy:</em> "[That we must harvest all parsnips before the sudden frost tomorrow] is crucial."</p>
                        <p><em>Symmetrical/Elegant:</em> "**It** is crucial [that we must harvest all parsnips before the sudden frost tomorrow]."</p>
                    `
                },
                {
                    title: "Topic 20: Text Linguistics (Cohesion & Coherence)",
                    content: `
                        <p><strong>Academic Definition:</strong> A text is structured through two layers of connectivity:</p>
                        <ul>
                            <li><strong>Cohesion (Liên kết hình thức):</strong> Surface-level grammatical and lexical ties.
                                <br>• *Anaphoric:* "The wizard cast a spell. **He** smiled." (Backward point).
                                <br>• *Cataphoric:* "When **she** arrived, **Abigail** went to the mines." (Forward point).</li>
                            <li><strong>Coherence (Mạch lạc nội dung):</strong> The deep, underlying logical continuity of concepts in the reader's mind.</li>
                        </ul>
                    `
                }
            ],
            quiz: {
                question: "Which syntactic mechanism is actively used to satisfy the End-Weight principle in: 'It surprised us that the wizard knew our names'?",
                options: [
                    { text: "A. Pseudo-clefting", correct: false },
                    { text: "B. Fronting", correct: false },
                    { text: "C. Extraposition with dummy 'It'", correct: true },
                    { text: "D. Cataphoric Reference", correct: false }
                ]
            }
        }
    };

    const questsData = [
        {
            title: "Quest 1: Mayor Lewis's Lucky Purple Shorts (Topic 15 - Negation)",
            desc: "Mayor Lewis has lost his lucky purple shorts at Marnie's ranch. He wrote a cryptic letter to avoid town gossip: <br><em>'I didn't visit Marnie's ranch because I wanted to borrow some milk.'</em><br>Help Lewis explain the ambiguity of this sentence to avoid a scandal!",
            q: "According to CGEL, why is this sentence grammatically ambiguous?",
            options: [
                { text: "A. Because 'because' is a coordinator.", correct: false },
                { text: "B. Because the causal adverbial clause can fall inside or outside the Scope of Negation, changing whether he actually visited her.", correct: true },
                { text: "C. Because 'Marnie's ranch' is a dangling modifier.", correct: false }
            ],
            reward: "+200 XP, +100 Gold"
        },
        {
            title: "Quest 2: Rasmodius's Arcane Spellbook (Topic 9 - Subjunctive)",
            desc: "The Wizard Rasmodius is brewing a magical void potion. He reads from his old spellbook: <br><em>'If the moon were being red yesterday, the potion would be complete.'</em><br>He feels there is an error in his counterfactual spell.",
            q: "What is the grammatical error in the Wizard's spellbook?",
            options: [
                { text: "A. It uses 'were' for a real past condition, which is a hypercorrection; it should use 'was'.", correct: true },
                { text: "B. It misses putative 'should'.", correct: false },
                { text: "C. 'were' must be changed to 'had been' to express intrinsic obligation.", correct: false }
            ],
            reward: "+200 XP, +100 Gold"
        },
        {
            title: "Quest 3: Pierre's Secret Stash (Topic 16 - Parallelism)",
            desc: "Pierre is hiding a secret ledger of 'hidden gold reserves' from Caroline. He wrote in his journal: <br><em>'My hobbies include hiding gold, selling crops, and to avoid taxes.'</em><br>Abigail found the journal and laughed at his terrible grammar.",
            q: "How should Pierre rewrite his journal to achieve strict grammatical parallelism?",
            options: [
                { text: "A. 'My hobbies include hiding gold, selling crops, and tax avoidance.'", correct: false },
                { text: "B. 'My hobbies include hiding gold, selling crops, and avoiding taxes.' (Symmetrical Gerunds)", correct: true },
                { text: "C. 'My hobbies include to hide gold, to sell crops, and avoiding taxes.'", correct: false }
            ],
            reward: "+200 XP, +100 Gold"
        }
    ];

    function switchModule(modId) {
        if (!gameState.unlocked[modId]) {
            alert("🔒 Directory is locked! Complete the Quiz in the previous module first to harvest its unlocking key.");
            return;
        }
        gameState.activeModule = modId;
        for (let i = 1; i <= 5; i++) {
            const el = document.getElementById('f-mod' + i);
            if (el) el.classList.remove('active');
        }
        document.getElementById('f-mod' + modId).classList.add('active');
        loadContent(modId);
    }

    function loadContent(modId) {
        const pane = document.getElementById('content-display');
        const data = modulesData[modId];
        
        let html = `<h1>🏡 ${data.title}</h1>`;
        if (gameState.completed['m' + modId].quiz) {
            html += `<div class="stamp">⭐ DIRECTORY FULLY HARVESTED (COMPLETED)</div>`;
        }

        data.topics.forEach((topic, idx) => {
            const isRead = gameState.completed['m' + modId].topics[idx];
            html += `
                <div class="parchment-scroll">
                    <h2>${topic.title}</h2>
                    ${topic.content}
                    <br>
                    ${isRead ? 
                        `<span style="color: #27AE60; font-weight: bold;">✔️ Crop Harvested! (+50 XP, +10 Gold)</span>` : 
                        `<button class="game-btn" onclick="gainTopicProgress(${modId}, ${idx})">🌾 Read & Harvest</button>`
                    }
                </div>
            `;
        });

        const isQuizDone = gameState.completed['m' + modId].quiz;
        if (!isQuizDone) {
            html += `
                <div class="quiz-container" id="quiz-block-${modId}">
                    <h3>🐔 Module 0${modId} Gatekeeper Quiz: Unlock Next Path!</h3>
                    <p><strong>Question:</strong> ${data.quiz.question}</p>
                    ${data.quiz.options.map((opt, oIdx) => `
                        <div class="quiz-option" onclick="checkGatekeeperAnswer(this, ${modId}, ${opt.correct})">${opt.text}</div>
                    `).join('')}
                </div>
            `;
        } else {
            html += `
                <div class="quiz-container">
                    <h3>✔️ Gatekeeper Cleared!</h3>
                    <p>You have unlocked the next directory path successfully.</p>
                </div>
            `;
        }

        pane.innerHTML = html;
    }

    function gainTopicProgress(modId, topicIdx) {
        if (gameState.completed['m' + modId].topics[topicIdx]) return;
        gameState.completed['m' + modId].topics[topicIdx] = true;
        
        gameState.xp += 50;
        gameState.gold += 10;
        
        updateHUD();
        updateFolderProgress(modId);
        loadContent(modId);
    }

    function checkGatekeeperAnswer(optionEl, modId, isCorrect) {
        if (isCorrect) {
            optionEl.classList.add('correct');
            optionEl.innerHTML += " ✔️ (+100 XP, +50 Gold!)";
            
            gameState.completed['m' + modId].quiz = true;
            gameState.xp += 100;
            gameState.gold += 50;
            
            const nextMod = modId + 1;
            if (nextMod <= 5) {
                gameState.unlocked[nextMod] = true;
                const folder = document.getElementById('f-mod' + nextMod);
                folder.classList.remove('locked');
                const badge = document.getElementById('lock-mod' + nextMod);
                if (badge) badge.innerHTML = "🔓";
                folder.querySelector('.folder-icon').innerHTML = "📂";
            }
            
            setTimeout(() => {
                updateHUD();
                updateFolderProgress(modId);
                if (modId < 5) {
                    alert("🎉 Level Up! You unlocked the folder path for Module 0" + nextMod + "!");
                    switchModule(nextMod);
                } else {
                    alert("🏆 CONGRATULATIONS! You completed all modules and became a master Syntax Farmer!");
                    loadContent(modId);
                }
            }, 1000);
        } else {
            optionEl.classList.add('wrong');
            optionEl.innerHTML += " ❌ (Energy drained!)";
            gameState.energy = Math.max(0, gameState.energy - 15);
            updateHUD();
        }
    }

    function showQuestBoard() {
        const pane = document.getElementById('content-display');
        let html = `<h1>🎯 Pelican Town Quest Board</h1>`;
        
        questsData.forEach((quest, idx) => {
            const isDone = gameState.completed.quests[idx];
            html += `
                <div class="parchment-scroll">
                    <h2>${quest.title}</h2>
                    <p>${quest.desc}</p>
                    <div class="quest-box">
                        <strong>Quest Objective:</strong> ${quest.q}
                        ${isDone ? `
                            <p style="color:#27AE60; font-weight:bold;">✔️ Completed! Reward Claimed: ${quest.reward}</p>
                        ` : `
                            <div style="margin-top: 10px;">
                                ${quest.options.map((opt, oIdx) => `
                                    <div class="quiz-option" onclick="checkQuestAnswer(this, ${idx}, ${opt.correct})">${opt.text}</div>
                                `).join('')}
                            </div>
                        `}
                    </div>
                </div>
            `;
        });
        
        pane.innerHTML = html;
    }

    function checkQuestAnswer(optionEl, questIdx, isCorrect) {
        if (isCorrect) {
            optionEl.classList.add('correct');
            optionEl.innerHTML += " ✔️ Quest Completed! (+200 XP, +100 Gold)";
            
            gameState.completed.quests[questIdx] = true;
            gameState.xp += 200;
            gameState.gold += 100;
            
            setTimeout(() => {
                updateHUD();
                showQuestBoard();
            }, 1000);
        } else {
            optionEl.classList.add('wrong');
            optionEl.innerHTML += " ❌ Failed to satisfy Pelican Town folk! (Energy -20)";
            gameState.energy = Math.max(0, gameState.energy - 20);
            updateHUD();
        }
    }

    function updateHUD() {
        document.getElementById('gold-value').innerText = gameState.gold;
        document.getElementById('xp-value').innerText = gameState.xp;
        document.getElementById('energy-bar').style.width = gameState.energy + "%";
        if (gameState.energy <= 0) {
            alert("💤 You passed out from exhaustion! Recovering energy to 100%...");
            gameState.energy = 100;
            document.getElementById('energy-bar').style.width = "100%";
        }
    }

    function updateFolderProgress(modId) {
        const mod = gameState.completed['m' + modId];
        let total = mod.topics.length + 1; // topics + quiz
        let done = 0;
        mod.topics.forEach(t => { if(t) done++; });
        if (mod.quiz) done++;
        
        const pct = Math.round((done / total) * 100);
        document.getElementById('progress-mod' + modId).innerText = "Progress: " + pct + "%";
    }

    updateHUD();
    loadContent(1);
</script>
</body>
</html>
```

---

## 👨‍🌾 LÝ THUYẾT CHI TIẾT & ĐÁP ÁN SƯ PHẠM (TEACHER'S UNABRIDGED COMPANION)

Dưới đây là phần nội dung lý thuyết học thuật chi tiết bằng tiếng Anh của từng chuyên đề, đi kèm hướng dẫn sư phạm (Pedagogical Guidelines) và các bẫy ngữ pháp (C1-C2 Pitfalls) bằng tiếng Việt để giáo viên tham chiếu khi hướng dẫn học sinh giải đố trên nền tảng.

### 📂 Module 01: The Clause & Noun Phrase (NP)

#### Topic 1: 7 Core Clause Types
*   **English Theory:** All clauses in English resolve to seven basic syntactic templates depending on the selection of verb valency. The slots S, V, O, C, and A must be filled by obligatory constituents.
*   *Pedagogical Guideline (Tiếng Việt):* Nhấn mạnh việc phân biệt **SVA** (như *"The cow is in the barn"*) với các câu có trạng ngữ chỉ nơi chốn tùy chọn (như *"She read the book in the library"* - SVO). Trạng ngữ bắt buộc là thành phần nếu lược bỏ sẽ làm sụp đổ cấu trúc ngữ pháp của câu.

#### Topic 2: Countability Gradient & Nominalization
*   **English Theory:** Countability operates on a spectrum (strictly count to non-count), where intermediate nouns exhibit dual-class membership. Nominalization shifts active verbal clauses into noun-headed structures (from verbal gerunds to fully nominal deverbals).
*   *Pedagogical Guideline (Tiếng Việt):* Hướng dẫn học sinh nhận diện sự khác biệt: Danh động từ (verbal gerund) vẫn giữ nguyên khả năng nhận tân ngữ trực tiếp (e.g., *"planting crops"*), trong khi danh từ phái sinh (deverbal noun) mất đi tính chất này và đòi hỏi giới từ hỗ trợ (e.g., *"the planting of crops"*).

#### Topic 3: 3-Position Determiner Matrix
*   **English Theory:** Determiners occupy three immutable linear positions in the NP: Pre-determiners, Central determiners, and Post-determiners. Two determiners from the same slot cannot co-occur.
*   *C1-C2 Pitfall (Tiếng Việt):* Lỗi chồng chéo từ hạn định trung tâm là bẫy phổ biến nhất. Học sinh tuyệt đối không viết ❌ *"the my parsnip"*, mà phải dùng cấu trúc sở hữu cách kép (double genitive): *"that parsnip of mine"*.

#### Topic 4: Advanced Subject-Verb Concord
*   **English Theory:** Concord is resolved through three competing principles: Grammatical concord (matching singular/plural forms), Notional concord (matching semantic meaning of numbers), and Proximity (matching the closest noun phrase).
*   *Pedagogical Guideline (Tiếng Việt):* Tại Anh-Anh (BrE), danh từ tập hợp thường đi với động từ số nhiều để nhấn mạnh hành động riêng rẽ của từng cá thể (Notional Concord: *"The committee have decided"*). Tại Anh-Mỹ (AmE), xu hướng grammatical concord luôn được ưu tiên giữ số ít.

#### Topic 5: Complex NP Architecture
*   **English Theory:** Postmodification in noun phrases is recursively nested. Prepositional phrases and relative clauses can stack indefinitely, sometimes leading to syntactic ambiguity.
*   *Pedagogical Guideline (Tiếng Việt):* Tập phân tích các câu có nhiều tầng giới từ xếp chồng (e.g., *"The chest on the table under the window next to the bed"*), chỉ ra cách xác định danh từ hạt nhân (head noun) để chia động từ chính xác.

---

### 📂 Module 02: The Verb Phrase & Modality

#### Topic 6: The Operator & NICE Properties
*   **English Theory:** The operator ganks four cardinal syntactic tasks: **[N]egation** (direct attachment of not), **[I]nversion** (subject-auxiliary swap), **[C]ode** (standing as a predicate pro-form), and **[E]mphasis** (bearing primary stress).
*   *Pedagogical Guideline (Tiếng Việt):* Giải thích vì sao khi phủ định động từ thường, ta bắt buộc phải đưa vào toán tử giả định *Do-support* (e.g., *"She doesn't know"*). Động từ BE là ngoại lệ duy nhất tự gánh vác cả 4 NICE properties.

#### Topic 7: Aspectual Semantics & Verb Shifts
*   **English Theory:** Aspects reflect the speaker's perspective on the temporal flow of an action. Stative verbs resist progressive aspects, but when forced, they shift meaning to indicate temporary or intentional behaviors.
*   *C1-C2 Pitfall (Tiếng Việt):* Cụm *"He is being polite"* không đơn giản là "đang lịch sự", mà ám chỉ hành vi mang tính ý chí chủ quan (volitional action) - đang cố tình tỏ ra lịch sự trong một thời điểm nhất thời.

#### Topic 8: Modality Spectrum (Intrinsic vs. Extrinsic)
*   **English Theory:** Intrinsic modality concerns human control and obligation (Deontic), whereas Extrinsic modality covers logical deduction and truth assessments (Epistemic).
*   *C1-C2 Pitfall (Tiếng Việt):* Tránh bẫy dùng sai động từ tính thái cho quá khứ. Để diễn tả một nghĩa vụ bắt buộc trong quá khứ, bắt buộc phải dùng **"had to"** thay thế cho "must". Cụm *"must have done"* chỉ được dành riêng cho suy đoán logic (Epistemic past deduction: *"You must have been tired"*).

#### Topic 9: The Subjunctive Mood
*   **English Theory:** The subjunctive mood expresses non-factual wishes, suggestions, and hypothetical states. The Mandative subjunctive (AmE) utilizes the bare infinitive regardless of subject person or tense.
*   *Pedagogical Guideline (Tiếng Việt):* Phân biệt cấu trúc giả định Anh-Mỹ (Mandative Subjunctive: *"suggested that he resign"*) với cấu trúc Anh-Anh dùng trợ động từ "should" (Putative should: *"suggested that he should resign"*).

#### Topic 10: The Passive Gradient
*   **English Theory:** Passives exist along a gradient from Central (purely verbal action) to Semi-passives (hybrid verbal-adjectival) and Pseudo-passives (purely adjectival states).
*   *Pedagogical Guideline (Tiếng Việt):* Dạy học sinh sử dụng 3 phép thử của Quirk để chứng minh tính từ hóa (Adjectival tests) của một Semi-passive: (1) Thay thế *be* bằng hệ liên động từ khác (*felt, looked*), (2) Bổ nghĩa bằng trạng từ mức độ *very*, và (3) Kết hợp đẳng lập với tính từ thuần túy.

---

### 📂 Module 03: Modifiers, Prepositions & Adverbials

#### Topic 11: Adjectives & Adverbs
*   **English Theory:** Adjectives are central when they function attributively and predicatively. Peripheral adjectives are restricted to single slots (Attributive-only vs. Predicative-only).
*   *C1-C2 Pitfall (Tiếng Việt):* Học sinh hay mắc lỗi dùng sai tính từ nhóm tiền tố *a-* làm từ bổ nghĩa đứng trước danh từ. Tránh viết ❌ *"an afraid child"*, bắt buộc phải chuyển sang tính từ thuộc nhóm thuộc tính (attributive): *"a frightened child"*.

#### Topic 12: Prepositions & Stranded Prepositions
*   **English Theory:** Preposition stranding is triggered in informal and standard English when the prepositional complement is moved to the front. In formal styles, the preposition must be Piedmont-fronted with its complement.
*   *Pedagogical Guideline (Tiếng Việt):* Cấu trúc bị động giới từ (Prepositional Passive) bắt buộc phải sử dụng giới từ treo (e.g., *"The boy was laughed **at**"*). Việc cố tình đảo giới từ lên đầu trong cấu trúc này là lỗi sai cú pháp nghiêm trọng.

#### Topic 13: Adverbials I: Adjuncts vs. Subjuncts
*   **English Theory:** Adjuncts are fully integrated into the clause syntax (answering How, When, Where). Subjuncts are downgraded and target specific elements rather than the whole clause.
*   *Pedagogical Guideline (Tiếng Việt):* Bẫy đặt sai vị trí của trạng từ tiêu điểm (*only*). Cho học sinh so sánh ngữ nghĩa của: *"**Only** Pierre sold the seeds"* (chỉ có Pierre bán, không ai khác) vs. *"Pierre sold the seeds **only** to Abigail"* (Pierre bán hạt giống cho Abigail và không ai khác).

#### Topic 14: Adverbials II: Disjuncts vs. Conjuncts
*   **English Theory:** Disjuncts evaluate style or content from the speaker's standpoint. Conjuncts serve to connect clauses logically.
*   *C1-C2 Pitfall (Tiếng Việt):* Học sinh thường lạm dụng *"On the contrary"* để thay thế *"On the other hand"*. Nhắc nhở các em: *"On the contrary"* chỉ được phép dùng để phản bác và đưa ra ý kiến trái ngược hoàn toàn với một nhận định PHỦ ĐỊNH đứng trước đó.

---

### 📂 Module 04: Sentence Architecture & Reduction

#### Topic 15: Advanced Negation
*   **English Theory:** Clausal negation changes the truth-value of the entire clause. Local negation targets only a constituent. A final cause clause (because) creates a severe ambiguity zone.
*   *Pedagogical Guideline (Tiếng Việt):* Phân tích câu bẫy kinh điển: *"I didn't marry her because I loved her"*. Nếu trạng ngữ nằm trong phạm vi phủ định (inside scope): Tôi có lấy cô ấy, nhưng không phải vì yêu (phủ định nguyên nhân). Nếu nằm ngoài (outside scope): Vì yêu cô ấy nên tôi quyết định không lấy (phủ định hành động).

#### Topic 16: Coordination & Parallelism
*   **English Theory:** True coordinators satisfy 4 strict syntactic tests. Correlative structures demand exact symmetrical syntax.
*   *C1-C2 Pitfall (Tiếng Việt):* Lỗi mất cân đối cấu trúc song hành (Faulty Parallelism). Cặp *not only... but also* phải kết nối các thành phần cùng loại từ. Sửa lỗi: ❌ *"not only talented [Adj] but also has charisma [VP]"* -> *"not only talented [Adj] but also charismatic [Adj]"*.

#### Topic 17: Complex Sentence Subordination
*   **English Theory:** Reduction of subordinate clauses results in non-finite or verbless clauses. The unexpressed subject of these clauses must be coreferential with the main clause subject.
*   *C1-C2 Pitfall (Tiếng Việt):* Lỗi phân từ treo (Dangling Modifiers). Khi đọc một câu rút gọn như *"Walking down the street, a brick hit him"*, người đọc sẽ tự động hiểu ngầm chủ ngữ của hành động đi bộ là "a brick" (vô lý). Phải sửa chủ ngữ mệnh đề chính thành *"he was hit by a brick"*.

#### Topic 18: Structural Reduction (Pro-Forms & Ellipsis)
*   **English Theory:** Pro-forms replace constituents with empty grammatical tokens. Ellipsis omits elements under strict structural recoverability conditions.
*   *Pedagogical Guideline (Tiếng Việt):* Hướng dẫn học sinh phân biệt: Cụm từ thế *"do so"* chỉ đại diện cho các động từ chỉ hành động có chủ ý (volitional dynamic verbs). Với các động từ chỉ trạng thái (stative verbs), bắt buộc phải dùng toán tử *"do"* đơn độc (e.g., *"He liked the farm and his brother did too"*).

---

### 📂 Module 05: Information Flow & Discourse

#### Topic 19: Information Processing
*   **English Theory:** English linearly presents old information (**Theme**) before new, heavy information (**Rheme**). The **End-Weight Principle** pushes heavy clauses (like nominal clauses) to the back, using dummy *It* extrapositions.
*   *Pedagogical Guideline (Tiếng Việt):* Giảng giải về sự mất cân đối của câu "đầu nặng đuôi nhẹ" (heavy-subject clauses). Việc dùng chủ ngữ giả *It* giúp câu văn đạt độ cân bằng và thanh thoát tối ưu, rất quan trọng khi viết bài luận học thuật.

#### Topic 20: Text Linguistics
*   **English Theory:** Discourse is held together by Cohesion (surface-level lexicogrammatical bonds) and Coherence (deep conceptual connectivity). Reference chains are mapped as either Anaphoric (backward pointing) or Cataphoric (forward pointing).
*   *Pedagogical Guideline (Tiếng Việt):* Cho học sinh thực hành dệt các "chuỗi liên kết" (cohesive chains) bằng cách kết hợp đại từ hồi chỉ, từ đồng nghĩa và các trạng từ liên kết logic (conjuncts) để nối các đoạn văn nghị luận một cách chặt chẽ.

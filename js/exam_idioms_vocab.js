/* -------------------------------------------------------------
 * Đưa bộ Exam Idioms (js/exam_idioms_data.js) vào Vocabulary Mastery
 * thành chủ đề "examIdioms" trong mục Extra Materials.
 * Chuyển từng mục sang định dạng của vocabulary_data.js để dùng chung
 * Flashcard, Meaning Quiz, Sentence Completion và Boss Battle.
 * Nạp file này sau vocabulary_data.js và exam_idioms_data.js.
 * ------------------------------------------------------------- */
(function () {
  if (typeof vocabularyData === 'undefined' || typeof examIdiomData === 'undefined') return;

  const LETTERS = ['A', 'B', 'C', 'D'];

  vocabularyData.examIdioms = (examIdiomData.tongHop || []).map(e => ({
    word: e.phrase,
    type: e.type,                         // phrasal_verb, idiom, collocation, ...
    ipa: '',
    meaning: e.meaning_vi,
    definition: e.cambridge_def,
    example: e.example_en,
    exampleTranslation: e.example_vi,
    blankSentence: e.sentence,            // câu điền từ trích từ đề thi
    options: e.options,
    answer: LETTERS[e.correct_index],
    explanation: e.sentence_explanation   // giải thích riêng cho câu điền từ
  }));
})();

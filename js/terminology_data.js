/* -------------------------------------------------------------
 * Academic Terminology Data:
 * - medicineTerms: Healthcare, Clinical, Pathology & Epidemiology
 * - economicTerms: Macro/Microeconomics, Finance, Markets & Trade
 * - technologyTerms: AI, Computer Science, Cybersecurity & Digital Innovation
 *
 * Appended to global vocabularyData object for Vocabulary Mastery.
 * ------------------------------------------------------------- */

(function () {
  if (typeof vocabularyData === 'undefined') {
    window.vocabularyData = {};
  }

  // 1. MEDICINE TERMS
  vocabularyData.medicineTerms = [
    {
      word: "Antibiotic",
      type: "n",
      ipa: "/ˌæn.ti.baɪˈɒt.ɪk/",
      meaning: "Thuốc kháng sinh",
      example: "Overusing antibiotics can lead to drug-resistant bacterial strains.",
      exampleTranslation: "Lạm dụng thuốc kháng sinh có thể dẫn đến các chủng vi khuẩn kháng thuốc."
    },
    {
      word: "Antibody",
      type: "n",
      ipa: "/ˈæn.tiˌbɒd.i/",
      meaning: "Kháng thể",
      example: "The immune system produces antibodies to neutralize foreign pathogens.",
      exampleTranslation: "Hệ miễn dịch sản sinh kháng thể để vô hiệu hóa các mầm bệnh ngoại lai."
    },
    {
      word: "Antiseptic",
      type: "n",
      ipa: "/ˌæn.tiˈsep.tɪk/",
      meaning: "Chất khử trùng, thuốc sát trùng",
      example: "The nurse cleaned the open wound thoroughly with an antiseptic solution.",
      exampleTranslation: "Y tá đã rửa sạch vết thương hở bằng dung dịch sát trùng."
    },
    {
      word: "Anesthesia",
      type: "n",
      ipa: "/ˌæn.əsˈθiː.zi.ə/",
      meaning: "Thuốc gây mê / trạng thái vô cảm",
      example: "The patient underwent major surgery under general anesthesia.",
      exampleTranslation: "Bệnh nhân đã trải qua ca đại phẫu dưới sự gây mê toàn thân."
    },
    {
      word: "Asymptomatic",
      type: "adj",
      ipa: "/ˌeɪ.sɪmp.təˈmæt.ɪk/",
      meaning: "Không có triệu chứng",
      example: "Many individuals infected with the virus remained completely asymptomatic.",
      exampleTranslation: "Nhiều người nhiễm virus hoàn toàn không biểu hiện triệu chứng nào."
    },
    {
      word: "Benign",
      type: "adj",
      ipa: "/bɪˈnaɪn/",
      meaning: "Lành tính (khối u)",
      example: "Biopsy results confirmed that the detected tumor was benign and non-cancerous.",
      exampleTranslation: "Kết quả sinh thiết xác nhận khối u được phát hiện là lành tính và không phải ung thư."
    },
    {
      word: "Biopsy",
      type: "n",
      ipa: "/ˈbaɪ.ɒp.si/",
      meaning: "Sinh thiết (lấy mẫu mô để xét nghiệm)",
      example: "The surgeon performed a needle biopsy to examine tissue from the liver.",
      exampleTranslation: "Bác sĩ phẫu thuật đã tiến hành sinh thiết kim để kiểm tra mô gan."
    },
    {
      word: "Cardiopulmonary",
      type: "adj",
      ipa: "/ˌkɑː.di.əʊˈpʌl.mə.nər.i/",
      meaning: "Thuộc tim phổi",
      example: "Paramedics performed cardiopulmonary resuscitation to restore the patient's breathing.",
      exampleTranslation: "Nhân viên y tế đã hồi sức tim phổi để phục hồi nhịp thở cho người bệnh."
    },
    {
      word: "Chemotherapy",
      type: "n",
      ipa: "/ˌkiː.məʊˈθer.ə.pi/",
      meaning: "Hóa trị (điều trị ung thư bằng hóa chất)",
      example: "Targeted chemotherapy destroys rapidly dividing cancer cells while sparing healthy tissue.",
      exampleTranslation: "Hóa trị nhắm trúng đích tiêu diệt các tế bào ung thư phân chia nhanh đồng thời hạn chế tổn hại mô khỏe mạnh."
    },
    {
      word: "Chronic",
      type: "adj",
      ipa: "/ˈkrɒn.ɪk/",
      meaning: "Mãn tính (kéo dài kinh niên)",
      example: "Diabetes and hypertension are chronic conditions requiring lifelong lifestyle management.",
      exampleTranslation: "Tiểu đường và tăng huyết áp là những bệnh mãn tính đòi hỏi phải quản lý lối sống suốt đời."
    },
    {
      word: "Clinical trial",
      type: "n.phr",
      ipa: "/ˈklɪn.ɪ.kəl traɪəl/",
      meaning: "Thử nghiệm lâm sàng",
      example: "The newly developed vaccine entered phase three clinical trials involving thousands of volunteers.",
      exampleTranslation: "Loại vaccine mới phát triển đã bước vào giai đoạn thử nghiệm lâm sàng thứ ba với sự tham gia của hàng nghìn tình nguyện viên."
    },
    {
      word: "Comorbidity",
      type: "n",
      ipa: "/ˌkəʊ.mɔːˈbɪd.ə.ti/",
      meaning: "Bệnh lý đi kèm / bệnh đồng mắc",
      example: "Elderly patients with severe comorbidity face higher risks of surgical complications.",
      exampleTranslation: "Bệnh nhân cao tuổi mắc bệnh đồng mắc nặng phải đối mặt với nguy cơ biến chứng phẫu thuật cao hơn."
    },
    {
      word: "Diagnosis",
      type: "n",
      ipa: "/ˌdaɪ.əɡˈnəʊ.sɪs/",
      meaning: "Sự chẩn đoán bệnh",
      example: "An early diagnosis of heart disease dramatically improves long-term survival prospects.",
      exampleTranslation: "Việc chẩn đoán sớm bệnh tim cải thiện đáng kể triển vọng sống sót lâu dài."
    },
    {
      word: "Epidemic",
      type: "n",
      ipa: "/ˌep.ɪˈdem.ɪk/",
      meaning: "Dịch bệnh (lây lan nhanh trong một vùng)",
      example: "Public health officials worked around the clock to contain the regional cholera epidemic.",
      exampleTranslation: "Các quan chức y tế công cộng đã làm việc ngày đêm để ngăn chặn dịch tả trong khu vực."
    },
    {
      word: "Etiology",
      type: "n",
      ipa: "/ˌiː.tiˈɒl.ə.dʒi/",
      meaning: "Căn nguyên bệnh học",
      example: "Researchers investigated the underlying etiology of the mysterious respiratory illness.",
      exampleTranslation: "Các nhà nghiên cứu đã điều tra căn nguyên sâu xa của căn bệnh hô hấp bí ẩn."
    },
    {
      word: "Gene therapy",
      type: "n.phr",
      ipa: "/dʒiːn ˈθer.ə.pi/",
      meaning: "Liệu pháp gen",
      example: "Gene therapy offers unprecedented hope for curing hereditary genetic disorders.",
      exampleTranslation: "Liệu pháp gen mang lại hy vọng chưa từng có trong việc chữa khỏi các rối loạn di truyền bẩm sinh."
    },
    {
      word: "Immunity",
      type: "n",
      ipa: "/ɪˈmjuː.nə.ti/",
      meaning: "Khả năng miễn dịch",
      example: "Widespread vaccination fosters herd immunity, safeguarding vulnerable infants.",
      exampleTranslation: "Tiêm chủng diện rộng tạo ra miễn dịch cộng đồng, bảo vệ những trẻ sơ sinh dễ bị tổn thương."
    },
    {
      word: "Immunosuppressant",
      type: "n",
      ipa: "/ˌɪm.jə.nəʊ.səˈpres.ənt/",
      meaning: "Thuốc ức chế miễn dịch",
      example: "Organ transplant recipients take immunosuppressants to prevent organ rejection.",
      exampleTranslation: "Người nhận ghép tạng phải dùng thuốc ức chế miễn dịch để ngăn ngừa hiện tượng thải ghép."
    },
    {
      word: "Incubation period",
      type: "n.phr",
      ipa: "/ˌɪŋ.kjəˈbeɪ.ʃən ˈpɪə.ri.əd/",
      meaning: "Thời kỳ ủ bệnh",
      example: "The incubation period of the disease ranges from two to fourteen days before fever appears.",
      exampleTranslation: "Thời kỳ ủ bệnh dao động từ hai đến mười bốn ngày trước khi cơn sốt xuất hiện."
    },
    {
      word: "Infectious",
      type: "adj",
      ipa: "/ɪnˈfek.ʃəs/",
      meaning: "Truyền nhiễm, lây lan",
      example: "Airborne viruses are exceptionally infectious in enclosed and poorly ventilated spaces.",
      exampleTranslation: "Các virus lây qua không khí đặc biệt dễ truyền nhiễm trong không gian kín và thông gió kém."
    },
    {
      word: "Inflammation",
      type: "n",
      ipa: "/ˌɪn.fləˈmeɪ.ʃən/",
      meaning: "Tình trạng viêm nhiễm, sưng tấy",
      example: "Anti-inflammatory drugs reduce swelling, pain, and tissue inflammation.",
      exampleTranslation: "Thuốc chống viêm giúp giảm sưng, đau và tình trạng viêm của mô tế bào."
    },
    {
      word: "Inoculation",
      type: "n",
      ipa: "/ɪˌnɒk.jəˈleɪ.ʃən/",
      meaning: "Sự tiêm chủng / cấy chủng ngừa",
      example: "Mass inoculation campaigns successfully eradicated smallpox across the globe.",
      exampleTranslation: "Các chiến dịch tiêm chủng hàng loạt đã xóa sổ thành công bệnh đậu mùa trên toàn cầu."
    },
    {
      word: "Intensive care",
      type: "n.phr",
      ipa: "/ɪnˌten.sɪv ˈkeər/",
      meaning: "Chăm sóc tích cực (hồi sức cấp cứu)",
      example: "Critically ill trauma patients were placed immediately in the intensive care unit.",
      exampleTranslation: "Các bệnh nhân chấn thương nguy kịch đã được chuyển ngay vào phòng chăm sóc tích cực."
    },
    {
      word: "Malignant",
      type: "adj",
      ipa: "/məˈlɪɡ.nənt/",
      meaning: "Ác tính (ung thư)",
      example: "Doctors recommended aggressive radiation therapy after discovering a malignant tumor.",
      exampleTranslation: "Các bác sĩ đề xuất xạ trị tích cực sau khi phát hiện một khối u ác tính."
    },
    {
      word: "Metabolism",
      type: "n",
      ipa: "/məˈtæb.əl.ɪ.zəm/",
      meaning: "Quá trình trao đổi chất",
      example: "Thyroid hormones regulate baseline cellular metabolism and energy expenditure.",
      exampleTranslation: "Hormone tuyến giáp điều hòa quá trình trao đổi chất cơ bản của tế bào và mức tiêu hao năng lượng."
    },
    {
      word: "Morbidity",
      type: "n",
      ipa: "/mɔːˈbɪd.ə.ti/",
      meaning: "Tỷ lệ mắc bệnh",
      example: "Preventative medicine aims to reduce both morbidity and mortality within the populace.",
      exampleTranslation: "Y học dự phòng nhằm mục đích giảm cả tỷ lệ mắc bệnh lẫn tỷ lệ tử vong trong dân số."
    },
    {
      word: "Mortality rate",
      type: "n.phr",
      ipa: "/mɔːˈtæl.ə.ti reɪt/",
      meaning: "Tỷ lệ tử vong",
      example: "Modern sanitation and clean drinking water drastically decreased the infant mortality rate.",
      exampleTranslation: "Điều kiện vệ sinh hiện đại và nước uống sạch đã giảm mạnh tỷ lệ tử vong ở trẻ sơ sinh."
    },
    {
      word: "Neurological",
      type: "adj",
      ipa: "/ˌnjʊə.rəˈlɒdʒ.ɪ.kəl/",
      meaning: "Thuộc hệ thần kinh",
      example: "Stroke patients frequently receive specialized neurological rehabilitation therapy.",
      exampleTranslation: "Bệnh nhân đột quỵ thường nhận được liệu pháp phục hồi chức năng thần kinh chuyên biệt."
    },
    {
      word: "Oncology",
      type: "n",
      ipa: "/ɒŋˈkɒl.ə.dʒi/",
      meaning: "Khoa ung bướu / ung thư học",
      example: "The hospital's oncology department specializes in cutting-edge immunotherapy.",
      exampleTranslation: "Khoa ung bướu của bệnh viện chuyên về liệu pháp miễn dịch điều trị ung thư tiên tiến."
    },
    {
      word: "Palliative care",
      type: "n.phr",
      ipa: "/ˈpæl.i.ə.tɪv keər/",
      meaning: "Chăm sóc giảm nhẹ (nâng đỡ bệnh nhân nan y)",
      example: "Palliative care focuses on relieving pain and improving the quality of remaining life.",
      exampleTranslation: "Chăm sóc giảm nhẹ tập trung vào việc xoa dịu nỗi đau và nâng cao chất lượng cuộc sống còn lại."
    },
    {
      word: "Pandemic",
      type: "n",
      ipa: "/pænˈdem.ɪk/",
      meaning: "Đại dịch toàn cầu",
      example: "The global pandemic triggered nationwide lockdowns and disrupted international supply chains.",
      exampleTranslation: "Đại dịch toàn cầu đã gây ra các đợt phong tỏa toàn quốc và làm gián đoạn chuỗi cung ứng quốc tế."
    },
    {
      word: "Pathology",
      type: "n",
      ipa: "/pəˈθɒl.ə.dʒi/",
      meaning: "Bệnh lý học",
      example: "Pathology tests of the tissue sample revealed abnormal cell division.",
      exampleTranslation: "Các xét nghiệm bệnh lý học trên mẫu mô đã phát hiện ra sự phân chia tế bào bất thường."
    },
    {
      word: "Pharmacology",
      type: "n",
      ipa: "/ˌfɑː.məˈkɒl.ə.dʒi/",
      meaning: "Dược lý học",
      example: "Students of pharmacology study how medicinal chemicals interact with biological systems.",
      exampleTranslation: "Sinh viên dược lý học nghiên cứu cách thức các hóa chất dược phẩm tương tác với các hệ sinh học."
    },
    {
      word: "Placebo",
      type: "n",
      ipa: "/pləˈsiː.bəʊ/",
      meaning: "Giả dược (thuốc trấn an tâm lý không chứa hoạt chất)",
      example: "Half of the trial participants received the real drug while the control group took a placebo.",
      exampleTranslation: "Một nửa số người tham gia thử nghiệm nhận thuốc thật trong khi nhóm đối chứng dùng giả dược."
    },
    {
      word: "Prognosis",
      type: "n",
      ipa: "/prɒɡˈnəʊ.sɪs/",
      meaning: "Tiên lượng bệnh (dự đoán diễn biến)",
      example: "With prompt medical intervention, the long-term prognosis for recovery was excellent.",
      exampleTranslation: "Nhờ sự can thiệp y tế kịp thời, tiên lượng phục hồi lâu dài là rất khả quan."
    },
    {
      word: "Prophylaxis",
      type: "n",
      ipa: "/ˌprɒf.ɪˈlæk.sɪs/",
      meaning: "Biện pháp phòng bệnh / điều trị dự phòng",
      example: "Travelers to tropical regions often take antimalarial medication as chemical prophylaxis.",
      exampleTranslation: "Du khách đến các vùng nhiệt đới thường uống thuốc sốt rét như một biện pháp điều trị dự phòng."
    },
    {
      word: "Quarantine",
      type: "n",
      ipa: "/ˈkwɒr.ən.tiːn/",
      meaning: "Sự cách ly kiểm dịch",
      example: "Passengers arriving from affected territories were placed under strict 14-day quarantine.",
      exampleTranslation: "Hành khách đến từ các vùng bị ảnh hưởng đã được đưa vào diện cách ly kiểm dịch nghiêm ngặt trong 14 ngày."
    },
    {
      word: "Radiotherapy",
      type: "n",
      ipa: "/ˌreɪ.di.əʊˈθer.ə.pi/",
      meaning: "Xạ trị",
      example: "High-energy beams are focused during radiotherapy to shrink deep-seated tumors.",
      exampleTranslation: "Các chùm tia năng lượng cao được hội tụ trong quá trình xạ trị để làm teo nhỏ các khối u nằm sâu."
    },
    {
      word: "Remission",
      type: "n",
      ipa: "/rɪˈmɪʃ.ən/",
      meaning: "Sự thuyên giảm bệnh (hết triệu chứng lâm sàng)",
      example: "After six rounds of intensive treatment, the patient's leukemia went into complete remission.",
      exampleTranslation: "Sau sáu đợt điều trị tích cực, bệnh bạch cầu của bệnh nhân đã bước vào giai đoạn thuyên giảm hoàn toàn."
    },
    {
      word: "Resuscitation",
      type: "n",
      ipa: "/rɪˌsʌs.ɪˈteɪ.ʃən/",
      meaning: "Sự hồi sức, làm cho tỉnh lại",
      example: "Immediate emergency resuscitation prevented permanent brain damage after cardiac arrest.",
      exampleTranslation: "Hồi sức cấp cứu tức thời đã ngăn chặn tổn thương não vĩnh viễn sau cơn ngừng tim."
    },
    {
      word: "Sepsis",
      type: "n",
      ipa: "/ˈsep.sɪs/",
      meaning: "Nhiễm trùng huyết",
      example: "Severe sepsis occurs when the body's overwhelming response to infection damages its own organs.",
      exampleTranslation: "Nhiễm trùng huyết nặng xảy ra khi phản ứng quá mức của cơ thể đối với nhiễm trùng gây tổn thương chính các cơ quan của nó."
    },
    {
      word: "Symptom",
      type: "n",
      ipa: "/ˈsɪmp.təm/",
      meaning: "Triệu chứng",
      example: "Persistent fatigue, coughing, and high fever are common clinical symptoms of pneumonia.",
      exampleTranslation: "Mệt mỏi kéo dài, ho và sốt cao là các triệu chứng lâm sàng phổ biến của viêm phổi."
    },
    {
      word: "Syndrome",
      type: "n",
      ipa: "/ˈsɪn.drəʊm/",
      meaning: "Hội chứng",
      example: "Irritable bowel syndrome causes significant digestive discomfort without structural lesions.",
      exampleTranslation: "Hội chứng ruột kích thích gây ra sự khó chịu tiêu hóa đáng kể mà không có tổn thương thực thể."
    },
    {
      word: "Therapy",
      type: "n",
      ipa: "/ˈθer.ə.pi/",
      meaning: "Liệu pháp, phương pháp điều trị",
      example: "Physical therapy helps post-operative patients regain joint mobility and muscular strength.",
      exampleTranslation: "Vật lý trị liệu giúp các bệnh nhân sau phẫu thuật lấy lại khả năng vận động khớp và sức mạnh cơ bắp."
    },
    {
      word: "Toxicity",
      type: "n",
      ipa: "/tɒkˈsɪs.ə.ti/",
      meaning: "Độc tính",
      example: "Preclinical studies carefully assess the toxicity of pharmaceutical compounds on renal function.",
      exampleTranslation: "Các nghiên cứu tiền lâm sàng đánh giá cẩn trọng độc tính của các hợp chất dược phẩm lên chức năng thận."
    },
    {
      word: "Transmission",
      type: "n",
      ipa: "/trænzˈmɪʃ.ən/",
      meaning: "Sự truyền bệnh / đường lây truyền",
      example: "Wearing face masks dramatically restricts the airborne transmission of respiratory pathogens.",
      exampleTranslation: "Đeo khẩu trang hạn chế đáng kể sự lây truyền qua đường không khí của các mầm bệnh hô hấp."
    },
    {
      word: "Vaccination",
      type: "n",
      ipa: "/ˌvæk.sɪˈneɪ.ʃən/",
      meaning: "Sự tiêm chủng vaccine",
      example: "Childhood vaccination confers enduring protection against debilitating infectious diseases.",
      exampleTranslation: "Tiêm chủng thời thơ ấu mang lại sự bảo vệ lâu dài chống lại các bệnh truyền nhiễm gây suy nhược."
    },
    {
      word: "Virulence",
      type: "n",
      ipa: "/ˈvɪr.jə.ləns/",
      meaning: "Độc lực (mức độ gây bệnh của vi sinh vật)",
      example: "Mutations can either heighten or diminish the biological virulence of an emergent virus.",
      exampleTranslation: "Các đột biến có thể làm tăng cao hoặc làm giảm bớt độc lực sinh học của một loại virus mới xuất hiện."
    },
    {
      word: "Vital signs",
      type: "n.phr",
      ipa: "/ˈvaɪ.təl saɪnz/",
      meaning: "Dấu hiệu sinh tồn (mạch, huyết áp, nhịp thở, thân nhiệt)",
      example: "Nurses monitor the patient's vital signs every half hour following surgery.",
      exampleTranslation: "Các y tá theo dõi các dấu hiệu sinh tồn của bệnh nhân nửa giờ một lần sau ca phẫu thuật."
    }
  ];

  // 2. ECONOMIC TERMS
  vocabularyData.economicTerms = [
    {
      word: "Aggregate demand",
      type: "n.phr",
      ipa: "/ˈæɡ.rɪ.ɡət dɪˈmɑːnd/",
      meaning: "Tổng cầu (tổng nhu cầu chi tiêu trong nền kinh tế)",
      example: "Government stimulus packages were enacted to stimulate aggregate demand during the slump.",
      exampleTranslation: "Các gói kích thích của chính phủ đã được ban hành để kích thích tổng cầu trong thời kỳ suy thoái."
    },
    {
      word: "Asset",
      type: "n",
      ipa: "/ˈæs.et/",
      meaning: "Tài sản",
      example: "Liquid assets like cash and short-term bonds can be quickly converted without substantial loss.",
      exampleTranslation: "Các tài sản thanh khoản như tiền mặt và trái phiếu ngắn hạn có thể chuyển đổi nhanh chóng mà không bị tổn thất đáng kể."
    },
    {
      word: "Austerity",
      type: "n",
      ipa: "/ɒsˈter.ə.ti/",
      meaning: "Chính sách thắt lưng buộc bụng (cắt giảm chi tiêu công)",
      example: "Severe fiscal austerity measures sparked protests among public sector workers.",
      exampleTranslation: "Các biện pháp thắt lưng buộc bụng tài khóa nghiêm ngặt đã gây ra các cuộc biểu tình trong công chức khu vực công."
    },
    {
      word: "Balance of trade",
      type: "n.phr",
      ipa: "/ˈbæl.əns əv treɪd/",
      meaning: "Cán cân thương mại",
      example: "A country achieves a favorable balance of trade when the value of exports exceeds imports.",
      exampleTranslation: "Một quốc gia đạt được cán cân thương mại thuận lợi khi giá trị xuất khẩu vượt quá nhập khẩu."
    },
    {
      word: "Bear market",
      type: "n.phr",
      ipa: "/beər ˈmɑː.kɪt/",
      meaning: "Thị trường gấu (thị trường giá xuống, suy thoái)",
      example: "Investors adopted defensive portfolio strategies as equities tumbled into a bear market.",
      exampleTranslation: "Các nhà đầu tư áp dụng chiến lược danh mục phòng thủ khi cổ phiếu lao dốc vào thị trường gấu."
    },
    {
      word: "Bull market",
      type: "n.phr",
      ipa: "/bʊl ˈmɑː.kɪt/",
      meaning: "Thị trường bò tót (thị trường giá lên, tăng trưởng mạnh)",
      example: "Technological innovation and low borrowing costs fueled a prolonged bull market in tech stocks.",
      exampleTranslation: "Đổi mới công nghệ và chi phí vay vốn thấp đã thúc đẩy một thị trường giá lên kéo dài trong nhóm cổ phiếu công nghệ."
    },
    {
      word: "Capital expenditure",
      type: "n.phr",
      ipa: "/ˈkæp.ɪ.təl ɪkˈspen.dɪ.tʃər/",
      meaning: "Chi tiêu vốn (đầu tư tài sản cố định dài hạn)",
      example: "The manufacturing conglomerate boosted capital expenditure to modernize its assembly lines.",
      exampleTranslation: "Tập đoàn sản xuất đã tăng chi tiêu vốn để hiện đại hóa các dây chuyền lắp ráp của mình."
    },
    {
      word: "Central bank",
      type: "n.phr",
      ipa: "/ˈsen.trəl bæŋk/",
      meaning: "Ngân hàng trung ương",
      example: "The central bank raised benchmark interest rates to rein in runaway inflation.",
      exampleTranslation: "Ngân hàng trung ương đã tăng lãi suất cơ bản để kiềm chế lạm phát phi mã."
    },
    {
      word: "Collateral",
      type: "n",
      ipa: "/kəˈlæt.ər.əl/",
      meaning: "Tài sản thế chấp / tài sản bảo đảm",
      example: "Commercial banks usually demand real estate as collateral before approving substantial loans.",
      exampleTranslation: "Các ngân hàng thương mại thường yêu cầu bất động sản làm tài sản thế chấp trước khi phê duyệt các khoản vay lớn."
    },
    {
      word: "Consumer price index",
      type: "n.phr",
      ipa: "/kənˈsjuː.mər praɪs ˈɪn.deks/",
      meaning: "Chỉ số giá tiêu dùng (CPI)",
      example: "The consumer price index rose by four percent, indicating sustained upward pressure on living costs.",
      exampleTranslation: "Chỉ số giá tiêu dùng tăng 4%, cho thấy áp lực gia tăng liên tục đối với chi phí sinh hoạt."
    },
    {
      word: "Deficit",
      type: "n",
      ipa: "/ˈdef.ɪ.sɪt/",
      meaning: "Thâm hụt (ngân sách hoặc thương mại)",
      example: "Excessive public spending widened the federal budget deficit to historic heights.",
      exampleTranslation: "Chi tiêu công quá mức đã nới rộng mức thâm hụt ngân sách liên bang lên mức cao kỷ lục."
    },
    {
      word: "Deflation",
      type: "n",
      ipa: "/dɪˈfleɪ.ʃən/",
      meaning: "Giảm phát (mức giá chung giảm liên tục)",
      example: "Persistent deflation discourages consumer spending as buyers anticipate further price drops.",
      exampleTranslation: "Giảm phát kéo dài làm thui chột chi tiêu tiêu dùng do người mua dự đoán giá sẽ còn hạ thêm."
    },
    {
      word: "Depreciation",
      type: "n",
      ipa: "/dɪˌpriː.ʃiˈeɪ.ʃən/",
      meaning: "Khấu hao tài sản / sự mất giá đồng tiền",
      example: "Currency depreciation makes exported goods cheaper abroad while driving up import expenses.",
      exampleTranslation: "Sự mất giá của đồng nội tệ khiến hàng hóa xuất khẩu rẻ hơn ở nước ngoài nhưng lại làm tăng chi phí nhập khẩu."
    },
    {
      word: "Deregulation",
      type: "n",
      ipa: "/diːˌreɡ.jəˈleɪ.ʃən/",
      meaning: "Sự bãi bỏ quy chế / phi điều tiết",
      example: "Market deregulation encouraged competition and lowered telecommunication charges for consumers.",
      exampleTranslation: "Việc bãi bỏ các quy chế thị trường đã khuyến khích cạnh tranh và giảm cước viễn thông cho người tiêu dùng."
    },
    {
      word: "Devaluation",
      type: "n",
      ipa: "/ˌdiːˌvæl.juˈeɪ.ʃən/",
      meaning: "Sự phá giá đồng tiền",
      example: "The government decreed a currency devaluation to boost the international competitiveness of domestic exports.",
      exampleTranslation: "Chính phủ đã ban hành sắc lệnh phá giá đồng tiền nhằm thúc đẩy năng lực cạnh tranh quốc tế của hàng xuất khẩu trong nước."
    },
    {
      word: "Equilibrium",
      type: "n",
      ipa: "/ˌek.wɪˈlɪb.ri.əm/",
      meaning: "Điểm cân bằng thị trường (cung gặp cầu)",
      example: "Market equilibrium is established at the price point where quantity demanded equals quantity supplied.",
      exampleTranslation: "Điểm cân bằng thị trường được xác lập tại mức giá mà lượng cầu bằng đúng lượng cung."
    },
    {
      word: "Fiscal policy",
      type: "n.phr",
      ipa: "/ˈfɪs.kəl ˈpɒl.ə.si/",
      meaning: "Chính sách tài khóa (thuế và chi tiêu chính phủ)",
      example: "Expansionary fiscal policy involves reducing corporate taxes and accelerating infrastructure investments.",
      exampleTranslation: "Chính sách tài khóa mở rộng bao gồm việc cắt giảm thuế doanh nghiệp và đẩy mạnh đầu tư cơ sở hạ tầng."
    },
    {
      word: "Fiscal stimulus",
      type: "n.phr",
      ipa: "/ˈfɪs.kəl ˈstɪm.jə.ləs/",
      meaning: "Gói kích thích tài khóa",
      example: "Direct stimulus checks helped households maintain consumption during the economic contraction.",
      exampleTranslation: "Các tấm séc kích thích trực tiếp đã giúp các hộ gia đình duy trì mức tiêu dùng trong giai đoạn co hẹp kinh tế."
    },
    {
      word: "Foreign direct investment",
      type: "n.phr",
      ipa: "/ˈfɒr.ən daɪˈrekt ɪnˈvest.mənt/",
      meaning: "Đầu tư trực tiếp nước ngoài (FDI)",
      example: "Favorable tax incentives and stable governance attracted unprecedented foreign direct investment.",
      exampleTranslation: "Các ưu đãi thuế thuận lợi và nền quản trị ổn định đã thu hút dòng vốn đầu tư trực tiếp nước ngoài chưa từng có."
    },
    {
      word: "Gross domestic product",
      type: "n.phr",
      ipa: "/ɡrəʊs dəˌmes.tɪk ˈprɒd.ʌkt/",
      meaning: "Tổng sản phẩm quốc nội (GDP)",
      example: "Gross domestic product measures the total monetary value of all finished goods and services produced within a border.",
      exampleTranslation: "Tổng sản phẩm quốc nội đo lường tổng giá trị tiền tệ của tất cả hàng hóa và dịch vụ hoàn thiện được sản xuất trong phạm vi biên giới."
    },
    {
      word: "Hyperinflation",
      type: "n",
      ipa: "/ˌhaɪ.pər.ɪnˈfleɪ.ʃən/",
      meaning: "Siêu lạm phát (giá cả tăng mất kiểm soát)",
      example: "Under hyperinflation, prices multiplied daily, wiping out residents' lifetime life savings.",
      exampleTranslation: "Dưới thời kỳ siêu lạm phát, giá cả tăng theo từng ngày, xóa sạch các khoản tiết kiệm cả đời của người dân."
    },
    {
      word: "Income elasticity",
      type: "n.phr",
      ipa: "/ˈɪn.kʌm ˌel.æˈstɪs.ə.ti/",
      meaning: "Độ co giãn theo thu nhập",
      example: "Luxury automobiles exhibit high income elasticity because demand surges rapidly when consumer wealth rises.",
      exampleTranslation: "Ô tô hạng sang có độ co giãn theo thu nhập cao vì nhu cầu tăng vọt nhanh chóng khi tài sản người tiêu dùng tăng."
    },
    {
      word: "Inflation",
      type: "n",
      ipa: "/ɪnˈfleɪ.ʃən/",
      meaning: "Lạm phát",
      example: "High inflation erodes purchasing power and increases the real cost of living.",
      exampleTranslation: "Lạm phát cao làm xói mòn sức mua và làm tăng chi phí sinh hoạt thực tế."
    },
    {
      word: "Insolvency",
      type: "n",
      ipa: "/ɪnˈsɒl.vən.si/",
      meaning: "Tình trạng mất khả năng thanh toán / phá sản",
      example: "Unable to service its maturing corporate bonds, the firm was forced into technical insolvency.",
      exampleTranslation: "Do không thể trả lãi cho các trái phiếu doanh nghiệp đến hạn, công ty đã buộc phải rơi vào tình trạng mất khả năng thanh toán kỹ thuật."
    },
    {
      word: "Interest rate",
      type: "n.phr",
      ipa: "/ˈɪn.trəst reɪt/",
      meaning: "Lãi suất",
      example: "Higher interest rates make mortgages more expensive, dampening speculative activity in housing markets.",
      exampleTranslation: "Lãi suất cao hơn khiến các khoản thế chấp trở nên đắt đỏ hơn, làm giảm bớt hoạt động đầu cơ trên thị trường nhà đất."
    },
    {
      word: "Liquidity",
      type: "n",
      ipa: "/lɪˈkwɪd.ə.ti/",
      meaning: "Tính thanh khoản (khả năng đổi thành tiền mặt)",
      example: "During market panics, financial institutions prioritize liquidity to cover sudden depositor withdrawals.",
      exampleTranslation: "Trong những cơn hoảng loạn thị trường, các định chế tài chính ưu tiên tính thanh khoản để chi trả các khoản rút tiền đột ngột của người gửi."
    },
    {
      word: "Macroeconomics",
      type: "n",
      ipa: "/ˌmæk.rəʊ.iː.kəˈnɒm.ɪks/",
      meaning: "Kinh tế học vĩ mô",
      example: "Macroeconomics analyzes economy-wide phenomena including inflation, national output, and overall unemployment.",
      exampleTranslation: "Kinh tế học vĩ mô phân tích các hiện tượng trên bình diện toàn nền kinh tế bao gồm lạm phát, sản lượng quốc gia và tỷ lệ thất nghiệp chung."
    },
    {
      word: "Microeconomics",
      type: "n",
      ipa: "/ˌmaɪ.krəʊ.iː.kəˈnɒm.ɪks/",
      meaning: "Kinh tế học vi mô",
      example: "Microeconomics examines how individual households and firms allocate scarce resources.",
      exampleTranslation: "Kinh tế học vi mô nghiên cứu cách thức các hộ gia đình và doanh nghiệp cá lẻ phân bổ các nguồn lực khan hiếm."
    },
    {
      word: "Monetary policy",
      type: "n.phr",
      ipa: "/ˈmʌn.ɪ.tri ˈpɒl.ə.si/",
      meaning: "Chính sách tiền tệ",
      example: "Monetary policy regulates money supply and credit availability via reserve requirements and open-market operations.",
      exampleTranslation: "Chính sách tiền tệ điều tiết cung tiền và sự khả dụng của tín dụng thông qua tỷ lệ dự trữ bắt buộc và các nghiệp vụ thị trường mở."
    },
    {
      word: "Monopoly",
      type: "n",
      ipa: "/məˈnɒp.əl.i/",
      meaning: "Sự độc quyền",
      example: "Antitrust regulators intervened to break up a monopoly that choked off fair market competition.",
      exampleTranslation: "Các cơ quan quản lý chống độc quyền đã can thiệp để chia nhỏ một tập đoàn độc quyền bóp nghẹt sự cạnh tranh thị trường công bằng."
    },
    {
      word: "Oligopoly",
      type: "n",
      ipa: "/ˌɒl.ɪˈɡɒp.əl.i/",
      meaning: "Thị trường độc quyền nhóm (vài nhà sản xuất lớn thống trị)",
      example: "The airline industry operates as an oligopoly dominated by a small handful of legacy carriers.",
      exampleTranslation: "Ngành hàng không hoạt động như một thị trường độc quyền nhóm bị thống trị bởi một số ít hãng vận chuyển lâu đời."
    },
    {
      word: "Opportunity cost",
      type: "n.phr",
      ipa: "/ˌɒp.əˈtjuː.nə.ti kɒst/",
      meaning: "Chi phí cơ hội",
      example: "The opportunity cost of attending university full-time is the foregone wage from full-time employment.",
      exampleTranslation: "Chi phí cơ hội của việc học đại học toàn thời gian là khoản tiền lương bị bỏ lỡ từ một công việc toàn thời gian."
    },
    {
      word: "Purchasing power parity",
      type: "n.phr",
      ipa: "/ˈpɜː.tʃəs.ɪŋ ˌpaʊər ˈpær.ə.ti/",
      meaning: "Ngang giá sức mua (PPP)",
      example: "Comparing GDP at purchasing power parity provides a more realistic assessment of living standards across nations.",
      exampleTranslation: "So sánh GDP theo ngang giá sức mua mang lại sự đánh giá thực tế hơn về mức sống giữa các quốc gia."
    },
    {
      word: "Quantitative easing",
      type: "n.phr",
      ipa: "/ˈkwɒn.tɪ.tə.tɪv ˈiː.zɪŋ/",
      meaning: "Nới lỏng định lượng (bơm tiền vào nền kinh tế)",
      example: "Central bankers initiated quantitative easing by purchasing long-dated government securities on open markets.",
      exampleTranslation: "Các ngân hàng trung ương đã khởi xướng nới lỏng định lượng bằng cách mua các chứng khoán chính phủ dài hạn trên thị trường mở."
    },
    {
      word: "Recession",
      type: "n",
      ipa: "/rɪˈseʃ.ən/",
      meaning: "Suy thoái kinh tế",
      example: "Two consecutive quarters of negative economic growth officially define a technical recession.",
      exampleTranslation: "Hai quý liên tiếp tăng trưởng kinh tế âm chính thức xác định một cuộc suy thoái kỹ thuật."
    },
    {
      word: "Revenue",
      type: "n",
      ipa: "/ˈrev.ən.juː/",
      meaning: "Doanh thu",
      example: "Quarterly corporate revenue surged past analyst forecasts owing to strong overseas sales.",
      exampleTranslation: "Doanh thu hàng quý của công ty đã vượt xa các dự báo của giới phân tích nhờ doanh số bán hàng ở nước ngoài tăng mạnh."
    },
    {
      word: "Sovereign debt",
      type: "n.phr",
      ipa: "/ˈsɒv.rɪn det/",
      meaning: "Nợ công / nợ quốc gia",
      example: "Rating agencies downgraded the nation's sovereign debt amidst growing political instability.",
      exampleTranslation: "Các cơ quan xếp hạng tín nhiệm đã hạ bậc nợ công của quốc gia này trong bối cảnh bất ổn chính trị ngày càng gia tăng."
    },
    {
      word: "Stagflation",
      type: "n",
      ipa: "/stæɡˈfleɪ.ʃən/",
      meaning: "Lạm phát đình trệ (vừa lạm phát vừa đình đốn kinh tế)",
      example: "Stagflation presents a dilemma for policymakers because fighting unemployment can exacerbate inflation.",
      exampleTranslation: "Lạm phát đình trệ đặt ra tình thế tiến thoái lưỡng nan cho các nhà hoạch định chính sách vì chống thất nghiệp có thể làm trầm trọng thêm lạm phát."
    },
    {
      word: "Subsidy",
      type: "n",
      ipa: "/ˈsʌb.sɪ.di/",
      meaning: "Khoản trợ cấp của chính phủ",
      example: "Government subsidies encouraged farmers to transition to renewable green energy practices.",
      exampleTranslation: "Các khoản trợ cấp của chính phủ đã khuyến khích nông dân chuyển đổi sang các phương thức năng lượng xanh có thể tái tạo."
    },
    {
      word: "Supply chain",
      type: "n.phr",
      ipa: "/səˈplaɪ tʃeɪn/",
      meaning: "Chuỗi cung ứng",
      example: "Disruptions in the global semiconductor supply chain delayed new automobile deliveries worldwide.",
      exampleTranslation: "Những sự gián đoạn trong chuỗi cung ứng chất bán dẫn toàn cầu đã làm chậm trễ việc giao ô tô mới trên toàn thế giới."
    },
    {
      word: "Surplus",
      type: "n",
      ipa: "/ˈsɜː.pləs/",
      meaning: "Thặng dư (ngân sách hoặc thương mại)",
      example: "Strong tax intake enabled the municipal government to close the fiscal year with a budget surplus.",
      exampleTranslation: "Nguồn thu thuế dồi dào đã giúp chính quyền đô thị khép lại năm tài khóa với mức thặng dư ngân sách."
    },
    {
      word: "Tariff",
      type: "n",
      ipa: "/ˈtær.ɪf/",
      meaning: "Thuế quan (thuế đánh vào hàng nhập khẩu)",
      example: "Imposing heavy protective tariffs on foreign steel triggered retaliatory trade disputes.",
      exampleTranslation: "Việc áp đặt mức thuế quan bảo hộ nặng nề lên thép nước ngoài đã kích hoạt các tranh chấp thương mại trả đũa."
    },
    {
      word: "Trade barrier",
      type: "n.phr",
      ipa: "/treɪd ˈbær.i.ər/",
      meaning: "Rào cản thương mại",
      example: "Free trade agreements eliminate costly tariffs and non-tariff trade barriers between signing partners.",
      exampleTranslation: "Các hiệp định thương mại tự do xóa bỏ thuế quan tốn kém và các rào cản thương mại phi thuế quan giữa các đối tác ký kết."
    },
    {
      word: "Underemployment",
      type: "n",
      ipa: "/ˌʌn.ɪmˈplɔɪ.mənt/",
      meaning: "Tình trạng thiếu việc làm / làm việc dưới trình độ",
      example: "Underemployment is rampant among university graduates working part-time in low-skill retail.",
      exampleTranslation: "Tình trạng làm việc dưới trình độ đang phổ biến trong số các sinh viên tốt nghiệp đại học làm bán thời gian trong ngành bán lẻ kỹ năng thấp."
    },
    {
      word: "Unemployment rate",
      type: "n.phr",
      ipa: "/ˌʌn.ɪmˈplɔɪ.mənt reɪt/",
      meaning: "Tỷ lệ thất nghiệp",
      example: "The national unemployment rate dropped to an all-time low of 3.5 percent during economic expansion.",
      exampleTranslation: "Tỷ lệ thất nghiệp toàn quốc đã giảm xuống mức thấp kỷ lục 3,5% trong giai đoạn mở rộng kinh tế."
    },
    {
      word: "Venture capital",
      type: "n.phr",
      ipa: "/ˈven.tʃər ˌkæp.ɪ.təl/",
      meaning: "Vốn đầu tư mạo hiểm",
      example: "Early-stage tech startups frequently rely on venture capital to finance initial software engineering.",
      exampleTranslation: "Các công ty khởi nghiệp công nghệ giai đoạn đầu thường trông cậy vào vốn đầu tư mạo hiểm để tài trợ cho quá trình phát triển phần mềm ban đầu."
    },
    {
      word: "Volatility",
      type: "n",
      ipa: "/ˌvɒl.əˈtɪl.ə.ti/",
      meaning: "Sự biến động mạnh (giá cả, thị trường)",
      example: "Geopolitical tensions ignited acute volatility across global crude oil markets.",
      exampleTranslation: "Những căng thẳng địa chính trị đã châm ngòi cho sự biến động dữ dội trên các thị trường dầu thô toàn cầu."
    },
    {
      word: "Yield curve",
      type: "n.phr",
      ipa: "/jiːld kɜːv/",
      meaning: "Đường cong lợi suất",
      example: "An inverted yield curve, where short-term rates exceed long-term yields, has historically foreshadowed recessions.",
      exampleTranslation: "Một đường cong lợi suất đảo ngược, nơi lãi suất ngắn hạn vượt lợi suất dài hạn, trong lịch sử từng báo trước các đợt suy thoái."
    }
  ];

  // 3. TECHNOLOGY TERMS
  vocabularyData.technologyTerms = [
    {
      word: "Algorithm",
      type: "n",
      ipa: "/ˈæl.ɡə.rɪ.ðəm/",
      meaning: "Thuật toán",
      example: "Search engines deploy a complex sorting algorithm to deliver relevant query results in milliseconds.",
      exampleTranslation: "Các công cụ tìm kiếm triển khai một thuật toán sắp xếp phức tạp để mang lại kết quả truy vấn phù hợp trong vài phần nghìn giây."
    },
    {
      word: "Artificial intelligence",
      type: "n.phr",
      ipa: "/ˌɑː.tɪˈfɪʃ.əl ɪnˈtel.ɪ.dʒəns/",
      meaning: "Trí tuệ nhân tạo (AI)",
      example: "Artificial intelligence transforms medical diagnostics by parsing radiographic imagery with superhuman precision.",
      exampleTranslation: "Trí tuệ nhân tạo biến đổi hoạt động chẩn đoán y tế bằng cách phân tích hình ảnh X-quang với độ chính xác vượt trội con người."
    },
    {
      word: "Augmented reality",
      type: "n.phr",
      ipa: "/ɔːɡˌmen.tɪd riˈæl.ə.ti/",
      meaning: "Thực tế tăng cường (AR)",
      example: "Augmented reality overlays dynamic interactive computer graphics onto the user's real-world environment.",
      exampleTranslation: "Thực tế tăng cường phủ đồ họa máy tính tương tác trực quan lên môi trường thực tế của người dùng."
    },
    {
      word: "Autonomous vehicle",
      type: "n.phr",
      ipa: "/ɔːˈtɒn.ə.məs ˈvɪə.kəl/",
      meaning: "Phương tiện tự hành (xe tự lái)",
      example: "Autonomous vehicles leverage lidar, radar sensors, and machine vision to navigate urban traffic safely.",
      exampleTranslation: "Xe tự hành tận dụng cảm biến lidar, radar và thị giác máy để lưu thông an toàn trong giao thông đô thị."
    },
    {
      word: "Bandwidth",
      type: "n",
      ipa: "/ˈbænd.wɪtθ/",
      meaning: "Băng thông (tốc độ truyền dữ liệu mạng)",
      example: "High-definition video streaming demands generous bandwidth to prevent buffering and packet drops.",
      exampleTranslation: "Truyền phát video độ nét cao đòi hỏi băng thông dồi dào để tránh tình trạng giật đệm và mất gói dữ liệu."
    },
    {
      word: "Big data",
      type: "n.phr",
      ipa: "/bɪɡ ˈdeɪ.tə/",
      meaning: "Dữ liệu lớn",
      example: "Enterprises exploit big data analytics to extract behavioral insights and personalize client recommendations.",
      exampleTranslation: "Các doanh nghiệp khai thác phân tích dữ liệu lớn để rút ra hiểu biết hành vi và cá nhân hóa các đề xuất cho khách hàng."
    },
    {
      word: "Biometrics",
      type: "n",
      ipa: "/ˌbaɪ.əʊˈmet.rɪks/",
      meaning: "Sinh trắc học (vân tay, khuôn mặt, mống mắt)",
      example: "Modern smartphones employ biometrics like facial recognition for effortless and secure authentication.",
      exampleTranslation: "Điện thoại thông minh hiện đại áp dụng sinh trắc học như nhận diện khuôn mặt để xác thực dễ dàng và an toàn."
    },
    {
      word: "Blockchain",
      type: "n",
      ipa: "/ˈblɒk.tʃeɪn/",
      meaning: "Chuỗi khối (sổ cái phân tán chống giả mạo)",
      example: "Blockchain architecture guarantees transparency and immutability for peer-to-peer monetary ledgers.",
      exampleTranslation: "Kiến trúc chuỗi khối bảo đảm tính minh bạch và bất biến cho các sổ cái tiền tệ ngang hàng."
    },
    {
      word: "Cloud computing",
      type: "n.phr",
      ipa: "/klaʊd kəmˈpjuː.tɪŋ/",
      meaning: "Điện toán đám mây",
      example: "Cloud computing allows corporations to scale server infrastructure without procuring physical hardware.",
      exampleTranslation: "Điện toán đám mây cho phép các tập đoàn mở rộng hạ tầng máy chủ mà không cần mua sắm phần cứng vật lý."
    },
    {
      word: "Cloud storage",
      type: "n.phr",
      ipa: "/klaʊd ˈstɔː.rɪdʒ/",
      meaning: "Lưu trữ đám mây",
      example: "Storing encrypted backups in cloud storage safeguards critical files against local hardware crashes.",
      exampleTranslation: "Lưu các bản sao lưu đã mã hóa trên kho lưu trữ đám mây bảo vệ các tệp tin quan trọng khỏi hỏng hóc phần cứng tại chỗ."
    },
    {
      word: "Computer vision",
      type: "n.phr",
      ipa: "/kəmˈpjuː.tər ˈvɪʒ.ən/",
      meaning: "Thị giác máy tính",
      example: "Computer vision algorithms enable automated inspection systems to spot microscopic manufacturing defects.",
      exampleTranslation: "Các thuật toán thị giác máy tính cho phép hệ thống kiểm tra tự động phát hiện các khiếm khuyết sản xuất siêu nhỏ."
    },
    {
      word: "Cryptocurrency",
      type: "n",
      ipa: "/ˈkrɪp.təʊˌkʌr.ən.si/",
      meaning: "Tiền mã hóa / tiền kỹ thuật số",
      example: "Central authorities remain cautious regarding cryptocurrency due to speculative price swings and regulatory voids.",
      exampleTranslation: "Các cơ quan trung ương vẫn thận trọng với tiền mã hóa do sự biến động giá đầu cơ và khoảng trống pháp lý."
    },
    {
      word: "Cyberattack",
      type: "n",
      ipa: "/ˈsaɪ.bər.əˌtæk/",
      meaning: "Cuộc tấn công mạng",
      example: "A coordinated cyberattack brought down government portals and disrupted municipal services.",
      exampleTranslation: "Một cuộc tấn công mạng phối hợp đã làm tê liệt các cổng thông tin chính phủ và làm gián đoạn các dịch vụ đô thị."
    },
    {
      word: "Cybersecurity",
      type: "n",
      ipa: "/ˌsaɪ.bə.sɪˈkjʊə.rə.ti/",
      meaning: "An ninh mạng",
      example: "Robust cybersecurity protocols defend sensitive enterprise databases against ransomware extortion.",
      exampleTranslation: "Các giao thức an ninh mạng vững chắc bảo vệ các cơ sở dữ liệu doanh nghiệp nhạy cảm trước nguy cơ tống tiền bằng mã độc tống tiền."
    },
    {
      word: "Data breach",
      type: "n.phr",
      ipa: "/ˈdeɪ.tə briːtʃ/",
      meaning: "Vụ rò rỉ / vi phạm dữ liệu",
      example: "The catastrophic data breach compromised passwords, personal addresses, and financial credentials of millions.",
      exampleTranslation: "Vụ rò rỉ dữ liệu thảm khốc đã làm lộ mật khẩu, địa chỉ cá nhân và thông tin tài chính của hàng triệu người."
    },
    {
      word: "Data mining",
      type: "n.phr",
      ipa: "/ˈdeɪ.tə ˌmaɪ.nɪŋ/",
      meaning: "Khai phá dữ liệu",
      example: "Retailers conduct data mining to uncover shopping patterns hidden within point-of-sale logs.",
      exampleTranslation: "Các nhà bán lẻ tiến hành khai phá dữ liệu để phát hiện các quy luật mua sắm tiềm ẩn trong nhật ký điểm bán hàng."
    },
    {
      word: "Decentralized",
      type: "adj",
      ipa: "/diːˈsen.trə.laɪzd/",
      meaning: "Phi tập trung",
      example: "Decentralized networks operate without a single point of failure or an overarching governing authority.",
      exampleTranslation: "Các mạng lưới phi tập trung hoạt động mà không có điểm lỗi đơn lẻ hay một cơ quan quản lý bao trùm nào."
    },
    {
      word: "Deep learning",
      type: "n.phr",
      ipa: "/diːp ˈlɜː.nɪŋ/",
      meaning: "Học sâu (phân nhánh machine learning dùng mạng nơ-ron nhiều lớp)",
      example: "Deep learning models require massive sets of labeled images to master autonomous vehicle perception.",
      exampleTranslation: "Các mô hình học sâu đòi hỏi tập hợp khổng lồ hình ảnh được gán nhãn để làm chủ khả năng nhận thức của xe tự lái."
    },
    {
      word: "Edge computing",
      type: "n.phr",
      ipa: "/edʒ kəmˈpjuː.tɪŋ/",
      meaning: "Điện toán biên (xử lý dữ liệu ngay tại thiết bị ngoại vi)",
      example: "Edge computing slashes response latency by processing sensor streams directly on local IoT hubs.",
      exampleTranslation: "Điện toán biên cắt giảm độ trễ phản hồi bằng cách xử lý các luồng dữ liệu cảm biến trực tiếp ngay trên các thiết bị IoT cục bộ."
    },
    {
      word: "Encryption",
      type: "n",
      ipa: "/ɪnˈkrɪp.ʃən/",
      meaning: "Sự mã hóa dữ liệu",
      example: "End-to-end encryption ensures that intercepted messages remain unreadable to eavesdropping intermediaries.",
      exampleTranslation: "Mã hóa đầu cuối đảm bảo các tin nhắn bị chặn bắt vẫn hoàn toàn không thể đọc được đối với những kẻ nghe lén trung gian."
    },
    {
      word: "Firewall",
      type: "n",
      ipa: "/ˈfaɪə.wɔːl/",
      meaning: "Tường lửa (hệ thống rào chắn bảo vệ mạng)",
      example: "An enterprise firewall blocks unauthorized incoming packets while monitoring outbound corporate communications.",
      exampleTranslation: "Tường lửa doanh nghiệp ngăn chặn các gói tin đến trái phép đồng thời giám sát các luồng liên lạc ra ngoài của công ty."
    },
    {
      word: "Firmware",
      type: "n",
      ipa: "/ˈfɜːm.weər/",
      meaning: "Phần sụn (phần mềm cố định gắn liền với phần cứng)",
      example: "Updating router firmware patches known vulnerabilities and boosts wireless signal stability.",
      exampleTranslation: "Cập nhật phần sụn bộ định tuyến giúp vá các lỗ hổng đã biết và nâng cao độ ổn định của tín hiệu không dây."
    },
    {
      word: "Generative AI",
      type: "n.phr",
      ipa: "/ˈdʒen.ər.ə.tɪv eɪ aɪ/",
      meaning: "Trí tuệ nhân tạo tạo sinh",
      example: "Generative AI produces coherent essays, photo-realistic art, and production code from plain text prompts.",
      exampleTranslation: "AI tạo sinh sản xuất ra các bài luận mạch lạc, tác phẩm nghệ thuật chân thực và mã nguồn từ các câu lệnh văn bản thuần túy."
    },
    {
      word: "Internet of Things",
      type: "n.phr",
      ipa: "/ˈɪn.tə.net əv θɪŋz/",
      meaning: "Vạn vật kết nối Internet (IoT)",
      example: "The Internet of Things connects everyday smart home appliances, smart thermostats, and wearable trackers.",
      exampleTranslation: "Vạn vật kết nối Internet liên kết các thiết bị gia dụng thông minh thường ngày, bộ điều nhiệt thông minh và thiết bị đeo theo dõi."
    },
    {
      word: "Latency",
      type: "n",
      ipa: "/ˈleɪ.tən.si/",
      meaning: "Độ trễ truyền mạng",
      example: "Low latency is imperative in competitive multiplayer gaming and real-time robotic telesurgery.",
      exampleTranslation: "Độ trễ thấp là điều bắt buộc trong chơi game đối kháng nhiều người và phẫu thuật từ xa bằng robot theo thời gian thực."
    },
    {
      word: "Machine learning",
      type: "n.phr",
      ipa: "/məˈʃiːn ˈlɜː.nɪŋ/",
      meaning: "Học máy",
      example: "Machine learning enables software to iteratively improve task accuracy without being explicitly hardcoded.",
      exampleTranslation: "Học máy cho phép phần mềm cải thiện dần độ chính xác của tác vụ mà không cần phải lập trình cứng một cách rõ ràng."
    },
    {
      word: "Malware",
      type: "n",
      ipa: "/ˈmæl.weər/",
      meaning: "Phần mềm độc hại",
      example: "Installing antivirus scanners shields computer systems against stealthy trojans and spyware malware.",
      exampleTranslation: "Cài đặt phần mềm quét virus che chắn hệ thống máy tính chống lại mã độc gián điệp và trojan lén lút."
    },
    {
      word: "Microprocessor",
      type: "n",
      ipa: "/ˌmaɪ.krəʊˈprəʊ.ses.ər/",
      meaning: "Bộ vi xử lý (CPU)",
      example: "A cutting-edge microprocessor packs billions of microscopic transistors onto a tiny silicon die.",
      exampleTranslation: "Một bộ vi xử lý tiên tiến tích hợp hàng tỷ bóng bán dẫn siêu nhỏ lên một tấm chip silicon nhỏ bé."
    },
    {
      word: "Nanotechnology",
      type: "n",
      ipa: "/ˌnæn.əʊ.tekˈnɒl.ə.dʒi/",
      meaning: "Công nghệ nano",
      example: "Nanotechnology develops microscopic materials with revolutionary conductivity and mechanical resilience.",
      exampleTranslation: "Công nghệ nano phát triển các vật liệu siêu nhỏ với độ dẫn điện và độ bền cơ học mang tính cách mạng."
    },
    {
      word: "Natural language processing",
      type: "n.phr",
      ipa: "/ˈnætʃ.ər.əl ˈlæŋ.ɡwɪdʒ ˈprəʊ.ses.ɪŋ/",
      meaning: "Xử lý ngôn ngữ tự nhiên (NLP)",
      example: "Natural language processing allows conversational chatbots to decipher subtle grammatical nuances.",
      exampleTranslation: "Xử lý ngôn ngữ tự nhiên cho phép chatbot đàm thoại giải mã những sắc thái ngữ pháp tinh tế."
    },
    {
      word: "Neural network",
      type: "n.phr",
      ipa: "/ˈnjʊə.rəl ˈnet.wɜːk/",
      meaning: "Mạng nơ-ron nhân tạo",
      example: "An artificial neural network mimics biological synapses to discern complex patterns in sensory data.",
      exampleTranslation: "Mạng nơ-ron nhân tạo mô phỏng các khớp thần kinh sinh học để nhận biết các quy luật phức tạp trong dữ liệu cảm giác."
    },
    {
      word: "Open source",
      type: "adj",
      ipa: "/ˌəʊ.pən ˈsɔːs/",
      meaning: "Mã nguồn mở",
      example: "The widespread adoption of open source libraries accelerates collaborative global software development.",
      exampleTranslation: "Việc áp dụng rộng rãi các thư viện mã nguồn mở giúp đẩy nhanh quá trình phát triển phần mềm cộng tác trên toàn cầu."
    },
    {
      word: "Operating system",
      type: "n.phr",
      ipa: "/ˈɒp.ər.eɪ.tɪŋ ˌsɪs.təm/",
      meaning: "Hệ điều hành",
      example: "The operating system manages memory allocation, processor scheduling, and input-output hardware devices.",
      exampleTranslation: "Hệ điều hành quản lý việc cấp phát bộ nhớ, lập lịch bộ xử lý và các thiết bị phần cứng vào - ra."
    },
    {
      word: "Phishing",
      type: "n",
      ipa: "/ˈfɪʃ.ɪŋ/",
      meaning: "Tấn công giả mạo / lừa đảo qua mạng",
      example: "Phishing emails trick gullible employees into disclosing administrative login credentials on spoofed portals.",
      exampleTranslation: "Các email lừa đảo dụ dỗ nhân viên nhẹ dạ tiết lộ thông tin đăng nhập quản trị trên các cổng thông tin giả mạo."
    },
    {
      word: "Quantum computing",
      type: "n.phr",
      ipa: "/ˈkwɒn.təm kəmˈpjuː.tɪŋ/",
      meaning: "Điện toán lượng tử",
      example: "Quantum computing harnesses the power of qubits to solve cryptographic calculations in mere seconds.",
      exampleTranslation: "Điện toán lượng tử khai thác sức mạnh của các qubit để giải quyết các phép tính mật mã chỉ trong vài giây."
    },
    {
      word: "Quantum supremacy",
      type: "n.phr",
      ipa: "/ˈkwɒn.təm suːˈprem.ə.si/",
      meaning: "Ưu thế lượng tử (vượt trội siêu máy tính truyền thống)",
      example: "Achieving quantum supremacy proves that quantum processors can outperform the fastest classical supercomputers.",
      exampleTranslation: "Đạt được ưu thế lượng tử chứng minh các bộ xử lý lượng tử có thể vượt trội hơn các siêu máy tính cổ điển nhanh nhất."
    },
    {
      word: "Ransomware",
      type: "n",
      ipa: "/ˈræn.səm.weər/",
      meaning: "Mã độc tống tiền",
      example: "Hospitals were paralyzed when malicious ransomware locked electronic medical records behind demanding payment.",
      exampleTranslation: "Các bệnh viện đã bị tê liệt khi mã độc tống tiền độc hại khóa các bệnh án điện tử để đòi tiền chuộc."
    },
    {
      word: "Robotics",
      type: "n",
      ipa: "/rəʊˈbɒt.ɪks/",
      meaning: "Công nghệ robot / người máy học",
      example: "Advancements in robotics permit precision robotic arms to assemble intricate microchips with zero error.",
      exampleTranslation: "Những tiến bộ trong công nghệ robot cho phép các cánh tay robot chuẩn xác lắp ráp các vi mạch phức tạp mà không có lỗi."
    },
    {
      word: "Scalability",
      type: "n",
      ipa: "/ˌskeɪ.ləˈbɪl.ə.ti/",
      meaning: "Khả năng mở rộng (hệ thống chịu tải lớn)",
      example: "Cloud architecture ensures seamless scalability during peak traffic surges on e-commerce platforms.",
      exampleTranslation: "Kiến trúc đám mây bảo đảm khả năng mở rộng liền mạch trong những đợt tăng vọt lưu lượng truy cập trên các nền tảng thương mại điện tử."
    },
    {
      word: "Semiconductor",
      type: "n",
      ipa: "/ˌsem.i.kənˈdʌk.tər/",
      meaning: "Chất bán dẫn",
      example: "Silicon is the foundational semiconductor utilized in modern integrated circuits and solar panels.",
      exampleTranslation: "Silicon là chất bán dẫn nền tảng được sử dụng trong các mạch tích hợp và tấm pin mặt trời hiện đại."
    },
    {
      word: "Serverless",
      type: "adj",
      ipa: "/ˈsɜː.və.ləs/",
      meaning: "Không cần máy chủ quản lý (serverless computing)",
      example: "Serverless computing delegates server maintenance and auto-scaling entirely to cloud vendors.",
      exampleTranslation: "Điện toán không máy chủ ủy thác việc bảo trì máy chủ và tự động co giãn hoàn toàn cho các nhà cung cấp đám mây."
    },
    {
      word: "Supercomputer",
      type: "n",
      ipa: "/ˈsuː.pə.kəmˌpjuː.tər/",
      meaning: "Siêu máy tính",
      example: "Meteorologists rely on a supercomputer to run climate simulations modeling global atmospheric flows.",
      exampleTranslation: "Các nhà khí tượng học trông cậy vào siêu máy tính để chạy các mô phỏng khí hậu mô hình hóa các luồng khí quyển toàn cầu."
    },
    {
      word: "User interface",
      type: "n.phr",
      ipa: "/ˈjuː.zər ˈɪn.tə.feɪs/",
      meaning: "Giao diện người dùng (UI)",
      example: "An intuitive user interface minimizes user cognitive load and elevates software accessibility.",
      exampleTranslation: "Một giao diện người dùng trực quan giảm thiểu tải nhận thức của người dùng và nâng cao khả năng tiếp cận phần mềm."
    },
    {
      word: "Virtual machine",
      type: "n.phr",
      ipa: "/ˌvɜː.tʃu.əl məˈʃiːn/",
      meaning: "Máy ảo",
      example: "Engineers spin up an isolated virtual machine to safely test untrusted experimental executables.",
      exampleTranslation: "Các kỹ sư khởi chạy một máy ảo biệt lập để thử nghiệm an toàn các tệp thực thi thử nghiệm không đáng tin cậy."
    },
    {
      word: "Virtual reality",
      type: "n.phr",
      ipa: "/ˌvɜː.tʃu.əl riˈæl.ə.ti/",
      meaning: "Thực tế ảo (VR)",
      example: "Virtual reality headsets immerse trainee pilots in photorealistic simulated flight scenarios.",
      exampleTranslation: "Kính thực tế ảo đưa các phi công thực tập vào các kịch bản bay mô phỏng chân thực như thật."
    },
    {
      word: "Wearable technology",
      type: "n.phr",
      ipa: "/ˈweə.rə.bəl tekˈnɒl.ə.dʒi/",
      meaning: "Công nghệ đeo (smartwatch, vòng tay sức khỏe)",
      example: "Wearable technology tracks heart rates and sleep metrics to provide personalized wellness insights.",
      exampleTranslation: "Công nghệ thiết bị đeo theo dõi nhịp tim và các chỉ số giấc ngủ để mang lại những hiểu biết chăm sóc sức khỏe cá nhân hóa."
    },
    {
      word: "Zero-day vulnerability",
      type: "n.phr",
      ipa: "/ˈzɪə.rəʊ deɪ ˌvʌl.nər.əˈbɪl.ə.ti/",
      meaning: "Lỗ hổng zero-day (lỗ hổng bảo mật chưa có bản vá)",
      example: "Security researchers raced to patch a critical zero-day vulnerability before hackers could exploit it.",
      exampleTranslation: "Các nhà nghiên cứu bảo mật đã chạy đua để vá một lỗ hổng zero-day nguy cấp trước khi tin tặc kịp khai thác."
    }
  ];
})();

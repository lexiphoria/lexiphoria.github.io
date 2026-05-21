const quizData = {
  easy: [
    {
      question: "1. They agreed ______ meet us at the library to discuss the group project.",
      options: ["A. to", "B. on", "C. with", "D. for"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>agree to do sth</b> nghĩa là đồng ý làm việc gì."
    },
    {
      question: "2. My older brother is going to apply ______ a scholarship to study in the UK.",
      options: ["A. for", "B. to", "C. in", "D. with"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>apply for sth</b> nghĩa là nộp đơn xin cái gì (học bổng, việc làm)."
    },
    {
      question: "3. If you get lost in the city, don't hesitate to ask ______ directions.",
      options: ["A. for", "B. to", "C. at", "D. after"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>ask for sth</b> nghĩa là hỏi xin hoặc yêu cầu cái gì đó."
    },
    {
      question: "4. You should avoid ______ sweet drinks before going to bed.",
      options: ["A. drink", "B. to drink", "C. drinking", "D. drank"],
      correctIndex: 2,
      explanation: "Sau động từ <b>avoid</b> ta dùng V-ing (<b>avoid doing sth</b> - tránh làm điều gì)."
    },
    {
      question: "5. With daily practice, she will be able ______ speak English fluently.",
      options: ["A. to", "B. for", "C. with", "D. of"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be able to do sth</b> nghĩa là có khả năng làm việc gì."
    },
    {
      question: "6. My younger cousin is crazy ______ K-pop music and collects all their albums.",
      options: ["A. about", "B. on", "C. with", "D. at"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be crazy about sth</b> nghĩa là rất say mê, phát cuồng vì cái gì."
    },
    {
      question: "7. The weather in Da Lat is very different ______ that in Ho Chi Minh City.",
      options: ["A. from", "B. with", "C. to", "D. at"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be different from sb/sth</b> nghĩa là khác biệt với ai/cái gì."
    },
    {
      question: "8. Viet Nam is famous ______ its delicious street food, especially Pho.",
      options: ["A. for", "B. with", "C. about", "D. at"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be famous for sth</b> nghĩa là nổi tiếng về điều gì."
    },
    {
      question: "9. My sister is very good ______ playing the piano and drawing landscapes.",
      options: ["A. at", "B. in", "C. on", "D. with"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be good at sth/doing sth</b> nghĩa là giỏi làm việc gì."
    },
    {
      question: "10. Staying up late every night is extremely harmful ______ your health.",
      options: ["A. to", "B. for", "C. with", "D. at"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be harmful to sb/sth</b> nghĩa là có hại cho ai/cái gì."
    },
    {
      question: "11. Are you interested ______ joining our school's photography club?",
      options: ["A. in", "B. on", "C. at", "D. about"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be interested in sth</b> nghĩa là quan tâm, thích thú điều gì."
    },
    {
      question: "12. My new school bag is very similar ______ the one you bought yesterday.",
      options: ["A. to", "B. with", "C. from", "D. as"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be similar to sth</b> nghĩa là tương tự, giống với cái gì."
    },
    {
      question: "13. Social media makes it easier to communicate ______ friends who live far away.",
      options: ["A. with", "B. to", "C. at", "D. for"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>communicate with sb</b> nghĩa là giao tiếp với ai."
    },
    {
      question: "14. A healthy breakfast should consist ______ fresh fruits, grains, and milk.",
      options: ["A. of", "B. in", "C. off", "D. with"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>consist of</b> nghĩa là bao gồm, gồm có các thành phần."
    },
    {
      question: "15. They decided ______ move to a quieter neighborhood next month.",
      options: ["A. to", "B. on", "C. for", "D. with"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>decide to do sth</b> nghĩa là quyết định làm việc gì."
    },
    {
      question: "16. You should do physical ______ every day to keep fit and stay healthy.",
      options: ["A. exercise", "B. practices", "C. homework", "D. energy"],
      correctIndex: 0,
      explanation: "Cụm từ <b>do physical exercise</b> nghĩa là tập thể dục."
    },
    {
      question: "17. We were late for the movie because we got stuck in a traffic ______.",
      options: ["A. jam", "B. block", "C. hold", "D. stop"],
      correctIndex: 0,
      explanation: "Cụm từ <b>get stuck in a traffic jam</b> nghĩa là bị kẹt xe, tắc đường."
    },
    {
      question: "18. You should never give ______ on your dreams, no matter how hard it gets.",
      options: ["A. up", "B. in", "C. out", "D. away"],
      correctIndex: 0,
      explanation: "Cụm động từ <b>give up (on sth)</b> nghĩa là bỏ cuộc, từ bỏ mục tiêu."
    },
    {
      question: "19. Suddenly, all the lights went ______ due to a sudden power outage.",
      options: ["A. out", "B. off", "C. down", "D. away"],
      correctIndex: 0,
      explanation: "Cụm động từ <b>go out</b> trong ngữ cảnh này nghĩa là mất điện, tắt ngóm (lửa, đèn)."
    },
    {
      question: "20. Where do you want ______ go for your summer holiday this year?",
      options: ["A. to", "B. for", "C. with", "D. on"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>want to do sth</b> nghĩa là muốn làm gì."
    }
  ],
  medium: [
    {
      question: "21. The local community center offers a wide ______ of activities for senior citizens.",
      options: ["A. range", "B. group", "C. set", "D. series"],
      correctIndex: 0,
      explanation: "Cụm từ <b>a range of sth</b> có nghĩa là một loạt hoặc nhiều thứ khác nhau."
    },
    {
      question: "22. We arrived at the train station ahead ______ schedule, so we had to wait.",
      options: ["A. of", "B. to", "C. in", "D. with"],
      correctIndex: 0,
      explanation: "Cụm từ <b>ahead of schedule</b> nghĩa là trước thời hạn, trước lịch trình dự kiến."
    },
    {
      question: "23. It is not polite to argue ______ your teachers about minor details.",
      options: ["A. with", "B. to", "C. on", "D. for"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>argue with sb</b> nghĩa là tranh luận, cãi cọ với ai."
    },
    {
      question: "24. Everyone was amazed ______ the young girl's incredible memory during the contest.",
      options: ["A. at", "B. in", "C. with", "D. for"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be amazed at/by sth</b> nghĩa là kinh ngạc, ngạc nhiên vì điều gì."
    },
    {
      question: "25. My dad is busy ______ the broken fence in our backyard right now.",
      options: ["A. repairing", "B. to repair", "C. repair", "D. repaired"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be busy doing sth</b> nghĩa là bận rộn làm việc gì."
    },
    {
      question: "26. She feels confident ______ her ability to pass the driving test on her first try.",
      options: ["A. about", "B. on", "C. at", "D. for"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be confident about sth</b> nghĩa là tự tin về điều gì."
    },
    {
      question: "27. This dense tropical rainforest is home ______ many endangered animal species.",
      options: ["A. to", "B. of", "C. with", "D. for"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be home to sb/sth</b> nghĩa là nhà của/nơi cư trú, trú ngụ của loài nào."
    },
    {
      question: "28. Don't ask him for a favor today; he is in a bad ______ because of the rain.",
      options: ["A. mood", "B. mind", "C. state", "D. feeling"],
      correctIndex: 0,
      explanation: "Cụm từ <b>be in a bad/good mood</b> nghĩa là có tâm trạng tồi tệ/tốt."
    },
    {
      question: "29. During the rush hour, the city buses are usually packed ______ passengers.",
      options: ["A. with", "B. of", "C. in", "D. by"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be packed with sb/sth</b> nghĩa là chật ních, chật cứng người/vật."
    },
    {
      question: "30. We are pleased ______ announce the winners of the English essay competition.",
      options: ["A. to", "B. for", "C. with", "D. that"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be pleased to do sth</b> nghĩa là vui lòng, hân hạnh được làm gì."
    },
    {
      question: "31. Oranges and lemons are rich ______ vitamin C, which boosts our immune system.",
      options: ["A. in", "B. of", "C. with", "D. at"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be rich in sth</b> nghĩa là dồi dào, phong phú, chứa nhiều chất gì."
    },
    {
      question: "32. You should turn off your phone to concentrate ______ your homework.",
      options: ["A. on", "B. in", "C. at", "D. with"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>concentrate on sth/doing sth</b> nghĩa là tập trung vào điều gì/việc gì."
    },
    {
      question: "33. Every small action can contribute ______ reducing plastic pollution in our oceans.",
      options: ["A. to", "B. for", "C. in", "D. with"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>contribute to sth/doing sth</b> nghĩa là đóng góp vào việc gì."
    },
    {
      question: "34. The doctor advised him to cut ______ on sugar and processed food to lose weight.",
      options: ["A. down", "B. off", "C. out", "D. away"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>cut down on sth</b> nghĩa là cắt giảm bớt lượng tiêu thụ của thứ gì."
    },
    {
      question: "35. Our school trip will depend ______ the weather conditions tomorrow morning.",
      options: ["A. on", "B. with", "C. to", "D. in"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>depend on sb/sth</b> nghĩa là phụ thuộc vào ai/cái gì."
    },
    {
      question: "36. She always dreams ______ becoming a professional astronaut and traveling to Mars.",
      options: ["A. of", "B. to", "C. on", "D. with"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>dream of sth/doing sth</b> nghĩa là mơ ước về điều gì/làm việc gì."
    },
    {
      question: "37. She is a friendly person who gets ______ well with all her classmates.",
      options: ["A. on", "B. up", "C. in", "D. through"],
      correctIndex: 0,
      explanation: "Cụm động từ <b>get on well with sb</b> nghĩa là hòa hợp, có quan hệ tốt với ai."
    },
    {
      question: "38. Her parents are saving money to send her ______ to study at a top university.",
      options: ["A. abroad", "B. board", "C. overseas", "D. out"],
      correctIndex: 0,
      explanation: "Cụm từ <b>go/study abroad</b> nghĩa là đi học tập ở nước ngoài."
    },
    {
      question: "39. On weekends, teenagers usually like to hang ______ with their friends at cafes.",
      options: ["A. out", "B. in", "C. up", "D. off"],
      correctIndex: 0,
      explanation: "Cụm động từ <b>hang out (with sb)</b> nghĩa là đi chơi, tụ tập, la cà (với ai)."
    },
    {
      question: "40. How many countries will take part ______ the upcoming Olympic Games?",
      options: ["A. in", "B. on", "C. at", "D. to"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>take part in sth</b> nghĩa là tham gia vào một hoạt động, sự kiện."
    }
  ],
  hard: [
    {
      question: "41. She worked day and night to accomplish her goal ______ publishing a novel.",
      options: ["A. of", "B. to", "C. in", "D. with"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>accomplish one's goal of doing sth</b> nghĩa là hoàn thành mục tiêu làm việc gì."
    },
    {
      question: "42. You must ask your parents ______ permission before going on the overnight trip.",
      options: ["A. for", "B. to", "C. with", "D. of"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>ask sb for permission to do sth</b> nghĩa là xin phép ai để làm gì."
    },
    {
      question: "43. With a smartphone, you have a wealth of information at your ______.",
      options: ["A. fingertips", "B. hands", "C. reach", "D. control"],
      correctIndex: 0,
      explanation: "Thành ngữ <b>at one's fingertips</b> nghĩa là có sẵn trong tầm tay, dễ dàng truy cập và sử dụng."
    },
    {
      question: "44. In winter, the peak of the mountain is completely covered ______ thick snow.",
      options: ["A. with", "B. by", "C. in", "D. of"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be covered with sth</b> nghĩa là được che phủ, bao phủ bởi thứ gì."
    },
    {
      question: "45. Despite the injuries, the athlete was determined ______ finish the marathon.",
      options: ["A. to", "B. on", "C. for", "D. in"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be determined to do sth</b> nghĩa là quyết tâm, kiên quyết làm việc gì."
    },
    {
      question: "46. Regular hydration is absolutely essential ______ maintaining good physical performance.",
      options: ["A. for", "B. at", "C. with", "D. by"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be essential for sth</b> nghĩa là cần thiết, thiết yếu cho cái gì."
    },
    {
      question: "47. The chief manager is in charge ______ organizing the upcoming international conference.",
      options: ["A. of", "B. for", "C. with", "D. at"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be in charge of sth/doing sth</b> nghĩa là chịu trách nhiệm, phụ trách công việc gì."
    },
    {
      question: "48. Our history tour guide is extremely knowledgeable ______ ancient civilizations.",
      options: ["A. about", "B. on", "C. with", "D. for"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be knowledgeable about sth</b> nghĩa là có kiến thức rộng, am hiểu sâu về cái gì."
    },
    {
      question: "49. Who is responsible ______ cleaning the classroom after the final lesson today?",
      options: ["A. for", "B. to", "C. with", "D. about"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be responsible for sth/doing sth</b> nghĩa là chịu trách nhiệm cho việc gì."
    },
    {
      question: "50. We are deeply thankful ______ our volunteers for their tireless efforts during the flood.",
      options: ["A. to", "B. with", "C. for", "D. at"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be thankful to sb (for sth)</b> nghĩa là biết ơn ai (vì điều gì)."
    },
    {
      question: "51. This specialized software is used ______ analyzing climate change data patterns.",
      options: ["A. for", "B. to", "C. of", "D. with"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be used for doing sth</b> nghĩa là được sử dụng để làm gì (sau trống là V-ing 'analyzing' nên ta chọn giới từ 'for')."
    },
    {
      question: "52. I think I am coming ______ with the flu; my throat is sore and I have a fever.",
      options: ["A. down", "B. up", "C. across", "D. along"],
      correctIndex: 0,
      explanation: "Cụm động từ <b>come down with sth</b> nghĩa là bị đổ bệnh, bị nhiễm bệnh gì."
    },
    {
      question: "53. The local government will give ______ to improving public transportation in the city.",
      options: ["A. priority", "B. advantage", "C. benefit", "D. support"],
      correctIndex: 0,
      explanation: "Cụm từ <b>give priority to sth</b> nghĩa là dành sự ưu tiên cho việc gì."
    },
    {
      question: "54. Our new manager gives us the freedom ______ express our creative ideas.",
      options: ["A. to", "B. of", "C. for", "D. with"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>give sb freedom to do sth</b> nghĩa là cho phép ai tự do làm việc gì."
    },
    {
      question: "55. The student advisor will offer valuable advice ______ selecting university majors.",
      options: ["A. on", "B. for", "C. with", "D. to"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>give/offer advice on sth</b> nghĩa là đưa ra lời khuyên về vấn đề gì."
    },
    {
      question: "56. They take great pride ______ their daughter's academic achievements.",
      options: ["A. in", "B. on", "C. with", "D. for"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>take (great) pride in sth/sb</b> nghĩa là tự hào về cái gì/ai đó."
    },
    {
      question: "57. The city council needs to take ______ to protect historical buildings from demolition.",
      options: ["A. measures", "B. actions", "C. steps", "D. deeds"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>take measures to do sth</b> nghĩa là thực hiện các biện pháp để đạt được mục tiêu nào đó."
    },
    {
      question: "58. I am sorry, I took your umbrella ______ mistake; it looks exactly like mine.",
      options: ["A. by", "B. in", "C. with", "D. for"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>take sth by mistake</b> nghĩa là lấy nhầm cái gì đó."
    },
    {
      question: "59. Rising sea levels pose a serious threat ______ coastal communities worldwide.",
      options: ["A. to", "B. for", "C. with", "D. at"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>threat to sb/sth</b> nghĩa là mối đe dọa đối với ai/cái gì."
    },
    {
      question: "60. The guidebook has been translated ______ five different languages for tourists.",
      options: ["A. into", "B. to", "C. in", "D. with"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>translate sth into sth</b> nghĩa là dịch cái gì sang ngôn ngữ gì."
    }
  ]
};

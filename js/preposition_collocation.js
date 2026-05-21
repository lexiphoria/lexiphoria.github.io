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
    },
    {
      question: "21. I was delighted ______ the present you gave me.",
      options: ["A. of", "B. with", "C. to", "D. about"],
      correctIndex: 1,
      explanation: "Cấu trúc <b>be delighted with sth</b> có nghĩa là vui sướng, hài lòng vì cái gì."
    },
    {
      question: "22. It was very nice ______ you to do my shopping.",
      options: ["A. to", "B. with", "C. of", "D. for"],
      correctIndex: 2,
      explanation: "Cấu trúc <b>nice of sb to do sth</b> nghĩa là ai đó thật tốt bụng/tử tế khi làm việc gì."
    },
    {
      question: "23. Why are you so rude ______ your sisters? Can't you be nice ______ them?",
      options: ["A. to / to", "B. with / with", "C. at / to", "D. to / with"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>rude to sb</b> (thô lỗ với ai) và <b>nice to sb</b> (tốt bụng, tử tế với ai)."
    },
    {
      question: "24. Were you disappointed ______ your exam results?",
      options: ["A. in", "B. of", "C. for", "D. with"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>be disappointed with sth</b> nghĩa là thất vọng với cái gì."
    },
    {
      question: "25. We always have the same food every day. I'm fed up ______ it.",
      options: ["A. with", "B. of", "C. by", "D. at"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be fed up with sth</b> có nghĩa là chán ngấy, chán ngấy cái gì."
    },
    {
      question: "26. I can't understand the people who are cruel ______ animals.",
      options: ["A. with", "B. to", "C. at", "D. on"],
      correctIndex: 1,
      explanation: "Cấu trúc <b>cruel to sb/sth</b> nghĩa là độc ác, tàn nhẫn với ai/cái gì."
    },
    {
      question: "27. Linda doesn't look very well. I'm worried ______ her.",
      options: ["A. for", "B. of", "C. about", "D. with"],
      correctIndex: 2,
      explanation: "Cấu trúc <b>be worried about sb/sth</b> nghĩa là lo lắng về ai/cái gì."
    },
    {
      question: "28. It was a bit careless ______ you to leave the door unlocked.",
      options: ["A. of", "B. to", "C. for", "D. with"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>careless of sb to do sth</b> nghĩa là ai đó thật bất cẩn khi làm điều gì."
    },
    {
      question: "29. Are you angry ______ what happened?",
      options: ["A. with", "B. to", "C. of", "D. about"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>angry about sth</b> có nghĩa là tức giận về việc gì."
    },
    {
      question: "30. I'm sorry ______ what I said. I hope you're not angry ______ me.",
      options: ["A. with / for", "B. for / with", "C. about / to", "D. for / to"],
      correctIndex: 1,
      explanation: "Cấu trúc <b>sorry for/about sth</b> (xin lỗi về điều gì) và <b>angry with sb</b> (tức giận với ai)."
    },
    {
      question: "31. The people next door are furious ______ us ______ making so much noise last night.",
      options: ["A. to / by", "B. with / with", "C. at / about", "D. with / for"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>furious with sb for doing sth</b> có nghĩa là giận dữ với ai vì việc gì."
    },
    {
      question: "32. Are you excited ______ going on holiday next week?",
      options: ["A. about", "B. with", "C. of", "D. to"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be excited about sth/doing sth</b> nghĩa là hào hứng về cái gì/việc gì."
    },
    {
      question: "33. I was shocked ______ what I saw.",
      options: ["A. with", "B. at", "C. in", "D. for"],
      correctIndex: 1,
      explanation: "Cấu trúc <b>be shocked at/by sth</b> nghĩa là bị sốc, sửng sốt trước cái gì."
    },
    {
      question: "34. We weren't very impressed ______ his appearance.",
      options: ["A. at", "B. of", "C. with", "D. to"],
      correctIndex: 2,
      explanation: "Cấu trúc <b>be impressed with/by sth</b> nghĩa là bị ấn tượng bởi cái gì."
    },
    {
      question: "35. Are you still upset ______ what I said to you?",
      options: ["A. with", "B. for", "C. at", "D. about"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>be upset about sth</b> nghĩa là buồn bã, tức giận vì cái gì."
    },
    {
      question: "36. I felt sorry ______ the children when we went on holiday.",
      options: ["A. for", "B. with", "C. to", "D. of"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>feel sorry for sb</b> nghĩa là cảm thấy tội nghiệp, thương hại cho ai."
    },
    {
      question: "37. His letter was full ______ mistakes.",
      options: ["A. with", "B. of", "C. in", "D. at"],
      correctIndex: 1,
      explanation: "Cấu trúc <b>be full of sth</b> nghĩa là chứa đầy, đầy rẫy cái gì."
    },
    {
      question: "38. The Italian city of Florence is famous ______ its art treasures.",
      options: ["A. of", "B. with", "C. for", "D. about"],
      correctIndex: 2,
      explanation: "Cấu trúc <b>be famous for sth</b> nghĩa là nổi tiếng vì cái gì."
    },
    {
      question: "39. Kate is very fond ______ her younger brother.",
      options: ["A. with", "B. about", "C. to", "D. of"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>be fond of sb/sth</b> nghĩa là yêu mến, thích ai/cái gì."
    },
    {
      question: "40. Are you afraid ______ snakes? ~Yes, I'm terrified ______ them.",
      options: ["A. of / of", "B. with / with", "C. of / with", "D. to / to"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>afraid of sth</b> (sợ cái gì) và <b>terrified of sth</b> (kinh sợ cái gì)."
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
    },
    {
      question: "41. The ______ the fire at the hotel last night is still unknown.",
      options: ["A. purpose for", "B. cause of", "C. reason of", "D. result in"],
      correctIndex: 1,
      explanation: "Cụm danh từ <b>cause of sth</b> có nghĩa là nguyên nhân của cái gì."
    },
    {
      question: "42. The ______ living alone is that you can do what you like.",
      options: ["A. benefit to", "B. interest in", "C. advantage of", "D. advantage to"],
      correctIndex: 2,
      explanation: "Cụm danh từ <b>advantage of sth</b> có nghĩa là lợi ích, lợi thế của điều gì."
    },
    {
      question: "43. Money isn't the ______ every problem.",
      options: ["A. solution to", "B. answer for", "C. key of", "D. way in"],
      correctIndex: 0,
      explanation: "Cụm danh từ <b>solution to sth</b> có nghĩa là giải pháp cho vấn đề gì."
    },
    {
      question: "44. There has been an ______ the number of road accidents recently.",
      options: ["A. increase of", "B. up on", "C. addition to", "D. increase in"],
      correctIndex: 3,
      explanation: "Cụm danh từ <b>increase in sth</b> có nghĩa là sự gia tăng về số lượng/mức độ của cái gì."
    },
    {
      question: "45. There are some ______ British and American English.",
      options: ["A. differences from", "B. differences between", "C. different with", "D. differences of"],
      correctIndex: 1,
      explanation: "Cụm danh từ <b>difference between A and B</b> có nghĩa là sự khác biệt giữa hai thứ."
    },
    {
      question: "46. When Paul left home, his ______ his parents seemed to change.",
      options: ["A. contact with", "B. connection between", "C. attitude to", "D. invitation to"],
      correctIndex: 2,
      explanation: "Cụm danh từ <b>attitude to/towards sb/sth</b> có nghĩa là thái độ đối với ai/cái gì."
    },
    {
      question: "47. The firm closed down because there wasn't enough ______ its product.",
      options: ["A. demand for", "B. need of", "C. supply to", "D. value on"],
      correctIndex: 0,
      explanation: "Cụm danh từ <b>demand for sth</b> có nghĩa là nhu cầu tiêu dùng về mặt hàng/dịch vụ gì."
    },
    {
      question: "48. When I opened the envelope, I was delighted to find a ______ £500.",
      options: ["A. cheque of", "B. cheque in", "C. cheque to", "D. cheque for"],
      correctIndex: 3,
      explanation: "Cụm danh từ <b>cheque for + số tiền</b> có nghĩa là tờ séc trị giá bao nhiêu tiền."
    },
    {
      question: "49. Bill and I used to be good friends but I don't have much ______ him now.",
      options: ["A. connection to", "B. contact with", "C. attitude with", "D. demand with"],
      correctIndex: 1,
      explanation: "Cụm danh từ <b>contact with sb</b> có nghĩa là sự liên lạc, liên hệ với ai."
    },
    {
      question: "50. Carol has decided to give up her job. I don't know her ______ doing this.",
      options: ["A. cause of", "B. reason of", "C. reason for", "D. need for"],
      correctIndex: 2,
      explanation: "Cụm danh từ <b>reason for sth/doing sth</b> có nghĩa là lý do cho cái gì/việc gì."
    },
    {
      question: "51. I've had an ______ Laura's barbecue next Sunday.",
      options: ["A. invitation to", "B. invitation for", "C. invite with", "D. invitation from"],
      correctIndex: 0,
      explanation: "Cụm danh từ <b>invitation to sth</b> có nghĩa là lời mời tham dự sự kiện gì."
    },
    {
      question: "52. The accident caused some ______ the car.",
      options: ["A. damage of", "B. damage on", "C. damage with", "D. damage to"],
      correctIndex: 3,
      explanation: "Cụm danh từ <b>damage to sth</b> có nghĩa là sự phá hoại, tổn hại đối với vật gì."
    },
    {
      question: "53. Unfortunately, there was some ______ the arrangement.",
      options: ["A. difficulty in", "B. difficulty with", "C. difficulty to", "D. difficulty of"],
      correctIndex: 1,
      explanation: "Cụm danh từ <b>difficulty with sth</b> có nghĩa là gặp khó khăn, trục trặc với điều gì."
    },
    {
      question: "54. We need to provide more shelters for the homeless, so there's a ______ more houses.",
      options: ["A. need of", "B. need to", "C. need for", "D. need about"],
      correctIndex: 2,
      explanation: "Cụm danh từ <b>need for sth</b> có nghĩa là nhu cầu cần thiết có cái gì."
    },
    {
      question: "55. The two companies are completely independent. There is no ______ them.",
      options: ["A. connection between", "B. connection with", "C. connection to", "D. connection for"],
      correctIndex: 0,
      explanation: "Cụm danh từ <b>connection between A and B</b> có nghĩa là mối liên hệ giữa hai đối tượng."
    },
    {
      question: "56. Who is that man standing ______ the window?",
      options: ["A. on", "B. at", "C. in", "D. by"],
      correctIndex: 3,
      explanation: "Giới từ chỉ nơi chốn: <b>by the window</b> nghĩa là đứng cạnh, đứng bên cửa sổ."
    },
    {
      question: "57. I managed to put the fire out ______ a fire extinguisher.",
      options: ["A. by", "B. with", "C. in", "D. on"],
      correctIndex: 1,
      explanation: "Giới từ chỉ công cụ: dùng <b>with + dụng cụ/thiết bị</b> (bằng một cái gì)."
    },
    {
      question: "58. These photographs were taken ______ a friend of mine.",
      options: ["A. with", "B. of", "C. by", "D. in"],
      correctIndex: 2,
      explanation: "Thể bị động: dùng <b>by + tác nhân thực hiện hành động</b> (được chụp bởi ai)."
    },
    {
      question: "59. These photographs were taken ______ a very good camera.",
      options: ["A. with", "B. by", "C. on", "D. in"],
      correctIndex: 0,
      explanation: "Giới từ chỉ công cụ: dùng <b>with + thiết bị</b> để chụp ảnh (chụp bằng máy ảnh)."
    },
    {
      question: "60. I don't mind going ______ car but I don't want to go ______ your car.",
      options: ["A. in / by", "B. by / by", "C. in / in", "D. by / in"],
      correctIndex: 3,
      explanation: "Phương tiện giao thông: dùng <b>by + phương tiện</b> (by car) nói chung; dùng <b>in + possessive + car</b> (in your car) khi chỉ xe cụ thể."
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
    },
    {
      question: "61. Shall we get a taxi or shall we go ______ foot?",
      options: ["A. by", "B. on", "C. with", "D. at"],
      correctIndex: 1,
      explanation: "Thành ngữ chỉ cách đi lại: <b>on foot</b> nghĩa là đi bộ."
    },
    {
      question: "62. What's that music? I know it's ______ Beethoven but I can't remember what it's called.",
      options: ["A. of", "B. with", "C. by", "D. from"],
      correctIndex: 2,
      explanation: "Giới từ chỉ tác giả: dùng <b>by + tên nhạc sĩ/nhà văn</b> để biểu thị tác phẩm của họ."
    },
    {
      question: "63. There was a small table ______ the bed ______ a lamp and a clock ______ it.",
      options: ["A. by / with / on", "B. at / with / in", "C. by / of / on", "D. on / with / at"],
      correctIndex: 0,
      explanation: "Sử dụng giới từ thích hợp: <b>by the bed</b> (cạnh giường), <b>table with sth</b> (bàn có trang bị đồ vật gì), và <b>on it</b> (nằm trên bàn)."
    },
    {
      question: "64. Our team lost the game only because of a mistake ______ one of our players.",
      options: ["A. of", "B. with", "C. from", "D. by"],
      correctIndex: 3,
      explanation: "Cụm danh từ: <b>mistake by sb</b> nghĩa là lỗi lầm/sơ suất thực hiện bởi ai."
    },
    {
      question: "65. I didn't feel like walking home, so I came home ______ a taxi.",
      options: ["A. by", "B. in", "C. on", "D. with"],
      correctIndex: 1,
      explanation: "Phương tiện giao thông: dùng <b>in a taxi / in a car</b> đối với ô tô con/taxi thay vì dùng 'by' khi có mạo từ 'a'."
    },
    {
      question: "66. Water boils ______ 100 degrees celsius.",
      options: ["A. in", "B. at", "C. on", "D. by"],
      correctIndex: 1,
      explanation: "Giới từ chỉ mức độ/thông số: dùng <b>at + số đo/nhiệt độ/tốc độ</b>."
    },
    {
      question: "67. My cellphone was stolen while I was ______ a business trip.",
      options: ["A. in", "B. at", "C. on", "D. by"],
      correctIndex: 2,
      explanation: "Thành ngữ: <b>on a business trip</b> nghĩa là đi công tác."
    },
    {
      question: "68. Could you be quiet for a minute, please? I'm ______ the phone.",
      options: ["A. in", "B. at", "C. with", "D. on"],
      correctIndex: 3,
      explanation: "Thành ngữ: <b>on the phone</b> nghĩa là đang nói chuyện điện thoại."
    },
    {
      question: "69. In Britain, children start school ______ the age of five.",
      options: ["A. at", "B. in", "C. on", "D. by"],
      correctIndex: 0,
      explanation: "Thành ngữ: <b>at the age of...</b> nghĩa là ở độ tuổi bao nhiêu."
    },
    {
      question: "70. We sat ______ the shade. It was too hot to sit ______ the sun.",
      options: ["A. in / under", "B. in / in", "C. under / in", "D. on / in"],
      correctIndex: 1,
      explanation: "Giới từ chỉ vị trí: <b>in the shade</b> (ở trong bóng râm) và <b>in the sun</b> (dưới ánh nắng)."
    },
    {
      question: "71. Did you go to Germany ______ business or ______ holiday?",
      options: ["A. in / on", "B. on / in", "C. on / on", "D. in / in"],
      correctIndex: 2,
      explanation: "Thành ngữ: <b>on business</b> (đi công tác) và <b>on holiday</b> (đi nghỉ mát)."
    },
    {
      question: "72. Can I pay ______ credit card? ~Yes, of course. But it's cheaper if you pay ______ cash.",
      options: ["A. in / by", "B. by / by", "C. in / in", "D. by / in"],
      correctIndex: 3,
      explanation: "Phương thức thanh toán: dùng <b>by credit card</b> (bằng thẻ) và <b>in cash</b> (bằng tiền mặt)."
    },
    {
      question: "73. He got married ______ 17, which is rather young to get married.",
      options: ["A. at", "B. in", "C. on", "D. by"],
      correctIndex: 0,
      explanation: "Thành ngữ chỉ tuổi tác: dùng <b>at + số tuổi</b>."
    },
    {
      question: "74. There was an interesting program ______ the radio this morning.",
      options: ["A. in", "B. on", "C. at", "D. through"],
      correctIndex: 1,
      explanation: "Thành ngữ truyền thông: <b>on the radio / on TV / on the internet</b>."
    },
    {
      question: "75. ______ my opinion, violent films should not be shown ______ television.",
      options: ["A. In / in", "B. In / on", "C. To / on", "D. According to / in"],
      correctIndex: 1,
      explanation: "Thành ngữ: <b>in my opinion</b> (theo ý kiến của tôi) và <b>on television</b> (trên truyền hình)."
    },
    {
      question: "76. When you do the exam, you're not allowed to write ______ pencil.",
      options: ["A. with", "B. by", "C. in", "D. on"],
      correctIndex: 2,
      explanation: "Chất liệu/mực viết: dùng <b>in pencil / in ink</b> (viết bằng bút chì/mực). Nếu có mạo từ ta dùng 'with a pencil'."
    },
    {
      question: "77. The earth travels round the sun ______ a speed of 107,000 kilometers an hour.",
      options: ["A. in", "B. on", "C. with", "D. at"],
      correctIndex: 3,
      explanation: "Giới từ chỉ tốc độ: <b>at a speed of...</b> (với tốc độ bao nhiêu)."
    },
    {
      question: "78. Look! That car is ______ fire! Please call the fire brigade.",
      options: ["A. on", "B. in", "C. at", "D. by"],
      correctIndex: 0,
      explanation: "Thành ngữ: <b>on fire</b> nghĩa là đang bốc cháy."
    },
    {
      question: "79. I pressed the wrong number ______ mistake.",
      options: ["A. in", "B. by", "C. on", "D. for"],
      correctIndex: 1,
      explanation: "Thành ngữ: <b>by mistake</b> nghĩa là do sơ suất, nhầm lẫn."
    },
    {
      question: "80. It's a long journey. Let's stop somewhere ______ the way and have a meal.",
      options: ["A. in", "B. at", "C. on", "D. by"],
      correctIndex: 2,
      explanation: "Thành ngữ: <b>on the way (to somewhere)</b> nghĩa là trên đường đi."
    },
    {
      question: "81. Three people were taken ______ hospital after the accident.",
      options: ["A. at", "B. in", "C. x (không điền)", "D. to"],
      correctIndex: 3,
      explanation: "Cấu trúc hướng chuyển động: <b>take sb to hospital</b> (đưa ai đến bệnh viện)."
    },
    {
      question: "82. I met Caroline on my way ______ home.",
      options: ["A. x (không điền)", "B. to", "C. at", "D. in"],
      correctIndex: 0,
      explanation: "Thành ngữ chỉ vị trí: <b>on my way home</b> (trên đường về nhà - không điền giới từ trước 'home')."
    },
    {
      question: "83. We left our luggage ______ the station and went to find something to eat.",
      options: ["A. to", "B. at", "C. in", "D. on"],
      correctIndex: 1,
      explanation: "Giới từ chỉ vị trí cụ thể: <b>at the station</b> (tại nhà ga)."
    },
    {
      question: "84. Shall we take a taxi ______ the station or shall we walk?",
      options: ["A. at", "B. to", "C. into", "D. through"],
      correctIndex: 1,
      explanation: "Giới từ hướng chuyển động: dùng <b>to + địa điểm</b> chỉ đích đến."
    },
    {
      question: "85. I must go ______ the bank today to change some money.",
      options: ["A. at", "B. into", "C. to", "D. x (không điền)"],
      correctIndex: 2,
      explanation: "Cấu trúc hướng chuyển động: <b>go to the bank</b> (đi đến ngân hàng)."
    },
    {
      question: "86. The river Rhine flows ______ the North Sea.",
      options: ["A. to", "B. through", "C. in", "D. into"],
      correctIndex: 3,
      explanation: "Giới từ chỉ sự chuyển động vào trong: <b>flow into sth</b> (chảy vào cái gì)."
    },
    {
      question: "87. I'm tired. As soon as I get ______ home, I'm going ______ bed.",
      options: ["A. x (không điền) / to", "B. to / to", "C. at / into", "D. x (không điền) / in"],
      correctIndex: 0,
      explanation: "Thành ngữ: <b>get home</b> (về nhà - không dùng giới từ) và <b>go to bed</b> (đi ngủ)."
    },
    {
      question: "88. 'Have you got your camera?' - 'No, I left it ______ home.'",
      options: ["A. in", "B. at", "C. to", "D. x (không điền)"],
      correctIndex: 1,
      explanation: "Thành ngữ vị trí: <b>at home</b> (ở nhà), cụm từ: <b>leave sth at home</b>."
    },
    {
      question: "89. Marcel is French. He has just returned ______ France after two years ______ Brazil.",
      options: ["A. in / in", "B. to / to", "C. to / in", "D. x (không điền) / in"],
      correctIndex: 2,
      explanation: "Cấu trúc chuyển động và vị trí: <b>return to a country</b> (trở về nước nào) và <b>in a country</b> (ở quốc gia nào)."
    },
    {
      question: "90. When did they arrive ______ the hotel?",
      options: ["A. in", "B. to", "C. into", "D. at"],
      correctIndex: 3,
      explanation: "Giới từ chỉ sự đến nơi: dùng <b>arrive at a building</b> (đến tòa nhà/khách sạn/sân bay) và <b>arrive in a city/country</b>."
    },
    {
      question: "91. Have you ever been ______ China?",
      options: ["A. to", "B. in", "C. at", "D. into"],
      correctIndex: 0,
      explanation: "Cấu trúc hiện tại hoàn thành trải nghiệm: <b>have been to somewhere</b> (đã từng đi đến đâu)."
    },
    {
      question: "92. I had lost my key but I managed to climb ______ the house ______ a window.",
      options: ["A. to / by", "B. into / through", "C. in / with", "D. into / by"],
      correctIndex: 1,
      explanation: "Giới từ chỉ chuyển động: <b>climb into the house</b> (trèo vào trong nhà) và <b>through a window</b> (xuyên qua/qua lối cửa sổ)."
    },
    {
      question: "93. We got stuck in a traffic jam on our way ______ the airport.",
      options: ["A. at", "B. to", "C. into", "D. through"],
      correctIndex: 1,
      explanation: "Thành ngữ chỉ hướng đi: <b>on the way to somewhere</b> (trên đường tới đâu)."
    },
    {
      question: "94. Welcome ______ the hotel. We hope you enjoy your stay here.",
      options: ["A. at", "B. in", "C. to", "D. into"],
      correctIndex: 2,
      explanation: "Thành ngữ tiếp đón: <b>welcome to a place</b> (chào mừng tới nơi nào)."
    },
    {
      question: "95. She got ______ the car and drove away.",
      options: ["A. on", "B. to", "C. at", "D. into"],
      correctIndex: 3,
      explanation: "Giới từ chuyển động xe cộ: dùng <b>get into the car/taxi</b> (bước vào ô tô con/taxi), còn 'get on the bus/train/plane'."
    },
    {
      question: "96. Don't wait outside. Come ______ the house.",
      options: ["A. into", "B. to", "C. at", "D. on"],
      correctIndex: 0,
      explanation: "Giới từ chỉ hướng chuyển động vào trong: <b>come into the house</b> (đi vào trong nhà)."
    },
    {
      question: "97. The sheep got out ______ a hole ______ the fence.",
      options: ["A. through / in", "B. by / on", "C. into / in", "D. through / of"],
      correctIndex: 0,
      explanation: "Giới từ vị trí và lối đi: <b>get out through sth</b> (ra ngoài bằng cách chui qua cái gì) và <b>in the fence</b> (ở trên hàng rào)."
    },
    {
      question: "98. Carl was born ______ Chicago but his family moved ______ New York when he was three. Now he still lives ______ New York.",
      options: ["A. at / to / in", "B. in / to / in", "C. in / to / at", "D. in / in / in"],
      correctIndex: 1,
      explanation: "Giới từ chỉ địa danh lớn: <b>born in / live in + city</b> (sinh ra/sống ở thành phố) và <b>move to + place</b> (di chuyển tới đâu)."
    },
    {
      question: "99. That man is an idiot. He pushed me ______ the swimming-pool.",
      options: ["A. inside", "B. to", "C. into", "D. in"],
      correctIndex: 2,
      explanation: "Giới từ chỉ hướng chuyển động vào trong lòng vật thể: <b>push sb into sth</b> (đẩy ai vào đâu)."
    },
    {
      question: "100. What time does this train arrive ______ London?",
      options: ["A. at", "B. to", "C. into", "D. in"],
      correctIndex: 3,
      explanation: "Giới từ đi với arrive: dùng <b>arrive in a city/country</b> (đến thành phố/quốc gia)."
    }
  ]
};

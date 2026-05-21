const quizData = {
  easy: [
    {
      question: "They agreed ______ meet us at the library to discuss the group project.",
      options: ["A. with", "B. on", "C. to", "D. for"],
      correctIndex: 2,
      explanation: "Cấu trúc <b>agree to do sth</b> nghĩa là đồng ý làm việc gì."
    },
    {
      question: "My older brother is going to apply ______ a scholarship to study in the UK.",
      options: ["A. with", "B. to", "C. in", "D. for"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>apply for sth</b> nghĩa là nộp đơn xin cái gì (học bổng, việc làm)."
    },
    {
      question: "If you get lost in the city, don't hesitate to ask ______ directions.",
      options: ["A. for", "B. at", "C. to", "D. after"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>ask for sth</b> nghĩa là hỏi xin hoặc yêu cầu cái gì đó."
    },
    {
      question: "You should avoid ______ sweet drinks before going to bed.",
      options: ["A. drinking", "B. to drink", "C. drink", "D. drank"],
      correctIndex: 0,
      explanation: "Sau động từ <b>avoid</b> ta dùng V-ing (<b>avoid doing sth</b> - tránh làm điều gì)."
    },
    {
      question: "With daily practice, she will be able ______ speak English fluently.",
      options: ["A. with", "B. for", "C. to", "D. of"],
      correctIndex: 2,
      explanation: "Cấu trúc <b>be able to do sth</b> nghĩa là có khả năng làm việc gì."
    },
    {
      question: "My younger cousin is crazy ______ K-pop music and collects all their albums.",
      options: ["A. with", "B. on", "C. at", "D. about"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>be crazy about sth</b> nghĩa là rất say mê, phát cuồng vì cái gì."
    },
    {
      question: "The weather in Da Lat is very different ______ that in Ho Chi Minh City.",
      options: ["A. at", "B. to", "C. from", "D. with"],
      correctIndex: 2,
      explanation: "Cấu trúc <b>be different from sb/sth</b> nghĩa là khác biệt với ai/cái gì."
    },
    {
      question: "Viet Nam is famous ______ its delicious street food, especially Pho.",
      options: ["A. for", "B. about", "C. with", "D. at"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be famous for sth</b> nghĩa là nổi tiếng về điều gì."
    },
    {
      question: "My sister is very good ______ playing the piano and drawing landscapes.",
      options: ["A. on", "B. in", "C. with", "D. at"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>be good at sth/doing sth</b> nghĩa là giỏi làm việc gì."
    },
    {
      question: "Staying up late every night is extremely harmful ______ your health.",
      options: ["A. for", "B. to", "C. at", "D. with"],
      correctIndex: 1,
      explanation: "Cấu trúc <b>be harmful to sb/sth</b> nghĩa là có hại cho ai/cái gì."
    },
    {
      question: "Are you interested ______ joining our school's photography club?",
      options: ["A. in", "B. on", "C. about", "D. at"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be interested in sth</b> nghĩa là quan tâm, thích thú điều gì."
    },
    {
      question: "My new school bag is very similar ______ the one you bought yesterday.",
      options: ["A. from", "B. to", "C. with", "D. as"],
      correctIndex: 1,
      explanation: "Cấu trúc <b>be similar to sth</b> nghĩa là tương tự, giống với cái gì."
    },
    {
      question: "Social media makes it easier to communicate ______ friends who live far away.",
      options: ["A. to", "B. for", "C. at", "D. with"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>communicate with sb</b> nghĩa là giao tiếp với ai."
    },
    {
      question: "A healthy breakfast should consist ______ fresh fruits, grains, and milk.",
      options: ["A. in", "B. of", "C. off", "D. with"],
      correctIndex: 1,
      explanation: "Cấu trúc <b>consist of</b> nghĩa là bao gồm, gồm có các thành phần."
    },
    {
      question: "They decided ______ move to a quieter neighborhood next month.",
      options: ["A. on", "B. for", "C. with", "D. to"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>decide to do sth</b> nghĩa là quyết định làm việc gì."
    },
    {
      question: "You should do physical ______ every day to keep fit and stay healthy.",
      options: ["A. practices", "B. energy", "C. exercise", "D. homework"],
      correctIndex: 2,
      explanation: "Cụm từ <b>do physical exercise</b> nghĩa là tập thể dục."
    },
    {
      question: "We were late for the movie because we got stuck in a traffic ______.",
      options: ["A. jam", "B. hold", "C. block", "D. stop"],
      correctIndex: 0,
      explanation: "Cụm từ <b>get stuck in a traffic jam</b> nghĩa là bị kẹt xe, tắc đường."
    },
    {
      question: "You should never give ______ on your dreams, no matter how hard it gets.",
      options: ["A. out", "B. in", "C. up", "D. away"],
      correctIndex: 2,
      explanation: "Cụm động từ <b>give up (on sth)</b> nghĩa là bỏ cuộc, từ bỏ mục tiêu."
    },
    {
      question: "Suddenly, all the lights went ______ due to a sudden power outage.",
      options: ["A. out", "B. down", "C. off", "D. away"],
      correctIndex: 0,
      explanation: "Cụm động từ <b>go out</b> trong ngữ cảnh này nghĩa là mất điện, tắt ngóm (lửa, đèn)."
    },
    {
      question: "Where do you want ______ go for your summer holiday this year?",
      options: ["A. to", "B. with", "C. on", "D. for"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>want to do sth</b> nghĩa là muốn làm gì."
    },
    {
      question: "I was delighted ______ the present you gave me.",
      options: ["A. to", "B. with", "C. of", "D. about"],
      correctIndex: 1,
      explanation: "Cấu trúc <b>be delighted with sth</b> có nghĩa là vui sướng, hài lòng vì cái gì."
    },
    {
      question: "It was very nice ______ you to do my shopping.",
      options: ["A. to", "B. of", "C. for", "D. with"],
      correctIndex: 1,
      explanation: "Cấu trúc <b>nice of sb to do sth</b> nghĩa là ai đó thật tốt bụng/tử tế khi làm việc gì."
    },
    {
      question: "Why are you so rude ______ your sisters? Can't you be nice ______ them?",
      options: ["A. at / to", "B. with / with", "C. to / with", "D. to / to"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>rude to sb</b> (thô lỗ với ai) và <b>nice to sb</b> (tốt bụng, tử tế với ai)."
    },
    {
      question: "Were you disappointed ______ your exam results?",
      options: ["A. of", "B. in", "C. for", "D. with"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>be disappointed with sth</b> nghĩa là thất vọng với cái gì."
    },
    {
      question: "We always have the same food every day. I'm fed up ______ it.",
      options: ["A. at", "B. by", "C. of", "D. with"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>be fed up with sth</b> có nghĩa là chán ngấy, chán ngấy cái gì."
    },
    {
      question: "I can't understand the people who are cruel ______ animals.",
      options: ["A. at", "B. to", "C. on", "D. with"],
      correctIndex: 1,
      explanation: "Cấu trúc <b>cruel to sb/sth</b> nghĩa là độc ác, tàn nhẫn với ai/cái gì."
    },
    {
      question: "Linda doesn't look very well. I'm worried ______ her.",
      options: ["A. for", "B. of", "C. about", "D. with"],
      correctIndex: 2,
      explanation: "Cấu trúc <b>be worried about sb/sth</b> nghĩa là lo lắng về ai/cái gì."
    },
    {
      question: "It was a bit careless ______ you to leave the door unlocked.",
      options: ["A. of", "B. to", "C. for", "D. with"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>careless of sb to do sth</b> nghĩa là ai đó thật bất cẩn khi làm điều gì."
    },
    {
      question: "Are you angry ______ what happened?",
      options: ["A. of", "B. with", "C. about", "D. to"],
      correctIndex: 2,
      explanation: "Cấu trúc <b>angry about sth</b> có nghĩa là tức giận về việc gì."
    },
    {
      question: "I'm sorry ______ what I said. I hope you're not angry ______ me.",
      options: ["A. for / with", "B. about / to", "C. for / to", "D. with / for"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>sorry for/about sth</b> (xin lỗi về điều gì) và <b>angry with sb</b> (tức giận với ai)."
    },
    {
      question: "The people next door are furious ______ us ______ making so much noise last night.",
      options: ["A. with / for", "B. to / by", "C. at / about", "D. with / with"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>furious with sb for doing sth</b> có nghĩa là giận dữ với ai vì việc gì."
    },
    {
      question: "Are you excited ______ going on holiday next week?",
      options: ["A. of", "B. about", "C. to", "D. with"],
      correctIndex: 1,
      explanation: "Cấu trúc <b>be excited about sth/doing sth</b> nghĩa là hào hứng về cái gì/việc gì."
    },
    {
      question: "I was shocked ______ what I saw.",
      options: ["A. for", "B. at", "C. with", "D. in"],
      correctIndex: 1,
      explanation: "Cấu trúc <b>be shocked at/by sth</b> nghĩa là bị sốc, sửng sốt trước cái gì."
    },
    {
      question: "We weren't very impressed ______ his appearance.",
      options: ["A. of", "B. at", "C. to", "D. with"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>be impressed with/by sth</b> nghĩa là bị ấn tượng bởi cái gì."
    },
    {
      question: "Are you still upset ______ what I said to you?",
      options: ["A. with", "B. about", "C. at", "D. for"],
      correctIndex: 1,
      explanation: "Cấu trúc <b>be upset about sth</b> nghĩa là buồn bã, tức giận vì cái gì."
    },
    {
      question: "I felt sorry ______ the children when we went on holiday.",
      options: ["A. for", "B. to", "C. of", "D. with"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>feel sorry for sb</b> nghĩa là cảm thấy tội nghiệp, thương hại cho ai."
    },
    {
      question: "His letter was full ______ mistakes.",
      options: ["A. of", "B. with", "C. in", "D. at"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be full of sth</b> nghĩa là chứa đầy, đầy rẫy cái gì."
    },
    {
      question: "Kate is very fond ______ her younger brother.",
      options: ["A. to", "B. with", "C. about", "D. of"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>be fond of sb/sth</b> nghĩa là yêu mến, thích ai/cái gì."
    },
    {
      question: "Are you afraid ______ snakes? ~Yes, I'm terrified ______ them.",
      options: ["A. of / of", "B. with / with", "C. to / to", "D. of / with"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>afraid of sth</b> (sợ cái gì) và <b>terrified of sth</b> (kinh sợ cái gì)."
    },
    {
      question: "Write your name ______ the top of the page.",
      options: ["A. to", "B. in", "C. on", "D. at"],
      correctIndex: 3,
      explanation: "Thành ngữ chỉ vị trí: <b>at the top of sth</b> (ở phía trên đầu của cái gì)."
    },
    {
      question: "There was no name ______ the door.",
      options: ["A. at", "B. on", "C. by", "D. in"],
      correctIndex: 1,
      explanation: "Giới từ chỉ vị trí tiếp xúc bề mặt: <b>on the door</b> (ở trên cửa)."
    },
    {
      question: "______ the end of the street there is a path leading to the river.",
      options: ["A. On", "B. In", "C. At", "D. To"],
      correctIndex: 2,
      explanation: "Thành ngữ chỉ điểm kết thúc: <b>at the end of sth</b> (ở cuối của cái gì)."
    },
    {
      question: "I wouldn't like an office job. I couldn't spend the whole day sitting ______ a desk.",
      options: ["A. in", "B. by", "C. at", "D. on"],
      correctIndex: 2,
      explanation: "Thành ngữ chỉ tư thế làm việc: <b>sit at a desk</b> (ngồi làm việc ở bàn)."
    },
    {
      question: "Natasha now lives ______ 32 The Avenue.",
      options: ["A. at", "B. to", "C. on", "D. in"],
      correctIndex: 0,
      explanation: "Giới từ chỉ địa chỉ cụ thể có số nhà: dùng <b>at + địa chỉ cụ thể</b>."
    },
    {
      question: "Is Tom ______ this photograph? I can't find him.",
      options: ["A. at", "B. in", "C. on", "D. by"],
      correctIndex: 1,
      explanation: "Thành ngữ chỉ vị trí trong ảnh/tranh vẽ: <b>in a photograph / in a picture</b> (trong bức ảnh)."
    },
    {
      question: "I love to look up at the stars ______ the sky at night.",
      options: ["A. to", "B. in", "C. at", "D. on"],
      correctIndex: 1,
      explanation: "Thành ngữ chỉ vị trí trên bầu trời: <b>in the sky</b> (trên bầu trời)."
    },
    {
      question: "It's a very small village. You probably won't find it ______ your map.",
      options: ["A. in", "B. to", "C. on", "D. at"],
      correctIndex: 2,
      explanation: "Thành ngữ chỉ vị trí trên bản đồ: <b>on a map</b> (trên bản đồ)."
    },
    {
      question: "I didn't see you ______ the party on Saturday. Where were you?",
      options: ["A. in", "B. on", "C. at", "D. to"],
      correctIndex: 2,
      explanation: "Giới từ chỉ địa điểm tham gia sự kiện: <b>at a party</b> (ở bữa tiệc)."
    },
    {
      question: "Perhaps I left my umbrella ______ the bus.",
      options: ["A. to", "B. in", "C. at", "D. on"],
      correctIndex: 3,
      explanation: "Giới từ chỉ phương tiện giao thông công cộng: dùng <b>on the bus/train/plane</b>."
    },
    {
      question: "Mozart was born in Salzburg ______ 1756.",
      options: ["A. on", "B. in", "C. at", "D. to"],
      correctIndex: 1,
      explanation: "Giới từ chỉ mốc thời gian: dùng <b>in + năm</b> (in 1756)."
    },
    {
      question: "I haven't seen Kate for a few days. I last saw her ______ Tuesday.",
      options: ["A. on", "B. to", "C. at", "D. in"],
      correctIndex: 0,
      explanation: "Giới từ chỉ ngày trong tuần: dùng <b>on + thứ</b> (on Tuesday)."
    },
    {
      question: "The price of electricity is going up ______ October.",
      options: ["A. in", "B. at", "C. on", "D. for"],
      correctIndex: 0,
      explanation: "Giới từ chỉ tháng: dùng <b>in + tháng</b> (in October)."
    },
    {
      question: "I've been invited to the wedding ______ 14 February.",
      options: ["A. on", "B. to", "C. at", "D. in"],
      correctIndex: 0,
      explanation: "Giới từ chỉ ngày tháng cụ thể: dùng <b>on + ngày tháng</b> (on 14 February)."
    },
    {
      question: "There are usually a lot of parties ______ New Year's Eve.",
      options: ["A. in", "B. at", "C. to", "D. on"],
      correctIndex: 3,
      explanation: "Giới từ chỉ ngày lễ/đêm lễ hội: <b>on New Year's Eve</b> (vào đêm giao thừa)."
    },
    {
      question: "I don't like travelling ______ night.",
      options: ["A. on", "B. at", "C. in", "D. during"],
      correctIndex: 1,
      explanation: "Thành ngữ chỉ thời điểm ban đêm: <b>at night</b> (vào ban đêm) đối lập với 'in the morning/afternoon/evening'."
    },
    {
      question: "The telephone and the door bell rang ______ the same time.",
      options: ["A. by", "B. at", "C. on", "D. in"],
      correctIndex: 1,
      explanation: "Thành ngữ chỉ thời điểm đồng thời: <b>at the same time</b> (cùng một lúc)."
    },
    {
      question: "Mary and Henry always go out for a meal ______ their wedding anniversary.",
      options: ["A. at", "B. on", "C. in", "D. to"],
      correctIndex: 1,
      explanation: "Giới từ chỉ ngày kỷ niệm: <b>on a wedding anniversary</b> (vào kỷ niệm ngày cưới)."
    },
    {
      question: "We usually have a holiday ______ the summer.",
      options: ["A. in", "B. at", "C. on", "D. for"],
      correctIndex: 0,
      explanation: "Giới từ chỉ mùa trong năm: dùng <b>in + mùa</b> (in the summer)."
    }
  ],
  medium: [
    {
      question: "The local community center offers a wide ______ of activities for senior citizens.",
      options: ["A. group", "B. series", "C. range", "D. set"],
      correctIndex: 2,
      explanation: "Cụm từ <b>a range of sth</b> có nghĩa là một loạt hoặc nhiều thứ khác nhau."
    },
    {
      question: "We arrived at the train station ahead ______ schedule, so we had to wait.",
      options: ["A. of", "B. with", "C. in", "D. to"],
      correctIndex: 0,
      explanation: "Cụm từ <b>ahead of schedule</b> nghĩa là trước thời hạn, trước lịch trình dự kiến."
    },
    {
      question: "It is not polite to argue ______ your teachers about minor details.",
      options: ["A. on", "B. for", "C. to", "D. with"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>argue with sb</b> nghĩa là tranh luận, cãi cọ với ai."
    },
    {
      question: "Everyone was amazed ______ the young girl's incredible memory during the contest.",
      options: ["A. with", "B. at", "C. in", "D. for"],
      correctIndex: 1,
      explanation: "Cấu trúc <b>be amazed at/by sth</b> nghĩa là kinh ngạc, ngạc nhiên vì điều gì."
    },
    {
      question: "My dad is busy ______ the broken fence in our backyard right now.",
      options: ["A. repairing", "B. repair", "C. repaired", "D. to repair"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be busy doing sth</b> nghĩa là bận rộn làm việc gì."
    },
    {
      question: "She feels confident ______ her ability to pass the driving test on her first try.",
      options: ["A. about", "B. on", "C. at", "D. for"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be confident about sth</b> nghĩa là tự tin về điều gì."
    },
    {
      question: "This dense tropical rainforest is home ______ many endangered animal species.",
      options: ["A. of", "B. for", "C. to", "D. with"],
      correctIndex: 2,
      explanation: "Cấu trúc <b>be home to sb/sth</b> nghĩa là nhà của/nơi cư trú, trú ngụ của loài nào."
    },
    {
      question: "Don't ask him for a favor today; he is in a bad ______ because of the rain.",
      options: ["A. state", "B. feeling", "C. mood", "D. mind"],
      correctIndex: 2,
      explanation: "Cụm từ <b>be in a bad/good mood</b> nghĩa là có tâm trạng tồi tệ/tốt."
    },
    {
      question: "During the rush hour, the city buses are usually packed ______ passengers.",
      options: ["A. by", "B. with", "C. in", "D. of"],
      correctIndex: 1,
      explanation: "Cấu trúc <b>be packed with sb/sth</b> nghĩa là chật ních, chật cứng người/vật."
    },
    {
      question: "We are pleased ______ announce the winners of the English essay competition.",
      options: ["A. with", "B. that", "C. to", "D. for"],
      correctIndex: 2,
      explanation: "Cấu trúc <b>be pleased to do sth</b> nghĩa là vui lòng, hân hạnh được làm gì."
    },
    {
      question: "Oranges and lemons are rich ______ vitamin C, which boosts our immune system.",
      options: ["A. at", "B. in", "C. of", "D. with"],
      correctIndex: 1,
      explanation: "Cấu trúc <b>be rich in sth</b> nghĩa là dồi dào, phong phú, chứa nhiều chất gì."
    },
    {
      question: "You should turn off your phone to concentrate ______ your homework.",
      options: ["A. at", "B. in", "C. with", "D. on"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>concentrate on sth/doing sth</b> nghĩa là tập trung vào điều gì/việc gì."
    },
    {
      question: "Every small action can contribute ______ reducing plastic pollution in our oceans.",
      options: ["A. for", "B. in", "C. with", "D. to"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>contribute to sth/doing sth</b> nghĩa là đóng góp vào việc gì."
    },
    {
      question: "The doctor advised him to cut ______ on sugar and processed food to lose weight.",
      options: ["A. off", "B. away", "C. out", "D. down"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>cut down on sth</b> nghĩa là cắt giảm bớt lượng tiêu thụ của thứ gì."
    },
    {
      question: "Our school trip will depend ______ the weather conditions tomorrow morning.",
      options: ["A. to", "B. on", "C. in", "D. with"],
      correctIndex: 1,
      explanation: "Cấu trúc <b>depend on sb/sth</b> nghĩa là phụ thuộc vào ai/cái gì."
    },
    {
      question: "She always dreams ______ becoming a professional astronaut and traveling to Mars.",
      options: ["A. of", "B. with", "C. to", "D. on"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>dream of sth/doing sth</b> nghĩa là mơ ước về điều gì/làm việc gì."
    },
    {
      question: "She is a friendly person who gets ______ well with all her classmates.",
      options: ["A. on", "B. through", "C. in", "D. up"],
      correctIndex: 0,
      explanation: "Cụm động từ <b>get on well with sb</b> nghĩa là hòa hợp, có quan hệ tốt với ai."
    },
    {
      question: "Her parents are saving money to send her ______ to study at a top university.",
      options: ["A. out", "B. overseas", "C. board", "D. abroad"],
      correctIndex: 3,
      explanation: "Cụm từ <b>go/study abroad</b> nghĩa là đi học tập ở nước ngoài."
    },
    {
      question: "On weekends, teenagers usually like to hang ______ with their friends at cafes.",
      options: ["A. out", "B. off", "C. up", "D. in"],
      correctIndex: 0,
      explanation: "Cụm động từ <b>hang out (with sb)</b> nghĩa là đi chơi, tụ tập, la cà (với ai)."
    },
    {
      question: "How many countries will take part ______ the upcoming Olympic Games?",
      options: ["A. on", "B. in", "C. at", "D. to"],
      correctIndex: 1,
      explanation: "Cấu trúc <b>take part in sth</b> nghĩa là tham gia vào một hoạt động, sự kiện."
    },
    {
      question: "The ______ the fire at the hotel last night is still unknown.",
      options: ["A. purpose for", "B. cause of", "C. reason of", "D. result in"],
      correctIndex: 1,
      explanation: "Cụm danh từ <b>cause of sth</b> có nghĩa là nguyên nhân của cái gì."
    },
    {
      question: "The ______ living alone is that you can do what you like.",
      options: ["A. advantage of", "B. interest in", "C. advantage to", "D. benefit to"],
      correctIndex: 0,
      explanation: "Cụm danh từ <b>advantage of sth</b> có nghĩa là lợi ích, lợi thế của điều gì."
    },
    {
      question: "Money isn't the ______ every problem.",
      options: ["A. answer for", "B. solution to", "C. way in", "D. key of"],
      correctIndex: 1,
      explanation: "Cụm danh từ <b>solution to sth</b> có nghĩa là giải pháp cho vấn đề gì."
    },
    {
      question: "There has been an ______ the number of road accidents recently.",
      options: ["A. increase of", "B. addition to", "C. increase in", "D. up on"],
      correctIndex: 2,
      explanation: "Cụm danh từ <b>increase in sth</b> có nghĩa là sự gia tăng về số lượng/mức độ của cái gì."
    },
    {
      question: "There are some ______ British and American English.",
      options: ["A. differences from", "B. differences of", "C. different with", "D. differences between"],
      correctIndex: 3,
      explanation: "Cụm danh từ <b>difference between A and B</b> có nghĩa là sự khác biệt giữa hai thứ."
    },
    {
      question: "When Paul left home, his ______ his parents seemed to change.",
      options: ["A. attitude to", "B. invitation to", "C. connection between", "D. contact with"],
      correctIndex: 0,
      explanation: "Cụm danh từ <b>attitude to/towards sb/sth</b> có nghĩa là thái độ đối với ai/cái gì."
    },
    {
      question: "The firm closed down because there wasn't enough ______ its product.",
      options: ["A. need of", "B. supply to", "C. value on", "D. demand for"],
      correctIndex: 3,
      explanation: "Cụm danh từ <b>demand for sth</b> có nghĩa là nhu cầu tiêu dùng về mặt hàng/dịch vụ gì."
    },
    {
      question: "When I opened the envelope, I was delighted to find a ______ £500.",
      options: ["A. cheque for", "B. cheque to", "C. cheque of", "D. cheque in"],
      correctIndex: 0,
      explanation: "Cụm danh từ <b>cheque for + số tiền</b> có nghĩa là tờ séc trị giá bao nhiêu tiền."
    },
    {
      question: "Bill and I used to be good friends but I don't have much ______ him now.",
      options: ["A. connection to", "B. demand with", "C. contact with", "D. attitude with"],
      correctIndex: 2,
      explanation: "Cụm danh từ <b>contact with sb</b> có nghĩa là sự liên lạc, liên hệ với ai."
    },
    {
      question: "Carol has decided to give up her job. I don't know her ______ doing this.",
      options: ["A. need for", "B. cause of", "C. reason of", "D. reason for"],
      correctIndex: 3,
      explanation: "Cụm danh từ <b>reason for sth/doing sth</b> có nghĩa là lý do cho cái gì/việc gì."
    },
    {
      question: "I've had an ______ Laura's barbecue next Sunday.",
      options: ["A. invitation to", "B. invitation for", "C. invite with", "D. invitation from"],
      correctIndex: 0,
      explanation: "Cụm danh từ <b>invitation to sth</b> có nghĩa là lời mời tham dự sự kiện gì."
    },
    {
      question: "The accident caused some ______ the car.",
      options: ["A. damage on", "B. damage with", "C. damage of", "D. damage to"],
      correctIndex: 3,
      explanation: "Cụm danh từ <b>damage to sth</b> có nghĩa là sự phá hoại, tổn hại đối với vật gì."
    },
    {
      question: "Unfortunately, there was some ______ the arrangement.",
      options: ["A. difficulty of", "B. difficulty with", "C. difficulty in", "D. difficulty to"],
      correctIndex: 1,
      explanation: "Cụm danh từ <b>difficulty with sth</b> có nghĩa là gặp khó khăn, trục trặc với điều gì."
    },
    {
      question: "We need to provide more shelters for the homeless, so there's a ______ more houses.",
      options: ["A. need for", "B. need to", "C. need about", "D. need of"],
      correctIndex: 0,
      explanation: "Cụm danh từ <b>need for sth</b> có nghĩa là nhu cầu cần thiết có cái gì."
    },
    {
      question: "The two companies are completely independent. There is no ______ them.",
      options: ["A. connection with", "B. connection for", "C. connection between", "D. connection to"],
      correctIndex: 2,
      explanation: "Cụm danh từ <b>connection between A and B</b> có nghĩa là mối liên hệ giữa hai đối tượng."
    },
    {
      question: "Who is that man standing ______ the window?",
      options: ["A. by", "B. in", "C. on", "D. to"],
      correctIndex: 0,
      explanation: "Giới từ chỉ nơi chốn: <b>by the window</b> nghĩa là đứng cạnh, đứng bên cửa sổ."
    },
    {
      question: "I managed to put the fire out ______ a fire extinguisher.",
      options: ["A. on", "B. with", "C. by", "D. in"],
      correctIndex: 1,
      explanation: "Giới từ chỉ công cụ: dùng <b>with + dụng cụ/thiết bị</b> (bằng một cái gì)."
    },
    {
      question: "These photographs were taken ______ a friend of mine.",
      options: ["A. in", "B. by", "C. with", "D. of"],
      correctIndex: 1,
      explanation: "Thể bị động: dùng <b>by + tác nhân thực hiện hành động</b> (được chụp bởi ai)."
    },
    {
      question: "These photographs were taken ______ a very good camera.",
      options: ["A. in", "B. by", "C. with", "D. on"],
      correctIndex: 2,
      explanation: "Giới từ chỉ công cụ: dùng <b>with + thiết bị</b> để chụp ảnh (chụp bằng máy ảnh)."
    },
    {
      question: "I don't mind going ______ car but I don't want to go ______ your car.",
      options: ["A. in / by", "B. in / in", "C. by / in", "D. by / by"],
      correctIndex: 2,
      explanation: "Phương tiện giao thông: dùng <b>by + phương tiện</b> (by car) nói chung; dùng <b>in + possessive + car</b> (in your car) khi chỉ xe cụ thể."
    },
    {
      question: "I like that picture hanging ______ the wall ______ the kitchen.",
      options: ["A. on / at", "B. at / in", "C. on / in", "D. in / on"],
      correctIndex: 2,
      explanation: "Giới từ chỉ vị trí: dùng <b>on the wall</b> (trên tường) và <b>in the kitchen</b> (trong phòng bếp)."
    },
    {
      question: "There was an accident ______ the crossroads this morning.",
      options: ["A. in", "B. to", "C. on", "D. at"],
      correctIndex: 3,
      explanation: "Giới từ chỉ địa điểm cụ thể giao lộ: <b>at the crossroads</b> (tại ngã tư đường)."
    },
    {
      question: "You'll find the sports results ______ the back page of the newspaper.",
      options: ["A. in", "B. to", "C. on", "D. at"],
      correctIndex: 2,
      explanation: "Giới từ chỉ vị trí trang giấy: <b>on the back page</b> (ở trang sau)."
    },
    {
      question: "My brother lives ______ a small village ______ the south-west of England.",
      options: ["A. in / at", "B. in / in", "C. at / at", "D. at / in"],
      correctIndex: 1,
      explanation: "Giới từ chỉ địa điểm: <b>in a village</b> (ở một ngôi làng) và <b>in the south-west of...</b> (ở vùng phía Tây Nam của nước nào)."
    },
    {
      question: "The man the police are looking for has a scar ______ his right cheek.",
      options: ["A. in", "B. at", "C. to", "D. on"],
      correctIndex: 3,
      explanation: "Giới từ chỉ vị trí trên bề mặt cơ thể: <b>on his cheek</b> (trên má)."
    },
    {
      question: "My office is ______ the first floor. It's ______ the left as you come out of the lift.",
      options: ["A. in / to", "B. on / on", "C. in / on", "D. on / in"],
      correctIndex: 1,
      explanation: "Giới từ chỉ vị trí: <b>on the first floor</b> (ở tầng một) và <b>on the left</b> (ở bên trái)."
    },
    {
      question: "We normally use the front entrance but there's another entrance ______ the back.",
      options: ["A. on", "B. in", "C. to", "D. at"],
      correctIndex: 3,
      explanation: "Giới từ chỉ phương hướng/vị trí: <b>at the back</b> (ở phía sau/cửa sau)."
    },
    {
      question: "Is there anything interesting ______ the paper today? ~ Well, there's an unusual photograph ______ the back page.",
      options: ["A. in / at", "B. at / on", "C. in / on", "D. on / in"],
      correctIndex: 2,
      explanation: "Giới từ chỉ vị trí tài liệu: <b>in the paper</b> (trong tờ báo) và <b>on the back page</b> (ở trang sau)."
    },
    {
      question: "When I'm a passenger in a car, I prefer to sit ______ the front.",
      options: ["A. to", "B. on", "C. in", "D. at"],
      correctIndex: 2,
      explanation: "Vị trí ngồi trong xe ô tô: <b>in the front (of a car)</b> (ngồi ở hàng ghế trước của ô tô con)."
    },
    {
      question: "London is ______ the Thames.",
      options: ["A. in", "B. by", "C. at", "D. on"],
      correctIndex: 3,
      explanation: "Giới từ chỉ vị trí ven sông: <b>on the Thames</b> (nằm bên sông Thames)."
    },
    {
      question: "It was a very slow train. It stopped ______ every station.",
      options: ["A. to", "B. in", "C. at", "D. on"],
      correctIndex: 2,
      explanation: "Giới từ chỉ điểm dừng của chuyến đi: <b>at a station</b> (tại nhà ga)."
    },
    {
      question: "I haven't seen Kate for some time. I last saw her ______ Dave's wedding.",
      options: ["A. at", "B. in", "C. to", "D. on"],
      correctIndex: 0,
      explanation: "Giới từ chỉ sự kiện: <b>at a wedding</b> (tại lễ cưới)."
    },
    {
      question: "Paul lives ______ London. He's a student ______ London University.",
      options: ["A. at / at", "B. in / at", "C. at / in", "D. in / in"],
      correctIndex: 1,
      explanation: "Giới từ chỉ địa điểm lớn và trường học: <b>in London</b> (ở thành phố) và <b>at London University</b> (tại trường đại học)."
    },
    {
      question: "Hurry up! We've got to go ______ five minutes.",
      options: ["A. on", "B. in", "C. at", "D. after"],
      correctIndex: 1,
      explanation: "Giới từ chỉ thời gian trong tương lai: <b>in + khoảng thời gian</b> nghĩa là trong bao lâu nữa."
    },
    {
      question: "I'm busy now but I'll be with you ______ a moment.",
      options: ["A. at", "B. on", "C. in", "D. by"],
      correctIndex: 2,
      explanation: "Thành ngữ chỉ thời gian ngắn: <b>in a moment / in a minute</b> (trong chốc lát)."
    },
    {
      question: "______ Saturday night I went to bed ______ 11 o'clock.",
      options: ["A. On / in", "B. In / at", "C. On / at", "D. At / on"],
      correctIndex: 2,
      explanation: "Giới từ thời gian: dùng <b>on + buổi của thứ</b> (on Saturday night) và <b>at + giờ cụ thể</b> (at 11 o'clock)."
    },
    {
      question: "We travelled overnight to Paris and arrived ______ 5 o'clock ______ the morning.",
      options: ["A. in / at", "B. at / on", "C. at / in", "D. on / in"],
      correctIndex: 2,
      explanation: "Giới từ thời gian: <b>at 5 o'clock</b> (giờ cụ thể) và <b>in the morning</b> (buổi trong ngày)."
    },
    {
      question: "The course begins ______ 7 January and ends sometime ______ April.",
      options: ["A. in / on", "B. on / in", "C. at / in", "D. on / at"],
      correctIndex: 1,
      explanation: "Giới từ thời gian: dùng <b>on + ngày cụ thể</b> (on 7 January) và <b>in + tháng</b> (in April)."
    },
    {
      question: "It was quite a short book and easy to read. I read it ______ a day.",
      options: ["A. in", "B. at", "C. on", "D. for"],
      correctIndex: 0,
      explanation: "Giới từ chỉ thời gian để hoàn thành: <b>in a day</b> (trong vòng một ngày)."
    },
    {
      question: "I might not be at home ______ Tuesday morning but I'll probably be there ______ the afternoon.",
      options: ["A. on / at", "B. in / on", "C. at / in", "D. on / in"],
      correctIndex: 3,
      explanation: "Giới từ chỉ thời gian: dùng <b>on + buổi của thứ</b> (on Tuesday morning) và <b>in the afternoon</b> (buổi trong ngày)."
    },
    {
      question: "Henry is 63. He'll be retiring from his job ______ two years' time.",
      options: ["A. on", "B. in", "C. for", "D. at"],
      correctIndex: 1,
      explanation: "Giới từ chỉ thời gian tương lai: <b>in two years' time</b> (trong vòng 2 năm nữa)."
    },
    {
      question: "My car is being repaired at the garage. It will be ready ______ two hours.",
      options: ["A. at", "B. on", "C. in", "D. for"],
      correctIndex: 2,
      explanation: "Giới từ chỉ thời gian hoàn thành: <b>in two hours</b> (trong vòng 2 tiếng nữa)."
    }
  ],
  hard: [
    {
      question: "She worked day and night to accomplish her goal ______ publishing a novel.",
      options: ["A. to", "B. with", "C. in", "D. of"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>accomplish one's goal of doing sth</b> nghĩa là hoàn thành mục tiêu làm việc gì."
    },
    {
      question: "You must ask your parents ______ permission before going on the overnight trip.",
      options: ["A. for", "B. to", "C. of", "D. with"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>ask sb for permission to do sth</b> nghĩa là xin phép ai để làm gì."
    },
    {
      question: "With a smartphone, you have a wealth of information at your ______.",
      options: ["A. reach", "B. control", "C. fingertips", "D. hands"],
      correctIndex: 2,
      explanation: "Thành ngữ <b>at one's fingertips</b> nghĩa là có sẵn trong tầm tay, dễ dàng truy cập và sử dụng."
    },
    {
      question: "In winter, the peak of the mountain is completely covered ______ thick snow.",
      options: ["A. of", "B. with", "C. by", "D. in"],
      correctIndex: 1,
      explanation: "Cấu trúc <b>be covered with sth</b> nghĩa là được che phủ, bao phủ bởi thứ gì."
    },
    {
      question: "Despite the injuries, the athlete was determined ______ finish the marathon.",
      options: ["A. on", "B. for", "C. to", "D. in"],
      correctIndex: 2,
      explanation: "Cấu trúc <b>be determined to do sth</b> nghĩa là quyết tâm, kiên quyết làm việc gì."
    },
    {
      question: "Regular hydration is absolutely essential ______ maintaining good physical performance.",
      options: ["A. for", "B. at", "C. by", "D. with"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be essential for sth</b> nghĩa là cần thiết, thiết yếu cho cái gì."
    },
    {
      question: "The chief manager is in charge ______ organizing the upcoming international conference.",
      options: ["A. for", "B. with", "C. at", "D. of"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>be in charge of sth/doing sth</b> nghĩa là chịu trách nhiệm, phụ trách công việc gì."
    },
    {
      question: "Our history tour guide is extremely knowledgeable ______ ancient civilizations.",
      options: ["A. about", "B. on", "C. with", "D. for"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be knowledgeable about sth</b> nghĩa là có kiến thức rộng, am hiểu sâu về cái gì."
    },
    {
      question: "Who is responsible ______ cleaning the classroom after the final lesson today?",
      options: ["A. about", "B. with", "C. to", "D. for"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>be responsible for sth/doing sth</b> nghĩa là chịu trách nhiệm cho việc gì."
    },
    {
      question: "We are deeply thankful ______ our volunteers for their tireless efforts during the flood.",
      options: ["A. at", "B. with", "C. to", "D. for"],
      correctIndex: 2,
      explanation: "Cấu trúc <b>be thankful to sb (for sth)</b> nghĩa là biết ơn ai (vì điều gì)."
    },
    {
      question: "This specialized software is used ______ analyzing climate change data patterns.",
      options: ["A. for", "B. with", "C. of", "D. to"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>be used for doing sth</b> nghĩa là được sử dụng để làm gì (sau trống là V-ing 'analyzing' nên ta chọn giới từ 'for')."
    },
    {
      question: "I think I am coming ______ with the flu; my throat is sore and I have a fever.",
      options: ["A. down", "B. across", "C. along", "D. up"],
      correctIndex: 0,
      explanation: "Cụm động từ <b>come down with sth</b> nghĩa là bị đổ bệnh, bị nhiễm bệnh gì."
    },
    {
      question: "The local government will give ______ to improving public transportation in the city.",
      options: ["A. benefit", "B. support", "C. advantage", "D. priority"],
      correctIndex: 3,
      explanation: "Cụm từ <b>give priority to sth</b> nghĩa là dành sự ưu tiên cho việc gì."
    },
    {
      question: "Our new manager gives us the freedom ______ express our creative ideas.",
      options: ["A. to", "B. of", "C. for", "D. with"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>give sb freedom to do sth</b> nghĩa là cho phép ai tự do làm việc gì."
    },
    {
      question: "The student advisor will offer valuable advice ______ selecting university majors.",
      options: ["A. to", "B. on", "C. with", "D. for"],
      correctIndex: 1,
      explanation: "Cấu trúc <b>give/offer advice on sth</b> nghĩa là đưa ra lời khuyên về vấn đề gì."
    },
    {
      question: "They take great pride ______ their daughter's academic achievements.",
      options: ["A. in", "B. with", "C. on", "D. for"],
      correctIndex: 0,
      explanation: "Cấu trúc <b>take (great) pride in sth/sb</b> nghĩa là tự hào về cái gì/ai đó."
    },
    {
      question: "The city council needs to take ______ to protect historical buildings from demolition.",
      options: ["A. steps", "B. deeds", "C. actions", "D. measures"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>take measures to do sth</b> nghĩa là thực hiện các biện pháp để đạt được mục tiêu nào đó."
    },
    {
      question: "I am sorry, I took your umbrella ______ mistake; it looks exactly like mine.",
      options: ["A. in", "B. with", "C. for", "D. by"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>take sth by mistake</b> nghĩa là lấy nhầm cái gì đó."
    },
    {
      question: "Rising sea levels pose a serious threat ______ coastal communities worldwide.",
      options: ["A. at", "B. for", "C. with", "D. to"],
      correctIndex: 3,
      explanation: "Cấu trúc <b>threat to sb/sth</b> nghĩa là mối đe dọa đối với ai/cái gì."
    },
    {
      question: "The guidebook has been translated ______ five different languages for tourists.",
      options: ["A. to", "B. with", "C. into", "D. in"],
      correctIndex: 2,
      explanation: "Cấu trúc <b>translate sth into sth</b> nghĩa là dịch cái gì sang ngôn ngữ gì."
    },
    {
      question: "Shall we get a taxi or shall we go ______ foot?",
      options: ["A. with", "B. on", "C. by", "D. at"],
      correctIndex: 1,
      explanation: "Thành ngữ chỉ cách đi lại: <b>on foot</b> nghĩa là đi bộ."
    },
    {
      question: "What's that music? I know it's ______ Beethoven but I can't remember what it's called.",
      options: ["A. with", "B. of", "C. from", "D. by"],
      correctIndex: 3,
      explanation: "Giới từ chỉ tác giả: dùng <b>by + tên nhạc sĩ/nhà văn</b> để biểu thị tác phẩm của họ."
    },
    {
      question: "There was a small table ______ the bed ______ a lamp and a clock ______ it.",
      options: ["A. by / with / on", "B. at / with / in", "C. on / with / at", "D. by / of / on"],
      correctIndex: 0,
      explanation: "Sử dụng giới từ thích hợp: <b>by the bed</b> (cạnh giường), <b>table with sth</b> (bàn có trang bị đồ vật gì), và <b>on it</b> (nằm trên bàn)."
    },
    {
      question: "Our team lost the game only because of a mistake ______ one of our players.",
      options: ["A. from", "B. by", "C. of", "D. with"],
      correctIndex: 1,
      explanation: "Cụm danh từ: <b>mistake by sb</b> nghĩa là lỗi lầm/sơ suất thực hiện bởi ai."
    },
    {
      question: "I didn't feel like walking home, so I came home ______ a taxi.",
      options: ["A. with", "B. in", "C. by", "D. on"],
      correctIndex: 1,
      explanation: "Phương tiện giao thông: dùng <b>in a taxi / in a car</b> đối với ô tô con/taxi thay vì dùng 'by' khi có mạo từ 'a'."
    },
    {
      question: "Water boils ______ 100 degrees celsius.",
      options: ["A. at", "B. on", "C. by", "D. in"],
      correctIndex: 0,
      explanation: "Giới từ chỉ mức độ/thông số: dùng <b>at + số đo/nhiệt độ/tốc độ</b>."
    },
    {
      question: "My cellphone was stolen while I was ______ a business trip.",
      options: ["A. at", "B. on", "C. by", "D. in"],
      correctIndex: 1,
      explanation: "Thành ngữ: <b>on a business trip</b> nghĩa là đi công tác."
    },
    {
      question: "Could you be quiet for a minute, please? I'm ______ the phone.",
      options: ["A. on", "B. with", "C. at", "D. in"],
      correctIndex: 0,
      explanation: "Thành ngữ: <b>on the phone</b> nghĩa là đang nói chuyện điện thoại."
    },
    {
      question: "In Britain, children start school ______ the age of five.",
      options: ["A. by", "B. at", "C. on", "D. in"],
      correctIndex: 1,
      explanation: "Thành ngữ: <b>at the age of...</b> nghĩa là ở độ tuổi bao nhiêu."
    },
    {
      question: "We sat ______ the shade. It was too hot to sit ______ the sun.",
      options: ["A. on / in", "B. under / in", "C. in / under", "D. in / in"],
      correctIndex: 3,
      explanation: "Giới từ chỉ vị trí: <b>in the shade</b> (ở trong bóng râm) và <b>in the sun</b> (dưới ánh nắng)."
    },
    {
      question: "Did you go to Germany ______ business or ______ holiday?",
      options: ["A. on / on", "B. in / in", "C. on / in", "D. in / on"],
      correctIndex: 0,
      explanation: "Thành ngữ: <b>on business</b> (đi công tác) và <b>on holiday</b> (đi nghỉ mát)."
    },
    {
      question: "Can I pay ______ credit card? ~Yes, of course. But it's cheaper if you pay ______ cash.",
      options: ["A. by / in", "B. in / by", "C. by / by", "D. in / in"],
      correctIndex: 0,
      explanation: "Phương thức thanh toán: dùng <b>by credit card</b> (bằng thẻ) và <b>in cash</b> (bằng tiền mặt)."
    },
    {
      question: "He got married ______ 17, which is rather young to get married.",
      options: ["A. at", "B. in", "C. on", "D. by"],
      correctIndex: 0,
      explanation: "Thành ngữ chỉ tuổi tác: dùng <b>at + số tuổi</b>."
    },
    {
      question: "There was an interesting program ______ the radio this morning.",
      options: ["A. in", "B. at", "C. through", "D. on"],
      correctIndex: 3,
      explanation: "Thành ngữ truyền thông: <b>on the radio / on TV / on the internet</b>."
    },
    {
      question: "______ my opinion, violent films should not be shown ______ television.",
      options: ["A. In / in", "B. In / on", "C. To / on", "D. According to / in"],
      correctIndex: 1,
      explanation: "Thành ngữ: <b>in my opinion</b> (theo ý kiến của tôi) và <b>on television</b> (trên truyền hình)."
    },
    {
      question: "When you do the exam, you're not allowed to write ______ pencil.",
      options: ["A. by", "B. on", "C. in", "D. with"],
      correctIndex: 2,
      explanation: "Chất liệu/mực viết: dùng <b>in pencil / in ink</b> (viết bằng bút chì/mực). Nếu có mạo từ ta dùng 'with a pencil'."
    },
    {
      question: "The earth travels round the sun ______ a speed of 107,000 kilometers an hour.",
      options: ["A. at", "B. on", "C. with", "D. in"],
      correctIndex: 0,
      explanation: "Giới từ chỉ tốc độ: <b>at a speed of...</b> (với tốc độ bao nhiêu)."
    },
    {
      question: "Look! That car is ______ fire! Please call the fire brigade.",
      options: ["A. in", "B. at", "C. on", "D. by"],
      correctIndex: 2,
      explanation: "Thành ngữ: <b>on fire</b> nghĩa là đang bốc cháy."
    },
    {
      question: "I pressed the wrong number ______ mistake.",
      options: ["A. for", "B. by", "C. in", "D. on"],
      correctIndex: 1,
      explanation: "Thành ngữ: <b>by mistake</b> nghĩa là do sơ suất, nhầm lẫn."
    },
    {
      question: "It's a long journey. Let's stop somewhere ______ the way and have a meal.",
      options: ["A. at", "B. in", "C. on", "D. by"],
      correctIndex: 2,
      explanation: "Thành ngữ: <b>on the way (to somewhere)</b> nghĩa là trên đường đi."
    },
    {
      question: "Three people were taken ______ hospital after the accident.",
      options: ["A. to", "B. in", "C. at", "D. x (không điền)"],
      correctIndex: 0,
      explanation: "Cấu trúc hướng chuyển động: <b>take sb to hospital</b> (đưa ai đến bệnh viện)."
    },
    {
      question: "I met Caroline on my way ______ home.",
      options: ["A. in", "B. at", "C. to", "D. x (không điền)"],
      correctIndex: 3,
      explanation: "Thành ngữ chỉ vị trí: <b>on my way home</b> (trên đường về nhà - không điền giới từ trước 'home')."
    },
    {
      question: "We left our luggage ______ the station and went to find something to eat.",
      options: ["A. to", "B. in", "C. at", "D. on"],
      correctIndex: 2,
      explanation: "Giới từ chỉ vị trí cụ thể: <b>at the station</b> (tại nhà ga)."
    },
    {
      question: "Shall we take a taxi ______ the station or shall we walk?",
      options: ["A. at", "B. into", "C. to", "D. through"],
      correctIndex: 2,
      explanation: "Giới từ hướng chuyển động: dùng <b>to + địa điểm</b> chỉ đích đến."
    },
    {
      question: "I must go ______ the bank today to change some money.",
      options: ["A. into", "B. at", "C. to", "D. x (không điền)"],
      correctIndex: 2,
      explanation: "Cấu trúc hướng chuyển động: <b>go to the bank</b> (đi đến ngân hàng)."
    },
    {
      question: "The river Rhine flows ______ the North Sea.",
      options: ["A. through", "B. in", "C. to", "D. into"],
      correctIndex: 3,
      explanation: "Giới từ chỉ sự chuyển động vào trong: <b>flow into sth</b> (chảy vào cái gì)."
    },
    {
      question: "I'm tired. As soon as I get ______ home, I'm going ______ bed.",
      options: ["A. at / into", "B. to / to", "C. x (không điền) / to", "D. x (không điền) / in"],
      correctIndex: 2,
      explanation: "Thành ngữ: <b>get home</b> (về nhà - không dùng giới từ) và <b>go to bed</b> (đi ngủ)."
    },
    {
      question: "'Have you got your camera?' - 'No, I left it ______ home.'",
      options: ["A. to", "B. x (không điền)", "C. in", "D. at"],
      correctIndex: 3,
      explanation: "Thành ngữ vị trí: <b>at home</b> (ở nhà), cụm từ: <b>leave sth at home</b>."
    },
    {
      question: "Marcel is French. He has just returned ______ France after two years ______ Brazil.",
      options: ["A. in / in", "B. to / to", "C. to / in", "D. x (không điền) / in"],
      correctIndex: 2,
      explanation: "Cấu trúc chuyển động và vị trí: <b>return to a country</b> (trở về nước nào) và <b>in a country</b> (ở quốc gia nào)."
    },
    {
      question: "When did they arrive ______ the hotel?",
      options: ["A. into", "B. at", "C. in", "D. to"],
      correctIndex: 1,
      explanation: "Giới từ chỉ sự đến nơi: dùng <b>arrive at a building</b> (đến tòa nhà/khách sạn/sân bay) và <b>arrive in a city/country</b>."
    },
    {
      question: "Have you ever been ______ China?",
      options: ["A. to", "B. in", "C. at", "D. into"],
      correctIndex: 0,
      explanation: "Cấu trúc hiện tại hoàn thành trải nghiệm: <b>have been to somewhere</b> (đã từng đi đến đâu)."
    },
    {
      question: "I had lost my key but I managed to climb ______ the house ______ a window.",
      options: ["A. into / through", "B. to / by", "C. in / with", "D. into / by"],
      correctIndex: 0,
      explanation: "Giới từ chỉ chuyển động: <b>climb into the house</b> (trèo vào trong nhà) và <b>through a window</b> (xuyên qua/qua lối cửa sổ)."
    },
    {
      question: "We got stuck in a traffic jam on our way ______ the airport.",
      options: ["A. through", "B. at", "C. to", "D. into"],
      correctIndex: 2,
      explanation: "Thành ngữ chỉ hướng đi: <b>on the way to somewhere</b> (trên đường tới đâu)."
    },
    {
      question: "Welcome ______ the hotel. We hope you enjoy your stay here.",
      options: ["A. into", "B. to", "C. in", "D. at"],
      correctIndex: 1,
      explanation: "Thành ngữ tiếp đón: <b>welcome to a place</b> (chào mừng tới nơi nào)."
    },
    {
      question: "She got ______ the car and drove away.",
      options: ["A. to", "B. on", "C. into", "D. at"],
      correctIndex: 2,
      explanation: "Giới từ chuyển động xe cộ: dùng <b>get into the car/taxi</b> (bước vào ô tô con/taxi), còn 'get on the bus/train/plane'."
    },
    {
      question: "Don't wait outside. Come ______ the house.",
      options: ["A. at", "B. on", "C. into", "D. to"],
      correctIndex: 2,
      explanation: "Giới từ chỉ hướng chuyển động vào trong: <b>come into the house</b> (đi vào trong nhà)."
    },
    {
      question: "The sheep got out ______ a hole ______ the fence.",
      options: ["A. through / in", "B. through / of", "C. by / on", "D. into / in"],
      correctIndex: 0,
      explanation: "Giới từ vị trí và lối đi: <b>get out through sth</b> (ra ngoài bằng cách chui qua cái gì) và <b>in the fence</b> (ở trên hàng rào)."
    },
    {
      question: "Carl was born ______ Chicago but his family moved ______ New York when he was three. Now he still lives ______ New York.",
      options: ["A. at / to / in", "B. in / in / in", "C. in / to / in", "D. in / to / at"],
      correctIndex: 2,
      explanation: "Giới từ chỉ địa danh lớn: <b>born in / live in + city</b> (sinh ra/sống ở thành phố) và <b>move to + place</b> (di chuyển tới đâu)."
    },
    {
      question: "That man is an idiot. He pushed me ______ the swimming-pool.",
      options: ["A. in", "B. to", "C. inside", "D. into"],
      correctIndex: 3,
      explanation: "Giới từ chỉ hướng chuyển động vào trong lòng vật thể: <b>push sb into sth</b> (đẩy ai vào đâu)."
    },
    {
      question: "What time does this train arrive ______ London?",
      options: ["A. at", "B. in", "C. to", "D. into"],
      correctIndex: 1,
      explanation: "Giới từ đi với arrive: dùng <b>arrive in a city/country</b> (đến thành phố/quốc gia)."
    }
  ]
};

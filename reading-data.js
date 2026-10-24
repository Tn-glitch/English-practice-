/**
 * READING DATA: Ngân hàng các đoạn văn luyện đọc hiểu chuẩn CEFR A1 - C2
 */
window.READING_PASSAGES = [
  {
    id: 'r1',
    level: 'A1',
    title: 'A Day at the Local Market',
    text: `Today is Saturday. I go to the local market with my mother. The market is very crowded with many people. 
There are colourful stalls selling fresh fruits, green vegetables, and delicious bread. I buy two red apples and a bottle of milk. The vendor is very kind and gives me a small orange for free. We smile and say thank you before walking back home.`,
    questions: [
      {
        question: 'Who does the writer go to the market with?',
        options: ['His father', 'His mother', 'His teacher', 'His friend'],
        correct: 1,
        explanation: 'Bài đọc viết: "I go to the local market with my mother."'
      },
      {
        question: 'What does the writer buy?',
        options: ['Apples and milk', 'Bread and fish', 'Oranges and bananas', 'Tea and cakes'],
        correct: 0,
        explanation: 'Bài đọc viết: "I buy two red apples and a bottle of milk."'
      },
      {
        question: 'What does the kind vendor give for free?',
        options: ['A red apple', 'A bottle of milk', 'A small orange', 'A loaf of bread'],
        correct: 2,
        explanation: 'Bài đọc viết: "The vendor is very kind and gives me a small orange for free."'
      }
    ]
  },
  {
    id: 'r2',
    level: 'A2',
    title: 'A Memorable Trip to Da Nang',
    text: `Last summer, my family spent four days visiting Da Nang, a beautiful coastal city in Vietnam. 
We stayed at a hotel right near My Khe beach. In the morning, we woke up early to watch the stunning sunrise and swam in the cool ocean water. 
On the second day, we visited Ba Na Hills and walked across the famous Golden Bridge held by two giant stone hands. In the evenings, we enjoyed local dishes like Mi Quang and grilled seafood. It was an unforgettable trip for all of us.`,
    questions: [
      {
        question: 'How long did the family stay in Da Nang?',
        options: ['Two days', 'Three days', 'Four days', 'One week'],
        correct: 2,
        explanation: 'Bài đọc viết: "...family spent four days visiting Da Nang..."'
      },
      {
        question: 'What famous place did they visit on the second day?',
        options: ['Hoi An Ancient Town', 'Ba Na Hills and the Golden Bridge', 'Son Tra Peninsula', 'Marble Mountains'],
        correct: 1,
        explanation: 'Bài đọc viết: "On the second day, we visited Ba Na Hills and walked across the famous Golden Bridge..."'
      },
      {
        question: 'Which local specialty dish is mentioned?',
        options: ['Pho Bo', 'Mi Quang', 'Bun Cha', 'Banh Mi'],
        correct: 1,
        explanation: 'Bài đọc viết: "...we enjoyed local dishes like Mi Quang and grilled seafood."'
      }
    ]
  },
  {
    id: 'r3',
    level: 'B1',
    title: 'The Habit of Daily Reading',
    text: `Developing a habit of reading daily provides numerous intellectual and emotional benefits. 
First, reading exposes individuals to rich vocabulary and diverse grammatical structures, which naturally enhances both spoken and written communication skills. 
Second, immersing oneself in a compelling book encourages deep focus, offering a healthy break from constant smartphone notifications and digital distractions. 
Finally, reading literature fosters empathy by allowing readers to experience life through the perspectives of characters from entirely different backgrounds and cultures. Just twenty minutes of reading every evening can significantly reduce daily stress and stimulate mental sharpness.`,
    questions: [
      {
        question: 'What is mentioned as a major communication benefit of daily reading?',
        options: ['It improves handwriting', 'It exposes readers to rich vocabulary and grammar', 'It teaches people how to speak faster', 'It replaces school textbooks'],
        correct: 1,
        explanation: 'Bài đọc viết: "...reading exposes individuals to rich vocabulary and diverse grammatical structures, which naturally enhances both spoken and written communication skills."'
      },
      {
        question: 'How does reading help people manage digital distractions?',
        options: ['By encouraging deep focus away from smartphone alerts', 'By teaching people to build mobile apps', 'By making digital screens brighter', 'By turning off the Internet'],
        correct: 0,
        explanation: 'Bài đọc viết: "...encourages deep focus, offering a healthy break from constant smartphone notifications..."'
      },
      {
        question: 'According to the passage, reading literature helps build empathy because:',
        options: ['It gives readers practical financial tips', 'It allows people to view life through different characters perspectives', 'It teaches historical dates', 'It requires memorizing poems'],
        correct: 1,
        explanation: 'Bài đọc viết: "...reading literature fosters empathy by allowing readers to experience life through the perspectives of characters from entirely different backgrounds..."'
      }
    ]
  },
  {
    id: 'r4',
    level: 'B2',
    title: 'Artificial Intelligence in Education',
    text: `The integration of Artificial Intelligence (AI) into modern education is fundamentally transforming how students acquire knowledge and how instructors teach. 
Adaptive learning platforms leverage algorithms to analyze individual learning paces, strengths, and weaknesses, automatically delivering personalized exercises tailored to each learner's needs. 
Furthermore, intelligent tutoring systems provide immediate feedback, enabling students to correct mistakes and grasp difficult concepts without waiting for classroom reviews. 
However, educational experts emphasize that AI should complement, rather than substitute, human teachers. Critical thinking, creative problem-solving, and emotional encouragement remain distinctly human capabilities that algorithms cannot duplicate.`,
    questions: [
      {
        question: 'What is the primary function of adaptive learning platforms described in the text?',
        options: ['Grading national entrance exams', 'Analyzing learning paces to deliver personalized exercises', 'Replacing teachers in rural schools', 'Producing printed textbooks'],
        correct: 1,
        explanation: 'Bài đọc viết: "Adaptive learning platforms leverage algorithms to analyze individual learning paces... automatically delivering personalized exercises..."'
      },
      {
        question: 'Why do intelligent tutoring systems benefit learners?',
        options: ['They provide immediate feedback to correct misconceptions', 'They eliminate homework completely', 'They reduce school hours to half', 'They make tests optional'],
        correct: 0,
        explanation: 'Bài đọc viết: "...intelligent tutoring systems provide immediate feedback, enabling students to correct mistakes and grasp difficult concepts..."'
      },
      {
        question: 'What do experts conclude regarding human teachers in the age of AI?',
        options: ['They will be entirely replaced within five years', 'AI should assist rather than replace them because human empathy and critical thinking are irreplaceable', 'They should focus only on administrative tasks', 'They no longer need to prepare lesson plans'],
        correct: 1,
        explanation: 'Bài đọc viết: "...AI should complement, rather than substitute, human teachers. Critical thinking, creative problem-solving, and emotional encouragement remain distinctly human capabilities..."'
      }
    ]
  },
  {
    id: 'r5',
    level: 'C1',
    title: 'The Paradox of Choice in Modern Consumerism',
    text: `In contemporary consumer culture, the proliferation of available options is widely celebrated as the pinnacle of individual liberty and autonomy. 
Whether selecting a healthcare plan, purchasing household electronics, or deciding on a university major, individuals face an unprecedented array of alternatives. 
Nevertheless, psychological research spearheaded by Barry Schwartz reveals that excessive choice frequently induces cognitive paralysis and heightened anxiety rather than liberation. 
When confronted with hundreds of competing options, decision-makers experience elevated opportunity costs and persistent regret, often suspecting that an unchosen alternative would have yielded superior satisfaction. 
Consequently, streamlining choices and adopting a 'satisficing' mentality—accepting an option that meets one's core criteria rather than ceaselessly seeking perfection—proves crucial for long-term psychological well-being.`,
    questions: [
      {
        question: 'What is the conventional assumption regarding having numerous choices?',
        options: ['It causes immediate economic inflation', 'It represents the pinnacle of personal liberty and autonomy', 'It leads to poor quality manufactured goods', 'It decreases corporate competition'],
        correct: 1,
        explanation: 'Bài đọc viết: "...the proliferation of available options is widely celebrated as the pinnacle of individual liberty and autonomy."'
      },
      {
        question: 'According to Barry Schwartz, what is the negative psychological outcome of overwhelming choice?',
        options: ['Total indifference to quality', 'Cognitive paralysis, heightened anxiety, and persistent regret', 'Increased physical exhaustion', 'Aggressive consumer protests'],
        correct: 1,
        explanation: 'Bài đọc viết: "...excessive choice frequently induces cognitive paralysis and heightened anxiety rather than liberation... elevated opportunity costs and persistent regret..."'
      },
      {
        question: 'What does a "satisficing" mentality entail in the passage?',
        options: ['Demanding absolute perfection in every purchase', 'Refusing to make any financial purchases', 'Settling for an option that satisfies core criteria rather than pursuing elusive perfection', 'Delegating all decisions to algorithms'],
        correct: 2,
        explanation: 'Bài đọc viết: "...accepting an option that meets one\'s core criteria rather than ceaselessly seeking perfection..."'
      }
    ]
  }
];

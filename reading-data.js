/** READING DATA — Collection of random reading passages with comprehension questions.
 *  Structure: { id, level, title, text, questions: [{ question, options[], correct(0-based idx), explanation }] }
 */
const READING_PASSAGES = [
  // ─── A1 ───────────────────────────────────────────────────────────────────
  {
    id: 'r01', level: 'A1', title: 'A Day at the Market',
    text: `Today I went to the local market with my mother. It was a busy place with many stalls selling fresh fruits, vegetables, and handmade crafts. We bought apples, carrots, and a beautiful knitted scarf. The vendor smiled and thanked us. On the way home, we ate an ice cream under a big tree. It was a wonderful day.`,
    questions: [
      { question: 'Who did the speaker go to the market with?', options: ['A friend','Their father','Their mother','Their sister'], correct: 2, explanation: 'The passage says "I went to the local market with my mother."' },
      { question: 'What did they buy at the market?', options: ['Fish, bread, and milk','Apples, carrots, and a scarf','Oranges, potatoes, and a hat','Mangoes, beans, and gloves'], correct: 1, explanation: 'They bought apples, carrots, and a knitted scarf.' },
      { question: 'What did they do on the way home?', options: ['Took a bus','Ate ice cream under a tree','Bought more vegetables','Called a friend'], correct: 2, explanation: '"We ate an ice cream under a big tree."' },
    ]
  },
  {
    id: 'r02', level: 'A1', title: 'My Bedroom',
    text: `My bedroom is small but cozy. There is a bed, a desk, and a bookshelf. I have a blue lamp on my desk. My favorite toy, a teddy bear, sits on my pillow every night. The walls are light yellow. I love my bedroom because it is quiet and warm.`,
    questions: [
      { question: 'What color is the lamp?', options: ['Red','Green','Blue','Yellow'], correct: 2, explanation: '"I have a blue lamp on my desk."' },
      { question: 'Where does the teddy bear sit?', options: ['On the desk','On the bookshelf','On the pillow','On the floor'], correct: 2, explanation: '"My favorite toy, a teddy bear, sits on my pillow every night."' },
      { question: 'Why does the speaker love the bedroom?', options: ['It is big and colorful','It is quiet and warm','It has a large window','It has many toys'], correct: 1, explanation: '"I love my bedroom because it is quiet and warm."' },
    ]
  },

  // ─── A2 ───────────────────────────────────────────────────────────────────
  {
    id: 'r03', level: 'A2', title: 'The Busy Train Station',
    text: `Yesterday the city train station was full of travelers. Loud announcements echoed through the halls, and people hurried to catch their trains. A young man helped an elderly woman with her heavy luggage. Suddenly the rain started, but everyone quickly rushed inside. A little girl lost her hat in the wind and began to cry, but a kind stranger found it and returned it to her.`,
    questions: [
      { question: 'What did the young man do?', options: ['He sang a song','He helped an elderly woman with her luggage','He bought a train ticket','He waited for a friend'], correct: 1, explanation: 'The young man helped an elderly woman with her heavy luggage.' },
      { question: 'What happened to the little girl?', options: ['She lost her ticket','She lost her hat','She missed her train','She dropped her bag'], correct: 1, explanation: '"A little girl lost her hat in the wind."' },
      { question: 'Who returned the hat?', options: ['The young man','The elderly woman','A kind stranger','The announcer'], correct: 2, explanation: '"A kind stranger found it and returned it to her."' },
    ]
  },
  {
    id: 'r04', level: 'A2', title: 'Learning to Cook',
    text: `Last Saturday I decided to cook dinner for my family. I chose a simple pasta recipe. First, I boiled water and added salt. Then I cooked the pasta for ten minutes. I made a tomato sauce with garlic and basil. My little brother helped me cut the vegetables. When we served the food, everyone said it was delicious. My mother was very proud of me.`,
    questions: [
      { question: 'What dish did the speaker cook?', options: ['Pizza','Pasta','Soup','Rice'], correct: 1, explanation: '"I chose a simple pasta recipe."' },
      { question: 'Who helped cut the vegetables?', options: ['The mother','The father','The little brother','A friend'], correct: 2, explanation: '"My little brother helped me cut the vegetables."' },
      { question: 'How did the family react to the food?', options: ['They said it was bad','They did not eat it','They said it was delicious','They ordered takeout instead'], correct: 2, explanation: '"Everyone said it was delicious."' },
    ]
  },

  // ─── B1 ───────────────────────────────────────────────────────────────────
  {
    id: 'r05', level: 'B1', title: 'The Benefits of Reading',
    text: `Reading is one of the most beneficial habits a person can develop. It not only expands your vocabulary but also improves your ability to concentrate and think critically. Studies have shown that people who read regularly tend to have better memory and lower levels of stress. Fiction allows readers to experience different perspectives and build empathy, while non-fiction provides factual knowledge and practical skills. Even reading for just 20 minutes a day can have a significant positive impact on the brain.`,
    questions: [
      { question: 'According to the passage, which of the following is NOT a benefit of reading?', options: ['Better memory','Improved concentration','Higher stress levels','Expanded vocabulary'], correct: 2, explanation: 'The passage says reading leads to "lower levels of stress," not higher.' },
      { question: 'What does reading fiction help readers develop?', options: ['Mathematical skills','Empathy and different perspectives','Speed reading techniques','Better handwriting'], correct: 1, explanation: '"Fiction allows readers to experience different perspectives and build empathy."' },
      { question: 'How long should a person read daily to see benefits?', options: ['At least one hour','At least 30 minutes','Just 20 minutes','5 minutes'], correct: 2, explanation: '"Reading for just 20 minutes a day can have a significant positive impact."' },
    ]
  },
  {
    id: 'r06', level: 'B1', title: 'A Summer Internship',
    text: `Last summer, Maria applied for an internship at a marketing company in the city. Although she was nervous at first, she quickly adapted to the fast-paced environment. Her main tasks included writing social media posts, analysing customer data, and attending weekly team meetings. By the end of the programme, Maria had gained valuable experience and made several professional contacts. She was even offered a part-time position, which she accepted immediately.`,
    questions: [
      { question: 'What type of company did Maria intern at?', options: ['A technology firm','A marketing company','A law firm','A publishing house'], correct: 1, explanation: '"She applied for an internship at a marketing company."' },
      { question: 'Which of the following was NOT one of Maria\'s tasks?', options: ['Writing social media posts','Analysing customer data','Designing product packaging','Attending team meetings'], correct: 2, explanation: 'The passage lists writing posts, analysing data, and attending meetings — not designing packaging.' },
      { question: 'What happened at the end of the internship?', options: ['She was dismissed','She quit the internship','She was offered a part-time position','She started her own company'], correct: 2, explanation: '"She was even offered a part-time position, which she accepted immediately."' },
    ]
  },

  // ─── B2 ───────────────────────────────────────────────────────────────────
  {
    id: 'r07', level: 'B2', title: 'The Digital Divide',
    text: `The digital divide refers to the gap between individuals who have access to modern information and communication technologies and those who do not. While urban populations in developed countries enjoy high-speed internet and the latest devices, millions of people in rural and less economically developed regions remain disconnected. This disparity not only limits educational and employment opportunities but also hampers participation in the digital economy. Governments and non-governmental organisations have launched various initiatives to bridge this gap, including subsidised internet programmes and community technology centres. However, infrastructure challenges and affordability issues continue to slow progress.`,
    questions: [
      { question: 'What is the "digital divide"?', options: ['The difference in internet speeds between countries','The gap between those with and without access to technology','A new type of computer software','A political debate about social media'], correct: 1, explanation: '"The digital divide refers to the gap between individuals who have access to modern technology and those who do not."' },
      { question: 'Which consequence of the digital divide is mentioned in the passage?', options: ['Environmental pollution','Limited educational and employment opportunities','Political instability','Increased crime rates'], correct: 1, explanation: '"This disparity not only limits educational and employment opportunities…"' },
      { question: 'What challenge continues to slow progress in bridging the divide?', options: ['Lack of political interest','Infrastructure and affordability issues','Language barriers','Overpopulation in cities'], correct: 2, explanation: '"Infrastructure challenges and affordability issues continue to slow progress."' },
    ]
  },
  {
    id: 'r08', level: 'B2', title: 'Artificial Intelligence in Healthcare',
    text: `Artificial intelligence is rapidly transforming the healthcare sector, offering unprecedented opportunities for improving patient outcomes. Machine learning algorithms can analyse vast quantities of medical data to detect diseases, such as cancer, at earlier stages than traditional methods. AI-powered diagnostic tools are also reducing the burden on overworked medical professionals by automating routine assessments. Nevertheless, ethical concerns remain regarding data privacy, algorithmic bias, and the potential erosion of the human element in patient care. Regulators are working to establish frameworks that balance innovation with patient safety.`,
    questions: [
      { question: 'What is one advantage of AI in healthcare mentioned in the passage?', options: ['Replacing all human doctors','Detecting diseases earlier than traditional methods','Eliminating the need for hospitals','Reducing the cost of medicines'], correct: 1, explanation: '"Machine learning algorithms can detect diseases at earlier stages than traditional methods."' },
      { question: 'What ethical concern is NOT mentioned in the passage?', options: ['Data privacy','Algorithmic bias','Erosion of the human element','Financial cost of AI systems'], correct: 3, explanation: 'The passage mentions privacy, bias, and the human element — but not the financial cost of AI.' },
      { question: 'What are regulators doing about AI in healthcare?', options: ['Banning its use entirely','Ignoring the issue','Establishing frameworks to balance innovation and safety','Handing control to private companies'], correct: 2, explanation: '"Regulators are working to establish frameworks that balance innovation with patient safety."' },
    ]
  },

  // ─── C1 ───────────────────────────────────────────────────────────────────
  {
    id: 'r09', level: 'C1', title: 'The Psychology of Procrastination',
    text: `Procrastination is often misconstrued as laziness, yet psychological research reveals a far more nuanced picture. At its core, procrastination is an emotional regulation problem: individuals delay tasks not because they lack the will to work, but because beginning a task triggers negative emotions — anxiety, self-doubt, boredom — which the brain instinctively seeks to escape by pursuing more immediately gratifying activities. Paradoxically, the relief gained from avoidance is short-lived, and the mounting guilt and anxiety of unfinished work ultimately amplify the very emotions one sought to escape. Cognitive behavioural strategies, such as breaking tasks into smaller components and practising self-compassion, have demonstrated efficacy in disrupting this cycle.`,
    questions: [
      { question: 'According to the passage, what is procrastination fundamentally rooted in?', options: ['Laziness and poor work ethic','Emotional regulation difficulties','A lack of intelligence','Poor time-management skills'], correct: 1, explanation: '"Procrastination is an emotional regulation problem." ' },
      { question: 'What irony does the author point out about avoidance behaviour?', options: ['It makes tasks easier to complete','The relief is temporary and amplifies negative emotions later','It always leads to better creative output','It is an effective long-term strategy'], correct: 1, explanation: '"The relief gained from avoidance is short-lived, and mounting guilt amplifies the very emotions one sought to escape."' },
      { question: 'Which strategy is cited as effective in addressing procrastination?', options: ['Strict deadlines imposed by others','Eliminating all leisure activities','Self-compassion and breaking tasks into smaller parts','Working longer hours'], correct: 2, explanation: '"Breaking tasks into smaller components and practising self-compassion have demonstrated efficacy."' },
    ]
  },

  // ─── C2 ───────────────────────────────────────────────────────────────────
  {
    id: 'r10', level: 'C2', title: 'The Paradox of Choice',
    text: `In contemporary consumer society, the proliferation of options is commonly assumed to be an unambiguous good — an emblem of freedom and self-determination. Yet psychologist Barry Schwartz, in his seminal work on the subject, argues compellingly that an excess of choice can paradoxically undermine both decision-making efficacy and subjective wellbeing. When confronted with an overwhelming array of alternatives, individuals frequently experience "choice overload," a cognitive state characterised by decision paralysis, diminished satisfaction with the chosen option, and heightened regret over unchosen alternatives. Schwartz distinguishes between "maximisers," who compulsively seek the optimal choice, and "satisficers," who settle for a sufficiently good option. The former group, he contends, consistently report lower levels of happiness, as the very act of maximising amplifies the psychological cost of every decision.`,
    questions: [
      { question: 'What does Barry Schwartz argue about an abundance of choices?', options: ['It always leads to better decisions','It paradoxically reduces wellbeing and decision quality','It is the foundation of a healthy democracy','It only affects people with low intelligence'], correct: 1, explanation: '"An excess of choice can paradoxically undermine both decision-making efficacy and subjective wellbeing."' },
      { question: 'What is "choice overload" characterised by?', options: ['Rapid and confident decision-making','Satisfaction with any option chosen','Decision paralysis and heightened regret','Indifference to available alternatives'], correct: 2, explanation: '"Choice overload" is characterised by "decision paralysis, diminished satisfaction, and heightened regret over unchosen alternatives."' },
      { question: 'According to Schwartz, which group reports lower happiness?', options: ['Satisficers, who accept good-enough options','Maximisers, who seek the optimal choice','People with fewer choices','People who avoid making choices'], correct: 1, explanation: '"The maximiser group consistently report lower levels of happiness, as maximising amplifies the psychological cost of every decision."' },
    ]
  },
];

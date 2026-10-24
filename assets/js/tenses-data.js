/**
 * DATABASE: 12 THÌ TIẾNG ANH TOÀN DIỆN (THE 12 ENGLISH TENSES COMPENDIUM)
 * Phân chia theo 3 trục thời gian (Hiện tại, Quá khứ, Tương lai) và 4 thể (Đơn, Tiếp diễn, Hoàn thành, Hoàn thành tiếp diễn).
 * Đầy đủ: Công thức (+ / - / ?), Dấu hiệu nhận biết, Cách dùng chuyên sâu, Lỗi bẫy đề thi & Trắc nghiệm củng cố.
 */

const ENGLISH_TENSES = [
  // ================= 1. HIỆN TẠI ĐƠN (PRESENT SIMPLE) =================
  {
    id: 'present-simple',
    time: 'present',
    nameEn: 'Present Simple Tense',
    nameVi: 'Thì Hiện Tại Đơn',
    tag: 'Cơ bản • Thói quen & Chân lý',
    color: '#3B82F6',
    formula: {
      positive: 'S + V(s/es) + O  (Đối với To Be: S + am/is/are + N/Adj)',
      negative: 'S + do/does + not + V-bare  (To Be: S + am/is/are + not)',
      question: 'Do/Does + S + V-bare?  (To Be: Am/Is/Are + S + N/Adj?)'
    },
    signals: ['always', 'usually', 'often', 'sometimes', 'rarely', 'never', 'every day/week/month', 'once a week', 'on Mondays'],
    usages: [
      { title: 'Chân lý, sự thật hiển nhiên', example: 'The Sun rises in the East and sets in the West.' },
      { title: 'Thói quen, hành động lặp đi lặp lại', example: 'I brush my teeth twice a day.' },
      { title: 'Lịch trình, thời khóa biểu cố định', example: 'The train departs at 7:30 PM tomorrow.' }
    ],
    mistakes: 'Lỗi chia nhầm thêm -s/es khi đã có trợ động từ "does" hoặc "doesn\'t" trong câu phủ định/nghi vấn.',
    quiz: [
      {
        q: 'Water ___ at 100 degrees Celsius under standard pressure.',
        options: ['boil', 'boils', 'is boiling', 'has boiled'],
        correct: 1,
        exp: 'Sự thật hiển nhiên, quy luật tự nhiên chia ở thì Hiện tại đơn, chủ ngữ "Water" không đếm được đi với "boils".'
      },
      {
        q: 'Which sentence is grammatically correct?',
        options: ['She doesn\'t likes spicy noodles.', 'She doesn\'t like spicy noodles.', 'She don\'t like spicy noodles.', 'She not like spicy noodles.'],
        correct: 1,
        exp: 'Khi đã có trợ động từ "doesn\'t", động từ chính phải ở dạng nguyên thể "like".'
      }
    ]
  },

  // ================= 2. HIỆN TẠI TIẾP DIỄN (PRESENT CONTINUOUS) =================
  {
    id: 'present-continuous',
    time: 'present',
    nameEn: 'Present Continuous Tense',
    nameVi: 'Thì Hiện Tại Tiếp Diễn',
    tag: 'Đang diễn ra • Kế hoạch tương lai gần',
    color: '#06B6D4',
    formula: {
      positive: 'S + am/is/are + V-ing + O',
      negative: 'S + am/is/are + not + V-ing + O',
      question: 'Am/Is/Are + S + V-ing + O?'
    },
    signals: ['now', 'right now', 'at the moment', 'at present', 'Look!', 'Listen!', 'Be quiet!', 'currently'],
    usages: [
      { title: 'Hành động đang diễn ra tại thời điểm nói', example: 'Please be quiet, the baby is sleeping.' },
      { title: 'Kế hoạch đã sắp xếp cố định trong tương lai gần', example: 'I am flying to Tokyo this Friday.' },
      { title: 'Phàn nàn về thói quen xấu (đi với always)', example: 'He is always losing his keys!' }
    ],
    mistakes: 'Dùng thì tiếp diễn với các động từ chỉ giác quan/trạng thái (Stative Verbs: know, understand, believe, love, hate, want, belong).',
    quiz: [
      {
        q: 'Listen! Someone ___ at the front entrance.',
        options: ['knocks', 'is knocking', 'knocked', 'has knocked'],
        correct: 1,
        exp: 'Có dấu hiệu "Listen!" thể hiện một hành động đang trực tiếp diễn ra ngay lúc nói -> "is knocking".'
      }
    ]
  },

  // ================= 3. HIỆN TẠI HOÀN THÀNH (PRESENT PERFECT) =================
  {
    id: 'present-perfect',
    time: 'present',
    nameEn: 'Present Perfect Tense',
    nameVi: 'Thì Hiện Tại Hoàn Thành',
    tag: 'Trải nghiệm • Kết quả ở hiện tại',
    color: '#10B981',
    formula: {
      positive: 'S + have/has + V3/V-ed + O',
      negative: 'S + have/has + not (haven\'t/hasn\'t) + V3/V-ed',
      question: 'Have/Has + S + V3/V-ed + O?'
    },
    signals: ['already', 'yet', 'just', 'ever', 'never', 'since + mốc thời gian', 'for + khoảng thời gian', 'so far', 'recently', 'up to now'],
    usages: [
      { title: 'Hành động bắt đầu trong quá khứ và còn tiếp diễn tới hiện tại', example: 'They have lived in Singapore for a decade.' },
      { title: 'Trải nghiệm, kinh nghiệm tính đến thời điểm hiện tại', example: 'I have visited the Louvre Museum twice.' },
      { title: 'Hành động vừa mới xảy ra để lại hệ quả rõ ở hiện tại', example: 'I have lost my wallet (so I have no money now).' }
    ],
    mistakes: 'Dùng thì Hiện tại hoàn thành với các mốc thời gian đã kết thúc dứt điểm như "yesterday, in 1999, 2 days ago" (phải dùng Quá khứ đơn).',
    quiz: [
      {
        q: 'I ___ this historical novel three times so far.',
        options: ['read', 'am reading', 'have read', 'had read'],
        correct: 2,
        exp: 'Dấu hiệu "three times so far" chỉ số lần trải nghiệm tính đến thời điểm hiện tại -> Hiện tại hoàn thành ("have read").'
      }
    ]
  },

  // ================= 4. HIỆN TẠI HOÀN THÀNH TIẾP DIỄN (PRESENT PERFECT CONTINUOUS) =================
  {
    id: 'present-perfect-continuous',
    time: 'present',
    nameEn: 'Present Perfect Continuous Tense',
    nameVi: 'Thì Hiện Tại Hoàn Thành Tiếp Diễn',
    tag: 'Nhấn mạnh tính liên tục kéo dài',
    color: '#14B8A6',
    formula: {
      positive: 'S + have/has + been + V-ing + O',
      negative: 'S + have/has + not + been + V-ing',
      question: 'Have/Has + S + been + V-ing?'
    },
    signals: ['all day/morning', 'for + duration (nhấn mạnh tính liên tục)', 'since', 'How long...?'],
    usages: [
      { title: 'Nhấn mạnh tính liên tục kéo dài không ngừng nghỉ', example: 'It has been raining relentlessly all morning.' },
      { title: 'Hành động vừa mới dừng nhưng để lại dấu vết thể chất', example: 'Her eyes are red because she has been crying.' }
    ],
    mistakes: 'Phân vân giữa Present Perfect (nhấn mạnh kết quả/số lượng) và Present Perfect Continuous (nhấn mạnh quá trình/thời lượng).',
    quiz: [
      {
        q: 'He is completely drenched because he ___ in the heavy downpour for an hour.',
        options: ['walked', 'is walking', 'has been walking', 'had walked'],
        correct: 2,
        exp: 'Nhấn mạnh hành động diễn ra liên tục trong 1 giờ và để lại kết quả trực quan ở hiện tại -> "has been walking".'
      }
    ]
  },

  // ================= 5. QUÁ KHỨ ĐƠN (PAST SIMPLE) =================
  {
    id: 'past-simple',
    time: 'past',
    nameEn: 'Past Simple Tense',
    nameVi: 'Thì Quá Khứ Đơn',
    tag: 'Đã hoàn tất dứt điểm trong quá khứ',
    color: '#F59E0B',
    formula: {
      positive: 'S + V2/V-ed + O  (To Be: S + was/were + N/Adj)',
      negative: 'S + did not (didn\'t) + V-bare  (To Be: was/were + not)',
      question: 'Did + S + V-bare?  (To Be: Was/Were + S + N/Adj?)'
    },
    signals: ['yesterday', 'last night/week/month/year', 'ago (2 days ago)', 'in 1990', 'when I was a child'],
    usages: [
      { title: 'Hành động đã xảy ra và chấm dứt dứt điểm tại một thời điểm xác định', example: 'We graduated from university in 2021.' },
      { title: 'Chuỗi các hành động liên tiếp xảy ra trong quá khứ', example: 'She entered the room, turned on the lamp, and sat down.' }
    ],
    mistakes: 'Vẫn chia V2 sau trợ động từ "did/didn\'t" (Ví dụ sai: "Did you went?" -> Đúng: "Did you go?").',
    quiz: [
      {
        q: 'Thomas Edison ___ the incandescent electric light bulb.',
        options: ['invent', 'invents', 'invented', 'has invented'],
        correct: 2,
        exp: 'Sự kiện lịch sử đã diễn ra và chấm dứt hoàn toàn trong quá khứ -> chia Quá khứ đơn ("invented").'
      }
    ]
  },

  // ================= 6. QUÁ KHỨ TIẾP DIỄN (PAST CONTINUOUS) =================
  {
    id: 'past-continuous',
    time: 'past',
    nameEn: 'Past Continuous Tense',
    nameVi: 'Thì Quá Khứ Tiếp Diễn',
    tag: 'Đang diễn ra tại một thời điểm quá khứ',
    color: '#D97706',
    formula: {
      positive: 'S + was/were + V-ing + O',
      negative: 'S + was/were + not + V-ing',
      question: 'Was/Were + S + V-ing?'
    },
    signals: ['at 8 PM yesterday', 'at this time last Sunday', 'while', 'when (hành động đang diễn ra thì hành động khác chen vào)'],
    usages: [
      { title: 'Đang diễn ra tại một thời điểm chính xác trong quá khứ', example: 'At 10 PM yesterday, I was studying for my finals.' },
      { title: 'Hành động đang diễn ra (Past Continuous) thì hành động khác xen vào (Past Simple)', example: 'While I was cooking dinner, the phone rang.' },
      { title: 'Hai hành động diễn ra song song cùng lúc trong quá khứ (dùng while)', example: 'While my brother was reading, I was playing guitar.' }
    ],
    mistakes: 'Nhầm lẫn ngôi số ít (I, he, she, it dùng was) và số nhiều (you, we, they dùng were).',
    quiz: [
      {
        q: 'When the lightning struck, we ___ across the suspension bridge.',
        options: ['drove', 'were driving', 'are driving', 'had driven'],
        correct: 1,
        exp: 'Hành động đang diễn ra trong quá khứ ("were driving") thì có hành động khác xen vào ngắn hơn ("struck").'
      }
    ]
  },

  // ================= 7. QUÁ KHỨ HOÀN THÀNH (PAST PERFECT) =================
  {
    id: 'past-perfect',
    time: 'past',
    nameEn: 'Past Perfect Tense',
    nameVi: 'Thì Quá Khứ Hoàn Thành',
    tag: 'Xảy ra trước một mốc quá khứ khác',
    color: '#8B5CF6',
    formula: {
      positive: 'S + had + V3/V-ed + O',
      negative: 'S + had not (hadn\'t) + V3/V-ed',
      question: 'Had + S + V3/V-ed?'
    },
    signals: ['by the time', 'before', 'after', 'prior to', 'as soon as', 'until that day'],
    usages: [
      { title: 'Hành động xảy ra và kết thúc TRƯỚC một hành động khác trong quá khứ', example: 'When we reached the terminal, the flight had already departed.' },
      { title: 'Điều kiện loại 3 (giả định trái ngược quá khứ)', example: 'If I had known the truth, I would have intervened.' }
    ],
    mistakes: 'Dùng quá khứ hoàn thành khi hai hành động diễn ra cùng lúc hoặc khi không có hành động đối chiếu nào trong quá khứ.',
    quiz: [
      {
        q: 'By the time the ambulance arrived, the paramedics ___ first aid.',
        options: ['provided', 'had already provided', 'have provided', 'were providing'],
        correct: 1,
        exp: 'Cấu trúc "By the time + Past Simple, S + Past Perfect" (xảy ra trước thời điểm xe cứu thương tới) -> "had already provided".'
      }
    ]
  },

  // ================= 8. QUÁ KHỨ HOÀN THÀNH TIẾP DIỄN (PAST PERFECT CONTINUOUS) =================
  {
    id: 'past-perfect-continuous',
    time: 'past',
    nameEn: 'Past Perfect Continuous Tense',
    nameVi: 'Thì Quá Khứ Hoàn Thành Tiếp Diễn',
    tag: 'Kéo dài liên tục trước một sự kiện quá khứ',
    color: '#7C3AED',
    formula: {
      positive: 'S + had + been + V-ing + O',
      negative: 'S + had + not + been + V-ing',
      question: 'Had + S + been + V-ing?'
    },
    signals: ['until then', 'by the time', 'for + duration + before + past event'],
    usages: [
      { title: 'Nhấn mạnh quá trình kéo dài liên tục trước một sự kiện quá khứ khác', example: 'She had been researching for five years before she published her treatise.' }
    ],
    mistakes: 'Dùng nhầm thể bị động hoặc chia động từ trạng thái (stative verbs) ở dạng tiếp diễn.',
    quiz: [
      {
        q: 'The players were exhausted because they ___ in scorching heat for hours.',
        options: ['had been practicing', 'have practiced', 'were practicing', 'practiced'],
        correct: 0,
        exp: 'Giải thích nguyên nhân của tình trạng kiệt sức trong quá khứ ("were exhausted") bởi một hành động kéo dài liên tục trước đó -> "had been practicing".'
      }
    ]
  },

  // ================= 9. TƯƠNG LAI ĐƠN (FUTURE SIMPLE) =================
  {
    id: 'future-simple',
    time: 'future',
    nameEn: 'Future Simple Tense',
    nameVi: 'Thì Tương Lai Đơn',
    tag: 'Quyết định tức thời • Lời hứa & Dự đoán',
    color: '#EC4899',
    formula: {
      positive: 'S + will + V-bare + O',
      negative: 'S + will not (won\'t) + V-bare',
      question: 'Will + S + V-bare?'
    },
    signals: ['tomorrow', 'next week/month/year', 'in 2 days', 'in the future', 'I think / I hope / I believe', 'probably'],
    usages: [
      { title: 'Quyết định đưa ra ngay tại thời điểm nói', example: 'Hold on, I will grab an umbrella for you.' },
      { title: 'Lời hứa, lời đe dọa, lời đề nghị', example: 'I will never reveal your confidential data.' },
      { title: 'Dự đoán không có bằng chứng chắc chắn', example: 'I think artificial intelligence will transform healthcare.' }
    ],
    mistakes: 'Dùng "will" cho những kế hoạch đã có lịch trình hoặc vé đặt trước (phải dùng Be going to hoặc Present Continuous).',
    quiz: [
      {
        q: 'Don\'t worry about the heavy parcel. I ___ carry it upstairs for you.',
        options: ['will', 'am going to', 'am carrying', 'carried'],
        correct: 0,
        exp: 'Lời đề nghị giúp đỡ tức thì ngay tại thời điểm nói -> dùng "will".'
      }
    ]
  },

  // ================= 10. TƯƠNG LAI TIẾP DIỄN (FUTURE CONTINUOUS) =================
  {
    id: 'future-continuous',
    time: 'future',
    nameEn: 'Future Continuous Tense',
    nameVi: 'Thì Tương Lai Tiếp Diễn',
    tag: 'Đang diễn ra tại một thời điểm tương lai',
    color: '#DB2777',
    formula: {
      positive: 'S + will be + V-ing + O',
      negative: 'S + will not (won\'t) be + V-ing',
      question: 'Will + S + be + V-ing?'
    },
    signals: ['at this time tomorrow', 'at 9 AM next Monday', 'this time next year'],
    usages: [
      { title: 'Hành động sẽ đang diễn ra tại một thời điểm chính xác trong tương lai', example: 'This time next week, I will be relaxing on a tropical beach.' }
    ],
    mistakes: 'Bỏ quên từ "be" sau "will" (viết nhầm thành "will V-ing").',
    quiz: [
      {
        q: 'At 8 PM tomorrow, the delegates ___ the bilateral banquet.',
        options: ['will attend', 'will be attending', 'are attending', 'have attended'],
        correct: 1,
        exp: 'Có mốc thời gian cụ thể trong tương lai ("At 8 PM tomorrow") -> Tương lai tiếp diễn "will be attending".'
      }
    ]
  },

  // ================= 11. TƯƠNG LAI HOÀN THÀNH (FUTURE PERFECT) =================
  {
    id: 'future-perfect',
    time: 'future',
    nameEn: 'Future Perfect Tense',
    nameVi: 'Thì Tương Lai Hoàn Thành',
    tag: 'Hoàn thành trước một mốc tương lai',
    color: '#EF4444',
    formula: {
      positive: 'S + will have + V3/V-ed + O',
      negative: 'S + will not (won\'t) have + V3/V-ed',
      question: 'Will + S + have + V3/V-ed?'
    },
    signals: ['by the end of this month', 'by next year', 'by the time + S + V(hiện tại đơn)', 'before 2030'],
    usages: [
      { title: 'Hành động sẽ được hoàn tất TRƯỚC một thời điểm hoặc một hành động khác trong tương lai', example: 'By the end of this year, we will have completed the skyscraper.' }
    ],
    mistakes: 'Sau "by the time" trong ngữ cảnh tương lai, mệnh đề chỉ thời gian phải chia Hiện tại đơn, không được dùng will.',
    quiz: [
      {
        q: 'By next December, the architectural team ___ the construction blueprints.',
        options: ['will finalize', 'will have finalized', 'has finalized', 'is finalizing'],
        correct: 1,
        exp: 'Dấu hiệu "By next December" chỉ mốc thời hạn mà trước đó hành động sẽ hoàn tất -> Tương lai hoàn thành "will have finalized".'
      }
    ]
  },

  // ================= 12. TƯƠNG LAI HOÀN THÀNH TIẾP DIỄN (FUTURE PERFECT CONTINUOUS) =================
  {
    id: 'future-perfect-continuous',
    time: 'future',
    nameEn: 'Future Perfect Continuous Tense',
    nameVi: 'Thì Tương Lai Hoàn Thành Tiếp Diễn',
    tag: 'Nhấn mạnh thời lượng tính tới tương lai',
    color: '#DC2626',
    formula: {
      positive: 'S + will have been + V-ing + O',
      negative: 'S + will not have been + V-ing',
      question: 'Will + S + have been + V-ing?'
    },
    signals: ['by next month, for 10 years', 'by the time... for...'],
    usages: [
      { title: 'Nhấn mạnh khoảng thời gian kéo dài của một hành động tính tới một mốc cụ thể trong tương lai', example: 'By next month, she will have been teaching at this academy for twenty years.' }
    ],
    mistakes: 'Ít dùng trong văn nói thông thường, chủ yếu xuất hiện trong văn phong học thuật, IELTS và các kỳ thi chuẩn hóa.',
    quiz: [
      {
        q: 'By midnight, the scientists ___ non-stop for twenty-four hours.',
        options: ['will have been working', 'will work', 'are working', 'have been working'],
        correct: 0,
        exp: 'Nhấn mạnh thời lượng liên tục ("for twenty-four hours") tính đến một mốc tương lai ("By midnight") -> "will have been working".'
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.ENGLISH_TENSES = ENGLISH_TENSES;
}

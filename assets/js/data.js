/**
 * DATA REPOSITORY: KHUNG CHƯƠNG TRÌNH TIẾNG ANH CHUẨN KHUNG CHÂU ÂU (CEFR)
 * Mở rộng toàn diện các cấp độ từ A1 đến C2 với:
 * - Lý thuyết ngữ pháp chuyên sâu, bảng công thức, mẹo nhớ & cảnh báo lỗi sai
 * - Vốn từ vựng kèm phát âm IPA, nghĩa tiếng Việt, câu ví dụ thực tế
 * - Bài tập trắc nghiệm giải thích cặn kẽ từng phương án
 * - Bài tập nghe & điền từ (Dictation / Listening Fill-in)
 */

const CEFR_LEVELS = {
  A1: {
    id: 'A1',
    name: 'A1 - Beginner (Căn bản cho người mới bắt đầu)',
    shortName: 'A1 Beginner',
    target: 'Dành cho người mất gốc hoặc bắt đầu từ con số 0',
    color: '#3B82F6',
    badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    canDo: 'Hiểu và sử dụng các biểu đạt quen thuộc hàng ngày, chào hỏi, giới thiệu bản thân và người khác, hỏi đáp thông tin cá nhân đơn giản.',
    totalLessons: 12,
    vocabCount: 500
  },
  A2: {
    id: 'A2',
    name: 'A2 - Elementary (Sơ cấp giao tiếp)',
    shortName: 'A2 Elementary',
    target: 'Giao tiếp tình huống hàng ngày, mua sắm, chỉ đường, mô tả môi trường sống',
    color: '#10B981',
    badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300',
    canDo: 'Hiểu các câu và cấu trúc thông dụng về gia đình, mua sắm, địa lý địa phương; giao tiếp trong các công việc đơn giản và thường nhật.',
    totalLessons: 12,
    vocabCount: 1000
  },
  B1: {
    id: 'B1',
    name: 'B1 - Intermediate (Trung cấp độc lập)',
    shortName: 'B1 Intermediate',
    target: 'Tự tin du lịch, làm việc môi trường cơ bản, diễn đạt cảm xúc, kế hoạch',
    color: '#F59E0B',
    badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
    canDo: 'Hiểu các ý chính của ngôn ngữ chuẩn về các chủ đề quen thuộc; xử lý hầu hết các tình huống khi đi du lịch; viết văn bản đơn giản có liên kết.',
    totalLessons: 12,
    vocabCount: 2000
  },
  B2: {
    id: 'B2',
    name: 'B2 - Upper-Intermediate (Trung cấp nâng cao)',
    shortName: 'B2 Upper-Int',
    target: 'Giao tiếp trôi chảy với người bản xứ, học thuật, tranh luận và viết luận',
    color: '#8B5CF6',
    badgeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
    canDo: 'Hiểu ý chính của các văn bản phức tạp cả về chủ đề cụ thể và trừu tượng; giao tiếp lưu loát và tự nhiên không gây áp lực cho người bản xứ.',
    totalLessons: 10,
    vocabCount: 4000
  },
  C1: {
    id: 'C1',
    name: 'C1 - Advanced (Cao cấp chuyên sâu)',
    shortName: 'C1 Advanced',
    target: 'Sử dụng linh hoạt cho mục đích học thuật, nghề nghiệp cao cấp, phản xạ tự nhiên',
    color: '#EC4899',
    badgeClass: 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300',
    canDo: 'Hiểu nhiều loại văn bản dài và đòi hỏi tư duy sâu; diễn đạt trôi chảy tức thì; sử dụng ngôn ngữ linh hoạt cho các mục đích xã hội, học thuật và chuyên môn.',
    totalLessons: 8,
    vocabCount: 8000
  },
  C2: {
    id: 'C2',
    name: 'C2 - Mastery (Thành thạo như người bản xứ)',
    shortName: 'C2 Mastery',
    target: 'Hiểu và làm chủ mọi sắc thái ngôn ngữ, đọc hiểu tài liệu chuyên sâu, văn học',
    color: '#EF4444',
    badgeClass: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    canDo: 'Hiểu hầu như mọi thứ nghe hoặc đọc một cách dễ dàng; tóm tắt thông tin từ các nguồn nói và viết khác nhau; diễn đạt tự phát rất lưu loát và chính xác.',
    totalLessons: 6,
    vocabCount: 15000
  }
};

const LESSONS_DATA = [
  // =========================================================================
  // CẤP ĐỘ A1: BREAKTHROUGH (CĂN BẢN CHO NGƯỜI MẤT GỐC)
  // =========================================================================
  {
    id: 'a1-1',
    level: 'A1',
    title: 'Unit 1: Chào hỏi, Giới thiệu & Động từ "To Be"',
    description: 'Học cách chào hỏi thông dụng, giới thiệu tên tuổi, quốc tịch và cấu trúc thì hiện tại của động từ "to be".',
    duration: '25 phút',
    xp: 50,
    theory: `
      <h3>1. Động từ "To Be" ở hiện tại đơn (am / is / are)</h3>
      <p>Động từ <strong>to be</strong> có nghĩa là <em>thì, là, ở</em>. Dùng để giới thiệu danh tính, nghề nghiệp, trạng thái hoặc tính chất của chủ ngữ.</p>
      <div class="table-container">
        <table>
          <thead>
            <tr><th>Chủ ngữ</th><th>Dạng khẳng định</th><th>Dạng phủ định</th><th>Ví dụ</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>I</strong></td><td>am ('m)</td><td>am not</td><td>I am a student. (Tôi là sinh viên.)</td></tr>
            <tr><td><strong>He / She / It</strong></td><td>is ('s)</td><td>is not (isn't)</td><td>She is very kind. (Cô ấy rất tốt bụng.)</td></tr>
            <tr><td><strong>You / We / They</strong></td><td>are ('re)</td><td>are not (aren't)</td><td>They are friendly. (Họ rất thân thiện.)</td></tr>
          </tbody>
        </table>
      </div>
      
      <div class="theory-callout-tip">
        💡 <strong>Mẹo nhớ nhanh:</strong> Hãy nhớ quy tắc số ít đi với <strong>is</strong>, số nhiều đi với <strong>are</strong>, riêng chủ ngữ <strong>I</strong> luôn đi với <strong>am</strong>.
      </div>

      <h3>2. Các cách chào hỏi thông dụng</h3>
      <ul>
        <li><strong>Trang trọng (Formal):</strong> Good morning (chào buổi sáng), Good afternoon (chào buổi chiều), Good evening (chào buổi tối).</li>
        <li><strong>Thân mật (Informal):</strong> Hello, Hi, Hey, How are you doing?</li>
        <li><strong>Hỏi thăm sức khỏe:</strong> "How are you?" - Trả lời: "I am fine, thank you. And you?" hoặc "I'm doing well!"</li>
      </ul>

      <div class="theory-callout-warning">
        ⚠️ <strong>Lỗi hay gặp:</strong> Tuyệt đối không dùng "Good night" để chào khi gặp nhau. "Good night" chỉ dùng để <em>chúc ngủ ngon</em> hoặc <em>chào tạm biệt vào ban đêm</em> trước khi về.
      </div>
    `,
    vocabulary: [
      { word: 'Hello', ipa: '/həˈləʊ/', meaning: 'Xin chào', example: 'Hello, my name is Alex.', category: 'Greetings' },
      { word: 'Student', ipa: '/ˈstjuːdnt/', meaning: 'Học sinh, sinh viên', example: 'I am a university student.', category: 'Occupations' },
      { word: 'Country', ipa: '/ˈkʌntri/', meaning: 'Đất nước, quốc gia', example: 'Vietnam is a beautiful country.', category: 'Geography' },
      { word: 'Friend', ipa: '/frend/', meaning: 'Người bạn', example: 'She is my best friend.', category: 'People' },
      { word: 'Welcome', ipa: '/ˈwelkəm/', meaning: 'Chào mừng', example: 'Welcome to our English class!', category: 'Greetings' },
      { word: 'Teacher', ipa: '/ˈtiːtʃər/', meaning: 'Giáo viên', example: 'Mr. David is an English teacher.', category: 'Occupations' }
    ],
    quiz: [
      {
            "question": "Chọn từ thích hợp điền vào chỗ trống: \"She ___ a doctor at the central hospital.\"",
            "options": [
                  "am",
                  "is",
                  "are",
                  "be"
            ],
            "correct": 1,
            "explanation": "Chủ ngữ ngôi thứ ba số ít \"She\" luôn đi kèm với động từ to be \"is\"."
      },
      {
            "question": "Cách chào trang trọng vào buổi sáng trước 12h trưa là gì?",
            "options": [
                  "Good night",
                  "Good morning",
                  "Good afternoon",
                  "Good bye"
            ],
            "correct": 1,
            "explanation": "\"Good morning\" dùng để chào buổi sáng từ khi thức dậy tới 12 giờ trưa."
      },
      {
            "question": "Chọn câu viết đúng ngữ pháp tiếng Anh:",
            "options": [
                  "They is friendly students.",
                  "They am friendly students.",
                  "They are friendly students.",
                  "They be friendly students."
            ],
            "correct": 2,
            "explanation": "Chủ ngữ ngôi thứ 3 số nhiều \"They\" luôn đi với động từ to be \"are\"."
      },
      {
            "question": "Dạng phủ định của câu: \"I am tired\" là gì?",
            "options": [
                  "I am not tired.",
                  "I not am tired.",
                  "I don't tired.",
                  "I isn't tired."
            ],
            "correct": 0,
            "explanation": "Phủ định của động từ To Be ở hiện tại thêm \"not\" ngay sau to be: \"I am not tired\"."
      },
      {
            "question": "Chọn câu hỏi đúng khi muốn hỏi thăm sức khỏe một người bạn mới gặp:",
            "options": [
                  "What are you do?",
                  "How are you?",
                  "Where is you?",
                  "Who are you do?"
            ],
            "correct": 1,
            "explanation": "\"How are you?\" là câu hỏi tiêu chuẩn, lịch sự dùng để hỏi thăm sức khỏe và tình hình hiện tại."
      }
],
    listeningPractices: [
      {
            "audioText": "Hello, my name is Alex and I am a university student.",
            "sentenceWithBlank": "Hello, my name is Alex and I am a university ______.",
            "missingWord": "student",
            "hint": "Từ chỉ sinh viên, học sinh (bắt đầu bằng S)"
      },
      {
            "audioText": "Vietnam is a beautiful and friendly country.",
            "sentenceWithBlank": "Vietnam is a beautiful and friendly ______.",
            "missingWord": "country",
            "hint": "Đất nước, quốc gia (bắt đầu bằng C)"
      },
      {
            "audioText": "Welcome to our English learning class today.",
            "sentenceWithBlank": "______ to our English learning class today.",
            "missingWord": "Welcome",
            "hint": "Lời chào mừng nồng nhiệt (bắt đầu bằng W)"
      },
      {
            "audioText": "Mr. David is an experienced English teacher.",
            "sentenceWithBlank": "Mr. David is an experienced English ______.",
            "missingWord": "teacher",
            "hint": "Người thầy giáo (bắt đầu bằng T)"
      },
      {
            "audioText": "She is my closest childhood friend in town.",
            "sentenceWithBlank": "She is my closest childhood ______ in town.",
            "missingWord": "friend",
            "hint": "Người bạn thân thiết (bắt đầu bằng F)"
      }
]
  },
  {
    id: 'a1-2',
    level: 'A1',
    title: 'Unit 2: Thì Hiện Tại Đơn (Present Simple) & Hoạt động thường nhật',
    description: 'Nắm vững quy tắc chia động từ thường ở hiện tại đơn và diễn tả thói quen hàng ngày.',
    duration: '30 phút',
    xp: 50,
    theory: `
      <h3>1. Công thức Thì Hiện Tại Đơn (Present Simple)</h3>
      <p>Dùng để diễn tả một sự thật hiển nhiên, một chân lý khoa học, hoặc một thói quen, lịch trình lặp đi lặp lại.</p>
      <ul>
        <li><strong>Khẳng định (+):</strong> S + V(s/es) + O. <em>(Ví dụ: He plays soccer every Sunday.)</em></li>
        <li><strong>Phủ định (-):</strong> S + do/does + not + V(nguyên mẫu). <em>(Ví dụ: She does not eat spicy food.)</em></li>
        <li><strong>Nghi vấn (?):</strong> Do/Does + S + V(nguyên mẫu)? <em>(Ví dụ: Do you study English every day?)</em></li>
      </ul>

      <h3>2. Quy tắc thêm -s / -es sau động từ</h3>
      <div class="table-container">
        <table>
          <thead>
            <tr><th>Quy tắc</th><th>Động từ gốc</th><th>Dạng chia với He/She/It</th></tr>
          </thead>
          <tbody>
            <tr><td>Tận cùng là <strong>-o, -s, -ch, -x, -sh, -z</strong></td><td>go, watch, wash</td><td>goes, watches, washes</td></tr>
            <tr><td>Tận cùng là phụ âm + <strong>-y</strong></td><td>study, fly</td><td>studies, flies (đổi -y thành -ies)</td></tr>
            <tr><td>Các trường hợp thông thường khác</td><td>read, play, drink</td><td>reads, plays, drinks</td></tr>
          </tbody>
        </table>
      </div>

      <div class="theory-callout-warning">
        ⚠️ <strong>Lỗi kinh điển:</strong> Khi đã có trợ động từ <em>does</em> hoặc <em>doesn't</em> trong câu, động từ chính phía sau <strong>bắt buộc phải về dạng nguyên mẫu</strong>, không được thêm -s/-es.
      </div>
    `,
    vocabulary: [
      { word: 'Breakfast', ipa: '/ˈbrekfəst/', meaning: 'Bữa ăn sáng', example: 'I always have breakfast at 7 AM.', category: 'Daily Routine' },
      { word: 'Usually', ipa: '/ˈjuːʒuəli/', meaning: 'Thường xuyên', example: 'He usually walks to work.', category: 'Adverbs' },
      { word: 'Wake up', ipa: '/weɪk ʌp/', meaning: 'Thức dậy', example: 'What time do you wake up in the morning?', category: 'Daily Routine' },
      { word: 'Exercise', ipa: '/ˈeksəsaɪz/', meaning: 'Tập thể dục', example: 'Daily exercise keeps you healthy.', category: 'Health' },
      { word: 'Coffee', ipa: '/ˈkɒfi/', meaning: 'Cà phê', example: 'Do you drink coffee without sugar?', category: 'Food & Drinks' },
      { word: 'Always', ipa: '/ˈɔːlweɪz/', meaning: 'Luôn luôn (100%)', example: 'She always arrives on time.', category: 'Adverbs' }
    ],
    quiz: [
      {
            "question": "Chọn động từ đúng: \"My brother ___ to school by bus every day.\"",
            "options": [
                  "go",
                  "goes",
                  "going",
                  "is go"
            ],
            "correct": 1,
            "explanation": "Chủ ngữ \"My brother\" là ngôi thứ 3 số ít, động từ \"go\" tận cùng là \"-o\" nên thêm -es thành \"goes\"."
      },
      {
            "question": "Dạng phủ định chính xác của câu: \"Peter likes spicy food\" là gì?",
            "options": [
                  "Peter don't like spicy food.",
                  "Peter doesn't likes spicy food.",
                  "Peter doesn't like spicy food.",
                  "Peter not like spicy food."
            ],
            "correct": 2,
            "explanation": "Chủ ngữ Peter số ít mượn trợ động từ \"doesn't\", động từ like trở về nguyên mẫu \"like\"."
      },
      {
            "question": "Chọn câu hỏi đúng theo ngữ pháp:",
            "options": [
                  "Does you play tennis?",
                  "Do you play tennis?",
                  "Do you plays tennis?",
                  "Are you play tennis?"
            ],
            "correct": 1,
            "explanation": "Chủ ngữ \"you\" mượn trợ động từ \"Do\" và động từ nguyên mẫu \"play\"."
      },
      {
            "question": "Vị trí của trạng từ tần suất (always, usually, often) trong câu hiện tại đơn:",
            "options": [
                  "Đứng trước động từ thường, đứng sau To Be",
                  "Đứng sau động từ thường, đứng trước To Be",
                  "Luôn đứng ở cuối câu",
                  "Luôn đứng ở đầu câu"
            ],
            "correct": 0,
            "explanation": "Trạng từ chỉ tần suất đứng trước động từ thường (I usually walk) và đứng sau To Be (He is always on time)."
      },
      {
            "question": "Chọn động từ chia đúng cho chủ ngữ \"She\" với từ \"study\":",
            "options": [
                  "studys",
                  "studies",
                  "studying",
                  "is study"
            ],
            "correct": 1,
            "explanation": "Động từ tận cùng là phụ âm + \"y\" (study) khi chia với ngôi thứ 3 số ít đổi \"y\" thành \"ies\" -> \"studies\"."
      }
],
    listeningPractices: [
      {
            "audioText": "He usually drinks coffee in the morning.",
            "sentenceWithBlank": "He usually drinks ______ in the morning.",
            "missingWord": "coffee",
            "hint": "Thức uống thơm vào buổi sáng (bắt đầu bằng C)"
      },
      {
            "audioText": "I always have a healthy breakfast at seven.",
            "sentenceWithBlank": "I always have a healthy ______ at seven.",
            "missingWord": "breakfast",
            "hint": "Bữa ăn sáng (bắt đầu bằng B)"
      },
      {
            "audioText": "Daily physical exercise keeps your body healthy.",
            "sentenceWithBlank": "Daily physical ______ keeps your body healthy.",
            "missingWord": "exercise",
            "hint": "Luyện tập thể dục thể thao (bắt đầu bằng E)"
      },
      {
            "audioText": "What time do you usually wake up every morning?",
            "sentenceWithBlank": "What time do you usually ______ up every morning?",
            "missingWord": "wake",
            "hint": "Tỉnh giấc, thức dậy (bắt đầu bằng W)"
      },
      {
            "audioText": "She always arrives on time for work.",
            "sentenceWithBlank": "She ______ arrives on time for work.",
            "missingWord": "always",
            "hint": "Luôn luôn, 100% thời gian (bắt đầu bằng A)"
      }
]
  },
  {
    id: 'a1-3',
    level: 'A1',
    title: 'Unit 3: Danh Từ Số Ít, Số Nhiều & Mạo Từ (A, An, The, Some, Any)',
    description: 'Phân biệt danh từ đếm được, không đếm được và cách dùng mạo từ chuẩn xác.',
    duration: '25 phút',
    xp: 50,
    theory: `
      <h3>1. Mạo từ Không xác định: A / An</h3>
      <ul>
        <li><strong>A:</strong> Đứng trước danh từ số ít đếm được bắt đầu bằng một <em>phụ âm</em> (A cat, A book, A university).</li>
        <li><strong>An:</strong> Đứng trước danh từ số ít đếm được bắt đầu bằng một <em>nguyên âm</em> (u, e, o, a, i) phát âm: <em>An apple, An orange, An umbrella, An hour (h câm)</em>.</li>
      </ul>

      <h3>2. Mạo từ Xác định: The</h3>
      <p>Dùng cho cả danh từ số ít và số nhiều khi người nghe và người nói đều biết rõ đối tượng đang được nhắc đến, hoặc vật là độc nhất vô nhị (The Sun, The Moon, The Earth).</p>

      <h3>3. Cách dùng Some & Any</h3>
      <ul>
        <li><strong>Some:</strong> Dùng trong câu <em>khẳng định</em> hoặc lời mời/yêu cầu lịch sự (<em>I have some apples; Would you like some water?</em>).</li>
        <li><strong>Any:</strong> Dùng trong câu <em>phủ định</em> hoặc câu <em>nghi vấn</em> (<em>I don't have any money; Do you have any questions?</em>).</li>
      </ul>
    `,
    vocabulary: [
      { word: 'Apple', ipa: '/ˈæpl/', meaning: 'Quả táo', example: 'I eat an apple every day.', category: 'Food' },
      { word: 'Water', ipa: '/ˈwɔːtər/', meaning: 'Nước (danh từ không đếm được)', example: 'Please drink more water.', category: 'Drinks' },
      { word: 'Book', ipa: '/bʊk/', meaning: 'Quyển sách', example: 'This is an interesting book.', category: 'Study' },
      { word: 'Question', ipa: '/ˈkwestʃən/', meaning: 'Câu hỏi', example: 'Do you have any questions?', category: 'Communication' }
    ],
    quiz: [
      {
            "question": "Chọn mạo từ đúng: \"I will meet you in ___ hour.\"",
            "options": [
                  "a",
                  "an",
                  "the",
                  "some"
            ],
            "correct": 1,
            "explanation": "Từ \"hour\" có chữ \"h\" câm, phát âm bắt đầu bằng nguyên âm /aʊər/ nên phải dùng \"an hour\"."
      },
      {
            "question": "Điền vào chỗ trống: \"There isn't ___ milk left in the fridge.\"",
            "options": [
                  "some",
                  "any",
                  "a",
                  "many"
            ],
            "correct": 1,
            "explanation": "Trong câu phủ định (isn't) với danh từ không đếm được (milk), ta dùng \"any\"."
      },
      {
            "question": "Mạo từ \"A\" được dùng trong trường hợp nào sau đây?",
            "options": [
                  "Trước danh từ số ít đếm được bắt đầu bằng một phụ âm",
                  "Trước danh từ số nhiều đếm được",
                  "Trước danh từ không đếm được",
                  "Trước mọi danh từ"
            ],
            "correct": 0,
            "explanation": "Mạo từ \"A\" chỉ dùng cho danh từ số ít đếm được bắt đầu bằng một phụ âm phát âm (ví dụ: a cat, a book)."
      },
      {
            "question": "Chọn câu dùng \"some\" chính xác trong lời mời lịch sự:",
            "options": [
                  "Would you like some coffee?",
                  "Would you like any coffee?",
                  "Do you want an coffee?",
                  "Are you drinking some coffee?"
            ],
            "correct": 0,
            "explanation": "Trong lời mời hoặc đề nghị lịch sự (Would you like...?), theo quy ước tiếng Anh ta dùng \"some\" chứ không dùng \"any\"."
      },
      {
            "question": "Từ nào sau đây là danh từ KHÔNG đếm được (uncountable noun)?",
            "options": [
                  "Apple",
                  "Book",
                  "Water",
                  "Car"
            ],
            "correct": 2,
            "explanation": "\"Water\" (nước) là chất lỏng, danh từ không đếm được, không đi trực tiếp với số đếm hoặc mạo từ a/an."
      }
],
    listeningPractices: [
      {
            "audioText": "Would you like some fresh water to drink?",
            "sentenceWithBlank": "Would you like some fresh ______ to drink?",
            "missingWord": "water",
            "hint": "Nước uống tinh khiết (bắt đầu bằng W)"
      },
      {
            "audioText": "I eat a crisp red apple every single day.",
            "sentenceWithBlank": "I eat a crisp red ______ every single day.",
            "missingWord": "apple",
            "hint": "Quả táo đỏ (bắt đầu bằng A)"
      },
      {
            "audioText": "Do you have any difficult question for me?",
            "sentenceWithBlank": "Do you have any difficult ______ for me?",
            "missingWord": "question",
            "hint": "Câu hỏi, thắc mắc (bắt đầu bằng Q)"
      },
      {
            "audioText": "Reading books broadens your intellectual horizons.",
            "sentenceWithBlank": "Reading ______ broadens your intellectual horizons.",
            "missingWord": "books",
            "hint": "Những cuốn sách tri thức (danh từ số nhiều)"
      },
      {
            "audioText": "I need to buy an umbrella because it is raining.",
            "sentenceWithBlank": "I need to buy an ______ because it is raining.",
            "missingWord": "umbrella",
            "hint": "Cây dù che mưa (bắt đầu bằng U)"
      }
]
  },

  // =========================================================================
  // CẤP ĐỘ A2: ELEMENTARY (SƠ CẤP GIAO TIẾP THỰC TIỄN)
  // =========================================================================
  {
    id: 'a2-1',
    level: 'A2',
    title: 'Unit 1: Thì Quá Khứ Đơn (Past Simple) & Kể chuyện quá khứ',
    description: 'Học cách sử dụng thì quá khứ đơn với động từ có quy tắc (-ed) và bảng động từ bất quy tắc phổ biến.',
    duration: '35 phút',
    xp: 60,
    theory: `
      <h3>1. Cách dùng & Cấu trúc Thì Quá Khứ Đơn</h3>
      <p>Dùng để diễn tả một hành động đã xảy ra và kết thúc hoàn toàn trong quá khứ tại một thời điểm xác định (yesterday, last week, in 2020, 2 days ago).</p>
      <ul>
        <li><strong>Khẳng định (+):</strong> S + V2/V-ed + O. <em>(I visited my grandparents yesterday.)</em></li>
        <li><strong>Phủ định (-):</strong> S + did not (didn't) + V-bare. <em>(She didn't come to the meeting.)</em></li>
        <li><strong>Nghi vấn (?):</strong> Did + S + V-bare? <em>(Did you watch that movie last night?)</em></li>
      </ul>

      <h3>2. Bảng động từ bất quy tắc thiết yếu</h3>
      <div class="table-container">
        <table>
          <thead>
            <tr><th>Nguyên mẫu (V1)</th><th>Quá khứ (V2)</th><th>Ý nghĩa</th></tr>
          </thead>
          <tbody>
            <tr><td>buy</td><td>bought</td><td>mua</td></tr>
            <tr><td>see</td><td>saw</td><td>nhìn thấy</td></tr>
            <tr><td>go</td><td>went</td><td>đi</td></tr>
            <tr><td>have</td><td>had</td><td>có</td></tr>
            <tr><td>eat</td><td>ate</td><td>ăn</td></tr>
            <tr><td>take</td><td>took</td><td>cầm, lấy, đưa</td></tr>
          </tbody>
        </table>
      </div>
    `,
    vocabulary: [
      { word: 'Yesterday', ipa: '/ˈjestədeɪ/', meaning: 'Hôm qua', example: 'I bought this laptop yesterday.', category: 'Time' },
      { word: 'Vacation', ipa: '/veɪˈkeɪʃn/', meaning: 'Kỳ nghỉ', example: 'We went to Da Nang on vacation.', category: 'Travel' },
      { word: 'Delicious', ipa: '/dɪˈlɪʃəs/', meaning: 'Ngon miệng', example: 'The local seafood was delicious.', category: 'Food' },
      { word: 'Remember', ipa: '/rɪˈmembər/', meaning: 'Nhớ, ghi nhớ', example: 'Do you remember our first meeting?', category: 'Verbs' },
      { word: 'Travel', ipa: '/ˈtrævl/', meaning: 'Du lịch, đi lại', example: 'She traveled across Europe last summer.', category: 'Travel' }
    ],
    quiz: [
      {
            "question": "Dạng quá khứ (V2) của động từ \"buy\" là gì?",
            "options": [
                  "buyed",
                  "bought",
                  "buying",
                  "boughted"
            ],
            "correct": 1,
            "explanation": "\"buy\" là động từ bất quy tắc có dạng quá khứ V2 là \"bought\"."
      },
      {
            "question": "Chọn câu hỏi đúng ở quá khứ đơn:",
            "options": [
                  "Where did you went last night?",
                  "Where did you go last night?",
                  "Where do you went last night?",
                  "Where were you go last night?"
            ],
            "correct": 1,
            "explanation": "Khi đã có trợ động từ \"did\", động từ chính phải về nguyên mẫu: \"Where did you go...\"."
      },
      {
            "question": "Chọn dạng phủ định đúng của câu: \"She watched TV yesterday.\"",
            "options": [
                  "She didn't watched TV yesterday.",
                  "She didn't watch TV yesterday.",
                  "She not watched TV yesterday.",
                  "She wasn't watch TV yesterday."
            ],
            "correct": 1,
            "explanation": "Cấu trúc phủ định thì quá khứ đơn: S + didn't + V nguyên mẫu (\"watch\")."
      },
      {
            "question": "Quá khứ của động từ \"see\" là gì?",
            "options": [
                  "seed",
                  "saw",
                  "seen",
                  "sawed"
            ],
            "correct": 1,
            "explanation": "Động từ \"see\" có dạng quá khứ V2 là \"saw\", quá khứ phân từ V3 là \"seen\"."
      },
      {
            "question": "Dấu hiệu nhận biết nào sau đây KHÔNG thuộc thì quá khứ đơn?",
            "options": [
                  "yesterday",
                  "two days ago",
                  "last weekend",
                  "at the moment"
            ],
            "correct": 3,
            "explanation": "\"at the moment\" (ngay lúc này) là dấu hiệu của thì Hiện tại tiếp diễn, không phải Quá khứ đơn."
      }
],
    listeningPractices: [
      {
            "audioText": "We went to the beach on our summer vacation.",
            "sentenceWithBlank": "We went to the beach on our summer ______.",
            "missingWord": "vacation",
            "hint": "Kỳ nghỉ mát mùa hè (bắt đầu bằng V)"
      },
      {
            "audioText": "The traditional local seafood was very delicious.",
            "sentenceWithBlank": "The traditional local seafood was very ______.",
            "missingWord": "delicious",
            "hint": "Ngon miệng, đậm đà (bắt đầu bằng D)"
      },
      {
            "audioText": "I bought this modern laptop yesterday afternoon.",
            "sentenceWithBlank": "I ______ this modern laptop yesterday afternoon.",
            "missingWord": "bought",
            "hint": "Dạng quá khứ V2 của động từ buy"
      },
      {
            "audioText": "Do you remember our first meeting in Paris?",
            "sentenceWithBlank": "Do you ______ our first meeting in Paris?",
            "missingWord": "remember",
            "hint": "Nhớ lại, hồi tưởng (bắt đầu bằng R)"
      },
      {
            "audioText": "She traveled across Europe with her backpack.",
            "sentenceWithBlank": "She ______ across Europe with her backpack.",
            "missingWord": "traveled",
            "hint": "Đã đi du lịch (quá khứ của travel)"
      }
]
  },
  {
    id: 'a2-2',
    level: 'A2',
    title: 'Unit 2: So Sánh Hơn & So Sánh Nhất (Comparatives & Superlatives)',
    description: 'Cách so sánh tính từ ngắn, tính từ dài và các trường hợp đặc biệt trong giao tiếp hàng ngày.',
    duration: '30 phút',
    xp: 60,
    theory: `
      <h3>1. So sánh hơn (Comparative)</h3>
      <ul>
        <li><strong>Tính từ ngắn (1 âm tiết):</strong> S1 + be + adj-er + than + S2. <em>(Ví dụ: He is taller than me; Planes are faster than trains.)</em></li>
        <li><strong>Tính từ dài (>= 2 âm tiết):</strong> S1 + be + more + adj + than + S2. <em>(Ví dụ: Gold is more expensive than silver.)</em></li>
      </ul>

      <h3>2. So sánh nhất (Superlative)</h3>
      <ul>
        <li><strong>Tính từ ngắn:</strong> S + be + the + adj-est. <em>(Ví dụ: Mount Everest is the highest mountain.)</em></li>
        <li><strong>Tính từ dài:</strong> S + be + the most + adj. <em>(Ví dụ: This is the most interesting film I have ever seen.)</em></li>
      </ul>

      <div class="theory-callout-tip">
        💡 <strong>Các cặp bất quy tắc bắt buộc thuộc:</strong>
        <br>• good -> better -> the best (tốt)
        <br>• bad -> worse -> the worst (tệ)
        <br>• far -> farther/further -> the farthest/furthest (xa)
      </div>
    `,
    vocabulary: [
      { word: 'Expensive', ipa: '/ɪkˈspensɪv/', meaning: 'Đắt tiền', example: 'This watch is more expensive than mine.', category: 'Shopping' },
      { word: 'Convenient', ipa: '/kənˈviːniənt/', meaning: 'Thuận tiện, tiện lợi', example: 'Living near a subway is very convenient.', category: 'Lifestyle' },
      { word: 'Crowded', ipa: '/ˈkraʊdɪd/', meaning: 'Đông đúc', example: 'The central market was extremely crowded.', category: 'City' },
      { word: 'Comfortable', ipa: '/ˈkʌmftəbl/', meaning: 'Thoải mái', example: 'This armchair is the most comfortable one.', category: 'Living' }
    ],
    quiz: [
      {
            "question": "Điền từ vào chỗ trống: \"This phone is ___ than mine.\"",
            "options": [
                  "more modern",
                  "moderner",
                  "most modern",
                  "as modern"
            ],
            "correct": 0,
            "explanation": "\"Modern\" là tính từ 2 âm tiết, so sánh hơn dùng \"more modern than\"."
      },
      {
            "question": "Dạng so sánh nhất của \"bad\" là:",
            "options": [
                  "baddest",
                  "worse",
                  "the worst",
                  "the most bad"
            ],
            "correct": 2,
            "explanation": "\"bad\" có dạng so sánh nhất bất quy tắc là \"the worst\"."
      },
      {
            "question": "Chọn câu so sánh hơn đúng với tính từ ngắn \"tall\":",
            "options": [
                  "John is more tall than Mike.",
                  "John is taller than Mike.",
                  "John is tallest than Mike.",
                  "John is tall than Mike."
            ],
            "correct": 1,
            "explanation": "Tính từ ngắn 1 âm tiết \"tall\" thêm đuôi -er thành \"taller than\"."
      },
      {
            "question": "Hoàn thành câu: \"Mount Everest is ___ mountain in the world.\"",
            "options": [
                  "the highest",
                  "higher",
                  "most high",
                  "the higher"
            ],
            "correct": 0,
            "explanation": "So sánh nhất với tính từ ngắn: \"the highest mountain\"."
      },
      {
            "question": "Cặp so sánh nào sau đây là BẤT QUY TẮC đúng?",
            "options": [
                  "good -> gooder -> goodest",
                  "good -> better -> the best",
                  "bad -> more bad -> most bad",
                  "far -> more far -> most far"
            ],
            "correct": 1,
            "explanation": "Quy tắc bất quy tắc chuẩn: good -> better -> the best."
      }
],
    listeningPractices: [
      {
            "audioText": "Living in the capital city is more expensive than the countryside.",
            "sentenceWithBlank": "Living in the capital city is more ______ than the countryside.",
            "missingWord": "expensive",
            "hint": "Đắt đỏ, tốn kém chi phí (bắt đầu bằng E)"
      },
      {
            "audioText": "Living near the subway station is exceptionally convenient.",
            "sentenceWithBlank": "Living near the subway station is exceptionally ______.",
            "missingWord": "convenient",
            "hint": "Thuận tiện, tiện lợi (bắt đầu bằng C)"
      },
      {
            "audioText": "The weekend market was crowded with tourists.",
            "sentenceWithBlank": "The weekend market was ______ with tourists.",
            "missingWord": "crowded",
            "hint": "Đông đúc, tấp nập người qua lại (bắt đầu bằng C)"
      },
      {
            "audioText": "This leather sofa is the most comfortable one.",
            "sentenceWithBlank": "This leather sofa is the most ______ one.",
            "missingWord": "comfortable",
            "hint": "Thoải mái, dễ chịu (bắt đầu bằng C)"
      },
      {
            "audioText": "Health is definitely more important than wealth.",
            "sentenceWithBlank": "Health is definitely more ______ than wealth.",
            "missingWord": "important",
            "hint": "Quan trọng, trọng yếu (bắt đầu bằng I)"
      }
]
  },
  {
    id: 'a2-3',
    level: 'A2',
    title: 'Unit 3: Thì Tương Lai (Will vs Be Going To) & Diễn đạt dự định',
    description: 'Phân biệt quyết định tức thời (will) và kế hoạch đã chuẩn bị trước hoặc dấu hiệu rõ ràng (be going to).',
    duration: '30 phút',
    xp: 60,
    theory: `
      <h3>1. Thì Tương Lai Đơn: WILL + V-bare</h3>
      <ul>
        <li>Quyết định đưa ra ngay tại thời điểm nói mà không có kế hoạch từ trước (<em>"I am thirsty. I will buy a drink."</em>).</li>
        <li>Lời hứa, lời đe dọa hoặc lời đề nghị giúp đỡ (<em>"I will help you with your luggage."</em>).</li>
      </ul>

      <h3>2. Tương Lai Gần: BE GOING TO + V-bare</h3>
      <ul>
        <li>Kế hoạch, dự định đã được tính toán từ trước thời điểm nói (<em>"We are going to visit our aunt this weekend."</em>).</li>
        <li>Dự đoán dựa trên bằng chứng cụ thể trước mắt (<em>"Look at those dark clouds! It is going to rain."</em>).</li>
      </ul>
    `,
    vocabulary: [
      { word: 'Decision', ipa: '/dɪˈsɪʒn/', meaning: 'Quyết định', example: 'Have you made a decision yet?', category: 'General' },
      { word: 'Plan', ipa: '/plæn/', meaning: 'Kế hoạch', example: 'What is your plan for tonight?', category: 'Daily' },
      { word: 'Promise', ipa: '/ˈprɒmɪs/', meaning: 'Lời hứa, hứa hẹn', example: 'I promise I will not be late.', category: 'Verbs' },
      { word: 'Prediction', ipa: '/prɪˈdɪkʃn/', meaning: 'Sự dự đoán', example: 'Weather predictions are not always accurate.', category: 'Science' }
    ],
    quiz: [
      {
            "question": "Quan sát thấy trời mây đen kịt sấm chớp, bạn nói: \"Look at the dark clouds! It ___ rain.\"",
            "options": [
                  "will",
                  "is going to",
                  "is raining",
                  "rains"
            ],
            "correct": 1,
            "explanation": "Dự đoán có bằng chứng cụ thể rõ ràng trước mắt bắt buộc dùng cấu trúc \"be going to\"."
      },
      {
            "question": "Chuông điện thoại reo bất ngờ, bạn nói: \"I ___ answer it.\"",
            "options": [
                  "am going to",
                  "will",
                  "answered",
                  "am answering"
            ],
            "correct": 1,
            "explanation": "Quyết định tức thời ngay khi sự việc xảy ra mà không chuẩn bị từ trước dùng \"will\"."
      },
      {
            "question": "Chọn câu diễn tả lời hứa danh dự trong tương lai:",
            "options": [
                  "I promise I will never tell anyone.",
                  "I promise I am going to tell anyone.",
                  "I promise I told anyone.",
                  "I promise I tell anyone."
            ],
            "correct": 0,
            "explanation": "Lời hứa (promise) đi liền với \"will + V-bare\"."
      },
      {
            "question": "Chúng tôi đã mua vé máy bay và đặt khách sạn xong. Chúng tôi nói: \"We ___ visit Da Nang next week.\"",
            "options": [
                  "will",
                  "are going to",
                  "visited",
                  "visit"
            ],
            "correct": 1,
            "explanation": "Kế hoạch đã được chuẩn bị và sắp xếp cụ thể dùng \"be going to\" hoặc Hiện tại tiếp diễn."
      },
      {
            "question": "Dạng phủ định của \"will\" viết tắt là gì?",
            "options": [
                  "willn't",
                  "won't",
                  "wont",
                  "wilnot"
            ],
            "correct": 1,
            "explanation": "Dạng phủ định viết tắt của \"will not\" là \"won't\"."
      }
],
    listeningPractices: [
      {
            "audioText": "I promise I will help you with your homework.",
            "sentenceWithBlank": "I ______ I will help you with your homework.",
            "missingWord": "promise",
            "hint": "Lời hứa danh dự (bắt đầu bằng P)"
      },
      {
            "audioText": "Have you made an important decision yet?",
            "sentenceWithBlank": "Have you made an important ______ yet?",
            "missingWord": "decision",
            "hint": "Quyết định quan trọng (bắt đầu bằng D)"
      },
      {
            "audioText": "Look at the sky, it is going to rain soon.",
            "sentenceWithBlank": "Look at the sky, it is going to ______ soon.",
            "missingWord": "rain",
            "hint": "Trời đổ mưa (bắt đầu bằng R)"
      },
      {
            "audioText": "What are your travel plans for next summer?",
            "sentenceWithBlank": "What are your travel ______ for next summer?",
            "missingWord": "plans",
            "hint": "Các kế hoạch dự định (danh từ số nhiều)"
      },
      {
            "audioText": "Scientific predictions about climate are very serious.",
            "sentenceWithBlank": "Scientific ______ about climate are very serious.",
            "missingWord": "predictions",
            "hint": "Những dự đoán, tiên đoán (bắt đầu bằng P)"
      }
]
  },

  // =========================================================================
  // CẤP ĐỘ B1: INTERMEDIATE (TRUNG CẤP ĐỘC LẬP)
  // =========================================================================
  {
    id: 'b1-1',
    level: 'B1',
    title: 'Unit 1: Thì Hiện Tại Hoàn Thành (Present Perfect) & Trải nghiệm',
    description: 'Phân biệt Hiện tại hoàn thành và Quá khứ đơn, cách dùng Since, For, Already, Yet, Ever, Never.',
    duration: '40 phút',
    xp: 75,
    theory: `
      <h3>1. Cấu trúc & Cách dùng Present Perfect</h3>
      <p>Cấu trúc: <strong>S + have/has + V3/V-ed + O</strong></p>
      <ul>
        <li>Diễn tả hành động xảy ra trong quá khứ nhưng kết quả hoặc ảnh hưởng còn liên quan mật thiết đến hiện tại.</li>
        <li>Diễn tả kinh nghiệm hoặc trải nghiệm tính tới thời điểm nói (dùng <em>ever, never</em>).</li>
        <li>Hành động bắt đầu trong quá khứ và vẫn đang tiếp diễn ở hiện tại (dùng <em>since, for</em>).</li>
      </ul>

      <h3>2. Phân biệt Since và For</h3>
      <div class="table-container">
        <table>
          <thead>
            <tr><th>Từ</th><th>Quy tắc kết hợp</th><th>Ví dụ</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Since</strong></td><td>+ Mốc thời gian cụ thể trong quá khứ</td><td>since 2018, since Monday, since I was young</td></tr>
            <tr><td><strong>For</strong></td><td>+ Khoảng thời gian kéo dài</td><td>for 5 years, for three days, for a long time</td></tr>
          </tbody>
        </table>
      </div>
    `,
    vocabulary: [
      { word: 'Experience', ipa: '/ɪkˈspɪəriəns/', meaning: 'Kinh nghiệm, trải nghiệm', example: 'Have you ever had a similar experience?', category: 'Career & Life' },
      { word: 'Opportunity', ipa: '/ˌɒpəˈtjuːnəti/', meaning: 'Cơ hội', example: 'This job offers an amazing opportunity to grow.', category: 'Career' },
      { word: 'Achievement', ipa: '/əˈtʃiːvmənt/', meaning: 'Thành tựu, thành tích', example: 'Graduating with honors is a big achievement.', category: 'Success' },
      { word: 'Improve', ipa: '/ɪmˈpruːv/', meaning: 'Cải thiện, tiến bộ', example: 'My English fluency has improved significantly.', category: 'Learning' }
    ],
    quiz: [
      {
            "question": "Chọn từ đúng: \"I have lived in this city ___ 2015.\"",
            "options": [
                  "for",
                  "since",
                  "in",
                  "during"
            ],
            "correct": 1,
            "explanation": "2015 là một mốc thời gian cụ thể trong quá khứ, nên ta dùng \"since\"."
      },
      {
            "question": "Chọn phương án chính xác: \"Have you ___ visited Japan?\"",
            "options": [
                  "never",
                  "ever",
                  "yet",
                  "already"
            ],
            "correct": 1,
            "explanation": "Trong câu hỏi về trải nghiệm cuộc sống, ta dùng \"ever\" (đã từng bao giờ chưa)."
      },
      {
            "question": "Phân biệt: \"She has gone to Paris\" khác \"She has been to Paris\" như thế nào?",
            "options": [
                  "\"has gone\" nghĩa là cô ấy đã đi và hiện vẫn đang ở Paris; \"has been\" nghĩa là đã từng đến và hiện đã trở về",
                  "Hai câu hoàn toàn giống hệt nhau về ngữ nghĩa",
                  "\"has been\" nghĩa là cô ấy không thích Paris",
                  "\"has gone\" dùng cho quá khứ xa, \"has been\" dùng cho quá khứ gần"
            ],
            "correct": 0,
            "explanation": "\"has gone to\" chỉ việc đã đi chưa về; \"has been to\" là trải nghiệm đã từng tới đó và hiện đã về."
      },
      {
            "question": "Từ \"yet\" thường đứng ở đâu trong câu Hiện tại hoàn thành?",
            "options": [
                  "Đứng ở cuối câu phủ định hoặc câu nghi vấn",
                  "Đứng ngay sau chủ ngữ",
                  "Đứng trước trợ động từ have/has",
                  "Chỉ đứng trong câu khẳng định"
            ],
            "correct": 0,
            "explanation": "\"yet\" mang nghĩa là \"chưa\", thường đứng ở cuối câu phủ định hoặc câu hỏi."
      },
      {
            "question": "Chọn câu chia thì đúng: \"They ___ each other for more than ten years.\"",
            "options": [
                  "know",
                  "knew",
                  "have known",
                  "are knowing"
            ],
            "correct": 2,
            "explanation": "Hành động bắt đầu trong quá khứ kéo dài đến nay với \"for more than ten years\" chia Hiện tại hoàn thành; động từ know là stative verb nên dùng \"have known\"."
      }
],
    listeningPractices: [
      {
            "audioText": "This global firm offers an amazing opportunity to learn.",
            "sentenceWithBlank": "This global firm offers an amazing ______ to learn.",
            "missingWord": "opportunity",
            "hint": "Cơ hội phát triển vàng (bắt đầu bằng O)"
      },
      {
            "audioText": "Have you ever had a similar professional experience?",
            "sentenceWithBlank": "Have you ever had a similar professional ______?",
            "missingWord": "experience",
            "hint": "Trải nghiệm, kinh nghiệm thực tiễn (bắt đầu bằng E)"
      },
      {
            "audioText": "My conversational fluency has improved significantly.",
            "sentenceWithBlank": "My conversational fluency has ______ significantly.",
            "missingWord": "improved",
            "hint": "Cải thiện, tiến bộ rõ rệt (dạng V3 bắt đầu bằng I)"
      },
      {
            "audioText": "Graduating with honors was her greatest achievement.",
            "sentenceWithBlank": "Graduating with honors was her greatest ______.",
            "missingWord": "achievement",
            "hint": "Thành tựu xuất chúng (bắt đầu bằng A)"
      },
      {
            "audioText": "We have been friends since our kindergarten years.",
            "sentenceWithBlank": "We have been friends ______ our kindergarten years.",
            "missingWord": "since",
            "hint": "Kể từ mốc thời gian (bắt đầu bằng S)"
      }
]
  },
  {
    id: 'b1-2',
    level: 'B1',
    title: 'Unit 2: Câu Điều Kiện Loại 1 & Loại 2 (Conditionals Type 1 & 2)',
    description: 'Diễn tả các điều kiện có thể xảy ra trong tương lai và những giả định trái ngược với thực tế ở hiện tại.',
    duration: '40 phút',
    xp: 75,
    theory: `
      <h3>1. Câu điều kiện Loại 1 (Có thể xảy ra ở hiện tại hoặc tương lai)</h3>
      <p><strong>Công thức:</strong> If + S + V(hiện tại đơn), S + will / can / may + V-bare</p>
      <p><em>Ví dụ:</em> If you practice speaking English every day, your accent will improve rapidly.</p>

      <h3>2. Câu điều kiện Loại 2 (Không có thật ở hiện tại, giả định trái thực tế)</h3>
      <p><strong>Công thức:</strong> If + S + V2/V-ed (To be dùng were cho mọi ngôi), S + would / could + V-bare</p>
      <p><em>Ví dụ:</em> If I had a million dollars, I would travel around the world.</p>
      <p><em>Ví dụ:</em> If I were you, I would take that job offer immediately.</p>
    `,
    vocabulary: [
      { word: 'Advice', ipa: '/ədˈvaɪs/', meaning: 'Lời khuyên (danh từ không đếm được)', example: 'Can you give me some career advice?', category: 'Communication' },
      { word: 'Imaginary', ipa: '/ɪˈmædʒɪnəri/', meaning: 'Tưởng tượng, không có thật', example: 'He lives in an imaginary world.', category: 'Abstract' },
      { word: 'Consequence', ipa: '/ˈkɒnsɪkwəns/', meaning: 'Hệ quả, hậu quả', example: 'Consider the consequences before acting.', category: 'Reasoning' },
      { word: 'Possibility', ipa: '/ˌpɒsəˈbɪləti/', meaning: 'Khả năng có thể xảy ra', example: 'There is a strong possibility of rain.', category: 'Logic' }
    ],
    quiz: [
      {
            "question": "Hoàn thành câu: \"If I ___ you, I would accept that offer without hesitation.\"",
            "options": [
                  "am",
                  "was",
                  "were",
                  "have been"
            ],
            "correct": 2,
            "explanation": "Trong câu điều kiện loại 2, theo ngữ pháp tiếng Anh chuẩn mực ta dùng \"were\" cho tất cả các ngôi chủ ngữ."
      },
      {
            "question": "Chọn câu điều kiện loại 1 đúng:",
            "options": [
                  "If you study hard, you will pass the exam.",
                  "If you study hard, you would pass the exam.",
                  "If you studied hard, you will pass the exam.",
                  "If you will study hard, you pass the exam."
            ],
            "correct": 0,
            "explanation": "Mệnh đề If chia hiện tại đơn (study), mệnh đề chính dùng will + V (will pass)."
      },
      {
            "question": "Từ \"Unless\" đồng nghĩa với cụm từ nào sau đây?",
            "options": [
                  "If not",
                  "If only",
                  "Because",
                  "Although"
            ],
            "correct": 0,
            "explanation": "\"Unless\" có nghĩa là \"trừ phi / nếu không\", hoàn toàn tương đương với \"If ... not\"."
      },
      {
            "question": "Viết lại: \"If it doesn't rain, we will go on a picnic\" dùng \"Unless\":",
            "options": [
                  "Unless it rains, we will go on a picnic.",
                  "Unless it doesn't rain, we will go on a picnic.",
                  "Unless it rain, we will go on a picnic.",
                  "Unless it rained, we will go on a picnic."
            ],
            "correct": 0,
            "explanation": "Unless = If not, vì vậy mệnh đề sau Unless chia ở dạng khẳng định: \"Unless it rains...\"."
      },
      {
            "question": "\"If I won the lottery, I ___ buy a beach villa.\" Chọn từ đúng:",
            "options": [
                  "will",
                  "would",
                  "can",
                  "must"
            ],
            "correct": 1,
            "explanation": "Mệnh đề if chia quá khứ đơn (won) là câu điều kiện loại 2, mệnh đề chính dùng would + V-bare."
      }
],
    listeningPractices: [
      {
            "audioText": "If I were you, I would ask for professional advice.",
            "sentenceWithBlank": "If I were you, I would ask for professional ______.",
            "missingWord": "advice",
            "hint": "Lời khuyên hữu ích (bắt đầu bằng A)"
      },
      {
            "audioText": "You must consider all potential consequences before deciding.",
            "sentenceWithBlank": "You must consider all potential ______ before deciding.",
            "missingWord": "consequences",
            "hint": "Những hệ quả, hậu quả kéo theo (bắt đầu bằng C)"
      },
      {
            "audioText": "If you practice diligently, you will master the skill.",
            "sentenceWithBlank": "If you practice diligently, you will ______ the skill.",
            "missingWord": "master",
            "hint": "Làm chủ, thuần thục một kỹ năng (bắt đầu bằng M)"
      },
      {
            "audioText": "There is a strong possibility of an economic recovery.",
            "sentenceWithBlank": "There is a strong ______ of an economic recovery.",
            "missingWord": "possibility",
            "hint": "Khả năng, cơ may xảy ra (bắt đầu bằng P)"
      },
      {
            "audioText": "Children often create vivid imaginary friends in games.",
            "sentenceWithBlank": "Children often create vivid ______ friends in games.",
            "missingWord": "imaginary",
            "hint": "Thuộc trí tưởng tượng, không có thật (bắt đầu bằng I)"
      }
]
  },
  {
    id: 'b1-3',
    level: 'B1',
    title: 'Unit 3: Câu Bị Động Căn Bản & Trung Cấp (Passive Voice)',
    description: 'Nắm vững quy tắc chuyển từ câu chủ động sang bị động và ứng dụng trong giao tiếp hàng ngày & công sở.',
    duration: '35 phút',
    xp: 75,
    theory: `
      <h3>1. Nguyên tắc chuyển đổi câu bị động</h3>
      <p>Dùng khi đối tượng chịu tác động quan trọng hơn người thực hiện hành động, hoặc khi không rõ người thực hiện.</p>
      <p><strong>Công thức chung:</strong> S + BE (chia theo thì) + V3/V-ed (+ by O)</p>
      <ul>
        <li><strong>Hiện tại đơn:</strong> am/is/are + V3 <em>(English is spoken worldwide.)</em></li>
        <li><strong>Quá khứ đơn:</strong> was/were + V3 <em>(The bridge was built in 1995.)</em></li>
        <li><strong>Hiện tại hoàn thành:</strong> have/has been + V3 <em>(The report has been completed.)</em></li>
        <li><strong>Động từ khuyết thiếu:</strong> modal + be + V3 <em>(This form must be submitted today.)</em></li>
      </ul>
    `,
    vocabulary: [
      { word: 'Submit', ipa: '/səbˈmɪt/', meaning: 'Nộp, đệ trình', example: 'The assignment must be submitted before Friday.', category: 'Work' },
      { word: 'Construct', ipa: '/kənˈstrʌkt/', meaning: 'Xây dựng, kiến thiết', example: 'The new hospital was constructed last year.', category: 'Engineering' },
      { word: 'Announce', ipa: '/əˈnaʊns/', meaning: 'Thông báo', example: 'The winners will be announced soon.', category: 'Communication' }
    ],
    quiz: [
      {
            "question": "Chuyển câu: \"Alexander Graham Bell invented the telephone\" sang bị động:",
            "options": [
                  "The telephone was invented by Alexander Graham Bell.",
                  "The telephone is invented by Alexander Graham Bell.",
                  "The telephone were invented by Alexander Graham Bell.",
                  "The telephone had invented by Alexander Graham Bell."
            ],
            "correct": 0,
            "explanation": "Thì quá khứ đơn bị động dùng: was + V3 (\"was invented\")."
      },
      {
            "question": "Chuyển câu hiện tại đơn: \"They clean the rooms every day\" sang bị động:",
            "options": [
                  "The rooms are cleaned every day.",
                  "The rooms is cleaned every day.",
                  "The rooms were cleaned every day.",
                  "The rooms have been cleaned every day."
            ],
            "correct": 0,
            "explanation": "Chủ ngữ \"The rooms\" số nhiều ở hiện tại đơn dùng \"are + cleaned\"."
      },
      {
            "question": "Với động từ khuyết thiếu: \"You must submit the report today\", câu bị động là:",
            "options": [
                  "The report must be submitted today.",
                  "The report must submitted today.",
                  "The report must been submitted today.",
                  "The report is must submitted today."
            ],
            "correct": 0,
            "explanation": "Bị động của modal verbs: modal + be + V3 (\"must be submitted\")."
      },
      {
            "question": "Khi nào ta có thể lược bỏ cụm \"by + O\" trong câu bị động?",
            "options": [
                  "Khi tác nhân không xác định hoặc ai cũng biết (by people, by someone, by them)",
                  "Bắt buộc phải luôn giữ lại \"by + O\"",
                  "Chỉ lược bỏ khi tác nhân là tên riêng",
                  "Chỉ lược bỏ trong thì quá khứ"
            ],
            "correct": 0,
            "explanation": "Khi tác nhân hành động mơ hồ (someone, people) hoặc không quan trọng, ta lược bỏ \"by + O\" để câu văn gọn gàng."
      },
      {
            "question": "Câu nào sau đây chia bị động ở thì Hiện tại hoàn thành đúng?",
            "options": [
                  "The new highway has been completed.",
                  "The new highway has completed.",
                  "The new highway was been completed.",
                  "The new highway is been completed."
            ],
            "correct": 0,
            "explanation": "Công thức bị động thì Hiện tại hoàn thành: have/has been + V3 (\"has been completed\")."
      }
],
    listeningPractices: [
      {
            "audioText": "The final project was successfully completed on time.",
            "sentenceWithBlank": "The final project was successfully ______ on time.",
            "missingWord": "completed",
            "hint": "Được hoàn thành xuất sắc (dạng V3 bắt đầu bằng C)"
      },
      {
            "audioText": "The monthly financial report was submitted yesterday.",
            "sentenceWithBlank": "The monthly financial report was ______ yesterday.",
            "missingWord": "submitted",
            "hint": "Đã được nộp, đệ trình lên cấp trên (bắt đầu bằng S)"
      },
      {
            "audioText": "English is widely spoken across all continents.",
            "sentenceWithBlank": "English is widely ______ across all continents.",
            "missingWord": "spoken",
            "hint": "Dạng V3 của động từ speak"
      },
      {
            "audioText": "The ancient stone bridge was constructed centuries ago.",
            "sentenceWithBlank": "The ancient stone bridge was ______ centuries ago.",
            "missingWord": "constructed",
            "hint": "Đã được xây dựng kiến thiết (dạng V3 bắt đầu bằng C)"
      },
      {
            "audioText": "The competition winners will be announced tomorrow morning.",
            "sentenceWithBlank": "The competition winners will be ______ tomorrow morning.",
            "missingWord": "announced",
            "hint": "Được xướng tên thông báo công khai (bắt đầu bằng A)"
      }
]
  },

  // =========================================================================
  // CẤP ĐỘ B2: UPPER-INTERMEDIATE (TRUNG CẤP NÂNG CAO)
  // =========================================================================
  {
    id: 'b2-1',
    level: 'B2',
    title: 'Unit 1: Mệnh Đề Quan Hệ (Relative Clauses) & Rút Gọn Mệnh Đề',
    description: 'Sử dụng who, whom, which, whose, that để kết nối câu phức và kỹ thuật rút gọn mệnh đề quan hệ đỉnh cao.',
    duration: '45 phút',
    xp: 90,
    theory: `
      <h3>1. Phân loại đại từ quan hệ</h3>
      <ul>
        <li><strong>Who:</strong> Thay cho danh từ chỉ người làm chủ ngữ hoặc tân ngữ.</li>
        <li><strong>Whom:</strong> Thay cho người làm tân ngữ (văn phong trang trọng).</li>
        <li><strong>Which:</strong> Thay cho sự vật, hiện tượng hoặc thay cho toàn bộ mệnh đề đứng trước.</li>
        <li><strong>Whose:</strong> Chỉ sở hữu (whose + danh từ).</li>
        <li><strong>That:</strong> Dùng thay thế cho who/which trong mệnh đề xác định (không đứng sau dấu phẩy và giới từ).</li>
      </ul>

      <h3>2. Kỹ thuật Rút gọn Mệnh đề quan hệ (Reduced Relative Clauses)</h3>
      <ul>
        <li><strong>Dạng chủ động -> V-ing:</strong> The man who stands there -> The man standing there.</li>
        <li><strong>Dạng bị động -> V3/V-ed:</strong> The books which were written by him -> The books written by him.</li>
        <li><strong>Có chứa the first, the last, the only -> To V:</strong> The first person who arrived -> The first person to arrive.</li>
      </ul>
    `,
    vocabulary: [
      { word: 'Significant', ipa: '/sɪɡˈnɪfɪkənt/', meaning: 'Ý nghĩa, đáng kể, quan trọng', example: 'There has been a significant increase in sales.', category: 'Academic' },
      { word: 'Perspective', ipa: '/pəˈspektɪv/', meaning: 'Góc nhìn, quan điểm', example: 'We should look at the issue from a global perspective.', category: 'Debate' },
      { word: 'Consequently', ipa: '/ˈkɒnsɪkwəntli/', meaning: 'Do đó, hậu quả là', example: 'He worked hard; consequently, he earned a promotion.', category: 'Linking Words' },
      { word: 'Contribute', ipa: '/kənˈtrɪbjuːt/', meaning: 'Đóng góp, cống hiến', example: 'Everyone can contribute to sustainable development.', category: 'Social' }
    ],
    quiz: [
      {
            "question": "Rút gọn câu sau: \"The students who are taking the exam must remain silent.\"",
            "options": [
                  "The students taken the exam must remain silent.",
                  "The students taking the exam must remain silent.",
                  "The students to take the exam must remain silent.",
                  "The students take the exam must remain silent."
            ],
            "correct": 1,
            "explanation": "Mệnh đề quan hệ mang nghĩa chủ động rút gọn thành dạng V-ing: \"taking the exam\"."
      },
      {
            "question": "Chọn đại từ quan hệ phù hợp: \"The company, ___ headquarters are in Tokyo, is expanding worldwide.\"",
            "options": [
                  "which",
                  "that",
                  "whose",
                  "where"
            ],
            "correct": 2,
            "explanation": "\"headquarters\" là danh từ thuộc quyền sở hữu của \"The company\", ta dùng \"whose\"."
      },
      {
            "question": "Rút gọn câu bị động: \"The monument which was built in 1890 attracts tourists.\"",
            "options": [
                  "The monument built in 1890 attracts tourists.",
                  "The monument building in 1890 attracts tourists.",
                  "The monument to build in 1890 attracts tourists.",
                  "The monument having built in 1890 attracts tourists."
            ],
            "correct": 0,
            "explanation": "Mệnh đề quan hệ dạng bị động rút gọn về dạng V3/V-ed (\"built in 1890\")."
      },
      {
            "question": "Trường hợp nào sau đây KHÔNG ĐƯỢC dùng đại từ \"that\"?",
            "options": [
                  "Trong mệnh đề quan hệ không xác định (có dấu phẩy) hoặc sau giới từ",
                  "Khi danh từ đi trước vừa là người vừa là vật",
                  "Sau các từ so sánh nhất",
                  "Sau all, nothing, everything"
            ],
            "correct": 0,
            "explanation": "Đại từ \"that\" tuyệt đối không được đứng sau dấu phẩy (mệnh đề không xác định) và không đứng ngay sau giới từ."
      },
      {
            "question": "Rút gọn câu có chứa số thứ tự: \"Neil Armstrong was the first man who walked on the moon.\"",
            "options": [
                  "Neil Armstrong was the first man walking on the moon.",
                  "Neil Armstrong was the first man to walk on the moon.",
                  "Neil Armstrong was the first man walked on the moon.",
                  "Neil Armstrong was the first man walk on the moon."
            ],
            "correct": 1,
            "explanation": "Khi danh từ đi kèm các từ như the first, the last, the only, mệnh đề quan hệ rút gọn thành dạng To-V: \"to walk on the moon\"."
      }
],
    listeningPractices: [
      {
            "audioText": "We should evaluate this policy from a global perspective.",
            "sentenceWithBlank": "We should evaluate this policy from a global ______.",
            "missingWord": "perspective",
            "hint": "Góc nhìn, lăng kính quan điểm (bắt đầu bằng P)"
      },
      {
            "audioText": "There has been a significant increase in international trade.",
            "sentenceWithBlank": "There has been a ______ increase in international trade.",
            "missingWord": "significant",
            "hint": "Có ý nghĩa, đáng kể (bắt đầu bằng S)"
      },
      {
            "audioText": "Everyone can contribute to environmental protection.",
            "sentenceWithBlank": "Everyone can ______ to environmental protection.",
            "missingWord": "contribute",
            "hint": "Đóng góp, cống hiến (bắt đầu bằng C)"
      },
      {
            "audioText": "He worked with perseverance; consequently, he was promoted.",
            "sentenceWithBlank": "He worked with perseverance; ______, he was promoted.",
            "missingWord": "consequently",
            "hint": "Do đó, hậu quả là (từ nối học thuật bắt đầu bằng C)"
      },
      {
            "audioText": "The researcher whose paper won acclaim presented today.",
            "sentenceWithBlank": "The researcher ______ paper won acclaim presented today.",
            "missingWord": "whose",
            "hint": "Đại từ quan hệ chỉ sở hữu"
      }
]
  },
  {
    id: 'b2-2',
    level: 'B2',
    title: 'Unit 2: Thành Ngữ & Cụm Động Từ Nâng Cao (Idioms & Phrasal Verbs)',
    description: 'Nâng cấp khả năng diễn đạt tự nhiên như người bản ngữ với các idioms và phrasal verbs phổ biến trong công việc & IELTS.',
    duration: '45 phút',
    xp: 90,
    theory: `
      <h3>1. Phrasal Verbs thường gặp trong môi trường làm việc</h3>
      <ul>
        <li><strong>Come up with:</strong> Nảy ra ý tưởng (<em>She came up with an innovative solution.</em>)</li>
        <li><strong>Call off:</strong> Hủy bỏ kế hoạch/sự kiện (<em>They called off the outdoor concert due to rain.</em>)</li>
        <li><strong>Figure out:</strong> Tìm ra cách giải quyết (<em>We need to figure out what went wrong.</em>)</li>
      </ul>

      <h3>2. Idioms thiết yếu ghi điểm cao</h3>
      <ul>
        <li><strong>Hit the nail on the head:</strong> Nói trúng phóc, hoàn toàn chuẩn xác.</li>
        <li><strong>Bite the bullet:</strong> Cắn răng chịu đựng, dũng cảm đối mặt khó khăn.</li>
        <li><strong>See eye to eye:</strong> Hoàn toàn đồng thuận, chung quan điểm với ai đó.</li>
      </ul>
    `,
    vocabulary: [
      { word: 'Hit the nail on the head', ipa: '/hɪt ðə neɪl ɒn ðə hed/', meaning: 'Nói hoàn toàn chính xác', example: 'Your analysis really hit the nail on the head.', category: 'Idioms' },
      { word: 'Come up with', ipa: '/kʌm ʌp wɪð/', meaning: 'Nảy ra ý tưởng, giải pháp', example: 'We must come up with an innovative proposal.', category: 'Phrasal Verbs' },
      { word: 'Bite the bullet', ipa: '/baɪt ðə ˈbʊlɪt/', meaning: 'Chấp nhận đối mặt nghịch cảnh', example: 'He decided to bite the bullet and resign.', category: 'Idioms' },
      { word: 'Feasible', ipa: '/ˈfiːzəbl/', meaning: 'Khả thi', example: 'Is this project technically feasible within our budget?', category: 'Business' }
    ],
    quiz: [
      {
            "question": "Nghĩa của câu: \"They don't see eye to eye on this proposal\" là gì?",
            "options": [
                  "Họ không nhìn thấy nhau",
                  "Họ không đồng tình với nhau về đề xuất này",
                  "Họ rất thích đề xuất này",
                  "Họ tranh luận bằng ánh mắt"
            ],
            "correct": 1,
            "explanation": "Idiom \"see eye to eye\" có nghĩa là đồng quan điểm; phủ định nghĩa là không cùng quan điểm."
      },
      {
            "question": "Cụm động từ \"come up with\" đồng nghĩa với:",
            "options": [
                  "Hủy bỏ một sự kiện",
                  "Nảy ra một ý tưởng hoặc giải pháp mới",
                  "Trì hoãn công việc",
                  "Coi thường người khác"
            ],
            "correct": 1,
            "explanation": "\"come up with an idea/plan\" nghĩa là nghĩ ra, nảy ra một ý tưởng sáng tạo."
      },
      {
            "question": "Idiom \"hit the nail on the head\" có nghĩa là gì?",
            "options": [
                  "Làm bị thương ngón tay khi đóng đinh",
                  "Nói trúng phóc, hoàn toàn chính xác điểm mấu chốt",
                  "Phạm phải sai lầm nghiêm trọng",
                  "Đưa ra quyết định liều lĩnh"
            ],
            "correct": 1,
            "explanation": "\"Hit the nail on the head\" diễn tả việc nhận định hay nói hoàn toàn chính xác bản chất vấn đề."
      },
      {
            "question": "Chọn phrasal verb mang nghĩa \"hủy bỏ cuộc họp\":",
            "options": [
                  "call off the meeting",
                  "call for the meeting",
                  "call on the meeting",
                  "call out the meeting"
            ],
            "correct": 0,
            "explanation": "\"call off\" có nghĩa là hủy bỏ (cancel) một sự kiện, kế hoạch."
      },
      {
            "question": "Ý nghĩa của thành ngữ \"bite the bullet\":",
            "options": [
                  "Dũng cảm đối mặt với nghịch cảnh không thể tránh",
                  "Gặp tai nạn súng đạn",
                  "Ăn uống vội vã",
                  "Từ bỏ mục tiêu"
            ],
            "correct": 0,
            "explanation": "\"Bite the bullet\" nghĩa là cắn răng chịu đựng, dũng cảm chấp nhận đương đầu với một tình huống khó khăn."
      }
],
    listeningPractices: [
      {
            "audioText": "We need to come up with a feasible marketing strategy.",
            "sentenceWithBlank": "We need to come up with a ______ marketing strategy.",
            "missingWord": "feasible",
            "hint": "Có tính khả thi thực tế (bắt đầu bằng F)"
      },
      {
            "audioText": "Your accurate summary really hit the nail on the head.",
            "sentenceWithBlank": "Your accurate summary really hit the ______ on the head.",
            "missingWord": "nail",
            "hint": "Chiếc đinh (trong thành ngữ hit the nail on the head)"
      },
      {
            "audioText": "They do not see eye to eye on the investment portfolio.",
            "sentenceWithBlank": "They do not see ______ to eye on the investment portfolio.",
            "missingWord": "eye",
            "hint": "Con mắt (trong thành ngữ see eye to eye)"
      },
      {
            "audioText": "The organizers had to call off the outdoor festival.",
            "sentenceWithBlank": "The organizers had to call ______ the outdoor festival.",
            "missingWord": "off",
            "hint": "Giới từ trong cụm call off (hủy bỏ)"
      },
      {
            "audioText": "He decided to bite the bullet and take full responsibility.",
            "sentenceWithBlank": "He decided to bite the ______ and take full responsibility.",
            "missingWord": "bullet",
            "hint": "Viên đạn (trong thành ngữ bite the bullet)"
      }
]
  },
  {
    id: 'b2-3',
    level: 'B2',
    title: 'Unit 3: Câu Điều Kiện Loại 3 & Hỗn Hợp (Mixed Conditionals)',
    description: 'Diễn đạt sự tiếc nuối trong quá khứ và mối liên hệ giữa giả định quá khứ với hệ quả ở hiện tại.',
    duration: '45 phút',
    xp: 90,
    theory: `
      <h3>1. Câu điều kiện Loại 3 (Tiếc nuối quá khứ)</h3>
      <p><strong>Công thức:</strong> If + S + had + V3/V-ed, S + would/could have + V3/V-ed</p>
      <p><em>Ví dụ:</em> If I had studied harder, I would have passed the exam.</p>

      <h3>2. Câu điều kiện Hỗn hợp (Mixed Conditionals: Giả định quá khứ -> Kết quả hiện tại)</h3>
      <p><strong>Công thức:</strong> If + S + had + V3/V-ed, S + would + V-bare (now/today)</p>
      <p><em>Ví dụ:</em> If I had taken that flight yesterday, I would be in London right now.</p>
    `,
    vocabulary: [
      { word: 'Regret', ipa: '/rɪˈɡret/', meaning: 'Hối tiếc, nuối tiếc', example: 'I deeply regret my hasty decision.', category: 'Emotions' },
      { word: 'Circumstance', ipa: '/ˈsɜːkəmstəns/', meaning: 'Hoàn cảnh, tình huống', example: 'Under normal circumstances, this would work.', category: 'Formal' },
      { word: 'Inevitably', ipa: '/ɪnˈevɪtəbli/', meaning: 'Chắc chắn xảy ra, không thể tránh', example: 'Technological progress will inevitably change our lives.', category: 'Adverbs' }
    ],
    quiz: [
      {
            "question": "Chọn câu điều kiện loại 3 chính xác:",
            "options": [
                  "If she had left earlier, she wouldn't have missed the train.",
                  "If she left earlier, she wouldn't have missed the train.",
                  "If she had left earlier, she wouldn't miss the train.",
                  "If she had left earlier, she had not missed the train."
            ],
            "correct": 0,
            "explanation": "Điều kiện loại 3: Mệnh đề if dùng Had + V3 (had left), mệnh đề chính dùng Wouldn't have + V3 (missed)."
      },
      {
            "question": "Câu điều kiện hỗn hợp (Mixed Conditional): Giả định quá khứ dẫn đến kết quả hiện tại có công thức:",
            "options": [
                  "If + S + had + V3, S + would + V-bare (now)",
                  "If + S + V2, S + would have + V3",
                  "If + S + V(hiện tại), S + would + V-bare",
                  "If + S + had + V3, S + will + V-bare"
            ],
            "correct": 0,
            "explanation": "Giả định một việc trái ngược quá khứ (had + V3) ảnh hưởng đến trạng thái bây giờ (would + V-bare now)."
      },
      {
            "question": "\"If I had accepted that job offer last year, I ___ in London today.\" Điền từ đúng:",
            "options": [
                  "would be living",
                  "would have lived",
                  "will live",
                  "lived"
            ],
            "correct": 0,
            "explanation": "Có dấu hiệu \"today\" ở hiện tại, mệnh đề if ở quá khứ (had accepted) -> Mixed conditional: \"would be living\"."
      },
      {
            "question": "Cấu trúc \"Wish\" diễn tả sự tiếc nuối về một việc trong quá khứ:",
            "options": [
                  "S + wish(es) + S + had + V3/V-ed",
                  "S + wish(es) + S + V2/V-ed",
                  "S + wish(es) + S + would + V-bare",
                  "S + wish(es) + S + have + V3/V-ed"
            ],
            "correct": 0,
            "explanation": "Ước một điều trái ngược với quá khứ lùi thì về quá khứ hoàn thành: \"I wish I had studied harder\"."
      },
      {
            "question": "\"If only I ___ her telephone number yesterday!\" Điền động từ đúng:",
            "options": [
                  "had known",
                  "knew",
                  "would know",
                  "have known"
            ],
            "correct": 0,
            "explanation": "\"If only\" diễn tả tiếc nuối về ngày hôm qua (yesterday) lùi về quá khứ hoàn thành -> \"had known\"."
      }
],
    listeningPractices: [
      {
            "audioText": "I deeply regret making that hasty financial decision.",
            "sentenceWithBlank": "I deeply ______ making that hasty financial decision.",
            "missingWord": "regret",
            "hint": "Nuối tiếc, ân hận sâu sắc (bắt đầu bằng R)"
      },
      {
            "audioText": "Technological innovation will inevitably change society.",
            "sentenceWithBlank": "Technological innovation will ______ change society.",
            "missingWord": "inevitably",
            "hint": "Một cách tất yếu, không thể tránh khỏi (bắt đầu bằng I)"
      },
      {
            "audioText": "Under such difficult circumstances, they persevered.",
            "sentenceWithBlank": "Under such difficult ______, they persevered.",
            "missingWord": "circumstances",
            "hint": "Hoàn cảnh, tình thế trớ trêu (bắt đầu bằng C)"
      },
      {
            "audioText": "If you had listened to the warning, you would be safe.",
            "sentenceWithBlank": "If you had listened to the warning, you would be ______.",
            "missingWord": "safe",
            "hint": "An toàn, bình an vô sự (bắt đầu bằng S)"
      },
      {
            "audioText": "I wish I had studied computer science at university.",
            "sentenceWithBlank": "I ______ I had studied computer science at university.",
            "missingWord": "wish",
            "hint": "Ước ao, mong muốn (bắt đầu bằng W)"
      }
]
  },

  // =========================================================================
  // CẤP ĐỘ C1: ADVANCED (CAO CẤP CHUYÊN SÂU)
  // =========================================================================
  {
    id: 'c1-1',
    level: 'C1',
    title: 'Unit 1: Đảo Ngữ Nâng Cao (Advanced Inversion for Emphasis)',
    description: 'Kỹ thuật đảo ngữ nhằm nhấn mạnh và tạo văn phong trang trọng, báo chí và học thuật đỉnh cao.',
    duration: '50 phút',
    xp: 120,
    theory: `
      <h3>1. Đảo ngữ với trạng từ mang nghĩa phủ định / giới hạn</h3>
      <p>Khi các từ sau đứng đầu câu, ta đảo trợ động từ lên trước chủ ngữ: <strong>Hardly, Barely, Scarcely, Seldom, Rarely, Never, Little, Under no circumstances</strong>.</p>
      <p><strong>Cấu trúc:</strong> Negative Adverb + Auxiliary Verb + S + Main Verb</p>
      <ul>
        <li><em>Never have I seen such an extraordinary achievement.</em> (Chưa bao giờ tôi thấy một thành tựu phi thường như thế.)</li>
        <li><em>Seldom does a researcher encounter such conclusive data.</em> (Hiếm khi một nhà nghiên cứu lại gặp dữ liệu xác đáng như vậy.)</li>
      </ul>

      <h3>2. Đảo ngữ với "Not only ... but also"</h3>
      <p><strong>Cấu trúc:</strong> Not only + Auxiliary + S + V, but S also + V...</p>
      <p><em>Ví dụ:</em> Not only did she exceed the sales target, but she also inspired the entire department.</p>
    `,
    vocabulary: [
      { word: 'Conclusive', ipa: '/kənˈkluːsɪv/', meaning: 'Có tính thuyết phục, quyết định', example: 'The team presented conclusive scientific evidence.', category: 'Academic' },
      { word: 'Exemplify', ipa: '/ɪɡˈzemplɪfaɪ/', meaning: 'Là ví dụ điển hình cho', example: 'Her dedication exemplifies true leadership.', category: 'Formal' },
      { word: 'Ubiquitous', ipa: '/juːˈbɪkwɪtəs/', meaning: 'Phổ biến khắp nơi, nhan nhản', example: 'Smartphones have become ubiquitous in modern society.', category: 'Advanced' },
      { word: 'Substantiate', ipa: '/səbˈstænʃieɪt/', meaning: 'Chứng minh bằng bằng chứng xác thực', example: 'You must substantiate your arguments with empirical data.', category: 'Research' }
    ],
    quiz: [
      {
            "question": "Chọn câu viết đúng cấu trúc đảo ngữ:",
            "options": [
                  "Under no circumstances you should disclose your password.",
                  "Under no circumstances should you disclose your password.",
                  "Under no circumstances you shall disclose your password.",
                  "Under no circumstances disclosed should you your password."
            ],
            "correct": 1,
            "explanation": "Sau cụm phủ định \"Under no circumstances\", trợ động từ \"should\" phải đảo lên trước chủ ngữ \"you\"."
      },
      {
            "question": "Chuyển câu: \"I had barely stepped outside when it began to hail\" sang đảo ngữ:",
            "options": [
                  "Barely had I stepped outside when it began to hail.",
                  "Barely I had stepped outside when it began to hail.",
                  "Had barely I stepped outside when it began to hail.",
                  "Barely did I step outside when it began to hail."
            ],
            "correct": 0,
            "explanation": "Cấu trúc \"Barely had + S + V3/V-ed... when...\" đảo \"had\" lên trước chủ ngữ."
      },
      {
            "question": "Đảo ngữ với \"Not only... but also\": \"Not only ___ the symposium, but she also delivered the keynote address.\"",
            "options": [
                  "she organized",
                  "did she organize",
                  "she did organize",
                  "organized she"
            ],
            "correct": 1,
            "explanation": "Sau \"Not only\" đứng đầu câu, trợ động từ \"did\" đảo lên trước chủ ngữ \"she\"."
      },
      {
            "question": "Chọn câu đảo ngữ đúng với từ phủ định \"Seldom\":",
            "options": [
                  "Seldom does a researcher witness such anomalous data.",
                  "Seldom a researcher does witness such anomalous data.",
                  "Seldom a researcher witnesses such anomalous data.",
                  "Seldom witnesses a researcher such anomalous data."
            ],
            "correct": 0,
            "explanation": "Đảo trợ động từ \"does\" lên trước chủ ngữ \"a researcher\", động từ chính về nguyên mẫu \"witness\"."
      },
      {
            "question": "Cấu trúc \"Only after / Only when\" đứng đầu câu thì mệnh đề nào bị đảo ngữ?",
            "options": [
                  "Mệnh đề chính phía sau mới bị đảo ngữ, mệnh đề sau Only giữ nguyên",
                  "Mệnh đề ngay sau Only bị đảo ngữ",
                  "Cả 2 mệnh đề đều bị đảo ngữ",
                  "Không mệnh đề nào bị đảo ngữ"
            ],
            "correct": 0,
            "explanation": "Quy tắc: Only after / Only when + S + V, Auxiliary + S + V (chỉ đảo ngữ ở mệnh đề chính phía sau)."
      }
],
    listeningPractices: [
      {
            "audioText": "Smartphones have become ubiquitous in contemporary society.",
            "sentenceWithBlank": "Smartphones have become ______ in contemporary society.",
            "missingWord": "ubiquitous",
            "hint": "Hiện diện khắp nơi, nhan nhản (bắt đầu bằng U)"
      },
      {
            "audioText": "The research team presented conclusive empirical evidence.",
            "sentenceWithBlank": "The research team presented ______ empirical evidence.",
            "missingWord": "conclusive",
            "hint": "Có tính xác đáng, thuyết phục chung cuộc (bắt đầu bằng C)"
      },
      {
            "audioText": "You must substantiate your philosophical claims.",
            "sentenceWithBlank": "You must ______ your philosophical claims.",
            "missingWord": "substantiate",
            "hint": "Chứng minh bằng chứng cứ xác thực (bắt đầu bằng S)"
      },
      {
            "audioText": "Her selfless dedication exemplifies genuine leadership.",
            "sentenceWithBlank": "Her selfless dedication ______ genuine leadership.",
            "missingWord": "exemplifies",
            "hint": "Là minh chứng điển hình cho (bắt đầu bằng E)"
      },
      {
            "audioText": "Under no circumstances should you reveal this security code.",
            "sentenceWithBlank": "Under no circumstances ______ you reveal this security code.",
            "missingWord": "should",
            "hint": "Trợ động từ trong cấu trúc đảo ngữ"
      }
]
  },
  {
    id: 'c1-2',
    level: 'C1',
    title: 'Unit 2: Câu Chẻ Nhấn Mạnh (Cleft Sentences: It is... that & Wh-clefts)',
    description: 'Cách sử dụng câu chẻ để hướng sự tập trung của người nghe/đọc vào một thông tin then chốt.',
    duration: '50 phút',
    xp: 120,
    theory: `
      <h3>1. Câu chẻ với "It is / It was ... that"</h3>
      <p>Dùng để nhấn mạnh chủ ngữ, tân ngữ hoặc trạng từ chỉ thời gian/nơi chốn.</p>
      <ul>
        <li><strong>Nhấn mạnh chủ ngữ:</strong> It was Thomas who resolved the software crisis yesterday.</li>
        <li><strong>Nhấn mạnh thời gian:</strong> It was only after graduation that he discovered his passion for linguistics.</li>
      </ul>

      <h3>2. Câu chẻ giả định (Pseudo-cleft / Wh-clefts)</h3>
      <p>Cấu trúc: <strong>What + S + V + is/was + ...</strong></p>
      <p><em>Ví dụ:</em> What we really need at this juncture is decisive leadership. (Điều chúng ta thực sự cần lúc này là sự lãnh đạo quyết đoán.)</p>
    `,
    vocabulary: [
      { word: 'Decisive', ipa: '/dɪˈsaɪsɪv/', meaning: 'Quyết đoán, mang tính quyết định', example: 'She showed decisive leadership during the crisis.', category: 'Management' },
      { word: 'Juncture', ipa: '/ˈdʒʌŋktʃər/', meaning: 'Thời điểm quan trọng, then chốt', example: 'At this critical juncture, prudence is essential.', category: 'Formal' },
      { word: 'Prudence', ipa: '/ˈpruːdns/', meaning: 'Sự thận trọng, khôn ngoan', example: 'Financial prudence saved the firm from insolvency.', category: 'Finance' }
    ],
    quiz: [
      {
            "question": "Chọn câu chẻ đúng để nhấn mạnh \"the lack of funding\":",
            "options": [
                  "It is the lack of funding that delayed the scientific expedition.",
                  "It is the lack of funding which delayed the scientific expedition.",
                  "It was the lack of funding what delayed the scientific expedition.",
                  "The lack of funding it was that delayed the scientific expedition."
            ],
            "correct": 0,
            "explanation": "Cấu trúc câu chẻ chuẩn mực: It is/was + đối tượng nhấn mạnh + that + mệnh đề."
      },
      {
            "question": "Câu chẻ Wh-cleft (Pseudo-cleft): \"What the committee desperately requires ___ strategic clarity.\"",
            "options": [
                  "is",
                  "are",
                  "be",
                  "being"
            ],
            "correct": 0,
            "explanation": "Mệnh đề danh ngữ \"What the committee desperately requires\" đóng vai trò chủ ngữ số ít, đi với động từ to be \"is\"."
      },
      {
            "question": "Chuyển câu: \"I love her unwavering integrity\" sang câu chẻ Wh-cleft:",
            "options": [
                  "What I love about her is her unwavering integrity.",
                  "Which I love about her is her unwavering integrity.",
                  "It is I love her unwavering integrity.",
                  "That I love her unwavering integrity is."
            ],
            "correct": 0,
            "explanation": "Cấu trúc Wh-cleft: What + S + V + is + bổ ngữ nhấn mạnh."
      },
      {
            "question": "Nhấn mạnh trạng ngữ chỉ nơi chốn: \"It was in the secluded laboratory ___ the breakthrough occurred.\"",
            "options": [
                  "that",
                  "where",
                  "which",
                  "what"
            ],
            "correct": 0,
            "explanation": "Trong câu chẻ \"It was [prep + noun] that\", liên từ chuẩn mực nhất trong văn phong học thuật là \"that\"."
      },
      {
            "question": "Tác dụng tu từ học chính của câu chẻ (Cleft sentences) là gì?",
            "options": [
                  "Tái cấu trúc câu để dồn trọng tâm chú ý vào thông tin then chốt mới",
                  "Làm cho câu văn ngắn gọn hơn",
                  "Biến câu chủ động thành câu bị động",
                  "Thay đổi thì của động từ"
            ],
            "correct": 0,
            "explanation": "Câu chẻ chia tách câu thành hai phần để tạo sự tương phản và nhấn mạnh vào một thành phần cụ thể."
      }
],
    listeningPractices: [
      {
            "audioText": "What we genuinely need at this critical juncture is decisive leadership.",
            "sentenceWithBlank": "What we genuinely need at this critical juncture is ______ leadership.",
            "missingWord": "decisive",
            "hint": "Tính quyết đoán, quyết liệt (bắt đầu bằng D)"
      },
      {
            "audioText": "At this dangerous juncture, caution is paramount.",
            "sentenceWithBlank": "At this dangerous ______, caution is paramount.",
            "missingWord": "juncture",
            "hint": "Thời điểm bước ngoặt gay cấn (bắt đầu bằng J)"
      },
      {
            "audioText": "Financial prudence saved the enterprise from bankruptcy.",
            "sentenceWithBlank": "Financial ______ saved the enterprise from bankruptcy.",
            "missingWord": "prudence",
            "hint": "Sự thận trọng, khôn ngoan sáng suốt (bắt đầu bằng P)"
      },
      {
            "audioText": "It was her relentless curiosity that sparked the breakthrough.",
            "sentenceWithBlank": "It was her relentless curiosity ______ sparked the breakthrough.",
            "missingWord": "that",
            "hint": "Liên từ trong câu chẻ It was... that"
      },
      {
            "audioText": "The legal statute was notoriously ambiguous in its definitions.",
            "sentenceWithBlank": "The legal statute was notoriously ______ in its definitions.",
            "missingWord": "ambiguous",
            "hint": "Mơ hồ, đa nghĩa khó hiểu (bắt đầu bằng A)"
      }
]
  },

  // =========================================================================
  // CẤP ĐỘ C2: MASTERY (THÀNH THẠO NHƯ NGƯỜI BẢN XỨ)
  // =========================================================================
  {
    id: 'c2-1',
    level: 'C2',
    title: 'Unit 1: Sắc Thái Văn Phong & Hùng Biện Đỉnh Cao (Nuances & Rhetoric)',
    description: 'Làm chủ các sắc thái biểu cảm tế nhị, phép ẩn dụ tu từ học và văn phong đàm phán cấp nguyên thủ.',
    duration: '60 phút',
    xp: 150,
    theory: `
      <h3>1. Stylistic Nuances & Pragmatic Competence</h3>
      <p>Ở cấp độ C2 (Mastery), sự phân biệt không chỉ nằm ở tính đúng sai ngữ pháp mà là <strong>tính phù hợp với ngữ cảnh (contextual appropriateness)</strong>, sự tinh tế trong hàm ý mỉa mai (irony), uyển ngữ (euphemism), và cách chọn từ đắt giá.</p>
      <ul>
        <li><strong>Litotes (Phép nói giảm/nói tránh qua phủ định kép):</strong> Thay vì nói "That is fantastic", người bản ngữ dùng: <em>"It was by no means an insignificant accomplishment."</em></li>
        <li><strong>Metonymy & Synecdoche (Hoán dụ & Cải dung):</strong> Dùng biểu tượng thay thế cho tổng thể (<em>"The pen is mightier than the sword"</em>, <em>"Downing Street declared today..."</em>).</li>
      </ul>

      <h3>2. Advanced Academic Collocations</h3>
      <p>Vociferous objections (sự phản đối kịch liệt), diametrically opposed (hoàn toàn trái ngược), unmitigated disaster (thảm họa toàn diện), precarious equilibrium (thế cân bằng bấp bênh).</p>
    `,
    vocabulary: [
      { word: 'Diametrically opposed', ipa: '/ˌdaɪəˈmetrɪkli əˈpəʊzd/', meaning: 'Hoàn toàn đối lập 180 độ', example: 'Their philosophical doctrines are diametrically opposed.', category: 'C2 Collocations' },
      { word: 'Ephemeral', ipa: '/ɪˈfemərəl/', meaning: 'Phù du, chóng tàn, ngắn ngủi', example: 'Fame in the digital age is often ephemeral.', category: 'Literary' },
      { word: 'Paradigm', ipa: '/ˈpærədaɪm/', meaning: 'Mô hình, chuẩn mực tư duy', example: 'Artificial Intelligence represents a major paradigm shift.', category: 'Academic' },
      { word: 'Surreptitious', ipa: '/ˌsʌrəpˈtɪʃəs/', meaning: 'Lén lút, bí mật, giấu giếm', example: 'He cast a surreptitious glance toward the confidential files.', category: 'High Level' }
    ],
    quiz: [
      {
            "question": "Collocation nào mô tả \"sự phản đối kịch liệt, ồn ào nhất\"?",
            "options": [
                  "Loud objection",
                  "Vociferous objection",
                  "Big objection",
                  "Sharp objection"
            ],
            "correct": 1,
            "explanation": "\"Vociferous objection\" là collocation học thuật chuẩn xác ở cấp độ C2 thể hiện sự phản kháng mạnh mẽ bằng lời nói."
      },
      {
            "question": "Từ đồng nghĩa tinh tế nhất với \"short-lived\" (ngắn ngủi, phù du) trong văn phong học thuật là:",
            "options": [
                  "Ephemeral",
                  "Brief",
                  "Quick",
                  "Fast"
            ],
            "correct": 0,
            "explanation": "\"Ephemeral\" thể hiện sắc thái văn phong triết học và học thuật cao cấp về tính chất tạm bợ, phù du của sự việc."
      },
      {
            "question": "Phép tu từ \"Litotes\" (nói giảm/nói tránh qua phủ định kép) được thể hiện qua câu nào?",
            "options": [
                  "It was by no means an insignificant accomplishment.",
                  "It was an extremely huge victory.",
                  "The victory was as bright as the sun.",
                  "He ran faster than the speed of light."
            ],
            "correct": 0,
            "explanation": "\"by no means an insignificant\" (hoàn toàn không phải là thành tựu nhỏ) là ví dụ kinh điển của phép phủ định kép Litotes để khẳng định sự vĩ đại một cách khiêm tốn."
      },
      {
            "question": "Collocation học thuật chuẩn mực với \"opposed\" để chỉ hai quan điểm hoàn toàn ngược nhau 180 độ là:",
            "options": [
                  "diametrically opposed",
                  "deeply opposed",
                  "widely opposed",
                  "strictly opposed"
            ],
            "correct": 0,
            "explanation": "\"diametrically opposed\" là collocation cố định cao cấp trong văn phong tranh biện."
      },
      {
            "question": "Phép hoán dụ (Metonymy) là gì trong văn chương đỉnh cao?",
            "options": [
                  "Dùng một vật liên đới mật thiết để đại diện cho cả thực thể (ví dụ: \"Downing Street\" đại diện cho Thủ tướng Anh)",
                  "So sánh có từ like hoặc as",
                  "Lặp lại phụ âm đầu dòng",
                  "Cường điệu hóa sự việc"
            ],
            "correct": 0,
            "explanation": "Metonymy thay thế tên một sự vật bằng một biểu tượng hay khái niệm gắn liền với nó."
      }
],
    listeningPractices: [
      {
            "audioText": "Their economic policies are diametrically opposed to our vision.",
            "sentenceWithBlank": "Their economic policies are ______ opposed to our vision.",
            "missingWord": "diametrically",
            "hint": "Đối lập hoàn toàn 180 độ (bắt đầu bằng D)"
      },
      {
            "audioText": "Transient fame in modern media is remarkably ephemeral.",
            "sentenceWithBlank": "Transient fame in modern media is remarkably ______.",
            "missingWord": "ephemeral",
            "hint": "Phù du, sớm nở tối tàn (bắt đầu bằng E)"
      },
      {
            "audioText": "Artificial intelligence represents a fundamental paradigm shift.",
            "sentenceWithBlank": "Artificial intelligence represents a fundamental ______ shift.",
            "missingWord": "paradigm",
            "hint": "Hệ hình tư duy, chuẩn mực mẫu (bắt đầu bằng P)"
      },
      {
            "audioText": "He cast a surreptitious glance toward the secret vault.",
            "sentenceWithBlank": "He cast a ______ glance toward the secret vault.",
            "missingWord": "surreptitious",
            "hint": "Lén lút, giấu giếm, bí mật (bắt đầu bằng S)"
      },
      {
            "audioText": "The proposed tax hike triggered vociferous protests nationwide.",
            "sentenceWithBlank": "The proposed tax hike triggered ______ protests nationwide.",
            "missingWord": "vociferous",
            "hint": "Kịch liệt, ồn ào dữ dội (bắt đầu bằng V)"
      }
]
  },
  {
    id: 'c2-2',
    level: 'C2',
    title: 'Unit 2: Ngữ Dụng Học (Pragmatics), Uyển Ngữ & Văn Phong Báo Chí Chuyên Sâu',
    description: 'Thấu hiểu những ngụ ý ngầm (implicatures), cách biểu đạt khéo léo trong ngoại giao và phân tích diễn ngôn.',
    duration: '60 phút',
    xp: 150,
    theory: `
      <h3>1. Pragmatic Implicature (Hàm ngôn ngữ dụng)</h3>
      <p>Khả năng hiểu điều người bản ngữ muốn truyền tải mà không cần nói thẳng ra. Ví dụ: Khi người Anh nói <em>"With the greatest respect, I hear what you say"</em>, hàm ý thực tế thường là <em>"I completely disagree and think you are mistaken."</em></p>

      <h3>2. Diplomatic Euphemisms (Uyển ngữ ngoại giao)</h3>
      <ul>
        <li>Thay vì nói "He was fired" -> <em>"He was released to pursue other opportunities."</em></li>
        <li>Thay vì nói "The project failed" -> <em>"The venture yielded suboptimal outcomes under challenging parameters."</em></li>
      </ul>
    `,
    vocabulary: [
      { word: 'Suboptimal', ipa: '/ˌsʌbˈɒptɪməl/', meaning: 'Dưới mức tối ưu, chưa đạt kỳ vọng', example: 'The fiscal performance in Q3 was suboptimal.', category: 'Diplomatic' },
      { word: 'Equivocal', ipa: '/ɪˈkwɪvəkl/', meaning: 'Mập mờ, nước đôi, không dứt khoát', example: 'The minister gave an equivocal response to the inquiry.', category: 'Politics' },
      { word: 'Quintessential', ipa: '/ˌkwɪntɪˈsenʃl/', meaning: 'Tinh túy nhất, điển hình hoàn hảo', example: 'He is the quintessential British gentleman.', category: 'Literary' }
    ],
    quiz: [
      {
            "question": "Trong văn phong ngoại giao tinh tế, từ nào được dùng để nói giảm cho \"poor / disappointing result\"?",
            "options": [
                  "Suboptimal result",
                  "Bad result",
                  "Hopeless result",
                  "Terrible result"
            ],
            "correct": 0,
            "explanation": "\"Suboptimal\" là uyển ngữ chuẩn mực dùng trong kinh tế học và ngoại giao để chỉ kết quả không đạt như kỳ vọng mà không làm mất lòng đối tác."
      },
      {
            "question": "Khi phát ngôn viên chính phủ đưa ra một câu trả lời lấp lửng, nước đôi để tránh cam kết, ta gọi đó là:",
            "options": [
                  "An equivocal response",
                  "A decisive response",
                  "An aggressive response",
                  "A blunt response"
            ],
            "correct": 0,
            "explanation": "\"Equivocal\" miêu tả lời lẽ mập mờ, cố tình đa nghĩa để né tránh trách nhiệm hoặc cam kết dứt khoát."
      },
      {
            "question": "Trong ngữ dụng học (Pragmatics), \"implicature\" có nghĩa là gì?",
            "options": [
                  "Hàm ngôn: Ý định ngầm của người nói không được phát biểu trực tiếp bằng câu chữ",
                  "Lỗi ngữ pháp cơ bản",
                  "Quy tắc phát âm trọng âm",
                  "Phân tích nguồn gốc từ vựng"
            ],
            "correct": 0,
            "explanation": "Implicature là hàm ý ngầm được người nghe suy luận dựa trên ngữ cảnh xã hội thay vì chỉ hiểu theo nghĩa đen."
      },
      {
            "question": "Từ nào mô tả một hình mẫu \"tinh túy nhất, điển hình hoàn hảo nhất\"?",
            "options": [
                  "Quintessential",
                  "Mediocre",
                  "Average",
                  "Ordinary"
            ],
            "correct": 0,
            "explanation": "\"Quintessential\" thể hiện phẩm chất tinh túy nhất của một hình mẫu chuẩn mực."
      },
      {
            "question": "Uyển ngữ ngoại giao (Diplomatic Euphemism) nào thay thế lịch thiệp cho \"He was dismissed / fired\"?",
            "options": [
                  "He stepped down to pursue other professional horizons.",
                  "He was thrown out of the company.",
                  "He failed his duties completely.",
                  "He got kicked out."
            ],
            "correct": 0,
            "explanation": "Văn phong ngoại giao dùng uyển ngữ tao nhã: \"stepped down to pursue other professional horizons\" để giữ thể diện."
      }
],
    listeningPractices: [
      {
            "audioText": "The minister gave an equivocal response to the press inquiry.",
            "sentenceWithBlank": "The minister gave an ______ response to the press inquiry.",
            "missingWord": "equivocal",
            "hint": "Câu trả lời nước đôi, lấp lửng (bắt đầu bằng E)"
      },
      {
            "audioText": "The fiscal performance was suboptimal during the recession.",
            "sentenceWithBlank": "The fiscal performance was ______ during the recession.",
            "missingWord": "suboptimal",
            "hint": "Dưới mức tối ưu, chưa đạt kỳ vọng (bắt đầu bằng S)"
      },
      {
            "audioText": "He remains the quintessential gentleman of literary tradition.",
            "sentenceWithBlank": "He remains the ______ gentleman of literary tradition.",
            "missingWord": "quintessential",
            "hint": "Tinh túy, hình mẫu điển hình hoàn hảo nhất (bắt đầu bằng Q)"
      },
      {
            "audioText": "Reluctant to escalate tensions, they acquiesced to the treaty.",
            "sentenceWithBlank": "Reluctant to escalate tensions, they ______ to the treaty.",
            "missingWord": "acquiesced",
            "hint": "Miễn cưỡng chấp thuận, bằng lòng ngầm (bắt đầu bằng A)"
      },
      {
            "audioText": "His writing style is excessively pretentious and pedantic.",
            "sentenceWithBlank": "His writing style is excessively ______ and pedantic.",
            "missingWord": "pretentious",
            "hint": "Tự phụ, làm bộ làm tịch (bắt đầu bằng P)"
      }
]
  }
];

// ================= PLACEMENT TEST QUESTIONS (15 CÂU XẾP LỚP A1 - C2) =================
const PLACEMENT_QUESTIONS = [
  {
    id: 1,
    level: 'A1',
    question: 'Hello! What ___ your name?',
    options: ['am', 'is', 'are', 'be'],
    correct: 1,
    weight: 1
  },
  {
    id: 2,
    level: 'A1',
    question: 'David ___ to the gym three times a week.',
    options: ['go', 'goes', 'going', 'is go'],
    correct: 1,
    weight: 1
  },
  {
    id: 3,
    level: 'A1',
    question: 'There ___ four chairs in the dining room.',
    options: ['is', 'are', 'have', 'has'],
    correct: 1,
    weight: 1
  },
  {
    id: 4,
    level: 'A2',
    question: 'We ___ to the cinema last night and watched a comedy.',
    options: ['go', 'gone', 'went', 'have gone'],
    correct: 2,
    weight: 2
  },
  {
    id: 5,
    level: 'A2',
    question: 'This building is much ___ than the old library downtown.',
    options: ['tall', 'taller', 'tallest', 'more tall'],
    correct: 1,
    weight: 2
  },
  {
    id: 6,
    level: 'A2',
    question: 'I ___ an email when the power suddenly went out.',
    options: ['wrote', 'was writing', 'am writing', 'have written'],
    correct: 1,
    weight: 2
  },
  {
    id: 7,
    level: 'B1',
    question: 'I have been studying English ___ more than five years.',
    options: ['since', 'for', 'during', 'from'],
    correct: 1,
    weight: 3
  },
  {
    id: 8,
    level: 'B1',
    question: 'If I ___ a car, I would drive to the coast this weekend.',
    options: ['have', 'had', 'would have', 'will have'],
    correct: 1,
    weight: 3
  },
  {
    id: 9,
    level: 'B1',
    question: 'The new hospital ___ by the mayor next month.',
    options: ['will inaugurate', 'will be inaugurated', 'is inaugurating', 'was inaugurated'],
    correct: 1,
    weight: 3
  },
  {
    id: 10,
    level: 'B2',
    question: 'She was exhausted because she ___ non-stop since 6 o’clock that morning.',
    options: ['has worked', 'had been working', 'was working', 'worked'],
    correct: 1,
    weight: 4
  },
  {
    id: 11,
    level: 'B2',
    question: 'The committee members didn’t ___ eye to eye on the annual budget proposal.',
    options: ['look', 'see', 'view', 'watch'],
    correct: 1,
    weight: 4
  },
  {
    id: 12,
    level: 'B2',
    question: 'The novel, ___ plot was remarkably intricate, received universal acclaim.',
    options: ['that', 'which', 'whose', 'where'],
    correct: 2,
    weight: 4
  },
  {
    id: 13,
    level: 'C1',
    question: 'Rarely ___ such unanimous enthusiasm for a government initiative.',
    options: ['we have witnessed', 'have we witnessed', 'we witnessed', 'did witness we'],
    correct: 1,
    weight: 5
  },
  {
    id: 14,
    level: 'C1',
    question: 'The attorney failed to provide sufficient evidence to ___ her client\'s alibi.',
    options: ['substantiate', 'circumvent', 'dismantle', 'fabricate'],
    correct: 0,
    weight: 5
  },
  {
    id: 15,
    level: 'C2',
    question: 'Their socio-economic agendas are ___ opposed, making consensus impossible.',
    options: ['deeply', 'diametrically', 'heavily', 'critically'],
    correct: 1,
    weight: 6
  }
];

if (typeof window !== 'undefined') {
  window.CEFR_LEVELS = CEFR_LEVELS;
  window.LESSONS_DATA = LESSONS_DATA;
  window.PLACEMENT_QUESTIONS = PLACEMENT_QUESTIONS;
}

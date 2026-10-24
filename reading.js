/**
 * READING CONTROLLER: Random passages, Question Evaluation, Feedback & XP Gamification
 */

document.addEventListener('DOMContentLoaded', () => {
  initReadingModule();
});

let currentPassageIndex = -1;
let userAnswers = {};

function initReadingModule() {
  const newBtn = document.getElementById('new-passage-btn');
  if (newBtn) {
    newBtn.addEventListener('click', loadRandomPassage);
  }
  loadRandomPassage();
}

function loadRandomPassage() {
  if (!window.READING_PASSAGES || window.READING_PASSAGES.length === 0) {
    document.getElementById('passage-container').innerHTML = '<p class="text-slate-500">Chưa có bài đọc nào.</p>';
    return;
  }

  // Chọn ngẫu nhiên không trùng với bài hiện tại nếu danh sách > 1
  let nextIndex = Math.floor(Math.random() * window.READING_PASSAGES.length);
  if (window.READING_PASSAGES.length > 1 && nextIndex === currentPassageIndex) {
    nextIndex = (nextIndex + 1) % window.READING_PASSAGES.length;
  }
  currentPassageIndex = nextIndex;
  userAnswers = {};

  const passage = window.READING_PASSAGES[currentPassageIndex];

  // Update badge count
  const countEl = document.getElementById('passage-count');
  if (countEl) {
    countEl.textContent = `Bài ${currentPassageIndex + 1}/${window.READING_PASSAGES.length} • Trình độ ${passage.level}`;
  }

  // Render Passage
  const container = document.getElementById('passage-container');
  container.innerHTML = `
    <div class="p-6 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/60">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>📖</span> ${passage.title}
        </h3>
        <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/60 dark:text-yellow-300">
          ${passage.level}
        </span>
      </div>
      <div class="text-slate-700 dark:text-slate-300 text-base leading-relaxed tracking-wide space-y-3 font-normal">
        ${passage.text.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('')}
      </div>
    </div>
  `;

  // Render Questions
  renderQuestions(passage.questions);

  // Clear Summary
  document.getElementById('result-summary').innerHTML = '';
}

function renderQuestions(questions) {
  const container = document.getElementById('questions-container');
  if (!questions || questions.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = questions.map((q, qIndex) => `
    <div class="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40" id="question-card-${qIndex}">
      <p class="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-3 flex items-start gap-2">
        <span class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 flex items-center justify-center text-xs shrink-0 mt-0.5">
          ${qIndex + 1}
        </span>
        <span>${q.question}</span>
      </p>
      <div class="grid grid-cols-1 gap-2.5">
        ${q.options.map((opt, optIndex) => `
          <button type="button" 
                  onclick="selectOption(${qIndex}, ${optIndex})"
                  id="opt-${qIndex}-${optIndex}"
                  class="quiz-option w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-between">
            <span>${opt}</span>
            <span class="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center text-xs font-bold shrink-0"></span>
          </button>
        `).join('')}
      </div>
      <div id="feedback-${qIndex}" class="hidden mt-3 p-3 rounded-xl text-xs sm:text-sm"></div>
    </div>
  `).join('') + `
    <div class="text-center pt-2">
      <button onclick="submitAnswers()" id="submit-btn" class="px-8 py-3.5 rounded-2xl bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 hover:shadow-indigo-600/50 hover:-translate-y-0.5 transition-all">
        Nộp bài kiểm tra & Nhận điểm XP
      </button>
    </div>
  `;
}

function selectOption(qIndex, optIndex) {
  userAnswers[qIndex] = optIndex;

  const passage = window.READING_PASSAGES[currentPassageIndex];
  const q = passage.questions[qIndex];

  // Bỏ chọn tất cả option của câu này
  for (let i = 0; i < q.options.length; i++) {
    const btn = document.getElementById(`opt-${qIndex}-${i}`);
    if (btn) {
      btn.classList.remove('selected', 'border-indigo-600', 'bg-indigo-50', 'dark:bg-indigo-950/40');
    }
  }

  // Đánh dấu option được chọn
  const activeBtn = document.getElementById(`opt-${qIndex}-${optIndex}`);
  if (activeBtn) {
    activeBtn.classList.add('selected', 'border-indigo-600', 'bg-indigo-50', 'dark:bg-indigo-950/40');
  }
}

function submitAnswers() {
  const passage = window.READING_PASSAGES[currentPassageIndex];
  if (!passage || !passage.questions) return;

  const total = passage.questions.length;
  let correctCount = 0;

  passage.questions.forEach((q, qIndex) => {
    const selected = userAnswers[qIndex];
    const feedbackEl = document.getElementById(`feedback-${qIndex}`);

    // Khóa các nút
    for (let i = 0; i < q.options.length; i++) {
      const btn = document.getElementById(`opt-${qIndex}-${i}`);
      if (btn) btn.disabled = true;
    }

    if (selected === q.correct) {
      correctCount++;
      const optBtn = document.getElementById(`opt-${qIndex}-${selected}`);
      if (optBtn) optBtn.classList.add('correct');

      if (feedbackEl) {
        feedbackEl.className = 'mt-3 p-3 rounded-xl text-xs sm:text-sm bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 block';
        feedbackEl.innerHTML = `<strong>Chính xác!</strong> ${q.explanation || ''}`;
      }
    } else {
      if (selected !== undefined) {
        const wrongBtn = document.getElementById(`opt-${qIndex}-${selected}`);
        if (wrongBtn) wrongBtn.classList.add('incorrect');
      }
      const correctBtn = document.getElementById(`opt-${qIndex}-${q.correct}`);
      if (correctBtn) correctBtn.classList.add('correct');

      if (feedbackEl) {
        feedbackEl.className = 'mt-3 p-3 rounded-xl text-xs sm:text-sm bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-800 block';
        feedbackEl.innerHTML = `<strong>Chưa đúng!</strong> Đáp án đúng là: <em>${q.options[q.correct]}</em>. ${q.explanation || ''}`;
      }
    }
  });

  // Ẩn nút nộp bài
  const submitBtn = document.getElementById('submit-btn');
  if (submitBtn) submitBtn.style.display = 'none';

  // Cộng XP nếu làm đúng
  const earnedXP = correctCount * 15;
  if (earnedXP > 0 && window.appStorage) {
    window.appStorage.addXP(earnedXP);
    if (typeof updateHeaderStats === 'function') {
      updateHeaderStats();
    }
  }

  // Render Result Summary
  const summaryEl = document.getElementById('result-summary');
  const percent = Math.round((correctCount / total) * 100);
  summaryEl.innerHTML = `
    <div class="p-6 rounded-2xl text-center bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-200 dark:border-indigo-900/60">
      <h4 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        ${percent >= 80 ? '🎉 Xuất sắc!' : (percent >= 50 ? '👏 Rất tốt!' : '💪 Hãy cố gắng ở bài tiếp theo!')}
      </h4>
      <p class="text-slate-600 dark:text-slate-300 text-sm mb-4">
        Bạn đã trả lời đúng <strong>${correctCount}/${total}</strong> câu (${percent}%).
        ${earnedXP > 0 ? `<span class="text-amber-600 font-bold ml-1">+${earnedXP} XP thưởng!</span>` : ''}
      </p>
      <button onclick="loadRandomPassage()" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-md shadow-indigo-600/30 hover:bg-indigo-700 transition-all">
        🔄 Luyện Đoạn Văn Khác
      </button>
    </div>
  `;
}

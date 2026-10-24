/**
 * PLACEMENT TEST CONTROLLER: Quản lý bài kiểm tra xếp lớp chuẩn CEFR
 */

let currentQuestionIndex = 0;
let userAnswers = {};
let isSubmitted = false;

document.addEventListener('DOMContentLoaded', () => {
  initPlacementTest();
});

function initPlacementTest() {
  const container = document.getElementById('test-container');
  if (!container || !window.PLACEMENT_QUESTIONS) return;

  renderQuestion();
  updateProgress();
}

function updateProgress() {
  const total = window.PLACEMENT_QUESTIONS.length;
  const progressPercent = Math.round(((currentQuestionIndex) / total) * 100);
  
  const progressBar = document.getElementById('test-progress-bar');
  if (progressBar) progressBar.style.width = `${progressPercent}%`;

  const questionCounter = document.getElementById('question-counter');
  if (questionCounter) questionCounter.textContent = `Câu hỏi ${currentQuestionIndex + 1} / ${total}`;
}

function renderQuestion() {
  const container = document.getElementById('test-content');
  if (!container) return;

  const q = window.PLACEMENT_QUESTIONS[currentQuestionIndex];
  const selectedOption = userAnswers[currentQuestionIndex];

  container.innerHTML = `
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm transition-all duration-300">
      <div class="flex items-center justify-between mb-4">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
          Cấp độ câu hỏi: ${q.level}
        </span>
        <button onclick="playPronounce('${q.question.replace(/'/g, "\\'")}', false, this)" class="p-2 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" title="Nghe câu hỏi">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
        </button>
      </div>

      <h2 class="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white mb-6 leading-snug">
        ${q.question}
      </h2>

      <div class="space-y-3 mb-8">
        ${q.options.map((opt, idx) => `
          <button 
            type="button" 
            onclick="selectOption(${idx})" 
            class="quiz-option w-full text-left p-4 rounded-xl border-2 flex items-center justify-between font-medium text-slate-700 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 ${selectedOption === idx ? 'selected !border-indigo-600 !bg-indigo-50 dark:!bg-indigo-950/50 dark:!border-indigo-500' : 'border-slate-200 dark:border-slate-700'}">
            <span class="flex items-center gap-3">
              <span class="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${selectedOption === idx ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}">
                ${String.fromCharCode(65 + idx)}
              </span>
              <span>${opt}</span>
            </span>
            ${selectedOption === idx ? '<svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>' : ''}
          </button>
        `).join('')}
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
        <button 
          onclick="prevQuestion()" 
          ${currentQuestionIndex === 0 ? 'disabled class="opacity-40 cursor-not-allowed"' : ''}
          class="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          ← Câu trước
        </button>

        ${currentQuestionIndex === window.PLACEMENT_QUESTIONS.length - 1 ? `
          <button 
            onclick="submitTest()" 
            class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-lg shadow-emerald-600/30 hover:opacity-95 transition-all">
            Nộp bài & Xem kết quả 🎉
          </button>
        ` : `
          <button 
            onclick="nextQuestion()" 
            class="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30 hover:bg-indigo-700 transition-all">
            Câu tiếp theo →
          </button>
        `}
      </div>
    </div>
  `;
}

function selectOption(index) {
  userAnswers[currentQuestionIndex] = index;
  renderQuestion();
}

function nextQuestion() {
  if (userAnswers[currentQuestionIndex] === undefined) {
    window.showToast('Vui lòng chọn một đáp án trước khi tiếp tục!', 'warning');
    return;
  }
  if (currentQuestionIndex < window.PLACEMENT_QUESTIONS.length - 1) {
    currentQuestionIndex++;
    updateProgress();
    renderQuestion();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    updateProgress();
    renderQuestion();
  }
}

function submitTest() {
  if (userAnswers[currentQuestionIndex] === undefined) {
    window.showToast('Vui lòng chọn một đáp án cho câu hỏi này!', 'warning');
    return;
  }

  // Tính điểm theo trọng số chuẩn CEFR
  let totalScore = 0;
  let correctCount = 0;
  let maxWeight = 0;

  window.PLACEMENT_QUESTIONS.forEach((q, idx) => {
    maxWeight += q.weight;
    if (userAnswers[idx] === q.correct) {
      correctCount++;
      totalScore += q.weight;
    }
  });

  // Xác định Level
  let calculatedLevel = 'A1';
  if (totalScore >= 38) calculatedLevel = 'C2';
  else if (totalScore >= 30) calculatedLevel = 'C1';
  else if (totalScore >= 20) calculatedLevel = 'B2';
  else if (totalScore >= 12) calculatedLevel = 'B1';
  else if (totalScore >= 6) calculatedLevel = 'A2';
  else calculatedLevel = 'A1';

  // Lưu vào LocalStorage
  if (window.appStorage) {
    window.appStorage.setPlacementResult(calculatedLevel, correctCount, window.PLACEMENT_QUESTIONS.length);
  }

  // Hiển thị kết quả chi tiết
  showResultModal(calculatedLevel, correctCount, totalScore, maxWeight);
}

function showResultModal(level, correctCount, score, maxWeight) {
  const container = document.getElementById('test-content');
  if (!container) return;

  const levelInfo = window.CEFR_LEVELS[level] || window.CEFR_LEVELS['A1'];

  container.innerHTML = `
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl text-center max-w-2xl mx-auto animate-fadeIn">
      <div class="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl shadow-lg shadow-indigo-500/20" style="background-color: ${levelInfo.color}20; color: ${levelInfo.color};">
        🏆
      </div>

      <span class="inline-block text-xs uppercase tracking-widest font-extrabold px-3 py-1 rounded-full mb-3 ${levelInfo.badgeClass}">
        Kết quả đánh giá năng lực
      </span>

      <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
        Trình độ đề xuất: <span style="color: ${levelInfo.color}">${levelInfo.name}</span>
      </h2>

      <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base mb-6 max-w-md mx-auto">
        ${levelInfo.canDo}
      </p>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
        <div>
          <span class="block text-xs text-slate-400">Số câu đúng</span>
          <span class="text-xl font-bold text-slate-900 dark:text-white">${correctCount} / ${window.PLACEMENT_QUESTIONS.length}</span>
        </div>
        <div>
          <span class="block text-xs text-slate-400">Điểm trọng số</span>
          <span class="text-xl font-bold text-slate-900 dark:text-white">${score} / ${maxWeight}</span>
        </div>
        <div class="col-span-2 sm:col-span-1">
          <span class="block text-xs text-slate-400">Thưởng EXP</span>
          <span class="text-xl font-bold text-emerald-600">+100 XP ⚡</span>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <a href="lessons.html?level=${level}" class="px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-all">
          Bắt đầu học ngay Cấp độ ${level} →
        </a>
        <a href="roadmap.html" class="px-6 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
          Xem lại toàn bộ Lộ trình
        </a>
      </div>
    </div>
  `;

  // Cập nhật điểm trên navbar
  if (typeof updateHeaderStats === 'function') {
    updateHeaderStats();
  }
}

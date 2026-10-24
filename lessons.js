/**
 * LESSONS CONTROLLER: Quản lý bài học tương tác, 4 Tab chuyên sâu:
 * 1. Lý thuyết ngữ pháp chi tiết
 * 2. Từ vựng & Phát âm bản xứ
 * 3. Trắc nghiệm Quiz phản hồi tức thì
 * 4. Luyện Nghe & Điền Từ (Listening Dictation Practice)
 */

let activeLevel = 'A1';
let activeLessonId = null;
let currentTab = 'theory'; // 'theory' | 'vocab' | 'quiz' | 'listening'
let quizState = {
  answers: {},
  submitted: false
};
let listeningState = {
  currentIndex: 0,
  userAnswer: '',
  checked: false,
  isCorrect: false,
  showHint: false,
  results: {} // map of index -> { isCorrect: bool, answer: string }
};

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const paramLevel = urlParams.get('level');
  if (paramLevel && window.CEFR_LEVELS && window.CEFR_LEVELS[paramLevel.toUpperCase()]) {
    activeLevel = paramLevel.toUpperCase();
  } else if (window.appStorage && window.appStorage.state.userLevel) {
    activeLevel = window.appStorage.state.userLevel;
  }

  const paramLesson = urlParams.get('lesson');
  if (paramLesson) {
    activeLessonId = paramLesson;
  }

  initLessonsPage();
});

function initLessonsPage() {
  renderLevelTabs();
  loadLessonsForLevel(activeLevel);
}

function renderLevelTabs() {
  const container = document.getElementById('level-selector-tabs');
  if (!container || !window.CEFR_LEVELS) return;

  const levels = Object.keys(window.CEFR_LEVELS);
  container.innerHTML = levels.map(lvl => {
    const info = window.CEFR_LEVELS[lvl];
    const isActive = lvl === activeLevel;
    return `
      <button 
        onclick="switchLevel('${lvl}')"
        class="px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap shadow-sm ${
          isActive 
            ? 'bg-indigo-600 text-white shadow-indigo-600/20' 
            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
        }">
        <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${info.color}"></span>
        <span>${info.shortName}</span>
      </button>
    `;
  }).join('');
}

function switchLevel(lvl) {
  activeLevel = lvl;
  activeLessonId = null;
  quizState = { answers: {}, submitted: false };
  listeningState = { userAnswer: '', checked: false, isCorrect: false, showHint: false };
  renderLevelTabs();
  loadLessonsForLevel(lvl);
}

function loadLessonsForLevel(lvl) {
  const listContainer = document.getElementById('lessons-list');
  const filtered = window.LESSONS_DATA.filter(l => l.level === lvl);

  if (!filtered || filtered.length === 0) {
    if (listContainer) {
      listContainer.innerHTML = `
        <div class="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
          <p class="text-slate-500">Các bài học của cấp độ ${lvl} đang được biên soạn thêm.</p>
        </div>
      `;
    }
    const viewer = document.getElementById('lesson-viewer');
    if (viewer) viewer.innerHTML = '';
    return;
  }

  if (!activeLessonId || !filtered.some(l => l.id === activeLessonId)) {
    activeLessonId = filtered[0].id;
  }

  // Render danh sách bài học bên cột trái
  if (listContainer) {
    listContainer.innerHTML = filtered.map(lesson => {
      const isSelected = lesson.id === activeLessonId;
      const isDone = window.appStorage ? window.appStorage.isLessonCompleted(lesson.id) : false;
      return `
        <div 
          onclick="selectLesson('${lesson.id}')"
          class="p-4 rounded-2xl cursor-pointer transition-all border ${
            isSelected 
              ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/40 shadow-sm' 
              : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
          }">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[11px] font-bold px-2 py-0.5 rounded-md ${window.CEFR_LEVELS[lesson.level].badgeClass}">
              ${lesson.level}
            </span>
            <div class="flex items-center gap-1.5 text-xs text-slate-400">
              <span>⏱ ${lesson.duration}</span>
              ${isDone ? '<span class="text-emerald-600 dark:text-emerald-400 font-bold ml-1">✓ Đã xong</span>' : ''}
            </div>
          </div>
          <h4 class="font-bold text-sm text-slate-800 dark:text-slate-100 line-clamp-1 mb-1">
            ${lesson.title}
          </h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            ${lesson.description}
          </p>
        </div>
      `;
    }).join('');
  }

  renderLessonDetail();
}

function selectLesson(id) {
  activeLessonId = id;
  quizState = { answers: {}, submitted: false };
  listeningState = { userAnswer: '', checked: false, isCorrect: false, showHint: false };
  loadLessonsForLevel(activeLevel);
}

function switchTab(tab) {
  currentTab = tab;
  renderLessonDetail();
}

function renderLessonDetail() {
  const container = document.getElementById('lesson-viewer');
  if (!container) return;

  const lesson = window.LESSONS_DATA.find(l => l.id === activeLessonId);
  if (!lesson) return;

  const isCompleted = window.appStorage ? window.appStorage.isLessonCompleted(lesson.id) : false;

  container.innerHTML = `
    <div class="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
      
      <!-- Lesson Header Banner -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs font-bold px-3 py-1 rounded-full ${window.CEFR_LEVELS[lesson.level].badgeClass}">
              Cấp độ ${lesson.level}
            </span>
            <span class="text-xs text-slate-400 font-medium">⏱ ${lesson.duration}</span>
            <span class="text-xs text-amber-600 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-full">⚡ +${lesson.xp} XP</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">${lesson.title}</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">${lesson.description}</p>
        </div>
        ${isCompleted ? `
          <div class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 whitespace-nowrap">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            Bài học đã hoàn thành
          </div>
        ` : ''}
      </div>

      <!-- Navigation Tabs (4 Chuyên Mục Học Tập) -->
      <div class="flex border-b border-slate-100 dark:border-slate-800 my-6 gap-2 sm:gap-6 text-xs sm:text-sm font-semibold overflow-x-auto pb-1 scrollbar-none">
        <button 
          onclick="switchTab('theory')" 
          class="pb-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${currentTab === 'theory' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}">
          <span>📖 Lý thuyết & Mẹo nhớ</span>
        </button>
        <button 
          onclick="switchTab('vocab')" 
          class="pb-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${currentTab === 'vocab' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}">
          <span>🔊 Từ vựng & Âm thanh (${lesson.vocabulary ? lesson.vocabulary.length : 0})</span>
        </button>
        <button 
          onclick="switchTab('quiz')" 
          class="pb-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${currentTab === 'quiz' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}">
          <span>✍️ Trắc nghiệm (${lesson.quiz ? lesson.quiz.length : 0})</span>
        </button>
        <button 
          onclick="switchTab('listening')" 
          class="pb-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${currentTab === 'listening' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}">
          <span>🎧 Luyện Nghe & Điền Từ</span>
        </button>
      </div>

      <!-- Tab Content Area -->
      <div class="tab-body">
        ${currentTab === 'theory' ? renderTheoryTab(lesson) : ''}
        ${currentTab === 'vocab' ? renderVocabTab(lesson) : ''}
        ${currentTab === 'quiz' ? renderQuizTab(lesson) : ''}
        ${currentTab === 'listening' ? renderListeningTab(lesson) : ''}
      </div>
    </div>
  `;
}

function renderTheoryTab(lesson) {
  return `
    <div class="theory-content">
      ${lesson.theory}
      <div class="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
        <button onclick="switchTab('vocab')" class="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold text-sm shadow-md shadow-indigo-600/30 hover:bg-indigo-700 transition-colors">
          Tiếp tục: Học Từ vựng & Phát âm →
        </button>
      </div>
    </div>
  `;
}

function renderVocabTab(lesson) {
  if (!lesson.vocabulary || lesson.vocabulary.length === 0) {
    return `<p class="text-slate-400 text-sm">Bài học này chưa có danh sách từ vựng riêng.</p>`;
  }

  return `
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      ${lesson.vocabulary.map(v => {
        return `
          <div class="p-5 rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:shadow-md transition-all">
            <div class="flex items-start justify-between">
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-lg font-bold text-slate-900 dark:text-white">${v.word}</span>
                  <span class="text-xs font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-lg">${v.ipa}</span>
                  <span class="text-[10px] text-slate-400 px-2 py-0.5 rounded bg-slate-200/60 dark:bg-slate-700/60">${v.category || 'Vocabulary'}</span>
                </div>
                <p class="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-2">${v.meaning}</p>
              </div>

              <!-- Pronunciation Action Buttons -->
              <div class="flex items-center gap-1.5 ml-2">
                <button 
                  onclick="playPronounce('${v.word.replace(/'/g, "\\'")}', false, this)" 
                  title="Nghe phát âm chuẩn (1.0x)"
                  class="p-2.5 rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 hover:scale-105 transition-transform">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                </button>
                <button 
                  onclick="playPronounce('${v.word.replace(/'/g, "\\'")}', true, this)" 
                  title="Nghe chậm (0.7x)"
                  class="px-2 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  0.7x
                </button>
              </div>
            </div>

            <!-- Example sentence -->
            <div class="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span class="italic">"${v.example}"</span>
              <button onclick="playPronounce('${v.example.replace(/'/g, "\\'")}', false, this)" title="Nghe câu ví dụ" class="text-slate-400 hover:text-indigo-600 ml-2">
                🔊
              </button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
    
    <div class="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center flex-wrap gap-4">
      <a href="flashcards.html?level=${lesson.level}" class="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
        🗂 Luyện thẻ Flashcard 3D bài này →
      </a>
      <button onclick="switchTab('quiz')" class="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold text-sm shadow-md shadow-indigo-600/30 hover:bg-indigo-700 transition-colors">
        Làm bài tập Quiz củng cố →
      </button>
    </div>
  `;
}

function renderQuizTab(lesson) {
  if (!lesson.quiz || lesson.quiz.length === 0) {
    return `<p class="text-slate-400 text-sm">Bài học này chưa có câu hỏi trắc nghiệm.</p>`;
  }

  const isSubmitted = quizState.submitted;

  return `
    <div class="space-y-6">
      ${lesson.quiz.map((q, qIndex) => {
        const userAnswer = quizState.answers[qIndex];
        return `
          <div class="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <div class="flex items-start justify-between mb-4">
              <h4 class="font-bold text-slate-900 dark:text-white text-base">
                Câu ${qIndex + 1}: ${q.question}
              </h4>
              <button onclick="playPronounce('${q.question.replace(/'/g, "\\'")}', false, this)" class="text-slate-400 hover:text-indigo-600 p-1" title="Nghe câu hỏi">
                🔊
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${q.options.map((opt, optIndex) => {
                let statusClass = 'border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200';
                if (isSubmitted) {
                  if (optIndex === q.correct) {
                    statusClass = 'correct !border-emerald-500 !bg-emerald-50 dark:!bg-emerald-950/60 font-bold';
                  } else if (userAnswer === optIndex && optIndex !== q.correct) {
                    statusClass = 'incorrect !border-red-500 !bg-red-50 dark:!bg-red-950/60';
                  }
                } else if (userAnswer === optIndex) {
                  statusClass = 'selected !border-indigo-600 !bg-indigo-50 dark:!bg-indigo-950/40';
                }

                return `
                  <button 
                    ${isSubmitted ? 'disabled' : ''}
                    onclick="answerLessonQuiz(${qIndex}, ${optIndex})"
                    class="quiz-option text-left p-3.5 rounded-xl border text-sm font-medium transition-all ${statusClass}">
                    <span class="inline-block w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-700 text-center leading-6 text-xs font-bold mr-2 text-slate-600 dark:text-slate-300">
                      ${String.fromCharCode(65 + optIndex)}
                    </span>
                    ${opt}
                  </button>
                `;
              }).join('')}
            </div>

            ${isSubmitted ? `
              <div class="mt-4 p-4 rounded-xl text-xs sm:text-sm leading-relaxed ${userAnswer === q.correct ? 'bg-emerald-100/70 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300' : 'bg-red-100/70 text-red-900 dark:bg-red-950/50 dark:text-red-300'}">
                <strong>${userAnswer === q.correct ? '✓ Chính xác!' : '✕ Chưa đúng!'}</strong> ${q.explanation}
              </div>
            ` : ''}
          </div>
        `;
      }).join('')}

      <!-- Submit / Retry Area -->
      <div class="pt-4 flex items-center justify-between flex-wrap gap-4">
        ${!isSubmitted ? `
          <button onclick="submitLessonQuiz()" class="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 shadow-md shadow-indigo-600/30 transition-all">
            Nộp bài & Kiểm tra kết quả
          </button>
        ` : `
          <div class="flex items-center gap-4 flex-wrap">
            <button onclick="retryLessonQuiz()" class="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              Làm lại bài này 🔄
            </button>
            <span class="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              Điểm số: ${calculateScore(lesson)} / ${lesson.quiz.length}
            </span>
            <button onclick="switchTab('listening')" class="px-5 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-xs sm:text-sm hover:bg-teal-700 transition-colors">
              Luyện tiếp: Nghe & Điền từ 🎧 →
            </button>
          </div>
        `}
      </div>
    </div>
  `;
}

function answerLessonQuiz(qIndex, optIndex) {
  quizState.answers[qIndex] = optIndex;
  renderLessonDetail();
}

function calculateScore(lesson) {
  let score = 0;
  lesson.quiz.forEach((q, idx) => {
    if (quizState.answers[idx] === q.correct) score++;
  });
  return score;
}

function submitLessonQuiz() {
  const lesson = window.LESSONS_DATA.find(l => l.id === activeLessonId);
  if (!lesson) return;

  const answeredCount = Object.keys(quizState.answers).length;
  if (answeredCount < lesson.quiz.length) {
    window.showToast('Vui lòng trả lời hết tất cả các câu hỏi!', 'warning');
    return;
  }

  quizState.submitted = true;
  const score = calculateScore(lesson);

  if (window.appStorage) {
    window.appStorage.completeLesson(lesson.id, score, lesson.quiz.length);
    window.appStorage.addXP(lesson.xp);
  }

  if (typeof updateHeaderStats === 'function') {
    updateHeaderStats();
  }

  window.showToast(`Tuyệt vời! Bạn nhận được +${lesson.xp} XP 🎉`, 'success');
  renderLessonDetail();
  loadLessonsForLevel(activeLevel);
}

function retryLessonQuiz() {
  quizState = { answers: {}, submitted: false };
  renderLessonDetail();
}

// ================= TAB 4: LUYỆN NGHE & ĐIỀN TỪ (DICTATION - ĐA BÀI TẬP) =================
function getListeningItems(lesson) {
  if (lesson.listeningPractices && Array.isArray(lesson.listeningPractices) && lesson.listeningPractices.length > 0) {
    return lesson.listeningPractices;
  }
  if (lesson.listeningPractice) {
    return [lesson.listeningPractice];
  }
  return [];
}

function renderListeningTab(lesson) {
  const items = getListeningItems(lesson);
  if (items.length === 0) {
    return `
      <div class="text-center py-10 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
        <p class="text-slate-500">Bài tập nghe điền từ của bài này đang được biên soạn thêm.</p>
      </div>
    `;
  }

  const curIdx = Math.min(listeningState.currentIndex || 0, items.length - 1);
  const p = items[curIdx];
  const itemResult = listeningState.results[curIdx] || { checked: false, isCorrect: false };

  return `
    <div class="bg-slate-50/70 dark:bg-slate-800/40 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 max-w-2xl mx-auto">
      
      <!-- Top header & Pagination -->
      <div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/60 dark:border-slate-700/60">
        <div>
          <span class="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950/80 dark:text-teal-300">
            Luyện nghe chính tả (Dictation)
          </span>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mt-1">Luyện Nghe & Bắt Âm Từ Vựng</h3>
        </div>
        <div class="text-right">
          <span class="text-xs font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-800">
            Câu ${curIdx + 1} / ${items.length}
          </span>
        </div>
      </div>

      <!-- Audio Player Controls -->
      <div class="flex items-center justify-center gap-3 mb-6">
        <button 
          onclick="playPronounce('${p.audioText.replace(/'/g, "\\'")}', false, this)" 
          class="px-5 py-3 rounded-2xl bg-indigo-600 text-white font-bold text-sm shadow-md shadow-indigo-600/30 hover:bg-indigo-700 flex items-center gap-2">
          <span>🔊 Nghe câu gốc (1.0x)</span>
        </button>
        <button 
          onclick="playPronounce('${p.audioText.replace(/'/g, "\\'")}', true, this)" 
          class="px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5">
          <span>🐢 Nghe chậm (0.65x)</span>
        </button>
      </div>

      <!-- Sentence with Blank -->
      <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center mb-6 shadow-sm">
        <p class="text-lg sm:text-xl font-medium text-slate-800 dark:text-slate-100 leading-relaxed font-sans">
          "${p.sentenceWithBlank}"
        </p>
      </div>

      <!-- Input box for user answer -->
      <div class="flex flex-col sm:flex-row items-center gap-3 mb-4">
        <input 
          type="text" 
          id="listening-input"
          value="${listeningState.userAnswer}"
          oninput="listeningState.userAnswer = this.value"
          placeholder="Nhập từ bạn nghe được vào đây..."
          class="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-base focus:border-indigo-600 focus:outline-none transition-colors"
          onkeydown="if(event.key === 'Enter') checkListeningAnswer()"
        />
        <button 
          onclick="checkListeningAnswer()" 
          class="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-teal-600 text-white font-bold text-sm hover:bg-teal-700 shadow-md shadow-teal-600/30 whitespace-nowrap transition-colors">
          Kiểm tra đáp án
        </button>
      </div>

      <!-- Result Feedback -->
      ${itemResult.checked ? `
        <div class="p-4 rounded-2xl mb-4 text-sm font-medium ${itemResult.isCorrect ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-red-100 text-red-900 dark:bg-red-950/60 dark:text-red-300'}">
          ${itemResult.isCorrect ? `
            <div class="flex items-center gap-2">
              <span>🎉 <strong>Chính xác!</strong> Từ khóa đúng là: <span class="font-bold underline">${p.missingWord}</span> (+15 XP)</span>
            </div>
          ` : `
            <div>
              <span>✕ Chưa chính xác, hãy bấm nút "Nghe chậm 0.65x" và thử lại nhé!</span>
            </div>
          `}
        </div>
      ` : ''}

      <!-- Bottom Navigation: Prev / Next / Hint -->
      <div class="flex items-center justify-between text-xs sm:text-sm pt-4 border-t border-slate-200/60 dark:border-slate-700/60 flex-wrap gap-2">
        <button 
          onclick="prevListeningItem()" 
          ${curIdx === 0 ? 'disabled class="opacity-40 cursor-not-allowed"' : ''}
          class="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          ← Câu trước
        </button>

        <button onclick="toggleListeningHint()" class="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
          ${listeningState.showHint ? 'Ẩn gợi ý' : '💡 Xem gợi ý'}
        </button>

        <button 
          onclick="nextListeningItem()" 
          ${curIdx >= items.length - 1 ? 'disabled class="opacity-40 cursor-not-allowed"' : ''}
          class="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition-colors">
          Câu tiếp theo →
        </button>
      </div>

      ${listeningState.showHint ? `
        <div class="mt-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 text-xs italic border border-amber-200/60 dark:border-amber-900/60">
          💡 Gợi ý: ${p.hint}
        </div>
      ` : ''}
    </div>
  `;
}

function checkListeningAnswer() {
  const lesson = window.LESSONS_DATA.find(l => l.id === activeLessonId);
  if (!lesson) return;
  const items = getListeningItems(lesson);
  if (items.length === 0) return;

  const curIdx = listeningState.currentIndex || 0;
  const p = items[curIdx];
  const target = p.missingWord.trim().toLowerCase();
  const input = (listeningState.userAnswer || '').trim().toLowerCase();

  const isCorrect = (input === target);
  listeningState.results[curIdx] = { checked: true, isCorrect };

  if (isCorrect) {
    if (window.appStorage) {
      window.appStorage.addXP(15);
    }
    if (typeof updateHeaderStats === 'function') {
      updateHeaderStats();
    }
    window.showToast('Xuất sắc! Bạn nhận được +15 XP từ bài nghe 🎧', 'success');
  } else {
    window.showToast('Chưa đúng rồi! Thử bấm nghe chậm 0.65x nhé.', 'warning');
  }

  renderLessonDetail();
}

function nextListeningItem() {
  const lesson = window.LESSONS_DATA.find(l => l.id === activeLessonId);
  if (!lesson) return;
  const items = getListeningItems(lesson);
  if (listeningState.currentIndex < items.length - 1) {
    listeningState.currentIndex++;
    listeningState.userAnswer = '';
    listeningState.showHint = false;
    renderLessonDetail();
  }
}

function prevListeningItem() {
  if (listeningState.currentIndex > 0) {
    listeningState.currentIndex--;
    listeningState.userAnswer = '';
    listeningState.showHint = false;
    renderLessonDetail();
  }
}

function toggleListeningHint() {
  listeningState.showHint = !listeningState.showHint;
  renderLessonDetail();
}

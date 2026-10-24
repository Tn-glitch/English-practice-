/**
 * FLASHCARDS CONTROLLER: 3D Spaced-Repetition Vocabulary Cards
 */

let activeFlashcardLevel = 'A1';
let currentCardIndex = 0;
let flashcardList = [];

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const paramLevel = urlParams.get('level');
  if (paramLevel && window.CEFR_LEVELS && window.CEFR_LEVELS[paramLevel.toUpperCase()]) {
    activeFlashcardLevel = paramLevel.toUpperCase();
  }

  initFlashcards();
  setupKeyboardNavigation();
});

function initFlashcards() {
  renderFlashcardLevelFilter();
  loadFlashcardsForLevel(activeFlashcardLevel);
}

function renderFlashcardLevelFilter() {
  const container = document.getElementById('flashcard-level-tabs');
  if (!container || !window.CEFR_LEVELS) return;

  const levels = Object.keys(window.CEFR_LEVELS);
  container.innerHTML = levels.map(lvl => {
    const isActive = lvl === activeFlashcardLevel;
    const info = window.CEFR_LEVELS[lvl];
    return `
      <button 
        onclick="switchFlashcardLevel('${lvl}')"
        class="px-4 py-2 rounded-xl text-sm font-bold transition-all ${
          isActive 
            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
        }">
        ${info.shortName}
      </button>
    `;
  }).join('');
}

function switchFlashcardLevel(lvl) {
  activeFlashcardLevel = lvl;
  currentCardIndex = 0;
  renderFlashcardLevelFilter();
  loadFlashcardsForLevel(lvl);
}

function loadFlashcardsForLevel(lvl) {
  // Gom tất cả từ vựng của các bài học thuộc level này
  const lessons = window.LESSONS_DATA.filter(l => l.level === lvl);
  flashcardList = [];

  lessons.forEach(l => {
    if (l.vocabulary) {
      l.vocabulary.forEach(v => {
        flashcardList.push({
          ...v,
          lessonTitle: l.title,
          level: l.level
        });
      });
    }
  });

  currentCardIndex = 0;
  renderCard();
  updateFlashcardStats();
}

function renderCard() {
  const cardContainer = document.getElementById('flashcard-wrapper');
  if (!cardContainer) return;

  if (flashcardList.length === 0) {
    cardContainer.innerHTML = `
      <div class="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
        <p class="text-slate-500">Chưa có thẻ từ vựng nào cho cấp độ này.</p>
      </div>
    `;
    return;
  }

  const card = flashcardList[currentCardIndex];
  const isMastered = window.appStorage ? window.appStorage.isWordMastered(card.word) : false;

  cardContainer.innerHTML = `
    <div class="perspective-1000 w-full max-w-lg mx-auto h-96">
      <div id="flashcard-inner" class="flashcard-inner relative w-full h-full shadow-xl rounded-3xl cursor-pointer" onclick="flipCard()">
        
        <!-- Mặt trước (Front): Tiếng Anh, IPA, Nút nghe âm thanh -->
        <div class="flashcard-front bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border-2 ${isMastered ? 'border-emerald-500/80 shadow-emerald-500/10' : 'border-indigo-100 dark:border-slate-700'}">
          <div class="w-full flex items-center justify-between text-xs text-slate-400 mb-auto">
            <span class="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold">
              ${card.level} • ${card.category || 'Từ vựng'}
            </span>
            <span>${currentCardIndex + 1} / ${flashcardList.length}</span>
          </div>

          <div class="my-auto text-center">
            <h2 class="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              ${card.word}
            </h2>
            <div class="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-base bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 rounded-lg">
              <span>${card.ipa}</span>
              <button 
                onclick="event.stopPropagation(); playPronounce('${card.word.replace(/'/g, "\\'")}', false, this)" 
                class="hover:scale-110 transition-transform p-1" title="Phát âm chuẩn">
                🔊
              </button>
            </div>
          </div>

          <div class="w-full mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <span class="text-xs text-slate-400 flex items-center justify-center gap-1">
              <span>👆 Nhấn vào thẻ để xem nghĩa tiếng Việt & Ví dụ</span>
            </span>
          </div>
        </div>

        <!-- Mặt sau (Back): Nghĩa tiếng Việt, Câu ví dụ & Audio ví dụ -->
        <div class="flashcard-back bg-gradient-to-br from-indigo-900 to-slate-900 text-white border-2 border-indigo-600/50">
          <div class="w-full flex items-center justify-between text-xs text-indigo-200 mb-auto">
            <span class="font-semibold uppercase tracking-wider">Định nghĩa & Ngữ cảnh</span>
            <span>${currentCardIndex + 1} / ${flashcardList.length}</span>
          </div>

          <div class="my-auto text-center px-4">
            <h3 class="text-2xl sm:text-3xl font-extrabold text-amber-300 mb-4">
              ${card.meaning}
            </h3>
            <div class="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-slate-200 leading-relaxed text-left">
              <p class="font-medium mb-1">Ví dụ:</p>
              <p class="italic text-indigo-100">"${card.example}"</p>
              <div class="mt-2 flex justify-end">
                <button 
                  onclick="event.stopPropagation(); playPronounce('${card.example.replace(/'/g, "\\'")}', false, this)" 
                  class="px-2.5 py-1 rounded-lg bg-indigo-500/40 hover:bg-indigo-500/60 text-xs text-white flex items-center gap-1 transition-colors">
                  🔊 Nghe câu ví dụ
                </button>
              </div>
            </div>
          </div>

          <div class="w-full mt-auto pt-4 text-center">
            <span class="text-xs text-indigo-300">Nhấn lại để lật về mặt trước</span>
          </div>
        </div>

      </div>
    </div>
  `;
}

function flipCard() {
  const card = document.getElementById('flashcard-inner');
  if (card) {
    card.classList.toggle('flipped');
  }
}

function nextCard() {
  if (currentCardIndex < flashcardList.length - 1) {
    currentCardIndex++;
    renderCard();
    updateFlashcardStats();
  }
}

function prevCard() {
  if (currentCardIndex > 0) {
    currentCardIndex--;
    renderCard();
    updateFlashcardStats();
  }
}

function markCardMastery(status) {
  if (flashcardList.length === 0) return;
  const currentWord = flashcardList[currentCardIndex].word;

  if (window.appStorage) {
    if (status === 'mastered') {
      window.appStorage.state.flashcardMastery[currentWord] = true;
      window.appStorage.addXP(10);
      window.showToast(`Đã thuộc từ "${currentWord}"! +10 XP 🎉`, 'success');
    } else {
      window.appStorage.state.flashcardMastery[currentWord] = false;
      window.appStorage.saveState();
      window.showToast(`Đã đưa "${currentWord}" vào danh sách cần ôn lại!`, 'info');
    }
  }

  if (typeof updateHeaderStats === 'function') {
    updateHeaderStats();
  }

  // Tự động chuyển thẻ tiếp theo sau 300ms
  setTimeout(() => {
    if (currentCardIndex < flashcardList.length - 1) {
      nextCard();
    } else {
      renderCard();
      updateFlashcardStats();
    }
  }, 300);
}

function updateFlashcardStats() {
  const total = flashcardList.length;
  let masteredCount = 0;

  flashcardList.forEach(c => {
    if (window.appStorage && window.appStorage.isWordMastered(c.word)) {
      masteredCount++;
    }
  });

  const progressPercent = total > 0 ? Math.round((masteredCount / total) * 100) : 0;

  const bar = document.getElementById('flashcard-mastery-bar');
  if (bar) bar.style.width = `${progressPercent}%`;

  const text = document.getElementById('flashcard-mastery-text');
  if (text) text.textContent = `Đã thuộc ${masteredCount} / ${total} từ (${progressPercent}%)`;
}

function setupKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      flipCard();
    } else if (e.code === 'ArrowRight') {
      nextCard();
    } else if (e.code === 'ArrowLeft') {
      prevCard();
    }
  });
}

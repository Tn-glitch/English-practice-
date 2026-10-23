/**
 * READING.JS — Logic for the Reading Comprehension page.
 * Randomly selects a passage from READING_PASSAGES (reading-data.js),
 * renders it, handles answer selection, scoring and XP award.
 */

(function () {
  /* ── State ── */
  let currentPassage = null;
  let userAnswers = [];   // index of selected option per question, or null
  let submitted = false;

  /* ── DOM refs (resolved after DOMContentLoaded) ── */
  let passageContainer, questionsContainer, resultSummary, newBtn, levelFilter, passageCount;

  /* ── Helpers ── */
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function getRandomPassage(level) {
    const pool = level === 'all'
      ? READING_PASSAGES
      : READING_PASSAGES.filter(p => p.level === level);
    if (!pool.length) return READING_PASSAGES[Math.floor(Math.random() * READING_PASSAGES.length)];
    return pool[Math.floor(Math.random() * pool.length)];
  }

  /* ── Render passage ── */
  function renderPassage(passage) {
    currentPassage = passage;
    userAnswers = passage.questions.map(() => null);
    submitted = false;

    // Level badge colour
    const levelColors = {
      A1: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300',
      A2: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300',
      B1: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300',
      B2: 'bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-300',
      C1: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300',
      C2: 'bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-300',
    };
    const badgeCls = levelColors[passage.level] || 'bg-slate-100 text-slate-700';

    passageContainer.innerHTML = `
      <div class="mb-3 flex items-center gap-3">
        <span class="text-xs font-bold px-3 py-1 rounded-full ${badgeCls}">${passage.level}</span>
        <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">${passage.title}</h2>
      </div>
      <div class="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 sm:p-6 text-base leading-relaxed text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
        ${passage.text}
      </div>
    `;

    // Update counter
    const idx = READING_PASSAGES.findIndex(p => p.id === passage.id);
    passageCount.textContent = `Đoạn văn ${idx + 1} / ${READING_PASSAGES.length}`;

    renderQuestions(passage);
    resultSummary.innerHTML = '';
  }

  /* ── Render questions ── */
  function renderQuestions(passage) {
    questionsContainer.innerHTML = passage.questions.map((q, qi) => `
      <div class="question-block mt-6" data-qi="${qi}">
        <p class="font-bold text-slate-800 dark:text-slate-100 mb-3">
          <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold mr-2">${qi + 1}</span>
          ${q.question}
        </p>
        <div class="grid gap-2">
          ${q.options.map((opt, oi) => `
            <button
              class="option-btn text-left px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700
                     bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium
                     hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all"
              data-qi="${qi}" data-oi="${oi}">
              <span class="font-bold text-indigo-500 mr-2">${String.fromCharCode(65 + oi)}.</span>${opt}
            </button>
          `).join('')}
        </div>
        <div class="explanation hidden mt-3 text-sm rounded-xl px-4 py-3" id="exp-${qi}"></div>
      </div>
    `).join('') + `
      <div class="mt-8 flex flex-col sm:flex-row gap-3">
        <button id="submit-btn"
          class="px-7 py-3 rounded-2xl bg-indigo-600 text-white font-bold text-sm shadow shadow-indigo-600/30 hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled>
          ✅ Nộp bài &amp; Xem kết quả
        </button>
        <button id="next-btn"
          class="px-7 py-3 rounded-2xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-300 dark:hover:bg-slate-600 transition-all">
          🔀 Đoạn văn mới
        </button>
      </div>
    `;

    // Attach option listeners
    questionsContainer.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (submitted) return;
        const qi = +btn.dataset.qi;
        const oi = +btn.dataset.oi;
        userAnswers[qi] = oi;

        // Highlight selected in this question group
        questionsContainer.querySelectorAll(`.option-btn[data-qi="${qi}"]`).forEach(b => {
          b.classList.remove('border-indigo-500', 'bg-indigo-50', 'dark:bg-indigo-950/40', 'font-bold');
        });
        btn.classList.add('border-indigo-500', 'bg-indigo-50', 'dark:bg-indigo-950/40', 'font-bold');

        // Enable submit when all answered
        const submitBtn = document.getElementById('submit-btn');
        if (userAnswers.every(a => a !== null)) {
          submitBtn.disabled = false;
        }
      });
    });

    // Submit
    document.getElementById('submit-btn').addEventListener('click', submitAnswers);

    // Next passage
    document.getElementById('next-btn').addEventListener('click', loadNew);
  }

  /* ── Submit & score ── */
  function submitAnswers() {
    if (submitted) return;
    submitted = true;
    document.getElementById('submit-btn').disabled = true;

    let correct = 0;

    currentPassage.questions.forEach((q, qi) => {
      const userAns = userAnswers[qi];
      const isCorrect = userAns === q.correct;
      if (isCorrect) correct++;

      // Color options
      questionsContainer.querySelectorAll(`.option-btn[data-qi="${qi}"]`).forEach(b => {
        const oi = +b.dataset.oi;
        b.disabled = true;
        if (oi === q.correct) {
          b.classList.remove('border-slate-200', 'dark:border-slate-700', 'hover:border-indigo-400');
          b.classList.add('border-green-500', 'bg-green-50', 'dark:bg-green-950/30', 'text-green-800', 'dark:text-green-200');
        } else if (oi === userAns && !isCorrect) {
          b.classList.remove('border-slate-200', 'dark:border-slate-700', 'border-indigo-500', 'bg-indigo-50');
          b.classList.add('border-red-500', 'bg-red-50', 'dark:bg-red-950/30', 'text-red-800', 'dark:text-red-200');
        }
      });

      // Show explanation
      const expDiv = document.getElementById(`exp-${qi}`);
      expDiv.classList.remove('hidden');
      expDiv.className = `explanation mt-3 text-sm rounded-xl px-4 py-3 ${
        isCorrect
          ? 'bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800'
          : 'bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
      }`;
      expDiv.innerHTML = `<strong>${isCorrect ? '✅ Đúng!' : '❌ Sai.'}</strong> ${q.explanation}`;
    });

    // Summary
    const total = currentPassage.questions.length;
    const pct   = Math.round((correct / total) * 100);
    const xp    = correct * 10;

    resultSummary.innerHTML = `
      <div class="mt-8 p-6 rounded-2xl border-2 ${
        pct === 100 ? 'border-green-400 bg-green-50 dark:bg-green-950/30' :
        pct >= 60   ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-950/30' :
                      'border-red-400 bg-red-50 dark:bg-red-950/30'
      }">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p class="text-2xl font-extrabold text-slate-900 dark:text-white">
              ${pct === 100 ? '🎉 Xuất sắc!' : pct >= 60 ? '👍 Tốt lắm!' : '💪 Cố lên!'}
            </p>
            <p class="text-slate-600 dark:text-slate-300 mt-1 text-sm">
              Bạn trả lời đúng <strong>${correct}/${total}</strong> câu hỏi (${pct}%).
              ${xp > 0 ? `Bạn nhận được <strong>+${xp} XP</strong>!` : ''}
            </p>
          </div>
          <button onclick="loadNew()"
            class="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-all shadow shadow-indigo-600/20">
            🔀 Đoạn văn tiếp theo
          </button>
        </div>
      </div>
    `;

    // Scroll to result
    resultSummary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ── Load new passage ── */
  function loadNew() {
    const level = levelFilter ? levelFilter.value : 'all';
    renderPassage(getRandomPassage(level));
  }
  window.loadNew = loadNew; // expose for inline onclick in resultSummary

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', () => {
    passageContainer  = document.getElementById('passage-container');
    questionsContainer= document.getElementById('questions-container');
    resultSummary     = document.getElementById('result-summary');
    newBtn            = document.getElementById('new-passage-btn');
    levelFilter       = document.getElementById('level-filter');
    passageCount      = document.getElementById('passage-count');

    newBtn.addEventListener('click', loadNew);
    if (levelFilter) levelFilter.addEventListener('change', loadNew);

    loadNew();
  });
})();

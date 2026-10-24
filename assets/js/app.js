/**
 * GLOBAL APPLICATION CONTROLLER: Header, Footer, Dark Mode, Navigation & Toasts
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderHeader();
  renderFooter();
  updateHeaderStats();
});

// Quản lý Dark Mode
function initTheme() {
  const savedTheme = window.appStorage ? window.appStorage.state.theme : 'light';
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle('dark');
  const newTheme = isDark ? 'dark' : 'light';
  if (window.appStorage) {
    window.appStorage.setTheme(newTheme);
  }
  updateDarkModeIcons();
  showToast(isDark ? 'Đã bật chế độ tối 🌙' : 'Đã bật chế độ sáng ☀️', 'info');
}

function updateDarkModeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  document.querySelectorAll('.theme-toggle-icon').forEach(icon => {
    icon.innerHTML = isDark 
      ? `<svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/></svg>`
      : `<svg class="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>`;
  });
}

// Cập nhật XP, Streak, Level hiển thị trên Navbar
function updateHeaderStats() {
  if (!window.appStorage) return;
  const state = window.appStorage.state;

  const xpEl = document.getElementById('nav-xp-badge');
  if (xpEl) xpEl.textContent = `${state.userXP} XP`;

  const streakEl = document.getElementById('nav-streak-badge');
  if (streakEl) streakEl.textContent = `${state.streakDays} ngày`;

  const levelEl = document.getElementById('nav-level-badge');
  if (levelEl) levelEl.textContent = state.userLevel || 'A1';
}

// Render Header đồng bộ cho tất cả các trang
function renderHeader() {
  const headerContainer = document.getElementById('main-header');
  if (!headerContainer) return;

  const currentPath = window.location.pathname;
  const isCurrent = (page) => currentPath.endsWith(page) ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400';

  headerContainer.innerHTML = `
    <nav class="glass sticky top-0 z-50 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo & Brand -->
          <div class="flex items-center gap-3">
            <a href="index.html" class="flex items-center gap-2 group">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <span class="font-heading font-bold text-xl bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">EduMaster CEFR</span>
                <span class="hidden sm:inline-block text-xs px-2 py-0.5 ml-1.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300 font-medium">A1-C2</span>
              </div>
            </a>
          </div>

          <!-- Desktop Navigation Links -->
          <div class="hidden lg:flex items-center space-x-4 text-sm font-medium">
            <a href="index.html" class="${isCurrent('index.html')} transition-colors">Trang chủ</a>
            <a href="roadmap.html" class="${isCurrent('roadmap.html')} transition-colors">Lộ trình</a>
            <a href="lessons.html" class="${isCurrent('lessons.html')} transition-colors">Bài học</a>
            <a href="dictionary.html" class="${isCurrent('dictionary.html')} transition-colors">Từ điển</a>
            <a href="tenses.html" class="${isCurrent('tenses.html')} transition-colors">12 Thì</a>
            <a href="irregular-verbs.html" class="${isCurrent('irregular-verbs.html')} transition-colors">V2/V3</a>
            <a href="reading.html" class="${isCurrent('reading.html')} transition-colors">Đọc hiểu</a>
            <a href="flashcards.html" class="${isCurrent('flashcards.html')} transition-colors">Flashcard</a>
            <a href="placement-test.html" class="${isCurrent('placement-test.html')} transition-colors flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
              Test xếp lớp
            </a>
            <a href="progress.html" class="${isCurrent('progress.html')} transition-colors">Tiến độ</a>
          </div>

          <!-- Right Action: Gamification Stats & Dark Mode -->
          <div class="flex items-center gap-3">
            <!-- Streak badge -->
            <div title="Chuỗi ngày học liên tục" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 text-xs font-bold">
              🔥 <span id="nav-streak-badge">1 ngày</span>
            </div>

            <!-- XP badge -->
            <div title="Tổng điểm kinh nghiệm" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-xs font-bold">
              ⚡ <span id="nav-xp-badge">0 XP</span>
            </div>

            <!-- Current Level badge -->
            <div title="Cấp độ hiện tại của bạn" class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 text-xs font-bold">
              🎯 <span id="nav-level-badge">A1</span>
            </div>

            <!-- Theme Toggle Button -->
            <button onclick="toggleDarkMode()" aria-label="Đổi giao diện" class="theme-toggle-icon p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>
            </button>

            <!-- Mobile Hamburger Button -->
            <button onclick="toggleMobileMenu()" class="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu Drawer -->
        <div id="mobile-menu" class="hidden lg:hidden py-4 border-t border-slate-200 dark:border-slate-800 space-y-2 text-sm">
          <a href="index.html" class="block px-3 py-2 rounded-lg ${isCurrent('index.html')}">Trang chủ</a>
          <a href="roadmap.html" class="block px-3 py-2 rounded-lg ${isCurrent('roadmap.html')}">Lộ trình CEFR</a>
          <a href="lessons.html" class="block px-3 py-2 rounded-lg ${isCurrent('lessons.html')}">Bài học tương tác</a>
          <a href="dictionary.html" class="block px-3 py-2 rounded-lg ${isCurrent('dictionary.html')}">📖 Tra Cứu Từ Điển Thông Minh</a>
          <a href="tenses.html" class="block px-3 py-2 rounded-lg ${isCurrent('tenses.html')}">⏳ 12 Thì Tiếng Anh Toàn Diện</a>
          <a href="irregular-verbs.html" class="block px-3 py-2 rounded-lg ${isCurrent('irregular-verbs.html')}">📋 Bảng Động Từ Bất Quy Tắc (V2/V3)</a>
          <a href="reading.html" class="block px-3 py-2 rounded-lg ${isCurrent('reading.html')}">📖 Luyện Đọc Hiểu & Trả Lời Câu Hỏi</a>
          <a href="flashcards.html" class="block px-3 py-2 rounded-lg ${isCurrent('flashcards.html')}">Flashcard 3D từ vựng</a>
          <a href="placement-test.html" class="block px-3 py-2 rounded-lg text-amber-600 dark:text-amber-400 font-bold">🎯 Bài Test xếp lớp chuẩn CEFR</a>
          <a href="progress.html" class="block px-3 py-2 rounded-lg ${isCurrent('progress.html')}">Hồ sơ & Tiến độ học tập</a>
        </div>
      </div>
    </nav>
  `;
  updateDarkModeIcons();
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.toggle('hidden');
}

// Render Footer chung
function renderFooter() {
  const footerContainer = document.getElementById('main-footer');
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <footer class="mt-auto border-t border-slate-200/80 dark:border-slate-800 bg-[#f7f8f6]/80 dark:bg-[#111722]/80 backdrop-blur-md py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
              </div>
              <span class="font-heading font-bold text-lg text-slate-900 dark:text-white">EduMaster English CEFR</span>
            </div>
            <p class="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Hệ thống học tiếng Anh cá nhân hóa chuẩn Khung tham chiếu trình độ ngôn ngữ chung Châu Âu (CEFR: A1, A2, B1, B2, C1, C2) với audio phát âm chuẩn giọng bản xứ, Flashcard 3D và thuật toán xếp lớp thông minh.
            </p>
          </div>
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Cấp độ đào tạo</h4>
            <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="roadmap.html#level-A1" class="hover:text-indigo-600">A1 - Breakthrough (Mất gốc)</a></li>
              <li><a href="roadmap.html#level-A2" class="hover:text-indigo-600">A2 - Elementary (Sơ cấp)</a></li>
              <li><a href="roadmap.html#level-B1" class="hover:text-indigo-600">B1 - Intermediate (Trung cấp)</a></li>
              <li><a href="roadmap.html#level-B2" class="hover:text-indigo-600">B2 - Upper-Intermediate</a></li>
              <li><a href="roadmap.html#level-C1" class="hover:text-indigo-600">C1/C2 - Advanced & Mastery</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Tính năng cốt lõi</h4>
            <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="dictionary.html" class="hover:text-indigo-600">Tra cứu từ vựng thông minh</a></li>
              <li><a href="tenses.html" class="hover:text-indigo-600">12 Thì tiếng Anh toàn diện</a></li>
              <li><a href="irregular-verbs.html" class="hover:text-indigo-600">Bảng tra cứu V2 & V3</a></li>
              <li><a href="placement-test.html" class="hover:text-indigo-600">Kiểm tra đầu vào (Placement Test)</a></li>
              <li><a href="lessons.html" class="hover:text-indigo-600">Bài học & Trắc nghiệm phản hồi</a></li>
              <li><a href="flashcards.html" class="hover:text-indigo-600">Luyện nhớ từ Flashcard 3D</a></li>
              <li><a href="progress.html" class="hover:text-indigo-600">Huy hiệu & Điểm thưởng XP</a></li>
            </ul>
          </div>
        </div>
        <div class="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© 2026 EduMaster English. Thiết kế và phát triển theo tiêu chuẩn CEFR Quốc tế.</p>
          <div class="flex gap-4">
            <span class="flex items-center gap-1">🌐 Web Speech API</span>
            <span class="flex items-center gap-1">⚡ Instant Local Storage</span>
            <span class="flex items-center gap-1">🎯 100% Responsive</span>
          </div>
        </div>
      </div>
    </footer>
    <div id="toast-container"></div>
  `;
}

// Hệ thống Toast thông báo tương tác
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const typeStyles = {
    success: 'bg-emerald-600 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-indigo-600 text-white',
    warning: 'bg-amber-600 text-white'
  };

  toast.className = `toast px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm font-medium ${typeStyles[type] || typeStyles.info}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
window.showToast = showToast;

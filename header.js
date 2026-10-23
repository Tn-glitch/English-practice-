/**
 * SHARED HEADER — EduMaster English
 * Injects sticky nav + dark-mode toggle into any page with <header id="main-header">
 */
(function () {
  var header = document.getElementById('main-header');
  if (!header) return;

  var page = window.location.pathname.split('/').pop() || 'index.html';

  var links = [
    ['index.html',           '🏠 Trang chủ'],
    ['lessons.html',         '📚 Bài học'],
    ['tenses.html',          '⏳ 12 Thì'],
    ['irregular-verbs.html', '📋 V2/V3'],
    ['dictionary.html',      '🔍 Từ điển'],
    ['reading.html',         '📖 Đọc hiểu'],
    ['flashcards.html',      '🗂 Flashcard'],
    ['placement-test.html',  '🎯 Test xếp lớp'],
    ['progress.html',        '🏆 Thành tích'],
  ];

  // Build nav link HTML
  function buildLinks(mobile) {
    var html = '';
    for (var i = 0; i < links.length; i++) {
      var href  = links[i][0];
      var label = links[i][1];
      var active = (page === href);
      if (mobile) {
        html += '<li><a href="' + href + '" style="display:flex;align-items:center;gap:6px;padding:8px 12px;border-radius:10px;font-size:13px;font-weight:600;text-decoration:none;color:' + (active ? '#fff' : '#374151') + ';background:' + (active ? '#4f46e5' : 'transparent') + '">' + label + '</a></li>';
      } else {
        html += '<li><a href="' + href + '" class="nav-lnk" style="display:inline-block;padding:6px 12px;border-radius:8px;font-size:13px;font-weight:600;text-decoration:none;white-space:nowrap;color:' + (active ? '#fff' : '#374151') + ';background:' + (active ? '#4f46e5' : 'transparent') + '">' + label + '</a></li>';
      }
    }
    return html;
  }

  header.innerHTML =
    '<nav id="site-nav" style="position:sticky;top:0;z-index:100;background:#fff;border-bottom:1px solid #e5e7eb;box-shadow:0 1px 4px rgba(0,0,0,.06)">' +
      '<div style="max-width:1280px;margin:0 auto;padding:0 16px;display:flex;align-items:center;justify-content:space-between;height:60px">' +

        // Logo
        '<a href="index.html" style="display:flex;align-items:center;gap:8px;text-decoration:none;flex-shrink:0">' +
          '<span style="width:32px;height:32px;border-radius:8px;background:#4f46e5;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:16px">E</span>' +
          '<span id="logo-text" style="font-weight:900;font-size:16px;color:#0f172a">EduMaster <span style="color:#4f46e5">English</span></span>' +
        '</a>' +

        // Desktop links (hidden on small screens via inline display)
        '<ul id="nav-desktop" style="display:none;list-style:none;margin:0;padding:0;align-items:center;gap:2px">' +
          buildLinks(false) +
        '</ul>' +

        // Right controls
        '<div style="display:flex;align-items:center;gap:8px">' +
          '<button id="dark-btn" title="Đổi theme" style="width:36px;height:36px;border-radius:8px;border:1px solid #e5e7eb;background:transparent;cursor:pointer;font-size:16px">🌙</button>' +
          '<button id="mob-btn" title="Menu" style="width:36px;height:36px;border-radius:8px;border:1px solid #e5e7eb;background:transparent;cursor:pointer;font-size:18px;line-height:1">☰</button>' +
        '</div>' +

      '</div>' +

      // Mobile menu
      '<div id="mob-menu" style="display:none;border-top:1px solid #e5e7eb;padding:8px">' +
        '<ul style="list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:4px">' +
          buildLinks(true) +
        '</ul>' +
      '</div>' +

    '</nav>';

  // Show desktop nav on wide screens
  var navDesktop = document.getElementById('nav-desktop');
  function checkWidth() {
    navDesktop.style.display = window.innerWidth >= 1024 ? 'flex' : 'none';
    document.getElementById('mob-btn').style.display = window.innerWidth >= 1024 ? 'none' : 'block';
  }
  checkWidth();
  window.addEventListener('resize', checkWidth);

  // Mobile toggle
  var mobMenu = document.getElementById('mob-menu');
  document.getElementById('mob-btn').addEventListener('click', function () {
    mobMenu.style.display = mobMenu.style.display === 'none' ? 'block' : 'none';
  });

  // Close mobile menu on link click
  mobMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { mobMenu.style.display = 'none'; });
  });

  // ── Dark mode ──────────────────────────────────────────────────────────────
  var root = document.documentElement;
  var darkBtn = document.getElementById('dark-btn');
  var nav = document.getElementById('site-nav');

  function applyTheme(dark) {
    root.classList.toggle('dark', dark);
    darkBtn.textContent = dark ? '☀️' : '🌙';
    localStorage.setItem('edumaster-theme', dark ? 'dark' : 'light');

    // Nav bg
    nav.style.background = dark ? '#111722' : '#ffffff';
    nav.style.borderBottomColor = dark ? '#1e293b' : '#e5e7eb';
    mobMenu.style.borderTopColor = dark ? '#1e293b' : '#e5e7eb';
    if (dark) mobMenu.style.background = '#111722';
    else mobMenu.style.background = '#ffffff';

    // Logo text
    var logoText = document.getElementById('logo-text');
    if (logoText) logoText.style.color = dark ? '#f1f5f9' : '#0f172a';

    // Non-active nav link colours
    navDesktop.querySelectorAll('.nav-lnk').forEach(function (a) {
      if (a.style.background === 'transparent' || a.style.background === '') {
        a.style.color = dark ? '#cbd5e1' : '#374151';
      }
    });
  }

  var saved = localStorage.getItem('edumaster-theme');
  var sysDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved === 'dark' || (!saved && sysDark));

  darkBtn.addEventListener('click', function () {
    applyTheme(!root.classList.contains('dark'));
  });

})();

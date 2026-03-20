// ============================
// FUEL TRACKER — Core Logic
// Date-based Odd/Even System (not day-based)
// ============================

(function () {
  'use strict';

  // ==========================
  // TRANSLATIONS
  // ==========================
  const TRANSLATIONS = {
    en: {
      heroTitle: 'Fuel Tracker',
      heroSubtitle: "Check your vehicle's fuel eligibility based on odd/even date rule",
      todayStatus: "Today's Status",
      labelDay: 'Day',
      labelDate: 'Date',
      labelPlatesAllowed: 'Plates Allowed',
      checkEligibility: 'Check Eligibility',
      enterPlate: 'Enter Vehicle Number Plate',
      selectDate: 'Select Date',
      btnCheck: 'Check Fuel Eligibility',
      weeklySchedule: 'Monthly Schedule',
      thDay: 'Date',
      thType: 'Type',
      thPlatesAllowed: 'Plates Allowed (Last Digit)',
      checkHistory: 'Check History',
      clearAll: 'Clear All',
      footer: 'Fuel Tracker © 2026 — Odd/Even Date System',
      placeholder: 'e.g. MH 12 AB 1234',
      oddPlates: '🔵 Odd Plates (1,3,5,7,9)',
      evenPlates: '🟡 Even Plates (0,2,4,6,8)',
      fuelAllowed: 'Fuel Allowed!',
      notAllowed: 'Not Allowed',
      allowed: 'Allowed',
      denied: 'Denied',
      today: '← Today',
      odd: 'Odd',
      even: 'Even',
      emptyHistory: 'No checks yet. Enter a plate number above to get started!',
      resultAllowed: (digit, digitType, dateNum, dateType) =>
        `Last digit ${digit} (${digitType}) is allowed on date ${dateNum} (${dateType} date).`,
      resultDenied: (digit, digitType, dateNum, dateType) =>
        `Last digit ${digit} (${digitType}) is NOT allowed on date ${dateNum} (${dateType} date).`,
      dateHint: (dateNum, type) => `Date ${dateNum} — ${type} Date`,
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    si: {
      heroTitle: 'ඉන්ධන ට්‍රැකර්',
      heroSubtitle: 'ඔත්තේ/ඉරට්ටේ දින රීතිය අනුව ඔබේ වාහනයේ ඉන්ධන සුදුසුකම පරීක්ෂා කරන්න',
      todayStatus: 'අද තත්ත්වය',
      labelDay: 'දිනය',
      labelDate: 'දිනය',
      labelPlatesAllowed: 'අවසර ලකුණු',
      checkEligibility: 'සුදුසුකම පරීක්ෂා කරන්න',
      enterPlate: 'වාහන අංක තහඩුව ඇතුළත් කරන්න',
      selectDate: 'දිනය තෝරන්න',
      btnCheck: 'ඉන්ධන සුදුසුකම පරීක්ෂා කරන්න',
      weeklySchedule: 'මාසික කාලසටහන',
      thDay: 'දිනය',
      thType: 'වර්ගය',
      thPlatesAllowed: 'අවසර තහඩු (අවසාන අංකය)',
      checkHistory: 'පරීක්ෂා ඉතිහාසය',
      clearAll: 'සියල්ල මකන්න',
      footer: 'ඉන්ධන ට්‍රැකර් © 2026 — ඔත්තේ/ඉරට්ටේ දින ක්‍රමය',
      placeholder: 'උදා: WP AB 1234',
      oddPlates: '🔵 ඔත්තේ තහඩු (1,3,5,7,9)',
      evenPlates: '🟡 ඉරට්ටේ තහඩු (0,2,4,6,8)',
      fuelAllowed: 'ඉන්ධන අවසරයි!',
      notAllowed: 'අවසර නැත',
      allowed: 'අවසරයි',
      denied: 'ප්‍රතික්ෂේප යි',
      today: '← අද',
      odd: 'ඔත්තේ',
      even: 'ඉරට්ටේ',
      emptyHistory: 'තවම පරීක්ෂා කර නැත. ආරම්භ කිරීමට ඉහත අංක තහඩුවක් ඇතුළත් කරන්න!',
      resultAllowed: (digit, digitType, dateNum, dateType) =>
        `අවසාන අංකය ${digit} (${digitType}) ${dateNum} වන දින (${dateType} දින) අවසරයි.`,
      resultDenied: (digit, digitType, dateNum, dateType) =>
        `අවසාන අංකය ${digit} (${digitType}) ${dateNum} වන දින (${dateType} දින) අවසර නැත.`,
      dateHint: (dateNum, type) => `${dateNum} වන දින — ${type} දිනය`,
      months: ['ජන', 'පෙබ', 'මාර්', 'අප්‍රේ', 'මැයි', 'ජූනි', 'ජූලි', 'අගෝ', 'සැප්', 'ඔක්', 'නොවැ', 'දෙසැ']
    },
    ta: {
      heroTitle: 'எரிபொருள் கண்காணிப்பி',
      heroSubtitle: 'ஒற்றை/இரட்டை தேதி விதியின் அடிப்படையில் உங்கள் வாகனத்தின் எரிபொருள் தகுதியை சரிபார்க்கவும்',
      todayStatus: 'இன்றைய நிலை',
      labelDay: 'நாள்',
      labelDate: 'தேதி',
      labelPlatesAllowed: 'அனுமதிக்கப்படும் தகவுகள்',
      checkEligibility: 'தகுதியை சரிபார்',
      enterPlate: 'வாகன எண் தகவை உள்ளிடவும்',
      selectDate: 'தேதியை தேர்வு செய்யவும்',
      btnCheck: 'எரிபொருள் தகுதியை சரிபார்',
      weeklySchedule: 'மாதாந்திர அட்டவணை',
      thDay: 'தேதி',
      thType: 'வகை',
      thPlatesAllowed: 'அனுமதிக்கப்படும் தகவுகள் (கடைசி இலக்கம்)',
      checkHistory: 'சரிபார்ப்பு வரலாறு',
      clearAll: 'அனைத்தையும் அழி',
      footer: 'எரிபொருள் கண்காணிப்பி © 2026 — ஒற்றை/இரட்டை தேதி முறை',
      placeholder: 'எ.கா. TN 12 AB 1234',
      oddPlates: '🔵 ஒற்றை தகவுகள் (1,3,5,7,9)',
      evenPlates: '🟡 இரட்டை தகவுகள் (0,2,4,6,8)',
      fuelAllowed: 'எரிபொருள் அனுமதி!',
      notAllowed: 'அனுமதி இல்லை',
      allowed: 'அனுமதி',
      denied: 'மறுக்கப்பட்டது',
      today: '← இன்று',
      odd: 'ஒற்றை',
      even: 'இரட்டை',
      emptyHistory: 'இன்னும் சரிபார்ப்புகள் இல்லை. தொடங்க மேலே எண் தகவை உள்ளிடவும்!',
      resultAllowed: (digit, digitType, dateNum, dateType) =>
        `கடைசி இலக்கம் ${digit} (${digitType}) ${dateNum} ஆம் தேதி (${dateType} தேதி) அனுமதிக்கப்படும்.`,
      resultDenied: (digit, digitType, dateNum, dateType) =>
        `கடைசி இலக்கம் ${digit} (${digitType}) ${dateNum} ஆம் தேதி (${dateType} தேதி) அனுமதி இல்லை.`,
      dateHint: (dateNum, type) => `${dateNum} ஆம் தேதி — ${type} தேதி`,
      months: ['ஜன', 'பிப்', 'மார்', 'ஏப்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆக', 'செப்', 'அக்', 'நவ', 'டிச']
    }
  };

  // ==========================
  // CONSTANTS
  // ==========================
  const HISTORY_KEY = 'fuelTracker_history';
  const LANG_KEY = 'fuelTracker_lang';
  const MAX_HISTORY = 50;

  // ==========================
  // STATE
  // ==========================
  let currentLang = localStorage.getItem(LANG_KEY) || 'en';

  // ==========================
  // DOM ELEMENTS
  // ==========================
  const $ = (id) => document.getElementById(id);
  const $todayDay = $('today-day');
  const $todayDate = $('today-date');
  const $todayBadge = $('today-badge');
  const $plateInput = $('plate-input');
  const $datePicker = $('date-picker');
  const $dateDayHint = $('date-day-hint');
  const $btnCheck = $('btn-check');
  const $resultPanel = $('result-panel');
  const $resultContent = $('result-content');
  const $resultIcon = $('result-icon');
  const $resultPlate = $('result-plate');
  const $resultStatus = $('result-status');
  const $resultDetail = $('result-detail');
  const $scheduleBody = $('schedule-body');
  const $historyContainer = $('history-container');
  const $btnClear = $('btn-clear');

  // ==========================
  // HELPERS
  // ==========================
  function t(key) { return TRANSLATIONS[currentLang][key]; }

  // NEW: Get date type based on calendar date (odd/even)
  function getDateType(date) {
    const dayOfMonth = date.getDate();
    return dayOfMonth % 2 === 0 ? 'even' : 'odd';
  }

  function getLastDigit(plateStr) {
    const digits = plateStr.replace(/\D/g, '');
    if (digits.length === 0) return null;
    return parseInt(digits.charAt(digits.length - 1), 10);
  }

  // NEW: Check eligibility based on date (not day of week)
  function checkEligibility(lastDigit, date) {
    const dateType = getDateType(date);
    const digitIsEven = lastDigit % 2 === 0;
    
    // Odd dates -> odd plates allowed
    // Even dates -> even plates allowed
    return dateType === 'even' ? digitIsEven : !digitIsEven;
  }

  function formatDate(date) {
    const months = t('months');
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  function getTodayStr() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // NEW: Generate schedule for current month
  function generateMonthlySchedule() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const schedule = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dateType = i % 2 === 0 ? 'even' : 'odd';
      schedule.push({
        dateNum: i,
        type: dateType,
        plates: dateType === 'odd' ? '1, 3, 5, 7, 9' : '0, 2, 4, 6, 8'
      });
    }
    return schedule;
  }

  // ==========================
  // i18n: APPLY TRANSLATIONS
  // ==========================
  function applyLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (TRANSLATIONS[currentLang][key]) {
        el.textContent = TRANSLATIONS[currentLang][key];
      }
    });

    $plateInput.placeholder = t('placeholder');
    document.documentElement.lang = currentLang === 'si' ? 'si' : currentLang === 'ta' ? 'ta' : 'en';

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });

    renderTodayBanner();
    renderSchedule();
    renderHistory();
    updateDateHint();
  }

  // ==========================
  // RENDER: TODAY BANNER
  // ==========================
  function renderTodayBanner() {
    const now = new Date();
    const dayOfMonth = now.getDate();
    const dateType = getDateType(now);
    
    $todayDay.textContent = `${dayOfMonth}`;
    $todayDate.textContent = formatDate(now);

    $todayBadge.className = 'badge badge-' + dateType;
    $todayBadge.textContent = dateType === 'odd' ? t('oddPlates') : t('evenPlates');
  }

  // ==========================
  // RENDER: MONTHLY SCHEDULE TABLE
  // ==========================
  function renderSchedule() {
    const today = new Date();
    const todayDate = today.getDate();
    const schedule = generateMonthlySchedule();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
    
    // Update table header to show current month
    const currentMonth = monthNames[today.getMonth()];
    document.querySelector('#schedule-table caption')?.remove();
    const caption = `<caption style="caption-side: top; padding: 0.5rem; font-weight: 600; background: var(--bg-secondary);">${currentMonth} ${today.getFullYear()}</caption>`;
    
    $scheduleBody.innerHTML = schedule.map(row => {
      const isToday = row.dateNum === todayDate;
      const typeLabel = row.type === 'odd' ? t('odd') : t('even');

      return `
        <tr class="${isToday ? 'today-row' : ''}">
          <td><strong>${row.dateNum}</strong> ${isToday ? t('today') : ''}</td>
          <td class="day-type-${row.type}">${typeLabel}</td>
          <td class="plates-allowed">${row.plates}</td>
        </tr>
      `;
    }).join('');
    
    // Add caption if not exists
    if (!document.querySelector('#schedule-table caption')) {
      const table = $('#schedule-table');
      const caption = document.createElement('caption');
      caption.textContent = `${monthNames[today.getMonth()]} ${today.getFullYear()}`;
      caption.style.cssText = 'caption-side: top; padding: 0.5rem; font-weight: 600; background: var(--bg-secondary);';
      table.insertBefore(caption, table.firstChild);
    }
  }

  // ==========================
  // RENDER: DATE HINT
  // ==========================
  function updateDateHint() {
    const val = $datePicker.value;
    if (!val) {
      $dateDayHint.className = 'date-day-hint';
      $dateDayHint.textContent = '';
      return;
    }
    const parts = val.split('-');
    const selectedDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    const dateNum = selectedDate.getDate();
    const dateType = getDateType(selectedDate);
    const typeLabel = dateType === 'odd' ? t('odd') : t('even');

    $dateDayHint.className = `date-day-hint visible ${dateType}`;
    $dateDayHint.textContent = t('dateHint')(dateNum, typeLabel);
  }

  // ==========================
  // RENDER: RESULT
  // ==========================
  function showResult(plate, lastDigit, isAllowed, dateNum, dateType) {
    const plateStr = plate.toUpperCase();
    const digitsInPlate = plateStr.replace(/\D/g, '');
    const lastDigitPos = plateStr.lastIndexOf(digitsInPlate.charAt(digitsInPlate.length - 1));
    const beforeLast = plateStr.substring(0, lastDigitPos);
    const afterLast = plateStr.substring(lastDigitPos + 1);

    $resultPlate.innerHTML = `${beforeLast}<span class="last-digit">${lastDigit}</span>${afterLast}`;

    const digitType = lastDigit % 2 === 0 ? t('even') : t('odd');
    const dateTypeLabel = dateType === 'even' ? t('even') : t('odd');

    if (isAllowed) {
      $resultIcon.textContent = '✅';
      $resultContent.className = 'result-content allowed';
      $resultStatus.className = 'result-status allowed';
      $resultStatus.textContent = t('fuelAllowed');
      $resultDetail.textContent = t('resultAllowed')(lastDigit, digitType, dateNum, dateTypeLabel);
    } else {
      $resultIcon.textContent = '❌';
      $resultContent.className = 'result-content denied';
      $resultStatus.className = 'result-status denied';
      $resultStatus.textContent = t('notAllowed');
      $resultDetail.textContent = t('resultDenied')(lastDigit, digitType, dateNum, dateTypeLabel);
    }

    $resultPanel.classList.add('visible');
    $resultIcon.style.animation = 'none';
    void $resultIcon.offsetWidth;
    $resultIcon.style.animation = 'resultBounce 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97)';
  }

  function hideResult() {
    $resultPanel.classList.remove('visible');
  }

  // ==========================
  // HISTORY
  // ==========================
  function loadHistory() {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; }
    catch { return []; }
  }

  function saveHistory(history) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
  }

  function addHistoryEntry(plate, lastDigit, isAllowed, dateNum, dateStr) {
    const history = loadHistory();
    history.unshift({
      plate: plate.toUpperCase(),
      lastDigit,
      allowed: isAllowed,
      dateNum: dateNum,
      date: dateStr,
      timestamp: new Date().toISOString()
    });
    saveHistory(history);
    renderHistory();
  }

  function renderHistory() {
    const history = loadHistory();

    if (history.length === 0) {
      $historyContainer.innerHTML = `
        <div class="history-empty">
          <div class="empty-icon">📭</div>
          <div>${t('emptyHistory')}</div>
        </div>
      `;
      $btnClear.style.display = 'none';
      return;
    }

    $btnClear.style.display = 'inline-flex';
    const months = t('months');

    const listHtml = history.map(entry => {
      const time = new Date(entry.timestamp);
      const timeStr = `${time.getDate()} ${months[time.getMonth()]} ${time.getFullYear()}, ${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;

      return `
        <div class="history-item">
          <div class="history-status-icon">${entry.allowed ? '✅' : '❌'}</div>
          <div class="history-info">
            <div class="history-plate">${entry.plate}</div>
            <div class="history-meta">Date ${entry.dateNum} · ${entry.date || ''} · ${timeStr}</div>
          </div>
          <div class="history-result ${entry.allowed ? 'allowed' : 'denied'}">
            ${entry.allowed ? t('allowed') : t('denied')}
          </div>
        </div>
      `;
    }).join('');

    $historyContainer.innerHTML = `<div class="history-list">${listHtml}</div>`;
  }

  // ==========================
  // MAIN CHECK HANDLER
  // ==========================
  function handleCheck() {
    const plate = $plateInput.value.trim();

    if (!plate) {
      flashError($plateInput);
      return;
    }

    const lastDigit = getLastDigit(plate);
    if (lastDigit === null) {
      flashError($plateInput);
      hideResult();
      return;
    }

    // Determine date
    let selectedDate;
    if ($datePicker.value) {
      const parts = $datePicker.value.split('-');
      selectedDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    } else {
      selectedDate = new Date();
    }

    const dateNum = selectedDate.getDate();
    const dateType = getDateType(selectedDate);
    const isAllowed = checkEligibility(lastDigit, selectedDate);
    const dateStr = formatDate(selectedDate);

    showResult(plate, lastDigit, isAllowed, dateNum, dateType);
    addHistoryEntry(plate, lastDigit, isAllowed, dateNum, dateStr);
  }

  function flashError(el) {
    el.focus();
    el.style.borderColor = 'var(--accent-red)';
    el.style.boxShadow = '0 0 0 4px var(--accent-red-glow)';
    setTimeout(() => {
      el.style.borderColor = '';
      el.style.boxShadow = '';
    }, 1500);
  }

  // ==========================
  // EVENT LISTENERS
  // ==========================
  $btnCheck.addEventListener('click', handleCheck);
  $plateInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleCheck(); });
  $plateInput.addEventListener('input', hideResult);

  $datePicker.addEventListener('change', () => {
    updateDateHint();
    hideResult();
  });

  $btnClear.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all history?')) {
      localStorage.removeItem(HISTORY_KEY);
      renderHistory();
      hideResult();
    }
  });

  // Language switcher
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentLang = btn.dataset.lang;
      localStorage.setItem(LANG_KEY, currentLang);
      applyLanguage();
    });
  });

  // ==========================
  // INIT
  // ==========================
  $datePicker.value = getTodayStr();
  applyLanguage();

  // Update banner daily
  setInterval(renderTodayBanner, 60000);
  // Update schedule monthly
  setInterval(renderSchedule, 3600000);

})();
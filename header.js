(function () {
  var body = document.body;
  var pageId = body.dataset.pageId || '';
  var isIndex = pageId === 'index';

  var accent = body.style.getPropertyValue('--accent').trim();
  if (!accent) accent = '#2d2d2d';

  function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16)
    };
  }

  var rgb;
  try {
    rgb = hexToRgb(accent);
    if (isNaN(rgb.r)) throw new Error();
  } catch (e) {
    accent = '#2d2d2d';
    rgb = { r: 45, g: 45, b: 45 };
  }

  var luminance = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
  var isLight = luminance > 128;
  var textColor = isLight ? '#111111' : '#ffffff';
  var hoverBg = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.15)';

  var style = document.createElement('style');
  style.textContent =
    '#learn-header {\n' +
    '  position: sticky; top: 0; z-index: 1000;\n' +
    '  background: ' + accent + ';\n' +
    '  display: flex; align-items: center; justify-content: space-between;\n' +
    '  padding: 0 12px; height: 52px;\n' +
    '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\n' +
    '  box-shadow: 0 2px 12px rgba(0,0,0,0.3);\n' +
    '  user-select: none;\n' +
    '}\n' +
    '#learn-header .lh-title {\n' +
    '  color: ' + textColor + ';\n' +
    '  font-size: 1rem; font-weight: 600; letter-spacing: 0.01em;\n' +
    '  flex: 1; text-align: center; pointer-events: none;\n' +
    '}\n' +
    '#learn-header .lh-btn {\n' +
    '  background: none; border: none; cursor: pointer;\n' +
    '  color: ' + textColor + '; text-decoration: none;\n' +
    '  width: 38px; height: 38px; border-radius: 50%;\n' +
    '  display: flex; align-items: center; justify-content: center;\n' +
    '  transition: background 0.15s; flex-shrink: 0; padding: 0;\n' +
    '}\n' +
    '#learn-header .lh-btn:hover { background: ' + hoverBg + '; }\n' +
    '#learn-header .lh-btn svg {\n' +
    '  width: 20px; height: 20px; fill: none;\n' +
    '  stroke: ' + textColor + '; stroke-width: 2;\n' +
    '  stroke-linecap: round; stroke-linejoin: round;\n' +
    '}\n' +
    '#learn-header .lh-fav svg { transition: fill 0.15s; }\n' +
    '#learn-header .lh-fav.active svg { fill: ' + textColor + '; }\n' +
    '#learn-header .lh-spacer { width: 38px; flex-shrink: 0; }\n';
  document.head.appendChild(style);

  var header = document.createElement('header');
  header.id = 'learn-header';

  if (isIndex) {
    var spacer = document.createElement('div');
    spacer.className = 'lh-spacer';
    header.appendChild(spacer);
  } else {
    var homeLink = document.createElement('a');
    homeLink.href = '../';
    homeLink.className = 'lh-btn lh-home';
    homeLink.title = 'Home';
    homeLink.setAttribute('aria-label', 'Home');
    homeLink.innerHTML = '<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>';
    header.appendChild(homeLink);
  }

  var titleEl = document.createElement('span');
  titleEl.className = 'lh-title';
  titleEl.textContent = 'Take a deeks';
  header.appendChild(titleEl);

  var favKey = 'learn:fav:' + pageId;
  var favActive = localStorage.getItem(favKey) === '1';

  var favBtn = document.createElement('button');
  favBtn.className = 'lh-btn lh-fav' + (favActive ? ' active' : '');
  favBtn.title = favActive ? 'Unfavourite' : 'Favourite';
  favBtn.setAttribute('aria-label', 'Toggle favourite');
  favBtn.innerHTML = '<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';

  favBtn.addEventListener('click', function () {
    var nowActive = favBtn.classList.toggle('active');
    if (nowActive) {
      localStorage.setItem(favKey, '1');
      favBtn.title = 'Unfavourite';
    } else {
      localStorage.removeItem(favKey);
      favBtn.title = 'Favourite';
    }
  });

  header.appendChild(favBtn);
  body.insertBefore(header, body.firstChild);
})();

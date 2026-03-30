(function () {

  // ============================================================
  // CONFIGURATION
  // ============================================================
  var SUPABASE_URL = 'https://dfiueufymejikowcevex.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmaXVldWZ5bWVqaWtvd2NldmV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4MjgyMjQsImV4cCI6MjA5MDQwNDIyNH0.66M11sx54ZZKou8lv0nYOIkfkP0C4cd8_PyPp6ej78A';

  // ============================================================
  // TAGLINE
  // ============================================================
  var TAGLINE_FULL   = 'Two Votes, One Voice, for Independence';
  var TAGLINE_MOBILE = 'Two Votes, One Voice';

  // ============================================================
  // NETWORK SITES
  // ============================================================
  var NETWORK_SITES = [
    { name: 'Wee Fowk',   url: 'https://weefowk.org',              description: 'The Network' },
    { name: 'Organising', url: 'https://organisingforscotland.com', description: 'Organising Engine', comingSoon: true },
    { name: 'VoteWiser',  url: 'https://votewiser.scot',            description: 'Electoral Intelligence' }
  ];

  // ============================================================
  // NOTIFICATION STRIP
  // Set active:true and message to show a network-wide alert.
  // In future this will be fetched from Supabase automatically.
  // ============================================================
  var NOTIFICATION = {
    active: false,
    message: '',
    type: 'info'   // 'info' | 'alert' | 'success'
  };

  // ============================================================
  // DO NOT EDIT BELOW THIS LINE
  // ============================================================
  var BAR_HEIGHT   = '52px';
  var STRIP_HEIGHT = '32px';
  var CURRENT_DOMAIN = window.location.hostname;

  // Saltire blue palette
  var BLUE      = '#003F8A';
  var BLUE_DARK = '#002D65';
  var BLUE_MID  = '#0052B4';
  var WHITE     = '#FFFFFF';
  var WHITE_DIM = 'rgba(255,255,255,0.55)';
  var WHITE_HVR = 'rgba(255,255,255,0.08)';
  var WHITE_BDR = 'rgba(255,255,255,0.15)';
  var GOLD      = '#F0C040';
  var GOLD_DIM  = 'rgba(240,192,64,0.2)';
  var RED_SOFT  = '#FF6B6B';

  var STRIP_COLORS = {
    info:    { bg: '#1A56B0', text: '#E8F0FF', dot: '#7EB8FF' },
    alert:   { bg: '#8B2020', text: '#FFE8E8', dot: RED_SOFT },
    success: { bg: '#0D6B3B', text: '#E8FFF2', dot: '#4ADE80' }
  };

  var totalTopHeight = NOTIFICATION.active
    ? 'calc('+BAR_HEIGHT+' + '+STRIP_HEIGHT+')'
    : BAR_HEIGHT;

  var css = [
    // Notification strip
    '#wfstrip{height:'+STRIP_HEIGHT+';display:flex;align-items:center;justify-content:center;gap:10px;padding:0 16px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;font-size:12px;letter-spacing:.2px;position:fixed;top:0;left:0;right:0;z-index:100000}',
    '#wfstrip-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}',
    '#wfstrip-msg{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '#wfstrip-close{background:none;border:none;cursor:pointer;opacity:.6;font-size:14px;padding:0 0 0 8px;line-height:1;flex-shrink:0}',
    '#wfstrip-close:hover{opacity:1}',

    // Main bar
    '#wfbar{position:fixed;left:0;right:0;height:'+BAR_HEIGHT+';background:'+BLUE+';display:flex;align-items:center;justify-content:space-between;padding:0 20px;z-index:99999;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;font-size:13px;box-sizing:border-box;border-bottom:1px solid '+BLUE_DARK+';box-shadow:0 2px 16px rgba(0,0,0,.25)}',
    '#wfbar *{box-sizing:border-box}',

    // Left
    '#wfbar-left{display:flex;align-items:center;gap:0;flex-shrink:0;overflow:hidden;height:100%}',

    // Logo block
    '#wfbar-logo-wrap{display:flex;align-items:center;gap:10px;padding-right:20px;border-right:1px solid '+WHITE_BDR+';height:100%;flex-shrink:0}',
    '#wfbar-hex{color:'+GOLD+';font-size:16px;line-height:1}',
    '#wfbar-logo{color:'+WHITE+';font-weight:700;font-size:13px;text-decoration:none;letter-spacing:.3px;white-space:nowrap;line-height:1}',
    '#wfbar-logo:hover{color:'+GOLD+'}',

    // Tagline
    '#wfbar-tagline-wrap{padding:0 20px;border-right:1px solid '+WHITE_BDR+';height:100%;display:flex;align-items:center;flex-shrink:0}',
    '#wfbar-tagline{color:'+WHITE_DIM+';font-size:11px;letter-spacing:.6px;white-space:nowrap;text-transform:uppercase;font-weight:400}',
    '#wfbar-tagline-full{display:inline}',
    '#wfbar-tagline-mobile{display:none}',

    // Network dropdown
    '#wfbar-net{position:relative;height:100%;display:flex;align-items:center;padding:0 4px 0 16px}',
    '#wfbar-net-btn{background:none;border:none;cursor:pointer;color:'+WHITE_DIM+';font-size:12px;font-family:inherit;display:flex;align-items:center;gap:7px;padding:6px 10px;border-radius:5px;transition:color .15s,background .15s;white-space:nowrap;letter-spacing:.2px}',
    '#wfbar-net-btn:hover{color:'+WHITE+';background:'+WHITE_HVR+'}',
    '#wfbar-net-btn.open{color:'+GOLD+';background:'+GOLD_DIM+'}',

    // Dropdown panel
    '#wfbar-dropdown{position:absolute;top:calc(100% + 6px);left:0;background:'+BLUE_DARK+';border:1px solid '+WHITE_BDR+';border-radius:8px;min-width:240px;padding:6px;z-index:100001;display:none;box-shadow:0 16px 40px rgba(0,0,0,.45)}',
    '#wfbar-dropdown.open{display:block}',
    '#wfbar-dd-header{padding:8px 12px 10px;border-bottom:1px solid '+WHITE_BDR+';margin-bottom:6px}',
    '#wfbar-dd-header-label{font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:'+GOLD+';opacity:.7}',
    '.wfdd-item{display:flex;align-items:center;gap:12px;padding:9px 12px;border-radius:5px;text-decoration:none;transition:background .15s;cursor:pointer}',
    '.wfdd-item:hover{background:'+WHITE_HVR+'}',
    '.wfdd-item.wfdd-current{background:rgba(240,192,64,.12);cursor:default}',
    '.wfdd-item-icon{width:32px;height:32px;border-radius:6px;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px}',
    '.wfdd-item.wfdd-current .wfdd-item-icon{background:'+GOLD_DIM+'}',
    '.wfdd-item.wfdd-soon .wfdd-item-icon{opacity:.4}',
    '.wfdd-item-text{display:flex;flex-direction:column;gap:2px}',
    '.wfdd-item-name{font-size:13px;font-weight:600;color:'+WHITE+';letter-spacing:.1px}',
    '.wfdd-item.wfdd-current .wfdd-item-name{color:'+GOLD+'}',
    '.wfdd-item.wfdd-soon .wfdd-item-name{color:rgba(255,255,255,.35)}',
    '.wfdd-item-desc{font-size:11px;color:rgba(255,255,255,.4);letter-spacing:.2px}',
    '.wfdd-soon-badge{font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:'+GOLD+';opacity:.6;margin-left:auto;flex-shrink:0;padding:2px 6px;border:1px solid rgba(240,192,64,.25);border-radius:3px}',

    // Right
    '#wfbar-right{display:flex;align-items:center;gap:10px;flex-shrink:0}',
    '#wfbar-notif{position:relative;background:none;border:none;cursor:pointer;color:'+WHITE_DIM+';padding:6px;border-radius:5px;transition:color .15s,background .15s;display:flex;align-items:center;justify-content:center}',
    '#wfbar-notif:hover{color:'+WHITE+';background:'+WHITE_HVR+'}',
    '#wfbar-notif-badge{position:absolute;top:4px;right:4px;width:7px;height:7px;border-radius:50%;background:'+RED_SOFT+';border:1.5px solid '+BLUE+'}',
    '#wfbar-user{color:'+WHITE_DIM+';font-size:12px;white-space:nowrap;letter-spacing:.2px}',
    '#wfbar-user span{color:'+GOLD+';font-weight:600}',
    '.wfbtn{background:rgba(255,255,255,.1);border:1px solid '+WHITE_BDR+';color:'+WHITE+';padding:5px 14px;border-radius:5px;cursor:pointer;font-size:12px;text-decoration:none;white-space:nowrap;transition:all .15s;font-family:inherit;font-weight:500;letter-spacing:.3px}',
    '.wfbtn:hover{background:'+WHITE+';color:'+BLUE+'}',
    '.wfbtn.primary{background:'+GOLD+';border-color:'+GOLD+';color:'+BLUE_DARK+';font-weight:700}',
    '.wfbtn.primary:hover{background:#FFD060;border-color:#FFD060}',
    '.wfspacer{display:block}',

    // Responsive
    '@media(max-width:768px){',
    '#wfbar-tagline-wrap{display:none}',
    '#wfbar-user{display:none}',
    '#wfbar-logo{font-size:12px}',
    '#wfbar{padding:0 14px}',
    '}',
    '@media(max-width:480px){',
    '#wfbar-tagline-full{display:none}',
    '#wfbar-tagline-mobile{display:inline}',
    '}'
  ].join('');

  // ── Icons ─────────────────────────────────────────────────
  function globeSVG(size) {
    size = size||14;
    return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
  }
  function chevronSVG() {
    return '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
  }
  function bellSVG() {
    return '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>';
  }

  // Site icons (emoji for now – can be replaced with SVG)
  var SITE_ICONS = {
    'weefowk.org':              '\u2B21',
    'organisingforscotland.com':'\uD83C\uDF3F',
    'votewiser.scot':           '\uD83D\uDDF3'
  };

  // ── Auth ──────────────────────────────────────────────────
  function getSession() {
    try {
      var ref = SUPABASE_URL.split('//')[1].split('.')[0];
      var raw = localStorage.getItem('sb-'+ref+'-auth-token');
      if (!raw) return null;
      var p = JSON.parse(raw);
      if (!p||!p.user) return null;
      if (p.expires_at && p.expires_at < Math.floor(Date.now()/1000)) return null;
      return p.user;
    } catch(e){return null;}
  }
  function getToken() {
    try {
      var ref = SUPABASE_URL.split('//')[1].split('.')[0];
      var p = JSON.parse(localStorage.getItem('sb-'+ref+'-auth-token'));
      return p ? p.access_token||'' : '';
    } catch(e){return '';}
  }
  function signOut() {
    fetch(SUPABASE_URL+'/auth/v1/logout',{
      method:'POST',
      headers:{'apikey':SUPABASE_ANON_KEY,'Authorization':'Bearer '+getToken()}
    }).catch(function(){}).finally(function(){
      Object.keys(localStorage).forEach(function(k){ if(k.startsWith('sb-')) localStorage.removeItem(k); });
      window.location.reload();
    });
  }

  // ── Build ─────────────────────────────────────────────────
  function build() {
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);

    var totalH = 0;

    // ── NOTIFICATION STRIP ──
    if (NOTIFICATION.active && NOTIFICATION.message) {
      var sc = STRIP_COLORS[NOTIFICATION.type] || STRIP_COLORS.info;
      var strip = document.createElement('div');
      strip.id = 'wfstrip';
      strip.style.cssText = 'background:'+sc.bg+';color:'+sc.text+';top:0';

      var dot = document.createElement('span');
      dot.id = 'wfstrip-dot';
      dot.style.background = sc.dot;

      var msg = document.createElement('span');
      msg.id = 'wfstrip-msg';
      msg.textContent = NOTIFICATION.message;

      var close = document.createElement('button');
      close.id = 'wfstrip-close';
      close.innerHTML = '&times;';
      close.style.color = sc.text;
      close.onclick = function() {
        strip.style.display = 'none';
        bar.style.top = '0';
        sp.style.height = BAR_HEIGHT;
      };

      strip.appendChild(dot);
      strip.appendChild(msg);
      strip.appendChild(close);
      document.body.insertBefore(strip, document.body.firstChild);
      totalH += parseInt(STRIP_HEIGHT);
    }

    // ── MAIN BAR ──
    var bar = document.createElement('div');
    bar.id = 'wfbar';
    bar.style.top = totalH > 0 ? STRIP_HEIGHT : '0';

    // LEFT
    var left = document.createElement('div');
    left.id = 'wfbar-left';

    // Logo block
    var logoWrap = document.createElement('div');
    logoWrap.id = 'wfbar-logo-wrap';
    var hex = document.createElement('span');
    hex.id = 'wfbar-hex';
    hex.textContent = '\u2B21';
    var logo = document.createElement('a');
    logo.id = 'wfbar-logo';
    logo.href = 'https://weefowk.org';
    logo.textContent = 'Wee Fowk Network';
    logoWrap.appendChild(hex);
    logoWrap.appendChild(logo);
    left.appendChild(logoWrap);

    // Tagline
    var tagWrap = document.createElement('div');
    tagWrap.id = 'wfbar-tagline-wrap';
    var tag = document.createElement('span');
    tag.id = 'wfbar-tagline';
    tag.innerHTML = '<span id="wfbar-tagline-full">'+TAGLINE_FULL+'</span><span id="wfbar-tagline-mobile">'+TAGLINE_MOBILE+'</span>';
    tagWrap.appendChild(tag);
    left.appendChild(tagWrap);

    // Network dropdown
    var netWrap = document.createElement('div');
    netWrap.id = 'wfbar-net';

    var netBtn = document.createElement('button');
    netBtn.id = 'wfbar-net-btn';
    netBtn.innerHTML = globeSVG(13)+'<span>Network</span>'+chevronSVG();
    netBtn.setAttribute('aria-haspopup','true');
    netBtn.setAttribute('aria-expanded','false');

    var dropdown = document.createElement('div');
    dropdown.id = 'wfbar-dropdown';

    var ddHeader = document.createElement('div');
    ddHeader.id = 'wfbar-dd-header';
    ddHeader.innerHTML = '<span id="wfbar-dd-header-label">Wee Fowk Network</span>';
    dropdown.appendChild(ddHeader);

    NETWORK_SITES.forEach(function(s) {
      var host = s.url.replace('https://','').replace('http://','').split('/')[0];
      var isCurrent = (CURRENT_DOMAIN===host || CURRENT_DOMAIN==='www.'+host);
      var icon = SITE_ICONS[host] || '\u2B21';

      var el = document.createElement(s.comingSoon ? 'span' : 'a');
      if (!s.comingSoon) el.href = s.url;
      el.className = 'wfdd-item'+(isCurrent?' wfdd-current':'')+(s.comingSoon?' wfdd-soon':'');

      var iconEl = document.createElement('div');
      iconEl.className = 'wfdd-item-icon';
      iconEl.textContent = icon;

      var textEl = document.createElement('div');
      textEl.className = 'wfdd-item-text';
      textEl.innerHTML = '<span class="wfdd-item-name">'+s.name+'</span><span class="wfdd-item-desc">'+s.description+'</span>';

      el.appendChild(iconEl);
      el.appendChild(textEl);

      if (s.comingSoon) {
        var badge = document.createElement('span');
        badge.className = 'wfdd-soon-badge';
        badge.textContent = 'Soon';
        el.appendChild(badge);
      }

      dropdown.appendChild(el);
    });

    netBtn.onclick = function(e) {
      e.stopPropagation();
      var isOpen = dropdown.classList.contains('open');
      dropdown.classList.toggle('open', !isOpen);
      netBtn.classList.toggle('open', !isOpen);
      netBtn.setAttribute('aria-expanded', String(!isOpen));
    };
    document.addEventListener('click', function() {
      dropdown.classList.remove('open');
      netBtn.classList.remove('open');
      netBtn.setAttribute('aria-expanded','false');
    });

    netWrap.appendChild(netBtn);
    netWrap.appendChild(dropdown);
    left.appendChild(netWrap);

    // RIGHT
    var right = document.createElement('div');
    right.id = 'wfbar-right';

    // Notification bell
    var bell = document.createElement('button');
    bell.id = 'wfbar-notif';
    bell.innerHTML = bellSVG();
    bell.title = 'Notifications';
    // Badge – hidden until notifications exist
    // var badge = document.createElement('span'); badge.id = 'wfbar-notif-badge'; bell.appendChild(badge);
    right.appendChild(bell);

    var user = getSession();
    if (user) {
      var m = user.user_metadata||{};
      var name = m.first_name||user.email.split('@')[0];
      var u = document.createElement('div');
      u.id = 'wfbar-user';
      u.innerHTML = 'Hi, <span>'+name+'</span>';
      var signOutBtn = document.createElement('button');
      signOutBtn.className = 'wfbtn';
      signOutBtn.textContent = 'Sign out';
      signOutBtn.onclick = signOut;
      right.appendChild(u);
      right.appendChild(signOutBtn);
    } else {
      var si = document.createElement('a');
      si.className = 'wfbtn';
      si.textContent = 'Sign in';
      si.href = 'https://weefowk.org/signin';
      var join = document.createElement('a');
      join.className = 'wfbtn primary';
      join.textContent = 'Join';
      join.href = 'https://weefowk.org/#join';
      right.appendChild(si);
      right.appendChild(join);
    }

    bar.appendChild(left);
    bar.appendChild(right);

    // SPACER
    var sp = document.createElement('div');
    sp.className = 'wfspacer';
    sp.style.height = totalTopHeight;

    document.body.insertBefore(sp, document.body.firstChild);
    document.body.insertBefore(bar, document.body.firstChild);
  }

  if (document.readyState==='loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }

})();

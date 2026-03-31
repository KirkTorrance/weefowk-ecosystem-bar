(function () {

  // ============================================================
  // CONFIGURATION
  // ============================================================
  var SUPABASE_URL      = 'https://dfiueufymejikowcevex.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmaXVldWZ5bWVqaWtvd2NldmV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4MjgyMjQsImV4cCI6MjA5MDQwNDIyNH0.66M11sx54ZZKou8lv0nYOIkfkP0C4cd8_PyPp6ej78A';

  var TAGLINE_FULL   = 'Two Votes, One Voice, for Independence';
  var TAGLINE_MOBILE = 'Two Votes, One Voice';

  // ── Dropdown order: VoteWiser first, WeeFowk second, Organising third ──
  var NETWORK_SITES = [
    { name: 'VoteWiser',  url: 'https://votewiser.scot',            description: 'Electoral Intelligence', icon: '\uD83D\uDDF3' },
    { name: 'Wee Fowk',   url: 'https://weefowk.org',              description: 'The Network',            icon: '\u2B21' },
    { name: 'Organising', url: 'https://organisingforscotland.com', description: 'Organising Engine',      icon: '\uD83C\uDF3F', comingSoon: true }
  ];

  // ============================================================
  // COLOURS
  // ============================================================
  var BLUE      = '#003F8A';
  var BLUE_DARK = '#002D65';
  var WHITE     = '#FFFFFF';
  var WHITE_55  = 'rgba(255,255,255,0.55)';
  var WHITE_08  = 'rgba(255,255,255,0.08)';
  var WHITE_15  = 'rgba(255,255,255,0.15)';
  var GOLD      = '#F0C040';
  var GOLD_20   = 'rgba(240,192,64,0.2)';
  var RED_SOFT  = '#FF6B6B';

  var STRIP_PALETTES = {
    info:    { bg:'#DBEAFE', text:'#1E3A6E', border:'#BFDBFE', dot:'#3B82F6' },
    success: { bg:'#DCFCE7', text:'#14532D', border:'#BBF7D0', dot:'#22C55E' },
    warning: { bg:'#FEF9C3', text:'#713F12', border:'#FEF08A', dot:'#EAB308' },
    alert:   { bg:'#FEE2E2', text:'#7F1D1D', border:'#FECACA', dot:'#EF4444' }
  };

  var BAR_HEIGHT   = 52;
  var STRIP_HEIGHT = 38;
  var CURRENT_DOMAIN = window.location.hostname;

  // ============================================================
  // CSS
  // ============================================================
  var css = [
    '#wfbar{position:fixed;top:0;left:0;right:0;height:'+BAR_HEIGHT+'px;background:'+BLUE+';display:flex;align-items:center;justify-content:space-between;padding:0 20px;z-index:99998;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;font-size:13px;box-sizing:border-box;border-bottom:1px solid '+BLUE_DARK+';box-shadow:0 2px 16px rgba(0,0,0,.3)}',
    '#wfbar *{box-sizing:border-box;margin:0;padding:0}',
    '#wfbar-left{display:flex;align-items:center;height:100%;gap:0;flex-shrink:0;min-width:0}',
    '#wfbar-logo-wrap{display:flex;align-items:center;gap:9px;padding-right:18px;border-right:1px solid '+WHITE_15+';height:100%;flex-shrink:0}',
    '#wfbar-hex{color:'+GOLD+';font-size:17px;line-height:1;flex-shrink:0}',
    '#wfbar-logo{color:'+WHITE+';font-weight:700;font-size:13px;text-decoration:none;letter-spacing:.3px;white-space:nowrap}',
    '#wfbar-logo:hover{color:'+GOLD+'}',
    '#wfbar-tag-wrap{display:flex;align-items:center;padding:0 18px;border-right:1px solid '+WHITE_15+';height:100%;flex-shrink:0}',
    '#wfbar-tag{color:'+WHITE_55+';font-size:10px;letter-spacing:1.8px;white-space:nowrap;text-transform:uppercase;font-weight:500}',
    '#wfbar-tag-full{display:inline}',
    '#wfbar-tag-mobile{display:none}',
    '#wfbar-net{position:relative;height:100%;display:flex;align-items:center;padding:0 4px 0 12px;flex-shrink:0}',
    '#wfbar-net-btn{background:none;border:none;cursor:pointer;color:'+WHITE_55+';font-size:12px;font-family:inherit;display:flex;align-items:center;gap:7px;padding:6px 10px;border-radius:5px;transition:color .15s,background .15s;white-space:nowrap;letter-spacing:.2px;line-height:1}',
    '#wfbar-net-btn:hover{color:'+WHITE+';background:'+WHITE_08+'}',
    '#wfbar-net-btn[aria-expanded="true"]{color:'+GOLD+';background:'+GOLD_20+'}',
    '#wfbar-dd{position:absolute;top:calc(100% + 4px);left:0;background:'+BLUE_DARK+';border:1px solid '+WHITE_15+';border-radius:8px;min-width:240px;padding:6px;z-index:99999;opacity:0;visibility:hidden;transform:translateY(-6px);transition:opacity .15s,transform .15s,visibility .15s;pointer-events:none}',
    '#wfbar-dd.wf-open{opacity:1;visibility:visible;transform:translateY(0);pointer-events:auto}',
    '#wfbar-dd-hdr{padding:8px 12px 10px;border-bottom:1px solid '+WHITE_15+';margin-bottom:6px}',
    '#wfbar-dd-hdr span{font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:'+GOLD+';opacity:.7}',
    '.wfdd-row{display:flex;align-items:center;gap:11px;padding:9px 12px;border-radius:5px;text-decoration:none;transition:background .12s;cursor:pointer}',
    '.wfdd-row:hover{background:'+WHITE_08+'}',
    '.wfdd-row.wf-cur{background:rgba(240,192,64,.12);cursor:default}',
    '.wfdd-row.wf-soon{cursor:default}',
    '.wfdd-icon{width:32px;height:32px;border-radius:6px;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px}',
    '.wfdd-row.wf-cur .wfdd-icon{background:'+GOLD_20+'}',
    '.wfdd-row.wf-soon .wfdd-icon{opacity:.35}',
    '.wfdd-text{display:flex;flex-direction:column;gap:1px;min-width:0}',
    '.wfdd-name{font-size:13px;font-weight:600;color:'+WHITE+';letter-spacing:.1px}',
    '.wfdd-row.wf-cur .wfdd-name{color:'+GOLD+'}',
    '.wfdd-row.wf-soon .wfdd-name{color:rgba(255,255,255,.3)}',
    '.wfdd-desc{font-size:11px;color:rgba(255,255,255,.4)}',
    '.wfdd-soon-tag{font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:'+GOLD+';opacity:.6;margin-left:auto;padding:2px 6px;border:1px solid rgba(240,192,64,.25);border-radius:3px;flex-shrink:0}',
    '#wfbar-right{display:flex;align-items:center;gap:8px;flex-shrink:0}',
    '#wfbar-bell{position:relative;background:none;border:none;cursor:pointer;color:'+WHITE_55+';padding:6px;border-radius:5px;display:flex;align-items:center;justify-content:center;transition:color .15s,background .15s;line-height:1}',
    '#wfbar-bell:hover{color:'+WHITE+';background:'+WHITE_08+'}',
    '#wfbar-bell-badge{position:absolute;top:5px;right:5px;width:7px;height:7px;border-radius:50%;background:'+RED_SOFT+';border:1.5px solid '+BLUE+';display:none}',
    '#wfbar-bell-badge.wf-show{display:block}',
    '#wfbar-user{color:'+WHITE_55+';font-size:12px;white-space:nowrap;letter-spacing:.2px}',
    '#wfbar-user span{color:'+GOLD+';font-weight:600}',
    '.wfbtn{background:rgba(255,255,255,.1);border:1px solid '+WHITE_15+';color:'+WHITE+';padding:5px 14px;border-radius:5px;cursor:pointer;font-size:12px;text-decoration:none;white-space:nowrap;transition:all .15s;font-family:inherit;font-weight:500;letter-spacing:.3px;line-height:1;display:inline-flex;align-items:center}',
    '.wfbtn:hover{background:'+WHITE+';color:'+BLUE+'}',
    '.wfbtn-gold{background:'+GOLD+';border:1px solid '+GOLD+';color:'+BLUE_DARK+';font-weight:700}',
    '.wfbtn-gold:hover{background:#FFD060;border-color:#FFD060;color:'+BLUE_DARK+'}',
    '#wfbar-strip{position:fixed;left:0;right:0;z-index:99997;height:'+STRIP_HEIGHT+'px;display:none;align-items:center;justify-content:center;gap:10px;padding:0 20px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;font-size:13px;font-weight:500;border-bottom:1px solid transparent}',
    '#wfbar-strip.wf-strip-show{display:flex}',
    '#wfbar-strip-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}',
    '#wfbar-strip-msg{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;text-align:center}',
    '#wfbar-strip-close{background:none;border:none;cursor:pointer;font-size:16px;line-height:1;opacity:.5;padding:0 0 0 8px;flex-shrink:0;transition:opacity .15s;font-family:inherit}',
    '#wfbar-strip-close:hover{opacity:1}',
    '#wfbar-spacer{display:block}',
    '@media(max-width:800px){#wfbar-tag-wrap{display:none}#wfbar-user{display:none}#wfbar{padding:0 14px}}',
    '@media(max-width:480px){#wfbar-tag-full{display:none}#wfbar-tag-mobile{display:inline}}'
  ].join('');

  // ── SVG helpers ────────────────────────────────────────────
  function svgGlobe() {
    return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
  }
  function svgChevron() {
    return '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
  }
  function svgBell() {
    return '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>';
  }

  // ── Auth helpers ───────────────────────────────────────────
  function getSession() {
    try {
      var ref = SUPABASE_URL.split('//')[1].split('.')[0];
      var raw = localStorage.getItem('sb-'+ref+'-auth-token');
      if (!raw) return null;
      var p = JSON.parse(raw);
      if (!p || !p.user) return null;
      if (p.expires_at && p.expires_at < Math.floor(Date.now()/1000)) return null;
      return p.user;
    } catch(e) { return null; }
  }
  function getToken() {
    try {
      var ref = SUPABASE_URL.split('//')[1].split('.')[0];
      var p = JSON.parse(localStorage.getItem('sb-'+ref+'-auth-token'));
      return p ? p.access_token||'' : '';
    } catch(e) { return ''; }
  }
  function signOut() {
    fetch(SUPABASE_URL+'/auth/v1/logout', {
      method: 'POST',
      headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': 'Bearer '+getToken() }
    }).catch(function(){}).finally(function(){
      Object.keys(localStorage).forEach(function(k){ if (k.startsWith('sb-')) localStorage.removeItem(k); });
      window.location.reload();
    });
  }

  // ── Fetch notification config ──────────────────────────────
  function fetchConfig(callback) {
    fetch(SUPABASE_URL+'/rest/v1/network_config?select=key,value', {
      headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': 'Bearer '+SUPABASE_ANON_KEY }
    })
    .then(function(r){ return r.ok ? r.json() : []; })
    .then(function(rows) {
      var cfg = {};
      if (Array.isArray(rows)) rows.forEach(function(row){ cfg[row.key] = row.value; });
      callback(cfg);
    })
    .catch(function(){ callback({}); });
  }

  // ── Build ──────────────────────────────────────────────────
  function build(cfg) {
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);

    var notifActive  = cfg['notification_active']  === 'true';
    var notifMessage = cfg['notification_message'] || '';
    var notifType    = cfg['notification_type']    || 'info';
    var palette      = STRIP_PALETTES[notifType]   || STRIP_PALETTES.info;
    var totalOffset  = BAR_HEIGHT + (notifActive && notifMessage ? STRIP_HEIGHT : 0);

    // ── BAR ────────────────────────────────────────────────────
    var bar = document.createElement('div'); bar.id = 'wfbar';

    // LEFT
    var left = document.createElement('div'); left.id = 'wfbar-left';

    // Logo
    var lw = document.createElement('div'); lw.id = 'wfbar-logo-wrap';
    var hex = document.createElement('span'); hex.id = 'wfbar-hex'; hex.textContent = '\u2B21';
    var logo = document.createElement('a'); logo.id = 'wfbar-logo';
    logo.href = 'https://weefowk.org'; logo.textContent = 'Wee Fowk Network';
    lw.appendChild(hex); lw.appendChild(logo); left.appendChild(lw);

    // Tagline
    var tw = document.createElement('div'); tw.id = 'wfbar-tag-wrap';
    var tg = document.createElement('span'); tg.id = 'wfbar-tag';
    tg.innerHTML = '<span id="wfbar-tag-full">'+TAGLINE_FULL+'</span><span id="wfbar-tag-mobile">'+TAGLINE_MOBILE+'</span>';
    tw.appendChild(tg); left.appendChild(tw);

    // Network dropdown
    var netWrap = document.createElement('div'); netWrap.id = 'wfbar-net';
    var netBtn  = document.createElement('button'); netBtn.id = 'wfbar-net-btn';
    netBtn.setAttribute('type','button');
    netBtn.setAttribute('aria-haspopup','true');
    netBtn.setAttribute('aria-expanded','false');
    netBtn.innerHTML = svgGlobe()+'<span>Network</span>'+svgChevron();

    var dd = document.createElement('div'); dd.id = 'wfbar-dd';
    var ddHdr = document.createElement('div'); ddHdr.id = 'wfbar-dd-hdr';
    ddHdr.innerHTML = '<span>Wee Fowk Network</span>';
    dd.appendChild(ddHdr);

    NETWORK_SITES.forEach(function(s) {
      var host = s.url.replace(/https?:\/\//,'').split('/')[0];
      var isCurrent = (CURRENT_DOMAIN === host || CURRENT_DOMAIN === 'www.'+host);
      var row = document.createElement(s.comingSoon ? 'span' : 'a');
      if (!s.comingSoon) row.href = s.url;
      row.className = 'wfdd-row'+(isCurrent?' wf-cur':'')+(s.comingSoon?' wf-soon':'');
      var iconEl = document.createElement('div'); iconEl.className = 'wfdd-icon'; iconEl.textContent = s.icon;
      var textEl = document.createElement('div'); textEl.className = 'wfdd-text';
      textEl.innerHTML = '<span class="wfdd-name">'+s.name+'</span><span class="wfdd-desc">'+s.description+'</span>';
      row.appendChild(iconEl); row.appendChild(textEl);
      if (s.comingSoon) {
        var badge = document.createElement('span'); badge.className = 'wfdd-soon-tag'; badge.textContent = 'Soon';
        row.appendChild(badge);
      }
      dd.appendChild(row);
    });

    // Dropdown – mousedown beats React synthetic events
    netBtn.addEventListener('mousedown', function(e) {
      e.preventDefault(); e.stopPropagation();
      var isOpen = dd.classList.contains('wf-open');
      dd.classList.toggle('wf-open', !isOpen);
      netBtn.setAttribute('aria-expanded', String(!isOpen));
    });
    document.addEventListener('mousedown', function(e) {
      if (!netWrap.contains(e.target)) {
        dd.classList.remove('wf-open');
        netBtn.setAttribute('aria-expanded','false');
      }
    }, true);

    netWrap.appendChild(netBtn); netWrap.appendChild(dd); left.appendChild(netWrap);

    // RIGHT
    var right = document.createElement('div'); right.id = 'wfbar-right';

    // Bell
    var bell = document.createElement('button'); bell.id = 'wfbar-bell';
    bell.setAttribute('type','button'); bell.title = 'Notifications';
    bell.innerHTML = svgBell();
    var bellBadge = document.createElement('span'); bellBadge.id = 'wfbar-bell-badge';
    if (notifActive && notifMessage) bellBadge.classList.add('wf-show');
    bell.appendChild(bellBadge);
    right.appendChild(bell);

    // Auth state
    var user = getSession();
    if (user) {
      var m    = user.user_metadata || {};
      var name = m.first_name || user.email.split('@')[0];
      var ud   = document.createElement('div'); ud.id = 'wfbar-user';
      ud.innerHTML = 'Hi, <span>'+name+'</span>';
      var soBtn = document.createElement('button'); soBtn.className = 'wfbtn';
      soBtn.setAttribute('type','button'); soBtn.textContent = 'Sign out';
      soBtn.addEventListener('click', signOut);
      right.appendChild(ud);
      right.appendChild(soBtn);
    } else {
      // ── FIX: single gold button, appended to right ──
      var si = document.createElement('a');
      si.className = 'wfbtn wfbtn-gold';
      si.textContent = 'Sign in / Join';
      si.href = 'https://votewiser.scot/dashboard';
      right.appendChild(si); // ← this line was missing in the previous version
    }

    bar.appendChild(left); bar.appendChild(right);

    // ── NOTIFICATION STRIP (below bar) ────────────────────────
    var strip = document.createElement('div'); strip.id = 'wfbar-strip';
    strip.style.cssText = 'top:'+BAR_HEIGHT+'px;background:'+palette.bg+';color:'+palette.text+';border-bottom-color:'+palette.border;
    var dot      = document.createElement('span'); dot.id = 'wfbar-strip-dot'; dot.style.background = palette.dot;
    var msg      = document.createElement('span'); msg.id = 'wfbar-strip-msg'; msg.textContent = notifMessage;
    var closeBtn = document.createElement('button'); closeBtn.id = 'wfbar-strip-close';
    closeBtn.setAttribute('type','button'); closeBtn.innerHTML = '&times;'; closeBtn.style.color = palette.text;
    closeBtn.addEventListener('click', function() {
      strip.classList.remove('wf-strip-show'); strip.style.display = 'none';
      spacer.style.height = BAR_HEIGHT+'px'; bellBadge.classList.remove('wf-show');
    });
    strip.appendChild(dot); strip.appendChild(msg); strip.appendChild(closeBtn);
    if (notifActive && notifMessage) strip.classList.add('wf-strip-show');

    // ── SPACER ─────────────────────────────────────────────────
    var spacer = document.createElement('div'); spacer.id = 'wfbar-spacer';
    spacer.style.height = totalOffset+'px';

    // ── INSERT ─────────────────────────────────────────────────
    var first = document.body.firstChild;
    document.body.insertBefore(spacer, first);
    document.body.insertBefore(strip,  first);
    document.body.insertBefore(bar,    first);
  }

  // ── Init ───────────────────────────────────────────────────
  function init() { fetchConfig(function(cfg) { build(cfg); }); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

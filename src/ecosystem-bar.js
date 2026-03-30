(function () {

  // ============================================================
  // CONFIGURATION
  // ============================================================
  var SUPABASE_URL = 'https://dfiueufymejikowcevex.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmaXVldWZ5bWVqaWtvd2NldmV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4MjgyMjQsImV4cCI6MjA5MDQwNDIyNH0.66M11sx54ZZKou8lv0nYOIkfkP0C4cd8_PyPp6ej78A';

  // ============================================================
  // NETWORK SITES
  // comingSoon: true = rendered as non-linking label in the bar
  // To add a new site: add an entry here, minify, re-upload.
  // All sites update automatically. No Lovable changes needed.
  // ============================================================
  var NETWORK_SITES = [
    { name: 'Wee Fowk', url: 'https://weefowk.org', description: 'The Network' },
    { name: 'Organising', url: 'https://organisingforscotland.com', description: 'Organising Engine – Coming Soon', comingSoon: true },
    { name: 'VoteWiser', url: 'https://votewiser.scot', description: 'How to Vote' }
  ];
  // VoteALBA.org removed – de-registered. Domain redirects to weefowk.org.

  // ============================================================
  // DO NOT EDIT BELOW THIS LINE
  // ============================================================
  var BAR_HEIGHT = '48px';
  var CURRENT_DOMAIN = window.location.hostname;

  var css = [
    '#wfbar{position:fixed;top:0;left:0;right:0;height:'+BAR_HEIGHT+';background:#0A1628;border-bottom:1px solid #C9A84C;display:flex;align-items:center;justify-content:space-between;padding:0 16px;z-index:99999;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;font-size:13px;box-sizing:border-box}',
    '#wfbar *{box-sizing:border-box}',
    '#wfbar-left{display:flex;align-items:center;gap:8px;flex-shrink:0}',
    '#wfbar-logo{color:#C9A84C;font-weight:700;font-size:13px;text-decoration:none;letter-spacing:.5px;white-space:nowrap}',
    '#wfbar-logo:hover{color:#fff}',
    '#wfbar-div{width:1px;height:20px;background:rgba(201,168,76,.3)}',
    '#wfbar-nav{display:flex;align-items:center;gap:4px;overflow-x:auto;scrollbar-width:none}',
    '#wfbar-nav::-webkit-scrollbar{display:none}',
    '.wfnl{color:#9ca3af;text-decoration:none;padding:4px 10px;border-radius:4px;white-space:nowrap;font-size:12px;transition:color .15s,background .15s}',
    '.wfnl:hover{color:#fff;background:rgba(201,168,76,.15)}',
    '.wfnl-active{color:#C9A84C!important;font-weight:600}',
    '.wfnl-soon{color:#4b5563;font-size:12px;padding:4px 10px;white-space:nowrap;cursor:default;border:1px dashed rgba(201,168,76,.25);border-radius:4px;}',
    '.wfnl-soon-badge{font-size:10px;color:#C9A84C;opacity:.7;margin-left:4px;letter-spacing:.3px;}',
    '#wfbar-right{display:flex;align-items:center;gap:8px;flex-shrink:0}',
    '#wfbar-user{color:#9ca3af;font-size:12px;white-space:nowrap}',
    '#wfbar-user span{color:#C9A84C}',
    '.wfbtn{background:none;border:1px solid #C9A84C;color:#C9A84C;padding:3px 10px;border-radius:4px;cursor:pointer;font-size:12px;text-decoration:none;white-space:nowrap;transition:background .15s,color .15s;font-family:inherit}',
    '.wfbtn:hover{background:#C9A84C;color:#0A1628}',
    '.wfspacer{height:'+BAR_HEIGHT+';display:block}',
    '@media(max-width:640px){#wfbar-user{display:none}.wfnl{padding:4px 7px;font-size:11px}.wfnl-soon{padding:4px 7px;font-size:11px}#wfbar-logo{font-size:12px}}'
  ].join('');

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
      Object.keys(localStorage).forEach(function(k){
        if(k.startsWith('sb-')) localStorage.removeItem(k);
      });
      window.location.reload();
    });
  }

  function build() {
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);

    var bar = document.createElement('div');
    bar.id = 'wfbar';

    var left = document.createElement('div');
    left.id = 'wfbar-left';

    var logo = document.createElement('a');
    logo.id = 'wfbar-logo';
    logo.href = 'https://weefowk.org';
    logo.textContent = '\u2B21 Wee Fowk Network';

    var div = document.createElement('div');
    div.id = 'wfbar-div';

    var nav = document.createElement('nav');
    nav.id = 'wfbar-nav';

    NETWORK_SITES.forEach(function(s){
      if (s.comingSoon) {
        var span = document.createElement('span');
        span.className = 'wfnl-soon';
        span.title = s.description;
        span.textContent = s.name;
        var badge = document.createElement('span');
        badge.className = 'wfnl-soon-badge';
        badge.textContent = 'soon';
        span.appendChild(badge);
        nav.appendChild(span);
      } else {
        var a = document.createElement('a');
        a.href = s.url;
        a.textContent = s.name;
        a.className = 'wfnl';
        if (s.description) a.title = s.description;
        var host = s.url.replace('https://','').replace('http://','').split('/')[0];
        if (CURRENT_DOMAIN===host||CURRENT_DOMAIN==='www.'+host) {
          a.className += ' wfnl-active';
        }
        nav.appendChild(a);
      }
    });

    left.appendChild(logo);
    left.appendChild(div);
    left.appendChild(nav);

    var right = document.createElement('div');
    right.id = 'wfbar-right';

    var user = getSession();
    if (user) {
      var m = user.user_metadata||{};
      var name = m.first_name||user.email.split('@')[0];
      var u = document.createElement('div');
      u.id = 'wfbar-user';
      u.innerHTML = 'Hi, <span>'+name+'</span>';
      var btn = document.createElement('button');
      btn.className = 'wfbtn';
      btn.textContent = 'Sign out';
      btn.onclick = signOut;
      right.appendChild(u);
      right.appendChild(btn);
    } else {
      var si = document.createElement('a');
      si.className = 'wfbtn';
      si.textContent = 'Sign in';
      si.href = 'https://weefowk.org/signin';
      right.appendChild(si);
    }

    bar.appendChild(left);
    bar.appendChild(right);

    var sp = document.createElement('div');
    sp.className = 'wfspacer';

    document.body.insertBefore(sp, document.body.firstChild);
    document.body.insertBefore(bar, document.body.firstChild);
  }

  if (document.readyState==='loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }

})();

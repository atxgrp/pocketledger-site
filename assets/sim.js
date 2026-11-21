/* Pocket Ledger simulations: a Mac window and an iPhone, with invented data. No network, nothing stored. */
(function () {
  'use strict';
  var LANG = document.documentElement.lang === 'fr' ? 'fr' : 'en';
  var TT = {
    fr: {
      sim: 'Simulation avec des données fictives. Cliquez, tout fonctionne.', mac: 'Mac', phone: 'iPhone', dash: 'Tableau de bord', acc: 'Comptes', bud: 'Budget', fc: 'Prévisionnel', loan: 'Prêts',
      home: 'Accueil', tx: 'Transactions', more: 'Plus', netw: 'Patrimoine', month: 'Dépenses du mois', coming: 'À venir', none: 'Sans catégorie', all: 'Toutes', uncat: 'Non catégorisées', pending: 'Non pointées',
      date: 'Date', payee: 'Bénéficiaire', cat: 'Catégorie', amount: 'Montant', cleared: 'Pointée', clear: 'Pointer', unclear: 'Retirer le pointage', accounts: 'Comptes',
      budT: 'Budget du mois', budS: 'Une enveloppe par catégorie. Ajustez-les avec + et −.', left: 'reste', over: 'dépassé de', of: 'sur', raise: 'Augmenter', lower: 'Diminuer',
      fcT: 'Prévisionnel', fcS: 'Votre solde mois par mois, d\'après les échéances connues.', var: 'Inclure une estimation des dépenses courantes', stays: 'Le solde reste positif sur 12 mois.', negIn: 'Le solde passe sous zéro en',
      loanT: 'Simulation de prêt', loanS: 'Mensualité, coût et effet d\'un remboursement anticipé.', cap: 'Capital emprunté', rate: 'Taux annuel', years: 'Durée', yrs: 'ans', pre: 'Remboursement anticipé après 5 ans',
      pay: 'Mensualité', interest: 'Intérêts totaux', saved: 'Mois gagnés', savedI: 'Intérêts économisés', months: 'mois', nopre: 'Aucun remboursement anticipé simulé.',
      moreT: 'Plus', add: 'Nouvelle dépense', amt: 'Montant (€)', pay2: 'Bénéficiaire', cancel: 'Annuler', save: 'Ajouter', search: 'Rechercher', added: 'Dépense ajoutée.',
      mItems: ['Prévisionnel', 'Prêts', 'Épargne et placements', 'Abonnements', 'Importer un relevé', 'Analyse de vos données'], thisM: 'Ce mois-ci',
      acct: ['Compte courant', 'Livret A', 'Compte commun'],
      p: { market: 'Supermarché', bakery: 'Boulangerie', rent: 'Loyer', salary: 'Salaire', cinema: 'Cinéma', train: 'Train', mobile: 'Forfait mobile', resto: 'Restaurant', pharm: 'Pharmacie', gift: 'Cadeau', bike: 'Réparation vélo' },
      c: { food: 'Alimentation', housing: 'Logement', transport: 'Transports', leisure: 'Loisirs', subs: 'Abonnements', eat: 'Restaurants', income: 'Revenus' },
      up: ['Loyer', 'Assurance habitation', 'Forfait mobile']
    },
    en: {
      sim: 'Simulation with made-up data. Click around, it all works.', mac: 'Mac', phone: 'iPhone', dash: 'Dashboard', acc: 'Accounts', bud: 'Budget', fc: 'Forecast', loan: 'Loans',
      home: 'Home', tx: 'Transactions', more: 'More', netw: 'Net worth', month: 'Spending this month', coming: 'Coming up', none: 'No category', all: 'All', uncat: 'Uncategorised', pending: 'Not cleared',
      date: 'Date', payee: 'Payee', cat: 'Category', amount: 'Amount', cleared: 'Cleared', clear: 'Mark as cleared', unclear: 'Remove cleared mark', accounts: 'Accounts',
      budT: 'Budget this month', budS: 'One envelope per category. Adjust them with + and −.', left: 'left', over: 'over by', of: 'of', raise: 'Increase', lower: 'Decrease',
      fcT: 'Forecast', fcS: 'Your balance month by month, from the items already known.', var: 'Include an estimate of everyday spending', stays: 'The balance stays positive for 12 months.', negIn: 'The balance drops below zero in',
      loanT: 'Loan simulation', loanS: 'Payment, cost and the effect of an early repayment.', cap: 'Amount borrowed', rate: 'Yearly rate', years: 'Term', yrs: 'years', pre: 'Early repayment after 5 years',
      pay: 'Monthly payment', interest: 'Total interest', saved: 'Months saved', savedI: 'Interest saved', months: 'months', nopre: 'No early repayment simulated.',
      moreT: 'More', add: 'New expense', amt: 'Amount (€)', pay2: 'Payee', cancel: 'Cancel', save: 'Add', search: 'Search', added: 'Expense added.',
      mItems: ['Forecast', 'Loans', 'Savings and investments', 'Subscriptions', 'Import a statement', 'Data analysis'], thisM: 'This month',
      acct: ['Current account', 'Savings account', 'Joint account'],
      p: { market: 'Supermarket', bakery: 'Bakery', rent: 'Rent', salary: 'Salary', cinema: 'Cinema', train: 'Train', mobile: 'Mobile plan', resto: 'Restaurant', pharm: 'Pharmacy', gift: 'Gift', bike: 'Bike repair' },
      c: { food: 'Groceries', housing: 'Housing', transport: 'Transport', leisure: 'Leisure', subs: 'Subscriptions', eat: 'Eating out', income: 'Income' },
      up: ['Rent', 'Home insurance', 'Mobile plan']
    }
  };
  var T = TT[LANG];
  var nf = new Intl.NumberFormat(LANG === 'fr' ? 'fr-FR' : 'en-GB', { style: 'currency', currency: 'EUR' });
  function eur(x) { return nf.format(x); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function svg(p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + p + '</svg>'; }
  var IC = {
    dash: svg('<path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/>'), acc: svg('<path d="M3 10l9-6 9 6"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8"/><path d="M3 20h18"/>'),
    bud: svg('<circle cx="12" cy="12" r="9"/><path d="M12 3v9h9"/>'), fc: svg('<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>'), loan: svg('<path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-5h4v5"/>'),
    more: svg('<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>'), tx: svg('<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>'),
    ok: svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>')
  };

  function seed() {
    var p = T.p;
    return {
      acc: [{ n: T.acct[0], v: 2840.5 }, { n: T.acct[1], v: 6200 }, { n: T.acct[2], v: 412.3 }],
      limits: { food: 450, transport: 150, leisure: 120, subs: 80, eat: 90 },
      next: 100,
      tx: [
        { id: 1, d: '03', p: p.market, c: 'food', a: -54.3, ok: false }, { id: 2, d: '03', p: p.bakery, c: 'food', a: -6.8, ok: false },
        { id: 3, d: '02', p: p.resto, c: 'eat', a: -112, ok: true }, { id: 4, d: '02', p: p.pharm, c: null, a: -18.4, ok: false },
        { id: 5, d: '01', p: p.rent, c: 'housing', a: -820, ok: true }, { id: 6, d: '01', p: p.train, c: 'transport', a: -138, ok: true },
        { id: 7, d: '30', p: p.mobile, c: 'subs', a: -27.98, ok: true }, { id: 8, d: '28', p: p.market, c: 'food', a: -351.2, ok: true },
        { id: 9, d: '27', p: p.cinema, c: 'leisure', a: -96, ok: true }, { id: 10, d: '25', p: p.salary, c: 'income', a: 2250, ok: true },
        { id: 11, d: '24', p: p.gift, c: null, a: -46, ok: false }, { id: 12, d: '22', p: p.bike, c: 'transport', a: 0, ok: true }
      ].filter(function (t) { return t.a !== 0; })
    };
  }
  function spent(d, c) { return -d.tx.filter(function (t) { return t.c === c && t.a < 0; }).reduce(function (s, t) { return s + t.a; }, 0); }
  function worth(d) { return d.acc.reduce(function (s, a) { return s + a.v; }, 0); }
  function catName(c) { return c ? T.c[c] : '<span class="tag-none">' + esc(T.none) + '</span>'; }
  function barRow(label, value, max, over) {
    var w = Math.min(100, max ? Math.round(value / max * 100) : 0);
    return '<div class="bar-row"><span>' + esc(label) + '</span><div class="bar' + (over ? ' over' : '') + '" role="img" aria-label="' + esc(label) + ' ' + w + ' %"><i style="width:' + w + '%"></i></div><span class="num" style="text-align:right">' + eur(value) + '</span></div>';
  }

  /* ---------- views, shared by the Mac window and the iPhone ---------- */
  function vDash(d, phone) {
    var cats = ['housing', 'food', 'transport', 'eat', 'leisure', 'subs'], vals = cats.map(function (c) { return spent(d, c); }), max = Math.max.apply(null, vals);
    var total = vals.reduce(function (a, b) { return a + b; }, 0);
    return '<h4>' + esc(phone ? T.home : T.dash) + '</h4><p class="sub">' + esc(T.thisM) + '</p>'
      + '<div class="cards"><div class="kpi"><small>' + esc(T.netw) + '</small><b>' + eur(worth(d)) + '</b></div><div class="kpi"><small>' + esc(T.month) + '</small><b>' + eur(total) + '</b></div></div>'
      + '<div class="panel"><h5>' + esc(T.month) + '</h5><div class="bars">' + cats.map(function (c, i) { return barRow(T.c[c], vals[i], max, false); }).join('') + '</div></div>'
      + (phone ? '<div class="panel"><h5>' + esc(T.tx) + '</h5><ul class="list">' + d.tx.slice(0, 4).map(function (t) { return txItem(t); }).join('') + '</ul></div>'
        : '<div class="panel"><h5>' + esc(T.coming) + '</h5><ul class="list">' + T.up.map(function (n, i) { return '<li><span>' + esc(n) + '</span><span class="num mut">' + [eur(-820), eur(-71.65), eur(-27.98)][i] + '</span></li>'; }).join('') + '</ul></div>');
  }
  function txItem(t) {
    return '<li><span>' + esc(t.p) + '<small>' + t.d + ' · ' + (t.c ? esc(T.c[t.c]) : esc(T.none)) + '</small></span><span class="num ' + (t.a > 0 ? 'pos' : '') + '">' + eur(t.a) + '</span></li>';
  }
  function vAcc(s, d) {
    var f = s.filter, rows = d.tx.filter(function (t) { return f === 'all' || (f === 'uncat' && !t.c) || (f === 'pending' && !t.ok); });
    var chips = [['all', T.all], ['uncat', T.uncat], ['pending', T.pending]].map(function (x) { return '<button type="button" data-act="filter" data-v="' + x[0] + '" aria-pressed="' + (f === x[0]) + '">' + esc(x[1]) + '</button>'; }).join('');
    return '<h4>' + esc(T.acc) + '</h4><p class="sub">' + d.acc.map(function (a) { return esc(a.n) + ' ' + eur(a.v); }).join(' · ') + '</p><div class="chips" role="group" aria-label="Filtres">' + chips + '</div>'
      + '<div class="txw"><table class="tx"><thead><tr><th><span class="sr" style="position:absolute;left:-999px">' + esc(T.cleared) + '</span></th><th class="dc">' + esc(T.date) + '</th><th>' + esc(T.payee) + '</th><th class="cc">' + esc(T.cat) + '</th><th class="r">' + esc(T.amount) + '</th></tr></thead><tbody>'
      + rows.map(function (t) { return '<tr><td><button type="button" class="tick" data-act="tick" data-id="' + t.id + '" aria-pressed="' + t.ok + '" aria-label="' + esc(t.ok ? T.unclear : T.clear) + ' : ' + esc(t.p) + '">' + (t.ok ? IC.ok : '') + '</button></td><td class="dc">' + t.d + '</td><td>' + esc(t.p) + '<small class="mcat">' + catName(t.c) + '</small></td><td class="cc">' + catName(t.c) + '</td><td class="r num ' + (t.a > 0 ? 'pos' : '') + '">' + eur(t.a) + '</td></tr>'; }).join('')
      + '</tbody></table></div>';
  }
  function vBud(d, phone) {
    var cats = Object.keys(d.limits);
    return '<h4>' + esc(T.budT) + '</h4><p class="sub">' + esc(T.budS) + '</p><div class="panel">' + cats.map(function (c) {
      var sp = spent(d, c), lim = d.limits[c], over = sp > lim, w = Math.min(100, Math.round(sp / lim * 100));
      return '<div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><b>' + esc(T.c[c]) + '</b><span class="step"><button type="button" data-act="lim" data-c="' + c + '" data-v="-10" aria-label="' + esc(T.lower) + ' : ' + esc(T.c[c]) + '">−</button><span class="num">' + eur(lim) + '</span><button type="button" data-act="lim" data-c="' + c + '" data-v="10" aria-label="' + esc(T.raise) + ' : ' + esc(T.c[c]) + '">+</button></span></div>'
        + '<div class="bar' + (over ? ' over' : '') + '" role="img" aria-label="' + w + ' %" style="margin:6px 0"><i style="width:' + w + '%"></i></div><small class="' + (over ? 'neg' : 'mut') + '">' + (over ? '⚠ ' + esc(T.over) + ' ' + eur(sp - lim) : eur(lim - sp) + ' ' + esc(T.left)) + ' · ' + eur(sp) + ' ' + esc(T.of) + ' ' + eur(lim) + '</small></div>';
    }).join('') + '</div>';
  }
  function monthsFrom(n) {
    var out = [], d = new Date(), i; for (i = 0; i < n; i++) { out.push(new Date(d.getFullYear(), d.getMonth() + i + 1, 1)); } return out;
  }
  function vFc(s, d) {
    var months = monthsFrom(12), bal = d.acc[0].v, pts = [], neg = -1, i;
    for (i = 0; i < 12; i++) { bal += 2250 - 1230 - (s.variable ? 1290 : 0); pts.push(bal); if (neg < 0 && bal < 0) neg = i; }
    var lo = Math.min(0, Math.min.apply(null, pts)), hi = Math.max.apply(null, pts), W = 640, H = 220, pl = 28, pr = 28, pt = 14, pb = 26;
    function X(i) { return pl + i * (W - pl - pr) / 11; } function Y(v) { return pt + (hi - v) / (hi - lo || 1) * (H - pt - pb); }
    var fmtM = new Intl.DateTimeFormat(LANG === 'fr' ? 'fr-FR' : 'en-GB', { month: 'short' });
    var path = pts.map(function (v, i) { return (i ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(v).toFixed(1); }).join('');
    var labels = months.map(function (m, i) { return i % 2 === 0 ? '<text x="' + X(i) + '" y="' + (H - 8) + '" text-anchor="middle">' + fmtM.format(m) + '</text>' : ''; }).join('');
    var dots = pts.map(function (v, i) { return '<circle cx="' + X(i).toFixed(1) + '" cy="' + Y(v).toFixed(1) + '" r="3.5" fill="' + (v < 0 ? 'var(--neg)' : 'var(--accent)') + '"/>'; }).join('');
    var msg = neg < 0 ? T.stays : T.negIn + ' ' + new Intl.DateTimeFormat(LANG === 'fr' ? 'fr-FR' : 'en-GB', { month: 'long', year: 'numeric' }).format(months[neg]) + '.';
    return '<h4>' + esc(T.fcT) + '</h4><p class="sub">' + esc(T.fcS) + '</p><label class="sw"><input type="checkbox" data-act="var"' + (s.variable ? ' checked' : '') + '> ' + esc(T.var) + '</label>'
      + '<div class="panel"><svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(T.fcT + ' : ' + msg) + '"><line x1="' + pl + '" x2="' + (W - pr) + '" y1="' + Y(0).toFixed(1) + '" y2="' + Y(0).toFixed(1) + '" stroke="var(--line)" stroke-dasharray="4 4"/><path d="' + path + '" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round"/>' + dots + labels + '</svg></div>'
      + '<div class="notice' + (neg >= 0 ? ' warn' : '') + '" role="status">' + (neg >= 0 ? '⚠ ' : '') + esc(msg) + '</div>';
  }
  function loanCalc(P, rate, years, extra) {
    var n = years * 12, r = rate / 1200, pay = r ? P * r / (1 - Math.pow(1 + r, -n)) : P / n, bal = P, int = 0, k = 0;
    while (bal > 0.005 && k < n + 1) { var i = bal * r; int += i; bal -= (pay - i); k++; if (k === 60 && extra) bal = Math.max(0, bal - extra); }
    return { pay: pay, int: int, months: k };
  }
  function vLoan(s) {
    var l = s.loan, a = loanCalc(l.cap, l.rate, l.years, 0), b = loanCalc(l.cap, l.rate, l.years, l.pre);
    function f(id, label, val, min, max, step, shown) { return '<div class="field"><label for="' + id + '">' + esc(label) + '<output>' + shown + '</output></label><input id="' + id + '" type="range" data-act="loan" data-k="' + id.split('-')[1] + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"></div>'; }
    return '<h4>' + esc(T.loanT) + '</h4><p class="sub">' + esc(T.loanS) + '</p>'
      + f('ln-cap', T.cap, l.cap, 50000, 400000, 5000, eur(l.cap)) + f('ln-rate', T.rate, l.rate, 0.5, 6, 0.05, l.rate.toFixed(2) + ' %') + f('ln-years', T.years, l.years, 5, 30, 1, l.years + ' ' + T.yrs) + f('ln-pre', T.pre, l.pre, 0, 50000, 1000, eur(l.pre))
      + '<div class="cards"><div class="kpi"><small>' + esc(T.pay) + '</small><b>' + eur(a.pay) + '</b></div><div class="kpi"><small>' + esc(T.interest) + '</small><b>' + eur(a.int) + '</b></div></div>'
      + '<div class="notice" role="status">' + (l.pre ? esc(T.saved) + ' : <b>' + (a.months - b.months) + '</b> ' + esc(T.months) + ' · ' + esc(T.savedI) + ' : <b>' + eur(a.int - b.int) + '</b>' : esc(T.nopre)) + '</div>';
  }

  /* ---------- the two devices ---------- */
  function Mac(root) {
    var d = seed(), s = { view: 'dash', filter: 'all', variable: false, loan: { cap: 150000, rate: 2.1, years: 20, pre: 0 } };
    var items = ['dash', 'acc', 'bud', 'fc', 'loan'];
    root.innerHTML = '<div class="mac"><div class="mac-title"><i></i><i></i><i></i><span>Pocket Ledger</span></div><div class="mac-side" role="tablist" aria-orientation="vertical" aria-label="Pocket Ledger">'
      + items.map(function (k) { return '<button type="button" role="tab" id="mt-' + k + '" data-view="' + k + '">' + IC[k] + esc(T[k]) + '</button>'; }).join('') + '</div><div class="mac-main" role="tabpanel" tabindex="0"></div></div>';
    var main = root.querySelector('.mac-main');
    function draw(keepFocus) {
      var fn = { dash: function () { return vDash(d, false); }, acc: function () { return vAcc(s, d); }, bud: function () { return vBud(d, false); }, fc: function () { return vFc(s, d); }, loan: function () { return vLoan(s); } }[s.view];
      var sc = main.scrollTop, ae = document.activeElement && document.activeElement.id; main.innerHTML = fn(); main.scrollTop = sc;
      root.querySelectorAll('[role=tab]').forEach(function (b) { b.setAttribute('aria-selected', b.dataset.view === s.view); b.tabIndex = b.dataset.view === s.view ? 0 : -1; });
      main.setAttribute('aria-labelledby', 'mt-' + s.view);
      if (ae && keepFocus) { var e = document.getElementById(ae); if (e) e.focus(); }
    }
    bind(root, d, s, draw, true);
    root.querySelector('[role=tablist]').addEventListener('keydown', function (e) {
      var i = items.indexOf(s.view); if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); s.view = items[(i + (e.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length]; draw(); root.querySelector('#mt-' + s.view).focus(); }
    });
    draw();
  }
  function Phone(root) {
    var d = seed(), s = { view: 'home', filter: 'all', q: '', sheet: false };
    var tabs = ['home', 'tx', 'bud', 'more'];
    root.innerHTML = '<div class="phones"><div class="phone"><div class="phone-body" tabindex="0"></div><button type="button" class="fab" data-act="open" aria-label="' + esc(T.add) + '">+</button><div class="tabbar" role="tablist" aria-label="Pocket Ledger">'
      + tabs.map(function (k) { return '<button type="button" role="tab" data-view="' + k + '" id="pt-' + k + '">' + IC[{ home: 'dash', tx: 'tx', bud: 'bud', more: 'more' }[k]] + esc(T[k]) + '</button>'; }).join('') + '</div><div class="overlay"></div></div></div>';
    var body = root.querySelector('.phone-body'), ov = root.querySelector('.overlay');
    function list() {
      var q = s.q.trim().toLowerCase(), rows = d.tx.filter(function (t) { return !q || t.p.toLowerCase().indexOf(q) >= 0; });
      return '<h4>' + esc(T.tx) + '</h4><p class="sub">' + esc(T.acct[0]) + ' ' + eur(d.acc[0].v) + '</p><input type="search" data-act="q" value="' + esc(s.q) + '" placeholder="' + esc(T.search) + '" aria-label="' + esc(T.search) + '" style="width:100%;min-height:44px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--fg);padding:0 12px;font:inherit;margin-bottom:8px"><ul class="list">' + rows.map(txItem).join('') + '</ul>';
    }
    function more() { return '<h4>' + esc(T.moreT) + '</h4><p class="sub">&nbsp;</p><ul class="list">' + T.mItems.map(function (x) { return '<li><span>' + esc(x) + '</span><span class="mut">›</span></li>'; }).join('') + '</ul>'; }
    function draw(keepFocus) {
      var ae = document.activeElement && document.activeElement.getAttribute('data-act');
      body.innerHTML = { home: function () { return vDash(d, true); }, tx: list, bud: function () { return vBud(d, true); }, more: more }[s.view]();
      root.querySelectorAll('[role=tab]').forEach(function (b) { b.setAttribute('aria-selected', b.dataset.view === s.view); });
      ov.innerHTML = s.sheet ? '<div class="scrim" data-act="close"></div><div class="sheet" role="dialog" aria-modal="true" aria-label="' + esc(T.add) + '"><h5>' + esc(T.add) + '</h5><input id="sh-a" inputmode="decimal" placeholder="' + esc(T.amt) + '" aria-label="' + esc(T.amt) + '" value="24.50"><input id="sh-p" placeholder="' + esc(T.pay2) + '" aria-label="' + esc(T.pay2) + '" value="' + esc(T.p.resto) + '"><select id="sh-c" aria-label="' + esc(T.cat) + '">' + ['eat', 'food', 'transport', 'leisure', 'subs'].map(function (c) { return '<option value="' + c + '">' + esc(T.c[c]) + '</option>'; }).join('') + '</select><div class="row"><button type="button" data-act="close">' + esc(T.cancel) + '</button><button type="button" class="go" data-act="save">' + esc(T.save) + '</button></div></div>' : '';
      if (s.sheet) { var f = ov.querySelector('#sh-a'); if (f) f.focus(); }
      if (keepFocus && ae === 'q') { var q = body.querySelector('[data-act=q]'); if (q) { q.focus(); q.setSelectionRange(q.value.length, q.value.length); } }
    }
    bind(root, d, s, draw, false);
    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]'); if (!b) return; var a = b.dataset.act;
      if (a === 'open') { s.sheet = true; draw(); } else if (a === 'close') { s.sheet = false; draw(); root.querySelector('.fab').focus(); }
      else if (a === 'save') {
        var amt = parseFloat(String(root.querySelector('#sh-a').value).replace(',', '.')); if (!(amt > 0)) { root.querySelector('#sh-a').focus(); return; }
        d.tx.unshift({ id: d.next++, d: '04', p: root.querySelector('#sh-p').value || T.none, c: root.querySelector('#sh-c').value, a: -Math.round(amt * 100) / 100, ok: false }); d.acc[0].v -= Math.round(amt * 100) / 100; s.sheet = false; s.view = 'tx'; draw();
        body.insertAdjacentHTML('afterbegin', '<div class="notice" role="status">' + esc(T.added) + '</div>');
      }
    });
    root.addEventListener('keydown', function (e) { if (e.key === 'Escape' && s.sheet) { s.sheet = false; draw(); root.querySelector('.fab').focus(); } });
    draw();
  }
  /* clicks and inputs shared by both devices */
  function bind(root, d, s, draw, mac) {
    root.addEventListener('click', function (e) {
      var v = e.target.closest('[data-view]'); if (v) { s.view = v.dataset.view; draw(); return; }
      var b = e.target.closest('[data-act]'); if (!b) return; var a = b.dataset.act;
      if (a === 'filter') { s.filter = b.dataset.v; draw(true); }
      else if (a === 'tick') { var t = d.tx.filter(function (x) { return String(x.id) === b.dataset.id; })[0]; if (t) t.ok = !t.ok; draw(); }
      else if (a === 'lim') { d.limits[b.dataset.c] = Math.max(10, d.limits[b.dataset.c] + Number(b.dataset.v)); draw(); }
    });
    root.addEventListener('input', function (e) {
      var t = e.target; if (t.dataset.act === 'loan') { s.loan[t.dataset.k] = Number(t.value); draw(true); }
      else if (t.dataset.act === 'var') { s.variable = t.checked; draw(true); }
      else if (t.dataset.act === 'q') { s.q = t.value; draw(true); }
    });
  }

  /* each .sim element: data-sim = mac | phone | both */
  function init(el) {
    var kind = el.dataset.sim, first = el.dataset.start || (kind === 'phone' ? 'phone' : 'mac');
    var stage = document.createElement('div'), cap = document.createElement('p'); cap.className = 'sim-cap'; cap.textContent = T.sim;
    function show(w) { stage.innerHTML = ''; var host = document.createElement('div'); stage.appendChild(host); (w === 'mac' ? Mac : Phone)(host); if (bar) bar.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.w === w); }); }
    var bar = null;
    if (kind === 'both') {
      bar = document.createElement('div'); bar.className = 'sim-bar'; bar.setAttribute('role', 'group');
      bar.innerHTML = '<button type="button" data-w="mac">' + esc(T.mac) + '</button><button type="button" data-w="phone">' + esc(T.phone) + '</button>';
      bar.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) show(b.dataset.w); }); el.appendChild(bar);
    }
    el.appendChild(stage); el.appendChild(cap); show(kind === 'both' ? first : kind);
  }
  document.querySelectorAll('.sim[data-sim]').forEach(init);
})();

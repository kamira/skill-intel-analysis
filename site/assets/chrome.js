/* ─────────────────────────────────────────────────────────────
   共用:帳本載入、派生欄位、頁首/導覽/頁尾。
   所有數字一律在此由 window.LEDGER 推導,任何頁面都不得手寫。
   ───────────────────────────────────────────────────────────── */
"use strict";
(function (g) {
  var L = g.LEDGER, C = L.cols;
  var R = L.rows.map(function (r) { var o = {}; C.forEach(function (k, i) { o[k] = r[i]; }); return o; });
  var ASOF = L.meta.exported;
  var IMPORT_DAY = "2026-07-13";           /* 23 條鍊的建立日壓在同一天 = 重新匯入日,非首發日 */

  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };
  var T = function (s) { return s ? new Date(s + "T00:00:00Z").getTime() : null; };
  var days = function (a, b) { return (a && b) ? Math.round((T(b) - T(a)) / 86400000) : null; };

  /* 逐版軌跡:保留每一版,不依日期去重。
     同一天登錄兩版是真的發生過的事——去重會讓逐版原因表少掉一列。
     圖上同日兩版畫成一段垂直線,那也是真的。 */
  function parseTraj(s) {
    if (!s) return [];
    return s.split(",").map(function (x) {
      var p = x.split(":"); return { v: +p[0], d: p[1], p: +p[2] };
    }).sort(function (a, b) { return a.v - b.v; });
  }
  /* 某一天的最後一版(同日多版時取最後),回傳 {cur, prev} */
  function atDate(pts, d) {
    for (var i = pts.length - 1; i >= 0; i--) {
      if (pts[i].d === d) return { cur: pts[i].p, prev: i ? pts[i - 1].p : null, v: pts[i].v };
    }
    return null;
  }

  R.forEach(function (r) {
    r.domA = r.dom ? r.dom.split("|") : [];
    /* 建鏈日期取自鏈 ID 的日期碼,不用 c0——c0 對 23 條鏈是重新匯入的日期,
       拿它排序會把最老的鏈排到最後,連帶把分支的「v1」認錯。 */
    var om = /^P-(?:2026-)?(\d{2})(\d{2})-\d{2}$/.exec(r.cid);
    r.origin = om ? "2026-" + om[1] + "-" + om[2] : (r.c0 || null);
    r.tr = parseTraj(r.traj);
    r.p0 = r.tr.length ? r.tr[0].p : null;
    r.closed = r.track === "已驗證" || r.track === "已失效";
    r.scored = r.ov !== null && r.ov !== undefined;
    /* 具名的資料瑕疵,逐鍊掛旗 */
    r.flags = [];
    if (r.v > r.n) r.flags.push(["序號斷裂", "版本序 v" + r.v + " 大於本站可見快照 " + r.n + " 筆——舊制與新制 ID 把同一條鏈切成兩個鏈根", 1]);
    if (!r.tr.length) r.flags.push(["軌跡未匯出", "本鏈的逐版機率沒有隨匯出帶出,不等於「機率沒有動過」", 1]);
    else if (r.tr.length !== r.n) r.flags.push(["軌跡不齊", "快照 " + r.n + " 筆,可畫出的版本只有 " + r.tr.length + " 筆", 0]);
    if (r.closed && !r.oc) r.flags.push(["結案未記錄結果", r.track + ",但結局欄是空的——不等於「未發生」", 1]);
    if (!r.closed && r.oc) r.flags.push(["狀態與結果不一致", "狀態為「" + r.track + "」卻已登記結局", 1]);
    if (r.c0 === IMPORT_DAY) r.flags.push(["建立日為匯入日", "建立日期與另外 22 條鏈同為 " + IMPORT_DAY,0]);
    if (r.p % 5 !== 0) r.flags.push(["機率非 5% 步進", "紀律 6 要求 5% 步進,本鏈為 " + r.p + "%", 0]);
  });

  /* 行為者比對(文字比對推得,非帳本原始欄位) */
  var MATCH = (g.ACTORS && g.ACTORS.match) || {};
  R.forEach(function (r) {
    r.actors = Object.keys(MATCH).filter(function (n) {
      return MATCH[n].some(function (k) { return r.stmt.indexOf(k) >= 0; });
    });
  });

  var census = {
    "總鏈": R.length,
    "追蹤中": R.filter(function (r) { return r.track === "追蹤中"; }).length,
    "待驗證": R.filter(function (r) { return r.track === "待驗證"; }).length,
    "休眠": R.filter(function (r) { return r.track === "休眠"; }).length,
    "已驗證": R.filter(function (r) { return r.track === "已驗證"; }).length,
    "已失效": R.filter(function (r) { return r.track === "已失效"; }).length,
    "狀態未記錄": R.filter(function (r) { return !r.track; }).length,
    "已計分": R.filter(function (r) { return r.scored; }).length
  };
  var scored = R.filter(function (r) { return r.scored; });
  var hitRate = scored.length ? scored.reduce(function (s, r) { return s + r.ov; }, 0) / scored.length : 0;
  var brier = scored.length ? scored.reduce(function (s, r) { return s + Math.pow(r.p / 100 - r.ov, 2); }, 0) / scored.length : 0;

  var ST = { "追蹤中": "open", "待驗證": "pending", "休眠": "dormant", "已驗證": "resolved", "已失效": "invalidated" };
  var OC = { H: ["已發生", "occurred"], M: ["未發生", "did-not-occur"], P: ["部分發生", "partially-occurred"], U: ["無法判定", "undetermined"] };
  var WORDS = [[95, 101, "幾乎確定"], [80, 95, "很可能"], [55, 80, "可能"], [45, 55, "兩可"], [20, 45, "不太可能"], [5, 20, "很不可能"], [0, 5, "幾乎不可能"]];

  var NAV = [
    { label: "戰情儀表板", path: "" },
    { label: "事件鍊", path: "events/" },
    { label: "預測鏈總表", path: "chains/" },
    { label: "國家背景基準", path: "actors/" },
    { label: "缺口聲明", path: "declaration/" }
  ];

  function chrome(o) {
    var up = new Array(o.depth + 1).join("../") || "";
    document.body.insertAdjacentHTML("afterbegin",
      '<div class="dcl-page">' +
        '<header class="dcl-region-header">' +
          '<div class="dcl-brand">' +
            '<span class="dcl-wordmark"><span class="dcl-wordmark-primary">intel</span><span>analysis</span></span>' +
            '<span class="dcl-section-label">' + esc(o.section) + '</span>' +
          '</div>' +
          '<nav class="dcl-nav">' + NAV.map(function (n) {
            return n.path === o.here
              ? '<span class="dcl-nav-item is-current">' + esc(n.label) + '</span>'
              : '<a class="dcl-nav-item" href="' + up + n.path + '">' + esc(n.label) + '</a>';
          }).join("") + '</nav>' +
        '</header>' +
        '<div class="dcl-region-breadcrumb">' +
          '<span class="dcl-crumb-path">/' + esc(o.here) + '</span>' +
          '<span>' + esc(o.note) + '</span>' +
          '<span class="dcl-crumb-kind">' + esc(o.kind) + '</span>' +
        '</div>' +
        '<main id="main"></main>' +
        '<footer class="dcl-region-footer">' +
          '<span>OSINT · 僅新聞報導 · 非投資建議</span>' +
          '<span>資料截止 ' + ASOF + ' · 公開子集:鏈層摘要與機率</span>' +
        '</footer>' +
      '</div>');
    return document.getElementById("main");
  }

  /* ── 事件鍊分組 ─────────────────────────────────────────────
     兩層:
       主要事件(topic)  ← 由 topics.js 的關鍵詞比對,以分支為單位投票決定
       後果分支(branch) ← 續鏈連通元件,兩種邊:
         twin  舊制 P-MMDD-NN 與新制 P-YYYY-MMDD-NN 是同一條邏輯鏈,
               被 ID 慣例切成兩個鏈根(見缺口聲明「序號斷裂」)
         續鏈  lineage.js 宣告的母子關係
     一條鏈只會屬於一個分支,一個分支只會屬於一個主要事件。 */
  var EV = null;
  function groups() {
    if (EV) return EV;
    var ids = {}, parent = {};
    R.forEach(function (r) { ids[r.cid] = r; parent[r.cid] = r.cid; });
    function find(x) { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; }
    function union(a, b) { a = find(a); b = find(b); if (a !== b) parent[a] = b; }

    var twinPairs = [];
    R.forEach(function (r) {
      var m = /^P-(\d{4})-(\d{2})$/.exec(r.cid);
      if (!m) return;
      var nu = "P-2026-" + m[1] + "-" + m[2];
      if (ids[nu]) { union(r.cid, nu); twinPairs.push([r.cid, nu]); }
    });
    var edges = [];
    (g.LINEAGE || []).forEach(function (e) {
      e[1].forEach(function (p) { if (ids[p] && ids[e[0]]) { union(e[0], p); edges.push([e[0], p, e[2]]); } });
    });

    var byRoot = {};
    R.forEach(function (r) { var k = find(r.cid); (byRoot[k] = byRoot[k] || []).push(r); });

    function topicOf(r) {
      for (var i = 0; i < g.TOPICS.length; i++) {
        var t = g.TOPICS[i];
        for (var j = 0; j < t[2].length; j++) if (r.stmt.indexOf(t[2][j]) >= 0) return t[0];
      }
      return null;
    }

    var events = g.TOPICS.map(function (t) {
      return { id: t[0], title: t[1], branches: [], chains: [] };
    });
    var byId = {};
    events.forEach(function (e) { byId[e.id] = e; });

    Object.keys(byRoot).forEach(function (k) {
      var rows = byRoot[k].slice().sort(function (a, b) { return (T(a.origin) || 0) - (T(b.origin) || 0); });
      var votes = {};
      rows.forEach(function (r) { var t = topicOf(r); if (t) votes[t] = (votes[t] || 0) + 1; });
      var best = Object.keys(votes).sort(function (a, b) { return votes[b] - votes[a]; })[0];
      if (!best) best = "other";
      /* 分支以其最早建立的鏈為名 */
      var head = rows[0], tail = rows[rows.length - 1];
      var pts = [];
      rows.forEach(function (r) { r.tr.forEach(function (x) { pts.push({ d: x.d, p: x.p, cid: r.cid, v: x.v }); }); });
      pts.sort(function (a, b) { return (T(a.d) || 0) - (T(b.d) || 0); });
      var br = {
        key: k, rows: rows, head: head, tail: tail, pts: pts,
        label: head.stmt.length > 24 ? head.stmt.slice(0, 24) + "…" : head.stmt,
        latest: tail.p, span: [head.origin, tail.upd || ASOF]
      };
      byId[best].branches.push(br);
      byId[best].chains = byId[best].chains.concat(rows);
    });

    events.forEach(function (e) {
      /* 依「被追蹤的次數」排序,不是依鏈數:一條分支被登錄過幾版,
         量的是分析者實際盯了它多久。只數鏈數會把追得最勤、
         但剛好沒有多次改鏈的分支排到後面去。 */
      e.branches.sort(function (a, b) {
        return (b.pts.length - a.pts.length) || (b.rows.length - a.rows.length) ||
               ((T(b.span[1]) || 0) - (T(a.span[1]) || 0));
      });
      e.multi = e.branches.filter(function (b) { return b.rows.length > 1; });
      e.scored = e.chains.filter(function (r) { return r.scored; });
    });

    EV = { events: events, byId: byId, twins: twinPairs, edges: edges };
    return EV;
  }

  g.IA = {
    L: L, R: R, ASOF: ASOF, IMPORT_DAY: IMPORT_DAY,
    census: census, scored: scored, hitRate: hitRate, brier: brier, groups: groups,
    esc: esc, T: T, days: days, parseTraj: parseTraj, atDate: atDate, chrome: chrome,
    stCls: function (r) { return ST[r.track] || "not-recorded"; },
    stLab: function (r) { return r.track || "狀態未記錄"; },
    oc: OC,
    word: function (p) { var w = WORDS.find(function (x) { return p >= x[0] && p < x[1]; }); return (w || WORDS[0])[2]; },
    head: function (t, note) {
      return '<div class="dcl-section-head"><span>' + esc(t) + '</span>' +
        (note ? '<span class="dcl-section-note">' + esc(note) + '</span>' : '') + '</div>';
    },
    /* 空值一律具名:追蹤中與已結案未記錄結果不能印成同一個破折號 */
    outcomeCell: function (r) {
      return r.oc ? '<span class="dcl-outcome is-' + OC[r.oc][1] + '">' + OC[r.oc][0] + '</span>'
        : '<span class="dcl-empty">' + (r.closed ? "結案未記錄結果" : "尚未結案") + '</span>';
    },
    probCell: function (r) {
      var head = r.p0 === null ? '<span class="dcl-empty">初始未匯出</span>'
        : '<span class="dcl-prob-first">' + r.p0 + '%</span>';
      var d = r.p0 === null ? ''
        : (r.p0 === r.p ? '<span class="mk-delta is-hold">維持</span>'
          : '<span class="mk-delta ' + (r.p > r.p0 ? 'is-up' : 'is-down') + '">' +
            (r.p > r.p0 ? '+' : '') + (r.p - r.p0) + '</span>');
      return head + '<span class="dcl-prob-arrow">→</span><span class="dcl-prob-last">' + r.p + '%</span>' + d;
    },
    flagChips: function (r) {
      return r.flags.length ? '<div class="mk-flags">' + r.flags.map(function (f) {
        return '<span class="mk-flag' + (f[2] ? ' is-hard' : '') + '" title="' + esc(f[1]) + '">' + esc(f[0]) + '</span>';
      }).join("") + '</div>' : '';
    }
  };
})(window);

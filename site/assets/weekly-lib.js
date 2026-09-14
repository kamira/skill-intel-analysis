/* 週分析的共用推導。與 chrome.js 同一條規則:數字一律在這裡由 window.WEEKLY 推導,
   頁面不得手寫。格式的「統一」也做在這裡——原文逐字保留,版面由同一組函式產生。 */
"use strict";
(function (g) {
  var W = g.WEEKLY, esc = g.IA.esc, R = W.rows;

  /* 「上週預測摘要」的命名慣例:欄位名稱從頭到尾沒變,寫法換過兩次。 */
  var CONV = [
    ["A", "上週（第 N 週）…", /^上週/],
    ["C", "第 N 週對本期／本週…", /^第\d+週對/],
    ["B", "第 N 週（日期）情境：", /^第\d+週（/]
  ];
  function conv(r) {
    for (var i = 0; i < CONV.length; i++) if (CONV[i][2].test(r.p)) return CONV[i][0];
    return "?";
  }
  function convLabel(k) {
    for (var i = 0; i < CONV.length; i++) if (CONV[i][0] === k) return CONV[i][1];
    return "未分類";
  }

  /* 四情境總和。缺值不補 0 也不補插值,只是不計入——而「有沒有缺」另外具名。 */
  function sum(r) {
    var s = 0; r.sc.forEach(function (v) { if (v !== null) s += v; }); return s;
  }
  function missing(r) {
    var m = []; r.sc.forEach(function (v, i) { if (v === null) m.push(W.meta.scen[i]); }); return m;
  }
  function round1(n) { return Math.round(n * 10) / 10; }

  /* 段落切分:原文的分段記號有五種(圈號、【】、一、、1.、1)),十五週各用各的。
     這裡一律切成同一種版面,但一個字都不改寫。 */
  var SEP = String.fromCharCode(1);
  var CIRC = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳";
  var RE_CIRC = new RegExp("([" + CIRC + "])", "g");
  function seg(t) {
    var out = [];
    String(t).split(/\n+/).forEach(function (para) {
      if (!para.trim()) return;
      var s = para
        .replace(RE_CIRC, SEP + "$1")
        .replace(/(【[^】]{2,14}】)/g, SEP + "$1")
        .replace(/([。】])\s*([一二三四五六七八九十]{1,3}、)/g, "$1" + SEP + "$2")
        .replace(/^([一二三四五六七八九十]{1,3}、)/, SEP + "$1")
        .replace(/([。】])\s*(\d{1,2}[.)]\s)/g, "$1" + SEP + "$2")
        .replace(/^(\d{1,2}[.)]\s)/, SEP + "$1");
      s.split(SEP).forEach(function (x) { if (x.trim()) out.push(x.trim()); });
    });
    return out;
  }
  var RE_ITEM = new RegExp("^(?:[" + CIRC + "]|【[^】]{2,14}】|[一二三四五六七八九十]{1,3}、|\\d{1,2}[.)]\\s)");
  function prose(t) {
    return seg(t).map(function (x) {
      return '<p class="wk-p' + (RE_ITEM.test(x) ? ' is-item' : '') + '">' + esc(x) + '</p>';
    }).join("");
  }

  /* 選項使用率:範本開了幾個選項、十五週實際只用了幾個。 */
  function used(key) {
    var seen = {}, order = [];
    R.forEach(function (r) { if (!seen[r[key]]) { seen[r[key]] = 0; order.push(r[key]); } seen[r[key]]++; });
    return { order: order, count: seen, n: order.length, total: W.meta.opts[key].length };
  }
  function lens(field) {
    var v = R.map(function (r) { return r[field].length; });
    return { min: Math.min.apply(null, v), max: Math.max.apply(null, v),
             first: v[0], last: v[v.length - 1], all: v };
  }
  function tags(a) {
    return '<div class="wk-tags">' + (a && a.length
      ? a.map(function (x) { return '<span class="wk-tag">' + esc(x) + '</span>'; }).join("")
      : '<span class="dcl-empty">未填寫</span>') + '</div>';
  }
  function short(r) { return "第 " + r.w + " 週"; }
  function topic(r) { var i = r.t.indexOf("｜"); return i < 0 ? r.t : r.t.slice(i + 1); }

  g.WK = {
    W: W, R: R, SCEN: W.meta.scen,
    COLORS: ["#55b6d9", "#f0a24b", "#7fb069", "#c96a8f"],
    conv: conv, convLabel: convLabel, convKeys: ["A", "B", "C"],
    sum: sum, missing: missing, round1: round1,
    seg: seg, prose: prose, used: used, lens: lens, tags: tags, short: short, topic: topic,
    byWeek: function (w) { for (var i = 0; i < R.length; i++) if (R[i].w === +w) return R[i]; return null; }
  };
})(window);

/* 單一主要事件頁。由 window.EVENT_ID 指定要畫哪一個。 */
"use strict";
(function (g) {
  var IA = g.IA, R = IA.R, esc = IA.esc;
  var G = IA.groups();
  var ev = G.byId[g.EVENT_ID];
  var meta = g.EVENT_META[g.EVENT_ID] || { subtitle: "", news: [] };
  var COLORS = ["#55b6d9", "#f0a24b", "#c96a8f", "#7fb069", "#9d8ec9", "#d9b04e", "#6fb8ac", "#cf7f6a"];

  var main = IA.chrome({
    section: "事件鍊", here: "events/", depth: 2,
    note: "一個主要事件、底下的新聞,以及它推動的每一種後果", kind: "事件鍊"
  });

  /* 上圖的分支:優先多鏈分支,不足才補單鏈分支;一律要有機率點才畫得出來 */
  /* 上圖的是「多鏈分支」——被續鏈串起來、跨越至少一次結案的那些。
     單鏈分支多半是開了一次就沒有下文,畫上去只會讓圖失去可讀性。 */
  var chartable = ev.branches.filter(function (b) { return b.rows.length > 1 && b.pts.length > 1; });
  if (!chartable.length) chartable = ev.branches.filter(function (b) { return b.pts.length > 1; });
  var charted = chartable.slice(0, 6);
  charted.forEach(function (b, i) { b.color = COLORS[i % COLORS.length]; });

  var span0 = null, span1 = null;
  charted.forEach(function (b) {
    b.pts.forEach(function (p) {
      var t = IA.T(p.d); if (t === null) return;
      if (span0 === null || t < span0) span0 = t;
      if (span1 === null || t > span1) span1 = t;
    });
  });

  var W = 980, H = 400, PL = 42, PR = 16, PT = 32, PB = 54, DAY = 86400000;
  var days = span0 !== null ? Math.max(1, (span1 - span0) / DAY) : 1;
  function x(d) { return PL + (W - PL - PR) * ((IA.T(d) - span0) / DAY) / days; }
  function y(p) { return PT + (H - PT - PB) * (1 - p / 100); }

  var chart = "", legend = "", readNote = "";
  if (charted.length && span0 !== null) {
    var grid = [0, 25, 50, 75, 100].map(function (gv) {
      return '<line class="mk-grid-line" x1="' + PL + '" x2="' + (W - PR) + '" y1="' + y(gv).toFixed(1) +
        '" y2="' + y(gv).toFixed(1) + '"/><text class="mk-axis-t" x="' + (PL - 8) + '" y="' +
        (y(gv) + 3).toFixed(1) + '" text-anchor="end">' + gv + '%</text>';
    }).join("");
    var step = Math.max(7, Math.round(days / 8 / 7) * 7), ticks = "";
    for (var k = 0; k <= days; k += step) {
      var d = new Date(span0 + k * DAY).toISOString().slice(0, 10);
      ticks += '<text class="mk-axis-t" x="' + x(d).toFixed(1) + '" y="' + (H - PB + 30) +
        '" text-anchor="middle">' + d.slice(5) + '</text>';
    }
    var markers = meta.news.map(function (n, i) {
      var t = IA.T(n.d); if (t === null || t < span0 || t > span1) return "";
      var px = x(n.d).toFixed(1);
      return '<line class="mk-marker" x1="' + px + '" x2="' + px + '" y1="' + (PT - 6) + '" y2="' + (H - PB) + '"/>' +
        '<text class="mk-marker-n" x="' + px + '" y="' + (PT - 12) + '">' + (i + 1) + '</text>' +
        '<rect class="mk-marker-hit" x="' + (px - 7) + '" y="' + (PT - 20) + '" width="14" height="' +
        (H - PB - PT + 22) + '"><title>' + (i + 1) + '. ' + esc(n.d) + ' ' + esc(n.t) + '</title></rect>';
    }).join("");
    var lines = charted.map(function (b) {
      var pts = b.pts.filter(function (p) { return IA.T(p.d) !== null; });
      /* 階梯而非直線:一個機率登錄後就維持到下一次修訂。
         用直線把兩次修訂連起來,等於畫出一段從未被登錄過的漸變。 */
      var d = "";
      pts.forEach(function (p, i) {
        if (!i) { d = "M " + x(p.d).toFixed(1) + " " + y(p.p).toFixed(1); return; }
        d += " L " + x(p.d).toFixed(1) + " " + y(pts[i - 1].p).toFixed(1) +
             " L " + x(p.d).toFixed(1) + " " + y(p.p).toFixed(1);
      });
      /* 最後一版之後拉平到分支的最後修訂日,表示「維持至今」 */
      var endD = b.span[1];
      if (pts.length && IA.T(endD) > IA.T(pts[pts.length - 1].d))
        d += " L " + x(endD).toFixed(1) + " " + y(pts[pts.length - 1].p).toFixed(1);
      var dots = pts.map(function (p) {
        return '<circle cx="' + x(p.d).toFixed(1) + '" cy="' + y(p.p).toFixed(1) + '" r="2.2" fill="' + b.color +
          '"><title>' + esc(b.label) + ' · ' + esc(p.cid) + ' v' + p.v + ' · ' + esc(p.d) + ' · ' + p.p + '%</title></circle>';
      }).join("");
      return '<path class="mk-series" d="' + d + '" stroke="' + b.color + '"/>' + dots;
    }).join("");
    chart = '<svg class="mk-chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' +
      esc(ev.title) + '的 ' + charted.length + ' 條後果分支機率折線圖">' + grid + ticks + markers + lines + '</svg>';
    legend = charted.map(function (b) {
      return '<span class="mk-lg"><i style="background:' + b.color + '"></i>' + esc(b.label) +
        ' <b>' + b.latest + '%</b><small>' + b.rows.length + ' 鏈 · ' + b.pts.length + ' 版 · ' +
        esc(b.span[0]) + ' 起</small></span>';
    }).join("");
  } else {
    chart = '<div class="mk-void"><b>這個主要事件畫不出折線圖。</b>底下的鏈都沒有逐版軌跡——' +
      '不是機率沒有動過,是資料沒有隨匯出帶出(見缺口聲明的〈軌跡未匯出〉)。</div>';
  }

  /* 新聞 × 分支的當日變動 */
  var newsRows = meta.news.map(function (n, i) {
    var chips = charted.map(function (b) {
      var a = IA.atDate(b.pts, n.d);
      if (!a) return '<span class="mk-dot is-hold" title="' + esc(b.label) +
        ':當日無版本"><i style="background:#2b3542"></i>—</span>';
      var lab = a.prev === null ? "首發" : a.cur === a.prev ? "維持" : (a.cur > a.prev ? "+" : "") + (a.cur - a.prev);
      var cls = a.prev === null ? "is-hold" : a.cur > a.prev ? "is-up" : a.cur < a.prev ? "is-down" : "is-hold";
      return '<span class="mk-dot ' + cls + '" title="' + esc(b.label) + '"><i style="background:' +
        b.color + '"></i>' + lab + '</span>';
    }).join("");
    return '<div class="mk-news-row"><span class="mk-news-n">' + (i + 1) + '</span>' +
      '<span class="mk-news-d">' + esc(n.d) + '</span>' +
      '<span class="mk-news-t">' + esc(n.t) + '</span>' +
      '<span class="mk-news-x">' + chips + '</span></div>';
  }).join("");

  /* 分支表:每個分支列出它的鏈,依建鏈順序 */
  var multiB = ev.branches.filter(function (b) { return b.rows.length > 1; });
  var soloB = ev.branches.filter(function (b) { return b.rows.length === 1; });
  var branchRows = multiB.map(function (b, i) {
    var col = b.color ? '<span class="mk-dot"><i style="background:' + b.color + '"></i></span> ' : "";
    var members = b.rows.map(function (r, j) {
      return '<tr class="is-link is-' + IA.stCls(r) + (j ? ' mk-sub' : '') + '" data-id="' + esc(r.cid) + '">' +
        '<td>' + (j === 0 ? col + '<b>v' + (j + 1) + '</b>' : '<span class="mk-vseq">v' + (j + 1) + '</span>') + '</td>' +
        '<td><span class="mk-id">' + esc(r.cid) + '</span></td>' +
        '<td class="mk-stmt">' + esc(r.stmt) + IA.flagChips(r) + '</td>' +
        '<td><span class="mk-state is-' + IA.stCls(r) + '">' + esc(IA.stLab(r)) + '</span></td>' +
        '<td>' + IA.outcomeCell(r) + '</td>' +
        '<td class="mk-num">' + IA.probCell(r) + '</td></tr>';
    }).join("");
    return '<tbody class="mk-branch">' +
      '<tr class="mk-branch-h"><td colspan="6">' + col + '<b>' + esc(b.label) + '</b>' +
      '<span class="mk-vseq">' + b.rows.length + ' 鏈 · ' + esc(b.span[0]) + ' 起 · 最新 ' + b.latest + '%</span></td></tr>' +
      members + '</tbody>';
  }).join("");

  var actors = {};
  ev.chains.forEach(function (r) { r.actors.forEach(function (a) { actors[a] = (actors[a] || 0) + 1; }); });
  var actorList = Object.keys(actors).sort(function (a, b) { return actors[b] - actors[a]; });

  main.innerHTML =
    '<div class="mk-hero"><div class="mk-hero-kicker">主要事件</div>' +
      '<h1>' + esc(ev.title) + '</h1><p>' + esc(meta.subtitle) + '</p>' +
      '<div class="mk-hero-meta">' +
        '<div><span class="k">預測鏈</span><span class="v">' + ev.chains.length + '</span></div>' +
        '<div><span class="k">後果分支</span><span class="v">' + ev.branches.length + '</span></div>' +
        '<div><span class="k">多鏈分支</span><span class="v">' + ev.multi.length + '</span></div>' +
        '<div><span class="k">已計分</span><span class="v">' + ev.scored.length + '</span></div>' +
        '<div><span class="k">底下的新聞</span><span class="v">' + meta.news.length + '</span></div>' +
      '</div></div>' +

    '<div class="mk-lede"><p><b>一個主要事件,底下掛著它的後果分支;每一條分支是一串續鏈,不是一條命題。</b>' +
    '分析者結案一條鏈之後常常另起新鏈接續同一個現象——那些鏈在這裡被收回同一條線,' +
    '所以一條線可以橫跨好幾個月,而不是每次結案就斷掉。</p></div>' +

    IA.head("機率隨時間變化", charted.length ? "共用一組座標 · " + charted.length + " 條分支" +
      (meta.news.length ? " · 虛線為新聞事件" : "") : "無資料") +
    '<div class="dcl-panel-flush mk-chartbox">' + chart +
      (legend ? '<div class="mk-legend">' + legend + '</div>' : '') + '</div>' +
    (charted.length ? '<p class="mk-note">每一條線是<b>一整條分支</b>,把它底下所有續鏈的版本快照依日期接起來。' +
      '線上的一個點是某一條鏈的某一版——滑過去看是哪一條。' +
      '圖上只畫<b>多鏈分支</b>(被續鏈串起來、跨越至少一次結案的),最多 6 條;單鏈分支在下方表列。'+'線走階梯而不是斜線:一個機率登錄後維持到下一次修訂,中間沒有發生漸變。</p>' : '') +

    (meta.news.length
      ? IA.head("底下的新聞", "每一則對各分支當日的機率變動") +
        '<div class="mk-news">' + newsRows + '</div>' +
        '<p class="mk-note">新聞為每日國際觀點的當日頁標題;機率變動取自帳本各鏈的版本快照。' +
        '「維持」代表當天有登錄新版本但機率沒動——那是判斷,不是沒看。「—」代表該分支當天沒有版本。</p>'
      : IA.head("底下的新聞", "尚未整理") +
        '<div class="dcl-panel-flush mk-void"><b>這個主要事件底下的新聞尚未整理。</b>' +
        '機率曲線是真的,推動它的新聞還沒被逐日對上。' +
        '<span class="mk-void-sub">列一份猜的新聞比空著更糟:讀者會以為那就是當時的訊號。</span></div>') +

    (multiB.length ? IA.head("多鏈分支", multiB.length + " 條 · 每條底下依建鏈順序展開") +
      '<div class="dcl-table-scroll"><table class="mk-t">' +
        '<thead><tr><th>序</th><th>鏈</th><th>命題</th><th>狀態</th><th>結局</th><th>初始 → 最新</th></tr></thead>' +
        branchRows + '</table></div>' +
      '<p class="mk-note">序號是<b>分支內的順序</b>,不是鏈自己的版本序。' +
      'v2 是接續 v1 的新鏈——分析者結案 v1 之後另起一條追同一個現象,' +
      '這裡把它收回 v1 底下,而不是當成一條無關的新命題。</p>' : '') +
    (soloB.length ? IA.head("單鏈分支", soloB.length + " 條 · 開了一次就沒有續鏈") +
      '<div class="dcl-table-scroll"><table class="mk-t">' +
        '<thead><tr><th>鏈</th><th>命題</th><th>狀態</th><th>結局</th><th>初始 → 最新</th></tr></thead><tbody>' +
        soloB.map(function (b) {
          var r = b.rows[0];
          return '<tr class="is-link is-' + IA.stCls(r) + '" data-id="' + esc(r.cid) + '">' +
            '<td><span class="mk-id">' + esc(r.cid) + '</span></td>' +
            '<td class="mk-stmt">' + esc(r.stmt) + IA.flagChips(r) + '</td>' +
            '<td><span class="mk-state is-' + IA.stCls(r) + '">' + esc(IA.stLab(r)) + '</span></td>' +
            '<td>' + IA.outcomeCell(r) + '</td>' +
            '<td class="mk-num">' + IA.probCell(r) + '</td></tr>';
        }).join("") + '</tbody></table></div>' : '') +

    (actorList.length ? IA.head("涉入的行為者", "由命題文字比對推得") +
      '<div class="dcl-panel-flush" style="padding:15px 17px">' +
      actorList.map(function (a) {
        return '<a class="dcl-domain" href="../../actors/#' + encodeURIComponent(a) + '">' +
          esc(a) + ' <b>' + actors[a] + '</b></a>';
      }).join("") + '</div>' : "");

  Array.prototype.forEach.call(main.querySelectorAll("tr[data-id]"), function (tr) {
    tr.addEventListener("click", function () {
      location.href = "../../chains/?c=" + encodeURIComponent(tr.dataset.id);
    });
  });
})(window);

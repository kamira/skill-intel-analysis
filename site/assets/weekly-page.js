/* 單篇週報。由 window.WEEK_N 指定是哪一週。
   四個欄位的原文逐字呈現,分段一律由 weekly-lib 的同一組函式排版。 */
"use strict";
(function (g) {
  var IA = g.IA, esc = IA.esc, K = g.WK, W = K.W, R = K.R, SCEN = K.SCEN, C = K.COLORS;
  var r = K.byWeek(g.WEEK_N);
  var idx = R.indexOf(r), prev = R[idx - 1] || null, next = R[idx + 1] || null;

  var main = IA.chrome({
    section: "週分析", here: "weekly/", depth: 2,
    note: "第 " + r.w + " 週 · " + r.s + " 至 " + r.e, kind: "週報",
    asof: r.e, scope: "四個資料庫欄位原文與屬性"
  });

  var sum = K.sum(r), miss = K.missing(r);

  /* 這一週在十五週裡的位置:機率是升是降,拿上一篇比。 */
  function delta(i) {
    if (!prev || prev.sc[i] === null || r.sc[i] === null) return "";
    var d = K.round1(r.sc[i] - prev.sc[i]);
    return d === 0 ? '<span class="mk-delta is-hold">維持</span>'
      : '<span class="mk-delta ' + (d > 0 ? "is-up" : "is-down") + '">' + (d > 0 ? "+" : "") + d + '</span>';
  }

  var scen = '<div class="wk-scen">' + SCEN.map(function (n, i) {
    var v = r.sc[i];
    return '<div><span class="k" style="color:' + C[i] + '">' + esc(n) + '</span>' +
      (v === null
        ? '<span class="v" style="color:var(--muted-3);font-size:13px">未列出</span>' +
          '<span class="n">原文沒有寫這一項</span>'
        : '<span class="v" style="color:' + C[i] + '">' + v + '%</span>' +
          '<span class="n">' + (prev ? '較第 ' + prev.w + ' 週 ' : '本系列首篇 ') + delta(i) + '</span>') +
      '</div>';
  }).join("") + '</div>' +
  '<div class="wk-raw"><b>原文怎麼寫的:</b>' + esc(r.scRaw) + '。' +
    (r.scNote ? '<br><b>本週寫法與其他週的差別:</b>' + esc(r.scNote) : '') +
    '<br><b>四項加總 ' + K.round1(sum) + '%</b>' +
    (sum === 100 ? ',恰為一組互斥的機率分割。'
      : (miss.length ? ',且缺「' + miss.join("、") + '」;'
                     : ',超出 100%;') + '四個情境不是互斥分割,而是各自獨立的條件機率。') +
  '</div>';

  var FIELDS = [["情境描述", "d", "本週格局定調"], ["上週預測摘要", "p", "被拿來驗證的那一份預測"],
                ["本週實際變化", "a", "逐項裁決"], ["預測修正與調整", "f", "因此要改的判準"]];

  main.innerHTML =
    '<div class="mk-hero"><div class="mk-hero-kicker">週分析 · 第 ' + r.w + ' 週</div>' +
      '<h1>' + esc(K.topic(r)) + '</h1>' +
      '<p>' + esc(r.s) + ' 至 ' + esc(r.e) + ' · ' + esc(W.meta.source) + '</p>' +
      '<div class="mk-hero-meta">' +
        '<div><span class="k">驗證結果</span><span class="v">' + esc(r.vr) + '</span></div>' +
        '<div><span class="k">信心度</span><span class="v">' + esc(r.cf) + '</span></div>' +
        '<div><span class="k">風險強度</span><span class="v">' + r.rk + ' / 10</span></div>' +
        '<div><span class="k">四情境加總</span><span class="v">' + K.round1(sum) + '%</span></div>' +
      '</div></div>' +

    IA.head("四情境機率", "由「上週預測摘要」抽出 · 上一篇對本週的預測") + scen +
    '<p class="mk-note">這四個數字寫在「上週預測摘要」欄裡,是<b>上一篇週報對本週的預測</b>,' +
    '所以掛在第 ' + r.w + ' 週而不是第 ' + (r.w - 1) + ' 週。' +
    '<a href="../">十五週畫在同一張圖上 →</a></p>' +

    IA.head("屬性", "資料庫欄位原值") +
    '<div class="wk-grid">' +
      '<div><span class="k">層面</span>' + K.tags(r.ly) + '</div>' +
      '<div><span class="k">主要議題</span>' + K.tags(r.iss) + '</div>' +
      '<div><span class="k">相關國家</span>' + K.tags(r.ct) + '</div>' +
      '<div><span class="k">關鍵字</span>' + K.tags(r.kw) +
        '<span class="s">範本要求「' + esc(W.meta.kwSpec) + '」</span></div>' +
    '</div>' +

    FIELDS.map(function (f) {
      var txt = r[f[1]], n = K.seg(txt).length;
      return IA.head(f[0], f[2]) +
        '<div class="wk-body"><div class="wk-blk">' +
          '<h3>' + esc(f[0]) + '<small>' + txt.length + ' 字 · ' + n + ' 段</small></h3>' +
          K.prose(txt) +
        '</div></div>';
    }).join("") +

    '<p class="mk-note"><b>以上四欄為原文逐字,分段由本站統一排版。</b>' +
    '原文的分段記號十五週各用各的(圈號、方括號小標、中文數字、阿拉伯數字),' +
    '這裡一律排成同一種版面,但沒有改寫任何一個字。' +
    '每篇報告頁面本文的 ' + W.meta.bodySections.length + ' 個章節(' +
    W.meta.bodySections.join("、") + ')不在公開範圍,留在原帳本。</p>' +

    '<div class="dcl-table-scroll" style="margin-top:16px"><table class="mk-t"><tbody>' +
      '<tr>' +
        '<td>' + (prev ? '<a href="../' + prev.w + '/">← 第 ' + prev.w + ' 週 · ' + esc(K.topic(prev)) + '</a>'
                       : '<span class="dcl-empty">本系列首篇</span>') + '</td>' +
        '<td style="text-align:right">' + (next ? '<a href="../' + next.w + '/">第 ' + next.w + ' 週 · ' + esc(K.topic(next)) + ' →</a>'
                       : '<span class="dcl-empty">本系列末篇</span>') + '</td>' +
      '</tr>' +
    '</tbody></table></div>';
})(window);

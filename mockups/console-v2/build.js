"use strict";
const fs=require("fs"),path=require("path");
const REPO=path.resolve(__dirname,"../..");
const SP=__dirname;
const OUT=path.join(REPO,"mockups/console-v2");
global.window={}; require(path.join(REPO,"site/data.js"));
const EV=JSON.parse(fs.readFileSync(SP+"/events.json","utf8"));
const AC=JSON.parse(fs.readFileSync(SP+"/actors.json","utf8"));
const L=window.LEDGER,C=L.cols;
const R=L.rows.map(r=>{const o={};C.forEach((k,i)=>o[k]=r[i]);return o;});
const ASOF=L.meta.exported;
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const DAY=86400000, T=s=>new Date(s+"T00:00:00Z").getTime();

/* 軌跡:同一天出現兩版時取當天最後一版 */
function traj(cid){
  const r=R.find(x=>x.cid===cid); if(!r||!r.traj) return {r,pts:[]};
  const m=new Map();
  r.traj.split(",").forEach(s=>{const[v,d,p]=s.split(":"); m.set(d,{v:+v,d,p:+p});});
  return {r,pts:[...m.values()].sort((a,b)=>T(a.d)-T(b.d))};
}
const ST={"追蹤中":"open","待驗證":"pending","休眠":"dormant","已驗證":"resolved","已失效":"invalidated"};
const stCls=r=>ST[r.track]||"not-recorded", stLab=r=>r.track||"狀態未記錄";

function shell({title,section,nav,crumbPath,crumbNote,crumbKind,body,depth}){
  const up="../".repeat(depth);
  return `<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${esc(title)}</title>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Archivo:wght@500;600;700&family=Noto+Sans+TC:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${up}assets/console.css">
</head>
<body>
<div class="mk-banner">MOCKUP · 版面提案，非上線頁面 · <b>畫面上的數字與文字全部取自真實來源</b>（帳本 site/data.js 匯出於 ${ASOF}；利益卡片取自 Notion「各國立場」），未虛構</div>
<div class="dcl-page">
  <header class="dcl-region-header">
    <div class="dcl-brand">
      <span class="dcl-wordmark"><span class="dcl-wordmark-primary">intel</span><span>analysis</span></span>
      <span class="dcl-section-label">${esc(section)}</span>
    </div>
    <nav class="dcl-nav">${nav.map(n=>n.href?`<a class="dcl-nav-item" href="${n.href}">${esc(n.label)}</a>`
      :`<span class="dcl-nav-item ${n.state==="current"?"is-current":"is-planned"}">${esc(n.label)}</span>`).join("")}</nav>
  </header>
  <div class="dcl-region-breadcrumb">
    <span class="dcl-crumb-path">${esc(crumbPath)}</span>
    <span>${esc(crumbNote)}</span>
    <span class="dcl-crumb-kind">${esc(crumbKind)}</span>
  </div>
${body}
  <footer class="dcl-region-footer">
    <span>OSINT · 僅新聞報導 · 非投資建議</span>
    <span>帳本匯出 ${ASOF} · 利益卡片抓取 2026-08-29</span>
  </footer>
</div>
</body>
</html>`;
}
const nav=(cur,depth)=>{const up="../".repeat(depth);return[
  {label:"事件鍊",...(cur==="events"?{state:"current"}:{href:up+"events/"})},
  {label:"國家背景基準",...(cur==="actors"?{state:"current"}:{href:up+"actors/"})},
  {label:"預測鏈總表",state:"planned"},
  {label:"缺口聲明",state:"planned"}
];};
const H=(t,note)=>`  <div class="dcl-section-head"><span>${esc(t)}</span>${note?`<span class="dcl-section-note">${esc(note)}</span>`:""}</div>`;

/* ══ 事件鍊：美伊衝突 ══════════════════════════════════════════════ */
function eventPage(){
  const series=EV.outcomes.map(o=>({...o,...traj(o.chain)}));
  const t0=T(EV.window[0]), t1=T(EV.window[1]), span=(t1-t0)/DAY;
  const W=980,Hh=380,PL=42,PR=16,PT=30,PB=54;
  const x=d=>PL+(W-PL-PR)*((T(d)-t0)/DAY)/span;
  const y=p=>PT+(Hh-PT-PB)*(1-p/100);

  const grid=[0,25,50,75,100].map(g=>
    `<line class="mk-grid-line" x1="${PL}" x2="${W-PR}" y1="${y(g).toFixed(1)}" y2="${y(g).toFixed(1)}"/>`+
    `<text class="mk-axis-t" x="${PL-8}" y="${(y(g)+3).toFixed(1)}" text-anchor="end">${g}%</text>`).join("");
  // x 軸日期刻度：每 7 天
  let ticks="";
  for(let k=0;k<=span;k+=7){const d=new Date(t0+k*DAY).toISOString().slice(0,10);
    ticks+=`<text class="mk-axis-t" x="${x(d).toFixed(1)}" y="${Hh-PB+30}" text-anchor="middle">${d.slice(5)}</text>`;}

  const markers=EV.news.map((n,i)=>{const px=x(n.d).toFixed(1);
    return `<line class="mk-marker" x1="${px}" x2="${px}" y1="${PT-6}" y2="${Hh-PB}"/>`+
      `<text class="mk-marker-n" x="${px}" y="${PT-12}">${i+1}</text>`+
      `<rect class="mk-marker-hit" x="${px-7}" y="${PT-20}" width="14" height="${Hh-PB-PT+22}"><title>${i+1}. ${esc(n.d)} ${esc(n.t)}</title></rect>`;}).join("");

  const lines=series.map(s=>{
    const pts=s.pts.filter(p=>T(p.d)>=t0&&T(p.d)<=t1);
    const d=pts.map((p,i)=>`${i?"L":"M"} ${x(p.d).toFixed(1)} ${y(p.p).toFixed(1)}`).join(" ");
    const dots=pts.map(p=>`<circle cx="${x(p.d).toFixed(1)}" cy="${y(p.p).toFixed(1)}" r="2.4" fill="${s.color}"><title>${esc(s.label)} · ${p.d} · ${p.p}%</title></circle>`).join("");
    return `<path class="mk-series" d="${d}" stroke="${s.color}"/>${dots}`;
  }).join("");

  const legend=series.map(s=>{
    const first=s.pts[0], last=s.pts[s.pts.length-1];
    return `<span class="mk-lg"><i style="background:${s.color}"></i>${esc(s.label)} <b>${last.p}%</b>
      <small>${first.p}% → ${last.p}% · ${s.chain} · ${s.pts.length} 個機率點</small></span>`;
  }).join("");

  // 每則新聞對各後果的當日變動
  const newsRows=EV.news.map((n,i)=>{
    const chips=series.map(s=>{
      const idx=s.pts.findIndex(p=>p.d===n.d);
      if(idx<0) return `<span class="mk-dot is-hold" title="${esc(s.label)}：當日無此鍊版本"><i style="background:#2b3542"></i>—</span>`;
      const cur=s.pts[idx].p, prev=idx?s.pts[idx-1].p:null;
      const dl=prev===null?"首發":cur===prev?"維持":(cur>prev?"+":"")+(cur-prev);
      const cls=prev===null?"is-hold":cur>prev?"is-up":cur<prev?"is-down":"is-hold";
      return `<span class="mk-dot ${cls}" title="${esc(s.label)}"><i style="background:${s.color}"></i>${dl}</span>`;
    }).join("");
    return `<div class="mk-news-row"><span class="mk-news-n">${i+1}</span>
      <span class="mk-news-d">${esc(n.d)}</span>
      <span class="mk-news-t">${esc(n.t)}</span>
      <span class="mk-news-x">${chips}</span></div>`;
  }).join("");

  const talks=series[0], strike=series[1];
  const body=`
  <div class="mk-hero">
    <div class="mk-hero-kicker">主要事件</div>
    <h1>${esc(EV.title)}</h1>
    <p>${esc(EV.subtitle)}</p>
    <div class="mk-hero-meta">
      <div><span class="k">期間</span><span class="v">${EV.window[0]} → ${EV.window[1]}</span></div>
      <div><span class="k">後果分支</span><span class="v">${series.length}</span></div>
      <div><span class="k">底下的新聞</span><span class="v">${EV.news.length}</span></div>
      <div><span class="k">機率點合計</span><span class="v">${series.reduce((s,o)=>s+o.pts.length,0)}</span></div>
    </div>
  </div>
  <div class="mk-lede">
    <p><b>一個主要事件，底下掛著同一段時間的新聞；每一則新聞同時推動好幾種後果的機率。</b>
    所以這一頁只有一張折線圖——${series.length} 種後果全部畫在同一組座標上。分開畫會看不見唯一重要的那件事：
    同一天，談和往下、互擊往上。</p>
    <p>舊版站台把「事件鍊」這個詞用在版本鏈快照上，於是每一條命題各自一頁、各自一張圖，
    事件與事件之間的關係在整個站台裡沒有位置。這一頁補的就是那一層。</p>
  </div>

${H("機率隨時間變化","共用一組座標 · 虛線為新聞事件，編號對應下方清單")}
  <div class="dcl-panel-flush mk-chartbox">
    <svg class="mk-chart" viewBox="0 0 ${W} ${Hh}" role="img"
      aria-label="美伊衝突的 ${series.length} 種後果機率折線圖，期間 ${EV.window[0]} 至 ${EV.window[1]}">
      ${grid}${ticks}${markers}${lines}
    </svg>
    <div class="mk-legend">${legend}</div>
  </div>
  <p class="mk-note"><b>讀這張圖只需要看一件事：${esc(talks.label)}與${esc(strike.label)}是反向的。</b>
  7/09「美恢復打擊伊朗、停火結束」當天，談和由 45% 落到 25%、互擊由 65% 升到 80%；
  7/11「停火再宣結束仍續談」當天兩條線同時折返——談和回到 45%、互擊回落到 60%。
  這兩天的四個數字，是這一頁存在的理由。</p>

${H("底下的新聞","每一則對各後果當日的機率變動")}
  <div class="mk-news">${newsRows}</div>
  <p class="mk-note">新聞標題取自 Notion 每日國際觀點當日頁標題；機率變動取自帳本各鍊的版本快照。
  「維持」代表該鍊當天有登錄新版本但機率沒動——那是判斷，不是沒看。「—」代表該鍊當天沒有版本。同一天登錄兩版時取當天最後一版，因此圖上的機率點數會略少於帳本的快照數。</p>

${H("後果分支","每一條對應帳本裡的一條預測鏈")}
  <div class="dcl-table-scroll"><table class="mk-t">
    <thead><tr><th>後果</th><th>命題</th><th>鏈</th><th>狀態</th><th>初始 → 最新</th><th>驗證窗口</th></tr></thead>
    <tbody>${series.map(s=>`<tr>
      <td><span class="mk-dot"><i style="background:${s.color}"></i></span> ${esc(s.label)}</td>
      <td>${esc(s.note)}</td>
      <td class="mk-id">${esc(s.chain)}</td>
      <td><span class="mk-state is-${stCls(s.r)}">${esc(stLab(s.r))}</span></td>
      <td class="mk-num">${s.pts[0].p}% → <b>${s.r.p}%</b></td>
      <td class="mk-num">${s.r.ws||"未記錄"} → ${s.r.we||"未記錄"}</td></tr>`).join("")}
    </tbody></table></div>

${H("涉入的行為者","點進去是該國的利益卡片")}
  <div class="mk-cards">
  ${EV.actors.map(a=>{const c=AC.cards.find(x=>x.slug===a.slug);
    const inner=`<div class="mk-card-h"><span class="mk-card-flag">${c.flag}</span><span class="mk-card-n">${esc(c.name)}</span></div>
      <div class="mk-card-lead">${esc(c.lead)}</div>
      <div class="mk-cov">${c.has.map(h=>`<i class="${h?"on":""}"></i>`).join("")}</div>
      <div class="mk-cov-lab">利益卡片 ${c.has.reduce((s,v)=>s+v,0)}/8 節</div>`;
    return (a.slug==="us"||a.slug==="ir")
      ? `<a class="mk-card is-${c.status}" href="../../actors/${a.slug}/">${inner}</a>`
      : `<div class="mk-card is-${c.status}">${inner}</div>`;}).join("")}
  </div>
  <p class="mk-note"><b>伊朗的卡片只有 8 節裡的 1 節。</b>它是這個事件鍊的當事方，卻是所有卡片裡最薄的一張。
  這件事必須在畫面上看得出來，不能只寫在頁尾——讀者對伊朗行為的解讀，正好是最沒有基準可靠的那一個。</p>`;

  return shell({title:EV.title+" — 事件鍊（mockup）",section:"事件鍊",nav:nav("events",2),
    crumbPath:"/events/"+EV.id+"/",crumbNote:"一個主要事件、底下的新聞，以及它推動的每一種後果",
    crumbKind:"事件鍊",body,depth:2});
}

/* ══ 事件鍊索引 ═══════════════════════════════════════════════════ */
function eventsIndex(){
  const series=EV.outcomes.map(o=>({...o,...traj(o.chain)}));
  const body=`
${H("事件鍊","一個主要事件 · 底下的新聞 · 它推動的每一種後果")}
  <div class="mk-lede">
    <p><b>「事件鍊」在這裡只有一個意思：一個主要事件，底下掛著會改變後果機率的新聞。</b>
    舊版站台用同一個詞指版本鏈快照（同一個命題的逐版修訂），兩件事混在一起，
    於是表格裡每一列看起來都像一條因果鍊，實際上只是一句話的修訂史。</p>
  </div>
  <div class="dcl-table-scroll"><table class="mk-t">
    <thead><tr><th>主要事件</th><th>期間</th><th>後果分支</th><th>新聞</th><th>狀態</th></tr></thead>
    <tbody>
      <tr><td><a class="mk-id" href="${EV.id}/">${esc(EV.title)}</a> — ${esc(EV.subtitle)}</td>
        <td class="mk-num">${EV.window[0]} → ${EV.window[1]}</td>
        <td class="mk-num">${series.length}</td><td class="mk-num">${EV.news.length}</td>
        <td><span class="mk-state is-open">已建</span></td></tr>
      ${EV.others.map(o=>`<tr><td>${esc(o.title)}</td><td class="dcl-empty">—</td>
        <td class="dcl-empty">—</td><td class="dcl-empty">—</td>
        <td><span class="mk-state is-not-recorded">${esc(o.state)}</span></td></tr>`).join("")}
    </tbody></table></div>
  <p class="mk-note">其他三條列出來但不做假資料。<b>一個列了四條、其中三條是編的索引，比一條真的更糟</b>——
  讀者無從分辨哪一條可信。這裡照實標「未建」。</p>`;
  return shell({title:"事件鍊 — intel-analysis（mockup）",section:"事件鍊",nav:nav("events",1),
    crumbPath:"/events/",crumbNote:"主要事件清單",crumbKind:"索引",body,depth:1});
}

/* ══ 國家背景基準 索引 ════════════════════════════════════════════ */
function actorsIndex(){
  const body=`
  <div class="mk-hero">
    <div class="mk-hero-kicker">國家背景基準</div>
    <h1>各國利益卡片</h1>
    <p>各國的長期利益、制度限制、常用手段與可修正訊號。這是<b>分析前提</b>，不是當日結論；
    若當日新訊號與本頁基準衝突，以新訊號優先修正判斷。</p>
    <div class="mk-hero-meta">
      <div><span class="k">卡片</span><span class="v">${AC.cards.length}</span></div>
      <div><span class="k">八節齊全</span><span class="v">${AC.cards.filter(c=>c.status==="full").length}</span></div>
      <div><span class="k">部分待驗證</span><span class="v">${AC.cards.filter(c=>c.status==="partial").length}</span></div>
      <div><span class="k">待整理·禁止參照</span><span class="v">${AC.cards.filter(c=>c.status==="blocked").length}</span></div>
    </div>
  </div>
  <div class="mk-lede">
    <p><b>舊版這一頁的內容是錯的。</b>它寫著「核心利益、利益排序、紅線這三個 SKILL-04 欄位<u>不存在於預測驗證資料庫</u>，
    因此本頁不呈現」——這句話對預測驗證資料庫是真的，對這套方法論卻是假的。
    這些欄位一直都在，只是在另一個地方：Notion 的「各國立場」。舊版拿它算不出來的東西當成不存在，
    於是頁面實際呈現的是關鍵詞計數，卻掛著「國家背景基準」這個名字。</p>
    <p>這一頁改成呈現真正的利益卡片，並且<b>把每張卡片的完整度畫在卡面上</b>——
    八節齊不齊，一眼就看得到。</p>
  </div>

${H("使用原則","母頁自訂，逐條原文")}
  <div class="dcl-panel-flush"><div class="mk-sec"><ul>
    ${AC.principles.map(p=>`<li>${esc(p)}</li>`).join("")}
  </ul></div></div>

${H("卡片","色塊＝八節中已寫的節數")}
  <div class="mk-cards">
  ${AC.cards.map(c=>{
    const inner=`<div class="mk-card-h"><span class="mk-card-flag">${c.flag}</span><span class="mk-card-n">${esc(c.name)}</span></div>
      <div class="mk-card-lead">${esc(c.lead)}</div>
      <div class="mk-cov">${c.has.map(h=>`<i class="${h?"on":""}"></i>`).join("")}</div>
      <div class="mk-cov-lab">${c.status==="blocked"?"待整理 · 禁止參照"
        :c.has.reduce((s,v)=>s+v,0)+"/8 節"+(c.extra.length?" ＋"+c.extra.length+" 節專章":"")}</div>`;
    return (c.slug==="us"||c.slug==="ir")
      ? `<a class="mk-card is-${c.status}" href="${c.slug}/">${inner}</a>`
      : `<div class="mk-card is-${c.status}">${inner}</div>`;}).join("")}
  </div>
  <p class="mk-note">mockup 只把美國與伊朗做成可點的內頁，其餘卡面為真實資料但未做內頁。
  <b>印度整張是灰的</b>：母頁規則寫著「標記為待整理的國家，不納入分析、比較、推導與輸出，AI 禁止參照其內容」——
  站台照著這條規則做，而不是把它當成註解。</p>

  <div class="mk-scope">
    <div class="h">上站前必須先決定的事</div>
    <p><b>這些卡片不在目前已核定的公開範圍內。</b>CHG-20260828-02 當時的使用者決定是
    「公開範圍：(a) 事件鍊摘要與機率」，來源限定在預測驗證資料庫；
    「各國立場」是另一個資料源，逐段是分析者自己寫的長期研判，不是帳本欄位。</p>
    <p>把它上站等於擴大公開範圍，需要一次新的決定，不能靠這張 mockup 順帶帶過去。
    本頁先以 <code>noindex</code> 產出，僅供版面確認。</p>
  </div>`;
  return shell({title:"國家背景基準 — intel-analysis（mockup）",section:"國家背景基準",nav:nav("actors",1),
    crumbPath:"/actors/",crumbNote:"各國長期利益、制度限制、常用手段與反證訊號",crumbKind:"分析前提",body,depth:1});
}

/* ══ 國家背景基準 內頁 ════════════════════════════════════════════ */
function actorPage(slug){
  const c=AC.cards.find(x=>x.slug===slug), card=AC[slug];
  const chains=R.filter(r=>{
    const kw={us:["美方","美軍","美伊","美對","華府","川普"],ir:["伊朗","伊方","德黑蘭","霍爾木茲","霍峽","美伊","以伊"]}[slug]||[];
    return kw.some(k=>r.stmt.includes(k));}).sort((a,b)=>T(b.upd||ASOF)-T(a.upd||ASOF)).slice(0,8);

  const secs=AC.sections.filter(s=>card[s]).map(s=>
    `<div class="mk-sec"><div class="mk-sec-h"><b>${esc(s)}</b><span>${card[s].length} 條</span></div>
     <ul>${card[s].map(b=>`<li>${esc(b)}</li>`).join("")}</ul></div>`).join("");

  const missing=AC.sections.filter(s=>!card[s]);
  const body=`
  <div class="mk-hero">
    <div class="mk-hero-kicker">國家背景基準 · 利益卡片</div>
    <h1>${c.flag} ${esc(c.name)}</h1>
    <p>${esc(c.lead)}</p>
    <div class="mk-hero-meta">
      <div><span class="k">已寫節數</span><span class="v">${c.has.reduce((s,v)=>s+v,0)} / 8</span></div>
      <div><span class="k">條目合計</span><span class="v">${AC.sections.reduce((s,k)=>s+(card[k]?card[k].length:0),0)}</span></div>
      <div><span class="k">帳本關聯鏈</span><span class="v">${chains.length}＋</span></div>
      <div><span class="k">來源</span><span class="v" style="font-size:12px">Notion 各國立場</span></div>
    </div>
  </div>

${H("利益卡片",missing.length?missing.length+" 節尚未寫入":"八節齊全")}
  ${secs}
  ${card.pending?`<div class="mk-warn"><div class="mk-warn-h">⚠ 待驗證項目（尚未納入正式立場）</div>
    <p>${esc(card.pending)}</p></div>`:""}
  ${missing.length?`<div class="mk-warn"><div class="mk-warn-h">尚未寫入的節</div>
    <p>${missing.map(esc).join("、")}。<b>這些節是空的，不是「沒有限制」。</b>
    畫面把空的節列出來而不是省略，是因為省略會讓一張薄卡片看起來和一張厚卡片一樣完整。</p></div>`:""}

${H("帳本上與此行為者相關的鏈","文字比對推得 · 取最近修訂 "+chains.length+" 條")}
  <div class="dcl-table-scroll"><table class="mk-t">
    <thead><tr><th>鏈</th><th>命題</th><th>狀態</th><th>最新</th></tr></thead>
    <tbody>${chains.map(r=>`<tr><td class="mk-id">${esc(r.cid)}</td><td>${esc(r.stmt)}</td>
      <td><span class="mk-state is-${stCls(r)}">${esc(stLab(r))}</span></td>
      <td class="mk-num">${r.p}%</td></tr>`).join("")}</tbody></table></div>
  <p class="mk-note">這一區是<b>推導</b>：帳本沒有國家欄位，這裡靠命題文字比對。
  卡片本身則是<b>原始內容</b>，逐條來自「各國立場」。兩者在畫面上分開，是因為它們可信的程度不一樣。</p>

  <div class="mk-scope">
    <div class="h">使用原則（母頁原文）</div>
    <p>本頁是長期基準，不是即時結論。不可直接整段照抄成輸出。
    若出現足以改寫原判斷的新訊號，應優先提醒修正，不可為維持既有敘事而忽略。</p>
  </div>`;
  return shell({title:c.name+" — 國家背景基準（mockup）",section:"利益卡片",nav:nav("actors",2),
    crumbPath:"/actors/"+slug+"/",crumbNote:"長期利益、制度限制、常用手段與反證訊號",crumbKind:"分析前提",body,depth:2});
}

const w=(p,s)=>{fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,s);
  console.log("  "+path.relative(REPO,p)+"  "+s.length+"B");};
w(path.join(OUT,"events/index.html"),eventsIndex());
w(path.join(OUT,"events",EV.id,"index.html"),eventPage());
w(path.join(OUT,"actors/index.html"),actorsIndex());
w(path.join(OUT,"actors/us/index.html"),actorPage("us"));
w(path.join(OUT,"actors/ir/index.html"),actorPage("ir"));

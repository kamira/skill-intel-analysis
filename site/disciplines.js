/* ─────────────────────────────────────────────────────────────
   INT 矩陣 — 情報學門涵蓋範圍
   完整清單,不是精選。卡片狀態代表該學門是否真的被使用。
   與 kamira/intel-analysis-showcase 的 declaration 頁同一份聲明。
   ───────────────────────────────────────────────────────────── */
window.DISCIPLINES = {
  heading: "學門涵蓋範圍",
  note: "完整清單,不是精選 · 卡片狀態代表它是否真的被使用",
  legend: [["in-use","使用中"],["incidental","偶發——僅經由報導進入"],["absent","缺席"],["excluded","依規則排除"]],
  items: [
    {name:"OSINT", status:"in-use", scope:"公開來源:媒體、聲明、公開紀錄", state:"使用中 · 僅新聞報導",
     note:"整個指標基礎。受限於媒體選擇轉述什麼,以及他們用多快的速度轉述。"},
    {name:"SOCMINT", status:"incidental", scope:"社群媒體蒐集", state:"偶發",
     note:"只有在報導引用貼文時才會進入。沒有抽樣、沒有查證,也沒有自行地理定位。"},
    {name:"GEOINT", status:"incidental", scope:"地理空間分析", state:"偶發 · 二手",
     note:"影像是以別人已發表的判讀進入的,通常是報導中引用的商業影像公司簡報。沒有任務派遣,也沒有自行分析。"},
    {name:"HUMINT", status:"absent", scope:"人力來源", state:"缺席",
     note:"意圖、內部異見與決策時機都是從行為推斷的,從來不是來自來源。"},
    {name:"SIGINT", status:"absent", scope:"訊號——COMINT、ELINT、FISINT 的上位類別", state:"缺席",
     note:"無法做到短前置期預警。啟動與指管通訊都無法觀測。"},
    {name:"COMINT", status:"absent", scope:"通訊截收", state:"缺席",
     note:"談判狀態只能從公開立場讀取,那是最不可靠的版本。"},
    {name:"ELINT", status:"absent", scope:"非通訊發射源、雷達戰鬥序列", state:"缺席",
     note:"防空與感測器部署的變化不會被看見。"},
    {name:"FISINT", status:"absent", scope:"外國儀器訊號、遙測", state:"缺席",
     note:"飛彈與太空試驗的性能只能取自官方宣布,而非量測。"},
    {name:"IMINT", status:"absent", scope:"GEOINT 之下的影像蒐集", state:"缺席",
     note:"兵力部署的說法無法用一次過境影像來核對。"},
    {name:"MASINT", status:"absent", scope:"量測與特徵訊號", state:"缺席",
     note:"核子、化學與飛彈相關問題正因如此最為薄弱。"},
    {name:"ACINT", status:"absent", scope:"聲學與水下", state:"缺席",
     note:"潛艦與海底基礎設施的問題只能倚賴官方聲明。"},
    {name:"TECHINT", status:"absent", scope:"擄獲或已服役裝備的技術剖析", state:"缺席",
     note:"能力宣稱只能照其宣稱的性能採用。"},
    {name:"CYBINT · DNINT", status:"absent", scope:"網路與數位網路", state:"缺席",
     note:"入侵行動只有在公開歸因之後才會出現,通常已延遲數月。"},
    {name:"FININT", status:"absent", scope:"資金流動、制裁追蹤", state:"缺席",
     note:"只看得到價格與已公開的申報文件;資金的實際移動看不到。"},
    {name:"MEDINT", status:"absent", scope:"醫療與公共衛生", state:"缺席",
     note:"傷亡、動員健康狀況與疫情指標都無法取得。"},
    {name:"RUMINT", status:"excluded", scope:"無來源流傳、傳聞", state:"依規則排除",
     note:"不被採認為指標。只有在它牽動市場或官方回應時,才會記錄成一則註記。"}
  ]
};

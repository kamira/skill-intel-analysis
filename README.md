# skill-intel-analysis

`intel-analysis` 的獨立 repo:情報分析方法論——十步驟框架(SKILL-01〜20)、
23 條核心紀律、檔案化的預測驗證帳本(版本鏈、Brier 校準),
對齊 ICD 203/206 與 NATO Admiralty 評級。

從 [`kamira/ai-skills`](https://github.com/kamira/ai-skills) 拆出,獨立治理與編輯。

## 安裝

```
/plugin marketplace add kamira/skill-intel-analysis
/plugin install intel-analysis
```

## 這個 repo 有什麼

| 路徑 | 內容 |
|------|------|
| `skills/intel-analysis/` | skill 本體(單一真相),雙語成對 |
| `plugins/intel-analysis/` | 可安裝的 plugin(skill 副本為生成物) |
| `docs/intel-analysis/` | 帳本(CHG / ACC)+ 指引 + 知識庫 |
| `tools/` | 隨身治理工具,來自 `kamira/skill-ai-sdlc-autopilot` |

## 隨身工具

`tools/` 底下四支是**副本**,不是本 repo 的原創。分開治理的代價就是副本會漂,
所以 `tools/PROVENANCE.json` 記下帶過來當下的雜湊,`tools/tools_drift_check.py` 在 CI 檢查。

它查得出**本地被改過**,查不出**上游已前進**——後者要主動同步。
這個盲點是明說的:把查不出來的事說成查過了,比不查更糟。

## 授權

MIT(見 `LICENSE`)。

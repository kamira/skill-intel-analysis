# AGENTS.md — AI entry point(任何 agent、任何廠商 / any agent, any vendor)

本 repo 只收 **intel-analysis** 這一個 plugin。治理記錄在 `docs/intel-analysis/` 底下。

1. **動任何東西之前必讀**:`docs/intel-analysis/ai-guideline.md` →
   `docs/intel-analysis/CHANGELOG.md` → `docs/intel-analysis/knowledge/`(讀 INDEX)→
   `docs/intel-analysis/changes/`(未收尾 CHG 先處理)。
2. **單一真相**:skill 內容在 `skills/intel-analysis/`(雙語成對:`.md` 英 / `.zh-tw.md` 繁中,
   必須同步)。`plugins/` 底下的副本是**生成物**,由 `plugins/build_suite.py` 產生。
3. **不可協商**:任何修改先開 CHG(`docs/intel-analysis/changes/CHG-YYYYMMDD-NN.md`)再動手;
   commit 帶 CHG 編號;同輪產出 ACC;時間一律 UTC+0。
4. **治理工具是隨身副本**:`tools/` 底下四支來自 `kamira/skill-ai-sdlc-autopilot`。
   **不要就地改**——改了 `tools/tools_drift_check.py` 會紅。要改就送回上游再同步下來。

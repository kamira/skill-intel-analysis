#!/usr/bin/env python3
"""公開範圍的機械閘。exit 0 = 通過。

兩道:
  1. 帳本欄位 —— site/*.js 不得出現 CHG-20260828-02 具名排除的五個欄位名。
  2. 利益卡片 —— site/actors.js 只公開「結構與完整度」,不得出現卡片條文。

全文比對,不做註解豁免——豁免等於留一條「寫在註解裡就過」的後門。
代價是資料檔的檔頭不能字面列出那五個名字,該處已註明原因。
"""
import pathlib
import re
import sys

REPO = pathlib.Path(__file__).resolve().parent.parent
EXCLUDED_FIELDS = ["觸發指標", "版本說明", "校準備註", "對應情境", "來源分析"]

# 使用原則五條屬方法論,與任何個別國家的研判無關,逐條具名放行。
ALLOW = {
    "本頁是長期基準,不是即時結論。",
    "不可直接整段照抄成輸出。",
    "先看核心利益,再看制度與政治約束,再看可用手段,最後看反證訊號。",
    "若出現足以改寫原判斷的新訊號,應優先提醒修正,不可為維持既有敘事而忽略。",
    "標記為「待整理」的國家或條目,僅保留原文供後續修訂,不納入分析、比較、推導與輸出,AI 禁止參照其內容。",
}
BODY_LEN = 40   # 卡片條文最短的一條也遠長於此;節名、狀態、日期都遠短於此


def fail(msg):
    print("::error::" + msg)
    return 1


def ledger_fields():
    bad = 0
    for f in sorted((REPO / "site").glob("*.js")):
        text = f.read_text(encoding="utf-8")
        for i, line in enumerate(text.splitlines(), 1):
            for name in EXCLUDED_FIELDS:
                if name in line:
                    bad += fail("%s:%d 含有 CHG-20260828-02 具名排除的欄位「%s」" % (f.name, i, name))
    if not bad:
        print("帳本欄位範圍檢查通過(掃過 %d 個資料檔)" % len(list((REPO / "site").glob("*.js"))))
    return bad


def card_bodies():
    f = REPO / "site" / "actors.js"
    if not f.exists():
        return fail("找不到 site/actors.js")
    src = re.sub(r"/\*.*?\*/", "", f.read_text(encoding="utf-8"), flags=re.S)
    bad = 0
    for s in re.findall(r'"((?:[^"\\]|\\.)*)"', src):
        if len(s) >= BODY_LEN and s not in ALLOW:
            bad += fail("actors.js 出現疑似卡片條文(長度 %d):%s…" % (len(s), s[:50]))
    if not bad:
        print("利益卡片範圍檢查通過(只有結構與完整度,無條文)")
    return bad


if __name__ == "__main__":
    sys.exit(1 if (ledger_fields() + card_bodies()) else 0)

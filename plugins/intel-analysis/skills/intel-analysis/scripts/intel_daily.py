#!/usr/bin/env python3
"""
intel_daily.py — **已棄用**,請改用 intel_loop.py(CHG-20260729-02)

改名理由:本機制的單位是「盤點回合(tracking cycle)」而非日曆天;`daily` 這個名字把當時的
每日需求誤寫成了機制身分。本 shim 僅為相容既有排程與腳本呼叫,轉呼叫 intel_loop.main 並保持
相同退出碼,**下一個 minor 版本移除**。
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import intel_loop  # noqa: E402

# 釘住輸出編碼(CHG-20260803-01 T1):不依賴主控台/locale 的 ambient 編碼。
# 非 UTF-8 主控台(如 Windows cp932)印 CJK/emoji 會 UnicodeEncodeError;
# 釘住後同一份程式在任何平台的輸出行為一致。errors="replace" 確保永不因輸出而崩潰。
for _stream in (sys.stdout, sys.stderr):
    if hasattr(_stream, "reconfigure"):
        _stream.reconfigure(encoding="utf-8", errors="replace")


def main(argv) -> int:
    print("⚠️ [DEPRECATED] intel_daily.py 已改名為 intel_loop.py(單位為盤點回合,非日曆天)。"
          "請改呼叫 intel_loop.py;本相容層將於下一個 minor 版本移除。", file=sys.stderr)
    return intel_loop.main([Path(__file__).name] + list(argv[1:]))


if __name__ == "__main__":
    sys.exit(main(sys.argv))

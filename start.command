#!/bin/bash
cd "$(dirname "$0")"
echo "========================================"
echo "  黄镇涛 — Zhentao Huang Portfolio"
echo "  正在启动开发服务器..."
echo "========================================"
echo ""
echo "  网站启动后请打开浏览器访问："
echo "  http://localhost:5173"
echo ""
echo "  按 Ctrl+C 停止服务器"
echo "========================================"
echo ""

(sleep 3 && open http://localhost:5173) &

npm run dev

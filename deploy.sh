#!/bin/bash
set -e
cd /Users/GaoSeafood/Desktop/ClaudeCode/portfolio-v2

echo "=== 1/3 推送 GitHub ==="
git add -A
git commit -m "Update" || echo "（无新改动，跳过 commit）"
git push 2>/dev/null || echo "（推送失败，继续部署）"

echo "=== 2/3 构建 ==="
npm run build

echo "=== 3/3 部署 Cloudflare Pages ==="
npx wrangler@4.97.0 pages deploy dist/ --project-name hzt-portfolio --branch main --commit-dirty=true

echo "=== 完成！==="
echo "访问: https://hzt-portfolio.pages.dev"

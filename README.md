# 中國竹笛知識庫 · Dizi Atlas

以香港繁體中文整理中國竹笛的學習、聆聽與文化資料，收錄 100 篇竹笛札記、50 位人物、100 首曲目、25 項技法、10 個研究專題及 200 個研究題目。

- GitHub Pages：https://teabonvivant.github.io/dizi-atlas-hk/
- 原有網站：https://dizi-atlas-hk.teabonvivant.chatgpt.site/

## 本機使用

需要 Node.js 22.13 或以上。

```sh
npm ci
npm run dev
```

開啟 `http://localhost:8069/dizi-atlas-hk/`。

## 建立與檢查

```sh
npm run typecheck
npm run build
node scripts/verify-pages.mjs
npm start
```

靜態網站輸出至 `out/`；本機靜態預覽為 `http://localhost:8079/dizi-atlas-hk/`。搜尋、分類和分頁在瀏覽器內運作，文章及詳情頁在建立時輸出完整 HTML。

## 發佈

推送至 `main` 後，GitHub Actions 會安裝依賴、檢查類型、建立靜態網站、核對站內連結和文章插圖，再發佈至 GitHub Pages。Repository 的 Pages 設定須使用 **GitHub Actions**。

專案路徑固定為 `/dizi-atlas-hk`。如更改 repository 名稱或改用獨立網域，須一併調整 `next.config.mjs`、`lib/paths.ts`、字型路徑、網站 metadata、sitemap 及路徑檢查程式。

## 檔案

- `app/`、`components/`：頁面、閱讀介面與互動元件
- `content/`、`data/`、`lib/`：文章、人物、曲目、研究資料及整理邏輯
- `public/images/`、`public/fonts/`：插圖、主視覺、字型及相關授權文件
- `scripts/`：內容、路徑、圖片及發佈檢查
- `docs/`、`DESIGN.md`：設計及圖片來源紀錄

此版本以原網站第 11 版的已發佈程式碼 `8ab8065ae05562cd8cd1deb4330e74960fac85d9` 為基礎，保留文章、資料與圖片，加入 GitHub Pages 路徑及靜態匯出支援。`.openai/hosting.json`、Vinext 設定及 `build:sites` 保留原平台的來源紀錄；GitHub Pages 發佈使用 `npm run build`。

# 📋 TaskPilot 專案交接摘要（v4.5.1）

> **給 AI 的快速上手文件**：新會話請先讀這份文件，再配合 `/home/user/outputs/` 與 `/home/user/workspace/task-manager/` 的檔案工作。所有關鍵資訊都在這裡。

---

## 一、專案是什麼

**TaskPilot 任務管理平台** — 單頁應用（SPA）+ PWA，個人使用的任務/定期任務管理工具。
- 官方網址：`https://kennethdias.github.io/taskjob/`
- GitHub 倉庫：`https://github.com/KennethDias/taskjob`（**公開**，只放 App 代碼，無數據）
- 數據倉庫：`https://github.com/KennethDias/taskpilot-data-private`（**私有**，存放 `taskpilot-data.json`，任務數據端到端加密後上傳）
- 當前版本：**v4.5.1 · 2026-08-25 修復 GitHub Pages 子路徑 404**
- 更新方式：GitHub Desktop 解壓覆蓋 → Commit → Push → GitHub Pages 自動發布（等 1～2 分鐘）

## 二、技術棧與專案結構

```
技術棧：React 18 + TypeScript + Tailwind CSS v3 + Parcel（打包）
        圖示：lucide-react ｜ 同步：lz-string、qrcode ｜ 加密：Web Crypto AES-GCM

工作目錄：/home/user/workspace/task-manager/
├── src/
│   ├── App.tsx              主頁面（版本字串在此，側邊欄底部）
│   ├── main.tsx             入口
│   ├── components/          各視圖組件（TaskFormDialog、TaskDetailPanel、
│   │                        RecurringTasksView、WeeklyReportView、SyncDialog、PasswordLock…）
│   ├── hooks/useTaskStore.tsx   核心 store（localStorage + GitHub 同步）
│   ├── lib/                 types.ts、utils.ts、github-sync.ts、crypto.ts
│   └── data/seed.ts         示範資料（12 個種子任務）
├── index.html               主入口（PWA meta）
├── index.single.html        單檔版入口（本機離線用）
├── manifest.webmanifest     PWA manifest
├── public/sw.js             Service Worker（固定檔名）
├── inject-pwa.mjs           單檔版 PWA 圖示注入
├── scripts/postbuild.mjs    打包後處理（固定檔名 + 相對路徑修正 + SW 註冊）
└── 根目錄：icon-*.png、favicon.ico（PWA 圖示）

交付目錄：/home/user/outputs/
├── deploy-taskpilot.zip      部署包（12 個固定檔名檔案）★ 給用戶上傳 GitHub
├── deploy-taskpilot/         部署包展開目錄
├── task-pilot.html           單檔版（本機離線用，含 PWA 圖示）
├── task-pilot-任務管理.html   同上（中文名副本）
└── 各指南 .md（安裝與更新指南、GitHub Pages 發布教學、隱私保護指南、README×2）
```

## 三、建置流程（重要！）

```bash
cd /home/user/workspace/task-manager
npx tsc --noEmit                          # ① 型別檢查
# ② 打包（★ 一定要加 --public-url ./，否則產出絕對路徑 /app.js → GitHub Pages 子路徑 404）
npx parcel build index.html --dist-dir dist --no-source-maps --public-url ./
node scripts/postbuild.mjs                # ③ 固定檔名 app.js/app.css + 注入 SW 註冊 + 相對路徑修正
# ④ 更新部署包：
rm -rf /home/user/outputs/deploy-taskpilot && mkdir -p /home/user/outputs/deploy-taskpilot
cp dist/* /home/user/outputs/deploy-taskpilot/
cd /home/user/outputs && zip -r -q deploy-taskpilot.zip deploy-taskpilot/
# ⑤ 單檔版（可選）：
rm -rf dist-single && npx parcel build index.single.html --dist-dir dist-single --no-source-maps --public-url ./
cd dist-single && npx html-inline -i index.single.html -o /tmp/single.html
cd /home/user/workspace/task-manager && node inject-pwa.mjs /tmp/single.html
cp /tmp/single.html /home/user/outputs/task-pilot.html
```

**坑**：node_modules 偶爾會整個消失 → 先 `npm install --no-audit --no-fund`（325 packages）；outputs 目錄權限問題 → `sudo chown -R user:user /home/user/outputs`；打包偶發 OOM → 可加 `NODE_OPTIONS=--max-old-space-size=4096`。

## 四、部署流程（用戶操作，需教學）

1. 解壓 `deploy-taskpilot.zip` → **12 個固定檔名檔案**覆蓋到 GitHub 倉庫根目錄
2. GitHub Desktop：Commit → Push origin main
3. 等 1～2 分鐘，開啟 `https://kennethdias.github.io/taskjob/`
4. 驗證：側邊欄底部顯示 **v4.5.1 · 2026-08-25 修復 GitHub Pages 子路徑 404** = 新版
5. 手機/瀏覽器仍舊版 → Chrome ⋮ → 網站設定 → 清除和重設網站資料 → 重開

**部署包 12 檔案**：app.js、app.css、sw.js、index.html、manifest.webmanifest、favicon.3d1665ba.ico、icon-180/192/512、icon-maskable-180/192/512（固定檔名，不含 hash，可永久覆蓋更新）

## 五、功能清單（已完成）

| 功能 | 說明 |
|---|---|
| 待辦任務 | 父/子任務（新建可關聯上層）、平行關聯任務、負責人/跟進人/目標日期/下次更新日期、需要討論事項（可多選關聯任務）、討論中心 |
| 定期任務 | 每日/每週/每月/每季度/每半年/每年，狀態分組（逾期⚠️/將要做/正在做/已完成）、逾期紅徽章 |
| 每週報告 | 自動整理當前進度與待辦 |
| 總覽 | 儀表板統計 |
| 更新進度 | 週期感知：同週期內更新＝**修改原記錄**；跨週期才新增記錄並滾動下一週期 |
| 列表/卡片 | 待辦視圖可切換列表模式 |
| 已完成歷史 | 側邊欄 badge 不含 done；「全部」排除 done；獨立「✅ 已完成（歷史）」分頁 |
| GitHub 同步 | 資料存 `taskpilot-data.json`（私有倉庫），Token（Fine-grained PAT，存 localStorage）、自動拉取/推送、端到端加密（AES-GCM，PC/手機輸相同密碼） |
| 備份 | 手動 JSON 匯出/匯入、自動備份（可選保留最近 N 份） |
| 密碼鎖 | 進入 App 可用密碼/手機指紋 |
| PWA | 手機/PC 可安裝（manifest + sw.js 固定檔名） |
| 示範資料 | 側邊欄「載入示範資料」（seed.ts 12 任務） |

## 六、已知坑與教訓（必讀！）

1. **Parcel 絕對路徑問題**（v4.5.1 已修）：打包預設輸出 `/app.js`，但 GitHub Pages 在 `/taskjob/` 子路徑 → 全部 404。解決：`--public-url ./` 打包 + postbuild.mjs 的相對路徑修正（index.html 與 manifest 的 src/href 都不能以 `/` 開頭）
2. **固定檔名策略**：不要再輸出 `task-manager.<hash>.js`，一律 `app.js/app.css/sw.js`，部署時覆蓋同名檔案即可；舊 hash 檔可刪
3. **sw.js 必須固定檔名**（非 module 包裝），Android Chrome 安裝 PWA 才認可
4. **GitHub Pages 子路徑**：部署後等 1～2 分鐘才生效；用戶看到 404 常是發布空窗期，先 curl 確認再下結論
5. **版本驗證**：一律看側邊欄底部版本字串；改版時同步更新 src/App.tsx 的版本字串（兩處）+ 指南
6. **用戶裝置**：OPPO N6（Android，內外屏）+ iPhone 16e + PC（Windows + GitHub Desktop）；手機偶爾看不到更新＝SW 快取，需「清除和重設網站資料」
7. **安全**：App 倉庫公開（只含代碼）；數據倉庫私有 + 端到端加密；Token 只在 localStorage；不要讓 taskpilot-data.json 出現在公開倉庫
8. **node_modules 會消失**：重裝即可，無需 git 操作

## 七、常見任務速查

- 改功能 → 改 src/ → tsc → 打包 → 更新 zip + 指南版本號 → 交付 zip
- 用戶回報「打不開」→ 先 curl：`https://kennethdias.github.io/taskjob/` 與 `/app.js`，再看 raw.githubusercontent 的 index.html 路徑是否相對
- 驗證子路徑 → 本地模擬：`mkdir -p /tmp/sim/taskjob && cp -r deploy-taskpilot/* /tmp/sim/taskjob/ && cd /tmp/sim && python3 -m http.server 8827`，瀏覽器開 `http://localhost:8827/taskjob/`
- 版本更新習慣：主版本跳號 + 日期 + 簡短描述（例：`v4.6.0 · 2026-08-25 新增XX功能`）

## 八、最近版本歷史

| 版本 | 內容 |
|---|---|
| v4.5.1 | **修復 GitHub Pages 子路徑 404**（相對路徑）★ 當前 |
| v4.5.0 | 待辦任務排除已完成＋「已完成（歷史）」分頁 |
| v4.1.0 | 討論關聯任務可用（多選修正）|
| v4.0.0 | 列表模式＋週期更新＋討論關聯修正 |
| v3.x | PWA 安裝修正、GitHub 直接同步、同步中心 |
| v2.x | 定期任務（6 週期）、討論中心、平行關聯 |

---

*交接日期：2026-08-25 ｜ 後續諮詢可直接引用「TaskPilot 專案交接摘要」*
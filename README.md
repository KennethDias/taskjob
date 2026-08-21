# TaskPilot 任務管理平台

> TaskPilot — Personal Task Management PWA (Progressive Web App)
> 個人任務管理網頁應用：支援任務、子任務、定期任務、討論關聯、進度更新、每週報告、跨裝置同步與隱私保護。

<https://kenneth.github.io/taskjob-kenneth/>（GitHub Pages 發布網址，以實際網址為準）

---

## 📖 專案簡介 / About

TaskPilot 是一個**單一靜態網頁（PWA）**任務管理工具，部署於 GitHub Pages，無需伺服器。

主要功能：

| 功能 | 說明 |
|---|---|
| ✅ 任務管理 | 建立任務，設定目標日期、負責人、跟進人、標籤 |
| 🔁 定期任務 | 每日／每週／每月／每季／每半年／每年，自動分類與逾期提醒 |
| 🧩 子任務與關聯 | 任務遇難點可拆子任務；任務間可設父子／平行關聯 |
| 💬 討論事項 | 跨任務討論，可關聯多個任務並標記解決 |
| 📈 進度更新 | 週期感知的進度時間線（同週期修改原記錄，跨週期新增） |
| 📊 每週報告 | 自動整理當週進度、待辦、逾期、討論事項 |
| 📡 跨裝置同步 | 透過 GitHub API 同步任務資料（可搭配端到端加密） |
| 🔒 隱私保護 | 密碼鎖、指紋解鎖（WebAuthn）、資料 AES-256 端到端加密 |

---

## 📂 檔案結構 / File Structure

本倉庫僅存放 **App 網頁檔案（公開）**，不包含任何任務資料：

| 檔案 | 說明 |
|---|---|
| `index.html` | App 入口頁面 |
| `app.js` | 應用程式邏輯（固定檔名，每次更新覆蓋） |
| `app.css` | 樣式（固定檔名，每次更新覆蓋） |
| `sw.js` | Service Worker（PWA 離線／安裝支援） |
| `manifest.webmanifest` | PWA 安裝清單 |
| `icon-180.png` / `icon-192.png` / `icon-512.png` | App 圖示 |
| `icon-maskable-180.png` / `icon-maskable-192.png` / `icon-maskable-512.png` | Android 遮罩圖示 |
| `favicon.ico` | 瀏覽器分頁小圖示 |

> ⚠️ **本倉庫不應包含 `taskpilot-data.json`** —— 任務資料存放在**私有的資料倉庫**（見 `taskpilot-data-private`）。

---

## 🚀 部署 / Deployment

本專案使用 **GitHub Pages** 發布（免費、無構建額度限制）：

1. 開啟倉庫 → **Settings → Pages**
2. **Source** 選 **Deploy from a branch** → **Branch** 選 `main` → 資料夾 `/ (root)` → Save
3. 完成後即可透過 `https://<帳號>.github.io/<倉庫名>/` 存取

---

## 🔄 更新流程 / Updating

> 部署檔案全部使用**固定檔名**（`app.js`、`app.css`、`sw.js`…），更新不會產生殘留舊檔。

每次更新的標準流程：

```
① 取得最新部署包（deploy-taskpilot.zip，內含 12 個固定檔名檔案）
② 將 12 個檔案【覆蓋】到本倉庫根目錄（同名直接取代）
③ Commit → Push 到 main
④ GitHub Pages 自動重新發布（1～2 分鐘）
```

> 💡 若倉庫內仍留有舊版殘留檔（如 `task-manager.xxxxx.js`、`sw.xxx.js`），可一併刪除——新版只需要上述 12 個檔案。

---

## 🔐 隱私與安全 / Privacy & Security

| 議題 | 說明 |
|---|---|
| 倉庫為何公開 | GitHub Pages 免費方案僅支援公開倉庫 |
| 任務資料在哪裡 | **不在本倉庫**。任務資料透過 App 內「同步中心」存到 **私人資料倉庫**（`taskpilot-data-private`） |
| 資料如何保護 | App 支援 **AES-256-GCM 端到端加密**：推送前自動加密、拉取後自動解密，倉庫內只有密文 |
| 登入保護 | App 支援密碼鎖與指紋／生物辨識解鎖（WebAuthn） |
| Token 安全 | GitHub Token 僅存在使用者瀏覽器 localStorage，不會上傳任何第三方 |

---

## 📱 安裝為 App / Install as App

- **Android / OPPO**：Chrome 開啟網址 → 選單 ⋮ → **安裝應用程式**
- **iPhone**：Safari 開啟網址 → 分享 ⬆️ → **加入主畫面**
- **PC**：Chrome／Edge 網址列右側 → **安裝**

> 安裝後如同原生 App 全螢幕開啟，並有獨立圖示。

---

## 🧰 技術棧 / Tech Stack

- React 18 + TypeScript（Vite／Parcel 建構）
- Tailwind CSS（自製 UI 元件庫）
- WebAuthn（生物辨識）、Web Crypto API（AES-256-GCM 加密）
- GitHub Contents API（資料同步）、PWA（Service Worker + Manifest）

---

## 📝 License

Private / Personal Use — 本專案為個人任務管理用途。

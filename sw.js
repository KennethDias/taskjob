/* TaskPilot Service Worker (v4)
 * 標準做法：固定檔名 sw.js，非模組化包裝，Android Chrome 安裝最相容
 * 用途：
 * 1. 讓 Chrome/Android 認可此為可安裝 PWA（「安裝應用程式」必要條件）
 * 2. 快取主要資源，支援離線開啟
 */
const CACHE_NAME = 'taskpilot-v4';

// 安裝時預先快取核心資源（圖示等帶 hash 檔名資源由 fetch 處理器自動快取）
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(['./index.html', './manifest.webmanifest'])).catch(() => {}),
  );
});

// 啟用時清理舊快取
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

// 網路優先、失敗退回快取（確保更新時拿到最新版，離線時仍可開啟）
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // 只處理同源 GET 請求
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone)).catch(() => {});
        return response;
      })
      .catch(() => caches.match(event.request).then((hit) => hit || caches.match('./index.html'))),
  );
});
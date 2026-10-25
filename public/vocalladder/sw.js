// Fixed cache name: fetches are network first, so the cache only needs to hold the latest copy.
// Older caches of this app (e.g. "vocalladder-<build>") are removed on activate.
const PREFIX = "vocalladder-";
const CACHE = PREFIX + "cache";
const CORE = ["./", "index.html", "timer.js", "ja/", "manifest.json", "THIRD_PARTY_LICENSES.md", "icons/icon.svg"];
// Libraries loaded from a CDN with a pinned version (WEBAPP_BASELINE.md §3-10): the content of such a URL
// never changes, so it is cached on first use and served from the cache, which makes it work offline.
// Also add the host to connect-src in public/_headers. Leave empty when no CDN library is used.
const CDN = [];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.all(
        CORE.map((url) =>
          fetch(new Request(url, { cache: "reload" }))
            .then((res) => res.ok && cache.put(url, res))
            .catch(() => {})
        )
      )
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      // Only touch this app's caches (other apps on the same origin share Cache Storage)
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith(PREFIX) && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network first (always the latest when online), cache as offline fallback.
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  // Pinned CDN files: cache first
  if (CDN.includes(req.url)) {
    event.respondWith(
      caches.match(req.url).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(req.url, copy));
            }
            return res;
          })
      )
    );
    return;
  }
  if (new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(new Request(req.url, { cache: "no-cache" }))
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(req, { ignoreSearch: true }).then((r) => r || (req.mode === "navigate" ? caches.match("index.html") : undefined))
      )
  );
});

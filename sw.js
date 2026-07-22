/* Service worker för Träningsveckan.

   Strategi: stale-while-revalidate. Appen startar direkt ur cachen, även
   utan täckning, och nya filer hämtas i bakgrunden. Den nya versionen tas
   i bruk först när du trycker på uppdateringsbannern, aldrig mitt i ett set.

   Du behöver därför inte höja CACHE vid varje deploy. Höj den bara när du
   vill tvinga fram en helt ren cache. */

const CACHE = "traningsveckan-v1";
const SHELL = [
  "./", "./index.html", "./app.js", "./manifest.webmanifest",
  "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (e) => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(req, { ignoreSearch: true });
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200) cache.put(req, res.clone());
          return res;
        })
        .catch(() => null);
      return cached || (await network) || cache.match("./index.html");
    })
  );
});

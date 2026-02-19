const CACHE_NAME = 'pwa-cache-v2';
const ASSETS = [
  'index.html',
  'manifest.json',
  'audio/CavalryCharge.wav',
  'audio/Buzzer.wav',
  'audio/ThreeBells.wav',
  'audio/Shift.wav',
  'audio/Sonar.wav',
  'audio/EndGame.wav'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});

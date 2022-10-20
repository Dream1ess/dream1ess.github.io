self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        './index.html',
        './style.css',
        './script.js',
        './android-chrome-192x192.png',
        './android-chrome-512x512.png',
        './apple-touch-icon.png',
        './favicon.ico',
        './favicon-16x16.png',
        './favicon-32x32.png',
        './site.webmanifest',
        './images/avatar.webp',
        './images/bg.webp',
        './images/bg-line.webp',
        './images/dashes.webp',
        './images/facebook.svg',
        './images/light.svg',
        './images/star.svg',
        './images/twitter.svg',
        './images/wright.svg'
      ]);
    })
  );
});
self.addEventListener('activate', (event) => {
    console.log('activate');
});
self.addEventListener('fetch', function(event) {
   event.respondWith(async function() {
      try{
        let res = await fetch(event.request);
        let cache = await caches.open('cache');
        await cache.put(event.request.url, res.clone());
        return res;
      }
      catch(error){
        return caches.match(event.request);
       }
     }());
 });
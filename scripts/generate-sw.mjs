import { glob } from 'glob';
import fs from 'fs';

const files = await glob('dist/**/*.*');
const assets = files.map(f => '/' + f.replace(/^dist[\\/]/, '').replace(/\\/g, '/'));

const serviceWorker = `
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll(${JSON.stringify(assets, null, 2)});
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
`;

fs.writeFileSync('dist/service-worker.js', serviceWorker);
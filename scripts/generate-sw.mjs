import { glob } from 'glob';
import fs from 'fs';

const files = await glob('dist/**/*.*');
const assets = files.map(f => '/mathbook/' + f.replace(/^dist[\\/]/, '').replace(/\\/g, '/'));

const serviceWorker = `
const assets = ${JSON.stringify(assets, null, 2)};

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(async cache => {
      for (const asset of assets) {
        try {
          await cache.add(asset);
        } catch (e) {
          console.error('❌ Failed to cache:', asset, e);
        }
      }
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
import { glob } from 'glob';
import fs from 'fs';

const base = '/mathbook/';
const files = await glob('dist/**/*.*');
const assets = files.map(f => base + f.replace(/^dist[\\/]/, '').replace(/\\/g, '/'));
assets.push(base);

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
      if (response) return response;
      return fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/mathbook/index.html');
        }
      });
    })
  );
});
`;

fs.writeFileSync('dist/service-worker.js', serviceWorker);
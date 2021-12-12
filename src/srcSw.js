import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

clientsClaim();
self.skipWaiting();

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ url }) => url.origin === 'https://api.openweathermap.org' && url.pathname.startsWith('/data/2.5'),
  new StaleWhileRevalidate({
    cacheName: 'weather-api-response',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 30
      }),
    ]
  })
);

registerRoute(
  ({ url }) => url.origin === 'http://openweathermap.org' && url.pathname.startsWith('/img/w'),
  new StaleWhileRevalidate({
    cacheName: 'weather-icons',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
      }),
    ]
  })
);

import { clientsClaim } from 'workbox-core';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkOnly } from 'workbox-strategies';

clientsClaim();
self.skipWaiting();

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ url }) => url.origin === 'https://api.openweathermap.org' && url.pathname.startsWith('/data/2.5/weather'),
  new StaleWhileRevalidate({
    cacheName: 'weather-api-response',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24
      }),
    ]
  })
);

registerRoute(
  ({ url }) => url.origin === 'https://openweathermap.org' && url.pathname.startsWith('/img/w'),
  new StaleWhileRevalidate({
    cacheName: 'weather-icons',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
      }),
    ]
  })
);

const bgSyncPlugin = new BackgroundSyncPlugin('forecastingSync', {
  maxRetentionTime: 24 * 60,
  onSync: async ({ queue }) => {
    let entry;
    while ((entry = await queue.shiftRequest())) {
      try {
        await fetch(entry.request);
        self.registration.showNotification('Weather Forecasting', {
          body: 'You are back online and your weather forecasting is available',
          icon: 'assets/icon-72.png',
        });
        console.log('back online');
      } catch (error) {
        await this.unshiftRequest(entry);
        throw error;
      }
    }
  },
});

registerRoute(
  ({ url }) => url.origin === 'https://api.openweathermap.org' && url.pathname.startsWith('/data/2.5/onecall'),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'GET'
);

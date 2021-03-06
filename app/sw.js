/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js');

workbox.skipWaiting();
workbox.clientsClaim();

workbox.precaching.precacheAndRoute(['index-off.html','/images/kf4-logo-vtr-2.png', '/images/mapa-off.png', '/images/phone-512.png', '/images/logo-vtr-footer-min.png', '/styles/main.css', '/styles/vendor.css', '/scripts/modernizr.js', '/scripts/vendor.js', '/fonts/NeoSansStd Regular.ttf', '/fonts/neo_sans_bold.ttf']);

workbox.routing.registerRoute(/images\/products\/(.*)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'vtr-store-images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10,
        maxAgeSeconds: 7 * 24 * 60 * 60 // one week
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'vtr-store-fonts',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60 // one week
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp ('https://code.getmdl.io/(.*)'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'vtr-store-mdl',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60 // one week
      })
    ]
  })
);

// workbox.routing.registerRoute(
//   new RegExp ('https?.*'),
//   workbox.strategies.networkFirst()
// );

const htmlHandler = workbox.strategies.networkOnly();

// A NavigationRoute matches navigation requests in the browser, i.e. requests for HTML.

const navigationRoute = new workbox.routing.NavigationRoute(({ event }) => {

 return htmlHandler.handle({ event }).catch(() => caches.match('index-off.html'));

});

workbox.routing.registerRoute(navigationRoute);
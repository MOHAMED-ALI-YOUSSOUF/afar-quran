const CACHE_NAME = 'tafsir-v1'
const AUDIO_CACHE = 'tafsir-audio-v1'

self.addEventListener('install', (e) => {
  self.skipWaiting()
})

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url)

  // Cache les audios Sanity
  if (url.hostname === 'cdn.sanity.io' && url.pathname.includes('/files/')) {
    e.respondWith(
      caches.open(AUDIO_CACHE).then((cache) => {
        return cache.match(e.request).then((response) => {
          if (response) return response
          return fetch(e.request).then((networkResponse) => {
            cache.put(e.request, networkResponse.clone())
            return networkResponse
          })
        })
      })
    )
  } else {
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request))
    )
  }
})
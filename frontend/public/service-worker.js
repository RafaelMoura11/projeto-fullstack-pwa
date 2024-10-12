/* eslint-disable no-restricted-globals */


const CACHE_NAME = "meu-cache-v1";
const urlsToCache = ["/", "/index.html", "/static/js/bundle.js"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache aberto");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  // Interceptar requisições de rede
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna a resposta do cache se disponível
      return response || fetch(event.request).then((networkResponse) => {
        // Armazena a resposta no cache se a requisição for bem-sucedida
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    }).catch(() => {
      // Caso haja um erro de rede, você pode retornar uma resposta padrão ou um offline page
      console.error("Erro ao buscar recurso:", event.request.url);
      return new Response("Você está offline e não pode acessar este recurso.");
    })
  );
});

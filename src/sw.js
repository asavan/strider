/* eslint-env serviceworker */


const version = __SERVICE_WORKER_VERSION__;
const CACHE = "cache-only-" + version;

function delayReject(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return reject(new Error("timeout"));
        }, time);
    });
}

self.addEventListener("install", (evt) => {
    evt.waitUntil(precache());
});

const deleteCache = async (key) => {
    await caches.delete(key);
};

const deleteOldCaches = async () => {
    const cacheKeepList = [CACHE];
    const keyList = await caches.keys();
    const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
    await Promise.all(cachesToDelete.map(deleteCache));
};

const deleteAndClaim = async () => {
    await deleteOldCaches();
    await self.clients.claim();
};

self.addEventListener("activate", (event) => {
    event.waitUntil(deleteAndClaim());
});

self.addEventListener("fetch", (evt) => {
    evt.respondWith(networkOrCache(evt.request, 500));
});

function networkOrCache(request, timeout) {
    const prom = [fetch(request), delayReject(timeout)];
    return Promise.race(prom).then((response) => {
        if (response.ok) {
            return response;
        }
        return fromCache(request);
    })
        .catch(() => fromCache(request));
}

async function fromCache(request) {
    const cache = await caches.open(CACHE);
    const matching = await cache.match(request, { ignoreSearch: true });
    if (matching) {
        return matching;
    }
    throw new Error("request-not-in-cache");
}

const filesToCache = self.__WB_MANIFEST.map((e) => e.url);
async function precache() {
    const cache = await caches.open(CACHE);
    return await cache.addAll([
        "./",
        ...filesToCache
    ]);
}

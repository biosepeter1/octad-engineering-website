const NodeCache = require('node-cache');

// In-memory cache with 5-minute TTL and 60-second check period
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

/**
 * Cache middleware factory.
 * Caches GET responses keyed by prefix + original URL (includes query params).
 * @param {string} keyPrefix - Prefix to namespace cache keys (e.g. 'services', 'projects')
 */
const cacheMiddleware = (keyPrefix) => {
    return (req, res, next) => {
        // Only cache GET requests
        if (req.method !== 'GET') {
            return next();
        }

        const key = `${keyPrefix}:${req.originalUrl}`;
        const cached = cache.get(key);

        if (cached) {
            return res.status(200).json(cached);
        }

        // Override res.json to capture and cache the response
        const originalJson = res.json.bind(res);
        res.json = (body) => {
            // Only cache successful responses
            if (res.statusCode >= 200 && res.statusCode < 300) {
                cache.set(key, body);
            }
            return originalJson(body);
        };

        next();
    };
};

/**
 * Clear all cache entries matching a given prefix.
 * Call this after create/update/delete operations.
 * @param {string} keyPrefix - The prefix to match (e.g. 'services')
 */
const clearCache = (keyPrefix) => {
    const keys = cache.keys();
    const matchingKeys = keys.filter(k => k.startsWith(`${keyPrefix}:`));
    if (matchingKeys.length > 0) {
        cache.del(matchingKeys);
    }
};

module.exports = { cache, cacheMiddleware, clearCache };

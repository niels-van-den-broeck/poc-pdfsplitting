const config = {
    mongo: {
        poolSize: process.env.MONGO_POOLSIZE,
        uri: process.env.MONGO_URI,
    },
    runtime: {
        env: process.env.RUNTIME_ENV || 'local',
        logLevel: process.env.LOG_LEVEL,
        port: process.env.PORT || 3000,
        behindProxy: process.env.BEHIND_PROXY,
        forceHttps: process.env.FORCE_HTTPS,
    },
};

module.exports = config;
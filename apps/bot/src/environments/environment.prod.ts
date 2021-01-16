export const environment = {
    production: true,
    token: process.env.BOT_TOKEN,
    id: 'STRAY_DOG',
    redis: {
        host: process.env.REDIS_HOST,
    },
};

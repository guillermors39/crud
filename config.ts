import Redis from 'redis';

const redisClient = Redis.createClient();

redisClient.on('error', error => {
  console.error(error);
});
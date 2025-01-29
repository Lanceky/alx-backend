import { createClient, print } from 'redis';

// Create a Redis client
const client = createClient();

// Listen for the 'connect' event
client.on('connect', () => {
    console.log('Redis client connected to the server');
});

// Listen for the 'error' event
client.on('error', (err) => {
    console.error(`Redis client not connected to the server: ${err.message}`);
});

// Create a hash in Redis
const key = 'ALX';
client.hset(key, 'Portland', 50, print);
client.hset(key, 'Seattle', 80, print);
client.hset(key, 'New York', 20, print);
client.hset(key, 'Bogota', 20, print);
client.hset(key, 'Cali', 40, print);
client.hset(key, 'Paris', 2, print);

// Retrieve and display the hash
client.hgetall(key, (err, obj) => {
    if (err) {
        console.error(`Error fetching hash: ${err.message}`);
    } else {
        console.log(obj);
    }
});

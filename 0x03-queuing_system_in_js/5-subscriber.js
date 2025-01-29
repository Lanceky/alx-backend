import { createClient } from 'redis';

// Create a Redis client
const subscriber = createClient();

// Listen for the 'connect' event
subscriber.on('connect', () => {
    console.log('Redis client connected to the server');
});

// Listen for the 'error' event
subscriber.on('error', (err) => {
    console.error(`Redis client not connected to the server: ${err.message}`);
});

// Subscribe to the channel
subscriber.subscribe('ALXchannel');

// Handle incoming messages
subscriber.on('message', (channel, message) => {
    console.log(message);
    if (message === 'KILL_SERVER') {
        subscriber.unsubscribe(channel);
        subscriber.quit();
    }
});

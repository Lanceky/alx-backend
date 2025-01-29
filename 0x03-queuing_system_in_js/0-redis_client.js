import {createClient} from 'redis';

//Create a Redis client
const client = createClient();

//listen for connections
client.on('connect', ()=>{
    console.log('Redis client connected to the server');
});

//listen for error event
client.on('error', (err)=>{
    console.log(`Redis client not connected to the server: ${err.message}`)
});
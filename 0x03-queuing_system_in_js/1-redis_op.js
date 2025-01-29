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
//fn to set a new key-value pair in redis
function setNewSchool(schoolName, value) {
    client.set(schoolName, value, print); // Use redis.print for confirmation
}

// Function to get and display the value of a key
function displaySchoolValue(schoolName) {
    client.get(schoolName, (err, reply) => {
        if (err) {
            console.error(`Error retrieving value for ${schoolName}: ${err.message}`);
        } else {
            console.log(reply);
        }
    });
}
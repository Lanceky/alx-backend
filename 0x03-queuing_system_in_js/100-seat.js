import express from 'express';
import kue from 'kue';
import redis from 'redis';
import { promisify } from 'util';

// Initialize Redis client
const client = redis.createClient();
const reserveSeatAsync = promisify(client.set).bind(client);
const getAvailableSeatsAsync = promisify(client.get).bind(client);

// Create a Kue queue
const queue = kue.createQueue();

// Set initial number of available seats
let reservationEnabled = true;
const initialSeats = 50;

// Reserve a seat (store it in Redis)
async function reserveSeat(number) {
  await reserveSeatAsync('available_seats', number);
}

// Get current available seats
async function getCurrentAvailableSeats() {
  const seats = await getAvailableSeatsAsync('available_seats');
  return parseInt(seats, 10);
}

// Create an Express app
const app = express();

// Route: Get the number of available seats
app.get('/available_seats', async (req, res) => {
  const availableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: availableSeats });
});

// Route: Reserve a seat
app.get('/reserve_seat', async (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservation are blocked' });
  }

  const job = queue.create('reserve_seat', {})
    .save((err) => {
      if (err) {
        return res.json({ status: 'Reservation failed' });
      }
      res.json({ status: 'Reservation in process' });
    });

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  job.on('failed', (errorMessage) => {
    console.log(`Seat reservation job ${job.id} failed: ${errorMessage}`);
  });
});

// Route: Process the queue
app.get('/process', async (req, res) => {
  res.json({ status: 'Queue processing' });

  const availableSeats = await getCurrentAvailableSeats();
  if (availableSeats > 0) {
    const job = await queue.process('reserve_seat', async (job, done) => {
      const remainingSeats = await getCurrentAvailableSeats();
      if (remainingSeats <= 0) {
        reservationEnabled = false;
        done(new Error('Not enough seats available'));
        return;
      }

      await reserveSeat(remainingSeats - 1);
      done();
    });
  } else {
    reservationEnabled = false;
  }
});

// Initialize available seats to 50 when the server starts
reserveSeat(initialSeats);

// Start the Express server
app.listen(1245, () => {
  console.log('Server started on port 1245');
});


import kue from 'kue';

// Create a queue with Kue
const queue = kue.createQueue();

// Array of blacklisted phone numbers
const blacklistedNumbers = [
  '4153518780',
  '4153518781'
];

// Define the sendNotification function
function sendNotification(phoneNumber, message, job, done) {
  // Track job progress
  job.progress(0, 100); // Start at 0%

  // Check if the phone number is blacklisted
  if (blacklistedNumbers.includes(phoneNumber)) {
    const error = new Error(`Phone number ${phoneNumber} is blacklisted`);
    job.failed(error);
    console.log(`Notification job #${job.id} failed: ${error.message}`);
    return done(error);
  }

  // Track progress to 50%
  job.progress(50, 100); // 50% complete
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Simulate the notification sending process
  setTimeout(() => {
    console.log(`Notification job #${job.id} completed`);
    done(); // Mark the job as completed
  }, 1000); // Delay to simulate the process (1 second)
}

// Process jobs in the queue (two at a time)
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});

// Handle job completion
queue.on('job complete', (id) => {
  console.log(`Job #${id} completed!`);
});

// Handle job failure
queue.on('job failed', (id, err) => {
  console.error(`Job #${id} failed: ${err.message}`);
});

import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

// Define the function to send the notification
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process jobs in the queue
queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message);
  done(); // Mark the job as complete
});

// Handle job completion
queue.on('job complete', (id, result) => {
  console.log(`Job ${id} completed!`);
});

// Handle job failure
queue.on('job failed', (id, err) => {
  console.error(`Job ${id} failed: ${err}`);
});

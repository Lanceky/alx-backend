import kue from 'kue';

// Create the createPushNotificationsJobs function
function createPushNotificationsJobs(jobs, queue) {
  // Check if the jobs argument is an array
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  // Iterate over each job in the jobs array
  jobs.forEach((jobData) => {
    // Create a job for each job data in the array
    const job = queue.create('push_notification_code_3', jobData)
      .save((err) => {
        if (err) {
          console.error('Error creating job:', err);
        } else {
          console.log(`Notification job created: ${job.id}`);
        }
      });

    // Job completion event
    job.on('complete', () => {
      console.log(`Notification job ${job.id} completed`);
    });

    // Job failure event
    job.on('failed', (err) => {
      console.log(`Notification job ${job.id} failed: ${err.message}`);
    });

    // Job progress event
    job.on('progress', (percentage) => {
      console.log(`Notification job ${job.id} ${percentage}% complete`);
    });
  });
}

export default createPushNotificationsJobs;

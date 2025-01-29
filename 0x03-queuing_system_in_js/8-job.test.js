import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
  let queue;

  // Before running tests, set up the queue and enable test mode
  before(() => {
    queue = kue.createQueue();
    queue.testMode = true;  // Ensure jobs are not processed during the tests
  });

  // After tests, clear the queue and exit test mode
  after(() => {
    queue.testMode = false;  // Disable test mode
    queue.clear();  // Clear the queue
  });

  it('should display an error message if jobs is not an array', () => {
    const invalidJobs = 'Invalid Jobs';
    expect(() => createPushNotificationsJobs(invalidJobs, queue))
      .to.throw('Jobs is not an array');
  });

  it('should create two new jobs in the queue', (done) => {
    const jobs = [
      { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
      { phoneNumber: '4153518781', message: 'This is the code 4562 to verify your account' }
    ];

    // Call the function to add jobs to the queue
    createPushNotificationsJobs(jobs, queue);

    // Use a setTimeout to give Kue time to process the jobs
    setTimeout(() => {
      const jobIds = queue.testMode.jobs.map(job => job.id);
      
      // Check if two jobs have been added to the queue
      expect(jobIds.length).to.equal(2);
      expect(jobIds[0]).to.exist;
      expect(jobIds[1]).to.exist;

      // Validate the job data
      const jobData1 = queue.testMode.jobs.find(job => job.id === jobIds[0]).data;
      expect(jobData1.phoneNumber).to.equal('4153518780');
      expect(jobData1.message).to.equal('This is the code 1234 to verify your account');
      
      const jobData2 = queue.testMode.jobs.find(job => job.id === jobIds[1]).data;
      expect(jobData2.phoneNumber).to.equal('4153518781');
      expect(jobData2.message).to.equal('This is the code 4562 to verify your account');
      
      done();
    }, 100);  // 100ms to allow jobs to be added to the queue
  });
});

# Redis Installation and Configuration Guide

## Step 0: Install Redis

### Prerequisites:

Ensure you have `wget`, `tar`, and `make` installed on your system. Use your package manager to install them:

#### On Ubuntu/Debian:
```bash
sudo apt update
sudo apt install build-essential wget tar
```

#### On CentOS/RHEL:
```bash
sudo yum groupinstall "Development Tools"
sudo yum install wget tar
```

### Download, Extract, and Compile Redis:

1. **Download Redis source code:**
   ```bash
   wget http://download.redis.io/releases/redis-6.0.10.tar.gz
   ```
   This command downloads the Redis tarball (compressed source code).

2. **Extract the tarball:**
   ```bash
   tar xzf redis-6.0.10.tar.gz
   ```
   This creates a new directory named `redis-6.0.10` containing the source code.

3. **Navigate to the Redis source directory:**
   ```bash
   cd redis-6.0.10
   ```

4. **Compile Redis:**
   ```bash
   make
   ```
   This builds the Redis server and CLI binaries (`src/redis-server` and `src/redis-cli`) using the GNU `make` utility.

---

## Step 1: Start Redis in the Background

1. **Start the Redis server in the background:**
   ```bash
   src/redis-server &
   ```
   The `&` symbol runs the command in the background, allowing you to continue using the terminal.

2. **Verify the server is running:**
   ```bash
   ps aux | grep redis-server
   ```
   Look for the `redis-server` process in the output.

---

## Step 2: Verify the Server Works

1. **Test connectivity to the server using the Redis CLI:**
   ```bash
   src/redis-cli ping
   ```
   **Expected output:**
   ```
   PONG
   ```
   This confirms the Redis server is running and responding.

2. **Set and get a key-value pair:**

   - **Set the key `ALX` with the value `School`:**
     ```bash
     src/redis-cli set ALX School
     ```
     **Expected output:**
     ```
     OK
     ```

   - **Retrieve the value for `ALX`:**
     ```bash
     src/redis-cli get ALX
     ```
     **Expected output:**
     ```
     "School"
     ```

---

## Step 3: Stop the Redis Server

1. **Identify the process ID (PID) of the Redis server:**
   ```bash
   ps aux | grep redis-server
   ```
   Example output:
   ```
   user     12345  0.0  0.1  123456  4567 ?  Ssl  12:34   0:00 src/redis-server *:6379
   ```
   Note the PID (e.g., `12345`).

2. **Kill the Redis server process:**
   ```bash
   kill [PID_OF_Redis_Server]
   ```
   Replace `[PID_OF_Redis_Server]` with the actual PID, e.g.:
   ```bash
   kill 12345
   ```

3. **Verify that the server has stopped:**
   ```bash
   ps aux | grep redis-server
   ```
   No `redis-server` processes should appear.

---

## Step 4: Copy the dump.rdb File

1. **Locate the `dump.rdb` file:**
   - The `dump.rdb` file is the default snapshot file Redis generates to persist data.
   - It is created in the directory where the Redis server was started.

2. **Copy the `dump.rdb` file to the root of your queuing project:**
   ```bash
   cp dump.rdb /path/to/alx-backend/0x03-queuing_system_in_js/
   ```
   Replace `/path/to/alx-backend/0x03-queuing_system_in_js/` with the actual path to your project directory.

---

## Step 5: Verify the dump.rdb File Works

1. **Start the Redis server again:**
   ```bash
   src/redis-server &
   ```

2. **Check that the key `ALX` still has the value `School`:**
   ```bash
   src/redis-cli get ALX
   ```
   **Expected output:**
   ```
   "School"
   ```

---

## Step 6: Prepare the Repository

1. **Create or update the `README.md` in the `alx-backend/0x03-queuing_system_in_js` directory:**
   - Document the steps you followed, commands executed, and their purposes.

---

This guide ensures that Redis is correctly installed, tested, and integrated into your project. Follow each step carefully, and feel free to ask for help if needed!

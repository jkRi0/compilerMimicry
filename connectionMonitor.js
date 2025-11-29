console.log('Connection Monitor loaded');

// Function to update connection status
function updateConnectionStatus(isOnline) {
  const statusElement = document.getElementById('connection-status');
  
  if (statusElement) {
    statusElement.textContent = `${isOnline ? '🟢 Online' : '🔴 Offline'}`;
    statusElement.className = `connection-status ${isOnline ? 'online' : 'offline'}`;
    statusElement.style.display = 'block';
  }
  console.log(`Connection status: ${isOnline ? 'online' : 'offline'}`);
}

// Function to check internet connection
function checkInternetConnection() {
  // Try multiple reliable endpoints
  const endpoints = [
    'https://api.github.com/status',
    'https://www.cloudflare.com/cdn-cgi/trace',
    'https://www.google.com/favicon.ico'
  ];

  // Try each endpoint until one succeeds
  const checkEndpoint = async (url) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch(url, {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return true; // If fetch succeeds, we're online
    } catch (error) {
      console.log(`Failed to check ${url}:`, error.message);
      return false;
    }
  };

  // Try all endpoints
  Promise.any(endpoints.map(checkEndpoint))
    .then((result) => {
      updateConnectionStatus(result);
    })
    .catch(() => {
      updateConnectionStatus(false);
    });
}

// Create a real-time connection monitor
function createConnectionMonitor() {
  console.log('Starting connection monitor...');
  
  // Initial check
  checkInternetConnection();
  
  // Check every 10 seconds
  const intervalId = setInterval(checkInternetConnection, 10000);
  
  // Also keep the event listeners for immediate feedback
  window.addEventListener('online', () => {
    console.log('Browser reports online');
    updateConnectionStatus(true);
  });

  window.addEventListener('offline', () => {
    console.log('Browser reports offline');
    updateConnectionStatus(false);
  });

  // Clean up interval when page becomes hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(intervalId);
    }
  });
}

// Start monitoring when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createConnectionMonitor);
} else {
  createConnectionMonitor();
}


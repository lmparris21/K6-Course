// Import required k6 modules
import http from 'k6/http';
import { sleep } from 'k6';

// Test configuration options
export const options = {
    vus: 1,         // Number of virtual users (concurrent users)
    duration: '30s' // Total test duration
}

// Main test function - executed for each virtual user
export default function () {
    // Visit the homepage
    http.get('https://quickpizza.grafana.com/test.k6.io/');
    sleep(1); // Wait for 1 second
    // Visit the contacts page
    http.get('https://quickpizza.grafana.com/contacts.php');
    sleep(2); // Wait for 2 seconds
    // Visit the news page
    http.get('https://quickpizza.grafana.com/news.php');
    sleep(2); // Wait for 2 seconds
}

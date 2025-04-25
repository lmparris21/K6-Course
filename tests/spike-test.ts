/* Import required k6 libraries */
import http from 'k6/http';
import { sleep } from 'k6';

/* Test configuration:
 * Spike Test Pattern:
 * - Rapidly ramp up to 1000 virtual users over 2 minutes
 * - Immediately ramp down to 0 users over 1 minute
 * 
 * Purpose: This test simulates a sudden surge in traffic to evaluate 
 * system behavior under extreme load conditions
 */
export const options = {
    stages: [
        { duration: '2m', target: 1000 },
        { duration: '1m', target: 0 }
    ]
}

/* Main test function that simulates user behavior:
 * This script emulates a typical user journey through the website:
 * 1. Visit the homepage (1 second pause)
 * 2. Navigate to contacts page (2 second pause)
 * 3. Navigate to news page (2 second pause)
 * 
 * Note: Sleep times simulate realistic user behavior and prevent overwhelming the system
 */
export default function () {
    /* Visit homepage */
    http.get('https://test.k6.io');
    sleep(1);
    /* Visit contacts page */
    http.get('https://test.k6.io/contacts.php');
    sleep(2);
    /* Visit news page */
    http.get('https://test.k6.io/news.php');
    sleep(2);
}

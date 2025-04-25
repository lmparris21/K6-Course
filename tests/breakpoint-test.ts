/* Import required k6 libraries */
import http from 'k6/http';
import { sleep } from 'k6';

/* Test configuration:
 * Breakpoint Test Pattern:
 * - Ramps up to 10,000 virtual users over a 2-hour period
 * 
 * Purpose: This test evaluates system performance and stability
 * under a gradual increase to very high load over an extended period
 */
export const options = {
    stages: [
        { duration: '2h', target: 10000 }
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

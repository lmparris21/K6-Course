/* Import required k6 libraries */
import http from 'k6/http';
import { sleep } from 'k6';

/* Test configuration:
 * - Ramp up to 100 users over 10 seconds
 * - Stay at 100 users for 30 seconds
 * - Ramp down to 0 users over 10 seconds
 */
export const options = {
    stages: [
        { duration: '10s', target: 100 },
        { duration: '30s', target: 100 },
        { duration: '10s', target: 0 }
    ]
}

/* Main test function that simulates user behavior:
 * 1. Visit the homepage
 * 2. Navigate to contacts page
 * 3. Navigate to news page
 * with realistic delays between actions
 */
export default function () {
    /* Visit homepage */
    http.get('https://quickpizza.grafana.com/test.k6.io/');
    sleep(1);
    /* Visit contacts page */
    http.get('https://quickpizza.grafana.com/contacts.php');
    sleep(2);
    /* Visit news page */
    http.get('https://quickpizza.grafana.com/news.php');
    sleep(2);
}

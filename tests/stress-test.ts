/* Import required k6 libraries */
import http from 'k6/http';
import { sleep } from 'k6';

/* Test configuration details:
 * This stress test simulates a gradual increase in user load to test system performance
 * 
 * Stage breakdown:
 * 1. Ramp-up phase: 0 to 500 virtual users (VUs) over 10 seconds
 * 2. Steady state: Maintain 500 VUs for 30 seconds to stress test the system
 * 3. Ramp-down phase: Decrease from 500 to 0 VUs over 10 seconds
 * 
 * Total test duration: 50 seconds
 */
export const options = {
    stages: [
        { duration: '10s', target: 500 },
        { duration: '30s', target: 500 },
        { duration: '10s', target: 0 }
    ]
}

/* Main test function that simulates realistic user behavior
 * 
 * User journey:
 * 1. Visit the homepage (1 second pause)
 * 2. Navigate to contacts page (2 second pause)
 * 3. Navigate to news page (2 second pause)
 * 
 * Total journey time per user: ~5 seconds
 * Target website: test.k6.io
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

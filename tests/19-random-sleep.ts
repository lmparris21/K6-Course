/* Import required libraries */
import http from 'k6/http';
import { sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

/* Test configuration */
export const options = {
    vus: 5, /* Number of virtual users */
    duration: '20s' /* Test duration */
}

/* Main test function */
export default function () {
    /* Send HTTP GET request */
    http.get('https://quickpizza.grafana.com/test.k6.io/');

    console.log('- VU stage -');
    /* 
     * Random sleep implementation
     * - Uses randomIntBetween() to generate a random integer between min and max values (inclusive)
     * - Adds variability to simulate real user behavior (users don't act at precise intervals)
     * - Helps prevent "thundering herd" problems where all VUs hit the system simultaneously
     * - Reduces artificial patterns in the test that could skew results
     */
    sleep(randomIntBetween(1, 5));
}
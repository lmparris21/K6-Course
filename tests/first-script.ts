/* Import required k6 libraries */
import http from 'k6/http';
import { sleep } from 'k6';

/* Test configuration options */
export const options = {
    vus: 10,        /* Number of virtual users (concurrent users) */
    duration: '10s' /* Total test duration */
}

/* Main test function - executed for each virtual user */
export default function () {
    /* Send GET request to the test endpoint */
    http.get('https://test.k6.io');
    /* Wait for 1 second before next iteration */
    sleep(1);
}

/* Import k6 HTTP module for making HTTP requests */
import http from 'k6/http';
/* Import check module for assertions */
import { check } from 'k6';
/* Import sleep module for delaying requests */
import { sleep } from 'k6';
/* Import exec module for getting test execution details */
import exec from 'k6/execution';

/* Define test options with thresholds */   
export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(95)<150', 'max<2000'], /* 95th percentile of HTTP request duration should be less than 150ms and max should be less than 2s */
        http_req_failed: ['rate<0.1'], /* Request failure rate should be less than 10% */
        http_reqs: ['count>20', 'rate>4'], /* Total requests should be >20 and rate >4/s */
        vus: ['value>9'], /* Total virtual users should be >9 */
        checks: ['rate>0.98'], /* Check rate should be >98% */
    }
}

/* Main test scenario function that k6 will execute */
export default function () {
    /* Send GET request to test endpoint */
    const res = http.get('https://test.k6.io' + (exec.scenario.iterationInTest === 1 ? 'foo' : '')); /* Send different endpoint for one iteration to throw error */
    /* Basic check format to demonstrate check functionality */
    check(true, {
        'true is true': (value) => value === true,
    });
    /* Verify that the HTTP response status code is 200 (OK) and the body contains expected text */
    check(res, {
        'status is 200': (r) => r.status === 200,
        'body contains expected text': (r) => r.body ? r.body.toString().includes('Collection of simple web-pages') : false
    });
    /* Delay for 2 seconds */
    sleep(2);
}
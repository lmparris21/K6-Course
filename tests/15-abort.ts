/**
 * Abort Test Example
 * 
 * This test demonstrates how to abort a k6 test execution when certain conditions are met.
 * It includes:
 * - Pre-test validation in setup() to check if the application is available
 * - Automatic test abortion if the application is down
 * - Basic load test configuration with 10 VUs running for 60 seconds
 */

import http from 'k6/http';
import { sleep } from 'k6';
import exec from 'k6/execution';

/**
 * Test configuration:
 * - 10 virtual users (VUs)
 * - Test duration of 60 seconds
 */
export const options = {
    vus: 10,
    duration: '60s'
}

/**
 * Setup function runs before the main test.
 * Performs a health check to ensure the application is running.
 * If the application is not responding, the test will be aborted.
 */
export function setup() {
    let res = http.get('https://test.k6.local/status');
    if (res.error) {
        exec.test.abort('Aborting test. Application is DOWN!!!');
    }
}

/**
 * Default function - the main test scenario.
 * Makes a GET request to a page and includes a 1-second pause between iterations.
 * @param {object} data - Data passed from the setup function (unused in this test)
 */
export default function (data) {
    http.get('https://test.k6.local/some-page');

    sleep(1);
}
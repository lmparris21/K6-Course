/**
 * k6 Test Lifecycle Example
 * This file demonstrates the four main stages of k6's execution lifecycle
 */

import http from 'k6/http';
import { sleep } from 'k6';

/**
 * Init Stage
 * - Runs once when the test starts
 * - Used for importing modules, declaring options
 * - Code outside of functions runs here
 * - Cannot make HTTP requests or use k6 APIs
 */
export const options = {
    vus: 1,
    duration: '5s'
}

console.log(' -- init stage --');

/**
 * VU (Virtual User) Stage
 * - Main test logic goes here in default function
 * - Runs repeatedly based on test configuration
 * - Each VU runs this function in isolation
 * - Gets data from setup stage as parameter
 */
export default function (data) {
    console.log('-- VU stage --');
    // console.log(data);
    sleep(1);
}

/**
 * Setup Stage (Optional)
 * - Runs once before VU stages
 * - Used for test setup like data preparation
 * - Can make HTTP requests and use k6 APIs
 * - Returns data to be used in VU stage
 */
export function setup() {
    console.log('-- setup stage --');
    sleep(10);
    const data = { foo: 'bar' };
    return data;
}

/**
 * Teardown Stage (Optional)
 * - Runs once after all VU iterations complete
 * - Used for cleanup operations
 * - Gets data from setup stage as parameter
 */
export function teardown(data) {
    console.log('-- Teardown stage --');
}
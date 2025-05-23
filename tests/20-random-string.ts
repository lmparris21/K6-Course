/* 
 * This test demonstrates using the randomString utility to generate unique values
 * The randomString function creates a random string of specified length
 * It's useful for creating unique usernames, passwords, and other test data
 * Format: randomString(length) - returns a random alphanumeric string
 */
import http from 'k6/http';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

/* Test configuration options */
export const options = {
    vus: 5,
    duration: '5s'
};

/* Main test function executed by each virtual user */
export default function () {

    /* Generate random credentials for user registration */
    const credentials = {
        username: 'test_' + randomString(10),
        password: 'secret_' + randomString(10)
    };

    /* Log the generated credentials to console */
    console.log(credentials);

    /* Send POST request to register a new user with the random credentials */
    http.post('https://quickpizza.grafana.com/test.k6.io/user/register', JSON.stringify(credentials), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
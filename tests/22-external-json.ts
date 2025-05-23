import http from 'k6/http';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check } from 'k6';
import { SharedArray } from 'k6/data';

/* 
 * WORKING WITH EXTERNAL JSON FILES IN K6
 * 
 * This script demonstrates how to load test data from an external JSON file.
 * Benefits of external data files:
 * - Separation of test logic and test data
 * - Easier maintenance of large datasets
 * - Ability to reuse the same data across multiple tests
 * - Can be generated or updated independently from test code
 */

/* 
 * SharedArray is a special k6 data structure that loads the data only once
 * and shares it between all VUs (Virtual Users), which saves memory.
 * The first argument is the name (for debugging), the second is a function
 * that returns the parsed data.
 */
const userCredentials = new SharedArray('userCredentials', function() {
    // The open() function reads a file from disk
    // JSON.parse converts the file content from string to a JavaScript object
    return JSON.parse(open('../user-data/users.json')).users;
});

/* Main test function executed by each virtual user */
export default function () {
    /* 
     * Using randomItem to select a random credential from our data set
     * This helps distribute the test load across different user accounts
     * and creates more realistic testing scenarios
     */
    const randomCredentials = randomItem(userCredentials);

    let res = http.post('http://localhost:8000/auth/token/login/', 
        JSON.stringify(
            {
                /* 
                 * Using type assertion (as any) to avoid TypeScript errors
                 * when accessing properties from dynamically loaded data
                 */
                username: (randomCredentials as any).username,
                password: (randomCredentials as any).password
            }
        ), 
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    /* 
     * Validating the response with appropriate assertions
     * Using (as any) type assertion to handle dynamic JSON responses
     */
    check(res, {
        'status was 200': (r) => r.status === 200,
        'has access token': (r) => (r.json() as any).access !== undefined
    });
}
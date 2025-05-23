import { SharedArray } from 'k6/data';
import http from 'k6/http';
import { check } from 'k6';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
// @ts-ignore
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js'

/**
 * This test demonstrates how to work with external CSV data in k6:
 * 1. We use the SharedArray object to load the CSV only once and share it between VUs
 * 2. PapaParse is used to parse the CSV content with headers
 * 3. The data is then used for data-driven testing with randomized credential selection
 */

const userCredentials = new SharedArray('userCredentials', function() {
    /* 
     * SharedArray creates an array that is shared between all VUs (Virtual Users)
     * The data is loaded only once and then reused, which is more efficient
     * than each VU loading the data separately
     */
    return papaparse.parse(open('../user-data/users.csv'), { header: true }).data;
});

console.log(userCredentials);

export default function () {
    
    /* 
     * We randomly select a user from our CSV data for each iteration
     * This helps distribute the load across different test users
     */
    const randomCredentials = randomItem(userCredentials);

    let res = http.post('http://localhost:8000/auth/token/login/', 
        JSON.stringify(
            {
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

    check(res, {
        'status was 200': (r) => r.status === 200,
        'has access token': (r) => (r.json() as any).access !== undefined
    });
    
}
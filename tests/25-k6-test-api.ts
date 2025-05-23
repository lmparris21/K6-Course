import http from 'k6/http';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check, sleep } from 'k6';

/**
 * k6 Cloud Reporting Configuration
 * 
 * The cloud configuration enables automatic uploading of test results to k6 Cloud
 * for advanced analytics, real-time monitoring, and collaborative performance analysis.
 * 
 * Benefits of k6 Cloud Reporting:
 * - Real-time test execution monitoring with live dashboards
 * - Advanced performance metrics visualization (see: ../images/k6-cloud-dashboard-example.png)
 * - Historical trend analysis and performance comparisons
 * - Team collaboration features for sharing results
 * - Automated alerts and notifications for threshold violations
 * - Detailed breakdowns by request, user journey, and geographic location
 * 
 * The dashboard provides insights including:
 * - Performance overview with P95 response times and request rates
 * - HTTP failures tracking and error analysis  
 * - Peak RPS (Requests Per Second) monitoring
 * - Virtual User (VU) scaling visualization over time
 * - Response time trends and failure rate correlation
 * 
 * Example Dashboard: ../images/k6-cloud-dashboard-example.png
 * This shows real test results with 312 requests, 87ms P95 response time,
 * 5.67 peak RPS, and 0 failures over a 1m 20s test duration.
 * 
 * To use k6 Cloud reporting:
 * 1. Sign up for a k6 Cloud account at https://app.k6.io
 * 2. Create a project and note the projectID
 * 3. Authenticate using: k6 login cloud
 * 4. Run tests with: k6 run --out cloud script.js
 * 
 * Note: The projectID below links this test to a specific k6 Cloud project
 * where results will be stored and visualized.
 */
export const options = {
    stages: [
        {
            duration: '10s',
            target: 10
        },
        {
            duration: '60s',
            target: 10
        },
        {
            duration: '10s',
            target: 0
        }
    ],
    thresholds: {
        http_req_duration: ['p(90)<1250','p(95)<1300'],
        checks: ['rate>=0.99'],
    },
    /** 
     * k6 Cloud integration settings
     * projectID: Unique identifier for the k6 Cloud project where test results are sent
     * This enables real-time monitoring, historical analysis, and team collaboration
     * Results dashboard available at: https://app.k6.io/projects/{projectID}
     */
    cloud: {
        projectID: 3771596,
    }
}

export default function () {

    const credentials = {
        username: 'test_' + randomString(8),
        password: 'secret_' + randomString(8),
    }

    let res = http.post(
        'http://localhost:8000/user/register/',
        JSON.stringify(credentials),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    check(res, {
        'status is 201': (r) => r.status === 201,
        'username': (r) => r.json('username') === credentials.username
    });

    sleep(randomIntBetween(0, 5));

    res = http.post(
        'http://localhost:8000/auth/token/login/',
        JSON.stringify(
            {
                username: credentials.username,
                password: credentials.password
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    const accessToken = res.json('access');
    
    check(res, {
        'status is 200': (r) => r.status === 200,
        'has token': (r) => r.json('access') !== undefined
    });

    sleep(randomIntBetween(0, 5));

    res = http.get(
        'http://localhost:8000/my/crocodiles/',
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    );

    check(res, {
        'status is 200': (r) => r.status === 200,
        'has no crocodiles': (r) => {
            const crocodiles = r.json() as any[];
            return crocodiles.length === 0;
        }
    });

    sleep(randomIntBetween(0, 5));

    res = http.post(
        'http://localhost:8000/my/crocodiles/',
        JSON.stringify(
            {
                name: 'Random croc',
                sex: 'M',
                date_of_birth: '1900-10-28'
            }
        ),
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        }
    );
    const newCrocodileId = res.json('id');

    sleep(randomIntBetween(0, 5));

    res = http.get(
        `http://localhost:8000/my/crocodiles/${newCrocodileId}/`,
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    );

    check(res, {
        'status is 200': (r) => r.status === 200,
        'crocodile id': (r) => r.json('id') === newCrocodileId
    });

    sleep(randomIntBetween(0, 5));

    res = http.put(
        `http://localhost:8000/my/crocodiles/${newCrocodileId}/`,
        JSON.stringify(
            {
                name: 'Updated Random croc',
                sex: 'M',
                date_of_birth: '1900-10-28'
            }
        ),
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        }
    );

    check(res, {
        'status is 200': (r) => r.status === 200,
        'crocodile name': (r) => r.json('name') === 'Updated Random croc'
    });

    sleep(randomIntBetween(0, 5));

    res = http.patch(
        `http://localhost:8000/my/crocodiles/${newCrocodileId}/`,
        JSON.stringify(
            {
                sex: 'F'
            }
        ),
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        }
    );

    check(res, {
        'status is 200': (r) => r.status === 200,
        'crocodile sex': (r) => r.json('sex') === 'F'
    });

    sleep(randomIntBetween(0, 5));

    res = http.del(
        `http://localhost:8000/my/crocodiles/${newCrocodileId}/`,
        null,
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    );

    check(res, {
        'status is 204': (r) => r.status === 204
    });    

    sleep(randomIntBetween(0, 5));
}
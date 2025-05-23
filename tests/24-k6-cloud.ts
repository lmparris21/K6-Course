/* Import required k6 libraries */
import http from 'k6/http';
import { sleep } from 'k6';

/* Test configuration options */
export const options = {
    vus: 10,        /* Number of virtual users (concurrent users) */
    duration: '10s', /* Total test duration */
    cloud: {
        projectID: 3771594, /* Grafana Cloud project ID */
    }
}

/* 
 * K6 CLOUD INTEGRATION NOTES
 * 
 * To use k6 with Grafana Cloud:
 * 
 * 1. Create a Grafana Cloud account at https://grafana.com/products/cloud/
 * 
 * 2. Generate an API key:
 *    - Login to your Grafana Cloud account
 *    - Navigate to your user settings
 *    - Find the API Keys section and create a new key
 *    - Set appropriate permissions for k6 usage
 *
 * 3. Configure your API key locally:
 *    - Run: k6 cloud login --token <your-api-key>
 *    - Or set the K6_CLOUD_TOKEN environment variable (recommended)
 * 
 * 4. Running tests in Grafana Cloud:
 *    - To execute this test directly in the cloud:
 *      k6 cloud 24-k6-cloud.ts
 * 
 * 5. Running locally with cloud streaming output:
 *    - To run the test locally but send results to the cloud:
 *      k6 run 24-k6-cloud.ts -o cloud
 *      Click on the link in output to view the test results in the cloud dashboard
 * 
 *
 * The cloud dashboard provides advanced metrics, visualization,
 * and result sharing capabilities not available in local runs.
 */

/* Main test function - executed for each virtual user */
export default function () {
    /* Send GET request to the test endpoint */
    http.get('https://quickpizza.grafana.com/test.k6.io/');
    /* Wait for 1 second before next iteration */
    sleep(1);
}
/*
 k6 test script demonstrating group usage, checks, and group-specific thresholds
 To get the full summary report, run:
   k6 run groups.ts --summary-mode=full

 This script makes requests to quickpizza.grafana.com and groups them for better reporting.
 It sets different thresholds for different request groups:
 - Overall requests: 95% should complete below 500ms
 - Main page group: 95% should complete below 400ms
 - Static files group: 95% should complete below 300ms
*/
import http from 'k6/http';
import { sleep, check, group } from 'k6';

export const options = {
    thresholds: {
        /* Overall threshold: 95% of all requests should complete below 500ms */
        http_req_duration: ['p(95)<500'],
        /* Main page group threshold: 95% of requests should complete below 400ms */
        'group_duration{group:::Main page}': ['p(95)<9000'],
        /* Static files group threshold: 95% of requests should complete below 300ms */
        'group_duration{group:::Main page::Static files}': ['p(95)<3000'],
        /* News page group threshold: 95% of requests should complete below 500ms */
        'group_duration{group:::News page}': ['p(95)<6000']
    }
}

export default function () {

    /* Group for main page - tested against 400ms threshold */
    group('Main page', () => {
        let res = http.get('https://run.mocky.io/v3/5e465d36-0ea8-4e9f-ae20-fa267dbbaaaa?mocky-delay=5000ms');
        /* Check that the main page returns HTTP 200 */
        check(res, { 'status is 200': (r) => r.status === 200 });

        /* Nested group for static files - tested against 300ms threshold */
        group('Static files', () => {
            http.get('https://run.mocky.io/v3/5e465d36-0ea8-4e9f-ae20-fa267dbbaaaa?mocky-delay=1000ms');
            http.get('https://run.mocky.io/v3/5e465d36-0ea8-4e9f-ae20-fa267dbbaaaa?mocky-delay=1000ms');
            
        })
    })

    /* Group for news page - only subject to overall 500ms threshold */
    group('News page', () => {
        http.get('https://run.mocky.io/v3/5e465d36-0ea8-4e9f-ae20-fa267dbbaaaa?mocky-delay=5000ms');
    })

    /* Simulate user think time */
    sleep(1);
}
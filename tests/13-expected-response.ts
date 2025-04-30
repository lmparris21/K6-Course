/* This test script demonstrates thresholds and group duration checks */
/* To get a full test summary, run with: k6 run --summary-mode=full script.js */

import http from 'k6/http';
import { sleep, group, check } from 'k6';

/* Test configuration options */
export const options = {
    thresholds: {
        /* Ensure 95% of requests complete within 1.5s */
        http_req_duration: ['p(95)<1500'],
        /* Ensure 95% of requests with expected response: true complete within 1.5s */
        'http_req_duration{expected_response:true}': ['p(95)<1500'],
        /* Group duration thresholds for different page loads */
        'group_duration{group:::Main page}': ['p(95)<4000'],          /* Main page should load within 4s */
        'group_duration{group:::Main page::Assets}': ['p(95)<3000'],  /* Assets should load within 3s */
        'group_duration{group:::News page}': ['p(95)<2000'],          /* News page should load within 2s */
    }
}

export default function () {
    /* Main page test group */
    group('Main page', function () {
        /* Simulate main page load with 900ms delay */
        let res = http.get('https://run.mocky.io/v3/5e465d36-0ea8-4e9f-ae20-fa267dbbaaaa?mocky-delay=900ms');
        check(res, { 'status is 200': (r) => r.status === 200 });
    
        /* Test loading of page assets */
        group('Assets', function () {
            /* Simulate loading two additional assets with 900ms delay each */
            http.get('https://run.mocky.io/v3/5e465d36-0ea8-4e9f-ae20-fa267dbbaaaa?mocky-delay=900ms');
            http.get('https://run.mocky.io/v3/5e465d36-0ea8-4e9f-ae20-fa267dbbaaaa?mocky-delay=900ms');
        });
    });

    /* News page test group */
    group('News page', function () {
        /* Simulate news page load with 900ms delay */
        http.get('https://run.mocky.io/v3/d4d2ea48-b84c-4c3d-a0bf-b97ea4b1c83d'); /* Mocked 503 error endpoint */
    });

    /* Wait 1 second before next iteration */
    sleep(1);
}
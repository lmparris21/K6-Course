import http from 'k6/http'

/* This test script uses k6 to perform HTTP GET requests to mocked endpoints and applies thresholds to response times.
Mock endpoints created at https://designer.mocky.io/ and may expire. */

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        /* System tags */
        'http_req_duration{status:200}': ['p(95)<1000'],
        'http_req_duration{status:201}': ['p(95)<1000'],
        
    }
}

/* 
Set k6 test options, including thresholds for HTTP request durations.
- http_req_duration: applies to all requests
- http_req_duration{status:200}: applies to requests with HTTP 200 status
- http_req_duration{status:201}: applies to requests with HTTP 201 status
*/

export default function () {
    /* Mocked endpoint returning HTTP 200 OK response. */
    http.get('https://run.mocky.io/v3/0530b12d-0e2a-4fc7-9587-1ba0fd9ce814');
    /* Mocked endpoint returning HTTP 201 Created response with a 2 second delay. */
    http.get('https://run.mocky.io/v3/7ff1df74-9cb0-47fd-af20-a86dab65fa5c?mocky-delay=2000ms');
    
    
}
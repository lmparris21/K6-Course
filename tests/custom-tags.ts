/*
This test demonstrates how to use custom tags in k6 for more granular thresholding and error tracking.
It simulates two HTTP requests: a generic one and a tagged 'order' page request, applying custom thresholds and error counting.
*/
import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { check, sleep } from 'k6';

/*
Define k6 test options, including thresholds for overall request duration,
a custom threshold for requests tagged with {page:order}, and a threshold for HTTP errors.
*/
export const options = {
    thresholds: {
        http_req_duration: ['p(95)<300'], /* 95% of all requests must finish in <300ms */
        'http_req_duration{page:order}': ['p(95)<250'], /* 95% of requests tagged with page:order must finish in <250ms */
        http_errors: ['count==0'], /* No HTTP errors allowed */
        'http_errors{page:order}': ['count==0'], /* No HTTP errors allowed for requests tagged with page:order */
        checks: ['rate>=0.99'], /* 99% of checks must pass */
        'checks{page:order}': ['rate>=0.99'], /* 99% of checks tagged with page:order must pass */
    }
}

/*
Create a custom Counter metric to track HTTP errors, optionally with tags.
*/
let httpErrors = new Counter('http_errors');

export default function () {
    /*
    First HTTP GET request (no custom tag).
    */
    let res = http.get('https://run.mocky.io/v3/0530b12d-0e2a-4fc7-9587-1ba0fd9ce814');

    /*
    If the response has an error, increment the httpErrors counter.
    */
    if (res.error) {
        httpErrors.add(1);
    }

    /*
    Check that the response status is 200 (OK).
    */
    check(res, {
        'status is 200': (r) => r.status === 200
    });

    /*
    Simulate submitting an order: HTTP GET request with a custom tag {page: 'order'} and a 2s delay.
    */
    res = http.get(
        'https://run.mocky.io/v3/7ff1df74-9cb0-47fd-af20-a86dab65fa5c?mocky-delay=2000ms',
        {
            tags: {
                page: 'order', /* Custom tag for this request */
            },
        }
        );

    /*
    If the tagged response has an error, increment the httpErrors counter with the same tag.
    */
    if (res.error) {
        httpErrors.add(1, { page: 'order' });
    }

    /*
    Check that the response status is 201 (Created).
    The check is also tagged with {page: 'order'} for custom thresholding.
    */
    check(res, {
      'status is 201': (r) => r.status === 201
    }, {page: 'order'});

    /*
    Sleep for 1 second between iterations to simulate user think time.
    */
    sleep(1);
}
/* Import required k6 libraries */
import http from 'k6/http';
/* Import sleep module for delaying requests */
import { sleep } from 'k6';
/* Import Counter and Trend for custom metrics */
import { Counter, Trend } from 'k6/metrics';

/* Test configuration options */
export const options = {
    vus: 5,        /* Number of virtual users (concurrent users) */
    duration: '5s', /* Total test duration */
    thresholds: {
        http_req_duration: ['p(95)<250'], /* 95th percentile of HTTP request duration should be less than 250ms */
        my_counter: ['count>10'], /* Custom metric should be greater than 10 */ 
        response_time_news_page: ['p(95)<150', 'p(99)<200'], /* 95th percentile of response time for news page should be less than 150ms and 99th percentile should be less than 200ms */
    }
}

/* Create a custom counter metric */
const myCounter = new Counter('my_counter');
/* Create a custom trend metric */
const newsPageResponseTime = new Trend('response_time_news_page');

/* Main test function - executed for each virtual user */
export default function () {
    /* Send GET request to the test endpoint */
    let res = http.get('https://test.k6.io'); 
    /* Increment the custom metric */
    myCounter.add(1);
    /* Wait for 1 second before next iteration */
    sleep(1);

    /* Send GET request to the news page endpoint */
    res = http.get('https://test.k6.io/news.php');
    /* Add the response time to the custom trend metric */
    newsPageResponseTime.add(res.timings.duration);
    /* Wait for 1 second before next iteration */
    sleep(1);
}

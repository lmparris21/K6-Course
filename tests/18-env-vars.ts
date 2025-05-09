/**
 * Test script demonstrating how to use environment variables in k6 tests.
 * Environment variables are accessed through the global __ENV object.
 * 
 * To run this test, use the command:
 * k6 run -e BASE_URL=http://localhost:8000 18-env-vars.ts
 */
import http from 'k6/http';

export default function () {
    /* Log the BASE_URL environment variable to the console */
    console.log('BASE_URL:', __ENV.BASE_URL);

    /* Make a GET request to the crocodiles endpoint using the BASE_URL environment variable */
    http.get(`${__ENV.BASE_URL}/public/crocodiles/`);
}
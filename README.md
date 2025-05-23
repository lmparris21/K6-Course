# k6 Performance Testing Project

This repository contains a comprehensive suite of k6 performance testing scripts for evaluating application performance under various conditions.

## Prerequisites

- [k6](https://k6.io/docs/getting-started/installation/) installed on your system
- Node.js and npm installed
- Docker Desktop installed on your system (for running the test API)

## Setup

1. Install dependencies:
```bash
npm install
```

2. For tests that require the test API:
   - Navigate to the test-api-docker-image folder
   - Start the API by running: `docker-compose up -d`
   - The API will be available at http://localhost:8000/
   - To stop the API when done, run: `docker compose down`

## Available Tests

The project includes several types of performance tests:

1. **First Script** (`1-first-script.ts`)
   - Basic example script for learning k6
   - Good starting point for newcomers

2. **Smoke Test** (`2-smoke-test.ts`)
   - Basic test to verify system functionality
   - Minimal load testing to ensure the system works under basic conditions

3. **Load Test** (`3-load-test.ts`)
   - Evaluates system behavior under expected normal load
   - Verifies system performance for typical usage patterns

4. **Stress Test** (`4-stress-test.ts`)
   - Tests system behavior under heavy load
   - Identifies breaking points and system limitations

5. **Spike Test** (`5-spike-test.ts`)
   - Evaluates system response to sudden, large spikes in user load
   - Tests system recovery capabilities

6. **Breakpoint Test** (`6-breakpoint-test.ts`)
   - Determines system breaking points
   - Identifies maximum operational capacity

7. **Soak Test** (`7-soak-test.ts`)
   - Long-duration test to identify performance degradation over time
   - Validates system stability under sustained load

8. **Scenarios Test** (`8-scenarios.ts`)
   - Demonstrates different k6 execution patterns
   - Shows how to configure multiple scenarios in a single test
   - Examples of ramping VUs, constant VUs, and per-iteration scenarios

9. **Custom Metrics** (`9-custom-metrics.ts`)
   - Shows how to create and track custom metrics
   - Examples of counters, rates, gauges, and trends
   - Demonstrates metric tagging and grouping

10. **System Tags** (`10-system-tags.ts`)
    - Examples of working with k6's built-in system tags
    - Shows how to use and configure system-level metrics
    - Demonstrates system tag customization

11. **Custom Tags** (`11-custom-tags.ts`)
    - Shows how to implement custom tagging in k6 tests
    - Demonstrates advanced tagging strategies
    - Examples of using tags for test organization and metrics filtering

12. **Groups** (`12-groups.ts`)
    - Demonstrates how to organize and group tests
    - Shows how to create logical test groupings
    - Helps in organizing test results and analysis

13. **Expected Response** (`13-expected-response.ts`)
    - Shows how to validate and check expected responses
    - Demonstrates response validation techniques
    - Examples of handling different response scenarios

14. **Lifecycle** (`14-lifecycle.ts`)
    - Demonstrates the k6 test lifecycle hooks
    - Shows how to use setup and teardown functions
    - Examples of managing test state across iterations

15. **Abort** (`15-abort.ts`)
    - Shows how to handle test abortion scenarios
    - Demonstrates graceful test termination
    - Examples of cleanup during test abortion

16. **HTTP GET** (`16-http-get.ts`)
    - Demonstrates how to make simple HTTP GET requests using k6
    - Shows basic usage of the http module
    - Includes examples of HTTP debugging options
    - Requires the test API to be running via Docker

17. **HTTP CRUD** (`17-http-crud.ts`)
    - Demonstrates a complete CRUD (Create, Read, Update, Delete) workflow
    - Shows authentication and token handling
    - Covers PUT, POST, PATCH, and DELETE HTTP methods
    - Includes request/response validation
    - Requires the test API to be running via Docker

18. **Environment Variables** (`18-env-vars.ts`)
    - Shows how to use environment variables in k6 tests
    - Demonstrates accessing variables through the __ENV object
    - Example of parameterizing tests for different environments

19. **Random Sleep** (`19-random-sleep.ts`)
    - Demonstrates using randomized sleep durations
    - Shows how to import and use external JavaScript libraries
    - Example of simulating variable user behavior
    - Uses the k6-utils library for random number generation

20. **Random String** (`20-random-string.ts`)
    - Demonstrates using the randomString utility to generate unique values
    - Shows how to create random usernames, passwords, and other test data
    - Useful for creating dynamic test data on the fly
    - Uses the k6-utils library for string generation

21. **Random Item** (`21-random-item.ts`)
    - Shows how to select random items from arrays using the randomItem utility
    - Demonstrates creating data variety in tests without hardcoding values
    - Helps simulate real user behavior by introducing randomness
    - Uses the k6-utils library to select random elements

22. **External JSON** (`22-external-json.ts`)
    - Demonstrates loading test data from external JSON files
    - Shows how to use SharedArray for efficient data sharing between VUs
    - Explains separation of test logic and test data
    - Provides an example of data-driven testing with JSON

23. **External CSV** (`23-external-csv.ts`)
    - Shows how to work with external CSV data in k6 tests
    - Demonstrates using PapaParse library to parse CSV content
    - Provides an example of data-driven testing with CSV files
    - Shows efficient data loading with SharedArray

## Running Tests

First, navigate to the tests directory:
```bash
cd tests
```

Then run any test using the following command:
```bash
k6 run <test-file-name>
```

Examples:
```bash
# Run first script
k6 run 1-first-script.ts

# Run smoke test
k6 run 2-smoke-test.ts

# Run load test
k6 run 3-load-test.ts
```

## Test Configuration

Each test can be configured through environment variables or by modifying the test scripts directly. See individual test files for specific configuration options.

## Best Practices

- Run smoke tests before other tests to ensure basic functionality
- Start with lower virtual users (VUs) and gradually increase
- Monitor system resources during test execution
- Review test results and performance metrics after each run

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 
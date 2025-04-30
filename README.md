# k6 Performance Testing Project

This repository contains a comprehensive suite of k6 performance testing scripts for evaluating application performance under various conditions.

## Prerequisites

- [k6](https://k6.io/docs/getting-started/installation/) installed on your system
- Node.js and npm installed

## Setup

1. Install dependencies:
```bash
npm install
```

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
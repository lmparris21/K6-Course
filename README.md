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

1. **Smoke Test** (`smoke-test.ts`)
   - Basic test to verify system functionality
   - Minimal load testing to ensure the system works under basic conditions

2. **Load Test** (`load-test.ts`)
   - Evaluates system behavior under expected normal load
   - Verifies system performance for typical usage patterns

3. **Stress Test** (`stress-test.ts`)
   - Tests system behavior under heavy load
   - Identifies breaking points and system limitations

4. **Spike Test** (`spike-test.ts`)
   - Evaluates system response to sudden, large spikes in user load
   - Tests system recovery capabilities

5. **Soak Test** (`soak-test.ts`)
   - Long-duration test to identify performance degradation over time
   - Validates system stability under sustained load

6. **Breakpoint Test** (`breakpoint-test.ts`)
   - Determines system breaking points
   - Identifies maximum operational capacity

7. **First Script** (`first-script.ts`)
   - Basic example script for learning k6
   - Good starting point for newcomers

8. **Scenarios Test** (`scenarios.ts`)
   - Demonstrates different k6 execution patterns
   - Shows how to configure multiple scenarios in a single test
   - Examples of ramping VUs, constant VUs, and per-iteration scenarios

9. **Custom Metrics** (`custom-metrics.ts`)
   - Shows how to create and track custom metrics
   - Examples of counters, rates, gauges, and trends
   - Demonstrates metric tagging and grouping

## Running Tests

To run any test, use the following command:

```bash
k6 run tests/<test-file-name>
```

Examples:
```bash
# Run smoke test
k6 run tests/smoke-test.ts

# Run load test
k6 run tests/load-test.ts

# Run stress test
k6 run tests/stress-test.ts
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
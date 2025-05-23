# k6 Test Images

This directory contains screenshots and images related to k6 performance testing.

## k6 Cloud Dashboard Example

**File**: `k6-cloud-dashboard-example.png`

This image shows a real k6 Cloud dashboard displaying test results with the following key metrics:

### Performance Overview
- **P95 Response Time**: 87ms (95th percentile response time)
- **Requests Made**: 312 total requests
- **HTTP Failures**: 0 failures 
- **Peak RPS**: 5.67 requests/second

### Test Configuration
- **Duration**: 1 minute 20 seconds
- **Virtual Users**: 1 VU
- **Load Zones**: Local execution
- **Test File**: `25-k6-test-api.ts`

### Dashboard Features Shown
1. **Real-time Performance Graph**: Shows VUs, Request Rate, Response Time, and Failure Rate over time
2. **Performance Metrics**: Key performance indicators displayed prominently
3. **Test Status**: Shows test completion status and execution details
4. **Time-series Visualization**: Graphs showing how metrics change throughout the test duration

This dashboard demonstrates the value of k6 Cloud reporting for:
- Real-time monitoring during test execution
- Historical performance tracking
- Visual identification of performance patterns
- Easy sharing of results with team members

The dashboard is automatically generated when using the `cloud` configuration in your k6 test options. 
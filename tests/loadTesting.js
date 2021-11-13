import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 500,
      timeUnit: '1s',
      duration: '10s',
      preAllocatedVUs: 20,
      maxVUs: 1000,
    },
  },
};

export default function () {
  http.get('http://localhost:3000/reviews?product_id=5');
  // sleep(1);
}
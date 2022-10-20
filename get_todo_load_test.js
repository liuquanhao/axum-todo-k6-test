import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export const options = {
    stages: [
      { duration: '1m', target: 1000 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
      { duration: '1m', target: 1000 }, // stay at 100 users for 10 minutes
      { duration: '1m', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
      'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
  };
const BASE_URL = 'http://127.0.0.1:3000';

export default () => {
  const todos = http.get(`${BASE_URL}/todos/`).json();
  check(todos, { 'retrieved crocodiles': (obj) => obj.length > 0 });
  sleep(1);
}

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 1000 },
    { duration: '10s', target: 1000 },
    { duration: '20s', target: 5000 },
    { duration: '10s', target: 5000 },
    { duration: '30s', target: 10000 },
    { duration: '30s', target: 10000 },
    { duration: '30s', target: 12000 },
    { duration: '30s', target: 12000 },
    { duration: '30s', target: 5000 },
    { duration: '10s', target: 5000 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'],
  },
};

export default () => {
  const todos = http.get(`http://127.0.0.1:3000/todos/?page=1&per_page=10`).json();
  check(todos, { 'retrieved crocodiles': (obj) => obj.length > 0 });
  sleep(1);
};

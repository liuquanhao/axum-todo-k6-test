import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '5s',
  thresholds: {
    http_req_duration: ['p(95)<1000'],
  },
};

export default () => {
  const todos = http.get(`http://127.0.0.1:3000/todos/?page=1&per_page=10`).json();
  check(todos, { 'retrieved crocodiles': (obj) => obj.length > 0 });
  sleep(1);
};

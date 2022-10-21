import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 4000 },
    { duration: '3m', target: 4000 },
    { duration: '10s', target: 0 }, 
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'],
  },
};

export default () => {
  const url = 'http://127.0.0.1:3000/todos/';
  const payload = JSON.stringify({
    text: "k6 todo test",
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const todo = http.post(url, payload, params).json();
  check(todo, { 'retrieved crocodiles': (obj) => obj.text == "k6 todo test"});
  sleep(1);
};

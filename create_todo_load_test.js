import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
      { duration: '1m', target: 10000 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
      { duration: '4m', target: 10000 }, // stay at 100 users for 10 minutes
      { duration: '1m', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
      'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
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
}

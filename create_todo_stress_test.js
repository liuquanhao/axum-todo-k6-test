import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 1000 }, // below normal load
    { duration: '10s', target: 2000 },
    { duration: '10s', target: 3000 }, // normal load
    { duration: '10s', target: 5000 },
    { duration: '20s', target: 5000 }, // around the breaking point
    { duration: '10s', target: 2000 },
    { duration: '10s', target: 1000 }, // beyond the breaking point
    { duration: '10s', target: 1000 },
    { duration: '10s', target: 0 }, // scale down. Recovery stage.
  ],
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

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '30s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
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

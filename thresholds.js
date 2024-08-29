import http from 'k6/http';
import { check } from 'k6';

export let options = {
  thresholds: {
    'http_req_duration': ['p(99)<500'], // 99% das requisições devem ter uma duração inferior a 500ms
    'http_req_failed': ['rate<0.01'],   // Menos de 1% das requisições devem falhar
  },
};

export default function () {
  let res = http.get('https://test-api.k6.io');
  check(res, {
    'status was 200': (r) => r.status === 200,
  });
}

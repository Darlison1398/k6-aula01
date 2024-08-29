// import necessary modules
import { check } from "k6";
import http from "k6/http";

// define configuration
export const options = {
  // define thresholds
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ["p(99)<5000"], // 99% of requests should be below 5s
  },
};

export default function () {
  // URL da requisição
  const url = "https://test-api.k6.io/auth/basic/login/";

  // corpo da requisição (JSON) / body
  const payload = JSON.stringify({
    username: "test_case",
    password: "1234",
  });

  // headers da requisição / headers
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // send a post request and save response as a variable
  const res = http.post(url, payload, params);

  // check that response is 200
  check(res, {
    "response code was 200": (res) => res.status == 200,
  });
}


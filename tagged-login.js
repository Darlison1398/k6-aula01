import http from "k6/http";

export default function () {

  // URL
  const url = "https://test-api.k6.io";

  // Body
  const payload = JSON.stringify({
    username: "test_case",
    password: "1234",
  });

  // Headers 
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
    
    //apply tags
    tags: {
     "my-custom-tag": "auth-api"
    },
  };

  //Login with tags
  http.post(`${url}/auth/basic/login`, payload, params);
};

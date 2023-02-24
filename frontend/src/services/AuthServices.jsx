import requests from "./httpServices";

const AuthServices = {
  login(body) {
    return requests.post("/login", body);
  },
  register(body) {
    return requests.post("/register", body);
  },
};

export default AuthServices;

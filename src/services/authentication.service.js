import axios from "axios";

const authAxios = axios.create(); // gives instance of axios.

// create an interceptor.
/*
 * create a new configuration which inherits from the
 * base configuration and updating the headers to
 * include an authorization header which uses our token
 * stored in local storage.
 */
authAxios.interceptors.request.use((config) => {
  const newConfig = config;
  const token = localStorage.getItem("token");
  console.log(token);
  newConfig.headers = {
    Authorization: `Token ${token}`,
  };
  return newConfig;
});

function isAuthenticated() {
  const token = localStorage.getItem("token");
  return token !== null && token !== undefined;
}

function logout() {
  localStorage.removeItem("token");
}

const authenticationService = {
  isAuthenticated: isAuthenticated(),
  logout
};

export { authAxios, authenticationService };

const axios = require("axios");
export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
  isBrowser() && localStorage.getItem("User")
    ? JSON.parse(localStorage.getItem("User"))
    : {};

const setUser = user => localStorage.setItem("User", JSON.stringify(user));

export const handleLogin = async ({ email, password }) => {
  await axios
    .post("https://bw-business-card-org-be-raine.herokuapp.com/api/login", {
      username: email,
      password: password
    })
    .then(res => {
      let email = res.data.message;
      setUser({ email });
      return true;
    })
    .catch(res => {
      console.log(res);
      alert(res.message);
      return false;
    });
  return false;
};
export const handleRegister = async ({ email, password }) => {
  await axios
    .post("https://bw-business-card-org-be-raine.herokuapp.com/api/register", {
      username: email,
      password: password
    })
    .then(res => {
      return true;
    })
    .catch(res => {
      alert(res.message);
      return false;
    });
};

export const isLoggedIn = () => {
  const user = getUser();
  if (user.email) {
    return true;
  }
  return false;
};

export const logout = callback => {
  setUser({});
  callback();
};

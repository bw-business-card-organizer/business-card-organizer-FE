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
      email: email,
      password: password
    })
    .then(res => {
      let token = res.data.token;
      setUser({ token });
      return true;
    })
    .catch(res => {
      console.log(res);
      alert(res.message);
      return false;
    });
  return false;
};
export const handleRegister = async ({ email, password, fName, lName }) => {
  await axios
    .post("https://bw-business-card-org-be-raine.herokuapp.com/api/register", {
      email: email,
      password: password,
      firstName: fName,
      lastName: lName,
      subscription: 0
    })
    .then(res => {
      return true;
    })
    .catch(res => {
      alert(res.message);
      return false;
    });
};
export const handleAddCard = async ({
  businessName,
  address,
  phone,
  notes
}) => {
  console.log(businessName, address, phone, notes);
  let user = getUser();
  await axios
    .post(
      "https://bw-business-card-org-be-raine.herokuapp.com/api/cards",

      {
        businessName: businessName,
        address: address,
        phone: phone,
        logoPic: null,
        additionalPic: null,
        phone2: null,
        blurb: null,
        hours: null,
        email: null,
        website: null,
        notes: notes
      },
      {
        headers: { Authorization: `${user.token}` }
      }
    )
    .then(res => {
      return true;
    })
    .catch(res => {
      alert(res.message);
      return false;
    });
};
export const handleDeleteCard = async id => {
  let user = getUser();
  console.log(user.token);
  console.log(id);
  await axios
    .delete(
      `https://bw-business-card-org-be-raine.herokuapp.com/api/cards/${id}`,
      {
        headers: { Authorization: `${user.token}` }
      }
    )
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
  if (user.token) {
    return true;
  }
  return false;
};

export const logout = callback => {
  setUser({});
};

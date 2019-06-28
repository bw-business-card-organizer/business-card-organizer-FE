const axios = require("axios");
export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
  isBrowser() && localStorage.getItem("User")
    ? JSON.parse(localStorage.getItem("User"))
    : {};

const setUser = user => localStorage.setItem("User", JSON.stringify(user));

export const handleLogin = async ({ email, password }) => {
  let data = await axios
    .post("https://bw-business-card-test.herokuapp.com/api/login", {
      email: email,
      password: password
    })
    .then(res => {
      let token = res.data.token;
      setUser({ token });
      return true;
    })
    .catch(res => {
      //console.log(res);
      alert(res.message);
      return false;
    });
  return data;
};
export const handleRegister = async ({ email, password, fName, lName }) => {
  let data = await axios
    .post("https://bw-business-card-test.herokuapp.com/api/register", {
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
  return data;
};
export const handleAddCard = async ({
  businessName,
  address,
  phone,
  logoPic,
  additionalPic,
  phone2,
  blurb,
  hours,
  email,
  website,
  notes
}) => {
  //console.log(businessName, address, phone, notes);
  let user = getUser();
  let data = await axios
    .post(
      "https://bw-business-card-test.herokuapp.com/api/cards",

      {
        businessName: businessName,
        address: address,
        phone: phone,
        logoPic: logoPic,
        additionalPic: additionalPic,
        phone2: phone2,
        blurb: blurb,
        hours: hours,
        email: email,
        website: website,
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
  return data;
};
export const handleDeleteCard = async id => {
  let user = getUser();
  //console.log(user.token);
  //console.log(id);
  let data = await axios
    .delete(`https://bw-business-card-test.herokuapp.com/api/cards/${id}`, {
      headers: { Authorization: `${user.token}` }
    })
    .then(res => {
      return true;
    })
    .catch(res => {
      alert(res.message);
      return false;
    });
  return data;
};
export const handleGetCards = async () => {
  let user = getUser();
  //console.log(user);
  let data = await axios
    .get(`https://bw-business-card-test.herokuapp.com/api/cards`, {
      headers: { Authorization: `${user.token}` }
    })
    .then(res => {
      //console.log(res.data);
      return res.data;
    })
    .catch(res => {
      alert(res.message);
      return res.message;
    });
  return data;
};
export const handleGetQR = async id => {
  let user = getUser();
  //console.log(user);
  let data = await axios
    .get(`https://bw-business-card-test.herokuapp.com/api/users`, {
      headers: { Authorization: `${user.token}` }
    })
    .then(res => {
      //console.log(res.data);
      return res.data;
    })
    .catch(res => {
      alert(res.message);
      return res.message;
    });
  for (let i = 0; i < data.length; i++) {
    try {
      if (id === data[i].id) {
        ////console.log(data[i]);
        data = await axios
          .get(`https://bw-business-card-test.herokuapp.com/api/cards/${id}`, {
            headers: { Authorization: `${user.token}` }
          })
          .then(res => {
            ////console.log(res.data);
            return res.data;
          })
          .catch(res => {
            alert(res.message);
            return res.message;
          });
      }
    } catch (e) {}
  }
  return data;
};
export const handleGetCard = async id => {
  let user = getUser();
  //console.log(id);
  let data = await axios
    .get(`https://bw-business-card-test.herokuapp.com/api/cards/${id}`, {
      headers: { Authorization: `${user.token}` }
    })
    .then(res => {
      //console.log(res.data);
      return res.data;
    })
    .catch(res => {
      alert(res.message);
      return res.message;
    });
  return data;
};
export const handleEditCard = async ({
  id,
  businessName,
  address,
  phone,
  logoPic,
  additionalPic,
  phone2,
  blurb,
  hours,
  email,
  website,
  notes
}) => {
  let user = getUser();
  //console.log(id);

  let data = axios
    .put(
      `https://bw-business-card-test.herokuapp.com/api/cards/${id}`,
      {
        businessName: businessName,
        address: address,
        phone: phone,
        logoPic: logoPic,
        additionalPic: additionalPic,
        phone2: phone2,
        blurb: blurb,
        hours: hours,
        email: email,
        website: website,
        notes: notes
      },
      {
        headers: { Authorization: `${user.token}` }
      }
    )
    .then(res => {
      return res.data;
    })
    .catch(res => {
      alert(res.message);
      return res.message;
    });
  return data;
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

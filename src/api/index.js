const service = (route) => `https://pizzaz-service.herokuapp.com${route}`;

export const getMenu = () =>
  fetch(service("/api/menu"))
    .then((res) => {
      return res.json();
    })
    .then((data) => data)
    .catch((e) => console.log(e));

export const createOrder = async (order) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  };
  const data = await fetch(service("/api/order"), config);
  const content = await data.json();
  return content;
};

export const signUp = async (user) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  const data = await fetch(service("/api/auth/signup"), config);
  const content = await data.json();
  localStorage.setItem("token", content.token);
  return content;
};

export const signIn = async (user) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  const data = await fetch(service("/api/auth/signin"), config);
  const content = await data.json();
  localStorage.setItem("token", content.token);
  return content;
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("token") || "";
  return fetch(service("/api/auth/currentUser"), {
    headers: { authorization: token },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((e) => console.log(e));
};

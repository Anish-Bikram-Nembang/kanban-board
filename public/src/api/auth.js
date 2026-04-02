import { fetchwrapper } from "./fetchWrapper.js";
const baseUrl = "/api/auth";

export const register = async ({
  first_name,
  last_name,
  username,
  email,
  password,
}) => {
  try {
    const { registeredUser, token } = await fetchwrapper(
      `${baseUrl}/register`,
      {
        method: "POST",
        body: JSON.stringify({
          first_name,
          last_name,
          username,
          email,
          password,
        }),
      },
    );
    localStorage.setItem("token", token);
    return registeredUser;
  } catch (err) {
    alert("Failed to register");
  }
};
export const login = async ({ email, password }) => {
  try {
    const { user, token } = await fetchwrapper(`${baseUrl}/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    localStorage.setItem("token", token);
    return user;
  } catch (err) {
    alert("Failed to log in");
  }
};
export const logout = () => {
  localStorage.removeItem("token");
};

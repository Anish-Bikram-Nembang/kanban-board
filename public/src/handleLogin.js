import { login } from "./api/auth.js";

const form = document.getElementById("login");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const email = formData.get("email");
  const password = formData.get("password");
  const res = await login({ email, password });
  window.location.href = "/index.html";
});

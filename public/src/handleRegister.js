import { register } from "./api/auth.js";

const form = document.getElementById("register");
console.log(form);
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formMap = new FormData(form);
  const data = Object.fromEntries(formMap.entries());
  const res = await register(data);
  window.location.href = "/index.html";
});

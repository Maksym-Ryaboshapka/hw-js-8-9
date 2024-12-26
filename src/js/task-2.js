const form = document.querySelector(".form");
const login = document.querySelector(".form__login");
const email = document.querySelector(".form__email");
const submitBtn = document.querySelector(".form__btn");

if (localStorage.getItem("login") !== null) {
  if (localStorage.getItem("login").length !== 0) {
    login.value = localStorage.getItem("login");
  }
}

if (localStorage.getItem("email") !== null) {
  if (localStorage.getItem("email").length !== 0) {
    email.value = localStorage.getItem("email");
  }
}

login.addEventListener("blur", () => {
  if (login.value !== "") localStorage.setItem("login", login.value);
});

email.addEventListener("blur", () => {
  if (email.value !== "") localStorage.setItem("email", email.value);
})

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  login.value = "";
  email.value = "";

  localStorage.setItem("login", login.value);
  localStorage.setItem("email", email.value);
});
"use strict";

const auth = document.querySelector(".auth");
const authForm = document.querySelector(".auth-form");
const reg = document.querySelector(".reg");
const regForm = document.querySelector(".reg-form");
const logo = document.querySelector(".logo");

auth.addEventListener("click", function () {
  authForm.classList.remove("hide");
  regForm.classList.add("hide");
  logo.classList.add("hide");
  reg.removeAttribute("disabled", "");
  auth.setAttribute("disabled", true);
});

reg.addEventListener("click", function () {
  authForm.classList.add("hide");
  regForm.classList.remove("hide");
  logo.classList.add("hide");
  reg.setAttribute("disabled", true);
  auth.removeAttribute("disabled", "");
});


var login_visible = true;
var screen_width = window.innerWidth;
const container = document.querySelector(".container");
const login_page = document.getElementById("login_form");
const register_page = document.getElementById("register_form");
const form_fields = document.querySelectorAll(".form-register .form-field");

function togglePassword(view_btn) {
  const password_input = view_btn.previousElementSibling;

  const view_pw = view_btn.querySelector(".view-pw");
  const hide_pw = view_btn.querySelector(".hide-pw");
  if (password_input.type === "password") {
    view_pw.style.display = "none";
    hide_pw.style.display = "block";
    password_input.type = "text";
  } else {
    hide_pw.style.display = "none";
    view_pw.style.display = "block";
    password_input.type = "password";
  }
}

function toggleLogin() {
  if (login_visible) {
    login_page.style.right = "150%";
    register_page.style.right = "0";
    if (screen_width > 575 && screen_width < 800) {
      container.style.height = "120vh";
    }
  } else {
    register_page.style.right = "150%";
    login_page.style.right = "0";
    container.style.height = "unset";
  }

  login_page.addEventListener("webkitTransitionEnd", hide_opposite_form, false);
  login_page.addEventListener("oTransitionEnd", hide_opposite_form, false);
  login_page.addEventListener("transitionend", hide_opposite_form, false);
  login_page.addEventListener("msTransitionEnd", hide_opposite_form, false);

  register_page.addEventListener(
    "webkitTransitionEnd",
    hide_opposite_form,
    false
  );
  register_page.addEventListener("oTransitionEnd", hide_opposite_form, false);
  register_page.addEventListener("transitionend", hide_opposite_form, false);
  register_page.addEventListener("msTransitionEnd", hide_opposite_form, false);
}

function hide_opposite_form() {
  if (login_visible) {
    register_page.style.display = "block";
    login_page.style.display = "none";
  } else {
    login_page.style.display = "block";
    register_page.style.display = "none";
  }
  login_visible = !login_visible;
}

addEventListener("input", (event) => {
  let valid = fieldVerification(event.target);
  form_fields.forEach((field) => {
    if (
      field.classList.contains(event.target.type) ||
      (event.target.getAttribute("id") !== null &&
        field.classList.contains(event.target.getAttribute("id")))
    ) {
      const valid_sign = field.querySelector("svg.correct.validate-sign");
      const invalid_sign = field.querySelector("svg.incorrect.validate-sign");

      if (
        typeof valid_sign !== "undefined" &&
        valid_sign !== null &&
        typeof invalid_sign !== "undefined" &&
        invalid_sign !== null
      ) {
        if (valid) {
          if (invalid_sign.style.display === "block") {
            invalid_sign.style.display = "none";
          }
          valid_sign.style.display = "block";
        } else {
          if (valid_sign.style.display === "block") {
            valid_sign.style.display = "none";
          }
          invalid_sign.style.display = "block";
        }
      }
    }
  });
});

function fieldVerification(field) {
  // let field_type = field.type;
  let field_value = field.value;
  let field_id = field.getAttribute("id");
  let valid = false;
  if (field_id !== null && field_id === "rg-email") {
    let emailVerif =
      /\w+[\w!#$%&*+-|]*@(\w){2,}(\.{1}\w{2,}){0,2}(\.){1}[A-Za-z]{2,}/i;
    valid = emailVerif.test(field_value);
  }
  if (field_id !== null && field_id === "rg-password") {
    let passwVerif = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/;
    valid = passwVerif.test(field_value);
  }
  if (field_id !== null && field_id === "rg-confirm-password") {
    const pwVal = document.getElementById("rg-password").value;
    valid = field_value.localeCompare(pwVal) === 0 ? true : false;
  }
  if (
    (field_id !== null && field_id === "rg-first-name") ||
    (field_id !== null && field_id === "rg-last-name")
  ) {
    let nameVerif = /[A-Za-z]{2,}/;
    valid = nameVerif.test(field_value);
  }
  return valid;
}

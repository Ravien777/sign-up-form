var login_visible = true;
const login_page = document.getElementById("login_form");
const register_page = document.getElementById("register_form");
const form_fields = document.querySelectorAll(".form-field");

function togglePassword() {
  const password_input = document.getElementById("password");
  const view_pw = document.getElementById("view-pw");
  const hide_pw = document.getElementById("hide-pw");
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
  } else {
    register_page.style.right = "150%";
    login_page.style.right = "0";
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
    console.log("In 1");
    register_page.style.display = "block";
    login_page.style.display = "none";
  } else {
    console.log("In 2");
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
      (event.target.getAttribute("id") === "password" &&
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
  let field_type = field.type;
  let field_value = field.value;
  let field_id = field.getAttribute("id");
  let valid = false;
  if (field_type === "email") {
    let emailVerif =
      /\w+[\w!#$%&*+-|]*@(\w){2,}(\.{1}\w{2,}){0,2}(\.){1}[A-Za-z]{2,}/i;
    valid = emailVerif.test(field_value);
  } else if (
    field_type === "password" ||
    (field_id !== null && field_id === "password")
  ) {
    let passwVerif = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/;
    valid = passwVerif.test(field_value);
  }
  return valid;
}

var login_visible = true;
const login_page = document.getElementById("login_form");
const register_page = document.getElementById("register_form");

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

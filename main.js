function togglePassword() {
  let password_input = document.getElementById("password");
  let view_pw = document.getElementById("view-pw");
  let hide_pw = document.getElementById("hide-pw");
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

import { renderSideBar } from "../components/sideBar.js";
import { checkLogin } from "./checkUserLogin.js";

renderSideBar();
const userInfo = document.querySelector(".user-info");

console.log(userInfo);

firebase.auth().onAuthStateChanged((user) => {
  console.log(user);
  
  const buttonCreate = document.getElementsByClassName('create-menu-wrapper')[0];
  buttonCreate.hidden = true;
  if (user) {
    userInfo.innerHTML = `
    <div class="user-img">
    <img src=${user.photoURL} alt="">
    </div>
<div class="user-details">
    <div class="name">${user.displayName}</div>
    <button class="logout-btn">Đăng xuất<i class="fas fa-sign-out-alt"></i></button>
</div>
   `;
    const btnLogout = document.querySelector(".logout-btn");
    btnLogout.addEventListener("click", handleLogout);
  } else {
    userInfo.innerHTML = `
    <button class="user-img" aria-label="Log in now">
    <i class="fas fa-user-circle"></i>
</button>
<div class="user-details">
    <div class="name">Đã có tài khoản?</div>
    <button class="login-btn">Đăng nhập<i class="fas fa-sign-in-alt"></i></button>
</div>
    `;
    const btnLogin = document.querySelector(".login-btn");
    btnLogin.addEventListener("click", () => {
      window.location.href = "./login.html";
    });

    const sideBar = document.getElementById('explore').parentNode;
    console.log(sideBar);
    var children = sideBar.childNodes;
    children.forEach(function (iterator) {
      if (iterator.id === "my-quizzes" || iterator.id === "profile") {
        iterator.style.display = "none";
      }
    });


    if (window.location.pathname === "/quizPage.html") {
      console.log(window.location.pathname);
      let tempInfo = localStorage.getItem('tempUserInfo');
      console.log(tempInfo);
      checkLogin();
    }
  }

  function handleLogout() {
    firebase.auth().signOut();
    localStorage.removeItem("tempUserInfo");
    window.location.href = "./main.html";
  }
});
const profile = document.getElementById("profile");
profile.addEventListener("click", () => {
  window.location.href = "./profile.html";
});

/// opensilbar
const sildbar = document.querySelector(".main-navigation-inner");
const menuBar = document.querySelector(".menu-bar");
menuBar.addEventListener("click", () => {
  menuBar.classList.toggle("fa-times");
  sildbar.classList.toggle("active");
});

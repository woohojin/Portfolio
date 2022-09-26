const body = document.querySelector("body");
const header = document.getElementById("header");
const headerLogo = document.getElementById("header-logo");
const headerMenu = document.getElementById("header-menu");
const mainNameCon = document.getElementById("main-name-con");
const mainNameFirst = document.getElementById("main-name_first");
const mainNameFirstOne = document.getElementById("main-name_first_1");
const mainNameFirstTwo = document.getElementById("main-name_first_2");
const mainNameSecond = document.getElementById("main-name_second");
const main = document.querySelector("main");
const mainPortCon = document.getElementById("main-portfolio-con");
const content = document.getElementById("content");
const contentProfile = document.getElementById("content-profile");
const darkmodeSwitch = document.getElementById("darkmode_switch");
const darkmodeButton = document.getElementById("darkmode_button");
const darkmodeIcon = document.getElementById("darkmode_icon");
const startButton = document.getElementById("start-button");
const startButtonBackground = document.getElementById(
  "start-button_background"
);

window.onload = function darkMode() {
  if (localStorage.getItem("mode") == null) {
    localStorage.setItem("mode", "dark");
  }

  body.classList.remove("dark");
  header.classList.remove("dark");
  headerLogo.classList.remove("dark");
  headerMenu.classList.remove("dark");
  main.classList.remove("dark");
  content.classList.remove("dark");
  darkmodeSwitch.classList.remove("dark");
  darkmodeButton.classList.remove("dark");
  darkmodeIcon.classList.remove("dark");
  startButton.classList.remove("dark");
  startButtonBackground.classList.remove("dark");

  body.classList.remove("light");
  header.classList.remove("light");
  headerLogo.classList.remove("light");
  headerMenu.classList.remove("light");
  main.classList.remove("light");
  content.classList.remove("light");
  darkmodeSwitch.classList.remove("light");
  darkmodeButton.classList.remove("light");
  darkmodeIcon.classList.remove("light");
  startButton.classList.remove("light");
  startButtonBackground.classList.remove("light");

  body.classList.add(localStorage.getItem("mode"));
  header.classList.add(localStorage.getItem("mode"));
  headerMenu.classList.add(localStorage.getItem("mode"));
  headerLogo.classList.add(localStorage.getItem("mode"));
  main.classList.add(localStorage.getItem("mode"));
  content.classList.add(localStorage.getItem("mode"));
  darkmodeSwitch.classList.add(localStorage.getItem("mode"));
  darkmodeButton.classList.add(localStorage.getItem("mode"));
  darkmodeIcon.classList.add(localStorage.getItem("mode"));
  startButton.classList.add(localStorage.getItem("mode"));
  startButtonBackground.classList.add(localStorage.getItem("mode"));

  darkmodeSwitch.addEventListener("click", function () {
    if (body.className === "dark") {
      localStorage.setItem("mode", "light");

      body.classList.add(localStorage.getItem("mode"));
      body.classList.remove("dark");

      header.classList.add(localStorage.getItem("mode"));
      header.classList.remove("dark");

      headerLogo.classList.add(localStorage.getItem("mode"));
      headerLogo.classList.remove("dark");

      headerMenu.classList.add(localStorage.getItem("mode"));
      headerMenu.classList.remove("dark");

      main.classList.add(localStorage.getItem("mode"));
      main.classList.remove("dark");

      content.classList.add(localStorage.getItem("mode"));
      content.classList.remove("dark");

      darkmodeSwitch.classList.add(localStorage.getItem("mode"));
      darkmodeSwitch.classList.remove("dark");

      darkmodeButton.classList.add(localStorage.getItem("mode"));
      darkmodeButton.classList.remove("dark");

      darkmodeIcon.classList.add(localStorage.getItem("mode"));
      darkmodeIcon.classList.remove("dark");

      startButton.classList.add(localStorage.getItem("mode"));
      startButton.classList.remove("dark");

      startButtonBackground.classList.add(localStorage.getItem("mode"));
      startButtonBackground.classList.remove("dark");
    } else if (body.className === "light") {
      localStorage.setItem("mode", "dark");

      body.classList.add(localStorage.getItem("mode"));
      body.classList.remove("light");

      header.classList.add(localStorage.getItem("mode"));
      header.classList.remove("light");

      headerLogo.classList.add(localStorage.getItem("mode"));
      headerLogo.classList.remove("light");

      headerMenu.classList.add(localStorage.getItem("mode"));
      headerMenu.classList.remove("light");

      main.classList.add(localStorage.getItem("mode"));
      main.classList.remove("light");

      content.classList.add(localStorage.getItem("mode"));
      content.classList.remove("light");

      darkmodeSwitch.classList.add(localStorage.getItem("mode"));
      darkmodeSwitch.classList.remove("light");

      darkmodeButton.classList.add(localStorage.getItem("mode"));
      darkmodeButton.classList.remove("light");

      darkmodeIcon.classList.add(localStorage.getItem("mode"));
      darkmodeIcon.classList.remove("light");

      startButton.classList.add(localStorage.getItem("mode"));
      startButton.classList.remove("light");

      startButtonBackground.classList.add(localStorage.getItem("mode"));
      startButtonBackground.classList.remove("light");
    }
  });
};

startButton.addEventListener("click", function () {
  mainNameSecond.classList.add("transparent");
  mainPortCon.classList.add("transparent");
  startButton.classList.add("transparent");

  mainNameFirst.classList.add("logo");
  setTimeout(function () {
    mainNameFirstTwo.classList.add("transparent");
  }, 2000);

  setTimeout(function () {
    headerLogo.classList.remove("hidden");
    main.classList.add("hidden");
    content.classList.remove("hidden");
    content.classList.add("center");
    headerMenu.classList.remove("hidden");
  }, 2500);
});

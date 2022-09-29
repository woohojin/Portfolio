const startButton = document.getElementById("start-button");
const darkmodeSwitch = document.getElementById("darkmode_switch");
const emailIcon = document.getElementById("email-icon");

const body = document.querySelector("body");
const header = document.getElementById("header");
const main = document.querySelector("main");
const content = document.getElementById("content");

const headerLogo = document.getElementById("header-logo");
const headerMenu = document.getElementById("header-menu");
const mainPortCon = document.getElementById("main-portfolio-con");
const mainNameCon = document.getElementById("main-name-con");
const mainNameFirst = document.getElementById("main-name_first");
const mainNameFirstOne = document.getElementById("main-name_first_1");
const mainNameFirstTwo = document.getElementById("main-name_first_2");
const mainNameSecond = document.getElementById("main-name_second");

window.onload = function darkMode() {
  if (localStorage.getItem("mode") == null) {
    localStorage.setItem("mode", "dark");
  }

  body.classList.remove("dark");
  header.classList.remove("dark");
  main.classList.remove("dark");
  content.classList.remove("dark");

  body.classList.remove("light");
  header.classList.remove("light");
  main.classList.remove("light");
  content.classList.remove("light");

  body.classList.add(localStorage.getItem("mode"));
  header.classList.add(localStorage.getItem("mode"));
  main.classList.add(localStorage.getItem("mode"));
  content.classList.add(localStorage.getItem("mode"));

  darkmodeSwitch.addEventListener("click", function () {
    if (body.className === "dark") {
      localStorage.setItem("mode", "light");

      body.classList.add(localStorage.getItem("mode"));
      body.classList.remove("dark");

      header.classList.add(localStorage.getItem("mode"));
      header.classList.remove("dark");

      main.classList.add(localStorage.getItem("mode"));
      main.classList.remove("dark");

      content.classList.add(localStorage.getItem("mode"));
      content.classList.remove("dark");
    } else if (body.className === "light") {
      localStorage.setItem("mode", "dark");

      body.classList.add(localStorage.getItem("mode"));
      body.classList.remove("light");

      header.classList.add(localStorage.getItem("mode"));
      header.classList.remove("light");

      main.classList.add(localStorage.getItem("mode"));
      main.classList.remove("light");

      content.classList.add(localStorage.getItem("mode"));
      content.classList.remove("light");
    }
  });
};

startButton.addEventListener("click", function () {
  mainNameSecond.classList.add("transparent");
  mainPortCon.classList.add("transparent");
  startButton.classList.add("transparent");
  header.classList.add("shadow");
  content.classList.add("shadow");
  headerMenu.classList.add("fadeIn");
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

emailIcon.addEventListener("click", function () {
  const emailClipBoard = document.getElementById("email-clipboard");
  copyText = emailClipBoard.value;
  navigator.clipboard.writeText(copyText).then();
  alert("클립보드에 텍스트가 복사되었습니다.");
});

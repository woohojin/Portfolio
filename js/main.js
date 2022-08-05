window.onload = function darkMode() {
  const main = document.getElementById("main");
  const body = document.querySelector("body");
  const darkmodeSwitch = document.getElementById("darkmode_switch");
  const darkmodeButton = document.getElementById("darkmode_button");
  const darkmodeIcon = document.getElementById("darkmode_icon");
  const mainCube = document.querySelector(".main-cube");

  body.classList.remove("dark");
  main.classList.remove("dark");
  darkmodeSwitch.classList.remove("dark");
  darkmodeButton.classList.remove("dark");
  darkmodeIcon.classList.remove("dark");
  mainCube.classList.remove("dark");

  body.classList.remove("light");
  main.classList.remove("light");
  darkmodeSwitch.classList.remove("light");
  darkmodeButton.classList.remove("light");
  darkmodeIcon.classList.remove("light");
  mainCube.classList.remove("light");

  body.classList.add(localStorage.getItem("mode"));
  main.classList.add(localStorage.getItem("mode"));
  darkmodeSwitch.classList.add(localStorage.getItem("mode"));
  darkmodeButton.classList.add(localStorage.getItem("mode"));
  darkmodeIcon.classList.add(localStorage.getItem("mode"));
  mainCube.classList.add(localStorage.getItem("mode"));

  darkmodeSwitch.addEventListener("click", function () {
    if (body.className === "dark") {
      localStorage.setItem("mode", "light");

      body.classList.add(localStorage.getItem("mode"));
      body.classList.remove("dark");

      main.classList.add(localStorage.getItem("mode"));
      main.classList.remove("dark");

      darkmodeSwitch.classList.add(localStorage.getItem("mode"));
      darkmodeSwitch.classList.remove("dark");

      darkmodeButton.classList.add(localStorage.getItem("mode"));
      darkmodeButton.classList.remove("dark");

      darkmodeIcon.classList.add(localStorage.getItem("mode"));
      darkmodeIcon.classList.remove("dark");

      mainCube.classList.add(localStorage.getItem("mode"));
      mainCube.classList.remove("dark");
    } else if (body.className === "light") {
      localStorage.setItem("mode", "dark");

      body.classList.add(localStorage.getItem("mode"));
      body.classList.remove("light");

      main.classList.add(localStorage.getItem("mode"));
      main.classList.remove("light");

      darkmodeSwitch.classList.add(localStorage.getItem("mode"));
      darkmodeSwitch.classList.remove("light");

      darkmodeButton.classList.add(localStorage.getItem("mode"));
      darkmodeButton.classList.remove("light");

      darkmodeIcon.classList.add(localStorage.getItem("mode"));
      darkmodeIcon.classList.remove("light");

      mainCube.classList.add(localStorage.getItem("mode"));
      mainCube.classList.remove("light");
    }
  });
};

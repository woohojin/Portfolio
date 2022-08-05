window.onload = function darkMode() {
  const main = document.getElementById("main");
  const mds = document.getElementById("main-dark_switch");
  const mdb = document.getElementById("main-dark_button");
  const body = document.querySelector("body");
  const mdi = document.getElementById("main-dark_icon");

  body.classList.remove("dark");
  main.classList.remove("dark");
  mds.classList.remove("dark");
  mdb.classList.remove("dark");
  mdi.classList.remove("dark");

  body.classList.remove("light");
  main.classList.remove("light");
  mds.classList.remove("light");
  mdb.classList.remove("light");
  mdi.classList.remove("light");

  body.classList.add(localStorage.getItem("mode"));
  main.classList.add(localStorage.getItem("mode"));
  mds.classList.add(localStorage.getItem("mode"));
  mdb.classList.add(localStorage.getItem("mode"));
  mdi.classList.add(localStorage.getItem("mode"));

  mds.addEventListener("click", function () {
    if (body.className === "dark") {
      localStorage.setItem("mode", "light");

      body.classList.add(localStorage.getItem("mode"));
      body.classList.remove("dark");

      main.classList.add(localStorage.getItem("mode"));
      main.classList.remove("dark");

      mds.classList.add(localStorage.getItem("mode"));
      mds.classList.remove("dark");

      mdb.classList.add(localStorage.getItem("mode"));
      mdb.classList.remove("dark");

      mdi.classList.add(localStorage.getItem("mode"));
      mdi.classList.remove("dark");
    } else if (body.className === "light") {
      localStorage.setItem("mode", "dark");

      body.classList.add(localStorage.getItem("mode"));
      body.classList.remove("light");

      main.classList.add(localStorage.getItem("mode"));
      main.classList.remove("light");

      mds.classList.add(localStorage.getItem("mode"));
      mds.classList.remove("light");

      mdb.classList.add(localStorage.getItem("mode"));
      mdb.classList.remove("light");

      mdi.classList.add(localStorage.getItem("mode"));
      mdi.classList.remove("light");
    }
  });
};

darkMode();

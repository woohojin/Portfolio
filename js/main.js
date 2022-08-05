function darkMode() {
  const main = document.getElementById("main");
  const mds = document.getElementById("main-dark_switch");
  const mdb = document.getElementById("main-dark_button");
  const body = document.querySelector("body");
  const mdi = document.getElementById("main-dark_icon");
  mds.addEventListener("click", function () {
    if (body.className === "dark") {
      body.classList.add("light");
      body.classList.remove("dark");

      main.classList.add("light");
      main.classList.remove("dark");

      mds.classList.add("light");
      mds.classList.remove("dark");

      mdb.classList.add("light");
      mdb.classList.remove("dark");

      mdi.classList.add("light");
      mdi.classList.remove("dark");
    } else if (body.className === "light") {
      body.classList.add("dark");
      body.classList.remove("light");

      main.classList.add("dark");
      main.classList.remove("light");

      mds.classList.add("dark");
      mds.classList.remove("light");

      mdb.classList.add("dark");
      mdb.classList.remove("light");

      mdi.classList.add("dark");
      mdi.classList.remove("light");
    }
  });
}

darkMode();

function mainName() {
  const mnd = document.querySelector("details");
  const mndt = document.getElementById("main-name_details_text");
  const mni = document.getElementById("main-name_icon");
  mnd.addEventListener("toggle", function () {
    mndt.textContent = "done";
    if (mni.className === "fa-solid fa-angle-up") {
      mni.className = "fa-solid fa-angle-down";
    } else {
      mni.className = "fa-solid fa-angle-up";
    }
  });
}

mainName();

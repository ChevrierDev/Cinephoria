document.addEventListener("DOMContentLoaded", () => {
  const selectTheaterBtn = document.getElementById("select-theater");
  const openTheaterMenu = document.getElementById("theater-menu");

  const theaterListItems = document.querySelectorAll("#theater-list li");
  const cinemaChoosen = document.getElementById("cinema-choosen");

  const openAlertBtn = document.getElementById("open-alert-btn");
  const alertMenu = document.getElementById("alert");
  const closeAlertBtn = document.getElementById("close-alert");

  selectTheaterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openTheaterMenu.classList.toggle("hidden");
  });

  theaterListItems.forEach((item) => {
    item.addEventListener("click", () => {
      cinemaChoosen.textContent = item.textContent;
      openTheaterMenu.classList.add("hidden");
    });
  });

  openAlertBtn.addEventListener("click", (e) => {
    e.preventDefault();
    scrollTo({
      top: 105,
      behavior: "smooth",
    });
    alertMenu.classList.toggle("hidden");
    alertMenu.classList.toggle("flex");
  });

  closeAlertBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alertMenu.classList.toggle("hidden");
    alertMenu.classList.toggle("flex");
  });
});

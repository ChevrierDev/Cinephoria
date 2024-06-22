document.addEventListener("DOMContentLoaded", () => {
  //emloyee confirmation alert pop up variable
  const validateBtn = document.getElementById("open-alert-btn");
  const confirmationMenu = document.getElementById("alert");
  const closeConfirmationMenuBtn = document.getElementById("close-alert");

  //emloyee confirmation alert pop up dropdown
  validateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    scrollTo({
      top: 415,
      behavior: "smooth",
    });
    confirmationMenu.classList.toggle("hidden");
  });

  closeConfirmationMenuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    confirmationMenu.classList.add("hidden");
  });
});

document.querySelectorAll('.file-input').forEach(input => {
  input.addEventListener('change', function () {
      const fileName = this.files[0].name;
      const label = this.previousElementSibling;
      label.innerText = fileName;
  });
});

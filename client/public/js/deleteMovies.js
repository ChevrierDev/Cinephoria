document.addEventListener("DOMContentLoaded", () => {
  const openDeleteAlertBtn = document.getElementById("open-delete-menu");
  const closeeleteAlertBtn = document.getElementById("close-delete-menu");
  const deleteAlert = document.getElementById("delete-alert");

  openDeleteAlertBtn.addEventListener("click", () => {
    deleteAlert.classList.toggle("hidden");
    deleteAlert.classList.toggle("flex");
  });

  closeeleteAlertBtn.addEventListener("click", () => {
    deleteAlert.classList.toggle("hidden");
    deleteAlert.classList.toggle("flex");
  });
});

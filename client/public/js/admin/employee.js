document.addEventListener("DOMContentLoaded", () => {
  const succesMsg = localStorage.getItem("assignation-succes");
  const msg = document.getElementById("confirmation-message");
  const txt = document.getElementById("confirmation-text");

  if (succesMsg) {
    txt.innerText = succesMsg;
  }

  msg.classList.remove("hidden");

  setTimeout(() => {
    msg.classList.add("hidden");
    localStorage.removeItem("assignation-succes");
  }, 6000);
});

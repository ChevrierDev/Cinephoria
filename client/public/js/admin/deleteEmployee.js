document.addEventListener("DOMContentLoaded", () => {
  //emloyee confirmation alert pop up variable
  const validateBtn = document.getElementById("open-alert-btn");
  const confirmationMenu = document.getElementById("alert");
  const closeConfirmationMenuBtn = document.getElementById("close-alert");

  //theater variable
  const selectTheaterBtn = document.getElementById("select-theater");
  const selectTheaterMenu = document.getElementById("theater-menu");
  const theaterList = document.querySelectorAll("#theater-list li");
  const choosenTheater = document.getElementById("cinema-choosen");

  //employee variable
  const selectEmployeesBtn = document.getElementById("select-employee");
  const selectEmployeesMenu = document.getElementById("employee-menu");
  const selectEmployeesList = document.querySelectorAll("#employee-list li");
  const choosenEmployees = document.getElementById("employee-choosen");

  //close menu if another open function
  const closeMenu = () => {
    selectEmployeesMenu.classList.add("hidden");
    selectTheaterMenu.classList.add("hidden");
  };

  //theater drop down script
  selectTheaterBtn.addEventListener("click", () => {
    const isHidden = selectTheaterMenu.classList.contains("hidden");
    closeMenu();
    if (isHidden) {
      selectTheaterMenu.classList.toggle("hidden");
    }
  });

  theaterList.forEach((item) => {
    item.addEventListener("click", () => {
      choosenTheater.textContent = item.textContent;
      selectTheaterMenu.classList.add("hidden");
    });
  });

  //employee drop down script
  selectEmployeesBtn.addEventListener("click", () => {
    const isHidden = selectEmployeesMenu.classList.contains("hidden");
    closeMenu();
    if (isHidden) {
      selectEmployeesMenu.classList.toggle("hidden");
    }
  });

  selectEmployeesList.forEach((item) => {
    item.addEventListener("click", () => {
      choosenEmployees.textContent = item.textContent;
      selectEmployeesMenu.classList.add("hidden");
    });
  });

  //emloyee confirmation alert pop up dropdown
  validateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    confirmationMenu.classList.toggle("hidden");
  });

  closeConfirmationMenuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    confirmationMenu.classList.add("hidden");
  });
});

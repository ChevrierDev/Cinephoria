document.addEventListener("DOMContentLoaded", () => {
  const selectTheaterBtn = document.getElementById("select-theater");
  const openTheaterMenu = document.getElementById("theater-menu");

  const employeeBtn = document.getElementById("select-employee");
  const choosenEmployee = document.getElementById("employee-choosen");
  const employeeMenu = document.getElementById("employee-menu");
  const employeeList = document.querySelectorAll("#employee-list li");

  const theaterListItems = document.querySelectorAll("#theater-list li");
  const cinemaChoosen = document.getElementById("cinema-choosen");

  const openAlertBtn = document.getElementById("open-alert-btn");
  const alertMenu = document.getElementById("alert");
  const closeAlertBtn = document.getElementById("close-alert");
  const submitFormBtn = document.getElementById("submit-form");

  const cinemaInput = document.getElementById("cinema-input");
  const employeeFirstNameInput = document.getElementById("employee-first-name");
  const employeeLastNameInput = document.getElementById("employee-last-name");

  let selectedCinema = null;
  let selectedEmployee = null;

  selectTheaterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openTheaterMenu.classList.toggle("hidden");
  });

  theaterListItems.forEach((item) => {
    item.addEventListener("click", () => {
      selectedCinema = item.textContent.trim();
      cinemaChoosen.textContent = selectedCinema;
      cinemaInput.value = selectedCinema;
      openTheaterMenu.classList.add("hidden");
    });
  });

  employeeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    employeeMenu.classList.toggle("hidden");
  });

  employeeList.forEach((item) => {
    item.addEventListener("click", () => {
      selectedEmployee = item.textContent.trim();
      choosenEmployee.textContent = selectedEmployee;
      const [firstName, lastName] = selectedEmployee.split(' ');
      employeeFirstNameInput.value = firstName.trim();
      employeeLastNameInput.value = lastName.trim(); 
      employeeMenu.classList.add("hidden");
    });
  });

  openAlertBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alertMenu.classList.toggle("hidden");
    alertMenu.classList.toggle("flex");
  });

  closeAlertBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alertMenu.classList.toggle("hidden");
    alertMenu.classList.toggle("flex");
  });

  submitFormBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Selected Cinema on submit:", selectedCinema);
    console.log("Selected Employee on submit:", selectedEmployee);

    if (selectedCinema && selectedEmployee) {
      document.querySelector("form").submit();
      localStorage.setItem('assignation-succes', 'Employer assigner avec succès.')
      window.location.href = "/dashboard/admin/employees"; 
    } else {
      alert("Veuillez sélectionner un cinéma et un employé.");
    }
  });
});

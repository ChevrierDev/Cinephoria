const currentPage = window.location.pathname;

if (currentPage === "/dashboard/admin/employees/update") {
  document.addEventListener("DOMContentLoaded", () => {
    const selectTheater = document.getElementById("select-theater");
    const theaterMenu = document.getElementById("theater-menu");
    const theaterListItems = document.querySelectorAll("#theater-list li");
    const selectEmployee = document.getElementById("select-employee");
    const employeeMenu = document.getElementById("employee-menu");
    const employeeList = document.getElementById("employee-list");
    const cinemaChosen = document.getElementById("cinema-choosen");
    const cinemaInput = document.getElementById("cinema-input");
    const employeeChosen = document.getElementById("employee-choosen");
    const employeeFirstNameInput = document.getElementById("employee-first-name");
    const employeeLastNameInput = document.getElementById("employee-last-name");
  
    // Toggle theater menu
    selectTheater.addEventListener("click", () => {
      theaterMenu.classList.toggle("hidden");
    });
  
    // Handle theater selection
    theaterListItems.forEach((item) => {
      item.addEventListener("click", () => {
        const cinemaName = item.textContent;
        cinemaChosen.textContent = cinemaName;
        cinemaInput.value = cinemaName;
        filterEmployeesByCinema(cinemaName);
        theaterMenu.classList.add("hidden");
      });
    });
  
    // Toggle employee menu
    selectEmployee.addEventListener("click", () => {
      employeeMenu.classList.toggle("hidden");
    });
  
    // Handle employee selection
    employeeList.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        const employeeName = event.target.textContent;
        const [firstName, lastName] = employeeName.split(" ");
        employeeChosen.textContent = employeeName;
        employeeFirstNameInput.value = firstName;
        employeeLastNameInput.value = lastName;
        employeeMenu.classList.add("hidden");
      }
    });
  
    function filterEmployeesByCinema(cinemaName) {
      fetch("/api/v1/getEmployeesByCinema", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cinema: cinemaName }),
      })
        .then((response) => response.json())
        .then((data) => {
          updateEmployeeDropdown(data.employees);
        })
        .catch((error) => console.error("Error:", error));
    }
  
    function updateEmployeeDropdown(employees) {
      employeeList.innerHTML = ""; // Vider la liste actuelle des employés
  
      if (employees.length !== 0) {
        employees.forEach((employee) => {
          const li = document.createElement("li");
          li.classList.add(
            "list-none",
            "hover:translate-x-5",
            "duration-200",
            "ease-out",
            "cursor-pointer",
            "hover:text-goldOne",
            "hover:scale-105"
          );
          li.textContent = `${employee.first_name} ${employee.last_name}`;
          li.addEventListener("click", () => {
            const [firstName, lastName] = li.textContent.split(" ");
            employeeChosen.textContent = li.textContent;
            employeeFirstNameInput.value = firstName;
            employeeLastNameInput.value = lastName;
            employeeMenu.classList.add("hidden");
          });
          employeeList.appendChild(li);
        });
      }
    }
  });
} else {
  document.addEventListener("DOMContentLoaded", () => {
    //theater variable
    const selectTheaterBtn = document.getElementById("select-theater");
    const selectTheaterMenu = document.getElementById("theater-menu");
    const theaterList = document.querySelectorAll("#theater-list li");
    const choosenTheater = document.getElementById("cinema-choosen");

    //confirm validation pop up alert variable
    const validateBtn = document.getElementById("validate-button");
    const alertMenu = document.getElementById("alert");
    const closeAlertMenu = document.getElementById("close-alert");

    //close menu if another open function
    const closeMenu = () => {
      selectTheaterMenu.classList.add("hidden");
    };

    //theater drop down script
    selectTheaterBtn.addEventListener("click", () => {
      selectTheaterMenu.classList.toggle("hidden");
    });

    theaterList.forEach((item) => {
      item.addEventListener("click", () => {
        choosenTheater.textContent = item.textContent;
        selectTheaterMenu.classList.add("hidden");
      });
    });

    // confirm validation pop up alert
    validateBtn.addEventListener("click", (e) => {
      e.preventDefault();
      closeMenu();
      scrollTo({
        top: 280,
        behavior: "smooth",
      });
      alertMenu.classList.toggle("hidden");
      alertMenu.classList.toggle("flex");
    });

    closeAlertMenu.addEventListener("click", (e) => {
      e.preventDefault();
      alertMenu.classList.add("hidden");
      alertMenu.classList.remove("flex");
    });
  });
}

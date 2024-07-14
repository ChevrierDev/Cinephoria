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
  const employeeIdInput = document.getElementById("employee-id");
  const openAlertBtn = document.getElementById("open-alert-btn");
  const alertMenu = document.getElementById("alert");
  const closeAlertBtn = document.getElementById("close-alert");
  const submitForm = document.getElementById("submit-form");
  const form = document.querySelector("form");
  let selectedEmployeeId = null;


  if (
    selectTheater &&
    theaterMenu &&
    selectEmployee &&
    employeeMenu &&
    employeeList &&
    cinemaChosen &&
    cinemaInput &&
    employeeChosen &&
    employeeIdInput &&
    openAlertBtn &&
    alertMenu &&
    closeAlertBtn &&
    submitForm &&
    form
  ) {
    const closeMenu = () => {
      theaterMenu.classList.add("hidden");
      employeeMenu.classList.add("hidden");
    };

    // Toggle theater menu
    selectTheater.addEventListener("click", () => {
      const isHidden = theaterMenu.classList.contains("hidden");
      closeMenu();
      if (isHidden) {
        theaterMenu.classList.toggle("hidden");
      }
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
      const isHidden = employeeMenu.classList.contains("hidden");
      closeMenu();
      if (isHidden) {
        employeeMenu.classList.toggle("hidden");
      }
    });

    // Handle employee selection
    employeeList.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        const employeeName = event.target.textContent;
        employeeChosen.textContent = employeeName;
        selectedEmployeeId = event.target.getAttribute("data-id");
        employeeIdInput.value = selectedEmployeeId;
        form.setAttribute(
          "action",
          `/api/v1/users/${selectedEmployeeId}?_method=DELETE`
        );
        employeeMenu.classList.add("hidden");
      }
    });

    // Handle delete confirmation
    openAlertBtn.addEventListener("click", () => {
        scrollTo({
            top:50,
            behavior: 'smooth'
        })
      if (selectedEmployeeId) {
        alertMenu.classList.remove("hidden");
      } else {
        alert("Veuillez sélectionner un employé à supprimer.");
      }
    });

    closeAlertBtn.addEventListener("click", () => {
      alertMenu.classList.add("hidden");
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
      employeeList.innerHTML = "";

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
          li.setAttribute("data-id", employee.user_id);
          li.addEventListener("click", () => {
            employeeChosen.textContent = li.textContent;
            employeeIdInput.value = li.getAttribute("data-id");
            selectedEmployeeId = li.getAttribute("data-id");
            form.setAttribute(
              "action",
              `/api/v1/users/${selectedEmployeeId}?_method=DELETE`
            );
            employeeMenu.classList.add("hidden");
          });
          employeeList.appendChild(li);
        });
      }
    }
  } else {
    console.error("Un ou plusieurs éléments DOM requis sont manquants.");
  }
});

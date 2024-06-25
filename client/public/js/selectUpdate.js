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
    const employeeFirstNameInput = document.getElementById(
      "employee-first-name"
    );
    const employeeLastNameInput = document.getElementById("employee-last-name");
    const validateBtn = document.getElementById("validate-btn");
    let selectedEmployeeId = null;

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
        const [firstName, lastName] = employeeName.split(" ");
        employeeChosen.textContent = employeeName;
        employeeFirstNameInput.value = firstName;
        employeeLastNameInput.value = lastName;
        selectedEmployeeId = event.target.getAttribute("data-id");
        console.log(selectedEmployeeId);
        validateBtn.href = `/dashboard/admin/employees/updateEmployee/${selectedEmployeeId}`;
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
            const [firstName, lastName] = li.textContent.split(" ");
            employeeChosen.textContent = li.textContent;
            employeeFirstNameInput.value = firstName;
            employeeLastNameInput.value = lastName;
            selectedEmployeeId = li.getAttribute("data-id");
            console.log(selectedEmployeeId);
            validateBtn.href = `/dashboard/admin/employees/updateEmployee/${selectedEmployeeId}`;
            employeeMenu.classList.add("hidden");
          });
          employeeList.appendChild(li);
        });
      }
    }
  });
} else {
  document.addEventListener("DOMContentLoaded", () => {
    const updateForm = document.getElementById("update-form");
    const errorList = document.getElementById("error-list");
    const validateBtn = document.getElementById("validate-button");
    const alertMenu = document.getElementById("alert");
    const closeAlertMenu = document.getElementById("close-alert");
    const submitFormBtn = document.getElementById("submit-form");

    const closeMenu = () => {
      if (alertMenu) {
        alertMenu.classList.add("hidden");
      }
    };

    const validateForm = () => {
      const errors = [];
      const passwordInput = updateForm.querySelector("input[name='password']");
      const confirmPasswordInput = updateForm.querySelector(
        "input[name='confirmPassword']"
      );

      if (!passwordInput || !confirmPasswordInput) {
        errors.push("Les champs de mot de passe ne sont pas disponibles.");
      } else {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const passwordPattern =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_!@#\$%\^&\*])[A-Za-z\d-_!@#\$%\^&\*]{8,}$/;

        if (!passwordPattern.test(password)) {
          errors.push(
            "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre, un caractère spécial, et être d'au moins 8 caractères."
          );
        }

        if (password !== confirmPassword) {
          errors.push("Les mots de passe ne correspondent pas.");
        }
      }

      if (errors.length > 0) {
        errorList.innerHTML = "";
        errors.forEach((error) => {
          const li = document.createElement("li");
          li.textContent = error;
          li.classList.add("font-arvo", "text-sm", "text-redOne", "list-disc");
          errorList.appendChild(li);
        });
        errorList.classList.remove("hidden");
        return false;
      } else {
        errorList.classList.add("hidden");
        return true;
      }
    };

    validateBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (validateForm()) {
        alertMenu.classList.toggle("hidden");
        alertMenu.classList.toggle("flex");
      }
    });

    closeAlertMenu.addEventListener("click", (e) => {
      e.preventDefault();
      closeMenu();
    });

    submitFormBtn.addEventListener("click", (e) => {
      if (!validateForm()) {
        e.preventDefault();
      }
    });

    updateForm.addEventListener("submit", (event) => {
      const inputs = updateForm.querySelectorAll("input[placeholder]");
      inputs.forEach((input) => {
        if (!input.value) {
          input.value = input.placeholder;
        }
      });

      setTimeout(() => {
        window.location.href = "/dashboard/admin/employees";
      }, 500);
    });
  });
}

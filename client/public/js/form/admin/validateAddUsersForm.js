document.addEventListener("DOMContentLoaded", () => {
  const alertBtn = document.getElementById("confirmbtn");
  const alert = document.getElementById("alert");
  const closeAlert = document.getElementById("close-delete-menu");
  const confirm = document.getElementById("confirm");
  const employeeForm = document.getElementById("employee-form");

  const showErrors = (errors) => {
    const errorList = document.getElementById("error-list");
    errorList.innerHTML = "";
    errorList.classList.remove("hidden");
    errors.forEach((error) => {
      const li = document.createElement("li");
      li.classList.add("font-arvo", "text-sm", "text-redOne", "list-disc");
      li.innerText = error;
      errorList.appendChild(li);
    });
    setTimeout(() => {
      errorList.classList.add("hidden");
    }, 6000);
  };

  const validateForm = () => {
    const firstName = document.getElementById("first_name").value.trim();
    const lastName = document.getElementById("last_name").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document
      .getElementById("confirm_password")
      .value.trim();

    const errors = [];
    if (!firstName) {
      errors.push("Le prénom est obligatoire.");
    }
    if (!lastName) {
      errors.push("Le nom est obligatoire.");
    }
    if (!username) {
      errors.push("Le nom d'utilisateur est obligatoire.");
    }
    if (!email) {
      errors.push("L'adresse email est obligatoire.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push("L'adresse email n'est pas valide.");
    }
    if (!password) {
      errors.push("Le mot de passe est obligatoire.");
    } else if (password.length > 50) {
      errors.push("Le mot de passe ne doit pas dépasser 50 caractères.");
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_!@#$%^&*]).{8,}/.test(password)
    ) {
      errors.push(
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial."
      );
    }
    if (!confirmPassword) {
      errors.push("La confirmation du mot de passe est obligatoire.");
    } else if (confirmPassword !== password) {
      errors.push("Les mots de passe ne correspondent pas.");
    }

    return errors;
  };

  alertBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert.classList.remove("hidden");
    alert.classList.add("flex");
  });

  closeAlert.addEventListener("click", (e) => {
    e.preventDefault();
    alert.classList.remove("flex");
    alert.classList.add("hidden");
  });

  confirm.addEventListener("click", async (e) => {
    e.preventDefault();
    scrollTo({
      top:0
    })
    const errors = validateForm();
    if (errors.length > 0) {
      showErrors(errors);
      alert.classList.remove("flex");
      alert.classList.add("hidden");
    } else {
      const formData = new FormData(employeeForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("/api/v1/employee", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          localStorage.setItem(
            "success-message",
            "Employer créer avec succès."
          );
          window.location.reload();
        } else {
          const errorData = await response.json();
          showErrors([
            errorData.message ||
              "Une erreur s'est produite lors de la création de l'employé.",
          ]);
        }
      } catch (error) {
        showErrors([
          "Une erreur s'est produite lors de la création de l'employé.",
        ]);
      }
    }
  });
});

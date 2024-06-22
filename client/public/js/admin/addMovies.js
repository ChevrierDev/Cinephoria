currentPage = window.location.pathname;
if (currentPage === "/dashboard/admin/films") {
  document.addEventListener("DOMContentLoaded", () => {
    const confirmationMessage = localStorage.getItem("confirmationMessage");
    if (confirmationMessage) {
      const messageElement = document.getElementById("confirmation-message");
      const textElement = document.getElementById("confirmation-text");
      textElement.innerText = confirmationMessage;
      messageElement.classList.remove("hidden");
      messageElement.classList.add("flex");

      setTimeout(() => {
        messageElement.classList.add("hidden");
        messageElement.classList.remove("flex");
        localStorage.removeItem("confirmationMessage");
      }, 6000);
    }
  });
} else {
  document.addEventListener("DOMContentLoaded", () => {
    const validateBtn = document.getElementById("open-alert-btn");
    const confirmationMenu = document.getElementById("alert");
    const closeConfirmationMenuBtn = document.getElementById("close-alert");
    const submitFormBtn = document.getElementById("submit-form");
    const form = document.getElementById("movie-form");
    const errorList = document.getElementById("error-list");
    const inputs = {
      title: document.getElementById("title-input"),
      genre: document.getElementById("genre-input"),
      pg: document.getElementById("pg-input"),
      duration: document.getElementById("duration-input"),
      releaseDate: document.getElementById("release-date-input"),
      casting: document.getElementById("casting-input"),
      description: document.getElementById("description-input"),
      image: document.getElementById("file-upload-1"),
      cover: document.getElementById("file-upload-2"),
      video: document.getElementById("file-upload-3"),
      favorite: document.getElementById("favorite-input"),
    };

    const validateInputs = () => {
      const errors = [];

      if (!inputs.title.value.trim()) errors.push("Le titre est obligatoire.");
      if (!inputs.genre.value.trim()) errors.push("Le genre est obligatoire.");
      if (!inputs.pg.value.trim() || isNaN(inputs.pg.value) || inputs.pg.value < 0)
        errors.push("La classification PG doit être un entier.");
      if (!inputs.duration.value.trim() || isNaN(inputs.duration.value) || inputs.duration.value <= 0)
        errors.push("La durée doit être un entier positif.");
      if (!inputs.releaseDate.value.trim()) errors.push("La date de sortie est obligatoire.");
      if (!inputs.casting.value.trim()) errors.push("Le casting est obligatoire.");
      if (!inputs.description.value.trim()) errors.push("La description est obligatoire.");
      if (!inputs.image || !inputs.image.files.length) errors.push("L'image est obligatoire.");
      if (!inputs.cover || !inputs.cover.files.length) errors.push("La photo de couverture est obligatoire.");
      if (!inputs.video || !inputs.video.files.length) errors.push("La vidéo est obligatoire.");
      if (inputs.favorite.value.trim() && isNaN(inputs.favorite.value))
        errors.push("La note doit être un nombre.");

      return errors;
    };

    const displayErrors = (errors) => {
      errorList.innerHTML = "";

      errors.forEach((error) => {
        const li = document.createElement("li");
        li.classList.add("font-arvo", "text-sm", "text-redOne", "list-disc");
        li.innerText = error;
        errorList.appendChild(li);
      });
      scrollTo({
        top: 150,
        behavior: "smooth",
      });
      errorList.classList.remove("hidden");
      errorList.classList.add("flex");
      setTimeout(() => {
        errorList.classList.add("hidden");
        errorList.classList.remove("flex");
      }, 6000);
    };

    validateBtn.addEventListener("click", (e) => {
      e.preventDefault();
      scrollTo({
        top: 400,
        behavior: 'smooth'
      })
      const errors = validateInputs();
      if (errors.length) {
        displayErrors(errors);
        return;
      }
      confirmationMenu.classList.toggle("hidden");
      errorList.classList.add("hidden");
    });

    closeConfirmationMenuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      confirmationMenu.classList.add("hidden");
    });

    submitFormBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      submitFormBtn.disabled = true; // Désactiver le bouton de soumission

      const formData = new FormData(form);
      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
        });
        if (response.ok) {
          localStorage.setItem("confirmationMessage", "Le film a bien été ajouté");
          window.location.href = "/dashboard/admin/films";
        } else {
          const result = await response.json();
          const errors = result.errors || ["Une erreur s'est produite lors de l'envoi du formulaire."];
          displayErrors(errors);
          submitFormBtn.disabled = false; // Réactiver le bouton de soumission en cas d'erreur
        }
      } catch (error) {
        displayErrors(["Une erreur s'est produite lors de l'envoi du formulaire."]);
        submitFormBtn.disabled = false; // Réactiver le bouton de soumission en cas d'erreur
      }
    });

    document.querySelectorAll(".file-input").forEach((input) => {
      input.addEventListener("change", function () {
        const fileName = this.files[0].name;
        const label = this.previousElementSibling;
        label.innerText = fileName;
      });
    });
  });
}

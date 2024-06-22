document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("nav .nav a");
  const aLinks = document.querySelectorAll("a[href]");
  const globalPath = window.location.pathname;

  function setActiveLink(path) {
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === path) {
        link.parentElement.classList.add("active");
      }
    });
  }

  function sideBarSetActiveLink(path) {
    aLinks.forEach((link) => {
      if (link.getAttribute("href") === path) {
        const button = link.querySelector("button");
        if (button) {
          button.classList.add("bg-goldOne");
        }
      }
    });
  }

  //navBar active link
  if (globalPath === "/" || globalPath.startsWith("/accueil")) {
    setActiveLink("/accueil");

  } else if (globalPath.startsWith("/films")) {
    setActiveLink("/films");

  } else if (globalPath.startsWith("/contact")) {
    setActiveLink("/contact");

  } else if (
    globalPath.startsWith("/login") ||
    globalPath.startsWith("/reset")
  ) {
    setActiveLink("/login");

  } else if (globalPath.startsWith("/register")) {
    setActiveLink("/register");
  }

  // Dashboard admin active link
  if (globalPath.startsWith("/dashboard/admin/films")) {
    setActiveLink("/dashboard/admin");
    sideBarSetActiveLink("/dashboard/admin/films");

  } else if (globalPath.startsWith("/dashboard/admin/rooms")) {
    setActiveLink("/dashboard/admin");
    sideBarSetActiveLink("/dashboard/admin/rooms");

  } else if (globalPath.startsWith("/dashboard/admin/showtimes")) {
    setActiveLink("/dashboard/admin");
    sideBarSetActiveLink("/dashboard/admin/showtimes");

  } else if (globalPath.startsWith("/dashboard/admin/employees")) {
    setActiveLink("/dashboard/admin");
    sideBarSetActiveLink("/dashboard/admin/employees");

  } else if (globalPath.startsWith("/dashboard/admin")) {
    setActiveLink("/dashboard/admin");
    sideBarSetActiveLink("/dashboard/admin");

    //dahsboard employee active link
  } else if (globalPath.startsWith("/dashboard/employee")) {
    setActiveLink("/dashboard/employee");
    sideBarSetActiveLink("/dashboard/employee");

  } else if (globalPath.startsWith("/dashboard/employee/rooms")) {
    sideBarSetActiveLink("/dashboard/employee/rooms");

  } else if (globalPath.startsWith("/dashboard/employee/review")) {
    sideBarSetActiveLink("/dashboard/employee");

  } else if (globalPath.startsWith("/dashboard/employee/showtimes")) {
    sideBarSetActiveLink("/dashboard/employee/showtimes");

  } else if (globalPath.startsWith("/reservation")) {
    setActiveLink("/reservation");
  }
  
});

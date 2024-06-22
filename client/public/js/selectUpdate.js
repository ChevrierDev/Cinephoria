const currentPage = window.location.pathname

if (currentPage === '/dashboard/admin/employees/update') {
    document.addEventListener("DOMContentLoaded", () => {
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
          };
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
    });
      
} else {
    document.addEventListener('DOMContentLoaded', () => {
        //theater variable
        const selectTheaterBtn = document.getElementById("select-theater");
        const selectTheaterMenu = document.getElementById("theater-menu");
        const theaterList = document.querySelectorAll("#theater-list li");
        const choosenTheater = document.getElementById("cinema-choosen");

        //confirm validation pop up alert variable 
        const validateBtn = document.getElementById('validate-button');
        const alertMenu = document.getElementById('alert');
        const closeAlertMenu = document.getElementById('close-alert');

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
        validateBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeMenu();
            scrollTo({
                top:280,
                behavior: 'smooth'
            })
            alertMenu.classList.toggle('hidden');
            alertMenu.classList.toggle('flex');
        })

        closeAlertMenu.addEventListener('click', (e) => {
            e.preventDefault();
            alertMenu.classList.add('hidden');
            alertMenu.classList.remove('flex');
        })
    })
}


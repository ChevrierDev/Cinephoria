document.addEventListener('DOMContentLoaded', () => {
    const footer = document.getElementById('footer');
    const currentPage = window.location.pathname;

    const adjustFooter = () => {
      switch (currentPage) {
        case '/dashboard/users':
        case '/dashboard/users/reviews-form':
          if (window.innerWidth <= 738) {
            footer.classList.remove('right-0', 'w-[85vw]', 'absolute', 'bottom-[-200px]');
            footer.classList.add('left-0', 'w-full', 'absolute', 'bottom-0');
          } else {
            footer.classList.remove('left-0', 'w-full', 'absolute', 'bottom-0', 'bottom-[-200px]');
            footer.classList.add('right-0', 'w-[85vw]', 'absolute', 'bottom-0');
          }
          break;
        case '/dashboard/admin':
        case '/dashboard/admin/films':
        case '/dashboard/admin/rooms':
        case '/dashboard/admin/employees':
        case '/dashboard/admin/films/add':
        case '/dashboard/admin/films/select-update':
        case '/dashboard/admin/films/update':
        case '/dashboard/admin/films/delete-selection':
          if (window.innerWidth <= 738) {
            footer.classList.remove('right-0', 'w-[85vw]', 'absolute', 'bottom-[-200px]');
            footer.classList.add('left-0', 'w-full', 'absolute', 'bottom-0');
          } else {
            footer.classList.remove('left-0', 'w-full', 'absolute', 'bottom-0', 'bottom-[-200px]');
            footer.classList.add('right-0', 'w-[85vw]', 'absolute', 'bottom-0');
          }
          break;
        default:
          footer.classList.remove('right-0', 'w-[85vw]', 'absolute', 'bottom-0', 'left-0', 'w-full', 'fixed', 'bottom-0');
          footer.classList.add('w-full', 'absolute', 'bottom-[-200px]');
          break;
        }
    };

    adjustFooter();

    window.addEventListener('resize', adjustFooter);
    window.addEventListener('load', adjustFooter);
});

document.addEventListener('DOMContentLoaded', () => {
    const footer = document.getElementById('footer');
    const currentPage = window.location.pathname;

    const adjustFooter = () => {
        if (currentPage === '/dashboard/users') {
            if (window.innerWidth <= 738) {
                footer.classList.remove('right-0', 'w-[85vw]', 'absolute', 'bottom-[-200px]');
                footer.classList.add('left-0', 'w-full', 'absolute', 'bottom-0');
            } else {
                footer.classList.remove('left-0', 'w-full', 'absolute', 'bottom-0', 'bottom-[-200px]');
                footer.classList.add('right-0', 'w-[85vw]', 'absolute', 'bottom-0');
            }
        } else {
            footer.classList.remove('right-0', 'w-[85vw]', 'absolute', 'bottom-0', 'left-0', 'w-full', 'fixed', 'bottom-0');
            footer.classList.add('w-full', 'absolute', 'bottom-[-200px]');
        }
    };

    adjustFooter();

    window.addEventListener('resize', adjustFooter);
    window.addEventListener('load', adjustFooter);
});

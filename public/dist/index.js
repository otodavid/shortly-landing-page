const mobileMenu = document.querySelector('.mobile-nav');

mobileMenu.addEventListener('click', () => {
    const headerNav = document.getElementById('header-nav');

    if(headerNav.classList.contains('hidden')) {
        headerNav.classList.remove('hidden');
    } else {
        headerNav.classList.add('hidden');
    }
})
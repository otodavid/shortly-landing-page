const mobileMenu = document.querySelector('.mobile-nav');

mobileMenu.addEventListener('click', () => {
    const headerNav = document.getElementById('header-nav');
    const nava = document.querySelector('#header-nav > div')

    if(headerNav.classList.contains('opacity-0')) {
        headerNav.classList.remove('opacity-0', 'left-full');
    } else {
        headerNav.classList.add('opacity-0', 'left-full');
    }
})
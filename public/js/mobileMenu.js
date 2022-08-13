const menuBtn = document.querySelector('.menu-mobile');
const navMenu = document.querySelector('.nav-menu');
const searchMobile = document.querySelector('.search-mobile');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active-menu');
    document.body.classList.toggle('stop-scrolling');
    menuBtn.classList.toggle('active-menu');
})

searchMobile.addEventListener('click', () => {
    searchoverlay.classList.toggle('active');
    document.body.classList.add('stop-scrolling');
    navMenu.classList.remove('active-menu');
    menuBtn.classList.toggle('active-menu');
})
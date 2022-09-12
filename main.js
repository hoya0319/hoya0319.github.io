const toggleBtn = document.querySelector('.navbarBtn')
const menu = document.querySelector('.navbar_menu')
toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
});
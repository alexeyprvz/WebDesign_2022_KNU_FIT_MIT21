// let search = document.querySelector('.search-box');

// document.querySelector('#search-icon').onclick = () => {
//     search.classList.toggle('active');
// }

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = () => {
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
}


//navbar

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = () => {
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
}







//adding tea

async function addTea(id, title, type, img) {
    let tea = document.createElement('div')
    tea.className = "box";
    let teaContainer = document.querySelector('.items-container')

    let teadiv = `
        <img src="${img}" alt="" class="i-image">
        <h3 class="i-title">${id}. ${title}</h3>
        <div class="content">
            <span>Тип:</span>
            <p class="i-type">${type}</p>
        </div>`
    tea.innerHTML = teadiv;
    teaContainer.append(tea);
}

async function getTeaData() 
{
    fetch("http://localhost:3000/tea").then(
        (res)=>{
            return res.text()
        }
    ).then((text)=>{
        let teaArray = JSON.parse(text)
        teaArray.forEach(el => {

            id = `${el.id}`
            title =`${el.title}`
            type = `${el.type}`
            img = `${el.image_link}`

            addTea(id, title, type, img)
        })
    })
}

getTeaData();
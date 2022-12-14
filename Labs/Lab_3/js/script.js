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

//cart

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('rmv-btn')
    //console.log(removeCartItemButtons)
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var qttInputs = document.getElementsByClassName('item-qtt')
    for (var i = 0; i < qttInputs.length; i++) {
        var input = qttInputs[i]
        input.addEventListener('change', qttChanged)
    }

    var addToCartButtons = document.getElementsByClassName('buy-btn')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function qttChanged(event) {
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('i-title')[0].innerText
    var weight = shopItem.getElementsByClassName('i-weight')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('i-image')[0].src
    //console.log(title, weight, imageSrc)
    addItemToCart(title, weight, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, weight, imageSrc) {
    var cartItem = document.createElement('div')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('i-title')
    for (var i = 0; i < cartItemNames.length; i++){
        if (cartItemNames[i].innerText == title){
            alert('???? ?????????????? ?????? ???????????? ???? ????????????')
            return
        }
    }
    var cartItemContents = `
        <div class="box">
            <img src="${imageSrc}" alt="" class="i-image">
            <h3 class="i-title">${title}</h3>
            <div class="content">
                <p class="weight">${weight}</p>
                <input type="number" class="item-qtt" value="1">
                <button class="rmv-btn" type="button">????????????????</button>
            </div>
        </div>`
    cartItem.innerHTML = cartItemContents
    cartItems.append(cartItem)
    cartItem.getElementsByClassName('rmv-btn')[0].addEventListener('click', removeCartItem)
    cartItem.getElementsByClassName('item-qtt')[0].addEventListener('click', qttChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartItems = cartItemContainer.getElementsByClassName('box')
    var total = 0
    for (var i = 0; i < cartItems.length; i++){
        console.log(cartItems.length)
        var cartItem = cartItems[i]
        var weightElement = cartItem.getElementsByClassName('weight')[0]
        var qttElement = cartItem.getElementsByClassName('item-qtt')[0]
        console.log(weightElement, qttElement)
        var weight = parseFloat(weightElement.innerText.replace(' ??', ''))
        var qtt = qttElement.value
        total = total + (weight * qtt)

    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-weight')[0].innerText = total + ' ??'
}
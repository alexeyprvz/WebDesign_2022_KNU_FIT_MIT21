// let search = document.querySelector('.search-box');
// document.querySelector('#search-icon').onclick = () => {
//     search.classList.toggle('active');
// }

let navbar = document.querySelector(".navbar");

document.querySelector("#menu-icon").onclick = () => {
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
};

//cart

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName("rmv-btn");
  //console.log(removeCartItemButtons)
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var qttInputs = document.getElementsByClassName("item-qtt");
  for (var i = 0; i < qttInputs.length; i++) {
    var input = qttInputs[i];
    input.addEventListener("change", qttChanged);
  }

  var addToCartButtons = document.getElementsByClassName("buy-btn");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function qttChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("i-title")[0].innerText;
  var weight = shopItem.getElementsByClassName("i-weight")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("i-image")[0].src;
  //console.log(title, weight, imageSrc)
  addItemToCart(title, weight, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, weight, imageSrc) {
  var cartItem = document.createElement("div");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("i-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("Цю позицію вже додано до кошика");
      return;
    }
  }
  var cartItemContents = `
        <div class="box">
            <img src="${imageSrc}" alt="" class="i-image">
            <h3 class="i-title">${title}</h3>
            <div class="content">
                <p class="weight">${weight}</p>
                <input type="number" class="item-qtt" value="1">
                <button class="rmv-btn" type="button">Прибрати</button>
            </div>
        </div>`;
  cartItem.innerHTML = cartItemContents;
  cartItems.append(cartItem);
  cartItem
    .getElementsByClassName("rmv-btn")[0]
    .addEventListener("click", removeCartItem);
  cartItem
    .getElementsByClassName("item-qtt")[0]
    .addEventListener("click", qttChanged);
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartItems = cartItemContainer.getElementsByClassName("box");
  var total = 0;
  for (var i = 0; i < cartItems.length; i++) {
    console.log(cartItems.length);
    var cartItem = cartItems[i];
    var weightElement = cartItem.getElementsByClassName("weight")[0];
    var qttElement = cartItem.getElementsByClassName("item-qtt")[0];
    console.log(weightElement, qttElement);
    var weight = parseFloat(weightElement.innerText.replace(" г", ""));
    var qtt = qttElement.value;
    total = total + weight * qtt;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-weight")[0].innerText =
    total + " г";
}

//comments

async function addVolunteer(title, body, imgSrc) {
  var volunteer = document.createElement("div");
  var volunteersContainer = document.querySelector(".volunteers-container");
  var volunteerContent = `
        <div class="volunteer-box">
            <h3>${title}</h3>
            <div class="volunteer-content">
                <p>${body}</p>
                <div class="volunteer-img">
                    <img src="${imgSrc}" alt="">
                </div>
            </div>
        </div>`;
  volunteer.innerHTML = volunteerContent;
  volunteersContainer.append(volunteer);
}

var users_qtt = 5;

async function getData() {
  let response_photos = await fetch(
    `https://randomuser.me/api/?nat=ua&results=${users_qtt}`
  ) // nat - національність
    .then((res) => res.json())
    .then((json) => json.results);

  let response = await fetch(
    `https://dummyjson.com/posts?skip=20&limit=${users_qtt}`
  )
    .then((res) => res.json())
    .then((json) => json.posts);
  console.log(response);

  for (var el = 0; el < users_qtt; el++) {
    var title = response[el].title;
    var body = response[el].body;
    //var imgSrc = `./imgs/people/vlntr_${el + 1}.jpg`; //фото з папки
    let imgSrc = `${response_photos[el].picture.large}`; //фото людей api
    addVolunteer(title, body, imgSrc);
  }
  console.log(response_photos[el].picture.large);
}

getData();

//weather

navigator.geolocation.getCurrentPosition(
  function (position) {
    console.log(position);
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    fetchWeather(lat, lon);
  },
  function (e) {
    switch (e.code) {
      case e.PERMISSION_DENIED:
        alert("Погода: Користувач не дозволив визначити місце розташування.");
        break;
      case e.TIMEOUT:
        alert(
          "Погода:Час очікування браузером на визначення місця розташування минув."
        );
        break;
      case e.POSITION_UNAVAILABLE:
        alert("Погода: Інформація про місце  розташування недоступна.");
        break;
      case e.UNKNOWN_ERROR:
        alert(
          "Погода: Виникла невідома помилка визначення місця розташування."
        );
        break;
      default:
        alert("Weather Error.code: " + e.code + " Error.message: " + e.message);
        break;
    }
    document.querySelector(".weather").remove();
  }
);

function fetchWeather(lat, lon) {
  let response_weather = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8145fb29dbb62cd37815faa27e248348`
  )
    .then((res) => res.json())
    .then((data) => weatherSettings(data));
  console.log(response_weather);
}

function weatherSettings(data) {
  console.log(data);
  document.querySelector(".weather-city-name").textContent =
    data.name + ", " + data.sys.country;
  document.querySelector(".weather-temp").textContent =
    Math.round((data.main.temp - 273) * 10) / 10 + "°";
  document.querySelector(".weather-clouds").textContent =
    data.weather[0].description;
  document.querySelector(
    ".weather-clouds-icon"
  ).innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
}

'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);




/**
 * header active
 */

const header = document.querySelector("[data-header]");

const activeHeader = function () {
  if (window.scrollY > 300) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeHeader);



/**
 * toggle active on add to fav
 */

const addToFavBtns = document.querySelectorAll("[data-add-to-fav]");

const toggleActive = function () {
  this.classList.toggle("active");
}

addEventOnElem(addToFavBtns, "click", toggleActive);



/**
 * scroll revreal effect
 */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 1.5) {
      sections[i].classList.add("active");
    } else {
      sections[i].classList.remove("active");
    }
  }
}

function currency_exchange(){
  window.location.href = "coin1.html";

}
scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);

fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h")

.then(
  res=>{
      res.json().then(
          data=>{
            var count=0;
              console.log(data);

              var temp="";
              data.forEach((itemData)=>{
                  temp+="<tr>";
                  temp+="<th>Rank</th>";
                  temp+="<th>Name</th>";
                  temp+="<th>Current Price</th>";
                  temp+="<th>Price change 24h</th>";
                  temp+="<th>Market Cap</th></tr>";
                  temp+="<tr>";
                  temp+="<td>"+(count+1)+"</td>";
                  temp+="<td>"+itemData.name+"</td>";
                  temp+="<td>"+itemData.current_price+"</td>";
                  temp+="<td>"+parseFloat(itemData.price_change_24h).toFixed(2)+"%</td>";
                  temp+="<td>"+itemData.market_cap+"</td>";
                  temp+="<td><button class=btn btn-outline onclick='currency_exchange()'>Trade</button>"+"</td>"
                  count+=1;
              });
              document.getElementById('market-table1').innerHTML=temp;
          }
      )
  }
)



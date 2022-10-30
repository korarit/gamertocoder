async function get_json(url){
  const file = await fetch(url);
  const json = await file.json();

  return json;
}

async function random_assets (){
  //สุ่ม background image จาก backend
  const background = await get_json('/json/background.json');
  //console.log(background["background"])
  var random_background = Math.floor(Math.random() * ((background["background"].length - 1) - 0 + 1)) + 0;
  document.getElementById("body_main").setAttribute("background", background["background"][random_background]);

  //สุ่ม ตัวละคร
  const characters = await get_json('/json/characters.json');
  var random_character = Math.floor(Math.random() * ((characters["characters"].length - 1) - 0 + 1)) + 0;
  document.getElementById("character_speak").setAttribute("src", characters["characters"][random_character]);

}

//scoll animation
function scoll_animation() {
    var reveals = document.querySelectorAll(".play-animation");
  
    //scoll down animation
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
       // reveals[i].classList.add("animatedFadeInUp");
        reveals[i].classList.add("fadeInUp");

      } else {
        //reveals[i].classList.remove("animatedFadeInUp");
        reveals[i].classList.remove("fadeInUp");
      }
    }
}

function click_toLayout(id){
  var layout = document.querySelectorAll(".layout");
  var elementTop = layout[id].getBoundingClientRect().top;
  
  document.body.scrollTop = elementTop;
  document.documentElement.scrollTop = elementTop;
}

function nav_sticky(){
  var navbar = document.getElementById("navbar-body");

  if (window.pageYOffset > 0) {
    navbar.classList.add("is-top")
  } else {
    navbar.classList.remove("is-top");
  }

  //console.log("pageY:"+window.pageYOffset+" sticky:"+navbar.offsetTop)

}
window.addEventListener("scroll", scoll_animation);
window.addEventListener("scroll", nav_sticky);


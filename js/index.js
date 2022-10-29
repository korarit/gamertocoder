async function random_assets (){
    //สุ่ม background image จาก backend
    const background = await fetch('/json/background.json');
    const background_json = await background.json();

    console.log(background_json["background"])
    var random = Math.floor(Math.random() * ((background_json["background"].length - 1) - 0 + 1)) + 0;
    
    document.getElementById("body_main").setAttribute("background", background_json["background"][random]);

    //สุ่ม logo
    const logo = await fetch('/json/logo.json');
    const logo_json = await logo.json();
}

//scoll animation
function scoll_animation() {
    var reveals = document.querySelectorAll(".animated");
  
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

function nav_sticky(){
  var navbar = document.getElementById("navbar-body");
  var sticky = navbar.offsetTop;

  if (window.pageYOffset > 0) {
    navbar.classList.add("is-top")
  } else {
    navbar.classList.remove("is-top");
  }

  console.log("pageY:"+window.pageYOffset+" sticky:"+navbar.offsetTop)

}
window.addEventListener("scroll", scoll_animation);
window.addEventListener("scroll", nav_sticky);
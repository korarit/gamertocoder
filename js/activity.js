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

  //สุ่ม wallpaper card background
  const wallpaper = await get_json('/json/wallpapers.json');
  var wallpaper_character1 = Math.floor(Math.random() * ((wallpaper["wallpaper"].length - 1) - 0 + 1)) + 0;
  var wallpaper_character2 = Math.floor(Math.random() * ((wallpaper["wallpaper"].length - 1) - 0 + 1)) + 0;

  //ตรวจสอบภาพ wallpaper ว่าซ้ำไหม
  if(wallpaper_character1 != wallpaper_character2){
    document.getElementById("wallpaper1").setAttribute("src", wallpaper["wallpaper"][wallpaper_character1]);
    document.getElementById("wallpaper2").setAttribute("src", wallpaper["wallpaper"][wallpaper_character2]);
  }else{
    random_assets()
  }
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


//login modal
function showModal(id){
  var modal = document.getElementById(id);
  modal.style.display = "block";

  document.querySelector("#body_main").classList.add("stop-scroll");
}

function closeModal(id){
  var modal = document.getElementById(id);
  modal.style.display = "none";

  document.querySelector("#body_main").classList.remove("stop-scroll");
}

function checkLogin(){
  if(localStorage.getItem("login") === null){
    showModal("LoginModal");
    document.getElementById("UserButton").style.display = "none";
  }else{
    document.getElementById("UserButton").style.display = "block";
  }
}

function summitLogin(type, id){
  var data = {};
  data["type"] = type;
  data["id"] = id;

  localStorage.setItem("login", JSON.stringify(data));
  closeModal("LoginModal");

  document.getElementById("UserButton").style.display = "block";
}

function logout(){
  localStorage.removeItem("login");

  showModal("LoginModal");

  //ปิดการแสดงส่วน menu user ทั้งหมด
  document.getElementById("UserButton").style.display = "none";
  document.getElementById("Close_userMenu").style.display = "none";
  document.getElementById("user-menu").style.display = "none";
}


//menu จัดการ user
function userMenu(type){
  if(type === 'open'){

    //button
    document.getElementById("UserButton").style.display = "none";
    document.getElementById("Close_userMenu").style.display = "block";
    //meun
    document.getElementById("user-menu").style.display = "block";
  } else if (type === 'close'){

    //button
    document.getElementById("UserButton").style.display = "block";
    document.getElementById("Close_userMenu").style.display = "none";
    //menu
    document.getElementById("user-menu").style.display = "none";
  }
}
async function get_json(url) {
  const file = await fetch(url);
  const json = await file.json();

  return json;
}

async function random_assets() {
  //สุ่ม background image จาก backend
  const background = await get_json('/json/background.json');
  //console.log(background["background"])
  var random_background = Math.floor(Math.random() * ((background["background"].length - 1) - 0 + 1)) + 0;
  document.getElementById("body_main").setAttribute("background", background["background"][random_background]);

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


function nav_sticky() {
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

function navbar (){
  var x = document.getElementById("list-page");
  if (x.className === "navbar-list") {
    x.className += " responsive";
  } else {
    x.className = "navbar-list";
  }
}

//login modal
function showModal(id) {
  var modal = document.getElementById(id);
  modal.style.display = "block";

  document.querySelector("#body_main").classList.add("stop-scroll");

}

function closeModal(id) {
  var modal = document.getElementById(id);
  modal.style.display = "none";

  document.querySelector("#body_main").classList.remove("stop-scroll");

}

async function check_playgame(){
  const data = await get_json("https://gamertocoder.garena.co.th/api/minigames");
  var amount = JSON.parse(localStorage.getItem("playlist")).length;

  if(amount >= data.length){
    document.getElementById("time-play").style.display = "none";
    document.getElementById("play-button").style.display = "none";
    document.getElementById("receive-item").style.display = "block";
  }
  console.log(amount);
}

//ตัดคำ
function cuttext(string, length){
  if (string.length > length)
      return string.substring(0,length)+' . . .';
  else
      return string;
};

function search_playlist (no){
  var get_dataplaylist = JSON.parse(localStorage.getItem("playlist_data"));

  var data =  get_dataplaylist.filter(x => x.no === no);
  if(data.length === 0){
    return false;
  }else{
    return data;
  }

}

//list minigame
async function minigame_list() {
  const data = await get_json("https://gamertocoder.garena.co.th/api/minigames");
  var playlist = localStorage.getItem("playlist");

  let html = "";


  //ไม่เคยเล่น
  if(playlist === null){
    for (let i = 0; i < data.length; i++) {
      var description = cuttext(data[i]["description"], 200);

      html += "<div class='column size-is-25'>"
      html += "<div class='container'>";
        html += "<img src='"+data[i]["icon"]+"' class='minigame-logo'>";
      
        html += "<div class='about-minigame'></div>";        
        html += "<div class='minigame-description'>"+description+"</div>";
        html += "<div class='text'>"+data[i]["name"]+"</div>";
      html += "</div>";
      html += "</div>";

    }
  }

  //เคยเล่น
  else if(playlist !== null){

    for (let i = 0; i < data.length; i++) {
      var playlist_data = search_playlist(data[i]["no"]);
      var description = cuttext(data[i]["description"], 200);

      if(playlist_data === false){

        html += "<div class='column size-is-25'>"
          html += "<div class='container'>";
            html += "<img src='"+data[i]["icon"]+"' class='minigame-logo'>";
          
            html += "<div class='about-minigame'></div>";        
            html += "<div class='minigame-description'>"+description+"</div>";
            html += "<div class='text'>"+data[i]["name"]+"</div>";
          html += "</div>";
        html += "</div>";

      }else if (playlist_data !== false){
        html += "<div class='column size-is-25'>"
          html += "<div class='container-1'>";
            html += "<img src='"+data[i]["icon"]+"' class='minigame-logo'>";
          
            html += "<div class='about-minigame'></div>";        
            html += "<div class='minigame-description'>"+description+"</div>";
            
            html += "<div class='text'>"+data[i]["name"]+"</div>";

            html += "<div class='used-to-play'></div>";
            html += "<div class='play-time'> เล่นเมื่อ"+playlist_data[0]["date"]+"</div>";
          html += "</div>";
        html += "</div>";
      }

    }
  }
  document.getElementById("list-minigame").innerHTML = html;
}

function gacha_again(){
  document.getElementById("gacha-again").style.display = "none";
  document.getElementById("receive-gacha").style.display = "none";
}

//minigame random
async function random_minigame() {
  check_playgame();
  const data = await get_json("https://gamertocoder.garena.co.th/api/minigames");

  var hour = 24 * 3600000;

  var nexttime = Date.now() + hour;
  console.log(Date.now());

  localStorage.setItem("nexttime", nexttime);
  cooldown();

  showModal("gachaModal");

  //กาชาปอง
  var date_now = new Date();

  const playlist_data = [];
  const list_minigame = [];

  let intervalID = null
  let time = 0;
  intervalID = setInterval(function(){

    let random = Math.floor(Math.random() * ((data.length - 1) - 0 + 1)) + 0;
    document.getElementById("gacha-img").setAttribute("src", data[random]["icon"]);

    console.log(time);
    if(time === 6000){
      var array_data = {};
      let id_minigame = data[random]["no"];

      //บันทึกเวลาเล่น และวันที่
      array_data["no"] = data[random]["no"];
      array_data["date"] = date_now.getDate()+"/"+(date_now.getMonth() + 1)+"/"+date_now.getFullYear();
      array_data["hours"] = date_now.getHours();
      array_data["minutes"] = date_now.getMinutes();

      //ไม่เคยเล่น
      if(localStorage.getItem("playlist") === null){

        list_minigame.push(id_minigame);
        playlist_data.push(array_data);

        localStorage.setItem("playlist", JSON.stringify(list_minigame));
        localStorage.setItem("playlist_data", JSON.stringify(playlist_data));

        document.getElementById("receive-gacha").style.display = "block";
        document.getElementById("gacha-again").style.display = "none";
      }

      //เคยเล่น
      else if(localStorage.getItem("playlist") !== null){

        var playlist = JSON.parse(localStorage.getItem("playlist"));
        var get_dataplaylist = JSON.parse(localStorage.getItem("playlist_data"));

        if(playlist.includes(id_minigame) === false){

          playlist.push(id_minigame);
          get_dataplaylist.push(array_data);

          localStorage.setItem("playlist", JSON.stringify(playlist));
          localStorage.setItem("playlist_data", JSON.stringify(get_dataplaylist));
          
          document.getElementById("gacha-again").style.display = "none";
          document.getElementById("receive-gacha").style.display = "block";

        }else{
          document.getElementById("gacha-again").style.display = "block";
          document.getElementById("receive-gacha").style.display = "none";
        }
      }

      //จบการ Interval
      clearInterval(intervalID);
    }
    time += 50;
  }, 50);
}


//cooldown
function cooldown (){
  let intervalID = null;

  //check ว่ามี item nexttime ใน localstorage
  if(localStorage.getItem("nexttime") !== null){

    //ตรวจสอบเวลาว่าเหลือไหม
    if(localStorage.getItem("nexttime") > Date.now()){
      intervalID = setInterval(function(){

        var milliseconds = localStorage.getItem("nexttime") - Date.now();

        var seconds = Math.floor(milliseconds / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);

        seconds = seconds % 60;
        minutes = minutes % 60;
        hours = hours % 24;

        document.getElementById("time-play").innerText = "รออีก "+hours+" ชั่วโมง "+minutes+" นาที "+seconds+" วินาที";
        console.log("รออีก "+hours+" ชั่วโมง "+minutes+" นาที "+seconds+" วินาที");
        console.log(Date.now());
        if(milliseconds <= 0){
          document.getElementById("time-play").style.display = "none";
          document.getElementById("play-button").style.display = "block";
          localStorage.removeItem("nexttime");
          clearInterval(intervalID);
        }
      }, 1000);
      document.getElementById("time-play").style.display = "block";
      document.getElementById("play-button").style.display = "none";
    }else{
      document.getElementById("time-play").style.display = "none";
      document.getElementById("play-button").style.display = "block";
      localStorage.removeItem("nexttime");
      clearInterval(intervalID);
    }
  }else{
    document.getElementById("time-play").style.display = "none";
    document.getElementById("play-button").style.display = "block";
  }
}
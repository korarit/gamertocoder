async function random_assets (){
    //สุ่ม background image จาก backend
    const background = await fetch('/client/assets/json/background.json');
    const json = await background.json();

    console.log(json["background"])
    var random = Math.floor(Math.random() * ((json["background"].length - 1) - 0 + 1)) + 0;
    
    document.getElementById("body_main").setAttribute("background", json["background"][random]);

    //สุ่ม logo
    
}
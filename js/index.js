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
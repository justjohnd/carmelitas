//Multilanguage Menu
const url = new URL(window.location.href);

let urlPathname = url.pathname;
let path = urlPathname.split("/");
let langDir = path[path.length - 2];
let finalDir = path[path.length - 1];

let buttons = document.getElementsByClassName("btn-lang");

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        let btnId = this.id;
        if (btnId != langDir) {
            let urlReroute = "https://justjohnd.github.io/carmelitas/" + btnId + "/" + finalDir;
            console.log(urlReroute);
            window.location.replace(urlReroute);
        }
    });
}
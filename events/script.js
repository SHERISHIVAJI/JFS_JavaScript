let div = document.getElementsByClassName("main")[0]
let btn = document.getElementById("btn")

btn.onclick = () => {
    div.remove();
}
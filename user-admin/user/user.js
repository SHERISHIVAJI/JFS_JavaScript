async function displayData() {
    let res = await fetch("http://localhost:3000/students");
    try {
        if(!res.ok){throw new Error("Data not Getting");}
        let data =await res.json();
        showData(data);
    } catch (error) {
        console.log(error);
    }
}

let con = document.getElementById("main");

function showData(data) {
    data.forEach(ele => {
        let item = document.createElement("div");
        item.id = "item";
        item.innerHTML = `
        <img src='${ele.image}'></img>
        <p><strong>Name : </strong> ${ele.name}</p>
        `
        con.appendChild(item);
    })
}

addEventListener("DOMContentLoaded", displayData)
let table = document.getElementById("tables")
fetch("https://fakestoreapi.com/products").then(res => res.json()).then( data => {
    data.forEach(element => {
    let tr = document.createElement("tr")
    tr.innerHTML = `
    <td style="width: 100px;">${element.id}</td>
    <td>${element.title}</td>
    <td style="width: 150px;">${element.price} $</td>
    <td><img src="${element.image}"></img></td>`
    table.appendChild(tr)
})
})
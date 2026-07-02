let mainDiv = document.createElement("div")
mainDiv.id = "main"
fetch("https://fakestoreapi.com/products").then(res => res.json()).then( data => {
    data.forEach(element => {
    let div = document.createElement("div")
    div.className = "items"
    div.innerHTML = `<img src="${element.image}"></img><strong>${element.title}</strong> <p>Price : ${element.price} </p> <p>${element.description}</p> <p>Rating : ${element.rating.rate} ( ${element.rating.count} )</p><button>BUY HERE</button>`
    mainDiv.appendChild(div)
})
})
document.body.append(mainDiv)
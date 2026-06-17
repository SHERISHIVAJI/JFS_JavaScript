const URL = "https://fakestoreapi.com/products";
fetch(URL)
.then (res =>res.json())
.catch (res =>console.log(res))
.then (res =>{
    for(let i = 0;i<res.length;i += 2) {
        console.log("Price: " , res[i].price);
        console.log("Rating: ", res[i].rating)
    }
})
.catch(res=>console.log(res))


fetch("https://dummyjson.com/quotes")
.then(res=>res.json()).catch(res=>console.log(res))
.then(data=>{
    console.log(data.quotes)
})
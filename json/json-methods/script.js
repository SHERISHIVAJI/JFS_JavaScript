// fetch("http://localhost:3000/products")
// .then(res => res.json())
// .then(res => {
//     for(i = 0; i < res.length; i++) {
//         fetch(`http://localhost:3000/products/${res[i].id}`, {
//             "method" : "DELETE"
//         }).then(res=>console.log(res.status, ' -> ', res.statusText))
//         .catch(res=>console.log(res))
//     }
// })

let data = [
    {
        "id":"1",
        "name": "Shivaji"
    },
    {
        "id":"2",
        "name": "Shiva"
    },
    {
        "id":"3",
        "name": "Mahesh"
    },
    {
        "id":"4",
        "name": "SS"
    },
    {
        "id":"5",
        "name": "Sheri"
    }
]

let option = {
    "method":"POST",
    "header": {
        "content-type":"application/json"
    }
}
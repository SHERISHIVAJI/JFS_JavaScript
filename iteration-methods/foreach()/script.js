let arr = [1, 2, 3, 4, 5, 6]
let squares = []
let evenOdd = []
arr.forEach((element) => {
    squares.push(element**2)
    // if(element % 2 == 0) evenOdd.push("even")
    // else evenOdd.push("odd")
    element%2 == 0 ? evenOdd.push("Even") : evenOdd.push("Odd")
})
console.log(squares);
console.log(evenOdd);
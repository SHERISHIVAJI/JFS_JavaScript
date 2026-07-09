function convert() {
    const amount = document.getElementById("amount");
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");

    getData(
        amount.value,
        fromCurrency.value,
        toCurrency.value
    );
}

async function getData(amt, fromCurrency, toCurrency) {
    const url =`https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amt}`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'b3a4b45255msh30f8a6049464fdcp1255aajsna95cd57149e5',
		'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com',
		'Content-Type': 'application/json'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	const re = document.getElementById("result")
    re.innerHTML = `
        <h1> ${amt} ${fromCurrency} = <strong> ${result.result} </stronng> ${toCurrency}</h1>
    `
} catch (error) {
	console.error(error);
}
}
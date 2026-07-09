const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");

const convertBtn = document.getElementById("convertBtn");
const swapBtn = document.getElementById("swapBtn");

const result = document.getElementById("result");
const rate = document.getElementById("rate");
const updatedTime = document.getElementById("updatedTime");
const loading = document.getElementById("loading");

const currencies = [
"USD","INR","EUR","GBP","JPY","AUD","CAD","CHF","CNY","SGD",
"AED","SAR","QAR","KWD","OMR","BHD","NZD","HKD","KRW","MYR",
"THB","IDR","PKR","BDT","LKR","NPR","ZAR","RUB","TRY","BRL",
"MXN","SEK","NOK","DKK","PLN","CZK","HUF","ILS","PHP","VND"
];

function loadCurrencies(){
    currencies.forEach(currency=>{
        fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
        toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
    });
    fromCurrency.value="USD";
    toCurrency.value="INR";
}

async function convertCurrency(){
    const amt = parseFloat(amount.value);
    if(isNaN(amt) || amt<=0){
        alert("Please enter a valid amount.");
        return;
    }
    loading.style.display="block";
    const url=`https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${fromCurrency.value}&to=${toCurrency.value}&amount=${amt}`;
    const options={
        method:"GET",
        headers:{
            "x-rapidapi-key":"b3a4b45255msh30f8a6049464fdcp1255aajsna95cd57149e5",
            "x-rapidapi-host":"currency-conversion-and-exchange-rates.p.rapidapi.com"
        }
    };
    try{
        const response=await fetch(url,options);
        if(!response.ok){
            throw new Error("Request Failed");
        }
        const data=await response.json();
        loading.style.display="none";
        result.innerHTML=
        `${amt} ${fromCurrency.value} = <br><strong>${data.result.toFixed(2)} ${toCurrency.value}</strong>`;
        rate.innerHTML=
        `Exchange Rate : 1 ${fromCurrency.value} = ${data.info.rate.toFixed(6)} ${toCurrency.value}`;
        updatedTime.innerHTML=
        `Last Updated : ${data.date}`;
    } catch(error) {
        loading.style.display="none";
        console.error(error);
        result.innerHTML="Conversion Failed!";
        rate.innerHTML="";
        updatedTime.innerHTML="";
        alert("Unable to fetch exchange rates.");
    }
}

swapBtn.addEventListener("click",()=>{
    const temp=fromCurrency.value;
    fromCurrency.value=toCurrency.value;
    toCurrency.value=temp;
    convertCurrency();
});

convertBtn.addEventListener("click",convertCurrency);
amount.addEventListener("keyup",(e)=>{
    if(e.key==="Enter"){
        convertCurrency();
    }
});

fromCurrency.addEventListener("change",convertCurrency);
toCurrency.addEventListener("change",convertCurrency);

loadCurrencies();
convertCurrency();
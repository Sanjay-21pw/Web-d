import React,{useEffect, useState} from 'react';
import './App.css';
import Currencyflow from './Currencyflow';

const BASE_URL=" https://v6.exchangerate-api.com/v6/245f8dd3696b735fbc7385fc/latest/USD"

function App() {
  const[home,setHome]=useState()
  const [currencyOptions,setCurrencyoptions]=useState([])
  const[fromCurrency,setFromCurrency]=useState()
  const[toCurrency,setToCurrency]=useState()
  const[exchangeRate,setexchangeRate]=useState()
  const[amt,setamt]=useState(1)
  const[amtInFromCurrency,setamtInFromCurrency]=useState(true)
  
  let toAmt,fromAmt
  if(amtInFromCurrency){
    fromAmt=amt
    toAmt=amt*exchangeRate
  }else{
    toAmt=amt
    fromAmt=amt/exchangeRate
  }

useEffect(()=>{
  fetch("http://localhost:3000/home")
  .then(res=>res.json())
  .then(data=>setHome(data))
})

  useEffect(()=>{
  fetch(BASE_URL)
  .then(res=>res.json())
  .then(data=>{
    const currency= Object.keys(data.conversion_rates)[1]
    setCurrencyoptions([data.base_code,...Object.keys(data.conversion_rates)])
    setFromCurrency(data.base_code)
    setToCurrency(currency)
    setexchangeRate(data.conversion_rates[currency])
  })
},[])

useEffect(()=>{
  if(fromCurrency!=null && toCurrency!=null){
    fetch(`${BASE_URL}?base_code=${fromCurrency}&symbols=${toCurrency}`)
    .then(res=>res.json())
    .then(data=>setexchangeRate(data.conversion_rates[toCurrency]))
  }
},[fromCurrency,toCurrency])

function handleFromAmtChange(e){
  setamt(e.target.value)
  setamtInFromCurrency(true)
}


function handleToAmtChange(e){
  setamt(e.target.value)
  setamtInFromCurrency(false)
}

  return (
    <>
    <h1>Convert</h1>
    <Currencyflow 
      currencyOptions={currencyOptions}
      selectedCurrency={fromCurrency}
      onChangeCurrency={e =>setFromCurrency(e.target.value)}
      onChangeamt={handleFromAmtChange}
      amt={fromAmt}/>
    <div className="equals">=</div>
    <Currencyflow 
    currencyOptions={currencyOptions}
    selectedCurrency={toCurrency}
    onChangeCurrency={e =>setToCurrency(e.target.value)}
    onChangeamt={handleToAmtChange}
    amt={toAmt}/>
    </>
  );
}

export default App;

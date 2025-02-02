import { useEffect, useState } from 'react'
import './App.css'


function App() {

  const[currencies, setCurrencies] = useState([])
  const[fromCurrency, setFromCurrency] = useState('usd')
  const[toCurrency, setToCurrency] = useState('inr')
  const[fromValue, setFromValue] = useState("")
  const[toValue, setToValue] = useState("")

  
  useEffect(()=> {
    fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
    .then((response) => response.json())
    .then((data) =>{
      setCurrencies(data)

    })

  }, [])
  

  useEffect(()=> {
    if(!fromValue){
      setToValue("");
      return;
    }

    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`
    )
    .then((response)=>response.json())
    .then((data)=>{
      if(data[fromCurrency] && data[fromCurrency] [toCurrency]){
        setToValue((parseFloat(fromValue) * data[fromCurrency][toCurrency]).toFixed(2));
      } 
      else{
        setToValue("Error");
      }
  })
  .catch(()=> setToValue("Error"));
}, [fromValue, fromCurrency, toCurrency , toValue]);




function ChangeDirection(){
   setFromCurrency(toCurrency)
   setToCurrency(fromCurrency)

}

  return (
    <>
    <h1 id='h'>Currency Converter</h1>
    <div className='border-2 w-5xl p-10 flex justify-between h-96'  id="main">


     <div className='border-2 rounded-2xl p-6 pt-18' id="first">
       <select onChange={(e)=> setFromCurrency(e.target.value)} value={fromCurrency}>
        {Object.entries(currencies).map(([code, name])=>
         <option key = {code} value = {code}> {name} ({code})</option>
        )}
       </select>

       <input type='tel' value={fromValue} onChange={(e)=> setFromValue(e.target.value)} placeholder='Enter amount' />
     </div>


     <h1 className='font-bold text-5xl relative top-30' onClick={ChangeDirection}><img src='src/images/arrow.png' width={280}/></h1>
     

     <div className='border-2 rounded-2xl pt-18 p-6' id='second'>
     <select onChange={(e)=> setToCurrency(e.target.value)} value={toCurrency}>
        {Object.entries(currencies).map(([code, name])=>
         <option id='opt' key = {code} value = {code}> {name} ({code})</option>
        )}
       </select>
       <input type='tel' value={toValue} placeholder='Converted Currency' onChange={(e)=>setToValue(e.target.value)} />
     </div>
    
     </div>
    </>
  )
}

export default App

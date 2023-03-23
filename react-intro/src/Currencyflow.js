import React from 'react'

export default function Currencyflow(props) {
  const{
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeamt,
    amt
  }=props
  return (
    <div>
        <input type="number" className="input" value={amt} onChange={onChangeamt}/>
        <select value={selectedCurrency} onChange={onChangeCurrency}>
          {currencyOptions.map(option=>(
            <option key={option} value={option}>{option}</option>
          ))}
            <option value="Hi">Hi</option>
        </select> 
     </div>
  )
}

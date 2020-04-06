import React, { useEffect, useState } from 'react'
import * as M from 'materialize-css'
import Modal from './Modal'
import CompareTime from './CompareTime'

export default function Main() {

    const AppId = "543a10fef16f4cbc8d980f5abbde299f";
    const url = "https://openexchangerates.org/api/latest.json?app_id=" + AppId;
    const [Value, SetValue] = useState()
    const [Input, SetInput] = useState(1)
    const [Select, SetSelect] = useState({select1: '', select2: ''})
    const [Price, SetPrice] = useState() 

    useEffect(() =>
    {
        var json = JSON.parse(localStorage.getItem('Data'))
       
        M.AutoInit()
        
        if(json == null || CompareTime(json.ts))
        fetch(url).then((data) => data.json()).then((data) =>
        {
            console.log('FETCHED')
            let arr = []
            for (let [key, values] of Object.entries(data.rates)) {
                arr.push({name: key, value: values});
            }
            SetValue(arr)
            SetSelect({select1: arr[10].value, select2: arr[12].value})
            var object = {rates: arr, ts: new Date().getTime()}
            localStorage.setItem('Data', JSON.stringify(object))

        })
        else
        {
            console.log('Using localstorage')
            console.log(json.ts)
            SetValue(json.rates)
            SetSelect({select1: json.rates[10].value, select2: json.rates[12].value})
            
        }
        

    }, [url])

    useEffect(() =>
    {
      
        var j = (Select.select2/Select.select1)*Input
        SetPrice(j.toFixed(2))
        


    }, [Input, Select])



    return (
        <div className="container">
        <div className="row center-align">
            <div className="col s12"><h1>Valuta exchange</h1></div>
        </div>
        <div className="row">
            <div className="col s5">
            {Value != null ? <select value={Select.select1} onChange={e => {SetSelect({select1: e.target.value, select2: Select.select2})}} className="browser-default">
            {Value.map((item, key) =>
            {
                return(
                <option key={key} value={item.value}>{item.name}</option>
                )
            })}

            </select> : <div>Loading</div>}
            </div>
            <div className="col s2 center-align">
                <i onClick={e =>{SetSelect({select1: Select.select2, select2: Select.select1})}} className="material-icons">autorenew</i>
            </div>
            <div className="col s5">
            {Value != null ? <select value={Select.select2} onChange={e => {SetSelect({select1: Select.select1, select2: e.target.value})}} className="browser-default">
            {Value.map((item, key) =>
            {
                return(
                <option key={key} value={item.value}>{item.name}</option>
                )
            })}

            </select> : <div>Loading</div>}
            
            </div>
        </div>
        <div className="row center-align">
            <div className="col s12">
                {Price != null ? <div>Pris: {Price}</div> : <p>Loading</p> }
            </div>
        </div>
        <div className="row">
            <div className="col s2 offset-s5">
            <div placeholder="" className="input-field">
            <input value={Input} onChange={e => {SetInput(e.target.value)}} type="text"></input>
            </div>
                
            </div>
        </div>
        <div className="row center-align">
            <div className="col s12">
                {Value != null && Price != undefined ? <Modal Value={{Select, Price}}/> : <p>Loading</p>}
            </div>
        </div>
        
            
        </div>
    )
}

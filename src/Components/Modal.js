import React, { useEffect } from 'react'
import * as M from 'materialize-css'

export default function Modal(prop) {

    useEffect(() =>
    {
        M.AutoInit()
        
    })

    if(prop != null)
    return (
        <div>
         <button className="waves-effect waves-light btn modal-trigger" href="#modal1">Köp eller sälj</button>
         <div id="modal1" className="modal">
    <div className="modal-content">
      <h4>Valuta transaktion</h4>
      <div style={{textDecorationLine:"solid"}}> Kurs: {prop.Value.Select.select1} till Kurs: {prop.Value.Select.select2} </div>
      <p>Pris: {prop.Value.Price}</p>
      <p>Vill du köpa eller sälja?</p>
      <a style={{marginRight:"5px"}} className="modal-close waves-effect waves-light btn green">Köp</a>
      <a className="modal-close waves-effect waves-light btn red">Sälj</a>
    </div>
  </div>
          
            
        </div>
    )
   return(<div>Loading</div>)
}

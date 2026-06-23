import React from "react"
import { useState } from "react"

const Operator =() =>{

  const[count,setCount] = useState(0);

    return(
      <div>
        <h2>Marks = {count} </h2>
         <button onClick={() =>setCount(count +1)}>

        plus

         </button>
        <button onClick={() =>setCount(count -1)}>
        minus

          </button>
      </div>  
   
    )
}
export default Operator
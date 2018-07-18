import React from 'react';

const Popup =({active,question,remove,toggle})=>{
    return(
        <div className={active? "popup active" : "popup"}>
        <h3>{question}</h3>
        <button
        onClick={()=>{
            toggle();
            remove();
        }}>
        Yes
        </button>
        <button
        onClick={toggle}
        >No</button>
        </div>
    )
}

export default Popup
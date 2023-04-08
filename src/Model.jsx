import React from "react"

export default function Model({handleClick,scoresArray}){
    const scoresElement = scoresArray.map(item => 
        (<p className="scores">
            <span>Rolls : {item.rollCount}</span> 
            <span> Date : {item.winningDate}</span>
        </p>)
    )
    return(    
        <div className="model">
        <p className="model-cross-btn" onClick={handleClick}>x</p>
        <h3>Your Top 3 Scores</h3>
        {scoresElement}
        </div>
    )
}
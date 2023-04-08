import React from "react"
import diceArray from "./diceArray"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
           {diceArray[props.value-1]}

        </div>
    )
}
import React from "react"
import Die from "./Die"
import Model from "./Model"
import Leaderboard from  "./Leaderboard"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const getLocalArray = JSON.parse(localStorage.getItem("laderboardLocalArray"));
    const [laderboard, setLeaderBoard] = React.useState(getLocalArray || [])
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState({
            isWon:false,
            rollCount:0,
    })
    const [showScores,setShowScores] = React.useState(false)
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(item=>({
                ...item,
                isWon:true}
            ))
            setLederboardScores()
            flipModel()
        }
    }, [dice])
    console.log(laderboard)

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function setLederboardScores(){
        const rollCount =  tenzies.rollCount
        const  winningDate =  new Date().toLocaleString('en-GB', { timeZone: 'IST' })
        
        setLeaderBoard(item => {
           const tempArray = [...item,{rollCount,winningDate}]
           const tempArrayShorted = tempArray.sort((a,b) => a.rollCount - b.rollCount)
           const topThreeScores = tempArrayShorted.slice(0,3)
           localStorage.setItem("laderboardLocalArray",JSON.stringify(topThreeScores))
           return topThreeScores
        })
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    
    function rollDice() {
        if(!tenzies.isWon) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setTenzies(item=>({...item,rollCount:item.rollCount+1}))
        } else {
            setTenzies(item=>({...item,isWon:false,rollCount:0}))
            setDice(allNewDice())
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    function flipModel(){
        setShowScores(prevState => !prevState)
    }
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    return (
        <main>
            {tenzies.isWon && <Confetti className="confetti"/>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-count">{`Dice Rolls : ${tenzies.rollCount}`}</div>

            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies.isWon ? "New Game" : "Roll"}
            </button>
            
            {showScores && <Model scoresArray = {laderboard} handleClick={flipModel}/>}
            <Leaderboard handleClick={flipModel}/>
        </main>
    )
}
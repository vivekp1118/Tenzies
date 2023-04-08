import React from "react"

export default function Leaderboard({handleClick}){
    return(
        <div className="leaderboard-icon" onClick={handleClick}>
            <i class="fa-solid fa-square-poll-vertical"></i>
        </div>
    )
}
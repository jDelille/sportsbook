import React, {useState, useEffect} from 'react'

function Display({matches, setState, getBet, state}) {

 
  


  


 return (

  <div className="display-matches">
     {matches.map(item => {
       return (
        <div className="match-box">
        <div className="ht-box">
        <div className="team-name">
         <img className="team-logo" src={`../icons/${item.competitors[0].abbreviation}.svg`} alt='logo'
         />
         <p className='initials'>{item.competitors[0].abbreviation}</p>
         <p id='name'>{item.competitors[0].name}</p>
         {item.fullStatus.type.name === "STATUS_FINAL" ? (
          <p className="team-record">{item.competitors[0].score}</p>
         ) : (
          <p className="team-record">{item.competitors[0].record}</p>
         )}
         
         </div>
         <div id="border">
           <p>@</p>
         </div>
         <div className="team-odds">
          <div className="spread"
          onClick={() => {setState({ 
            team: item.odds.homeTeamOdds.team.abbreviation, 
            spread: item.odds.homeTeamOdds.spreadOdds,
            matchup: item.name,
            winner: item.competitors[0].winner, 
            id: item.competitors[0].id,
            kickoff: item.summary
            }); 
            getBet()}}>
          
          <p>
          <span className="spread-points" >{item.odds.spread}</span>
          {item.odds.homeTeamOdds.spreadOdds}</p>
          </div>
          <div className="moneyline">
           <p
           onClick={() => {setState({ 
             team: item.competitors[0].displayName,
             moneyline: item.odds.homeTeamOdds.moneyLine, 
             matchup: item.name,
             winner: item.competitors[0].winner, 
             id: item.competitors[0].id,
             kickoff: item.summary,
             shortName: item.shortName,
             competitionId: item.competitionId
             }); 
             getBet()}}>
           {item.odds.homeTeamOdds.moneyLine}</p>
          </div>
          
          <div className="total"
          onClick={() => {setState({ 
            team: item.odds.homeTeamOdds.team.abbreviation, 
            total: item.odds.overOdds, 
            matchup: item.name,
            winner: item.competitors[0].winner, 
            id: item.competitors[0].id,
            kickoff: item.summary
            }); 
            getBet()}}>
          
           <p>
           <span className="spread-points"> O {item.odds.overUnder}</span>
           {item.odds.overOdds}</p>
          </div>
         </div>
         {/* <div className="fav-underdog">
          {item.odds.homeTeamOdds?.favorite ? (
           <div className="badge-fav">
            <h3 className='favorite'>FAV</h3>
           </div>
          ): (
           <div className="badge-underdog">
            <h3 className='underdog'>DOG</h3>
           </div>
          )}
         </div> */}
        </div>
        <div className='rt-box'>
        <div className="team-name">
         <img className="team-logo" src={`../icons/${item.competitors[1].abbreviation}.svg`} alt='logo'
         />
         <p className="initials">{item.competitors[1].abbreviation}</p>
         <p id="name">{item.competitors[1].name}</p>
         {item.fullStatus.type.name === "STATUS_FINAL" ? (
          <p className="team-record">{item.competitors[1].score}</p>
         ) : (
          <p className="team-record">{item.competitors[1].record}</p>
         )}

         </div>
         <div className="team-odds"
         onClick={() => {setState({ 
            team: item.odds.awayTeamOdds.team.abbreviation, 
            spread: item.odds.awayTeamOdds.spreadOdds,
            matchup: item.name,
            winner: item.competitors[1].winner, 
            id: item.competitors[1].id,
            kickoff: item.summary
            }); 
            getBet()}}>
          
          <div className="spread">
            <p>
            <span className="spread-points">{item.odds.spread}</span>
            {item.odds.awayTeamOdds.spreadOdds}</p>
          </div>
          <div className="moneyline"
          onClick={() => {setState({ 
            team: item.odds.awayTeamOdds.team.abbreviation, 
            moneyline: item.odds.awayTeamOdds.moneyLine, 
            matchup: item.name,
            winner: item.competitors[1].winner, 
            id: item.competitors[1].id
            }); getBet()}}>
           <p>{item.odds.awayTeamOdds.moneyLine}</p>
          </div>
          
          <div className="total"
          onClick={() => {setState({ 
            team: item.odds.awayTeamOdds.team.abbreviation, 
            total: item.odds.overOdds, 
            matchup: item.name,
            winner: item.competitors[1].winner, 
            id: item.competitors[1].id
            }); getBet()}}>
           <p>
           <span className="spread-points"> U {item.odds.overUnder}</span>
           {item.odds.overOdds}</p>
          </div>
         </div>
         {/* <div className="fav-underdog">
          {item.odds.awayTeamOdds?.favorite ? (
           <div className="badge-fav">
            <h3 className='favorite'>FAV</h3>
           </div>
          ): (
           <div className="badge-underdog">
            <h3 className='underdog'>DOG</h3>
           </div>
          )}
         </div> */}
        </div>
        <div className="scheduled-time">
         <p>{item.broadcasts[0].station}</p>
         <p>{item.summary}</p>
        </div>
       </div>
       )
     })}
    </div>
 )
}

export default Display

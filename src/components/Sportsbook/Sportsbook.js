import React, {useState, useEffect} from 'react'
import { auth } from '../../Firebase/firebase'
import Betslip from './Betslip'
import firebase from 'firebase'
import Sidebar from './Sidebar'

import './Sportsbook.css'

export default function Sportsbook() {

 const [matches, setMatches] = useState([])

 const [makePicks, setMakePick] = useState([])

 const [addBet, setAddBet] = useState([])

 let [counter, setCounter] = useState(0)


 const getData = () => {
  let headersList = {
   "Accept": "*/*",
   "User-Agent": "Thunder Client (https://www.thunderclient.io)"
  }
  
  fetch("https://site.web.api.espn.com/apis/v2/scoreboard/header?sport=football&league=nfl", { 
    method: "GET",
    headers: headersList
  }).then((response) => response.json()
    .then((data) => {
    setMatches(data.sports[0].leagues[0].events)
  }))
 }

 // add user bet to firestore
 const AddBet = () => {
  const userUID = auth.currentUser.uid;
  let db = firebase.firestore()
  db.collection('users').doc(userUID).update({
    bet: firebase.firestore.FieldValue.arrayUnion({...addBet})
  })
 }

 const [deleted, setDeleted] = useState([])


 useEffect(() => {
   getData()
   
 }, [])

 useEffect(() => {
  AddBet()
 }, [addBet])

  //get user bet info 

  const [showBet, setShowBet] = useState()

  function getBet() {
    let db = firebase.firestore();
    let usersEmail = auth.currentUser.email;
    db.collection('users').where('email', '==', usersEmail).get()
    .then(function(querySnapshot) {
     querySnapshot.forEach(function(doc) {
      setShowBet(doc.data())
     })
    })
   }
   

   useEffect(() => {
     getBet()
   }, [deleted])
   


 console.log(matches)



 return (
  <div className="sportsbook-page">
  <Sidebar />
  <div className='sportsbook'>
    <div className="schedule-tab">
     <p> Live in-game </p>
     <p> Game Lines </p>     
    </div>
    <div className="schedule-tab-sub">
    
    <div className="odds-labels">
     {/* <p> Moneyline </p>
     <p> Spread </p>
     <p> Total </p> */}
    </div>
    {/* <p className="favorite-label"> Favorite </p> */}
        
    </div>
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
         <p className="team-record">{item.competitors[0].record}</p>
         
         </div>
         <div id="border">
           <p>@</p>
         </div>
         <div className="team-odds">
          <div className="spread">
          
          <p>
          <span className="spread-points" >{item.odds.spread}</span>
          {item.odds.homeTeamOdds.spreadOdds}</p>
          </div>
          <div className="moneyline">
           <p
           onClick={() => {setAddBet(item.odds.homeTeamOdds); getBet()}}
           >
           {item.odds.homeTeamOdds.moneyLine}</p>
          </div>
          
          <div className="total">
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
         <p className="team-record">{item.competitors[1].record}</p>

         </div>
         <div className="team-odds">
          <div className="spread">
            <p>
            <span className="spread-points">{item.odds.spread}</span>
            {item.odds.awayTeamOdds.spreadOdds}</p>
          </div>
          <div className="moneyline"
          onClick={() => {setAddBet(item.odds.awayTeamOdds); getBet()}}>
           <p>{item.odds.awayTeamOdds.moneyLine}</p>
          </div>
          
          <div className="total">
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
  </div>
  <Betslip makePicks={makePicks} counter={counter} showBet={showBet} deleted={deleted} setDeleted={setDeleted} />
  </div>
 )
}


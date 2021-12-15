import React, {useState, useEffect} from 'react'
import { auth } from '../../Firebase/firebase'
import Betslip from './Betslip'
import firebase from 'firebase'
import Sidebar from './Sidebar'
import Display from './Display'

import './Sportsbook.css'
import LiveSports from './LiveSports'
import YourBets from './YourBets'

export default function Sportsbook() {

 const [matches, setMatches] = useState([])
 const [makePicks, setMakePick] = useState([])
 const [state, setState] = useState({})
 let [counter, setCounter] = useState(0)

 const [showLive, setShowLive] = useState(false)
 const [showLines, setShowLines] = useState(true)
 const [showBets, setShowBets] = useState(false)


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
    bet: firebase.firestore.FieldValue.arrayUnion({...state})
  })
 }

 const [deleted, setDeleted] = useState([])


 useEffect(() => {
   getData()
   
 }, [])
 const [showBet, setShowBet] = useState()

 useEffect(() => {
  AddBet()
 }, [showBet])

 console.log(state)

  //get user bet info 


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


 function ShowLive() {
   setShowLines(false)
   setShowLive(true)
 }

 function ShowLines() {
   setShowLive(false)
   setShowLines(true)
 }

 function ShowBets() {
  setShowLive(false)
  setShowLines(false)
  setShowBets(true)
 }



 return (
  <div className="sportsbook-page">
  <Sidebar setShowBets={setShowBets} showBets={showBets}/>
  <div className='sportsbook'>
    <div className="schedule-tab">
    
     <p
     onClick={ShowLive}
     > Live in-game 
     <div className="live-icon">
      
      </div> </p>
     <p
     onClick={ShowLines}> Game Lines </p>     
    </div>
    <div className="schedule-tab-sub">
    <div className="odds-labels">
     <p className="spread-label"> Spread </p>
     <p> Moneyline </p>
     <p className="total-label"> Total </p>
    </div>
    </div>

    {showLines ? (
      <Display matches={matches} setState={setState} getBet={getBet} state={state} />
    ) : showLive ? (
      <LiveSports matches={matches} setState={setState} getBet={getBet} state={state} />
    ) : showBets ? (
      <YourBets />
    ) : (
      ''
    ) 
    })
    


  </div>
  <Betslip makePicks={makePicks} counter={counter} showBet={showBet} deleted={deleted}  setDeleted={setDeleted} state={state}/>
  </div>
 )
}


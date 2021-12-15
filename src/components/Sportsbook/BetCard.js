import React, {useEffect, useState} from 'react'
import './BetCard.css'
import firebase from 'firebase'
import { auth } from '../../Firebase/firebase'
import {BsChevronDown} from 'react-icons/bs'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import {AiOutlineInfoCircle} from 'react-icons/ai'




function BetCard({array, counter, getBet, showBet, state}) {


 const [makeWager, setMakeWager] = useState('')

 const [favWager, setFavWager] = useState('')
 const [dogWager, setDogWager] = useState('')

 const [userInfo, setUserInfo] = useState([])
 const [expandCard, setExpandCard] = useState([false])

 const [confirm, setConfirm] = useState(false)
 const [placed, setPlaced] = useState([])


//  function ExpandCard(id) {
//    setExpandCard((prevState => ({...prevState, [id]: !prevState[id]})))
//  }

 

//  makeWager % 2 === 0 ? console.log('hey') : console.log('working')

 function getUserInfo() {
  let db = firebase.firestore()
  let usersEmail = auth.currentUser.email
  const userUID = auth.currentUser.uid;
  db.collection('users').where('email', '==', usersEmail).get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      setUserInfo(doc.data())
    })
  })
 
}

const placeBet = () => {
  const user = firebase.auth().currentUser;
  const userUID = user.uid;
  let db = firebase.firestore();
  db.collection('users').doc(userUID).update({
      coins: userInfo.coins - makeWager
  })
}

 // add user bet to firestore
 const makeBet = () => {
  const userUID = auth.currentUser.uid;
  let db = firebase.firestore()
  db.collection('users').doc(userUID).update({
    placedBets: firebase.firestore.FieldValue.arrayUnion({...placed})
  })
 }



// function placeBet() {
//   console.log(userInfo.coins - makeWager)
// }

useEffect(() => {
  getUserInfo()
  
}, [state])

  // if(makeWager > userInfo.coins) {
  //   console.log('You dont have enough coins')
  // } else {
  //   console.log('Bet successful!')
  // }


  let [show, setShow] = useState('')


  function handleClick(id) {
    setShow(id)
  }
  
  let calculateBet = makeWager
  let payout = calculateBet

  const timestamp =  new Date().toLocaleString();









 return (
  <>
   {showBet?.bet?.map((item, index) => {
    if(index !== 0 ){

    return ( 
    <div
      
      id={index}
      className={show === item.id ? 'bet-card' : 'minimize'}
      onClick={() => setMakeWager(0)}
      >
      
     <>
     <div 
     onClick={() => handleClick(item?.id)}
     className="bet-header">
      <p className="bet-team">{item?.team}</p>
      {item?.moneyline ? (
        <p className="show-odd">{item?.moneyline}</p>

      ): item?.total ? (
        <p className="show-odd">{item?.total}</p>
      ): item?.spread ? (
        <p className="show-odd">{item?.spread}</p>

      ):(
        ''
      )}
      <br />
      {item?.moneyline ? (
        <p className="bet-type"> Moneyline</p>

      ): item?.total ? (
        <p className="bet-type"> Total </p>
      ): item?.spread ?(
        <p className="bet-type"> Spread </p>
      ):(
        ''
      )}
      <p className="bet-matchup">{item?.matchup}</p>
      <p className="bet-time">{item?.kickoff}</p>
     </div>
     
     <div className="place-bet">
     <div className="user-bet">
      <label> Wager
       <br />
       $ <input 
       className={makeWager > userInfo.coins ? 'danger' : 'good'}
       onChange={(e) => setMakeWager(e.target.value)}
        />
      </label>
     </div>
     <div className="user-bet">
      <label> To Win
       <br />
       
      <span className="show-winnings">
      {item.moneyline < 0 ? (
        `$ ${(Math.abs(calculateBet / (item.moneyline / 100) + calculateBet) ).toFixed(2)}`
      ):(
        `$ ${Math.floor(Math.abs(calculateBet * (item.moneyline / 100)))}`
      )}
       </span>
       
       
      </label>
     </div>
     </div>
     
    
     </>
     <div 
     className="confirm-bet"
     onClick={() => {
       setPlaced({ 
            id: item?.competitionId,
            team: item?.team,
            wager: +makeWager,
            matchup: item?.matchup,
            placedAt: timestamp,
            winner: item?.winner,
            kickoff: item?.kickoff,
            shortName: item?.shortName,
            payout: Math.floor(Math.abs(makeWager * (item.moneyline / 100)))
            })
       makeBet();
       placeBet();
     }}
      
     >
     {auth.currentUser ? (
       <>
      <AiOutlineCheckCircle className='confirm-icon' />
        <p> Place Bet </p>
        </>
     ) : (
       <p> Signup to make bets </p>
     )}
        
        
     </div>
  </div>
  )
  }
 })}
  </>
 )
}

export default BetCard

import React, {useEffect, useState} from 'react'
import './BetCard.css'
import firebase from 'firebase'
import { auth } from '../../Firebase/firebase'
import {BsChevronDown} from 'react-icons/bs'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import {AiOutlineInfoCircle} from 'react-icons/ai'




function BetCard({array, counter, getBet, showBet}) {


 const [makeWager, setMakeWager] = useState('')

 const [favWager, setFavWager] = useState('')
 const [dogWager, setDogWager] = useState('')

 const [userInfo, setUserInfo] = useState([])
 const [expandCard, setExpandCard] = useState([false])


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


// function placeBet() {
//   console.log(userInfo.coins - makeWager)
// }

useEffect(() => {
  getUserInfo()
  
}, [])

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


  


 return (
  <>
   {showBet?.bet?.map((item, index) => {
    if(index !== 0 ){

    return ( 
    <div
      
      id={index}
      className={show === item.team.id ? 'bet-card' : 'minimize'}
      onClick={() => setMakeWager(0)}
      >
      
     <>
     <div 
     onClick={() => handleClick(item.team.id)}
     className="bet-header">
      <p className="bet-team">{item.team.abbreviation}</p>
      <p className="show-odd">{item.moneyLine}</p>
      <br />
      <p className="bet-type"> Moneyline</p>
      <p 
      className="bet-matchup">{item.name}</p>
      <p className="bet-time">{item.summary}</p>
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
      {item.moneyLine < 0 ? (
        `$ ${(Math.abs(calculateBet / (item.moneyLine / 100) + calculateBet) ).toFixed(2)}`
      ):(
        `$ ${Math.floor(Math.abs(calculateBet * (item.moneyLine / 100)))}`
      )}
       </span>
       
       
      </label>
     </div>
     </div>
     
    
     </>
     <div 
     className="confirm-bet"
     onClick={() => placeBet()}
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

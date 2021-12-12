import React, {useState} from 'react'
import BetCard from './BetCard'
import {VscTrash} from 'react-icons/vsc'
import firebase from 'firebase'
import { auth } from '../../Firebase/firebase'
import {AiOutlineInfoCircle} from 'react-icons/ai'
import './Betslip.css'

function Betslip( {makePicks, counter, showBet, deleted, setDeleted} ) {
 


 // clear bets
 const ClearBets = () => {
  const userUID = auth.currentUser.uid;
  let db = firebase.firestore()
  let deleted = db.collection('users').doc(userUID).update({
    bet: firebase.firestore.FieldValue.delete()
  })

  setDeleted(deleted)
 }





 let array = []

 array.push(makePicks)

 return (
  <>
  <div className="betslip">
   <p className="betslip-title"> <span className="active-bets">{showBet?.bet.length - 1}</span> Betslip </p>

   {/* bet card */}
   <BetCard array={array} counter={counter} showBet={showBet} deleted={deleted}/>



   <button 
   onClick={() => ClearBets()}
   className="clear-btn">
   <VscTrash className='trash-icon' /> Remove all selections </button>
   <div className="bet-box">
    <AiOutlineInfoCircle className='info-icon'/>
    <p className="parlay-info"> Parlays disabled. Only single bets allowed.</p>
    <p className="parlay-info learn-more-link"> Learn more </p>
  </div>
  </div>
  
  
  </>
 )
}

export default Betslip

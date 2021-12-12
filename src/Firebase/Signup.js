import React, {useRef, useState} from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import './Form.css'


export default function Signup() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()
        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/login")
        } catch {
            setError("Failed to create an account")
        }
        setLoading(false)
    }


    return (
        <div className="page">
        <div className="card">
            <div className="card-content">
            {/* Error  */}
            
            <form className='form' onSubmit={handleSubmit}>

                {/* Email  */}
                <label>Email</label>
                <input type="email" ref={emailRef} required />
                {/* Password */}
                <label>Password</label>
                <input type="password" ref={passwordRef} required />
                {/* Password Confirm  */}
                <label>Password Confirmation</label>
                <input type="password" ref={passwordConfirmRef} required />
                {/* Sign up btn  */}
                <button className="form-btn" type="submit" disabled={loading}> Sign Up </button>
                <div className="switch-to-login-btn">
                Already have an account? <Link to="/login"> <p className="login-link">Log In</p> </Link>
            </div>
            </form>
            <div className="legal-states">
                <h1> States where you can bet today:</h1>
                <p> AZ | CO | CT | IL | IN | IO | MI | NH |NJ | PS | TN | VA | WV | WY </p>
                
                <p className="legal-desc"> Don't see your state? Get a sneak peek at Socklord Sportsbook no matter where you live. Even if you’re not from a state where Socklord Sportsbook offers sports betting, you can still see betting lines, receive exclusive offers and get info on when you can bet in your state.</p>
            </div>
            </div>
            
        </div>
        </div>
    )
}
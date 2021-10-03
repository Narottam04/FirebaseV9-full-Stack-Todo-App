import React,{useRef, useState} from 'react'
import '../login/style.css'
import {useAuth} from '../../Context/AuthContext'
import { Link} from 'react-router-dom'

function ForgotPassword() {
    const emailref = useRef()


    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const {resetPassword} = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailref.current.value)
            setMessage('Check your inbox for further Instructions')
        }
        catch {
            setError("Failed to reset your password")
        }
        setLoading(false)
    }
    return (
        <div className="wrapper">
         <div className="title">
            Password Reset
         </div>
         {error && <p className = "error">{error}</p> }
         {message && <p className = "success">{message}</p> }
         <form onSubmit = {handleSubmit}>
            <div className="field">
               <input type="text" ref = {emailref} required />
               <label>Email Address</label>
            </div>
            <div className="field">
               <input type="submit" disabled = {loading} value={loading ? "Give us a sec": "Change Password"} />
            </div>
            <div className="signup-link">
               <Link to = "/"> Log In to your account</Link>
            </div>
         </form>
      </div>
    )
}

export default ForgotPassword

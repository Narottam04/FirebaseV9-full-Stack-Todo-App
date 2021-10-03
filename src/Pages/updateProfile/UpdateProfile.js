import React,{useRef, useState} from 'react'
import '../login/style.css'
import {useAuth} from '../../Context/AuthContext'
import { Link,useHistory } from 'react-router-dom'

function UpdateProfile() {
    const usernameref = useRef()
    const emailref = useRef()
    const passwordref = useRef()
    const passwordconfirmref = useRef()

    const history = useHistory()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const {currentUser,updateUserEmail, updateUserPassword} = useAuth()

    function handleSubmit(e) {
        e.preventDefault()
        if(passwordref.current.value !== passwordconfirmref.current.value){
            return setError('Password do not match')
        }
        setError('')
        setLoading(true)
        const promises = []
        if(emailref !== currentUser.email){
            promises.push(updateUserEmail(emailref.current.value))
        }
        if(passwordref.current.value){
            promises.push(updateUserPassword(passwordref.current.value))
        }

        Promise.all(promises).then(()=> {
            history.push("/login")
        }).catch(()=> {
            setError("Failed to update the account")
        })
        .finally(()=> {
            setLoading(false)
        })
    }
    return (
        <div className="wrapper">
         <div className="title">
            Update Profile
         </div>
         {error && <p className = "error">{error}</p> }
         <form onSubmit = {handleSubmit}>
            <div className="field">
               <input type="text" ref = {usernameref}   />
               <label>Username</label>
            </div>
            <div className="field">
               <input type="text" ref = {emailref} defaultValue = {currentUser.email} />
               <label>Email Address</label>
            </div>
            <div className="field">
               <input type="password" ref = {passwordref} />
               <label>Password</label>
            </div>
            <div className="field">
               <input type="password" ref = {passwordconfirmref} />
               <label>Confirm Password</label>
            </div>
            <div className="field">
               <input type="submit" disabled = {loading} value={loading ? "Give us a sec": "Update"} />
            </div>
            <div className="signup-link">
               <Link to="/app">Cancel</Link>
            </div>
         </form>
      </div>
    )
}

export default UpdateProfile

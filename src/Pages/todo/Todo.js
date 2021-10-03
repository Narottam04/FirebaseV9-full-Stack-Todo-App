import React, { useEffect, useState, useRef } from 'react'
import bgImg from '../../images/bg-desktop-dark.jpg'
import checkSvg from '../../images/icon-check.svg'
import '../todo/style.css'
import {useAuth} from '../../Context/AuthContext'
import { useHistory } from 'react-router'

import nextId from "react-id-generator";

import {db} from '../../firebase'
import { collection, getDocs,addDoc,deleteDoc,doc,onSnapshot, setDoc, serverTimestamp  } from '@firebase/firestore'


function Todo() {
    const [error, setError] = useState('')
    let [data,setData] = useState([])
    const {currentUser,logout} = useAuth()

    const todoRef = useRef()
    const todoSubmitRef = useRef()
    const checkRef = useRef()

    const history = useHistory()
    console.log(currentUser.uid)
    async function handleLogout() {
        setError('')
        try {
            await logout()
            history.push("/")
        }
        catch{
            setError('failed to log out')
        }
    }


    function handleSubmit(e) {
        e.preventDefault()
        // console.log(todoSubmitRef.current.value)
        addDoc(collection(db,currentUser.uid),{
            status: "active",
            text: todoSubmitRef.current.value,
        })

        todoSubmitRef.current.value = ""
    }


    useEffect(()=> {
    
        return onSnapshot(collection(db,currentUser.uid),(snapshot) => {
            setData(snapshot.docs.map(doc => {
                return ({
                    id: doc.id,
                    ...doc.data()
                })
            }))
        })

    },[])

    function handleDelete(e) {
        let id =  e.target.dataset.remove
        console.log(id)
        deleteDoc(doc(db, currentUser.uid, id));
    }

    return (
        <>
            <div class="background-image">
                <img src={bgImg} alt="" srcset="" />
            </div>
            {error && <p className = "error">{error}</p> }
            {/* {currentUser && <p className = "success">{currentUser.displayName}</p> } */}
            <div class="container">

                <div class="header" >
                <div class="title">
                    TODO
                </div>
                <div class="theme">
                    <button className = "logout" onClick = {handleLogout}>Log Out</button>
                </div>
                </div>

                <div class="new-todo">
                <div class="check">
                    <div class="check-mark"></div>
                </div>
                <div class="new-todo-input">
                    <form onSubmit = {handleSubmit}>
                    <input id = "todo-input" ref = {todoSubmitRef}  type="text" placeholder="Create a new todo...."/>
                    </form>
                </div>
                </div>

                <div class="todo-items-wrapper">
                    <div ref = {todoRef} class="todo-items">
                        {
                            data.map(todos => {
                                return (
                                <div className="todo-item" key={todos.id}>
                                    <div ref={checkRef} className="check">
                                        <div className="check-mark"  onClick = {handleDelete} data-remove= {todos.id}>
                                            <img src={checkSvg} alt="" />
                                        </div>
                                    </div>
                                    <div className="todo-text">
                                        {todos.text}  
                                    </div>
                                </div>
                                // <TodoComponent key = {todos.id}  text = {todos.text}/>
                                )
                            })
                        }

                    </div>

                    <div class="todo-items-info">
                    <div class="items-left">
                        5 items left
                    </div>
                    <div class="items-statuses">
                        <span class="active">All</span>
                        <span>Active</span>
                        <span>Completed</span>
                    </div>
                    <div class="items-clear">
                        <span>Clear Completed</span>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo

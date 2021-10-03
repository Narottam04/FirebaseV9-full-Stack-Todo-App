import React from 'react'
import checkSvg from '../images/icon-check.svg'

function TodoComponent({key,text}) {

    function handleDelete(e) {
        // let id = checkRef.current.target.parentElement.getAttribute('key')
        let id =  e.currentTarget.getAttribute('data-value')
        console.log(id)
    }
    return (
        <li className="todo-item" key = {key}>
            <div className="check">
                <div className="check-mark" key = {key}  onClick = {handleDelete}>
                    <img src={checkSvg} alt="" key = {key} />
                </div>
            </div>
            <div className="todo-text">
                {text}  
            </div>
        </li>
    )
}

export default TodoComponent

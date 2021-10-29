import React, { useState, useContext } from 'react';
import { handleErrors } from './Login';
import { CredentialsContext } from '..';

function Todos() {

    const persist = () => {
        fetch(`http://localhost:4000/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials.username}:${credentials.password}`
            },
            body: JSON.stringify({
                todos
            })
        }).then(handleErrors)
        .then(() => {});
    }
    
    const [todos, setTodos] = useState([{text: "Sup?"}]);
    const [todoText, setTodoText] = useState("");
    const [credentials] = useContext(CredentialsContext);

    const addTodo = (e) => {
        e.preventDefault();
        if (!todoText) return;

        const newTodo = {checked: false, text: todoText}

        setTodos([...todos, newTodo]);
        setTodoText("");
        persist();
    }

    const toggleTodo = (index) => {
        const newTodoList = [...todos];
        newTodoList[index].checked = !newTodoList[index].checked;
        setTodos(newTodoList)
    }

    return (
        <div className="flex flex-col items-center mt-10">
            {todos.map((todo, index) => (
                <div>
                    <input onChange={() => toggleTodo(index)} type="checkbox"/>           
                    <label>{todo.text}</label>
                </div>
            ))}
            <br />
            <form onSubmit={addTodo}>
                <input value={todoText} onChange={(e) => setTodoText(e.target.value) } type="text" placeholder="Enter item here" className="input input-bordered" />
                <button type="submit" className="btn btn-outline btn-accent mt-5">Add</button>
            </form>
        </div>
    )
}

export default Todos

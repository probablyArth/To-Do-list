import React, { useState, useContext, useEffect } from 'react';
import { handleErrors } from '../pages/Login';
import { CredentialsContext } from '..';

import { MdRemoveCircleOutline } from "react-icons/md"


function Todos() {

    const [todos, setTodos] = useState([]);
    const [todoText, setTodoText] = useState("");
    const [credentials] = useContext(CredentialsContext)

    useEffect(() => {
        fetch(`https://todos-backend-prollyarth.herokuapp.com/todos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials.username}:${credentials.password}`
            }
        }).then((res) => res.json())
        .then(todos => setTodos(todos))
    }, [])

    const addTodo = (e) => {
        e.preventDefault();
        if (!todoText) return;

        const newTodo = {checked: false, text: todoText}
        setTodos([...todos, newTodo]);
        setTodoText("");
        fetch(`https://todos-backend-prollyarth.herokuapp.com/todos`, {
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

    const deleteTodo = (index) => {

        const newTodoList = [...todos];
        newTodoList.splice(index, 1);
        setTodos(newTodoList)
    }


    useEffect(() => {
        fetch(`https://todos-backend-prollyarth.herokuapp.com/todos`, {
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
    }, [todos])

    const toggleTodo = (index) => {
        const newTodoList = [...todos];
        newTodoList[index].checked = !newTodoList[index].checked;
        setTodos(newTodoList)
    }

    return (
        <div>
            <div class="p-6 card bordered shadow-lg mt-12">
                <div className="form-control">
                    {todos.map((todo, index) => (
                        <label className="cursor-pointer label">
                            <input checked={todo.checked} className="toggle" onChange={() => toggleTodo(index)} type="checkbox"/>
                            {todo.checked && <span className="line-through">{todo.text}</span>}{!todo.checked && <label>{todo.text}</label>}
                            <button onClick={() => deleteTodo(index)}><MdRemoveCircleOutline /></button>
                        </label>
                    ))}
                    <br />
                </div>
            </div>
            <form onSubmit={addTodo}>
            <input value={todoText} onChange={(e) => setTodoText(e.target.value) } type="text" placeholder="Enter item here" className="input input-bordered" />
            <button type="submit" className="btn btn-outline btn-accent mt-5">Add</button>
            </form>
        </div>
    )
}

export default Todos

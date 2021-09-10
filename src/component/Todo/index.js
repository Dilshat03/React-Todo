import React, {useEffect, useState} from 'react';

import ListItem from "../listitem";
import axios from "axios";
import Header from "../TodoHeader";

const Todo = () => {
    const [todos, setTodos] = useState([])
    const [newTodo, setNewTodo] = useState('')


    const handleChange = (e) => {
        setNewTodo(e.target.value)
    }

    const addTodo = () => {

        const nameItem = {
            title: newTodo,
            createDate: +new Date(),
            isDone:false
        }


        axios.post('https://613b6401110e000017a455d2.mockapi.io/api/todos', nameItem)
            .then(({data}) => setTodos([...todos, data]))

        setNewTodo('')
    }
    const delBtn = (id) => {
        axios.delete(`https://613b6401110e000017a455d2.mockapi.io/api/todos/${id}`)
            .then(() => setTodos(todos.filter(el => el.id !== id)))
    }
    const upDateTodo = (upDate,id) => {
        axios.put(`https://613b6401110e000017a455d2.mockapi.io/api/todos/${id}`,{title:upDate})
            .then(({data})=>setTodos(todos.map(item => item.id === id ? data : item)))
    }

    useEffect(() => {
        axios('https://613b6401110e000017a455d2.mockapi.io/api/todos')
            .then(({data}) => setTodos(data))
    }, [])

    const handleCheck = (id,status) => {
        axios.put(`https://613b6401110e000017a455d2.mockapi.io/api/${id}`, {isDone:!status})
            .then(({data}) => setTodos(data))
    }
    return (
        <div className='row offset-md-4 my-5'>
            <div className='col-6'>
                <Header  todos={todos.length}/>

                <div className='d-flex'>
                    <input type="text" className='input-group me-3 glav-input' onChange={handleChange} value={newTodo}
                           onKeyPress={el => {
                               if (el.key === 'Enter') addTodo()
                           }}/>
                    <button type='button' className='btn btn-primary' onClick={addTodo} disabled={!newTodo.trim()}>Добавить</button>
                </div>
                <ul className='list-group mt-4'>
                    {
                        todos.map(el =>
                            <ListItem key={el.id} el={el} del={delBtn} newTodo={setNewTodo} setTodos={setTodos}
                                      upDateTodo={upDateTodo} handleCheck={handleCheck}/>
                        )

                    }
                </ul>
            </div>
        </div>
    );
};

export default Todo;
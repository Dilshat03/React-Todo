import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faSave, faTrash,faCheck} from "@fortawesome/free-solid-svg-icons";

const ListItem = ({el, del, upDateTodo,handleCheck}) => {
    const [edit, setEdit] = useState(false)
    const [upDate, setUpDate] = useState(el.title)
    const handleUp = (e) => {
        setUpDate(e.target.value)
    }
    const handleSave = () => {
        upDateTodo(upDate, el.id)
        setEdit(false)
    }
    return (
        <div>
            <li key={el.id}
                className='list-group-item d-flex justify-content-between align-items-center'>
                {
                    edit ? <input type="text" defaultValue={upDate} onChange={handleUp} className='title-name'/> : <span className={`${el.isDone && 'text-secondary text-decoration-line-through'}`}>{el.title}</span>
                }
                <div>
                    <button className='btn btn-success me-2' onClick={handleCheck}><FontAwesomeIcon icon={faCheck} id={el.id} isDone={el.isDone}/></button>
                    <button type='button' onClick={() => edit ? handleSave() : setEdit(true)}
                            className='btn btn-warning me-2 text-light'>
                        {
                            edit ? <FontAwesomeIcon icon={faSave}/> : <FontAwesomeIcon icon={faEdit}/>
                        }
                    </button>
                    <button type='button' className='btn btn-danger' onClick={() => del(el.id)}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </div>
            </li>
        </div>
    );
};

export default ListItem;
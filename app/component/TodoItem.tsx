import { useEffect, useState } from "react";
import React from 'react'


interface TodoItemProps{
    todo:{id:number; text: string};
    removeTodo: (id: number)=> void;
    editTodo: (id: number, newText: string)=> void;
    startEdit: (id: number) => void;
    isEditing: boolean;
}

export default function TodoItem({todo, removeTodo, editTodo, startEdit, isEditing }:TodoItemProps) {
    const [editedText, setEditedText] = useState<string>(todo.text);
    const [completed, setCompleted] = useState<boolean>(false);

    useEffect(() => {
      setEditedText(todo.text);
    }, [todo.text, isEditing]);

    const handleEdit = ():void => {
        editTodo(todo.id, editedText);
      };
  
    return (
    <li className='my-3 px-3 py-3  bg-slate-100  rounded-lg flex justify-between '>
        {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
           
          />
          <button className='mx-2 px-2 rounded-md bg-green-600 text-white' onClick={handleEdit}>Save</button>
        </>
      ) : (
    <> 
    <div className="flex justify-items-start"> 
    <input type="checkbox" 
    checked={completed}
    onChange={() => setCompleted(!completed)} />
    <div className= "ml-2"  style={{textDecoration: completed ? "line-through": "none"}}> 
    {todo.text}
    </div>
    </div>
    <div className="justify-items-end ml-4" >
    <button className='mr-2 px-2 rounded-md bg-indigo-200  text-white' onClick={() => startEdit(todo.id)}>Edit</button>
    <button className='ml-2 px-2 rounded-md bg-red-500 text-white'  onClick={() => removeTodo(todo.id)}>Remove</button>
    </div>
    </>
    )}
    </li>
  )
}

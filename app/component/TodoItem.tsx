import { useState } from "react";
import React from 'react'


interface TodoItemProps{
    todo:{id:string; text: string};
    removeTodo: (id: string)=> void;
    editTodo: (id: string, newText: string)=> void;
    startEdit: (id: string) => void;
    isEditing: boolean;
}

export default function TodoItem({todo, removeTodo, editTodo, startEdit, isEditing }:TodoItemProps) {
    const [editedText, setEditedText] = useState<string>(todo.text);
    
    const handleEdit = (): void => {
        editTodo(todo.id, editedText);
      };
  
    return (
    <li className='my-3 px-3 py-3  bg-slate-100  rounded-lg flex justify-around gap-28'>
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
    <div className="justify-items-start"> 
    {todo.text}
    </div>
    <div className="justify-items-end">
    <button className='mr-2 px-2 rounded-md bg-indigo-200  text-white' onClick={() => startEdit(todo.id)}>Edit</button>
    <button className='ml-2 px-2 rounded-md bg-red-500 text-white'  onClick={() => removeTodo(todo.id)}>Remove</button>
    </div>
    </>
    )}
    </li>
  )
}

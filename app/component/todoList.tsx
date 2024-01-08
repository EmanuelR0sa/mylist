
"use client"
import React, {useState, useId } from 'react'
import TodoItem from './TodoItem';

interface Todo{
    id: string;
    text: string;
}



export default function todoList(){
    const [todos, setTodos]= useState<Todo[]>([]);
    const[newTodo, setNewTodo]= useState<string>("");
    const [editMode, setEditMode] = useState<string | null>(null);
    const newId= useId();

    const addTodo=(): void=>{
        if(newTodo.trim() !== ""){
            setTodos([...todos, { id: newId, text: newTodo}]);
            setNewTodo("");
        }
    };

    const removeTodo = (id:string): void =>{
        setTodos(todos.filter(todo=> todo.id !==id));
    }

    const startEdit = (id: string): void => {
        setEditMode(id);
      };

    const editTodo = (id: string, newText: string): void => {
        setTodos(todos.map(todo =>
          todo.id === id ? { ...todo, text: newText } : todo
        ));
        setEditMode(null);
      };

  return (
    <div>
         
        <div className='flex flex-col items-center justify-center p-24'>
        <h1 className='text-2xl text-center font-bold mb-4'>Todo List</h1> 
        <div> 
        <input
        className="border-2 border-current mx-4 rounded-lg"
          type="text" 
        value= {newTodo}
        onChange={(e)=> setNewTodo(e.target.value)}
        />
        <button className="bg-indigo-500 rounded-md px-4  text-white" onClick={addTodo} >Add</button>
        </div>
        <div >
            <ul>
{todos.map((todo) =>( 
<TodoItem  
key={todo.id} 
todo={todo} 
removeTodo={removeTodo}  
editTodo={editTodo}
startEdit={startEdit}
isEditing={editMode === todo.id}
/>))}

            </ul>
        </div>
         </div>
    </div>
  )
}

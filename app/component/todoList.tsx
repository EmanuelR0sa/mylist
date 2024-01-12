
"use client"
import React, {useState, useEffect } from 'react'
import TodoItem from './TodoItem';

interface Todo{
    id: number;
    text: string;
  
}



export default function todoList(){
  const storedTodoString = localStorage.getItem("myTodos");
  const initialTodos: Todo[] = storedTodoString ? JSON.parse(storedTodoString) : [];

    const [todos, setTodos]= useState<Todo[]>(initialTodos);
    const[newTodo, setNewTodo]= useState<string>("");
    const [editTodoId, setEditTodoId] = useState<number | null>(null);
   
useEffect(()=>{
  localStorage.setItem("myTodos", JSON.stringify(todos))
},[todos])


    const addTodo=(): void=>{
        if(newTodo.trim() !== ""){
            setTodos([...todos, { id: Date.now(), text: newTodo}]);
            setNewTodo("");
        }
    };

    const removeTodo = (id:number): void =>{
        setTodos(todos.filter(todo=> todo.id !==id));
        if (editTodoId === id) {
          setEditTodoId(null);
        }
    }

    const startEdit = (id: number): void => {
      setEditTodoId(id);
      };

    const editTodo = (id: number, newText: string): void => {
        setTodos(todos.map(todo =>
          todo.id === id ? { ...todo, text: newText } : todo
        ));
        setEditTodoId(null);
      };



  return (
    <div>
         
        <div className='flex flex-col items-center justify-center p-24'>
        <h1 className='text-2xl text-center font-bold mb-4'>Todo List</h1> 
        <div> 
        <input
        className="border-2 border-current mx-4 rounded-lg  pl-2"
          type="text" 
        value= {newTodo}
        placeholder="...Add new todo"
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
isEditing={editTodoId === todo.id}
/>))}

            </ul>
        </div>
         </div>
    </div>
  )
}



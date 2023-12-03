import { CornerUpLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Todo.css'

export const Todo = () => {
  const {todoId}=useParams()
  const [todo,setTodo] = useState('')
const navigate=useNavigate()

  useEffect(() => {
    const todosInStorage =JSON.parse(localStorage.getItem('todos'))

    if(todosInStorage){
      const selectedTodo = todosInStorage[todoId]
      if(selectedTodo) setTodo(selectedTodo)
    }
  }, [])
  
  return (
    <div className='container'>
      {/* {todoId}. {todo} */}
      <h3 className='todo-title'>{todo}</h3>
      <CornerUpLeft className='back-icon' onClick={()=>navigate('/tasks')}/>

      </div>

  )
}

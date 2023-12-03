import React, { useEffect, useState } from 'react'
import './Tasks.css'
import { Accessibility,Trash2, FileEdit, Loader2} from 'lucide-react';
import { Link } from 'react-router-dom';
import { wait } from '../lib/utils';
import { error, success } from '../lib/notification';


export const Tasks = () => {
    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])
    const [todoIndex,setTodoIndex] = useState(-1)
    const [onClickCheck,setCnClickCheck] = useState(false)



    useEffect(() => {
     // console.log(localStorage.getItem('todos'))
        const todosInStorage = JSON.parse(localStorage.getItem('todos'))
        if(todosInStorage){
            setTodos(todosInStorage);
        }
    },[todo])

    


    const handleAddTodo = async () => {
        if(!todo) return;
        setCnClickCheck(true)
        await wait(1000)
        try{
        if(todoIndex > -1){
            todos[todoIndex] = todo
            setTodoIndex(-1)
            localStorage.setItem('todos',JSON.stringify(todos))
            success('task updated successfully')

        }
        else {
            const allTodos=[...todos, todo]
           // setTodos(allTodos)
            localStorage.setItem('todos',JSON.stringify(allTodos))
            success('task added successfully')

            //setTodos([...todos, todo])/* השלוש נקודות זה כל האיברים הקודמים במערך, לוקח את כל האיברים הקודמים ומוסיף איבר חדש*/
            
        }
        setTodo('')
    }catch (err){
        error(err?.messege)
    }finally{
        setCnClickCheck(false)

    }
    }
    const handleDeleteTodo = async (index) => {
        
        await wait(500);
        const newTodos=[...todos];
        newTodos.splice(index, 1);//מקבל את המיקום וכמה למחוק
        //newTodos.at()//לקבל את האיבר האחרון
        setTodos(newTodos)
        localStorage.setItem('todos',JSON.stringify(newTodos))
        success('task deleted successfully')


    }
    const handleDeleteAll= async () =>{
        await wait(500);
        const newTodos=[];
        setTodos(newTodos);
        localStorage.setItem('todos',JSON.stringify(newTodos))
        success('all task deleted successfully')
    }

    const handleUpdateTodo = (index) => {
        setTodo(todos[index])
        setTodoIndex(index)

    }

    return (
    <div className='container'>
        <div>
            <input 
                onChange={({target})=>setTodo(target.value)}
                value={todo}
                className='task-input' 
                disabled={onClickCheck}
                placeholder='Add a new task...' 
                onKeyDown={(e) => {
                    if(e.key === 'Enter'){
                        handleAddTodo()
                    }
                }}
            />
            {!onClickCheck ? (
            <Accessibility 
                onClick={handleAddTodo}
                className='task-icon' 
                style={{cursor:todo ? 'pointer':'not-allowed'}}
            />
            ):(
                <Accessibility className='task-icon loading'/>
            )}
        </div>
        <div className='todos-wrapper'>
            {todos?.map((todo, index)=>(
               <div className='todo-item' key={index}>
                    <Link to={`/todo/${index}`} className='todo-link'>
                        <span style={{opacity: todoIndex === index ? 0.5 : 1}}>
                          {index+1}.{todo}
                        </span>
                    </Link>

                    <div>
                        <FileEdit 
                        onClick={()=>handleUpdateTodo(index)}
                        className='pencil-icon' />
                        <Trash2 
                        onClick={()=>handleDeleteTodo(index)}
                        className='trash-icon'
                        // className={`trash-icon ${onClickCheck ? 'loading':null}`}

                        />
                    </div>                    
                </div>
                
            ))}
            
            <div className='todo-item'>
                {(todoIndex === -1 && onClickCheck) && <span style={{opacity: 0.5}}>
                    {todos.length + 1}.{todo}
                </span>}
            </div>
            
        </div>
        <div>
        <Trash2 
                        onClick={()=>handleDeleteAll()}
                        className='trash-icon'
                        // className={`trash-icon ${onClickCheck ? 'loading':null}`}

                        />
        </div>
    </div>
    
  )
}

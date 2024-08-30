import React, {useState} from 'react'
import { TodoForms } from './TodoForms'
import { v4 as uuidv4} from "uuid";
import { Todo } from './Todo';
import { EditTodoForms } from './EditTodoForm.js';
import { ConfirmDialog } from './ConfirmDialog.js';
import { MoodCheck } from './MoodCheck.js';
uuidv4();

export const TodoWrapper = () => {
    const [todos,setTodos] = useState([])
    const [todoToDelete, setTodoToDelete] = useState(null)
    const addTodo = todo => {
        setTodos([...todos, {
            id:uuidv4(),
            task: todo,
            completed:false,
            isEditing:false 
        }])
    }

        const toggleComplete = (id) => {
            setTodos(
                todos.map((todo) => 
                   todo.id === id ? { ...todo,completed: !todo.completed } : todo
            ));
        }

        const handleOpenDeleteModale = (todo) => {
            setTodoToDelete(todo)
        }   

        const handleCloseDeleteModale = () => {
            setTodoToDelete(null)
        }
        const confirmDeleteTask = () =>{
            setTodos(todos.filter((x) => x.id !== todoToDelete.id))
            handleCloseDeleteModale();
        }
        const editTodo = (id) => {
            setTodos(x => todos.map((x) =>
                x.id === id? {...x, isEditing: !x.isEditing}: x
            ))
        }
        const editTask = (task, id) => {
            setTodos(todos.map( todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing}: todo
            ))
        }

  return (
    <div className='TodoWrapper'>
        <h1>Get tasks done!</h1>
        <TodoForms
            addTodo={addTodo}
        />
         <div className="mood-check" > <MoodCheck/> </div>

        {todos.map( todo => (
            todo.isEditing? 
            (<EditTodoForms
                key={todo.id} 
                task={todo}
                editTodo={editTask}
                />):
            (<Todo 
                task={todo} key={todo.id} 
                toggleComplete={toggleComplete}
                deleteTask={() => handleOpenDeleteModale(todo)}
                editTodo={editTodo}
            />)
        ) )}
            {}
            <ConfirmDialog
                open={!!todoToDelete} 
                onClose={handleCloseDeleteModale} 
                task={todoToDelete?.task || ''} 
                onConfirm={confirmDeleteTask}
            />
    </div>
  )
}

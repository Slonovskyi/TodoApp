import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const Todo = ({toggleComplete, task, deleteTask, editTodo }) => {
  return (
    <div className="Todo">
            <p
                className={`${task.completed ?  "completed" : "" }`}
                onClick={()=>toggleComplete(task.id)}
            >{task.task}</p>

            <div>
            <EditIcon style={{ cursor: 'pointer' }} onClick={() => editTodo(task.id)} />
            <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => deleteTask()} />
            </div>
    </div>
  )
}

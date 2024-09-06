import React, {useState} from 'react';
import { TextField, Button } from '@mui/material';

export const TodoForms = ({addTodo}) => {
    const [value, setValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const trimedValue = value.trim()
        if(trimedValue) {
            addTodo(value)
            setValue("")
        } else (
            alert("Cant add empty task to todo list")
        )
        

    }

  return (
    <form   className="TodoForm"
            onSubmit={handleSubmit}    
    >
        <TextField 
            type = "text" 
            className = "todo-input" 
            placeholder = "What the task today "
            onChange={(e) => setValue(e.target.value)}
            value={value}
            style={{ marginBottom: '1rem', color: 'red' }}
            sx={{
                '& .MuiInputBase-input': {
            color: '#1556ff', // Custom color for input value
          },
                '& .MuiInputBase-input::placeholder': {
                  color: '#1556ff', // Custom placeholder color
                  opacity: 1, // Ensures color is applied properly
                },
              }}
            />
        <Button 
            type="submit"
            className='todo-btn'
            variant="contained" 
                color="primary"
                fullWidth
        >Add Task</Button>

    </form>
  )
}

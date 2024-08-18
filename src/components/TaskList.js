import React,{ useState } from "react";
import Task from './Task';
import { getDefaultNormalizer } from "@testing-library/react";

function TaskList({setIsActive,setActiveTask}){
    const [tasks,setTasks] = useState([]);
    const [input,setInput] = useState('');
    const [activeTaskId,setActiveTaskId] = useState(null);
    const [errorMessage,setErrorMessage] = useState('');

    const addTask = () => {
        if(input.trim() === ''){
            console.log('Empty input, no task added');
            return;
        }

        const newTask = { id: Date.now(),text:input,completed:false,timeSpent: 0};
        setTasks([...tasks,newTask]);
        setInput('');
        setErrorMessage('');
    };

    const deleteTask = id => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    const toggleTask = id => {
        setTasks(tasks.map(task => task.id === id ? {...task,completed: !task.completed} : task));
    }

    const handlePomodoroSet = (task) => {
        console.log('Setting Pomodoro for:',task.text);
        setIsActive(true);
        setActiveTask(task);
    }

    return(
        <div>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={addTask}>タスク追加</button>
            {errorMessage && <div style={{color:'red'}}>{errorMessage}</div>}
            {tasks.map(task => (
                <Task 
                key={task.id} 
                task={task}
                onDelete={() => deleteTask(task.id)}
                onToggle={() => toggleTask(task.id)}
                onPomodoroSet={() => handlePomodoroSet(task)}
                />
            ))}
        </div>
    );
}

export default TaskList;
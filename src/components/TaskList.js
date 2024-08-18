import React,{ useEffect, useState } from "react";
import Task from './Task';

function TaskList({setIsActive,setActiveTask}){
    const [tasks,setTasks] = useState([]);
    const [input,setInput] = useState('');
    const [errorMessage,setErrorMessage] = useState('');

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        console.log('Loaded from localStorage:', storedTasks);
        if (storedTasks && storedTasks !== '[]') {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);
    
    useEffect(() => {
        console.log('Saving to localStorage:', JSON.stringify(tasks));
        if(tasks.length > 0){
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    const addTask = () => {
        if (input.trim() === '') {
            setErrorMessage('Please enter a task.');
            return;
        }
        const newTask = { id: Date.now(), text: input, completed: false, timeSpent: 0 };
        setTasks(prevTasks => [...prevTasks, newTask]);
        setInput('');
        setErrorMessage('');
    };

    const deleteTask = id => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    const toggleTask = id => {
        setTasks(prevTasks => prevTasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };


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
                onDelete={deleteTask}
                onToggle={toggleTask}
                onPomodoroSet={() => handlePomodoroSet(task)}
                />
            ))}
        </div>
    );
}

export default TaskList;
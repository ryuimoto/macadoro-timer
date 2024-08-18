import React,{ useState } from "react";
import Task from './Task';
import { getDefaultNormalizer } from "@testing-library/react";

function TaskList(){
    const [tasks,setTasks] = useState([]);
    const [input,setInput] = useState('');

    const addTask = () => {
        const newTask = { id: Date.now(),text:input,completed:false};
        setTasks([...tasks,newTask]);
        setInput('');
    };

    const deleteTask = id => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    const toggleTask = id => {
        setTasks(tasks.map(task => task.id === id ? {...task,completed: !task.completed} : task));
    }

    return(
        <div>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={addTask}>タスク追加</button>
            {tasks.map(task => (
                <Task key={task.id} task={task} onDelete={deleteTask} onToggle={toggleTask}/>
            ))}
        </div>
    );
}

export default TaskList;
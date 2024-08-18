import './App.css';
import TaskList from './components/TaskList';
import PomodoroTimer from './components/PomodoroTimer';
import { useState } from 'react';

function App() {
  const [isActive, setIsActive] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  

  return (
    <div className='App'>
      <h1>macadoro-timer</h1>
      <TaskList setIsActive={setIsActive} setActiveTask={setActiveTask}/>
      <PomodoroTimer isActive={isActive} activeTask={activeTask} setIsActive={setIsActive}/>
    </div>
  );
}

export default App;

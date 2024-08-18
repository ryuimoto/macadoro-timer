import logo from './logo.svg';
import './App.css';
import TaskList from './components/TaskList';
import PomodoroTimer from './components/PomodoroTimer';
import { useState } from 'react';

function App() {
  const [isActive,setIsActive] = useState(false);



  return (
    <div className='App'>
      <h1>macadoro-timer</h1>
      <TaskList isActive={isActive} setIsActive={setIsActive}/>
      <PomodoroTimer isActive={isActive} setIsActive={setIsActive}/>
    </div>
  );
}

export default App;

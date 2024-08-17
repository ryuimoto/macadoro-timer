import logo from './logo.svg';
import './App.css';
import TaskList from './components/TaskList';
import PomodoroTimer from './components/PomodoroTimer';

function App() {
  return (
    <div className='App'>
      <h1>macadoro-timer</h1>
      <TaskList/>
      <PomodoroTimer/>
    </div>
  );
}

export default App;

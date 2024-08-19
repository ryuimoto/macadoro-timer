import React, { useState, useEffect } from "react";
import CircularProgress from "./CircularProgress";

function PomodoroTimer({ activeTask }) {
    const totalSeconds = 25 * 60;

    const [secondsLeft, setSecondsLeft] = useState(() => {
        const savedSeconds = localStorage.getItem('secondsLeft');
        return savedSeconds !== null && !isNaN(savedSeconds) ? Number(savedSeconds) : 25 * 60;
    });

    const [progress,setProgress] = useState((secondsLeft / totalSeconds) * 100);
   
    const [isActive, setIsActive] = useState(() => {
        const savedIsActive = localStorage.getItem('isActive');
        return savedIsActive ? savedIsActive === 'true' : false;
    });
    const [isPaused, setIsPaused] = useState(() => 
        localStorage.getItem('isPaused') === 'true');
    const [isWorking, setIsWorking] = useState(() => 
        localStorage.getItem('isWorking') !== 'false');
    const [pomodoroCount, setPomodoroCount] = useState(() => 
        Number(localStorage.getItem('pomodoroCount')) || 0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isActive && !isPaused) {
                if (secondsLeft > 0) {
                    setSecondsLeft(prev => prev -1);
                    localStorage.setItem('secondsLeft', secondsLeft - 1);
                } else {
                    setIsActive(false);
                    setIsWorking(!isWorking);
                    setSecondsLeft(isWorking ? 5 * 60 : 25 * 60);
                    localStorage.setItem('isActive', false);
                    localStorage.setItem('isWorking', !isWorking);
                    if (isWorking) {
                        setPomodoroCount(pomodoroCount + 1);
                        localStorage.setItem('pomodoroCount', pomodoroCount + 1);
                    }
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive, isPaused, secondsLeft, isWorking, pomodoroCount]);

    useEffect(() => {
        localStorage.setItem('isActive', isActive);
        localStorage.setItem('isPaused', isPaused);
        localStorage.setItem('isWorking', isWorking);
        localStorage.setItem('pomodoroCount', pomodoroCount);
        localStorage.setItem('secondsLeft', secondsLeft);
    }, [isActive, isPaused, isWorking, pomodoroCount, secondsLeft]);

    useEffect(() => {
        setProgress((secondsLeft / totalSeconds) * 100);
    },[secondsLeft]);

    const handleStart = () => {
        setIsActive(true);
        localStorage.setItem('isActive', true);
    };

    const handlePause = () => {
        setIsPaused(true);
        localStorage.setItem('isPaused', true);
    };

    const handleContinue = () => {
        setIsPaused(false);
        localStorage.setItem('isPaused', false);
    };

    const handleStop = () => {
        setIsActive(false);
        setIsPaused(false);
        setSecondsLeft(25 * 60);
        setPomodoroCount(0);
        localStorage.setItem('isActive', false);
        localStorage.setItem('isPaused', false);
        localStorage.setItem('secondsLeft', 25 * 60);
        localStorage.setItem('pomodoroCount', 0);
    };

    const formatTime = () => {
        const minutes = Math.floor(secondsLeft / 60);
        const seconds = secondsLeft % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div style={{ backgroundColor: isWorking ? 'red' : 'lightblue' }}>
             <br/>
             <CircularProgress 
                size={300}
                progress={progress}
                strokeWidth={10}
                circleOneStroke="#eee"
                circleTwoStroke="#ffffff" // 色を変更して視認性を向上
                timeLeft={formatTime(secondsLeft)}
                activeTask={activeTask}
            />
            <h3>Pomodoro Count: {pomodoroCount}</h3>
            {!isActive ? (
                <button onClick={handleStart}>スタート</button>
            ) : (
                <>
                    {isPaused ? (
                        <>
                            <button onClick={handleContinue}>続ける</button>
                            <button onClick={handleStop}>終了</button>
                        </>
                    ) : (
                        <button onClick={handlePause}>一時停止</button>
                    )}
                </>
            )}
        </div>
    );
}

export default PomodoroTimer;

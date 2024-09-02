import React, { useState, useEffect } from "react";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

function PomodoroTimer({ activeTask }) {
    const totalSeconds = 25 * 60;
    const audio = new Audio('public/audio/alert.mp3');

    const [secondsLeft, setSecondsLeft] = useState(() => {
        const savedSeconds = localStorage.getItem('secondsLeft');
        return savedSeconds !== null && !isNaN(savedSeconds) ? Number(savedSeconds) : 25 * 60;
    });

    const [progress, setProgress] = useState((secondsLeft / totalSeconds) * 100);

    useEffect(() => {
        setProgress((secondsLeft / totalSeconds) * 100);
    }, [secondsLeft]);

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
                setSecondsLeft(prevSeconds => {
                    if(prevSeconds > 0){
                        return prevSeconds - 1;
                    }else{
                        setIsActive(false);
                        setIsWorking(!isWorking);
                        if(isWorking){
                            setPomodoroCount(pomodoroCount + 1);
                            audio.play();
                        }
                        return isWorking ? 5 * 60 : 25 * 60;
                    }
                });
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
    },[secondsLeft,totalSeconds]);

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

    const timeLeft = formatTime();

    return (
        <Box 
            style={{ 
                padding: 20,
            }}
        >
            <CircularProgressWithLabel value={progress} label={timeLeft} size={200} />
            <Typography variant="h6" align="center">
                {activeTask ? `${activeTask.text}を作業中` : "タスクなし"}
            </Typography>
            <h3>Pomodoro Count: {pomodoroCount}</h3>
            <Button variant="contained" color="primary" onClick={handleStart}>Start</Button>
            <Button variant="contained" color="secondary" onClick={handlePause} disabled={!isActive}>Pause</Button>
            <Button variant="contained" color="success" onClick={handleContinue} disabled={!isPaused}>Continue</Button>
            <Button variant="contained" color="error" onClick={handleStop} disabled={!isActive}>Stop</Button>
        </Box>
    );
}

export default PomodoroTimer;

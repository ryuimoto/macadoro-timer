import React, { useEffect, useState } from "react";

function PomodoroTimer({ isActive, setIsActive, activeTask }) {
    const [secondsLeft, setSecondsLeft] = useState(25 * 60);
    const [isWorking, setIsWorking] = useState(true);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        let interval;
        if (isActive && !isPaused) {
            interval = setInterval(() => {
                if (secondsLeft > 0) {
                    setSecondsLeft(secondsLeft - 1);
                } else {
                    setIsActive(false);  // タイマーを停止
                    setIsWorking(!isWorking);  // 作業/休憩モードを切り替え
                    setSecondsLeft(isWorking ? 5 * 60 : 25 * 60);
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive,isWorking,isPaused,secondsLeft]);

    const handleStart = () => {
        setIsActive(true);
    }

    const handlePause = () => {
        setIsPaused(true);
    };

    const handleContinue = () => {
        setIsPaused(false);
    }

    const handleStop = () => {
        setIsActive(false);
        setIsPaused(false);
        setSecondsLeft(25 * 60);
    }

    return (
        <div style={{ backgroundColor: isWorking ? 'red' : 'lightblue' }}>
            <h2>Time left: {Math.floor(secondsLeft / 60)}:{secondsLeft % 60 < 10 ? '0' : ''}{secondsLeft % 60}</h2>
            {activeTask && <h3>{activeTask.text} を実行中</h3>}
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

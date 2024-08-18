import React, { useEffect, useState } from "react";

function PomodoroTimer({ isActive, setIsActive, activeTask }) {
    const [secondsLeft, setSecondsLeft] = useState(25 * 60);
    const [isWorking, setIsWorking] = useState(true);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                if (secondsLeft > 0) {
                    setSecondsLeft(secondsLeft - 1);
                } else {
                    setIsActive(false);  // タイマーを停止
                    setIsWorking(!isWorking);  // 作業/休憩モードを切り替え
                    setSecondsLeft(isWorking ? 5 * 60 : 25 * 60);  // 次のセッション時間を設定
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, secondsLeft, isWorking, setIsActive]);

    return (
        <div style={{ backgroundColor: isWorking ? 'red' : 'lightblue' }}>
            <h2>Time left: {Math.floor(secondsLeft / 60)}:{secondsLeft % 60 < 10 ? '0' : ''}{secondsLeft % 60}</h2>
            {activeTask && <h3>{activeTask.text} を実行中</h3>}
        </div>
    );
}

export default PomodoroTimer;

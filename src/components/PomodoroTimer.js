import React,{useState,useEffect} from "react";

function PomodoroTimer(){
    const [secondsLeft,setSecondsLeft] = useState(25 * 60);
    const [isActive,setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if(isActive && secondsLeft > 0){
            interval = setInterval(() => {
                setSecondsLeft(secondsLeft - 1);
            },1000);
        }else if(!isActive && secondsLeft !== 0){
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    },[isActive,secondsLeft]);

    const toggleIsActive = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setSecondsLeft(25 * 60);
        setIsActive(false);
    };

    return (
        <div>
            <h2>{`Time Left: ${Math.floor(secondsLeft / 60)}:${secondsLeft % 60 < 10 ? '0' : ''}${secondsLeft % 60}`}</h2>
            <button onClick={toggleIsActive}>
                {isActive ? 'Pause' : 'Start'}
            </button>
            <butto onClick={resetTimer}>Reset</butto>
        </div>
    );
}

export default PomodoroTimer;
import React from "react";

function Task({task,onDelete,onToggle,setActiveTaskId,onPomodoroSet}){
    return(
        <div>
            <h3>
                {task.text}
                <button onClick={() => onDelete(task.id)}>削除</button>
                <button onClick={() => onToggle(task.id)}>完了</button>
                <button onClick={() => {
                   if(typeof onPomodoroSet === 'function'){
                    onPomodoroSet(task);
                   }else{
                    console.log('onPomodoroSet is not a function',onPomodoroSet);
                   }
                }}>ポモドーロにセット</button>
                　{Math.floor(task.timeSpent)} 分
            </h3>
        </div>
    );
}

export default Task;
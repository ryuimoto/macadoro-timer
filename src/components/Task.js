import React from "react";

function Task({task,onDelete,onToggle,setActiveTaskId}){
    return(
        <div>
            <h3>
                {task.text}
                <button onClick={() => onDelete(task.id)}>削除</button>
                <button onClick={() => onToggle(task.id)}>完了</button>
            </h3>
            <div onClick={() => setActiveTaskId(task.id)}>
                {task.text} - {task.timeSpent}秒
            </div>
        </div>
    );
}

export default Task;
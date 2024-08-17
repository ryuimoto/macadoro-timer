import React from "react";

function Task({task,onDelete,onToggle}){
    return(
        <div>
            <h3>
                {task.text}
                <button onClick={() => onDelete(task.id)}>削除</button>
                <button onClick={() => onToggle(task.id)}>完了</button>
            </h3>
        </div>
    );
}

export default Task;
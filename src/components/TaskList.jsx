import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onCompleteTask, onDeleteTask, onEditTask }) {
    return (
        <div className="bg-white shadow-md rounded p-6 mb-4">
            <h5 className="text-xl font-semibold mb-4 text-gray-800">Tasks</h5>
            {tasks.length === 0 ? (
                <p className="text-gray-700">No tasks to display.</p>
            ) : (
                <ul className="list-none">
                    {tasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onCompleteTask={() => onCompleteTask(task.id)}
                            onDeleteTask={() => onDeleteTask(task.id)}
                            onEditTask={() => onEditTask(task.id)}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TaskList;
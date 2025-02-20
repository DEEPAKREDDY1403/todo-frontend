import React from 'react';

function TaskItem({ task, onCompleteTask, onDeleteTask, onEditTask }) {
  return (
    <li className="flex justify-between items-center py-3 border-b border-gray-200">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onCompleteTask}
          className="mr-3 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <span className="text-gray-700"> {/* Removed the conditional class */}
          {task.description} (Priority: {task.priority}, Due: {task.dueDate} {task.dueTime})
        </span>
      </div>
      <div className="space-x-2">
        <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={onEditTask}>
          Edit
        </button>
        <button className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={onDeleteTask}>
          Remove
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
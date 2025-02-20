import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { useAuth0 } from '@auth0/auth0-react';
import { v4 as uuidv4 } from 'uuid';

function AddTask({ onAddTask, taskToEdit, onUpdateTask, onCancelEdit }) {
    const [description, setDescription] = useState(taskToEdit ? taskToEdit.description : '');
    const [priority, setPriority] = useState(taskToEdit ? taskToEdit.priority : 'Medium');
    const [dueDate, setDueDate] = useState(taskToEdit ? new Date(taskToEdit.dueDate) : new Date());
    const [dueTime, setDueTime] = useState(taskToEdit ? taskToEdit.dueTime : '10:00');
    const { user, isAuthenticated } = useAuth0();
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (taskToEdit) {
            setIsEditing(true);
            setDescription(taskToEdit.description);
            setPriority(taskToEdit.priority);
            setDueDate(new Date(taskToEdit.dueDate));
            setDueTime(taskToEdit.dueTime);
        } else {
            setIsEditing(false);
            setDescription('');
            setPriority('Medium');
            setDueDate(new Date());
            setDueTime('10:00');
        }
    }, [taskToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!description.trim()) {
            alert('Please enter a task description.');
            return;
        }

        const taskData = {
            id: isEditing ? taskToEdit.id : uuidv4(),
            description: description.trim(),
            priority: priority,
            dueDate: dueDate.toISOString(),
            dueTime: dueTime || '10:00',
            completed: taskToEdit ? taskToEdit.completed : false,
            userEmail: isAuthenticated && user ? user.email : '',
        };

        if (isEditing) {
            onUpdateTask(taskData);
        } else {
            onAddTask(taskData);
        }

        setDescription('');
        setPriority('Medium');
        setDueDate(new Date());
        setDueTime('10:00');

        if (isEditing) {
            onCancelEdit();
            setIsEditing(false);
        }
    };

    return (
        <div className="bg-white shadow-md rounded p-6 mb-4">
            <h5 className="text-xl font-semibold mb-4 text-gray-800">
                {isEditing ? 'Edit Task' : 'Add New Task'}
            </h5>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <input
                        type="text"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                        Priority
                    </label>
                    <select
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Due Date</label>
                    <DatePicker
                        selected={dueDate}
                        onChange={(date) => setDueDate(date)}
                        dateFormat="MM/dd/yyyy"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Due Time</label>
                    <TimePicker
                        value={dueTime}
                        onChange={setDueTime}
                        format="HH:mm a"
                        disableClock={true}
                        clearIcon={null}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {isEditing ? 'Update Task' : 'Add Task'}
                    </button>
                    {isEditing && (
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={onCancelEdit}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default AddTask;
import React, { useState, useEffect, useCallback } from 'react';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';
import CompletedTasks from '../components/CompletedTasks';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/tasks';

function Home() {
    const [tasks, setTasks] = useState([]);
    const { isAuthenticated, user } = useAuth0();
    const [showTasks, setShowTasks] = useState(true);
    const [showCompleted, setShowCompleted] = useState(true);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const fetchTasks = useCallback(async () => {
        if (isAuthenticated && user) {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/${user.email}`);
                // Make sure that the 'id' is the '_id' for all data coming in. This is an IMPORTANT FIX.
                const tasksWithCorrectId = data.map(task => ({ ...task, id: task._id }));
                setTasks(tasksWithCorrectId);
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            }
        } else {
            setTasks([]);
        }
    }, [isAuthenticated, user]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleAddTask = async (newTask) => {
        try {
            const { data } = await axios.post(API_BASE_URL, { ...newTask, userEmail: user.email });
            // When new data comes back, make sure that the id is set to be _id
            setTasks(prevTasks => [...prevTasks, { ...data, id: data._id }]);
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    };

    const handleCompleteTask = async (id) => {
        try {
            // Using the id that you passed in to find.
            const taskToUpdate = tasks.find(task => task.id === id);
            if (!taskToUpdate) return console.error(`Task with id ${id} not found`);

            await axios.patch(`${API_BASE_URL}/${id}`, { completed: !taskToUpdate.completed });

            // Again, make sure all the id are _id
            setTasks(prevTasks => prevTasks.map(task =>
                task.id === id ? { ...task, completed: !taskToUpdate.completed } : task
            ));
        } catch (error) {
            console.error(`Failed to complete task with id ${id}:`, error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/${id}`);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        } catch (error) {
            console.error(`Failed to delete task with id ${id}:`, error);
        }
    };

    const handleEditTask = (id) => {
        const task = tasks.find(task => task.id === id);
        if (task) setTaskToEdit(task);
    };

    const handleUpdateTask = async (updatedTask) => {
        if (!updatedTask.id) return console.error("Updated task lacks a valid id");

        try {
            await axios.patch(`${API_BASE_URL}/${updatedTask.id}`, updatedTask);
            setTasks(prevTasks => prevTasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
            ));
            setTaskToEdit(null);
        } catch (error) {
            console.error(`Failed to update task with id ${updatedTask.id}:`, error);
        }
    };

    const handleCancelEdit = () => setTaskToEdit(null);

    if (!isAuthenticated) {
        return <div className="container mx-auto mt-5 text-center">
            <h1 className="text-2xl">Please log in to access your To-Do List.</h1>
        </div>;
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">My To-Do List</h1>
            <AddTask
                onAddTask={handleAddTask}
                taskToEdit={taskToEdit}
                onUpdateTask={handleUpdateTask}
                onCancelEdit={handleCancelEdit}
            />

            <div className="mb-4 flex space-x-2">
                <button
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setShowTasks(!showTasks)}
                >
                    {showTasks ? 'Hide Tasks' : 'View Tasks'}
                </button>
                <button
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setShowCompleted(!showCompleted)}
                >
                    {showCompleted ? 'Hide Completed Tasks' : 'View Completed Tasks'}
                </button>
            </div>

            {showTasks && (
                <TaskList
                    tasks={tasks.filter(task => !task.completed)}
                    onCompleteTask={handleCompleteTask}
                    onDeleteTask={handleDeleteTask}
                    onEditTask={handleEditTask}
                />
            )}

            {showCompleted && (
                <CompletedTasks
                    tasks={tasks.filter(task => task.completed)}
                    onDeleteTask={handleDeleteTask}
                    onEditTask={handleEditTask}
                    onCompleteTask={handleCompleteTask}
                />
            )}
        </div>
    );
}

export default Home;
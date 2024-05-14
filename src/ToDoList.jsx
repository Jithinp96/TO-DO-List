import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editValue, setEditValue] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function handleEditChange(event) {
        setEditValue(event.target.value);
    }

    function addTask() {
        const lowerCaseTasks = tasks.map(task => task.toLowerCase());
        const lowerCaseNewTask = newTask.toLowerCase().trim();
        if (lowerCaseNewTask!== "" &&!lowerCaseTasks.includes(lowerCaseNewTask)) {
            setTasks(t => [...t, newTask]);
            setNewTask("");
            toast.success("Task added successfully!", { toastId: "addTask" });
        } else {
            toast.error("Duplicate task!", { toastId: "duplicateTask" });
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i!== index);
        setTasks(updatedTasks);
        toast.info("Task deleted successfully!", { toastId: "deleteTask" });
    }

    function editTask(index) {
        setEditingIndex(index);
        setEditValue(tasks[index]);
    }

    function updateTask() {
        const lowerCaseTasks = tasks.map(task => task.toLowerCase());
        const lowerCaseEditValue = editValue.toLowerCase().trim();
        if (lowerCaseEditValue!== "" &&!lowerCaseTasks.includes(lowerCaseEditValue)) {
            const updatedTasks = [...tasks];
            updatedTasks[editingIndex] = editValue;
            setTasks(updatedTasks);
            setEditingIndex(-1);
            toast.success("Task updated successfully!", { toastId: "updateTask" });
        } else {
            toast.error("Duplicate task!", { toastId: "duplicateTask" });
        }
    }

    function cancelEdit() {
        setEditingIndex(-1);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return (
        <div className="to-do-list">
            <h1>To-Do-List</h1>

            <div>
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className="add-button" onClick={addTask}>Add</button>
            </div>

            <ol>
                {tasks.map((task, index) =>
                    <li key={index}>
                        {editingIndex === index? (
                            <input
                                type="text"
                                value={editValue}
                                onChange={handleEditChange}
                            />
                        ) : (
                            <span className="text">{task}</span>
                        )}
                        
                        {editingIndex!== index && (
                            <>
                                <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
                                <button className="move-button" onClick={() => moveTaskUp(index)}>Up👆</button>
                                <button className="move-button" onClick={() => moveTaskDown(index)}>Down👇</button>
                            </>
                        )}
                        {editingIndex === index? (
                            <>
                                <button className="edit-save-button" onClick={updateTask}>Save</button>
                                <button className="edit-cancel-button" onClick={cancelEdit}>Cancel</button>
                            </>
                        ) : (
                            <button className="edit-button" onClick={() => editTask(index)}>Edit</button>
                        )}
                    </li>
                )}

            </ol>
        </div>
    );
}

export default ToDoList;
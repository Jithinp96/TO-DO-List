import React from 'react'
import ToDoList from "./ToDoList.jsx"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <ToDoList/>
    </>
  );
}

export default App

import React from 'react';
import Header from './components/Header.js';
import Map from './components/Map.js';
import "./css/app.css"
import AddForm from "./components/AddForm";

window.formOpen = false;

function App() {
  return (
    <div className="App">
        <div className="shadow" id="shadow"></div>
      <header className="App-header">
        <Header/>
      </header>
      <div className="management">
        <button disabled={window.formOpen} onClick={openAddForm}>Add</button>
        <button disabled={window.formOpen} >Edit</button>
        <button disabled={window.formOpen} className="manageBtn" >Remove</button>
      </div>
        <Map/>
        <AddForm/>
    </div>
  );
}

function openAddForm() {
    document.getElementById("AddForm").style.display = "block";
    document.getElementById("shadow").style.display = "block";
    window.formOpen = true;
}

export default App;

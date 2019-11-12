import React from 'react';
import Header from './components/Header.js';
import Map from './components/Map.js';
import "./css/app.css"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
      </header>
      <div className="management">
        <button>Add</button>
        <button>Edit</button>
        <button>Remove</button>
      </div>
        <Map/>
    </div>
  );
}

export default App;

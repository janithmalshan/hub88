import React from 'react';
import './App.css';
import TableCountries from "./components/TableCountries";

function App() {
  return (
    <div className="App">
      <>
        <h2>Country Code filter component</h2>
        <TableCountries />
      </>
    </div>
  );
}

export default App;

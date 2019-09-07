import React from 'react';
import './App.css';
import UserParticipationForm from './components/user-participation-form.component'
import CircleGraph from './components/circle-graph.component';
import UserTable from './components/user-table.component';


function App() {
  return (
    <div className="App">
      <div>
        <UserParticipationForm />
      </div>
      <div>
        <h2>Data</h2>
        <p>lorem ipsum solem</p>
      </div>
      <div className="data-row">
        <UserTable width="50%" />
        <CircleGraph width="50%" />
      </div>
    </div>
  );
}

export default App;

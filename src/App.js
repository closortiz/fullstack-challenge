import React from 'react';
import './App.css';
import UserParticipationForm from './components/user-participation-form.component'
import CircleGraph from './components/circle-graph.component';
import UserTable from './components/user-table.component';
import Grid from '@material-ui/core/Grid'


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
      <Grid container
        direction="row"
        justify="space-evenly"
        alignItems="stretch"
      >
        <UserTable />
        <CircleGraph />
      </Grid>
    </div>
  );
}

export default App;

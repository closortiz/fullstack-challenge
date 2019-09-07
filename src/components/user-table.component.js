import React, { Component } from 'react';
import ReactDataGrid from "react-data-grid";
import axios from 'axios'

const columns = [
  { key: "firstName", name: "First Name", editable: true },
  { key: "lastName", name: "Last Name", editable: true },
  { key: "participation", name: "Participation", editable: true }
];

const rows = [
  { id: 0, firstName: "Task 1", lastName: "last", participation: 20 },
  { id: 1, firstName: "Task 2", lastName: "last", participation: 40 },
  { id: 2, firstName: "Task 3", lastName: "last", participation: 60 }
];


export default class UserTable extends Component {
  constructor(props) {
    super(props);


    this.state = { rows: [] };

  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        this.setState({ rows: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };

  render() {
    return (
      <div>
        <ReactDataGrid
          columns={columns}
          rowGetter={i => this.state.rows[i]}
          rowsCount={this.state.rows.length}
          onGridRowsUpdated={this.onGridRowsUpdated}
          enableCellSelect={true}
        />
      </div>

    )
  }
}

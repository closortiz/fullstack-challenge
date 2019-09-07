import React, { Component } from 'react';
import ReactDataGrid from "react-data-grid";
import axios from 'axios'

const defaultColumnProperties = {
  resizable: true,
  width: 130
};

const columns = [
  { key: "firstName", name: "First Name", },
  { key: "lastName", name: "Last Name" },
  { key: "participation", name: "Participation", }
].map(c => ({ ...c, ...defaultColumnProperties }));



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


  render() {
    return (
        <ReactDataGrid
          columns={columns}
          rowGetter={i => this.state.rows[i]}
          rowsCount={this.state.rows.length}
          onGridRowsUpdated={this.onGridRowsUpdated}
        />
    )
  }
}

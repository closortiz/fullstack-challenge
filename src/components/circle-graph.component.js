import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import axios from "axios";

const options = {
  title: "Total User Participation",
  pieHole: 0.4,
  is3D: false
};

export default class CircleGraph extends Component {
  constructor(props) {
    super(props);

    this.createData = this.createData.bind(this);

    this.state = {
      data: [["User", "Participation"]],
      users: []
    }

  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        this.setState({ users: response.data });
        this.createData();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  createData(){
    this.state.users.map(user => {
        this.state.data.push([user.firstName + " " + user.lastName,user.participation])
    })
  }


  render() {
    return (
      <div width="50%" >
        <div className={"my-pretty-chart-container"}>
          <Chart
            chartType="PieChart"
            data={this.state.data}
            options={options}
            width="100%"
            height="400px"
          />
        </div>
      </div>
    )
  }
}

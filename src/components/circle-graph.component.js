import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import { properties } from '../properties';
import axios from "axios";

const options = {
  title: "Total User Participation",
  pieHole: 0.4,
  is3D: false
};

/* Circle Graph component shows the total particapation across all users */
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
    axios.get(properties.GET_ALL_USERS_URL)
      .then(response => {
        console.log("found users in circle graph ")
        this.setState({ users: response.data });
        this.createData();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  createData(){
    this.state.users.forEach(user => {
        this.state.data.push([user.firstName + " " + user.lastName,user.participation])
    })
  }


  render() {
    return (
        <div className={"my-pretty-chart-container"} >
          <Chart
            chartType="PieChart"
            data={this.state.data}
            options={options}
            width="100%"
            height="400px"
          />
        </div>
    )
  }
}

import React, { Component } from 'react';
import axios from 'axios'

const PARTICIPATION_STATE_URL = "http://localhost:5000/users/state";
const ADD_NEW_USER_URL = "http://localhost:5000/users/add";
export default class UserParticipationForm extends Component {

  constructor(props) {
    super(props);

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeParticipation = this.onChangeParticipation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      firstName: '',
      lastName: '',
      participation: '',
      errorText: '',
    }

  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    })
  }
  onChangeParticipation(e) {
    this.setState({
      participation: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      participation: this.state.participation,
    }

    if (user.participation > 100) {
      this.setState({
        errorText: "User participation cannot exceed 100%"
      })
      return;
    }

    axios.get(PARTICIPATION_STATE_URL)
      .then(res => {
        if (res.data[0] !== undefined && (res.data[0].sum >= 100 || (Number(res.data[0].sum) + Number(user.participation)) > 100)) {
          this.setState({
            errorText: "Total capacity is: " + res.data[0].sum  + ". The total participation amongst users cannot be more than 100%"
          })
        } else {
          axios.post(ADD_NEW_USER_URL, user)
            .then(res => {
              window.location = "/";
            });
        }
      });


  }

  render() {
    return (
      <div>
        <div className="">
          <form className="user-form" onSubmit={this.onSubmit}>
            <div className="form-group">
              <input type="text"
                required
                className="form-control"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.onChangeFirstName}
              />
            </div>
            <div className="form-group">
              <input type="text"
                required
                className="form-control"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.onChangeLastName}
              />
            </div>
            <div className="form-group">
              <input type="text"
                required
                className="form-control"
                placeholder="Participation"
                value={this.state.participation}
                onChange={this.onChangeParticipation}
              />
            </div>

            <div className="form-group">
              <input type="submit" value="Send" className="btn btn-primary" />
            </div>
          </form>
        </div>
        <div>
          <p style={{color:"red"}}>{this.state.errorText}</p>
        </div>
      </div>
    )
  }
}

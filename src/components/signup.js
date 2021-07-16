import React, { Component } from "react";

class signUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      isChecked: false,
      otp: "",
      password: "",
    };
  }

  handleFirstnameChange = (event) => {
    this.setState({
      firstName: event.target.value,
    });
  };

  handleLastnameChange = (event) => {
    this.setState({
      lastName: event.target.value,
    });
  };

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleCheck = (event) => {
    this.setState({
      isChecked: event.target.checked,
    });
  };
  handleOtpChange = (event) => {
    this.setState({
      otp: event.target.value,
    });
  };

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  render() {
    const { isChecked } = this.state;
    return (
      <div>
        <h1>Sign Up!</h1>
        <form>
          <div>
            <label htmlFor="first-name">First Name</label>
            <input
              id="first-name"
              type="text"
              value={this.state.firstName}
              onChange={this.handleFirstnameChange}
            />
          </div>
          <div>
            <label htmlFor="last-name">Last Name</label>
            <input
              id="last-name"
              type="text"
              value={this.state.lastName}
              onChange={this.handleLastnameChange}
            />
          </div>
          <div>
            <label htmlfor="email">Email</label>
            <input
              type="email"
              id="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </div>
          <div>
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              id="pass"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <div>
            <input
              type="checkbox"
              id="check"
              checked={isChecked}
              onChange={this.handleCheck}
            />
            <label htmlFor="check">Send me OTP</label>
          </div>
          <div>
            {isChecked ? (
              <div>
                <label htmlFor="otp">Enter OTP</label>
                <input
                  type="password"
                  value={this.state.otp}
                  onChange={this.handleOtpChange}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <button value="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default signUp;

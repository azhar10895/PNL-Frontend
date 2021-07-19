import React, { Component } from "react";

class OtpClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      otp: "",
      isChecked: false,
    };
  }

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
 
  render() {
    const { isChecked } = this.state;
    return (
      <>   {/* React Fragment */}
        <div>
          <input
            type="checkbox"
            id="check"
            checked={isChecked}
            onChange={this.handleCheck}
          />
          <label htmlFor="check" className="color-forSmallText">Send me OTP</label>
        </div>
        <div>
          {isChecked ? (
            <div>
              <input
                type="password"
                value={this.state.otp}
                onChange={this.handleOtpChange}
                placeholder="Enter OTP"
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

export default OtpClass;

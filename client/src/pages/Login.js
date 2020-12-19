import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../store/actions/authAction";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      message:"",
      errors: [],
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.auth.errors) !== JSON.stringify(prevState.errors)
    ) {
      return {
        errors: nextProps.auth.errors,
        message: nextProps.auth.message,
      };
    } else {
      return {
        message: nextProps.auth.message,
      };
    }
  }
  changeHandaler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  submitHandaler = (event) => {
    event.preventDefault();
    let { email, password } = this.state;
    this.props.login({ email, password }, this.props.history);
  };
  checkErrorFound(property) {
    return this.state.errors.some((el) => el.param === property);
  }
  getErrorMessage(property) {
    let index = this.state.errors.findIndex((el) => el.param === property);
    return this.state.errors[index].msg;
  }
  render() {
    let { email, password,message } = this.state;
    return (
      <div className="row">
        { message && <div className="alert alert-danger" role="alert">
        {message}
        </div>}
        <form onSubmit={this.submitHandaler}>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className={
                  this.checkErrorFound("email")
                    ? "form-control is-invalid"
                    : "form-control"
                }
                id="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={this.changeHandaler}
              />
              <span className="invalid-feedback" role="alert">
                <strong>
                  {this.checkErrorFound("email")
                    ? this.getErrorMessage("email")
                    : ""}
                </strong>
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className={
                  this.checkErrorFound("password")
                    ? "form-control is-invalid"
                    : "form-control"
                }
                id="password"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={this.changeHandaler}
              />
              <span className="invalid-feedback" role="alert">
                <strong>
                  {this.checkErrorFound("password")
                    ? this.getErrorMessage("password")
                    : ""}
                </strong>
              </span>
            </div>
            <div className="form-group mt-10">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { login })(Login);

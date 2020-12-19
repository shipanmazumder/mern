import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../store/actions/authAction";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (JSON.stringify(nextProps.auth.errors) !== JSON.stringify(prevState.errors)) {
      return {
        errors: nextProps.auth.errors,
      };
    }
    return null;
  }
  changeHandaler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  submitHandaler = (event) => {
    event.preventDefault();
    let { name, email, password, passwordConfirmation } = this.state;
    this.props.register({name, email, password, passwordConfirmation},this.props.history);
  };
  checkErrorFound(property){
    return this.state.errors.some((el)=>el.param===property)
  }
  getErrorMessage(property){
    let index=this.state.errors.findIndex(el=>el.param===property);
    return this.state.errors[index].msg;
  }
  render() {
    let {name,email,password,passwordConfirmation}=this.state;
    return (
      <div className="row">
        <form onSubmit={this.submitHandaler}>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className={this.checkErrorFound("name")?"form-control is-invalid":"form-control"}
                id="name"
                placeholder="Enter Name"
                name="name"
                value={name}
                onChange={this.changeHandaler}
              />
                <span className="invalid-feedback" role="alert">
                    <strong>{this.checkErrorFound("name")?this.getErrorMessage("name"):"" }</strong>
                </span>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className={this.checkErrorFound("email")?"form-control is-invalid":"form-control"}
                id="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={this.changeHandaler}
              />
                <span className="invalid-feedback" role="alert">
                    <strong>{this.checkErrorFound("email")?this.getErrorMessage("email"):"" }</strong>
                </span>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className={this.checkErrorFound("password")?"form-control is-invalid":"form-control"}
                id="password"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={this.changeHandaler}
              />
               <span className="invalid-feedback" role="alert">
                    <strong>{this.checkErrorFound("password")?this.getErrorMessage("password"):"" }</strong>
                </span>
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirmation">Password:</label>
              <input
                type="password"
                className={this.checkErrorFound("passwordConfirmation")?"form-control is-invalid":"form-control"}
                id="passwordConfirmation"
                placeholder="Enter Confirmation Password"
                name="passwordConfirmation"
                value={passwordConfirmation}
                onChange={this.changeHandaler}
              />
               <span className="invalid-feedback" role="alert">
                    <strong>{this.checkErrorFound("passwordConfirmation")?this.getErrorMessage("passwordConfirmation"):"" }</strong>
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
const mapStateToProps=(state)=>({
  auth:state.auth
});
export default connect(mapStateToProps, { register })(Register);

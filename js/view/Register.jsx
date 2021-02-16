/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable jsx-a11y/label-has-for */
// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Action
import { register } from '../redux/auth/action';

class Register extends Component {
    constructor() {
        super();
        this.state = { data: {} , errors: {} };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { dispatch, history } = this.props;
        const { data } = this.state;

        dispatch(register(data)).then((res) => {
            if (res.success)
                history.push('/sign-in');
            else {
                this.setState({ isError: true, errors: res.errors });
            }
        });
    };

    handleChange = (event) => {
        const {
            target: { value, name },
        } = event;
        const { data } = this.state;

        this.setState({ data: { ...data, [name]: value } });
    };

    gotoLogin = () => {
        this.props.history.push("/sign-in");
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="inner">
                <form>
                    <h3>Register</h3>
                    {typeof errors !== 'object' && <span className="error">{errors}</span>}
                    <div className="form-group">
                        <label>User Name</label>
                        <input
                            type="text"
                            onChange={this.handleChange}
                            name="name"
                            className="form-control"
                            placeholder="Name"
                        />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            onChange={this.handleChange}
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            onChange={this.handleChange}
                            name="password"
                            className="form-control"
                            placeholder="Enter password"
                            autoComplete="true"
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>

                    <button onClick={this.handleSubmit} className="btn btn-dark btn-lg btn-block">
                        Register
                    </button>
                    <p className="forgot-password text-right">
                        Already registered <a href="#" onClick={this.gotoLogin}>log in?</a>
                    </p>
                </form>
            </div>
        );
    }
}
export default connect()(withRouter(Register));

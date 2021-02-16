/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable jsx-a11y/label-has-for */
// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

// Action
import { loggedIn } from '../utils/storage';
import { login } from '../redux/auth/action';

class Login extends React.Component {
    constructor() {
        super();
        this.state = { data: {}, isError: false, errorMsg: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit = (event) => {
        event.preventDefault();

        const { dispatch, history } = this.props;
        const { data } = this.state;

        dispatch(login(data)).then((res) => {
            if (res.success)
                history.push('/todo-list');
            else {
                this.setState({ isError: true, errorMsg: res.message });
            }
        });
    }

    handleChange = (event) => {
        const {
            target: { value, name },
        } = event;
        const { data } = this.state;

        this.setState({ data: { ...data, [name]: value } });
    }

    gotoRegister = () => {
        this.props.history.push("sign-up");
    }

    render() {
        const { isError, errorMsg } = this.state;
        if(loggedIn())
            // eslint-disable-next-line no-unused-expressions
            <Redirect to="/todo-list" />
        return (
            <div className="inner">
                <form onSubmit={this.handleSubmit}>
                    <h3>Log in</h3>
                    {isError && <p className="error">{errorMsg}</p>}
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter email"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter password"
                            autoComplete="true"
                        />
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg btn-block">
                        Sign in
                    </button>
                    <p className="forgot-password text-right">
                        <a href="#" onClick={this.gotoRegister}>Create an account?</a>
                    </p>
                </form>
            </div>
        );
    }
}

export default connect()(withRouter(Login));

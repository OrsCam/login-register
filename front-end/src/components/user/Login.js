import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/userActions";


class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        console.log("Props : ", nextProps);
        if (nextProps.security.validToken) {
            this.props.history.push("/dashboard");
        }

    }

    onSubmit(e) {
        e.preventDefault();
        const LoginRequest = {
            email: this.state.email,
            password: this.state.password,
        };
        //console.log(LoginRequest)
        this.props.login(LoginRequest);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control form-control-lg"
                                        placeholder="Email Address"
                                        name="email"
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Password"
                                        name="password"
                                        onChange={this.onChange}
                                    />
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    security: state.security,
    errors: state.errors,
})

export default connect(mapStateToProps, { login })(Login);

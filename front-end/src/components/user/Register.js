import React, { Component } from 'react'
import { connect } from "react-redux";
import { register } from "../../actions/userActions";
import PropTypes from "prop-types";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            gender: "",
            email: "",
            password: "",
            tel: "",
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: this.state.gender,
            email: this.state.email,
            password: this.state.password,
            tel: this.state.tel,
        };
        //console.log(newUser)
        this.props.register(newUser, this.props.history)
    }

    render() {
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Inscription</h1>
                            <p className="lead text-center">Créer votre compte</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Votre prénom"
                                        name="firstName"
                                        value={this.state.firstName}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Votre nom"
                                        name="lastName"
                                        value={this.state.lastName}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <select
                                        name="gender" value={this.state.gender}
                                        className="form-control form-control-lg"
                                    >
                                        <option value="Feminin">Féminin</option>
                                        <option value="Masculin">Masculin</option>
                                    </select>

                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control form-control-lg"
                                        placeholder="Adresse mail"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Mot de passe"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="form-control form-control-lg"
                                        placeholder="Votre téléphone"
                                        name="tel"
                                        value={this.state.tel}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Register.propTypes = {
    register: PropTypes.func.isRequired,
}
export default connect(null, { register })(Register);

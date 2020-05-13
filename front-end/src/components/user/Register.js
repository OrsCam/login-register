import React, { Component } from 'react'
import { connect } from "react-redux";
import { register } from "../../actions/userActions";
import PropTypes from "prop-types";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            prenom: "",
            nom: "",
            sexe: "",
            email: "",
            password: "",
            tel: "",
            errors: {},
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
            prenom: this.state.prenom,
            nom: this.state.nom,
            sexe: this.state.sexe,
            email: this.state.email,
            password: this.state.password,
            tel: this.state.tel,
        };
        //console.log(newUser)
        this.props.register(newUser, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        console.log("Next Props : ", nextProps);
        if (nextProps.errors.success == 0) {
            this.setState({ errors: nextProps.errors });
        } else if (nextProps.errors.response.data.success == 0) {
            this.setState({ errors: nextProps.errors.response.data });
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Inscription</h1>
                            <p className="lead text-center">Créer votre compte</p>
                            {errors.success === 0 && (<div className="alert alert-danger">{errors.message}</div>)}
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Votre prénom"
                                        name="prenom"
                                        value={this.state.prenom}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Votre nom"
                                        name="nom"
                                        value={this.state.nom}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div>
                                    <select
                                        name="sexe" value={this.state.sexe} onChange={this.onChange}
                                        className="form-control form-control-lg">
                                        <option value="No"></option>
                                        <option value="Feminin">Féminin</option>
                                        <option value="Masculin">Masculin</option>
                                    </select>

                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control form-control-lg"
                                        placeholder="Adresse email"
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
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors,
})

export default connect(mapStateToProps, { register })(Register);

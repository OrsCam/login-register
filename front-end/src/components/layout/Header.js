import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/userActions";
import propTypes from "prop-types";

class Header extends Component {
    logout() {
        this.props.logout();
        window.location.href = "/";
    }
    render() {
        const { validToken, user } = this.props.security;
        console.log(validToken, " : ", user);
        const userIsAthenticated = (
            <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">
                            Dashboard
                    </Link>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">{validToken ? user.result.prenom + " " + user.result.nom : ""}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/logout" onClick={this.logout.bind(this)}>
                            Déconnexion
                                    </Link>
                    </li>

                </ul>
            </div>
        );
        const userIsNotAuthenticated = (
            <div className="collapse navbar-collapse" id="mobile-nav">


                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link " to="/register">
                            Inscription
                     </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">
                            Login
                    </Link>
                    </li>

                </ul>
            </div>
        )
        let headerLinks;
        if (validToken && user) {
            headerLinks = userIsAthenticated;
        } else {
            headerLinks = userIsNotAuthenticated;
        }
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                    <div className="container">
                        <Link className="navbar-brand" to="/dashboard">
                            Solution de gestion des utilisateurs
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#mobile-nav"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>

                        {headerLinks}
                    </div>
                </nav>

            </div>
        )
    }
}

Header.propTypes = {
    logout: propTypes.func.isRequired,
    security: propTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    security: state.security,
});
export default connect(mapStateToProps, { logout })(Header);
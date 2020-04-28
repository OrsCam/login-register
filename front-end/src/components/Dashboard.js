import React, { Component } from "react";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">User</h1>
                            <br />
                            <a href="ProjectForm.html" class="btn btn-lg btn-info">
                                Creer new user
                            </a>
                            <br />
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Dashboard;

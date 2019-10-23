import React, { Component } from 'react';

class Landing extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="container-fluid" style={{ backgroundColor: "#1ed761", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div className="row text-center">
                    <div className="col-md-12">
                        <span className="display-4">Bem-vindo!</span>
                        <p className="lead mt-3">Por favor, faça Login pelo Spotify.</p>
                        <hr className="piece-hr" style={{ width: "25%" }}></hr>
                    </div>
                    <div className="col-md-12 mt-5">
                        <a href="http://localhost:8888/login" className="btn btn-dark btn-lg" style={{fontSize: "1.5rem"}}>Spotify Login</a>
                    </div>


                </div>
            </div>
        )
    }
}

export default Landing;


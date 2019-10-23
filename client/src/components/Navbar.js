import React from 'react';
var querystring = require('querystring');

const Navbar = props => {
    return (
        <div className="container-fluid" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <nav className="navbar navbar-expand-md navbar-dark sticky-top" style={{ backgroundColor: "#265738" }}>
                <a className="navbar-brand ml-3 lead" style={{ fontSize: "1.3rem", color: "#ffffff" }}>Spotify Project</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav ">
                        <li className="nav-item active text-center">
                            <a className="nav-link scroll lead" href={"/home#" + querystring.stringify({ access_token: null, refresh_token: null })} style={{ fontSize: "1.3rem" }}>Início</a>
                        </li>
                        <li className="nav-item active text-center ml-5">
                            <a className="nav-link scroll lead" href="/data" style={{ fontSize: "1.3rem" }}>Dados</a>
                        </li>
                        <li className="nav-item active text-center ml-5">
                            <a className="nav-link scroll lead" href="/playlists" style={{ fontSize: "1.3rem" }}>Usability playlists</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

    );
};

export default Navbar;
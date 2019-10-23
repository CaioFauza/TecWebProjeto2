import React, { Component } from 'react';
import CountUp from 'react-countup';
import Navbar from './Navbar';
import { connect } from 'react-redux';

var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
    client_id: '3c3ee83a4df543fbb0e7b6c31f66347a', // Spotify API Client ID
    client_secret: '2ba0313f5bdb4f6eb580a80b25d3b13d', // Spotify API Client Secret
    redirect_uri: 'http://localhost:3000/callback' // Spotify API Redirect URL
});

class Metrics extends Component {
    constructor(props) {
        super(props);
        this.setToken();
        this.state = {
            playlistLenght: "",
            followedArtists: "",
            savedMusics: "",
            savedAlbuns: ""
        }
        this.getInformationFromApi();
    }

    async setToken() {
        const { accessToken, refreshToken } = this.props;
        await spotifyApi.setAccessToken(accessToken);
        await spotifyApi.setRefreshToken(refreshToken);
    }

    async getInformationFromApi() {
        spotifyApi.getUserPlaylists()
            .then((response) => {
                this.setState({
                    playlistLenght: response.body.items.length
                });
            })

        spotifyApi.getFollowedArtists()
            .then((response) => {
                this.setState({
                    followedArtists: response.body.artists.items.length
                });
            })

        spotifyApi.getMySavedTracks()
            .then((response) => {
                this.setState({
                    savedMusics: response.body.total
                });
            })

        spotifyApi.getMySavedAlbums()
            .then((response) => {
                this.setState({
                    savedAlbuns: response.body.total
                });
            })
    }

    render() {
        return (
            <div className="container-fluid" style={{ backgroundColor: "#1ed761", minHeight: "100vh", paddingLeft: "0", paddingRight: "0", overflowX: "hidden" }}>
                <Navbar />
                <div className="row text-center">
                    <div className="col-md-12">
                        <h1 className="display-4 mt-3">Dados de usabilidade</h1>
                        <hr className="piece-hr mb-5" style={{ width: "25%" }}></hr>
                    </div>
                    <div className="container" >
                        <div className="col-md-12 mt-4">
                            <h1 className="lead" style={{ fontSize: "2rem" }}> Playlists criadas </h1>
                            <hr className="piece-hr" style={{ width: "10%" }}></hr>
                            <CountUp end={this.state.playlistLenght} className="lead" style={{ fontSize: "2rem", color: "#ffffff" }} />
                        </div>
                        <div className="col-md-12 mt-4">
                            <h1 className="lead" style={{ fontSize: "2rem" }}> Artistas seguidos </h1>
                            <hr className="piece-hr" style={{ width: "10%" }}></hr>
                            <CountUp end={this.state.followedArtists} className="lead" style={{ fontSize: "2rem", color: "#ffffff" }} />
                        </div>
                        <div className="col-md-12 mt-4">
                            <h1 className="lead" style={{ fontSize: "2rem" }}> Músicas salvas </h1>
                            <hr className="piece-hr" style={{ width: "10%" }}></hr>
                            <CountUp end={this.state.savedMusics} className="lead" style={{ fontSize: "2rem", color: "#ffffff" }} />
                        </div>
                        <div className="col-md-12 mt-4">
                            <h1 className="lead" style={{ fontSize: "2rem" }}> Albuns salvos </h1>
                            <hr className="piece-hr" style={{ width: "10%" }}></hr>
                            <CountUp end={this.state.savedAlbuns} className="lead" style={{ fontSize: "2rem", color: "#ffffff" }} />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = store => ({
    accessToken: store.accessToken.accessToken
});

export default connect(mapStateToProps)(Metrics);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAccessToken, getRefreshToken } from '../modules/actions';
import Navbar from './Navbar';

var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
    client_id: '3c3ee83a4df543fbb0e7b6c31f66347a', // Spotify API Client ID
    client_secret: '2ba0313f5bdb4f6eb580a80b25d3b13d', // Spotify API Client Secret
    redirect_uri: 'http://localhost:3000/callback' // Spotify API Redirect URL
});

var accessTokenFromQuery = '';
var refreshTokenFromQuery = '';

class Home extends Component {
    constructor(props) {
        super(props);
        this.accessTokenFromQuery = this.props.location["hash"].slice(14).split("&")[0];
        this.refreshTokenFromQuery = this.props.location["hash"].split("=")[2];
        const { accessToken, refreshToken } = this.props;
        this.state = {
            accessTokenInput: this.hasHash() ? this.accessTokenFromQuery : accessToken,
            refreshTokenInput: this.hasHash() ? this.refreshTokenFromQuery : refreshToken,
            username: "",
            usernameImage: "",
            playingTrackName: "",
            playingTrackArtist: "",
            playingTrackImage: "",
            playingTrackStatus: "",
            playingTrackDuration: 0,
            playingTrackProgress: 0,
            lastTrackId: "",
            connectedDevice: false
        }
        this.setToken();
        this.getUsername();
        this.getPlayerInformation();
        this.getPlayerInformation = this.getPlayerInformation.bind(this);
        this.goToNextTrack = this.goToNextTrack.bind(this);
        this.goToPreviousTrack = this.goToPreviousTrack.bind(this);
        this.playTrack = this.playTrack.bind(this);
        this.pauseTrack = this.pauseTrack.bind(this);
        this.logout = this.logout.bind(this);
    }

    hasHash() {
        if (this.accessTokenFromQuery) {
            return true;
        } else {
            return false;
        }
    }

    async setToken() {
        const { getAccessToken, getRefreshToken } = this.props;
        const { accessTokenInput, refreshTokenInput } = this.state;
        if (this.hasHash()) {
            await spotifyApi.setAccessToken(this.accessTokenFromQuery);
            await spotifyApi.setRefreshToken(this.refreshTokenFromQuery);
            getAccessToken(this.accessTokenFromQuery);
            getRefreshToken(this.refreshTokenFromQuery);
        } else {
            await spotifyApi.setAccessToken(accessTokenInput);
            await spotifyApi.setRefreshToken(refreshTokenInput);
        }
    }

    async getUsername() {
        await spotifyApi.getMe()
            .then((response) => {
                this.setState({
                    username: response.body.display_name,
                    usernameImage: response.body.images[0].url
                });
            })
            .catch(e => {
                return e;
            });
    }

    async getPlayerInformation() {
        await spotifyApi.getMyCurrentPlaybackState()
            .then((response) => {
                if (response.statusCode != 204) {
                    spotifyApi.getMyCurrentPlayingTrack()
                        .then((response) => {
                            this.setState({
                                connectedDevice: true,
                                playingTrackStatus: response.body.is_playing,
                                playingTrackName: response.body.item.name,
                                playingTrackArtist: response.body.item.artists[0].name,
                                playingTrackImage: response.body.item.album.images[0].url,
                                playingTrackDuration: response.body.item.duration_ms,
                                playingTrackProgress: response.body.item.progress_ms
                            })
                        })
                        .catch(e => {
                            return e;
                        });
                } else {
                    spotifyApi.getMyRecentlyPlayedTracks()
                        .then((response) => {
                            console.log(response);
                            this.setState({
                                connectedDevice: false,
                                playingTrackStatus: false,
                                playingTrackName: response.body.items[0].track.name,
                                playingTrackArtist: response.body.items[0].track.artists[0].name,
                                playingTrackImage: response.body.items[0].track.album.images[0].url,
                                lastTrackId: response.body.items[0].track.uri,
                                playingTrackDuration: response.body.items[0].track.duration_ms
                            })
                        })
                }
            })
    }

    msToSeconds(ms) {
        var seconds = ms / 1000;
        var minutes = parseInt(seconds / 60);
        seconds = (Math.round(seconds % 60) * 100) / 100;
        return (minutes + ":" + seconds);
    }

    async goToNextTrack(e) {
        e.preventDefault();
        await spotifyApi.skipToNext()
        this.getPlayerInformation();
    }

    async goToPreviousTrack(e) {
        e.preventDefault();
        await spotifyApi.skipToPrevious();
        this.getPlayerInformation();
    }

    async playTrack(e) {
        e.preventDefault();
        if (this.state.connectedDevice) {
            await spotifyApi.play();
        }
        this.getPlayerInformation();
    }

    async pauseTrack(e) {
        e.preventDefault();
        await spotifyApi.pause();
        this.getPlayerInformation();
    }

    async logout(e) {
        e.preventDefault();
        var logoutPop = window.open("https://accounts.spotify.com/logout", "Logout", 'height=200,width=200');
        // logoutPop.close();
        window.open("http://localhost:3000", "_self");
    }

    render() {
        return (
            <div className="container-fluid" style={{ backgroundColor: "#1ed761", minHeight: "100vh", paddingLeft: "0", paddingRight: "0", overflowX: "hidden" }}>
                <Navbar />
                <div className="row text-center">
                    <div className="col-md-12">
                        <div className="jumbotron" style={{ backgroundColor: "#1ed761" }}>
                            <h1 className="display-4">Olá {this.state.username}!</h1>
                            <hr className="my-4" style={{ width: "25%" }}></hr>
                            <p className="lead"><span style={{ color: "red", fontWeight: "bold" }}>{this.state.connectedDevice ? "" : "Device Player desconectado!"}<br /></span>
                                {this.state.connectedDevice ? "" : "Para conectar o player, inicie alguma música pelo aplicativo e aperte o botão play abaixo."} <br />
                                {(this.state.connectedDevice) ? ("Tocando agora:") : ("Última música tocada:")}
                            </p>
                            <img className="rounded mb-3" src={this.state.playingTrackImage} style={{ width: "9%", height: "auto" }} />
                            <p className="lead">{this.state.playingTrackName}</p>
                            <p className="lead">{this.state.playingTrackArtist}</p>
                            <p className="lead">Duração: {this.msToSeconds(this.state.playingTrackDuration)}</p>
                            <button className="btn btn-dark btn-lg mr-3" onClick={this.goToPreviousTrack}><i className="fas fa-backward" /></button>
                            <button className="btn btn-dark btn-lg mr-3" onClick={(this.state.playingTrackStatus) ? (this.pauseTrack) : (this.playTrack)}><i className={(this.state.playingTrackStatus) ? ("fas fa-pause") : ("fas fa-play")} /></button>
                            <button className="btn btn-dark btn-lg" onClick={this.goToNextTrack}><i className="fas fa-forward" /></button>
                        </div>
                        <button className="btn btn-dark btn-lg" onClick={this.logout}>Logout</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => ({
    accessToken: store.accessToken.accessToken,
    refreshToken: store.refreshToken.refreshToken
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ getAccessToken, getRefreshToken }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
import React, { Component } from 'react';
import Navbar from './Navbar';
import PlaylistModal from './PlaylistModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getModalImage, getModalUrl, getModalArtist, getModalMusic } from '../modules/actions';

var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
    client_id: '3c3ee83a4df543fbb0e7b6c31f66347a', // Spotify API Client ID
    client_secret: '2ba0313f5bdb4f6eb580a80b25d3b13d', // Spotify API Client Secret
    redirect_uri: 'http://localhost:3000/callback' // Spotify API Redirect URL
});

class Playlists extends Component {
    constructor(props) {
        super(props);
        this.setToken();
        this.getTopArtists();
        this.getTopMusic();
        this.state = {
            userId: "",
            topArtist6: "",
            topArtist6Id: "",
            playlistGenerateId: "",
            topArtist4: "",
            topArtist4Id: "",
            topArtistLifeTime: "",
            topArtistLifeTimeId: "",
            topMusic6: "",
            topMusic6Id: "",
            topMusic4: "",
            topMusic4Id: "",
            topMusicLifeTime: "",
            topMusicLifeTimeId: "",
            modalImage: "",
            modalLink: "",
            modalArtist: "",
            modalMusic: ""
        }
        this.generateUsagePlaylist = this.generateUsagePlaylist.bind(this);
    }

    showModal() {
        this.setState({
            showModal: true
        })
    }

    shideModal() {
        this.setState({
            showModal: false
        })
    }

    setToken() {
        const { accessToken, refreshToken } = this.props;
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.setRefreshToken(refreshToken);
        spotifyApi.getMe()
            .then((response) => {
                this.setState({
                    userId: response.body.id
                })
            })
    }
    
    async getTopArtists() {
        await spotifyApi.getMyTopArtists({ time_range: "medium_term" })
            .then((response) => {
                this.setState({
                    topArtist6: response.body.items[0].name,
                    topArtist6Id: response.body.items[0].id
                })
            })
        await spotifyApi.getMyTopArtists({ time_range: "short_term" })
            .then((response) => {
                this.setState({
                    topArtist4: response.body.items[0].name,
                    topArtist4Id: response.body.items[0].id
                })
            })
        await spotifyApi.getMyTopArtists({ time_range: "long_term" })
            .then((response) => {
                this.setState({
                    topArtistLifeTime: response.body.items[0].name,
                    topArtistLifeTimeId: response.body.items[0].id
                })
            })
    }

    async getTopMusic() {
        await spotifyApi.getMyTopTracks({ time_range: "medium_term" })
            .then((response) => {
                this.setState({
                    topMusic6: response.body.items[0].name,
                    topMusic6Id: response.body.items[0].id
                })
            })
        await spotifyApi.getMyTopTracks({ time_range: "short_term" })
            .then((response) => {
                this.setState({
                    topMusic4: response.body.items[0].name,
                    topMusic4Id: response.body.items[0].id
                })
            })
        await spotifyApi.getMyTopTracks({ time_range: "long_term" })
            .then((response) => {
                this.setState({
                    topMusicLifeTime: response.body.items[0].name,
                    topMusicLifeTimeId: response.body.items[0].id
                })
            })
    }

    async generateUsagePlaylist(event) {
        var timeRange = event.target.value;
        var tracks = new Array();
        if (timeRange == 6) {
            var playlistName = timeRange + " month based playlist";
            var playlistDescription = "Playlist criada de acordo com a usabilidade dos últimos " + timeRange + " meses";
        } else if (timeRange == 4) {
            var playlistName = timeRange + " weeks based playlist";
            var playlistDescription = "Playlist criada de acordo com a usabilidade das últimas 4 semanas";
        } else {
            var playlistName = timeRange + " based playlist";
            var playlistDescription = "Playlist criada de acordo com a usabilidade em todo o tempo";
        }

        await spotifyApi.createPlaylist(this.state.userId, playlistName, { description: playlistDescription })
            .then((response) => {
                this.setState({
                    playlistGenerateId: response.body.id,
                })
            })
        if (timeRange == 6) {
            this.setState({
                modalArtist: this.state.topArtist6,
                modalMusic: this.state.topMusic6
            });
            await spotifyApi.getRecommendations({ seed_artists: this.state.topArtist6Id, seed_tracks: this.state.topMusic6Id, limit: 35 })
                .then((response) => {
                    for (var i = 0; i < response.body.tracks.length; i++) {
                        tracks.push(response.body.tracks[i].uri);
                    }
                })
        } else if (timeRange == 4) {
            this.setState({
                modalArtist: this.state.topArtist4,
                modalMusic: this.state.topMusic4
            });
            await spotifyApi.getRecommendations({ seed_artists: this.state.topArtist4Id, seed_tracks: this.state.topMusic4Id, limit: 35 })
                .then((response) => {
                    for (var i = 0; i < response.body.tracks.length; i++) {
                        tracks.push(response.body.tracks[i].uri);
                    }
                })
        } else {
            this.setState({
                modalArtist: this.state.topArtistLifeTime,
                modalMusic: this.state.topMusicLifeTime
            });
            await spotifyApi.getRecommendations({ seed_artists: this.state.topArtistLifeTimeId, seed_tracks: this.state.topMusicLifeTimeId, limit: 35 })
                .then((response) => {
                    for (var i = 0; i < response.body.tracks.length; i++) {
                        tracks.push(response.body.tracks[i].uri);
                    }
                })
        }

        await spotifyApi.addTracksToPlaylist(this.state.playlistGenerateId, tracks)
            .then((response) => {

            })
            
        await spotifyApi.getPlaylist(this.state.playlistGenerateId)
            .then((response) => {
                this.setState({
                    modalImage: response.body.images[0].url,
                    modalLink: response.body.external_urls.spotify
                    


                })
            })
        const {getModalImage, getModalUrl, getModalArtist, getModalMusic} = this.props;
        getModalImage(this.state.modalImage);
        getModalUrl(this.state.modalLink);
        getModalArtist(this.state.modalArtist);
        getModalMusic(this.state.modalMusic);
    }

    render() {
        return (
            <div className="container-fluid" style={{ backgroundColor: "#1ed761", minHeight: "100vh", paddingLeft: "0", paddingRight: "0", overflowX: "hidden" }}>
                <Navbar />
                <div className="row text-center">
                    <div className="col-md-12">
                        <h1 className="display-4 mt-3">Usability Playlists</h1>
                        <hr className="piece-hr" style={{ width: "12%" }}></hr>
                        <p className="lead mb-5">Gere playlists de acordo com a sua usabilidade:</p>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-md-12">
                        <p className="lead ml-5" style={{ fontSize: "2rem", fontStyle: "italic" }}>Nos últimos 6 meses...</p>
                        <p className="lead ml-5" style={{ fontSize: "2rem" }}>O seu artista mais ouvido foi: <span style={{ color: "#ffffff" }}>{this.state.topArtist6}</span></p>
                        <p className="lead ml-5" style={{ fontSize: "2rem" }}>A sua música mais ouvida foi: <span style={{ color: "#ffffff" }}>{this.state.topMusic6}</span></p>
                        <button className="btn btn-large btn-dark ml-5 mb-3 mt-3" data-toggle="modal" data-target="#PlaylistModal" style={{ fontSize: "1.3rem", borderRadius: "20px" }} onClick={this.generateUsagePlaylist} value="6">Gerar playlist</button>
                    </div>
                    <div className="col-md-12 mt-5">
                        <p className="lead ml-5" style={{ fontSize: "2rem", fontStyle: "italic" }}>Nas últimas 4 semanas...</p>
                        <p className="lead ml-5" style={{ fontSize: "2rem" }}>O seu artista mais ouvido foi: <span style={{ color: "#ffffff" }}>{this.state.topArtist4}</span></p>
                        <p className="lead ml-5" style={{ fontSize: "2rem" }}>A sua música mais ouvida foi: <span style={{ color: "#ffffff" }}>{this.state.topMusic4}</span></p>
                        <button className="btn btn-large btn-dark ml-5 mb-3 mt-3" data-toggle="modal" data-target="#PlaylistModal" style={{ fontSize: "1.3rem", borderRadius: "20px"  }} onClick={this.generateUsagePlaylist} value="4">Gerar playlist</button>
                    </div>
                    <div className="col-md-12">
                        <p className="lead ml-5 mt-5" style={{ fontSize: "2rem", fontStyle: "italic" }}>Em todo o tempo...</p>
                        <p className="lead ml-5" style={{ fontSize: "2rem" }}>O seu artista mais ouvido foi: <span style={{ color: "#ffffff" }}>{this.state.topArtistLifeTime}</span></p>
                        <p className="lead ml-5" style={{ fontSize: "2rem" }}>A sua música mais ouvida foi: <span style={{ color: "#ffffff" }}>{this.state.topMusicLifeTime}</span></p>
                        <button className="btn btn-large btn-dark ml-5 mb-5 mt-3" data-toggle="modal" data-target="#PlaylistModal" style={{ fontSize: "1.3rem", borderRadius: "20px"  }} onClick={this.generateUsagePlaylist} value="LifeTime">Gerar playlist</button>
                    </div>
                </div>
                <PlaylistModal />
            </div>
        )
    }
}

const mapStateToProps = store => ({
    accessToken: store.accessToken.accessToken,
    refreshToken: store.refreshToken.refreshToken,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ getModalImage, getModalUrl, getModalArtist, getModalMusic}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
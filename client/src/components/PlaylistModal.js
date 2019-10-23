import React, { Component } from 'react';
import { connect } from 'react-redux';

class PlaylistModal extends Component {
    constructor(props) {
        super(props);
        this.redirectToPlaylist = this.redirectToPlaylist.bind(this);
    }

    redirectToPlaylist(){
        const {modalUrl} = this.props
        window.open(modalUrl, '_blank').focus()
    }
    render() {
        const { modalImage } = this.props;
        return (
            <div className="modal fade" tabIndex="-1" role="dialog" id="PlaylistModal">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header" style={{ backgroundColor: "#265738" }}>
                            <h5 className="modal-title" style={{ color: "#ffffff" }}>Playlist</h5>
                        </div>
                        <div className="modal-body">
                            <div className="row text-center">
                                <div className="col-md-12">
                                    <p className="lead" style={{ fontSize: "1.5rem" }}>Playlist criada com sucesso!</p>
                                    <p className="lead mb-5" style={{ fontSize: "1.5rem" }}>Quantidade de músicas adicionadas: 35</p>
                                    <img src={this.props.modalImage} className="rounded mb-5" style={{ width: "70%", height: "auto" }}></img>
                                    <p className="lead" style={{ fontSize: "1.5rem" }}>Parâmetros utilizados para a geração:</p>
                                    <p className="lead">Artista: <span className="lead" style={{ fontWeight: "bold" }}>{this.props.modalArtist}</span></p>
                                    <p className="lead mb-5">Música: <span className="lead" style={{ fontWeight: "bold" }}>{this.props.modalMusic}</span></p>
                                    <button className="btn btn-large" style={{ fontSize: "1.5rem", backgroundColor: "#265738", color: "#ffffff" }} onClick={this.redirectToPlaylist}>Acessar pelo Spotify</button>

                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" data-dismiss="modal" style={{fontSize: "1.5rem"}}>Voltar</button>
                        </div>

                    </div>
                </div>
            </div>

        )



    }
}

const mapStateToProps = store => ({
    modalImage: store.modalImage.modalImage,
    modalUrl: store.modalUrl.modalUrl,
    modalArtist: store.modalArtist.modalArtist,
    modalMusic: store.modalMusic.modalMusic
});

export default connect(mapStateToProps)(PlaylistModal);
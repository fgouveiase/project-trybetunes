import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  state = {
    musics: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const response = await getMusics(id);
    this.setState({
      musics: response,
    });
  }

  render() {
    const { musics } = this.state;
    const album = musics[0];
    const list = musics.filter((music) => music.trackName).map((music) => (
      <MusicCard
        key={ music.trackId }
        music={ music }
      />));
    return (
      <div data-testid="page-album">

        <Header />
        {
          album ? (
            <div>
              <div data-testid="artist-name">
                {album.artistName}
              </div>
              <div data-testid="album-name">
                {album.collectionName}
              </div>
              {list}
            </div>
          ) : 'Carregando...'
        }
      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Album;

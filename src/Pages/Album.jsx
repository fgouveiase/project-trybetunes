import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends Component {
  state = {
    musics: [],
    favorites: [],
    loading: false,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.setState({ loading: true });
    const response = await getMusics(id);
    this.setState({
      musics: response,
    });
    const favoriteSong = await getFavoriteSongs();
    this.setState({ loading: false, favorites: favoriteSong });
  }

  render() {
    const { musics, loading, favorites } = this.state;
    const album = musics[0];
    const list = musics.filter((music) => music.kind === 'song').map((music) => {
      const findFavorite = favorites.find((element) => element.trackId === music.trackId);

      return (<MusicCard
        key={ music.trackId }
        music={ music }
        favorite={ findFavorite !== undefined }
      />);
    });

    return (
      <div data-testid="page-album">

        <Header />
        {
          album && !loading ? (

            <div>
              <div data-testid="artist-name">
                {album.artistName}
              </div>
              <div data-testid="album-name">
                {album.collectionName}
              </div>
              {list}
            </div>
          ) : <Loading />
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

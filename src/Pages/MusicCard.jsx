import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
    check: false,
  };

  async componentDidMount() {
    const { favorite } = this.props;
    const getFavorite = await getFavoriteSongs();
    if (getFavorite) { this.setState({ check: favorite }); }
  }

  handleChange = async () => {
    const { music } = this.props;
    const { check } = this.state;
    this.setState({ loading: true });
    if (!check) {
      await addSong(music);
      this.setState({ loading: false, check: true });
    } else {
      await removeSong(music);
    }
    this.setState({ check: false, loading: false });
  };

  render() {
    const { music } = this.props;
    const { loading, check } = this.state;

    return (
      loading ? <Loading /> : (
        <div>
          <span>{music.trackName}</span>
          <audio data-testid="audio-component" src={ music.previewUrl } controls>
            <track kind="captions" />
            O seu navegador nao suporta o elemento
            {' '}
            <code>audio</code>
          </audio>
          <div>
            <label
              htmlFor="checkbox"
            >
              Favorita
              <input
                data-testid={ `checkbox-music-${music.trackId}` }
                type="checkbox"
                id="checkbox"
                name={ music.trackId }
                onChange={ this.handleChange }
                checked={ check }
              />
            </label>
          </div>
        </div>
      )
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.objectOf(Object).isRequired,
  favorite: PropTypes.bool.isRequired,
};

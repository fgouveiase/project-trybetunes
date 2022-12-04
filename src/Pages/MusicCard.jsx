import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
    check: false,
  };

  handleChange = async () => {
    const { music } = this.props;
    this.setState({ loading: true });
    await addSong(music);
    this.setState({ loading: false, check: true });
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
};

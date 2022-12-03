import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  state = {
    enable: true,
    artistName: '',
    saveArtistName: '',
    loading: false,
    albuns: [],
    nameNotFound: false,
  };

  handleChange = ({ name, value }) => {
    this.setState({
      [name]: value,
    }, () => {
      this.enableBtn();
    });
  };

  enableBtn = () => {
    const { artistName } = this.state;
    if (artistName.length >= 2) {
      this.setState({
        enable: false,
      });
    } else {
      this.setState({
        enable: true,
      });
    }
  };

  searchArtist = (singer) => {
    if (singer.length === 0) {
      this.setState({
        nameNotFound: true,
      });
    } else {
      this.setState({
        nameNotFound: false,
      });
    }
  };

  clickFetch = async () => {
    const { artistName } = this.state;
    this.setState({
      artistName: '',
      saveArtistName: artistName,
    });
    this.setState({
      loading: true,
    });
    const response = await searchAlbumsAPI(artistName);
    this.setState({
      loading: false,
      albuns: response,
    }, () => {
      this.searchArtist(response);
    });
  };

  render() {
    const { enable,
      artistName, loading,
      saveArtistName,
      albuns,
      nameNotFound,
    } = this.state;
    return (
      <div data-testid="page-search">
        {loading ? <Loading />
          : (
            <form>
              <Header />
              <input
                type="text"
                data-testid="search-artist-input"
                onChange={ ({ target }) => this.handleChange(target) }
                name="artistName"
                value={ artistName }
              />
              <button
                data-testid="search-artist-button"
                type="button"
                name="button"
                disabled={ enable }
                onClick={ this.clickFetch }
              >
                Pesquisar
              </button>
              {
                albuns.length > 0
                  ? (
                    <p>{`Resultado de álbuns de:  ${saveArtistName}`}</p>
                  )
                  : ''
              }
              {
                nameNotFound && <p>`Nenhum álbum foi encontrado</p>
              }
              {

                albuns.map((element) => (
                  <Link
                    to={ `/album/${element.collectionId}` }
                    data-testid={ `link-to-album-${element.collectionId}` }
                    key={ element.collectionId }
                  >
                    <div key={ element.collectionId }>
                      <img src={ element.artworkUrl100 } alt={ element.artistName } />
                      <h4>{`Àlbum: ${element.collectionName}`}</h4>
                      <p>{`Artist: ${element.artistName}`}</p>
                      <p>{`Price: R$ ${element.collectionPrice}`}</p>
                    </div>
                  </Link>
                ))

              }
            </form>
          )}
      </div>
    );
  }
}

export default Search;

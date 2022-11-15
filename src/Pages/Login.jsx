import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  state = {
    login: '',
    loading: false,
    linkSearch: false,
    // disableButton: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.disableButton(value);
    });
  };

  handleSubmit = async () => {
    const { login } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: login });
    this.setState({
      loading: false,
      linkSearch: true,
    });
  };

  disableButton = () => {
    const minCaractere = 3;
    const { login } = this.state;
    return (login.length >= minCaractere);
  };

  render() {
    const { login, loading, linkSearch } = this.state;
    return (
      <div data-testid="page-login">
        { loading === true ? (<Loading />) : (
          <form className="form">
            <label htmlFor="nome">
              Nome
              <input
                type="text"
                data-testid="login-name-input"
                name="login"
                value={ login }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="login-submit-button"
              onClick={ this.handleSubmit }
              disabled={ !this.disableButton() }
            >
              Entrar
            </button>
          </form>
        )}
        { linkSearch && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;

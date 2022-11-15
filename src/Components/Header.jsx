import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    userName: '',
    loading: true,
  };

  async componentDidMount() {
    const response = await getUser();
    const { name } = response;
    this.setState({
      userName: name,
      loading: false,
    });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? (<div> Carregando...</div>)
          : (<div data-testid="header-user-name">{userName}</div>) }
        <section>
          <Link data-testid="link-to-search" to="/search">search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">search</Link>
          <Link data-testid="link-to-profile" to="/profile">search</Link>
        </section>
      </header>
    );
  }
}

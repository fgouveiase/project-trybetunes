import React, { Component } from 'react';
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
      </header>
    );
  }
}

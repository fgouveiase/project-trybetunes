import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  state = {
    loading: true,
    userInfo: {},
  };

  async componentDidMount() {
    const getUserInfo = await getUser();
    this.setState({
      loading: false,
      userInfo: getUserInfo,
    });
  }

  render() {
    const { userInfo, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading ? (<Loading />) : (
            <div>
              <img
                data-testid="profile-image"
                alt={ userInfo.name }
                src={ userInfo.image }
              />
              <div>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
              <span>Nome:</span>
              <p>{userInfo.name}</p>
              <span>E-mail:</span>
              <p>{userInfo.email}</p>
              <span>Descrição:</span>
              <p>{userInfo.description}</p>
            </div>
          )
        }
      </div>
    );
  }
}

export default Profile;

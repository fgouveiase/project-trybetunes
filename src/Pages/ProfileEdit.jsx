import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends Component {
  state = {
    loading: false,
    image: '',
    name: '',
    description: '',
    email: '',
    redirect: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({
      loading: false,
      image: user.image,
      name: user.name,
      email: user.email,
      description: user.description,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  updateInfos = () => {
    const { name, description, email, image } = this.state;
    this.setState({ loading: true }, async () => {
      await updateUser({
        image,
        name,
        email,
        description,
      });
      this.setState({ loading: false, redirect: true });
    });
  };

  enableBtn = () => {
    const { name, image, description, email } = this.state;
    const validateName = name.length > 0;
    const validateDescription = description.length > 0;
    const validateImage = image.length > 0;
    const validateEmail = email.length > 0;
    return validateName && validateDescription && validateImage && validateEmail;
  };

  render() {
    const { image, loading, name, description, email, redirect } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <p>Profile Edit</p>
        { loading && <Loading /> }
        <div>
          <label htmlFor="name">
            Nome:
            <input
              id="name"
              data-testid="edit-input-name"
              type="text"
              value={ name }
              onChange={ this.handleChange }
              name="name"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              data-testid="edit-input-email"
              type="email"
              value={ email }
              onChange={ this.handleChange }
              name="email"
            />
          </label>
          <label htmlFor="image">
            Imagem:
            <input
              id="image"
              type="text"
              data-testid="edit-input-image"
              value={ image }
              onChange={ this.handleChange }
              name="image"
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              id="description"
              type="text"
              data-testid="edit-input-description"
              value={ description }
              onChange={ this.handleChange }
              name="description"
            />
          </label>
          <button
            data-testid="edit-button-save"
            type="button"
            disabled={ !this.enableBtn() }
            onClick={ this.updateInfos }
          >
            Salvar

          </button>
        </div>
        {redirect && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;

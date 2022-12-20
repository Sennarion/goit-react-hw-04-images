import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import styles from './Searchbar.module.css';

export default class Searchbar extends Component {
  static propTypes = { onSubmit: PropTypes.func.isRequired };

  state = {
    value: '',
  };

  onInputChange = e => {
    this.setState({ value: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();

    if (this.state.value.trim() === '') {
      toast.error('Whooops... You should write something!');
      return;
    }

    this.props.onSubmit(this.state.value.trim());
    this.setState({ value: '' });
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.onFormSubmit}>
          <button className={styles.SearchFormButton} type="submit">
            <span className={styles.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.onInputChange}
          />
        </form>
      </header>
    );
  }
}

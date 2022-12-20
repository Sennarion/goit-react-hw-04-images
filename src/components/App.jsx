import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';
import { ImageGallery, Searchbar } from 'components';

export default class App extends Component {
  state = {
    query: '',
  };

  onFormSubmit = query => {
    this.setState({ query });
  };

  render() {
    const { query } = this.state;

    return (
      <>
        <div className={styles.App}>
          <Searchbar value={query} onSubmit={this.onFormSubmit} />
          <ImageGallery query={query} />
          <ToastContainer />
        </div>
      </>
    );
  }
}

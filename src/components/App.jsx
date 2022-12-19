import React, { Component } from 'react';
import api from 'services/pixabayApi';
import styles from './App.module.css';
import { Button, ImageGallery, Loader, Modal, Searchbar } from 'components';

export default class App extends Component {
  state = {
    photos: [],
    query: '',
    page: 1,
    isLoading: false,
    isBtnShow: false,
    isModalOpen: '',
  };

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });

      const { hits, totalHits } = await api.getPhotos();
      this.setState({ photos: hits });
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  onFormSubmit = async query => {
    this.setState({ query, page: 1 });

    try {
      this.setState({ isLoading: true });

      const { hits, totalHits } = await api.getPhotos(query);
      this.setState({ photos: hits });
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onBtnClick = async () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));

    try {
      this.setState({ isLoading: true });

      const { hits, totalHits } = await api.getPhotos(
        this.state.query,
        this.state.page + 1
      );

      this.setState(prevState => ({
        photos: [...prevState.photos, ...hits],
      }));
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { photos, query, isLoading } = this.state;

    return (
      <div className={styles.App}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Searchbar value={query} onSubmit={this.onFormSubmit} />
            <ImageGallery photos={photos} />
            <Button onClick={this.onBtnClick}>Load more</Button>
          </>
        )}
      </div>
    );
  }
}

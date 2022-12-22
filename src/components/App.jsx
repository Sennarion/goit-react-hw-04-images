import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Loader, Modal, ErrorMessage } from 'components';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';
import api from '../services/pixabayApi';
import { ImageGallery, Searchbar } from 'components';

const initialState = {
  photos: [],
  query: '',
  page: 1,
  isLoading: false,
  isBtnShow: false,
  modalImg: null,
  error: null,
};

export default class App extends Component {
  state = {
    ...initialState,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const { hits: photos, totalHits } = await api.getPhotos(query, page);

        if (totalHits === 0) {
          throw new Error(`We didn't find photos by query "${query}"`);
        }

        if (page === 1) {
          toast.info(`We found ${totalHits} images for you`);
        }

        this.setState(prevState => ({
          photos: [...prevState.photos, ...photos],
          isBtnShow: page < Math.ceil(totalHits / 12),
        }));
      } catch (error) {
        this.setState({ error: error.message });
        toast.error(error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onBtnClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onFormSubmit = query => {
    this.setState({
      ...initialState,
      query,
    });
  };

  openModal = modalImg => {
    this.setState({ modalImg });
  };

  closeModal = () => {
    this.setState({ modalImg: null });
  };

  render() {
    const { photos, isBtnShow, isLoading, modalImg, error } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.onFormSubmit} />
        <ImageGallery photos={photos} openModal={this.openModal} />
        {modalImg && <Modal photo={modalImg} closeModal={this.closeModal} />}
        {error && <ErrorMessage message={error} />}
        {isLoading && <Loader />}
        {isBtnShow && <Button onClick={this.onBtnClick}>Load more</Button>}
        <ToastContainer autoClose={1000} />
      </div>
    );
  }
}

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
  isInvalidQuery: false,
};

export default class App extends Component {
  state = {
    ...initialState,
  };

  async componentDidUpdate(prepProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      try {
        const { hits: photos, totalHits } = await api.getPhotos(
          this.state.query,
          this.state.page
        );

        if (totalHits === 0) {
          this.setState({ isInvalidQuery: true });
          return;
        }

        if (this.state.page === 1) {
          toast.info(`We found ${totalHits} images for you`);
        }

        this.setState(prevState => ({
          photos: [...prevState.photos, ...photos],
          isBtnShow: this.state.page < Math.ceil(totalHits / 12),
        }));
      } catch (error) {
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
    const { photos, isBtnShow, isLoading, modalImg, isInvalidQuery } =
      this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.onFormSubmit} />
        <ImageGallery photos={photos} openModal={this.openModal} />
        {modalImg && <Modal photo={modalImg} closeModal={this.closeModal} />}
        {isInvalidQuery && <ErrorMessage />}
        {isLoading && <Loader />}
        {isBtnShow && <Button onClick={this.onBtnClick}>Load more</Button>}
        <ToastContainer autoClose={1000} />
      </div>
    );
  }
}

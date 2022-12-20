import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/pixabayApi';
import {
  ImageGalleryItem,
  Button,
  Loader,
  Modal,
  ErrorMessage,
} from 'components';
import styles from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
  };

  state = {
    photos: [],
    query: '',
    page: 1,
    isLoading: false,
    isBtnShow: false,
    modalImg: null,
  };

  async componentDidMount() {
    this.showLoader();

    try {
      const { hits: photos, totalHits } = await api.getPhotos();
      this.setState({ photos });

      if (totalHits > this.state.photos.length) {
        this.showLoadMoreBtn();
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      this.hideLoader();
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.showLoader();
      this.hideLoadMoreBtn();

      try {
        this.setState({
          query: this.props.query,
          page: 1,
        });

        const { hits: photos, totalHits } = await api.getPhotos(
          this.props.query
        );

        this.setState({ photos });

        if (totalHits > this.state.photos.length) {
          this.showLoadMoreBtn();
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        this.hideLoader();
      }
    }
  }

  onBtnClick = async () => {
    this.showLoader();
    this.hideLoadMoreBtn();

    this.setState(prevState => ({
      page: prevState.page + 1,
    }));

    try {
      console.log(this.state.page);
      const { hits: photos, totalHits } = await api.getPhotos(
        this.state.query,
        this.state.page + 1
      );

      this.setState(prevState => ({
        photos: [...prevState.photos, ...photos],
      }));

      if (totalHits > this.state.photos.length) {
        this.showLoadMoreBtn();
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      this.hideLoader();
    }
  };

  onPhotoClick = modalImg => {
    this.setState({ modalImg });
  };

  onModalClose = () => {
    this.setState({ modalImg: null });
  };

  showLoader() {
    this.setState({ isLoading: true });
  }

  hideLoader() {
    this.setState({ isLoading: false });
  }

  showLoadMoreBtn() {
    this.setState({ isBtnShow: true });
  }

  hideLoadMoreBtn() {
    this.setState({ isBtnShow: false });
  }

  render() {
    const { photos, isBtnShow, isLoading, modalImg } = this.state;

    return (
      <>
        {isLoading && <Loader />}
        {photos.length > 0 ? (
          <ul className={styles.ImageGallery}>
            {photos.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                smallPhoto={webformatURL}
                largePhoto={largeImageURL}
                photoDescr={tags}
                onPhotoClick={this.onPhotoClick}
              />
            ))}
          </ul>
        ) : (
          <ErrorMessage />
        )}
        {isBtnShow && <Button onClick={this.onBtnClick}>Load more</Button>}
        {modalImg && (
          <Modal photo={modalImg} onModalClose={this.onModalClose} />
        )}
      </>
    );
  }
}

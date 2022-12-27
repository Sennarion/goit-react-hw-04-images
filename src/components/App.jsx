import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Loader, Modal, ErrorMessage } from 'components';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';
import api from '../services/pixabayApi';
import { ImageGallery, Searchbar } from 'components';

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnShow, setIsBtnShow] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function getPhotos() {
      try {
        setIsLoading(true);
        const { hits: photos, totalHits } = await api.getPhotos(query, page);

        if (totalHits === 0) {
          throw new Error(`We didn't find photos by query "${query}"`);
        }

        if (page === 1) {
          toast.info(`We found ${totalHits} images for you`);
        }

        setPhotos(prevPhotos => [...prevPhotos, ...photos]);
        setIsBtnShow(page < Math.ceil(totalHits / 12));
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getPhotos();
  }, [query, page]);

  const onBtnClick = () => {
    setPage(prev => prev + 1);
  };

  const onFormSubmit = query => {
    setPhotos([]);
    setPage(1);
    setIsBtnShow(false);
    setIsLoading(false);
    setError(null);
    setModalImg(null);
    setQuery(query);
  };

  const openModal = modalImg => {
    setModalImg(modalImg);
  };

  const closeModal = () => {
    setModalImg(null);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={onFormSubmit} />
      <ImageGallery photos={photos} openModal={openModal} />
      {modalImg && <Modal photo={modalImg} closeModal={closeModal} />}
      {error && <ErrorMessage message={error} />}
      {isLoading && <Loader />}
      {isBtnShow && <Button onClick={onBtnClick}>Load more</Button>}
      <ToastContainer autoClose={1000} />
    </div>
  );
}

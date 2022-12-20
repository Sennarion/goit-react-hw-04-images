import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components';
import styles from './ImageGallery.module.css';

function ImageGallery({ photos, onModalOpen }) {
  return (
    <ul className={styles.ImageGallery}>
      {photos.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          smallPhoto={webformatURL}
          largePhoto={largeImageURL}
          photoDescr={tags}
          onModalOpen={onModalOpen}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {};

export default ImageGallery;

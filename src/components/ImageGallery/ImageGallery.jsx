import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components';
import styles from './ImageGallery.module.css';

function ImageGallery({ photos, openModal }) {
  return (
    <ul className={styles.ImageGallery}>
      {photos.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          smallPhoto={webformatURL}
          largePhoto={largeImageURL}
          photoDescr={tags}
          openModal={openModal}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};

export default ImageGallery;

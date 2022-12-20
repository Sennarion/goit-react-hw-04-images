import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

function ImageGalleryItem({ smallPhoto, largePhoto, photoDescr, openModal }) {
  return (
    <li
      className={styles.ImageGalleryItem}
      onClick={() => openModal({ largePhoto, photoDescr })}
    >
      <img
        className={styles.ImageGalleryItemImage}
        src={smallPhoto}
        alt={photoDescr}
        loading="lazy"
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  smallPhoto: PropTypes.string.isRequired,
  largePhoto: PropTypes.string.isRequired,
  photoDescr: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

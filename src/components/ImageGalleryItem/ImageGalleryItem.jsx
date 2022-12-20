import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

function ImageGalleryItem({ smallPhoto, largePhoto, photoDescr, onModalOpen }) {
  return (
    <li
      className={styles.ImageGalleryItem}
      onClick={() => onModalOpen({ largePhoto, photoDescr })}
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

ImageGalleryItem.propTypes = {};

export default ImageGalleryItem;

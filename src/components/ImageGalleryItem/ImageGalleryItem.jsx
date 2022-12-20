import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

function ImageGalleryItem({
  smallPhoto,
  largePhoto,
  photoDescr,
  onPhotoClick,
}) {
  return (
    <li
      className={styles.ImageGalleryItem}
      onClick={() => onPhotoClick({ largePhoto, photoDescr })}
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

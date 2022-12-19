import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components';
import styles from './ImageGallery.module.css';

function ImageGallery({ photos }) {
  return (
    <ul className={styles.ImageGallery}>
      {photos.map(photo => (
        <ImageGalleryItem key={photo.id} photo={photo} />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {};

export default ImageGallery;

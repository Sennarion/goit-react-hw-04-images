import PropTypes from 'prop-types';
import { useEffect } from 'react';
import styles from './Modal.module.css';

export default function Modal({ photo, closeModal }) {
  useEffect(() => {
    const onPressEsc = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', onPressEsc);

    return () => window.removeEventListener('keydown', onPressEsc);
  }, [closeModal]);

  const onOverlayClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={styles.Overlay} onClick={onOverlayClick}>
      <div className={styles.Modal}>
        <img src={photo.largePhoto} alt={photo.photoDescr} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  photo: PropTypes.exact({
    largePhoto: PropTypes.string.isRequired,
    photoDescr: PropTypes.string.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};

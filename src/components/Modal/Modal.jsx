import PropTypes from 'prop-types';
import styles from './Modal.module.css';

function Modal({ photoUrl, photoDescr }) {
  return (
    <div className={styles.Overlay}>
      <div className={styles.Modal}>
        <img src={photoUrl} alt={photoDescr} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  photoUrl: PropTypes.string.isRequired,
  photoDescr: PropTypes.string.isRequired,
};

export default Modal;

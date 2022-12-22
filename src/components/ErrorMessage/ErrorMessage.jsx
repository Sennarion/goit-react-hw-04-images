import PropTypes from 'prop-types';
import image from '../../images/crying-cat.jpeg';
import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ message }) {
  return (
    <div className={styles.ErrorWrapper}>
      <p className={styles.ErrorText}>
        Sorry, something went wrong... {message}
      </p>
      <img src={image} alt="crying-cat" />
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

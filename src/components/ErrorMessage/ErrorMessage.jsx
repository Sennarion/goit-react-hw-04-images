import image from '../../images/crying-cat.jpeg';
import styles from './ErrorMessage.module.css';

export default function ErrorMessage() {
  return (
    <div className={styles.ErrorWrapper}>
      <p className={styles.ErrorText}>Sorry, we don't find anything...</p>
      <img src={image} alt="crying-cat" />
    </div>
  );
}

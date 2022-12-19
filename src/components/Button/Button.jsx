import PropTypes from 'prop-types';
import styles from './Button.module.css';

function Button({ children, onClick }) {
  return (
    <button className={styles.Button} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;

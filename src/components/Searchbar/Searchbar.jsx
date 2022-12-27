import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const onFormSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      toast.error('Whooops... You should write something!');
      return;
    }

    onSubmit(value.trim());
    setValue('');
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={onFormSubmit}>
        <button className={styles.SearchFormButton} type="submit">
          <span className={styles.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={styles.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

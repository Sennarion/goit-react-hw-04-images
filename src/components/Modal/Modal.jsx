import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './Modal.module.css';

export default class Modal extends Component {
  static propTypes = {
    photo: PropTypes.exact({
      largePhoto: PropTypes.string.isRequired,
      photoDescr: PropTypes.string.isRequired,
    }).isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onPressEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onPressEsc);
  }

  onPressEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  onOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { largePhoto, photoDescr } = this.props.photo;

    return (
      <div className={styles.Overlay} onClick={this.onOverlayClick}>
        <div className={styles.Modal}>
          <img src={largePhoto} alt={photoDescr} />
        </div>
      </div>
    );
  }
}

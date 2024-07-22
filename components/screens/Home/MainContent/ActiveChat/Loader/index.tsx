import React from 'react';
import styles from './styles.module.css';

function Loader() {
  return (
    <div className={styles.loader}>
      <span className={styles.typewriter}>...</span>
      <span className={styles.blink} />
    </div>
  );
}

export default Loader;

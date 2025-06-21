import React from 'react';
import styles from './sidearea.module.css';

const SideArea: React.FC = () => {
  return (
    <div className={styles.sidearea}>
      <div className={styles.sa_content}>
        <div className={styles.sac_title}>検索窓</div>
        <div className={styles.sac_content}>
          <input className="sac_search_input" />
          <button>検索</button>
        </div>
      </div>
    </div>
  );
};

export default SideArea;

import React from 'react';
import styles from './footer.module.css';

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <ul>
        <li>© since 2025</li>
      </ul>
    </div>
  );
};

export default Footer;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './header.module.css';

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.header}>
      <h1
        onClick={() => {
          navigate('/');
        }}
      >
        Casualize the Life!
      </h1>
    </div>
  );
};

export default Header;

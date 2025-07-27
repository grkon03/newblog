import React from 'react';
import styles from './sidearea.module.css';

type Props = {
  items?: React.JSX.Element[];
};

const SideArea: React.FC<Props> = ({ items = [] }) => {
  return <div className={styles.sidearea}>{items}</div>;
};

export default SideArea;

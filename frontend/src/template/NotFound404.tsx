import React from 'react';
import { MainAreaProps, SetSideArea } from '../types';
import styles from './NotFound404.module.css';

type Props = {
  mainareaprops?: MainAreaProps;
};

const NotFound404: React.FC<Props> = ({ mainareaprops }) => {
  SetSideArea(mainareaprops);

  return (
    <div className={styles.nf404}>
      <h2>404 Not Found</h2>
    </div>
  );
};

export default NotFound404;

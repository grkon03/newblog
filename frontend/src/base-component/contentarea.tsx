import React, { ReactNode } from 'react';
import styles from './contentarea.module.css';
import SideArea from './sidearea';

type Props = {
  children: ReactNode;
};

const ContentArea: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.contentarea}>
      <div className={styles.mainarea}>{children}</div>
      <div className={styles.sidearea}>
        <SideArea />
      </div>
    </div>
  );
};

export default ContentArea;

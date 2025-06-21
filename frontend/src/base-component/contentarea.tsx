import React from 'react';
import styles from './contentarea.module.css';
import SideArea from './sidearea';

type Props = {
  mainarea: React.JSX.Element;
};

const ContentArea: React.FC<Props> = ({ mainarea }) => {
  return (
    <div className={styles.contentarea}>
      <div className={styles.mainarea}>{mainarea}</div>
      <div className={styles.sidearea}>
        <SideArea />
      </div>
    </div>
  );
};

export default ContentArea;

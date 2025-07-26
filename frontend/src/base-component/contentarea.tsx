import React, { ReactElement, useState, useEffect, cloneElement } from 'react';
import styles from './contentarea.module.css';
import SideArea from './sidearea';
import { MainAreaProps } from '../types';

type Props = {
  children: ReactElement<{ mainareaprops: MainAreaProps }>;
};

const ContentArea: React.FC<Props> = ({ children }) => {
  const [sideareItems, setSideAreaItems] = useState<React.JSX.Element[]>([]);
  const [isUpdatedSideArea, setIsUpdatedSideArea] = useState<boolean>(false);

  useEffect(() => {
    setIsUpdatedSideArea(false);
  }, [children]);

  var arranged = cloneElement(children, {
    mainareaprops: {
      setSideAreaItems: setSideAreaItems,
      isUpdatedSideArea: isUpdatedSideArea,
      setIsUpdatedSideArea: setIsUpdatedSideArea,
    },
  });

  return (
    <div className={styles.contentarea}>
      <div className={styles.mainarea}>{arranged}</div>
      <div className={styles.sidearea}>
        <SideArea items={sideareItems} />
      </div>
    </div>
  );
};

export default ContentArea;

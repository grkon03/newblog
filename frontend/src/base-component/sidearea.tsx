import React from 'react';
import styles from './sidearea.module.css';

type Props = {
  displayDefaultItems?: boolean;
  items?: React.JSX.Element[];
};

const DefaultItems = (): React.JSX.Element[] => {
  var items: React.JSX.Element[] = [];
  items.push(
    <div className={`${styles.sa_item} ${styles.sa_search}`} key="sai_search">
      <div className={styles.sai_title}>検索窓</div>
      <div className={styles.sai_content}>
        <input className="sac_search_input" />
        <button>検索</button>
      </div>
    </div>
  );
  return items;
};

const SideArea: React.FC<Props> = ({
  displayDefaultItems = true,
  items = [],
}) => {
  return (
    <div className={styles.sidearea}>
      {displayDefaultItems ? DefaultItems() : []}
      {items}
    </div>
  );
};

export default SideArea;

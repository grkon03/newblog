import React from 'react';
import styles from './sidearea.module.css';

type Props = {
  display_default_items?: boolean;
  addItems?: () => React.JSX.Element[];
};

const DefaultItems = (): React.JSX.Element[] => {
  var items: React.JSX.Element[] = [];
  items.push(
    <div className={styles.sa_item}>
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
  display_default_items = true,
  addItems = () => [],
}) => {
  return (
    <div className={styles.sidearea}>
      {display_default_items ? DefaultItems() : []}
      {addItems()}
    </div>
  );
};

export default SideArea;

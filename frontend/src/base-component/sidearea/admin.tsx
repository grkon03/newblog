import React from 'react';
import { useNavigate } from 'react-router-dom';
import sastyles from '../sidearea.module.css';
import styles from './admin.module.css';

const Menu: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={`${sastyles.sa_item} ${styles.menu}`}>
      <div className={sastyles.sai_title}>メニュー</div>
      <div className={sastyles.sai_content}>
        <div
          className={styles.menuitem}
          onClick={() => navigate('/admin/createarticle')}
        >
          記事を作成する
        </div>
      </div>
    </div>
  );
};

export const AdminSA = [<Menu key="sai_createarticle" />];

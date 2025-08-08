import React from 'react';
import { useNavigate } from 'react-router-dom';
import sastyles from '../sidearea.module.css';
import styles from './admin.module.css';

const Menu: React.FC = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className={`${sastyles.sa_item} ${styles.menu}`}>
      <div className={sastyles.sai_title}>メニュー</div>
      <div className={sastyles.sai_content}>
        <div
          className={styles.menuitem}
          onClick={() => navigate('/admin/dashboard')}
        >
          ダッシュボード
        </div>
        <div
          className={styles.menuitem}
          onClick={() => navigate('/admin/editarticle')}
        >
          記事を作成する
        </div>
        <div className={styles.menuitem} onClick={logout}>
          ログアウト
        </div>
      </div>
    </div>
  );
};

export const AdminSA = [<Menu key="sai_createarticle" />];

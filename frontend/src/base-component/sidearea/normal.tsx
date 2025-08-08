import React from 'react';
import { useNavigate } from 'react-router-dom';
import sastyles from '../sidearea.module.css';
import styles from './normal.module.css';

const Search: React.FC = () => {
  return (
    <div className={`${sastyles.sa_item} ${styles.search}`}>
      <div className={sastyles.sai_title}>検索窓</div>
      <div className={sastyles.sai_content}>
        <input className="sac_search_input" />
        <button>検索</button>
      </div>
    </div>
  );
};

const ForAdmin: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={sastyles.sa_item}>
      <div className={sastyles.sai_title}>管理者メニュー</div>
      <div className={sastyles.sai_content}>
        <div onClick={() => navigate('/admin/login')}>ログイン</div>
      </div>
    </div>
  );
};

export const NormalSA = [
  <Search key="sai_search" />,
  <ForAdmin key="foradmin" />,
];

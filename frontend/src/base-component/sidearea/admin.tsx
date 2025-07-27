import React from 'react';
import { useNavigate } from 'react-router-dom';
import sastyles from '../sidearea.module.css';

const Menu: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={sastyles.sa_item}>
      <button onClick={() => navigate('createarticle')}>記事を作成する</button>
    </div>
  );
};

export const AdminSA = [<Menu key="sai_createarticle" />];

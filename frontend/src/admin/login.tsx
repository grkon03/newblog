import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login, LoginRequest } from '../api/user';
import styles from './login.module.css';
import { MainAreaProps, InitSideArea } from '../types';

type Props = {
  mainareaprops?: MainAreaProps;
};

const LoginPage: React.FC<Props> = ({ mainareaprops }) => {
  InitSideArea(mainareaprops);

  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const AfterSucceeded = () => {
    navigate('/admin/dashboard');
  };

  const AfterFailed = () => {
    setMessage('ユーザー名またはパスワードが違います');
  };

  const handleClick = () => {
    if (username === '' || password === '') {
      setMessage('全て入力してください');
      return;
    }

    var req: LoginRequest = {
      username: username,
      password: password,
    };

    Login(req).then((ok) => {
      if (ok) {
        AfterSucceeded();
      } else {
        AfterFailed();
      }
    });
  };

  return (
    <div className={styles.login}>
      <h2>管理者ログイン</h2>
      <div className={styles.form}>
        <div>
          ユーザー名:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          パスワード:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleClick}>ログイン</button>
      </div>
      <div className={styles.message}>{message}</div>
    </div>
  );
};

export default LoginPage;

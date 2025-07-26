import React, { useState } from 'react';
import { API, LoginRequest } from '../api/api';
import styles from './login.module.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const AfterSuceeded = () => {
    // 試しに ping を打ってみる
    API.GET<string>('/auth/ping').then((res) => alert(res));
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

    API.LOGIN(req).then((res) => {
      if (res) {
        AfterSuceeded();
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

export default Login;

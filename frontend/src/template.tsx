import React, { useEffect, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './base-component/header';
import Footer from './base-component/footer';
import base from './base.module.css';
import ContentArea from './base-component/contentarea';
import NotFound404 from './template/NotFound404';
import { MainAreaProps } from './types';
import { LoginUser } from './api/user';

type Props = {
  children?: ReactElement<{ mainareaprops: MainAreaProps }>;
  shouldLogin?: boolean;
};

const Template: React.FC<Props> = ({
  children = <NotFound404 />,
  shouldLogin = false,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (shouldLogin) {
      if (LoginUser() === null) navigate('/admin/login');
    }
  }, [children, shouldLogin, navigate]);
  return (
    <div className={base.page}>
      <React.Fragment>
        <Header />
        <div className={base.ContentArea}>
          <ContentArea>{children}</ContentArea>
        </div>
        <Footer />
      </React.Fragment>
    </div>
  );
};

export default Template;

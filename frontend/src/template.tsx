import React, { ReactNode } from 'react';
import Header from './base-component/header';
import Footer from './base-component/footer';
import base from './base.module.css';
import ContentArea from './base-component/contentarea';
import NotFound404 from './template/NotFound404';

type Props = {
  children?: ReactNode;
};

const Template: React.FC<Props> = ({ children = <NotFound404 /> }) => {
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

import React, { ReactElement } from 'react';
import Header from './base-component/header';
import Footer from './base-component/footer';
import base from './base.module.css';
import ContentArea from './base-component/contentarea';
import NotFound404 from './template/NotFound404';
import { MainAreaProps } from './types';

type Props = {
  children?: ReactElement<{ mainareaprops: MainAreaProps }>;
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

import React from 'react';
import Header from './base-component/header';
import Footer from './base-component/footer';
import base from './base.module.css';
import ContentArea from './base-component/contentarea';
import NotFound404 from './template/NotFound404';

type Props = {
  mainarea?: React.JSX.Element;
};

const Template: React.FC<Props> = ({ mainarea = <NotFound404 /> }) => {
  return (
    <div className={base.page}>
      <React.Fragment>
        <Header />
        <ContentArea mainarea={mainarea} />
        <Footer />
      </React.Fragment>
    </div>
  );
};

export default Template;

import React from 'react';
import { MainAreaProps, InitSideArea } from '../types';
import { AdminSA } from '../base-component/sidearea/admin';

type Props = {
  mainareaprops?: MainAreaProps;
};

const CreateArticle: React.FC<Props> = ({ mainareaprops }) => {
  InitSideArea(mainareaprops, AdminSA);
  return <div></div>;
};

export default CreateArticle;

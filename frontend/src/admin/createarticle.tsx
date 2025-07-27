import React from 'react';
import MDEditor from './components/mdeditor';
import { MainAreaProps, InitSideArea } from '../types';
import { AdminSA } from '../base-component/sidearea/admin';

type Props = {
  mainareaprops?: MainAreaProps;
};

const CreateArticle: React.FC<Props> = ({ mainareaprops }) => {
  InitSideArea(mainareaprops, AdminSA);
  return (
    <div>
      <h2>記事を作成する</h2>
      <div>
        <MDEditor />
      </div>
    </div>
  );
};

export default CreateArticle;

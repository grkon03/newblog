import React, { useState } from 'react';
import MDEditor from './components/mdeditor';
import MDPreview from './components/mdpreview';
import { MainAreaProps, InitSideArea } from '../types';
import { AdminSA } from '../base-component/sidearea/admin';

type Props = {
  mainareaprops?: MainAreaProps;
};

const CreateArticle: React.FC<Props> = ({ mainareaprops }) => {
  InitSideArea(mainareaprops, AdminSA);
  const [MDtext, setMDtext] = useState('');
  const [, setUploadedImages] = useState<File[]>([]);
  return (
    <div>
      <h2>記事を作成する</h2>
      <div>
        <MDEditor setText={setMDtext} setImages={setUploadedImages} />
        <MDPreview MDtext={MDtext} />
      </div>
    </div>
  );
};

export default CreateArticle;

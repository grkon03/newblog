import React, { useState } from 'react';
import Tabs from './components/tabs';
import SubmitButtons from './components/submitbuttons';
import { MainAreaProps, InitSideArea } from '../types';
import { AdminSA } from '../base-component/sidearea/admin';
import styles from './createarticle.module.css';

type Props = {
  mainareaprops?: MainAreaProps;
};

const CreateArticle: React.FC<Props> = ({ mainareaprops }) => {
  InitSideArea(mainareaprops, AdminSA);
  const [, setMDtext] = useState('');
  const [, setUploadedImages] = useState<Map<string, File>>(
    new Map<string, File>()
  );

  const handleSaveClick = () => {};
  const handlePublishClick = () => {};

  return (
    <div>
      <div className={styles.titleinput}></div>
      <Tabs setMDtext={setMDtext} setUploadedImages={setUploadedImages} />
      <SubmitButtons
        onSaveClick={handleSaveClick}
        onPublishClick={handlePublishClick}
      />
    </div>
  );
};

export default CreateArticle;

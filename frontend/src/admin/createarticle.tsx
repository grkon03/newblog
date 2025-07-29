import React, { useState } from 'react';
import MDEditor from './components/mdeditor';
import MDPreview from './components/mdpreview';
import { MainAreaProps, InitSideArea } from '../types';
import { AdminSA } from '../base-component/sidearea/admin';
import styles from './createarticle.module.css';

type Props = {
  mainareaprops?: MainAreaProps;
};

type SelectedTab = 'editor' | 'preview';

const CreateArticle: React.FC<Props> = ({ mainareaprops }) => {
  InitSideArea(mainareaprops, AdminSA);
  const [MDtext, setMDtext] = useState('');
  const [, setUploadedImages] = useState<File[]>([]);
  const [selectedTab, setSelectedTab] = useState<SelectedTab>('editor');
  const handleClickTabSwitch = (s: SelectedTab) => () => {
    setSelectedTab(s);
  };
  const isSelected = (s: SelectedTab) => s === selectedTab;

  return (
    <div>
      <h2>記事を作成する</h2>
      <div className={styles.tabswitch}>
        <div
          className={`${styles.switchbutton} ${
            isSelected('editor') ? styles.selected : ''
          }`}
          onClick={handleClickTabSwitch('editor')}
        >
          編集
        </div>
        <div
          className={`${styles.switchbutton} ${
            isSelected('preview') ? styles.selected : ''
          }`}
          onClick={handleClickTabSwitch('preview')}
        >
          プレビュー
        </div>
      </div>
      <div>
        <div className={`${styles.editor} ${styles['s__' + selectedTab]}`}>
          <MDEditor setText={setMDtext} setImages={setUploadedImages} />
        </div>
        <div className={`${styles.preview} ${styles['s__' + selectedTab]}`}>
          <MDPreview MDtext={MDtext} />
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;

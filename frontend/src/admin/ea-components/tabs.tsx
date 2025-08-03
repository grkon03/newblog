import React, { useState, useEffect } from 'react';
import MDEditor from './mdeditor';
import MDPreview from './mdpreview';
import styles from './tabs.module.css';

type SelectedTab = 'editor' | 'preview';

type Props = {
  initialText?: string;
  setMDtext: (text: string) => void;
  setUploadedImages: (images: Map<string, File>) => void;
};

const Tabs: React.FC<Props> = ({
  initialText,
  setMDtext,
  setUploadedImages,
}) => {
  const [MDtext, _setMDtext] = useState('');
  const [uploadedImages, _setUploadedImages] = useState<Map<string, File>>(
    new Map<string, File>()
  );
  const [selectedTab, setSelectedTab] = useState<SelectedTab>('editor');
  const handleClickTabSwitch = (s: SelectedTab) => () => {
    setSelectedTab(s);
  };
  const isSelected = (s: SelectedTab) => s === selectedTab;

  useEffect(() => {
    setMDtext(MDtext);
  }, [setMDtext, MDtext]);
  useEffect(() => {
    setUploadedImages(uploadedImages);
  }, [setUploadedImages, uploadedImages]);

  return (
    <div>
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
          <MDEditor
            initialText={initialText ?? ''}
            setText={_setMDtext}
            setImages={_setUploadedImages}
          />
        </div>
        <div className={`${styles.preview} ${styles['s__' + selectedTab]}`}>
          <MDPreview MDtext={MDtext} images={uploadedImages} />
        </div>
      </div>
    </div>
  );
};

export default Tabs;

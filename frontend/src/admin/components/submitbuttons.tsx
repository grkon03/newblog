import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './submitbuttons.module.css';

type Props = {
  onSaveClick: () => void;
  onPublishClick: () => void;
};

const SubmitButtons: React.FC<Props> = ({ onSaveClick, onPublishClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className={styles.submitwrapper}>
        <div
          className={`${styles.buttondefault} ${styles.save}`}
          onClick={onSaveClick}
        >
          保存する
        </div>
        <div
          className={`${styles.buttondefault} ${styles.publish}`}
          onClick={() => setIsOpen(true)}
        >
          公開する
        </div>
      </div>
      <Modal isOpen={isOpen} className={styles.popup}>
        <div className={styles.popupmessage}>本当に公開しますか？</div>
        <div className={styles.popupbottons}>
          <div
            onClick={() => setIsOpen(false)}
            className={`${styles.popupcancel} ${styles.buttondefault}`}
          >
            キャンセル
          </div>
          <div
            onClick={() => {
              onPublishClick();
              setIsOpen(false);
            }}
            className={`${styles.popupok} ${styles.buttondefault}`}
          >
            公開する
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default SubmitButtons;

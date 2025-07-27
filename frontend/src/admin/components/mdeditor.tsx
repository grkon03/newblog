import React, { useState, useRef, DragEvent } from 'react';
import { IsImage } from '../../util/image';
import styles from './mdeditor.module.css';

const MDEditor: React.FC = () => {
  const [MDstring, setMDstring] = useState('');
  const [, setImages] = useState<File[]>([]);
  const [message, setMessage] = useState<string>('');
  const refTextarea = useRef<HTMLTextAreaElement>(null);

  const handleDrop = (e: DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const textarea = refTextarea.current;

    if (files.length === 0) return;
    if (!textarea) return;

    setImages((prev) => [...prev, ...files]);

    const cursorPos = textarea.selectionStart;
    const imageText = files
      .filter((file) => {
        const isImage = IsImage(file);
        if (!isImage) {
          setMessage('画像以外をアップロードしないでください。');
        }
        return isImage;
      })
      .map((file) => `![](${file.name})`)
      .join('\n');

    const before = MDstring.slice(0, cursorPos);
    const after = MDstring.slice(cursorPos);
    const newMDstring = before + imageText + after;

    setMDstring(newMDstring);

    setTimeout(() => {
      const newCursorpos = before.length + imageText.length;
      textarea.selectionStart = textarea.selectionEnd = newCursorpos;
      textarea.focus();
    }, 0);
  };

  const handleDragOver = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <textarea
        ref={refTextarea}
        className={styles.editarea}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        value={MDstring}
        onChange={(e) => setMDstring(e.target.value)}
      ></textarea>
      <div>{message}</div>
    </div>
  );
};

export default MDEditor;

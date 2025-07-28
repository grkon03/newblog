import React, { useState, useRef, useLayoutEffect, DragEvent } from 'react';
import { IsImage } from '../../util/image';
import MDELogic, { TextAreaState } from './mdelogic';
import styles from './mdeditor.module.css';

const MaxHistoryLength = 100;

type MDESettings = {
  TabSpaces: number;
};

const MDEditor: React.FC = () => {
  const refMDESettings = useRef<MDESettings>({
    TabSpaces: 2,
  });

  const [history, setHistory] = useState<TextAreaState[]>([]);
  const [textareaState, _setTextAreaState] = useState(MDELogic.initial());
  const [, setImages] = useState<File[]>([]);
  const [message, setMessage] = useState<string>('');
  const refTextArea = useRef<HTMLTextAreaElement>(null);

  const setTextAreaState: React.Dispatch<
    React.SetStateAction<TextAreaState>
  > = (s) => {
    _setTextAreaState(s);
    if (history.length > MaxHistoryLength) {
      setHistory((prev) => [...prev.slice(1), textareaState]);
    } else {
      setHistory((prev) => [...prev, textareaState]);
    }
  };

  useLayoutEffect(() => {
    if (!refTextArea.current) return;
    refTextArea.current.selectionStart = textareaState.selectionStart;
    refTextArea.current.selectionEnd = textareaState.selectionEnd;
  }, [textareaState.selectionStart, textareaState.selectionEnd]);

  const undo = () => {
    const prev = history.pop();
    if (!prev) return;
    _setTextAreaState(prev);
  };

  const handleDrop = (e: DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const textarea = refTextArea.current;

    if (files.length === 0) return;
    if (!textarea) return;

    setImages((prev) => [...prev, ...files]);

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

    setTextAreaState(
      MDELogic.InsertText(
        textarea.selectionStart,
        textareaState.text,
        imageText
      )
    );
  };

  const handleDragOver = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = refTextArea.current;
    if (!textarea) return;
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;

    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'z':
          e.preventDefault();
          undo();
      }
    } else {
      switch (e.key) {
        case 'Tab':
          e.preventDefault();

          setTextAreaState(
            MDELogic.InsertTab(
              selectionStart,
              selectionEnd,
              textareaState.text,
              refMDESettings.current.TabSpaces
            )
          );
      }
    }
  };

  return (
    <div>
      <textarea
        ref={refTextArea}
        className={styles.editarea}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onKeyDown={handleKeyDown}
        value={textareaState.text}
        onChange={(e) =>
          setTextAreaState((prev) =>
            MDELogic.updateText(textareaState, e.target.value)
          )
        }
      ></textarea>
      <div>{message}</div>
    </div>
  );
};

export default MDEditor;

import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  DragEvent,
} from 'react';
import MDELogic, { TextAreaState } from './mdelogic';
import styles from './mdeditor.module.css';

const MaxHistoryLength = 100;

type MDESettings = {
  TabSpaces: number;
};

type Props = {
  setText: React.Dispatch<React.SetStateAction<string>>;
  setImages: React.Dispatch<React.SetStateAction<Map<string, File>>>;
};

const MDEditor: React.FC<Props> = ({ setText, setImages }) => {
  const refMDESettings = useRef<MDESettings>({
    TabSpaces: 2,
  });

  const [history, setHistory] = useState<TextAreaState[]>([]);
  const [redostack, setRedoStack] = useState<TextAreaState[]>([]);
  const [textareaState, _setTextAreaState] = useState(MDELogic.initial());
  const [uploadedImages, setUploadedImages] = useState<Map<string, File>>(
    new Map<string, File>()
  );
  const [message, setMessage] = useState<string>('');
  const refTextArea = useRef<HTMLTextAreaElement>(null);

  const setTextAreaState: React.Dispatch<
    React.SetStateAction<TextAreaState>
  > = (s) => {
    // to avoid to trigger useLayoutEffect, set selection manually
    const stateToStore: TextAreaState = ((s) => {
      const textarea = refTextArea.current;
      if (!textarea) return s;
      s.selectionStart = textarea.selectionStart;
      s.selectionEnd = textarea.selectionEnd;
      return s;
    })(textareaState);
    if (history.length > MaxHistoryLength) {
      setHistory((prev) => [...prev.slice(1), stateToStore]);
      setRedoStack([]);
    } else {
      setHistory((prev) => [...prev, stateToStore]);
      setRedoStack([]);
    }
    _setTextAreaState(s);
  };

  useEffect(() => {
    setText(textareaState.text);
  }, [setText, textareaState.text]);
  useEffect(() => {
    setImages(uploadedImages);
  }, [setImages, uploadedImages]);

  useLayoutEffect(() => {
    if (!refTextArea.current) return;
    refTextArea.current.selectionStart = textareaState.selectionStart;
    refTextArea.current.selectionEnd = textareaState.selectionEnd;
  }, [textareaState.selectionStart, textareaState.selectionEnd]);

  const undo = () => {
    const head = history.at(-1);
    if (!head) return;
    _setTextAreaState(head);
    setHistory((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [...prev, textareaState]);
  };

  const redo = () => {
    const head = redostack.at(-1);
    if (!head) return;
    _setTextAreaState(head);
    setHistory((prev) => [...prev, textareaState]);
    setRedoStack((prev) => prev.slice(0, -1));
  };

  const handleDrop = (e: DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const textarea = refTextArea.current;

    if (!textarea) return;

    setTextAreaState(
      MDELogic.InsertImages(
        textarea.selectionStart,
        textareaState.text,
        files,
        uploadedImages,
        setUploadedImages,
        setMessage
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
          if (e.shiftKey) {
            redo();
          } else {
            undo();
          }
          break;
      }
    } else {
      switch (e.key) {
        case 'Tab':
          e.preventDefault();
          if (e.shiftKey) {
            setTextAreaState(
              MDELogic.DeleteTab(
                selectionStart,
                selectionEnd,
                textareaState.text,
                refMDESettings.current.TabSpaces
              )
            );
          } else {
            setTextAreaState(
              MDELogic.InsertTab(
                selectionStart,
                selectionEnd,
                textareaState.text,
                refMDESettings.current.TabSpaces
              )
            );
          }
          break;
        case 'Enter':
          e.preventDefault();
          setTextAreaState(
            MDELogic.LineBreakWithTab(
              selectionStart,
              textareaState.text,
              refMDESettings.current.TabSpaces
            )
          );
          break;
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

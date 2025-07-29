import { IsImage } from '../../util/image';

export type TextAreaState = {
  text: string;
  selectionStart: number;
  selectionEnd: number;
};

export function initial(): TextAreaState {
  return state('', 0, 0);
}

export function updateText(tas: TextAreaState, newtext: string) {
  return state(newtext, tas.selectionStart, tas.selectionEnd);
}

function state(
  text: string,
  selectionStart: number,
  selectionEnd?: number
): TextAreaState {
  return {
    text: text,
    selectionStart: selectionStart,
    selectionEnd: selectionEnd ?? selectionStart,
  };
}

export function Divide(pos: number, text: string): [string, string] {
  const before = text.slice(0, pos);
  const after = text.slice(pos);

  return [before, after];
}

export function InsertText(
  pos: number,
  text: string,
  insertText: string
): TextAreaState {
  const [before, after] = Divide(pos, text);
  return state(before + insertText + after, pos + insertText.length);
}

// returns [beforelines, selectedlines, afterlines]
export function SelectedLines(
  selectionStart: number,
  selectionEnd: number,
  text: string
): [string[], string[], string[]] {
  var beforelines: string[] = [];
  var selectedlines: string[] = [];
  var afterlines: string[] = [];
  var count = 0;

  text.split('\n').forEach((line) => {
    const length = line.length + 1;
    if (count + length <= selectionStart) {
      beforelines.push(line);
    } else if (count < selectionEnd) {
      selectedlines.push(line);
    } else {
      afterlines.push(line);
    }
    count += length;
  });

  return [beforelines, selectedlines, afterlines];
}

export function InsertTextToHeadsOfSelectedLines(
  selectionStart: number,
  selectionEnd: number,
  text: string,
  insertText: string
): TextAreaState {
  const [before, selectedlines, after] = SelectedLines(
    selectionStart,
    selectionEnd,
    text
  );

  const updated = selectedlines.map((line) => insertText + line);

  return state(
    [...before, ...updated, ...after].join('\n'),
    selectionStart + insertText.length,
    selectionEnd + insertText.length * selectedlines.length
  );
}

export function TabString(tabspaces: number) {
  return ' '.repeat(tabspaces);
}

export function InsertTab(
  selectionStart: number,
  selectionEnd: number,
  text: string,
  tabspaces: number
): TextAreaState {
  if (selectionStart === selectionEnd) {
    return InsertText(selectionStart, text, TabString(tabspaces));
  } else {
    return InsertTextToHeadsOfSelectedLines(
      selectionStart,
      selectionEnd,
      text,
      TabString(tabspaces)
    );
  }
}

function sumlengthWithBreak(lines: string[]): number {
  if (lines.length === 0) return 0;
  else return lines.map((line) => line.length + 1).reduce((a, b) => a + b);
}

export function DeleteTab(
  selectionStart: number,
  selectionEnd: number,
  text: string,
  tabspaces: number
): TextAreaState {
  const [beforelines, selectedlines, afterlines] = SelectedLines(
    selectionStart,
    selectionEnd,
    text
  );

  const isTabOfFirstLineDeleted = selectedlines[0].startsWith(
    TabString(tabspaces)
  );
  var deletecount = 0;

  const updated = selectedlines.map((line) => {
    if (line.startsWith(TabString(tabspaces))) {
      deletecount++;
      return line.slice(tabspaces);
    } else {
      return line;
    }
  });

  const selectionStartNextPre = isTabOfFirstLineDeleted
    ? selectionStart - tabspaces
    : selectionStart;
  const selectionEndNextPre = selectionEnd - tabspaces * deletecount;
  const selectionStartNextGuarantee = sumlengthWithBreak(beforelines);
  const selectionEndNextGuarantee = sumlengthWithBreak([
    ...beforelines,
    ...updated.slice(0, -1),
  ]);

  const selectionStartNext = Math.max(
    selectionStartNextPre,
    selectionStartNextGuarantee
  );
  const selectionEndNext = Math.max(
    selectionEndNextPre,
    selectionEndNextGuarantee
  );

  return state(
    [...beforelines, ...updated, ...afterlines].join('\n'),
    selectionStartNext,
    selectionEndNext
  );
}

function lastline(text: string): string {
  return text.split('\n').at(-1) ?? '';
}

function extractTabs(line: string, tabspaces: number): string {
  var tabs: string = '';
  const tab = TabString(tabspaces);
  while (line.startsWith(tab)) {
    tabs += tab;
    line = line.slice(tabspaces);
  }

  return tabs;
}

export function LineBreakWithTab(
  pos: number,
  text: string,
  tabspaces: number
): TextAreaState {
  const [before, after] = Divide(pos, text);
  const tabs = extractTabs(lastline(before), tabspaces);
  return state(before + '\n' + tabs + after, pos + ('\n' + tabs).length);
}

function splitToNameAndExt(filename: string): [string, string] {
  if (!filename.includes('.')) return [filename, ''];
  const dotpos = filename.lastIndexOf('.');
  return [filename.substring(0, dotpos), filename.substring(dotpos + 1)];
}

export function InsertImages(
  pos: number,
  text: string,
  uploaded: File[],
  previousImages: Map<string, File>,
  setImages: (img: Map<string, File>) => void,
  setMessage: (message: string) => void
): TextAreaState {
  if (uploaded.length === 0) return state(text, pos);

  var message: string[] = [];
  var newImages = previousImages;

  const imageText = uploaded
    .filter((file) => {
      const isImage = IsImage(file);
      if (!isImage) {
        message.push('画像以外をアップロードしないでください。');
      }
      return isImage;
    })
    .map((file) => {
      var key = file.name;
      if (newImages.has(key)) {
        message.push(`${key}と同じ名前の画像がアップロードされました。`);
        var rndstr = Math.random().toString(29).substring(2).slice(6);
        if (rndstr.length < 6) rndstr += 'x'.repeat(6);
        const [name, ext] = splitToNameAndExt(key);
        key = name + '-' + rndstr + '.' + ext;
        message.push(`${key}に変更されています。`);
      }
      newImages.set(key, file);
      return `![](upload/${key})`;
    })
    .join('\n');

  setImages(newImages);
  setMessage(message.join('\n'));

  return InsertText(pos, text, imageText);
}

const MDELogic = {
  initial,
  updateText,
  Divide,
  InsertText,
  SelectedLines,
  InsertTextToHeadsOfSelectedLines,
  TabString,
  InsertTab,
  DeleteTab,
  LineBreakWithTab,
  InsertImages,
};

export default MDELogic;

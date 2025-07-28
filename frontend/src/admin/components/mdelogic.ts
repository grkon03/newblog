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

// returns [before, selectedlines, after]
export function SelectedLines(
  selectionStart: number,
  selectionEnd: number,
  text: string
): [string, string[], string] {
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

  const before = beforelines.join('\n');
  const after = afterlines.join('\n');

  return [before, selectedlines, after];
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

  const updated = selectedlines.map((line) => insertText + line).join('\n');
  var composed: string[] = [];
  if (before !== '') composed.push(before);
  composed.push(updated);
  if (after !== '') composed.push(after);

  return state(
    composed.join('\n'),
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

const MDELogic = {
  initial,
  updateText,
  Divide,
  InsertText,
  SelectedLines,
  InsertTextToHeadsOfSelectedLines,
  TabString,
  InsertTab,
};

export default MDELogic;

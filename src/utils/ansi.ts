import Anser, { AnserJsonEntry } from 'anser';

// Regex to detect ANSI escape sequences (CSI sequences, SGR, etc.)
const ANSI_REGEX = /[\u001b\x1b]\[[0-9;]*[a-zA-Z]/;

export function isAnsiContent(text: string): boolean {
  if (!text) return false;
  return ANSI_REGEX.test(text);
}

export interface AnsiSpan {
  content: string;
  fg?: string;
  bg?: string;
  bold?: boolean;
  dim?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export function parseAnsiToSpans(rawText: string): AnsiSpan[] {
  if (!rawText) return [];

  try {
    const jsonEntries: AnserJsonEntry[] = Anser.ansiToJson(rawText, {
      use_classes: false,
      remove_empty: false,
    });

    return jsonEntries.map((entry) => {
      const fg = entry.fg ? (entry.fg.startsWith('rgb') ? entry.fg : `rgb(${entry.fg})`) : undefined;
      const bg = entry.bg ? (entry.bg.startsWith('rgb') ? entry.bg : `rgb(${entry.bg})`) : undefined;
      
      const decoration = entry.decoration || '';
      const bold = decoration.includes('bold');
      const dim = decoration.includes('dim');
      const italic = decoration.includes('italic');
      const underline = decoration.includes('underline');

      return {
        content: entry.content,
        fg,
        bg,
        bold,
        dim,
        italic,
        underline,
      };
    });
  } catch (err) {
    console.warn('Error parsing ANSI string:', err);
    return [{ content: rawText }];
  }
}

/**
 * Bionic Reading Transformer
 * Breaks words into fixation lead (bolded) and remaining letters
 * to guide saccadic eye movement for dyslexic and ADHD readers.
 */

export function parseBionicText(text) {
  if (!text) return [];

  // Split text while preserving spaces and line breaks
  const paragraphs = text.split('\n');

  return paragraphs.map((para, pIdx) => {
    const words = para.split(/(\s+)/);
    const parsedWords = words.map((chunk, wIdx) => {
      // If whitespace, return as is
      if (/^\s+$/.test(chunk) || chunk === '') {
        return { type: 'space', value: chunk, key: `s-${pIdx}-${wIdx}` };
      }

      // Calculate fixation length (approx 40-50% of word length)
      const cleanWord = chunk.replace(/[^\w]/g, '');
      if (cleanWord.length <= 1) {
        return { type: 'word', lead: chunk, rest: '', key: `w-${pIdx}-${wIdx}` };
      }

      let fixLen = Math.ceil(cleanWord.length * 0.45);
      if (cleanWord.length === 3) fixLen = 2;
      if (cleanWord.length >= 6) fixLen = Math.ceil(cleanWord.length * 0.5);

      // Find where leading non-alphanumeric ends
      let prefixMatch = chunk.match(/^[^\w]*/)[0];
      let coreWord = chunk.slice(prefixMatch.length);

      let lead = prefixMatch + coreWord.slice(0, fixLen);
      let rest = coreWord.slice(fixLen);

      return {
        type: 'word',
        lead,
        rest,
        raw: chunk,
        key: `w-${pIdx}-${wIdx}`
      };
    });

    return { pIdx, words: parsedWords };
  });
}

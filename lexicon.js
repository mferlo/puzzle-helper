class Lexicon {
  constructor(wordList) {
    this.words = wordList;
  }

  isValid(word) {
    return this.words.includes(word);
  }

  ofLength(n) {
    return new Lexicon(this.words.filter(w => w.length === n));
  }

  anyCanMatch(word) {
    const re = word.asRegex();
    return this.words.some(w => re.test(w));
  }
}


const removeFirst = (arr, e) => {
  const i = arr.findIndex(a => a === e);
  return [...arr.slice(0, i), ...arr.slice(i+1)];
}


const validWordsImpl = (word, lexicon, parts, recordValidWord) => {
  if (word.completed()) {
    const w = word.toString();
    if (lexicon.isValid(w)) {
      recordValidWord(w);
    }
    return;
  }

  if (!lexicon.anyCanMatch(word)) {
    return;
  }

  const { i, len } = word.getFirstBlank();
  for (const part of parts.filter(p => p.length === len)) {
    validWordsImpl(
      word.withNewWordPart(i, part),
      lexicon,
      removeFirst(parts, part),
      recordValidWord);
  }
}

const validWords = (word, parts, wordList) => {
  const lexicon = new Lexicon(wordList);
  const filteredLexicon = lexicon.ofLength(word.count());
  const results = new Set();
  validWordsImpl(word, filteredLexicon, parts, (validWord) => results.add(validWord));
  return Array.from(results).sort();
}


module.exports.validWords = validWords;

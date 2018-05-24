// FIXME: Sometimes "part" is a Part, and sometimes it is a string.
//        In this file, change "part" to something better.

const Word = require('./word.js');

const removeFirst = (arr, e) => {
  const i = arr.findIndex(a => a === e);
  const result = [...arr];
  result.splice(i, 1);
  return result;
}

/* FIXME lexicon class (immutable):
   fromWords()
   ofLength()
   validWordsFor(word, parts)
   anyValidFor(word) // (implies a trie?)
*/

const globalLexicon = [ "deductible", "reluctance", "structures", "short", "a very long word indeed", "tsetsefly", "how", "who", "ooo" ];

const validWordsImpl = (word, lexicon, parts, results) => {
  if (word.completed()) {
	const w = word.toString();
	if (lexicon.includes(w)) {
	  results.add(w);
	}
	return;
  }

  // FIXME: if we can't possibly make a word with what we've got so far,
  // return early (even if we can fill in blanks)

  const { i, len } = word.getFirstBlank();  // parts.findIndex(part => part.type === blank);
  for (const part of parts.filter(p => p.length === len)) {
	validWordsImpl(
	  word.withNewWordPart(i, part),
	  lexicon,
	  removeFirst(parts, part),
	  results);
  }
}

const validWords = (word, parts) => {
  const len = word.count();
  const lexicon = globalLexicon.filter(l => l.length === len);
  const results = new Set();
  validWordsImpl(word, lexicon, parts, results);
  return Array.from(results).sort();
}

const word = Word.makeWord(3, "uct", 3, 1);
const trigramParts = [ "anc", "rel", "str", "ure", "e", "s" ];
console.log(word.toString());
console.log(validWords(word, trigramParts));

const duplicateWord = Word.makeWord(3, 3, 3);
const dupParts = [ "fly", "tse", "tse" ];
console.log(validWords(duplicateWord, dupParts));

const singleWord = Word.makeWord(1, 1, 1);
const singleParts = "ohw".split('');
console.log(validWords(singleWord, singleParts));

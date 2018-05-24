"use strict";

const letters = 'letters';
const blank = 'blank';
const unknownCharacter = '*';

class Part {
  constructor(value) {
	this.str = value;
	this.len = value.length;
  }
  
  toString() {
	return this.str;
  }
}

class WordPart extends Part {
  constructor(value) {
	super(value);
	this.type = letters;
  }
}

class BlankPart extends Part {
  constructor(length) {
	super(unknownCharacter.repeat(length));
	this.type = blank;
  }
}

const makePart = v => Number.isInteger(v) ? new BlankPart(v) : new WordPart(v);

class Word {
  constructor(...parts) {
	this.parts = parts.every(p => p instanceof Part) ? parts : parts.map(makePart);
  }

  toString() {
	return this.parts.join('');
  }

  count() {
	return this.parts.reduce((total, curPart) => total + curPart.len, 0);
  }

  completed() {
	return this.parts.every(part => part.type === letters);
  }

  withNewPart(i, part) {
	const clone = new Word(...this.parts);
	clone.parts[i] = part;
	return clone;
  }
}

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

  const i = word.parts.findIndex(part => part.type === blank);
  for (const part of parts.filter(p => p.length === word.parts[i].len)) {
	validWordsImpl(
	  word.withNewPart(i, new WordPart(part)),
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

const word = new Word(3, "uct", 3, 1);
const trigramParts = [ "anc", "rel", "str", "ure", "e", "s" ];
console.log(word.toString());
console.log(validWords(word, trigramParts));

const duplicateWord = new Word(3, 3, 3);
const dupParts = [ "fly", "tse", "tse" ];
console.log(validWords(duplicateWord, dupParts));

const singleWord = new Word(1, 1, 1);
const singleParts = "ohw".split('');
console.log(validWords(singleWord, singleParts));

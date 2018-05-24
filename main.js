const Word = require('./word.js');
const Lexicon = require('./lexicon.js');

const word = Word.makeWord(3, "uct", 3, 1);
const trigramParts = [ "anc", "rel", "str", "ure", "e", "s" ];
console.log(word.toString());
console.log(Lexicon.validWords(word, trigramParts));

const duplicateWord = Word.makeWord(3, 3, 3);
const dupParts = [ "fly", "tse", "tse" ];
console.log(Lexicon.validWords(duplicateWord, dupParts));

const singleWord = Word.makeWord(1, 1, 1);
const singleParts = "ohw".split('');
console.log(Lexicon.validWords(singleWord, singleParts));

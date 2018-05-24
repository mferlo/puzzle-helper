const Word = require('./word.js');
const Lexicon = require('./lexicon.js');

const word = Word.makeWord(3, "uct", 3, 1);
if (word.toString() !== "***uct****") {
  throw "word tostring failed";
}

const trigramParts = [ "anc", "rel", "str", "ure", "e", "s" ];
const trigramAnswers = Lexicon.validWords(word, trigramParts);
if (trigramAnswers.length !== 2 ||
    trigramAnswers[0] !== 'reluctance' ||
    trigramAnswers[1] !== 'structures') {
  throw "something broke";
}

const dupWord = Word.makeWord(3, 3, 3);
const dupParts = [ "fly", "tse", "tse" ];
const dupAnswers = Lexicon.validWords(dupWord, dupParts);
if (dupAnswers.length !== 1 || dupAnswers[0] !== "tsetsefly") {
  throw "something broke with the anti-dup logic";
}

const singleWord = Word.makeWord(1, 1, 1);
const singleParts = "ohw".split('');
const singleAnswers = Lexicon.validWords(singleWord, singleParts);
if (singleAnswers.length !== 2 || singleAnswers[0] !== 'how' || singleAnswers[1] !== 'who') {
  throw "something else broke";
}

console.log("OK");

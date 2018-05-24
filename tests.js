const Word = require('./word.js');
const Lexicon = require('./lexicon.js');

const a1 = Lexicon.validWords(
  Word.makeWord(3, "uct", 3, 1),
  [ "anc", "rel", "str", "ure", "e", "s" ],
  ["deductible", "reluctance", "structures", "short", "veryMuchTooLong"]);

if (a1.length !== 2 || a1[0] !== 'reluctance' || a1[1] !== 'structures') {
  console.log(a1);
  throw "something broke";
}

const a2 = Lexicon.validWords(
  Word.makeWord(3, 3, 3),
  [ "fly", "tse", "tse" ],
  ["tsetsefly"]);

if (a2.length !== 1 || a2[0] !== "tsetsefly") {
  console.log(a2);
  throw "something broke with the anti-dup logic";
}

const a3 = Lexicon.validWords(
  Word.makeWord(1, 1, 1),
  [ "o", "h", "w" ],
  [ "how", "who", "ooo" ]);

if (a3.length !== 2 || a3[0] !== 'how' || a3[1] !== 'who') {
  console.log(a3);
  throw "something else broke";
}

console.log("OK");

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

  getFirstBlank() {
    const i = this.parts.findIndex(part => part.type === blank);
    return { len: this.parts[i].len, i };
  }

  withNewWordPart(i, s) {
    return new Word(...this.parts.slice(0, i), new WordPart(s), ...this.parts.slice(i+1));
  }
}

module.exports.makeWord = (...foo) => new Word(...foo);

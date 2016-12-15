Array.prototype.bubbleSort = function() {
  let sorted = false;

  while (!sorted) {
    sorted = true;
    for(let i = 0; i < this.length - 1; i++) {
      if (this[i] > this[i + 1]) {
        sorted = false;
        let tmp = this[i]
        this[i] = this[i + 1];
        this[i + 1] = tmp;
      }
    }
  }
  return this;
};


console.log([5, 3, 4, 2, 1].bubbleSort());

Array.prototype.uniq = function() {
  let newarr = [];
  for(let i = 0; i < this.length; i++) {
    if (newarr.indexOf(this[i]) === -1) {
      newarr.push(this[i]);
    }
  }
  return newarr;
};

// Write a method substrings that will take a String and return an array containing each of its substrings.
// Don't repeat substrings. Example output: substrings("cat") => ["c", "ca", "cat", "a", "at", "t"].

String.prototype.subStrings = function() {
  newarr = [];
  for(let i = 0; i < this.length ; i++) {
    for(let j = i + 1; j < this.length; j++) {
      newarr.push(this.substr(i, j));
    }
  }
  return newarr.uniq();
};

console.log("abc".subStrings());

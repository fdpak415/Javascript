// Array Exercises
//
// Estimated time: 2hrs
//
// Remove duplicates
//
// Array has a uniq method that removes duplicates from an array. It returns the unique elements in the order in which they first appeared:
//
// [1, 2, 1, 3, 3].uniq # => [1, 2, 3]
// Write your own uniq method, called my_uniq; it should take in an Array and return a new array.
//
// One special feature of Ruby classes is that they are open; we can add new methods to existing classes. Take the my_uniq method that you just wrote and modify it slightly so that it can be called directly on an array:
//
// class Array
//   def my_uniq
//     # ...
//   end
// end
// This is called monkey patching.

Array.prototype.uniq = function() {
  let newarr = [];
  for(let i = 0; i < this.length; i++) {
    if (newarr.indexOf(this[i]) === -1) {
      newarr.push(this[i]);
    }
  }
  return newarr;
};

console.log([1, 1, 2, 2, 3, 3, 4, 4, 5, 5].uniq());
//
//=====================================================
// Two sum
//
// Write a new Array#two_sum method that finds all pairs of positions where the elements at those positions sum to zero.
//
// NB: ordering matters. I want each of the pairs to be sorted smaller index before bigger index. I want the array of pairs to be sorted "dictionary-wise":
//
// [-1, 0, 2, -2, 1].two_sum # => [[0, 4], [2, 3]]
// [0, 2] before [1, 2] (smaller first elements come first)
// [0, 1] before [0, 2] (then smaller second elements come first)

Array.prototype.twoSum = function() {
  let pairs = [];
  for(let i = 0; i < this.length - 1; i++) {
    for(let j = (i + 1); j < this.length; j++) {
      if (this[i] + this[j] === 0) {
        pairs.push([i, j]);
      }
    }
  }
  return pairs;
}

console.log([-1, 0, 2, -2, 1].twoSum());



//=====================================================
// My Transpose
//
// To represent a matrix, or two-dimensional grid of numbers, we can write an array containing arrays which represent rows:
//
// rows = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8]
//   ]
//
// row1 = rows[0]
// row2 = rows[1]
// row3 = rows[2]
// We could equivalently have stored the matrix as an array of columns:
//
// cols = [
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8]
//   ]
// Write a method, my_transpose, which will convert between the row-oriented and column-oriented representations. You may assume square matrices for simplicity's sake. Usage will look like the following:
//
// my_transpose([
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8]
//   ])
//  # => [[0, 3, 6],
//  #    [1, 4, 7],
//  #    [2, 5, 8]]
//
//


Array.prototype.transpose = function() {
  let newarr = [];
  var i = 0;

  for(let j = 0; j < this[0].length; j++) {
    newarr.push([]);
  }

  while (i < this[0].length) {
    for(let row = 0; row < this.length; row++) {
        newarr[i].push(this[row][i]);
      }
      i++;
    }
  return newarr;
  };



  console.log([[0, 1, 2], [3, 4, 5], [6, 7, 8]].transpose());

  Array.prototype.transpose = function () {
  const columns = [];
  for (let i = 0; i < this[0].length; i++) {
    columns.push([]);
  }

  for (let i = 0; i < this.length; i++) {
    for (let j = 0; j < this[i].length; j++) {
      columns[j].push(this[i][j]);
    }
  }
  return columns;
};

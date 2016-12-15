"use strict";

const NUMS = [1, 2, 3, 4, 5];

Array.prototype.myEach = function(func) {

  for(let i = 0; i < this.length; i++) {
    func(this[i]);
  }
  return this;
}

NUMS.myEach((num) => {
  console.log(`square of ${num} is ${num * num}`);
});

Array.prototype.map = function(func) {
  var newarr = [];
  this.myEach(el => newarr.push(func(el)) );

  return newarr;
};

console.log(NUMS.map( num => num * num ));


Array.prototype.myInject = function (func) {
  let result = this[0];

  this.slice(1).myEach(element => result = func(result, element) );

  return result;
};

console.log(NUMS.myInject( (total, item) => total + item ));


Array.prototype.select = function(func) {
  var newarr = [];
  this.myEach(el => {
    if(func(el === true)) {
      newarr.push(el);
    }
  }
  return newarr;
};

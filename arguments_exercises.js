//SUM

function suma() {
  let total = 0;
  for (let i = 0; i < arguments.length; i ++) {
    total += arguments[i];
  }

  return total;
}


function sumi(...nums) {
  let total = 0
  for (let i = 0; i < nums.length; i ++) {
    total += nums[i];
  }

  return total;
}

console.log(suma(1, 2, 3, 4) === 10);
console.log(sumi(1, 2, 3, 4, 5) === 15);

//bind with arguments
//simple bind with no arguments

// Function.prototype.myBind = function (ctx) {
//   return() => this.apply(ctx);
// };

// myBind with arguments
Function.protoype.myBind = function (ctx, ...bindArgs) {
  return (...callArgs) => {
    return this.apply(ctx, bindArgs.concat(callArgs));
  };
};

class Cat {
  constructor(name) {
    this.name = name;
  }

  meow() {
    console.log(`${this.name} says meow!`);
  }
}

const curie = new Cat("Curie");
setTimeout(curie.meow.myBind(curie), 1000);

//curried sum

function curriedSum(numArgs) {
  var numbers = [];

  function _curriedSum(number) {
    numbers.push(number);

    if (numbers.length === numArgs) {
      let total = 0;
      return numbers.forEach((num) => {
        total += num;
      });
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
}

//Function.prototype.curry

Function.prototype.curry(numArgs) = function(numArgs) {
  const args = [];
  const fn = this;

  function _curriedFn(arg) {
    args.push(arg);

    if (args.length === numArgs) {
      return fn(...args);
    } else {
      return _curriedFn;
    }
  }

  return _curriedFn;
};

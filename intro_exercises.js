function fizzBuzz(arr) {
  var newa = [];
  arr.forEach(function(el) {
    if (el % 3 === 0 || el % 5 === 0) {
      if (el % 3 != 0 && el % 5 != 0) {
        newa.push(el);
      }
    }
  });
  console.log(newa);
};

fizzBuzz([3, 5, 15]);


function isPrime(number) {
  if (number === 2) {
    return true;
  }
  if (number < 2) {
    return false;
  }
  for (i = 2; i < number; i++) {
    if (number % i === 0) {
      return false;
    } else {
      return true;
    }
  }
}

function sumOfNPrimes(n) {
  var sum = 0, primes = 0;
  for(let i = 2; primes < n; i++) {
    if(isPrime(i)) {
      sum += i;
      primes += 1;
    }
  }
  return sum;
}

console.log(sumOfNPrimes(3));


function allOrNothing(mod, ...numbers) {
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % mod !== 0) {
      return false;
    }
  }

  return true;
}

console.log(allOrNothing(3, 9, 12, 6));
console.log(allOrNothing(5, 1, 2, 10));

function titleize(names, callback) {
  let titleized = names.map(name => "Mx." + name + ' Jingleheimer Schmidt');
  callback(titleized);
};

titleize(["Mary", "Brian", "Leo"], (names) => {
  names.forEach(name => console.log(name));
});

function Elephant(name, height, tricks) {
  this.name = name;
  this.height = height;
  this.tricks = tricks;
}

Elephant.prototype.trumpet = function() {
  console.log(this.name + ' the elephant goes phrRRRRRRRRRRR!!!!!!!');
}

Elephant.prototype.grow = function() {
  this.height += 12;
}
Elephant.prototype.addTrick = function(trick) {
  this.tricks.push(trick);
}
Elephant.prototype.play = function() {
  var trickidx = Math.floor(Math.random() * this.tricks.length);
  console.log(this.elephant + ' is ' + this.tricks[trickidx])
}

let ellie = new Elephant("Ellie", 185, ["giving human friends a ride", "playing hide and seek"]);
let charlie = new Elephant("Charlie", 200, ["painting pictures", "spraying water for a slip and slide"]);
let kate = new Elephant("Kate", 234, ["writing letters", "stealing peanuts"]);
let micah = new Elephant("Micah", 143, ["trotting", "playing tic tac toe", "doing elephant ballet"]);

let herd = [ellie, charlie, kate, micah];

Elephant.paradeHelper = function (elephant) {
  console.log(`${elephant.name} is trotting by!`);
};

Elephant.paradeHelper(ellie);
console.log(charlie.name);

function dinerBreakfast() {
  let order = "I'd like cheesy scrambled eggs please.";
  console.log(order);

  return function (food) {
    order = order.slice(0, order.length - 8) + ' and ' + food + ' please.';
    console.log(order);
  };
};

let bfastOrder = dinerBreakfast();
bfastOrder("chocolate chip pancakes");
bfastOrder("grits");

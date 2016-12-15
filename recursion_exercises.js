

// range
function range(start, end) {
  // I prefer range to include the start and exclude the end. That's how
  // computer scientists do it.
  if (start == end) {
    return [];
  }

  let r = range(start, end - 1);
  r.push(end - 1);
  return r;
}

console.log(`range(3, 10) = ${range(3, 10)}`);
console.log(`range(3, 10) = ${range(3, 3)}`);
// console.log(`range(3, 10) = ${range(3, 2)}`);

// Recursive sumArray
function sumArray(arr) {
  if (arr.length === 0) {
    return 0;
  }
  let lastnum = arr[arr.length - 1];
  return sumArray(arr.slice(0, arr.length - 1)) + lastnum;
}


console.log(`sumRec([1, 3, 5]) = ${sumArray([1, 3, 5])}`);

// iterative sumArray

function sumIter(arr) {
  sum = 0;
  arr.forEach(el => {
    sum += el;
  });
  return sum;
}

console.log(`sumIter([1, 3, 5]) = ${sumIter([1, 3, 5])}`);

// # recursion 1
// exp(b, 0) = 1
// exp(b, n) = b * exp(b, n - 1)

function rec1(base, exp) {
  return exp === 0 ? 1 : base * rec1(base, exp - 1);
}

console.log(`rec1(2, 4) = ${rec1(2, 4)}`);

// # recursion 2
// exp(b, 0) = 1
// exp(b, 1) = b
// exp(b, n) = exp(b, n / 2) ** 2             [for even n]
// exp(b, n) = b * (exp(b, (n - 1) / 2) ** 2) [for odd n]


function rec2(base, exp) {
  if (exp === 0) {
    return 1;
  }

  if (exp % 2 === 0) {
    let subans = rec2(base, exp / 2);
    return subans * subans
  } else {
    let subans = rec2(base, ((exp - 1) / 2));
    return subans * subans * base;
  }
}

console.log(`expRec2(2, 4) =  ${rec2(2, 4)}`);
console.log(`expRec2(2, 5) =  ${rec2(2, 5)}`);

// Fibonacci
//
// Write a recursive and an iterative Fibonacci method. The method should take in an integer n and return
// the first n Fibonacci numbers in an array.
//
// You shouldn't have to pass any arrays between methods; you should be able to do this just passing
// a single argument for the number of Fibonacci numbers requested.


function fibi(n) {
  if (n === 0) {
    return [];
  } else if (n === 1) {
    return [0];
  } else if (n === 2) {
    return [0, 1];
  }

  let arr = [0, 1];
  for(i = 3; i <= n; i++) {
    arr.push(arr[arr.length - 1] + arr[arr.length - 2])
  }

  return arr;
}

console.log(`fibi(5) = ${fibi(10)}`);


function fibr(n) {
  if (n === 0) {
    return [];
  } else if (n === 1) {
    return [0];
  } else if (n === 2) {
    return [0, 1];
  }

  let fibs = fibr(n - 1);
  fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);

  return fibs;
}

console.log(`fibr(5) = ${fibr(10)}`);

// Binary Search
//
// Write a recursive binary search: bsearch(array, target). Note that binary search only works
// on sorted arrays. Make sure to return the location of the found object (or nil if not found!).
// Hint: you will probably want to use subarrays.
//
// This your first problem which is half a PITA to solve iteratively.
//
// Make sure that these test cases are working:
//
function bsearch(arr, target) {
  if (arr.length === 0) {
    return -1;
  }

  const probeIdx = Math.floor(arr.length / 2);
  const probe = arr[probeIdx];

  if (target === probe) {
    return probeIdx;
  } else if (target < probe) {
    const left = arr.slice(0, probeIdx);
    return bsearch(left, target);
  } else {
    const right = arr.slice(probeIdx + 1);
    const subproblem = bsearch(right, target);
    return subproblem === -1 ? -1 : subproblem + (probeIdx + 1);
  }
};

function bsearchi(numbers, target) {

}



console.log(bsearch([1, 2, 3], 1));
console.log(bsearch([2, 3, 4, 5], 3));
console.log(bsearch([2, 4, 6, 8, 10], 6));
console.log(bsearch([1, 3, 4, 5, 9], 5));
console.log(bsearch([1, 2, 3, 4, 5, 6], 6));
console.log(bsearch([1, 2, 3, 4, 5, 6], 0));
console.log(bsearch([1, 2, 3, 4, 5, 7], 6));

function makeChange(target, coins) {
  if(target === 0) {
    return [];
  }

  if(coins.every(el => el > target)) {
    return null;
  }

  let bestChange = null;

  coins.sort(function(a, b){return b-a}).forEach((coin, index) => {
    if(coin > target) {
      return;
    }

    let remainder = target - coin;
    let restChange = makeChange(remainder, coins.slice(index));

    if (!restChange) {
      return;
    }

    let change = [coin].concat(restChange);
    if((!bestChange) || change.length < bestChange.length) {
      bestChange = change;
    }
  })
  return bestChange;
}



// makeChange
function makeChange(target, coins) {
  if (target === 0) {
    return [];
  }

  if (coins.every(el => el > target)) {
    return null;
  }

  let bestChange = null;

  function reverseSorter(a, b) {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  }

  coins.sort(reverseSorter).forEach((coin, index) => {
    if (coin > target) {
      return;
    }

    let remainder = target - coin;
    // remember the optimization where we don't try to use high coins
    // if we're already using a low one?
    let restChange = makeChange(remainder, coins.slice(index));

    if (!restChange) {
      return;
    }

    let change = [coin].concat(restChange);
    if (!bestChange || (change.length < bestChange.length)) {
      bestChange = change;
    }
  });

  return bestChange;
}
console.log(makeChange(14, [10, 7, 1]));




function merge(left, right) {
  const merged = [];
  while ((left.length > 0 && right.length > 0)) {
    let nextItem = (left[0] < right[0]) ? left.shift() : right.shift();
    merged.push(nextItem);
  }
  return merged.concat(left, right);
}

console.log(merge([3, 6, 2], [3, 1, 7]));

function mergeSort(arr) {
  if(arr.length === 0) {
    return [];
  }

  if(arr.length === 1) {
    return arr;
  } else {

  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));

  return merge(left, right);
 }
}

console.log(`mergeSort([4, 5, 2, 3, 1]) = ${mergeSort([4, 5, 2, 3, 1])}`);


function subsets(arr) {
  if(arr.length === 0) {
    return [[]];
  }
  const firstElement = arr[0];
  const subSubsets = subsets(arr.slice(1));

  const newSubsets = subSubsets.map(subSubset => [firstElement].concat(subSubset) );

  return subSubsets.concat(newSubsets);
}

console.log(`subsets([1, 3, 5]) = ${JSON.stringify(subsets([1, 3, 5]))}`);

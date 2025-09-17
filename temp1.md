The function `sum()` as you've written it has a problem: it tries to use variables `a` and `b` that are not defined
within its scope or passed to it as arguments.

If `a` and `b` were global variables, it *might* work, but this is generally bad practice as it makes functions less
reusable and harder to understand.

**The Problem:**

```javascript
function sum() {
return a + b; // 'a' and 'b' are not defined here!
} 

// If you try to call it like this:
// console.log(sum()); // This would result in a ReferenceError: a is not defined
```

**The Solution: Pass `a` and `b` as parameters.**

To make `sum` a proper function that adds two numbers, you need to define `a` and `b` as **parameters** that the
function expects to receive when it's called.

```javascript
function sum(a, b) {
return a + b;
}

// How to use it:
console.log(sum(5, 10)); // Output: 15
console.log(sum(1, 1)); // Output: 2
console.log(sum(-3, 7)); // Output: 4
```

**Alternative: Summing an arbitrary number of arguments (using `...args` or `arguments`)**

If you wanted a `sum` function that could add any number of values, you could use the rest parameter syntax (`...args`):

```javascript
function sum(...args) { // 'args' will be an array of all arguments passed
let total = 0;
for (let i = 0; i < args.length; i++) { total +=args[i]; } return total; } // How to use it: console.log(sum(1, 2, 3));
    // Output: 6 console.log(sum(10, 20, 30, 40)); // Output: 100 console.log(sum(5)); // Output: 5 console.log(sum());
    // Output: 0 ```

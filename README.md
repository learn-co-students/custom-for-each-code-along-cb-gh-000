forEach Code-Along
---

## Objectives

1. Explain when we might want to use our custom `forEach`
2. Practice using functions as first-class objects

## Why use `forEach`?

`forEach` provides a terse way to iterate over elements in an array, but it doesn't return anything on its own. Instead, it changes the objects in place and always returns `undefined`. As such, `forEach` is most useful when we want to execute code that has _side effects_ on the elements that we're operating on.

Additionally, `Array.prototype.forEach` does not work with objects. So even though JavaScript lets us iterate over the key-value pairs in objects using `for` loops, we don't have a ready-to-hand way of doing so with the terseness of `Array.prototype.forEach`.

Well, we don't _at the moment_ have such a way; by the end of this lesson, we'll have learned how to write a utility function that can iterate over both arrays and objects.

## Objects vs. Arrays — Refresher

Before we dive in, let's go through a quick review of what it looks like to iterate over an array versus what it looks like to iterate over an object. When we iterative over an array, we access each element according to its index.

Input the following in your console. What does it print?

``` javascript
var dogs = [
  { name: "Fido", age: 2 },
  { name: "Odie", age: 8 },
  { name: "Ralph", age: 4 }
]

for (var i = 0, l = dogs.length; i < l; i++) {
  console.log(i)
}
```

You should see

```javascript
0
1
2
```

Now enter the above again, but change the log statement to `console.log(dogs[i])` If you've input the code correctly, you should see printed:

``` javascript
{name: "Fido", age: 2}
{name: "Odie", age: 8}
{name: "Ralph", age: 4}
```

Which is great! But maybe we also want to look at each dog — let's start by taking one dog. Execute the following in your console:

``` javascript
var dog = {name: "Fido", age: 2}

for (var i in dog) {
  console.log(i)
}
```

What did you see? You should have seen printed

```bash
name
age
```

So now if we change the log statement to `console.log(dog[i])`, we should see

```bash
Fido
2
```

So what are the differences here between accessing elements in an array and accessing key-value pairs in an object?

- In an array, we most often iterate over the indexes of the array starting at index 0 and going up to index (length - 1).
- In an object, we most often iterate over its keys. These are unordered, so we just go through all of them.
- In an array, we use a standard `for` loop with three clauses:
  1. `var i = 0, l = dogs.length`
  2. `i < l`
  3. `i++`
- In an object, we can use a `for...in` loop to shorten our keystrokes a little: `for (var i in dog) { }`, in the example above.

Okay, after that refresher, are you ready to dive into some code?

## Each and Every One

Let's start by defining our function signature — we know that it's going to take something that we can iterate over, and a function to iterate with. The thing that we iterate over can be either an array or an object, so we want to be generic with how we name it. (In other languages, we could specify a type; but JavaScript does not allow us such safety, so the best we can do is name things precisely and type-check on the fly.) Let's call that thing `iterable`. The function, as we know, is just a callback — so we can call it `callback`.

``` javascript
function forEach(iterable, callback) {}
```

Note that `forEach` does not conflict with `Array.prototype.forEach` because the latter is just a property of `Array.prototype` — it is not a global function.

Now, inside our `forEach` function, we want to do one thing if `iterable` is an array, and another thing if `iterable` is an object. But here's the thing: we can't just use the `typeof` operator, because `typeof []` is `'object'`.

But for a long while now, JavaScript has thought of this — we can use a method attached to `Array`, called — wait for it — `isArray()`. We use it like so:

``` javascript
Array.isArray([]) // true
Array.isArray(1)  // false
```

So let's dive into our function and first check if `iterable` is an array.

``` javascript
function forEach(iterable, callback) {
  if (Array.isArray(iterable)) {
  }
```

If `iterable` _is_ an array, we want our function to behave like `Array.prototype.forEach`. Recall that the built-in `forEach` passes the current element, the element's index, and the whole array to the callback — we should do the same.

``` javascript
function forEach(iterable, callback) {
  if (Array.isArray(iterable)) {
    for (var i = 0, l = iterable.length; i < l; i++) {
      callback(iterable[i], i, iterable)
    }
  }
}
```

The signature of our `callback` might not specify all three arguments, but that's okay! We leave it up to the implementation of `callback` to decide what arguments it cares about — inside our `forEach`, we simply pass along everything that's relevant.

Now we can check if `iterable` is an object — we can use `typeof` here, since if our code has gotten this far, we know that `iterable` is not an array (and so won't give a false positive.

``` javascript
function forEach(iterable, callback) {
  if (Array.isArray(iterable)) {
    for (var i = 0, l = iterable.length; i < l; i++) {
      callback(iterable[i], i, iterable)
    }
  } else if (typeof iterable === 'object') {
  }
}
```

So what do we do inside that `else if` block? Well, we iterate:

``` javascript
for (let key in iterable) {
  callback(iterable[key], key, iterable)
}
```

Just as in the loop for when `iterable` is an array, we pass the element, its key in the object (remember, the "keys" in an array are just the indexes), and the whole iterable. So now our whole function looks like this:

``` javascript
function forEach(iterable, callback) {
  if (Array.isArray(iterable)) {
    for (var i = 0, l = iterable.length; i < l; i++) {
      callback(iterable[i], i, iterable)
    }
  } else if (typeof iterable === 'object') {
    for (var key in iterable) {
      callback(iterable[key], key, iterable)
    }
  }
}
```

There's a minor problem here, but we'll return to it at a later date. (If you want to jump ahead a bit, read more about [`Object.prototype.hasOwnProperty`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty).) We can, at this point, just say —

We did it!

![yay!](http://i.giphy.com/l0K4m0mzkJDAIdhHW.gif)

You might ask why we don't just elide our checks into a simple

``` javascript
for (var keyOrIndex in iterable) {
  callback(iterable[keyOrIndex], keyOrIndex, iterable)
}
```

We could do that, and it would, for the most part, work. The trouble is, we don't set properties of arrays the same way we set properties of objects. So if we attempted to iterate over an array with `for...in`, but had only explicitly set some distant index, we would only see the value for _that_ index. This [StackOverflow post](http://stackoverflow.com/questions/500504/why-is-using-for-in-with-array-iteration-a-bad-idea) provides a few examples for why this is a bad idea.

Now if you run `learn submit`, your tests should pass and you should be ready to go! Well done!

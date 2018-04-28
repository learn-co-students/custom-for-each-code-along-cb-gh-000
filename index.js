const dogs = [
  {
    name: "Fido",
    age: 2
  }, {
    name: "Odie",
    age: 8
  }, {
    name: "Ralph",
    age: 4
  }
];
//
// for (let i = 0, l = dogs.length; i < l; i++) {
//   console.log(i);
//   console.log(dogs[i])
// }
//
// const dog = { name: "Fido", age: 2 };
//
// for (const key in dog) {
//   console.log(key);
//   console.log(dog[key])
// }
dogs.forEach((key, index, array) => {
  console.log(key.name)
})

function logit(value, key, iterable) {
  console.log("Value:", value);
  console.log("Key:", key);
  console.log("Iterable:", iterable);
}

function forEach(iterable, callback) {
  if (Array.isArray(iterable)) {
    for (let i = 0, l = iterable.length; i < l; i++) {
      const element = iterable[i];
      callback(element, i, iterable);
    }
  } else if (typeof iterable === 'object') {
    for (const key in iterable) {
      const value = iterable[key];
      callback(value, key, iterable);
    }
  }
}
forEach(dogs, logit)

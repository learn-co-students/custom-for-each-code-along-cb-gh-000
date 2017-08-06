const dogs = [
  { name: "Fido", age: 2 },
  { name: "Odie", age: 8 },
  { name: "Ralph", age: 4 }
];

for (const key in dog) {
  console.log(key);
}

function forEach(iterable, callback) {
  if (Array.isArray(iterable)) {
    for(let i = 0; i < iterable.length; i++) {
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
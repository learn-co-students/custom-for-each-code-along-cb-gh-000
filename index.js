function forEach(iterable, callback){
  for (const key in iterable) {
  const value = iterable[key];
  callback(value, key, iterable);
  }
}

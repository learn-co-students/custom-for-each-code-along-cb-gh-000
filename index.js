function forEach(iterable, callback){
  if(iterable.isArray){
    for (let i = 0, l = iterable.length; i < l; i++) {
      const element = iterable[i];
      callback(element, i, iterable);
    }
  }
  else if(typeof iterable === 'object'){
    for (const key in iterable) {
      const value = iterable[key];
      callback(value, key, iterable);
    }
  }
}
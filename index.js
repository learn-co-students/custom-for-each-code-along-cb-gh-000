




function forEach(iterable, callback) {
  if (Array.isArray(iterable)) {
    for (let i = 0, l = iterable.length; i < l; i++) {
      if (iterable.hasOwnProperty(i)){
        callback(iterable[i], i, iterable)
      }
    }
  } else if (typeof iterable === 'object') {
    for (const key in iterable) {
      if (iterable.hasOwnProperty(key)){
        callback(iterable[key], key, iterable)
      }
    }
  }
}

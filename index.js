function forEach(iterable, callback) {
  if (Array.isArray(iterable)) {
    for (let i = 0; i < iterable.length; i++) {
      iterable[i] = callback(iterable[i]);
    }
  } else {
    for (const key in iterable) {
      callback(iterable[key]);
    }
  }
}

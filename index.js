function forEach(iterable, callback)
{
  if(Array.isArray(iterable))
  {
    for(let i = 0; i < iterable.length; i++)
    {
      const el = iterable[i];
      callback(el, i, iterable)
    }
  }
  else if(typeof iterable === 'object')
  {
    for(const key in iterable)
    {
      const value = iterable[key]
      callback(value, key, iterable)
      //hello
    }
  }
}

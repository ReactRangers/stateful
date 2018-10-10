import watchableValue from './value';

/**
 * Creates a wrapper around data from its enumerable properties. This wrapper will
 * intercept any gets and sets to its properties and call didRead and didUpdate functions
 */
export default function watchableObject(data) {
  const store = Object.create(null);
  Object.keys(data).forEach((key) => {
    const { get, set } = watchableValue({
      get: () => data[key],
      set: (value) => { data[key] = value; },
    });
    Object.defineProperty(store, key, {
      enumerable: true,
      get,
      set,
    });
  });
  return Object.seal(store);
}

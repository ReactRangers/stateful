import { accessedProperties } from '../watch';

/**
 * Creates a new watchable value
 */
export default function watchableValue(options = {}) {
  let { value } = options;
  const {
    get = () => value,
    set = (val) => { value = val },
  } = options;

  const subscribers = new Set();
  const property = {
    get: () => {
      accessedProperties.add(property);
      return get();
    },
    set: (value) => {
      set(value);
      Array.from(subscribers).forEach((listener) => {
        if (subscribers.has(listener)) {
          listener();
        }
      });
    },
    subscribe: listener => subscribers.add(listener),
    unsubscribe: listener => subscribers.delete(listener),
  };
  return property;
}

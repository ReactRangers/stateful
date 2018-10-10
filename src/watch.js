/* @flow */

const accessedProperties = new Set();
export { accessedProperties };

let watchInProgress = false;

/**
 * This will immediately run compute. Then, if any data accessed by `compute` changes, this entire
 * process restarts. You can stop it by calling `stop` method of the returned object.
 */
export default function watch(compute) {
  if (watchInProgress) {
    throw new Error('Calls to watch cannot be nested');
  }

  accessedProperties.clear();
  watchInProgress = true;
  try {
    compute();
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
  } finally {
    watchInProgress = false;
  }

  let stop;
  const listener = () => {
    stop();
    ({ stop } = watch(compute));
  };
  accessedProperties.forEach(p => p.subscribe(listener));
  const properties = Array.from(accessedProperties);
  stop = () => properties.forEach(p => p.unsubscribe(listener));

  return {
    stop: () => stop(),
  };
}

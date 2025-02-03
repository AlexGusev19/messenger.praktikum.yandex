import { Indexed } from '../framework/Store';
import merge from './merge';

function set(object: Indexed, path: string, value: unknown): Indexed {
  if (typeof path !== 'string') throw new Error('path must be string');
  if (typeof object !== 'object') return object;

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any,
  );

  return merge(object, result);
}

export default set;

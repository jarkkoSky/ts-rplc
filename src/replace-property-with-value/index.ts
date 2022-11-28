import { pipe, mapRecordWithKey, isObject, isNonEmptyObjectArray, A } from '../utils/fp-utils';

const replaceProperty =
  (prop: string, newValue: unknown, replaceFn: any) =>
  ([key, value]: [string, unknown]): [string, unknown] => {
    if (key === prop) {
      return [key, newValue];
    }
    if (isObject(value) || isNonEmptyObjectArray(value)) {
      return [key, replaceFn(value)];
    }

    return [key, value];
  };

export const replacePropertyWithValue =
  (prop: string) =>
  (newValue: unknown) =>
  (item: Record<string, unknown> | Record<string, unknown>[]): Record<string, unknown> | Record<string, unknown>[] => {
    const replaceFn = replacePropertyWithValue(prop)(newValue);

    const isObj = isObject(item);
    const isArray = isNonEmptyObjectArray(item);

    if (isObj) {
      return pipe(item, mapRecordWithKey(replaceProperty(prop, newValue, replaceFn)));
    }

    if (isArray) {
      // @todo fix type
      return pipe(item, A.map(replaceFn)) as Record<string, unknown>[];
    }

    return {};
  };

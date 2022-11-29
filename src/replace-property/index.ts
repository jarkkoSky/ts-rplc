import { pipe, mapRecordWithKey, isObject, isNonEmptyObjectArray, A, E, flow } from '../utils/fp-utils';

const replaceKeyWithValue =
  (
    prop: string,
    newValue: unknown,
    replaceFn: (
      item: Record<string, unknown> | Record<string, unknown>[],
    ) => Record<string, unknown> | Record<string, unknown>[],
  ) =>
  ([key, value]: [string, unknown]): [string, unknown] => {
    if (key === prop) {
      return [key, newValue];
    }
    if (isObject(value) || isNonEmptyObjectArray(value)) {
      return [key, replaceFn(value)];
    }

    return [key, value];
  };

export const replaceProperty =
  (prop: string) =>
  (newValue: unknown) =>
  (item: Record<string, unknown> | Record<string, unknown>[]): Record<string, unknown> | Record<string, unknown>[] => {
    const replaceFn = replaceProperty(prop)(newValue);

    return pipe(
      isObject(item) ? E.right(item) : E.left(item),
      E.matchW(
        (item) => pipe(item, A.map(replaceFn)) as Record<string, unknown>[],
        flow(mapRecordWithKey(replaceKeyWithValue(prop, newValue, replaceFn))),
      ),
    );
  };

import { pipe, constFalse, constTrue, constUndefined } from 'fp-ts/lib/function';
import * as Re from 'fp-ts/lib/Record';
import * as A from 'fp-ts/lib/Array';
import * as O from 'fp-ts/lib/Option';
import * as NEA from 'fp-ts/lib/NonEmptyArray';

export { pipe, constFalse, constTrue, constUndefined, Re, A, O };

export const mapRecordWithKey =
  <T extends Record<string, unknown>>(fn: ([key, value]: [string, unknown]) => [string, unknown]) =>
  (record: T) =>
    pipe(record, Re.toArray, A.map(fn), Re.fromEntries);

export const isObject = (item: unknown): item is Record<string, unknown> =>
  pipe(
    O.fromNullable(item),
    O.filter(
      (item: any): item is Record<string, unknown> =>
        typeof item === 'object' && pipe(item.length, O.fromNullable, O.map(constFalse), O.getOrElse(constTrue)),
    ),
    O.map(constTrue),
    O.getOrElse(constFalse),
  );

const isArray = (item: any) => Array.isArray(item);

export const isNonEmptyObjectArray = (item: any): item is Record<string, unknown>[] =>
  pipe(
    item,
    O.fromNullable,
    O.map((x) => A.isNonEmpty(x) && (isObject(NEA.head(x)) || isArray(NEA.head(x)))),
    O.getOrElse(constFalse),
  );

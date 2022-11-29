import { pipe, flow, constFalse, constTrue, constUndefined } from 'fp-ts/lib/function';
import * as R from 'fp-ts/lib/Record';
import * as A from 'fp-ts/lib/Array';
import * as O from 'fp-ts/lib/Option';
import * as E from 'fp-ts/lib/Either';
import * as NEA from 'fp-ts/lib/NonEmptyArray';

export { pipe, flow, constFalse, constTrue, constUndefined, R, A, O, E };

export const mapRecordWithKey =
  <T extends Record<string, unknown>>(fn: ([key, value]: [string, unknown]) => [string, unknown]) =>
  (record: T) =>
    pipe(record, R.toArray, A.map(fn), R.fromEntries);

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

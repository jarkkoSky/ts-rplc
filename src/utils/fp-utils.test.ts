import { isNonEmptyObjectArray, isObject, mapRecordWithKey, pipe } from './fp-utils';

describe('fp-utils', () => {
  describe('isObject', () => {
    it('should return true when object', () => {
      const item = { test: 123 };
      expect(isObject(item)).toEqual(true);
    });

    it('should return false when string', () => {
      const item = '123';
      expect(isObject(item)).toEqual(false);
    });

    it('should return false when number', () => {
      const item = 123;
      expect(isObject(item)).toEqual(false);
    });

    it('should return false when object array', () => {
      const item = [{ test: 123 }];
      expect(isObject(item)).toEqual(false);
    });

    it('should return false when undefined', () => {
      const item = undefined;
      expect(isObject(item)).toEqual(false);
    });
  });

  describe('isNonEmptyObjectArray', () => {
    it('should return true when array with object', () => {
      const item = [{ asd: 123 }];
      expect(isNonEmptyObjectArray(item)).toEqual(true);
    });

    it('should return true when contains array with objects', () => {
      const item = [[{ asd: 123 }]];
      expect(isNonEmptyObjectArray(item)).toEqual(true);
    });

    it('should return false when array with number', () => {
      const item = [1];
      expect(isNonEmptyObjectArray(item)).toEqual(false);
    });

    it('should return false when array with string', () => {
      const item = ['test'];
      expect(isNonEmptyObjectArray(item)).toEqual(false);
    });

    it('should return false when array is empty', () => {
      const item: unknown[] = [];
      expect(isNonEmptyObjectArray(item)).toEqual(false);
    });

    it('should return false when undefined', () => {
      const item = undefined;
      expect(isNonEmptyObjectArray(item)).toEqual(false);
    });
  });

  describe('mapRecordWithKey', () => {
    it('should map with key', () => {
      const obj = {
        thisIsKey: 'test',
      };

      const result = pipe(
        obj,
        mapRecordWithKey(([key, value]) => {
          expect(key).toEqual('thisIsKey');
          expect(value).toEqual('test');

          return ['differentKey', 'differentValue'];
        }),
      );

      const expected = {
        differentKey: 'differentValue',
      };

      expect(result).toEqual(expected);
    });
  });
});

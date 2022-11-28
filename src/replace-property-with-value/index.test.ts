import { replacePropertyWithValue } from '.';

describe('replacePropertyWithValue', () => {
  it('should replace property with value', () => {
    const obj = {
      test: 1,
      otherTest: 'test',
    };

    const expected = {
      test: 'NewValue',
      otherTest: 'test',
    };

    expect(replacePropertyWithValue('test')('NewValue')(obj)).toEqual(expected);
  });

  it('should replace nested properties with value', () => {
    const obj = {
      test: 1,
      otherTest: 'test',
      nested: {
        test: '123',
        nested2: {
          test: 'aaa',
          nested3: {
            test: 'bbb',
          },
        },
      },
    };

    const expected = {
      test: 'NewValue',
      otherTest: 'test',
      nested: {
        test: 'NewValue',
        nested2: {
          test: 'NewValue',
          nested3: {
            test: 'NewValue',
          },
        },
      },
    };

    expect(replacePropertyWithValue('test')('NewValue')(obj)).toEqual(expected);
  });

  it('should replace property with value in array', () => {
    const obj = [
      {
        test: 1,
        otherTest: 'test',
      },
    ];

    const expected = [
      {
        test: 'NewValue',
        otherTest: 'test',
      },
    ];

    expect(replacePropertyWithValue('test')('NewValue')(obj)).toEqual(expected);
  });

  it('should replace property with value in nested array', () => {
    const obj = [
      {
        test: [
          {
            nestedProp: 'asd',
          },
        ],
        otherTest: 'test',
      },
    ];

    const expected = [
      {
        test: [
          {
            nestedProp: 'NewValue',
          },
        ],
        otherTest: 'test',
      },
    ];

    expect(replacePropertyWithValue('nestedProp')('NewValue')(obj)).toEqual(expected);
  });

  it('should replace property with value in a double nested array', () => {
    const obj = [
      {
        test: [
          [
            {
              nestedProp: 'asd',
            },
          ],
        ],
      },
    ];

    const expected = [
      {
        test: [
          [
            {
              nestedProp: 'NewValue',
            },
          ],
        ],
      },
    ];

    expect(replacePropertyWithValue('nestedProp')('NewValue')(obj)).toEqual(expected);
  });

  it('should replace all instances of property with value', () => {
    const obj = [
      {
        test4: [
          {
            nestedProp: 'asd',
            nestedArray: [
              [
                {
                  test: 'ccc',
                },
              ],
            ],
          },
        ],
        otherTest: 'test',
        test2: {
          test3: {
            test: 'aaa',
          },
          test: 'bbb',
        },
      },
    ];

    const expected = [
      {
        test4: [
          {
            nestedProp: 'asd',
            nestedArray: [
              [
                {
                  test: 'NewValue',
                },
              ],
            ],
          },
        ],
        otherTest: 'test',
        test2: {
          test3: {
            test: 'NewValue',
          },
          test: 'NewValue',
        },
      },
    ];

    expect(replacePropertyWithValue('test')('NewValue')(obj)).toEqual(expected);
  });
});

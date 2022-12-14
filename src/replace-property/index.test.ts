import { replaceProperty } from '.';

describe('replaceProperty', () => {
  it('should replace property with value', () => {
    const obj = {
      test: 1,
      otherTest: 'test',
    };

    const expected = {
      test: 'NewValue',
      otherTest: 'test',
    };

    expect(replaceProperty('test')('NewValue')(obj)).toEqual(expected);
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

    expect(replaceProperty('test')('NewValue')(obj)).toEqual(expected);
  });

  it('should replace property with value in array', () => {
    const obj = [
      {
        test: 1,
        otherTest: 'test',
      },
      {
        test: 2,
        otherTest: 'test',
      },
    ];

    const expected = [
      {
        test: 'NewValue',
        otherTest: 'test',
      },
      {
        test: 'NewValue',
        otherTest: 'test',
      },
    ];

    expect(replaceProperty('test')('NewValue')(obj)).toEqual(expected);
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

    expect(replaceProperty('nestedProp')('NewValue')(obj)).toEqual(expected);
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

    expect(replaceProperty('nestedProp')('NewValue')(obj)).toEqual(expected);
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
                {
                  test: 'yyy',
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
        test5: [],
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
        test5: [],
      },
    ];

    expect(replaceProperty('test')('NewValue')(obj)).toEqual(expected);
  });
});

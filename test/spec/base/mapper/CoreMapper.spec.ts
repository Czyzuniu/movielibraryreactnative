import CoreMapper from '../../../../src/base/mapper/CoreMapper';

describe('CoreMapper', () => {
  it('should convert date to string', () => {
    // when
    const result = CoreMapper.dateToString(new Date('2022-04-24'));
    // then
    expect(result).toEqual('2022-04-24T00:00:00.000Z');
  });

  it('should convert string to date', () => {
    // when
    const result = CoreMapper.stringToDate('2022-04-24');
    // then
    expect(result.toISOString()).toEqual('2022-04-24T00:00:00.000Z');
  });

  it('should convert number to string', () => {
    // when
    const result = CoreMapper.numberToString(5);
    // then
    expect(result).toEqual('5');
  });
});

import JSONSerializer from '../../../../../../src/base/infrastructure/serializers/json/JSONSerializer';
import MovieDto from '../../../../../../src/movie_library/infrastructure/models/MovieDto';
import {TypedJSON} from 'typedjson';
import JsonParseException from '../../../../../../src/base/domain/core/JsonParseException';

describe('JSONSerializer', () => {
  it('should get serializer for a right ty', () => {
    // when
    const result = JSONSerializer.getSerializer(MovieDto);
    // then
    expect(result).toBeInstanceOf(TypedJSON);
  });

  it('should throw a JsonParseException if failed to deserialize the response', () => {
    // when -> then
    expect(() => {
      JSONSerializer.deserialize(MovieDto, {
        id: '12345',
      });
    }).toThrowError(JsonParseException);
  });
});

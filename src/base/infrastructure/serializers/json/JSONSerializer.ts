import {Serializable, TypedJSON} from 'typedjson';
import JsonParseException from '../../../domain/core/JsonParseException';

export default class JSONSerializer {
  static getSerializer<T>(type: Serializable<T>) {
    return new TypedJSON(type, {
      errorHandler: e => {
        throw new JsonParseException(e.message);
      },
    });
  }
}

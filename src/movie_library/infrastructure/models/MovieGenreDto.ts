import 'reflect-metadata';
import {jsonMember, jsonObject} from 'typedjson';

@jsonObject
export default class MovieGenreDto {
  @jsonMember
  public id: number;
  @jsonMember
  public name: string;
}

import MovieDto from './MovieDto';
import {jsonArrayMember, jsonMember, jsonObject} from 'typedjson';

@jsonObject()
export class MoviesDto {
  @jsonMember
  page: number;
  @jsonArrayMember(MovieDto)
  results: Array<MovieDto>;
}

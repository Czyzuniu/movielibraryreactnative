import {Converter, Mapper} from 'typevert';
import MovieGenreDto from '../models/MovieGenreDto';
import MovieGenre from '../../domain/entity/MovieGenre';
import CoreMapper from '../../../base/mapper/CoreMapper';

@Mapper(
  {
    sourceType: MovieGenreDto,
    targetType: MovieGenre,
  },
  [
    {
      source: 'id',
      target: 'id',
      expr: x => CoreMapper.numberToString(x),
    },
    {
      source: 'name',
      target: 'name',
    },
  ],
)
export default class MovieGenreDtoToMovieGenreMapper extends Converter<
  MovieGenreDto,
  MovieGenre
> {}

import {Converter, Mapper} from 'typevert';
import MovieDto from '../models/MovieDto';
import Movie from '../../domain/entity/Movie';
import CoreMapper from '../../../base/mapper/CoreMapper';

@Mapper(
  {
    sourceType: MovieDto,
    targetType: Movie,
  },
  [
    {
      source: 'id',
      target: 'id',
    },
    {
      source: 'id',
      target: 'homepageUrl',
    },
    {
      source: 'poster_path',
      target: 'poster',
    },
    {
      source: 'backdrop_path',
      target: 'backdrop',
    },
    {
      source: 'status',
      target: 'status',
    },
    {
      source: 'release_date',
      target: 'releaseDate',
      expr: (source: string) => CoreMapper.stringToDate(source),
    },
    {
      source: 'overview',
      target: 'overview',
    },
  ],
)
export default class MovieDtoToMovieMapper extends Converter<MovieDto, Movie> {}

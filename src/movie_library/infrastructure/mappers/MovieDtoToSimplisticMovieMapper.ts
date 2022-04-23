import {Converter, Mapper} from 'typevert';
import MovieDto from '../models/MovieDto';
import SimplisticMovie from '../../domain/entity/SimplisticMovie';

@Mapper(
  {
    sourceType: MovieDto,
    targetType: SimplisticMovie,
  },
  [
    {
      source: 'id',
      target: 'id',
    },
    {
      source: 'title',
      target: 'title',
    },
    {
      source: 'poster_path',
      target: 'poster',
    },
  ],
)
export default class MovieDtoToSimplisticMovieMapper extends Converter<
  MovieDto,
  SimplisticMovie
> {}

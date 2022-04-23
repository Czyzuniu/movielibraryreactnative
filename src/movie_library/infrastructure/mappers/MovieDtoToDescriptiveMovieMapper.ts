import {Converter, Mapper} from 'typevert';
import MovieDto from '../models/MovieDto';
import CoreMapper from '../../../base/mapper/CoreMapper';
import DescriptiveMovie from '../../domain/entity/DescriptiveMovie';
import MovieGenreDtoToMovieGenreMapper from './MovieGenreDtoToMovieGenreMapper';

@Mapper(
  {
    sourceType: MovieDto,
    targetType: DescriptiveMovie,
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
      source: 'title',
      target: 'title',
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
      source: 'vote_average',
      target: 'averageVote',
    },
    {
      source: 'vote_count',
      target: 'totalVotes',
    },
    {
      source: 'runtime',
      target: 'runTime',
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
    {
      source: 'genres',
      target: 'genres',
      converter: MovieGenreDtoToMovieGenreMapper,
      isCollection: true,
    },
  ],
)
export default class MovieDtoToDescriptiveMovieMapper extends Converter<
  MovieDto,
  DescriptiveMovie
> {}

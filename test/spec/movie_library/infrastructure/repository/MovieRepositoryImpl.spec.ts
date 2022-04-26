import MovieRepositoryImpl from '../../../../../src/movie_library/infrastructure/repository/MovieRepositoryImpl';
import {MoviesRemoteApiDataSource} from '../../../../../src/movie_library/infrastructure/datasource/MoviesRemoteApiDataSource';
import {mock} from 'jest-mock-extended';
import {when} from 'jest-when';
import 'expect-more-jest';
import TestObjects from '../../../../utils/TestObjects';

describe('MovieRepositoryImpl', () => {
  let movieApiDataSource: MoviesRemoteApiDataSource;
  let movieRepositoryImpl: MovieRepositoryImpl;

  beforeEach(() => {
    movieApiDataSource = mock<MoviesRemoteApiDataSource>();
    movieRepositoryImpl = new MovieRepositoryImpl(movieApiDataSource);
  });

  const movieDtoTest = TestObjects.MovieDto();

  const moviesDtoTest = TestObjects.MoviesDto();

  it('should retrieve a list of popular movies from movies api data source and not search if query is not passed', async () => {
    // given
    const page = 1;
    const searchQuery = '';
    when(movieApiDataSource.fetchMostPopularMovies)
      .calledWith(page)
      .mockResolvedValue(moviesDtoTest);

    // when
    const result = await movieRepositoryImpl.getPopularMovies(
      page,
      searchQuery,
    );

    // then
    expect(result).toHaveLength(1);
    expect(result).toBeArrayOf({
      title: movieDtoTest.title,
      id: movieDtoTest.id.toString(),
      poster: movieDtoTest.poster_path,
    });
    expect(movieApiDataSource.findMovies).not.toBeCalled();
    expect(movieApiDataSource.fetchMostPopularMovies).toBeCalledWith(page);
  });

  it('should retrieve a list of movies from movies api data source filtered by a search', async () => {
    // given
    const page = 1;
    const searchQuery = 'this is a test query';
    when(movieApiDataSource.findMovies)
      .calledWith(searchQuery, page)
      .mockResolvedValue(moviesDtoTest);

    // when
    const result = await movieRepositoryImpl.getPopularMovies(
      page,
      searchQuery,
    );

    // then
    expect(result).toHaveLength(1);
    expect(result).toBeArrayOf({
      title: movieDtoTest.title,
      id: movieDtoTest.id.toString(),
      poster: movieDtoTest.poster_path,
    });
    expect(movieApiDataSource.fetchMostPopularMovies).not.toBeCalled();
    expect(movieApiDataSource.findMovies).toBeCalledWith(searchQuery, page);
  });

  it('should retrieve a movie by id', async () => {
    // given
    const movieId = '12345';
    when(movieApiDataSource.fetchMovieById)
      .calledWith(movieId)
      .mockResolvedValue(movieDtoTest);

    // when
    const result = await movieRepositoryImpl.getMovieById(movieId);

    // then
    expect(result).toEqual({
      title: movieDtoTest.title,
      id: movieDtoTest.id.toString(),
      poster: movieDtoTest.poster_path,
      averageVote: movieDtoTest.vote_average,
      backdrop: movieDtoTest.backdrop_path,
      genres: [
        {
          id: movieDtoTest.genres[0].id.toString(),
          name: movieDtoTest.genres[0].name,
        },
      ],
      homepageUrl: movieDtoTest.homepage,
      overview: movieDtoTest.overview,
      releaseDate: new Date(movieDtoTest.release_date),
      runTime: movieDtoTest.runtime,
      status: movieDtoTest.status,
      totalVotes: movieDtoTest.vote_count,
    });
    expect(movieApiDataSource.fetchMovieById).toBeCalledWith(movieId);
  });
});

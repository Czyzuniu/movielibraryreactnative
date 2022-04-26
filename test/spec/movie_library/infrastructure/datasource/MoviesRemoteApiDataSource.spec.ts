import {
  MoviesRemoteApiDataSource,
  MoviesRemoteApiDataSourceImpl,
} from '../../../../../src/movie_library/infrastructure/datasource/MoviesRemoteApiDataSource';
import AxiosClient from '../../../../../src/base/infrastructure/AxiosClient';
import {mockDeep} from 'jest-mock-extended';
import {when} from 'jest-when';
import TestObjects from '../../../../utils/TestObjects';
import 'expect-more-jest';
import MovieDto from '../../../../../src/movie_library/infrastructure/models/MovieDto';

describe('MoviesRemoteApiDataSource', () => {
  let axiosClient: AxiosClient;
  let moviesRemoteApiDataSource: MoviesRemoteApiDataSource;

  beforeEach(() => {
    axiosClient = mockDeep<AxiosClient>();
    moviesRemoteApiDataSource = new MoviesRemoteApiDataSourceImpl(axiosClient);
  });

  it('should fetch movies from the API by search query and page', async () => {
    // given
    const page = 1;
    const query = 'search';

    const axiosResponse = TestObjects.MoviesDto();

    when(axiosClient.client.get)
      .calledWith('/search/movie', {
        params: {page, query},
      })
      .mockResolvedValue(axiosResponse);

    // when
    const result = await moviesRemoteApiDataSource.findMovies(query, page);
    // then
    expect(result.page).toBe(axiosResponse.page);
    expect(result.results).toBeArrayOfObjects();
    expect(result.results).toHaveLength(axiosResponse.results.length);
  });

  it('should fetch popular movies from the movie API', async () => {
    // given
    const page = 1;
    const axiosResponse = TestObjects.MoviesDto();

    when(axiosClient.client.get)
      .calledWith('/movie/popular', {
        params: expect.any(Object),
      })
      .mockResolvedValue(axiosResponse);

    // when
    const result = await moviesRemoteApiDataSource.fetchMostPopularMovies(page);
    // then
    expect(result.page).toBe(axiosResponse.page);
    expect(result.results).toBeArrayOfObjects();
    expect(result.results).toHaveLength(axiosResponse.results.length);
  });

  it('should fetch movie from the movie API by id', async () => {
    // given
    const movieId = '12345';
    const axiosResponse = TestObjects.MoviesDto();

    when(axiosClient.client.get)
      .calledWith('/movie/' + movieId)
      .mockResolvedValue(axiosResponse);

    // when
    const result = await moviesRemoteApiDataSource.fetchMovieById(movieId);
    // then
    expect(result).toBeInstanceOf(MovieDto);
  });
});

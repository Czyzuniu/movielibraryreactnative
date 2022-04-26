import GetPopularMoviesUseCase from '../../../../../src/movie_library/domain/usecase/GetPopularMoviesUseCase';
import {mock} from 'jest-mock-extended';
import {MovieRepository} from '../../../../../src/movie_library/domain/repository/MovieRepository';
describe('GetPopularMoviesUseCase', () => {
  let getPopularMoviesUseCase: GetPopularMoviesUseCase;
  let movieRepositoryMock = mock<MovieRepository>();

  beforeEach(() => {
    getPopularMoviesUseCase = new GetPopularMoviesUseCase(movieRepositoryMock);
  });

  it('Should call the repository to get popular movies', async () => {
    // given
    const page = 1;
    const searchQuery = '';
    // when
    await getPopularMoviesUseCase.execute(page, searchQuery);
    // then
    expect(movieRepositoryMock.getPopularMovies).toBeCalledWith(
      page,
      searchQuery,
    );
  });
});

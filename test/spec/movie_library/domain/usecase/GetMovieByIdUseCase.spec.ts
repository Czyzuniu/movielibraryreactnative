import {mock} from 'jest-mock-extended';
import {MovieRepository} from '../../../../../src/movie_library/domain/repository/MovieRepository';
import GetMovieByIdUseCase from '../../../../../src/movie_library/domain/usecase/GetMovieByIdUseCase';

describe('GetMovieByIdUseCase', () => {
  let getMovieByIdUseCase: GetMovieByIdUseCase;
  let movieRepositoryMock = mock<MovieRepository>();

  beforeEach(() => {
    getMovieByIdUseCase = new GetMovieByIdUseCase(movieRepositoryMock);
  });

  it('Should call the repository to get movie by id movies', async () => {
    // given
    const movieId = '123456';
    // when
    await getMovieByIdUseCase.execute(movieId);
    // then
    expect(movieRepositoryMock.getMovieById).toBeCalledWith(movieId);
  });
});

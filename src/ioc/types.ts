const InjectableTypes = {
  GetPopularMoviesUseCase: Symbol.for('GetPopularMoviesUseCase'),
  FindMovieByTextUseCase: Symbol.for('FindMovieByTextUseCase'),
  GetMovieByIdUseCase: Symbol.for('GetMovieByIdUseCase'),
  MovieRepository: Symbol.for('MovieRepository'),
  MovieRemoteDataSource: Symbol.for('MovieRemoteDataSource'),
  AxiosClient: Symbol.for('AxiosClient'),
  AsyncStorageRepository: Symbol.for('AsyncStorageRepository'),
};

export {InjectableTypes};

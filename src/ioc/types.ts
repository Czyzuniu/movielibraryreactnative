const InjectableTypes = {
  GetPopularMoviesUseCase: Symbol.for('GetPopularMoviesUseCase'),
  MovieRepository: Symbol.for('MovieRepository'),
  MovieRemoteDataSource: Symbol.for('MovieRemoteDataSource'),
  AxiosClient: Symbol.for('AxiosClient'),
};

export {InjectableTypes};

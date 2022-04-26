import 'reflect-metadata';
import {Container, ContainerModule} from 'inversify';
import AxiosClient from '../base/infrastructure/AxiosClient';
import {InjectableTypes} from './types';
import {
  MoviesRemoteApiDataSource,
  MoviesRemoteApiDataSourceImpl,
} from '../movie_library/infrastructure/datasource/MoviesRemoteApiDataSource';
import {MovieRepository} from '../movie_library/domain/repository/MovieRepository';
import MovieRepositoryImpl from '../movie_library/infrastructure/repository/MovieRepositoryImpl';
import GetPopularMoviesUseCase from '../movie_library/domain/usecase/GetPopularMoviesUseCase';
import GetMovieByIdUseCase from '../movie_library/domain/usecase/GetMovieByIdUseCase';
import {AsyncStorageRepository} from '../async_storage/domain/repository/AsyncStorageRepository';
import AsyncStorageRepositoryImpl from '../async_storage/infrastructure/AsyncStorageRepositoryImpl';

const myContainer = new Container();

const useCases = new ContainerModule(bind => {
  bind<GetPopularMoviesUseCase>(InjectableTypes.GetPopularMoviesUseCase).to(
    GetPopularMoviesUseCase,
  );
  bind<GetMovieByIdUseCase>(InjectableTypes.GetMovieByIdUseCase).to(
    GetMovieByIdUseCase,
  );
});

const repositories = new ContainerModule(bind => {
  bind<MovieRepository>(InjectableTypes.MovieRepository)
    .to(MovieRepositoryImpl)
    .inSingletonScope();

  bind<AsyncStorageRepository>(InjectableTypes.AsyncStorageRepository)
    .to(AsyncStorageRepositoryImpl)
    .inSingletonScope();
});

const datasources = new ContainerModule(bind => {
  bind<MoviesRemoteApiDataSource>(InjectableTypes.MovieRemoteDataSource)
    .to(MoviesRemoteApiDataSourceImpl)
    .inSingletonScope();
});

const clients = new ContainerModule(bind => {
  bind<AxiosClient>(InjectableTypes.AxiosClient)
    .to(AxiosClient)
    .inSingletonScope();
});

myContainer.load(useCases, repositories, datasources, clients);

export {myContainer};

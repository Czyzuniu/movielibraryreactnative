import {MovieRepository} from '../repository/MovieRepository';
import SimplisticMovie from '../entity/SimplisticMovie';
import {InjectableTypes} from '../../../ioc/types';
import {inject, injectable} from 'inversify';

@injectable()
export default class GetPopularMoviesUseCase {
  private repository: MovieRepository;

  constructor(
    @inject(InjectableTypes.MovieRepository) repository: MovieRepository,
  ) {
    this.repository = repository;
  }

  async execute(
    page: number,
    searchQuery: string,
  ): Promise<Array<SimplisticMovie>> {
    return this.repository.getPopularMovies(page, searchQuery);
  }
}

import {MovieRepository} from '../repository/MovieRepository';
import SimplisticMovie from '../entity/SimplisticMovie';
import {InjectableTypes} from '../../../ioc/types';
import {inject, injectable} from 'inversify';

@injectable()
export default class AddMovieToFavourites {
  private repository: MovieRepository;

  constructor(
    @inject(InjectableTypes.MovieRepository) repository: MovieRepository,
  ) {
    this.repository = repository;
  }

  async execute(movie: SimplisticMovie): Promise<void> {
    return this.repository.addMovieToFavourites(movie);
  }
}

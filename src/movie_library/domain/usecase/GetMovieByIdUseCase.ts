import {MovieRepository} from '../repository/MovieRepository';
import {InjectableTypes} from '../../../ioc/types';
import {inject, injectable} from 'inversify';
import DescriptiveMovie from '../entity/DescriptiveMovie';

@injectable()
export default class GetMovieByIdUseCase {
  private repository: MovieRepository;

  constructor(
    @inject(InjectableTypes.MovieRepository) repository: MovieRepository,
  ) {
    this.repository = repository;
  }

  async execute(movieId: string): Promise<DescriptiveMovie> {
    return this.repository.getMovieById(movieId);
  }
}

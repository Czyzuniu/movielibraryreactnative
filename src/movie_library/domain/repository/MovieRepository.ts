import SimplisticMovie from '../entity/SimplisticMovie';
import DescriptiveMovie from '../entity/DescriptiveMovie';

export interface MovieRepository {
  getPopularMovies: (
    page: number,
    searchQuery: string,
  ) => Promise<Array<SimplisticMovie>>;
  getMovieById: (movieId: string) => Promise<DescriptiveMovie>;
}

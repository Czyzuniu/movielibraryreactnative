import Movie from '../entity/Movie';

export interface MovieRepository {
  getPopularMovies: (page: number) => Promise<Array<Movie>>;
}

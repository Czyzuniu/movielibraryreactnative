import MovieGenre from './MovieGenre';

export default class DescriptiveMovie {
  id: string;
  homepageUrl: string;
  title: string;
  releaseDate: Date;
  status: string;
  overview: string;
  poster: string;
  backdrop: string;
  averageVote: number;
  totalVotes: number;
  runTime: number;
  genres: Array<MovieGenre>;
}

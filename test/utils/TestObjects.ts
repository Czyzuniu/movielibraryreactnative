import MovieDto from '../../src/movie_library/infrastructure/models/MovieDto';
import {MoviesDto} from '../../src/movie_library/infrastructure/models/MoviesDto';
import DescriptiveMovie from '../../src/movie_library/domain/entity/DescriptiveMovie';
import SimplisticMovie from '../../src/movie_library/domain/entity/SimplisticMovie';

export default class TestObjects {
  static MovieDto(): MovieDto {
    return {
      adult: false,
      backdrop_path: 'test.jpg',
      genres: [
        {
          id: 12345,
          name: 'test',
        },
      ],
      homepage: 'https://www.mock.co.uk',
      id: 0,
      original_language: 'en-GB',
      original_title: 'mock',
      overview: 'this is a mock',
      popularity: 0,
      poster_path: '/12345.jpg',
      release_date: '2022-04-08',
      revenue: 0,
      runtime: 0,
      status: 'released',
      tagline: '',
      title: 'some mock title',
      video: false,
      vote_average: 1.7,
      vote_count: 232323,
    };
  }

  static MoviesDto(): MoviesDto {
    return {
      page: 0,
      results: [TestObjects.MovieDto()],
    };
  }

  static DescriptiveMovie(): DescriptiveMovie {
    return {
      averageVote: 8,
      backdrop: 'backdrop.jpg',
      genres: [
        {
          id: '12345',
          name: 'Comedy',
        },
      ],
      homepageUrl: 'https://somewebsite.co.uk',
      id: '12345',
      overview: 'this is an overview',
      poster: 'poster.jpg',
      releaseDate: new Date('2022-04-24'),
      runTime: 156,
      status: 'released',
      title: 'this is a movie title',
      totalVotes: 2344,
    };
  }

  static SimplisticMovie(): SimplisticMovie {
    return {
      poster: 'poster.jpg',
      id: '12345',
      title: 'this is a movie title',
    };
  }
}

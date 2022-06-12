import {jsonArrayMember, jsonMember} from "typedjson";
import MovieGenreDto from "../../movie_library/infrastructure/models/MovieGenreDto";
import MovieDto from "../../movie_library/infrastructure/models/MovieDto";

type AuthTokenResponse = {
  success: boolean,
  expires_at: string,
  request_token: string
}

type AuthNewSessionResponse = {
  success: boolean,
  session_id: string
}

type AddToFavouritesRequestBody = {
  accountId: string,
  movieId: number,
  type: 'movie' | 'tv'
  isFavourite: boolean
}

type CreateListRequestBody = {
  name: string,
  description?: string,
  language?: string,
}

type MovieStateResponse = {
  id: string,
  favorite: boolean,
  rated: boolean
  watchlist: boolean
}

type AccountDetailsResponse = {
  "id": number,
  "name": string,
  "include_adult": boolean,
  "username": string
}

type LoginRequest = {
  username: string,
  password: string
  request_token: string
}

type MoviesResponse = {
  page: number;
  results: Array<MovieResponse>;
  total_pages: number
  total_results: number
}

type MovieResponse = {
   adult: boolean;
   backdrop_path: string;
   homepage: string;
   id: number;
   original_language: string;
   original_title: string;
   overview: string;
   popularity: number;
   poster_path: string;
   release_date: string;
   revenue: number;
   runtime: number;
   status: string;
   tagline: string;
   title: string;
   video: boolean;
   vote_average: number;
   vote_count: number;
   genres: Array<{
     id: number;
     name: string;
   }>;
}

export { AuthTokenResponse, LoginRequest, AuthNewSessionResponse, AccountDetailsResponse, CreateListRequestBody, MovieResponse, MoviesResponse, MovieStateResponse, AddToFavouritesRequestBody,  }

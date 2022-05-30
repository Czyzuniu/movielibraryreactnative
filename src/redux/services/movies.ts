// Need to use the React-specific entry point to allow generating React hooks
import {createApi} from '@reduxjs/toolkit/query/react'
import {MoviesDto} from "../../movie_library/infrastructure/models/MoviesDto";
import MovieDto from "../../movie_library/infrastructure/models/MovieDto";
import axiosBaseQuery from "./core";


export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => {
    return {
      getPopularMovies: build.query<MoviesDto, number>(
        {
          query: (page = 1) => ({url: `/movie/popular?page=${page}`, method: 'get'})
        }
      ),
      getMovieById: build.query<MovieDto, string>(
        {
          query: (movieId) => ({url: `/movie/${movieId}`, method: 'get'})
        }
      ),
    }
  },
})

export const {useGetPopularMoviesQuery, useGetMovieByIdQuery} = moviesApi

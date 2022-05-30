import {createApi} from '@reduxjs/toolkit/query/react'
import {MoviesDto} from "../../movie_library/infrastructure/models/MoviesDto";
import axiosBaseQuery from "./core";
import MovieDto from "../../movie_library/infrastructure/models/MovieDto";
import {AddToFavouritesRequestBody} from "../../types/api/types";

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['PopularMovies', 'Favourites'],
  endpoints: (build) => {
    return {
      getPopularMovies: build.query<MoviesDto, number>(
        {
          query: (page = 1) => ({url: `/movie/popular?page=${page}`, method: 'get'}),
          providesTags: [
            'PopularMovies',
          ],
        }
      ),
      getMovieById: build.query<MovieDto, string>(
        {
          query: (movieId) => ({url: `/movie/${movieId}`, method: 'get'})
        }
      ),
      getFavouriteMovies: build.query<MoviesDto, string>(
        {
          query: (accountId: string) => {
            return {url: `/account/${accountId}/favorite/movies`, method: 'get'}
          },
          providesTags: [
            'Favourites',
          ],
        }
      ),
      addToFavourites: build.mutation<MoviesDto, AddToFavouritesRequestBody>(
        {
          query: ({accountId, movieId, type}) => {
            return {
              url: `/account/${accountId}/favorite`, method: 'post', data: {
                favorite: true,
                media_id: movieId,
                media_type: type
              }
            }
          },
          invalidatesTags: ['Favourites']
        }
      ),
    }
  },
})

export const {useGetPopularMoviesQuery, useGetMovieByIdQuery, useAddToFavouritesMutation, useGetFavouriteMoviesQuery} = moviesApi

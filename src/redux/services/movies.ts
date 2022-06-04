import {createApi} from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from "./core";
import {CreateListRequestBody, MovieResponse, MoviesResponse, MovieStateResponse} from "../../types/api/types";

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['PopularMovies', 'Favourites', 'MovieState'],
  endpoints: (build) => {
    return {
      getPopularMovies: build.query<MoviesResponse, number>(
        {
          query: (page = 1) => ({url: `/movie/popular?page=${page}`, method: 'get'}),
          providesTags: [
            'PopularMovies',
          ],
        }
      ),
      getMovieById: build.query<MovieResponse, string>(
        {
          query: (movieId) => ({url: `/movie/${movieId}`, method: 'get'})
        }
      ),
      getFavouriteMovies: build.query<MoviesResponse, {
        accountId: string,
        page: number
      }>(
        {
          query: ({ accountId, page}) => {
            return {url: `/account/${accountId}/favorite/movies`, method: 'get', params: {
              page
            }}
          },
          providesTags: [
            'Favourites',
          ],
        }
      ),
      toggleFavourite: build.mutation<void, CreateListRequestBody>(
        {
          query: ({accountId, movieId, type, isFavourite}) => {
            return {
              url: `/account/${accountId}/favorite`, method: 'post', data: {
                favorite: isFavourite,
                media_id: movieId,
                media_type: type
              },
            }
          },
          invalidatesTags: ['Favourites', 'MovieState']
        }
      ),
      getMovieState: build.query<MovieStateResponse, string>(
        {
          query: (movieId) => {
            return {
              url: `/movie/${movieId}/account_states`, method: 'get'
            }
          },
          providesTags: [
            'MovieState'
          ]
        }
      ),
    }
  },
})

export const {useGetPopularMoviesQuery, useGetMovieByIdQuery, useToggleFavouriteMutation, useGetFavouriteMoviesQuery, useGetMovieStateQuery, useLazyGetFavouriteMoviesQuery} = moviesApi

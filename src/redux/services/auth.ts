import {createApi} from '@reduxjs/toolkit/query/react'
import {AuthNewSessionResponse, AuthTokenResponse, LoginRequest} from "../../types/api/types";
import axiosBaseQuery from "./core";

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => {
    return {
      createRequestToken: build.query<AuthTokenResponse, void>(
        {
          query: () => ({url: `/authentication/token/new`, method: 'get'})
        }
      ),
      login: build.mutation<AuthTokenResponse, LoginRequest>(
        {
          query: (login) => ({
            url: `/authentication/token/validate_with_login`, method: 'post', data: {
              ...login
            }
          }),
          }
      ),
      createSession: build.mutation<AuthNewSessionResponse, string>(
        {
          query: (requestToken) => ({
            url: `/authentication/session/new`, method: 'post', data: {
              request_token: requestToken
            }
          })
        }
      ),
    }
  },
})

export const {useLoginMutation, useLazyCreateRequestTokenQuery, useCreateSessionMutation} = authApi

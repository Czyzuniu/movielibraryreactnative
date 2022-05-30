import {createApi} from '@reduxjs/toolkit/query/react'
import {AuthNewSessionResponse, AuthTokenResponse, LoginRequest} from "../../types/api/types";
import axiosBaseQuery from "./core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {accountApi} from "./account";
import {login} from "../slice/session";

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
          onQueryStarted: async (body, { dispatch, queryFulfilled, getState }) => {
            try {
              const { data } = await queryFulfilled
              const {data: newSessionResponseData} = await dispatch(authApi.endpoints.createSession.initiate(data.request_token))
              await AsyncStorage.setItem('session_id', newSessionResponseData?.session_id || '')
              const { data: accountDetails } = await dispatch(accountApi.endpoints.getDetails.initiate())

              if (accountDetails) {
                dispatch(login({
                  username: accountDetails.username
                }))
              }
            } catch (e: any) {
              alert('error ' + e.toString())
            }

          }
        }
      ),
      createSession: build.query<AuthNewSessionResponse, string>(
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

export const {useLoginMutation, useCreateRequestTokenQuery} = authApi

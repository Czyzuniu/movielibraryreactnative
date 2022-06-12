import {createApi} from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from "./core";
import {AccountDetailsResponse} from "../../types/api/types";

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => {
    return {
      getAccountDetails: build.query<AccountDetailsResponse, void>(
        {
          query: () => ({url: `/account`, method: 'get'})
        }
      ),
    }
  },
})

export const {useLazyGetAccountDetailsQuery} = accountApi

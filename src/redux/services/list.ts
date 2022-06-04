import {createApi} from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from "./core";
import {CreateListRequestBody} from "../../types/api/types";
import Config from "react-native-config";

export const listApi = createApi({
  reducerPath: 'listApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['MyLists'],
  endpoints: (build) => {
    return {
      createList: build.mutation<void, CreateListRequestBody>(
        {
          query: ({name, description, language}) => {
            return {
              url: `/list`, method: 'post', data: {
                name,
                description,
                language
              },
            }
          },
          invalidatesTags: ['MyLists']
        }
      ),
    }
  },
})

export const {useCreateListMutation} = listApi

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  sessionId: string | null
}

const initialState = { sessionId: null } as AuthState

const sessionSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate(state, action: PayloadAction<string>) {
      state.sessionId = action.payload
    },
  },
})

export const { authenticate } = sessionSlice.actions
export default sessionSlice.reducer

import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface AuthState {
  sessionId: string | null
  user: {
    username: string
  }
}

interface AuthenticatePayload {
  sessionId: string | null
  username: string
}

const initialState = { sessionId: null } as AuthState

const sessionSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate(state, action: PayloadAction<AuthenticatePayload>) {
      state.sessionId = action.payload.sessionId
      state.user = {
        username: action.payload.username
      }
    },
    signOut(state, action: PayloadAction<void>) {
      state.sessionId = null
    },
  },
})

export const { authenticate, signOut } = sessionSlice.actions
export default sessionSlice.reducer

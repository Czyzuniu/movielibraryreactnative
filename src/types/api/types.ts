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

export { AuthTokenResponse, LoginRequest, AuthNewSessionResponse, AccountDetailsResponse, AddToFavouritesRequestBody}

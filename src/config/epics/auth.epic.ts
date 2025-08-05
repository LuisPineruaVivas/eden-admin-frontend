import { ofType } from 'redux-observable'
import { mergeMap, map, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { GET } from '@config/fetcher/Get'
import { setUser, clearUser } from '@config/store/reducers/user.slice'
import { AnyAction } from '@reduxjs/toolkit'

const VERIFY_AUTH = 'auth/verify'

export const verifyAuth = (token: string): AnyAction => ({
  type: VERIFY_AUTH,
  payload: token,
})

const authEpic = (action$) =>
  action$.pipe(
    ofType(VERIFY_AUTH),
    mergeMap((action) =>
      from(GET<{ user: IUser }>(`${import.meta.env.VITE_API_URL}/auth/verify`, action.payload)).pipe(
        map((response) => {
          if (response.data.user) {
            return setUser({ user: response.data.user })
          }
          return clearUser()
        }),
        catchError(() => of(clearUser()))
      )
    )
  )

export default authEpic
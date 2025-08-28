import { ofType } from 'redux-observable'
import { mergeMap, map, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import Cookies from 'js-cookie'
import { GET } from '@config/fetcher/Get'
import { setUser, clearUser } from '@config/store/reducers/user.slice'
import { AnyAction } from '@reduxjs/toolkit'
import { IUser } from '@interfaces/models'

const VERIFY_AUTH = 'auth/verify'

export const verifyAuth = (token: string): AnyAction => ({
  type: VERIFY_AUTH,
  payload: token,
})

const authEpic = (action$) =>
  action$.pipe(
    ofType(VERIFY_AUTH),
    mergeMap((action) =>
      from(
        GET<{ user: IUser }>(
          `${import.meta.env.VITE_API_URL}/auth/verify`,
          action.payload
        )
      ).pipe(
        map((response) => {
          if (response.data.user) {
            // Al despachar setUser, isValidating se pondrá en false
            return setUser({ user: response.data.user })
          }
          // Al despachar clearUser, isValidating se pondrá en false
          return clearUser()
        }),
        catchError((error) => {
          if (error?.response?.status === 401) {
            Cookies.remove('token', { path: '/' })
          }
          // Al despachar clearUser, isValidating se pondrá en false
          return of(clearUser())
        })
      )
    )
  )

export default authEpic
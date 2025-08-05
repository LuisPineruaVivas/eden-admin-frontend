import { useCallback } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { RootState } from '@config/store'
import { IUser } from '@interfaces/models'
import { GET } from '@config/fetcher/Get'
import { POST } from '@config/fetcher/Post'
import { setUser, setToken, clearUser } from '@config/store/reducers/user.slice'

export default function useAuth() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation('common')

  const token = Cookies.get('token') ?? ''
  const user = useSelector((state: RootState) => state.user.user)
  const isAuthenticated = Boolean(user || token)

  const logout = useCallback(async () => {
    const storedToken = Cookies.get('token')
    try {
      if (storedToken) {
        await POST(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, storedToken)
      }
    } catch (err) {
      console.error('Error invalidating session on server:', err)
    } finally {
      Cookies.remove('token', { path: '/' })
      dispatch(clearUser())
      navigate('/login', { replace: true })
      toast.message(t('translation.logout.success'), {
        description: new Date().toLocaleString(undefined, {
          dateStyle: 'full',
          timeStyle: 'short',
        }),
      })
    }
  }, [dispatch, navigate, t])

  useQuery({
    queryKey: ['validateAuth', token],
    queryFn: () =>
      GET<{ user: IUser }>(`${import.meta.env.VITE_API_URL}/auth/verify`, token),
    enabled: !!token && !user,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      dispatch(setToken(token))
      dispatch(setUser({ user: data.user }))
    },
    onError: () => {
      logout()
    },
  })

  const setCredentials = (newToken: string, newUser: IUser) => {
    Cookies.set('token', newToken, { expires: 1, path: '/' })
    dispatch(setToken(newToken))
    dispatch(setUser({ user: newUser }))
    toast.success(t('translation.login.success'), {
      description: new Date().toLocaleString(undefined, {
        dateStyle: 'full',
        timeStyle: 'short',
      }),
    })
  }

  return {
    token,
    user,
    isAuthenticated,
    isValidating: false, // react-query flag not exposed directly; handle via query state if needed
    logout,
    setCredentials,
  }
}
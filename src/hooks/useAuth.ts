import Cookies from 'js-cookie'
import { RootState } from '@config/store'
import { IUser } from '@interface/models'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setToken, clearUser } from '@config/store/reducers/user.slice'
import { useQuery } from '@tanstack/react-query'
import { GET } from '@config/fetcher/Get'
import { POST } from '@config/fetcher/Post'
import { useCallback } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export default function useAuth() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation('common') 

  const token = Cookies.get('token') || ''
  const user = useSelector((state: RootState) => state.user.user)
  const isAuthenticated = !!user || !!token

  const logout = useCallback(async () => {
    const tokenToInvalidate = Cookies.get('token');

    try {
      if (tokenToInvalidate) {
        await POST(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, tokenToInvalidate);
      }
    } catch (error) {
      console.error("Fallo al cerrar sesión en el servidor, cerrando sesión en el cliente:", error);
    } finally {
      Cookies.remove('token', { path: '/' });
      dispatch(clearUser());
      navigate('/login', { replace: true });
      toast.message(t('translation.logout.success'), {
        description: new Date().toLocaleString(undefined, {
          dateStyle: 'full',
          timeStyle: 'short',
        }),
      })
    }
  }, [dispatch, navigate, t]);

  const { data, isError, isLoading: isValidating } = useQuery({
    queryKey: ['validateAuth', token],
    queryFn: () => {
      return GET<{ user: IUser }>(`${import.meta.env.VITE_API_URL}/auth/verify`, token)
    },
    enabled: !!token && !user,
    retry: 1,
    refetchOnWindowFocus: false,
  })
   useEffect(() => {
    if (data?.data.user) {
      dispatch(setUser({ user: data.data.user }))
    }
  }, [data, dispatch])

  useEffect(() => {
    if (isError) {
      logout()
    }
  }, [isError, logout])


  const setCredentials = (newToken: string, user: IUser) => {
    Cookies.set('token', newToken, { expires: 1, path: '/' })
    dispatch(setToken(newToken))
    dispatch(setUser({ user }))
    toast.success(t('translation.login.success'), {
      description: new Date().toLocaleString(undefined, {
        dateStyle: 'full',
        timeStyle: 'short',
      }),
    })
  }

  return {
    token,
    logout,
    setCredentials,
    isAuthenticated,
    isValidating,
    user
  }
}
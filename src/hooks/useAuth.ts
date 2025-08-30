import Cookies from 'js-cookie'
import { toast } from 'sonner'
import { RootState } from '@config/store'
import { IUser } from '@interfaces/models'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { verifyAuth } from '@config/epics/auth.epic'
import { useSelector, useDispatch } from 'react-redux'
import { useCallback, useEffect, useRef } from 'react'
import { setToken, clearUser } from '@config/store/reducers/user.slice'
import { POST } from '@config/fetcher/Post'

export function useAuth() {
  const { t } = useTranslation('common')
  const { user, isValidating } = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const hasVerified = useRef(false)
  const token = Cookies.get('token') || ''
  const isAuthenticated = !!user || !!token

  const refreshUser = () => {
    dispatch(verifyAuth(token))
  }

  useEffect(() => {
    if (token && !user && !hasVerified.current) {
      hasVerified.current = true
      dispatch(verifyAuth(token))
    }
  }, [token, user, dispatch])

  const logoutMutation = useMutation({
    mutationKey: [token],
    mutationFn: () => POST(`${import.meta.env.VITE_API_URL}/auth/logout`),
    onSuccess: () => {
      Cookies.remove('token', { path: '/' })
      dispatch(clearUser())
      navigate('/login', { replace: true })
      toast.success(t('translation.logout.success'), {
        description: new Date().toLocaleString(undefined, {
          dateStyle: 'full',
          timeStyle: 'short',
        }),
      })
    },
    onError: (error) => {
      toast.error(t('translation.logout.error'), {
        description: new Date().toLocaleString(undefined, {
          dateStyle: 'full',
          timeStyle: 'short',
        }),
      })
      console.error(
        'Error al cerrar sesión en el servidor, cerrando sesión en el cliente:',
        error
      )
    },
  })

  const logout = useCallback(() => {
    logoutMutation.mutate()
  }, [logoutMutation])

  const setCredentials = (newToken: string, newUser: IUser) => {
    Cookies.set('token', newToken, { expires: 1, path: '/' })
    dispatch(setToken(newToken))
    dispatch({ type: 'user/setUser', payload: { user: newUser } })
    toast.success(t('translation.login.success'), {
      description: new Date().toLocaleString(undefined, {
        dateStyle: 'full',
        timeStyle: 'short',
      }),
    })
  }

  return {
    user,
    token,
    logout,
    refreshUser,
    isValidating,
    setCredentials,
    isAuthenticated,
  }
}

export default useAuth
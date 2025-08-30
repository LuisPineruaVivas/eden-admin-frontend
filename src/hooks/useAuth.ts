import Cookies from 'js-cookie'
import { toast } from 'sonner'
import { RootState } from '@config/store'
import { IUser } from '@interfaces/models'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { verifyAuth } from '@config/epics/auth.epic'
import { useSelector, useDispatch } from 'react-redux'
import { useCallback, useEffect } from 'react'
import { setToken, clearUser, setUser, setValidating } from '@config/store/reducers/user.slice'
import { POST } from '@config/fetcher/Post'

export default function useAuth() {
  const { t } = useTranslation('common')
  const { user, isValidating } = useSelector((state: RootState) => state.user)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthenticated = !!user

  useEffect(() => {
    const tokenFromCookie = Cookies.get('token')
    if (tokenFromCookie && !user) {
      
      dispatch(verifyAuth(tokenFromCookie))
    } else {
      dispatch(setValidating(false))
    }
  }, [dispatch]) 

  const logoutMutation = useMutation({
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
    dispatch(setUser({ user: newUser, isValidating: false })) // <-- Usar la acción
    toast.success(t('translation.login.success'), {
      description: new Date().toLocaleString(undefined, {
        dateStyle: 'full',
        timeStyle: 'short',
      }),
    })
  }

  return {
    user,
    isAuthenticated,
    isValidating,
    logout,
    setCredentials,
  }
}
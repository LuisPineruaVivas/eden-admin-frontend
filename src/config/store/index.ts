import { configureStore } from '@reduxjs/toolkit'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import userReducer from './reducers/user.slice'
import confettiReducer from './reducers/confetti.slice'
import authEpic from '../epics/auth.epic'

const epicMiddleware = createEpicMiddleware()

export const store = configureStore({
  reducer: {
    user: userReducer,
    confetti: confettiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(epicMiddleware)
})

epicMiddleware.run(combineEpics(authEpic))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import loginSlice from './toolkit/login';
import startChat from './toolkit/startChat';
import errorSlice from './toolkit/error';


export const store = configureStore({
    reducer: {
        login: loginSlice,
        startChat: startChat,
        error: errorSlice
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
      }),
})

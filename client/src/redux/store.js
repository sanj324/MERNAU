 import { configureStore } from '@reduxjs/toolkit';
 import userSlice from './user/userslice';
 import userReducer from './user/userslice';

 export const store = configureStore({
   reducer: {user:userReducer},
   middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware({
       serializableCheck: false,
     }),
 });
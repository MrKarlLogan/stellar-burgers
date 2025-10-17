import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsSlice from './slices/ingredientsSlice';
import buildingSlice from './slices/buildingSlice';
import orderSlice from './slices/orderSlice';
import feedSlice from './slices/feedSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice,
    building: buildingSlice,
    order: orderSlice,
    feed: feedSlice,
    user: userSlice
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

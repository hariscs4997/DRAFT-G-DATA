import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import UserReducer from '@/state/user';
import LoadingReducer from '@/state/loading';
import MyGDataReducer from '@/state/myGData';
import ChatsReducer from '@/state/chats';
import SidebarReducer from '@/state/sidebar';
import WeatherReducer from '@/state/weather';
import OurGDataReducer from '@/state/ourGData';
import storage from './noopStorage';

const rootReducer = combineReducers({
  user: UserReducer,
  loading: LoadingReducer,
  my_g_data: MyGDataReducer,
  chats: ChatsReducer,
  sidebar: SidebarReducer,
  weather: WeatherReducer,
  our_g_data: OurGDataReducer,
  // Add other reducers here if you have any
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['loading', 'chats', 'my_g_data', 'our_g_data'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NEXT_PUBLIC_NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppDispatch = typeof store.dispatch;

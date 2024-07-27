import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import UserReducer from '@/state/user';
import LoadingReducer from '@/state/loading';
import MyGDataReducer from '@/state/myGData';
import ChatsReducer from '@/state/chats';
import SidebarReducer from '@/state/sidebar';
import WeatherReducer from '@/state/weather';
import tableReducer from '@/state/table';
import storage from 'redux-persist/lib/storage';
// import sellReducer from '@/state/sell';

const rootReducer = combineReducers({
  user: UserReducer,
  loading: LoadingReducer,
  my_g_data: MyGDataReducer,
  chats: ChatsReducer,
  sidebar: SidebarReducer,
  weather: WeatherReducer,
  table: tableReducer,
  // Add other reducers here if you have any
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['loading', 'chats', 'my_g_data', 'table'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppDispatch = typeof store.dispatch;

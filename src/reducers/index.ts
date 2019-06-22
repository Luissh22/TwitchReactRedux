import { combineReducers } from 'redux';
import { AuthStoreState, authReducer } from './authReducer';
import { StreamsStoreState, streamsReducer } from './streamsReducer';

export interface StoreState {
  authReducer: AuthStoreState;
  streamsReducer: StreamsStoreState;
}

export const reducers = combineReducers<StoreState>({
  authReducer: authReducer,
  streamsReducer: streamsReducer
});

import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import streamService from '../../service/streamService';
import { StreamActionTypes } from '../types';
import { Stream, StreamFormValues } from '../../models';
import { StoreState } from '../../reducers';
import { AnyAction } from 'redux';
import { AxiosResponse } from 'axios';

export type ThunkResult<R, A extends AnyAction> = ThunkAction<
  R,
  StoreState,
  undefined,
  A
>;
export type Dispatch<A extends AnyAction> = ThunkDispatch<
  StoreState,
  undefined,
  A
>;

export interface CreateStreamAction {
  type: StreamActionTypes.CreateStream;
  stream: Stream;
}

export interface FetchStreamsAction {
  type: StreamActionTypes.FetchStreams;
  streams: Stream[];
}

export interface FetchStreamAction {
  type: StreamActionTypes.FetchStream;
  stream: Stream;
}

export interface EditStreamAction {
  type: StreamActionTypes.EditStream;
  stream: Stream;
}

export interface DeleteStreamAction {
  type: StreamActionTypes.DeleteStream;
  streamId: number;
}

export type StreamActions =
  | CreateStreamAction
  | FetchStreamsAction
  | FetchStreamAction
  | EditStreamAction
  | DeleteStreamAction;

export const createStream = (
  streamFormValues: StreamFormValues
): ThunkResult<Promise<void>, CreateStreamAction> => {
  return (
    dispatch: Dispatch<CreateStreamAction>,
    getState: () => StoreState
  ): Promise<void> => {
    const { userId } = getState().authReducer;
    return streamService
      .post<Stream>('/streams', { ...streamFormValues, userId })
      .then(response => {
        dispatch({
          type: StreamActionTypes.CreateStream,
          stream: response.data
        });
      });
  };
};

export const fetchStreams = (): ThunkResult<
  Promise<void>,
  FetchStreamsAction
> => {
  return (dispatch: Dispatch<FetchStreamsAction>): Promise<void> => {
    return streamService
      .get<Stream[]>('/streams')
      .then((response: AxiosResponse<Stream[]>) => {
        dispatch({
          type: StreamActionTypes.FetchStreams,
          streams: response.data
        });
      });
  };
};

export const fetchStream = (
  streamId: number
): ThunkResult<Promise<void>, FetchStreamAction> => {
  return (dispatch: Dispatch<FetchStreamAction>): Promise<void> => {
    return streamService.get<Stream>(`/streams/${streamId}`).then(response => {
      dispatch({
        type: StreamActionTypes.FetchStream,
        stream: response.data
      });
    });
  };
};

export const editStream = (
  streamId: number,
  streamFormValues: StreamFormValues
): ThunkResult<Promise<void>, EditStreamAction> => {
  return (dispatch: Dispatch<EditStreamAction>): Promise<void> => {
    return streamService
      .patch<Stream>(`/streams/${streamId}`, streamFormValues)
      .then(response => {
        dispatch({
          type: StreamActionTypes.EditStream,
          stream: response.data
        });
      });
  };
};

export const deleteStream = (
  streamId: number
): ThunkResult<Promise<void>, DeleteStreamAction> => {
  return (dispatch: Dispatch<DeleteStreamAction>): Promise<void> => {
    return streamService.delete<void>(`/streams/${streamId}`).then(_ => {
      dispatch({
        type: StreamActionTypes.DeleteStream,
        streamId: streamId
      });
    });
  };
};

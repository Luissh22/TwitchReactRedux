import _ from 'lodash';
import { Stream } from '../models';
import { StreamActions } from '../actions/streams';
import { StreamActionTypes } from '../actions/types';

export interface StreamsStoreState {
  streams: { [id: number]: Stream };
}

const INITIAL_STATE: StreamsStoreState = {
  streams: {}
};

export const streamsReducer = (
  state: StreamsStoreState = INITIAL_STATE,
  action: StreamActions
): StreamsStoreState => {
  switch (action.type) {
    case StreamActionTypes.CreateStream:
    case StreamActionTypes.EditStream:
    case StreamActionTypes.FetchStream:
      return {
        streams: { ...state.streams, [action.stream.id]: action.stream }
      };
    case StreamActionTypes.DeleteStream:
      return {
        streams: _.omit(state.streams, action.streamId)
      };
    case StreamActionTypes.FetchStreams:
      return {
        streams: { ...state.streams, ..._.mapKeys(action.streams, 'id') }
      };
    default:
      return state;
  }
};

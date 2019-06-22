import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { StreamRouteParams, Stream, StreamFormValues } from '../../models';
import { StoreState } from '../../reducers';
import { StreamForm } from './StreamForm';
import {
  Dispatch,
  EditStreamAction,
  editStream,
  fetchStream,
  StreamActions
} from '../../actions';

interface StreamEditStateProps {
  stream: Stream;
  streamId: number;
}

interface StreamEditDispatchProps {
  fetchStream: (id: number) => Promise<void>;
  editStream: (id: number, values: StreamFormValues) => Promise<void>;
}

interface StreamEditProps
  extends StreamEditStateProps,
    StreamEditDispatchProps,
    RouteComponentProps<StreamRouteParams> {}

class StreamEditImpl extends React.Component<StreamEditProps> {
  componentDidMount() {
    this.props.fetchStream(this.props.streamId);
  }
  private onSubmit = (id: number, values: StreamFormValues): void => {
    this.props.editStream(id, values).then(() => {
      this.props.history.push('/');
    });
  };
  private extractFormValues = (stream: Stream): StreamFormValues => {
    return {
      title: stream.title,
      description: stream.description
    };
  };
  render() {
    const { stream } = this.props;
    if (!stream) return null;
    return (
      <div>
        <h2>Edit a Stream</h2>
        <StreamForm
          onSubmit={values => this.onSubmit(stream.id, values)}
          initialValues={this.extractFormValues(stream)}
        />
      </div>
    );
  }
}

const mapStateToProps = (
  state: StoreState,
  ownProps: StreamEditProps
): StreamEditStateProps => {
  const { streams } = state.streamsReducer;
  const { id } = ownProps.match.params;
  const streamId = parseInt(id);
  return {
    stream: streams[streamId],
    streamId: streamId
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<StreamActions>
): StreamEditDispatchProps => {
  return {
    editStream: (id: number, values: StreamFormValues) =>
      dispatch(editStream(id, values)),
    fetchStream: (id: number) => dispatch(fetchStream(id))
  };
};

export const StreamEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamEditImpl);

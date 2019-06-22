import React from 'react';
import { Modal } from '../Modal';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Stream, StreamRouteParams } from '../../models';
import { StoreState } from '../../reducers';
import {
  Dispatch,
  StreamActions,
  fetchStream,
  deleteStream
} from '../../actions';

interface StreamDeleteStateProps {
  stream: Stream;
  streamId: number;
}
interface StreamDeleteDispatchProps {
  fetchStream: (id: number) => void;
  deleteStream: (id: number) => Promise<void>;
}

interface StreamDeleteProps
  extends RouteComponentProps<StreamRouteParams>,
    StreamDeleteStateProps,
    StreamDeleteDispatchProps {}

class StreamDeleteImpl extends React.Component<StreamDeleteProps> {
  componentDidMount() {
    const { streamId, fetchStream } = this.props;
    fetchStream(streamId);
  }

  private onDismiss = () => {
    this.props.history.push('/');
  };

  private onDeleteButtonClick = () => {
    this.props.deleteStream(this.props.stream.id).then(() => {
      this.props.history.push('/');
    });
  };

  private onCancelButtonClick = () => {
    this.props.history.push('/');
  };

  render() {
    const { stream } = this.props;
    if (!stream) return null;
    return (
      <div>
        <Modal onDismiss={this.onDismiss}>
          <div className="header">Delete Stream</div>
          <div className="content">
            Are you sure you want to delete {stream.title}?
          </div>
          <div className="actions">
            <button
              onClick={this.onDeleteButtonClick}
              className="ui primary button negative"
            >
              Delete
            </button>
            <button
              onClick={this.onCancelButtonClick}
              className="ui primary button"
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (
  state: StoreState,
  ownProps: StreamDeleteProps
): StreamDeleteStateProps => {
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
): StreamDeleteDispatchProps => {
  return {
    fetchStream: (id: number) => dispatch(fetchStream(id)),
    deleteStream: (id: number) => dispatch(deleteStream(id))
  };
};

export const StreamDelete = connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamDeleteImpl);

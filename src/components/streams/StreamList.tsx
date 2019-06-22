import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Stream } from '../../models';
import { StoreState } from '../../reducers';
import { Dispatch, FetchStreamsAction, fetchStreams } from '../../actions';
import { StreamListItem } from './StreamListItem';

interface StreamListStateProps {
  streams: Stream[];
  currentUserId?: string;
  isSignedIn: boolean;
}

interface StreamListDispatchProps {
  fetchStreams: () => void;
}

interface StreamListProps
  extends StreamListStateProps,
    StreamListDispatchProps {}

class StreamListImpl extends React.Component<StreamListProps> {
  componentDidMount() {
    this.props.fetchStreams();
  }

  private renderCreateStreamButton(): JSX.Element {
    return this.props.isSignedIn ? (
      <div style={{ textAlign: 'right' }}>
        <Link to="/streams/new" className="ui button primary">
          Create Stream
        </Link>
      </div>
    ) : null;
  }

  private renderListItem(stream: Stream): JSX.Element {
    const { currentUserId } = this.props;
    const showAdminButtons =
      currentUserId !== null && currentUserId === stream.userId;
    return (
      <StreamListItem
        key={stream.id}
        stream={stream}
        showAdminButtons={showAdminButtons}
      />
    );
  }

  private renderList(): JSX.Element[] {
    return this.props.streams.map(stream => this.renderListItem(stream));
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreateStreamButton()}
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState): StreamListStateProps => {
  const { streams } = state.streamsReducer;
  const { userId, isSignedIn } = state.authReducer;
  return {
    streams: Object.values(streams),
    currentUserId: userId,
    isSignedIn: isSignedIn
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<FetchStreamsAction>
): StreamListDispatchProps => {
  return {
    fetchStreams: () => dispatch(fetchStreams())
  };
};

export const StreamList = connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamListImpl);

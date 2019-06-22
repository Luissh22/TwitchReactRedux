import React from 'react';
import { Link } from 'react-router-dom';
import { Stream } from '../../models';

interface StreamListItemProps {
  stream: Stream;
  showAdminButtons: boolean;
}

export class StreamListItem extends React.Component<StreamListItemProps> {
  private renderAdminButtons() {
    const { stream, showAdminButtons } = this.props;
    return showAdminButtons ? (
      <div className="right floated content">
        <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
          Edit
        </Link>
        <Link
          to={`/streams/delete/${stream.id}`}
          className="ui button negative"
        >
          Delete
        </Link>
      </div>
    ) : null;
  }
  render() {
    const { stream } = this.props;
    return (
      <div className="item" key={stream.id}>
        {this.renderAdminButtons()}
        <i className="large middle aligned icon camera" />
        <div className="content">
          {stream.title}
          <div className="description">{stream.description}</div>
        </div>
      </div>
    );
  }
}

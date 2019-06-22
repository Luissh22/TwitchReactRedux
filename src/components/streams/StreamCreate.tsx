import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { StreamFormValues } from '../../models';
import { createStream, CreateStreamAction, Dispatch } from '../../actions';
import { StreamForm } from './StreamForm';

interface StreamCreateDispatchProps {
  createStream: (streamFormValues: StreamFormValues) => Promise<void>;
}
interface StreamCreateProps
  extends StreamCreateDispatchProps,
    RouteComponentProps {}

class StreamCreateImpl extends React.Component<StreamCreateProps> {
  private onSubmit = (values: StreamFormValues): void => {
    this.props.createStream(values).then(() => {
      this.props.history.push('/');
    });
  };

  render() {
    return (
      <div>
        <h2>Create a Stream</h2>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<CreateStreamAction>
): StreamCreateDispatchProps => {
  return {
    createStream: (streamFormValues: StreamFormValues) =>
      dispatch(createStream(streamFormValues))
  };
};

export const StreamCreate = connect(
  null,
  mapDispatchToProps
)(StreamCreateImpl);

import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import { StoreState } from '../reducers';
import { Dispatch } from 'redux';

interface GoogleAuthStateProps {
  isSignedIn: boolean;
}

interface GoogleAuthDispatchProps {
  signIn: (userId: string) => void;
  signOut: () => void;
}

interface GoogleAuthProps
  extends GoogleAuthStateProps,
    GoogleAuthDispatchProps {}

class GoogleAuthImpl extends React.Component<GoogleAuthProps> {
  private auth: gapi.auth2.GoogleAuth;

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '312288501672-jhhltveigvece9aq9vdehqb9vutvi2bd.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChanged(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChanged);
        });
    });
  }

  private onAuthChanged = (isSignedIn: boolean): void => {
    isSignedIn
      ? this.props.signIn(this.auth.currentUser.get().getId())
      : this.props.signOut();
  };

  private renderGoogleButton(
    buttonLabel: string,
    onButtonClick: () => void
  ): JSX.Element {
    return (
      <button onClick={onButtonClick} className="ui red google button">
        <i className="google icon" />
        {buttonLabel}
      </button>
    );
  }

  private onSignOutButtonClick = () => {
    this.auth.signOut();
  };

  private onSignInButtonClick = () => {
    this.auth.signIn();
  };

  private renderAuthButton() {
    const { isSignedIn } = this.props;
    if (isSignedIn === null) {
      return null;
    }

    return isSignedIn
      ? this.renderGoogleButton('Sign Out', this.onSignOutButtonClick)
      : this.renderGoogleButton(
          'Sign in with Google',
          this.onSignInButtonClick
        );
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state: StoreState): GoogleAuthStateProps => {
  return {
    isSignedIn: state.authReducer.isSignedIn
  };
};

const mapDispatchToProps = (dispatch: Dispatch): GoogleAuthDispatchProps => {
  return {
    signIn: (userId: string) => dispatch(signIn(userId)),
    signOut: () => dispatch(signOut())
  };
};

export const GoogleAuth = connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleAuthImpl);

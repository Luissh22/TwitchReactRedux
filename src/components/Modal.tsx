import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  onDismiss: () => void;
  children?: ReactNode;
}
export class Modal extends React.Component<ModalProps> {
  render() {
    const { onDismiss, children } = this.props;
    return ReactDOM.createPortal(
      <div className="ui dimmer modals visible active" onClick={onDismiss}>
        <div
          className="ui standard modal visible active"
          onClick={e => e.stopPropagation()}
        >
          {children}
        </div>
      </div>,
      document.querySelector('#modal')
    );
  }
}

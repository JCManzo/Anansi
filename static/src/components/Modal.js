import React, { Component } from 'react';

import './Modal.scss';

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="modal fade"
        id="uploadModal"
        tabIndex="-1"
        aria-labelledby="uploadModalTitle"
        aria-hidden="true"
        ref="uploadModal"
        >
          {this.props.children}
      </div>
    );
  }
}

export default Modal;

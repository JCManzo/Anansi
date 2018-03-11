import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Modal.scss';

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="modal fade"
        id={this.props.modalId}
        tabIndex="-1"
        aria-labelledby="modalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">{this.props.title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.props.onModalActionClick}
              >{this.props.modalActionButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  title: ''
};

Modal.propTypes = {
  title: PropTypes.string,
  modalId: PropTypes.string
};

export default Modal;

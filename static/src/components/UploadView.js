import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Modal from './Modal';
import PhotoDropzone from './PhotoDropzone';
import * as dataActions from '../actions/data';
import './UploadView.css';

function mapStateToProps(state) {
  return {
    data: state.data
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(dataActions, dispatch);
}

/**
 * Dispatches a modal toggle request when the upload modal is dismissed.
 *
 * @param  {object} props [description]
 * @return {void}
 */
function handleHideModal(props) {
  props.uploadModalToggleRequest();
}

class UploadView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      caption: '',
      tags: '',
      disabled: true,
    };
  }

  changeValue(e, type) {
    const newState = {};
    newState[type] = e.target.value;

    // Validate fields after field states has been updated.
    this.setState(newState, () => this.isDisabled());
  }

  isDisabled() {
    const captionIsValid = (this.state.caption) ? true : false;
    const tagsAreValid = (this.state.tags) ? true : false;

    if (captionIsValid && tagsAreValid) {
      this.setState({disabled: false});
    } else {
      this.setState({disabled: true});
    }
  }

  render() {
    if (!this.props.data.isUploadModalOpen) {
      return null;
    }

    if (this.props.data.isPhotoUploadSuccess) {
      $(this.modal.modal).modal('hide');
    }

    return (
      <div>
        <Modal
          ref={(modal) => { this.modal = modal; }}
          title="Upload an Image"
          modalId="uploadModal"
          handleHideModal={() => handleHideModal(this.props)}
        >
          <form>
            <div id="uloadModalCaption">
              <label htmlFor="caption">Caption</label>
              <input
                id="caption"
                type="text"
                className="form-control"
                placeholder="Add a description"
                onChange={e => this.changeValue(e, 'caption')}
              />
            </div>
            <PhotoDropzone caption={this.state.caption} tags={this.state.tags} />
            <div id="uloadModalTags">
              <label htmlFor="tags">Tags</label>
              <input
                id="tags"
                type="text"
                className="form-control"
                placeholder="Separate tags with a space"
                onChange={e => this.changeValue(e, 'tags')}
              />
            </div>
            <div className="modal-footer">
              <button
                disabled={this.state.disabled}
                type="button"
                className="btn btn-primary"
                onClick={() => this.props.uploadPhotosRequest()}
              >Submit
              </button>
            </div>
          </form>
        </Modal>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadView);
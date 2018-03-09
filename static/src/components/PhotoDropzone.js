import React, { Component } from 'react';
import DropzoneComponent from 'react-dropzone-component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as dataActions from '../actions/data';
import { API_UPLOAD_PHOTOS } from '../constants';

import './PhotoDropzone.css';
import '../../node_modules/react-dropzone-component/styles/filepicker.css';
import '../../node_modules/dropzone/dist/min/dropzone.min.css';

function mapStateToProps({data}) {
  return {
    data
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(dataActions, dispatch);
}

class PhotoDropzone extends Component {
  constructor(props) {
    super(props);

    // DropzoneCompoent config
    this.config = {
      iconFiletypes: ['.jpg', 'png'],
      showFiletypeIcon: true,
      postUrl: API_UPLOAD_PHOTOS
    };

    // DropzoneJS config
    this.djsConfig = {
      autoProcessQueue: false,
      addRemoveLinks: true,
      headers: {
        // Send JWT needed for file uploads.
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };

    // The DropJS object
    this.dropzone = null;

    this.eventHandlers = {
      addedfile: (file) => {
        console.log('Added file..');
      },
      init: (dropzone) => {
        console.log(dropzone);
        this.dropzone = dropzone;
      },
      success: () => {
        props.uploadPhotosSuccess();
        console.log('success');
      },
      removedFile: () => {
        console.log('Removed file');
      },
      error: (file, error) => {
        props.uploadPhotosFailure();
        console.log('Error', file, error);
      },
      processing: (file) => {
        console.log('Processing file', file);
      },
      sending: (file) => {
        console.log('Sending file', file);
      },
      complete: (file) => {
        this.dropzone.removeFile(file);
        props.fetchHomeFeed();
        $('#uploadModal').modal('hide')
      }
    };
  }

  render() {
    if (this.props.upload) {
      this.dropzone.processQueue();
      console.log('Uploading..');
    }

    return (
      <DropzoneComponent
        config={this.config}
        djsConfig={this.djsConfig}
        eventHandlers={this.eventHandlers}
      />
    );
  }
}

PhotoDropzone.propTypes = {
  upload: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoDropzone);

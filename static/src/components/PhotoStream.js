import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/data';

import PhotoList from './PhotoList';
import './PhotoStream.scss';

function mapStateToProps({data}) {
  return data;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

class PhotoStream extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPhoto: null
    };

    this.props.fetchHomeFeed();
  }

  render() {
    return (
      <div id="photo-stream" className="container-fluid">
        <PhotoList
          photos={this.props.photos}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoStream)

import React, { Component } from 'react';
import PhotoList from './PhotoList';
import './PhotoStream.scss';

export default class PhotoStream extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      selectedPhoto: null
    };

    this.fetchPhotos();
  }

  fetchPhotos() {
    fetch('https://jsonplaceholder.typicode.com/photos?albumId=1')
      .then(response => response.json())
      .then(photos => this.setState({ photos }));
  }

  render() {
    return (
      <div id="photo-stream" className="container-fluid">
        <PhotoList
          photos={this.state.photos}
        />
      </div>
    );
  }
}

import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './DragDropUploader.css';

import { uploadPhotos } from '../utils/http_funcs';

class DragDropUploader extends Component {
  constructor(props) {
    super(props);

    this.state = { files: [] };
  }

  onDrop(files) {
    this.setState({ files });
    uploadPhotos(files);
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone className="dropzone-zone" accept="image/jpeg, image/png" onDrop={this.onDrop.bind(this)}>
            <h4>Drag images here to upload</h4>
            <p>or, click to browse for a file on your computer</p>
          </Dropzone>
        </div>
        <div>
          <ul>
          {
            this.state.files.map(f => <li key={f.name}>{f.name}</li>)
          }
          </ul>
        </div>
      </section>
    );
  }
}

export default DragDropUploader;

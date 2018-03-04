import React, { Component } from 'react';
import PhotoStream from './PhotoStream';

class HomeView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {
          this.props.isAuthenticated && this.props.statusText &&
            <div className="alert alert-info">
                { this.props.statusText }
            </div>
        }
        <section>
          <PhotoStream />
        </section>
      </div>
    );
  }
}

export default HomeView;

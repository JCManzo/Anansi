import React, { Component } from 'react';
import PhotoStream from './PhotoStream';
import Avatar from '../../assets/av.png';
import './ProfileView.css';

class ProfileView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <div id="profile-header-container">
          <div id="profile-image" className="rounded-circle">
            <img alt="Profile avatar" src={Avatar} />
          </div>
          <div id="profile-statistics">
            <p>You have shared <b>4</b> Posts</p>
            <p>You have received <b>122</b> Likes</p>
          </div>
        </div>
        <hr />
        <PhotoStream />
      </section>
    );
  }
}

export default ProfileView;

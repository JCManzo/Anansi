import PropTypes from 'prop-types';
import React from 'react';
import PhotoCard from './PhotoCard';

function PhotoList(props) {
  const photos = props.photos.map(photo => (
    <PhotoCard
      key={photo.id}
      onPhotoSelect={this.selectedPhoto}
      photo={photo}
    />
  ));

  return (
    <div className="row">
      { photos }
    </div>
  );
}

PhotoList.defaultProps = {
  photos: []
};

PhotoList.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object)
};

export default PhotoList;

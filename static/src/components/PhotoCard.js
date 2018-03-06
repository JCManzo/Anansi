import React from 'react';
import './PhotoCard.scss';

function PhotoCard({photo}) {
  const photoUrl = photo.url;

  return (
    <div
      className="col-sm-6 col-lg-3 mb-2"
      onClick={() => onPhotoSelect(photo)}
    >
      <img alt="Photo card" className="img-fluid img-thumbnail" src={photoUrl} />
    </div>
  );
}

export default PhotoCard;

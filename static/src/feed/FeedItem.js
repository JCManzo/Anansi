import React from 'react';

const FeedItem = () => {
  // const video = props.video => {video};
  // const imageUrl = video.snippet.thumbnails.default.url;
  // const title = video.snippet.title;

  return (
    <li onClick={() => onVideoSelect(video)} className='list-group-item'>
      <div className='video-list media'>

      </div>
    </li>
  );
};

export default FeedItem;

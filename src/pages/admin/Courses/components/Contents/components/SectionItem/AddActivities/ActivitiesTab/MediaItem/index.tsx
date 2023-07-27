import React from 'react';
import YoutubeMedia from './Youtube';
import AddLesson from '../../../../AddLesson';

// interface MediaItemProps {
//   onCloseActivies: () => void;
// }

const MediaItem = () => {
  return (
    <div className='media-item'>
      <YoutubeMedia />
      <YoutubeMedia />
      <YoutubeMedia />
      <YoutubeMedia />
      <YoutubeMedia />
      <YoutubeMedia />
      <AddLesson />
    </div>
  );
};

export default MediaItem;

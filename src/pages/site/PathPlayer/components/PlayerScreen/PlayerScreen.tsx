import React from 'react';
import ReactPlayer from 'react-player';

// type Props = {};

const PlayerScreen = () => {
  return (
    <ReactPlayer
      className='player-screen'
      url='https://www.youtube.com/watch?v=GQ-toR8F7rc&t=1027s&ab_channel=F8Official'
      width='100%'
      height='90vh'
      controls={true}
    />
  );
};

export default PlayerScreen;

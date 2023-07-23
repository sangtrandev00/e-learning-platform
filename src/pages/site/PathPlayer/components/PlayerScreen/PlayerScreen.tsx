import React, { useRef } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';

// type Props = {};

const PlayerScreen = () => {
  const content = useSelector((state: RootState) => state.client.playingVideo);

  const onDuration = (number: number) => {
    console.log(number);
  };

  const playerEl = useRef<ReactPlayer>(null);

  console.log(playerEl.current?.getDuration());

  return (
    <ReactPlayer
      ref={playerEl}
      className='player-screen'
      url={content}
      width='100%'
      height='90vh'
      controls={true}
      onDuration={onDuration}
    />
  );
};

export default PlayerScreen;

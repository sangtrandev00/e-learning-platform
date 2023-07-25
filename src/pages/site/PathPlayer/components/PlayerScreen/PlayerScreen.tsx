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
  const onProgress = (progress: { loaded: number; loadedSeconds: number; played: number; playedSeconds: number }) => {
    console.log(progress);

    console.log('pecent', progress.played / progress.loaded);
    console.log(playerEl.current?.getCurrentTime());
    console.log(playerEl.current?.getSecondsLoaded());
    console.log(playerEl.current?.getDuration());

    if (playerEl.current) {
      console.log('percent: ', playerEl.current.getCurrentTime() / playerEl.current.getDuration());
      const percentHavePlayed = playerEl.current.getCurrentTime() / playerEl.current.getDuration();
      if (percentHavePlayed >= 0.95) {
        console.log('watched done the video');
      } else {
        console.log('have not watched done the video');
      }
    }
  };
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
      onProgress={onProgress}
    />
  );
};

export default PlayerScreen;

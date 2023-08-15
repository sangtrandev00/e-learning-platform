import { notification } from 'antd';
import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { useUpdateLessonDoneByUserMutation } from '../../../client.service';
import { updateLessonDoneAtBrowser } from '../../../client.slice';
import './PlayerScreen.scss';
// type Props = {};

const PlayerScreen = () => {
  const content = useSelector((state: RootState) => state.client.playingVideo);
  const currUserId = useSelector((state: RootState) => state.auth.userId);
  const currLessonId = useSelector((state: RootState) => state.client.lessonId);
  const [updateLessonDone, updateLessonDoneResult] = useUpdateLessonDoneByUserMutation();
  const [apiCalled, setApiCalled] = useState(false);
  const dispatch = useDispatch();
  const onDuration = (number: number) => {
    console.log(number);
  };

  const playerEl = useRef<ReactPlayer>(null);
  const onProgress = (progress: { loaded: number; loadedSeconds: number; played: number; playedSeconds: number }) => {
    console.log('pecent', progress.played / progress.loaded);

    if (!apiCalled && playerEl.current) {
      const percentHavePlayed = playerEl.current.getCurrentTime() / playerEl.current.getDuration();
      if (percentHavePlayed >= 0.95) {
        console.log('watched done the video');

        // Update lesson done at current state
        dispatch(updateLessonDoneAtBrowser(currLessonId));

        // Update lesson Done at database
        updateLessonDone({
          userId: currUserId,
          lessonId: currLessonId
        })
          .then((result) => {
            console.log('update lesson done result: ', result);
            notification.success({
              message: 'You have finished this video'
            });
            // Update at state and db here!!!

            // dispatch(setCurrentLessonDone());
          })
          .catch((error) => {
            console.log(error);
          });

        setApiCalled(true);
      } else {
        console.log('have not watched done the video');
      }
    }
  };

  console.log('Content playing video is: ', content);

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

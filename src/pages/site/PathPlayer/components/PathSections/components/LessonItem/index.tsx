import React, { useRef, useState, useEffect } from 'react';
import { PlayCircleOutlined, CheckOutlined, CheckCircleFilled } from '@ant-design/icons';
import ReactPlayer from 'react-player'; // Import the react-player component
import './LessonItem.scss';
import { ILesson } from '../../../../../../../types/lesson.type';
import { useDispatch, useSelector } from 'react-redux';
import { startPlayingVideo } from '../../../../../client.slice';
import { formatTime } from '../../../../../../../utils/functions';
import { RootState } from '../../../../../../../store/store';

interface LessonItemProps {
  lessonItem: ILesson;
}

function LessonItem(props: LessonItemProps) {
  const { _id, name, sectionId, content, access, description, type, isDone } = props.lessonItem;

  const isLessonDoneAtStore = useSelector((state: RootState) => state.client.isLessonDone);
  const currLessonId = useSelector((state: RootState) => state.client.lessonId);

  const [isVideoDone, setIsVideoDone] = useState(isDone);

  console.log('is lesson Done at store', isLessonDoneAtStore);

  // if (isLessonDoneAtStore && _id === currLessonId) {
  //   setIsVideoDone(true);
  // }

  useEffect(() => {
    console.log('is lesson done at store: ', isLessonDoneAtStore);
    console.log('What lesson Done at store: ', currLessonId);

    if (isLessonDoneAtStore && _id === currLessonId) {
      setIsVideoDone(true);
    }
  }, [isLessonDoneAtStore, currLessonId, _id]);

  const dispatch = useDispatch();

  const [videoDuration, setVideoDuration] = useState<number | null>(null);

  const playerRef = useRef<ReactPlayer | null>(null);

  const playVideoHandler = () => {
    dispatch(
      startPlayingVideo({
        lessonId: _id,
        content
      })
    );
  };

  const handleDuration = (duration: number) => {
    setVideoDuration(duration);
  };

  return (
    <div className='lesson-item' onClick={playVideoHandler}>
      <div className='lesson-item__icon'>
        <PlayCircleOutlined className='lesson-item__icon-icon' />
      </div>
      <div className='lesson-item__lengths'>
        <div className='lesson-item__status'>{access}</div>
        <div className='lesson-item__lengths-minutes'>{videoDuration ? formatTime(videoDuration) : '00:00'}</div>
      </div>
      <div className='lesson-item__name'>{name}</div>
      <div className='lesson-item__is-finished'>
        {isVideoDone && <CheckCircleFilled className='lesson-item__is-finished-icon' />}
      </div>
      <ReactPlayer
        ref={playerRef}
        url={content}
        width={0}
        height={0}
        onDuration={handleDuration}
        config={{
          youtube: {
            playerVars: {
              controls: 0,
              modestbranding: 1,
              showinfo: 0,
              fs: 0
            }
          }
        }}
      />
    </div>
  );
}

// function formatTime(seconds: number) {
//   const date = new Date(0);
//   date.setSeconds(seconds);
//   return date.toISOString().substr(14, 5);
// }

LessonItem.defaultProps = {
  lessonItem: {
    name: 'Lesson 1',
    sectionId: '',
    content: '',
    access: '',
    description: ''
  }
};

export default LessonItem;

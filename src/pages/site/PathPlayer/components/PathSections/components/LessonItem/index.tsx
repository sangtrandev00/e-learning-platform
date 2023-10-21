import { CheckCircleFilled, PlayCircleOutlined } from '@ant-design/icons';
import { Skeleton } from 'antd';
import { Fragment, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player'; // Import the react-player component
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/store';
import { ILesson } from '../../../../../../../types/lesson.type';
import { formatTime } from '../../../../../../../utils/functions';
import { startPlayingVideo, updateIsLessonChange } from '../../../../../client.slice';
import './LessonItem.scss';

interface LessonItemProps {
  lessonItem: ILesson;
  isFetching: boolean;
}

function LessonItem(props: LessonItemProps) {
  const { _id, name, content, access, isDone } = props.lessonItem;
  const isLessonDoneAtStore = useSelector((state: RootState) => state.client.isLessonDone);
  const currLessonId = useSelector((state: RootState) => state.client.lessonId);
  const lessonIdsDone = useSelector((state: RootState) => state.client.lessonIdsDoneByCourseId);
  const [isVideoDone, setIsVideoDone] = useState(isDone);

  const isCurrentLessonDone = lessonIdsDone.includes(_id);

  useEffect(() => {
    if (isLessonDoneAtStore && _id === currLessonId) {
      setIsVideoDone(true);
    }
  }, [isLessonDoneAtStore, currLessonId, _id]);

  const dispatch = useDispatch();

  const [videoDuration, setVideoDuration] = useState<number | null>(null);

  const playerRef = useRef<ReactPlayer | null>(null);

  const playVideoHandler = () => {
    dispatch(updateIsLessonChange(_id));

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
    <Fragment>
      {props.isFetching && <Skeleton />}
      {!props.isFetching && (
        <div className={`lesson-item ${currLessonId === _id ? 'playing' : ''}`} onClick={playVideoHandler}>
          <div className='lesson-item__icon'>
            <PlayCircleOutlined className='lesson-item__icon-icon' />
          </div>
          <div className='lesson-item__lengths'>
            <div className='lesson-item__status'>{access}</div>
            <div className='lesson-item__lengths-minutes'>{videoDuration ? formatTime(videoDuration) : '00:00'}</div>
          </div>
          <div className='lesson-item__name'>{name}</div>
          <div className='lesson-item__is-finished'>
            {isCurrentLessonDone && <CheckCircleFilled className='lesson-item__is-finished-icon' />}
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
      )}
    </Fragment>
  );
}

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

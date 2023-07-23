import React, { useRef, useState } from 'react';
import './LessonItem.scss';
import { Collapse, Skeleton } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { ILesson } from '../../../../../types/lesson.type';
import ReactPlayer from 'react-player';
import { formatTime } from '../../../../../utils/functions';

type CourseDetailLessonItemProps = {
  lessonItem: ILesson;
};

const CourseDetailLessonItem = (props: CourseDetailLessonItemProps) => {
  const { _id, name, description, access, content } = props.lessonItem;
  const [videoDuration, setVideoDuration] = useState<number | null>(null);

  const playerRef = useRef<ReactPlayer | null>(null);

  const handleDuration = (duration: number) => {
    setVideoDuration(duration);
  };

  return (
    <div className='course-detail__lesson-item'>
      {!videoDuration && <Skeleton.Input active={true} size={'small'} block={true} style={{ marginBottom: '1rem' }} />}
      {videoDuration && (
        <Collapse
          size='small'
          items={[
            {
              key: _id,
              label: (
                <div className='course-detail__lesson-item-label'>
                  <PlayCircleOutlined className='course-detail__lesson-item-label-icon' />
                  <span className='course-detail__lesson-item-label-text'>{name}</span>
                  <div className='course-detail__lesson-item-label-float-right'>
                    {access === 'FREE' && (
                      <a href='#' className='course-detail__lesson-item-label-preview'>
                        Preview
                      </a>
                    )}
                    <span className='course-detail__lesson-item-label-duration'>
                      {videoDuration ? formatTime(videoDuration) : '00:00'}
                    </span>
                  </div>
                </div>
              ),
              children: <p className='course-detail__lesson-item-desc'>{description}</p>
            }
          ]}
          bordered={false}
        />
      )}

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
};

export default CourseDetailLessonItem;

import { PlayCircleOutlined } from '@ant-design/icons';
import { Collapse, Skeleton } from 'antd';
import { ILesson } from '../../../../../types/lesson.type';
import { formatTime } from '../../../../../utils/functions';
import './LessonItem.scss';

type CourseDetailLessonItemProps = {
  lessonItem: ILesson;
};

const CourseDetailLessonItem = (props: CourseDetailLessonItemProps) => {
  const { _id, name, description, access, content, videoLength } = props.lessonItem;

  // console.log('video Length: ');

  return (
    <div className='course-detail__lesson-item'>
      {!props.lessonItem && (
        <Skeleton.Input active={true} size={'small'} block={true} style={{ marginBottom: '1rem' }} />
      )}
      {props.lessonItem && (
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
                      {formatTime(videoLength) || '00:00'}
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
    </div>
  );
};

export default CourseDetailLessonItem;

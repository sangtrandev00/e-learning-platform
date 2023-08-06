import './LessonItem.scss';

import { YoutubeOutlined } from '@ant-design/icons';
import { ILesson } from '../../../../../../../types/lesson.type';

type LessonItemProps = {
  lesson: ILesson;
};

const LessonItem = (props: LessonItemProps) => {
  return (
    <div className='lesson-item'>
      <YoutubeOutlined className='lesson-item__icon' />
      <div className='lesson-item__content'>{props.lesson.name}</div>
    </div>
  );
};

export default LessonItem;

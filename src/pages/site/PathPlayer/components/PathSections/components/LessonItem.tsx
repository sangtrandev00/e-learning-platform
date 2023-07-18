import React from 'react';
import { PlayCircleOutlined, CheckOutlined } from '@ant-design/icons';
// type Props = {};
import './LessonItem.scss';
function LessonItem() {
  return (
    <div className='lesson-item'>
      <div className='lesson-item__icon'>
        <PlayCircleOutlined />
      </div>
      <div className='lesson-item__lengths'>
        <div className='lesson-item__status'>draft</div>
        <div className='lesson-item__lengths-minutes'>00:00</div>
      </div>
      <div className='lesson-item__name'>Hello World</div>
      <div className='lesson-item__is-finished'>
        <CheckOutlined />
      </div>
    </div>
  );
}

export default LessonItem;

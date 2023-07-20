import React from 'react';
import './SectionItem.scss';
import { Button, Divider, Space } from 'antd';
const SectionItem = () => {
  return (
    <div className='section-item'>
      <div className='section-item__content'>
        <div className='section-item__number'>
          <h2 className='section-item__number-head'>01</h2>
        </div>
        <div className='section-item__info'>
          <h3 className='section-item__name'>Introduction</h3>
          <div className='section-item__btns'>
            <Space>
              <Button>Add Activity</Button>
              or
              <Button>Import activity</Button>
            </Space>
          </div>
        </div>
      </div>

      <Divider />
    </div>
  );
};

export default SectionItem;

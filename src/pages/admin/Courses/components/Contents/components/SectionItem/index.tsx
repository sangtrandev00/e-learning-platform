import React from 'react';
import './SectionItem.scss';
import { Button, Divider, Space } from 'antd';
import { ISection } from '../../../../../../../types/lesson.type';

type SectionItemProps = {
  section: ISection;
  index: number;
};

const SectionItem = (props: SectionItemProps) => {
  return (
    <div className='section-item'>
      <div className='section-item__content'>
        <div className='section-item__number'>
          <h2 className='section-item__number-head'>0{props.index + 1}</h2>
        </div>
        <div className='section-item__info'>
          <h3 className='section-item__name'>{props.section.name}</h3>
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

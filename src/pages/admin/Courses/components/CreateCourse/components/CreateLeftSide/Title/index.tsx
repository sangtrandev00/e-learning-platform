import React from 'react';
import { ReadOutlined } from '@ant-design/icons';
const TitlePreview = () => {
  return (
    <div className='title-preview'>
      <h2 className='title-preview__title'>Course title</h2>
      <div className='title-preview__icon'>
        <ReadOutlined />
      </div>
      <div className='title-preview__samples'>
        <h4 className='title-preview__samples-title'>Samle title</h4>
        <p className='title-preview__sample-content'>Machine Learning A - Z</p>
      </div>
    </div>
  );
};

export default TitlePreview;

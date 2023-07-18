import React from 'react';
import TitlePreview from './Title';
import SlugPreview from './Slug';
import AccessPreview from './Access';
import ThumbPreview from './Thumb';
import DeliveryPreview from './Delivery';
import PricePreview from './Price';
type Props = {
  dataSlide: string;
};
const CreateLeftSide = ({ dataSlide }: Props) => {
  return (
    <div className='create-left-side'>
      {dataSlide === 'course-title' && <TitlePreview />}
      {dataSlide === 'course-slug' && <SlugPreview />}
      {dataSlide === 'course-price' && <PricePreview />}
      {dataSlide === 'course-access' && <AccessPreview />}
      {dataSlide === 'course-thumb' && <ThumbPreview />}
      {dataSlide === 'course-delivery' && <DeliveryPreview />}
    </div>
  );
};

export default CreateLeftSide;

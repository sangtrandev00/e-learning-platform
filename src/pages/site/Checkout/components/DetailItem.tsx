import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetCourseQuery } from '../../client.service';
import { AccessStatus, CourseLevel, ICourse } from '../../../../types/course.type';
import { Skeleton } from 'antd';

type DetailItemProps = {
  courseId: string;
  onTotal: (finalPrice: number) => void;
};
// props: Props
const DetailItem = (props: DetailItemProps) => {
  const { data, isFetching } = useGetCourseQuery(props.courseId);

  let courseData: ICourse = {
    _id: '',
    name: '',
    description: '',
    price: 0,
    finalPrice: 0,
    access: AccessStatus.FREE,
    level: CourseLevel.BEGINNER,
    thumbnail: '',
    courseSlug: '',
    categoryId: {
      _id: '646781266859a50acfca8e93',
      name: 'Web'
    },
    userId: {
      _id: '6468a145401d3810494f4797',
      name: 'Nguyen Van A',
      avatar: ''
    }
  };

  console.log(data);

  if (data) {
    courseData = data.course;
  }

  const { name, finalPrice, thumbnail } = courseData;

  useEffect(() => {
    props.onTotal(finalPrice);
  }, [props, finalPrice]);

  return (
    <Fragment>
      {isFetching && <Skeleton />}
      {!isFetching && (
        <div className='checkout__orders-detail-item'>
          <div className='detail-item'>
            <img src={thumbnail} alt={name} className='detail-item__img' />
            <div className='detail-item__name'>{name}</div>
            <div className='detail-item__price'>${finalPrice}</div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DetailItem;

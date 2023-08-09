import { Fragment } from 'react';
import { BACKEND_URL } from '../../../../constant/backend-domain';

type DetailItemProps = {
  courseItem: {
    _id: string;
    name: string;
    thumbnail: string;
    finalPrice: number;
  };
  // onTotal: (finalPrice: number) => void;
};
// props: Props
const DetailItem = (props: DetailItemProps) => {
  // const { data, isFetching } = useGetCourseQuery(props.courseId);

  // let courseData: ICourse = {
  //   _id: '',
  //   name: '',
  //   description: '',
  //   price: 0,
  //   finalPrice: 0,
  //   access: AccessStatus.FREE,
  //   level: CourseLevel.BEGINNER,
  //   thumbnail: '',
  //   courseSlug: '',
  //   categoryId: {
  //     _id: '646781266859a50acfca8e93',
  //     name: 'Web'
  //   },
  //   userId: {
  //     _id: '6468a145401d3810494f4797',
  //     name: 'Nguyen Van A',
  //     avatar: ''
  //   }
  // };

  // console.log(data);

  // if (data) {
  //   courseData = data.course;
  // }

  // const { name, finalPrice, thumbnail } = courseData;

  // useEffect(() => {
  //   props.onTotal(finalPrice);
  // }, [props, finalPrice]);

  const courseItem = props.courseItem;

  const { name, finalPrice, thumbnail } = courseItem;

  let thumbnailUrl = '';
  if (thumbnail.startsWith('http')) {
    thumbnailUrl = thumbnail;
  } else {
    thumbnailUrl = `${BACKEND_URL}/${thumbnail}`;
  }

  return (
    <Fragment>
      {/* {isFetching && <Skeleton />} */}
      {/* {!isFetching && ( */}
      <div className='checkout__orders-detail-item'>
        <div className='detail-item'>
          <img src={thumbnailUrl} alt={name} className='detail-item__img' />
          <div className='detail-item__name'>{name}</div>
          <div className='detail-item__price'>${finalPrice}</div>
        </div>
      </div>
      {/* )} */}
    </Fragment>
  );
};

export default DetailItem;

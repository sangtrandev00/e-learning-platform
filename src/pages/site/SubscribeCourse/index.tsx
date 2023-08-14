import { Button } from 'antd';
import { Link, useParams } from 'react-router-dom';
import './SubscribeCourse.scss';

const SubsribeCourse = () => {
  const { courseId } = useParams();

  return (
    <div className='subscribe-course'>
      <div className='subscribe-course__wrapper container bg-slate-300'>
        <h2 className='subscribe-course__title'>Subscribe Course {courseId} sucessfully!</h2>
        <Link to={`/path-player/?courseId=${courseId as string}`}>
          <Button className='subscribe-course__btn'>Go to course now </Button>
        </Link>
      </div>
    </div>
  );
};

export default SubsribeCourse;

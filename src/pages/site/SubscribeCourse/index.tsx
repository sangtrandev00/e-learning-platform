import { Button } from 'antd';
import { Link, useParams } from 'react-router-dom';
import './SubscribeCourse.scss';

const SubsribeCourse = () => {
  const { courseId } = useParams();

  return (
    <div className='subscribe-course'>
      <div className='subscribe-course__wrapper container'>subscribe-course {courseId} </div>
      <Link to={`/path-player/?courseId=${courseId as string}`}>
        <Button>Go to course now </Button>
      </Link>
    </div>
  );
};

export default SubsribeCourse;

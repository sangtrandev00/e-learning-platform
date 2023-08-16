import { Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/store';
import { useGetLessonsBySectionIdEnrolledCourseQuery } from '../../../../../client.service';
import LessonItem from '../LessonItem';

interface LessonListProps {
  sectionId: string;
}

const PathPlayerLessonList = (props: LessonListProps) => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  const { data: lessonData, isFetching: isLessonFetching } = useGetLessonsBySectionIdEnrolledCourseQuery({
    sectionId: props.sectionId,
    userId: userId
  });

  console.log(lessonData);

  return (
    <div className='path-player__lesson-list'>
      {isLessonFetching && <Skeleton />}
      {!isLessonFetching &&
        lessonData?.lessons.map((lessonItem) => {
          return <LessonItem key={lessonItem._id} lessonItem={lessonItem} isFetching={isLessonFetching} />;
        })}

      {/* <div className='lesson-item'>
        <div className='lesson-item__icon'></div>
        <div className='lesson-item__lengths'>
          <div className='lesson-item__status'></div>
          <div className='lesson-item__lengths-minutes'></div>
        </div>
        <div className='lesson-item__name'>Certification</div>
        <div className='lesson-item__is-finished'></div>
      </div> */}
    </div>
  );
};

export default PathPlayerLessonList;

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

  return (
    <div className='path-player__lesson-list'>
      {isLessonFetching && <Skeleton />}
      {!isLessonFetching &&
        lessonData?.lessons.map((lessonItem) => {
          return <LessonItem key={lessonItem._id} lessonItem={lessonItem} isFetching={isLessonFetching} />;
        })}
    </div>
  );
};

export default PathPlayerLessonList;

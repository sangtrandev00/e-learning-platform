import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { useGetLessonsBySectionIdQuery } from '../../../client.service';
import { calcTotalLectures } from '../../../client.slice';
import CourseDetailLessonItem from '../LessonItem';

interface LessonListProps {
  sectionId: string;
}

const CourseDetailLessonList = (props: LessonListProps) => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  const { data: lessonData } = useGetLessonsBySectionIdQuery({
    sectionId: props.sectionId,
    userId
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calcTotalLectures(lessonData?.lessons.length || 0));
  }, [dispatch, lessonData?.lessons.length]);

  return (
    <div className='course-detail__lesson-list'>
      {lessonData?.lessons.map((lessonItem) => {
        return <CourseDetailLessonItem key={lessonItem._id} lessonItem={lessonItem} />;
      })}
    </div>
  );
};

export default CourseDetailLessonList;

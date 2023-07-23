import React, { useEffect } from 'react';
import { useGetLessonsBySectionIdQuery } from '../../../client.service';
import CourseDetailLessonItem from '../LessonItem';
import { useDispatch } from 'react-redux';
import { calcTotalLectures } from '../../../client.slice';

interface LessonListProps {
  sectionId: string;
}

const CourseDetailLessonList = (props: LessonListProps) => {
  const { data: lessonData, isFetching: isLessonFetching } = useGetLessonsBySectionIdQuery(props.sectionId);

  console.log(lessonData);

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

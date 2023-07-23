import React from 'react';
import LessonItem from '../LessonItem';
import { useGetLessonsBySectionIdQuery } from '../../../../../client.service';

interface LessonListProps {
  sectionId: string;
}

const PathPlayerLessonList = (props: LessonListProps) => {
  const { data: lessonData, isFetching: isLessonFetching } = useGetLessonsBySectionIdQuery(props.sectionId);

  console.log(lessonData);

  return (
    <div className='path-player__lesson-list'>
      {lessonData?.lessons.map((lessonItem) => {
        return <LessonItem key={lessonItem._id} lessonItem={lessonItem} />;
      })}
    </div>
  );
};

export default PathPlayerLessonList;

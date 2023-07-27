import React from 'react';
import LessonItem from '../LessonItem';
import { useGetLessonsBySectionIdQuery } from '../../../../../client.service';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/store';

interface LessonListProps {
  sectionId: string;
}

const PathPlayerLessonList = (props: LessonListProps) => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  const { data: lessonData, isFetching: isLessonFetching } = useGetLessonsBySectionIdQuery({
    sectionId: props.sectionId,
    userId: userId
  });

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

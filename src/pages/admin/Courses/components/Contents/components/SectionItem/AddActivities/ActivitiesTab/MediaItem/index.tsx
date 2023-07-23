import React from 'react';
import YoutubeMedia from './Youtube';
import { ILesson } from '../../../../../../../../../../types/lesson.type';
import AddLesson from '../../../../AddLesson';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../../../store/store';
import { useAddLessonMutation } from '../../../../../../../course.service';

const MediaItem = () => {
  const [addLesson, addLessonResult] = useAddLessonMutation();

  const sectionId = useSelector((state: RootState) => state.course.sectionId);

  const submitHandler = (formData: Omit<ILesson, '_id'>) => {
    const lessonData: Omit<ILesson, '_id'> = {
      name: formData.name,
      content: formData.content,
      access: formData.access,
      sectionId: sectionId,
      type: 'video',
      description: formData.description
    };

    addLesson(lessonData)
      .unwrap()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(addLessonResult);
  };

  return (
    <div className='media-item'>
      <YoutubeMedia />
      <YoutubeMedia />
      <YoutubeMedia />
      <YoutubeMedia />
      <YoutubeMedia />
      <YoutubeMedia />
      <AddLesson onSubmit={submitHandler} />
    </div>
  );
};

export default MediaItem;

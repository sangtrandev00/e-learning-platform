import { Button, Divider, Space } from 'antd';
import { ISection } from '../../../../../../../types/lesson.type';
import { useGetLessonsBySectionIdQuery } from '../../../../course.service';
import LessonItem from '../LessonItem';
import AddActivities from './AddActivities';
import './SectionItem.scss';

type SectionItemProps = {
  section: ISection;
  index: number;
};

const SectionItem = (props: SectionItemProps) => {
  // const userId = useSelector((state: RootState) => state.auth.admin);

  const { data, isFetching } = useGetLessonsBySectionIdQuery(props.section._id);
  console.log(data);

  return (
    <div className='section-item'>
      <div className='section-item__content'>
        <div className='section-item__number'>
          <h2 className='section-item__number-head'>0{props.index + 1}</h2>
        </div>
        <div className='section-item__info'>
          <h3 className='section-item__name'>{props.section.name}</h3>
          <div className='section-item__content'>
            {/* List lesson items here!!! */}
            {data?.lessons.map((lessonItem) => {
              return <LessonItem key={lessonItem._id} lesson={lessonItem} />;
            })}
          </div>
          <div className='section-item__btns'>
            <Space>
              <AddActivities sectionId={props.section._id} />
              or
              <Button>Import activity</Button>
            </Space>
          </div>
        </div>
      </div>

      <Divider />
    </div>
  );
};

export default SectionItem;

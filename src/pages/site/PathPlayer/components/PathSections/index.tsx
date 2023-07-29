import { Fragment } from 'react';
import LessonItem from './components/LessonItem';
import { Collapse, CollapseProps } from 'antd';
import './PathSections.scss';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGetLessonsBySectionIdQuery, useGetSectionsByCourseIdQuery } from '../../../client.service';
import PathPlayerLessonList from './components/LessonList';

type Props = {
  className: string;
  courseId: string;
};

const PathSections = (props: Props) => {
  const { data: sectionData, isFetching } = useGetSectionsByCourseIdQuery(props.courseId);

  // const {data: lessonData, isFetching: isLessonFetching} = useGetLessonsBySectionIdQuery()

  const sectionItems: CollapseProps['items'] = sectionData?.sections.map((sectionItem, index) => {
    const { _id, name, description, access } = sectionItem;
    const sectionTemplateItem = {
      key: _id,
      label: (
        <h3 className='section__title'>
          {index + 1} - {name}
        </h3>
      ),
      children: <PathPlayerLessonList sectionId={_id} />
    };
    return sectionTemplateItem;
  });

  const finalSectionItem = {
    key: 'final',
    label: (
      <div className='section__title'>
        <h3>Certification</h3>
      </div>
    ),
    children: <div>Got the certification here!!!</div>
  };

  if (sectionItems) {
    sectionItems.push(finalSectionItem);
  }

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <div className={props.className + ' path-sections'}>
      <div className='path-sections__wrap'>
        <div className='path-sections-item'>
          <div className='section'>
            {/* <h3 className='section__title'>1. Section 01 - How to deal with SEO page</h3> */}
            <div className='section__content'>
              <div className='section__content-item'>
                <Collapse
                  style={{ borderRadius: '0px' }}
                  items={sectionItems}
                  defaultActiveKey={['1']}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathSections;

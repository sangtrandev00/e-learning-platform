import { Button, Collapse, CollapseProps } from 'antd';
import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { useGetSectionsByCourseIdQuery } from '../../../client.service';
import CourseDetailLessonList from '../LessonList';
import './SectionList.scss';

type SectionListProps = {
  courseId: string;
};

const SectionList = (props: SectionListProps) => {
  const { data: sectionData, isFetching } = useGetSectionsByCourseIdQuery(props.courseId);

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const sectionItems: CollapseProps['items'] = sectionData?.sections.map((sectionItem, index) => {
    const { _id, name, description, access } = sectionItem;

    const sectionTemplateItem = {
      key: `${index}`,
      label: (
        <div className='section__title'>
          <h3>{name}</h3>
          <div className='section__summary'>13 lectures • 41min</div>
        </div>
      ),
      children: <CourseDetailLessonList sectionId={_id} />
    };
    return sectionTemplateItem;
  });

  return (
    <div className='course-detail__content-collapse'>
      <Collapse
        items={sectionItems}
        // defaultActiveKey={sectionData?.sections.map((sectionItem) => sectionItem._id)}
        defaultActiveKey={sectionData?.sections.map((sectionItem, index) => `${index}`)}
        onChange={onChange}
      />
      <Button className='course-detail__content-collapse-btn'>
        10 more section <DownOutlined />
      </Button>
    </div>
  );
};

export default SectionList;

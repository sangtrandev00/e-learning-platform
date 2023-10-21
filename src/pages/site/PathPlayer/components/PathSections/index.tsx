import { Collapse, CollapseProps, Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../../../../constant/backend-domain';
import { RootState } from '../../../../../store/store';
import { ICertificate } from '../../../../../types/certificate';
import { useGetSectionsByCourseIdQuery } from '../../../client.service';
import './PathSections.scss';
import PathPlayerLessonList from './components/LessonList';

type Props = {
  className: string;
  courseId: string;
  progressPercent: string;
  certificate: ICertificate | undefined;
};

const PathSections = (props: Props) => {
  const { data: sectionData, isFetching } = useGetSectionsByCourseIdQuery(props.courseId);
  const certificatePath = useSelector((state: RootState) => state.client.certificatePath);
  const currentProgress = useSelector((state: RootState) => state.client.currentProgress);

  const sectionItems: CollapseProps['items'] = sectionData?.sections.map((sectionItem, index) => {
    const { _id, name } = sectionItem;
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
    children:
      certificatePath && currentProgress === 1 ? (
        <Link target='_blank' to={`${BACKEND_URL}/images/${certificatePath}`}>
          Got the certification here!!!
        </Link>
      ) : (
        <div>Complete the videos first to get the certificate</div>
      )
  };

  if (sectionItems) {
    sectionItems.push(finalSectionItem);
  }

  return (
    <div className={props.className + ' path-sections'}>
      <div className='path-sections__wrap'>
        <div className='path-sections-item'>
          <div className='section'>
            {/* <h3 className='section__title'>1. Section 01 - How to deal with SEO page</h3> */}
            <div className='section__content'>
              {isFetching && <Skeleton />}
              {!isFetching && (
                <div className='section__content-item'>
                  <Collapse style={{ borderRadius: '0px' }} items={sectionItems} defaultActiveKey={['1']} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathSections;

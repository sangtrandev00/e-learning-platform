import { Fragment } from 'react';
import LessonItem from './components/LessonItem';
import { Collapse, CollapseProps } from 'antd';
type Props = {
  className: string;
};
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: <h3 className='section__title'>1. Section 01 - How to deal with SEO page</h3>,
    children: (
      <Fragment>
        <LessonItem />
        <LessonItem />
      </Fragment>
    )
  },
  {
    key: '2',
    label: <h3 className='section__title'>2. Section 02 - How to deal with SEO page</h3>,
    children: (
      <Fragment>
        <LessonItem />
        <LessonItem />
      </Fragment>
    )
  },
  {
    key: '3',
    label: <h3 className='section__title'>3. Section 03 - How to deal with SEO page</h3>,
    children: (
      <Fragment>
        <LessonItem />
        <LessonItem />
      </Fragment>
    )
  }
];

const PathSections = (props: Props) => {
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
                <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />;
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathSections;

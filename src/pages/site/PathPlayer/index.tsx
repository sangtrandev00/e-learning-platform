import { ArrowLeftOutlined, DoubleLeftOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Col, Progress, Row, Tabs, TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { RootState } from '../../../store/store';
import { useGetCourseEnrolledByUserQuery } from '../client.service';
import './PathPlayer.scss';
import Discusses from './components/Discusses';
import Learners from './components/Learners';
import Notes from './components/Notes';
import PathSections from './components/PathSections';
import PlayerScreen from './components/PlayerScreen/PlayerScreen';
// type Props = {};
// props: Props

const PathPlayer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');

  const { data, isFetching, refetch } = useGetCourseEnrolledByUserQuery(courseId as string);

  const progressPercent = ((data?.course.progress || 0) * 100).toFixed(2);
  const [currProgress, setCurrProgress] = useState(progressPercent);
  const lessonId = useSelector((state: RootState) => state.client.lessonId);
  const isLessonDone = useSelector((state: RootState) => state.client.isLessonDone);

  // Handle change progress when player finish the current lesson (watching!)
  useEffect(() => {
    console.log('update lesson here at local state, at path player set progress ', isLessonDone);

    // Refetch data here
    refetch()
      .then((result) => {
        console.log('refetch succuefully!', result);
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  }, [isLessonDone, refetch]);

  const tabItems: TabsProps['items'] = [
    {
      key: 'pathsections',
      label: `Path`,
      children: <PathSections courseId={courseId as string} className='path-player__menu-content' />
    },
    {
      key: 'discuss',
      label: `Discuss`,
      children: <Discusses className='path-player__menu-content' />
    },
    {
      key: 'learners',
      label: `Learners`,
      children: <Learners className='path-player__menu-content' />
    },
    {
      key: 'note',
      label: `Note`,
      children: <Notes className='path-player__menu-content' />
    }
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div className='path-player'>
      <div className='path-player__wrap'>
        <Row>
          <Col md={6}>
            <div className='path-player__menu'>
              {/* Menu Header  */}
              <div className='path-player__menu-header'>
                <div className='path-player__menu-header-nav'>
                  <Link className='path-player__menu-header-nav-back' to='/'>
                    <ArrowLeftOutlined className='path-player__menu-header-nav-back-icon' /> Back to course page
                  </Link>
                  <Button className='path-player__menu-header-nav-collapse'>
                    <DoubleLeftOutlined className='path-player__menu-header-nav-collapse-btn' />
                  </Button>
                </div>
                <h3 className='path-player__menu-header-title'>{data?.course.name}</h3>
                <div className='path-player__menu-progress'>
                  <Progress percent={progressPercent as unknown as number} status='active' />
                </div>
              </div>
              {/* Menu Content  */}
              <div className='path-player__menu-tabs'>
                <Tabs defaultActiveKey='pathsections' items={tabItems} onChange={onChange} />
              </div>
            </div>
          </Col>
          <Col md={18}>
            <div className='path-player__player'>
              <div className='path-player__player-nav'>
                <div className='path-player__player-nav-item'>
                  <LeftOutlined /> Previous
                </div>
                <div className='path-player__player-nav-item'>
                  Next <RightOutlined />
                </div>
              </div>
              <div className='path-player__player-screen'>
                <PlayerScreen />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PathPlayer;

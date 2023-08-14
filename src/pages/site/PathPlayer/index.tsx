import { ArrowLeftOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Col, Progress, Row, Skeleton, Tabs, TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { RootState } from '../../../store/store';
import {
  useCreateCertificateMutation,
  useGetCertificateQuery,
  useGetCourseEnrolledByUserQuery
} from '../client.service';
import { startPlayingVideo } from '../client.slice';
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
  const userId = useSelector<RootState, string>((state: RootState) => state.auth.userId);
  const { data, isFetching, refetch } = useGetCourseEnrolledByUserQuery(courseId as string);
  const dispatch = useDispatch();
  console.log('data course watching: ', data);

  const [createCertificate, createCertificateResult] = useCreateCertificateMutation();

  const cerficiateParams = {
    userId,
    courseId: courseId || ''
  };

  const { data: certificateData, isFetching: isFetchingCertificate } = useGetCertificateQuery(cerficiateParams);

  const progressPercent = ((data?.course.progress || 0) * 100).toFixed(2);
  const [currProgress, setCurrProgress] = useState(progressPercent);
  const [isCreated, setIsCreated] = useState(false);
  const lessonId = useSelector((state: RootState) => state.client.lessonId);
  const isLessonDone = useSelector((state: RootState) => state.client.isLessonDone);

  console.log('certificate data: ', certificateData);

  const isCreateNewCertificate =
    Number(progressPercent) === 100 && !certificateData?.certificate && isFetchingCertificate === false;

  console.log('is create new certificate: ', isCreateNewCertificate);

  useEffect(() => {
    if (isCreateNewCertificate && !isCreated) {
      const newCertificate = {
        userId,
        courseId: courseId || '',
        completionDate: new Date().toISOString()
      };

      console.log('create new: ', newCertificate);
      console.log('result: ', createCertificateResult);
      createCertificate(newCertificate)
        .unwrap()
        .then((result) => {
          console.log('create certificate successfully!', result);

          setIsCreated(true);

          refetch()
            .then((result) => {
              console.log('result: ', result);
            })
            .catch((error) => {
              console.log('eror: ', error);
            });
        })
        .catch((error) => {
          console.log('error: ', error);
        });
    }
  }, [isCreateNewCertificate, isCreated]);

  // Handle change progress when player finish the current lesson (watching!)
  useEffect(() => {
    console.log('update lesson here at local state, at path player set progress ', isLessonDone);

    // Refetch data here
    refetch()
      .then((result) => {
        console.log('refetch successfully!', result);
        console.log('done: ', isLessonDone);
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  }, [isLessonDone, refetch]);

  // First initital first lesson of course

  useEffect(() => {
    console.log('first initial lesson of course');

    console.log('lesson id: ', data?.course.lessons[0]._id);
    console.log('content: ', data?.course.lessons[0].content);

    // dispatch(
    dispatch(
      startPlayingVideo({
        lessonId: data?.course.lessons[0]._id as string,
        content: data?.course.lessons[0].content as string
      })
    );
  }, [data?.course.lessons, dispatch]);

  const tabItems: TabsProps['items'] = [
    {
      key: 'pathsections',
      label: `Path`,
      children: (
        <PathSections
          courseId={courseId as string}
          progressPercent={progressPercent}
          certificate={certificateData?.certificate}
          className='path-player__menu-content'
        />
      )
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
        <Row className='path-player__row'>
          <Col md={24} lg={6} xl={6}>
            <div className='path-player__menu'>
              {/* Menu Header  */}
              <div className='path-player__menu-header'>
                <div className='path-player__menu-header-nav'>
                  <Link className='path-player__menu-header-nav-back' to='/start'>
                    <ArrowLeftOutlined className='path-player__menu-header-nav-back-icon' /> Back to course page
                  </Link>
                  {/* <Button className='path-player__menu-header-nav-collapse'>
                    <DoubleLeftOutlined className='path-player__menu-header-nav-collapse-btn' />
                  </Button> */}
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
          <Col md={24} lg={18} xl={18}>
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
                {isFetching && <Skeleton />}
                {!isFetching && <PlayerScreen />}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PathPlayer;

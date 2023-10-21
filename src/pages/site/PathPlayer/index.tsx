import { ArrowLeftOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Col, Progress, Row, Skeleton, Tabs, TabsProps, notification } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { RootState } from '../../../store/store';
import {
  useCreateCertificateMutation,
  useGetCertificateQuery,
  useGetCourseEnrolledByUserQuery
} from '../client.service';
import {
  createCertificatePath,
  initCurrentProgress,
  initLessonsDoneOfCourse,
  startPlayingVideo
} from '../client.slice';
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

  const { data, isFetching } = useGetCourseEnrolledByUserQuery(courseId as string);
  const dispatch = useDispatch();
  const [createCertificate, createCertificateResult] = useCreateCertificateMutation();

  const cerficiateParams = {
    userId,
    courseId: courseId || ''
  };

  const { data: certificateData, isFetching: isFetchingCertificate } = useGetCertificateQuery(cerficiateParams);

  const progressPercent = ((data?.course.progress || 0) * 100).toFixed(2);
  const [currProgress, setCurrProgress] = useState(Number(progressPercent));

  const lessonIdsDone = useSelector((state: RootState) => state.client.lessonIdsDoneByCourseId);

  // const isLessonDone = useSelector((state: RootState) => state.client.isLessonDone);

  const isCreateNewCertificate = useMemo(() => {
    return currProgress === 100 && !certificateData?.certificate && isFetchingCertificate === false;
  }, [currProgress, certificateData?.certificate, isFetchingCertificate]);

  // Test demo create certificate:

  useEffect(() => {
    if (isCreateNewCertificate) {
      const newCertificate = {
        userId,
        courseId: courseId || '',
        completionDate: new Date().toISOString()
      };

      createCertificate(newCertificate)
        .unwrap()
        .then((result) => {
          console.log('create certificate successfully!', result);
          notification.success({
            message:
              'Congratulation! You have completed the course. Let check the certificate section to get your achievement!'
          });

          const { certificate } = result;

          dispatch(createCertificatePath(certificate.certificateName));
        })
        .catch((error) => {
          console.log('error: ', error);
        });
    }
  }, [isCreateNewCertificate]);

  // First initital first lesson of course

  useEffect(() => {
    // console.log('lesson id: ', data?.course.lessons[0]._id || '');
    // console.log('content: ', data?.course.lessons[0].content || '');
    let currentPlayingVideo = {
      lessonId: '',
      content: ''
    };

    if (data?.course && data?.course.lessons.length > 0 && !isFetching) {
      currentPlayingVideo = {
        lessonId: data?.course.lessons[0]._id,
        content: data?.course.lessons[0].content
      };
    }

    let certificateName = '';

    if (certificateData?.certificate) {
      certificateName = certificateData?.certificate.certificateName;
    }

    dispatch(startPlayingVideo(currentPlayingVideo));

    dispatch(initLessonsDoneOfCourse(data?.course.lessonsDone || []));

    dispatch(initCurrentProgress(data?.course.progress || 0));

    dispatch(createCertificatePath(certificateName));
  }, [
    data?.course,
    data?.course.lessons,
    data?.course.lessonsDone,
    data?.course.progress,
    dispatch,
    certificateData?.certificate,
    isFetching
  ]);

  // See effect change of progress
  useEffect(() => {
    const totalLessonsDone = lessonIdsDone.length;
    const lessonsOfCourse = data?.course.lessons.length;
    let progress = 0;
    if (lessonsOfCourse) {
      progress = (totalLessonsDone / lessonsOfCourse) * 100;
    }
    setCurrProgress(progress);
  }, [data?.course.lessons.length, lessonIdsDone.length]);

  const tabItems: TabsProps['items'] = [
    {
      key: 'pathsections',
      label: `Path`,
      children: (
        <PathSections
          courseId={courseId as string}
          progressPercent={currProgress.toString()}
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
                  <Progress percent={currProgress as unknown as number} status='active' />
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

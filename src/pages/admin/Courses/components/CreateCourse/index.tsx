import { Button, Col, Modal, Row, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { useEffect, useState } from 'react';
import { openCreateCourse } from '../../course.slice';
import { ReadOutlined } from '@ant-design/icons';
import CreateRightSide from './components/CreateRightSide';
import './CreateCourse.scss';
import { AccessStatus, ICourse, CourseLevel } from '../../../../../types/course.type';
import CreateLeftSide from './components/CreateLeftSide';
import { useAddCourseMutation } from '../../course.service';

const initStateCourse: ICourse = {
  _id: '',
  name: '',
  description: '',
  price: 0,
  finalPrice: 0,
  access: AccessStatus.FREE,
  level: CourseLevel.BEGINNER,
  thumbnail: '',
  courseSlug: '',
  categoryId: {
    _id: '',
    name: ''
  },
  userId: {
    _id: '',
    name: '',
    avatar: ''
  }
};

const orderCreateForm = [
  'course-title',
  'course-slug',
  'course-access',
  'course-price',
  'course-thumb',
  'course-delivery'
];

const CreateCourse = () => {
  const isOpen = useSelector((state: RootState) => state.course.isOpenCreateCourse);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const formData = useSelector((state: RootState) => state.course.formData);
  const [addCourse, addCourseResult] = useAddCourseMutation();

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  const handleNextSlide = () => {
    if (currentSlideIdx < orderCreateForm.length - 1) {
      setCurrentSlideIdx((prev) => prev + 1);
    }
  };

  const handleFinished = () => {
    addCourse(formData)
      .unwrap()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePrevSlide = () => {
    if (currentSlideIdx > 0) {
      setCurrentSlideIdx((prev) => prev - 1);
    }
  };

  return (
    <div className='create-course'>
      <Modal
        className='create-course__modal'
        centered
        open={open}
        onOk={() => dispatch(openCreateCourse(false))}
        onCancel={() => dispatch(openCreateCourse(false))}
        width={1000}
        bodyStyle={{
          height: '50rem'
        }}
      >
        <Row className='create-course__row'>
          <Col className='create-course__col create-course__col--left' md={10}>
            <div className='create-course__left-bar'>
              <div className='left-bar'>
                <CreateLeftSide dataSlide={orderCreateForm[currentSlideIdx]} />
              </div>
            </div>
          </Col>
          <Col className='create-course__col create-course__col--right' md={14}>
            <div className='create-course__data'>
              <form action='' className='create-course__form'>
                <div className='create-course__form-wrap'>
                  <CreateRightSide dataSlide={orderCreateForm[currentSlideIdx]} />
                  <div className='carousel-navigator'>
                    <Space>
                      <div className='carousel-navigator__prev'>
                        <Button onClick={handlePrevSlide}>Previous</Button>
                      </div>
                      <div className='carousel-navigator__dots'>
                        {/* <PlusCircleOutlined />
                            <PlusCircleOutlined />
                            <PlusCircleOutlined />
                            <PlusCircleOutlined />
                            <PlusCircleOutlined /> */}
                        <span className='carousel-navigator__dots-item'></span>
                        <span className='carousel-navigator__dots-item'></span>
                        <span className='carousel-navigator__dots-item'></span>
                        <span className='carousel-navigator__dots-item'></span>
                      </div>
                      <div className='carousel-navigator__next'>
                        {currentSlideIdx === orderCreateForm.length - 1 ? (
                          <Button onClick={handleFinished}>Finished</Button>
                        ) : (
                          <Button onClick={handleNextSlide}>Next</Button>
                        )}
                      </div>
                    </Space>
                  </div>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default CreateCourse;

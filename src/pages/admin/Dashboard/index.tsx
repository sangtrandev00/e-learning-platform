import {
  CalendarOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  FolderOpenOutlined,
  FundOutlined,
  ReadOutlined,
  RetweetOutlined,
  StockOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  WechatOutlined
} from '@ant-design/icons';
import { Button, Col, Row, Select, Statistic } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../store/store';
import { useGetSummaryReportsQuery } from '../report.service';
import { selectPreviousDays, showChart } from '../report.slice';
import './Dashboard.scss';
import Chart from './components/Chart';

const statisticItemStyle = {};

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();

  const { data: summaryReportsData } = useGetSummaryReportsQuery();

  const chartName = useSelector((state: RootState) => state.report.chartName);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);

    dispatch(selectPreviousDays(Number(value)));
  };

  const showNewUserSignupsChart = () => {
    console.log('showNewUserSignupsChart');

    dispatch(showChart('new-signups'));
  };

  const showRevenuesChart = () => {
    console.log('showRevenuesChart');
    dispatch(showChart('revenues'));
  };

  const showCourseSalesChart = () => {
    console.log('showCourseSalesChart');
    dispatch(showChart('course-sales'));
  };

  return (
    <div className='dashboard'>
      <div className='dashboard__summary'>
        <Row className='dashboard__summary-row'>
          <Col className='dashboard__summary-col' md={16}>
            <div className='dashboard__chart'>
              <div className='dashboard__chart-header'>
                <div className='dashboard__chart-header-logo'>
                  <CalendarOutlined className='dashboard__chart-header-logo-icon' />
                  <span className='dashboard__chart-header-logo-text'>Your Academy</span>
                </div>
                <div className='dashboard__chart-header-nav'>
                  <Button
                    type={chartName === 'new-signups' ? 'primary' : 'default'}
                    ghost={chartName === 'new-signups' ? true : false}
                    className='dashboard__chart-header-nav-item'
                    onClick={showNewUserSignupsChart}
                  >
                    New signups
                  </Button>
                  <Button
                    type={chartName === 'revenues' ? 'primary' : 'default'}
                    ghost={chartName === 'revenues' ? true : false}
                    className='dashboard__chart-header-nav-item'
                    onClick={showRevenuesChart}
                  >
                    Revenue
                  </Button>
                  <Button
                    type={chartName === 'course-sales' ? 'primary' : 'default'}
                    ghost={chartName === 'course-sales' ? true : false}
                    className='dashboard__chart-header-nav-item'
                    onClick={showCourseSalesChart}
                  >
                    Course sales
                  </Button>
                  {/* <Button className='dashboard__chart-header-nav-item'>Active learners</Button> */}
                  <Select
                    className='dashboard__chart-header-nav-item dashboard__chart-header-nav-item--select'
                    defaultValue='7'
                    style={{ width: 120, backgroundColor: '#EBEBEB' }}
                    onChange={handleChange}
                    options={[
                      { value: '7', label: 'Last 7 days' },
                      { value: '30', label: 'Last 30 days' },
                      { value: '60', label: 'Last 60 days' },
                      { value: 'all', label: 'All' }
                    ]}
                  />
                </div>
              </div>

              <div className='dashboard__chart-body'>
                <Chart />
              </div>
            </div>
          </Col>
          <Col className='dashboard__summary-col' md={8}>
            <div className='dashboard__statistic'>
              <Row className='dashboard__statistic-row'>
                <Col md={8}>
                  <Link to='/author/users'>
                    <Statistic
                      className='dashboard__statistic-item'
                      valueStyle={statisticItemStyle}
                      title='All Users'
                      value={summaryReportsData?.reports.users}
                      prefix={<UsergroupAddOutlined />}
                    />
                  </Link>
                </Col>
                <Col md={8}>
                  <Statistic
                    className='dashboard__statistic-item'
                    valueStyle={statisticItemStyle}
                    title='Conversation'
                    value={`${summaryReportsData?.reports.conversions || 0}%`}
                    prefix={<RetweetOutlined />}
                  />
                </Col>
                <Col md={8}>
                  <Link to='/author/orders?days=30'>
                    <Statistic
                      className='dashboard__statistic-item'
                      valueStyle={statisticItemStyle}
                      title='30 days sales'
                      value={summaryReportsData?.reports.saleOf30days}
                      prefix={<DollarOutlined />}
                    />
                  </Link>
                </Col>
                <Col md={8}>
                  <Statistic
                    className='dashboard__statistic-item'
                    valueStyle={statisticItemStyle}
                    title='Avg time'
                    value={`${summaryReportsData?.reports.avgTimeLearningPerUser || 0} min`}
                    prefix={<ClockCircleOutlined />}
                  />
                </Col>
                <Col md={8}>
                  <Link to='/author/courses'>
                    <Statistic
                      className='dashboard__statistic-item'
                      valueStyle={statisticItemStyle}
                      title='Courses'
                      value={summaryReportsData?.reports.courses}
                      prefix={<ReadOutlined />}
                    />
                  </Link>
                </Col>
                <Col md={8}>
                  <Link to='/author/categories'>
                    <Statistic
                      className='dashboard__statistic-item'
                      valueStyle={statisticItemStyle}
                      title='Course categories'
                      value={summaryReportsData?.reports.categories}
                      prefix={<FolderOpenOutlined />}
                    />
                  </Link>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>

      <div className='dashboard__latest'>
        <Row gutter={10}>
          {/* User */}
          <Col md={6}>
            <div className='dashboard__latest-users dashboard__latest-item'>
              <div className='latest-users'>
                <div className='latest-users__header dashboard__latest-item-header'>
                  <UserOutlined className='latest-users__header-icon dashboard__latest-item-header-icon' />
                  <h3 className='latest-users__header-title dashboard__latest-item-header-title'>New users</h3>
                  <a href='#' className='latest-users__header-view-all dashboard__latest-item-header-view-all'>
                    see all
                  </a>
                </div>
                <div className='latest-users__body dashboard__latest-item-body'>
                  {/* Mapp all news users here!!! */}

                  <div className='latest-users__item'>
                    <img
                      alt=''
                      src='https://lwfiles.mycourse.app/648eaf1c0c0c35ee7db7e0a2-public/avatars/thumbs/648eaf1c0c0c35ee7db7e0a3.jpg'
                      className='latest-users__item-avatar'
                    ></img>
                    <div className='latest-users__item-info'>
                      <div className='latest-users__item-name'>Tran Nhat Sang</div>
                      <div className='latest-users__item-time'>1 month</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          {/* Posts */}
          <Col md={6}>
            <div className='dashboard__latest-posts dashboard__latest-item'>
              <div className='latest-posts'>
                <div className='latest-posts__header dashboard__latest-item-header'>
                  <FundOutlined className='latest-posts__header-icon dashboard__latest-item-header-icon' />
                  <h3 className='latest-posts__header-title dashboard__latest-item-header-title'>Latest posts</h3>
                  <a href='#' className='latest-posts__header-view-all dashboard__latest-item-header-view-all'>
                    see all
                  </a>
                </div>
                <div className='latest-posts__body dashboard__latest-item-body'>
                  <div className='latest-posts__item'>
                    <WechatOutlined className='latest-posts__item-icon' />
                    <div className='latest-posts__item-info'>
                      <a href='#' className='latest-posts__item-name'>
                        Tran Nhat Sang
                      </a>{' '}
                      <span className='latest-posts__item-action'>Said</span>
                      <div className='latest-posts__item-content'>
                        <a href='#' className='latest-posts__item-text'>
                          Hello world What ?
                        </a>
                      </div>
                    </div>
                    <div className='latest-posts__item-time'>5 days</div>
                  </div>
                  <div className='latest-posts__item'>
                    <WechatOutlined className='latest-posts__item-icon' />
                    <div className='latest-posts__item-info'>
                      <a href='#' className='latest-posts__item-name'>
                        Tran Nhat Sang
                      </a>{' '}
                      <span className='latest-posts__item-action'>Said</span>
                      <div className='latest-posts__item-content'>
                        <a href='#' className='latest-posts__item-text'>
                          Hello world What ?
                        </a>
                      </div>
                    </div>
                    <div className='latest-posts__item-time'>5 days</div>
                  </div>
                  <div className='latest-posts__item'>
                    <WechatOutlined className='latest-posts__item-icon' />
                    <div className='latest-posts__item-info'>
                      <a href='#' className='latest-posts__item-name'>
                        Tran Nhat Sang
                      </a>{' '}
                      <span className='latest-posts__item-action'>Said</span>
                      <div className='latest-posts__item-content'>
                        <a href='#' className='latest-posts__item-text'>
                          Hello world What ?
                        </a>
                      </div>
                    </div>
                    <div className='latest-posts__item-time'>5 days</div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          {/* Events Log */}
          <Col md={6}>
            <div className='dashboard__latest-users dashboard__latest-item'>
              <div className='latest-users'>
                <div className='latest-users__header dashboard__latest-item-header'>
                  <StockOutlined className='latest-users__header-icon dashboard__latest-item-header-icon' />
                  <h3 className='latest-users__header-title dashboard__latest-item-header-title'>Events Log</h3>
                  <a href='#' className='latest-users__header-view-all dashboard__latest-item-header-view-all'>
                    see all
                  </a>
                </div>
                <div className='latest-users__body dashboard__latest-item-body'>
                  <div className='latest-users__item'>
                    <img
                      title='latest-users__item-avata'
                      src='https://lwfiles.mycourse.app/648eaf1c0c0c35ee7db7e0a2-public/avatars/thumbs/648eaf1c0c0c35ee7db7e0a3.jpg'
                      className='latest-users__item-avatar'
                    ></img>
                    <div className='latest-users__item-info'>
                      <div className='latest-users__item-name'>Tran Nhat Sang</div>
                      <div className='latest-users__item-time'>1 month</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          {/* Latest posts */}
          <Col md={6}>
            <div className='dashboard__online-users dashboard__latest-item'>
              <div className='online-users'>
                <div className='online-users__header dashboard__latest-item-header'>
                  <UserOutlined className='online-users__header-icon dashboard__latest-item-header-icon' />
                  <h3 className='online-users__header-title dashboard__latest-item-header-title'>Online Users</h3>
                </div>
                <div className='online-users__body dashboard__latest-item-body'>
                  <div className='online-users__item'>
                    {/* <img
                      src='https://lwfiles.mycourse.app/648eaf1c0c0c35ee7db7e0a2-public/avatars/thumbs/648eaf1c0c0c35ee7db7e0a3.jpg'
                      className='online-users__item-avatar'
                    ></img>
                    <div className='online-users__item-info'>
                      <div className='online-users__item-name'>Tran Nhat Sang</div>
                      <div className='online-users__item-time'>1 month</div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;

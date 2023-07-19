import { Breadcrumb, Button, Col, Row, Select, Space, Statistic } from 'antd';
import React from 'react';
import {
  CalendarOutlined,
  LikeOutlined,
  UsergroupAddOutlined,
  ReloadOutlined,
  RetweetOutlined,
  DollarOutlined,
  FolderOpenOutlined,
  ReadOutlined,
  ClockCircleOutlined,
  UserOutlined,
  WechatOutlined,
  StockOutlined,
  FundOutlined
} from '@ant-design/icons';
import './Dashboard.scss';
import Chart from './components/Chart';

const statisticItemStyle = {};

const Dashboard: React.FC = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
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
                  <Button className='dashboard__chart-header-nav-item'>New signups</Button>
                  <Button className='dashboard__chart-header-nav-item'>Revenue</Button>
                  <Button className='dashboard__chart-header-nav-item'>Product sales</Button>
                  <Button className='dashboard__chart-header-nav-item'>Active learners</Button>
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
                  <Statistic
                    className='dashboard__statistic-item'
                    valueStyle={statisticItemStyle}
                    title='All Users'
                    value={10}
                    prefix={<UsergroupAddOutlined />}
                  />
                </Col>
                <Col md={8}>
                  <Statistic
                    className='dashboard__statistic-item'
                    valueStyle={statisticItemStyle}
                    title='Conversation'
                    value={`50%`}
                    prefix={<RetweetOutlined />}
                  />
                </Col>
                <Col md={8}>
                  <Statistic
                    className='dashboard__statistic-item'
                    valueStyle={statisticItemStyle}
                    title='30 days sales'
                    value={1128}
                    prefix={<DollarOutlined />}
                  />
                </Col>
                <Col md={8}>
                  <Statistic
                    className='dashboard__statistic-item'
                    valueStyle={statisticItemStyle}
                    title='Avg time'
                    value={`20 min`}
                    prefix={<ClockCircleOutlined />}
                  />
                </Col>
                <Col md={8}>
                  <Statistic
                    className='dashboard__statistic-item'
                    valueStyle={statisticItemStyle}
                    title='Courses'
                    value={15}
                    prefix={<ReadOutlined />}
                  />
                </Col>
                <Col md={8}>
                  <Statistic
                    className='dashboard__statistic-item'
                    valueStyle={statisticItemStyle}
                    title='Course categories'
                    value={3}
                    prefix={<FolderOpenOutlined />}
                  />
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
                  <div className='latest-users__item'>
                    <img
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

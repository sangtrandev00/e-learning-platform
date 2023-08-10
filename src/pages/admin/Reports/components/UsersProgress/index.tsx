import { Button, Col, Input, InputNumber, Row, Select } from 'antd';
import './UsersProgress.scss';
import UsersProgressTable from './components/UserProgressTable';
const UsersProgress = () => {
  const selectCourseChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const courseSearchChange = (value: string) => {
    console.log('search:', value);
  };

  const avgScoreSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const progressSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const avgScorePercentChange = (value: number | null) => {
    console.log('changed', value);
  };

  return (
    <div className='users-progress'>
      <div className='users-progress__wrap'>
        <Row className='users-progress__row' gutter={16}>
          <Col className='users-progress__col users-progress__select-course' md={12}>
            <h3 className='users-progress__select-course-title'>Select a course</h3>
            {/* Select course */}
            <Row className='users-progress__select-course-row'>
              <Col md={6}>Select a course</Col>
              <Col md={12}>
                <Select
                  showSearch
                  placeholder='Select a course'
                  optionFilterProp='children'
                  onChange={selectCourseChange}
                  onSearch={courseSearchChange}
                  filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                  options={[
                    {
                      value: 'jack',
                      label: 'Jack'
                    },
                    {
                      value: 'lucy',
                      label: 'Lucy'
                    },
                    {
                      value: 'tom',
                      label: 'Tom'
                    }
                  ]}
                />
              </Col>
            </Row>

            {/* With average score */}
            <Row className='users-progress__select-course-row'>
              <Col md={6}>With average score</Col>
              <Col md={12}>
                <Select
                  defaultValue='lucy'
                  style={{ width: 120 }}
                  onChange={avgScoreSelectChange}
                  options={[
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' },
                    { value: 'disabled', label: 'Disabled', disabled: true }
                  ]}
                />
                <InputNumber min={0} max={100} defaultValue={3} onChange={avgScorePercentChange} />
              </Col>
            </Row>

            {/* With progress */}
            <Row className='users-progress__select-course-row'>
              <Col md={6}>With progress</Col>
              <Col md={12}>
                <Select
                  defaultValue='more than'
                  style={{ width: 120 }}
                  onChange={progressSelectChange}
                  options={[
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' },
                    { value: 'disabled', label: 'Disabled', disabled: true }
                  ]}
                />
                <InputNumber
                  placeholder='Ex: 80%'
                  min={0}
                  max={100}
                  defaultValue={0}
                  onChange={avgScorePercentChange}
                />
              </Col>
            </Row>

            {/* Is Completed */}

            <Row className='user-pgoress__select-course-row'>
              <Col md={6}>Is Completed</Col>
              <Col md={12}>
                <Select
                  style={{ width: 200 }}
                  onChange={progressSelectChange}
                  options={[
                    { value: 'jack', label: 'Completed ' },
                    { value: 'lucy', label: 'Not Completed' },
                    { value: 'Yiminghe', label: 'yiminghe' }
                  ]}
                />
              </Col>
            </Row>
          </Col>
          <Col className='users-progress__col users-progress__select-user' md={12}>
            <h3 className='users-progress__select-user-title'>Select users</h3>
            <Row className='user-progress__select-user-row'>
              <Col md={6}>Email contains</Col>
              <Col md={12}>
                <Input placeholder='Enter email (min 3 charcter)' />
              </Col>
            </Row>
            {/* User name contains */}
            <Row className='user-progress__select-user-row'>
              <Col md={6}>User name contains</Col>
              <Col md={12}>
                <Input placeholder='Ex: user name' />
              </Col>
            </Row>

            {/* have tag */}

            <Row className='user-progress__select-user-row'>
              <Col md={6}>Have tag</Col>
              <Col md={12}>
                <Select
                  options={[
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' }
                  ]}
                  placeholder='Ex: tag'
                />
              </Col>
            </Row>
            {/* Registered */}
            <Row className='user-progress__select-user-row'>
              <Col md={6}>Have tag</Col>
              <Col md={12}>
                <Select
                  options={[
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' }
                  ]}
                  placeholder='Exactly'
                />
              </Col>
            </Row>
          </Col>

          {/* Apply filters - reset filters */}

          <div className='users-progress__btns'>
            <Button className='users-progress__btns-filter'>Apply filters</Button>
            <Button className='users-progress__btns-reset'>Reset filters</Button>
          </div>
        </Row>
        {/* Showing results of table */}
        <div className='users-progress__filter-result'>Showing 1 to 2 users out of 2</div>

        <div className='users-progress__table'>
          <UsersProgressTable />
        </div>
      </div>
    </div>
  );
};

export default UsersProgress;

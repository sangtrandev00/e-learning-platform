import { Button, Result } from 'antd';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './OrderCompleted.scss';
const OrderCompleted: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get('orderId');

  return (
    <Result
      className='order-completed'
      status='success'
      title='Successfully Orderd Courses'
      subTitle={`Order number: ${orderId as string} Cloud server configuration takes 1-5 minutes, please wait.`}
      extra={[
        <Button type='primary' key='console'>
          <Link to='/start'>Go To My Learning</Link>
        </Button>,
        <Button key='buy'>Buy Again</Button>
      ]}
    />
  );
};

export default OrderCompleted;

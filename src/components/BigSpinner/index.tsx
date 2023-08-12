import { Button, Modal, Spin } from 'antd';

// type Props = {}

const BigSpinner = () => {
  return (
    <div>
      <Button type='primary'>Open Modal</Button>
      <Modal title='Basic Modal' open={true}>
        <Spin size='large' />
        <div>Big spinner</div>
      </Modal>

      <div>Big spinner</div>
    </div>
  );
};

export default BigSpinner;

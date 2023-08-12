import { Button, Result } from 'antd';
import { useNavigate, useRouteError } from 'react-router-dom';
import './404Error.scss';
interface ErrorProps {
  page: string;
}

export default function ErrorPage(props: ErrorProps) {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(error);

  return (
    <div className='error-404 mt-md'>
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={
          <Button onClick={() => navigate(`${props.page}`)} type='primary'>
            Back Home
          </Button>
        }
      />
    </div>
  );
}

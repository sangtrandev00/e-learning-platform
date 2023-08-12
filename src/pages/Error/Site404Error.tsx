import { Button, Result } from 'antd';
import { useNavigate, useRouteError } from 'react-router-dom';

interface ErrorProps {
  page: string;
}

export default function ErrorPage(props: ErrorProps) {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(error);

  return (
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
  );
}

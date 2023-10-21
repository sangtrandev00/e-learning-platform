import { Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../../../../pages/site/client.service';
import './CategoriesNav.scss';
const CategoriesNav = () => {
  const { data, isFetching } = useGetCategoriesQuery();

  return (
    <div className='header__categories container'>
      <div className='header__categories-wrap'>
        {isFetching && <Skeleton.Input block={true} />}

        {!isFetching &&
          (data?.categories || []).map((category) => {
            return (
              <div key={category._id} className='header__categories-item'>
                <Link to={`courses?_topic=${category._id}`}>{category.name}</Link>
              </div>
            );
          })}

        {/* <div className='header__categories-item'>
          <Link to=''>Frontend</Link>
        </div>
        <div className='header__categories-item'>
          <Link to=''>Backend</Link>
        </div>
        <div className='header__categories-item'>
          <Link to=''>Devops</Link>
        </div>
        <div className='header__categories-item'>
          <Link to=''>Fullstack</Link>
        </div>
        <div className='header__categories-item'>
          <Link to=''>IOT</Link>
        </div>
        <div className='header__categories-item'>
          <Link to=''>Blockchain</Link>
        </div>
        <div className='header__categories-item'>
          <Link to=''>Ai</Link>
        </div>
        <div className='header__categories-item'>
          <Link to=''>Data science</Link>
        </div> */}
      </div>
    </div>
  );
};

export default CategoriesNav;

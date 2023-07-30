import React from 'react';
import { Link } from 'react-router-dom';

const CategoriesNav = () => {
  return (
    <div className='header__categories container'>
      <div className='header__categories-wrap'>
        <div className='header__categories-item'>
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
        </div>
      </div>
    </div>
  );
};

export default CategoriesNav;

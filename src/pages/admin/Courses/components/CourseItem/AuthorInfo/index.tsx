import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  info: {
    _id: string;
    name: string;
    avatar: string;
  };
};

const AuthorInfo = (props: Props) => {
  return (
    <div>
      <Link to={'/' + props.info._id}>Name: {props.info.name}</Link>
      <p>Content</p>
    </div>
  );
};

export default AuthorInfo;

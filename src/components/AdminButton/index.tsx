import React from 'react';
import './AdminButton.scss';
type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const AdminButton = (props: Props) => {
  return (
    <button onClick={props.onClick} className={props.className}>
      {props.children}
    </button>
  );
};

export default AdminButton;

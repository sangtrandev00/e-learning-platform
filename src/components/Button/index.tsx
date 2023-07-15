import React from 'react';
import './Button.scss';
type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button = (props: Props) => {
  return (
    <button onClick={props.onClick} className={props.className}>
      {props.children}
    </button>
  );
};

export default Button;

import React from 'react';
import './Button.scss';
type Props = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  action?: string;
};

const Button = (props: Props) => {
  return (
    <button onClick={props.onClick} data-action={props.action} className={props.className}>
      {props.children}
    </button>
  );
};

export default Button;

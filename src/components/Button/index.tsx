import React from 'react';
import './Button.scss';
type Props = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  action?: string;
  disabled?: boolean;
};

const Button = (props: Props) => {
  return (
    <button disabled={props.disabled} onClick={props.onClick} data-action={props.action} className={props.className}>
      {props.children}
    </button>
  );
};

export default Button;

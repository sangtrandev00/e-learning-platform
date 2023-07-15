import React from 'react';

type Props = {
  children: React.ReactNode;
};

const FormInput = (props: Props) => {
  // Generate Input React functional Component can reusable in the future

  return <input type='text' placeholder='Input' />;
};

export default FormInput;

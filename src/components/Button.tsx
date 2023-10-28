import { Button as ButtonAntd } from 'antd';
import React from 'react';

interface ButtonProps {
  text: string;
  customClass?: string;
  htmlType?: 'button' | 'submit' | 'reset';
}

const Button = ({ text = '提交', htmlType = 'submit', customClass = '' }: ButtonProps) => (
  <ButtonAntd htmlType={htmlType} className={`btn flex justify-center align-middle ${customClass}`}>
    {text}
  </ButtonAntd>
);

export default Button;

import { Button as ButtonAntd } from 'antd';
import React from 'react';

const Button = ({ text = '提交' }: { text: string }) => (
  <ButtonAntd className="flex justify-center align-middle btn">{text}</ButtonAntd>
);

export default Button;

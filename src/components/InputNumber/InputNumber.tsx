import React from 'react';
import { InputNumber } from 'antd';
import { ReactFormProps } from '@/interface';

interface InputNumberFieldProps extends ReactFormProps {
  label: string;
  required?: boolean;
  placeholder?: string;
}

const InputNumberField = ({
  label,
  required = true,
  placeholder = '2000',
  ...props
}: InputNumberFieldProps) => {
  const { field, formState } = props;
  return (
    <div className="mb-4">
      <label className={`${required ? 'labelText-required' : ''} labelText`}>{label}</label>
      <InputNumber {...field} className="w-full py-2" placeholder={placeholder} />
      {formState?.errors?.[field.name] && <p className={'errorInput'}>價格只能輸入數字</p>}
    </div>
  );
};

export default InputNumberField;

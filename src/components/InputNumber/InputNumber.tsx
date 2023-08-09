import React from 'react';
import { InputNumber } from 'antd';
import { ReactFormProps } from '@/interface';

interface InputNumberFieldProps extends ReactFormProps {
  label: string;
  required?: boolean;
}

const InputNumberField = ({
  label,
  required = true,
  ...props
}: InputNumberFieldProps) => {
  const { field, formState } = props;
  return (
    <div className='mb-4'>
      <label className={`${required ? 'labelText-required' : ''} labelText`}>
        {label}
      </label>
      <InputNumber {...field} className='py-2 w-full' />
      {formState?.errors?.[field.name] && (
        <p className={'errorInput'}>價格只能輸入數字</p>
      )}
    </div>
  );
};

export default InputNumberField;
